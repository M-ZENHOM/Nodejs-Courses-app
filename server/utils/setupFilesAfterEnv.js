const { client } = require("../db");

global.afterAll(async () => {
  await client.close();
});
