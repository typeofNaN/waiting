import { get } from 'utils/request';

interface ISongUrl {
    id: number;
    br?: string;
}
export default (query: ISongUrl) => {
    const path = '/enhance/player/url';
    const data = {
        ids: `[${query.id}]`,
        br: parseInt(query.br || '999000', 10)
    };
    return get(path, data);
};
