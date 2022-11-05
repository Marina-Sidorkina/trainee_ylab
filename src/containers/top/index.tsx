import React, {useCallback} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useTranslate from "@src/hooks/use-translate";
import LayoutFlex from "@src/components/layouts/layout-flex";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";
import Button from "@src/components/elements/button";
import {IState} from "@src/store/types";

function TopContainer() {

  const {t} = useTranslate();

  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector((state: IState) => ({
    user: state.session.user,
    exists: state.session.exists
  }))

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.get('session').signOut();
    }, [location.pathname]),
  };

  return (
    <LayoutFlex flex="end" indent="small">
      {select.exists && <Link to="/profile">{select.user.profile.name}</Link>}
      {select.exists
        ? <Button onClick={callbacks.onSignOut} title={t('session.signOut')} submit={false}/>
        : <Button onClick={callbacks.onSignIn} title={t('session.signIn')} submit={false}/>
      }
    </LayoutFlex>
  );
}

export default React.memo(TopContainer);
