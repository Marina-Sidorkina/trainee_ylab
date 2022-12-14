import React, {useCallback, useEffect} from 'react';
import LayoutAddItemModal from "@src/components/layouts/layout-add-item-modal";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import {IState} from "@src/store/types";

function AddItemModalContainer() {
  const store = useStore();
  let onModalValueResolve: Function;
  let onModalValueReject: Function;

  const select = useSelector((state: IState) => ({
    currentItemId: state.basket.currentItemId,
  }));

  const openModal = new Promise((resolve, reject) => {
    onModalValueResolve = resolve;
    onModalValueReject = reject;
  });

  useEffect(() => {
    openModal
      .then((value) => {
        store.get('basket').addToBasket(select.currentItemId, value);
        store.get('modals').deleteModalElement();
      })
      .catch(() => {
        store.get('modals').deleteModalElement();
        console.log('Пользователь отменил действие')
      })
  }, [])

  const callbacks = {
    // Отменить добаление в корзину
    onModalValueReject: useCallback(() => onModalValueReject(), []),
    // Добавить в корзину указанное количество товара
    onModalValueResolve: useCallback((value: number) => onModalValueResolve(value), []),
  };

  return (
    <LayoutAddItemModal onOkButtonClick={(value) => callbacks.onModalValueResolve(value)}
                        onCancelButtonClick={callbacks.onModalValueReject}/>
  )
}

export default React.memo(AddItemModalContainer);
