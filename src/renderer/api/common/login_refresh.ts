import { get } from 'utils/request';
// 登录刷新
export default () => {
    const path = `/login/token/refresh`;
    return get(path, {});
};
