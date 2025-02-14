import { useTranslation } from 'react-i18next';
import { AiOutlineBarChart } from 'react-icons/ai';
import { BsBarChartLineFill } from 'react-icons/bs';
import { FaClock, FaBox } from 'react-icons/fa';
import { IoAccessibilityOutline, IoBarChartOutline } from 'react-icons/io5';
import { LuFilePenLine } from 'react-icons/lu';
import { SiFuturelearn } from 'react-icons/si';
import { TiEyeOutline } from 'react-icons/ti';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useAxios } from '@hooks/useAxios';
import { useState, useEffect } from 'react';
export const useOrderItems = () => {
  const { t } = useTranslation();
  const { useAxiosRequest } = useAxios();
  const [orderCounts, setOrderCounts] = useState({
    new_orders_count: 0,
    seen_count: 0,
    near_expiry_orders_count: 0,
    expired_orders_count: 0,
    delivered_orders_count: 0,
    all_orders_count: 0,
  });
  
  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const response = await useAxiosRequest(
          '/order/counter/61832705',
          'GET',
        );
        if (response && response.data && response.data.length > 0) {
          setOrderCounts(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch order counts:', error);
      }
    };

    fetchOrderCounts();
  }, []);
  return {
    orderCounts,
    NEW_ORDER_ITEMS: [
      {
        key: 'allOrders',
        title: t('dashboardHeader.NewOrders.allOrders.title'),
        Icon: HiOutlineExclamationCircle,
        number: 1,
        description: t('dashboardHeader.NewOrders.allOrders.description'),
      },
      {
        key: 'todayOrders',
        title: t('dashboardHeader.NewOrders.todayOrders.title'),
        Icon: SiFuturelearn,
        number: 2,
        description: t('dashboardHeader.NewOrders.todayOrders.description'),
      },
      {
        key: 'last7DaysOrders',
        title: t('dashboardHeader.NewOrders.last7DaysOrders.title'),
        Icon: BsBarChartLineFill,
        number: 2,
        description: t('dashboardHeader.NewOrders.last7DaysOrders.description'),
      },
    ],
    NEAR_EXPIRY_ORDER_ITEMS: [
      {
        key: 'allExpiryOrders',
        title: t('dashboardHeader.NearExpiryOrders.allExpiryOrders.title'),
        Icon: AiOutlineBarChart,
        number: 1,
        description: t(
          'dashboardHeader.NearExpiryOrders.allExpiryOrders.description',
        ),
      },
      {
        key: 'expiringToday',
        title: t('dashboardHeader.NearExpiryOrders.expiringToday.title'),
        Icon: LuFilePenLine,
        number: 2,
        description: t(
          'dashboardHeader.NearExpiryOrders.expiringToday.description',
        ),
      },
      {
        key: 'expiringTomorrow',
        title: t('dashboardHeader.NearExpiryOrders.expiringTomorrow.title'),
        Icon: SiFuturelearn,
        number: 3,
        description: t(
          'dashboardHeader.NearExpiryOrders.expiringTomorrow.description',
        ),
      },
      {
        key: 'expiringIn7Days',
        title: t('dashboardHeader.NearExpiryOrders.expiringIn7Days.title'),
        Icon: FaClock,
        number: 4,
        description: t(
          'dashboardHeader.NearExpiryOrders.expiringIn7Days.description',
        ),
      },
    ],
    CLOSED_ORDER_ITEMS: [
      {
        key: 'allClosedOrders',
        title: t('dashboardHeader.ClosedOrders.allClosedOrders.title'),
        Icon: FaBox,
        number: 10,
        description: t(
          'dashboardHeader.ClosedOrders.allClosedOrders.description',
        ),
      },
      {
        key: 'closedToday',
        title: t('dashboardHeader.ClosedOrders.closedToday.title'),
        Icon: TiEyeOutline,
        number: 2,
        description: t('dashboardHeader.ClosedOrders.closedToday.description'),
      },
      {
        key: 'closedYesterday',
        title: t('dashboardHeader.ClosedOrders.closedYesterday.title'),
        Icon: IoAccessibilityOutline,
        number: 3,
        description: t(
          'dashboardHeader.ClosedOrders.closedYesterday.description',
        ),
      },
      {
        key: 'closedLast7Days',
        title: t('dashboardHeader.ClosedOrders.closedLast7Days.title'),
        Icon: IoBarChartOutline,
        number: 5,
        description: t(
          'dashboardHeader.ClosedOrders.closedLast7Days.description',
        ),
      },
      {
        key: 'olderClosedOrders',
        title: t('dashboardHeader.ClosedOrders.olderClosedOrders.title'),
        Icon: SiFuturelearn,
        number: 8,
        description: t(
          'dashboardHeader.ClosedOrders.olderClosedOrders.description',
        ),
      },
    ],
  };
};
