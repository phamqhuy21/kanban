import React from "react";
import PropTypes from "prop-types";
import { Button, Dropdown } from "antd";
import {
  UserOutlined,
  TagOutlined,
  FieldTimeOutlined,
  PaperClipOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import UploadImageForm from "./UploadImageForm";
import UploadFileForm from "./UploadFileForm";
import ManageLabel from "../../../containers/DetailCard/ManageLabel";
import MemberFormContainer from "../../../containers/AddToCard/MemberFormContainer";
import DeadlineFormContainer from "../../../containers/AddToCard/DeadlineFormContainer";
import UploadFileContainer from "../../../containers/AddToCard/UploadFileContainer";
import UploadBackgroundContainer from "../../../containers/AddToCard/UploadBackgroundContainer";

AddToCard.propTypes = {
  card: PropTypes.object,
  selectLabel: PropTypes.func,
  handleSaveExDate: PropTypes.func,
  handleDeleteExDate: PropTypes.func,
  handlePreviewFile: PropTypes.func,
  handlePreviewImg: PropTypes.func,
  handleDeleteGround: PropTypes.func,
};

const style = {
  styleButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    marginBottom: "1vh",
  },
};

function AddToCard(props) {
  const { card } = props;

  return (
    <div>
      <h3>Thêm vào thẻ</h3>
      <div>
        <MemberFormContainer />
        <ManageLabel />
        <Dropdown
          overlay={<DeadlineFormContainer card={card} />}
          trigger="click"
        >
          <Button style={style.styleButton}>
            <FieldTimeOutlined /> Ngày hết hạn
          </Button>
        </Dropdown>
        <UploadFileContainer />
        <UploadBackgroundContainer />
      </div>
    </div>
  );
}

export default AddToCard;
