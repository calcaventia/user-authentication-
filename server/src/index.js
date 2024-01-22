const express = require("express");
const app = express();
const { PORT } = require("./constants");

//import routes
const authRoutes = require("./routes/auth");

//initialize routes
app.use("/api", authRoutes);

const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
appStart();