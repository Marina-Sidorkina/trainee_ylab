export interface IOption {
  code: string;
  title: string;
}

export interface ICountryState {
  code: string;
  title: string;
  options: IOption[];
}
