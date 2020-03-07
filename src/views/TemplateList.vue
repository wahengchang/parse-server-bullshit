<template>
  <div class="wrapper inner">
    <div class="inputContainer">
      <h1> Template </h1>
      <TemplateListTable :templateList='templateList'/>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import TemplateListTable from '@/components/TemplateListTable'


export default {
  name: "templateList",
  components: {TemplateListTable},
  data() {
    return {
      templateList: [],
      folderList: []
    }
  },
  async mounted() {
    this.$store.system.isLoading = true
    try {
      const user = Parse.User.current()
      const resultTemplateList = await this.fetchTemplateList(user)
      const resultFolderList = await this.fetchFolderList() || []

      // normalize 
      this.templateList = resultTemplateList.map(item=> item.toJSON())
      this.folderList = resultFolderList.map(item=> item.toJSON())

      // insert folder to template
      this.templateList = this.templateList.map(item => {
        if(!item.folderIdList) return item 
        
        item.folderList = item.folderIdList.map(id => this.folderList.find(fItem => fItem.objectId===id))
        return item
      })
      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  methods: {
    fetchTemplateList: async function(user) {
      const Template = Parse.Object.extend("Templates");
      const query = new Parse.Query(Template);
      query.equalTo("owner", user)
      query.limit(999)
      
      const result = await query.find()
      return result
    },
    fetchFolderList: async function() {
      const Folder = Parse.Object.extend("Folders");
      const query = new Parse.Query(Folder);
      query.limit(999)
      
      const result = await query.find()
      return result
    }
  }
};
</script>

<style scoped>
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
.titleCell{
  width: 30%;
  text-align: left;
  display: flex;
  flex-direction: column;
}
.title{
  font-weight: 700;
}
.date{
  font-size: 12px;
  margin-bottom: auto;
}
.row .content{
  width: 70%;
  text-align: left;
  font-size: 12px;
}
.captionButton {
  display: inline-block;
  background: lightgray;
  padding: 0px 10px;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: black;
  text-decoration: none;
}
</style>
