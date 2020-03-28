/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginToken
// ====================================================

export interface LoginToken_loginToken {
  __typename: "LoginTokenPayload";
  token: string;
  publicKey: string;
}

export interface LoginToken {
  loginToken: LoginToken_loginToken | null;
}
