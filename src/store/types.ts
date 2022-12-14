import {IBasketState} from "./basket/types";
import {IChatState} from "./chat/types";
import {ILocaleState} from "@src/store/locale/types";
import {IArticleState} from "@src/store/article/types";
import {ISessionState} from "@src/store/session/types";
import {IProfileState} from "@src/store/profile/types";
import {ICanvasState} from "@src/store/canvas-oop/types";
import {IModalsState} from "@src/store/modals/types";
import {ICountryState} from "@src/store/country/types";
import {ICatalogState} from "@src/store/catalog/types";
import {ICategoriesState} from "@src/store/categories/types";
import BasketState from "@src/store/basket";
import ChatState from "@src/store/chat";
import LocaleState from "@src/store/locale";
import SessionState from "@src/store/session";
import ArticleState from "@src/store/article";
import ProfileState from "@src/store/profile";
import ModalsState from "@src/store/modals";
import CountryState from "@src/store/country";
import CatalogState from "@src/store/catalog";
import CategoriesState from "@src/store/categories";
//import * as modules from '@src/config-types';

export interface IModuleConfig {
  name: string;
}

/*
export type ITypeOfModules = typeof modules;

export type IModules = {
  [P in keyof ITypeOfModules]: InstanceType<ITypeOfModules[P]>;
}
*/

export interface IModules {
  /*[key: string]: BasketState | ChatState | LocaleState | ArticleState | SessionState | ProfileState |
    CanvasState | ModalsState | CountryState | CatalogState | CategoriesState;*/
  [key: string]: any;
  basket: BasketState;
  chat: ChatState;
  locale: LocaleState;
  article: ArticleState;
  session: SessionState;
  profile: ProfileState;
  canvasOOP: CanvasState;
  modals:  ModalsState;
  country: CountryState;
  catalog: CatalogState;
  categories: CategoriesState;
}

export interface IState {
  [key: string]: IBasketState | IChatState | ILocaleState | IArticleState | ISessionState | IProfileState |
    ICanvasState | IModalsState | ICountryState | ICatalogState | ICategoriesState;
  basket: IBasketState;
  chat: IChatState;
  locale: ILocaleState;
  article: IArticleState;
  session: ISessionState;
  profile: IProfileState;
  canvasOOP: ICanvasState;
  modals:  IModalsState;
  country: ICountryState;
  catalog: ICatalogState;
  catalog_basket: ICatalogState;
  categories: ICategoriesState;
}
