
const base = {
  state: {
    language:'cn',
    theme:'#ffd100'
  },
  mutations: {
    SET_THEME: (state, obj) => {
      state.theme = obj.theme ? obj.theme : 'cn'
    },
    SET_LANGUAGE: (state, obj) => {
      state.language = obj.language ? obj.language : 'cn'
    }
  },
  actions: {
    set_theme ({ commit }, obj) {
      commit('SET_THEME', obj)
    },
    set_language ({ commit }, obj) {
      commit('SET_LANGUAGE', obj)
    }
  }
}

export default base
