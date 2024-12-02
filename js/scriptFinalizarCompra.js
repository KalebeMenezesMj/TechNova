// carregar o carrinho
function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;
    const produtosDiv = document.getElementById('produtos-carrinho');

    produtosDiv.innerHTML = ''; 

    carrinho.forEach((item, index) => {
        const preco = parseFloat(item.preco) || 0;
        const quantidade = item.quantidade || 1;
        const subtotalItem = preco * quantidade; 

        total += subtotalItem; // Soma o subtotal do item ao total

        // Adicionar produtos no carrinho
        const produtoHTML = `
            <div class="row mb-3" data-index="${index}">
                <div class="col-md-4">
                    <img src="${item.imagem}" class="rounded-3" style="width: 100px;" alt="${item.nome}" />
                </div>
                <div class="col-md-6 ms-3">
                    <span class="mb-0 text-price">$${preco.toFixed(2)}</span>
                    <p class="mb-0 text-descriptions">${item.nome}</p>
                    <p class="mb-0">Quantidade: 
                        <button class="alterar-quantidade" data-action="decrement">-</button>
                        <span class="quantidade">${quantidade}</span>
                        <button class="alterar-quantidade" data-action="increment">+</button>
                    </p>
                    <p class="mb-0">Subtotal: $<span class="subtotal-item">${subtotalItem.toFixed(2)}</span></p>
                </div>
            </div>
        `;
        produtosDiv.innerHTML += produtoHTML;
    });

    // subtotal e o total
    document.getElementById('subtotal').innerText = `$${total.toFixed(2)}`;
    document.getElementById('total-pagar').innerText = `$${total.toFixed(2)}`;

    // botões de alteração de quantidade
    document.querySelectorAll('.alterar-quantidade').forEach(button => {
        button.addEventListener('click', (event) => {
            const action = event.target.getAttribute('data-action');
            const index = event.target.closest('.row').dataset.index;
            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

            let novaQuantidade = carrinho[index].quantidade || 1;

            if (action === 'increment') {
                novaQuantidade++;
            } else if (action === 'decrement' && novaQuantidade > 1) {
                novaQuantidade--;
            }

            carrinho[index].quantidade = novaQuantidade;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));

            carregarCarrinho();
        });
    });
}

// limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
  }

window.onload = carregarCarrinho;
