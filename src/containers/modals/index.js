import React from 'react';
import useSelector from "@src/hooks/use-selector";
import Basket from "@src/app/basket";
import AddItemModalContainer from "@src/containers/add-item-modal";
import CatalogModalContainer from "@src/containers/catalog-modal";

function ModalsContainer() {
  const modal = useSelector(state => state.modals.name);
  const modalsList = useSelector(state => state.modals.list);

  return (
    <>
      {modal === 'basket' && <Basket />}
      {modalsList.length && modalsList.map((item, index) => {
        return item === 'addToBasket'
          ? <AddItemModalContainer key={index} index={modalsList.filter(item => item === 'catalog').length}/>
          : <CatalogModalContainer key={index} index={modalsList.filter(item => item === 'catalog').length}/>
      })}
    </>
  )
}

export default React.memo(ModalsContainer);
