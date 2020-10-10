import { get } from 'utils/request'

export interface ILoginCellphoneQuery {
  phone: string
  countrycode: string
  password: string
}

export default (query: ILoginCellphoneQuery) => {
  const path = '/login/cellphone'
  const data = {
    phone: query.phone,
    countrycode: query.countrycode,
    password: query.password,
    rememberLogin: 'true'
  }
  return get(path, data)
}
