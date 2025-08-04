import { create } from "zustand";
import { createToggleSlice } from "./Slice/createToggleSlice";

export const useAppStore = create()((...a) => ({
  ...createToggleSlice(...a),
}));
