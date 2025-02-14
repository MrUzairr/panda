import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import fontStyle from '@styles/fontStyle.module.css';
import FaqModalCss from './FaqModal.module.css';
const FAQModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openSubAccordion, setOpenSubAccordion] = useState<number | null>(null);
  const { t } = useTranslation();
  const FAQS_DATA = t('faq.categories', {
    returnObjects: true,
  }) as FaqData_Type;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const accordionTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  };

  const subAccordionTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  };

  const handleAccordionClick = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleSubAccordionClick = (index: number) => {
    setOpenSubAccordion(openSubAccordion === index ? null : index);
  };

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

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Prevent closing if clicking inside the modal content area
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3 }}
      onClick={handleOverlayClick}
    >
      <motion.div
        ref={modalRef}
        className={`z-60 relative mx-3 max-h-screen w-full max-w-[590px] overflow-hidden bg-[#FDFFFA] shadow-lg md:pb-[20px]`}
        style={{ borderRadius: '60px 60px 8px 60px' }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.4 }}
      >
        <div
          className="sticky top-0 z-10 flex w-full justify-between bg-[#FDFFFA] px-[50px] py-5 pt-[30px] backdrop-blur-md"
          style={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            className={`text-3xl ${fontStyle.boldText} ${FaqModalCss.animatedText} text-secondary`}
          >
            {t('faq.title')}
          </h2>
          <button
            className="text-secondary hover:text-primary"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 8.586L15.414 3.172a1 1 0 0 1 1.414 1.414L11.414 10l5.414 5.414a1 1 0 0 1-1.414 1.414L10 11.414l-5.414 5.414a1 1 0 0 1-1.414-1.414L8.586 10 3.172 4.586a1 1 0 0 1 1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>

        <div className="mx-5 flex max-h-[70vh] flex-col overflow-hidden md:mx-5">
          <div className="max-h-[65vh] flex-1 overflow-y-auto p-4">
            {FAQS_DATA.map((category, index) => (
              <div
                key={index}
                className="py-4"
                style={{ borderBottom: '1px solid #e3e3e3' }}
              >
                <div className="group">
                  <div
                    className="mx-2 flex cursor-pointer items-center justify-between text-lg font-medium text-secondary"
                    onClick={() => handleAccordionClick(index)}
                  >
                    <span className={`${fontStyle.boldText} font-super-bold`}>
                      {category.name}
                    </span>
                    <span
                      className={`transform transition ${
                        openAccordion === index ? 'rotate-180' : ''
                      }`}
                    >
                      <svg
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                  {openAccordion === index && (
                    <motion.div
                      className="mx-5 mt-4"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={accordionTransition}
                    >
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faqIndex} className="py-2">
                          <div className="group">
                            <div
                              className="text-md flex cursor-pointer items-center justify-between text-secondary"
                              onClick={() => handleSubAccordionClick(faqIndex)}
                            >
                              <span className={`${fontStyle.regularText}`}>
                                {faq.question}
                              </span>
                              <span
                                className={`transform transition ${
                                  openSubAccordion === faqIndex
                                    ? 'rotate-180'
                                    : ''
                                }`}
                              >
                                <svg
                                  fill="none"
                                  height="24"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
                                  viewBox="0 0 24 24"
                                  width="24"
                                >
                                  <path d="M6 9l6 6 6-6"></path>
                                </svg>
                              </span>
                            </div>
                            {openSubAccordion === faqIndex && (
                              <motion.div
                                className="mt-2 text-black"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={subAccordionTransition}
                              >
                                <p className={`${fontStyle.lightText}`}>
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQModal;
