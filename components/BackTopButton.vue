<template>
  <div class="d-none d-lg-flex">
    <v-fade-transition>
      <v-btn v-show="show" color="green darken-3" dark fab @click="backTop">
        <v-icon dark> mdi-arrow-up-thick </v-icon>
      </v-btn>
    </v-fade-transition>
  </div>
</template>

<script>
import goTo from 'vuetify/es5/services/goto'

export default {
  name: 'BackTopButton',
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollButtonBehaviou)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollButtonBehaviou)
  },
  methods: {
    backTop() {
      goTo(0)
    },
    scrollButtonBehaviou() {
      const posY = window.pageYOffset || document.documentElement.scrollTop
      const offset = 200

      if (posY < offset) {
        this.show = false
      } else {
        this.show = true
      }
    },
  },
}
</script>

<style scoped>
button {
  position: fixed;
  bottom: 100px;
  right: 50px;
  z-index: 99;
  opacity: 0.9;
}
</style>
