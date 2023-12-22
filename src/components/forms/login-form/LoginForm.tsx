import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginValidation } from '../../../validations';
import { loginSchema } from '../../../schema';
import { useAppDispatch } from '../../../store/store';
import { useState } from 'react';
import { loginService } from '../../../services/auth-service';
import { toastifySetup } from '../../../utils/toastifySetup';
import { useNavigate } from 'react-router-dom';

import iconPassword from '../../../assets/icon-password.svg';

import './styles.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: formValues,
    resolver: zodResolver(loginValidation),
  });

  const processForm = async (data: loginSchema) => {
    setFormLoading(true);

    await dispatch(loginService({ userInfo: data }))
      .unwrap()
      .then((res) => {
        if (res.status === 201) {
          toastifySetup({
            success: true,
            message: 'Authentification réussie',
          });

          navigate('/materiel');
        }
      })
      .catch((error: any) => {
        toastifySetup({ success: false, message: error.message });
      })
      .finally(() => setFormLoading(false));
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit(processForm)}>
        <div className="form-div">
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} id="email" />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="password">Mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            id="password"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img src={iconPassword} alt="view" />
          </button>

          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        <input
          type="submit"
          value="Se connecter"
          className={`${formLoading ? 'form-loading' : ''}`}
        />
      </form>
    </div>
  );
};

export default LoginForm;
