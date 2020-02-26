<template>
  <div id="app">
    <loading :active="isLoading" 
    :can-cancel="true" 
    :is-full-page="true"></loading>

		<!-- Header -->
			<header id="header">
        <router-link class="logo" to="/">Home</router-link>
				<nav >
					<a v-if='user'> Hi! {{user.username}}</a>
          <router-link to="/login" v-else> Login </router-link>
				</nav>
			</header>
    <router-view/>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Parse from 'parse'

export default {
  components:{Loading},
  computed: {
    isLoading: function() {
      return this.$store.system.isLoading
    },
    user: function () {
      return  (Parse.User.current() && Parse.User.current().toJSON() )|| null
    }
  }
}
</script>
<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
