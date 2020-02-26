
<template>
    <div class='row'>
        <div>
            <div class='inputContainer'>
                <highlightable-input 
                    highlight-style="background-color:yellow" 
                    :highlight-enabled="true" 
                    :highlight="_highlight || ['']" 
                    v-model="innerValue"
                />
            </div>
        </div>
        <div cols="4">
            <NotificationMsg ref='msgNoti'/>
            <button class='reactiveButton' v-if='editable && isChanged' @click='handlerPressEnter(innerValue)'>
                save
            </button>
            <button class='reactiveButton reset' v-if='editable && isChanged' @click='handlerOnReset'>
                reset
            </button>
        </div>
    </div>
</template>

<script>
import NotificationMsg from './NotificationMsg'
import HighlightableInput from "vue-highlightable-input"

export default {
  name: "reactiveTextInput",
  components: {NotificationMsg, HighlightableInput},
  props: {
    label: String,
    editable: Boolean,
    value: String,
    highlight: Array
  },
  computed: {
      _highlight: function () {
          const reg = /{{\w*}}/g
          const {highlight = [], value = ''} = this

          const substr = value.match(reg)
          const _hightlight = [...new Set(substr), ...highlight]
          return _hightlight
      }
  },
  data() {
    const innerValue = this.value
    const isChanged = false
    return {
        innerValue,
        isChanged
    };
  },
  async mounted() {
  },
  methods: {
    handlerPressEnter: async function() {
        await this.$emit("handlerUpdate", this.innerValue)
        await this.$sleep(0.1)
        this.$refs.msgNoti.triggerMessage(`update ${this.label} success`)
        this.isChanged = false
    },
    handlerOnChange: function() {
        this.isChanged = true
        this.$emit("input", this.innerValue)
    },
    handlerOnReset: function(){
        this.innerValue = this.value
        this.isChanged = false
    }
  },
  watch: {
    innerValue() {
        this.handlerOnChange()
    }
  }
};
</script>

<style scoped>
textarea {
    width: 100%;
    min-height: 100px;
}
.inputContainer{
    margin: auto;
    border: 1px solid gray;
    line-height: 3;
    padding: 5px 10px;
    word-spacing: 2px;
    text-align: left;
}
.reactiveButton {
    border: 1px gray solid;
    width: 50px;
    background: lightgray;
    color: black;
    margin: 5px 0;
}

.reset {
    background: #aaeeee;
}
</style>