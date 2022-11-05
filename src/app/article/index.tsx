import React, {useCallback} from "react";
import useStore from "@src/hooks/use-store";
import {useParams} from "react-router-dom";
import useInit from "@src/hooks/use-init";
import ArticleCard from "@src/components/catalog/article-card";
import Spinner from "@src/components/elements/spinner";
import Layout from "@src/components/layouts/layout";
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import ToolsContainer from "@src/containers/tools";
import useSelector from "@src/hooks/use-selector";
import {IState} from "@src/store/types";

function Article(){
  const store = useStore();
  const params = useParams() as {id: never};

  useInit(async () => {
   if (params.id) await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector((state: IState) => ({
    article: state.article.data,
    waiting: state.article.waiting
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id: string) => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={select.article.title || ''}/>
      <ToolsContainer article={true}/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article}
                     onAdd={callbacks.addToBasket} />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
