export type CommonFields = {
  name: string
  label: string
  placeholder: string
  type: 'big_text' | 'small_text' | 'lat_lng' | 'email' | 'phone'
  required: boolean
}

type EnumerableType = {
  type: 'enumerable'
  values: { [key in string]: string }
  allow_multiple_value?: boolean
  allow_custom_value?: boolean
  _embedded?: {
    nested_fields: any[]
  }
  reference?: null | string
  mask?: string
}

export type RequestFields = Omit<CommonFields, 'type'> & EnumerableType

export type UserFields = CommonFields

export type DataResponse = {
  request_fields: RequestFields[]
  user_fields: UserFields[]
} | null

export type ModelType = RequestFields[] | UserFields[]
