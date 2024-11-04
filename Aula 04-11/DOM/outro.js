const params = new URLSearchParams(window.location.search);

const id = params.get('id')

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const acha_cookie = (chave) => {
    const array_cookie = document.cookie.split('; ');
    const procurado = array_cookie.find(
        ( ele ) => ele.startsWith(`${chave}=`)
    )

    return procurado.split('=')[1];
}


console.log(acha_cookie('nome'));

console.log(sessionStorage.getItem('nome'));

const obj = JSON.parse(sessionStorage.getItem('atleta'));

console.log(obj.caminhoImagem);

pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
    ( atleta ) => {
        document.body.innerHTML = '';
        
        const nome = document.createElement('h1');
        nome.innerHTML = atleta.nome;

        document.body.appendChild(nome);

        const imagem = document.createElement('img');
        imagem.src = atleta.imagem;
        imagem.alt = `foto de ${atleta.nome}`

        document.body.appendChild(imagem);
    }
)