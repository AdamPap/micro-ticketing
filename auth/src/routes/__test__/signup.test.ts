import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1"
    })
    .expect(201);
});

it("returns a 400 with an invalid emai", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
      password: "test1"
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test1asdfasdfafsdfdasdfadff"
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({})
    .expect(400);
});

it("returns a 400 with an invalid password or email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com"
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "test@test.com"
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345"
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345"
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345"
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
