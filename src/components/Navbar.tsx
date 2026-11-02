import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github, User, Menu, X, Linkedin, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/useLanguage";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "dark:bg-[#0F1A24]/90 dark:backdrop-blur-md dark:shadow-md bg-white/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="font-bold text-xl dark:text-white text-gray-900 flex items-center"
            >
              <Home className="mr-2 h-5 w-5" />
              RB
            </Link>

            <a
              href="https://www.linkedin.com/in/renanmrbraga"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-xl dark:text-blue-400 text-blue-700 flex items-center"
            >
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-gray-700 dark:text-gray-300 border-gray-300 text-gray-800"
              asChild
            >
              <a href="https://github.com/renanmrbraga" target="_blank" rel="noopener noreferrer">
                <Github className="mr-1 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link to="/contact">
                <User className="mr-1 h-4 w-4" />
                {t("contact")}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="dark:text-gray-300 text-gray-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden dark:bg-[#0F1A24]/95 dark:backdrop-blur-md dark:border-t dark:border-gray-800 bg-white/95 backdrop-blur-md border-t border-gray-200">
          <nav className="flex flex-col px-4 py-6 space-y-4">
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                variant="outline"
                className="dark:border-gray-700 dark:text-gray-300 border-gray-300 text-gray-800 w-full"
                asChild
              >
                <a href="https://github.com/renanmrbraga" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full" asChild>
                <Link to="/contact">
                  <User className="mr-2 h-4 w-4" />
                  {t("contact")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
