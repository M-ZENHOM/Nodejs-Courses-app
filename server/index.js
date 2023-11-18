const app = require("./app");
const db = require("./db");

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  await db();
});
