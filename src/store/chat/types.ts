export interface IAvatar {
  url: string;
}

export interface IProfile {
  name: string;
  avatar: IAvatar;
}

export interface IAuthor {
  _id: string;
  username: string;
  profile: IProfile;
}

export interface IItem {
  _id: string;
  _key: string;
  text: string;
  author: IAuthor;
  dateCreate: string | Date;
}

export interface IPayload {
  items: IItem[];
  _key: string;
  _id: string;
  text: string;
  author: IAuthor;
  dateCreate: string  | Date;
}

export interface IData {
  method: string;
  payload: IPayload;
  error: object;
  _key: string;
}

export interface IChatState {
  items: IItem[],
  lastMethod: '',
  current: null,
  waiting: false,
  lastMessageId: null,
  self: false,
}

