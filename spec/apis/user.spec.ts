import supertest from "supertest";
import app from "../../src/server";
import { Token } from "../../src/token";



import { getAuth } from "../helpers/getAuth";

describe("User API Tests", () => {
  beforeAll(async () => {
    auth = await getAuth(request);
  });

  let auth: [string, string];
  const request = supertest(app);
  const user = { id: "test", firstname: "test", lastname: "user", password: "secret" };

  it("should create new user", async () => {
    const res = await request
      .post("/user/")
      .set(...auth)
      .send(user);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(user.id);
  });

  it("should be able to login", async () => {
    const res = await request.post("/login/").send({ id: user.id, password: user.password });
    expect(res.status).toBe(200);
    expect(res.text).toBeTruthy();
    const tokenData = Token.verify(res.text);
    expect(tokenData?.sub).toBe(user.id);
  });

  it("should get list of users", async () => {
    const res = await request.get("/user/all/").set(...auth);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });

  it("should get user info", async () => {
    const res = await request.get(`/user/${user.id}`).set(...auth);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(user.id);
  });

  it("should update user info", async () => {
    user.firstname = "waleed";
    const res = await request
      .put("/user/")
      .set(...auth)
      .send(user);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(user.id);
    expect(res.body.firstname).toBe(user.firstname);
  });

  it("should delete user", async () => {
    const res = await request.delete(`/user/${user.id}`).set(...auth);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(user.id);
  });
});
