import create from "zustand";

export const useBookStore = create((set) => ({
  book: null,
  storeBook: (file: any) => set(() => ({ book: file })),
}));
