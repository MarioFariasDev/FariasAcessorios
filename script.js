console.log("Site Farias Acessórios carregado!");

// Função para filtrar produtos por categoria
function filtrarPorCategoria(categoria) {
    document.querySelectorAll('.produto').forEach(prod => {
        if (categoria === 'tudo' || prod.dataset.categoria === categoria) {
            prod.style.display = 'block';
        } else {
            prod.style.display = 'none';
        }
    });
}

// Carrinho
const cartToggle = document.getElementById('cart-toggle');
const cart = document.getElementById('cart');
const cartList = cart.querySelector('ul');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cartItems = [];

function formatPrice(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateCart() {
    cartList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} x${item.quantidade}`;
        const priceSpan = document.createElement('span');
        priceSpan.textContent = formatPrice(item.preco * item.quantidade);
        li.appendChild(priceSpan);
        cartList.appendChild(li);
        total += item.preco * item.quantidade;
    });

    cartTotal.textContent = `Total: ${formatPrice(total)}`;
}

function addToCart(id, nome, preco) {
    const existing = cartItems.find(item => item.id === id);
    if (existing) {
        existing.quantidade++;
    } else {
        cartItems.push({ id, nome, preco, quantidade: 1 });
    }
    updateCart();
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', e => {
        const prod = e.target.closest('.produto');
        const id = prod.dataset.id;
        const nome = prod.dataset.nome;
        const preco = parseFloat(prod.dataset.preco);
        addToCart(id, nome, preco);
        alert(`Produto "${nome}" adicionado ao carrinho.`);
    });
});

cartToggle.addEventListener('click', () => {
    cart.style.display = cart.style.display === 'block' ? 'none' : 'block';
});

checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    const whatsappNumber = '+55092984791622';
    let message = `Olá Mario, gostaria de fazer o pedido:\n\n`;
    cartItems.forEach(item => {
        message += `- ${item.nome} x${item.quantidade} = R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    let total = cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    message += `\nTotal: R$ ${total.toFixed(2)}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
});
