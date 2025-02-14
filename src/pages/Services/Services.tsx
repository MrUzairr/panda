import { animated, useSpring } from '@react-spring/web';
import AppleLogoImage from '@assets/images/ServicesAssets/appleLogo.png';
import ServicesModuleCss from './Services.module.css';
import fontStyle from '@styles/fontStyle.module.css';
import { FaHome, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoIosNotifications, IoMdSunny } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdFullscreen, MdFullscreenExit, MdLogout } from 'react-icons/md';
import CookingImage from '@assets/images/ServicesAssets/ServiceImage.png';
import DarkModeServiceImage from '@assets/images/ServicesAssets/DarkModeServiceImage.png';
import SupLogoImage from '@assets/images/ServicesAssets/SupLogoImage.png';
import DarkModeSupLogoImage from '@assets/images/ServicesAssets/DarkModeSupLogoImage.png';
import { useTheme } from '@context/ThemeContext';
import { SERVICES_ITEMS } from '@constants/SERVICES_ITEMS';

import { motion } from 'framer-motion';
import SocialPlatforms from '@components/common/SocialPlatforms';
import Loader from '@components/common/Loader/loader';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_DROPDOWN_ITEMS } from '@constants/LANGUAGE_DROPDOWN_ITEMS';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface HeaderPops {
  handleFullScreen: () => void;
  isFullScreen: boolean;
  exitFullScreen: () => void;
}

