import React, {useCallback, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useTranslate from "@src/hooks/use-translate";
import Layout from "@src/components/layouts/layout";
import LayoutFlex from "@src/components/layouts/layout-flex";
import Input from "@src/components/elements/input";
import Field from "@src/components/elements/field";
import ToolsContainer from "@src/containers/tools";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import useStore from "@src/hooks/use-store";
import useSelector from "@src/hooks/use-selector";
import Button from "@src/components/elements/button";
import {IState} from "@src/store/types";

// Login: test_7; Password: 123456

function Login() {
  const {t} = useTranslate();
  const store = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const select = useSelector((state: IState) => ({
    waiting: state.session.waiting,
    errors: state.session.errors
  }))

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const callbacks = {
    onChange: useCallback((value: string, name: string) => {
      setData(prevData => ({...prevData, [name]: value}));
    }, []),

    onSubmit: useCallback((e: any) => {
      e.preventDefault();
      store.get('session').signIn(data, () => {
        // Возврат на страницу, с которой пришли
        const back = (location.state as {[key: string]: any})?.back && (location.state as {[key: string]: any}).back !== location.pathname
          ? (location.state as {[key: string]: any}).back
          : '/';
        navigate(back);
      });
    }, [data, location.state])
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={'auth.title'} showLanguage={true}/>
      <ToolsContainer article={true}/>

      <LayoutFlex>
        <form onSubmit={callbacks.onSubmit}>
          <h2>{t('auth.title')}</h2>
          <Field label={t('auth.login')} error={select.errors?.login}>
            <Input name="login" onChange={callbacks.onChange}
                   value={data.login}/>
          </Field>
          <Field label={t('auth.password')} error={select.errors?.password}>
            <Input name="password" type="password" onChange={callbacks.onChange}
                   value={data.password}/>
          </Field>
          <Field error={select.errors?.other}/>
          <Field>
            <Button submit={true} title={t('auth.signIn')}/>
          </Field>
        </form>
      </LayoutFlex>
    </Layout>
  )
}

export default React.memo(Login);
