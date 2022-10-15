import React from "react";
import ToolsContainer from "@src/containers/tools";
import Layout from "@src/components/layouts/layout";
import HeadContainer from "@src/containers/head";
import CanvasContainer from "@src/containers/canvas";

function Canvas() {

  return (
    <Layout>
      <HeadContainer title={'Canvas'} showLanguage={false}/>
      <ToolsContainer article={true} showBasket={false}/>
      <CanvasContainer />
    </Layout>
  )
}

export default React.memo(Canvas);
