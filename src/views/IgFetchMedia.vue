<template>
  <div class="">
    <NavBar />
    <div class="wrapper inputContainer">
      <h2>Instagram media URL</h2>
      <p> Input a valid url link of IG's media, and we snapshot it </p>
      <input
        type="text"
        name="igUrl"
        placeholder="https://www.instagram.com/p/B78mO-3jgYD/"
        v-model="inputUrl"
        @change="fetchIg"
      />
      
      <div class='buttonRow'>
        <button class='button primary small' @click="fetchIg" :disabled='isLoading'>{{isLoading? 'Loading' : 'Fetch'}}</button>
      </div>
    </div>
    <div class="displayContainer" v-if="caption || imgUrl">
      <div class="row">
        <div class='halfRow30'>
          <img :src="imgUrl" />
        </div>
        <div class='halfRow70'>
          <p>{{caption}}</p>
          <div class="row">
            <p>
              <router-link
                :to="`/igPreEdit?caption=${encodeURIComponent(caption)}`"
                class="button primary small"
              >Process This Media</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import NavBar from '@/components/NavBar'

export default {
  name: "secret",
  components: {NavBar},
  data() {
    const {url = ''} = this.$route.query
    return {
      inputUrl: url || null,
      isLoading: false,
      caption: null,
      imgUrl: null
    };
  },
  mounted() {
    const {inputUrl} = this

    if(inputUrl) {
      return this.fetchIg()
    }
  },
  methods: {
    fetchIg: async function() {
      try {
        const { inputUrl } = this;
        if(!inputUrl) throw new Error('[ERROR] inputUrl is null')

        this.isLoading = true;
        this.caption = null;
        this.imgUrl = null;
        const result = await Parse.Cloud.run("fetchMedia", { url: inputUrl });

        const { caption, imgUrl } = result;
        this.caption = caption;
        this.imgUrl = imgUrl;
        this.isLoading = false;
      } catch (e) {
        alert(e);
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.inputContainer {
  text-align: center;
}
input {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
.displayContainer {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
}
.displayContainer .row {
  margin: 10px 0;
  display: flex;
}
.displayContainer img {
  width: 100%;
  height: 100%;
}
.displayContainer p {
  width: 100%;
  padding: 0 20px;
  margin: 0;
}
.buttonRow {
  margin-top: 40px;
}
.halfRow30 {
  width: 30%;
}
.halfRow70 {
  width: 70%;
}
</style>
