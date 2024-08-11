import itemApi, { itemDetail, searchItems } from '../../services/api';
import { store } from '../../store/store';
import SearchClientPage from '../../components/Search/SearchClient';
import { ItemDetailFullResponse } from 'src/types/ApiTypes';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: {
    searchTerm: string;
    page: string;
    per_page: string;
    details: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const {
    searchTerm = '',
    details = '',
    page = 1,
    per_page = 10,
  } = searchParams;
  const currentSearchTerm = searchTerm ? String(searchTerm) : '';
  const currentPage = Number(page) || 1;
  const currentPerPage = Number(per_page) || 10;
  const currentDetails = details ? String(details) : '';
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

  if (details) {
    const { data: detailData2 } = await store.dispatch(
      itemDetail.initiate({
        uid: currentDetails,
      }),
    );

    detailData = { ...detailData, ...detailData2 };
  }

  await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

  if (error) {
    return <div>Error loading item</div>;
  }

  return (
    <SearchClientPage
      initialData={data}
      initialDetailData={detailData}
      details={currentDetails}
      keywords={currentSearchTerm}
      page={currentPage}
      perPage={currentPerPage}
    />
  );
};

export default SearchPage;
