declare interface StoredUser {
  username: string;
  pin: string;
  createdAt: string;
}

declare interface StoredNote {
  id: string;
  title: string;
  body: string;
  imageUri?: string;
  createdAt: string;
  updatedAt: string;
}

declare type SortKey = "updatedAt" | "title";
declare type SortDirection = "asc" | "desc";

declare interface SortOption {
  key: SortKey;
  direction: SortDirection;
}

declare interface NoteFormValues {
  title: string;
  body: string;
  imageUri?: string;
}