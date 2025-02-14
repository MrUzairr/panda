import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import FaqModal from '@components/common/FaqModal';
import { useTranslation } from 'react-i18next';
import fontStyle from '@styles/fontStyle.module.css';
import Loader from '@components/common/Loader/loader';
import UpdatesModal from '@components/common/UpdatesModal';

const HeaderNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const headerItems = t('home.headerItems', {
    returnObjects: true,
  }) as HeaderItemType[];

  const dropdownRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [modals, setModals] = useState({
    faq: false,
    updates: false,
  });
  const handleModalToggle = (
    modalKey: keyof typeof modals,
    isOpen: boolean,
  ) => {
    setModals((prev) => ({ ...prev, [modalKey]: isOpen }));
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLinkClick = (href: string) => {
    if (href === '#') return;
    setLoading(true);
    setTimeout(() => {
      window.open(href, '_blank');
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <nav className="w-full">
        <div className={`flex items-center justify-end p-4 md:justify-start`}>
          <div className="hidden items-center space-x-4 md:flex">
            {headerItems.map(
              (
                item: { name: string; href: string; action?: string },
                index: number,
              ) => (
                <React.Fragment key={item.name}>
                  <motion.a
                    onClick={() => {
                      if (
                        item.name === 'FAQS' ||
                        item.name === 'الأسئلة المتكررة'
                      ) {
                        handleModalToggle('faq', true);
                      } else if (
                        item.name === 'UPDATES' ||
                        item.name === 'التحديثات'
                      ) {
                        handleModalToggle('updates', true);
                      } else {
                        handleLinkClick(item.href);
                      }
                    }}
                    className={`text-md cursor-pointer ${i18n.language === 'en' ? '' : 'me-4'} hover:text-headerItemsHoverColor ${item.name === 'HOME' || item.name === 'الرئيسية' ? `${fontStyle.boldText} text-primary` : `${fontStyle.regularText} text-headerItemsColor`}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                  </motion.a>
                  {index < headerItems.length - 1 && (
                    <div
                      className="h-6 w-[1px] bg-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ),
            )}
          </div>

          <div className="flex justify-start md:hidden">
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="text-headerItemsColor focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RxCross2 className="text-4xl" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hamburger"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                ref={dropdownRef}
                className={`absolute cursor-pointer ${i18n.language === 'ar' ? 'left-0' : 'right-0'} z-50 me-[10px] mt-10 w-48 rounded-md bg-yellowGreenLight shadow-lg`}
              >
                {headerItems.map((item) => (
                  <li key={item.name}>
                    <motion.a
                      onClick={() => {
                        if (
                          item.name === 'FAQS' ||
                          item.name === 'الأسئلة المتكررة'
                        ) {
                          handleModalToggle('faq', true);
                        } else if (
                          item.name === 'UPDATES' ||
                          item.name === 'التحديثات'
                        ) {
                          handleModalToggle('updates', true);
                        } else {
                          handleLinkClick(item.href);
                        }
                      }}
                      className={`block cursor-pointer px-4 py-2 hover:text-headerItemsHoverColor ${item.name === 'HOME' || item.name === 'الرئيسية' ? `${fontStyle.boldText} text-md text-primary` : `text-secondary ${fontStyle.regularText} text-sm`}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
        <UpdatesModal
          isOpen={modals.updates}
          onClose={() => handleModalToggle('updates', false)}
        />
        <FaqModal
          isOpen={modals.faq}
          onClose={() => handleModalToggle('faq', false)}
        />
      </nav>
    </>
  );
};

export default HeaderNavigation;
