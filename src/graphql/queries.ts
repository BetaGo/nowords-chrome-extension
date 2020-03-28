import { gql } from "apollo-boost";

export const LOGIN_TOKEN = gql`
  query LoginToken {
    loginToken {
      token
      publicKey
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken($input: RefreshTokenInput) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const USER_LOGIN = gql`
  query UserLogin($input: UserLoginInput) {
    userLogin(input: $input) {
      accessToken
      refreshToken
    }
  }
`;
