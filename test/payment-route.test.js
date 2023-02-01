const app = require("../server");
const Payment = require("../models/Payment");
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



  test("GET /payment/savepayment", async () => {
    const post = await Payment.create({ 
        paymentid:"",
        orderid: "order id 1",
        paymentdate:"payment date 1",
        paymentamount:"payment amount 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    });
  
    await supertest(app).get("/payment/allpayments")
      .expect(200)
      .then((response) => {
  
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].paymentid).toBe(post.paymentid);
        expect(response.body[0].orderid).toBe(post.orderid);
        expect(response.body[0].paymentdate).toBe(post.paymentdate);
        expect(response.body[0].paymentamount).toBe(post.paymentamount);
        expect(response.body[0].paymentmethod).toBe(post.paymentmethod);
        expect(response.body[0].paymentstatus).toBe(post.paymentstatus);
      });
  });

  test("POST /payment/savepayment", async () => {
    const data = { 
        paymentid: "",
        orderid: "order id 1",
        paymentdate:"payment date 1",
        paymentamount:"payment amount 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    };
  
    await supertest(app).post("/payment/savepayment")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.orderid).toBe(data.orderid);
        expect(response.body.paymentdate).toBe(data.paymentdate);
        expect(response.body.paymentamount).toBe(data.paymentamount);
        expect(response.body.paymentmethod).toBe(data.paymentmethod);
        expect(response.body.paymentstatus).toBe(data.paymentstatus);
  
        // Check data in the database
        const post = await Payment.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.orderid).toBe(data.orderid);
        expect(post.paymentdate).toBe(data.paymentdate);
        expect(post.paymentamount).toBe(data.paymentamount);
        expect(post.paymentmethod).toBe(data.paymentmethod);
        expect(post.paymentstatus).toBe(data.paymentstatus);
      });
  });

  test("GET /payment/specpaymentdid/:id", async () => {
    const post = await Payment.create({ 
        orderid: "order id 1",
        paymentdate:"payment date 1",
        paymentamount:"payment amount 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    });
  
    await supertest(app).get("/payment/specpaymentdid/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id);
        expect(response.body.orderid).toBe(post.orderid);
        expect(response.body.paymentdate).toBe(post.paymentdate);
        expect(response.body.paymentamount).toBe(post.paymentamount);
        expect(response.body.paymentmethod).toBe(post.paymentmethod);
        expect(response.body.paymentstatus).toBe(post.paymentstatus);
      });
  });

  test("DELETE /payment/delete/:id", async () => {
    const post = await Payment.create({
        orderid: "order id 1",
        paymentdate:"payment date 1",
        paymentamount:"payment amount 1",
        paymentmethod:"payment method 1",
        paymentstatus:"payment status 1"
    });
  
    await supertest(app)
      .delete("/payment/delete/" + post.id)
      .expect(204)
      .then(async () => {
        expect(await Payment.findOne({ _id: post.id })).toBeFalsy();
      });
  });