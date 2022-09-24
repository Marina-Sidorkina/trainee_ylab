import React, {useCallback} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import actionsCountry from "../../store-redux/country/actions";
import CustomSelect from '@src/components/custom-select';
import LayoutFlex from "@src/components/layouts/layout-flex";

function CustomSelectContainer() {
  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(state => ({
    countyOptions: state.country.options,
    code: state.country.code,
    title: state.country.title,
  }), shallowEqual);

  const callbacks = {
    onSelect: useCallback(({code, title}) => {
      storeRedux.dispatch(actionsCountry.change({code, title}));
    }, []),
  };

  return (
    <LayoutFlex bg='dark'>
      <CustomSelect showSearch={true}
                    currentSearchValue={''}
                    currentCode={select.code}
                    currentTitle={select.title}
                    onSelect={(current) => callbacks.onSelect(current)}>
        {select.countyOptions.map(item => (
            <CustomSelect.Option key={item.code}
                                 code={item.code}
                                 title={item.title}/>))}
      </CustomSelect>
    </LayoutFlex>
  )
}

export default React.memo(CustomSelectContainer);
