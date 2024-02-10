const express = require("express");
const config = require("./config/config");
const routes = require("./routes");

const app = express();

require("./config/express")(app);
require("./config/mongoose")(app);

app.use(routes);

app.listen(config.development.PORT, () =>
  console.log(
    `Server is running on  http://localhost:${config.development.PORT} !`
  )
);
