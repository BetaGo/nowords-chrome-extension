import ApolloClient from "apollo-boost";
import jwtDecode from "jwt-decode";
import _ from "lodash";

import {
  RefreshToken,
  RefreshTokenVariables,
} from "../graphql/__generated__/RefreshToken";
import { REFRESH_TOKEN } from "../graphql/queries";
import { IJwtTokenObj } from "../types";
import { IMessage, MessageType } from "./Message";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI,
});

export const authorizedClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI,
  request: async (operation) => {
    const tokens = await new Promise<any>((resolve) => {
      chrome.storage.sync.get({ accessToken: "", refreshToken: "" }, function (
        items
      ) {
        resolve(items);
      });
    });
    let { accessToken, refreshToken } = tokens;

    if (accessToken && refreshToken) {
      const now = Math.floor(Date.now() / 1000);
      const decodedAccessToken = jwtDecode<IJwtTokenObj>(accessToken);
      const decodedRefreshToken = jwtDecode<IJwtTokenObj>(refreshToken);

      if (decodedAccessToken.exp < now && decodedRefreshToken.exp > now) {
        const res = await client.query<RefreshToken, RefreshTokenVariables>({
          query: REFRESH_TOKEN,
          variables: {
            input: {
              accessToken,
              refreshToken,
            },
          },
        });
        accessToken = res.data.refreshToken?.accessToken;
        refreshToken = res.data.refreshToken?.refreshToken;
        chrome.storage.sync.set({
          accessToken,
          refreshToken,
        });
      }
    }

    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });
  },
  onError(errors) {
    const { networkError, graphQLErrors } = errors;
    if (
      networkError?.message.includes("Unauthorized") ||
      graphQLErrors?.some((v) => v.message.includes("Unauthorized"))
    ) {
      chrome.storage.sync.remove(["accessToken", "refreshToken"], () => {
        const message: IMessage = {
          type: MessageType.openOptionsPage,
        };
        chrome.runtime.sendMessage(message);
      });
    }
  },
});
