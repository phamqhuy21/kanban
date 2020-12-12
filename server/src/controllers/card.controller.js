const db = require("../models");
const List = db.list;
const Card = db.card;

exports.createCard = async (req, res) => {
  const listId = req.query.listId;
  const card = await new Card({
    createdById: req.userId,
    title: req.body.title || "",
    description: req.body.description || "",
    background: req.body.background || "",
    deadline: req.body.deadline || null,
  });
  await card.save((err, card) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (card) {
      return;
    }
  });
  await List.findByIdAndUpdate(
    listId,
    {
      $push: {
        cards: card._id,
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update List",
        });
        return;
      } else
        res.status(200).json({
          code: 200,
          message: "Add card and update list successfully",
        });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};
