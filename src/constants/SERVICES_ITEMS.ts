import {
  FaHouseUser,
  FaUsers,
  FaCartPlus,
  FaShoppingBasket,
} from 'react-icons/fa';
import { GrNotes } from 'react-icons/gr';
import { LuAlignStartVertical } from 'react-icons/lu';
import { SiAdafruit, SiGraphql } from 'react-icons/si';
import { PiBasketBold } from 'react-icons/pi';
import { MdPriceChange } from 'react-icons/md';
import { LiaFileContractSolid } from 'react-icons/lia';
import { FaFileCircleMinus } from 'react-icons/fa6';

export const SERVICES_ITEMS: ServicesItem[] = [
  { key: 'dashboard', Icon: FaHouseUser, number: 10, path: '/dashboard' },
  {
    key: 'userManagement',
    Icon: FaUsers,
    number: 20,
    path: '/user-management',
  },

  // Order Management
  {
    key: 'purchaseOrders',
    Icon: FaCartPlus,
    number: 15,
    path: '/orders/purchase-orders',
  },
  { key: 'grn', Icon: GrNotes, number: 30, path: '/orders/grn' },
  { key: 'rtv', Icon: LuAlignStartVertical, number: 30, path: '/orders/rtv' },
  {
    key: 'bookings',
    Icon: FaShoppingBasket,
    number: 18,
    path: '/orders/bookings',
  },
  { key: 'asn', Icon: SiAdafruit, number: 25, path: '/orders/asn' },

  // Item Management
  {
    key: 'newItemListing',
    Icon: PiBasketBold,
    number: 5,
    path: '/item-management/new-item',
  },
  {
    key: 'priceChange',
    Icon: MdPriceChange,
    number: 18,
    path: '/item-management/price-change',
  },

  // Finance
  {
    key: 'deductions',
    Icon: FaFileCircleMinus,
    number: 25,
    path: '/finance/deduction',
  },
  {
    key: 'contracts',
    Icon: LiaFileContractSolid,
    number: 15,
    path: '/finance/contracts',
  },

  // Promotions
  { key: 'promos', Icon: PiBasketBold, number: 30, path: '/promotion/promos' },
  {
    key: 'priceChange',
    Icon: MdPriceChange,
    number: 18,
    path: '/promotion/price-change',
  },

  {
    key: 'sales',
    Icon: SiGraphql,
    number: 5,
    path: '/promotion/price-change',
  },
];
