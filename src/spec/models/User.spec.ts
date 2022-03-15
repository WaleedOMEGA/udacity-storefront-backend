import User from "../../models/user";



describe("User DB model tests", () => {
  const values = { id: "test", firstname: "test", lastname: "user", password: "secret" };

  it("should create new user", async () => {
    const user = new User(values.id, values.firstname, values.lastname, values.password);
    expect(user.id).toBeTruthy();
  });

  it("should return all users", async () => {
    const users = await User.getAll();
    expect(users?.length).toBeGreaterThan(0);
  });

  it("should return user", async () => {
    const user = await User.getById(values.id);
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toEqual(values.id);
  });

  it("should update user", async () => {
    const user = await User.getById(values.id);
    if (!user) return;
    user.firstname = 'waleed';
    await user.update();
    expect(user.firstname).toBe('waleed');
    values.firstname = user.firstname;
  });

  it("should delete user", async () => {
    let user = await User.getById(values.id);
    if (!user) return;
    await user.delete();
    user = await User.getById(values.id);
    expect(user).toBeFalsy();
  });
});
