<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="page-title-box">
            <h4 class="page-title">Form Elements</h4>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class='card-body'>
              <h1>Welcome</h1>
              <h4>Hi, {{user.username}}</h4>
              <p>
                A responsive business oriented template with a video background
                <br />designed by
                <a href="https://templated.co/">TEMPLATED</a> and released under the Creative Commons License.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  name: "welcome",
  components: {},
  computed: {
    user: function() {
      return (Parse.User.current() && Parse.User.current().toJSON()) || null;
    }
  }
};
</script>
