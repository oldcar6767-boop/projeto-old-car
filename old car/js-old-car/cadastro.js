(function () {
    const formatters = {
        cpf(value) {
            return value
                .replace(/\D/g, '')
                .slice(0, 11)
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        },
        cep(value) {
            return value
                .replace(/\D/g, '')
                .slice(0, 8)
                .replace(/(\d{5})(\d)/, '$1-$2');
        },
        codigo(value) {
            return value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, '')
                .slice(0, 6);
        },
        email(value) {
            return value.toLowerCase();
        }
    };

    document.addEventListener('input', function (event) {
        const input = event.target;

        if (!(input instanceof HTMLInputElement)) {
            return;
        }

        const mask = input.dataset.mask;

        if (mask && formatters[mask]) {
            input.value = formatters[mask](input.value);
        }
    });

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
