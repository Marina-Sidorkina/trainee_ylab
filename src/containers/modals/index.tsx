import React from 'react';
import useSelector from "@src/hooks/use-selector";
import Basket from "@src/app/basket";
import AddItemModalContainer from "@src/containers/add-item-modal";
import CatalogModalContainer from "@src/containers/catalog-modal";
import {IState} from "@src/store/types";

function ModalsContainer() {
  const basket = useSelector((state: IState) => state.modals.basket);
  const modalsList = useSelector((state: IState) => state.modals.list);

  return (
    <>
      {modalsList.length ? modalsList.map((item: string, index: number) => {
        return item === 'addToBasket'
          ? <AddItemModalContainer key={index} />
          : <CatalogModalContainer key={index} index={modalsList.filter((item: string) => item === 'catalog').length}/>
      }) : null}
      {basket ? <Basket /> : null}
    </>
  )
}

export default React.memo(ModalsContainer);
