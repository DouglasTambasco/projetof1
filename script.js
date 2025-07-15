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

// Função para cadastro
const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome_completo = document.getElementById('inome').value;
    const usuario = document.getElementById('iusuario').value;
    const email = document.getElementById('iemail').value;
    const senha = document.getElementById('isenha').value;

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_completo, usuario, email, senha }),
      });

      const data = await res.json();
      alert(data.mensagem || data.erro);
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
    }
  });
}

// Função para login
const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('iusuario').value;
    const senha = document.getElementById('isenha').value;

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await res.json();

      if (data.mensagem) {
        alert('Login bem-sucedido!');
        // Se quiser, redirecione para outra página:
        // window.location.href = 'dashboard.html';
      } else {
        alert(data.erro || 'Erro no login');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
    }
  });
}