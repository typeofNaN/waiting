import { get } from 'utils/request';

interface FMTrash {
    id: number;
    time?: number;
}

export default (query: FMTrash) => {
    const path = `/radio/trash/add?alg=RT&songId=${query.id}&time=${query.time || 25}`;
    const data = {
        songId: query.id
    };
    return get(path, data);
};
