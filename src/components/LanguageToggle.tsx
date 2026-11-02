import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "./useLanguage";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
      title={language === "pt" ? "Switch to English" : "Mudar para Português"}
      className="rounded-full"
    >
      <Globe className="h-4 w-4" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}
