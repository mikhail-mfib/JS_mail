'use strict';

const image = 'https://placehold.it/200x150',
      cartImage = 'https://placehold.it/100x80',
      API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//слушатели
document.addEventListener('click', (evt) => {
    if(!evt.target.closest('.btn-cart')) {
        document.querySelector('.cart-block').classList.add('invisible');
    }

    if(evt.target.matches('.btn-cart')) {
        document.querySelector('.cart-block').classList.toggle('invisible');
    }

    if (evt.target.matches('.buy-btn')) {
        document.querySelector('.cart-block').classList.remove('invisible');
        cartBlock.addProduct(evt.target.dataset.name, evt.target.dataset.price);
    }

    if(evt.target.matches('.delete-btn')) {
        document.querySelector('.cart-block').classList.remove('invisible');
        cartBlock.deleteProduct(evt.target.parentNode);
    }
});

class ProductsList {
    constructor() {
        this.products = [];
        this.fetchProducts();
    }
    makeGETRequest(url) {
        return new Promise((resolve, reject) => {
            let xhr;
      
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        
            xhr.open('GET', url, true);
            xhr.addEventListener('readystatechange', () => {
                if(xhr.readyState !== 4) {
                    return;
                }
                if(xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            });
    
            xhr.send();
        });
    }
    fetchProducts() {
        this.makeGETRequest(`${API_URL}/catalogData.json`)
            .then((data) => {
                this.products = JSON.parse(data);
                return this.products;
            })
            .then(this.render)
            .catch(err => console.error(err));
    }
    render(products) {
        let listHtml = '';
        products.forEach(good => {
          const goodItem = new Product(good, image);
          listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}

class Product {
    constructor (product, image) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = image;
    }
    render() {
        return `<div class="product-item">
                    <h3>${this.product_name}</h3>
                    <img src='${this.img}'>
                    <p>Цена: ${this.price}</p>
                    <button class='buy-btn' data-name='${this.product_name}' data-price='${this.price}'>Купить</button>
                </div>`;
    }
}

const catalog = new ProductsList();

class Cart {
    constructor() {
        this.num = 0;
    }
    addProduct(name, price) {
        let newCartItem = new CartItem(name, price);
        this.render(newCartItem.render());
    }
    deleteProduct(elem) {
        elem.remove();
    }
    render(item) {
        const cart = document.querySelector('.cart-block');
        cart.appendChild(item);
        this.num++;
    }
}

class CartItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    render() {
        const block = document.createElement('div');
        block.innerHTML = `<h3>${this.name}, ${this.price}</h3>
                           <button class='delete-btn'>Удалить</button>`;
        return block;
    }
}

let cartBlock = new Cart(); 