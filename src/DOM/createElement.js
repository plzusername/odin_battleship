export function createElement(tag, attributes, children, text) {
  const element = document.createElement(tag);
  element.textContent = text;

  for (const attribute of attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }

  appendChildren(element, children);
  appendAttributes(element, attributes);
}

const appendChildren = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const appendAttributes = (element, attributes) => {
  for (const attribute of attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
};
