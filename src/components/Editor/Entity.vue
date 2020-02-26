<template>
  <div class="entityContainer">
    <h3>Entity <span class='openBox' @click='handlerOpenBox'>{{isOpened ? '-' : '+'}}</span></h3>
    <div class='container' v-if='isOpened'>
      <div
        class='typeContainer'
        v-for='(type) in _typeList'
        :key='type'
      >
        {{type}}
        <div
          v-for='(item, index) in _entitiesData.filter(_item=>_item.entityType ===type)'
          :key='index' class='col'
          :style="_style(item)"
          @mouseover="_handlerHoverEntity(item.text)"
          @mouseleave="_handlerHoverEntity(null)"
          @click="_handlerClick(item)"
        >
          <span class='title'> {{item.text}} </span>
          <span class='mtype'> {{item.mentionType}} </span>
          <span class='etype'> {{item.entityType}} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Entities',
  components: {},
  props: {
      entitiesData: Array,
      handlerHoverEntity: Function,
      handlerClickEntity: Function
  },
  computed: {
    _entitiesData: function() {
      if(!this.entitiesData) return null

      const result = this.entitiesData.map(item => {
        const text = item.mentions[0].text.content
        const mentionType = item.mentions[0].type
        const entityType = item.type

        return {text, mentionType, entityType}
      })

      return result
    },
    _typeList: function() {
      if(!this.entitiesData) return null

      const result = this.entitiesData.map(item => {
        return item.type
      })
      const typeList = [...new Set(result)]

      return typeList
    },
  },
  data() {
    return {
      hoverText: false,
      selectedIndex: null,
      isOpened: true
    };
  },
  mounted() {
  },
  methods: {
    _style: function(item) {
      const {text} = item
      const {hoverText, selectedIndex} = this

      if(selectedIndex === text) {
        return  {background: 'yellow', color: 'black'}
      }

      if(hoverText === text) {
        return  {background: 'Cyan', color: 'black'}
      }

      return null
    },
    _handlerHoverEntity: function(text){
      if(text !==0 && !text) return this.handlerHoverEntity(null)

      this.hoverText = text
      this.handlerHoverEntity(text)
    },
    _handlerClick: function(item = {}) {
      const {text, entityType} = item
      const {selectedText} = this

      // repeat 
      if(selectedText === text) {
        return this.selectedText = null
      }

      const payload = {
        text, tag: entityType
      }
      this.handlerClickEntity(payload)
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
.entityContainer {
  border-top: 1px gray solid;
  margin-top: 40px;
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
.openBox {
  width: 25px;
  border: gray 2px solid;
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
}
</style>
