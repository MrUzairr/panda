import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TiArrowSortedDown } from 'react-icons/ti';
import fontStyle from '@styles/fontStyle.module.css';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@context/ThemeContext';

interface DropdownItem {
  Icon: React.ElementType;
  title: string;
  description: string;
  number: number;
}

interface DropdownProps {
  name: string;
  count: number;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ name, count, items }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`${fontStyle.regularText} mt-2 flex items-center text-[13px] ${
          isOpen ? 'text-red-500' : 'text-[#1F2937]'
        } hover:text-primary dark:text-white dark:hover:text-primary md:text-[17px]`}
      >
        <div
          className={`${fontStyle.regularText} me-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-primary p-[2px] px-1 text-[10px] text-white`}
        >
          {count}
        </div>
        {name}
        <TiArrowSortedDown
          className={`h-4 w-4 ${
            isOpen ? 'text-red-500' : 'text-[#1F2937]'
          } dark:text-white dark:hover:text-primary`}
        />
      </button>

      {isOpen && (
        <motion.div
          className={` ${theme === 'light' ? 'border-gray-200' : 'border-zinc-800'} z-[100000000] border ${t('dashboardHeader.new') == name && i18n.language === 'en' ? 'left-[0px]' : 'left-[-140px]'} ${t('dashboardHeader.new') == name && i18n.language === 'ar' ? 'right-[0px]' : 'right-[-140px]'} absolute mt-[-3px] w-[250px] max-w-[90vw] cursor-pointer rounded-xl bg-white shadow-lg dark:bg-[#2c2c2c] md:left-0 md:w-[300px]`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          // style={{ zIndex: 100000000, border: `${i18n.language === 'en' ?'1px solid #f2f2f2':'1px solid #242424'}`}
        >
          <ul className="max-h-[60vh] overflow-y-auto">
            {items.map((item, index) => (
              <li key={index}>
                <div
                  className={`flex px-4 py-3 text-sm ${
                    hoveredItemIndex === index
                      ? 'text-[#174707]'
                      : 'text-[#1F2937]'
                  } rounded-xl hover:bg-[#f1f1f1] dark:text-white dark:hover:bg-[#000000] dark:hover:text-[#A0C23B]`}
                  onMouseEnter={() => setHoveredItemIndex(index)}
                  onMouseLeave={() => setHoveredItemIndex(null)}
                >
                  <span className="mr-2 pt-1">
                    <item.Icon size={18} />
                  </span>
                  <div className="ms-2">
                    <div className="flex items-center pb-1">
                      <span className={`${fontStyle.boldText}`}>
                        {item.title}
                      </span>
                      <div
                        className={`${fontStyle.regularText} ${i18n.language === 'en' ? 'ml-1' : 'mr-1'} flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#A0C23B] p-[2px] px-1 text-[10px] text-white`}
                      >
                        {item.number}
                      </div>
                    </div>
                    <p
                      className={`text-xs text-gray-500 ${fontStyle.regularText}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
                {index !== items.length - 1 && (
                  <div className="mx-4 border-t border-gray-200 dark:border-gray-600" />
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
