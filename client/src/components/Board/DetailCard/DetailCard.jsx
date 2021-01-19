import React from "react";
import PropTypes from "prop-types";
import { Modal, Layout, Image, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

DetailCard.propTypes = {
  stateCard: PropTypes.shape({
    groundImage: PropTypes.string,
    content: PropTypes.string,
    exDate: PropTypes.object,
  }),
  visible: PropTypes.bool,
  user: PropTypes.arrayOf(PropTypes.object),
  handleCancel: PropTypes.func,
  addComment: PropTypes.func,
  handleCheckSuccess: PropTypes.func,
};

const style = {
  titleStyle: {
    marginTop: "3vh",
    marginBottom: "2vh",
    paddingLeft: "1.5vw",
    paddingTop: "2vh",
    paddingBottom: "2vh",
  },
  bodyModalStyle: { padding: "1vh", backgroundColor: "#f5f5f5" },
};

function DetailCard(props) {
  const {
    stateCard,
    visible,
    handleCancel,
    children,
    handleDeleteGround,
  } = props;

  return (
    <Modal
      className="modalCardDetail"
      title={
        <React.Fragment>
          {Object.keys(stateCard.background).length > 0 ? (
            <div
              style={{
                backgroundColor: "#8d6e63",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Button
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "hsla(0,0%,100%,.2)",
                  border: "none",
                }}
                onClick={handleDeleteGround}
              >
                <i className="fas fa-trash-alt"></i>
              </Button>
              <Image width={200} src={stateCard.background.url} />
            </div>
          ) : (
            <div style={{ height: "20px", backgroundColor: "#f5f5f5" }}></div>
          )}
        </React.Fragment>
      }
      visible={visible}
      closeIcon={
        <CloseOutlined
          style={{
            position: "absolute",
            top: 0,
            padding: "1vh 0",
            color:
              Object.keys(stateCard.background).length > 0 ? "#fff" : "#757575",
          }}
        />
      }
      onCancel={handleCancel}
      footer={false}
      width="60vw"
      bodyStyle={style.bodyModalStyle}
    >
      <Layout>{children}</Layout>
    </Modal>
  );
}

export default DetailCard;
