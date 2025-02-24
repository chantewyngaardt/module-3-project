/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
  state: {
    mealKits:null,
    cart: [],
    delivery_information: null
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
    setDeliveryInformation(state, payload){
      state.delivery_information = payload

    }
  },
  actions: {
    
    async getData({commit},payload){
      console.log("Hey there");
      
      let {mealKits} = await (await fetch('http://localhost:3000/mealkits/')).json()
      commit('setMealKits', mealKits)
    },
    async getData({commit},payload){
      let {meals} = await (await fetch('http://localhost:3000/meals/')).json()
      console.log(meals)
      commit('setMeals', meals)
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
  modules: {
  }
})