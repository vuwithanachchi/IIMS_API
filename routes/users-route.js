var express = require('express');
const User = require("../models/User");
var router = express.Router();

router.get("/allusers", async (req, res) => {
  try {
    const expenses = await User.find();
    res.send(expenses);
  } catch (error) {
    // return res.status(500).json({ msg: "Sorry, something went wrong" });
    return error
  }
  });
  
router.get('/specuser/:username',async (req,res)=>{
  console.log(req.params.username)
  const expenses = await User.find(req.params);
  res.send(expenses);
  
})

router.get('/specsuser/:id',async (req,res)=>{
  try {
    const post = await User.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
  
})

router.get("/countusers", async (req, res) => {

  let productCount = await User.countDocuments();

  if(!productCount){
    res.send(500).json({success:false})
  }

  res.send({productCount: productCount})

});

  router.post('/saveuser',async(req,res)=>{
    const data=await User.create(req.body);
    res.send(data)
})


  router.delete("/delete/:id", async (req, res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "User doesn't exist!" });
    }
  });

  
  

module.exports = router;