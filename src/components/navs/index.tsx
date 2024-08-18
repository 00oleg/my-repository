import { Link } from 'react-router-dom';

const Navs = () => {
  return (
    <div className="navs">
      <Link to={'/'}>Home</Link>
      <Link to={'/form-uncontrolled'}>Uncontrolled Form</Link>
      <Link to={'/form-controlled'}>Controlled Form</Link>
    </div>
  );
};

export default Navs;
