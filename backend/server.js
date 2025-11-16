const express = require("express");
const userRouter = require("./routes/user");
const authorizeUser = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(authorizeUser);
app.use("/user", userRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
