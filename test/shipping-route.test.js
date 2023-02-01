const app = require("../server");
const Ship = require("../models/Shipping");
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



  test("GET /ship/saveship", async () => {
    const post = await Ship.create({ 
        shippingid:"",
        orderid: "order id 1",
        shippingdate:"shipping date 1",
        shippingaddress:"shipping address 1",
        trackingnumber:"tracking number 1",
        shippingstatus:"shipping status 1"
    });
  
    await supertest(app).get("/ship/allship")
      .expect(200)
      .then((response) => {
  
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        // expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].shippingid).toBe(post.shippingid);
        expect(response.body[0].orderid).toBe(post.orderid);
        expect(response.body[0].shippingdate).toBe(post.shippingdate);
        expect(response.body[0].shippingaddress).toBe(post.shippingaddress);
        expect(response.body[0].trackingnumber).toBe(post.trackingnumber);
        expect(response.body[0].shippingstatus).toBe(post.shippingstatus);
      });
  });

  test("POST /ship/saveship", async () => {
    const data = { 
        orderid: "order id 1",
        shippingdate:"shipping date 1",
        shippingaddress:"shipping address 1",
        trackingnumber:"tracking number 1",
        shippingstatus:"shipping status 1"
    };
  
    await supertest(app).post("/ship/saveship")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.orderid).toBe(data.orderid);
        expect(response.body.shippingdate).toBe(data.shippingdate);
        expect(response.body.shippingaddress).toBe(data.shippingaddress);
        expect(response.body.trackingnumber).toBe(data.trackingnumber);
        expect(response.body.shippingstatus).toBe(data.shippingstatus);
  
        // Check data in the database
        const post = await Ship.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.orderid).toBe(data.orderid);
        expect(post.shippingdate).toBe(data.shippingdate);
        expect(post.shippingaddress).toBe(data.shippingaddress);
        expect(post.trackingnumber).toBe(data.trackingnumber);
        expect(post.shippingstatus).toBe(data.shippingstatus);
      });
  });

  test("GET /ship/specshipdid/:id", async () => {
    const post = await Ship.create({ 
        orderid: "order id 1",
        shippingdate:"shipping date 1",
        shippingaddress:"shipping address 1",
        trackingnumber:"tracking number 1",
        shippingstatus:"shipping status 1"  
    });
  
    await supertest(app).get("/ship/specshipdid/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id);
        expect(response.body.orderid).toBe(post.orderid);
        expect(response.body.shippingdate).toBe(post.shippingdate);
        expect(response.body.shippingaddress).toBe(post.shippingaddress);
        expect(response.body.trackingnumber).toBe(post.trackingnumber);
        expect(response.body.shippingstatus).toBe(post.shippingstatus);
      });
  });

  test("DELETE /ship/delete/:id", async () => {
    const post = await Ship.create({
        orderid: "order id 1",
        shippingdate:"shipping date 1",
        shippingaddress:"shipping address 1",
        trackingnumber:"tracking number 1",
        shippingstatus:"shipping status 1"
    });
  
    await supertest(app)
      .delete("/ship/delete/" + post.id)
      .expect(204)
      .then(async () => {
        expect(await Ship.findOne({ _id: post.id })).toBeFalsy();
      });
  });