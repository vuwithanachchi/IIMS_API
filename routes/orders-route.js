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
        const expenses = await Orders.find(req.params);
        res.send(expenses);
        
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
          res.send({ data: true });
        } catch {
          res.status(404).send({ error: "comps not found!" });
        }
      });

module.exports = router;