<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="input-group">
          <input type="text" name="title" class="form-control" v-model="title" />
          <span class="input-group-append">
            <button
              type="button"
              class="btn btn-effect-ripple btn-primary"
              @click="handlerCreateMedia"
            >
              <i class="fas fa-plus"></i>
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 m-t-30">
        <Editor v-model="innerCaption" :handlerClickSave="handlerCreateMedia" />
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import Editor from "@/components/Editor";

export default {
  name: "igPreEdit",
  components: { Editor },
  data() {
    const { caption = "", igUrl = "" } = this.$route.query;

    return {
      caption,
      innerCaption: caption,
      igUrl,
      title: `title-${new Date().getTime()}`
    };
  },
  mounted() {},
  methods: {
    handlerCreateMedia: async function() {
      this.$store.system.isLoading = true;
      try {
        const { innerCaption, title } = this;
        const user = Parse.User.current();

        const Template = Parse.Object.extend("Templates");
        const template = new Template();
        template.set("owner", user);
        template.set("content", innerCaption);
        template.set("title", title);
        const newTeamplte = await template.save();
        this.$store.system.isLoading = false;
        return this.$router.push(`/templatelist/${newTeamplte.id}`);
      } catch (e) {
        alert(e);
        this.$store.system.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* .inputContainer h1 input{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.inputContainer h1 button {
  background: lightgray;
  padding: 0px 10px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
} */
</style>
