<template>
    <div class="inputContainer" v-if="templateData">
      <h1>{{templateData.title}}</h1>

      <div class="row grid-col">
        <div class="col-5">
          <div class="rowCaption" v-for="({key, value}, index) in varList" :key="index">
            <ReactiveSpeechTextInput :title="key" :value="value" :updateValue="updateValue" />
          </div>
        </div>                         
        <div class="col-7">
          <div class="card m-b-30 text-white bg-dark">
              <div class="card-body">
                  <blockquote class="card-blockquote">
                    <p>{{previewCaption}}</p>
                      <footer>
                        {{templateData.createdAt}} <cite title="Source Title">{{templateData.owner.username}}</cite>
                      </footer>
                  </blockquote>
              </div>
          </div>
        </div>                              
      </div>                           
    </div>

      <!-- <div class="contentContainer">
        <div class="leftContainer borderBox">
          <div class="rowCaption" v-for="({key, value}, index) in varList" :key="index">
            <ReactiveSpeechTextInput :title="key" :value="value" :updateValue="updateValue" />
          </div>
        </div>
        <div class="rightContainer borderBox">
          <p>{{previewCaption}}</p>
        </div>
      </div>
    </div> -->
</template>

<script>
import Parse from "parse";
import ReactiveSpeechTextInput from "@/components/ReactiveSpeechTextInput";

export default {
  name: "captionDetail",
  components: { ReactiveSpeechTextInput },
  data() {
    return {
      templateData: null,
      previewCaption: ""
    };
  },
  computed: {
    varList: function() {
      const { templateData = {} } = this;
      const { content = "" } = templateData;
      const reg = /{{\w*}}/g;
      const varList = content.match(reg);
      const _varList = [...new Set(varList)];

      return _varList.map(key => {
        return {
          key,
          value: ""
        };
      });
    }
  },
  async mounted() {
    const { id } = this.$route.params;
    this.$store.system.isLoading = true;
    try {
      const Template = Parse.Object.extend("Templates");
      const query = new Parse.Query(Template);
      const result = await query.get(id);
      this.templateData = result.toJSON();
      this.previewCaption = this.getPreviewCaption();
      this.$store.system.isLoading = false;
    } catch (e) {
      alert(e);
      this.$store.system.isLoading = false;
    }
  },
  methods: {
    updateValue: function(key, e) {
      try {
        if (!e) return;

        const _str = typeof e === "string" ? e : e.target.value;

        this.varList.find(item => item.key === key).value = _str;
        this.previewCaption = this.getPreviewCaption();
      } catch (e) {
        alert(e);
      }
    },
    getPreviewCaption: function() {
      const { templateData = {}, varList = [] } = this;
      const { content = "" } = templateData;

      if (!content) return "";

      let _content = content;

      varList
        .filter(item => item.value)
        .forEach(item => {
          _content = _content.replace(new RegExp(item.key, "g"), item.value);
        });

      return _content;
    }
  }
};
</script>

<style scoped>
</style>
