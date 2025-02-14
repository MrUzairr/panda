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

const iconMap = {
  dashboard: FaHouseUser,
  userManagement: FaUsers,
  purchaseOrders: FaCartPlus,
  grn: GrNotes,
  rtv: LuAlignStartVertical,
  bookings: FaShoppingBasket,
  asn: SiAdafruit,
  newItemListing: PiBasketBold,
  priceChange: MdPriceChange,
  deductions: FaFileCircleMinus,
  contracts: LiaFileContractSolid,
  promos: PiBasketBold,
  sales: SiGraphql,
};

export default iconMap;
