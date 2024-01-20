import { getRandomBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

let controller: AbortController | null = null;

const fetchData = (setData: (data: Array<Beer>) => void, query: string) => {
  (async () => {
    try {
      if (controller) {
        controller.abort();
        controller = null;
      }
      let response;
      if (query) {
        controller = new AbortController();
        response = await searchBeerList(query, { signal: controller.signal });
        controller = null;
      } else {
        response = await getRandomBeerList(10);
      }
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
