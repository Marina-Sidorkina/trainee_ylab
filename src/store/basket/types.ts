export interface IMaidIn {
  _id: string;
  _type: string;
}

export interface ICategory {
  _id: string;
  _type: string;
}

export interface IItem {
  _id: string;
  _key: string;
  name: string;
  title: string;
  description: string;
  price: number;
  maidIn: IMaidIn;
  edition: number;
  category: ICategory;
  order: number;
  isNew: boolean;
  _type: string;
  dateCreate: Date;
  dateUpdate: Date;
  isDeleted: boolean;
  isFavorite: boolean;
  amount: number;
}



export interface IBasketState {
  items: IItem[],
  sum: 0,
  amount: 0,
  currentItemId: null,
}
