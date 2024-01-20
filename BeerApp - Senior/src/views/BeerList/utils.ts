import { getBeerList, getBeerMetaData } from '../../api';
import { ApiMetadata, ApiParams, Beer } from '../../types';
import handle from '../../utils/error';

type DATA = {
  list: Array<Beer>;
  metadata: ApiMetadata;
}

const fetchData = (setData: (data: DATA) => void, params: ApiParams) => {
  (async () => {
    try {
      const [
        { data: list },
        { data: metadata }
      ] = await Promise.all([
        getBeerList(params),
        getBeerMetaData(params)
      ])
      setData({ list, metadata });
    } catch (error) {
      handle(error);
    }
  })();
};

const getTotalPage = (metadata: ApiMetadata | undefined) => {
  if (!metadata) {
    return 0
  }
  return Math.ceil(Number(metadata?.total) / Number(metadata?.per_page)) ?? 0;
}

export { fetchData, getTotalPage };
