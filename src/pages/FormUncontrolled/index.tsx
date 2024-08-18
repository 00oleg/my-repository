import { useRef, useState } from 'react';
import Navs from '../../components/navs';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import * as Yup from 'yup';
import { validationSchema } from '../../utils/validationSchema';
import PasswordStrength from '../../components/PasswordStrength';

const FormUncontrolledPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { list: countryList } = useSelector(
    (state: RootState) => state.countries,
  );

  const refs = {
    name: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    passwordConfirm: useRef<HTMLInputElement>(null),
    gender: useRef<HTMLSelectElement>(null),
    terms: useRef<HTMLInputElement>(null),
    picture: useRef<HTMLInputElement>(null),
    country: useRef<HTMLInputElement>(null),
  };

  const passwordStrength = refs.password.current?.value || '';

  const handleErrors = (errorParams: object) => {
    setErrors({ ...errorParams });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values = {
      name: refs.name.current?.value ?? '',
      age: Number(refs.age.current?.value),
      email: refs.email.current?.value ?? '',
      password: refs.password.current?.value ?? '',
      gender: refs.gender.current?.value ?? '',
      terms: refs.terms.current?.checked ?? false,
      picture: refs.picture.current?.files?.[0],
      country: refs.country.current?.value ?? '',
      isLast: true,
    };

    try {
      await validationSchema.validate(
        {
          ...values,
          passwordConfirm: refs.passwordConfirm.current?.value ?? '',
        },
        { abortEarly: false },
      );
      handleErrors({});

      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(
          addUser({
            ...values,
            picture: reader.result as string,
          }),
        );
      };

      if (values.picture) {
        reader.readAsDataURL(values.picture);
      }

      navigate('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach(({ path, message }) => {
          if (path) {
            newErrors[path] = message;
          }
        });

        handleErrors(newErrors);
      }
    }
  };

  return (
    <>
      <Navs />
      <form onSubmit={handleSubmit} className="form-block" autoComplete="off">
        <h2>Uncontrolled Form</h2>
        <div className="form-control">
          <label htmlFor="input-name">Name</label>
          <input id="input-name" type="text" ref={refs.name} />
          {errors.name && <p className="input-error">{errors.name}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-age">Age</label>
          <input id="input-age" type="number" min={0} ref={refs.age} />
          {errors.age && <p className="input-error">{errors.age}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-email">Email</label>
          <input id="input-email" type="email" ref={refs.email} />
          {errors.email && <p className="input-error">{errors.email}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-password">
            Password{' '}
            <span>
              1 number, 1 uppercased letter, 1 lowercased letter, 1 special
              character
            </span>
          </label>
          <input id="input-password" type="password" ref={refs.password} />
          <PasswordStrength password={passwordStrength} />
          {errors.password && <p className="input-error">{errors.password}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-password-confirm">
            Password Confirm{' '}
            <span>
              1 number, 1 uppercased letter, 1 lowercased letter, 1 special
              character
            </span>
          </label>
          <input
            id="input-password-confirm"
            type="password"
            ref={refs.passwordConfirm}
          />
          {errors.passwordConfirm && (
            <p className="input-error">{errors.passwordConfirm}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-gender">Gender</label>
          <select id="input-gender" ref={refs.gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="input-error">{errors.gender}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-terms">Accept Terms & Conditions</label>
          <input type="checkbox" id="input-terms" ref={refs.terms} />
          {errors.terms && <p className="input-error">{errors.terms}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-picture">Upload Picture</label>
          <input
            type="file"
            id="input-picture"
            ref={refs.picture}
            accept="image/png, image/jpeg"
          />
          {errors.picture && <p className="input-error">{errors.picture}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-country">Country</label>
          <input list="countrydatalist" id="input-country" ref={refs.country} />
          {errors.country && <p className="input-error">{errors.country}</p>}
        </div>

        <button className="btn-success btn-full mt-10" type="submit">
          Submit
        </button>
      </form>

      <datalist id="countrydatalist">
        {countryList.map((country, index) => (
          <option key={index}>{country}</option>
        ))}
      </datalist>
    </>
  );
};

export default FormUncontrolledPage;
