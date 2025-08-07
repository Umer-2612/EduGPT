import express, { Application } from "express";
import { NotesRoutes } from "../modules/notes";

export class Server {
  public readonly app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupHealthCheck();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    // You can add CORS, logger, etc. here
  }

  private setupRoutes(): void {
    // Initialize Notes routes
    new NotesRoutes(this.app).registerRoutes();
  }

  private setupHealthCheck(): void {
    this.app.get("/health", (_req, res) => res.send("OK"));
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  }
}
