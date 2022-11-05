import React, {useCallback, useState} from 'react';
import LayoutArticleListModal from "@src/components/layouts/layout-article-list-modal";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import ListModalItem from "@src/components/catalog/list-modal-item";
import useInit from "@src/hooks/use-init";
import {IState} from "@src/store/types";
import {ICatalogItem} from "@src/store/catalog/types";

function ArticleListModal(props: {onClose: Function}) {
  const store = useStore();
  const {t} = useTranslate();
  const [itemsChecked, setItemsChecked] = useState({});
  const fieldName = 'catalog_basket';
  const moduleName = 'catalog';

  useInit(async () => {
    store.addNewModalModuleAndState(fieldName, moduleName);
    await store.get(fieldName).initParams();

    return () => {
      store.deleteNewModalModuleAndState(fieldName)
    };
  }, []);

  const select = useSelector((state: IState) => ({
    items: state[fieldName] ? state[fieldName].items : [],
    page: state[fieldName] ? state[fieldName].params.page : 0,
    limit: state[fieldName] ? state[fieldName].params.limit : 0,
    count: state[fieldName] ? state[fieldName].count : 0,
  }));

  const callbacks = {
    // Переход по страницам
    onPaginate: useCallback((pageValue: number) => {
      store.get('catalog_basket').setParams({page: pageValue}, false, 'page');
    }, [select.page]),
    // Закрытие модального окна
    onItemsAdd: useCallback(() => {
      props.onClose(Object.keys(itemsChecked));
      store.get('modals').close('basketCatalog');
    }, [itemsChecked, props.onClose]),
    // Закрытие модального окна
    onModalClose: useCallback(() => {
      store.get('modals').close('basketCatalog');
    }, [itemsChecked, props.onClose]),
    // Закрытие модального окна
    onItemChange: useCallback((id: string, value: boolean) => {
      const typesItemsChecked = itemsChecked as {[key: string]: any};
      if (value && !typesItemsChecked[id]) {
        setItemsChecked(Object.assign(itemsChecked, {[id]: true}));
      }
      if (!value && typesItemsChecked[id]) {
        const newValue = Object.assign({}, itemsChecked);
        delete (newValue as {[key: string]: any})[id]
        setItemsChecked(newValue);
      }
      }, [itemsChecked]),
  };

  const renders = {
    item: useCallback((item: ICatalogItem) => (
      <ListModalItem item={item} onChange={callbacks.onItemChange}/>
    ), [t]),
  }

  return (
    <LayoutArticleListModal onClose={callbacks.onModalClose} onItemsAdd={callbacks.onItemsAdd}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination modal={true} count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
    </LayoutArticleListModal>
  )
}

export default React.memo(ArticleListModal);
