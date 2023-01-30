var express = require('express');
const Orders = require("../models/Orders");
var router = express.Router();

router.get("/allorders", async (req, res) => {
    try {
      const expenses = await Orders.find();
      res.send(expenses);
    } catch (error) {
      // return res.status(500).json({ msg: "Sorry, something went wrong" });
      return error
    }
    });

router.get('/specorderid/:userid',async (req,res)=>{
  try {
        const expenses = await Orders.find(req.params);
        res.send(expenses);
      } catch {
        res.status(404);
          res.send({ error: "Component doesn't exist!" });
        }
        
    })

router.get('/specorderdid/:id',async (req,res)=>{
      try {
        const post = await Orders.findOne({ _id: req.params.id });
        res.send(post);
      } catch {
        res.status(404);
        res.send({ error: "Component doesn't exist!" });
      }
      
    })

router.post('/saveorder',async(req,res)=>{
        const data=await Orders.create(req.body);
        res.send(data)
    })

router.get("/countorder", async (req, res) => {

        let productCount = await Orders.countDocuments();
    
        if(!productCount){
          // res.send(500).json({success:false})
          // res.status(500).send({ success:false });
        }
      
        res.send({productCount: productCount})
    
      });

router.patch("/updateorder/:orderid", async (req, res) => {
        try {
          const expenses = await Orders.findOne(req.params);
          Object.assign(expenses, req.body);
          expenses.save();
          res.send( expenses );
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

router.delete("/deleteorder/:orderid", async (req, res) => {
        try {
          const expenses = await Orders.findOne(req.params);
          await expenses.remove();
          res.status(204).send();
          // res.send({ data: true });
        } catch {
          res.status(404);
          res.send({ error: "Component doesn't exist!" });
        }
      });

router.delete("/delete/:id", async (req, res) => {
        try {
          await Orders.deleteOne({ _id: req.params.id });
          res.status(204).send();
        } catch {
          res.status(404);
          res.send({ error: "Component doesn't exist!" });
        }
      });

module.exports = router;