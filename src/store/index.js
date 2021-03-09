import { createStore } from 'vuex'

export default createStore({
  state: {
    city: localStorage.city || '南昌'
  },
  mutations: {
    changeCity(state, city) {
      localStorage.city = city
      state.city = city
    }
  },
  actions: {
  },
  modules: {
  }
})
