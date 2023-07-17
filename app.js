const express = require("express");
const cors = require("cors");
const { connectToDB } = require("./db/db");
const { readdirSync } = require("fs");
const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

require("dotenv").config();

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

const server = () => {
  connectToDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log("listening to port:", PORT);
      });
    })
    .catch((err) => {
      console.error("Error Connect : ", err);
    });
};

server();
