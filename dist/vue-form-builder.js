var VueFormBuilder = (function (exports, Vue, kebabCase, isArray, has, get, set, cloneDeep, es_array_concat, forIn, isObject) {
  'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  kebabCase = kebabCase && Object.prototype.hasOwnProperty.call(kebabCase, 'default') ? kebabCase['default'] : kebabCase;
  isArray = isArray && Object.prototype.hasOwnProperty.call(isArray, 'default') ? isArray['default'] : isArray;
  has = has && Object.prototype.hasOwnProperty.call(has, 'default') ? has['default'] : has;
  get = get && Object.prototype.hasOwnProperty.call(get, 'default') ? get['default'] : get;
  set = set && Object.prototype.hasOwnProperty.call(set, 'default') ? set['default'] : set;
  cloneDeep = cloneDeep && Object.prototype.hasOwnProperty.call(cloneDeep, 'default') ? cloneDeep['default'] : cloneDeep;
  forIn = forIn && Object.prototype.hasOwnProperty.call(forIn, 'default') ? forIn['default'] : forIn;
  isObject = isObject && Object.prototype.hasOwnProperty.call(isObject, 'default') ? isObject['default'] : isObject;

  var script = Vue.extend({
      name: 'FormGenerator',
      props: {
          id: {
              type: String,
              required: true
          },
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function (context) {
        style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

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
    const __vue_inject_styles__ = undefined;
    const __vue_scope_id__ = "data-v-62863dd6";
    const __vue_module_identifier__ = undefined;
    const __vue_is_functional_template__ = false;
    const __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
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
    const __vue_inject_styles__$1 = undefined;
    const __vue_scope_id__$1 = "data-v-345167dd";
    const __vue_module_identifier__$1 = undefined;
    const __vue_is_functional_template__$1 = false;
    const __vue_component__$1 = normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
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
          autocomplete: {
              type: String,
              default: 'on'
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
              if (has(this.errors, 0)) {
                  return isArray(this.errors[0]) ? this.errors[0] : [];
              }
              else if (has(this.errors, '0')) {
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
        attrs: { id: _vm.builderId, autocomplete: _vm.autocomplete },
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
            class: "form-builder__actions--" + _vm.actionsAlign
          },
          [
            _vm._t("actions", [
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
                [
                  _vm._v(
                    "\n        " + _vm._s(_vm.submitButtonLabel) + "\n      "
                  )
                ]
              )
            ])
          ],
          2
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;
    const __vue_inject_styles__$2 = undefined;
    const __vue_scope_id__$2 = "data-v-29d64eec";
    const __vue_module_identifier__$2 = undefined;
    const __vue_is_functional_template__$2 = false;
    const __vue_component__$2 = normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$3 = Vue.extend({
      name: 'FormGeneratorFormField',
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
      { staticClass: "form-generator-form-field", class: _vm.className },
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;
    const __vue_inject_styles__$3 = undefined;
    const __vue_scope_id__$3 = "data-v-2c4b2a29";
    const __vue_module_identifier__$3 = undefined;
    const __vue_is_functional_template__$3 = false;
    const __vue_component__$3 = normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
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
    const __vue_inject_styles__$4 = undefined;
    const __vue_scope_id__$4 = undefined;
    const __vue_module_identifier__$4 = undefined;
    const __vue_is_functional_template__$4 = false;
    const __vue_component__$4 = normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
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
    const __vue_inject_styles__$5 = undefined;
    const __vue_scope_id__$5 = "data-v-6e3414dc";
    const __vue_module_identifier__$5 = undefined;
    const __vue_is_functional_template__$5 = false;
    const __vue_component__$5 = normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$6 = Vue.extend({
      name: 'FormGeneratorCheckbox',
      components: {
          FormGeneratorFormField: __vue_component__$3,
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
              type: Boolean,
              default: false
          },
          errors: {
              type: Array,
              default: () => []
          },
          label: {
              type: String,
              default: ''
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
          },
          disabled: {
              type: Boolean,
              default: false
          }
      },
      data() {
          return {
              checked: false
          };
      },
      watch: {
          value: {
              handler(value) {
                  this.checked = Boolean(value);
                  this.setValue(this.checked);
              },
              immediate: true
          }
      },
      methods: {
          onChange(event) {
              const target = event.target;
              this.setValue(target.checked);
          },
          setValue(value) {
              this.$emit('update:value', value);
              this.$emit('input', value);
          }
      }
  });

  const __vue_script__$6 = script$6;
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-field",
      {
        staticClass: "form-generator-checkbox",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: { "for-input": _vm.id, label: _vm.label, required: _vm.required }
        }),
        _vm._v(" "),
        _c(
          "label",
          { staticClass: "form-generator-checkbox__checkbox checkbox" },
          [
            _c("input", {
              staticClass: "checkbox__input",
              attrs: {
                id: _vm.id,
                disabled: _vm.disabled,
                type: "checkbox",
                name: "isSubscribed"
              },
              domProps: { checked: _vm.checked },
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
        _c("form-generator-help", { attrs: { help: _vm.help } }),
        _vm._v(" "),
        _c("form-generator-error", { attrs: { errors: _vm.errors } })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;
    const __vue_inject_styles__$6 = undefined;
    const __vue_scope_id__$6 = "data-v-5fe465ed";
    const __vue_module_identifier__$6 = undefined;
    const __vue_is_functional_template__$6 = false;
    const __vue_component__$6 = normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$7 = Vue.extend({
      name: 'FormGeneratorCollection',
      components: {
          FormGenerator: __vue_component__,
          FormGeneratorFormField: __vue_component__$3,
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
              default: () => []
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
          isAddAllow: {
              type: Boolean,
              default: false
          },
          addButtonLabel: {
              type: String,
              default: 'Add new'
          },
          isDeleteAllowed: {
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
              this.$emit('update:value', value);
              this.$emit('input', value);
          },
          onItemModelUpdate(index, value) {
              const clonedValue = cloneDeep(this.value);
              set(clonedValue, index, value);
              this.updateValue(clonedValue);
          },
          onDeleteButtonClick(index) {
              const clonedValue = cloneDeep(this.value);
              clonedValue.splice(index, 1);
              this.updateValue(clonedValue);
          },
          onAddButtonClick() {
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
      "form-generator-form-field",
      {
        staticClass: "form-generator-collection",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          staticClass: "form-generator-collection__label",
          attrs: { "for-input": _vm.id, label: _vm.label, required: false }
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
                  _vm.isDeleteAllowed
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
                                return _vm.onDeleteButtonClick(index)
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
            _vm.isAddAllow
              ? _c(
                  "button",
                  {
                    staticClass: "form-generator-collection__btn btn-add",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.onAddButtonClick($event)
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
    const __vue_inject_styles__$7 = undefined;
    const __vue_scope_id__$7 = "data-v-010fa73b";
    const __vue_module_identifier__$7 = undefined;
    const __vue_is_functional_template__$7 = false;
    const __vue_component__$7 = normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      undefined,
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
    const __vue_inject_styles__$8 = undefined;
    const __vue_scope_id__$8 = "data-v-712d3dca";
    const __vue_module_identifier__$8 = undefined;
    const __vue_is_functional_template__$8 = false;
    const __vue_component__$8 = normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$9 = Vue.extend({
      name: 'FormGeneratorInput',
      components: {
          FormGeneratorFormField: __vue_component__$3,
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
          },
          autocomplete: {
              type: String,
              default: 'on'
          }
      },
      methods: {
          onInput(event) {
              const target = event.target;
              this.$emit('update:value', target.value);
              this.$emit('input', target.value);
          }
      }
  });

  const __vue_script__$9 = script$9;
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-field",
      {
        staticClass: "form-generator-text",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: { "for-input": _vm.id, label: _vm.label, required: _vm.required }
        }),
        _vm._v(" "),
        _c("input", {
          staticClass: "form-generator-text__input",
          attrs: {
            id: _vm.id,
            type: _vm.type,
            placeholder: _vm.placeholder,
            readonly: _vm.readonly,
            disabled: _vm.disabled,
            autocomplete: _vm.autocomplete
          },
          domProps: { value: _vm.value },
          on: { input: _vm.onInput }
        }),
        _vm._v(" "),
        _c("form-generator-help", { attrs: { help: _vm.help } }),
        _vm._v(" "),
        _c("form-generator-error", { attrs: { errors: _vm.errors } })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;
    const __vue_inject_styles__$9 = undefined;
    const __vue_scope_id__$9 = "data-v-22969bd9";
    const __vue_module_identifier__$9 = undefined;
    const __vue_is_functional_template__$9 = false;
    const __vue_component__$9 = normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$a = Vue.extend({
      name: 'FormGeneratorRadio',
      components: {
          FormGeneratorFormField: __vue_component__$3,
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
          },
          disabled: {
              type: Boolean,
              default: true
          }
      },
      methods: {
          onChange(event) {
              const target = event.target;
              this.$emit('update:value', target.value);
              this.$emit('input', target.value);
          }
      }
  });

  const __vue_script__$a = script$a;
  var __vue_render__$a = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-field",
      {
        staticClass: "form-generator-radio",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: { "for-input": _vm.id, label: _vm.label, required: _vm.required }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "radio-buttons" },
          _vm._l(_vm.options, function(option) {
            return _c(
              "label",
              { key: option.value, staticClass: "radio-button" },
              [
                _c("input", {
                  staticClass: "radio-button__input",
                  attrs: { disabled: _vm.disabled, type: "radio" },
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
              ]
            )
          }),
          0
        ),
        _vm._v(" "),
        _c("form-generator-help", { attrs: { help: _vm.help } }),
        _vm._v(" "),
        _c("form-generator-error", { attrs: { errors: _vm.errors } })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;
    const __vue_inject_styles__$a = undefined;
    const __vue_scope_id__$a = "data-v-95133d34";
    const __vue_module_identifier__$a = undefined;
    const __vue_is_functional_template__$a = false;
    const __vue_component__$a = normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$b = Vue.extend({
      name: 'FormGeneratorSelect',
      components: {
          FormGeneratorFormField: __vue_component__$3,
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
          },
          disabled: {
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
                  this.$emit('change', value);
              }
          }
      },
      watch: {
          options: {
              async handler(options) {
                  if (typeof options === 'function') {
                      this.selectOptions = await options();
                  }
                  else {
                      this.selectOptions = options;
                  }
              },
              immediate: true
          }
      }
  });

  const __vue_script__$b = script$b;
  var __vue_render__$b = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-field",
      {
        staticClass: "form-generator-select",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: { "for-input": _vm.id, label: _vm.label, required: _vm.required }
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
            attrs: { disabled: _vm.disabled },
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
        _c("form-generator-help", { attrs: { help: _vm.help } }),
        _vm._v(" "),
        _c("form-generator-error", { attrs: { errors: _vm.errors } })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;
    const __vue_inject_styles__$b = undefined;
    const __vue_scope_id__$b = "data-v-58aa72d2";
    const __vue_module_identifier__$b = undefined;
    const __vue_is_functional_template__$b = false;
    const __vue_component__$b = normalizeComponent(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      undefined,
      undefined,
      undefined
    );

  var script$c = Vue.extend({
      name: 'FormGeneratorTextarea',
      components: {
          FormGeneratorFormField: __vue_component__$3,
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
              this.$emit('input', target.value);
          }
      }
  });

  const __vue_script__$c = script$c;
  var __vue_render__$c = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "form-generator-form-field",
      {
        staticClass: "form-generator-textarea",
        attrs: { "class-name": _vm.formGroupClassName }
      },
      [
        _c("form-generator-label", {
          attrs: { "for-input": _vm.id, label: _vm.label, required: _vm.required }
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
        _c("form-generator-help", { attrs: { help: _vm.help } }),
        _vm._v(" "),
        _c("form-generator-error", { attrs: { errors: _vm.errors } })
      ],
      1
    )
  };
  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;
    const __vue_inject_styles__$c = undefined;
    const __vue_scope_id__$c = "data-v-63e0a1d9";
    const __vue_module_identifier__$c = undefined;
    const __vue_is_functional_template__$c = false;
    const __vue_component__$c = normalizeComponent(
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      false,
      undefined,
      undefined,
      undefined
    );

  function attachPropertyValueToFormData(formData, property, value, formPrefix = '') {
      const fullProperty = formPrefix.length ? `${formPrefix}[${property}]` : property;
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

  exports.FormBuilder = __vue_component__$2;
  exports.FormGenerator = __vue_component__;
  exports.FormGeneratorCheckbox = __vue_component__$6;
  exports.FormGeneratorCollection = __vue_component__$7;
  exports.FormGeneratorDivider = __vue_component__$8;
  exports.FormGeneratorError = __vue_component__$1;
  exports.FormGeneratorFormField = __vue_component__$3;
  exports.FormGeneratorHelp = __vue_component__$5;
  exports.FormGeneratorInput = __vue_component__$9;
  exports.FormGeneratorLabel = __vue_component__$4;
  exports.FormGeneratorRadio = __vue_component__$a;
  exports.FormGeneratorSelect = __vue_component__$b;
  exports.FormGeneratorTextarea = __vue_component__$c;
  exports.default = __vue_component__$2;
  exports.toFormData = toFormData;

  return exports;

}({}, Vue, kebabCase, isArray, has, get, set, cloneDeep, null, forIn, isObject));
//# sourceMappingURL=vue-form-builder.js.map
