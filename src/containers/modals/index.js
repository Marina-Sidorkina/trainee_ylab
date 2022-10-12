import React from 'react';
import useSelector from "@src/hooks/use-selector";
import Basket from "@src/app/basket";
import AddItemModalContainer from "@src/containers/add-item-modal";
import CatalogModalContainer from "@src/containers/catalog-modal";

function ModalsContainer() {
  const basket = useSelector(state => state.modals.basket);
  const modalsList = useSelector(state => state.modals.list);

  return (
    <>
      {modalsList.length ? modalsList.map((item, index) => {
        return item === 'addToBasket'
          ? <AddItemModalContainer key={index} />
          : <CatalogModalContainer key={index} index={modalsList.filter(item => item === 'catalog').length}/>
      }) : null}
      {basket ? <Basket /> : null}
    </>
  )
}

export default React.memo(ModalsContainer);
