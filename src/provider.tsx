import React from 'react';
import {IServiceProvider} from "@src/store/types";

/**
 * Контекст для Services
 */

export const ServicesContext = React.createContext({});

/**
 * Провайдер Services.
 */
function ServicesProvider(props: IServiceProvider) {
  return (
    <ServicesContext.Provider value={props.services}>
      {props.children}
      </ServicesContext.Provider>
  );
}

export default React.memo(ServicesProvider);
