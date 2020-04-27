import forIn from 'lodash/forIn'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import { Model } from '../types'

function attachPropertyValueToFormData (formData: FormData, property: string, value: unknown, formPrefix = ''): void {
  const fullProperty = formPrefix.length ? `${formPrefix}[${property}]` : property

  if (isObject(value) || isArray(value)) {
    forIn(value, (subValue, subProperty) => {
      attachPropertyValueToFormData(formData, subProperty, subValue, fullProperty)
    })
  } else {
    formData.append(fullProperty, value !== null ? `${value}` : '')
  }
}

export function toFormData (object: Model, formPrefix = ''): FormData {
  const formData = new FormData()

  forIn(object, function (value, property) {
    attachPropertyValueToFormData(formData, property, value, formPrefix)
  })

  return formData
}
