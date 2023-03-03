import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import MaskedInput from 'react-text-mask';
import { RegistrationSuccessful } from '../../components/registration-successful';
import { RequestErrors } from '../../components/request-errors';
import { RequestPost } from '../../components/request-post/request-post';
import { Spinner } from '../../components/spinner/spinner';
import { StepOne } from '../../components/step-one';
import { StepThree } from '../../components/step-three';
import { StepTwo } from '../../components/step-two';
import { addNewRegistration } from '../../store/features/registration/registration-slice';

import './registration.scss';

function Registration() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({ validateCriteriaMode: 'all', mode: 'all', reValidateMode: 'onBlur' });

  const { loading, error, stat, statusText } = useSelector((state) => state.registration);

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = (data) => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === 3) {
      dispatch(addNewRegistration(data));
      reset();
    }
  };
  const [locationError, setLocationError] = useState(false);
  const handleClickError = () => {
    setLocationError((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (error === 'Bad Request') {
      setLocationError(true);
      setCurrentStep(1);
    } else {
      setLocationError(false);
    }
  }, [error]);
  const watchPassword = watch('password');

  return (
    <div className='wrapper'>
      <div className='auth'>
        <main className='content-auth'>
          <div className='container '>
            <div className='auth__item'>
              <h2 className='auth__title'>Cleverland</h2>
              {locationError ? (
                <RequestErrors handleClickError={handleClickError} />
              ) : error && error !== 'Bad Request' ? (
                <RequestPost />
              ) : stat === 'loading' ? (
                <RegistrationSuccessful />
              ) : (
                <div className='block-form'>
                  <h3 className='block-form__title'>Регистрация</h3>
                  <div className='block-form__item'>
                    <div className='block-form__text'>{currentStep} шаг из 3</div>
                  </div>

                  <div className='block-form__item item-form'>
                    <form className='item-form__form' onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                      {currentStep === 1 ? (
                        <StepOne errors={errors} register={register} watchPassword={watchPassword} />
                      ) : null}
                      {currentStep === 2 ? <StepTwo errors={errors} register={register} /> : null}
                      {currentStep === 3 ? <StepThree errors={errors} register={register} /> : null}

                      <button
                        className='item-form__btn'
                        name='disable_button'
                        type='submit'
                        disabled={Object.keys(errors).length === 0 ? false : true}
                      >
                        {currentStep === 1 && 'следующий шаг'}
                        {currentStep === 2 && 'последний шаг'}
                        {currentStep === 3 && 'зарегистрироваться'}
                      </button>
                    </form>

                    <div className='block-form__elem'>
                      <span className='block-form__span'> Есть учётная запись?</span>
                      <Link className='block-form__link block-form__link_arrow' to='/auth'>
                        войти
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        {loading ? <Spinner /> : null}
      </div>
    </div>
  );
}

export { Registration };
