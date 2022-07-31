import cors from "cors";
import knex from "knex";
import express from "express";
import knexConfig from "./data/knexfile.js";
import authRoutes from "./routes/authRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

const gamingAppDb = knex(knexConfig);

const app = new express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/score", scoreRoutes);

gamingAppDb.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log("Connected to Gaming App DB", migration);
      app.listen(8080, () => {
        console.log(`Retro Gaming app listening on port ${8080}...`);
      });
    }
  })
  .catch((err) => console.log(err));

export { gamingAppDb }
