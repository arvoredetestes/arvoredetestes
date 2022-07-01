import "./config/logger";

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import routes from "./router";

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
});

const app = express();

app.use(express.json());

const CORS = {
  origin: "https://arvoredetestes.web.app",
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV === "development") {
  app.use(cors());
} else {
  app.use(cors(CORS));
}
app.use(helmet());
app.use(morgan("tiny"));

const swaggerJsDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TCC",
      version: "0.0.1",
      description:
        "This is a REST API application made with Express. It retrieves data from mongo database (local or cloud).",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "GuitarWag",
      },
    },
  },
  apis: ["./src/routes/**/**.ts"], // files containing annotations as above
};

const swaggerOptions = {
  explorer: true,
};

const swaggerDocs = swaggerJsDoc(swaggerJsDocOptions);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerOptions)
);

app.use(limiter);

app.use(routes);

export default app;
