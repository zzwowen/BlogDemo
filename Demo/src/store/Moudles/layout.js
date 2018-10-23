
const layout = {
  state: {
    headerHeight:60,
    headerColor:'#ffd100'
  },
  mutations: {
    SHOW_HEADER: state => {
      state.headerHeight = 75
    },
    HIDE_HEADER: state => {
      state.headerHeight = 0
    },
    SET_HEADER_HEIGHT: (state, obj) => {
      state.headerHeight = obj.headerHeight ? obj.headerHeight : 75
    },
    SET_HEADER_COLOR: (state, obj) => {
      state.headerColor = obj.headerColor ? obj.headerColor : state.headerColor
    }
  },
  actions: {
    show_header ({ commit }) {
      commit('SHOW_HEADER')
    },
    hide_header ({ commit }) {
      commit('HIDE_HEADER')
    },
    set_header_height ({ commit }, obj) {
      commit('SET_HEADER_HEIGHT', obj)
    },
    set_header_color ({ commit }, obj) {
      commit('SET_HEADER_COLOR', obj)
    }
  }
}

export default layout
