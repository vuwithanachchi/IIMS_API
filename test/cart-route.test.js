const app = require("../server");
const Cart = require("../models/Cart");
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



  test("GET /cart/savecart", async () => {
    const post = await Cart.create({ 
        cartid:"",
        userid: "user id 1",
        imageURL:"image URL 1",
        componetID:"componet ID 1",
        componetName:"componet Name 1",
        quantity:"10"

        
    });
  
    await supertest(app).get("/cart/allcart")
      .expect(200)
      .then((response) => {
  
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].cartid).toBe(post.cartid);
        expect(response.body[0].userid).toBe(post.userid);
        expect(response.body[0].imageURL).toBe(post.imageURL);
        expect(response.body[0].componetID).toBe(post.componetID);
        expect(response.body[0].componetName).toBe(post.componetName);
        expect(response.body[0].quantity).toBe(post.quantity);
      });
  });

  test("POST /cart/savecart", async () => {
    const data = { 
        userid: "user id 1",
        imageURL:"image URL 1",
        componetID:"componet ID 1",
        componetName:"componet Name 1",
        quantity:"10"
    };
  
    await supertest(app).post("/cart/savecart")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.userid).toBe(data.userid);
        expect(response.body.imageURL).toBe(data.imageURL);
        expect(response.body.componetID).toBe(data.componetID);
        expect(response.body.componetName).toBe(data.componetName);
        expect(response.body.quantity).toBe(data.quantity);
  
        // Check data in the database
        const post = await Cart.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.userid).toBe(data.userid);
        expect(post.imageURL).toBe(data.imageURL);
        expect(post.componetID).toBe(data.componetID);
        expect(post.componetName).toBe(data.componetName);
        expect(post.quantity).toBe(data.quantity);
      });
  });

  test("GET /cart/speccartdid/:id", async () => {
    const post = await Cart.create({ 
        userid: "user id 1",
        imageURL:"image URL 1",
        componetID:"componet ID 1",
        componetName:"componet Name 1",
        quantity:"10"
    });
  
    await supertest(app).get("/cart/speccartdid/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id);
        expect(response.body.userid).toBe(post.userid);
        expect(response.body.imageURL).toBe(post.imageURL);
        expect(response.body.componetID).toBe(post.componetID);
        expect(response.body.componetName).toBe(post.componetName);
        expect(response.body.quantity).toBe(post.quantity);
      });
  });

  test("DELETE /cart/delete/:id", async () => {
    const post = await Cart.create({
        userid: "user id 1",
        imageURL:"image URL 1",
        componetID:"componet ID 1",
        componetName:"componet Name 1",
        quantity:"10"
    });
  
    await supertest(app)
      .delete("/cart/delete/" + post.id)
      .expect(204)
      .then(async () => {
        expect(await Cart.findOne({ _id: post.id })).toBeFalsy();
      });
  });