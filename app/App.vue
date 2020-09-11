<template>
  <div>
    <div class="nav">
      <router-link to="/">Main</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/about">About2</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'element-ui'
import 'minireset.css'

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
