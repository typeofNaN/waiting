import { get } from 'utils/request';

interface IPlaylistSubscribe {
    id: number;
    t: number | string;
}
// 收藏与取消收藏歌单
export default (query: IPlaylistSubscribe) => {
    const path = `/playlist/${query.t}`;
    query.t = query.t == 1 ? 'subscribe' : 'unsubscribe';
    const data = {
        id: query.id
    };
    return get(path, data);
};
