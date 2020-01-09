(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/forIn'), require('lodash/isObject'), require('lodash/isArray'), require('vue'), require('lodash/kebabCase'), require('lodash/get'), require('lodash/set'), require('lodash/cloneDeep'), require('vue-runtime-helpers')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash/forIn', 'lodash/isObject', 'lodash/isArray', 'vue', 'lodash/kebabCase', 'lodash/get', 'lodash/set', 'lodash/cloneDeep', 'vue-runtime-helpers'], factory) :
  (global = global || self, factory(global.VueFormBuilder = {}, global.forIn, global.isObject, global.isArray, global.Vue, global.kebabCase, global.get, global.set, global.cloneDeep, global.vueRuntimeHelpers));
}(this, (function (exports, forIn, isObject, isArray, Vue, kebabCase, get, set, cloneDeep, vueRuntimeHelpers) { 'use strict';

  forIn = forIn && forIn.hasOwnProperty('default') ? forIn['default'] : forIn;
  isObject = isObject && isObject.hasOwnProperty('default') ? isObject['default'] : isObject;
  isArray = isArray && isArray.hasOwnProperty('default') ? isArray['default'] : isArray;
  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
  kebabCase = kebabCase && kebabCase.hasOwnProperty('default') ? kebabCase['default'] : kebabCase;
  get = get && get.hasOwnProperty('default') ? get['default'] : get;
  set = set && set.hasOwnProperty('default') ? set['default'] : set;
  cloneDeep = cloneDeep && cloneDeep.hasOwnProperty('default') ? cloneDeep['default'] : cloneDeep;

  function attachPropertyValueToFormData(formData, property, value, formPrefix = '') {
      let fullProperty = formPrefix.length ? `${formPrefix}[${property}]` : property;
      if (isObject(value) || isArray(value)) {
          forIn(value, (subValue, subProperty) => {
              attachPropertyValueToFormData(formData, subProperty, subValue, fullProperty);
          });
      }
      else {
          formData.append(fullProperty, value !== null ? `${value}` : '');
      }
  }
  function toFormData(object, formPrefix = '') {
      const formData = new FormData();
      forIn(object, function (value, property) {
          attachPropertyValueToFormData(formData, property, value, formPrefix);
      });
      return formData;
  }

  var script = Vue.extend({
      name: 'FormGenerator',
      props: {
          model: {
              type: Object,
              required: true
          },
          schema: {
              type: Array,
              required: true
          },
          errors: {
              type: Object,
              default: () => ({})
          },
          id: {
              type: String,
              required: true
          }
      },
      methods: {
          getFieldValue(field) {
              return get(this.model, field.path);
          },
          getFieldErrors(field) {
              return get(this.errors, field.path);
          },
          getFieldProps(field) {
              const fieldParams = cloneDeep(field.params);
              const fieldId = fieldParams.id || kebabCase(field.path);
              fieldParams.id = `${this.id}-${fieldId}`;
              return fieldParams;
          },
          onFieldUpdate(field, value) {
              const model = cloneDeep(this.model);
              set(model, field.path, value);
              this.$emit('update:model', model);
          }
      }
  });

  const __vue_script__ = script;
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "form-generator" },
      _vm._l(_vm.schema, function(field, index) {
        return _c(
          field.type,
          _vm._b(
            {
              key: index,
              tag: "component",
              staticClass: "form-generator__field",
              attrs: {
                value: _vm.getFieldValue(field),
                errors: _vm.getFieldErrors(field)
              },
              on: {
                "update:value": function($event) {
                  return _vm.onFieldUpdate(field, $event)
                }
              }
            },
            "component",
            _vm.getFieldProps(field),
            false
          )
        )
      }),
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-294a3d76_0", { source: ".form-generator[data-v-294a3d76] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.form-generator__field[data-v-294a3d76] {\n  flex-basis: 100%;\n}\n.form-generator__field.half[data-v-294a3d76] {\n  flex-basis: calc(50% - 8px);\n}\n\n/*# sourceMappingURL=FormGenerator.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGenerator.vue","FormGenerator.vue"],"names":[],"mappings":"AA0EA;EACA,aAAA;EACA,eAAA;EACA,8BAAA;ACzEA;AD2EA;EACA,gBAAA;ACzEA;AD2EA;EACA,2BAAA;ACzEA;;AAEA,4CAA4C","file":"FormGenerator.vue","sourcesContent":["<template>\n  <div class=\"form-generator\">\n    <component\n      :is=\"field.type\"\n      v-for=\"(field, index) in schema\"\n      :key=\"index\"\n      :value=\"getFieldValue(field)\"\n      :errors=\"getFieldErrors(field)\"\n      v-bind=\"getFieldProps(field)\"\n      class=\"form-generator__field\"\n      @update:value=\"onFieldUpdate(field, $event)\"\n    />\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\nimport get from 'lodash/get'\nimport set from 'lodash/set'\nimport cloneDeep from 'lodash/cloneDeep'\nimport kebabCase from 'lodash/kebabCase'\n\nimport { Schema, Errors, Model, SchemaField, SchemaFieldParams } from '../types'\n\nexport default Vue.extend({\n  name: 'FormGenerator',\n  props: {\n    model: {\n      type: Object as () => Model,\n      required: true\n    },\n    schema: {\n      type: Array as () => Schema,\n      required: true\n    },\n    errors: {\n      // TODO check prop type\n      // type: [Array, Object] as () => Errors,\n      type: Object as () => Errors,\n      default: () => ({})\n    },\n    id: {\n      type: String as () => string,\n      required: true\n    }\n  },\n  methods: {\n    getFieldValue (field: SchemaField): any {\n      return get(this.model, field.path)\n    },\n    getFieldErrors (field: SchemaField): any {\n      return get(this.errors, field.path)\n    },\n    getFieldProps (field: SchemaField): SchemaFieldParams {\n      const fieldParams = cloneDeep(field.params)\n\n      // Merge form id with field id\n      const fieldId = fieldParams.id || kebabCase(field.path)\n      fieldParams.id = `${this.id}-${fieldId}`\n\n      return fieldParams\n    },\n    onFieldUpdate (field: SchemaField, value: unknown) {\n      const model = cloneDeep(this.model)\n\n      set(model, field.path, value)\n\n      this.$emit('update:model', model)\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n\n  &__field {\n    flex-basis: 100%;\n\n    &.half {\n      flex-basis: calc(50% - 8px);\n    }\n  }\n}\n</style>\n",".form-generator {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.form-generator__field {\n  flex-basis: 100%;\n}\n.form-generator__field.half {\n  flex-basis: calc(50% - 8px);\n}\n\n/*# sourceMappingURL=FormGenerator.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__ = "data-v-294a3d76";
    const __vue_module_identifier__ = undefined;
    const __vue_is_functional_template__ = false;
    const __vue_component__ = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$1 = Vue.extend({
      name: 'FormGeneratorError',
      props: {
          errors: {
              type: Array,
              default: () => []
          }
      },
      computed: {
          firstError() {
              return this.errors[0] || null;
          }
      }
  });

  const __vue_script__$1 = script$1;
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.firstError
      ? _c("div", { staticClass: "form-generator-error" }, [
          _vm._v("\n  " + _vm._s(_vm.firstError) + "\n")
        ])
      : _vm._e()
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-40fb7927_0", { source: ".form-generator-error[data-v-40fb7927] {\n  font-size: 14px;\n  letter-spacing: 0.24px;\n  margin-top: 5px;\n  color: #b13232;\n}\n\n/*# sourceMappingURL=FormGeneratorError.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorError.vue","FormGeneratorError.vue"],"names":[],"mappings":"AA+BA;EACA,eAAA;EACA,sBAAA;EACA,eAAA;EACA,cAAA;AC9BA;;AAEA,iDAAiD","file":"FormGeneratorError.vue","sourcesContent":["<template>\n  <div\n    v-if=\"firstError\"\n    class=\"form-generator-error\"\n  >\n    {{ firstError }}\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nimport { ErrorMessages } from '../types'\n\nexport default Vue.extend({\n  name: 'FormGeneratorError',\n  props: {\n    errors: {\n      type: Array as () => ErrorMessages,\n      default: () => []\n    }\n  },\n  computed: {\n    firstError (): string | null {\n      return this.errors[0] || null\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-error {\n  font-size: 14px;\n  letter-spacing: 0.24px;\n  margin-top: 5px;\n  color: #b13232;\n}\n</style>\n",".form-generator-error {\n  font-size: 14px;\n  letter-spacing: 0.24px;\n  margin-top: 5px;\n  color: #b13232;\n}\n\n/*# sourceMappingURL=FormGeneratorError.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$1 = "data-v-40fb7927";
    const __vue_module_identifier__$1 = undefined;
    const __vue_is_functional_template__$1 = false;
    const __vue_component__$1 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$2 = Vue.extend({
      name: 'FormBuilder',
      components: {
          FormGenerator: __vue_component__,
          FormGeneratorError: __vue_component__$1
      },
      props: {
          model: {
              type: Object,
              required: true
          },
          schema: {
              type: Array,
              required: true
          },
          errors: {
              type: Object,
              default: () => ({})
          },
          id: {
              type: String,
              required: true
          },
          actionsAlign: {
              type: String,
              default: 'right',
              validator(value) {
                  return ['right', 'left', 'center'].includes(`${value}`);
              }
          },
          submitButtonLabel: {
              type: String,
              default: 'Submit'
          }
      },
      computed: {
          generatorModel() {
              return this.model;
          },
          generatorSchema() {
              return this.schema;
          },
          generatorErrors() {
              return this.errors;
          },
          generatorId() {
              return this.builderId;
          },
          builderId() {
              return kebabCase(this.id);
          },
          firstGlobalError() {
              if (this.errors.hasOwnProperty(0)) {
                  return isArray(this.errors[0]) ? this.errors[0] : [];
              }
              else if (this.errors.hasOwnProperty('0')) {
                  return isArray(this.errors['0']) ? this.errors['0'] : [];
              }
              return [];
          }
      },
      methods: {
          onModelUpdate(model) {
              this.$emit('update:model', model);
          },
          onSubmitBtnClick() {
              this.$emit('submit', { model: this.model });
          },
          onFormEnter() {
              this.$emit('submit', { model: this.model });
          }
      }
  });

  const __vue_script__$2 = script$2;
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form",
      {
        staticClass: "form-builder",
        attrs: { id: _vm.builderId },
        on: {
          keyup: function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
            ) {
              return null
            }
            return _vm.onFormEnter($event)
          }
        }
      },
      [
        _c("form-generator-error", {
          staticClass: "form-builder__error",
          attrs: { slot: "error", errors: _vm.firstGlobalError },
          slot: "error"
        }),
        _vm._v(" "),
        _c("form-generator", {
          staticClass: "form-builder__fields",
          attrs: {
            id: _vm.generatorId,
            model: _vm.generatorModel,
            schema: _vm.generatorSchema,
            errors: _vm.generatorErrors
          },
          on: { "update:model": _vm.onModelUpdate }
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "form-builder__actions actions",
            class: "form-builder__actions--" + _vm.actionsAlign,
            attrs: { slot: "actions" },
            slot: "actions"
          },
          [
            _c(
              "button",
              {
                staticClass: "actions__submit-btn form-btn",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.onSubmitBtnClick($event)
                  }
                }
              },
              [_vm._v("\n      " + _vm._s(_vm.submitButtonLabel) + "\n    ")]
            )
          ]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
    const __vue_inject_styles__$2 = function (inject) {
      if (!inject) return
      inject("data-v-52f3ab86_0", { source: ".form-builder__error[data-v-52f3ab86] {\n  padding: 0 45px;\n  margin-bottom: 15px;\n  text-align: center;\n}\n.form-builder__actions[data-v-52f3ab86] {\n  display: flex;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: -15px;\n}\n.form-builder__actions--left[data-v-52f3ab86] {\n  justify-content: flex-start;\n}\n.form-builder__actions--center[data-v-52f3ab86] {\n  justify-content: center;\n}\n.form-builder__actions--rigth[data-v-52f3ab86] {\n  justify-content: flex-end;\n}\n.form-builder__actions .form-btn[data-v-52f3ab86] {\n  display: block;\n  width: 200px;\n  height: 40px;\n  border-radius: 100px;\n  background-image: linear-gradient(to left, #ff6200, #ff7d00);\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 0.88px;\n  color: #fff;\n  text-transform: uppercase;\n  text-align: center;\n  border: none;\n  margin-left: 15px;\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=FormBuilder.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormBuilder.vue","FormBuilder.vue"],"names":[],"mappings":"AA0HA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;ACzHA;AD4HA;EACA,aAAA;EACA,yBAAA;EACA,eAAA;EACA,oBAAA;AC1HA;AD4HA;EACA,2BAAA;AC1HA;AD6HA;EACA,uBAAA;AC3HA;AD8HA;EACA,yBAAA;AC5HA;AD+HA;EACA,cAAA;EACA,YAAA;EACA,YAAA;EACA,oBAAA;EACA,4DAAA;EACA,eAAA;EACA,iBAAA;EACA,sBAAA;EACA,WAAA;EACA,yBAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;EACA,mBAAA;AC7HA;;AAEA,0CAA0C","file":"FormBuilder.vue","sourcesContent":["<template>\n  <form\n    :id=\"builderId\"\n    class=\"form-builder\"\n    @keyup.enter=\"onFormEnter\"\n  >\n    <form-generator-error\n      slot=\"error\"\n      :errors=\"firstGlobalError\"\n      class=\"form-builder__error\"\n    />\n    <form-generator\n      :id=\"generatorId\"\n      :model=\"generatorModel\"\n      :schema=\"generatorSchema\"\n      :errors=\"generatorErrors\"\n      class=\"form-builder__fields\"\n      @update:model=\"onModelUpdate\"\n    />\n    <div\n      slot=\"actions\"\n      :class=\"`form-builder__actions--${actionsAlign}`\"\n      class=\"form-builder__actions actions\"\n    >\n      <button\n        type=\"button\"\n        class=\"actions__submit-btn form-btn\"\n        @click.prevent=\"onSubmitBtnClick\"\n      >\n        {{ submitButtonLabel }}\n      </button>\n    </div>\n  </form>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\nimport kebabCase from 'lodash/kebabCase'\nimport isArray from 'lodash/isArray'\n\nimport { Schema, Errors, Model, ErrorMessages } from '../types'\n\nimport FormGenerator from './FormGenerator.vue'\nimport FormGeneratorError from './FormGeneratorError.vue'\n\nexport default Vue.extend({\n  name: 'FormBuilder',\n  components: {\n    FormGenerator,\n    FormGeneratorError\n  },\n  props: {\n    model: {\n      type: Object as () => Model,\n      required: true\n    },\n    schema: {\n      type: Array as () => Schema,\n      required: true\n    },\n    errors: {\n      type: Object as () => Errors,\n      default: () => ({})\n    },\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    actionsAlign: {\n      type: String as () => ('right' | 'left' | 'center'),\n      default: 'right',\n      validator (value: unknown) {\n        return ['right', 'left', 'center'].includes(`${value}`)\n      }\n    },\n    submitButtonLabel: {\n      type: String as () => string,\n      default: 'Submit'\n    }\n  },\n  computed: {\n    generatorModel (): Model {\n      return this.model\n    },\n    generatorSchema (): Schema {\n      return this.schema\n    },\n    generatorErrors (): Errors {\n      return this.errors\n    },\n    generatorId (): string {\n      return this.builderId\n    },\n    builderId (): string {\n      return kebabCase(this.id)\n    },\n    firstGlobalError (): ErrorMessages {\n      if (this.errors.hasOwnProperty(0)) {\n        return isArray(this.errors[0]) ? this.errors[0] : []\n      } else if (this.errors.hasOwnProperty('0')) {\n        return isArray(this.errors['0']) ? this.errors['0'] : []\n      }\n\n      return []\n    }\n  },\n  methods: {\n    onModelUpdate (model: Model) {\n      this.$emit('update:model', model)\n    },\n    onSubmitBtnClick () {\n      this.$emit('submit', { model: this.model })\n    },\n    onFormEnter () {\n      this.$emit('submit', { model: this.model })\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-builder {\n  &__error {\n    padding: 0 45px;\n    margin-bottom: 15px;\n    text-align: center;\n  }\n\n  &__actions {\n    display: flex;\n    justify-content: flex-end;\n    flex-wrap: wrap;\n    margin-bottom: -15px;\n\n    &--left {\n      justify-content: flex-start;\n    }\n\n    &--center {\n      justify-content: center;\n    }\n\n    &--rigth {\n      justify-content: flex-end;\n    }\n\n    .form-btn {\n      display: block;\n      width: 200px;\n      height: 40px;\n      border-radius: 100px;\n      background-image: linear-gradient(to left, #ff6200, #ff7d00);\n      font-size: 14px;\n      font-weight: bold;\n      letter-spacing: 0.88px;\n      color: #fff;\n      text-transform: uppercase;\n      text-align: center;\n      border: none;\n      margin-left: 15px;\n      margin-bottom: 15px;\n    }\n  }\n}\n</style>\n",".form-builder__error {\n  padding: 0 45px;\n  margin-bottom: 15px;\n  text-align: center;\n}\n.form-builder__actions {\n  display: flex;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n  margin-bottom: -15px;\n}\n.form-builder__actions--left {\n  justify-content: flex-start;\n}\n.form-builder__actions--center {\n  justify-content: center;\n}\n.form-builder__actions--rigth {\n  justify-content: flex-end;\n}\n.form-builder__actions .form-btn {\n  display: block;\n  width: 200px;\n  height: 40px;\n  border-radius: 100px;\n  background-image: linear-gradient(to left, #ff6200, #ff7d00);\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 0.88px;\n  color: #fff;\n  text-transform: uppercase;\n  text-align: center;\n  border: none;\n  margin-left: 15px;\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=FormBuilder.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$2 = "data-v-52f3ab86";
    const __vue_module_identifier__$2 = undefined;
    const __vue_is_functional_template__$2 = false;
    const __vue_component__$2 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$3 = Vue.extend({
      name: 'FormGeneratorFormItem',
      props: {
          className: {
              type: String,
              default: ''
          }
      }
  });

  const __vue_script__$3 = script$3;
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "form-generator-form-item", class: _vm.className },
      [
        _vm._t("label"),
        _vm._v(" "),
        _vm._t("default"),
        _vm._v(" "),
        _vm._t("help"),
        _vm._v(" "),
        _vm._t("error")
      ],
      2
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
    const __vue_inject_styles__$3 = function (inject) {
      if (!inject) return
      inject("data-v-cea0c114_0", { source: ".form-generator-form-item[data-v-cea0c114] {\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=FormGeneratorFormItem.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorFormItem.vue","FormGeneratorFormItem.vue"],"names":[],"mappings":"AA2BA;EACA,mBAAA;AC1BA;;AAEA,oDAAoD","file":"FormGeneratorFormItem.vue","sourcesContent":["<template>\n  <div\n    :class=\"className\"\n    class=\"form-generator-form-item\"\n  >\n    <slot name=\"label\" />\n    <slot />\n    <slot name=\"help\" />\n    <slot name=\"error\" />\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorFormItem',\n  props: {\n    className: {\n      type: String as () => string,\n      default: ''\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-form-item {\n  margin-bottom: 15px;\n}\n</style>\n",".form-generator-form-item {\n  margin-bottom: 15px;\n}\n\n/*# sourceMappingURL=FormGeneratorFormItem.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$3 = "data-v-cea0c114";
    const __vue_module_identifier__$3 = undefined;
    const __vue_is_functional_template__$3 = false;
    const __vue_component__$3 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$4 = Vue.extend({
      name: 'FormGeneratorLabel',
      props: {
          forInput: {
              type: String,
              required: true
          },
          label: {
              type: String,
              required: true
          },
          required: {
              type: Boolean,
              default: true
          }
      }
  });

  const __vue_script__$4 = script$4;
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.label
      ? _c(
          "label",
          { staticClass: "form-generator-label", attrs: { for: _vm.forInput } },
          [
            _vm._v("\n  " + _vm._s(_vm.label) + " "),
            _vm.required ? _c("span", [_vm._v("*")]) : _vm._e()
          ]
        )
      : _vm._e()
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;
    const __vue_inject_styles__$4 = function (inject) {
      if (!inject) return
      inject("data-v-41adf199_0", { source: ".form-generator-label[data-v-41adf199] {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.3px;\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=FormGeneratorLabel.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorLabel.vue","FormGeneratorLabel.vue"],"names":[],"mappings":"AAiCA;EACA,cAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,kBAAA;AChCA;;AAEA,iDAAiD","file":"FormGeneratorLabel.vue","sourcesContent":["<template>\n  <label\n    v-if=\"label\"\n    :for=\"forInput\"\n    class=\"form-generator-label\"\n  >\n    {{ label }} <span v-if=\"required\">*</span>\n  </label>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorLabel',\n  props: {\n    forInput: {\n      type: String as () => string,\n      required: true\n    },\n    label: {\n      type: String as () => string,\n      required: true\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-label {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.3px;\n  margin-bottom: 5px;\n}\n</style>\n",".form-generator-label {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.3px;\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=FormGeneratorLabel.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$4 = "data-v-41adf199";
    const __vue_module_identifier__$4 = undefined;
    const __vue_is_functional_template__$4 = false;
    const __vue_component__$4 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$5 = Vue.extend({
      name: 'FormGeneratorHelp',
      props: {
          help: {
              type: String,
              default: ''
          }
      }
  });

  const __vue_script__$5 = script$5;
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.help
      ? _c("div", { staticClass: "form-generator-help" }, [
          _vm._v("\n  " + _vm._s(_vm.help) + "\n")
        ])
      : _vm._e()
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;
    const __vue_inject_styles__$5 = function (inject) {
      if (!inject) return
      inject("data-v-52334367_0", { source: ".form-generator-help[data-v-52334367] {\n  font-size: 11px;\n  opacity: 0.5;\n  letter-spacing: 0.24px;\n  margin-top: 5px;\n}\n\n/*# sourceMappingURL=FormGeneratorHelp.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorHelp.vue","FormGeneratorHelp.vue"],"names":[],"mappings":"AAwBA;EACA,eAAA;EACA,YAAA;EACA,sBAAA;EACA,eAAA;ACvBA;;AAEA,gDAAgD","file":"FormGeneratorHelp.vue","sourcesContent":["<template>\n  <div\n    v-if=\"help\"\n    class=\"form-generator-help\"\n  >\n    {{ help }}\n  </div>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorHelp',\n  props: {\n    help: {\n      type: String as () => string,\n      default: ''\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-help {\n  font-size: 11px;\n  opacity: 0.5;\n  letter-spacing: 0.24px;\n  margin-top: 5px;\n}\n</style>\n",".form-generator-help {\n  font-size: 11px;\n  opacity: 0.5;\n  letter-spacing: 0.24px;\n  margin-top: 5px;\n}\n\n/*# sourceMappingURL=FormGeneratorHelp.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$5 = "data-v-52334367";
    const __vue_module_identifier__$5 = undefined;
    const __vue_is_functional_template__$5 = false;
    const __vue_component__$5 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$6 = Vue.extend({
      name: 'FormGeneratorCheckbox',
      components: {
          FormGeneratorFormItem: __vue_component__$3,
          FormGeneratorLabel: __vue_component__$4,
          FormGeneratorHelp: __vue_component__$5,
          FormGeneratorError: __vue_component__$1
      },
      props: {
          id: {
              type: String,
              required: true
          },
          value: {
              type: [Boolean, String, Number],
              default: false
          },
          errors: {
              type: Array,
              default: () => []
          },
          label: {
              type: String,
              required: true
          },
          text: {
              type: String,
              default: ''
          },
          formGroupClassName: {
              type: String,
              default: ''
          },
          placeholder: {
              type: String,
              default: ''
          },
          help: {
              type: String,
              default: ''
          },
          required: {
              type: Boolean,
              default: true
          }
      },
      methods: {
          onChange(event) {
              const target = event.target;
              this.$emit('update:value', target.checked);
              this.$emit('input', target.checked);
          }
      }
  });

  const __vue_script__$6 = script$6;
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-item",
      {
        staticClass: "form-generator-checkbox",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: {
            slot: "label",
            "for-input": _vm.id,
            label: _vm.label,
            required: _vm.required
          },
          slot: "label"
        }),
        _vm._v(" "),
        _c(
          "label",
          { staticClass: "form-generator-checkbox__checkbox checkbox" },
          [
            _c("input", {
              staticClass: "checkbox__input",
              attrs: { id: _vm.id, type: "checkbox", name: "isSubscribed" },
              domProps: { checked: _vm.value },
              on: { change: _vm.onChange }
            }),
            _vm._v(" "),
            _c(
              "label",
              { staticClass: "checkbox__label", attrs: { for: _vm.id } },
              [_vm._v("\n      " + _vm._s(_vm.text) + "\n    ")]
            )
          ]
        ),
        _vm._v(" "),
        _c("form-generator-help", {
          attrs: { slot: "help", help: _vm.help },
          slot: "help"
        }),
        _vm._v(" "),
        _c("form-generator-error", {
          attrs: { slot: "error", errors: _vm.errors },
          slot: "error"
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;
    const __vue_inject_styles__$6 = function (inject) {
      if (!inject) return
      inject("data-v-6a500da2_0", { source: ".form-generator-checkbox .checkbox[data-v-6a500da2] {\n  position: relative;\n  display: inline-block;\n  backface-visibility: hidden;\n  outline: 0;\n  vertical-align: initial;\n  font-style: normal;\n  min-height: 16px;\n  font-size: 16px;\n  line-height: 16px;\n  min-width: 16px;\n}\n.form-generator-checkbox .checkbox__input[data-v-6a500da2] {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  outline: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n  padding: 0;\n}\n.form-generator-checkbox .checkbox__input:checked + .checkbox__label[data-v-6a500da2]::before {\n  background-color: #f0702f;\n  border: 1px solid #f0702f;\n}\n.form-generator-checkbox .checkbox__input:checked + .checkbox__label[data-v-6a500da2]::after {\n  display: block;\n}\n.form-generator-checkbox .checkbox__label[data-v-6a500da2] {\n  position: relative;\n  display: block;\n  padding-left: 30px;\n  outline: 0;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.87);\n  transition: color 0.1s ease;\n  cursor: pointer;\n  user-select: none;\n  min-height: 16px;\n}\n.form-generator-checkbox .checkbox__label[data-v-6a500da2]::before, .form-generator-checkbox .checkbox__label[data-v-6a500da2]::after {\n  content: \"\";\n  transition: border 0.1s ease, opacity 0.1s ease, transform 0.1s ease, box-shadow 0.1s ease;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 16px;\n  height: 16px;\n  background-color: #fff;\n  border: 1px solid #b2b2b2;\n  border-radius: 3px;\n}\n.form-generator-checkbox .checkbox__label[data-v-6a500da2]::after {\n  display: none;\n  background: transparent;\n  width: 5px;\n  height: 10px;\n  border: 1px solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n  margin: 2px 0 0 6px;\n  border-radius: 0;\n}\n\n/*# sourceMappingURL=FormGeneratorCheckbox.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorCheckbox.vue","FormGeneratorCheckbox.vue"],"names":[],"mappings":"AA2GA;EACA,kBAAA;EACA,qBAAA;EACA,2BAAA;EACA,UAAA;EACA,uBAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;EACA,iBAAA;EACA,eAAA;AC1GA;AD4GA;EACA,eAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,UAAA;EACA,aAAA;EACA,QAAA;EACA,SAAA;EACA,SAAA;EACA,UAAA;AC1GA;AD8GA;EACA,yBAAA;EACA,yBAAA;AC5GA;AD+GA;EACA,cAAA;AC7GA;ADmHA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;EACA,UAAA;EACA,eAAA;EACA,0BAAA;EACA,2BAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;ACjHA;ADmHA;EAEA,WAAA;EACA,0FAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,sBAAA;EACA,yBAAA;EACA,kBAAA;AClHA;ADqHA;EACA,aAAA;EACA,uBAAA;EACA,UAAA;EACA,YAAA;EACA,sBAAA;EACA,yBAAA;EACA,wBAAA;EACA,mBAAA;EACA,gBAAA;ACnHA;;AAEA,oDAAoD","file":"FormGeneratorCheckbox.vue","sourcesContent":["<template>\n  <form-generator-form-item\n    :class-name=\"formGroupClassName\"\n    class=\"form-generator-checkbox\"\n  >\n    <form-generator-label\n      slot=\"label\"\n      :for-input=\"id\"\n      :label=\"label\"\n      :required=\"required\"\n    />\n    <label class=\"form-generator-checkbox__checkbox checkbox\">\n      <input\n        :id=\"id\"\n        :checked=\"value\"\n        type=\"checkbox\"\n        name=\"isSubscribed\"\n        class=\"checkbox__input\"\n        @change=\"onChange\"\n      >\n      <label\n        :for=\"id\"\n        class=\"checkbox__label\"\n      >\n        {{ text }}\n      </label>\n    </label>\n    <form-generator-help\n      slot=\"help\"\n      :help=\"help\"\n    />\n    <form-generator-error\n      slot=\"error\"\n      :errors=\"errors\"\n    />\n  </form-generator-form-item>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nimport { ErrorMessages } from '../types'\n\nimport FormGeneratorFormItem from './FormGeneratorFormItem.vue'\nimport FormGeneratorLabel from './FormGeneratorLabel.vue'\nimport FormGeneratorHelp from './FormGeneratorHelp.vue'\nimport FormGeneratorError from './FormGeneratorError.vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorCheckbox',\n  components: {\n    FormGeneratorFormItem,\n    FormGeneratorLabel,\n    FormGeneratorHelp,\n    FormGeneratorError\n  },\n  props: {\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    value: {\n      type: [Boolean, String, Number] as ((() => boolean) | (() => string) | (() => number))[],\n      default: false\n    },\n    errors: {\n      type: Array as () => ErrorMessages,\n      default: () => []\n    },\n    label: {\n      type: String as () => string,\n      required: true\n    },\n    text: {\n      type: String as () => string,\n      default: ''\n    },\n    formGroupClassName: {\n      type: String as () => string,\n      default: ''\n    },\n    placeholder: {\n      type: String as () => string,\n      default: ''\n    },\n    help: {\n      type: String as () => string,\n      default: ''\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    }\n  },\n  methods: {\n    onChange (event: InputEvent) {\n      const target = event.target as HTMLInputElement\n\n      this.$emit('update:value', target.checked)\n      this.$emit('input', target.checked)\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-checkbox {\n  .checkbox {\n    position: relative;\n    display: inline-block;\n    backface-visibility: hidden;\n    outline: 0;\n    vertical-align: initial;\n    font-style: normal;\n    min-height: 16px;\n    font-size: 16px;\n    line-height: 16px;\n    min-width: 16px;\n\n    &__input {\n      cursor: pointer;\n      position: absolute;\n      top: 0;\n      left: 0;\n      opacity: 0;\n      outline: none;\n      width: 0;\n      height: 0;\n      margin: 0;\n      padding: 0;\n\n      &:checked {\n        & + .checkbox__label {\n          &::before {\n            background-color: #f0702f;\n            border: 1px solid #f0702f;\n          }\n\n          &::after {\n            display: block;\n          }\n        }\n      }\n    }\n\n    &__label {\n      position: relative;\n      display: block;\n      padding-left: 30px;\n      outline: 0;\n      font-size: 14px;\n      color: rgba(0, 0, 0, .87);\n      transition: color .1s ease;\n      cursor: pointer;\n      user-select: none;\n      min-height: 16px;\n\n      &::before,\n      &::after {\n        content: \"\";\n        transition: border .1s ease, opacity .1s ease, transform .1s ease, box-shadow .1s ease;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 16px;\n        height: 16px;\n        background-color: #fff;\n        border: 1px solid #b2b2b2;\n        border-radius: 3px;\n      }\n\n      &::after {\n        display: none;\n        background: transparent;\n        width: 5px;\n        height: 10px;\n        border: 1px solid #fff;\n        border-width: 0 2px 2px 0;\n        transform: rotate(45deg);\n        margin: 2px 0 0 6px;\n        border-radius: 0;\n      }\n    }\n  }\n}\n</style>\n",".form-generator-checkbox .checkbox {\n  position: relative;\n  display: inline-block;\n  backface-visibility: hidden;\n  outline: 0;\n  vertical-align: initial;\n  font-style: normal;\n  min-height: 16px;\n  font-size: 16px;\n  line-height: 16px;\n  min-width: 16px;\n}\n.form-generator-checkbox .checkbox__input {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  outline: none;\n  width: 0;\n  height: 0;\n  margin: 0;\n  padding: 0;\n}\n.form-generator-checkbox .checkbox__input:checked + .checkbox__label::before {\n  background-color: #f0702f;\n  border: 1px solid #f0702f;\n}\n.form-generator-checkbox .checkbox__input:checked + .checkbox__label::after {\n  display: block;\n}\n.form-generator-checkbox .checkbox__label {\n  position: relative;\n  display: block;\n  padding-left: 30px;\n  outline: 0;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.87);\n  transition: color 0.1s ease;\n  cursor: pointer;\n  user-select: none;\n  min-height: 16px;\n}\n.form-generator-checkbox .checkbox__label::before, .form-generator-checkbox .checkbox__label::after {\n  content: \"\";\n  transition: border 0.1s ease, opacity 0.1s ease, transform 0.1s ease, box-shadow 0.1s ease;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 16px;\n  height: 16px;\n  background-color: #fff;\n  border: 1px solid #b2b2b2;\n  border-radius: 3px;\n}\n.form-generator-checkbox .checkbox__label::after {\n  display: none;\n  background: transparent;\n  width: 5px;\n  height: 10px;\n  border: 1px solid #fff;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n  margin: 2px 0 0 6px;\n  border-radius: 0;\n}\n\n/*# sourceMappingURL=FormGeneratorCheckbox.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$6 = "data-v-6a500da2";
    const __vue_module_identifier__$6 = undefined;
    const __vue_is_functional_template__$6 = false;
    const __vue_component__$6 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$7 = Vue.extend({
      name: 'FormGeneratorCollection',
      components: {
          FormGenerator: __vue_component__,
          FormGeneratorFormItem: __vue_component__$3,
          FormGeneratorLabel: __vue_component__$4,
          FormGeneratorHelp: __vue_component__$5
      },
      props: {
          id: {
              type: String,
              required: true
          },
          value: {
              type: Array,
              required: true
          },
          errors: {
              type: Array,
              default: () => { }
          },
          schema: {
              type: Array,
              required: true
          },
          label: {
              type: String,
              default: ''
          },
          formGroupClassName: {
              type: String,
              default: ''
          },
          help: {
              type: String,
              default: ''
          },
          required: {
              type: Boolean,
              default: true
          },
          allowAdd: {
              type: Boolean,
              default: false
          },
          addButtonLabel: {
              type: String,
              default: 'Add new'
          },
          allowDelete: {
              type: Boolean,
              default: false
          },
          deleteButtonLabel: {
              type: String,
              default: 'Delete'
          }
      },
      methods: {
          getFormGeneratorId(index) {
              return `${this.id}-${index}`;
          },
          getFormGeneratorErrors(index) {
              return get(this.errors, index, {});
          },
          updateValue(value) {
              this.$emit(`update:value`, value);
          },
          onItemModelUpdate(index, value) {
              const clonedValue = cloneDeep(this.value);
              set(clonedValue, index, value);
              this.updateValue(clonedValue);
          },
          onDelete(index) {
              const clonedValue = cloneDeep(this.value);
              clonedValue.splice(index, 1);
              this.updateValue(clonedValue);
          },
          onAdd() {
              const clonedValue = cloneDeep(this.value);
              const defaultItem = {};
              Object.values(this.schema).forEach((field) => {
                  set(defaultItem, field.path, field.params.default || '');
              });
              clonedValue.push(defaultItem);
              this.updateValue(clonedValue);
          }
      }
  });

  const __vue_script__$7 = script$7;
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-item",
      {
        staticClass: "form-generator-collection",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          staticClass: "form-generator-collection__label",
          attrs: {
            slot: "label",
            "for-input": _vm.id,
            label: _vm.label,
            required: false
          },
          slot: "label"
        }),
        _vm._v(" "),
        _c("form-generator-help", { attrs: { help: _vm.help } }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-generator-collection__items" },
          [
            _vm._l(_vm.value, function(item, index) {
              return _c(
                "div",
                {
                  key: index,
                  staticClass: "form-generator-collection__item collection-item"
                },
                [
                  _c("form-generator", {
                    attrs: {
                      id: _vm.getFormGeneratorId(index),
                      model: item,
                      schema: _vm.schema,
                      errors: _vm.getFormGeneratorErrors(index)
                    },
                    on: {
                      "update:model": function($event) {
                        return _vm.onItemModelUpdate(index, $event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.allowDelete
                    ? _c("div", { staticClass: "collection-item__actions" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "form-generator-collection__btn btn-delete",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault();
                                return _vm.onDelete(index)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n          " +
                                _vm._s(_vm.deleteButtonLabel) +
                                "\n        "
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ],
                1
              )
            }),
            _vm._v(" "),
            _vm.allowAdd
              ? _c(
                  "button",
                  {
                    staticClass: "form-generator-collection__btn btn-add",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.onAdd($event)
                      }
                    }
                  },
                  [_vm._v("\n      " + _vm._s(_vm.addButtonLabel) + "\n    ")]
                )
              : _vm._e()
          ],
          2
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;
    const __vue_inject_styles__$7 = function (inject) {
      if (!inject) return
      inject("data-v-413a6156_0", { source: ".form-generator-collection__label[data-v-413a6156] {\n  margin-bottom: 15px;\n}\n.form-generator-collection__btn[data-v-413a6156] {\n  border-radius: 4px;\n  background-image: linear-gradient(to left, #9e9e9e, #b5b5b5);\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 0.88px;\n  color: #fff;\n  text-align: center;\n  border: none;\n  padding: 5px 10px;\n}\n.form-generator-collection .btn-add[data-v-413a6156] {\n  background-image: linear-gradient(to left, #329235, #41a544);\n}\n.form-generator-collection .btn-delete[data-v-413a6156] {\n  background-image: linear-gradient(to left, #d84727, #de5638);\n}\n.form-generator-collection .collection-item__actions[data-v-413a6156] {\n  text-align: right;\n}\n.form-generator-collection .collection-item[data-v-413a6156] .form-generator-form-item {\n  padding: 0;\n}\n\n/*# sourceMappingURL=FormGeneratorCollection.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorCollection.vue","FormGeneratorCollection.vue"],"names":[],"mappings":"AAuKA;EACA,mBAAA;ACtKA;ADyKA;EACA,kBAAA;EACA,4DAAA;EACA,eAAA;EACA,iBAAA;EACA,sBAAA;EACA,WAAA;EACA,kBAAA;EACA,YAAA;EACA,iBAAA;ACvKA;AD0KA;EACA,4DAAA;ACxKA;AD2KA;EACA,4DAAA;ACzKA;AD6KA;EACA,iBAAA;AC3KA;AD+KA;EACA,UAAA;AC7KA;;AAEA,sDAAsD","file":"FormGeneratorCollection.vue","sourcesContent":["<template>\n  <form-generator-form-item\n    :class-name=\"formGroupClassName\"\n    class=\"form-generator-collection\"\n  >\n    <form-generator-label\n      slot=\"label\"\n      :for-input=\"id\"\n      :label=\"label\"\n      :required=\"false\"\n      class=\"form-generator-collection__label\"\n    />\n    <form-generator-help\n      :help=\"help\"\n    />\n    <div class=\"form-generator-collection__items\">\n      <div\n        v-for=\"(item, index) in value\"\n        :key=\"index\"\n        class=\"form-generator-collection__item collection-item\"\n      >\n        <form-generator\n          :id=\"getFormGeneratorId(index)\"\n          :model=\"item\"\n          :schema=\"schema\"\n          :errors=\"getFormGeneratorErrors(index)\"\n          @update:model=\"onItemModelUpdate(index, $event)\"\n        />\n        <div\n          v-if=\"allowDelete\"\n          class=\"collection-item__actions\"\n        >\n          <button\n            type=\"button\"\n            class=\"form-generator-collection__btn btn-delete\"\n            @click.prevent=\"onDelete(index)\"\n          >\n            {{ deleteButtonLabel }}\n          </button>\n        </div>\n      </div>\n      <button\n        v-if=\"allowAdd\"\n        type=\"button\"\n        class=\"form-generator-collection__btn btn-add\"\n        @click.prevent=\"onAdd\"\n      >\n        {{ addButtonLabel }}\n      </button>\n    </div>\n  </form-generator-form-item>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\nimport get from 'lodash/get'\nimport set from 'lodash/set'\nimport cloneDeep from 'lodash/cloneDeep'\n\nimport { Schema, Errors, Model } from '../types'\n\nimport FormGenerator from './FormGenerator.vue'\nimport FormGeneratorFormItem from './FormGeneratorFormItem.vue'\nimport FormGeneratorLabel from './FormGeneratorLabel.vue'\nimport FormGeneratorHelp from './FormGeneratorHelp.vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorCollection',\n  components: {\n    FormGenerator,\n    FormGeneratorFormItem,\n    FormGeneratorLabel,\n    FormGeneratorHelp\n  },\n  props: {\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    value: {\n      type: Array as () => any[],\n      required: true\n    },\n    errors: {\n      type: Array as () => { [key: number]: Errors },\n      default: () => {}\n    },\n    schema: {\n      type: Array as () => Schema,\n      required: true\n    },\n    label: {\n      type: String as () => string,\n      default: ''\n    },\n    formGroupClassName: {\n      type: String as () => string,\n      default: ''\n    },\n    help: {\n      type: String as () => string,\n      default: ''\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    },\n    allowAdd: {\n      type: Boolean as () => boolean,\n      default: false\n    },\n    addButtonLabel: {\n      type: String as () => string,\n      default: 'Add new'\n    },\n    allowDelete: {\n      type: Boolean as () => boolean,\n      default: false\n    },\n    deleteButtonLabel: {\n      type: String as () => string,\n      default: 'Delete'\n    }\n  },\n  methods: {\n    getFormGeneratorId (index: number): string {\n      return `${this.id}-${index}`\n    },\n    getFormGeneratorErrors (index: number): Errors {\n      return get(this.errors, index, {})\n    },\n    updateValue (value: Model) {\n      this.$emit(`update:value`, value)\n    },\n    onItemModelUpdate (index: number, value: Model) {\n      const clonedValue = cloneDeep(this.value)\n\n      set(clonedValue, index, value)\n\n      this.updateValue(clonedValue)\n    },\n    onDelete (index: number) {\n      const clonedValue = cloneDeep(this.value)\n\n      clonedValue.splice(index, 1)\n\n      this.updateValue(clonedValue)\n    },\n    onAdd () {\n      const clonedValue = cloneDeep(this.value)\n\n      // TODO check this code\n      const defaultItem = {}\n      Object.values(this.schema).forEach((field) => {\n        set(defaultItem, field.path, field.params.default || '')\n      })\n\n      clonedValue.push(defaultItem)\n\n      this.updateValue(clonedValue)\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-collection {\n  &__label {\n    margin-bottom: 15px;\n  }\n\n  &__btn {\n    border-radius: 4px;\n    background-image: linear-gradient(to left, #9e9e9e, #b5b5b5);\n    font-size: 14px;\n    font-weight: bold;\n    letter-spacing: 0.88px;\n    color: #fff;\n    text-align: center;\n    border: none;\n    padding: 5px 10px;\n  }\n\n  .btn-add {\n    background-image: linear-gradient(to left, #329235, #41a544);\n  }\n\n  .btn-delete {\n    background-image: linear-gradient(to left, #d84727, #de5638);\n  }\n\n  .collection-item {\n    &__actions {\n      text-align: right;\n    }\n\n    &::v-deep {\n      .form-generator-form-item {\n        padding: 0;\n      }\n    }\n  }\n}\n</style>\n",".form-generator-collection__label {\n  margin-bottom: 15px;\n}\n.form-generator-collection__btn {\n  border-radius: 4px;\n  background-image: linear-gradient(to left, #9e9e9e, #b5b5b5);\n  font-size: 14px;\n  font-weight: bold;\n  letter-spacing: 0.88px;\n  color: #fff;\n  text-align: center;\n  border: none;\n  padding: 5px 10px;\n}\n.form-generator-collection .btn-add {\n  background-image: linear-gradient(to left, #329235, #41a544);\n}\n.form-generator-collection .btn-delete {\n  background-image: linear-gradient(to left, #d84727, #de5638);\n}\n.form-generator-collection .collection-item__actions {\n  text-align: right;\n}\n.form-generator-collection .collection-item::v-deep .form-generator-form-item {\n  padding: 0;\n}\n\n/*# sourceMappingURL=FormGeneratorCollection.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$7 = "data-v-413a6156";
    const __vue_module_identifier__$7 = undefined;
    const __vue_is_functional_template__$7 = false;
    const __vue_component__$7 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$8 = Vue.extend({
      name: 'FormGeneratorDivider'
  });

  const __vue_script__$8 = script$8;
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "form-generator-divider" })
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;
    const __vue_inject_styles__$8 = function (inject) {
      if (!inject) return
      inject("data-v-38161980_0", { source: ".form-generator-divider[data-v-38161980] {\n  width: 100%;\n  height: 1px;\n  background-color: #e3e3e3;\n  margin-bottom: 20px;\n}\n\n/*# sourceMappingURL=FormGeneratorDivider.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorDivider.vue","FormGeneratorDivider.vue"],"names":[],"mappings":"AAaA;EACA,WAAA;EACA,WAAA;EACA,yBAAA;EACA,mBAAA;ACZA;;AAEA,mDAAmD","file":"FormGeneratorDivider.vue","sourcesContent":["<template>\n  <div class=\"form-generator-divider\" />\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorDivider'\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-divider {\n  width: 100%;\n  height: 1px;\n  background-color: #e3e3e3;\n  margin-bottom: 20px;\n}\n</style>\n",".form-generator-divider {\n  width: 100%;\n  height: 1px;\n  background-color: #e3e3e3;\n  margin-bottom: 20px;\n}\n\n/*# sourceMappingURL=FormGeneratorDivider.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$8 = "data-v-38161980";
    const __vue_module_identifier__$8 = undefined;
    const __vue_is_functional_template__$8 = false;
    const __vue_component__$8 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$9 = Vue.extend({
      name: 'FormGeneratorRadio',
      components: {
          FormGeneratorFormItem: __vue_component__$3,
          FormGeneratorLabel: __vue_component__$4,
          FormGeneratorHelp: __vue_component__$5,
          FormGeneratorError: __vue_component__$1
      },
      props: {
          id: {
              type: String,
              required: true
          },
          value: {
              type: [String, Number],
              default: ''
          },
          errors: {
              type: Array,
              default: () => []
          },
          label: {
              type: String,
              default: ''
          },
          options: {
              type: Array,
              required: true
          },
          formGroupClassName: {
              type: String,
              default: ''
          },
          help: {
              type: String,
              default: ''
          },
          required: {
              type: Boolean,
              default: true
          }
      },
      methods: {
          onChange(event) {
              const target = event.target;
              this.$emit('update:value', target.value);
          }
      }
  });

  const __vue_script__$9 = script$9;
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-item",
      {
        staticClass: "form-generator-radio",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: {
            slot: "label",
            "for-input": _vm.id,
            label: _vm.label,
            required: _vm.required
          },
          slot: "label"
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "radio-buttons" },
          _vm._l(_vm.options, function(option) {
            return _c("label", { key: option.key, staticClass: "radio-button" }, [
              _c("input", {
                staticClass: "radio-button__input",
                attrs: { type: "radio" },
                domProps: {
                  value: option.value,
                  checked: option.value === _vm.value
                },
                on: { change: _vm.onChange }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "radio-button__title" }, [
                _vm._v("\n        " + _vm._s(option.label) + "\n      ")
              ])
            ])
          }),
          0
        ),
        _vm._v(" "),
        _c("form-generator-help", {
          attrs: { slot: "help", help: _vm.help },
          slot: "help"
        }),
        _vm._v(" "),
        _c("form-generator-error", {
          attrs: { slot: "error", errors: _vm.errors },
          slot: "error"
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;
    const __vue_inject_styles__$9 = function (inject) {
      if (!inject) return
      inject("data-v-8c290d6c_0", { source: ".form-generator-radio .radio-button[data-v-8c290d6c] {\n  font-size: 14px;\n  margin: 0;\n}\n.form-generator-radio .radio-button[data-v-8c290d6c]:hover {\n  cursor: pointer;\n}\n.form-generator-radio .radio-button[data-v-8c290d6c]:not(:last-child) {\n  margin-right: 35px;\n}\n.form-generator-radio .radio-button__input[data-v-8c290d6c] {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n  margin: 0;\n}\n.form-generator-radio .radio-button__input:checked + .radio-button__title[data-v-8c290d6c]::after {\n  opacity: 1;\n}\n.form-generator-radio .radio-button__input:checked + .radio-button__title[data-v-8c290d6c]::before {\n  border-color: #f27023;\n  background: #f27023;\n}\n.form-generator-radio .radio-button__title[data-v-8c290d6c] {\n  position: relative;\n  padding: 0 0 0 25px;\n}\n.form-generator-radio .radio-button__title[data-v-8c290d6c]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 0;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #b2b2b2;\n  border-radius: 50%;\n  background: #fff;\n}\n.form-generator-radio .radio-button__title[data-v-8c290d6c]::after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 5px;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #fff;\n  opacity: 0;\n  transition: 0.2s;\n}\n\n/*# sourceMappingURL=FormGeneratorRadio.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorRadio.vue","FormGeneratorRadio.vue"],"names":[],"mappings":"AAwGA;EACA,eAAA;EACA,SAAA;ACvGA;ADyGA;EACA,eAAA;ACvGA;AD0GA;EACA,kBAAA;ACxGA;AD2GA;EACA,kBAAA;EACA,WAAA;EACA,UAAA;EACA,SAAA;ACzGA;AD2GA;EACA,UAAA;ACzGA;AD4GA;EACA,qBAAA;EACA,mBAAA;AC1GA;AD8GA;EACA,kBAAA;EACA,mBAAA;AC5GA;AD8GA;EACA,WAAA;EACA,kBAAA;EACA,QAAA;EACA,2BAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;EACA,gBAAA;AC5GA;AD+GA;EACA,WAAA;EACA,kBAAA;EACA,QAAA;EACA,2BAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,UAAA;EACA,gBAAA;AC7GA;;AAEA,iDAAiD","file":"FormGeneratorRadio.vue","sourcesContent":["<template>\n  <form-generator-form-item\n    :class-name=\"formGroupClassName\"\n    class=\"form-generator-radio\"\n  >\n    <form-generator-label\n      slot=\"label\"\n      :for-input=\"id\"\n      :label=\"label\"\n      :required=\"required\"\n    />\n    <div class=\"radio-buttons\">\n      <label\n        v-for=\"option in options\"\n        :key=\"option.key\"\n        class=\"radio-button\"\n      >\n        <input\n          :value=\"option.value\"\n          :checked=\"option.value === value\"\n          type=\"radio\"\n          class=\"radio-button__input\"\n          @change=\"onChange\"\n        >\n        <span class=\"radio-button__title\">\n          {{ option.label }}\n        </span>\n      </label>\n    </div>\n    <form-generator-help\n      slot=\"help\"\n      :help=\"help\"\n    />\n    <form-generator-error\n      slot=\"error\"\n      :errors=\"errors\"\n    />\n  </form-generator-form-item>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nimport { ErrorMessages } from '../types'\n\nimport FormGeneratorFormItem from './FormGeneratorFormItem.vue'\nimport FormGeneratorLabel from './FormGeneratorLabel.vue'\nimport FormGeneratorHelp from './FormGeneratorHelp.vue'\nimport FormGeneratorError from './FormGeneratorError.vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorRadio',\n  components: {\n    FormGeneratorFormItem,\n    FormGeneratorLabel,\n    FormGeneratorHelp,\n    FormGeneratorError\n  },\n  props: {\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    value: {\n      type: [String, Number] as ((() => string) | (() => number))[],\n      default: ''\n    },\n    errors: {\n      type: Array as () => ErrorMessages,\n      default: () => []\n    },\n    label: {\n      type: String as () => string,\n      default: ''\n    },\n    options: {\n      type: Array as () => { value: string, label: string }[],\n      required: true\n    },\n    formGroupClassName: {\n      type: String as () => string,\n      default: ''\n    },\n    help: {\n      type: String as () => string,\n      default: ''\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    }\n  },\n  methods: {\n    onChange (event: InputEvent) {\n      const target = event.target as HTMLInputElement\n\n      this.$emit('update:value', target.value)\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-radio {\n  .radio-button {\n    font-size: 14px;\n    margin: 0;\n\n    &:hover {\n      cursor: pointer;\n    }\n\n    &:not(:last-child) {\n      margin-right: 35px;\n    }\n\n    &__input {\n      position: absolute;\n      z-index: -1;\n      opacity: 0;\n      margin: 0;\n\n      &:checked + .radio-button__title::after {\n        opacity: 1;\n      }\n\n      &:checked + .radio-button__title::before {\n        border-color: #f27023;\n        background: #f27023;\n      }\n    }\n\n    &__title {\n      position: relative;\n      padding: 0 0 0 25px;\n\n      &::before {\n        content: '';\n        position: absolute;\n        top: 50%;\n        transform: translateY(-50%);\n        left: 0;\n        width: 16px;\n        height: 16px;\n        border: 1px solid #b2b2b2;\n        border-radius: 50%;\n        background: #fff;\n      }\n\n      &::after {\n        content: '';\n        position: absolute;\n        top: 50%;\n        transform: translateY(-50%);\n        left: 5px;\n        width: 6px;\n        height: 6px;\n        border-radius: 50%;\n        background: #fff;\n        opacity: 0;\n        transition: 0.2s;\n      }\n    }\n  }\n}\n</style>\n",".form-generator-radio .radio-button {\n  font-size: 14px;\n  margin: 0;\n}\n.form-generator-radio .radio-button:hover {\n  cursor: pointer;\n}\n.form-generator-radio .radio-button:not(:last-child) {\n  margin-right: 35px;\n}\n.form-generator-radio .radio-button__input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n  margin: 0;\n}\n.form-generator-radio .radio-button__input:checked + .radio-button__title::after {\n  opacity: 1;\n}\n.form-generator-radio .radio-button__input:checked + .radio-button__title::before {\n  border-color: #f27023;\n  background: #f27023;\n}\n.form-generator-radio .radio-button__title {\n  position: relative;\n  padding: 0 0 0 25px;\n}\n.form-generator-radio .radio-button__title::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 0;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #b2b2b2;\n  border-radius: 50%;\n  background: #fff;\n}\n.form-generator-radio .radio-button__title::after {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 5px;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #fff;\n  opacity: 0;\n  transition: 0.2s;\n}\n\n/*# sourceMappingURL=FormGeneratorRadio.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$9 = "data-v-8c290d6c";
    const __vue_module_identifier__$9 = undefined;
    const __vue_is_functional_template__$9 = false;
    const __vue_component__$9 = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$a = Vue.extend({
      name: 'FormGeneratorSelect',
      components: {
          FormGeneratorFormItem: __vue_component__$3,
          FormGeneratorLabel: __vue_component__$4,
          FormGeneratorHelp: __vue_component__$5,
          FormGeneratorError: __vue_component__$1
      },
      props: {
          id: {
              type: String,
              required: true
          },
          value: {
              type: [String, Number],
              default: ''
          },
          errors: {
              type: Array,
              default: () => []
          },
          label: {
              type: String,
              default: ''
          },
          options: {
              type: [Array, Function],
              required: true
          },
          formGroupClassName: {
              type: String,
              default: ''
          },
          placeholder: {
              type: String,
              default: 'Please select'
          },
          help: {
              type: String,
              default: ''
          },
          required: {
              type: Boolean,
              default: true
          }
      },
      data() {
          return {
              selectOptions: []
          };
      },
      computed: {
          computedValue: {
              get() {
                  return this.value;
              },
              set(value) {
                  this.$emit('update:value', value);
              }
          }
      },
      async mounted() {
          if (typeof this.options === 'function') {
              this.selectOptions = await this.options();
          }
          else {
              this.selectOptions = this.options;
          }
      }
  });

  const __vue_script__$a = script$a;
  var __vue_render__$a = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-item",
      {
        staticClass: "form-generator-select",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: {
            slot: "label",
            "for-input": _vm.id,
            label: _vm.label,
            required: _vm.required
          },
          slot: "label"
        }),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.computedValue,
                expression: "computedValue"
              }
            ],
            staticClass: "form-generator-select__select",
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value;
                    return val
                  });
                _vm.computedValue = $event.target.multiple
                  ? $$selectedVal
                  : $$selectedVal[0];
              }
            }
          },
          [
            _c("option", { attrs: { value: "" } }, [
              _vm._v("\n      " + _vm._s(_vm.placeholder) + "\n    ")
            ]),
            _vm._v(" "),
            _vm._l(_vm.selectOptions, function(option) {
              return _c(
                "option",
                { key: option.value, domProps: { value: option.value } },
                [_vm._v("\n      " + _vm._s(option.label) + "\n    ")]
              )
            })
          ],
          2
        ),
        _vm._v(" "),
        _c("form-generator-help", {
          attrs: { slot: "help", help: _vm.help },
          slot: "help"
        }),
        _vm._v(" "),
        _c("form-generator-error", {
          attrs: { slot: "error", errors: _vm.errors },
          slot: "error"
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;
    const __vue_inject_styles__$a = function (inject) {
      if (!inject) return
      inject("data-v-2765c031_0", { source: ".form-generator-select__select[data-v-2765c031] {\n  height: 37px;\n  width: 100%;\n  border-radius: 4px;\n  border: solid 1px #d2d2d2;\n  padding: 0 10px;\n}\n.form-generator-select__select[data-v-2765c031]::placeholder {\n  opacity: 0.5;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n/*# sourceMappingURL=FormGeneratorSelect.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorSelect.vue","FormGeneratorSelect.vue"],"names":[],"mappings":"AAwHA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;EACA,eAAA;ACvHA;ADyHA;EACA,YAAA;EACA,eAAA;EACA,qBAAA;ACvHA;;AAEA,kDAAkD","file":"FormGeneratorSelect.vue","sourcesContent":["<template>\n  <form-generator-form-item\n    :class-name=\"formGroupClassName\"\n    class=\"form-generator-select\"\n  >\n    <form-generator-label\n      slot=\"label\"\n      :for-input=\"id\"\n      :label=\"label\"\n      :required=\"required\"\n    />\n    <select\n      v-model=\"computedValue\"\n      class=\"form-generator-select__select\"\n    >\n      <option value=\"\">\n        {{ placeholder }}\n      </option>\n      <option\n        v-for=\"option in selectOptions\"\n        :key=\"option.value\"\n        :value=\"option.value\"\n      >\n        {{ option.label }}\n      </option>\n    </select>\n    <form-generator-help\n      slot=\"help\"\n      :help=\"help\"\n    />\n    <form-generator-error\n      slot=\"error\"\n      :errors=\"errors\"\n    />\n  </form-generator-form-item>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nimport { ErrorMessages, SelectOptions } from '../types'\n\nimport FormGeneratorFormItem from './FormGeneratorFormItem.vue'\nimport FormGeneratorLabel from './FormGeneratorLabel.vue'\nimport FormGeneratorHelp from './FormGeneratorHelp.vue'\nimport FormGeneratorError from './FormGeneratorError.vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorSelect',\n  components: {\n    FormGeneratorFormItem,\n    FormGeneratorLabel,\n    FormGeneratorHelp,\n    FormGeneratorError\n  },\n  props: {\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    value: {\n      type: [String, Number] as ((() => string) | (() => number))[],\n      default: ''\n    },\n    errors: {\n      type: Array as () => ErrorMessages,\n      default: () => []\n    },\n    label: {\n      type: String as () => string,\n      default: ''\n    },\n    options: {\n      type: [Array, Function] as ((() => SelectOptions) | (() => () => Promise<SelectOptions>))[],\n      required: true\n    },\n    formGroupClassName: {\n      type: String as () => string,\n      default: ''\n    },\n    placeholder: {\n      type: String as () => string,\n      default: 'Please select'\n    },\n    help: {\n      type: String as () => string,\n      default: ''\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    }\n  },\n  data () {\n    return {\n      selectOptions: [] as SelectOptions\n    }\n  },\n  computed: {\n    computedValue: {\n      get (): string | number {\n        return this.value\n      },\n      set (value: string | number) {\n        this.$emit('update:value', value)\n      }\n    }\n  },\n  async mounted () {\n    if (typeof this.options === 'function') {\n      this.selectOptions = await this.options()\n    } else {\n      this.selectOptions = this.options\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-select {\n  &__select {\n    height: 37px;\n    width: 100%;\n    border-radius: 4px;\n    border: solid 1px #d2d2d2;\n    padding: 0 10px;\n\n    &::placeholder {\n      opacity: 0.5;\n      font-size: 14px;\n      letter-spacing: 0.3px;\n    }\n  }\n}\n</style>\n",".form-generator-select__select {\n  height: 37px;\n  width: 100%;\n  border-radius: 4px;\n  border: solid 1px #d2d2d2;\n  padding: 0 10px;\n}\n.form-generator-select__select::placeholder {\n  opacity: 0.5;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n/*# sourceMappingURL=FormGeneratorSelect.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$a = "data-v-2765c031";
    const __vue_module_identifier__$a = undefined;
    const __vue_is_functional_template__$a = false;
    const __vue_component__$a = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$b = Vue.extend({
      name: 'FormGeneratorInput',
      components: {
          FormGeneratorFormItem: __vue_component__$3,
          FormGeneratorLabel: __vue_component__$4,
          FormGeneratorHelp: __vue_component__$5,
          FormGeneratorError: __vue_component__$1
      },
      props: {
          id: {
              type: String,
              required: true
          },
          value: {
              type: [String, Number],
              default: ''
          },
          errors: {
              type: Array,
              default: () => []
          },
          type: {
              type: String,
              default: 'text',
              validator(value) {
                  const allowedTypes = [
                      'text',
                      'email',
                      'number',
                      'password'
                  ];
                  return allowedTypes.includes(`${value}`);
              }
          },
          label: {
              type: String,
              default: ''
          },
          formGroupClassName: {
              type: String,
              default: ''
          },
          placeholder: {
              type: String,
              default: ''
          },
          help: {
              type: String,
              default: ''
          },
          required: {
              type: Boolean,
              default: true
          },
          readonly: {
              type: Boolean,
              default: false
          },
          disabled: {
              type: Boolean,
              default: false
          }
      },
      methods: {
          onInput(event) {
              const target = event.target;
              this.$emit('update:value', target.value);
          }
      }
  });

  const __vue_script__$b = script$b;
  var __vue_render__$b = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-item",
      {
        staticClass: "form-generator-text",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: {
            slot: "label",
            "for-input": _vm.id,
            label: _vm.label,
            required: _vm.required
          },
          slot: "label"
        }),
        _vm._v(" "),
        _c("input", {
          staticClass: "form-generator-text__input",
          attrs: {
            id: _vm.id,
            type: _vm.type,
            placeholder: _vm.placeholder,
            readonly: _vm.readonly,
            disabled: _vm.disabled
          },
          domProps: { value: _vm.value },
          on: { input: _vm.onInput }
        }),
        _vm._v(" "),
        _c("form-generator-help", {
          attrs: { slot: "help", help: _vm.help },
          slot: "help"
        }),
        _vm._v(" "),
        _c("form-generator-error", {
          attrs: { slot: "error", errors: _vm.errors },
          slot: "error"
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;
    const __vue_inject_styles__$b = function (inject) {
      if (!inject) return
      inject("data-v-b513d0d0_0", { source: ".form-generator-text__input[data-v-b513d0d0] {\n  height: 37px;\n  width: 100%;\n  border-radius: 4px;\n  border: solid 1px #d2d2d2;\n  padding: 0 10px;\n}\n.form-generator-text__input[data-v-b513d0d0]::placeholder {\n  opacity: 0.5;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n/*# sourceMappingURL=FormGeneratorInput.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorInput.vue","FormGeneratorInput.vue"],"names":[],"mappings":"AAsHA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;EACA,eAAA;ACrHA;ADuHA;EACA,YAAA;EACA,eAAA;EACA,qBAAA;ACrHA;;AAEA,iDAAiD","file":"FormGeneratorInput.vue","sourcesContent":["<template>\n  <form-generator-form-item\n    :class-name=\"formGroupClassName\"\n    class=\"form-generator-text\"\n  >\n    <form-generator-label\n      slot=\"label\"\n      :for-input=\"id\"\n      :label=\"label\"\n      :required=\"required\"\n    />\n    <input\n      :id=\"id\"\n      :type=\"type\"\n      :placeholder=\"placeholder\"\n      :value=\"value\"\n      :readonly=\"readonly\"\n      :disabled=\"disabled\"\n      class=\"form-generator-text__input\"\n      @input=\"onInput\"\n    >\n    <form-generator-help\n      slot=\"help\"\n      :help=\"help\"\n    />\n    <form-generator-error\n      slot=\"error\"\n      :errors=\"errors\"\n    />\n  </form-generator-form-item>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nimport { ErrorMessages } from '../types'\n\nimport FormGeneratorFormItem from './FormGeneratorFormItem.vue'\nimport FormGeneratorLabel from './FormGeneratorLabel.vue'\nimport FormGeneratorHelp from './FormGeneratorHelp.vue'\nimport FormGeneratorError from './FormGeneratorError.vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorInput',\n  components: {\n    FormGeneratorFormItem,\n    FormGeneratorLabel,\n    FormGeneratorHelp,\n    FormGeneratorError\n  },\n  props: {\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    value: {\n      type: [String, Number] as ((() => string) | (() => number))[],\n      default: ''\n    },\n    errors: {\n      type: Array as () => ErrorMessages,\n      default: () => []\n    },\n    type: {\n      type: String as () => 'text' | 'email' | 'number' | 'password',\n      default: 'text',\n      validator (value) {\n        const allowedTypes = [\n          'text',\n          'email',\n          'number',\n          'password'\n        ]\n\n        return allowedTypes.includes(`${value}`)\n      }\n    },\n    label: {\n      type: String as () => string,\n      default: ''\n    },\n    formGroupClassName: {\n      type: String as () => string,\n      default: ''\n    },\n    placeholder: {\n      type: String as () => string,\n      default: ''\n    },\n    help: {\n      type: String as () => string,\n      default: ''\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    },\n    readonly: {\n      type: Boolean as () => boolean,\n      default: false\n    },\n    disabled: {\n      type: Boolean as () => boolean,\n      default: false\n    }\n  },\n  methods: {\n    onInput (event: InputEvent) {\n      const target = event.target as HTMLInputElement\n\n      this.$emit('update:value', target.value)\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-text {\n  &__input {\n    height: 37px;\n    width: 100%;\n    border-radius: 4px;\n    border: solid 1px #d2d2d2;\n    padding: 0 10px;\n\n    &::placeholder {\n      opacity: 0.5;\n      font-size: 14px;\n      letter-spacing: 0.3px;\n    }\n  }\n}\n</style>\n",".form-generator-text__input {\n  height: 37px;\n  width: 100%;\n  border-radius: 4px;\n  border: solid 1px #d2d2d2;\n  padding: 0 10px;\n}\n.form-generator-text__input::placeholder {\n  opacity: 0.5;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n/*# sourceMappingURL=FormGeneratorInput.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$b = "data-v-b513d0d0";
    const __vue_module_identifier__$b = undefined;
    const __vue_is_functional_template__$b = false;
    const __vue_component__$b = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var script$c = Vue.extend({
      name: 'FormGeneratorTextarea',
      components: {
          FormGeneratorFormItem: __vue_component__$3,
          FormGeneratorLabel: __vue_component__$4,
          FormGeneratorHelp: __vue_component__$5,
          FormGeneratorError: __vue_component__$1
      },
      props: {
          id: {
              type: String,
              required: true
          },
          value: {
              type: [String, Number],
              default: ''
          },
          errors: {
              type: Array,
              default: () => []
          },
          label: {
              type: String,
              default: ''
          },
          formGroupClassName: {
              type: String,
              default: ''
          },
          placeholder: {
              type: String,
              default: ''
          },
          help: {
              type: String,
              default: ''
          },
          required: {
              type: Boolean,
              default: true
          },
          readonly: {
              type: Boolean,
              default: false
          },
          disabled: {
              type: Boolean,
              default: false
          }
      },
      methods: {
          onInput(event) {
              const target = event.target;
              this.$emit('update:value', target.value);
          }
      }
  });

  const __vue_script__$c = script$c;
  var __vue_render__$c = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-item",
      {
        staticClass: "form-generator-textarea",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: {
            slot: "label",
            "for-input": _vm.id,
            label: _vm.label,
            required: _vm.required
          },
          slot: "label"
        }),
        _vm._v(" "),
        _c("textarea", {
          staticClass: "form-generator-textarea__input",
          attrs: {
            id: _vm.id,
            placeholder: _vm.placeholder,
            readonly: _vm.readonly,
            disabled: _vm.disabled
          },
          domProps: { value: _vm.value },
          on: {
            input: _vm.onInput,
            keyup: function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              $event.stopPropagation();
            }
          }
        }),
        _vm._v(" "),
        _c("form-generator-help", {
          attrs: { slot: "help", help: _vm.help },
          slot: "help"
        }),
        _vm._v(" "),
        _c("form-generator-error", {
          attrs: { slot: "error", errors: _vm.errors },
          slot: "error"
        })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;
    const __vue_inject_styles__$c = function (inject) {
      if (!inject) return
      inject("data-v-60cc4cc4_0", { source: ".form-generator-textarea__input[data-v-60cc4cc4] {\n  height: 37px;\n  width: 100%;\n  border-radius: 4px;\n  border: solid 1px #d2d2d2;\n  padding: 0 10px;\n}\n.form-generator-textarea__input[data-v-60cc4cc4]::placeholder {\n  opacity: 0.5;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n/*# sourceMappingURL=FormGeneratorTextarea.vue.map */", map: {"version":3,"sources":["/home/tptshk/Projects/modules/vue-form-constructor/src/components/FormGeneratorTextarea.vue","FormGeneratorTextarea.vue"],"names":[],"mappings":"AAwGA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,yBAAA;EACA,eAAA;ACvGA;ADyGA;EACA,YAAA;EACA,eAAA;EACA,qBAAA;ACvGA;;AAEA,oDAAoD","file":"FormGeneratorTextarea.vue","sourcesContent":["<template>\n  <form-generator-form-item\n    :class-name=\"formGroupClassName\"\n    class=\"form-generator-textarea\"\n  >\n    <form-generator-label\n      slot=\"label\"\n      :for-input=\"id\"\n      :label=\"label\"\n      :required=\"required\"\n    />\n    <textarea\n      :id=\"id\"\n      :placeholder=\"placeholder\"\n      :value=\"value\"\n      :readonly=\"readonly\"\n      :disabled=\"disabled\"\n      class=\"form-generator-textarea__input\"\n      @input=\"onInput\"\n      @keyup.enter.stop=\"\"\n    />\n    <form-generator-help\n      slot=\"help\"\n      :help=\"help\"\n    />\n    <form-generator-error\n      slot=\"error\"\n      :errors=\"errors\"\n    />\n  </form-generator-form-item>\n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\n\nimport { ErrorMessages } from '../types'\n\nimport FormGeneratorFormItem from './FormGeneratorFormItem.vue'\nimport FormGeneratorLabel from './FormGeneratorLabel.vue'\nimport FormGeneratorHelp from './FormGeneratorHelp.vue'\nimport FormGeneratorError from './FormGeneratorError.vue'\n\nexport default Vue.extend({\n  name: 'FormGeneratorTextarea',\n  components: {\n    FormGeneratorFormItem,\n    FormGeneratorLabel,\n    FormGeneratorHelp,\n    FormGeneratorError\n  },\n  props: {\n    id: {\n      type: String as () => string,\n      required: true\n    },\n    value: {\n      type: [String, Number] as ((() => string) | (() => number))[],\n      default: ''\n    },\n    errors: {\n      type: Array as () => ErrorMessages,\n      default: () => []\n    },\n    label: {\n      type: String as () => string,\n      default: ''\n    },\n    formGroupClassName: {\n      type: String as () => string,\n      default: ''\n    },\n    placeholder: {\n      type: String as () => string,\n      default: ''\n    },\n    help: {\n      type: String as () => string,\n      default: ''\n    },\n    required: {\n      type: Boolean as () => boolean,\n      default: true\n    },\n    readonly: {\n      type: Boolean as () => boolean,\n      default: false\n    },\n    disabled: {\n      type: Boolean as () => boolean,\n      default: false\n    }\n  },\n  methods: {\n    onInput (event: InputEvent) {\n      const target = event.target as HTMLInputElement\n\n      this.$emit('update:value', target.value)\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.form-generator-textarea {\n  &__input {\n    height: 37px;\n    width: 100%;\n    border-radius: 4px;\n    border: solid 1px #d2d2d2;\n    padding: 0 10px;\n\n    &::placeholder {\n      opacity: 0.5;\n      font-size: 14px;\n      letter-spacing: 0.3px;\n    }\n  }\n}\n</style>\n",".form-generator-textarea__input {\n  height: 37px;\n  width: 100%;\n  border-radius: 4px;\n  border: solid 1px #d2d2d2;\n  padding: 0 10px;\n}\n.form-generator-textarea__input::placeholder {\n  opacity: 0.5;\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n/*# sourceMappingURL=FormGeneratorTextarea.vue.map */"]}, media: undefined });
    };
    const __vue_scope_id__$c = "data-v-60cc4cc4";
    const __vue_module_identifier__$c = undefined;
    const __vue_is_functional_template__$c = false;
    const __vue_component__$c = vueRuntimeHelpers.normalizeComponent(
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      false,
      vueRuntimeHelpers.createInjector,
      undefined,
      undefined
    );

  var main = {
      install(Vue) {
          Vue.component(__vue_component__$2.name, __vue_component__$2);
          Vue.component(__vue_component__.name, __vue_component__);
          Vue.component(__vue_component__$6.name, __vue_component__$6);
          Vue.component(__vue_component__$7.name, __vue_component__$7);
          Vue.component(__vue_component__$8.name, __vue_component__$8);
          Vue.component(__vue_component__$1.name, __vue_component__$1);
          Vue.component(__vue_component__$3.name, __vue_component__$3);
          Vue.component(__vue_component__$5.name, __vue_component__$5);
          Vue.component(__vue_component__$4.name, __vue_component__$4);
          Vue.component(__vue_component__$9.name, __vue_component__$9);
          Vue.component(__vue_component__$a.name, __vue_component__$a);
          Vue.component(__vue_component__$b.name, __vue_component__$b);
          Vue.component(__vue_component__$c.name, __vue_component__$c);
      }
  };

  exports.FormBuilder = __vue_component__$2;
  exports.FormGenerator = __vue_component__;
  exports.FormGeneratorCheckbox = __vue_component__$6;
  exports.FormGeneratorCollection = __vue_component__$7;
  exports.FormGeneratorDivider = __vue_component__$8;
  exports.FormGeneratorError = __vue_component__$1;
  exports.FormGeneratorFormItem = __vue_component__$3;
  exports.FormGeneratorHelp = __vue_component__$5;
  exports.FormGeneratorInput = __vue_component__$b;
  exports.FormGeneratorLabel = __vue_component__$4;
  exports.FormGeneratorRadio = __vue_component__$9;
  exports.FormGeneratorSelect = __vue_component__$a;
  exports.FormGeneratorTextarea = __vue_component__$c;
  exports.default = main;
  exports.toFormData = toFormData;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=vue-form-builder.umd.js.map
