import { get } from 'utils/request';
// 热门搜索
export default () => {
    const path = '/search/hot';
    const data = {
        type: 1111
    };
    return get(path, data);
};
