import { useTranslation } from 'react-i18next';
import SocialPlatforms from '@components/common/SocialPlatforms';
import LeavesImage from '@assets/images/LeavesFlowers.png';
import { getCurrentYear } from '@utils/index';
import fontStyle from '@styles/fontStyle.module.css';
import { getEmailLink } from 'utils/index';
const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = getCurrentYear(i18n.language);
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = getEmailLink(); // Use window.location to trigger the mailto link
  };
  return (
    <footer className="mt-auto w-full py-4 text-white">
      <div className="w-full px-4">
        <div className="hidden w-full items-center justify-between md:flex">
          <p
            className={`flex-1 ${i18n.language === 'ar' ? 'text-[11px]' : 'text-sm'} cursor-pointer ps-[100px] text-center ${fontStyle.lightText} text-gray-400 hover:text-yellowGreenDark md:ms-5`}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: t('home.footer.copyright', { year: currentYear }),
              }}
            />
          </p>

          <a
            // href={getEmailLink()}
            onClick={handleEmailClick}
            className={`cursor-pointer text-sm text-gray-400 ${fontStyle.lightText} hover:text-yellowGreenDark`}
            title="Click to send an email"
          >
            care@panda.com.sa
          </a>
        </div>
        <div className="flex flex-col items-center space-y-4 md:hidden">
          <div>
            <img src={LeavesImage} height="700px" width="100%" />
          </div>
          <div>
            <a
              // href={getEmailLink()}
              onClick={handleEmailClick}
              className={`cursor-pointer text-[11.8px] ${fontStyle.lightText} text-gray-400 hover:text-yellowGreenDark dark:text-[#dfdfdf]`}
              title="Click to send an email"
            >
              care@panda.com.sa
            </a>
          </div>

          <div>
            <SocialPlatforms IconsGap={12} />
          </div>

          <div>
            <p
              className={`cursor-pointer text-center ${fontStyle.lightText} text-[11px] text-gray-400 hover:text-yellowGreenDark`}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: t('home.footer.copyright', { year: currentYear }),
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
