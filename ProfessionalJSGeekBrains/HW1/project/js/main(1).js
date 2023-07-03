const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 }
];

const renderProduct = (title = 'Название товара', id = 0, price = 'Нет в наличии') => {
    document.querySelector('.products').insertAdjacentHTML('beforeend', `
        <div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
        </div>
    `);
};

const render = (products) => products.map(item => renderProduct(item.title, item.id, item.price));

render(data);