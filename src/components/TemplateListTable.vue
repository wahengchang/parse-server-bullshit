<template>
  <div class="listContainer">
    <div class="card m-b-30">
      <div class="card-body">
        <p class="text-muted font-14">
          <code> {{templateList.length}} </code> Templates found.
        </p>

        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="thead-default">
              <tr>
                <th>Caption</th>
                <th>Title</th>
                <th>Content</th>
                <th>Update</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for='(item, index) in templateList' :key='index'>
                <th scope="row">
                  <router-link class='title' :to="`${prefixUrlInner}/${item.objectId}`">{{item.title || '--'}}</router-link>
                </th>
                <td>
                  {{item.content}}
                </td>
                <td>
                  <router-link :to='`/caption/${item.objectId}`' class="btn waves-light"><i class="fas fa-arrow-alt-circle-right"></i></router-link>
                </td>
                <td>
                  {{item.updatedAt}}
                </td>
                <td>
                  <router-link  v-for='(fItem, index) in item.folderList' :key='fItem.id' :to='`/folderList/${fItem.objectId}`'>
                    <span :class="`badge badge-boxed badge-${index%2 ===0? 'success' : 'warning'}`">
                      {{fItem.title}}
                    </span>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "templateListTable",
  components: {},
  data: function() {
    return {
      prefixUrlInner: this.prefixUrl || '/templateList'
    }
  },
  props: {
    templateList: Array,
    prefixUrl: String
  },
  async mounted() {},
  methods: {}
};
</script>

<style scoped>
</style>
