import itemApi, { itemDetail, searchItems } from '../services/api';
import { store } from '../store/store';
import SearchClientPage from '../components/Search/SearchClient';
import { ItemDetailFullResponse } from '../types/ApiTypes';
import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const currentSearchTerm = url.searchParams.get('searchTerm')
    ? String(url.searchParams.get('searchTerm'))
    : '';
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const currentPerPage = Number(url.searchParams.get('per_page')) || 10;
  const currentDetails = url.searchParams.get('details')
    ? String(url.searchParams.get('details'))
    : '';

  let detailData: ItemDetailFullResponse = {
    animal: {
      uid: '',
      name: '',
      earthAnimal: false,
      earthInsect: false,
      avian: false,
      canine: false,
      feline: false,
    },
  };

  const { data, error } = await store.dispatch(
    searchItems.initiate({
      searchText: currentSearchTerm,
      pageNumber: currentPage,
      perPage: currentPerPage,
    }),
  );

  if (url.searchParams.get('details')) {
    const { data: detailData2 } = await store.dispatch(
      itemDetail.initiate({
        uid: currentDetails,
      }),
    );

    detailData = { ...detailData, ...detailData2 };
  }

  await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

  if (error) {
    return json({ error: 'Error fetching data' }, { status: 500 });
  }

  return json({
    initialData: data,
    detailData: detailData,
    keywords: currentSearchTerm,
    page: currentPage,
    perPage: currentPerPage,
    details: currentDetails,
  });
};

const SearchPage = () => {
  const { initialData, detailData, keywords, page, perPage, details } =
    useLoaderData<typeof loader>();

  return (
    <div className="search-page">
      <SearchClientPage
        initialData={initialData}
        initialDetailData={detailData}
        details={details}
        keywords={keywords}
        page={page}
        perPage={perPage}
      />
    </div>
  );
};

export default SearchPage;
