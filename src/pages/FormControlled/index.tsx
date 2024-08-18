import { Controller, useForm } from 'react-hook-form';
import Navs from '../../components/navs';
import { UserFormValues } from '../../types/user';
import { useYupValidationResolver } from '../../utils/yupResolver';
import { validationSchema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addUser } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';

const FormControlledPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: countryList } = useSelector(
    (state: RootState) => state.countries,
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormValues>({
    resolver: useYupValidationResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  const onSubmit = (data: UserFormValues) => {
    const picture = data.picture[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        addUser({
          ...data,
          picture: reader.result as string,
          isLast: true,
        }),
      );
    };

    if (picture) {
      reader.readAsDataURL(picture);
    }

    navigate('/');
  };

  return (
    <>
      <Navs />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-block"
        autoComplete="off"
      >
        <h2>Controlled Form</h2>
        <div className="form-control">
          <label htmlFor="input-name">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="input-name"
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.name && <p className="input-error">{errors.name.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-age">Age</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                id="input-age"
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.age && <p className="input-error">{errors.age.message}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="input-email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                type="email"
                id="input-email"
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.email && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-password">
            Password{' '}
            <span>
              1 number, 1 uppercased letter, 1 lowercased letter, 1 special
              character
            </span>
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                id="input-password"
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.password && (
            <p className="input-error">{errors.password.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-password-confirm">
            Password Confirm{' '}
            <span>
              1 number, 1 uppercased letter, 1 lowercased letter, 1 special
              character
            </span>
          </label>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                id="input-password-confirm"
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.passwordConfirm && (
            <p className="input-error">{errors.passwordConfirm.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-gender">Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select id="input-gender" {...field}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
          />
          {errors.gender && (
            <p className="input-error">{errors.gender.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-terms">Accept Terms & Conditions</label>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <div>
                <input
                  type="checkbox"
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  id="input-terms"
                />
              </div>
            )}
          />
          {errors.terms && (
            <p className="input-error">{errors.terms.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-picture">Upload Picture</label>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                id="input-picture"
                onChange={(e) => field.onChange(e.target.files)}
                accept="image/png, image/jpeg"
              />
            )}
          />
          {errors.picture && (
            <p className="input-error">{errors.picture.message}</p>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="input-country">Country</label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <input
                list="countrydatalist"
                id="input-country"
                {...field}
                value={field.value || ''}
              />
            )}
          />
          {errors.country && (
            <p className="input-error">{errors.country.message}</p>
          )}
        </div>

        <button
          className="btn-success btn-full"
          type="submit"
          disabled={!isValid}
        >
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

export default FormControlledPage;
