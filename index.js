require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const massive = require("massive");
const controller = require("./db/products_controller");

const port = process.env.port || 3000;
const app = express();
massive(process.env.CONNECTION_STRING).then(dbInstance =>
  app.set("db", dbInstance)
);
app.use(bodyParser.json());
app.use(cors());

app.get("/api/products", controller.getAll);
app.get("/api/product/:id", controller.getOne);
app.put("/api/product/:id", controller.update);
app.post("/api/product", controller.create);
app.delete("/api/product/:id", controller.delete);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
