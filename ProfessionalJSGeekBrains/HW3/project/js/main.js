
const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

/*let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    // window.ActiveXObject -> new ActiveXObject();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            console.log('some error');
            return;
        }

        cb(xhr.responseText);
    }
}; */


class Products {
    data = [];
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData();
            // .then(() => this._render());
        this._render();
    }

    calcSum() {
        return this.products.reduce((accum, item) => accum += item.price, 0);
    }

    _fetchData() {
        /*return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                for (let product of data) {
                    this.products.push(new ProductItem(product));
                }
            })*/
        this.data = [
            { title: 'Notebook', id: 1, price: 2000 },
            { title: 'Keyboard', id: 2, price: 200 },
            { title: 'Mouse', id: 3, price: 100 },
            { title: 'Gamepad', id: 4, price: 87 }
        ];
    }

    _render() {
        /*for (let product of this.products) {
            if (product.rendered) {
                continue;
            }

            this.container.insertAdjacentHTML('beforeend', product.render())
        }*/
        for (let data of this.data) {
            const product = new ProductItem(data);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

class ProductItem {
    title = '';
    price = 0;
    id = 0;
    img = '';
    rendered = false;

    constructor(product, img = 'https://placehold.it/200x150') {
        ({ title: this.title, price: this.price, id: this.id } = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" id="${this.id}">Купить</button>
                 </div>
             </div>`
    }
}


// class Cart {
//     cartItems = []; // Массив с товарами, добавленными в корзину пользователем
//     container = ''; // Свойство, которое будет хранить родительский контейнер для отрисовки внутри него товаров корзины
//     cartItemsCost = 0; // Свойство, внутри которого будет находится суммарная стоимость всех товаров в корзине


//     constructor (selectorForContainer, selectorForBuyButtons, selectorForCart) {
//         this.container = document.querySelector(selectorForContainer);
//         this._clickHandlerOnBuyButton(selectorForBuyButtons, selectorForCart);
//     }

//     _showOrHideCart(event) {
//         let cartItemsBlock = document.querySelector('.cartItems');
//         if (cartItemsBlock.classList.contains('showCartItems')) {
//             cartItemsBlock.classList.remove('showCartItems');
//         }   else {
//             cartItemsBlock.classList.add('showCartItems');
//         }
//     }

//     _countCartItemsCost() {
//         this.cartItemsCost = 0;
//         for (let product of this.cartItems) {
//             this.cartItemsCost += product.price;
//         }
//     }

//     _render() {
//         this.container.innerHTML = this.cartItems.map((product) => product.render()).join('') + `<div class="total-cost">${this.cartItemsCost}</div>`;
//     }

//     _findProductFromProducts(productId) {
//         for (let product of list.products) {
//             if (productId === product.id) {
//                 return product;
//             }
//         }
//     }

//     _findProductFromCartItems(productId) {
//         for (let product of this.cartItems) {
//             if (productId === product.id) {
//                 return product;
//             }
//         }
//     }

//     _getCartItem(event) {
//         let productId = event.target.id;
//         let isExistInCartItems = this._findProductFromCartItems(productId);
//         if (isExistInCartItems !== undefined) {
//             for (let product of this.cartItems) {
//                 if (productId === product.id) {
//                     product.quantity++;
//                 }
//             }
//         }   else {
//             let product = this._findProductFromProducts(productId);
//             this.cartItems.push(new CartItem(product));
//         }
//         this._render();
//         this._clickHandlerOnButtonsInCart();
//     }

//     _clickHandlerOnBuyButton(selector, selectorForCart) {
//         let allBuyButtons = document.querySelectorAll(selector);
//         allBuyButtons.forEach((buyButton) => {
//             buyButton.addEventListener('click', this._getCartItems);
//         });
//         let cart = document.querySelector(selectorForCart);
//         cart.addEventListener('click', this._showOrHideCart);
//     }

//     _clickHandlerOnButtonsInCart() {
//         let addItemButtonsInCart = document.querySelectorAll('.add-item');
//         addItemButtonsInCart.forEach(button => {
//             button.addEventListener('click', this._addOneMoreProduct);
//         });
//         let deleteItemButtonsInCart = document.querySelectorAll('.delete-item');
//         deleteItemButtonsInCart.forEach(button => {
//             button.addEventListener('click', this._deleteOneProduct);
//         });
//     }

//     _addOneMoreProduct(event) {
//         let productId = event.target.id;
//         for (let product of this.cartItems) {
//             if (productId === product.id) {
//                 product.quantity++;
//             }
//         }
//         this._render();
//     }

//     _deleteOneProduct(event) {
//         let productId = event.target.id;
//         for (let product of this.cartItems) {
//             if (productId === product.id) {
//                 product.quantity--;
//             }
//             if (product.quantity === 0) {
//                 this.deleteProductInAll();
//             }
//         }
//         this._render();
//     }

//     _deleteProductInAll() {
//         this.cartItems = this.cartItems.filter(product => {
//             if (product.quantity !== 0) {
//                 return product;
//             }
//         });
//     }
// }

// class CartItem {
//     title = ''; // Название товара
//     price = 0; // Цена товара за штуку
//     id = 0; // Идентификатор товара
//     img = ''; // Изображение товара
//     quantity = 0; // Кол-во товара

//     constructor (product) {
//         this.title = product.title;
//         this.img = product.img;
//         this.id = product.id;
//         this.price = product.price;
//         this.quantity++;
//     }

    
//     render() {
//         return `
//             <div class="cart-item">
//                 <img src="${this.img}" alt="${this.title}">
//                 <div class="desc">
//                     <h3>${this.title}</h3>
//                     <p>${this.price}</p>
//                     <span class="cart-item-quantity">${this.quantity}</span>
//                     <div class="cart-item-btns">
//                         <button class="add-item"><i class="fa fa-plus" aria-hidden="true"></i></button>
//                         <button class="delete-item"><i class="fa fa-minus" aria-hidden="true"></i></button>
//                     </div>
//                 </div>
//             </div>
//         `
//     }

    
// }

const list = new Products('.products');
console.log(list.calcSum());

// const cart = new Cart('.cartItems', '.buy-btn', '.btn-cart');




