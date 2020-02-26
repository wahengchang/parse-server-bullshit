<template>
  <div class="wrapper inner">
    <NavBar />
    <div class="inputContainer">
      <h1> Template </h1>
      <TemplateListTable :templateList='templateList'/>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import NavBar from '@/components/NavBar'
import TemplateListTable from '@/components/TemplateListTable'

export default {
  name: "templateList",
  components: {NavBar, TemplateListTable},
  data() {
    return {
      templateList: []
    }
  },
  async mounted() {
    this.$store.system.isLoading = true
    try {
      const user = Parse.User.current()

      const Template = Parse.Object.extend("Templates");
      const query = new Parse.Query(Template);
      query.equalTo("owner", user)
      query.limit(999)
      
      const result = await query.find()
      this.templateList = result.map(item=> item.toJSON())
      this.$store.system.isLoading = false
    }
    catch(e){
      alert(e)
      this.$store.system.isLoading = false
    }
  },
  methods: {
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
