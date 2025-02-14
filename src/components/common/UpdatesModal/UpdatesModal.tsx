import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { TbBrandLinkedinFilled } from 'react-icons/tb';
import { RiInstagramFill } from 'react-icons/ri';
import fontStyle from '@styles/fontStyle.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import UpdatesModalCss from './UpdatesModal.module.css';
const UpdatesModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t, i18n } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const updatesItems = t('updates.cards', {
    returnObjects: true,
  }) as UpdatesItemType[];
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black bg-opacity-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={`z-60 relative max-h-screen w-full max-w-5xl overflow-hidden rounded-lg bg-[#fdfffa] px-6 pb-4 shadow-lg`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.4 }}
            ref={modalRef}
            style={{ borderRadius: '60px 60px 8px 60px' }}
          >
            {/* Header with close button */}
            <div className="z-10 flex h-[100px] w-full items-center justify-between bg-[#fdfffa] p-4 shadow-sm">
              <h2
                className={`text-3xl ${fontStyle.boldText} ${UpdatesModalCss.animatedText}`}
              >
                {t('updates.title')}
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

            {/* Scrollable Content Section */}
            <div className="flex max-h-[70vh] flex-col overflow-y-auto pb-5 scrollbar-thin scrollbar-track-white scrollbar-thumb-secondary">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {updatesItems.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`group relative flex flex-col overflow-hidden rounded-lg border border-gray-300 bg-[#f9f9f9] shadow-md transition-shadow duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.0 }}
                    style={{
                      transformOrigin: 'center',
                    }}
                  >
                    <div className="h-40 w-full overflow-hidden">
                      <motion.img
                        src={`${card.image}`}
                        alt={card.label}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="pb-4 pe-4 ps-4">
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          className={`rounded bg-updatesLabelBackgroundColor px-4 text-updatesLabelTextColor hover:bg-secondary hover:text-white ${i18n.language === 'en' ? 'py-2' : 'py-3'}`}
                        >
                          {card.label}
                        </button>
                        <div className="flex space-x-1 text-secondary">
                          <FaFacebookSquare
                            className={`cursor-pointer hover:text-primary ${i18n.language === 'ar' ? 'me-1' : ''}`}
                          />
                          <FaSquareXTwitter className="cursor-pointer hover:text-primary" />
                          <TbBrandLinkedinFilled className="cursor-pointer hover:text-primary" />
                          <RiInstagramFill className="cursor-pointer hover:text-primary" />
                        </div>
                      </div>
                      <h3
                        className={`mt-4 text-lg font-super-bold ${fontStyle.boldText} hover:text-secondary`}
                      >
                        {card.content}
                      </h3>
                    </div>
                    <div className="mt-auto pb-4 ps-4">
                      <span
                        className={`text-sm text-[#bbbbbb] ${fontStyle.regularText}`}
                      >
                        {card.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatesModal;
