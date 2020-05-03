/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RefreshTokenInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: RefreshToken
// ====================================================

export interface RefreshToken_refreshToken {
  __typename: "AuthorizationToken";
  accessToken: string;
  refreshToken: string;
}

export interface RefreshToken {
  refreshToken: RefreshToken_refreshToken;
}

export interface RefreshTokenVariables {
  input: RefreshTokenInput;
}
