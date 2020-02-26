
<template>
    <div class=''>
        <div>
            <div class='note-editor note-frame card'>
                <highlightable-input
                    class='note-editable card-block'
                    highlight-style="background-color:yellow" 
                    :highlight-enabled="true" 
                    :highlight="_highlight || ['']" 
                    v-model="innerValue"
                />
            </div>
        </div>
        <div class='button-items'>
            <NotificationMsg ref='msgNoti'/>
            <button type='button' class='btn btn-outline-secondary waves-effect' v-if='editable && isChanged' @click='handlerPressEnter(innerValue)'>
                save
            </button>
            <button type='button' class='btn btn-outline-secondary waves-effect reset' v-if='editable && isChanged' @click='handlerOnReset'>
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
/* textarea {
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
} */
</style>