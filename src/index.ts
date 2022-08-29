require("dotenv").config();
import express, { Application, Request, Response } from "express";

const api = async () => {
  const { PORT = 3000 } = process.env;
  const msg: string = "Hello World!";
  const app: Application = express();

  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: msg,
    });
  });
  app.listen(PORT, () => {
    console.log(`Server run in port ${PORT}`);
  });
};

api().catch((err) => {
  console.log(err);
});
