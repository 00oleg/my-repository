import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <Link to={'/form1'}>form 1</Link>
      <Link to={'/form2'}>form 2</Link>
      Main
    </div>
  );
};

export default MainPage;
