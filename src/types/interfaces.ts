import { ErrorMessages } from './types'

export interface Model {}

export interface SchemaFieldParams {
  id?: string
  label?: string
  type?: string
  placeholder?: string
  help?: string
  default?: string
  disabled?: boolean
  required?: boolean
}

export interface SchemaField {
  type: import('vue/types/options').Component
  path: string
  params: SchemaFieldParams
}

export interface Errors {
  [key: string]: ErrorMessages | Errors
  [key: number]: ErrorMessages | Errors
}

export interface SelectOption {}
