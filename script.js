function clickMenu() {
    if (menu.style.display === "block") {
        menu.style.display = "none"
    } else {
        menu.style.display = "block"
    }
}

function mudouTamanho() {
    if (window.innerWidth >= 768) {
        menu.style.display = "block"
    } else {
        menu.style.display = "none"
    }
}

// Verifica se o formulário de cadastro existe na página
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome_completo = document.getElementById('nome').value;
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      const resposta = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_completo, usuario, email, senha })
      });

      const resultado = await resposta.json();
      alert(resultado.mensagem || resultado.erro || 'Erro no cadastro');
    } catch (erro) {
      alert('Erro ao conectar com o servidor');
      console.error(erro);
    }
  });
}

// Verifica se o formulário de login existe na página
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    try {
      const resposta = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });

      const resultado = await resposta.json();

      if (resultado.mensagem) {
        alert('Login bem-sucedido!');
        // Redirecionar, se quiser:
        // window.location.href = "dashboard.html";
      } else {
        alert(resultado.erro || 'Erro no login');
      }
    } catch (erro) {
      alert('Erro ao conectar com o servidor');
      console.error(erro);
    }
  });
}
