import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LabelForm from "../../components/Board/AddToCard/LabelForm";
import { Button, Dropdown, message } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getLabelsBoardReq } from "../../redux/actions/label";
import { useRouteMatch } from "react-router-dom";
import { cloneDeep, findIndex } from "lodash";
import { updateCardTask } from "../../api/cardTask";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { getBoardDetailReq } from "../../redux/actions/boards";
import LabelCreateForm from "../../components/Board/AddToCard/LabelCreateForm";
import LabelUpdateForm from "../../components/Board/AddToCard/LabelUpdateForm";
import { createLabel, deleteLabel, updateLabel } from "../../api/label";
import { createAction } from "../../api/action";

ManageLabel.propTypes = {};

const style = {
  styleButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    marginBottom: "1vh",
  },
};

function ManageLabel(props) {
  const [mode, setMode] = useState("get");
  const [labelSelected, setLabelSelected] = useState();
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const labelsReducer = useSelector((state) => state.labelsReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleSelectLabel = async (label, card) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let labelId = label._id;
    let labelsCard = cloneDeep(card.labels);
    let index = findIndex(labelsCard, (labelCard) => {
      return labelCard._id === labelId;
    });
    if (index === -1) {
      await labelsCard.push(labelId);
    } else {
      await labelsCard.splice(index, 1);
    }
    let dataReq = {
      boardId,
      cardId,
      data: {
        labels: labelsCard,
      },
    };
    updateCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success(`Cập nhật thẻ ${card.title} thành công`);
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          dispatch(getLabelsBoardReq(boardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: `thêm một nhãn dán`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error(`Cập nhật thẻ ${card.title} thất bại`);
        }
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error(`Cập nhật thẻ ${card.title} thất bại`);
      });
  };

  const handleCreateLabel = async (card, title, color) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let dataReq = {
      boardId,
      cardId,
    };
    if (title) {
      dataReq.data = await {
        title,
        color,
      };
    } else {
      dataReq.data = await {
        color,
      };
    }
    console.log(dataReq);
    createLabel(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success("Tạo mới nhãn thành công");
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          dispatch(getLabelsBoardReq(boardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: `tạo mới một nhãn dán`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else message.error("Tạo mới nhãn thất bại");
      })
      .catch((err) => {
        message.error("Tạo mới nhãn thất bại");
      });
    setMode("get");
  };

  const handleModeCreate = () => {
    setMode("create");
  };

  const handleModeUpdate = (label) => {
    setLabelSelected(label);
    setMode("update");
  };

  const handleUpdateLabel = (label, title, color) => {
    let labelId = label._id;
    let boardId = match.params.id;
    let cardId = cardTaskReducer._id;
    let dataReq = {
      boardId,
      data: {
        title,
        color,
      },
    };
    updateLabel(labelId, dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success("Cập nhật nhãn thành công");
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          dispatch(getLabelsBoardReq(boardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: `chỉnh sửa nhãn dán`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else message.error("Cập nhật nhãn thất bại");
      })
      .catch((err) => {
        message.error("Cập nhật nhãn thất bại");
      });
    setMode("get");
  };

  const handleDeleteLabel = async (label) => {
    let boardId = match.params.id;
    let cardId = cardTaskReducer._id;
    let labelId = label._id;
    let labelsCard = await cloneDeep(cardTaskReducer.labels);
    let indexLabel = findIndex(labelsCard, (labelCard) => {
      return labelCard._id === labelId;
    });
    if (indexLabel !== -1) {
      await labelsCard.splice(indexLabel, 1);
      let dataReq = {
        boardId,
        cardId,
        data: {
          labels: labelsCard,
        },
      };
      updateCardTask(dataReq)
        .then((res) => {
          if (res.status === 200) {
            message.success(
              `Xoá nhãn trong thẻ ${cardTaskReducer.title} thành công`
            );
            dispatch(getBoardDetailReq(boardId));
            dispatch(getDataCardReq(boardId, cardId));
            dispatch(getLabelsBoardReq(boardId));
            createAction({
              boardId,
              cardId,
              data: {
                action: `xóa một nhãn dán`,
              },
            }).then((res) => {
              if (res.status === 200) {
                dispatch(getBoardDetailReq(boardId));
              }
            });
          } else {
            message.error(
              `Xoá nhãn trong thẻ ${cardTaskReducer.title} thất bại`
            );
          }
        })
        .catch((err) => {
          if (err.response) {
            message.error(err.response.data.message);
          } else
            message.error(
              `Xoá nhãn trong thẻ ${cardTaskReducer.title} thất bại`
            );
        });
    }
    deleteLabel(labelId, boardId)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          dispatch(getLabelsBoardReq(boardId));
          message.success(`Xoá nhãn thành công`);
        } else {
          message.error("Xoá nhãn thất bại");
        }
      })
      .catch((err) => {
        message.error("Xoá nhãn thất bại");
      });
    setMode("get");
  };

  const renderLabelForm = () => {
    let result = null;
    switch (mode) {
      case "get": {
        result = (
          <LabelForm
            card={cardTaskReducer}
            selectLabel={handleSelectLabel}
            handleModeCreate={handleModeCreate}
            handleModeUpdate={handleModeUpdate}
            labels={labelsReducer}
          />
        );
        break;
      }
      case "create": {
        result = (
          <LabelCreateForm
            handleCreateLabel={handleCreateLabel}
            card={cardTaskReducer}
          />
        );
        break;
      }
      case "update": {
        if (labelSelected) {
          result = (
            <LabelUpdateForm
              handleUpdateLabel={handleUpdateLabel}
              handleDeleteLabel={handleDeleteLabel}
              label={labelSelected}
            />
          );
        }
        break;
      }
      default:
        break;
    }
    return result;
  };

  return (
    <Dropdown
      overlay={<React.Fragment>{renderLabelForm()}</React.Fragment>}
      trigger="click"
      placement="bottomRight"
    >
      <Button style={style.styleButton}>
        <TagOutlined />
        Nhãn
      </Button>
    </Dropdown>
  );
}

export default ManageLabel;
