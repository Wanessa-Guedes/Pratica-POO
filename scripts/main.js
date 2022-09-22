class Prato {
  constructor({ nome, imagem, descricao, preco }) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;

    this.setPrato();
  }

  selecionarPrato(elemento) {
    pedido.prato = this;
    const selecionado = document.querySelector(`.prato .selecionado`);
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    pedido.verificarPedido();
  }

  getPratoView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionarPrato(view);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  setPrato() {
    const pratosContainer = document.querySelector(`.opcoes.prato`);
    pratosContainer.appendChild(this.getPratoView());
  }
}

class Bebida {
  constructor({ nome, imagem, descricao, preco }) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;

    this.setBebida();
  }

  selecionarBebida(elemento) {
    pedido.bebida = this;
    const selecionado = document.querySelector(`.bebida .selecionado`);
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    pedido.verificarPedido();
  }

  getBebidaView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionarBebida(view);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  setBebida() {
    const BebidasContainer = document.querySelector(`.opcoes.bebida`);
    BebidasContainer.appendChild(this.getBebidaView());
  }
}

class Sobremesa {
  constructor({ nome, imagem, descricao, preco }) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;

    this.setSobremesa();
  }

  selecionarSobremesa(elemento) {
    pedido.sobremesa = this;
    const selecionado = document.querySelector(`.sobremesa .selecionado`);
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    pedido.verificarPedido();
  }

  getSobremesaView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionarSobremesa(view);
    });
    view.innerHTML = `
          <img src="${this.imagem}" />
          <div class="titulo">${this.nome}</div>
          <div class="descricao">${this.descricao}</div>
          <div class="fundo">
              <div class="preco">R$ ${this.preco.toFixed(2)}</div>
              <div class="check">
                  <ion-icon name="checkmark-circle"></ion-icon>
              </div>
          </div>
      `;

    return view;
  }

  setSobremesa() {
    const sobremesasContainer = document.querySelector(`.opcoes.sobremesa`);
    sobremesasContainer.appendChild(this.getSobremesaView());
  }
}

class Pedido {
  constructor() {
    this.btnConfirmar = null;
    this.btnCancelar = null;
    this.btnPedir = null;
    this.prato = null;
    this.bebida = null;
    this.sobremesa = null;

    this.iniciar();
  }

  iniciar() {
    this.btnConfirmar = document.querySelector(".confirmar");
    this.btnCancelar = document.querySelector(".cancelar");
    this.btnPedir = document.querySelector(".fazer-pedido");

    this.btnConfirmar.addEventListener("click", () => {
      this.enviarZap();
    });

    this.btnCancelar.addEventListener("click", () => {
      this.cancelarPedido();
    });

    this.btnPedir.addEventListener("click", () => {
      this.confirmarPedido();
    });
  }

  verificarPedido() {
    if (this.prato && this.bebida && this.sobremesa) {
      this.btnPedir.classList.add("ativo");
      this.btnPedir.disabled = false;
      this.btnPedir.innerHTML = "Fazer pedido";
    }
  }

  enviarZap() {
    const telefoneRestaurante = 553299999999;
    const encodedText = encodeURIComponent(
      `Olá, gostaria de fazer o pedido: \n- Prato: ${
        this.prato.nome
      } \n- Bebida: ${this.bebida.nome} \n- Sobremesa: ${
        this.sobremesa.nome
      } \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
    );

    const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
    window.open(urlWhatsapp);
  }

  cancelarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.add("escondido");
  }

  confirmarPedido() {
    const modal = document.querySelector(".overlay");
    modal.classList.remove("escondido");

    document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
      this.prato.nome;
    document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
      this.prato.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
      this.bebida.nome;
    document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
      this.bebida.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
      this.sobremesa.nome;
    document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
      this.sobremesa.preco.toFixed(2);

    document.querySelector(".confirmar-pedido .total .preco").innerHTML =
      this.getPrecoTotal().toFixed(2);
  }

  getPrecoTotal() {
    return this.prato.preco + this.bebida.preco + this.sobremesa.preco;
  }
}

const pratos = [
  {
    nome: "Estrombelete de Frango",
    imagem: "img/frango_yin_yang.png",
    descricao: "Um pouco de batata, um pouco de salada",
    preco: 14.9,
  },
  {
    nome: "Asa de Boi",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com molho shoyu",
    preco: 14.9,
  },
  {
    nome: "Carne de Monstro",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com batata assada e farofa",
    preco: 14.9,
  },
];

const bebidas = [
  {
    nome: "Coquinha gelada",
    imagem: "img/coquinha_gelada.png",
    descricao: "Lata 350ml",
    preco: 4.9,
  },
  {
    nome: "Caldo de Cana",
    imagem: "img/coquinha_gelada.png",
    descricao: "Copo 600ml",
    preco: 4.9,
  },
  {
    nome: "Corote Gelado",
    imagem: "img/coquinha_gelada.png",
    descricao: "Garrafa 400ml",
    preco: 4.9,
  },
];

const sobremesas = [
  {
    nome: "Pudim",
    imagem: "img/pudim.png",
    descricao: "Gosto de doce de leite",
    preco: 7.9,
  },
  {
    nome: "Flam",
    imagem: "img/pudim.png",
    descricao: "Gosto de chocolate",
    preco: 7.9,
  },
  {
    nome: "Brigadeiro",
    imagem: "img/pudim.png",
    descricao: "3 unidades",
    preco: 7.9,
  },
];

pratos.forEach((prato) => new Prato(prato));
bebidas.forEach((bebida) => new Bebida(bebida));
sobremesas.forEach((sobremesa) => new Sobremesa(sobremesa));
const pedido = new Pedido();
