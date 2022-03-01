import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'




Vue.use(Vuex)

const store =  new Vuex.Store({
  modules: {
    app
  },
  // strict: debug,
})

// 把提示框挂载到vue实例上
function snackbar(msg) {
  // store.commit("app/snack", { value: true, content: msg });
  store.commit('app/updateSnackbar', { value: true, content: msg })
}
Vue.prototype.$snackbar = snackbar

export default store
