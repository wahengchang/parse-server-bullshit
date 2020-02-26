<template>
  <!-- Banner -->
  <div class="content-page">
    <!-- Start content -->
    <div class="content">
      <h1>Welcome</h1>
      <h4>Hi, {{user.username}}</h4>
      <p>
        A responsive business oriented template with a video background
        <br />designed by
        <a href="https://templated.co/">TEMPLATED</a> and released under the Creative Commons License.
      </p>
    </div>
  </div>
</template>

<script>
import Parse from 'parse'
export default {
  name: "welcome",
  components: {},
  computed: {
    user: function () {
      return  (Parse.User.current() && Parse.User.current().toJSON() )|| null
    }
  }
};
</script>
