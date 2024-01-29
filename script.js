// No arquivo script.js
async function submitForm() {
    // Obter os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const msg = document.getElementById('msg');

    const dominios = [
        '@gmail.com',
        '@hotmail.com',
        '@outlook.com',
        '@live.com',
        '@yahoo.com',
        '@yahoo.com.br',
        '@icloud.com',
        '@mac.com'
    ];

    function verificaDominio(email) {
        for (const dominio of dominios) {
            if (email.includes(dominio)) {
                return true; // A string contém um dos domínios
            }
        }
        return false; // A string não contém nenhum dos domínios
    }

    // Validação de e-mail
    if (!verificaDominio(email)) {
        msg.innerHTML = 'Por favor, use um e-mail com um domínio válido.';
        return;
    }

    // Validação de senha
    if (password.length < 6) {
        msg.innerHTML = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    // Validação de confirmação de senha
    if (password !== confirmarSenha) {
        msg.innerHTML = 'A senha e a confirmação de senha não coincidem.';
        return;
    }

    // Criar um objeto com os dados do formulário
    const formData = {
        name: name,
        email: email,
        password: password
    };

    try {
        // Enviar os dados para o servidor usando fetch API
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.text();
        console.log(data); // Exibir a resposta do servidor no console
        msg.innerHTML = 'Cadastro feito com sucesso';

        // Redirecionar para a página de login após um pequeno intervalo
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000); // Redireciona após 2 segundos 
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        msg.innerHTML = 'Erro ao enviar dados. Por favor, tente novamente.';
    }
}
