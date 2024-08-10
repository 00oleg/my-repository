import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import itemApi, {
  itemDetail,
  searchItems,
  useSearchItemsQuery,
} from '../../services/api';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';
import { wrapper } from 'src/store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { page, per_page, details, searchTerm } = query;

      const currentSearchTerm = searchTerm ? String(searchTerm) : '';
      const currentPage = Number(page) || 1;
      const currentPerPage = Number(per_page) || 10;
      const currentDetails = String(details) || '';

      await store.dispatch(
        searchItems.initiate({
          searchText: currentSearchTerm,
          pageNumber: currentPage,
          perPage: currentPerPage,
        }),
      );

      if (details) {
        await store.dispatch(
          itemDetail.initiate({
            uid: currentDetails,
          }),
        );
      }

      await Promise.all(store.dispatch(itemApi.util.getRunningQueriesThunk()));

      return {
        props: {
          searchTerm: currentSearchTerm,
          perPage: currentPerPage,
          page: currentPage,
          initialState: store.getState(),
        },
      };
    },
);

export default function Page({
  page,
  perPage,
  searchTerm,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const currentSearchTerm = searchTerm ? String(searchTerm) : '';
  const router = useRouter();
  const [searchText, setSearchText] = useSearchQuery(
    'searchText',
    currentSearchTerm,
  );

  const handleSearchText = (param: string) => {
    setSearchText(param);
    router.push({
      pathname: '/search',
      query: {
        searchTerm: param,
        page: 1,
        perPage: perPage.toString(),
      },
    });
  };

  const { data, error, isLoading } = useSearchItemsQuery({
    searchText,
    pageNumber: Number(page),
    perPage,
  });

  if (error) {
    return <div>Error loading item</div>;
  }

  return (
    <>
      <Search
        {...{
          searchText,
          handleSearchText,
          loading: isLoading,
          results: data?.animals || [],
          pageNumber: data?.page.pageNumber || 0,
          totalPages: data?.page.totalPages || 0,
          perPage,
        }}
      />
    </>
  );
}
