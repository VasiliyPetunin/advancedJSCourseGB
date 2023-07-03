class Products {
    data = [];
    products = [];
    container = null;
    productsCost = 0;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData();
        this._render();
        this._countProductCost()
    }

    _fetchData() {
        this.data = [
            { title: 'Notebook', id: 1, price: 2000 },
            { title: 'Keyboard', id: 2, price: 200 },
            { title: 'Mouse', id: 3, price: 100 },
            { title: 'Gamepad', id: 4, price: 87 }
        ];
    }

    _render() {
        for (let data of this.data) {
            const product = new ProductItem(data);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    _countProductCost() {
        for (let dataObj of this.data) {
            this.productsCost += dataObj.price;
        }
        console.log(this.productsCost);
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';

    constructor(product, img = 'https://placehold.it/200x150') {
        ({ title: this.title, price: this.price, id: this.id } = product);
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}


class Cart {
    cartItems = []; // Массив с товарами, добавленными в корзину пользователем
    container = ''; // Свойство, которое будет хранить родительский контейнер для отрисовки внутри него товаров корзины
    cartItemsCost = 0; // Свойство, внутри которого будет находится суммарная стоимость всех товаров в корзине

    _countCartItemsCost() {
        // Метод, считающий суммарную стоимость всех товаров в корзине
    }

    _render() {
        // Метод, отрисовывающий корзину
    }

    _getCartItems() {
        // Метод, получающий все товары, добавленные пользователем в корзину,
        // и отсылающий их в cartItems в виде массива с объектами
    }
}

class CartItem {
    title = ''; // Название товара
    price = 0; // Цена товара за штуку
    id = 0; // Идентификатор товара
    img = ''; // Изображение товара
    quantity = 0; // Кол-во товара

    render() {
        // Метод, возвращающий разметку для товара корзины
    }

    addOneMoreProduct() {
        // Метод, добавляющий ещё один такой же товар
    }

    deleteOneProduct() {
        // Метод, удаляющий один такой же товар
    }

    deleteProductInAll() {
        // Метод, удаляющий товар, если его количество равняется 0
    }
}

const list = new Products('.products');





