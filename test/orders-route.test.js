const app = require("../server");
const Order = require("../models/Orders");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
    mongoose.connect("mongodb+srv://vihangiwithanachchi:plImP6NSM9se7VUU@iimsdb.xcmltb8.mongodb.net/iims-db",
      { 
        useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
      },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });



  test("GET /order/saveorder", async () => {
    const post = await Order.create({ 
        orderid:"",
        userid: "user id 1",
        orderdate:"order date 1",
        orderamount:"order amount 1",
        orderstatus:"order tatus 1",
        sippingaddress:"sipping address 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    });
  
    await supertest(app).get("/order/allorders")
      .expect(200)
      .then((response) => {
  
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].orderid).toBe(post.orderid);
        expect(response.body[0].userid).toBe(post.userid);
        expect(response.body[0].orderdate).toBe(post.orderdate);
        expect(response.body[0].orderamount).toBe(post.orderamount);
        expect(response.body[0].orderstatus).toBe(post.orderstatus);
        expect(response.body[0].sippingaddress).toBe(post.sippingaddress);
        expect(response.body[0].paymentmethod).toBe(post.paymentmethod);
        expect(response.body[0].paymentstatus).toBe(post.paymentstatus);
      });
  });

  test("POST /order/saveorder", async () => {
    const data = { 
        userid: "user id 1",
        orderdate:"order date 1",
        orderamount:"order amount 1",
        orderstatus:"order tatus 1",
        sippingaddress:"sipping address 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    };
  
    await supertest(app).post("/order/saveorder")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.userid).toBe(data.userid);
        expect(response.body.orderdate).toBe(data.orderdate);
        expect(response.body.orderamount).toBe(data.orderamount);
        expect(response.body.orderstatus).toBe(data.orderstatus);
        expect(response.body.sippingaddress).toBe(data.sippingaddress);
        expect(response.body.paymentmethod).toBe(data.paymentmethod);
        expect(response.body.paymentstatus).toBe(data.paymentstatus);
  
        // Check data in the database
        const post = await Order.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.userid).toBe(data.userid);
        expect(post.orderdate).toBe(data.orderdate);
        expect(post.orderamount).toBe(data.orderamount);
        expect(post.orderstatus).toBe(data.orderstatus);
        expect(post.sippingaddress).toBe(data.sippingaddress);
        expect(post.paymentmethod).toBe(data.paymentmethod);
        expect(post.paymentstatus).toBe(data.paymentstatus);
      });
  });

  test("GET /order/specorderdid/:id", async () => {
    const post = await Order.create({ 
        userid: "user id 1",
        orderdate:"order date 1",
        orderamount:"order amount 1",
        orderstatus:"order tatus 1",
        sippingaddress:"sipping address 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    });
  
    await supertest(app).get("/order/specorderdid/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id); 
        expect(response.body.userid).toBe(post.userid);
        expect(response.body.orderdate).toBe(post.orderdate);
        expect(response.body.orderamount).toBe(post.orderamount);
        expect(response.body.orderstatus).toBe(post.orderstatus);
        expect(response.body.sippingaddress).toBe(post.sippingaddress);
        expect(response.body.paymentmethod).toBe(post.paymentmethod);
        expect(response.body.paymentstatus).toBe(post.paymentstatus);
      });
  });

  test("DELETE /order/delete/:id", async () => {
    const post = await Order.create({
        userid: "user id 1",
        orderdate:"order date 1",
        orderamount:"order amount 1",
        orderstatus:"order tatus 1",
        sippingaddress:"sipping address 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    });
  
    await supertest(app)
      .delete("/order/delete/" + post.id)
      .expect(204)
      .then(async () => {
        expect(await Order.findOne({ _id: post.id })).toBeFalsy();
      });
  });