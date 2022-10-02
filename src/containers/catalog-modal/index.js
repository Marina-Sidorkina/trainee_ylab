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
import useInit from "@src/hooks/use-init";

function CatalogModalContainer ({index}) {
  const store = useStore();
  const catalogField = 'catalog_' + index;
  const basketField = 'basket_' + index;

  useInit(async () => {
    if (!store.get(catalogField)) {
      store.addNewModalModuleAndState(index);
      await store.get(catalogField).resetParams();
    }
  }, [index]);

  const select = useSelector(state => ({
    amount: state[basketField] ? state[basketField].amount : 0,
    sum: state[basketField] ? state[basketField].sum : 0,
    lang: state.locale.lang,
    items: state[catalogField] ? state[catalogField].items : [],
    page: state[catalogField] ? state[catalogField].params.page : 0,
    limit: state[catalogField] ? state[catalogField].params.limit : 0,
    count: state[catalogField] ? state[catalogField].count : 0,
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
      store.get(basketField).setItemId(id);
      store.get('modals').addModalElement('addToBasket');
    }, []),
    // Переход по страницам
    onPaginate: useCallback(pageValue => {
      store.get(catalogField).setParams({page: pageValue}, false, 'page');
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
    <LayoutModal title={`Новый каталог. Модалка № ${select.modals.filter(item => item === 'catalog').length}`}
                 labelClose={'Закрыть'}
                 onClose={callbacks.closeCatalogModal}>
      <LayoutFlex flex="between" indent="big">
        <BasketSimple onOpen={callbacks.openModalBasket}
                      amount={select.amount ? select.amount : 0}
                      sum={select.sum ? select.sum : 0}
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
