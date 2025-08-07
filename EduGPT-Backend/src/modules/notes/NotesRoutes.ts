import { Application, Router } from "express";
import { upload } from "../../middlewares/upload.middleware";
import { NotesController } from "./NotesController";

export class NotesRoutes {
  private router: Router;
  private notesController: NotesController;

  constructor(private app: Application) {
    this.router = Router();
    this.notesController = new NotesController();
    this.registerRoutes();
  }

  public registerRoutes(): void {
    // Upload file endpoint
    this.router.post(
      '/upload',
      upload.single('file'),
      this.notesController.uploadFile
    );

    // Fetch all files endpoint
    this.router.get(
      '/files',
      this.notesController.fetchAllFiles
    );

    // Register the router with the app
    this.app.use('/api/notes', this.router);
  }
}
