<template>
  <div class="wrapper inner">
    <div class="inputContainer">
      <h1 class='inlineH1'> Composites </h1>
      <button type="button" @click='onClickCreate' class="btn btn-pinterest btn-round m-b-10 m-l-10 waves-effect waves-light">
        <i class="fas fa-plus"></i>
      </button>
      <TemplateListTable
        :templateList='templateList'
        prefixUrl='/compositesList'
      />
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import TemplateListTable from '@/components/TemplateListTable'


export default {
  name: "compositeList",
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
      const resultTemplateList = await this.fetchCompositList(user)
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
    fetchCompositList: async function(user) {
      const Template = Parse.Object.extend("Composites");
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
    },
    onClickCreate: async function() {
      const title = prompt("Please enter your name", "Harry Potter")
      const user = Parse.User.current();
      if (!title) {
        return alert('[ERROR] input is null')
      } 
      
      this.$store.system.isLoading = true
      const Composite = Parse.Object.extend("Composites")
      const c = new Composite()
      c.set("owner", user)
      c.set("title", title)
      const res = await c.save()
      console.log('res: ', res)
      console.log('res.id: ', res.id)
      this.$store.system.isLoading = false

      this.$router.replace(`/compositesList/${res.id}`);
    }
  }
};
</script>

<style scoped>
.inlineH1 {
  display: inline-block;
}
</style>
