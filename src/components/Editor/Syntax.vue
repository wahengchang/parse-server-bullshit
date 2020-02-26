<template>
  <div class="syntaxContainer">
    <h3>Syntax <span class='openBox' @click='handlerOpenBox'>{{isOpened ? '-' : '+'}}</span></h3>
    <div class='container' v-if='isOpened'>
      <div
        class='typeContainer'
        v-for='(type) in _typeList'
        :key='type'
      >
        <span>{{type}}</span>
        <div 
          v-for='(item) in _syntaxData.filter(_item=>_item.tag ===type)'
          :key='item.text'
          class='col'
          :style="_style(item)"
          @mouseover="_handlerHoverSyntax(item.text)"
          @mouseleave="_handlerHoverSyntax(null)"
          @click="_handlerClick(item)"
        >
          <span class='title'> {{item.text}} </span>
          <span class='etype'> {{item.tag}} </span>
          <span class='etype'> {{item.dependencyEdge.headTokenIndex}} </span>
          <span class='etype'> {{item.dependencyEdge.label}} </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Syntax',
  components: {},
  props: {
      syntaxData: Object,
      handlerHoverSyntax: Function,
      handlerClickSyntax: Function
  },
  computed: {
    _typeList: function() {
      if(!this.syntaxData) return null

      const result = this.syntaxData.tokens.map(item => {
        return item.partOfSpeech.tag
      })
      const typeList = [...new Set(result)]

      return typeList
    },
    _syntaxData: function() {
      if(!this.syntaxData) return null

      const _uniqueTextList = this.syntaxData.tokens.map(item => item.text.content)
      const uniqueTextList = [...new Set(_uniqueTextList)]

      const result = uniqueTextList.map(text => {
        const target = this.syntaxData.tokens.find(_t => {
          return _t.text.content === text
        })

        const dependencyEdge = target.dependencyEdge
        const tag = target.partOfSpeech.tag
        // const mentionType = target.mentions[0].type
        // const syntaxType = target.type
        return {text, dependencyEdge, tag}
      })

      return result
    }
  },
  data() {
    return {
      hoverText: false,
      isOpened: true
    };
  },
  mounted() {
  },
  methods: {
    _style: function(item) {
      const {text} = item
      const {hoverText, selectedText} = this

      if(selectedText === text) {
        return  {background: 'yellow', color: 'black'}
      }

      if(hoverText === text) {
        return  {background: 'Cyan', color: 'black'}
      }

      return null
    },
    _handlerHoverSyntax: function(text){
      if(text !==0 && !text) return this.handlerHoverSyntax(null)

      this.hoverText = text
      this.handlerHoverSyntax(text)
    },
    _handlerClick: function(item) {
      const {text} = item
      const {selectedText} = this

      // repeat 
      if(selectedText === text) {
        return this.selectedText = null
      }

      this.handlerClickSyntax(item)
      return this.selectedText = text
    },
    handlerOpenBox () {
      this.isOpened = !this.isOpened
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.syntaxContainer {
  border-top: 1px gray solid;
  margin-top: 40px;
}
.openBox {
  width: 25px;
  border: gray 2px solid;
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.typeContainer {
  margin: 0 5px;
}
.col {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  border: 1px gray solid;
  border-radius: 1px;
  margin: 2px 5px;
  padding: 5px 2px;
  min-width: 40px;
  cursor: pointer;
}
.title {
}
.etype {
  font-size: 8px;
}
.mtype {
  font-size: 8px;
}
</style>
