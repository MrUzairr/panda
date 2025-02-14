import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FeedbackModalProps } from '@interfaces/Modal';
import { FaCaretDown } from 'react-icons/fa';
import { showToast } from '@components/common/toast/toast';
import { useTranslation } from 'react-i18next';
import feedbackModalModuleCss from './FeedbackModa.module.css';
import fontStyle from '@styles/fontStyle.module.css';
import { useAxios } from '@hooks/useAxios';
import Loader from '../Loader/loader';
const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const { t, i18n } = useTranslation();
  const [partnerEmail, setPartnerEmail] = useState('');
  const [description, setDescription] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const { error, loading, message, useAxiosRequest } = useAxios();
  const [feedbackType, setFeedbackType] = useState(``);
  const [errors, setErrors] = useState({
    email: '',
    description: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownAnimation = useSpring({
    transform: isDropdownOpen ? 'scaleY(1)' : 'scaleY(0)',
    transformOrigin: 'top',
    opacity: isDropdownOpen ? 1 : 0,
    config: { duration: 200 },
  });

  const handleReset = () => {
    setPartnerEmail('');
    setDescription('');
    setFeedbackType(`${t('feedback.dropdown.feedback')}`);
    setErrors({ email: '', description: '' });
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateDescription = (description: string) => {
    return description.length >= 10;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    if (id === 'partner_email') {
      setPartnerEmail(value);
      if (!value) {
        setErrors((prev) => ({ ...prev, email: '' }));
      } else if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: `${t('feedback.elements.validEmail')}`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    }

    if (id === 'description') {
      setDescription(value);
      if (!value) {
        setErrors((prev) => ({ ...prev, description: '' }));
      } else if (!validateDescription(value)) {
        setErrors((prev) => ({
          ...prev,
          description: `${t('feedback.elements.validDescription')}`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, description: '' }));
      }
    }
  };

  const isFormValid =
    validateEmail(partnerEmail) && validateDescription(description);

  const LANGUAGE_DROPDOWN_ITEMS = [
    {
      code: `${t('feedback.dropdown.feedback')}`,
      name: `${t('feedback.dropdown.feedback')}`,
    },
    {
      code: `${t('feedback.dropdown.issue')}`,
      name: `${t('feedback.dropdown.issue')}`,
    },
  ];
  const feedbackTypeMapping = {
    [t('feedback.dropdown.feedback')]: 'feedback',
    [t('feedback.dropdown.issue')]: 'issue',
  };
  const category = feedbackTypeMapping[feedbackType] || 'feedback';
  const handleLanguageChange = (code: string) => {
    setFeedbackType(code);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleReset();
      onClose();
    }
  };
  useEffect(() => {
    setFeedbackType(t('feedback.dropdown.feedback'));
  }, [i18n.language]);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleReset();
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReset();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await useAxiosRequest('/feedback', 'POST', {
        partner_email: partnerEmail,
        description,
        category,
      });
      if (error) {
        showToast({
          type: 'error',
          message: `${t('feedback.elements.feedbackNotSubmitted')}`,
        });
      } else {
        showToast({
          type: 'success',
          message: message || `${t('feedback.elements.feedbackSubmitted')}`,
        });
      }
      setTimeout(() => {
        handleReset();
        onClose();
      }, 1000);
    } catch (err) {
      console.error('An error occurred during submission: ', err);
      showToast({
        type: 'error',
        message: `${t('feedback.elements.feedbackNotSubmitted')}`,
      });
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={handleClickOutside}
      >
        <animated.div
          ref={modalRef}
          className={`${feedbackModalModuleCss.feedbackModal} mx-3 max-h-screen w-full max-w-[500px] transform bg-[#f5fff2] p-6 px-5 pt-10 transition-transform duration-500 md:px-[30px] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <h2
              className={`${fontStyle.boldText} ms-3 flex justify-center text-center text-2xl font-semibold ${feedbackModalModuleCss.animatedText} md:ms-5`}
            >
              {t('feedback.elements.title')}
            </h2>
            <button
              onClick={() => {
                onClose();
                handleReset();
              }}
              className="text-secondary hover:text-primary"
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
            <div className="relative mb-4 w-full">
              <label
                className={`mb-2 ms-3 block text-sm font-medium text-secondary md:ms-5 ${fontStyle.boldText}`}
              >
                {t('feedback.elements.feedbackType')}
              </label>

              <div
                className="mb-3 ms-1 flex w-full border-spacing-1 cursor-pointer items-center justify-between border-[1px] border-secondary bg-[#f8fff0] px-2 py-4"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                style={{ borderRadius: '18px' }}
              >
                <span
                  className={`${fontStyle.regularText} text-md px-2 text-secondary`}
                >
                  {feedbackType}
                </span>
                <FaCaretDown className="ml-2 text-secondary" />
              </div>

              <animated.div
                style={dropdownAnimation}
                className="absolute left-0 z-20 mt-[-10px] w-full overflow-hidden rounded-md bg-[#f8fff0] shadow-lg"
              >
                <div className="py-1">
                  {LANGUAGE_DROPDOWN_ITEMS.map((item) => (
                    <div
                      key={item.code}
                      className={`mb-2 w-full cursor-pointer rounded px-3 py-1 ${
                        feedbackType === item.code
                          ? `bg-[#f5fde4] py-3 text-secondary ${fontStyle.boldText}`
                          : `${fontStyle.regularText}`
                      }`}
                      onClick={() => handleLanguageChange(item.code)}
                    >
                      <span>{item.name}</span>
                      {feedbackType === item.code && (
                        <span
                          className={`${fontStyle.boldText} ml-2 text-secondary`}
                        >
                          ✔
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </animated.div>
            </div>
            <div className="relative mb-2">
              <textarea
                id="description"
                className={`${fontStyle.regularText} peer ms-1 mt-2 w-full resize-none border bg-[#f8fff0] p-2.5 text-sm focus:outline-none ${
                  errors.description ? 'border-red-500' : 'border-secondary'
                }`}
                style={{ borderRadius: '18px' }}
                placeholder=" "
                rows={4}
                value={description}
                onChange={handleChange}
                aria-invalid={!!errors.description}
                aria-describedby="description-error"
              />
              <label
                htmlFor="description"
                className={`${fontStyle.boldText} peer-focus:text-md peer-focus:scale-80 absolute ${i18n.language === 'ar' ? 'right-3' : 'left-3'} top-0 z-10 origin-[0] transform bg-[#f8fff0] px-2 text-sm text-secondary transition-all duration-200 peer-placeholder-shown:top-0 peer-placeholder-shown:translate-y-[-5] peer-placeholder-shown:scale-100 peer-focus:top-3 peer-focus:-translate-y-4 peer-focus:px-2 peer-focus:text-secondary`}
              >
                {t('feedback.elements.description')}
              </label>
              {errors.description && (
                <p
                  id="description-error"
                  className={`${fontStyle.lightText} mb-5 ms-2 mt-0 text-xs text-red-500`}
                >
                  {errors.description}
                </p>
              )}
            </div>

            <div className="relative mb-4 ms-1 w-full">
              <input
                type="email"
                id="partner_email"
                autoComplete="off"
                className={`${fontStyle.regularText} peer mt-2 h-[57px] w-full border bg-[#f8fff0] p-2.5 ps-5 text-sm text-secondary focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-secondary'
                }`}
                style={{ borderRadius: '18px' }}
                placeholder=""
                value={partnerEmail}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              <label
                htmlFor="partner_email"
                className={`absolute ${i18n.language === 'ar' ? 'right-3' : 'left-3'} top-3 z-10 origin-[0] transform bg-[#f8fff0] px-2 text-sm text-secondary transition-all duration-200 ${
                  partnerEmail
                    ? 'top-2 -translate-y-4 scale-75'
                    : 'top-[20px] translate-y-[-5] scale-100'
                } ${fontStyle.boldText} peer-placeholder-shown:top-[10px] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-lg peer-focus:text-secondary`}
              >
                {t('feedback.elements.email')}
              </label>
              {errors.email && (
                <p
                  id="email-error"
                  className={`${fontStyle.regularText} mt-1 text-xs text-red-500`}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className={`${fontStyle.regularText} mr-4 text-gray-500 hover:text-secondary`}
              >
                {t('feedback.elements.reset')}
              </button>
              <button
                type="submit"
                className={`${fontStyle.regularText} rounded-md px-6 py-2 text-white ${i18n.language === 'ar' ? 'ms-5' : ''} ${
                  isFormValid
                    ? 'bg-secondary bg-opacity-95 hover:bg-secondary hover:bg-opacity-100 focus:outline-none'
                    : 'cursor-not-allowed bg-secondary bg-opacity-50'
                }`}
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                {t('feedback.elements.submit')}
              </button>
            </div>
          </form>
        </animated.div>
      </div>
    </>
  );
};

export default FeedbackModal;
