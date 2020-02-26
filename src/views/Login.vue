<template>
        <div class="wrapper-page">

            <div class="card">
                <div class="card-body">

                    <h3 class="text-center mt-0">
                        <a href="index.html" class="logo logo-admin"><img src="assets/images/logo.png" height="20" alt="logo"></a>
                    </h3>

                    <h6 class="text-center">Sign In</h6>

                    <div class="p-3">
                        
                        <div class="form-horizontal" action="index.html">

                            <div class="form-group row">
                                <div class="col-12">
                                    <input class="form-control" type="text" required="" placeholder="Username" v-model="username">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-12">
                                    <input class="form-control" type="password" required="" placeholder="Password" v-model="password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-12">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1">
                                        <label class="custom-control-label" for="customCheck1">Remember me</label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group text-center row m-t-20">
                                <div class="col-12">
                                    <button @click='onHandleLogin' class="btn btn-danger btn-block waves-effect waves-light">Log In</button>
                                </div>
                            </div>

                            <div class="form-group m-t-10 mb-0 row">
                                <div class="col-sm-7 m-t-20">
                                    <a href="pages-recoverpw.html" class="text-muted"><i class="mdi mdi-lock"></i> Forgot your password ?</a>
                                </div>
                                <div class="col-sm-5 m-t-20">
                                    <a href="pages-register.html" class="text-muted"><i class="mdi mdi-account-circle"></i> Create an account ?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
import Parse from 'parse'
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onHandleLogin() {
      try {
        this.$store.system.isLoading = true
        const {username, password} = this
        if(!username || !password) return alert('[ERROR] username and password are required')

        const user = await Parse.User.logIn(username, password)
        console.log(`[INFO] login as user ${user.toJSON().username}`)

        const {redirect = null} = this.$route.query || {}
        this.$store.system.isLoading = false
        if(redirect) return this.$router.replace({ name: "welcome" });
        
        this.$router.replace({ name: "welcome" })
      }
      catch(e) {
        console.error(`[ERROR] ${e}`)
      }
    }
  },
  components: {}
};
</script>

<style scoped>
input {
  display: block;
  margin: auto;
}
</style>