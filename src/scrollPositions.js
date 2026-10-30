// Where each page lands when it opens.
// Project pages scroll so the main menu sits just below the top of the window,
// with the project title straight under it. Everything else opens at the top.
export const MENU_GAP_ABOVE = 80; // px of space left above the menu buttons

export const scrollToProjectContent = () => {
  const nav = document.querySelector("nav");
  if (!nav) return;
  const top = nav.getBoundingClientRect().top + window.scrollY - MENU_GAP_ABOVE;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
};

export const scrollToPageTop = () => window.scrollTo({ top: 0, behavior: "auto" });
