const filterMessages = (messages) => {
  const result = [];
  messages.forEach((message) => {
    if (result.findIndex(item => item._id === message._id) === -1) {
      result.push(message);
    }
  });
  return result;
};

export default filterMessages;
