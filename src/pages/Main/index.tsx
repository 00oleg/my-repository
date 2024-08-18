import { useDispatch, useSelector } from 'react-redux';
import Navs from '../../components/navs';
import { RootState } from '../../store/store';
import { clearLast } from '../../store/usersSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  const handleClearLast = () => {
    setTimeout(() => {
      dispatch(clearLast());
    }, 2000);
  };

  return (
    <div>
      <Navs />

      <div className="cards">
        {users.length ? (
          users.map((user, index) => {
            if (user.isLast) {
              handleClearLast();
            }

            return (
              <div key={index} className={`card ${user.isLast ? 'last' : ''}`}>
                <div>
                  <img src={user.picture} />
                </div>
                <div>
                  Name: <strong>{user.name}</strong>
                </div>
                <div>
                  Age: <strong>{user.age}</strong>
                </div>
                <div>
                  Email: <strong>{user.email}</strong>
                </div>
                <div>
                  Password: <strong>{user.password}</strong>
                </div>
                <div>
                  Gender: <strong>{user.gender}</strong>
                </div>
                <div>
                  Terms:{' '}
                  <strong>{user.terms ? 'Accepted' : 'Not accepted'}</strong>
                </div>
                <div>
                  Country: <strong>{user.country}</strong>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card-empty">Users list is empty</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
