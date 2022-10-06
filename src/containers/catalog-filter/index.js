import React, {useCallback, useMemo} from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Select from "@src/components/elements/select";
import Input from "@src/components/elements/input";
import LayoutFlex from "@src/components/layouts/layout-flex";
import listToTree from "@src/utils/list-to-tree";
import treeToList from "@src/utils/tree-to-list";
import propTypes from "prop-types";
import Button from "@src/components/elements/button";

function CatalogFilter({index}) {
  const store = useStore();
  const catalogField = index ? 'catalog_' + index : 'catalog'

  const select = useSelector(state => ({
    sort: state[catalogField] ? state[catalogField].params.sort : '',
    query: state[catalogField] ? state[catalogField].params.query : '',
    category: state[catalogField] ? state[catalogField].params.category : '',
    categories: state.categories.items,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => {
      store.get(catalogField).setParams({sort, page: 1}, true, 'page');
    }, []),
    // Поиск
    onSearch: useCallback(query => {
      store.get(catalogField).setParams({query, page: 1}, true, 'page');
    }, []),
    // Сброс
    onReset: useCallback(() => store.get(catalogField).resetParams(), []),
    // Фильтр по категории
    onCategory: useCallback(category => {
      store.get(catalogField).setParams({category, page: 1}, true, 'page');
    }, []),
  };

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), []),

    categories: useMemo(() => [
      {value: '', title: 'Все'},
      ...treeToList(
        listToTree(select.categories),
        (item, level) => ({value: item._id, title: '- '.repeat(level) + item.title})
      )
    ], [select.categories]),
  }

  return (
    <LayoutFlex flex="start" indent="big">
      <Select onChange={callbacks.onCategory} value={select.category} options={options.categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <Button onClick={callbacks.onReset} title={t('filter.reset')}/>
    </LayoutFlex>
  );
}

CatalogFilter.propTypes = {
  index: propTypes.number,
}

CatalogFilter.defaultProps = {
  index: 0,
}

export default React.memo(CatalogFilter);
