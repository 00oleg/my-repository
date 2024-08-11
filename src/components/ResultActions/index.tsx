import { RootState } from '../../store/store';
import { removeItems } from '../../store/itemReducer';
import { SearchResultItem } from '../../types/SearchTypes';
import { useDispatch, useSelector } from 'react-redux';

const createFile = (checkedItems: Record<string, SearchResultItem>) => {
  const convertToCSV = (items: Record<string, SearchResultItem>) => {
    const header = ['UUID', 'Name', 'Earth Animal'];
    const rows = Object.keys(items).map((key) => {
      const currentItem = items[key];
      return [currentItem.uid, currentItem.name, currentItem.earthAnimal];
    });

    const csvContent = [header, ...rows].map((e) => e.join(',')).join('\n');
    return csvContent;
  };

  const csvContent = convertToCSV(checkedItems);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  return URL ? URL.createObjectURL(blob) : '';
};

const ResultActions = () => {
  const dispatch = useDispatch();
  const checkedItems = useSelector((state: RootState) => state.items.values);
  const checkedItemsKeys = Object.keys(checkedItems);
  const checkedItemsTotal = checkedItemsKeys.length;

  const handleUnselect = () => {
    dispatch(removeItems());
  };

  if (!checkedItemsTotal) {
    return '';
  }

  return (
    <div className="search-result-actions">
      <span>{checkedItemsTotal} items are selected.</span>
      <button className="btn-success" onClick={handleUnselect}>
        Unselect all
      </button>
      <a
        className="btn btn-success"
        href={createFile(checkedItems)}
        download={`${checkedItemsTotal}_animals.csv`}
      >
        Download
      </a>
    </div>
  );
};

export default ResultActions;
