import {IItem} from "@src/store/chat/types";

const filterMessages = (messages: IItem[]) => {
  const result = [] as IItem[];
  messages.forEach((message) => {
    if (result.findIndex(item => item._id === message._id) === -1) {
      result.push(message);
    }
  });
  return result;
};

export default filterMessages;
