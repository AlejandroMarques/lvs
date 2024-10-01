import express, { Router } from "express";
import MovieController from "../controllers/movieController.js";
export class MovieRoutes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.routes(); // Llama al método que define las rutas
  }

  private routes(): void {
    const controller = new MovieController();
    this.router.get("/movie/search/:title", controller.search);
    this.router.get("/movie/:id", controller.save);
    this.router.get("/movie/play/:id", controller.play);
  }
}
