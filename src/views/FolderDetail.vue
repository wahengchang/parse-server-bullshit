<template>
  <div id="main" class="wrapper inner">
    <div class="inputContainer" v-if='folderData'>
      <h1> 
        <input name='title' v-model='folderData.title'/>
        <a @click='handlerClickSave' class='actionButton'> Save </a>
      </h1>
      <TemplateListTable :templateList='folderData.templates'/>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import TemplateListTable from '@/components/TemplateListTable'

export default {
  name: "folderDetail",
  components: {TemplateListTable},
  data() {
    const {caption = '', igUrl=''} = this.$route.query

    return {
      caption,
      innerCaption: caption,
      igUrl,
      title: `title-${new Date().getTime()}`,
      folderData: null
    };
  },
  async mounted() {
    const {id} = this.$route.params
    this.$store.system.isLoading = true
    try {
      const Folder = Parse.Object.extend("Folders");
      const query = new Parse.Query(Folder);
      const result = await query.get(id)

      const relation = result.relation("templates")
      const queryFolderRelation = relation.query();
      const templateResult = await queryFolderRelation.find()

      this.folderData = {
        ...result.toJSON(),
        templates: templateResult.map(item => item.toJSON())
      }
      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  methods: {
    handlerClickSave: async function() {
      this.$store.system.isLoading = true
      try {
        const {id} = this.$route.params
        const {title, content} = this.folderData

        const Template = Parse.Object.extend("Folders");
        const query = new Parse.Query(Template);
        const res = await query.get(id)
        res.set("content", content)
        res.set("title", title)
        await res.save()
        this.$store.system.isLoading = false
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
.actionButton {
  display: inline-block;
  background: lightgray;
  padding: 0px 10px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: black;
  margin: 0 10px;
  text-decoration: none;
}
.listContainer {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
.row {
  display: flex;
  margin-top: 20px;
}
.cell {
  border: 1px solid lightgray;
}
.titleCell {
  width: 30%;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: 700;
}
.date {
  font-size: 12px;
  margin-bottom: auto;
}
</style>
