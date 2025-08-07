import { v4 as uuidv4 } from "uuid";
import { S3Service } from "../../integrations/aws-s3/S3Service";
import { NotesRepository } from "./NotesRepository";
import { INote } from "./NotesModel";

export interface NoteFile {
  id: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  s3Key: string;
  description?: string;
  tags?: string[];
}

export interface UploadResult {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  s3Url: string;
}

export interface GetNotesParams {
  page: number;
  limit: number;
  search?: string;
}

export interface GetNotesResult {
  notes: NoteFile[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export class NotesService {
  private s3Service: S3Service;
  private notesRepository: NotesRepository;

  constructor() {
    this.s3Service = new S3Service(
      process.env.AWS_REGION || "us-east-1",
      process.env.S3_BUCKET_NAME || "edugpt-notes"
    );
    this.notesRepository = new NotesRepository();
  }

  public async uploadNote(
    file: Express.Multer.File,
    metadata: any
  ): Promise<UploadResult> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const s3Key = `notes/${timestamp}-${file.originalname}`;

    try {
      // Upload to S3 using S3Service
      const s3Url = await this.s3Service.uploadFile(
        s3Key,
        file.buffer,
        file.mimetype
      );

      // Store metadata in MongoDB
      const noteDoc = await this.notesRepository.createNote({
        originalName: file.originalname,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        uploadDate: new Date(),
        s3Key,
        s3Url,
        description: metadata.description,
        tags: metadata.tags ? JSON.parse(metadata.tags) : [],
      });

      return {
        id: noteDoc._id.toString(),
        fileName: noteDoc.fileName,
        fileSize: noteDoc.fileSize,
        uploadDate: noteDoc.uploadDate,
        s3Url: noteDoc.s3Url,
      };
    } catch (error) {
      console.error("S3 upload error:", error);
      throw new Error("Failed to upload file to S3");
    }
  }

  public async getAllNotes(params: GetNotesParams): Promise<GetNotesResult> {
    try {
      const repoResult = await this.notesRepository.getAllNotes(params);
      return {
        ...repoResult,
        notes: repoResult.notes.map(note => ({
          id: note._id.toString(),
          originalName: note.originalName,
          fileName: note.fileName,
          fileSize: note.fileSize,
          mimeType: note.mimeType,
          uploadDate: note.uploadDate,
          s3Key: note.s3Key,
          description: note.description,
          tags: note.tags,
          s3Url: note.s3Url,
        })),
      };
    } catch (error) {
      console.error("Get notes error:", error);
      throw new Error("Failed to retrieve notes");
    }
  }

  public async getNoteById(id: string): Promise<INote | null> {
    return this.notesRepository.getNoteById(id);
  }

  public async deleteNote(id: string): Promise<boolean> {
    return this.notesRepository.deleteNote(id);
  }
}
