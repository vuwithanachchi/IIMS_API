const app = require("../server");
const User = require("../models/User");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/iimsdb",
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



  test("GET /user/saveuser", async () => {
    const post = await User.create({ 
      userid:"",
      username: "componet Name 1",
      email:"componet Desc 1",
      password:"image URL 1"
    });
  
    await supertest(app).get("/user/allusers")
      .expect(200)
      .then((response) => {
  
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].userid).toBe(post.userid);
        expect(response.body[0].username).toBe(post.username);
        expect(response.body[0].email).toBe(post.email);
        expect(response.body[0].password).toBe(post.password);
      });
  });

  test("POST /user/saveuser", async () => {
    const data = { 
      username: "componet Name 1",
      email:"componet Desc 1",
      password:"image URL 1"
    };
  
    await supertest(app).post("/user/saveuser")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.username).toBe(data.username);
        expect(response.body.email).toBe(data.email);
        expect(response.body.password).toBe(data.password);
  
        // Check data in the database
        const post = await User.findOne({ _id: response.body._id });
        expect(post).toBeTruthy();
        expect(post.username).toBe(data.username);
        expect(post.email).toBe(data.email);
        expect(post.password).toBe(data.password);
      });
  });

  test("GET /user/specsuser/:id", async () => {
    const post = await User.create({ 
      username: "componet Name 1",
      email:"componet Desc 1",
      password:"image URL 1"
    });
  
    await supertest(app).get("/user/specsuser/" + post.id)
      .expect(200)
      .then((response) => {
        expect(response.body._id).toBe(post.id);
        expect(response.body.username).toBe(post.username);
        expect(response.body.email).toBe(post.email);
        expect(response.body.password).toBe(post.password);
      });
  });

  test("DELETE /user/delete/:id", async () => {
    const post = await User.create({
      username: "componet Name 1",
      email:"componet Desc 1",
      password:"image URL 1"
    });
  
    await supertest(app)
      .delete("/user/delete/" + post.id)
      .expect(204)
      .then(async () => {
        expect(await User.findOne({ _id: post.id })).toBeFalsy();
      });
  });