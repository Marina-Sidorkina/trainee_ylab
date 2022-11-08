export interface IMaidIn {
  title: string;
  code: string;
  _id: string;
}

export interface ICategory {
  title: string;
  _id: string;
}

export interface IArticle {
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
}

export interface IArticleState {
  data: IArticle;
  waiting: boolean;
}
