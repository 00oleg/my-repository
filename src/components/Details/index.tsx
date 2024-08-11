import { useRef } from 'react';
import { useItemDetailQuery } from '../../services/api';
import { DetailResult, queryParams } from '../../types/SearchTypes';
import { usePathname, useRouter } from 'next/navigation';

const names = {
  uid: 'UID',
  name: 'Name',
  earthAnimal: 'Earth Animal',
  earthInsect: 'Earth Insect',
  avian: 'Avian',
  canine: 'Canine',
  feline: 'Feline',
};

const DetailPage = ({ queryParams }: { queryParams: queryParams }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { page, perPage, keywords, details } = queryParams;

  const onDismiss = () => {
    replace(
      `${pathname}/?searchTerm=${keywords}&page=${page}&per_page=${perPage}`,
    );
  };

  const { data, error, isLoading } = useItemDetailQuery({
    uid: details || '',
  });

  return (
    <>
      <div className="detail-page" data-testid="detail-page">
        <button ref={buttonRef} onClick={onDismiss} data-testid="close-button">
          Close
        </button>

        <h2>Animal detail:</h2>
        {isLoading || error ? (
          <div>Loading...</div>
        ) : (
          <table>
            <tbody>
              {Object.keys(data?.animal || {}).map((el: string) => {
                let val = data?.animal[el as keyof DetailResult];

                if (typeof val === 'boolean') {
                  val = val ? 'Yes' : 'No';
                }

                return (
                  <tr key={el}>
                    <td>
                      <strong>{names[el as keyof DetailResult]}:</strong>
                    </td>
                    <td>{val}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="detail-overlay" onClick={onDismiss}></div>
    </>
  );
};

export default DetailPage;
