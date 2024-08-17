import { Link } from 'react-router-dom';

const Navs = () => {
  return (
    <div>
      <Link to={'/'}>Home</Link>
      <Link to={'/form-uncontrolled'}>form uncontrolled</Link>
      <Link to={'/form-controlled'}>form controlled</Link>
    </div>
  );
};

export default Navs;
