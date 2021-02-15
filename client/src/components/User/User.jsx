import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Divider, Tabs } from "antd";
import "./User.css";
import Avatar from "antd/lib/avatar/avatar";
import InforUser from "./InforUser";
import UserAction from "./UserAction";
import { useHistory, useRouteMatch } from "react-router-dom";

User.propTypes = {};

const { TabPane } = Tabs;

function User(props) {
  const { user } = props;
  const [keyTabs, setKeyTabs] = useState();
  const match = useRouteMatch();
  let history = useHistory();

  useEffect(() => {
    if (match.path.includes("information")) {
      setKeyTabs("information");
    } else {
      setKeyTabs("activity");
    }
  }, [match.path]);

  return (
    <div style={{ width: "60vw", margin: "auto" }}>
      <div
        style={{
          padding: "20px 0",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,.07)",
          display: "block",
        }}
      >
        <Avatar
          icon={<p>{user.alias}</p>}
          size={150}
          style={{
            color: "#424242",
            fontWeight: "500",
            cursor: "context-menu",
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <p style={{ fontWeight: "bold", fontSize: "2em", marginBottom: "0" }}>
          {user.fullname}
        </p>
      </div>
      <Divider />
      <div className="card-container" style={{ minHeight: "50vh" }}>
        <Tabs
          type="card"
          activeKey={keyTabs}
          onChange={(key) => {
            history.push(match.path.replace(keyTabs, key));
          }}
        >
          <TabPane tab={<b>Hồ sơ</b>} key="information">
            <InforUser user={user} />
          </TabPane>
          <TabPane tab={<b>Hoạt động</b>} key="activity">
            <UserAction />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default User;
