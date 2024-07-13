function createElement(tag, attributes, children, text) {
  const element = document.createElement(tag);
  element.textContent = text;

  appendChildren(element, children);
  appendAttributes(element, attributes);

  return element;
}

const appendChildren = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

const appendAttributes = (element, attributes) => {
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
};

function setDataProperties(element, datasetKeyValuePair) {
  for (const dataItem in datasetKeyValuePair) {
    element.dataset[dataItem] = datasetKeyValuePair[dataItem];
  }
}

export { createElement, setDataProperties };
