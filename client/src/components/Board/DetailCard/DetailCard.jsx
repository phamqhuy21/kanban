import React from "react";
import PropTypes from "prop-types";
import { Modal, Layout, Image } from "antd";

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
  const { stateCard, visible, handleCancel, children } = props;

  console.log(stateCard);

  return (
    <Modal
      className="modalCardDetail"
      title={
        <React.Fragment>
          {Object.keys(stateCard.background).length > 0 ? (
            <div style={{ backgroundColor: "#bdbdbd", textAlign: "center" }}>
              <Image width={200} src={stateCard.background.url} />
            </div>
          ) : null}
        </React.Fragment>
      }
      visible={visible}
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
