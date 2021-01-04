import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import routes from "./routes/routes";
import { Layout } from "antd";
import { useSelector } from "react-redux";

const style = {
  coverStyle: { height: "100vh" },
};

function App() {
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
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
    <div style={style.coverStyle}>
      <Layout style={{ backgroundColor: detailBoardReducer?.backgroundColor }}>
        <Router>{showBody(routes)}</Router>
      </Layout>
    </div>
  );
}

export default App;
