import request from "supertest";
import { app } from "../../app";

it("fails when the email doesnt exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test3@test.com",
      password: "test1"
    })
    .expect(400);
});

it("fails for incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testnew@test.com",
      password: "testnew"
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "testnew@test.com",
      password: "testnewdebris"
    })
    .expect(400);
});

it("responds with cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testnew@test.com",
      password: "testnew"
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "testnew@test.com",
      password: "testnew"
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
