// Define um produto padrão caso a página seja aberta sem parâmetros na URL.
const produtoPadrao = {
  nome: "Peça clássica Old Car",
  preco: "R$ 299,90",
  descricao: "Peça original para restauração, com acabamento impecável e ótima conservação.",
  imagem: "imagens/lataria.png",
  categoria: "Lataria",
  detalhes: "Ideal para carros antigos e projetos de restauração."
};

// Lê os parâmetros da URL para montar os dados do produto clicado.
const params = new URLSearchParams(window.location.search);
const produto = {
  nome: params.get("nome") || produtoPadrao.nome,
  preco: params.get("preco") || produtoPadrao.preco,
  descricao: params.get("descricao") || produtoPadrao.descricao,
  imagem: params.get("imagem") || produtoPadrao.imagem,
  categoria: params.get("categoria") || produtoPadrao.categoria,
  detalhes: params.get("detalhes") || produtoPadrao.detalhes
};

// Preenche os elementos da página com os dados do produto selecionado.
document.getElementById("produto-imagem").src = produto.imagem;
document.getElementById("produto-imagem").alt = produto.nome;
document.getElementById("produto-categoria").textContent = produto.categoria;
document.getElementById("produto-nome").textContent = produto.nome;
document.getElementById("produto-descricao").textContent = `${produto.descricao} ${produto.detalhes}`;
document.getElementById("produto-preco").textContent = produto.preco;

// Adiciona o evento de clique no botão para salvar o produto no carrinho.
const confirmarBtn = document.getElementById("btn-confirmar");
confirmarBtn.addEventListener("click", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinhoOldCar") || "[]");
  carrinho.push({
    nome: produto.nome,
    preco: produto.preco,
    descricao: produto.descricao,
    imagem: produto.imagem,
    categoria: produto.categoria
  });
  localStorage.setItem("carrinhoOldCar", JSON.stringify(carrinho));
  window.location.href = "carrinho.html";
});
