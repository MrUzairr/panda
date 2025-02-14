import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Bell, Settings, User, LogOut } from 'lucide-react';
import fontStyle from '@styles/fontStyle.module.css';
import { useTheme } from '@context/ThemeContext';

import OffcanvasSearch from '@components/AdvanceSearch';
import { MdFullscreen } from 'react-icons/md';
import { animated } from '@react-spring/web';
import { MdFullscreenExit } from 'react-icons/md';
import { useSpring } from '@react-spring/web';

import { FaMoon } from 'react-icons/fa';

import { IoMdSunny } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useTranslation } from 'react-i18next';
import { LANGUAGE_DROPDOWN_ITEMS } from '@constants/LANGUAGE_DROPDOWN_ITEMS';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Dropdown from '@components/Dropdown/Dropdown';
import { useOrderItems } from '@constants/ORDER_ITEMS';

interface HeaderPops {
  handleFullScreen: () => void;
  isFullScreen: boolean;
  exitFullScreen: () => void;
}

const Header: React.FC<HeaderPops> = ({
  handleFullScreen,
  isFullScreen,
  exitFullScreen,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { toggleTheme, theme } = useTheme();
  const {
    orderCounts,
    NEW_ORDER_ITEMS,
    NEAR_EXPIRY_ORDER_ITEMS,
    CLOSED_ORDER_ITEMS,
  } = useOrderItems();
  const handleModeToogle = () => {
    toggleTheme();
  };

  const dropdownFade = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 100, friction: 25 },
  });

  const navigate = useNavigate();

  const [isSearchOpen, setSearchOpen] = useState(false);

  const handleSearch = (searchData: any) => {
    console.log('Search Data:', searchData);
  };
  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    const dir = i18n.dir(languageCode);
    document.documentElement.dir = dir;
    document.documentElement.lang = languageCode;
    setSelectedLanguage(languageCode);
    document.cookie = `language=${languageCode}; path=/; max-age=2592000`;
  };

  const breadcrumbs = location.pathname
    .split('/')
    .filter(Boolean)
    .map((crumb, index, arr) => {
      const words = crumb.toLowerCase().split('-');

      const formattedCrumb = words
        .map((word, i) =>
          i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join('');

      return {
        name: formattedCrumb,
        path: `/${arr.slice(0, index + 1).join('/')}`,
      };
    });

  const isFirstCrumbClickable =
    breadcrumbs.length === 1 ||
    !location.pathname.includes(breadcrumbs[0].name.toLowerCase());

  return (
    <header className="shadow-md dark:bg-[#181819]">
      <div
        className={`flex flex-col-reverse items-center justify-between bg-[#ffffff] px-1 py-2 dark:bg-[#181819] md:flex-row md:px-5 lg:px-10`}
      >
        <div className="flex w-full justify-center space-x-2 md:mt-0 md:justify-start md:space-x-3">
          <Dropdown
            name={t('dashboardHeader.new')}
            count={orderCounts.new_orders_count}
            items={NEW_ORDER_ITEMS}
          />

          <button
            className={`${fontStyle.regularText} mt-2 flex items-center text-[13px] text-[#1F2937] hover:text-primary dark:text-white dark:hover:text-primary md:text-[17px]`}
          >
            <div
              className={`${fontStyle.regularText} me-1 mt-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-primary p-[2px] px-1 text-[10px] text-white`}
            >
              {orderCounts.seen_count}
            </div>

            {t('dashboardHeader.seen')}
          </button>

          <div className="">
            <Dropdown
              name={t('dashboardHeader.nearExpiry')}
              count={orderCounts.near_expiry_orders_count}
              items={NEAR_EXPIRY_ORDER_ITEMS}
            />
          </div>

          <div className="">
            <Dropdown
              name={t('dashboardHeader.closed')}
              count={4}
              items={CLOSED_ORDER_ITEMS}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-end space-x-2 md:w-[60%]">
          <button
            className="text-secondary hover:text-primary dark:text-white"
            onClick={isFullScreen ? exitFullScreen : handleFullScreen}
          >
            {isFullScreen ? (
              <MdFullscreenExit size={25} className="hover:text-primary" />
            ) : (
              <MdFullscreen size={25} className="hover:text-primary" />
            )}
          </button>

          <button className="text-secondary hover:text-primary dark:text-white">
            <Home className="h-5 w-5 hover:text-primary" />
          </button>
          <button className="text-secondary hover:text-primary dark:text-white">
            <Bell className="h-5 w-5 hover:text-primary" />
          </button>
          <button
            className="text-secondary hover:text-primary dark:text-white"
            onClick={handleModeToogle}
          >
            {theme === 'light' ? (
              <FaMoon
                size={17}
                className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
              />
            ) : (
              <IoMdSunny
                size={22}
                className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
              />
            )}
          </button>
          <button className="text-secondary hover:text-primary dark:text-white">
            <Settings className="h-5 w-5 hover:text-primary" />
          </button>
          {/* Language Conversion */}

          <div
            className="dropdown dropdown-hover mx-0 w-8 cursor-pointer"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div
              className="inline-flex cursor-pointer items-center justify-center"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <button className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0e5a0d] text-[12px] font-semibold text-[#ffffff] dark:bg-white dark:text-secondary">
                {selectedLanguage.toUpperCase()}
              </button>

              <FontAwesomeIcon
                icon={faChevronDown}
                width={13}
                className="text-lg"
              />
            </div>
            {isDropdownOpen && (
              <animated.div
                style={dropdownFade}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className={`absolute ${i18n.language === 'ar' ? 'left-10' : 'right-20'} w-35 z-10 rounded-lg bg-[#fcfcfc] shadow-lg`}
              >
                <div className="py-1">
                  {LANGUAGE_DROPDOWN_ITEMS.map((language) => (
                    <div
                      key={language.code}
                      className={`flex cursor-pointer rounded px-3 py-1 ${
                        selectedLanguage === language.code
                          ? `${fontStyle.boldText} text-secondary`
                          : `${fontStyle.regularText} text-black`
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <div
                        className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                          selectedLanguage === language.code
                            ? 'bg-secondary text-white'
                            : 'bg-gray-300 text-black'
                        }`}
                      >
                        {language.code.toUpperCase()}
                      </div>
                      <span
                        className={`${selectedLanguage === language.code ? fontStyle.boldText : fontStyle.regularText} text-[16px] ${i18n.language === 'ar' ? 'ms-2' : ''}`}
                      >
                        {language.name}
                      </span>

                      {selectedLanguage === language.code && (
                        <span
                          className={`${fontStyle.regularText} ml-2 text-[15px] text-secondary`}
                        >
                          ✔
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </animated.div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 cursor-pointer text-secondary hover:text-primary dark:text-white" />
            {/* <span className="text-[17px] text-secondary hover:text-primary dark:text-white">
              John
            </span> */}
          </div>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => navigate('/')}
          >
            <LogOut className="h-5 w-5 hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Breadcrumb Row */}
      <div
        className={`flex flex-col-reverse items-center justify-between border-gray-300 bg-[#F2F2F3] py-2 ps-[50px] hover:text-primary dark:border-s dark:border-black dark:bg-[#252525] dark:text-white md:flex-row md:px-10`}
        style={{
          borderRadius:
            i18n.language === 'ar'
              ? '0px 150px 00px 00px'
              : '150px 0px 0px 0px',
        }}
      >
        <nav className="flex w-full items-center justify-start space-x-1 text-[17px] text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index === 0 && !isFirstCrumbClickable ? (
                // First breadcrumb is not clickable
                <span
                  className={`${fontStyle.regularText} text-[14px] text-gray-600 dark:text-white`}
                >
                  {t(`sidebar.${crumb.name}`)}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className={`${fontStyle.regularText} text-[14px] text-secondary hover:text-primary hover:underline dark:text-white`}
                >
                  {t(`sidebar.${crumb.name}`)}
                </Link>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mt-1 hover:text-primary dark:text-white">
                  {'\u003E'}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className="flex items-center space-x-0">
          <button
            className={` ${fontStyle.regularText} px-4 py-1 text-[13px] text-secondary hover:bg-gray-100 hover:text-primary dark:bg-transparent dark:text-white dark:hover:text-primary md:text-[14px]`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {t('dashboardHeader.dc')}
          </button>
          <button
            className={`${fontStyle.regularText} px-4 py-1 text-[13px] text-secondary hover:bg-gray-100 hover:text-primary dark:bg-transparent dark:text-white dark:hover:text-primary md:text-[14px]`}
          >
            {t('dashboardHeader.store')}
          </button>
          <button
            className={`${fontStyle.regularText} px-4 py-1 text-[13px] text-secondary hover:bg-gray-200 hover:text-primary dark:bg-transparent dark:text-white dark:hover:text-primary md:text-[14px]`}
          >
            {t('dashboardHeader.all')}
          </button>
          <button
            className={`${fontStyle.regularText} group flex px-1 py-1 text-[13px] text-secondary hover:bg-gray-100 hover:text-primary dark:bg-transparent dark:text-white dark:hover:text-primary md:text-[14px]`}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="mt-1 h-[15px] group-hover:text-primary dark:bg-transparent dark:text-white dark:hover:text-[red]" />
            <span className="group-hover:text-primary">
              {t('dashboardHeader.search')}
            </span>
          </button>
        </div>
      </div>
      <OffcanvasSearch
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
        supplierId=""
      />
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setSearchOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
