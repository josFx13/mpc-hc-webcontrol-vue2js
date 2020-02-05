import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentAlt, faFileAudio, faCompressAlt, faFile, faFolder, faVolumeMute, faVolumeUp,faPlus, faHome, faCaretRight, faEye, faTrash, faSearch, faSync, faInfo, faCheck, faSearchMinus, faSearchPlus, faArrowLeft, faArrowRight, faTimesCircle, faTimes, faEdit, faFilter, faClosedCaptioning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as VueFaIcon } from '@fortawesome/vue-fontawesome'

library.add(faCommentAlt,faFileAudio, faCompressAlt , faFile, faFolder, faVolumeMute, faVolumeUp,faPlus,faHome, faCaretRight, faEye, faTrash, faSearch, faSync, faInfo, faCheck, faSearchMinus, faSearchPlus, faArrowLeft, faArrowRight, faTimesCircle, faTimes, faEdit, faFilter)
Vue.component('vue-fa-icon', VueFaIcon)

new Vue({
  render: h => h(App)
}).$mount('#app')
