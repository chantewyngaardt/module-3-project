/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
  state: {
    mealKits:null,
    cart: null
  },
  getters: {
  },
  mutations: {
    setMealKits(state,payload){
      state.mealKits = payload
    },
    setMeals(state,payload){
      state.meals = payload
    },
    addToCart(state, item) {
      const existingItem = state.cart.find(cartItem => 
        (cartItem.meal_kit_id && cartItem.meal_kit_id === item.meal_kit_id) || 
        (cartItem.ready_meal_id && cartItem.ready_meal_id === item.ready_meal_id)
      );
  
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    updateCartItemQuantity(state, { itemId, quantity, type }) {
      const item = state.cart.find(cartItem => 
        (type === 'mealKit' && cartItem.meal_kit_id === itemId) || 
        (type === 'readyMeal' && cartItem.ready_meal_id === itemId)
      );
  
      if (item) {
        item.quantity = quantity;
      }
    },
    removeCartItem(state, { itemId, type }) {
      state.cart = state.cart.filter(cartItem => 
        !((type === 'mealKit' && cartItem.meal_kit_id === itemId) || 
          (type === 'readyMeal' && cartItem.ready_meal_id === itemId))
      );
    }
  },
  actions: { 
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
    }
  },
  modules: {
  }
})