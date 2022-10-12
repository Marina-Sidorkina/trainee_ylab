import React from 'react';
import TopContainer from "@src/containers/top";
import HeadContainer from "@src/containers/head";
import Layout from "@src/components/layouts/layout";
import useTranslate from "@src/hooks/use-translate";
import ToolsContainer from "@src/containers/tools";
import ChatContainer from "@src/containers/chat";

function Chat() {
  const {t} = useTranslate();

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={t('menu.chat')}/>
      <ToolsContainer article={true}/>
      <ChatContainer />
    </Layout>
  )
}

export default React.memo(Chat);
