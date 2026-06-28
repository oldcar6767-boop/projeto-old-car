// Seleciona os elementos da página do carrinho para manipular o conteúdo e os botões.
const listaProdutos = document.getElementById("lista-produtos");
const totalCarrinho = document.getElementById("total-carrinho");
const btnConfirmar = document.getElementById("btn-confirmar-pedido");
const btnSelecionarTodos = document.getElementById("btn-selecionar-todos");
const contadorSelecionados = document.getElementById("contador-selecionados");

// Carrega os itens salvos no localStorage e cria um array para guardar os índices selecionados.
let carrinho = JSON.parse(localStorage.getItem("carrinhoOldCar") || "[]");
let selecionados = [];

// Converte valores em moeda, como "R$ 1.500,00", para número decimal.
function parsearPreco(preco) {
  if (typeof preco !== "string") return 0;

  const valorLimpo = preco
    .replace("R$", "")
    .trim()
    .replace(/\./g, "")
    .replace(",", ".");

  const numero = Number(valorLimpo);
  return Number.isNaN(numero) ? 0 : numero;
}

// Atualiza o texto que mostra quantos itens foram marcados.
function atualizarContador() {
  contadorSelecionados.textContent = `${selecionados.length} item(s) selecionado(s)`;
}

// Retorna apenas os produtos que estão marcados como selecionados.
function obterItensSelecionados() {
  return selecionados.length ? selecionados.map((index) => carrinho[index]).filter(Boolean) : [];
}

// Calcula o total com base nos itens selecionados e atualiza o resumo da compra.
function atualizarResumo() {
  const itensSelecionados = obterItensSelecionados();
  const total = itensSelecionados.reduce((acc, item) => acc + parsearPreco(item.preco), 0);
  totalCarrinho.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

// Renderiza os produtos do carrinho na tela e adiciona eventos de seleção e remoção.
function renderizarCarrinho() {
  carrinho = JSON.parse(localStorage.getItem("carrinhoOldCar") || "[]");
  selecionados = selecionados.filter((index) => index < carrinho.length);
  atualizarContador();

  if (!carrinho.length) {
    listaProdutos.innerHTML = '<div class="mensagem-vazia">Seu carrinho está vazio. Confirme um produto na página de compra.</div>';
    totalCarrinho.textContent = "R$ 0,00";
    return;
  }

  atualizarResumo();

  listaProdutos.innerHTML = carrinho.map((item, index) => `
    <div class="produto">
      <input class="checkbox-item" type="checkbox" data-index="${index}" ${selecionados.includes(index) ? "checked" : ""} />
      <img src="${item.imagem}" alt="${item.nome}" />
      <div class="infos">
        <h3>${item.nome}</h3>
        <p>${item.categoria}</p>
        <p>${item.descricao}</p>
        <p><strong>${item.preco}</strong></p>
      </div>
      <button class="btn-remover" data-index="${index}">Remover</button>
    </div>
  `).join("");

  document.querySelectorAll(".checkbox-item").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const index = Number(checkbox.getAttribute("data-index"));
      if (checkbox.checked) {
        if (!selecionados.includes(index)) selecionados.push(index);
      } else {
        selecionados = selecionados.filter((item) => item !== index);
      }
      atualizarContador();
      atualizarResumo();
    });
  });

  document.querySelectorAll(".btn-remover").forEach((botao) => {
    botao.addEventListener("click", () => {
      const index = Number(botao.getAttribute("data-index"));
      carrinho.splice(index, 1);
      selecionados = selecionados.filter((item) => item !== index).map((item) => (item > index ? item - 1 : item));
      localStorage.setItem("carrinhoOldCar", JSON.stringify(carrinho));
      renderizarCarrinho();
    });
  });
}

// Marca ou desmarca todos os itens do carrinho ao clicar no botão correspondente.
btnSelecionarTodos.addEventListener("click", () => {
  const todosSelecionados = carrinho.length > 0 && carrinho.length === selecionados.length;
  selecionados = todosSelecionados ? [] : carrinho.map((_, index) => index);
  atualizarContador();
  renderizarCarrinho();
});

// Confirma a compra apenas dos itens selecionados e remove esses produtos do carrinho.
btnConfirmar.addEventListener("click", () => {
  const itensSelecionados = obterItensSelecionados();
  if (!itensSelecionados.length) {
    alert("Selecione pelo menos um produto para confirmar o pedido.");
    return;
  }

  const indicesSelecionados = new Set(selecionados);
  carrinho = carrinho.filter((_, index) => !indicesSelecionados.has(index));
  localStorage.setItem("carrinhoOldCar", JSON.stringify(carrinho));
  selecionados = [];

  alert("Pedido confirmado com sucesso! Obrigado por comprar na Old Car.");
  renderizarCarrinho();
});

renderizarCarrinho();
