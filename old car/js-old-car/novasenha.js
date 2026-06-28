(function () {
    // Valida se as senhas digitadas são iguais e têm o tamanho mínimo exigido.
    function validarSenhas(event) {
        const senha = document.getElementById('novasenha');
        const confirmarSenha = document.getElementById('confirmarNovasenha');

        if (!senha || !confirmarSenha) {
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            event.preventDefault();
            alert('As senhas precisam ser iguais.');
            confirmarSenha.focus();
            return;
        }

        if (senha.value.length < 6) {
            event.preventDefault();
            alert('A senha deve ter pelo menos 6 caracteres.');
            senha.focus();
            return;
        }

        event.preventDefault();
        window.location.href = 'login.html';
    }

    // Espera o carregamento do HTML para associar o evento ao formulário.
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('formNovaSenha');
        if (form) {
            form.addEventListener('submit', validarSenhas);
        }
    });

    // Mostra ou esconde a senha ao clicar no texto de alternância.
    document.addEventListener('click', function (event) {
        const button = event.target;

        if (!(button instanceof HTMLElement) || !button.classList.contains('toggle-password')) {
            return;
        }

        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);

        if (!input) {
            return;
        }

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        button.textContent = isPassword ? 'Ocultar' : 'Mostrar';
    });
})();
