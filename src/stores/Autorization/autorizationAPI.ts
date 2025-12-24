import {defineStore} from "pinia";
import router from "@/router";

export const authorizationAPI = defineStore('authorization',
  {
    state: () => {
      return {
        loading: false,
        errorMessage: '',
        id: '',
        username: '',
        password: '',
        email: '',
      }
    },
    actions: {
      async fetchSingUp() {
        this.loading = true
        try {
          const res = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.id,
              username: this.username,
              email: this.email,
              password: this.password,
            })
          })
          const data = await res.json()
          console.log(data);
          await router.push('/')

        } catch (error) {
          this.errorMessage = 'مشکلی در ثبت نام پیش آمده است'
        } finally {
          this.loading = false
        }
      },

      async fetchLogin() {
        this.loading = true
        try {
          const res = await fetch('https://fakestoreapi.com/users', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            // body: JSON.stringify({
            //   username: this.username,
            //   password: this.password,
            // })
          })

          const data = await res.json()
          localStorage.setItem('Token', data.token)
          console.log(data);

        } catch (error) {
          this.errorMessage = 'مشکلی در ورود پیش آمده است'
        } finally {
          this.loading = false
        }
      },
    }
  }
)
