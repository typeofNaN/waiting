import { get } from 'utils/request';

interface IArtistsQuery {
    id: number;
}
// 歌手单曲
export default (query: IArtistsQuery) => {
    const path = `/artist/${query.id}`;
    return get(path, {});
};
