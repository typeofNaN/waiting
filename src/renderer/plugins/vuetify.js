import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        // primary: colors.red.darken1, // #E53935
        // secondary: colors.red.lighten4, // #FFCDD2
        // accent: colors.indigo.base // #3F51B5
        // primary: '#409EFF',
        primary: '#ea4c89',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399'
      }
    }
  }
}

export default new Vuetify(opts)
