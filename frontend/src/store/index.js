/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
  state: {
    user:null,
    mealKits:null,
    meals:null,
    cart:null,
    delivery_information: null
  },
  getters: {
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
    },
    setMealKits(state,payload){
      state.mealKits = payload
    },
    setMeals(state,payload){
      state.meals = payload
    },
    setCart(state,payload){
      state.cart = payload
    },
    addToCart(state,payload){
      if (!state.cart) state.cart = [];
      const existingItem = state.cart.find(item => item.cart_id === payload.cart_id)
      if (existingItem){
        existingItem.quantity += payload.quantity
      }else{
        state.cart.push(payload)
      }
    },
    removeFromCart(state, cartId){
      state.cart = state.cart.filter(item => item.cart_id !== cartId)
    },
  },
  actions: { 
    async loginUser({commit}, credentials){
      const response = await fetch("http://localhost:3000/login",{
        method: 'POST',
        headers: {'Content-Type': 'application.json'},
        body: JSON.stringify(credentials)
      })
      const data = await response.json()
      if (data.user){
        commit('setUser', data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    },
    async signupUser({commit}, userData){
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
      })
      const data = await response.json()
      if (data.user){
        commit('setUser', data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
      }
    },
    async getMealKits({commit},payload){
      try {
        let {mealKits} = await (await fetch('http://localhost:3000/mealkits/')).json()
        commit('setMealKits', mealKits)
    }catch (error){
      console.error("Failed to fetch meal kits:", error)
    }
    },
    async getReadyMeals({commit},payload){
      try {
        let {meals} = await (await fetch('http://localhost:3000/meals/')).json()
        commit('setMeals', meals)
    }catch(error){
      console.error("Failed to fetch ready meals:", error)
    }
    },
    async getCart({commit},payload){
      try {
        let {cart} = await (await fetch(`http://localhost:3000/cart/${userId}`)).json()
      commit('setCart', cart)
    }catch(error){
      console.error('Failed to fetch cart:', error)
    }
    },
    async addToCart({commit}, {userId, mealKitId, readyMealId, quantity, subtotal}){
      try{
        await fetch('http://localhost:3000/cart',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({user_id: userId, meal_kit_id: mealKitId, ready_meal_id: readyMealId, quantity, subtotal})
        })
      }catch (error){
        console.error('Failed to add item to cart:', error)
      }
    },
    async removeFromCart({commit}, cartId){
      try{
        await fetch(`http://localhost:3000/cart/${cartId}`, {method: 'DELETE'})
        commit('removeFromCart', cartId)
      }catch (error){
        console.error('Failed to remove item from cart',)
      }
    },
    async getData({commit},payload){
      // let delivery_information = await fetch('http://localhost:3000/delivery_information_checkout')
      // let info = await delivery_information.json()
    let {delivery_information} = await (await fetch('http://localhost:3000/delivery_information_checkout')).json()

      console.log(delivery_information);
      commit('setDeliveryInformation', delivery_information) 
    },
    async deleteDeliveryInformation({commit},delivery_id){
      await fetch('http://localhost:3000/delivery_information_checkout/'+delivery_id, {
        method: 'DELETE' 
      })
      location.reload()
      // console.log(delivery_id);
      
    },
    async insertDeliveryInformation({commit}, deliveryInformation){
      console.log(deliveryInformation);
      
    }
  },
  modules: {}
});
