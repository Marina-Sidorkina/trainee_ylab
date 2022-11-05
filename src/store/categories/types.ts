export interface ICategory {
  _type: string,
  code?: string;
  children: ICategory[];
  parent: { _id: string } | null;
  title?: string;
  _id: string;
}

export interface ICategoriesState {
  items: ICategory[];
  waiting: boolean;
}
