import React from "react";
import ToolsContainer from "@src/containers/tools";
import Layout from "@src/components/layouts/layout";
import HeadContainer from "@src/containers/head";
import CanvasOOPContainer from "@src/containers/canvas-oop";

function Canvas() {

  return (
    <Layout>
      <HeadContainer title={'Canvas'} showLanguage={false}/>
      <ToolsContainer article={true} showBasket={false}/>
      <CanvasOOPContainer />
    </Layout>
  )
}

export default React.memo(Canvas);
