async function Mostrar() {
  let link = document.getElementById('originalUrl').value;
  let texto = document.getElementById('shortenedUrl');

  try {
    const linkEncurtado = await Encurtar(link);
    texto.innerHTML = `Seu link encurtado: <a href="${linkEncurtado}" target="_blank">${linkEncurtado}</a>`;
  } catch (erro) {
    texto.innerHTML = 'Erro ao encurtar o link.';
  }
}

async function Encurtar(link) {
  const apiUrl = 'http://localhost:3000/shorten';  // Altere para o mesmo caminho usado no servidor
  const resposta = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      long_url: link,
    }),
  });

  const dados = await resposta.json();
  return dados.short_url;  // Assumindo que o servidor responde com { short_url: '...' }
}