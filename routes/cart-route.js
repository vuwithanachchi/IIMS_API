var express = require('express');
const Cart = require("../models/Cart");
var router = express.Router();

router.get("/allcart", async (req, res) => {
    try {
      const expenses = await Cart.find();
      res.send(expenses);
    } catch (error) {
      // return res.status(500).json({ msg: "Sorry, something went wrong" });
      return error
    }
    });

router.get('/speccartid/:userid',async (req,res)=>{
        const expenses = await Cart.find(req.params);
        res.send(expenses);
        
    })

router.post('/savecart',async(req,res)=>{
        const data=await Cart.create(req.body);
        res.send(data)
    })

router.get("/countcart", async (req, res) => {

        let productCount = await Cart.countDocuments();
    
        if(!productCount){
          // res.send(500).json({success:false})
          // res.status(500).send({ success:false });
        }
      
        res.send({productCount: productCount})
    
      });

router.patch("/updatecart/:cartid", async (req, res) => {
        try {
          const expenses = await Cart.findOne(req.params);
          Object.assign(expenses, req.body);
          expenses.save();
          res.send( expenses );
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

router.delete("/deletecart/:cartid", async (req, res) => {
        try {
          const expenses = await Cart.findOne(req.params);
          await expenses.remove();
          res.send({ data: true });
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

module.exports = router;