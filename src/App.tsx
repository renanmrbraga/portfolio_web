// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Layout } from "@/components/Layout";

import Index from "./pages/Index";




import { lazy, Suspense } from "react";

const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const EIDataBotPage = lazy(() => import("./pages/EIDataBotPage"));



const App = () => (
  <HelmetProvider>

      <ThemeProvider>
        <LanguageProvider defaultLanguage="pt">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<div role="status" aria-live="polite" className="py-20 text-center">Carregando pagina...</div>}><Routes>
                <Route
                  path="/projects/ei-databot"
                  element={
                    <Layout>
                      <Suspense
                        fallback={
                          <div role="status" aria-live="polite" className="py-20 text-center">
                            Carregando pagina...
                          </div>
                        }
                      >
                        <EIDataBotPage />
                      </Suspense>
                    </Layout>
                  }
                />
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Index />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <Contact />
                    </Layout>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <Layout>
                      <PrivacyPolicy />
                    </Layout>
                  }
                />
                <Route
                  path="/terms-of-use"
                  element={
                    <Layout>
                      <TermsOfUse />
                    </Layout>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Layout>
                      <NotFound />
                    </Layout>
                  }
                />
              </Routes></Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>

  </HelmetProvider>
);

export default App;
