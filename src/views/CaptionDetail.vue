<template>
  <div class="wrapper inner">
    <NavBar />
    <div class="inputContainer" v-if="templateData">
      <h3>{{templateData.title}}</h3>
      <div class="contentContainer">
        <div class="leftContainer borderBox">
          <div class="rowCaption" v-for="({key, value}, index) in varList" :key="index">
            <ReactiveSpeechTextInput :title="key" :value="value" :updateValue="updateValue" />
          </div>
        </div>
        <div class="rightContainer borderBox">
          <p>{{previewCaption}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import ReactiveSpeechTextInput from "@/components/ReactiveSpeechTextInput";
import NavBar from "@/components/NavBar";

export default {
  name: "captionDetail",
  components: { ReactiveSpeechTextInput, NavBar },
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
.leftContainer {
  width: 30%;
  text-align: left;
}
.leftContainer input {
}
.contentContainer {
  display: flex;
  min-height: 300px;
}
.borderBox {
  border: 1px gray solid;
  padding: 5px 20px;
}
.rightContainer {
  width: 70%;
}
.rightContainer p {
  text-align: left;
}
</style>
