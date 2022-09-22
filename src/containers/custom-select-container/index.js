import React, {useCallback} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useInit from "../../hooks/use-init";
import CustomSelect from '@src/components/custom-select';
import LayoutFlex from "@src/components/layouts/layout-flex";

const mock = [
  {
    code: 'RU',
    title: 'Россия'
  },
  {
    code: 'GD',
    title: 'Германия',
  },
  {
    code: 'CH',
    title: 'Чехия',
  },
  {
    code: 'FR',
    title: 'Франция',
  },
  {
    code: 'BE',
    title: 'Бельгия',
  },
  {
    code: 'BY',
    title: 'Беларусь',
  },
  {
    code: 'BM',
    title: 'Бермуды',
  },
]

function CustomSelectContainer() {
  const storeRedux = useStoreRedux();

  useInit(async () => {
  }, []);

  const select = useSelectorRedux(state => ({

  }), shallowEqual);

  const callbacks = {
    // Поиск
    onSearch: useCallback((value) => console.log(value), []),
  };

  return (
    <LayoutFlex bg='dark'>
      <CustomSelect.Container>
        <CustomSelect.Control>
          <CustomSelect.Item code={mock[0].code} title={mock[0].title} current={false} hover={false}/>
        </CustomSelect.Control>
        <CustomSelect.Dropdown>
          <CustomSelect.Search onChange={callbacks.onSearch}/>
         <CustomSelect.List data={mock} currentCode={'RU'} />
        </CustomSelect.Dropdown>
      </CustomSelect.Container>
    </LayoutFlex>
  )
}

export default React.memo(CustomSelectContainer);
