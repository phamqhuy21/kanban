import React from "react";
import { Badge, Button, Dropdown, Popover } from "antd";
import "./Header.css";
import Avatar from "antd/lib/avatar/avatar";
import ActionBoard from "./ActionBoard";
import ActionBoardContainer from "../../containers/Header/ActionBoardContainer";
import {
  CheckOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AddMemberContainer from "../../containers/Header/AddMemberContainer";
import TitleBoardContainer from "../../containers/Header/TitleBoardContainer";
import MemberContainer from "../../containers/Header/MemberContainer";
import StatusBoardContainer from "../../containers/Header/StatusBoardContainer";

function Headers(props) {
  const { board } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <TitleBoardContainer board={board} />
        <p
          style={{
            marginBottom: 0,
            padding: "5px 10px",
            marginLeft: "10px",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "3px",
          }}
        >
          {board.members.length === 1 ? "Cá nhân" : "Nhóm"}
        </p>
        <MemberContainer />
        <AddMemberContainer />
      </div>
      <div>
        <StatusBoardContainer />
        <Popover
          content={<ActionBoardContainer />}
          trigger="click"
          placement="bottomRight"
        >
          <Button
            style={{
              marginLeft: "10px",
              backgroundColor: "hsla(0,0%,100%,0.24)",
              border: "none",
            }}
            type="primary"
          >
            Hoạt động
          </Button>
        </Popover>
      </div>
    </div>
  );
}

export default Headers;
