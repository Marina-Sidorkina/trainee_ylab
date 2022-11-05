import React from "react";
import useTranslate from "@src/hooks/use-translate";
import LayoutHead from "@src/components/layouts/layout-head";
import LocaleSelect from "@src/containers/locale-select";

function HeadContainer(props: {title: string; showLanguage?: boolean;}) {

  const {t} = useTranslate();

  return (
    <LayoutHead title={t(props.title) ? t(props.title) : props.title}>
      {props.showLanguage && <LocaleSelect/>}
    </LayoutHead>
  );
}

export default React.memo(HeadContainer);
