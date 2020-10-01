import { get } from 'utils/request';

export default () => {
    const path = '/discovery/recommend/songs';
    const data = {
        limit: 20,
        offset: 0,
        total: true
    };
    return get(path, data);
};
