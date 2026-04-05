"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Basic theme initialization on mount
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLinks = [
    {
      name: "Introduction",
      href: "/introduction",
    },
    { name: "Create Blog", href: "/createblog" },
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "Features",
      href: "/features",
    },

    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <span className="font-bold text-3xl tracking-tighter text-foreground transition-colors group-hover:text-primary/80">
              Blog<span className="text-primary"></span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-25">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-md  font-medium text-muted-foreground hover:text-foreground transition-colors py-2 group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Sun
                className={`absolute transition-all duration-500 transform ${theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
                size={20}
              />
              <Moon
                className={`absolute transition-all duration-500 transform ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}
                size={20}
              />
            </div>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 text-foreground focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span
                className={`absolute left-0 h-[2px] w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
              ></span>
              <span
                className={`absolute left-0 h-[2px] w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`absolute left-0 h-[2px] w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-2 flex flex-col">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
              style={{ transitionDelay: `${isOpen ? index * 50 : 0}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div
            className={`pt-4 mt-2 border-t border-border transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
            style={{
              transitionDelay: `${isOpen ? navLinks.length * 50 : 0}ms`,
            }}
          ></div>
        </div>
      </div>
    </header>
  );
}
