// login.js
async function fazerLogin() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: usernameInput, senha: passwordInput }),
    });

    if (response.ok) {
        alert('Login bem-sucedido!');
        window.location.href = 'encurtador.html';
    } else {
        alert('Usuário ou senha inválidos. Tente novamente.');
    }
}
