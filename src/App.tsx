import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '@pages/Home';
import PurchaseOrders from '@pages/PurchaseOrders';
import Asn from '@pages/Orders/Asn';
import Bookings from '@pages/Orders/Bookings';
import Contracts from '@pages/Finance/Contracts';
import Deductions from '@pages/Finance/Deductions';
import Grn from '@pages/Orders/Grn';
import NewItem from '@pages/ItemManagement/NewItem';
import PriceChange from '@pages/ItemManagement/PriceChange';
import PriceChangePromo from '@pages/Promotion/PriceChangePromo';
import Promos from '@pages/Promotion/Promos';
import Rtv from '@pages/Orders/Rtv';
import UserManagement from '@pages/UserManagement';
import Dashboard from '@pages/Dashboard';
import NotFound from '@pages/NotFound';
import Services from '@pages/Services';
import { MainLayout, NoSidebarLayout } from 'MainLayout';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
const isLoggedIn = true;

const App: React.FC = () => {
  const handle = useFullScreenHandle();
  return (
    <Router>
      <FullScreen handle={handle}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Home />} />
          <Route
            path="/services"
            element={
              <Services
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              />
            }
          />
          <Route
            path="/orders/purchase-orders"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <PurchaseOrders />
              </MainLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/user-management"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <UserManagement />
              </MainLayout>
            }
          />
          <Route
            path="/orders/grn"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Grn />
              </MainLayout>
            }
          />
          <Route
            path="/orders/rtv"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Rtv />
              </MainLayout>
            }
          />
          <Route
            path="/orders/bookings"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Bookings />
              </MainLayout>
            }
          />
          <Route
            path="/orders/asn"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Asn />
              </MainLayout>
            }
          />
          <Route
            path="/item-management/new-item"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <NewItem />
              </MainLayout>
            }
          />
          <Route
            path="/item-management/price-change"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <PriceChange />
              </MainLayout>
            }
          />
          <Route
            path="/finance/deduction"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Deductions />
              </MainLayout>
            }
          />
          <Route
            path="/finance/contracts"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Contracts />
              </MainLayout>
            }
          />
          <Route
            path="/promotions/promos"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <Promos />
              </MainLayout>
            }
          />
          <Route
            path="/promotions/price-change"
            element={
              <MainLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <PriceChangePromo />
              </MainLayout>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <NoSidebarLayout
                handleFullScreen={handle.enter}
                isFullScreen={handle.active}
                exitFullScreen={handle.exit}
              >
                <NotFound />
              </NoSidebarLayout>
            }
          />
        </Routes>
      </FullScreen>
    </Router>
  );
};

export default App;
