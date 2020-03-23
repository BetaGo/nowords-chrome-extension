import React from "react";
import {
  Stack,
  TextField,
  PrimaryButton,
  DefaultButton,
  Text
} from "office-ui-fabric-react";
import { gql } from "apollo-boost";

import { client } from "../../common/graphql";

import styles from "./Login.module.scss";
import { LoginToken_loginToken } from "./__generated__/LoginToken";

const Login = () => {
  const handleLogin = async () => {
    const { data } = await client.query<LoginToken_loginToken>({
      query: gql`
        query LoginToken {
          loginToken {
            token
            publicKey
          }
        }
      `
    });
  };

  return (
    <div className={styles.root}>
      <Text variant="xLarge">登录/注册</Text>
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField label="用户名" required />
        <TextField label="密码" required type="password" />
        <PrimaryButton onClick={handleLogin}>登录</PrimaryButton>
        <DefaultButton>注册</DefaultButton>
      </Stack>
    </div>
  );
};

export default Login;
