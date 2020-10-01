import { get } from 'utils/request';

interface IUserDetailQuery {
    uid: number;
}
// 用户详情
export default (query: IUserDetailQuery) => {
    const path = `/user/detail/${query.uid}`;
    return get(path, {});
};
