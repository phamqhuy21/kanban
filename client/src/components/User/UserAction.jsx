import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getActionUser } from "../../api/action";
import { Col, Divider, message, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { AlignLeftOutlined } from "@ant-design/icons";
import moment from "moment";

UserAction.propTypes = {};

function UserAction(props) {
  const [actions, setActions] = useState();

  useEffect(() => {
    getActionUser()
      .then((res) => {
        if (res.status === 200) {
          let data = res.data.data;
          setActions(data);
        } else {
          message.error("Lỗi không lấy được dữ liệu");
        }
      })
      .catch((err) => {
        message.error("Lỗi không lấy được dữ liệu");
      });
  }, []);

  return (
    <div>
      <Row style={{ fontWeight: "bold", fontSize: "1.5em" }}>
        <Col span={2} style={{ textAlign: "center" }}>
          <AlignLeftOutlined style={{ color: "#757575" }} />
        </Col>
        <Col span={22}>
          <p>Hoạt động</p>
          <Divider />
        </Col>
      </Row>
      <div>
        {actions
          ? actions.map((action, index) => (
              <Row key={index} style={{ padding: "6px 0" }}>
                <Col span={2} style={{ textAlign: "center" }}>
                  <Avatar>{action?.createdById?.alias}</Avatar>
                </Col>
                <Col span={22}>
                  <p style={{ marginBottom: "0" }}>
                    <b>Bạn</b> đã {action?.action}{" "}
                    {action?.card ? (
                      <span>
                        ở thẻ <b>{action?.card.title}</b>
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    trong bảng <b>{action?.board?.title}</b>
                  </p>
                  <p style={{ color: "#9e9e9e", fontSize: "0.9em" }}>
                    {moment()
                      .subtract(
                        (new Date().valueOf() -
                          new Date(action?.createdAt).valueOf()) /
                          60000,
                        "minutes"
                      )
                      .fromNow()}
                  </p>
                </Col>
              </Row>
            ))
          : null}
      </div>
    </div>
  );
}

export default UserAction;
