import cart from './cartComp'
import products from './prodComp'

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
	el: '#app',
	data: {
		userSearch: '',
		filtered: []
	},
	components: {
		cart, products
	},
	methods: {
		getJSON (url) {
			return fetch (url)
				.then (result => result.json ())
				.catch (error => {
					console.log (error)
			})
		},
		postJSON (url, data) {
			return fetch (url, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify (data)
			})
				.then (result => result.json ())
				.catch (error => {
					console.log (error)
			})
		},
		putJSON (url, data) {
			return fetch (url, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify (data)
			})
				.then (result => result.json ())
				.catch (error => {
					console.log (error)
			})
		},
		deleteJSON (url) {
			return fetch (url, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then (result => result.json ())
				.catch (error => {
					console.log (error)
			})
		},
		filter (str) {
			let reg = new RegExp (this.userSearch, 'i')
			this.filtered = this.products.filter (el => reg.test(el.product_name))
		}
	},
	mounted () {
		this.getJSON (`${API_URL + this.catalogUrl}`)
			.then (data => {
				for (let el of data) {
					this.products.push (el)
					this.filtered.push (el)
				}
			})
	},
	
})

export default app