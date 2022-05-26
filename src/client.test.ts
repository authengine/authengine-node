import authengine from "./index";

// test is whoami function returns current tenant
test("whoami", async () => {
  const client = new authengine.Client({
    apiUrl: "http://localhost:8000",
    secretKey: "unit-tests",
  });
  const res = await client.whoami();
  expect(res.data.name).toBe("unit-test-tenant");
});
