/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserWord
// ====================================================

export interface UserWord_userWord {
  __typename: "UserWord";
  word: string;
  example: string;
  translation: string;
  exp: number;
  forgottenTimes: number;
  rememberTimes: number;
  /**
   * 0: false; 1: true
   */
  isKnown: number;
}

export interface UserWord {
  userWord: UserWord_userWord | null;
}

export interface UserWordVariables {
  word: string;
}
