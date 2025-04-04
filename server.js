const express = require("express");
const categoryRoute = require("./routes/category1.routes");
const productRoute = require("./routes/product1.routes");
const app = express();
app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./config/swagger");

app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
    console.log("Server started has been on port 3000");
});