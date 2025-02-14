import React, { useState, useEffect } from 'react';
import {
  FaCaretDown,
  FaCaretUp,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaFilePdf,
  FaFileExcel,
  FaPrint,
} from 'react-icons/fa6';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import DashboardModuleCss from './Dashboard.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadModal from '@components/DownloadModal';
import { useAxios } from '@hooks/useAxios';

interface Site {
  name: string;
  housnumb: string;
  number: string;
}

interface Order {
  sr_number: number;
  order_number: string;
  potype: string;
  site: Site;
  order_on_date: string;
  not_after_date: string;
  day: string;
  value_in_sar: number;
  status: string;
  delivered: number;
}

const OrderDetails: React.FC = () => {
  // const orders: Order[] = [
  //   {
  //     sr_number: 1,
  //     order_number: 'ORD123456',
  //     potype: 'Standard',
  //     site: { name: 'Site A', housnumb: '123', number: '456' },
  //     order_on_date: '2025-01-15',
  //     not_after_date: '2025-01-20',
  //     day: 'SAT',
  //     value_in_sar: 1500.75,
  //     status: 'Pending',
  //     delivered: 65,
  //   },
  //   {
  //     sr_number: 2,
  //     order_number: 'ORD123457',
  //     potype: 'Express',
  //     site: { name: 'Site B', housnumb: '789', number: '101' },
  //     order_on_date: '2025-01-16',
  //     not_after_date: '2025-01-21',
  //     day: 'FRI',
  //     value_in_sar: 2000.5,
  //     status: 'Shipped',
  //     delivered: 90,
  //   },
  //   {
  //     sr_number: 3,
  //     order_number: 'ORD123458',
  //     potype: 'Standard',
  //     site: { name: 'Site C', housnumb: '456', number: '789' },
  //     order_on_date: '2025-01-17',
  //     not_after_date: '2025-01-22',
  //     day: 'SAT',
  //     value_in_sar: 800.25,
  //     status: 'Delivered',
  //     delivered: 100,
  //   },
  // ];

  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [selectedItems, setSelectedItems] = useState(new Set());
  // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleRowSelection = (srNumber: number) => {
    const updatedSelection = new Set(selectedItems);
    if (updatedSelection.has(srNumber)) {
      updatedSelection.delete(srNumber);
    } else {
      updatedSelection.add(srNumber);
    }
    setSelectedItems(updatedSelection);
  };
  const supplierId = 798293;
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { useAxiosRequest } = useAxios();
  const fetchOrders = async () => {
    const params = {
      per_page: itemsPerPage,
      page: currentPage,
      status: 'delivered',
      // Add optional query parameters here
      // date_to: '2025-01-31',
      // date_from: '2025-01-01',
      // city: 'RIYADH',
      // order_no: '',
    };

    try {
      const response = await useAxiosRequest(
        `/order/summary/${supplierId}`,
        'GET',
        null,
        params,
      );
      if (response.code === 0) {
        console.log(response.data.items);
        setOrders(response.data.items);
        setTotalPages(response.data.pages);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, itemsPerPage, supplierId]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(orders.map((order) => order.sr_number)));
    }
    setSelectAll(!selectAll);
  };

  const sortOrders = (
    orders: Order[],
    sortConfig: { key: string; direction: string },
  ) => {
    if (sortConfig.key === '') return orders;

    return [...orders].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Order];
      const bValue = b[sortConfig.key as keyof Order];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      } else if (typeof aValue === 'number') {
        return sortConfig.direction === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
      return 0;
    });
  };

  const getArrowClass = (columnKey: string, direction: string) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === direction ? 'text-red-500' : '';
    }
    return '';
  };

  // const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = sortOrders(orders, sortConfig).slice(
    startIndex,
    endIndex,
  );

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };
  const selectedOrders = Array.from(selectedItems).join(',');

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDownloadOption = (option: string) => {
    console.log(`Download as ${option}`);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="mx-auto w-full p-4">
      {/* Table for Large Screens */}
      <div className="hidden lg:block">
        <table className="w-full min-w-full border-collapse rounded-lg shadow-lg">
          <thead
            className={`${DashboardModuleCss.animatedLightModeGradient} text-white`}
          >
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-secondary accent-[#127600] focus:ring-[#083800]"
                />
              </th>
              <th className="px-4 py-3 text-left">
                <div>SR</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('sr_number')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('sr_number', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('sr_number', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div>Order No</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('order_number')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('order_number', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('order_number', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div>PO Type</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('potype')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('potype', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('potype', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="flex flex-col items-start px-4 py-3 text-left">
                <div>Site</div>
              </th>
              <th className="px-4 py-3 text-left">
                <div>Order On</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('order_on_date')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('order_on_date', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('order_on_date', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div>Not After</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('not_after_date')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('not_after_date', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('not_after_date', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="flex flex-col items-start justify-center px-4 py-3 text-left">
                <div>Day</div>
              </th>
              <th className="px-4 py-3 text-left">
                <div className="flex justify-center">Value in SAR</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('value_in_sar')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('value_in_sar', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('value_in_sar', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div>Status</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('status')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('status', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('status', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <div>Delivered</div>
                <div className="flex justify-center">
                  <button onClick={() => handleSort('delivered')}>
                    <FaCaretUp
                      className={`-mb-[9.5px] ${getArrowClass('delivered', 'asc')}`}
                      size={15}
                    />
                    <FaCaretDown
                      className={`${getArrowClass('delivered', 'desc')}`}
                      size={15}
                    />
                  </button>
                </div>
              </th>
              <th className="flex flex-col items-start px-4 py-3 text-left">
                <div>Actions</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.sr_number}
                className={`cursor-pointer border-b transition-all duration-300 hover:bg-[#eefff4] hover:text-blue-900 ${
                  selectedItems.has(order.sr_number)
                    ? 'bg-[#eefff4] dark:bg-[#252525] dark:text-white'
                    : 'bg-white dark:bg-[#3c3c3c] dark:text-white'
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(order.sr_number)}
                    onChange={() => handleRowSelection(order.sr_number)}
                    className="h-4 w-4 rounded border-gray-300 text-secondary accent-secondary focus:ring-secondary"
                  />
                </td>
                <td className="px-4 py-3">{order.sr_number}</td>
                <td className="px-4 py-3">{order.order_number}</td>
                <td className="px-4 py-3">{order.potype}</td>
                <td className="px-4 py-3">{`${order.site.name}, ${order.site.housnumb}, ${order.site.number}`}</td>
                <td className="px-4 py-3">{order.order_on_date}</td>
                <td className="px-4 py-3">{order.not_after_date}</td>
                <td className="px-4 py-3">{order.day}</td>
                <td className="px-4 py-3">{order.value_in_sar}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3">
                  <ProgressBar percentage={order.delivered} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={handleDownloadClick}
                    className="rounded bg-[#0c6c0c] px-4 py-2 text-white hover:bg-[#198f19]"
                  >
                    <FaDownload />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination and Dropdown */}
      <div className="mt-5 flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between rounded-lg border border-gray-300 bg-[#e8e8e8] px-4 py-2 shadow-sm transition-all duration-300 hover:border-[#e1e1e1] focus:border-secondary focus:outline-none focus:ring-0"
          >
            {itemsPerPage}
            <FaCaretDown
              className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-0 w-20 rounded-lg bg-white shadow-lg"
              >
                {[5, 10, 20].map((value) => (
                  <li
                    key={value}
                    onClick={() => {
                      setItemsPerPage(value);
                      setCurrentPage(1);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 text-center transition-colors hover:bg-[#f9f9f9]"
                  >
                    {value}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-lg bg-[#0a5a26] px-4 py-2 text-white disabled:bg-gray-300"
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === page
                  ? 'bg-[#0a5a26] text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="rounded-lg bg-blue-500 px-4 py-1 text-white disabled:bg-gray-300"
          >
            <FaChevronRight />
          </button>
        </nav>
      </div>

      {/* Cards for Small Screens */}
      <div className="block lg:hidden">
        {currentOrders.map((order) => (
          <div
            key={order.sr_number}
            className="mb-4 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <input
                type="checkbox"
                checked={selectedItems.has(order.sr_number)}
                onChange={() => handleRowSelection(order.sr_number)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="text-lg font-semibold">
                Order No: {order.order_number}
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Site:</span>{' '}
                {`${order.site.name}, ${order.site.housnumb}, ${order.site.number}`}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Order On:</span>{' '}
                {order.order_on_date}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">PO Type:</span> {order.potype}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Order On:</span>{' '}
                {order.order_on_date}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">PO Type:</span> {order.potype}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Not After:</span>{' '}
                {order.not_after_date}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span> {order.status}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Delivered:</span>{' '}
                <div className="w-[70%]">
                  <ProgressBar percentage={order.delivered} />
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleDownloadClick}
                  className="rounded bg-secondary px-4 py-2 text-white hover:bg-[#104a0b]"
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DownloadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onDownloadOption={handleDownloadOption}
        selectedOrders={selectedOrders}
      />
    </div>
  );
};

export default OrderDetails;
