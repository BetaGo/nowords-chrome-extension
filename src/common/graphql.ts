import ApolloClient, { gql } from "apollo-boost";
import jwtDecode from "jwt-decode";

import { RefreshTokenInput } from "../../__generated__/globalTypes";
import { IJwtTokenObj } from "../types";
import { RefreshToken_refreshToken } from "./__generated__/RefreshToken";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI
});

export const authorizedClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI,
  request: async operation => {
    const tokens = await new Promise<any>(resolve => {
      chrome.storage.sync.get({ accessToken: "", refreshToken: "" }, function(
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

      if (decodedAccessToken.exp > now && decodedRefreshToken.exp < now) {
        const res = await client.query<
          RefreshToken_refreshToken,
          RefreshTokenInput
        >({
          query: gql`
            query RefreshToken($input: RefreshTokenInput) {
              refreshToken(input: $input) {
                accessToken
                refreshToken
              }
            }
          `,
          variables: {
            accessToken,
            refreshToken
          }
        });
        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;
        chrome.storage.sync.set({
          accessToken,
          refreshToken
        });
      }
    }

    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : ""
      }
    });
  }
});
