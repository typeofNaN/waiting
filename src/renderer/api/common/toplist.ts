import { get } from 'utils/request';
// 所有榜单介绍
export default () => {
    const path = '/toplist';
    return get(path, {});
};
