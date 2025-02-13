"use client";

import { create } from "zustand";

interface RadioPlayerState {
  activeRadio: string | null;
  setActiveRadio: (url: string | null) => void;
}

export const useRadioPlayerStore = create<RadioPlayerState>((set) => ({
  activeRadio: null,
  setActiveRadio: (url) => set({ activeRadio: url }),
}));
