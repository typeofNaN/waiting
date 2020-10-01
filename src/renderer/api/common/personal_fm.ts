import { get } from 'utils/request';
// 私人FM
export default () => {
    const path = `/radio/get`;
    return get(path, {});
};
