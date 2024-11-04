window.onload = function () {
    const container = document.getElementById('container');

    const pega_json = async (caminho) => {
        const resposta = await fetch(caminho);
        const dados = await resposta.json();
        return dados;
    }

    const trataClick = ( e ) => {
        const artigo = e.currentTarget;

        //cookie
        document.cookie = `id=${artigo.dataset.id}`
        document.cookie = `nome=${artigo.dataset.nome}`
        
        // session
        sessionStorage.setItem('id', artigo.dataset.id);
        sessionStorage.setItem('nome', artigo.dataset.nome);
        sessionStorage.setItem('atleta', JSON.stringify(artigo.dataset));

        //local
        localStorage.setItem('id', artigo.dataset.id);

        window.location = `outra.html?id=${artigo.dataset.id}`
        

    }

    const montaCartao = (atleta) => {
        const cartao = document.createElement('article');
        const nome = document.createElement('h1');
        const imagem = document.createElement('img');
        const desc = document.createElement('p');

        nome.innerHTML = atleta.nome;
        cartao.appendChild(nome);

        imagem.src = atleta.imagem;
        cartao.appendChild(imagem);

        desc.innerHTML = atleta.detalhes;
        cartao.appendChild(desc);

        /*link.innerHTML = "Saiba Mais..."
        link.href = `outra.html?id=${atleta.id}&altura=${atleta.altura}`
        cartao.appendChild(link)*/

        cartao.onclick = trataClick;

        cartao.dataset.id = atleta.id;
        cartao.dataset.nome = atleta.nome;
        cartao.dataset.imagem = atleta.imagem;

        container.appendChild(cartao);
    }

    pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then(
        ( obj ) => {
        console.log(`isso imprime depois`);
        obj.forEach( (elemento) => montaCartao(elemento));
        }
    )

    console.log(`isso imprime antes`);

}