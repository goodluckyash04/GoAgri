const express = require('express')
const connectToMongo = require('./db')
const app = express()
const port =process.env.PORT
var cors = require('cors')

app.use(cors())
connectToMongo()

app.use(express.json());
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/authadmin", require("./Routes/authadmin"));
app.use("/api/product", require("./Routes/products"));
app.use("/api/user", require("./Routes/wishlist"));
app.use("/api/user/cart", require("./Routes/cart"));
app.use("/api/user/orderdetail", require("./Routes/orderlist"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
