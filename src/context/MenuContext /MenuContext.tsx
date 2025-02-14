import React, { createContext, useContext, useState } from 'react';

interface MenuContextProps {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  activeSubMenu: string | null;
  setActiveSubMenu: (submenu: string | null) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);
interface SidebarProps {
  children: React.ReactNode;
}

export const MenuProvider: React.FC<SidebarProps> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  return (
    <MenuContext.Provider
      value={{ activeMenu, setActiveMenu, activeSubMenu, setActiveSubMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
};
