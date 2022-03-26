// Vuetify Documentation https://vuetifyjs.com

import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ripple from 'vuetify/lib/directives/ripple'

Vue.use(Vuetify, { directives: { ripple } })

// plus.navigator.setStatusBarBackground('#272727');

// console.log(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

let dark = localStorage.getItem('darkAuto') == 'true'

// let callback = (e) => {
//   if(localStorage.getItem('darkAuto') == 'true'){
//     Vuetify.theme.dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
//   }
// }

// if(localStorage.getItem('darkAuto') == 'true'){
//   dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
// }



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
      plus.navigator.setStatusBarBackground('#000000')
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
  headerBG: '#ffffff'
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
  headerBG: '#000000'
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
