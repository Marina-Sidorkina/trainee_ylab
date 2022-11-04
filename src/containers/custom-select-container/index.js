import React, {useCallback} from "react";
import CustomSelect from '@src/components/custom-select';
import LayoutFlex from "@src/components/layouts/layout-flex";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";

function CustomSelectContainer() {
  const store = useStore();

  const select = useSelector(state => ({
    countyOptions: state.country.options,
    code: state.country.code,
    title: state.country.title,
  }));

  const callbacks = {
    onSelect: useCallback(({code, title}) => {
      store.get('country').change({code, title});
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
