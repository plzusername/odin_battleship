import { createElement } from "./createElement";

const createHeader = () => {
  const logo = createLogo();
  const header = createElement(
    "header",
    { class: "header-container" },
    [logo],
    ""
  );

  return header;
};

const createLogo = () => {
  const logoIcon = createElement("i", { class: "fa-solid fa-ship" }, [], "");
  const logoText = createElement("h2", { class: "logo-icon" }, [], "");

  const logo = createElement(
    "div",
    { class: "logo-container" },
    [logoIcon, logoText],
    ""
  );

  return logo;
};
