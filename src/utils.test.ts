import utils from "./utils";

// test to check if the function properly returns the bearer token
test("getBearerTokenFromHeader", () => {
  const request = {
    headers: {
      authorization: "Bearer token",
    },
  };
  const bearerToken = utils.getBearerTokenFromHeader(request);
  expect(bearerToken).toBe("token");
});

// test to check if the function properly returns undefined if the bearer token is not present
test("getUndefinedBearerTokenFromHeader", () => {
  const request = {
    headers: {},
  };
  const bearerToken = utils.getBearerTokenFromHeader(request);
  expect(bearerToken).toBeUndefined();
});
test("getIncompleteBearerTokenFromHeader", () => {
  const request = {
    headers: {
      authorization: "Bearer",
    },
  };
  const bearerToken = utils.getBearerTokenFromHeader(request);
  expect(bearerToken).toBeUndefined();
});
