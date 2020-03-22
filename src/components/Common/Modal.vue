<template>
  <div>
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      style="display: block;"
      aria-modal="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if='title' class="modal-title" id="exampleModalLongTitle"> {{title}} </h5>
            <button type="button" class="close" @click='onClickCloseInner' data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="text-dark">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p> {{content}} </p>
          </div>
          <div class="modal-footer">
            <button v-if='onClickSave' type="button" class="btn btn-primary" @click='onClickSaveInner'>Save</button>
            <button v-if='onClickClose' type="button" class="btn btn-danger ml-2" @click='onClickCloseInner' data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: String,
    content: String,
    onClickClose: Function,
    onClickSave: Function
  },
  computed: {},
  methods: {
      onClickCloseInner: async function() {
          this.$store.system.modalData = null
          if(this.onClickClose) {
            await this.onClickClose()
          }
      },
      onClickSaveInner: async function() {
          if(this.onClickSave) {
            await this.onClickSave()
          }
      },
  }
};
</script>

<style scoped lang="scss">
</style>
