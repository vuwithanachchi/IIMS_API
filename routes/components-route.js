var express = require('express');
const Component = require("../models/Component");
var router = express.Router();


router.get("/allcomps", async (req, res) => {
  try {
    const expenses = await Component.find();
    res.send(expenses);
  } catch (error) {
    // return res.status(500).json({ msg: "Sorry, something went wrong" });
    return error
  }
  });
  
router.get("/pagecomps", async (req, res) => {
    
  try {
    console.log(req.query)
    const pageNumber = parseInt(req.query.pageIndex) || 0;
    const limit = parseInt(req.query.pageSize) || 10;
    const result = {};
    const totalPosts = await Component.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPosts = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Component.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Component.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    return res.json({ msg: "Posts Fetched successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Sorry, something went wrong" });
  }
});

router.get('/speccomps/:componetName',async (req,res)=>{
  const expenses = await Component.find(req.params);
  res.send(expenses);
  
})

router.get('/speccompsid/:componetID',async (req,res)=>{
  const expenses = await Component.find(req.params);
  res.send(expenses);
  
})

router.get('/speccompsd/:id',async (req,res)=>{
  try {
    const post = await Component.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Component doesn't exist!" });
  }
  
})


  router.post('/savecomp',async(req,res)=>{
    const data=await Component.create(req.body);
    res.send(data)
})

  router.get("/countcomps", async (req, res) => {

    let productCount = await Component.countDocuments();

    if(!productCount){
      // res.send(500).json({success:false})
      // res.status(500).send({ success:false });
    }
  
    res.send({productCount: productCount})

  });

  router.patch("/updatecomps/:componetID", async (req, res) => {
    try {
      const expenses = await Component.findOne(req.params);
      Object.assign(expenses, req.body);
      expenses.save();
      res.send( expenses );
    } catch {
      res.status(404).send({ error: "comps not found!" });
    }
  });

  router.patch("/updatecomp/:id", async (req, res) => {
    try {
      const post = await Component.findOne({ _id: req.params.id });
  
      if (req.body.componetName) {
        post.componetName = req.body.componetName;
      }
  
      if (req.body.componetDesc) {
        post.componetDesc = req.body.componetDesc;
      }
      if (req.body.imageURL) {
        post.imageURL = req.body.imageURL;
      }
  
      if (req.body.qty) {
        post.qty = req.body.qty;
      }
      if (req.body.unitPrice) {
        post.unitPrice = req.body.unitPrice;
      }
  
      if (req.body.componetCode) {
        post.componetCode = req.body.componetCode;
      }
  
      await post.save();
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Component doesn't exist!" });
    }

    // try {
    //   const expenses = await Component.findOne({ _id: req.params.id });
    //   Object.assign(expenses, req.body);
    //   expenses.save();
    //   res.send( expenses );
    // } catch {
    //   res.status(404).send({ error: "comps not found!" });
    // }
  });

  router.delete("/deletecomps/:componetID", async (req, res) => {
    try {
      const expenses = await Component.findOne(req.params);
      await expenses.remove();
      res.send({ data: true });
    } catch {
      res.status(404).send({ error: "comps not found!" });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      await Component.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Component doesn't exist!" });
    }
  });

  
  

module.exports = router;