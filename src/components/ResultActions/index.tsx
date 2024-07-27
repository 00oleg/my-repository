import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeItems } from '../../store/itemReducer';
import { SearchResultItem } from '../../types/SearchTypes';

const convertToCSV = (items: Record<string, SearchResultItem>) => {
  const rows = Object.keys(items).map((key) => {
    const currentItem = items[key];
    return [currentItem.uid, currentItem.name, currentItem.earthAnimal];
  });

  return [['UUID', 'Name', 'Earth Animal'], ...rows]
    .map((e) => e.join(','))
    .join('\n');
};

const ResultActions = () => {
  const dispatch = useDispatch();
  const checkedItems = useSelector((state: RootState) => state.items.values);
  const checkedItemsKeys = Object.keys(checkedItems);
  const checkedItemsTotal = checkedItemsKeys.length;

  const handleUnselect = () => {
    dispatch(removeItems());
  };

  const handleDownload = () => {
    const csvContent = convertToCSV(checkedItems);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', checkedItemsTotal + '_animals.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <button className="btn-success" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default ResultActions;
