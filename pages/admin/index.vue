<template>
  <div></div>
</template>

<script>
export default {
  name: 'Admin',
  middleware: ['auth', 'auth-admin'],
}
</script>
