<template>
  <v-container class="text-center my-12">
    <div class="text-h5 my-12">登录 Clog</div>
    <form class="mx-auto" @submit.prevent="userLogin">
      <v-text-field
        v-model="login.username"
        type="text"
        label="用户名"
        color="black"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="login.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="密码"
        color="black"
        required
        @click:append="showPassword = !showPassword"
      >
      </v-text-field>
      <v-btn type="submit" class="green darken-3 my-2" dark>登录 </v-btn>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'EmptyLayout',
  auth: 'guest',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
      loginRule: {
        username: [(v) => !!v || '请输入用户名'],
        password: [(v) => !!v || '请输入密码'],
      },
      showPassword: false,
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        if (this.$auth.loggedIn) {
          this.$toast.success('登陆成功')
          this.$router.go(0)
        }
      } catch (err) {
        this.$toast.error('用户名或密码错误')
      }
    },
  },
}
</script>

<style scoped>
form {
  max-width: 300px;
}
button {
  width: 100%;
}
</style>
