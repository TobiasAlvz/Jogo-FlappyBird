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

class ParDeBarreiras {
  constructor(altura, abertura, x) {
    this.element = newElement("div", "par-de-barreiras");

    this.superior = new Barreiras(true);
    this.inferior = new Barreiras(false);

    this.element.appendChild(this.superior.element);
    this.element.appendChild(this.inferior.element);

    this.sorteio = () => {
      const alturaSuperior = Math.random() * (altura - abertura);
      const alturaInferior = altura - abertura - alturaSuperior;

      this.superior.setAltura(alturaSuperior);
      this.inferior.setAltura(alturaInferior);
    };

    this.getX = () => parseInt(this.element.style.left.split("px")[0]);

    this.setX = (x) => (this.element.style.left = `${x}px`);

    this.getLargura = () => this.element.clientWidth;

    this.sorteio();
    this.setX(x);
  }
}

const b = new ParDeBarreiras(700, 200, 800);
document.querySelector("[tp-flappy]").appendChild(b.element);
