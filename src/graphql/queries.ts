import { gql } from "apollo-boost";

export const ENCRYPT_TOKEN = gql`
  query EncryptToken {
    encryptToken {
      token
      publicKey
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const USER_LOGIN = gql`
  query UserLogin($input: UserLoginInput!) {
    userLogin(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const USER_WORD = gql`
  query UserWord($word: String!) {
    userWord(word: $word) {
      word
      example
      translation
      exp
      forgottenTimes
      rememberTimes
      isKnown
    }
  }
`;
