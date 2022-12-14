import React, {useCallback, useEffect} from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import BasketTotal from "@src/components/catalog/basket-total";
import LayoutModal from "@src/components/layouts/layout-modal";
import ItemBasket from "@src/components/catalog/item-basket";
import List from "@src/components/elements/list";
import CatalogButton from "@src/components/elements/catalog-button";
import ArticleListModal from "../../containers/article-list-modal";
import {IState} from "@src/store/types";
import {ICatalogItem} from "@src/store/catalog/types";

function Basket() {
  const store = useStore();
  const {t} = useTranslate();
  const basketCatalogModal = useSelector((state: IState) => state.modals.basketCatalog);
  let onModalValueResolve = (values: []) => {};

  const select = useSelector((state: IState) => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const openModal = new Promise((resolve) => {
    onModalValueResolve = (values: []) => {
      resolve(values)
    };
  });

  useEffect(() => {
    openModal
      .then((values) => {
        store.get('basket').addSeveralItemsToBasket(values);
      })
  }, [basketCatalogModal])

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      store.get('modals').close('basket')
    }, []),
    // Удаление из корзины
    removeFromBasket: useCallback((_id: number) => store.get('basket').removeFromBasket(_id), []),
    // Открытие модального окна со списком
    openModal: useCallback(() => store.get('modals').open('basketCatalog'), []),
  };

  const renders = {
    itemBasket: useCallback((item: ICatalogItem) => (
      <ItemBasket
        item={item}
        link={`/articles/${item._id}`}
        onRemove={callbacks.removeFromBasket}
        onLink={callbacks.closeModal}
        labelUnit={t('basket.unit')}
        labelDelete={t('basket.delete')}
      />
    ), []),
  }

  return (
    <LayoutModal title={t('basket.title')} labelClose={t('basket.close')}
                 onClose={callbacks.closeModal}>
      <CatalogButton basket={true} title={'Открыть каталог'} onClick={callbacks.openModal}/>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} t={t}/>
      {basketCatalogModal && <ArticleListModal onClose={onModalValueResolve}/>}
    </LayoutModal>
  )
}

export default React.memo(Basket);
