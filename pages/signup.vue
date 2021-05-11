<template>
  <v-container class="text-center my-12">
    <div class="text-h5 my-12">注册 Clog</div>
    <form class="mx-auto" lazy-validation @submit.prevent="signUp">
      <v-text-field
        v-model="signup.username"
        type="text"
        label="用户名"
        color="black"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="signup.email"
        type="text"
        :rules="emailRules"
        label="e-mail"
        color="black"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="signup.password"
        type="password"
        label="密码"
        color="black"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="passwordCheck"
        type="password"
        :rules="passwordCheckRules"
        label="再次输入密码"
        color="black"
        required
      >
      </v-text-field>
      <v-btn type="submit" class="green darken-3 my-2" dark>注册 </v-btn>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  layout: 'empty',
  auth: 'guest',
  data() {
    return {
      signup: {
        username: '',
        email: '',
        password: '',
      },
      emailRules: [(value) => /.+@.+\..+/.test(value) || 'E-mail格式不正确'],
      passwordRules: [(value) => value.length >= 8 || '至少需要8个字符'],
      passwordCheckRules: [
        (value) => value === this.signup.password || '两次输入密码不一致',
      ],
      passwordCheck: '',
    }
  },
  methods: {
    async signUp() {
      try {
        await this.$axios.$post('auth/register', this.signup)
        const login = {
          username: this.signup.username,
          password: this.signup.password,
        }
        await this.$auth.loginWith('local', { data: login })
        if (this.$auth.loggedIn) {
          this.$router.go(0)
        }
        this.$toast.success('注册成功')
      } catch (err) {
        this.$toast.error('注册失败')
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
