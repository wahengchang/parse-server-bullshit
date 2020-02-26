
<template>
    <div class=''>
        <span class='inputTitle'>
          {{title.substring(2, title.length - 2)}}
          <a :class='recordButton' @click='()=> isSpeechOn=!isSpeechOn'></a>
        </span>
        <SpeechToText lang="yue-Hant-HK" v-if='isSpeechOn' :onTranscriptionEnd='onTranscriptionEnd'/>
        <textarea
            type="text"
            name="igUrl"
            placeholder="https://www.instagram.com/p/B78mO-3jgYD/"
            :value='value'
            @input='updateValue(title, $event)'
        />
    </div>
</template>

<script>
import SpeechToText from '@/components/SpeechToText'

export default {
  name: "reactiveSpeechTextInput",
  components: {SpeechToText},
  props: {
    title: String,
    value: String,
    updateValue: Function
  },
  computed: {
    recordButton: function() {
      const _class = this.isSpeechOn? " Rec": ""
      return "styleSpeechButton" + _class
    }
  },
  data() {
      return {
          isSpeechOn: false,
          innerValue: this.value
      }
  },
  async mounted() {
  },
  methods: {
    onTranscriptionEnd: function(textObj = {}){
        const {transcription} = textObj
        this.updateValue(this.title, transcription.join(' '))
    }
  }
};
</script>

<style scoped>
.styleSpeechButton {
  width: 15px;
  height: 15px;
  font-size: 0;
  background-color: red;
  border: 0;
  border-radius: 35px;
  outline: none;
  display: inline-block;
  cursor: pointer;
  margin-left: 10px;
}
.inputTitle {
  font-size: 12px;
  line-height: 30px;
  height: 30px;
  display: inline-block;
}


.Rec{
	animation-name: pulse;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
}

@keyframes pulse{
	0%{
		box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);
	}
	65%{
		box-shadow: 0px 0px 5px 13px rgba(173,0,0,.3);
	}
	90%{
		box-shadow: 0px 0px 5px 13px rgba(173,0,0,0);
	}
}
</style>