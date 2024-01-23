import { getRandomBeerList, searchBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

let controller: AbortController | null = null;

type FetchDataInput = {
  setData: (data: Array<Beer>) => void;
  query: string;
  setLoading?: (loading: boolean) => void
}

const fetchData = ({ setData, query, setLoading }: FetchDataInput) => {
  (async () => {
    try {
      if (controller) {
        controller.abort();
        controller = null;
      }
      let response;
      setLoading?.(true)
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
    } finally {
      setLoading?.(false)
    }
  })();
};

export { fetchData };
