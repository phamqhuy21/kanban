import React from "react";
import { Button } from "antd";
import "./Header.css";
import Avatar from "antd/lib/avatar/avatar";

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
        <h1
          className="title-detail-board"
          style={{
            color: "#fff",
            marginBottom: 0,
            padding: "5px 10px",
            borderRadius: "3px",
          }}
        >
          {board.title}
        </h1>
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
        {board.members.map((member, index) => (
          <Avatar
            icon={<p>{member.alias}</p>}
            key={index}
            style={{ marginLeft: "10px", color: "#424242", fontWeight: "500" }}
          />
        ))}
        <Button
          style={{
            marginLeft: "10px",
            backgroundColor: "hsla(0,0%,100%,0.24)",
            border: "none",
          }}
          type="primary"
        >
          Thêm thành viên
        </Button>
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default Headers;
