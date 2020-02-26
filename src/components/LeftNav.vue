<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="left side-menu">
    <button type="button" class="button-menu-mobile button-menu-mobile-topbar open-left">
      <i class="ion-close"></i>
    </button>

    <!-- LOGO -->
    <div class="topbar-left">
      <div class="text-center">
        <!--<a href="index.html" class="logo"><i class="fa fa-paw"></i> Aplomb</a>-->
        <a href="index.html" class="logo">
          <img src="assets/images/logo.png" height="14" alt="logo" />
        </a>
      </div>
    </div>

    <div class="sidebar-inner slimscrollleft" id="sidebar-main">
      <div id="sidebar-menu">
        <ul>
          <li class="menu-title">Overview</li>

          <li class="has_sub">
            <router-link to="/welcome" class="waves-effect waves-light">
              <i class="mdi mdi-view-dashboard"></i>
              <span>Dashboard</span>
            </router-link>
          </li>

          <li class="has_sub">
            <router-link to="/igfetch" class="waves-effect waves-light">
              <i class="fab fa-instagram"></i>
              <span>IG Fetch</span>
            </router-link>
          </li>

          <li class="has_sub">
            <router-link to="/folderList" class="waves-effect waves-light">
              <i class="fas fa-list"></i>
              <span> Categorys </span>
            </router-link>
          </li>

          <li class="has_sub">
            <router-link to="/templatelist" class="waves-effect waves-light">
              <i class="fas fa-sticky-note"></i>
              <span> Templates </span>
            </router-link>
          </li>


          <li class="menu-title">User:  {{user.username}}</li>

          <li class="has_sub">
            <a @click="onHandleLogout" class="waves-effect">
              <i class="mdi mdi-power text-danger"></i>
              <span> Logout </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="clearfix"></div>
    </div>
    <!-- end sidebarinner -->
  </div>
  <!-- Left Sidebar End -->
</template>

<script>
import Parse from 'parse'

export default {
  name: "LeftNav",
  props: {
  },
  computed: {
    user: function () {
      return  (Parse.User.current() && Parse.User.current().toJSON() )|| null
    }
  },
  methods: {
    onHandleLogout: async function(){
      this.$store.system.isLoading = true
      await Parse.User.logOut()
      this.$store.system.isLoading = false
      this.$router.replace({ name: "home" })
    }
  }
};
</script>

<style scoped lang="scss">

</style>
