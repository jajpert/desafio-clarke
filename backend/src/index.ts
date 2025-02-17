import express from "express";
import router from "./routes";
import shutdown from "db/shutdown";
import configCors from "middlewares/configCors";
import db from "db/db";

const port = Number(process.env.PORT) ?? 3000;
const url = process.env.URL ?? "localhost";
let isHttps = false;

const app = express();

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  isHttps = true;
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