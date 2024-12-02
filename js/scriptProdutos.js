let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho salvo ou inicializa vazio

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Salva o carrinho no LocalStorage
}

function adicionarAoCarrinho(nome, preco, imagem) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find((item) => item.nome === nome);

    if (itemExistente) {
        // Se o item já estiver no carrinho, aumenta a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Caso contrário, adiciona o item ao carrinho
        carrinho.push({ nome, preco, imagem, quantidade: 1 });
    }

    salvarCarrinho(); // Salva o carrinho no navegador
    atualizarCarrinho(); // Atualiza a exibição do carrinho
}

function atualizarCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    const badge = document.getElementById('carrinho-badge');
    carrinhoLista.innerHTML = ''; // Limpa a lista de produtos

    let total = 0;

    carrinho.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('carrinho-item');

        // Cria a imagem do produto no carrinho
        const img = document.createElement('img');
        img.src = item.imagem;
        img.alt = item.nome;
        img.classList.add('carrinho-img');

        // Cria o texto do produto com nome, quantidade e subtotal
        const text = document.createElement('span');
        const subtotal = (item.quantidade * item.preco).toFixed(2);
        text.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${subtotal}`;

        // Adiciona ao total geral
        total += item.quantidade * item.preco;

        // Adiciona a imagem e o texto ao item da lista
        li.appendChild(img);
        li.appendChild(text);
        carrinhoLista.appendChild(li);
    });

    // Atualiza o badge do carrinho com o número total de itens
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    badge.textContent = totalItens;

    // Exibe o subtotal no final do carrinho
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('carrinho-total');
    totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
    carrinhoLista.appendChild(totalDiv);
}

function finalizarCompra() {
    // Redireciona para a página de finalizar compra
    window.location.href = 'finalizarCompra.html';
}

function toggleCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.classList.toggle('visible');
}

function adicionarAoCarrinho(nome, preco, imagem) {
    const itemExistente = carrinho.find((item) => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, imagem, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarQuantidade(nome, operacao) {
    const item = carrinho.find((item) => item.nome === nome);

    if (item) {
        if (operacao === 'incrementar') {
            item.quantidade += 1;
        } else if (operacao === 'diminuir') {
            item.quantidade -= 1;
            if (item.quantidade <= 0) {
                // Remove o item se a quantidade for 0
                carrinho = carrinho.filter((produto) => produto.nome !== nome);
            }
        }
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    const badge = document.getElementById('carrinho-badge');
    carrinhoLista.innerHTML = '';

    let total = 0;

    carrinho.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('carrinho-item');

        // Imagem do produto
        const img = document.createElement('img');
        img.src = item.imagem;
        img.alt = item.nome;
        img.classList.add('carrinho-img');

        // Informações do produto
        const text = document.createElement('span');
        const subtotal = (item.quantidade * item.preco).toFixed(2);
        text.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${subtotal}`;

        // Botões de quantidade
        const controls = document.createElement('div');
        controls.classList.add('quantidade-controle');

        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.classList.add('btn-controle');
        minusButton.onclick = () => atualizarQuantidade(item.nome, 'diminuir');

        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.classList.add('btn-controle');
        plusButton.onclick = () => atualizarQuantidade(item.nome, 'incrementar');

        // Adiciona os botões de controle
        controls.appendChild(minusButton);
        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.textContent = item.quantidade;
        controls.appendChild(quantidadeSpan);
        controls.appendChild(plusButton);

        // Monta o item do carrinho
        li.appendChild(img);
        li.appendChild(text);
        li.appendChild(controls);
        carrinhoLista.appendChild(li);

        total += item.quantidade * item.preco;
    });

    // Atualiza o badge e o total
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    badge.textContent = totalItens;

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('carrinho-total');
    totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
    carrinhoLista.appendChild(totalDiv);
}


// Atualiza o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
