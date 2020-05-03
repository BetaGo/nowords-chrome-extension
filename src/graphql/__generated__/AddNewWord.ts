/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddUserWordInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddNewWord
// ====================================================

export interface AddNewWord_addUserWord {
  __typename: "AddUserWordPayload";
  id: number;
}

export interface AddNewWord {
  addUserWord: AddNewWord_addUserWord;
}

export interface AddNewWordVariables {
  input: AddUserWordInput;
}
