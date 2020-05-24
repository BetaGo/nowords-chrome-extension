import { useQuery } from "@apollo/react-hooks";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";
import React from "react";

import { useLoginStatus } from "../../hooks/useLoginStatus";

import { UserInfo } from "../../graphql/__generated__/UserInfo";
import { USER_INFO } from "../../graphql/queries";

const UserCard = () => {
  const { data, loading, error } = useQuery<UserInfo>(USER_INFO);
  const { logout } = useLoginStatus();

  if (loading || error) return null;

  return (
    <Grid container spacing={2} alignItems="center" justify="space-between">
      <Grid item xs={1}>
        <Avatar alt={data?.user.displayName} src={data?.user.avatar}>
          {data?.user.displayName[0]}
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography align="left">{data?.user.displayName}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={logout}
          fullWidth
          variant="contained"
          color="primary"
          disableElevation
        >
          登出
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserCard;
