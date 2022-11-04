import React from 'react';
import Services from "@src/services";

/**
 * Контекст для Services
 */

export const ServicesContext = React.createContext({});

/**
 * Провайдер Services.
 */
function ServicesProvider(props: { services: Services; children: React.ReactNode | React.ReactNode[]; }) {
  return (
    <ServicesContext.Provider value={props.services}>
      {props.children}
      </ServicesContext.Provider>
  );
}

export default React.memo(ServicesProvider);
