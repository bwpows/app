// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
// import ripple from 'vuetify/lib/directives/ripple'

// Vue.use(Vuetify, { directives: { ripple } })
Vue.use(Vuetify)

let dark = localStorage.getItem('darkAuto') == 'true'

if(window.plus){
  console.log('判断plus')
	document.addEventListener('plusready', plusReady, false);
}else{
  console.log('判断else plus')
	document.addEventListener('plusready', plusReady, false);
}

function plusReady(){
  if(!dark){
      plus.nativeUI.setUIStyle('light');
      plus.navigator.setStatusBarStyle('dark');
      plus.navigator.setStatusBarBackground('#ffffff')
  }else{
      plus.nativeUI.setUIStyle('dark');
      plus.navigator.setStatusBarStyle('light');
      plus.navigator.setStatusBarBackground('#121212')
  }
}



const lightTheme = {
  primary: '#ec752e',
  secondary: '#9C27b0',
  accent: '#e91e63',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
  footBG: '#fafafa',
  headerBG: '#ffffff',
  delDialog: '#fef8f8',
  confirmDialog: '#fdf9f4',
  mainBG: '#EEEEEE'
}

const darkTheme = {
  primary: '#ec752e',
  secondary: '#9C27b0',
  accent: '#e91e63',
  info: '#00CAE3',
  success: '#4CAF50',
  warning: '#FB8C00',
  error: '#FF5252',
  footBG: '#1f1f1f',
  headerBG: '#121212',
  delDialog: '#211e1e',
  confirmDialog: '#1f1e1d',
  mainBG: '#121212'
}

export default new Vuetify({
  breakpoint: { mobileBreakpoint: 960 },
  icons: {
    values: { expand: 'mdi-menu-down' },
  },
  theme: {
    dark,
    themes: {
      dark: darkTheme,
      light: lightTheme,
    },
  },
})
