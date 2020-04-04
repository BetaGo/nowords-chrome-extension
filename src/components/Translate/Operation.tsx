import { useMutation } from "@apollo/react-hooks";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";

import { IMessage, MessageType } from "../../common/Message";
import {
  AddNewWord,
  AddNewWordVariables,
} from "../../graphql/__generated__/AddNewWord";
import { ADD_NEW_WORD } from "../../graphql/mutations";
import { useLoginStatus } from "../../hooks/useLoginStatus";

interface IOperationProps {
  word: string;
}

const Operation: React.FC<IOperationProps> = ({ word }) => {
  const { isLogin } = useLoginStatus();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleAddNewWord} disabled={!isLogin || loading}>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <Typography variant="inherit">添加到生词本</Typography>
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
