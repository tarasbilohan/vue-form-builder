import _Vue from 'vue'

import { toFormData } from './utilities/form-data'

import FormBuilder from './components/FormBuilder.vue'
import FormGenerator from './components/FormGenerator.vue'
import FormGeneratorCheckbox from './components/FormGeneratorCheckbox.vue'
import FormGeneratorCollection from './components/FormGeneratorCollection.vue'
import FormGeneratorDivider from './components/FormGeneratorDivider.vue'
import FormGeneratorError from './components/FormGeneratorError.vue'
import FormGeneratorFormItem from './components/FormGeneratorFormItem.vue'
import FormGeneratorHelp from './components/FormGeneratorHelp.vue'
import FormGeneratorLabel from './components/FormGeneratorLabel.vue'
import FormGeneratorRadio from './components/FormGeneratorRadio.vue'
import FormGeneratorSelect from './components/FormGeneratorSelect.vue'
import FormGeneratorInput from './components/FormGeneratorInput.vue'
import FormGeneratorTextarea from './components/FormGeneratorTextarea.vue'

export default {
  install (Vue: typeof _Vue) {
    Vue.component(FormBuilder.name, FormBuilder)
    Vue.component(FormGenerator.name, FormGenerator)
    Vue.component(FormGeneratorCheckbox.name, FormGeneratorCheckbox)
    Vue.component(FormGeneratorCollection.name, FormGeneratorCollection)
    Vue.component(FormGeneratorDivider.name, FormGeneratorDivider)
    Vue.component(FormGeneratorError.name, FormGeneratorError)
    Vue.component(FormGeneratorFormItem.name, FormGeneratorFormItem)
    Vue.component(FormGeneratorHelp.name, FormGeneratorHelp)
    Vue.component(FormGeneratorLabel.name, FormGeneratorLabel)
    Vue.component(FormGeneratorRadio.name, FormGeneratorRadio)
    Vue.component(FormGeneratorSelect.name, FormGeneratorSelect)
    Vue.component(FormGeneratorInput.name, FormGeneratorInput)
    Vue.component(FormGeneratorTextarea.name, FormGeneratorTextarea)
  }
}

export {
  toFormData,
  FormBuilder,
  FormGenerator,
  FormGeneratorCheckbox,
  FormGeneratorCollection,
  FormGeneratorDivider,
  FormGeneratorError,
  FormGeneratorFormItem,
  FormGeneratorHelp,
  FormGeneratorLabel,
  FormGeneratorRadio,
  FormGeneratorSelect,
  FormGeneratorInput,
  FormGeneratorTextarea
}
