<template>
  <div>
    <div class="nav">
      <router-link to="/">Main</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import { Button, Select } from 'element-ui'

Vue.component(Button.name, Button)
export default {}
</script>

<style lang="scss" scoped>
.nav {
  a {
    color: red;
  }
}
</style>
<style>
body {
  font-family: Arial, sans-serif;
}
</style>
