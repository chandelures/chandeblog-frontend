<template>
  <div>
    <v-app-bar color="green darken-3" dark hide-on-scroll>
      <v-container fluid>
        <v-row>
          <v-col md="8" cols="12" class="d-flex mx-auto px-0">
            <v-app-bar-nav-icon
              class="d-md-none my-auto"
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <nuxt-link class="my-auto mx-auto mr-lg-4 mr-md-2" to="/">
              <v-img alt="CBLOG" src="../img/logo.png" width="100" contain>
              </v-img>
            </nuxt-link>
            <v-btn
              v-for="(link, i) in leftLinks"
              :key="i + '-'"
              :to="link.to"
              :ripple="false"
              class="d-none d-md-flex my-auto"
              text
              plain
            >
              {{ link.text }}
            </v-btn>
            <v-spacer class="d-none d-md-flex"> </v-spacer>
            <v-btn
              v-if="$auth.loggedIn"
              class="d-none d-md-flex my-auto"
              :ripple="false"
              text
              plain
              @click="logout"
            >
              Log out
            </v-btn>
            <v-btn
              v-for="(link, i) in loginLinks"
              :key="i + '+'"
              :to="link.to"
              :ripple="false"
              class="d-none d-md-flex my-auto"
              text
              plain
            >
              {{ link.text }}
            </v-btn>
            <v-btn class="d-md-none" fab color="transparent" disabled plain>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute color="green darken-3" dark>
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item
            v-for="(item, i) in leftLinks"
            :key="i + '-'"
            :to="item.to"
          >
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$auth.loggedIn" @click="logout">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(link, i) in loginLinks"
            :key="i + '+'"
            :to="link.to"
          >
            <v-list-item-title v-text="link.text"> </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'AppBar',
  data() {
    return {
      drawer: false,
      group: null,
      leftLinks: [
        { text: 'Home', to: '/' },
        { text: 'About', to: '/about' },
      ],
      loginLinks: [
        { text: 'Log in', to: '' },
        { text: 'Sign up', to: '' },
      ],
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$toast.success('注销成功')
      this.$router.go(0)
    },
  },
}
</script>
