const formulario = document.getElementById("formulario");
const botao = document.getElementById("botao");

// Habilita ou desabilita o botão
function verificarFormulario() {
    botao.disabled = !formulario.checkValidity();
}

formulario.addEventListener("input", verificarFormulario);
formulario.addEventListener("change", verificarFormulario);

// Mostra o alerta ao enviar
formulario.addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio apenas para testar
    alert("Mensagem enviada!" + "\n" + " A resposta será enviada no seu e-mail.");

     formulario.reset(); // Limpa todos os campos

    botao.disabled = true; // Desabilita o botão novamente
});