import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import routes from "./routes/routes";
import GlobalMenuContainer from "./containers/GlobalMenu/GlobalMenuContainer";
import { Layout } from "antd";

const { Content } = Layout;

const style = {
  contentStyle: { background: "#fff" },
};

function App() {
  const showBody = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };

  return (
    <div style={{ height: "100vh" }}>
      <Layout>
        <GlobalMenuContainer />
        <Content style={style.contentStyle}>
          <Router>{showBody(routes)}</Router>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
