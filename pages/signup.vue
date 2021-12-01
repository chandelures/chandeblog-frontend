<template>
  <v-container class="text-center my-12">
    <div class="text-h5 my-12">注册 Clog</div>
    <v-form ref="form" class="mx-auto" lazy-validation @submit.prevent="signUp">
      <v-text-field
        v-model="signup.username"
        type="text"
        :rules="usernameRules"
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
        :rules="passwordRules"
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
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'SignUpPage',
  layout: 'EmptyLayout',
  auth: 'guest',
  data() {
    return {
      signup: {
        username: '',
        email: '',
        password: '',
      },
      usernameRules: [
        (value) => !!value || '用户名不能为空',
        (value) => value.length < 10 || '用户名不超过10个字符',
      ],
      emailRules: [
        (value) => !!value || '邮箱不能为空',
        (value) => /.+@.+\..+/.test(value) || 'E-mail格式不正确',
      ],
      passwordRules: [
        (value) => !!value || '密码不能为空',
        (value) => value.length >= 8 || '至少需要8个字符',
      ],
      passwordCheckRules: [
        (value) => value === this.signup.password || '两次输入密码不一致',
      ],
      passwordCheck: '',
    }
  },
  methods: {
    async signUp() {
      if (this.$refs.form.validate()) {
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
