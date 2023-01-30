const app = require("../server");
const Component = require("../models/Component");
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

test("GET /component/allcomps", async () => {
  const post = await Component.create({ 
    componetID:"",
    componetName: "componet Name 1",
    componetDesc:"componet Desc 1",
    imageURL:"image URL 1",
    qty:"qty 1",
    unitPrice:"unit Price 1",
    componetCode:"componet Code 1" 
  });

  await supertest(app).get("/component/allcomps")
    .expect(200)
    .then((response) => {

      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      // expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(post.id);
      expect(response.body[0].componetID).toBe(post.componetID);
      expect(response.body[0].componetName).toBe(post.componetName);
      expect(response.body[0].componetDesc).toBe(post.componetDesc);
      expect(response.body[0].imageURL).toBe(post.imageURL);
      expect(response.body[0].qty).toBe(post.qty);
      expect(response.body[0].unitPrice).toBe(post.unitPrice);
      expect(response.body[0].componetCode).toBe(post.componetCode);
    });
});

test("POST /component/savecomp", async () => {
  const data = { 
    componetName: "componet Name 2",
    componetDesc:"componet Desc 2",
    imageURL:"image URL 2",
    qty:"qty 2",
    unitPrice:"unit Price 2",
    componetCode:"componet Code 2"
  };

  await supertest(app).post("/component/savecomp")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.componetName).toBe(data.componetName);
      expect(response.body.componetDesc).toBe(data.componetDesc);
      expect(response.body.imageURL).toBe(data.imageURL);
      expect(response.body.qty).toBe(data.qty);
      expect(response.body.unitPrice).toBe(data.unitPrice);
      expect(response.body.componetCode).toBe(data.componetCode);

      // Check data in the database
      const post = await Component.findOne({ _id: response.body._id });
      expect(post).toBeTruthy();
      expect(post.componetName).toBe(data.componetName);
      expect(post.componetDesc).toBe(data.componetDesc);
      expect(post.imageURL).toBe(data.imageURL);
      expect(post.qty).toBe(data.qty);
      expect(post.unitPrice).toBe(data.unitPrice);
      expect(post.componetCode).toBe(data.componetCode);
    });
});

test("GET /component/speccompsd/:id", async () => {
  const post = await Component.create({ 
    componetID:"",
    componetName: "componet Name 3",
    componetDesc:"componet Desc 3",
    imageURL:"image URL 3",
    qty:"qty 3",
    unitPrice:"unit Price 3",
    componetCode:"componet Code 3" 
  });

  await supertest(app).get("/component/speccompsd/" + post.id)
    .expect(200)
    .then((response) => {
      expect(response.body._id).toBe(post.id);
      expect(response.body.componetName).toBe(post.componetName);
      expect(response.body.componetDesc).toBe(post.componetDesc);
      expect(response.body.imageURL).toBe(post.imageURL);
      expect(response.body.qty).toBe(post.qty);
      expect(response.body.unitPrice).toBe(post.unitPrice);
      expect(response.body.componetCode).toBe(post.componetCode);
    });
});

// test("PATCH /component/updatecomp/:id", async () => {
//   const post = await Component.create({ 
//     componetName: "componet Name 4",
//     componetDesc:"componet Desc 4",
//     imageURL:"image URL 4",
//     qty:"qty 4",
//     unitPrice:"unit Price 4",
//     componetCode:"componet Code 4" 
//   });

//   const data = { 
//     componetName: "New componet Name 5",
//     componetDesc:"New componet Desc 5",
//     imageURL:"New image URL 5",
//     qty:"New qty 5",
//     unitPrice:"New unit Price 5",
//     componetCode:"New componet Code 5" 
//   };

//   await supertest(app).patch("/component/updatecomp/" + post.id)
//     .send(data)
//     .expect(200)
//     .then(async (response) => {
//       // Check the response
//       expect(response.body._id).toBe(post.id);
//       expect(response.body.componetName).toBe(post.componetName);
//       expect(response.body.componetDesc).toBe(post.componetDesc);
//       expect(response.body.imageURL).toBe(post.imageURL);
//       expect(response.body.qty).toBe(post.qty);
//       expect(response.body.unitPrice).toBe(post.unitPrice);
//       expect(response.body.componetCode).toBe(post.componetCode);

//       // Check the data in the database
      
//       const newPost = await Component.findOne({ _id: response.body.id });
//       expect(newPost).toBeTruthy();
//       expect(newPost.componetName).toBe(data.componetName);
//       expect(newPost.componetDesc).toBe(data.componetDesc);
//       expect(newPost.imageURL).toBe(data.imageURL);
//       expect(newPost.qty).toBe(data.qty);
//       expect(newPost.unitPrice).toBe(data.unitPrice);
//       expect(newPost.componetCode).toBe(data.componetCode);
//     });
// });

test("DELETE /component/delete/:id", async () => {
  const post = await Component.create({
    componetName: "New componet Name 6",
    componetDesc:"New componet Desc 6",
    imageURL:"New image URL 6",
    qty:"New qty 6",
    unitPrice:"New unit Price 6",
    componetCode:"New componet Code 6"  
  });

  await supertest(app)
    .delete("/component/delete/" + post.id)
    .expect(204)
    .then(async () => {
      expect(await Component.findOne({ _id: post.id })).toBeFalsy();
    });
});