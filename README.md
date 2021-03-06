# Authengine Node.js SDK

The Authengine Node SDK provides access to the Authengine API from server-side Javascript/Node applications. Although the Node SDK may be used in some circumstances in the browser, we highly suggest you use the authengine.js package instead.

### What is Authengine?

Authengine is a password-less authentication as a service platform. Our platform allows developers to quickly build authentication and session management infrastructure into their platforms.

### Getting started

Initialize the client with your API tokens.

```javascript
import authengine from "@authengine/node";
const client = new authengine.Client({
  apiUrl: process.env.AUTHENGINE_API_URL,
  tenantId: process.env.AUTHENGINE_TENANT_ID,
  privateToken: process.env.AUTHENGINE_PRIVATE_TOKEN,
});
```

Start sending API requests.

```javascript
client.user.create({
  name: "Alex Yuan",
  email: "alex@authengine.co"
})
```

Each method returns a promise that resolves a response to the API endpoint.
