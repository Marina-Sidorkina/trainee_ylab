import React, {useCallback, useMemo} from "react";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import useTranslate from "@src/hooks/use-translate";
import Menu from "@src/components/navigation/menu";
import BasketSimple from "@src/components/catalog/basket-simple";
import LayoutFlex from "@src/components/layouts/layout-flex";
import CatalogButton from "@src/components/elements/catalog-button";
import {IState} from "@src/store/types";

function ToolsContainer(props: {article?: boolean, showBasket?: boolean}) {

  const store = useStore();

  const select = useSelector((state: IState) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => {
      store.get('modals').open('basket');
    }, []),
    openCatalogModal: useCallback(() => {
      store.get('modals').addModalElement('catalog');
    }, []),
  };

  const options = {
    menu: useMemo(() => ([
      {key: 1, title: t('menu.main'), link: '/'},
      {key: 2, title: t('menu.chat'), link: '/chat'},
      {key: 3, title: 'Canvas', link: '/canvas'},
    ]), [t]),
  }

  return (
    <LayoutFlex flex="between" indent="big">
      <Menu items={options.menu}/>
      {props.showBasket && <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
                     t={t}/>}
      {!props.article && <CatalogButton onClick={callbacks.openCatalogModal} title="Открыть новый каталог"/>}
    </LayoutFlex>
  );
}

export default React.memo(ToolsContainer);
