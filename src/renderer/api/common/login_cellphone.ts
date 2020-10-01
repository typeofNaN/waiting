import { get } from 'utils/request';
import Crypto from 'utils/crypto';

const { md5 } = Crypto;

export interface ILoginCellphoneQuery {
    phone: string;
    countrycode: string;
    password: string;
}

export default (query: ILoginCellphoneQuery) => {
    const path = '/login/cellphone';
    const data = {
        phone: query.phone,
        countrycode: query.countrycode,
        password: md5(query.password),
        rememberLogin: 'true'
    };
    return get(path, data);
};
