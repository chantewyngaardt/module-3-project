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
    }
  },
  actions: {
    async getData({commit},payload){
      let {mealKits} = await (await fetch('http://localhost:3000/mealkits/')).json()
      commit('setMealKits', mealKits)
    }
  },
  modules: {
  }
})