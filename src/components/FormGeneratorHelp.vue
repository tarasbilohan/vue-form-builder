<template>
  <div
    v-if="help"
    class="form-generator-help"
  >
    {{ help }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FormGeneratorHelp',
  props: {
    help: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.form-generator-help {
  font-size: 11px;
  opacity: 0.5;
  letter-spacing: 0.24px;
  margin-top: 5px;
}
</style>
