import React, { useEffect, useState } from 'react';
import Sidebar from '@components/common/Sidebar';
import Header from '@components/common/Header';
import SocialPlatforms from '@components/common/SocialPlatforms';
import { useTheme } from '@context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
  handleFullScreen: () => void;
  isFullScreen: boolean;
  exitFullScreen: () => void;
}

const MainLayout: React.FC<LayoutProps> = ({
  children,
  handleFullScreen,
  isFullScreen,
  exitFullScreen,
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const { i18n } = useTranslation();
  return (
    <div className="flex h-screen bg-[#ffffff] dark:bg-[#181819]">
      <Sidebar />
      <div
        className={` flex flex-1 flex-col transition-all duration-500 xl:ms-0`}
        style={{
          ...(i18n.language === 'en' ? { marginLeft: open ? 0 : 85 } : {}),
          ...(i18n.language === 'ar' ? { marginRight: open ? 0 : 85 } : {}),
        }}
      >
        <Header
          handleFullScreen={handleFullScreen}
          isFullScreen={isFullScreen}
          exitFullScreen={exitFullScreen}
        />
        <main
          className={`flex flex-grow overflow-y-auto ${theme == 'light' ? 'bg-[#F2F2F3]' : 'bg-[#252525]'} `}
        >
          {children}
        </main>
      </div>

      <div
        className={`fixed bottom-0 z-0 ${i18n.language === 'ar' ? 'left-1 rounded-br-xl rounded-tr-xl justify-start' : 'right-1 rounded-bl-xl rounded-tl-xl justify-end'} flex h-[40px] w-[150px]  bg-[#f2f2f2] py-3 text-white dark:bg-[#3f3f3f] md:dark:bg-transparent lg:shadow-none`}
      >
        <SocialPlatforms IconsGap={13} />
      </div>
    </div>
  );
};

const NoSidebarLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex-1">
      {children}

      <div className="fixed bottom-5 right-5">
        <SocialPlatforms IconsGap={15} />
      </div>
    </main>
  );
};

export { MainLayout, NoSidebarLayout };
