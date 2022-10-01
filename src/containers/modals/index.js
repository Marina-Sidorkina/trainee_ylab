import React from 'react';
import useSelector from "@src/hooks/use-selector";
import Basket from "@src/app/basket";
import AddItemModalContainer from "@src/containers/add-item-modal";

function ModalsContainer() {
  const modal = useSelector(state => state.modals.name);

  return (
    <>
      {modal === 'basket' && <Basket/>}
      {modal === 'addToBasket' && <AddItemModalContainer />}
    </>
  )
}

export default React.memo( ModalsContainer);
