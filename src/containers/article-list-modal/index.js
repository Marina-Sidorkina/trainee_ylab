import React, {useCallback, useState} from 'react';
import LayoutArticleListModal from "@src/components/layouts/layout-article-list-modal";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import ListModalItem from "@src/components/catalog/list-modal-item";
import useInit from "@src/hooks/use-init";

function ArticleListModal({onClose}) {
  const store = useStore();
  const {t} = useTranslate();
  const [itemsChecked, setItemsChecked] = useState({});

  useInit(async () => {
    store.addNewModalModuleAndState('basket');
    await store.get('catalog_basket').resetParams();

    return () => {
      store.deleteNewModalModuleAndState('basket')
    };
  }, []);

  const select = useSelector(state => ({
    items: state['catalog_basket'] ? state['catalog_basket'].items : [],
    page: state['catalog_basket'] ? state['catalog_basket'].params.page : 0,
    limit: state['catalog_basket'] ? state['catalog_basket'].params.limit : 0,
    count: state['catalog_basket'] ? state['catalog_basket'].count : 0,
  }));

  const callbacks = {
    // Переход по страницам
    onPaginate: useCallback(pageValue => {
      store.get('catalog_basket').setParams({page: pageValue}, false, 'page');
    }, [select.page]),
    // Закрытие модального окна
    onModalClose: useCallback(() => {
      onClose(Object.keys(itemsChecked));
      store.get('modals').close('basketCatalog');
    }, [itemsChecked, onClose]),
    // Закрытие модального окна
    onItemChange: useCallback((id, value) => {
      if (value && !itemsChecked[id]) {
        setItemsChecked(Object.assign(itemsChecked, {[id]: true}));
      }
      if (!value && itemsChecked[id]) {
        const newValue = Object.assign({}, itemsChecked);
        delete newValue[id]
        setItemsChecked(newValue);
      }
      }, [itemsChecked]),
  };

  const renders = {
    item: useCallback(item => (
      <ListModalItem item={item} onChange={callbacks.onItemChange}/>
    ), [t]),
  }

  return (
    <LayoutArticleListModal onClose={callbacks.onModalClose}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination modal={true} count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
    </LayoutArticleListModal>
  )
}

export default React.memo(ArticleListModal);
