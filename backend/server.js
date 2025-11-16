const express = require("express");
const userRouter = require("./routes/user");
const authRouter = require("./routes/userauth")
const authorizeUser = require("./util/auth");

const app = express();

app.use(express.json());
app.use(authorizeUser);
app.use("/auth", authRouter)
app.use("/user", userRouter);

app.listen(4000,'localhost',() => {
  console.log("Server is running on port 4000");
});
