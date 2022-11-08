import React, {useCallback} from "react";
import CustomSelect from '@src/components/custom-select';
import LayoutFlex from "@src/components/layouts/layout-flex";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import {IState} from "@src/store/types";
import {IOption} from "@src/store/country/types";

function CustomSelectContainer() {
  const store = useStore();

  const select = useSelector((state: IState) => ({
    countyOptions: state.country.options,
    code: state.country.code,
    title: state.country.title,
  }));

  const callbacks = {
    onSelect: useCallback((value: {code: string; title: string;}) => {
      store.get('country').change({code: value.code, title: value.title});
    }, []),
  };

  return (
    <LayoutFlex bg='dark'>
      <CustomSelect showSearch={true}
                    currentSearchValue={''}
                    currentCode={select.code}
                    currentTitle={select.title}
                    onSelect={(current: {code: string; title: string;}) => callbacks.onSelect(current)}>
        {select.countyOptions.map((item: IOption) => (
            <CustomSelect.Option key={item.code}
                                 onSelect={() => {}}
                                 current={false}
                                 code={item.code}
                                 title={item.title}/>))}
      </CustomSelect>
    </LayoutFlex>
  )
}

export default React.memo(CustomSelectContainer);
