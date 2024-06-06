import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false,

  },
  device: 'desktop',
  trunoff: true,
  refresh:false,
  refresh2:false,
  refresh3:false,
  refresh4:false,
  length:JSON.parse(localStorage.getItem('length')),
  lengthtwo:JSON.parse(localStorage.getItem('lengthtwo')),
  allread:JSON.parse(localStorage.getItem('allread'))|| true
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  TRUNOFF: (state, device) => {
    state.trunoff= device
  },
  REFRESH: (state, device) => {
    state.refresh= device
  },
  REFRESH2: (state, device) => {
    state.refresh2= device
  },
  REFRESH3: (state, device) => {
    state.refresh3= device
  },
  REFRESH4: (state, device) => {
    state.refresh4= device
  },
  MESSAGELIST: (state, device) => {
    localStorage.setItem(`length`, JSON.parse(device))
    state.length= device
  },
  MESSAGELISTTwo: (state, device) => {
    localStorage.setItem(`lengthtwo`, JSON.parse(device))
    state.lengthtwo= device
  },
  ALLREAD:(state,device)=>{
    localStorage.setItem(`allread`, JSON.parse(device))
    state.allread= device
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
