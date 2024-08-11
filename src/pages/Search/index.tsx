import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import itemApi, {
  itemDetail,
  searchItems,
  useSearchItemsQuery,
} from '../../services/api';
import { usePathname, useRouter } from 'next/navigation';
import { InferGetServerSidePropsType } from 'next';
import { wrapper } from '../../store/store';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { page, per_page, details, searchTerm } = query;

      const currentSearchTerm = searchTerm ? String(searchTerm) : '';
      const currentPage = Number(page) || 1;
      const currentPerPage = Number(per_page) || 10;
      const currentDetails = details ? String(details) : '';

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
          page: currentPage,
          perPage: currentPerPage,
          keywords: currentSearchTerm,
          details: currentDetails,
        },
      };
    },
);

export default function Page({
  page,
  perPage,
  keywords,
  details,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const currentSearchTerm = keywords ? String(keywords) : '';
  const { replace } = useRouter();
  const pathname = usePathname();
  const [searchText, setSearchText] = useSearchQuery(
    'searchText',
    currentSearchTerm,
  );

  const handleSearchText = (param: string) => {
    setSearchText(param);
    replace(`${pathname}/?searchTerm=${param}&page=1&per_page=${perPage}`);
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
          totalPages: data?.page?.totalPages || 0,
          perPage,
        }}
        queryParams={{
          page: page,
          perPage: perPage,
          keywords: keywords,
          details: details,
        }}
      />
    </>
  );
}
