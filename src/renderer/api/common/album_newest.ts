import { get } from 'utils/request';

export default () => {
    const path = '/discovery/newAlbum';
    return get(path, {});
};
