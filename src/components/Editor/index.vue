<template>
  <div class="">
    <div v-if="innerText">
      <div class='row m-b-5 add15pxPadding'>
        <div class="btn-group">
          <button type='button' class='btn btn-outline-secondary waves-effect' @click="handlerTranslate">翻譯</button>
          <button type='button' class='btn btn-outline-secondary waves-effect' @click="handlerUpdate">分析</button>
        </div>
      </div>
      <ReactiveTextInput
        label="Caption"
        :editable="true"
        v-model="innerText"
        :highlight="highlight"
        @handlerUpdate="handlerClickSave"
      />
      <Entity
        v-if="entitiesData && entitiesData.length >=1"
        :entitiesData="entitiesData"
        :handlerHoverEntity="handlerHoverHighlight"
        :handlerClickEntity="handlerClickHighlight"
      />
      <Syntax
        v-if="syntaxData"
        :syntaxData="syntaxData"
        :handlerHoverSyntax="handlerHoverHighlight"
        :handlerClickSyntax="handlerClickHighlight"
      />
    </div>
  </div>
</template>

<script>
import Parse from "parse";
import ReactiveTextInput from "./ReactiveTextInput";
import Entity from "./Entity";
import Syntax from "./Syntax";

export default {
  name: "Editor",
  components: { ReactiveTextInput, Entity, Syntax },
  props: {
    value: String,
    handlerClickSave: Function
  },
  data() {
    return {
      innerText: this.value,
      entitiesData: null,
      syntaxData: null,
      highlight: [""]
    };
  },
  mounted() {},
  methods: {
    handlerTranslate: async function() {
      this.$store.system.isLoading = true
      try {
        const {innerText} = this
        const {text} = await Parse.Cloud.run("translate", { text: innerText });
        this.innerText = null
        await this.$sleep(0.3);
        console.log('text: ', text)
        this.innerText = text
        this.$store.system.isLoading = false
      }
      catch(e){
        alert(e)
        this.$store.system.isLoading = false
      }
    },
    handlerUpdate: async function() {
      this.$store.system.isLoading = true
      try {
        const {innerText} = this
        const result = await Parse.Cloud.run("langAnalyz", { text: innerText });
        const { entities, syntax } = result;

        this.entitiesData = entities.entities;
        this.syntaxData = syntax;
        this.$store.system.isLoading = false
      }
      catch(e){
        alert(e)
        this.$store.system.isLoading = false
      }
    },
    handlerHoverHighlight: function(text = null) {
      this.highlight = text ? [{ text, style: "background-color:Cyan" }] : [""];
    },
    handlerClickHighlight: async function(item = {}) {
      const { text, tag } = item;
      const tempInputtext = this.innerText;
      this.innerText = null;

      await this.$sleep(0.3);

      this.innerText = tempInputtext.replace(
        new RegExp(text, "g"),
        `{{${tag}}}`
      );
    }
  },
  watch: {
    innerText() {
      this.$emit("input", this.innerText);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add15pxPadding {
    padding: 0 15px;
}
// .bar {
//   width: 100%;
//   display: flex;
//   margin: auto;
//   flex-direction: row-reverse;
// }
// .translate {
//   background: lightgray;
//   padding: 5px 10px;
//   cursor: pointer;
//   border: 1px solid gray;
// }
</style>
