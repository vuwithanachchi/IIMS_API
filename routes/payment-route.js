var express = require('express');
const Payment = require("../models/Payment");
var router = express.Router();

router.get("/allpayments", async (req, res) => {
    try {
      const expenses = await Payment.find();
      res.send(expenses);
    } catch (error) {
      // return res.status(500).json({ msg: "Sorry, something went wrong" });
      return error
    }
    });

router.get('/specpaymentid/:orderid',async (req,res)=>{
  try {
        const expenses = await Payment.find(req.params);
        res.send(expenses);
      } catch {
        res.status(404);
          res.send({ error: "Component doesn't exist!" });
        }
    })

 router.get('/specpaymentdid/:id',async (req,res)=>{
      try {
        const post = await Payment.findOne({ _id: req.params.id });
        res.send(post);
      } catch {
        res.status(404);
        res.send({ error: "Component doesn't exist!" });
      }
      
    })

router.post('/savepayment',async(req,res)=>{
        const data=await Payment.create(req.body);
        res.send(data)
    })

router.get("/countpayment", async (req, res) => {

        let productCount = await Payment.countDocuments();
    
        if(!productCount){
          // res.send(500).json({success:false})
          // res.status(500).send({ success:false });
        }
      
        res.send({productCount: productCount})
    
      });

router.patch("/updatepayment/:paymentid", async (req, res) => {
        try {
          const expenses = await Payment.findOne(req.params);
          Object.assign(expenses, req.body);
          expenses.save();
          res.send( expenses );
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

router.delete("/deletepayment/:paymentid", async (req, res) => {
        try {
          const expenses = await Payment.findOne(req.params);
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
          await Payment.deleteOne({ _id: req.params.id });
          res.status(204).send();
        } catch {
          res.status(404);
          res.send({ error: "Component doesn't exist!" });
        }
      });

module.exports = router;