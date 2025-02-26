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
    // async getCart({commit},payload){
    //   let {cart} = await (await fetch(`http://localhost:3000/cart/${userId}`)).json()
    //   commit('setCart', cart) 
    // },
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
  modules: {
  }
})