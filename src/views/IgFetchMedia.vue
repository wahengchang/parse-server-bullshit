<template>
  <div class>
    <div class="row">
      <h2 class="col-lg-12">Instagram media URL</h2>
      <p class="col-lg-12">Input a valid url link of IG's media, and we snapshot it</p>
      <div class="col-lg-12">
        <div class="input-group">
          <input
            type="text"
            name="igUrl"
            class="form-control"
            v-model="inputUrl"
            @change="onHandleFetchIg"
            placeholder="https://www.instagram.com/p/B78mO-3jgYD/"
          />
          <span class="input-group-append">
            <button
              type="button"
              class="btn btn-effect-ripple btn-primary"
              @click="onHandleFetchIg"
              :disabled="isLoading"
            >
              <i class="fas fa-search"></i>
              {{isLoading? 'Loading' : 'Fetch'}}
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="row" v-if="caption || imgUrl">
      <div class="col-12">
        <div class="card m-t-30">
          <div class="row">
            <div class="col-4">
              <img class="img-fluid" :src="imgUrl" />
            </div>
            <div class="col-8">
              <p>{{caption}}</p>
              <div class="row">
                <p>
                  <router-link
                    :to="`/igPreEdit?caption=${encodeURIComponent(caption)}`"
                    class="btn btn-primary waves-effect waves-light"
                  >Process This Media</router-link>
                </p>
              </div>
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
  name: "secret",
  components: {},
  data() {
    const { url = "" } = this.$route.query;
    return {
      inputUrl: url || null,
      isLoading: false,
      caption: null,
      imgUrl: null
    };
  },
  mounted() {
    const { inputUrl } = this;

    if (inputUrl) {
      return this.onHandleFetchIg();
    }
  },
  methods: {
    onHandleFetchIg: async function() {
      try {
        const { inputUrl } = this;
        if (!inputUrl) throw new Error("[ERROR] inputUrl is null");

        this.$store.system.isLoading = true;
        this.isLoading = true;
        this.caption = null;
        this.imgUrl = null;
        const result = await Parse.Cloud.run("fetchMedia", { url: inputUrl });

        const { caption, imgUrl } = result;
        this.caption = caption;
        this.imgUrl = imgUrl;
        this.isLoading = false;
        this.$store.system.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
        this.$store.system.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
