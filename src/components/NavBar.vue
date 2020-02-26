<template>
<div class="nav">
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link to="/login">Login</router-link> | -->
    <router-link to="/logout">Logout</router-link> |
    <router-link to="/igfetch">IG Fetch</router-link> |
    <router-link to="/folderList"> Categorys </router-link> |
    <router-link to="/templatelist"> Templates</router-link> |
</div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'navBar',
  components: {
  }
}
</script>

<style scoped>
.nav {
    text-align: center;
    height: 80px;
    line-height: 80px;
}
</style>
