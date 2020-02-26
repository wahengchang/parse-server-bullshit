<template>
    <div class='listContainer'>
    <div 
        v-for='(item, index) in templateList'
        :key='index'
        class='row' 
    >
        <div class='cell titleCell'>
        <router-link class='title' :to="`/templateList/${item.objectId}`">{{item.title || '--'}}</router-link>
        <span class='date'>{{item.updatedAt}}</span>
        <router-link class='captionButton' :to="`/caption/${item.objectId}`"> Caption </router-link>
        </div>
        <div  class='cell content'>{{item.content}}</div>
    </div>
    </div>
</template>

<script>
export default {
  name: "templateListTable",
  components: {},
  props: {
    templateList: Array
  },
  async mounted() {
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
