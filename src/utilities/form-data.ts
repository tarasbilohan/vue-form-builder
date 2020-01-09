import forIn from 'lodash/forIn'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

function attachPropertyValueToFormData (formData: FormData, property: string, value: unknown, formPrefix = ''): void {
  let fullProperty = formPrefix.length ? `${formPrefix}[${property}]` : property

  if (isObject(value) || isArray(value)) {
    forIn(value, (subValue, subProperty) => {
      attachPropertyValueToFormData(formData, subProperty, subValue, fullProperty)
    })
  } else {
    formData.append(fullProperty, value !== null ? `${value}` : '')
  }
}

export function toFormData (object: object, formPrefix: string = ''): FormData {
  const formData = new FormData()

  forIn(object, function (value, property) {
    attachPropertyValueToFormData(formData, property, value, formPrefix)
  })

  return formData
}
