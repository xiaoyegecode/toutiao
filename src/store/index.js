import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [createPersistedState({
  //   key: 'HEIMA_TOUTIAO',
  //   storage: window.sessionStorage,
  //   reducer({ tokenObj }) {
  //     return { tokenObj }
  //   }
  // })],
  state: {
    tokenObj: JSON.parse(window.localStorage.getItem('TOUTIAO_TOKEN')) || {},
    myChannels: JSON.parse(window.localStorage.getItem('TOUTIAO_CHANNELS')) || []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
      window.localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(token))
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
      window.localStorage.setItem('TOUTIAO_CHANNELS', JSON.stringify(channels))
    }
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  }
})
