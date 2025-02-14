import React from 'react';
import { useTheme } from '@context/ThemeContext';
import UserManagementModuleCss from './UserManagement.module.css';

const UserManagement: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme == 'light' ? UserManagementModuleCss.UserManagementLightModeBackground : 'bg-[#252525]'} m-0 h-screen p-0`}
    >
      <div className="flex w-full justify-center text-[24px] text-primary">
        Welcome to the User Management
      </div>
    </div>
  );
};

export default UserManagement;
