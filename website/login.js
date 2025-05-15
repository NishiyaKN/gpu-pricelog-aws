function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
  
    if (user === 'petulho' && pass === 'sodorme') {
      window.location.href = 'grafico.html';
    } else {
      document.getElementById('msg').textContent = 'Usuário ou senha incorretos';
    }
    return false;
  }
  