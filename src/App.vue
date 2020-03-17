<template>
  <div id="app" class="fixed-left">
    <Modal
      v-if='modalData'
      :title='modalData.title'
      :content='modalData.content'
      :onClickClose='modalData.onClickClose'
      :onClickSave='modalData.onClickSave'
    />
    <loading :active="isLoading" :can-cancel="true" :is-full-page="true"></loading>

    <!-- Header -->
    <div id="wrapper">
      <component :is="layout">
        <router-view />
      </component>
    </div>
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import LeftNav from "@/components/LeftNav";
import Modal from "@/components/Common/Modal";

import "vue-loading-overlay/dist/vue-loading.css";
import Parse from "parse";

export default {
  components: { Loading, LeftNav, Modal },
  computed: {
    isLoading: function() {
      return this.$store.system.isLoading;
    },
    modalData: function() {
      return this.$store.system.modalData;
    },
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
    user: function() {
      return (Parse.User.current() && Parse.User.current().toJSON()) || null;
    }
  }
};
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
