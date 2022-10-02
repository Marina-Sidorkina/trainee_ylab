import React, {useCallback} from 'react';
import BasketSimple from "@src/components/catalog/basket-simple";
import CatalogButton from "@src/components/elements/catalog-button";
import LayoutFlex from "@src/components/layouts/layout-flex";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import Item from "@src/components/catalog/item";
import LayoutModal from "@src/components/layouts/layout-modal";

function CatalogModalContainer () {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    modals: state.modals.list,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Открытие модального окна с каталогом
    openCatalogModal: useCallback(() => {
      store.get('modals').addModalElement('catalog');
    }, []),
    // Закрытие модального окна с каталогом
    closeCatalogModal: useCallback(() => {
      store.get('modals').deleteModalElement();
    }, []),
    // Добавление в корзину
    openModal: useCallback(id => {
      store.get('basket').setItemId(id);
      store.get('modals').addModalElement('addToBasket');
    }, []),
    // Переход по страницам
    onPaginate: useCallback(pageValue => {
      store.get('catalog').setParams({page: pageValue}, false, 'page');
    }, [select.page]),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.openModal}
            link={`/articles/${item._id}`}
            labelAdd={t('article.add')}/>
    ), [t]),
  }

  return (
    <LayoutModal title={`Новый каталог. Модалка № ${select.modals.length}`}
                 labelClose={'Закрыть'}
                 onClose={callbacks.closeCatalogModal}>
      <LayoutFlex flex="between" indent="big">
        <BasketSimple onOpen={callbacks.openModalBasket}
                      amount={select.amount}
                      sum={select.sum}
                      t={t}
                      button={false}/>
        <CatalogButton onClick={callbacks.openCatalogModal} title="Открыть новый каталог"/>
      </LayoutFlex>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination modal={true} count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
    </LayoutModal>
  )
}

export default React.memo(CatalogModalContainer);
