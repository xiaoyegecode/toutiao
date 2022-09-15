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
    myChannels: JSON.parse(window.localStorage.getItem('TOUTIAO_CHANNELS')) || [],
    histories: JSON.parse(window.localStorage.getItem('TOUTIAO_HISTORY')) || []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
      window.localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(token))
    },
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
      window.localStorage.setItem('TOUTIAO_CHANNELS', JSON.stringify(channels))
    },
    SET_HISTORIES(state, histories) {
      state.histories = histories
      window.localStorage.setItem('TOUTIAO_HISTORY', JSON.stringify(histories))
    }
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  }
})
