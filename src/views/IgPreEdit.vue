<template>
  <div id="main" class="wrapper inner">
    <NavBar />
    <div class="inputContainer">
      <h1> 
        <input name='title' v-model='title'/>
        <button @click='handlerCreateMedia'> Create </button></h1> 
      {{caption}}
      <Editor
        v-model='innerCaption'
        :handlerClickSave='handlerCreateMedia'
      />
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import Editor from '@/components/Editor'
import NavBar from '@/components/NavBar'

export default {
  name: "igPreEdit",
  components: {Editor, NavBar},
  data() {
    const {caption = '', igUrl=''} = this.$route.query

    return {
      caption,
      innerCaption: caption,
      igUrl,
      title: `title-${new Date().getTime()}`
    };
  },
  mounted() {
  },
  methods: {
    handlerCreateMedia: async function() {
      this.$store.system.isLoading = true
      try {
        const {innerCaption, title} = this
        const user = Parse.User.current();

        const Template = Parse.Object.extend("Templates");
        const template = new Template();
        template.set("owner", user)
        template.set("content", innerCaption)
        template.set("title", title)
        const newTeamplte = await template.save()
        this.$store.system.isLoading = false
        return this.$router.push(`/templatelist/${newTeamplte.id}`);
      }
      catch(e){
        alert(e)
        this.$store.system.isLoading = false
      }
    }
  }
};
</script>

<style scoped>

.inputContainer h1 input{
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
}
</style>
