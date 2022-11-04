export interface IRole {
  _id: string;
  _type: string;
}

export interface IAvatar {}

export interface ICountry {}

export interface ICity {}

export interface IProfile {
  name: string;
  surname: string;
  phone: string;
  middlename: string;
  avatar: IAvatar;
  birthday: string;
  position: string;
  country: ICountry;
  city: ICity;
  street: string;
}

export interface IUser {
  _id: string;
  _key: string;
  username: string;
  email: string;
  roles: IRole[];
  profile: IProfile;
  status: string;
  isNew: boolean;
  order: number;
  _type: string;
  dateCreate: Date;
  dateUpdate: Date;
  isDeleted: boolean;
}

export interface IProfileState {
  data: IUser,
  waiting: boolean;
}
