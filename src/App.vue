<template>
  <div id="app" class="fixed-left">
    <loading :active="isLoading" 
    :can-cancel="true" 
    :is-full-page="true"></loading>

		<!-- Header -->
    <div id="wrapper">
      <component :is="layout">
        <router-view/>
      </component>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import LeftNav from '@/components/LeftNav';
import 'vue-loading-overlay/dist/vue-loading.css';
import Parse from 'parse'

export default {
  components:{Loading, LeftNav},
  computed: {
    isLoading: function() {
      return this.$store.system.isLoading
    },
    layout() {
      return (this.$route.meta.layout || 'default') + "-layout";
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
