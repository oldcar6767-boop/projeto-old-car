// Aguarda o carregamento da página para iniciar as validações e máscaras.
 document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formPerfil');

  if (!form) {
    return;
  }

  const campos = form.querySelectorAll('input[required], input[type="email"]');
  const campoCep = document.getElementById('numero');
  const campoCpf = document.getElementById('telefone');

  // Formata o CPF enquanto o usuário digita.
  const aplicarMascaraCpf = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  // Formata o CEP enquanto o usuário digita.
  const aplicarMascaraCep = (valor) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  if (campoCpf) {
    campoCpf.addEventListener('input', (event) => {
      event.target.value = aplicarMascaraCpf(event.target.value);
    });
  }

  if (campoCep) {
    campoCep.addEventListener('input', (event) => {
      event.target.value = aplicarMascaraCep(event.target.value);
    });
  }

  // Preenche os campos com os dados já salvos no navegador.
  const preencherDadosSalvos = () => {
    const dadosSalvos = JSON.parse(localStorage.getItem('perfilOldCar') || '{}');

    Object.entries(dadosSalvos).forEach(([id, valor]) => {
      const campo = document.getElementById(id);
      if (campo && valor) {
        campo.value = valor;
      }
    });
  };

  preencherDadosSalvos();

  // Valida os campos antes de salvar e grava os dados no localStorage.
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let valido = true;
    const dados = {};

    campos.forEach((campo) => {
      const valor = campo.value.trim();

      if (!valor) {
        valido = false;
        campo.focus();
        return;
      }

      dados[campo.id] = valor;
    });

    if (!valido) {
      alert('Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }

    const cpf = (campoCpf?.value || '').replace(/\D/g, '');
    const cep = (campoCep?.value || '').replace(/\D/g, '');

    if (cpf.length !== 11) {
      alert('CPF inválido. Digite um CPF com 11 números.');
      campoCpf?.focus();
      return;
    }

    if (cep.length !== 8) {
      alert('CEP inválido. Digite um CEP com 8 números.');
      campoCep?.focus();
      return;
    }

    localStorage.setItem('perfilOldCar', JSON.stringify(dados));
    alert('Perfil atualizado com sucesso!');
    window.location.href = 'pginicial.html';
  });
});
