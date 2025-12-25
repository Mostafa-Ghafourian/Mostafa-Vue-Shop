import { defineStore } from 'pinia'
import type { productsType } from './productType'


export const useStoreProductAPI = defineStore('storeProductAPI', {
    state: () => ({
        products: [] as productsType[],
        loading: false,
        error: null as string | null
    }),
    actions: {
        async getProducts() {
            this.loading = true
            this.error = null
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json()
                this.products = data
            } catch (err) {
                this.error = 'خطا در دریافت محصولات'
                console.error(err)
            } finally {
                this.loading = false
            }
        }
    },
    getters: {
        getProductById: (state) => (id: number) => {
            return state.products.find(product => product.id === id)
        }
    }
})
