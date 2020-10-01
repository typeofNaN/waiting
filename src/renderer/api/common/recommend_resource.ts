import { get } from 'utils/request';

export default () => {
    const path = '/discovery/recommend/resource';
    return get(path, {});
};
