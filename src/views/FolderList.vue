<template>
  <div class="wrapper">
    <div class="inner">
      <div class="inputContainer">
        <p>
          Folder
          <button class='button primary small' @click="handlerClickCreate">Create</button>
        </p>
        <div class="highlights" v-if="folderList && folderList.length >= 1">
          <section v-for="(item, index) in folderList" :key="index">
            <router-link class="" :to="`/folderList/${item.objectId}`">
              <div class="content">
                <header>
                  <!-- <a href="#" class="icon fa-vcard-o"><span class="label">Icon</span></a> -->
                  <h3> {{item.title || '--'}} </h3>
                </header>
                <p> {{item.updatedAt}}</p>
              </div>
            </router-link>
          </section>
        </div>
        <div v-else>Empty</div>
        <!-- <div class="listContainer" v-if="folderList && folderList.length >= 1">
          <div v-for="(item, index) in folderList" :key="index" class="row">
            <div class="cell titleCell">
              <router-link class="title" :to="`/folderList/${item.objectId}`">{{item.title || '--'}}</router-link>
              <span class="date">{{item.updatedAt}}</span>
            </div>
            <div class="cell content">{{item.content}}</div>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";

export default {
  name: "folderList",
  components: {},
  data() {
    return {
      folderList: []
    };
  },
  async mounted() {
    this.$store.system.isLoading = true;
    try {
      const user = Parse.User.current();

      const Folder = Parse.Object.extend("Folders");
      const query = new Parse.Query(Folder);
      query.equalTo("owner", user);
      query.limit(999);
      const result = await query.find();
      this.folderList = result.map(item => item.toJSON());
      this.$store.system.isLoading = false;
    } catch (e) {
      alert(e);
      this.$store.system.isLoading = false;
    }
  },
  methods: {
    handlerClickCreate: async function() {
      this.$store.system.isLoading = true;
      try {
        const title = prompt("Please enter your folder Name");
        const user = Parse.User.current();
        const Folder = Parse.Object.extend("Folders");
        const folder = new Folder();
        folder.set("owner", user);
        folder.set("title", title);
        const result = await folder.save();
        this.$store.system.isLoading = false;
        return this.$router.push(`/folderList/${result.id}`);
      } catch (e) {
        alert(e);
        this.$store.system.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* .listContainer {
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
.row .content {
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
} */
</style>
