import React from "react";
import useTranslate from "@src/hooks/use-translate";
import LayoutHead from "@src/components/layouts/layout-head";
import LocaleSelect from "@src/containers/locale-select";
import PropTypes from "prop-types";

function HeadContainer(props) {

  const {t} = useTranslate();

  return (
    <LayoutHead title={t(props.title)}>
      {props.showLanguage && <LocaleSelect/>}
    </LayoutHead>
  );
}

HeadContainer.propTypes = {
  title: PropTypes.string,
  showLanguage: PropTypes.bool,
}

HeadContainer.defaultProps = {
  title: 'title',
  showLanguage: true,
}

export default React.memo(HeadContainer);
