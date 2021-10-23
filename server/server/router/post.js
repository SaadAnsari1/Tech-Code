const express = require('express');
const multer = require('multer')
const authenticate = require("../middleware/Authenticate")
require('../db/conn')
const News = require('../model/News')
const ejs = require('ejs')
const path = require('path')


const router = new express.Router();


router.post("/demo", async (rep, res) => {
  res.send('test')
}
);



//ROUTE 1: Add a new News using: POST Api
router.post("/News", async (rep, res) => {
  try {
    const news = new News(rep.body);
    const addNews = await news.save();
    res.status(201).send(addNews);
  } catch (e) {
    res.status(401).send(e, "Error is post");
  }
});
//ROUTE 2: Get a News using: GET Api
router.get("/News", async (rep, res) => {
  try {
    const getData = await News.find({}).sort({ ranking: 1 });
    res.status(200).send(getData);
  } catch (e) {
    res.status(401).send(e, "Error is Get");
  }
});
//ROUTE 3: Get 1 News using: GET Api
router.get("/News/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await News.findById(_id);
    if (!data) {
      return res.status(404).send();
    } else {
      res.send(data);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
//ROUTE 4: Update a News using: PATCH Api
router.patch("/News/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const Update = await News.findByIdAndUpdate(_id, req.body, { new: true });
    res.send(Update);
  } catch (e) {
    res.status(500).send(e);
  }
});
// //ROUTE 5: Update a News using: PUT Api
// router.put("/News/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const FullUpdate = await News.findByIdAndUpdate(_id, req.body);
//     res.send(FullUpdate);
//   } catch (e) {
//     res.status(404).send(e);
//   }
// });
//ROUTE 6: Delete a News using: DELETE Api
router.delete("/News/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const Delete = await News.findByIdAndDelete(_id);
    res.send(Delete);
  } catch (e) {
    res.status(500).send(e);
  }
});


module.exports = router
