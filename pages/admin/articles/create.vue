<template>
  <div></div>
</template>

<script>
export default {
  name: 'AdminArticlesCreate',
  layout: 'admin',
  middleware: ['auth', 'auth-admin'],
}
</script>
