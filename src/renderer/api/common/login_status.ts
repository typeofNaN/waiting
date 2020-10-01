import { get } from 'utils/request';
// 登录状态
export default () => {
    const path = `/`;
    return get(path, {});
};
