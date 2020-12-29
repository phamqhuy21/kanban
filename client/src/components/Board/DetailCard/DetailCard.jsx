import React from "react";
import PropTypes from "prop-types";
import { Modal, Layout, Image } from "antd";
import Description from "./Description";
import Activity from "../Activity/Activity";
import Manipulation from "../Manupulation/Manipulation";
import Label from "./Label";
import ExpirationDate from "./ExpirationDate";
import Comments from "./Comment";
import AddToCardContainer from "../../../containers/AddToCardContainer";
import DescriptionContainer from "../../../containers/DetailCard/DescriptionContainer";

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
  bodyModalStyle: { padding: "1vh", backgroundColor: "#f5f5f5" },
  contentStyle: { backgroundColor: "#f5f5f5" },
  coverItemStyle: {
    display: "flex",
    paddingLeft: "1vw",
    backgroundColor: "#f5f5f5",
  },
  siderStyle: { backgroundColor: "#f5f5f5" },
};

const { Content, Sider } = Layout;

function DetailCard(props) {
  const {
    stateCard,
    visible,
    handleCancel,
    user,
    addComment,
    handleCheckSuccess,
  } = props;

  console.log(stateCard);

  return (
    <Modal
      className="modalCardDetail"
      title={
        <React.Fragment>
          {/* {stateCard.groundImage.length > 0 ? (
            <div style={{ backgroundColor: "#bdbdbd", textAlign: "center" }}>
              <Image width={200} src={stateCard.groundImage} />
            </div>
          ) : null} */}
          <h2
            style={{
              marginTop: "3vh",
              marginBottom: "2vh",
              paddingLeft: "1.5vw",
              paddingTop: "2vh",
              paddingBottom: "2vh",
            }}
          >
            {stateCard.title}
          </h2>
        </React.Fragment>
      }
      visible={visible}
      onCancel={handleCancel}
      footer={false}
      width="60vw"
      bodyStyle={style.bodyModalStyle}
    >
      <Layout>
        <Content>
          <div style={style.coverItemStyle}>
            {stateCard.labels.length > 0 ? <Label card={stateCard} /> : null}
            {/* {Object.keys(stateCard.exDate).length > 0 ? (
              <ExpirationDate
                card={stateCard}
                handleCheckSuccess={handleCheckSuccess}
              />
            ) : null} */}
          </div>
          <DescriptionContainer card={stateCard} />
          {/* <Activity card={stateCard} user={user} />
          <Comments user={user} addComment={addComment} card={stateCard} /> */}
        </Content>
        <Sider style={style.siderStyle}>
          <AddToCardContainer card={stateCard} />
          <Manipulation card={stateCard} />
        </Sider>
      </Layout>
    </Modal>
  );
}

export default DetailCard;
