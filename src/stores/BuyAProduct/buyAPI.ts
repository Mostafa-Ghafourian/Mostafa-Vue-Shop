import {defineStore} from "pinia";

export const buyAPI = defineStore('buyAPI', {
  state: () => ({
    loading: false,
    productId: null,
    quantity: null,
    userId: 1,
    title: null,
    prise: null,
    image: null,
    userBasket: [] as { id: number; title: string; price: number; image: string; quantity: number }[]
  }),

  actions: {
    async buyProduct() {
      this.loading = true;
      try {
        const res = await fetch('https://fakestoreapi.com/carts', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId: this.userId,
            date: new Date().toISOString(),
            products: [
              {productId: this.productId, quantity: this.quantity}
            ]
          })
        });
        const data = await res.json();
        console.log(data);

        const existing = this.userBasket.find(p => p.id === this.productId);
        if (existing) {
          existing.quantity += this.quantity;
        } else {
          this.userBasket.push({
            id: this.productId,
            title: this.title,
            price: this.prise,
            image: this.image,
            quantity: this.quantity
          });
        }

      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    addToBasket(product: {
      id: number;
      title: string;
      price: number;
      image: string
    }, quantity: number) {
      const existing = this.userBasket.find(p => p.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.userBasket.push({...product, quantity});
      }
    }
  }
});
