function newElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

function Barreiras(reversa = false) {
  this.element = newElement("div", "barreira");

  const borda = newElement("div", "borda");
  const corpo = newElement("div", "corpo");

  this.element.appendChild(reversa ? corpo : borda);

  this.element.appendChild(reversa ? borda : corpo);

  this.setAltura = (altura) => (corpo.style.height = `${altura}px`);
}

const b = new Barreiras(true);
b.setAltura(200);
document.querySelector("[tp-flappy]").appendChild(b.element);
