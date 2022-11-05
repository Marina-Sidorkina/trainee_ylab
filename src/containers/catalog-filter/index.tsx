import React, {useCallback, useMemo} from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Select from "@src/components/elements/select";
import Input from "@src/components/elements/input";
import LayoutFlex from "@src/components/layouts/layout-flex";
import listToTree from "@src/utils/list-to-tree";
import treeToList, {ITree} from "@src/utils/tree-to-list";
import Button from "@src/components/elements/button";
import {IState} from "@src/store/types";

function CatalogFilter(props: {index: number}) {
  const store = useStore();
  const catalogField = props.index ? 'catalog_' + props.index : 'catalog';

  const select = useSelector((state: IState) => ({
    sort: state[catalogField] ? state[catalogField].params.sort : '',
    query: state[catalogField] ? state[catalogField].params.query : '',
    category: state[catalogField] ? state[catalogField].params.category : '',
    categories: state.categories.items,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Сортировка
    onSort: useCallback((sort: string) => {
      store.get(catalogField).setParams({sort, page: 1}, true, 'page');
    }, []),
    // Поиск
    onSearch: useCallback((query: string) => {
      store.get(catalogField).setParams({query, page: 1}, true, 'page');
    }, []),
    // Сброс
    onReset: useCallback(() => store.get(catalogField).resetParams(), []),
    // Фильтр по категории
    onCategory: useCallback((category: string) => {
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

    categories: useMemo(() => {
      return ([
        {value: '', title: 'Все'},
        ...treeToList(
          listToTree(select.categories),
          (item: ITree, level: number) => ({value: item._id, title: '- '.repeat(level) + item.title})
        )
      ])
    }, [select.categories]),
  }

  return (
    <LayoutFlex flex="start" indent="big">
      <Select onChange={callbacks.onCategory} value={select.category} options={options.categories}/>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" name={''}/>
      <Button onClick={callbacks.onReset} title={t('filter.reset')} submit={false}/>
    </LayoutFlex>
  );
}

export default React.memo(CatalogFilter);
