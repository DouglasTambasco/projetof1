function mudouTamanho() {
  const menu = document.getElementById('menu');
  if (window.innerWidth >= 768) {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // === MENU RESPONSIVO ===
  const menu = document.getElementById('menu');
  const burguer = document.getElementById('burguer');

  if (burguer && menu) {
    burguer.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('resize', () => {
      menu.style.display = window.innerWidth >= 768 ? 'block' : 'none';
    });
  }

  // === SAUDAÇÃO E LOGOUT ===
  const nomeCompleto = localStorage.getItem('nome_completo');
  const saudacao = document.getElementById('saudacao');
  const btnLogout = document.getElementById('cadbutt');

  if (nomeCompleto && saudacao && btnLogout) {
    saudacao.textContent = `Bem-vindo(a), ${nomeCompleto}`;
    btnLogout.style.display = 'inline-block';

    btnLogout.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = 'index.html';
    });
  }

  // === PROTEÇÃO DE PÁGINAS RESTRITAS ===
  const paginaProtegida = document.body.getAttribute('data-restrito');
  if (paginaProtegida === 'sim' && !nomeCompleto) {
    alert('Você precisa estar logado para acessar esta página.');
    window.location.href = 'login.html';
  }

  // === TOGGLE SENHA LOGIN ===
  const senhaInput = document.getElementById('isenha');
  const toggleSenha = document.getElementById('toggleSenha');
  if (senhaInput && toggleSenha) {
    toggleSenha.addEventListener('click', () => {
      const tipoAtual = senhaInput.getAttribute('type');
      senhaInput.setAttribute('type', tipoAtual === 'password' ? 'text' : 'password');
      toggleSenha.textContent = tipoAtual === 'password' ? '🙈' : '👁️';
    });
  }

  // === TOGGLE SENHA REDEFINIR ===
  const novaSenhaInput = document.getElementById('novaSenha');
  const toggleNovaSenha = document.getElementById('toggleNovaSenha');
  if (novaSenhaInput && toggleNovaSenha) {
    toggleNovaSenha.addEventListener('click', () => {
      const tipoAtual = novaSenhaInput.getAttribute('type');
      novaSenhaInput.setAttribute('type', tipoAtual === 'password' ? 'text' : 'password');
      toggleNovaSenha.textContent = tipoAtual === 'password' ? '🙈' : '👁️';
    });
  }

  // === FORMULÁRIO DE CADASTRO ===
  const formCadastro = document.getElementById('form-cadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome_completo = document.getElementById('inome').value;
      const usuario = document.getElementById('iusuario').value;
      const email = document.getElementById('iemail').value;
      const senha = document.getElementById('isenha').value;

      try {
        const res = await fetch('http://127.0.0.1:3000/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome_completo, usuario, email, senha }),
        });

        const data = await res.json();

        if (res.ok) {
          // Loga o usuário após cadastro
          localStorage.setItem('usuario', usuario);
          localStorage.setItem('nome_completo', nome_completo);
          alert(data.mensagem || 'Cadastro realizado com sucesso! Você já está logado.');
          window.location.href = 'index.html';
        } else {
          alert(data.erro || 'Erro no cadastro');
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor');
        console.error(error);
      }
    });
  }

  // === FORMULÁRIO DE LOGIN ===
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();

      const usuario = document.getElementById('iusuario').value;
      const senha = document.getElementById('isenha').value;

      try {
        const res = await fetch('http://127.0.0.1:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, senha }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('usuario', data.usuario);
          localStorage.setItem('nome_completo', data.nome_completo);
          alert('Login bem-sucedido!');
          window.location.href = 'index.html';
        } else {
          alert(data.erro || 'Erro no login');
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor');
        console.error(error);
      }
    });
  }

  // === FORMULÁRIO DE REDEFINIR SENHA ===
  const formRedefinirSenha = document.getElementById('formRedefinirSenha');
  if (formRedefinirSenha) {
    formRedefinirSenha.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const novaSenha = document.getElementById('novaSenha').value;

      try {
        const res = await fetch('http://127.0.0.1:3000/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, novaSenha }),
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.mensagem || 'Senha redefinida com sucesso!');
          window.location.href = 'login.html';
        } else {
          alert(data.erro || 'Erro ao redefinir senha');
        }
      } catch (error) {
        alert('Erro ao conectar com o servidor');
        console.error(error);
      }
    });
  }
});
