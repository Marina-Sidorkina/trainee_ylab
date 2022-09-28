import React, {useCallback, useEffect} from "react";
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
    checkValue: state.catalog.checkValue,
  }));

  let { page, elementRef, setPage } = useInfiniteScroll();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback(pageValue => {
      store.get('catalog').setParams({page: pageValue}, false, 'page');
      setPage(pageValue);
    }, [select.page]),
    // Загрузка при скролле
    onloadMore: useCallback((page) => {
      store.get('catalog').setParams({page}, false, 'scroll');
    }, [page]),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`} labelAdd={t('article.add')}/>
    ), [t]),
  }

  useEffect(() => {
    if (page !== 0 && page !== select.page) {
      callbacks.onloadMore(page)
    }
  }, [page]);

  return (
    <>
      <Spinner active={select.waiting}>
        <List items={select.items} renderItem={renders.item}/>
        {select.waiting ?  <LoadMoreIndicator/> : null}
        <Pagination count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
      </Spinner>
      <div ref={elementRef}/>
    </>
  );
}

export default React.memo(CatalogList);
