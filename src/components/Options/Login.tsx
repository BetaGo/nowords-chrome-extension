import {
  Button,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import GitHubIcon from "@material-ui/icons/GitHub";
import { JSEncrypt } from "jsencrypt";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { client } from "../../common/graphql";
import { EncryptToken } from "../../graphql/__generated__/EncryptToken";
import {
  UserLogin,
  UserLoginVariables,
} from "../../graphql/__generated__/UserLogin";
import { ENCRYPT_TOKEN, USER_LOGIN } from "../../graphql/queries";

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 360,
      margin: "auto",
      textAlign: "center",
      padding: theme.spacing(2),

      "& .MuiDivider-root": {
        margin: "12px auto",
      },

      "& .MuiFormControl-root": {
        margin: "12px auto",
      },

      "& .MuiButton-fullWidth": {
        margin: "3px auto",
      },
    },
  })
);

const Login = () => {
  const { handleSubmit, control } = useForm<ILoginInput>();

  const classes = useStyles();

  const onSubmit = async (data: ILoginInput) => {
    const tokenRes = await client.query<EncryptToken>({
      query: ENCRYPT_TOKEN,
    });
    if (!tokenRes.data.encryptToken) {
      return;
    }
    encrypt.setPublicKey(tokenRes.data.encryptToken.publicKey);
    const encryptedPassword = encrypt.encrypt(
      JSON.stringify({
        token: tokenRes.data.encryptToken.token,
        text: data.password,
      })
    );
    const loginRes = await client.query<UserLogin, UserLoginVariables>({
      query: USER_LOGIN,
      variables: {
        input: {
          account: data.account,
          password: encryptedPassword,
        },
      },
    });
    chrome.storage.sync.set({
      accessToken: loginRes.data.userLogin?.accessToken,
      refreshToken: loginRes.data.userLogin?.refreshToken,
    });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">登录/注册</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextField}
          name="account"
          label="用户名"
          required
          fullWidth
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        <Controller
          as={TextField}
          name="password"
          label="密码"
          required
          fullWidth
          variant="outlined"
          type="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disableElevation
          fullWidth
        >
          登录
        </Button>
        <Button variant="contained" disableElevation fullWidth>
          注册
        </Button>
      </form>
      <Divider />
      <Typography variant="subtitle2">第三方账号登录</Typography>
      <div>
        <IconButton onClick={() => thirdPartLogin("github")}>
          <GitHubIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Login;
