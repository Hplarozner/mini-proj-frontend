import { createVuetify } from 'vuetify'
import * as components from "vuetify/components";
import * as labs from "vuetify/labs/components";
import * as directives from "vuetify/directives";


export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      ...labs,
    },

    display: {
      mobileBreakpoint: "sm"
    },

    directives,

    defaults: {
      /*Labs */
      VDataTable: {
        fixedHeader: true,
        noDataText: "No items found."
      },

      VTextField: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VCombobox: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VSelect: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VSwitch: {
        color: "primary"
      },

      VTextarea: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VRadio: {
        color: "primary",
      },

      VListItem: {
        "active-color": "primary",
      },

      VCheckbox: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VToolbar: {
        density: "compact"
      },

      VFileInput: {
        color: "primary",
        density: "compact",
        variant: "outlined"
      },

      VChip: {
        color: "primary"
      },
      
    },

    theme: {
      defaultTheme: 'light',

      themes: {
        light: {
          colors: {
            primary: "#0D47A1"
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: "#1565C0"
          }
        }
      }
    }
  })
  nuxtApp.vueApp.use(vuetify)
})