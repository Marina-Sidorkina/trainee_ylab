import React, {useCallback} from 'react';
import CatalogButton from "@src/components/elements/catalog-button";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import Item from "../../components/catalog/item";
import LayoutModal from "@src/components/layouts/layout-modal";
import useInit from "@src/hooks/use-init";
import CatalogFilter from "@src/containers/catalog-filter";
import propTypes from "prop-types";
import {IState} from "@src/store/types";
import {ICatalogItem, ICatalogState} from "@src/store/catalog/types";

function CatalogModalContainer (props: {index: number}) {
  const store = useStore();
  const fieldName = 'catalog_' + props.index;
  const moduleName = 'catalog';

  useInit(async () => {
    store.addNewModalModuleAndState(fieldName, moduleName);
    await store.get(fieldName).initParams();

    return () => {
      store.deleteNewModalModuleAndState(fieldName)
    };
  }, []);

  const select = useSelector((state: IState) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    items: state[fieldName] ? ((state[fieldName]) as ICatalogState).items : [],
    page: state[fieldName] ? ((state[fieldName]) as ICatalogState).params.page : 0,
    limit: state[fieldName] ? ((state[fieldName]) as ICatalogState).params.limit : 0,
    count: state[fieldName] ? ((state[fieldName]) as ICatalogState).count : 0,
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
    openModal: useCallback((id: string) => {
      store.get('basket').setItemId(id);
      store.get('modals').addModalElement('addToBasket');
    }, []),
    // Переход по страницам
    onPaginate: useCallback((pageValue: number) => {
      store.get(fieldName).setParams({page: pageValue}, false, 'page');
    }, [select.page]),
    // Закрытие всех модалок
    onLinkClick: useCallback(() => {
      console.log('work');
      store.get('modals').resetModalList();
    }, []),
  };

  const renders = {
    item: useCallback((item: ICatalogItem) => (
      <Item item={item}
            onLinkClick={callbacks.onLinkClick}
            onAdd={callbacks.openModal}
            link={`/articles/${item._id}`}
            labelAdd={t('article.add')}/>
    ), [t]),
  }

  return (
    <LayoutModal title={`Новый каталог. Модалка № ${props.index}`}
                 labelClose={'Закрыть'}
                 onClose={callbacks.closeCatalogModal}>
      <CatalogButton onClick={callbacks.openCatalogModal} title="Открыть новый каталог" modal={true}/>
      <CatalogFilter index={props.index}/>
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
