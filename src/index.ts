import express, { Application, Request, Response } from "express";

const api = async () => {
  const msg: string = "Hello World!";
  const port: number = 3000;
  const app: Application = express();

  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: msg,
    });
  });
  app.listen(port, () => {
    console.log(`Server run in port ${port}`);
  });
};

api().catch((err) => {
  console.log(err);
});
