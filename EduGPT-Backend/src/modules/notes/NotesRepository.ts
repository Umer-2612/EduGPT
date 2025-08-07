import { NoteModel, INote } from "./NotesModel";

export class NotesRepository {
  async createNote(data: Partial<INote>): Promise<INote> {
    const note = new NoteModel(data);
    return await note.save();
  }

  async getAllNotes({ page = 1, limit = 10, search }: { page?: number; limit?: number; search?: string }) {
    const filter: any = {};
    if (search) {
      filter.$or = [
        { originalName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }
    const totalCount = await NoteModel.countDocuments(filter);
    const notes = await NoteModel.find(filter)
      .sort({ uploadDate: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return {
      notes,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async getNoteById(id: string): Promise<INote | null> {
    return NoteModel.findById(id);
  }

  async deleteNote(id: string): Promise<boolean> {
    const res = await NoteModel.findByIdAndDelete(id);
    return !!res;
  }
}
