import React, {useCallback, useEffect} from "react";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import BasketTotal from "@src/components/catalog/basket-total";
import LayoutModal from "@src/components/layouts/layout-modal";
import ItemBasket from "@src/components/catalog/item-basket";
import List from "@src/components/elements/list";
import CatalogButton from "@src/components/elements/catalog-button";
import ArticleListModal from "@src/containers/article-list-modal";

function Basket() {
  const store = useStore();
  const {t} = useTranslate();
  const basketCatalogModal = useSelector(state => state.modals.basketCatalog);
  let onModalValueResolve;

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const openModal = new Promise((resolve) => {
    onModalValueResolve = (values) => {
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
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), []),
    // Открытие модального окна со списком
    openModal: useCallback(() => store.get('modals').open('basketCatalog'), []),
  };

  const renders = {
    itemBasket: useCallback(item => (
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
