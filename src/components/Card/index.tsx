import { RootState } from '../../store/store';
import { toggleItem } from '../../store/itemReducer';
import { SearchResultItem } from '../../types/SearchTypes';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

const Card = ({ queryParams, uid, name, earthAnimal }: SearchResultItem) => {
  const { page, perPage, keywords } = queryParams;
  const itemsFromStore = useSelector((state: RootState) => state.items.values);
  const dispatch = useDispatch();

  const handleCheckboxChange = (value: SearchResultItem) => {
    dispatch(toggleItem(value));
  };

  return (
    <div className="card-list__item" data-testid="card-list__item">
      <input
        type="checkbox"
        value={uid}
        onChange={() =>
          handleCheckboxChange({ uid, name, earthAnimal, queryParams })
        }
        checked={!!itemsFromStore[uid]}
      />
      <Link
        className="card-list__item-link"
        href={`/search?searchTerm=${keywords}&page=${page}&per_page=${perPage}&details=${uid}`}
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
