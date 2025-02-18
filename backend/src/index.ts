import express from "express";
import router from "./routes/index.js";
import shutdown from "db/shutdown.js";
import configCors from "middlewares/configCors.js";
import db from "db/db.js";

const port = Number(process.env.PORT) ?? 3003;
const url = process.env.URL ?? "localhost";
let isHttps = false;

const app = express();

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  // isHttps = true;
  isHttps = false;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', configCors(port, isHttps));
app.use(configCors(port, isHttps));
app.use(router);

const server = app.listen(port, () => {
  console.log(`Server is running on port http://${url}:${port}`);
});

shutdown(server, db);