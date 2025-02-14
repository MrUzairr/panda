import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import Headset from '@assets/icons/HeadsetIcon';
import SunIcon from '@assets/icons/SunIcon';
import HeaderCss from '@components/layout/Header/Header.module.css';
import WebsiteLogo from '@assets/images/temporaryLogo.png';
import { LANGUAGE_DROPDOWN_ITEMS } from '@constants/index';
import SocialPlatforms from '@components/common/SocialPlatforms';
import FeedbackModal from '@components/common/FeedbackModal';
import { useTheme } from '@context/ThemeContext';
import HeaderNavigation from './HeaderNavigation';
import MoonIcon from '@assets/icons/MoonIcon';
import Loader from '@components/common/Loader/loader';
import fontStyle from '@styles/fontStyle.module.css';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const dropdownFade = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 100, friction: 25 },
  });

  const handleLanguageChange = (languageCode: string) => {
    setLoading(true);
    setTimeout(() => {
      i18n.changeLanguage(languageCode);
      const dir = i18n.dir(languageCode);
      document.documentElement.dir = dir;
      document.documentElement.lang = languageCode;
      setSelectedLanguage(languageCode);
      document.cookie = `language=${languageCode}; path=/; max-age=2592000`;
      setLoading(false);
    }, 1000);
  };
  const handleModeToogle = () => {
    toggleTheme();
  };

  return (
    <>
      <Loader loading={loading} />
      <div className={`flex w-full flex-row ${HeaderCss.headerSection}`}>
        <div
          className={` ${theme === 'light' ? 'border-[0.5px] border-solid border-[#a0c23b]' : ''} align-start border-solid-1 ms-3 flex w-[53px] flex-col justify-start gap-2 bg-headerMenuItemBackgroundColor px-1 pt-5 text-headerMenuItemColor md:ms-5 ${theme === 'light' ? HeaderCss.menuItems : ''}`}
        >
          <div
            className="dropdown dropdown-hover cursor-pointer"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div
              className="ms-1 inline-flex cursor-pointer items-center justify-center"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#a0c23b] px-3 text-[13px] font-semibold text-[#ffffff] dark:bg-white dark:text-secondary">
                {selectedLanguage.toUpperCase()}
              </button>

              <FontAwesomeIcon
                icon={faChevronDown}
                width={13}
                className="mt-[0.5px] px-[0.4px] text-lg"
              />
            </div>
            {isDropdownOpen && (
              <animated.div
                style={dropdownFade}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="left-70 absolute z-10 mt-[0px] w-40 rounded-lg bg-white shadow-lg"
              >
                <div className="py-1">
                  {LANGUAGE_DROPDOWN_ITEMS.map((language) => (
                    <div
                      key={language.code}
                      className={`mb-2 flex cursor-pointer rounded px-3 py-1 ${
                        selectedLanguage === language.code
                          ? `${fontStyle.boldText} text-secondary`
                          : `${fontStyle.regularText} text-black`
                      }`}
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      <div
                        className={`mr-2 flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                          selectedLanguage === language.code
                            ? 'bg-secondary text-white'
                            : 'bg-gray-300 text-black'
                        }`}
                      >
                        {language.code.toUpperCase()}
                      </div>
                      <span
                        className={`${selectedLanguage === language.code ? fontStyle.boldText : fontStyle.regularText} ${i18n.language === 'ar' ? 'ms-2' : ''}`}
                      >
                        {language.name}
                      </span>

                      {selectedLanguage === language.code && (
                        <span
                          className={`${fontStyle.regularText} mx-2 ml-2 text-secondary`}
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

          <div
            className="ms-[-5px] flex h-[20px] cursor-pointer justify-center dark:h-[25px]"
            onClick={handleModeToogle}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </div>
          <div
            className="ms-[-5px] mt-[7px] flex cursor-pointer justify-center"
            onClick={handleOpenModal}
          >
            <Headset />
          </div>
        </div>
        <div className="align-center ms-1 flex h-[150px] w-[170px] justify-center rounded-b-xl bg-white pt-3 sm:h-[180px] sm:w-[130px]">
          <img
            className="h-[120px] w-[80px] sm:h-[140px] sm:w-[100px]"
            src={WebsiteLogo}
          />
        </div>

        <div className="flex w-full flex-col gap-0">
          <div className="flex justify-between">
            <div className="flex w-full flex-col justify-center align-middle">
              <div className="flex w-full">
                <HeaderNavigation />
              </div>
            </div>

            <div
              className={`mt-5 hidden justify-end md:flex ${i18n.language === 'ar' ? 'me-5' : ''}`}
            >
              <SocialPlatforms IconsGap={15} />
            </div>
          </div>
        </div>
        <FeedbackModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
}
