import { useState, useEffect, useRef } from 'react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from 'react-icons/ai';
import { showToast } from '@components/common/toast/toast';
import { useTranslation } from 'react-i18next';
import fontStyle from '@styles/fontStyle.module.css';
import { IoIosKey } from 'react-icons/io';
import Loader from '../Loader/loader';
import { useNavigate } from 'react-router-dom';
import SignInModalCss from './SignInModal.module.css';
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const { t, i18n } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const handleTogglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string) => {
    return password.length > 7;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setEmailError('');
    } else if (!validateEmail(value)) {
      setEmailError(`${t('signIn.validation.invalidEmail')}`);
    } else {
      setEmailError('');
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setEmailError('');
    setPasswordError('');
    onClose();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setPasswordError('');
    } else if (!validatePassword(value)) {
      setPasswordError(`${t('signIn.validation.invalidPassword')}`);
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleRegisterClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.open('https://panda.com.sa/partners', '_blank');
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast({
        type: 'success',
        message: `${t('signIn.feedback.formSubmitted')}`,
        options: {
          className: 'custom-toast',
          progressClassName: 'custom-toast-progress',
        },
      });
      navigate('/services');
      onClose();
    }, 3000);
  };

  return (
    <>
      <Loader loading={loading} />
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          ref={modalRef}
          className={`mx-3 max-h-screen w-full max-w-[480px] transform bg-[#ffffff] px-[38px] pb-5 pt-5 transition-transform duration-500 md:px-[40px] md:pt-[30px] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ borderRadius: '60px 60px 8px 60px' }}
          role="dialog"
          aria-labelledby="signin-modal-title"
          aria-hidden={!isOpen}
        >
          <div className="mb-8 flex items-center justify-between">
            <h2
              id="signin-modal-title"
              className={`${fontStyle.boldText} ms-5 text-2xl md:ms-3 ${SignInModalCss.animatedText}`}
              tabIndex={0}
            >
              {t('signIn.elements.title')}
            </h2>
            <button
              onClick={handleClose}
              className="me-4 text-secondary hover:text-primary md:me-0"
              aria-label="Close"
              tabIndex={0}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form>
            <div className="relative mb-4">
              <div
                className={`${i18n.language === 'ar' ? 'right-0 rounded-r-xl border-l' : 'left-0 rounded-l-xl border-r'} absolute flex h-[50px] w-[50px] transform items-center justify-center bg-secondary text-white md:w-[60px]`}
              >
                <AiOutlineMail className="h-[20px] w-[20px] md:h-[23px] md:w-[20px]" />
              </div>
              <input
                type="email"
                autoComplete="off"
                id="sign-in-email"
                className={`peer block w-full appearance-none rounded-xl border-[1px] ps-[55px] md:ps-[69px] ${
                  emailError ? 'border-red-500' : 'border-gray-300'
                } h-[50px] bg-[#f7f7f7] px-2.5 pb-2.5 pt-3 text-sm ${fontStyle.regularText} text-[#6B7280] focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-secondary`}
                placeholder={t('signIn.elements.title')}
                value={email}
                onChange={handleEmailChange}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
                tabIndex={0}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              />

              {emailError && (
                <p
                  id="email-error"
                  className={`text-xs text-red-500 ${fontStyle.lightText} ${i18n.language === 'ar' ? 'ms-[5px] mt-2' : 'mt-1'}`}
                  aria-live="assertive"
                >
                  {emailError}
                </p>
              )}
            </div>

            <div className="relative mb-6">
              <div
                className={`absolute ${i18n.language === 'ar' ? 'right-0 rounded-r-xl border-l' : 'left-0 rounded-l-xl border-r'} flex h-[50px] w-[50px] transform items-center justify-center bg-secondary text-white md:w-[60px]`}
              >
                <IoIosKey className="h-[20px] w-[20px] md:h-[23px] md:w-[20px]" />
              </div>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="sign-in-password"
                className={`peer ${fontStyle.regularText} block w-full appearance-none rounded-xl border-[1px] ps-[55px] md:ps-[69px] ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } h-[50px] bg-[#f7f7f7] px-2.5 pb-2.5 pt-4 text-sm text-[#6B7280] focus:border-secondary focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-secondary`}
                placeholder="**********"
                value={password}
                onChange={handlePasswordChange}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                tabIndex={0}
              />

              <button
                type="button"
                onClick={handleTogglePasswordVisibility}
                className={`${fontStyle.boldText} ${i18n.language === 'ar' ? 'left-3' : 'right-3'} absolute top-1/2 -translate-y-1/2 transform ${passwordError ? 'top-6' : ''}`}
                aria-label="Toggle password visibility"
                tabIndex={0}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible className="h-5 w-5 text-secondary" />
                ) : (
                  <AiOutlineEye className="h-5 w-5 text-secondary" />
                )}
              </button>
              {passwordError && (
                <p
                  id="password-error"
                  className={`${fontStyle.lightText} text-xs text-red-500 ${i18n.language === 'ar' ? 'ms-[5px] mt-2' : 'mt-1'}`}
                  aria-live="assertive"
                >
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex w-full justify-between ps-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 rounded border-secondary bg-[#F3F4F6] text-[#6B7280] accent-secondary focus:ring-secondary"
                />
                <label
                  className={`${fontStyle.regularText} ms-[1.4px] text-[14px] text-gray-600`}
                >
                  {t('signIn.elements.rememberMe')}
                </label>
              </div>

              <div>
                <a
                  href="#"
                  className={`text-[14px] text-secondary hover:underline ${fontStyle.regularText} hover:text-primary`}
                  tabIndex={0}
                >
                  {t('signIn.elements.forgotPassword')}
                </a>
              </div>
            </div>

            <div className="mb-3 mt-5 flex w-full justify-center">
              <button
                type="submit"
                className={`${fontStyle.regularText} h-[45px] w-full max-w-[350px] rounded-[30px] text-[18px] text-white ${
                  isFormValid
                    ? 'bg-secondary bg-opacity-95 hover:bg-secondary hover:bg-opacity-100 focus:outline-none'
                    : 'cursor-not-allowed bg-secondary bg-opacity-50'
                }`}
                disabled={!isFormValid}
                tabIndex={0}
                onClick={handleSubmit}
              >
                {t('signIn.elements.submit')}
              </button>
            </div>

            <div className="flex justify-center">
              <span
                className={`${fontStyle.regularText} me-1 text-[12px] text-secondary`}
              >
                {t('signIn.elements.newHere')}
              </span>
              <a
                onClick={handleRegisterClick}
                className={`${fontStyle.regularText} cursor-pointer text-[12px] text-secondary underline hover:underline ${fontStyle.regularText} hover:text-primary`}
                tabIndex={0}
              >
                {t('signIn.elements.createAccount')}
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
