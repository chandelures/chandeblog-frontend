<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input v-model="login.username" type="text" />
      </div>
      <div>
        <label>Password</label>
        <input v-model="login.password" type="text" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  middleware: ['auth'],
  auth: 'guest',
  data() {
    return {
      login: {
        username: '',
        password: '',
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
