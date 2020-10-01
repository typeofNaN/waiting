import { get } from 'utils/request';

interface IUserPlaylistQuery {
    uid: number;
    limit?: number;
    offset?: number;
}
export default (query: IUserPlaylistQuery) => {
    const path = '/user/playlist';
    const data = {
        uid: query.uid,
        limit: query.limit || 30,
        offset: query.offset || 0
    };
    return get(path, data);
};
