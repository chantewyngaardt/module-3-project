/* eslint-disable */
import { createStore } from 'vuex'
export default createStore({
  state: {
    mealKits:null,
    cart: []
  },
  getters: {
  },
  mutations: {
    setMealKits(state,payload){
      state.mealKits = payload
    },
    setMeals(state,payload){
      state.meals = payload
    }
  },
  actions: {
    async getMealKits({commit},payload){
      let {mealKits} = await (await fetch('http://localhost:3000/mealkits/')).json()
      commit('setMealKits', mealKits)
    },
    async getMeals({commit},payload){
      let {meals} = await  (await fetch('http://localhost:3000/meals/')).json()
      console.log(meals)
      commit('setMeals', meals)
    }
  },
  modules: {
  }
})