import React, {useCallback} from 'react';
import CatalogButton from "@src/components/elements/catalog-button";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import Item from "@src/components/catalog/item";
import LayoutModal from "@src/components/layouts/layout-modal";
import useInit from "@src/hooks/use-init";
import CatalogFilter from "@src/containers/catalog-filter";
import propTypes from "prop-types";

function CatalogModalContainer ({index}) {
  const store = useStore();
  const catalogField = 'catalog_' + index;

  useInit(async () => {
    store.addNewModalModuleAndState(index);
    await store.get(catalogField).resetParams();

    return () => {
      store.deleteNewModalModuleAndState(index)
    };
  }, []);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
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
      store.get('basket').setItemId(id);
      store.get('modals').addModalElement('addToBasket');
    }, []),
    // Переход по страницам
    onPaginate: useCallback(pageValue => {
      store.get(catalogField).setParams({page: pageValue}, false, 'page');
    }, [select.page]),
    onLinkClick: useCallback(() => {
      console.log('work');
      store.get('modals').resetModalList();
    }, []),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.openModal}
            link={`/articles/${item._id}`}
            labelAdd={t('article.add')} onLinkClick={callbacks.onLinkClick}/>
    ), [t]),
  }

  return (
    <LayoutModal title={`Новый каталог. Модалка № ${index}`}
                 labelClose={'Закрыть'}
                 onClose={callbacks.closeCatalogModal}>
      <CatalogButton onClick={callbacks.openCatalogModal} title="Открыть новый каталог" modal={true}/>
      <CatalogFilter index={index}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination modal={true} count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
    </LayoutModal>
  )
}

CatalogModalContainer.propTypes = {
  index: propTypes.number,
}

CatalogModalContainer.defaultProps = {
  index: 0,
}

export default React.memo(CatalogModalContainer);
