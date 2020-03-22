<template>
  <div v-if="compositeData">
    <div class="row">
      <h1>Template</h1>
        <div class="input-group row">
          <input type="text" name="title" class="form-control" v-model="compositeData.title" />
          <span class="input-group-append">
            <button
              type="button"
              class="btn btn-effect-ripple btn-primary"
              @click="handlerClickSave"
            >
              <i class="far fa-save"></i>
            </button>
            <router-link
              class="btn btn-info waves-effect waves-light"
              :to="`/caption/${compositeData.objectId}`"
            >
              <i class="fas fa-arrow-alt-circle-right" />
            </router-link>
          </span>
        </div>
    </div>
    <div class="row">
      <div class="col-s-12 col-md-4 col-xl-4">
        <Badge>
          <template slot="badgeContent">
            <div class="card-body">
              <h6 class>Product Status</h6>
              <div class="row">
                <div class="col-12" v-for='item in templateListData' :key='item.id'>
                  <a type="button" class="btn-sm btn-block btn-outline-primary waves-effect waves-light" @click='handleSelectedTemplate(item)'>{{item.title}}</a>
                </div>
              </div>
            </div>
          </template>
        </Badge>
      </div>
      <!-- right side -->

      <div class="col-s-12 col-md-8 col-xl-8">
        <Badge>
          <template slot="badgeContent">
            <div class="card-body"  v-for='(item, index) in compositeTemplateList' :key='item.id'>
              <div class="row">
                <div class="col-1">
                  <button type="button" class="close" @click='onClickRemoveCom(item, index)' data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="text-dark">×</span>
                  </button>
                </div>
                <div class="col-11">
                  {{item.content}}
                </div>
              </div>
            </div>
          </template>
        </Badge>
      </div>
    </div>

  </div>
</template>

<script>
import Parse from "parse";
import Badge from '@/components/CompositeDetail/Badge'

const uniq = (array = [], ) => {
  const uniqFilterAccordingToProp = function (prop) {
    if (prop)
        return (ele, i, arr) => arr.map(ele => ele[prop]).indexOf(ele[prop]) === i
    else
        return (ele, i, arr) => arr.indexOf(ele) === i
  }

  return array.filter(uniqFilterAccordingToProp())
}

export default {
  name: "templateDetail",
  components: {Badge},
  data() {
    return {
      selectedTemplate: null,
      compositeTemplateList: [],
      compositeData: null,
      templateListData: [],

      // caption,
      // innerCaption: caption,
      // igUrl,
      // title: `title-${new Date().getTime()}`,
      // folderListData: [],
      // folderListDataRaw: [],
      // selectedFolderList: []
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.$store.system.isLoading = true;
    try {
      const res = await this.fetchComposite(id)
      this.compositeData = res.data;
      this.compositeDataRaw = res.raw;

      const relatedTemplates = (await this.fetchTemplateListByIds(res.data.templates)).map(item => item.toJSON())

      this.templateListData = (await this.fetchTemplateList()).map(item => item.toJSON())
      this.templateListData = uniq([...this.templateListData, ...relatedTemplates])
      
      this.compositeTemplateList = res.data.templates.map( id => this.templateListData.find(item => item.objectId === id))
      
      this.$store.system.isLoading = false;
    } catch (e) {
      alert(e);
      this.$store.system.isLoading = false;
    }
  },
  computed: {
  },
  methods: {
    fetchComposite: async function(id) {
      const Composite = Parse.Object.extend("Composites");
      const query = new Parse.Query(Composite);
      const result = await query.get(id);

      const raw = result
      const data = {
        ...result.toJSON(),
      }
        
      return {raw, data};
    },
    fetchTemplateList: async function() {
      const Template = Parse.Object.extend("Templates");
      const query = new Parse.Query(Template);
      const result = await query.find();

      return result
    },
    fetchTemplateListByIds: async function(idList = []) {
      return await Promise.all(
        idList.map(id => 
          (new Parse.Query(Parse.Object.extend("Templates"))).get(id)
        )
      )
    },
    handlerClickSave: async function() {
      this.$store.system.isLoading = true;
      try {
        const {compositeTemplateList = []} = this
        const { title } = this.compositeData;
        const res = this.compositeDataRaw
        res.set("title", title);
        res.set("templates", [...compositeTemplateList.map(item=> item.objectId)]);
        await res.save();
        this.$store.system.isLoading = false;
      } catch (e) {
        alert(e);
        this.$store.system.isLoading = false;
      }
    },
    handleSelectedTemplate: function(item) {
      this.selectedTemplate = item
      this.$store.system.modalData ={
        title: 'Adding Template',
        content: item.content,
        onClickClose: () => this.selectedTemplate = null,
        onClickSave: this.onClickAddTemplate
      }
    },
    onClickAddTemplate: function() {
      this.compositeTemplateList.push(this.selectedTemplate)
      this.selectedTemplate = null
      this.$store.system.modalData = null
    },
    onClickRemoveCom: function(item, index) {
      this.compositeTemplateList.splice(index, 1)
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.templateListItem {

}
</style>
