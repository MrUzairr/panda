import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Footer from '@components/layout/Footer';
import Navbar from '@components/layout/Header';
import HomeModuleCss from '@pages/Home/Home.module.css';
import SignInModal from '@components/common/SignInModal';
import { useTheme } from '@context/ThemeContext';
import LightModeHeroSectionImage from '@assets/images/LightModeResponsiveHeroSectionImage.png';
import DarkModeHeroSectionImage from '@assets/images/DarkModeResponsiveHeroSectionImage.png';
import { useTranslation } from 'react-i18next';
import Loader from '@components/common/Loader/loader';
import fontStyle from '@styles/fontStyle.module.css';
const Home = () => {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const authItems = t('home.authItems', {
    returnObjects: true,
  }) as Auth_Items_Type[];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = (itemName: string, itemUrl?: string) => {
    if (itemName === 'Sign In' || itemName === 'تسجيل الدخول') {
      setIsModalOpen(true);
    } else if ((itemName === 'Register' || itemName === 'تسجيل') && itemUrl) {
      setLoading(true);
      setTimeout(() => {
        window.open(itemUrl, '_blank');
        setLoading(false);
      }, 1000);
    }
  };
  const [activeLanguage] = useState(i18n.language);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <div
        className={`${theme === 'light' ? '' : HomeModuleCss.HomePageBackgroundImage} flex min-h-screen flex-col overflow-auto`}
      >
        <Navbar />

        <div className="flex flex-grow flex-col justify-center overflow-auto">
          <div className="mb-[0px] flex h-[200px] w-full md:mb-[100px] md:h-[280px] lg:ps-[90px] xl:mt-[-10px] xl:ps-[140px]">
            <div
              className={`${i18n.language === 'ar' ? 'md:ps-[8%] md:pt-[50px] lg:pt-[63px] xl:pt-[47px]' : 'md:mt-10 md:ps-[5%] lg:pt-[40px] xl:pt-[38px]'} mt-0 flex h-[100%] w-full flex-col justify-center ps-0 align-middle md:ms-0 md:w-[50%] lg:justify-start`}
            >
              <h1
                className={`ms-0 flex justify-center pt-5 align-middle ${fontStyle.boldText} text-4xl text-heroSectionTextColor md:ms-[40px] md:justify-start md:text-5xl md:font-bold lg:text-6xl xl:text-7xl`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('home.hero.heading'),
                  }}
                />
              </h1>
              <h2
                className={`${fontStyle.boldText} ms-0 ${activeLanguage === 'ar' ? 'mt-7 md:ms-[41px]' : 'mt-4 md:ms-[55px]'} flex justify-center text-3xl text-[#A0C23B] sm:ms-0 md:justify-start`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('home.hero.subHeading'),
                  }}
                />
              </h2>
            </div>
            <div className="md:mt:0 hidden h-[100%] w-full md:me-[4%] md:flex md:w-[50%] md:justify-start lg:mt-9 lg:pe-[9%] xl:mt-9">
              <img
                src={
                  theme == 'light'
                    ? LightModeHeroSectionImage
                    : DarkModeHeroSectionImage
                }
                alt="Panda Cube"
                height={700}
                className={` ${HomeModuleCss.heroSectionImage} `}
              />
            </div>
          </div>
          <div
            className={`${
              theme === 'light'
                ? `${HomeModuleCss.authCardsLightModeBackground}`
                : `${HomeModuleCss.authCardsDarkModeBackground}`
            } mt-0 flex h-[90px] w-full flex-grow flex-wrap items-center justify-center md:mt-0 md:flex-grow-0`}
          >
            {authItems.map((item) => (
              <motion.div
                key={item.name}
                className={`mx-[2.4px] mt-0 flex ${activeLanguage === 'ar' ? `${HomeModuleCss.darkModeAuthCards}` : `${HomeModuleCss.lightModeAuthCards}`} cursor-pointer items-center justify-center rounded-[20px] border-[1.78px] border-yellowGreenDark bg-yellowGreenLight bg-opacity-100 px-[0.3px] py-1 dark:border-white dark:bg-white dark:bg-opacity-40 md:mx-2 md:flex-none`}
                onClick={() => handleOpenModal(item.name, item.url)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <motion.h3
                    className={`font-regular mb-2 px-0 ${fontStyle.boldText} text-heroSectionTextColor md:font-[500px] ${
                      activeLanguage === 'en'
                        ? 'text-[17px] md:text-2xl'
                        : 'text-[13px] md:text-[22px]'
                    } `}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                  </motion.h3>
                  <motion.p
                    className={`${activeLanguage === 'en' ? 'text-[10px] md:text-[13px]' : 'text-[11px] md:text-[11px] lg:text-[15px]'} px-0 ${fontStyle.lightText} text-heroSectionTextColor`}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <SignInModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
