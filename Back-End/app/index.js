const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(cors());

const port = 3000;

// Page d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API");
});

app.use(router);

app.listen(port, () => console.log(`Magic happens on port ${port}`));
