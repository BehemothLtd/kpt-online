import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload; 
    }
  },
  actions: {
    setUser(context, payload) {
      context.commit('SET_USER', payload);
    }
  },
  modules: {
  }
})
