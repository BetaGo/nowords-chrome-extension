import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_URI,
  request: async operation => {
    const accessToken = await new Promise<string>(resolve => {
      chrome.storage.sync.get({ accessToken: "" }, function(items) {
        resolve(items.accessToken);
      });
    });
    operation.setContext({
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : ""
      }
    });
  }
});
