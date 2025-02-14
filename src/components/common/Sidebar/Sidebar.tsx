import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appleLogoImage from '@assets/images/ServicesAssets/appleLogo.png';
import { FaHouseUser } from 'react-icons/fa';
import { MdPriceChange } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import { FaCircleChevronRight, FaUsers } from 'react-icons/fa6';
import Cookies from 'js-cookie';
import { BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { FaCartPlus } from 'react-icons/fa6';
import { GrNotes } from 'react-icons/gr';
import { FaCircleChevronLeft } from 'react-icons/fa6';

import { LuAlignStartVertical } from 'react-icons/lu';
import { FaShoppingBasket } from 'react-icons/fa';
import { LiaFileContractSolid } from 'react-icons/lia';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { BsProjectorFill } from 'react-icons/bs';
import { FaFileCircleMinus } from 'react-icons/fa6';
import { PiBasketBold } from 'react-icons/pi';
import { FaRegHourglassHalf } from 'react-icons/fa6';
import { SiAdafruit } from 'react-icons/si';
import { IoIosArrowUp } from 'react-icons/io';
import { motion } from 'framer-motion';
import fontStyle from '@styles/fontStyle.module.css';
import SideBarModuleCss from './Sidebar.module.css';
import { useTheme } from '@context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(
    Cookies.get('activeMenu') || 'Dashboard',
  );
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(
    Cookies.get('activeSubMenu') || null,
  );

  const [textVisible, setTextVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.set('activeMenu', selectedMenu || '', { expires: 1 });
    Cookies.set('activeSubMenu', selectedSubMenu || '', { expires: 1 });
  }, [selectedMenu, selectedSubMenu]);

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

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setTextVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setTextVisible(false);
    }
  }, [open]);
  const Menus = [
    {
      title: t('sidebar.dashboard'),
      src: <FaHouseUser size={20} />,
      link: '/dashboard',
    },
    {
      title: t('sidebar.userManagement'),
      src: <FaUsers size={20} />,
      link: '/user-management',
    },
    {
      title: t('sidebar.orderManagement'),
      src: <BiSolidPurchaseTagAlt size={20} />,
      subMenu: [
        {
          title: t('sidebar.purchaseOrders'),
          src: <FaCartPlus size={15} />,
          link: '/orders/purchase-orders',
        },
        {
          title: t('sidebar.grn'),
          src: <GrNotes size={15} />,
          link: '/orders/grn',
        },
        {
          title: t('sidebar.rtv'),
          src: <LuAlignStartVertical size={15} />,
          link: '/orders/rtv',
        },
        {
          title: t('sidebar.bookings'),
          src: <FaShoppingBasket size={15} />,
          link: '/orders/bookings',
        },
        {
          title: t('sidebar.asn'),
          src: <SiAdafruit size={15} />,
          link: '/orders/asn',
        },
      ],
      gap: true,
    },
    {
      title: t('sidebar.itemManagement'),
      src: <FaRegHourglassHalf size={20} />,
      subMenu: [
        {
          title: t('sidebar.newItemListing'),
          src: <PiBasketBold size={15} />,
          link: '/item-management/new-item',
        },
        {
          title: t('sidebar.priceChange'),
          src: <MdPriceChange size={15} />,
          link: '/item-management/price-change',
        },
      ],
      gap: true,
    },
    {
      title: t('sidebar.finance'),
      src: <BsProjectorFill size={20} />,
      subMenu: [
        {
          title: t('sidebar.deductions'),
          src: <FaFileCircleMinus size={15} />,
          link: '/finance/deduction',
        },
        {
          title: t('sidebar.contracts'),
          src: <LiaFileContractSolid size={15} />,
          link: '/finance/contracts',
        },
      ],
      gap: true,
    },
    {
      title: t('sidebar.promotions'),
      src: <AiOutlineFundProjectionScreen size={20} />,
      subMenu: [
        {
          title: t('sidebar.promos'),
          src: <PiBasketBold size={15} />,
          link: '/promotions/promos',
        },
        {
          title: t('sidebar.priceChange'),
          src: <MdPriceChange size={15} />,
          link: '/promotions/price-change',
        },
      ],
      gap: true,
    },
  ];

  const handleMenuClick = (
    menu: string,
    hasSubMenu: boolean,
    link?: string,
  ) => {
    if (hasSubMenu) {
      // Toggle submenu without changing the active menu selection
      setOpenMenu(openMenu === menu ? null : menu);
    } else {
      // Set active selection for non-submenu items
      setSelectedMenu(menu);
      setSelectedSubMenu(null);
      if (link) navigate(link);
    }
  };

  const handleSubMenuClick = (subMenu: string, link: string) => {
    setSelectedSubMenu(subMenu);
    setSelectedMenu(null);
    navigate(link);
  };

  return (
    <motion.div
      className={`fixed top-0 h-screen ${theme == 'light' ? SideBarModuleCss.animatedLightModeGradient : SideBarModuleCss.animatedDarkModeGradient} pt-2 ${window.innerWidth < 1200 ? (i18n.language === 'ar' ? 'right-0 z-50' : 'left-0 z-50') : 'relative'}`}
      animate={{ width: open ? 258 : 85 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <div
        className={`border-1 absolute ${i18n.language === 'ar' ? '-left-2' : '-right-2'} top-9 z-[10] w-4 cursor-pointer rounded-full ${
          !open && 'rotate-180'
        }`}
        style={{ backgroundColor: '#f6f6f6' }}
        onClick={() => setOpen(!open)}
      >
        {i18n.language === 'ar' ? (
          <FaCircleChevronRight
            className={`rounded-full ${SideBarModuleCss.sidebarCircularArrowContainer}`}
          />
        ) : (
          <FaCircleChevronLeft
            className={`rounded-full ${SideBarModuleCss.sidebarCircularArrowContainer}`}
          />
        )}
      </div>

      <div
        className={` ${SideBarModuleCss.LogoBouncing} flex items-center gap-x-2 ps-5`}
        style={{
          height: '50px',
        }}
      >
        <img
          src={appleLogoImage}
          width={45}
          height={45}
          className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`}
          onClick={() => navigate('/services')}
        />
        {textVisible && (
          <h1
            className={`origin-left pt-3 text-[22px] text-xl ${fontStyle.boldText} text-[black] dark:text-[white] ${
              !open && 'scale-0'
            }`}
          >
            Panda Cube
          </h1>
        )}
      </div>
      <ul className="w-full">
        {Menus.map((Menu, index) => (
          <div key={index}>
            <li
              className={`${SideBarModuleCss.menuItem} group flex w-full cursor-pointer items-center rounded-md py-1 hover:bg-[#ededed] hover:text-[#A0C23B] dark:hover:bg-[#102816] dark:hover:text-[#A0C23B] ${
                selectedMenu === Menu.title ||
                (Menu.subMenu &&
                  Menu.subMenu.some((sub) => selectedSubMenu === sub.title))
                  ? 'bg-[#efefef] text-[#A0C23B] dark:bg-[#11340a]'
                  : 'text-[#1F2937]'
              } `}
              onClick={() =>
                handleMenuClick(Menu.title, !!Menu.subMenu, Menu.link)
              }
            >
              <div
                className={`flex items-center gap-x-4 ps-5 text-[15px] ${
                  selectedMenu === Menu.title ||
                  (Menu.subMenu &&
                    Menu.subMenu.some((sub) => selectedSubMenu === sub.title))
                    ? 'text-red-500'
                    : 'text-[#1F2937]'
                } ${!open ? 'w-12' : 'w-auto'}`}
              >
                <span
                  className={`${
                    selectedMenu === Menu.title ||
                    (Menu.subMenu &&
                      Menu.subMenu.some((sub) => selectedSubMenu === sub.title))
                      ? 'text-[#0c5b07] dark:text-[#A0C23B]'
                      : 'text-[#1F2937]'
                  } text-[0px] group-hover:text-[#0c5b07] dark:text-[#ffffff] dark:group-hover:text-[#A0C23B]`}
                >
                  {Menu.src}
                </span>
                {textVisible && (
                  <span
                    className={`${!open && 'hidden'} origin-left text-[15.5px] ${fontStyle.regularText} ${
                      selectedMenu === Menu.title ||
                      (Menu.subMenu &&
                        Menu.subMenu.some(
                          (sub) => selectedSubMenu === sub.title,
                        ))
                        ? 'text-[#0c5b07] dark:text-[#A0C23B]'
                        : 'text-[#1F2937]'
                    } group-hover:text-[#0c5b07] dark:text-[#ffffff] dark:group-hover:text-[#A0C23B]`}
                  >
                    {Menu.title}
                  </span>
                )}
              </div>

              {Menu.subMenu && (
                <div
                  className={`me-[10px] mt-[2px] text-[#d5d5d5] ${i18n.language === 'ar' ? 'mr-auto' : 'ml-auto'} `}
                >
                  {Menu.subMenu && openMenu === Menu.title ? (
                    <IoIosArrowUp size={17} color="black" />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                  {/* <HiDotsVertical size={12} /> */}
                </div>
              )}
            </li>

            {Menu.subMenu && openMenu === Menu.title && (
              <motion.div
                className={` ${i18n.language === 'ar' ? SideBarModuleCss.subMenuArabic : SideBarModuleCss.subMenuEng} pl-4`}
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: '500px', opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {Menu.subMenu.map((subItem, index) => (
                  <Link
                    key={index}
                    to={subItem.link}
                    className={`${i18n.language === 'ar' ? SideBarModuleCss.subMenuItemArabic : SideBarModuleCss.subMenuItemEng} group block rounded py-[1.5px] text-left hover:bg-[#f4f4f4] hover:text-[#A0C23B] dark:hover:bg-[#102816] dark:hover:text-primary ${fontStyle.boldText} ${selectedSubMenu === subItem.title ? 'text-red-500' : ''} `}
                    onClick={() =>
                      handleSubMenuClick(subItem.title, subItem.link)
                    }
                  >
                    <div
                      className={`mt-1 flex items-center gap-x-1 ${open ? 'ms-3' : 'ms-1'}`}
                    >
                      <span
                        className={`group-hover:text-[#A0C23B] dark:text-[#ffffff] ${selectedSubMenu === subItem.title ? 'text-[#A0C23B]' : 'text-[#1F2937]'}`}
                      >
                        {subItem.src}
                      </span>
                      {textVisible && open && (
                        <span
                          className={`text-md text-[13px] group-hover:text-[#A0C23B] dark:text-[#ffffff] ${selectedSubMenu === subItem.title ? 'text-[#A0C23B]' : 'text-[#1F2937]'} `}
                        >
                          {subItem.title}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
