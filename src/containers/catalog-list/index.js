import React, {useCallback, useEffect, useState} from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import List from "@src/components/elements/list";
import Pagination from "@src/components/navigation/pagination";
import Spinner from "@src/components/elements/spinner";
import Item from "@src/components/catalog/item";
import useInfiniteScroll from "@src/hooks/use-infinite-scroll";
import LoadMoreIndicator from "@src/components/elements/load-more-indicator";

function CatalogList() {

  const store = useStore();
  const {t} = useTranslate();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    initial: state.catalog.initial,
  }));

  let { page, setPage, refElement } = useInfiniteScroll(select.initial);
  const [check, setCheck] = useState(0);

  const callbacks = {
    // Добавление в корзину
    openModal: useCallback(id => {
      store.get('basket').setItemId(id);
      store.get('modals').addModalElement('addToBasket');
    }, []),
    // Пагианция
    onPaginate: useCallback(pageValue => {
      setPage(pageValue - 1);
      setCheck(1);
      store.get('catalog').setParams({page: pageValue}, false, 'page');
    }, [select.page]),
    // Загрузка при скролле
    onloadMore: useCallback((page) => {
      store.get('catalog').setParams({page}, false, 'scroll');
    }, [page]),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.openModal} link={`/articles/${item._id}`} labelAdd={t('article.add')}/>
    ), [t]),
  }

  useEffect(() => {
    if (check === 1) setCheck(2);
    if (check === 2) setCheck(0);

    if (page !== 0 && page !== select.page && check !== 1  && !select.initial) {
      callbacks.onloadMore(page);
    }
  }, [page]);

  return (
    <>
      <Spinner active={select.waiting}>
        <List items={select.items} renderItem={renders.item}/>
        {select.waiting ?  <LoadMoreIndicator/> : null}
        <Pagination count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
      </Spinner>
      {refElement}
    </>
  );
}

export default React.memo(CatalogList);
