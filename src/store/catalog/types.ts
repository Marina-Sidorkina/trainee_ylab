export interface ICatalogParams {
  page: number;
  skip: number;
  limit: number;
  sort: string;
  query: string;
  category: string;
}

export interface ICatalogCategory {
  _id: string,
  _type: string,
  title?: string
  code?: string
}

export interface ICatalogMadeIn {
  _id: string,
  _type: string,
  title?: string
  code?: string
}

export interface ICatalogItem {
  category: ICatalogCategory;
  dateCreate: string;
  dateUpdate: string;
  description: string;
  edition: number;
  isDeleted: boolean;
  isFavorite: boolean;
  isNew: boolean;
  maidIn: ICatalogMadeIn;
  name: string;
  order: number;
  price: number;
  title: string;
  _id: string;
  _key: string;
  _type: string;
}

export interface ICatalogState {
  items: ICatalogItem[];
  count: number;
  params: {
    page: number;
    limit: number;
    sort: string;
    query: string;
    category: string;
  },
  waiting: boolean;
  initial: boolean;
}
