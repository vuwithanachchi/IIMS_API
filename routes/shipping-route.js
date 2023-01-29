var express = require('express');
const Shipping = require("../models/Shipping");
var router = express.Router();

router.get("/allship", async (req, res) => {
    try {
      const expenses = await Shipping.find();
      res.send(expenses);
    } catch (error) {
      // return res.status(500).json({ msg: "Sorry, something went wrong" });
      return error
    }
    });

router.get('/specshipid/:orderid',async (req,res)=>{
        const expenses = await Shipping.find(req.params);
        res.send(expenses);
        
    })

router.post('/saveship',async(req,res)=>{
        const data=await Shipping.create(req.body);
        res.send(data)
    })

router.get("/countship", async (req, res) => {

        let productCount = await Shipping.countDocuments();
    
        if(!productCount){
          // res.send(500).json({success:false})
          // res.status(500).send({ success:false });
        }
      
        res.send({productCount: productCount})
    
      });

router.patch("/updateship/:shippingid", async (req, res) => {
        try {
          const expenses = await Shipping.findOne(req.params);
          Object.assign(expenses, req.body);
          expenses.save();
          res.send( expenses );
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

router.delete("/deleteship/:shippingid", async (req, res) => {
        try {
          const expenses = await Shipping.findOne(req.params);
          await expenses.remove();
          res.send({ data: true });
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

module.exports = router;