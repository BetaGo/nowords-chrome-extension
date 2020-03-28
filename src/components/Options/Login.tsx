import { JSEncrypt } from "jsencrypt";
import {
  DefaultButton,
  PrimaryButton,
  Separator,
  Stack,
  Text,
  TextField
} from "office-ui-fabric-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { client } from "../../common/graphql";
import { LoginToken_loginToken } from "../../graphql/__generated__/LoginToken";
import {
  UserLogin,
  UserLoginVariables
} from "../../graphql/__generated__/UserLogin";
import { LOGIN_TOKEN, USER_LOGIN } from "../../graphql/queries";
import styles from "./Login.module.scss";

interface ILoginInput {
  account: string;
  password: string;
}

const encrypt = new JSEncrypt();

const thirdPartLogin = (type: string) => {
  window.location.replace(
    `${
      process.env.REACT_APP_AUTH_URL
    }?type=${type}&redirectUrl=${encodeURIComponent(window.location.href)}`
  );
};

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginInput>();
  const onSubmit = async (data: ILoginInput) => {
    const tokenRes = await client.query<LoginToken_loginToken>({
      query: LOGIN_TOKEN
    });
    encrypt.setPublicKey(tokenRes.data.publicKey);
    const encryptedPassword = encrypt.encrypt(
      JSON.stringify({
        token: tokenRes.data.token,
        text: data.password
      })
    );
    const loginRes = await client.query<UserLogin, UserLoginVariables>({
      query: USER_LOGIN,
      variables: {
        input: {
          account: data.account,
          password: encryptedPassword
        }
      }
    });
    chrome.storage.sync.set(
      {
        accessToken: loginRes.data.userLogin?.accessToken,
        refreshToken: loginRes.data.userLogin?.refreshToken
      },
      () => {
        window.location.reload(false);
      }
    );
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
      <Separator>第三方账号登录</Separator>
      <div>
        <button onClick={() => thirdPartLogin("github")}>github</button>
      </div>
    </div>
  );
};

export default Login;
