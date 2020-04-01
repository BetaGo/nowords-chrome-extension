import React from "react";
import { CommandBar, ICommandBarItemProps } from "office-ui-fabric-react";
import { useLoginStatus } from "../../hooks/useLoginStatus";
import { useMutation } from "@apollo/react-hooks";
import {
  AddNewWord,
  AddNewWordVariables
} from "../../graphql/__generated__/AddNewWord";
import { ADD_NEW_WORD } from "../../graphql/mutations";
import { IMessage, MessageType } from "../../common/Message";

interface IOperationProps {
  word: string;
}

const Operation: React.FC<IOperationProps> = ({ word }) => {
  const isLogin = useLoginStatus();

  const [addNewWord, { loading, error, data }] = useMutation<
    AddNewWord,
    AddNewWordVariables
  >(ADD_NEW_WORD);

  const handleAddNewWord = () => {
    addNewWord({
      variables: {
        input: {
          word
        }
      }
    });
  };

  const openOptionsPage = () => {
    const message: IMessage = {
      type: MessageType.openOptionsPage
    };
    chrome.runtime.sendMessage(message);
  };

  const _items: ICommandBarItemProps[] = [
    {
      key: "operation",
      iconOnly: true,
      iconProps: {
        iconName: "add"
      },
      subMenuProps: {
        items: [
          {
            key: "add-to-note",
            text: "添加到生词本",
            disabled: !isLogin || loading,
            iconProps: {
              iconName: "FavoriteStar"
            },
            onClick: handleAddNewWord
          },
          {
            key: "config",
            text: isLogin ? "设置" : "登录",
            iconProps: {
              iconName: "Settings"
            },
            onClick: openOptionsPage
          }
        ]
      }
    }
  ];

  return (
    <div>
      <CommandBar items={_items}></CommandBar>
    </div>
  );
};

export default Operation;
