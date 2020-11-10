import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button, Comment } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";

Activity.propTypes = {
  card: PropTypes.shape({
    action: PropTypes.arrayOf(PropTypes.string),
  }),
  user: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

const style = {
  btnDetailStyle: {
    backgroundColor: "#eeeeee",
    color: "#212121",
    border: "none",
  },
  headerCardStyle: { padding: "0 1vw", border: "none" },
  cardStyle: { backgroundColor: "#f5f5f5" },
  bodyCardStyle: { padding: "0 0.5vw" },
  commentStyle: { paddingLeft: "1.2vw" },
  authorStlye: { color: "black" },
  contentStyle: { color: "black" },
};

function Activity(props) {
  const { card, user } = props;
  const [visible, setVisible] = useState(false);
  return (
    <Card
      title={
        <Row>
          <Col span={2}>
            <UnorderedListOutlined />
          </Col>
          <Col span={22}>
            <span>Hoạt động</span>
          </Col>
        </Row>
      }
      extra={
        <Button
          type="primary"
          style={style.btnDetailStyle}
          onClick={() => setVisible(!visible)}
        >
          {visible === true ? "Ẩn chi tiết" : "Hiện chi tiết"}
        </Button>
      }
      headStyle={style.headerCardStyle}
      style={style.cardStyle}
      bodyStyle={style.bodyCardStyle}
      bordered={false}
    >
      {card.action.length > 0 && visible === true
        ? card.action.map((action, index) => {
            return (
              <Comment
                className="comment-action"
                style={style.commentStyle}
                key={index}
                author={<b style={style.authorStlye}>{user[0].name}</b>}
                avatar={<Avatar>{user[0].alias}</Avatar>}
                content={<p style={style.contentStyle}>{action}</p>}
              />
            );
          })
        : null}
    </Card>
  );
}

export default Activity;
