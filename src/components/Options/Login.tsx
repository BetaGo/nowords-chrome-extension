import React from "react";
import {
  Stack,
  TextField,
  PrimaryButton,
  DefaultButton,
  Text
} from "office-ui-fabric-react";
import { gql } from "apollo-boost";
import { useForm, Controller } from "react-hook-form";
import { JSEncrypt } from "jsencrypt";

import { client } from "../../common/graphql";

import styles from "./Login.module.scss";
import { LoginToken_loginToken } from "./__generated__/LoginToken";
import { UserLogin_userLogin } from "./__generated__/UserLogin";
import { UserLoginInput } from "../../../__generated__/globalTypes";

interface ILoginInput {
  account: string;
  password: string;
}

const encrypt = new JSEncrypt();

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginInput>();
  const onSubmit = async (data: ILoginInput) => {
    const tokenRes = await client.query<LoginToken_loginToken>({
      query: gql`
        query LoginToken {
          loginToken {
            token
            publicKey
          }
        }
      `
    });
    encrypt.setPublicKey(tokenRes.data.publicKey);
    const encryptedPassword = encrypt.encrypt(
      JSON.stringify({
        token: tokenRes.data.token,
        text: data.password
      })
    );
    const loginRes = await client.query<UserLogin_userLogin, UserLoginInput>({
      query: gql`
        query UserLogin($input: UserLoginInput) {
          userLogin(input: $input) {
            accessToken
            refreshToken
          }
        }
      `,
      variables: {
        account: data.account,
        password: encryptedPassword
      }
    });
    chrome.storage.sync.set({
      accessToken: loginRes.data.accessToken,
      refreshToken: loginRes.data.refreshToken
    });
  };

  return (
    <div className={styles.root}>
      <Text variant="xLarge">登录/注册</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Controller
            as={TextField}
            name="account"
            label="用户名"
            required
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          <Controller
            as={TextField}
            name="password"
            label="密码"
            required
            type="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          <PrimaryButton type="submit">登录</PrimaryButton>
          <DefaultButton>注册</DefaultButton>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
