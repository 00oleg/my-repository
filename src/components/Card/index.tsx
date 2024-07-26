import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { toggleItem } from '../../store/itemReducer';
import { SearchResultItem } from '../../types/SearchTypes';

const Card = ({ uid, name, earthAnimal, pageNumber }: SearchResultItem) => {
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
        onChange={() => handleCheckboxChange({ uid, name, earthAnimal })}
        checked={!!itemsFromStore[uid]}
      />
      <Link
        className="card-list__item-link"
        to={`/details?page=${pageNumber}&detail=${uid}`}
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
