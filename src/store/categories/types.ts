export interface ICategory {
  _id: string,
  _type: string,
  title?: string
  code?: string
}


export interface ICategoriesState {
  items: ICategory[];
  waiting: boolean;
}
