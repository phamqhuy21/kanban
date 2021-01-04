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
import LabelForm from "./LabelForm";
import UploadImageForm from "./UploadImageForm";
import UploadFileForm from "./UploadFileForm";
import ExpirationDateForm from "./ExpirationDateForm";
import MemberForm from "./MemberForm";
import ManageLabel from "../../../containers/DetailCard/ManageLabel";
import MemberFormContainer from "../../../containers/AddToCard/MemberFormContainer";

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
  const {
    card,
    selectLabel,
    handleSaveExDate,
    handleDeleteExDate,
    handlePreviewFile,
    handlePreviewImg,
    handleDeleteGround,
  } = props;

  return (
    <div>
      <h3>Thêm vào thẻ</h3>
      <div>
        <MemberFormContainer />
        <ManageLabel />
        <Dropdown
          overlay={
            <ExpirationDateForm
              card={card}
              handleSaveExDate={handleSaveExDate}
              handleDeleteExDate={handleDeleteExDate}
            />
          }
          trigger="click"
        >
          <Button style={style.styleButton}>
            <FieldTimeOutlined /> Ngày hết hạn
          </Button>
        </Dropdown>
        <Dropdown
          overlay={
            <UploadFileForm card={card} handlePreviewFile={handlePreviewFile} />
          }
          trigger="click"
        >
          <Button style={style.styleButton}>
            <PaperClipOutlined />
            Đính kèm
          </Button>
        </Dropdown>
        <Dropdown
          overlay={
            <UploadImageForm
              card={card}
              handlePreviewImg={handlePreviewImg}
              handleDeleteGround={handleDeleteGround}
            />
          }
          trigger="click"
        >
          <Button style={style.styleButton}>
            <PictureOutlined />
            Ảnh bìa
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default AddToCard;
