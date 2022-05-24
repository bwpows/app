const state = {
  unreadNum: 0,
  snackbar: {
      value: false,
      content: ''
  }
}

// getters 相当于计算属性，过滤的功能
const getters = {
}

// actions
const actions = {
}

// mutations
const mutations = {
  updateSnackbar(state, obj){
    let objs = JSON.stringify(obj)
    objs = JSON.parse(objs)
    state.snackbar = objs
  },

  updateUnreadNum(state, num) {
    state.unreadNum = num
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}