const Services: React.FC<HeaderPops> = ({
  handleFullScreen,
  isFullScreen,
  exitFullScreen,
}) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { toggleTheme, theme } = useTheme();
  const handleModeToogle = () => {
    toggleTheme();
  };

  const dropdownFade = useSpring({
    opacity: isDropdownOpen ? 1 : 0,
    transform: isDropdownOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 100, friction: 25 },
  });

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    const dir = i18n.dir(languageCode);
    document.documentElement.dir = dir;
    document.documentElement.lang = languageCode;
    setSelectedLanguage(languageCode);
    document.cookie = `language=${languageCode}; path=/; max-age=2592000`;
  };

  const handleNavigation = (path: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 3000);
  };

  return (
    <>
      <Loader loading={loading} />

      <div className="sticky top-0 z-10 flex items-center bg-[#f8fbf7] px-4 py-2 shadow-md dark:bg-[#0f0f0f] md:px-6 lg:px-8">
        <div
          className={`${ServicesModuleCss.LogoBouncing} flex w-1/3 items-center lg:w-1/4`}
        >
          <img height={50} width={50} src={AppleLogoImage} alt="Apple Logo" />
          <h1
            className={`text-lg md:text-xl lg:text-2xl ${fontStyle.boldText} tracking-wide text-secondary dark:text-white`}
          >
            Cube
          </h1>
        </div>

        <div
          className={`flex w-2/3 items-center justify-end md:w-3/4 ${theme === 'light' ? 'space-x-2 md:space-x-2' : 'space-x-1 md:space-x-[7.3px]'} `}
        >
          <FaHome
            size={20}
            className={`cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary ${i18n.language === 'ar' ? 'me-2' : 'ms-2'} `}
          />
          <CgProfile
            size={20}
            className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
          />
          <IoIosNotifications
            size={20}
            className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
          />
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
          <div
            onClick={handleModeToogle}
            className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {theme === 'light' ? (
              <FaMoon
                size={18}
                className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
              />
            ) : (
              <IoMdSunny
                size={21}
                className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
              />
            )}
          </div>
          <IoSettingsSharp
            size={20}
            className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
          />

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
                className={`absolute ${i18n.language === 'ar' ? 'left-10' : 'right-10'} z-10 w-40 rounded-lg bg-white shadow-lg`}
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

          <MdLogout
            onClick={() => navigate('/')}
            size={20}
            className="cursor-pointer text-[#252525] hover:text-primary dark:text-white dark:hover:text-primary"
          />
        </div>
      </div>
      <div
        className={`flex h-screen justify-center overflow-auto pt-[40px] align-middle xl:overflow-hidden ${theme === 'light' ? ServicesModuleCss.servicesLightModeBackground : ServicesModuleCss.servicesDarkModeBackground} `}
      >
        {/* Main Content */}
        <div className={`grid grid-cols-1 lg:grid-cols-[330px,1fr]`}>
          {/* Side Panel */}
          <div
            className={`flex h-auto flex-col bg-[#f8fbf7] pt-5 dark:bg-transparent lg:sticky lg:top-[64px] lg:h-[710px] ${i18n.language === 'ar' ? 'pe-5 lg:ps-[70px]' : 'ps-5 lg:ps-10'} `}
          >
            <div className="flex flex-row md:flex-col">
              <img
                src={theme === 'light' ? SupLogoImage : DarkModeSupLogoImage}
                alt="Sup Logo"
                className="w-40"
              />
              <div className="mt-5 flex w-full flex-col justify-center">
                <h1
                  className={`text-md md:ps-14 ${fontStyle.boldText} text-secondary dark:text-[red]`}
                >
                  BINZAGR
                </h1>
                <h6
                  className={`text-sm md:ps-11 ${fontStyle.regularText} text-[#50725B] dark:text-[#ec930de0]`}
                >
                  {t('services.member')}
                </h6>
              </div>
            </div>
            <div>
              <h1
                className={` ${fontStyle.boldText} mt-5 w-full text-4xl ${theme === 'light' ? 'text-[#5d5d5d]' : ServicesModuleCss.animatedServicesWelcomeText} `}
              >
                {t('services.welcomeText')}
              </h1>
              <h5
                className={`mt-2 text-lg text-[#9dc429] ${fontStyle.regularText}`}
              >
                {t('services.subLogoLine')}
              </h5>
            </div>
            <div className="mt-3 w-full">
              <h1
                className={`${fontStyle.regularText} text-2xl font-semibold ${theme === 'light' ? 'text-[#2b2b2b]' : 'text-[#00ff26]'}`}
              >
                {t('services.latestUpdates')}
              </h1>
              <div className="mt-4 flex w-full flex-col gap-2 pe-4">
                {[...Array(5)].map((_, index) => (
                  <hr
                    key={index}
                    className="h-3 w-full border-gray-400 dark:border-[#38ba31]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="grid h-auto w-full grid-cols-2 pb-[100px] ps-2 pt-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:ms-10 xl:w-[1000px] xl:grid-cols-6 xl:pb-20 xl:pt-3">
            {SERVICES_ITEMS.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  className={`flex flex-col md:w-[200px] ${ServicesModuleCss.bouncing}`}
                  onClick={() => handleNavigation(item.path)}
                  initial={{ scale: 1, y: 0 }}
                  animate={{ scale: 1.05, y: -10 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <motion.div
                    className="relative m-0 h-[150px] w-[150px] cursor-pointer p-0"
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <img
                      className="h-full w-full rounded-lg object-cover"
                      src={
                        theme === 'light' ? CookingImage : DarkModeServiceImage
                      }
                      alt={t(item.key)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-white dark:text-[#44ff41]">
                      <item.Icon size={30} />
                    </div>
                    <div
                      className={`text-md dark:text-#3a3a3a absolute bottom-0 right-0 flex h-[40px] w-[45px] items-center justify-center rounded-full bg-[#2f2f2f] text-center font-bold text-[#6ace30] dark:bg-[#1c6219] ${fontStyle.regularText}`}
                      style={{
                        borderRadius: '20px 15px 00px 20px',
                      }}
                    >
                      {t(`services.servicesItems.${item.key}.number`)}
                    </div>
                  </motion.div>

                  <h1
                    className={`mb-3 ps-10 text-sm font-bold ${fontStyle.regularText} cursor-pointer text-gray-700 dark:text-[#cacaca]`}
                  >
                    {t(`services.servicesItems.${item.key}.name`)}
                  </h1>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={` ${i18n.language === 'ar' ? ServicesModuleCss.socialMediaIconArabic : ServicesModuleCss.socialMediaIcon} justify-end bg-[#efefef] py-1 text-white dark:bg-[#3f3f3f] md:dark:bg-transparent lg:shadow-none xl:w-[200px]`}
      >
        <SocialPlatforms IconsGap={15} />
      </div>
    </>
  );
};

export default Services;
