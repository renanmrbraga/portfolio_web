import { createContext } from "react";

export type Language = "pt" | "en";

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const initialState: LanguageProviderState = {
  language: "pt",
  setLanguage: () => null,
  t: (key: string) => key
};

export const LanguageProviderContext = createContext<LanguageProviderState>(initialState);