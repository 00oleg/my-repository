import { Link } from 'react-router-dom';

const Navs = () => {
  return (
    <div className="navs">
      <Link to={'/'}>Home</Link>
      <Link to={'/form-uncontrolled'}>Form uncontrolled</Link>
      <Link to={'/form-controlled'}>Form controlled</Link>
    </div>
  );
};

export default Navs;
