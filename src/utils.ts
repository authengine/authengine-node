const getBearerTokenFromHeader = (request) => {
  const token = request.headers.authorization?.substring(7);
  if (!token) {
    return undefined;
  } else {
    return token;
  }
};

export default {
  getBearerTokenFromHeader,
};
