import { RootState } from '../../store/store';
import { toggleItem } from '../../store/itemReducer';
import { SearchResultItem } from '../../types/SearchTypes';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useSearchParams } from 'next/navigation';

const Card = ({ uid, name, earthAnimal }: SearchResultItem) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentPerPage = Number(searchParams.get('per_page')) || 10;
  const currentSearchTerm = String(searchParams.get('searchTerm')) || '';
  const itemsFromStore = useAppSelector(
    (state: RootState) => state.items.values,
  );
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (value: SearchResultItem) => {
    dispatch(toggleItem(value));
  };

  return (
    <div className="card-list__item" data-testid="card-list__item">
      <input
        type="checkbox"
        value={uid}
        onChange={() => handleCheckboxChange({ uid, name, earthAnimal })}
        checked={!!itemsFromStore[uid]}
      />
      <Link
        className="card-list__item-link"
        href={`/search?searchTerm=${currentSearchTerm}&page=${currentPage}&per_page=${currentPerPage}&details=${uid}`}
        data-testid="card-list__item-link"
      >
        <strong>{name}</strong> -
        <span data-testid="card-list__item-earth">
          Earth Animal: {earthAnimal ? 'Yes' : 'No'}
        </span>
      </Link>
    </div>
  );
};

export default Card;
