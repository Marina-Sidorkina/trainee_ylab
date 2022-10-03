import React, {useCallback, useEffect, useState} from 'react';
import LayoutArticleListModal from "@src/components/layouts/layout-article-list-modal";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import useTranslate from "@src/hooks/use-translate";
import ListModalItem from "@src/components/catalog/list-modal-item";

function ArticleListModal({onClose}) {
  const store = useStore();
  const {t} = useTranslate();
  const [itemsChecked, setItemsChecked] = useState({});

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Переход по страницам
    onPaginate: useCallback(pageValue => {
      store.get('catalog').setParams({page: pageValue}, false, 'page');
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

  useEffect(() => {
    store.get('catalog').resetParams();
  }, [])

  return (
    <LayoutArticleListModal onClose={callbacks.onModalClose}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination modal={true} count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
    </LayoutArticleListModal>
  )
}

export default React.memo(ArticleListModal);
