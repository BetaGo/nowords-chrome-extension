/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserLoginInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: UserLogin
// ====================================================

export interface UserLogin_userLogin {
  __typename: "AuthorizationToken";
  accessToken: string;
  refreshToken: string;
}

export interface UserLogin {
  userLogin: UserLogin_userLogin;
}

export interface UserLoginVariables {
  input: UserLoginInput;
}
