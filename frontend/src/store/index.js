/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
  state: {
    // user:null,
    mealKits:null,
    meals:null,
    // cart:null,
    delivery_information: null
  },
  getters: {
  },
  mutations: {
    // setUser(state,payload){
    //   state.user = payload
    // },
    setMealKits(state,payload){
      state.mealKits = payload
    },
    setMeals(state,payload){
      state.meals = payload
    },
    setDeliveryInformation(state, payload) {
      state.delivery_information = payload;
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
    },
    async getCart({commit},payload){
      let {cart} = await (await fetch(`http://localhost:3000/cart/${userId}`)).json()
      commit('setCart', cart) 
    },
    async insertDeliveryInformation({ dispatch }, deliveryInformation) {
      try {
        await fetch('http://localhost:3000/delivery_information_checkout', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            phone_number: deliveryInformation.phone_number,
            address_line: deliveryInformation.address_line,
            city: deliveryInformation.city,
            postal_code: deliveryInformation.postal_code
          })
        });
        dispatch('getData');
      } catch (error) {
        console.error("Failed to insert delivery information:", error);
      }
    }
  },
  modules: {}
});
