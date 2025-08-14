import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface NoteItem {
  id: string;
  originalName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
  s3Key: string;
  description?: string;
  tags?: string[];
  s3Url: string;
}

export interface NotesResponse {
  notes: NoteItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/notes" }),
  endpoints: (builder) => ({
    getNotes: builder.query<NotesResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `files?page=${page}&limit=${limit}`,
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: {
          notes: NoteItem[];
          totalCount: number;
          currentPage: number;
          totalPages: number;
        };
      }) => ({
        notes: response.data.notes,
        totalCount: response.data.totalCount,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      }),
    }),
  }),
});

export const { useGetNotesQuery } = notesApi;
