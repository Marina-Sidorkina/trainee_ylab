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
import Services from "@src/services";
import React from "react";
import Store from "@src/store/index";

export interface IConfigStore {
  log: boolean;
  modules: { [session: string]: { tokenHeader: string; } };
}

export interface IConfig {
  store: IConfigStore;
  api: { baseUrl: string; };
  ws: { chatURL: string; };
}

export interface IModules {
  [key: string]: any;
  config: any;
  services: Services;
  store: Store;
}

export interface IState {
  [key: string]: any;
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
  categories: ICategoriesState;
}

export interface IServiceProvider {
  services: Services,
  children: React.ReactNode | React.ReactNode[],
}

