<template>
  <v-container class="text-center my-12">
    <div class="text-h5 my-10">Login in Chandelure Blog</div>
    <form class="mx-auto" @submit.prevent="userLogin">
      <v-text-field
        v-model="login.username"
        label="用户"
        color="black"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="login.password"
        label="密码"
        color="black"
        required
      >
      </v-text-field>
      <v-btn type="submit" class="green darken-3 my-6" dark>登录 </v-btn>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  layout: 'empty',
  middleware: ['auth'],
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
</style>
