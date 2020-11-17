import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: null,
    attemptedCode: null,
    codeMessage: null,
    attemptedPasswords: [],
    success: false
  }
})
