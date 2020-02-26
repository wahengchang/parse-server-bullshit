<template>
  <div class="wrapper inner">
    <NavBar />
    <div class="inputContainer" v-if='templateData'>
      <div class='row'>
        <h1> 
          <input name='title' v-model='templateData.title'/>
          <a @click='handlerClickSave' class='actionButton'> Save </a>
          <router-link class='actionButton' :to="`/caption/${templateData.objectId}`"> Caption</router-link>
        </h1> 
        <Editor
          v-model='templateData.content'
          :handlerClickSave='handlerClickSave'
        />
      </div>
      <div class='row'>
        <multiselect
          v-model="selectedFolderList"
          :options="options"
          @remove='handlerOnRemove'
          @select='handlerOnSelect'
          track-by="title"
          label='title'
          :multiple="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import Editor from '@/components/Editor'
import Multiselect from 'vue-multiselect'
import NavBar from '@/components/NavBar'

export default {
  name: "templateDetail",
  components: {Editor, Multiselect, NavBar},
  data() {
    const {caption = '', igUrl=''} = this.$route.query

    return {
      caption,
      innerCaption: caption,
      igUrl,
      title: `title-${new Date().getTime()}`,
      templateData: null,
      folderListData: [],
      folderListDataRaw: [],
      selectedFolderList: []
    };
  },
  async mounted() {
    const {id} = this.$route.params
    this.$store.system.isLoading = true
    try {
      this.templateData = await this.fetchTemplate(id)
      this.folderListDataRaw = await this.fetchFolderList()
      this.folderListData = this.folderListDataRaw.map(item => item.toJSON())

      this.selectedFolderList= this.templateData.folders.map(item => {
        return {
          id: item.objectId,
          title: item.title
        }
      })

      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  computed: {
    options: function(){
      return this.folderListData.map(item => {
        return {
          title: item.title,
          id: item.objectId
        }
      })
    }
  },
  methods: {
    fetchTemplate: async function (id) {
      const Template = Parse.Object.extend("Templates");
      const query = new Parse.Query(Template);
      const result = await query.get(id)
      
      const relation = result.relation("folders")
      const queryFolderRelation = relation.query();
      const folderList = await queryFolderRelation.find()

      return {
          ...result.toJSON(),
          folders: folderList.map(item => item.toJSON())
        }
    },
    fetchFolderList: async function () {
      const user = Parse.User.current();

      const Folder = Parse.Object.extend("Folders");
      const query = new Parse.Query(Folder);
      query.equalTo("owner", user)
      query.limit(999)
      const result = await query.find();
      return result
    },
    handlerClickSave: async function() {
      this.$store.system.isLoading = true
      try {
        const {id} = this.$route.params
        const {title, content} = this.templateData

        const Template = Parse.Object.extend("Templates");
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
    },
    handlerOnSelect: async function(item = {}) {
      this.$store.system.isLoading = true
      try {
        const {id: templateId} = this.$route.params
        const {folderListDataRaw} = this
        const {id} = item

        const targetFolderObj = folderListDataRaw.find( item => item.id === id)

        const templateObj = await this.appendFolderToTemplate(templateId, targetFolderObj)
        await this.appendTemplateToFolder(templateObj, targetFolderObj)

        this.$store.system.isLoading = false
      }
      catch(e){
        alert(e)
        this.$store.system.isLoading = false
      }
    },
    handlerOnRemove: async function(item = {}){
      this.$store.system.isLoading = true
      try {
        const {id: templateId} = this.$route.params
        const {folderListDataRaw} = this
        const {id} = item

        const targetFolderObj = folderListDataRaw.find( item => item.id === id)

        const templateObj = await this.appendFolderToTemplate(templateId, targetFolderObj, {isAdd: false})
        await this.appendTemplateToFolder(templateObj, targetFolderObj, {isAdd: false})

        this.$store.system.isLoading = false
      }
      catch(e){
        alert(e)
        this.$store.system.isLoading = false
      }

    },
    appendFolderToTemplate: async function(templateId, targetFolderObj, options = {}) {
        const {isAdd = true} = options
        const Template = Parse.Object.extend("Templates")
        const query = new Parse.Query(Template)
        const res = await query.get(templateId)
        const relation = res.relation("folders")
        if(isAdd) {
          relation.add(targetFolderObj)
        }
        else {
          relation.remove(targetFolderObj)
        }
        return res.save()
    },
    appendTemplateToFolder: function(templateObj, targetFolderObj, options = {}) {
        const {isAdd = true} = options
        const relation = targetFolderObj.relation("templates")
        if(isAdd) {
          relation.add(templateObj)
        }
        else {
          relation.remove(templateObj)
        }
        return targetFolderObj.save()
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.row{
  margin-top: 40px;
}
.inputContainer {
  width: 80%;
  max-width: 700px;
  margin: auto;
}
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
</style>
