import { create } from "zustand";
import { createAuthSlice } from "./Slice/createAuthSlice";

export const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
}));
