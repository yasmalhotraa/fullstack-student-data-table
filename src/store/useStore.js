import { create } from "zustand";

const useStore = create((set) => ({
  students: [], // Store student data
  ayFilter: "2024-25", // Default academic year filter
  categoryFilter: "CBSE 9", // Default category filter
  setStudents: (students) => set({ students }),
  setAyFilter: (ayFilter) => set({ ayFilter }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
}));

export default useStore;
