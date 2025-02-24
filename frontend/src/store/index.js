/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
  state: {
    user:null,
    mealKits:null,
    meals:null,
    cart:null
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
    }
  },
  actions: { 
    async fetchUser({commit},payload){
      try{
        let response = await fetch('http://localhost:3000/auth/user', {credentials: 'include'});
        let data = await response.json();
        commit('setUser', user)
      }catch(error){
        console.error('Error fetching user', error)
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
      let {cart} = await (await fetch(`http://localhost:3000/cart/${userId}`)).json()
      commit('setCart', cart) 
    }
  },
  modules: {
  }
})