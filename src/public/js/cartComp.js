const cartItem = {
    props: ['img', 'item'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <p class="product-title"> {{ item.product_name }} </p>
                            <p class="product-quantity">К-во: {{ item.quantity }} </p>
                            <p class="product-single-price">$ {{ item.price }} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{ item.price * item.quantity }}</p>
                        <button class="del-btn" @click="$root.$refs.cart.removeProduct(item)">&times;</button>
                    </div>
                </div>`
}

const cart = {
    data () {
        return {
            imgCart: 'https://placehold.it/100x80',
            cartUrl: `/getBasket.json`,
            cartItems: [],
            shown: false,
            API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
        }
    },
    components: {
        'cart-item': cartItem
    },
    methods: {
        addProduct (product) {
           let find = this.cartItems.find ( el => el.id_product === product.id_product )

           if (find) {
            this.$parent.putJSON (`/api/cart/${find.id_product}`, {quantity: 1})
                .then (data => {
                    if (data.result) {
                        find.quantity++
                    }
                })
           } else {
               let prod = Object.assign ({quantity: 1}, product)
               this.$parent.postJSON (`/api/cart/`, prod)
                .then (data => {
                    if (data.result) {
                        this.cartItems.push (prod)
                    }
            })
           }
        },
        removeProduct (product) {
            if (product.quantity > 1) {
                this.$parent.putJSON (`/api/cart/${product.id_product}`, {quantity: -1})
                .then (data => {
                    if (data.result) {
                        product.quantity--
                    }
                })
            } else {
                this.$parent.deleteJSON (`/api/cart/${product.id_product}`)
                .then (data => {
                    if (data.result) {
                        this.cartItems.splice (this.cartItems.indexOf(product), 1)
                    }
                })
            }
        }
    },
    mounted () {
        this.$parent.getJSON ('/api/cart')
			.then (data => {
				for (let el of data.contents) {
					this.cartItems.push (el)
				}
			})
    },
    template: `
                <div class="cart-wrap">
                    <button class="btn-cart" type="button" @click="shown = !shown">Корзина</button>
                    <div class="cart-block" v-show="shown">
                        <p v-if="!cartItems.length"> Cart is empty </p>
                        <cart-item 
                        v-for="product of cartItems"
                        :key="product.id_product"
                        :img="imgCart"
                        :item="product"
                        ></cart-item>
                    </div>
                </div>`
}

export default cart