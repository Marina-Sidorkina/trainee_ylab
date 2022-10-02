import React, {useCallback, useEffect} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useStore from "@src/hooks/use-store";
import {useParams} from "react-router-dom";
import useInit from "@src/hooks/use-init";
import useTranslate from "@src/hooks/use-translate";
import ArticleCard from "@src/components/catalog/article-card";
import Spinner from "@src/components/elements/spinner";
import Layout from "@src/components/layouts/layout";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import actionsArticle from '@src/store-redux/article/actions';
import ArticleListModal from "@src/containers/article-list-modal";
import useSelector from "@src/hooks/use-selector";

function Article(){
  const store = useStore();
  const params = useParams();
  const storeRedux = useStoreRedux();
  const modal = useSelector(state => state.modals.name);
  let onModalValueResolve;

  const openModal = new Promise((resolve) => {
    onModalValueResolve = (values) => {
      resolve(values)
    };
  });

  useEffect(() => {
    openModal
      .then((values) => {
        store.get('basket').addSeveralItemsToBasket(values);
      })
  }, [modal])

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting
  }), shallowEqual);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Открытие модального окна со списком
    openModal: useCallback(() => store.get('modals').open('article-modal'), []),
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={select.article.title || ''}/>
      <ToolsContainer article={true}/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article}
                     onAdd={callbacks.addToBasket}
                     t={t}
                     onModalOpen={callbacks.openModal}/>
      </Spinner>
      {modal === 'article-modal' && <ArticleListModal onClose={onModalValueResolve}/>}
    </Layout>
  )
}

export default React.memo(Article);
