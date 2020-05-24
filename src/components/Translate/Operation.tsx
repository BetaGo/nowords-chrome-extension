import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import SettingsIcon from "@material-ui/icons/Settings";
import React, { useEffect } from "react";

import { IMessage, MessageType } from "../../common/Message";
import {
  AddNewWord,
  AddNewWordVariables,
} from "../../graphql/__generated__/AddNewWord";
import { ADD_NEW_WORD } from "../../graphql/mutations";
import { useLoginStatus } from "../../hooks/useLoginStatus";
import { USER_WORD } from "../../graphql/queries";
import {
  UserWord,
  UserWordVariables,
} from "../../graphql/__generated__/UserWord";

interface IOperationProps {
  word: string;
}

const Operation: React.FC<IOperationProps> = ({ word }) => {
  const { isLogin } = useLoginStatus();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    loadUserWord,
    { data: userWordData, refetch: refetchUserWord },
  ] = useLazyQuery<UserWord, UserWordVariables>(USER_WORD);

  const rootRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLogin) {
      loadUserWord({
        variables: {
          word,
        },
      });
    }
  }, [isLogin, word, loadUserWord]);

  const open = Boolean(anchorEl);

  const [addNewWord, { loading, error, data }] = useMutation<
    AddNewWord,
    AddNewWordVariables
  >(ADD_NEW_WORD);

  const handleAddNewWord = () => {
    addNewWord({
      variables: {
        input: {
          word,
        },
      },
    }).then(() => {
      refetchUserWord({
        word,
      });
      handleClose();
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openOptionsPage = () => {
    const message: IMessage = {
      type: MessageType.openOptionsPage,
    };
    chrome.runtime.sendMessage(message, () => {
      handleClose();
    });
  };

  return (
    <div ref={rootRef}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={() => rootRef.current}
      >
        <MenuItem
          onClick={handleAddNewWord}
          disabled={!isLogin || loading || !!userWordData?.userWord}
        >
          <ListItemIcon>
            {userWordData?.userWord ? <StarIcon /> : <StarBorderIcon />}
          </ListItemIcon>
          {userWordData?.userWord ? (
            <Typography variant="inherit">已在生词本</Typography>
          ) : (
            <Typography variant="inherit">添加到生词本</Typography>
          )}
        </MenuItem>
        <MenuItem onClick={openOptionsPage}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Typography variant="inherit">{isLogin ? "设置" : "登录"}</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Operation;
