import React, {useCallback, useEffect} from 'react';
import LayoutAddItemModal from "@src/components/layouts/layout-add-item-modal";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import propTypes from "prop-types";

function AddItemModalContainer({index}) {
  const store = useStore();
  let onModalValueResolve;
  let onModalValueReject;
  const basketField = index ? 'basket_' + index : 'basket';

  const select = useSelector(state => ({
    currentItemId: state[basketField].currentItemId,
  }));

  const openModal = new Promise((resolve, reject) => {
    onModalValueResolve = resolve;
    onModalValueReject = reject;
  });

  useEffect(() => {
    openModal
      .then((value) => {
        store.get(basketField).addToBasket(select.currentItemId, value);
        store.get('modals').deleteModalElement();
      })
      .catch(() => {
        store.get('modals').deleteModalElement();
        console.log('Пользователь отменил действие')
      })
  }, [index])

  const callbacks = {
    // Отменить добаление в корзину
    onModalValueReject: useCallback(onModalValueReject, []),
    // Добавить в корзину указанное количество товара
    onModalValueResolve: useCallback((value) => onModalValueResolve(value), []),
  };

  return (
    <LayoutAddItemModal onOkButtonClick={(value) => callbacks.onModalValueResolve(value)}
                        onCancelButtonClick={callbacks.onModalValueReject}/>
  )
}

AddItemModalContainer.propTypes = {
  index: propTypes.number,
}

AddItemModalContainer.defaultProps = {
  index: 0,
}

export default React.memo(AddItemModalContainer);
