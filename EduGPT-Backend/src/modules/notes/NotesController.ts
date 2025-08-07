import { Request, Response } from "express";
import { NotesService } from "./NotesService";

export class NotesController {
  private notesService: NotesService;

  constructor() {
    this.notesService = new NotesService();
  }

  public uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
        return;
      }

      const result = await this.notesService.uploadNote(req.file, req.body);

      res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        data: result,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload file",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public fetchAllFiles = async (req: Request, res: Response): Promise<void> => {
    try {
      const { page = 1, limit = 10, search } = req.query;

      const result = await this.notesService.getAllNotes({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
      });

      res.status(200).json({
        success: true,
        message: "Files retrieved successfully",
        data: result,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch files",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
