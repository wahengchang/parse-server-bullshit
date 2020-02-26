
<template>
    <span v-if='msg' class='box'>{{msg}}</span>
</template>

<script>
export default {
  name: "notificationMsg",
  props: {
  },
  data() {
      return {msg: null}
  },
  async mounted() {
  },
  methods: {
    triggerMessage: async function(msg) {
      this.msg = msg
      setTimeout(() => {
        this.msg = null
      }, 5000);
    }
  },
  components: {}
};
</script>

<style scoped>
.box {
    font-size: 12px;
    background: lightgreen;
    padding: 0 10px;
}

.reset {
}
</style>