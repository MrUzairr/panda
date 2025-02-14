// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronDown } from 'lucide-react';
// import { FaSearch } from 'react-icons/fa';
// import AdvanceSearchModuleCss from './AdvanceSearch.module.css';
// import fontStyle from '@styles/fontStyle.module.css';
// import { useTranslation } from 'react-i18next';

// interface OffcanvasSearchProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSearch: (searchData: any) => void;
// }

// interface SelectedOptions {
//   order: string;
//   location: string;
//   city: string;
//   poType: string;
//   sku: string;
//   orderStart: string;
//   orderEnd: string;
//   notAfterDate: string;
//   valuesInSar: string;
//   [key: string]: string;
// }

// const OffcanvasSearch: React.FC<OffcanvasSearchProps> = ({
//   isOpen,
//   onClose,
//   onSearch,
// }) => {
//   const { t, i18n } = useTranslation();
//   const today = new Date().toISOString().split('T')[0];
//   const minDate = '2025-01-01';

//   const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
//     order: '',
//     location: '',
//     city: '',
//     poType: '',
//     sku: '',
//     orderStart: '',
//     orderEnd: '',
//     notAfterDate: '',
//     valuesInSar: '',
//   });

//   const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose]);

//   const handleDropdownToggle = (field: string) => {
//     setDropdownOpen(dropdownOpen === field ? null : field);
//   };

//   const handleDropdownSelect = (field: string, value: string) => {
//     setSelectedOptions({ ...selectedOptions, [field]: value });
//     setDropdownOpen(null);
//   };

//   const handleSubmit = () => {
//     const searchData = { ...selectedOptions };

//     onSearch(searchData);
//     onClose();
//   };

//   const handleReset = () => {
//     setSelectedOptions({
//       order: '',
//       location: '',
//       city: '',
//       poType: '',
//       sku: '',
//       orderEnd: '',
//       orderStart: '',
//       notAfterDate: '',
//       valuesInSar: '',
//     });
//   };

//   return (
//     <motion.div
//       className={`fixed ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-0 z-50 h-full w-96 max-w-sm transform bg-[#ffffff] p-6 shadow-lg dark:bg-[#171717] ${isOpen && i18n.language === 'en' && 'translate-x-0'} ${!isOpen && i18n.language === 'en' && 'translate-x-full'} transition-transform duration-300 ${isOpen && i18n.language === 'ar' && 'translate-x-0'} ${!isOpen && i18n.language === 'ar' && '-translate-x-full'} `}
//     >
//       <motion.div
//         className={`absolute ${i18n.language === 'ar' ? 'right-[155px] translate-x-1/2' : 'left-[155px] -translate-x-1/2'} top-2 my-5`}
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
//       >
//         <FaSearch size={54} className="text-secondary dark:text-white" />
//       </motion.div>

//       <div
//         className="mt-16 pb-8 md:pb-0"
//         style={{
//           height: 'calc(100dvh - 4rem)',
//           overflowY: 'auto',
//         }}
//       >
//         {[
//           t('advancedSearch.order'),
//           t('advancedSearch.location'),
//           t('advancedSearch.city'),
//           t('advancedSearch.poType'),
//         ].map((label, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mb-3"
//           >
//             <label
//               className={`block ps-3 text-sm font-medium text-secondary dark:text-white ${fontStyle.regularText}`}
//             >
//               {label}
//             </label>
//             <div
//               className="relative focus:border-none focus:outline-none"
//               onClick={() => handleDropdownToggle(label.toLowerCase())}
//             >
//               <div
//                 className={`${AdvanceSearchModuleCss.searchInputFields} w-full cursor-pointer border p-2 ps-3 text-secondary dark:text-[#ebebeb] ${fontStyle.regularText} ${
//                   dropdownOpen === label.toLowerCase()
//                     ? 'dark:bg-[black]'
//                     : 'bg-transparent'
//                 }`}
//               >
//                 {selectedOptions[label.toLowerCase()] ||
//                   `${t('advancedSearch.select')} ${label}`}
//                 <ChevronDown
//                   size={16}
//                   className={`absolute ${i18n.language === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 transform text-gray-500`}
//                 />
//               </div>
//               {dropdownOpen === label.toLowerCase() && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   style={{ borderRadius: '15px' }}
//                   className={`${i18n.language === 'ar' ? 'right-0' : 'left-0'} absolute top-full z-10 mt-1 w-full bg-[#e4ffde] shadow-lg dark:bg-[black] dark:text-[#c8dbc6]`}
//                 >
//                   <div style={{ borderRadius: '15px' }}>
//                     {['option1', 'option2', 'option3'].map((item, index) => (
//                       <div
//                         key={index}
//                         className={`cursor-pointer p-2 ps-5 hover:bg-[#d6ffad] dark:hover:bg-[#310606]${
//                           selectedOptions[label.toLowerCase()] === item
//                             ? 'text-white dark:bg-[#220b0b] dark:text-[#ff5e5e]'
//                             : ''
//                         }`}
//                         style={{ borderRadius: '15px 15px' }}
//                         onClick={() =>
//                           handleDropdownSelect(label.toLowerCase(), item)
//                         }
//                       >
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         ))}

//         <div className="mb-3 flex gap-4">
//           {[t('advancedSearch.orderStart'), t('advancedSearch.orderEnd')].map(
//             (label, index) => (
//               <div key={index} className="w-1/2">
//                 <label
//                   className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
//                 >
//                   {label}
//                 </label>
//                 <input
//                   type="date"
//                   className={`${AdvanceSearchModuleCss.searchInputFields} w-full border border-gray-300 bg-transparent p-2 ps-2 text-gray-700 dark:text-[#ebebeb]`}
//                   min={minDate}
//                   max={label === 'Order Start' ? today : undefined}
//                   onClick={(e) => {
//                     if ((e.target as HTMLInputElement).showPicker) {
//                       (e.target as HTMLInputElement).showPicker();
//                     }
//                   }}
//                   value={
//                     selectedOptions[
//                       label.toLowerCase() as keyof SelectedOptions
//                     ] || ''
//                   }
//                   onChange={(e) => {
//                     setSelectedOptions({
//                       ...selectedOptions,
//                       [label.toLowerCase()]: e.target.value,
//                     });
//                   }}
//                 />
//               </div>
//             ),
//           )}
//         </div>

//         {/* Not After Date */}
//         <div className="mb-3">
//           <label
//             className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
//           >
//             {t('advancedSearch.notAfterDate')}
//           </label>
//           <input
//             type="date"
//             className={`${AdvanceSearchModuleCss.searchInputFields} w-full border border-gray-300 bg-transparent p-2 ps-2 text-gray-700 dark:text-[#ebebeb]`}
//             min={minDate}
//             value={selectedOptions.notAfterDate}
//             onClick={(e) => {
//               if ((e.target as HTMLInputElement).showPicker) {
//                 (e.target as HTMLInputElement).showPicker(); // Force open date picker
//               }
//             }}
//             onChange={(e) => {
//               setSelectedOptions({
//                 ...selectedOptions,
//                 notAfterDate: e.target.value,
//               });
//             }}
//           />
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="mb-3"
//         >
//           <label
//             className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
//           >
//             {t('advancedSearch.sku')}
//           </label>
//           <div className="relative" onClick={() => handleDropdownToggle('sku')}>
//             <div
//               className={`${AdvanceSearchModuleCss.searchInputFields} w-full cursor-pointer border border-gray-300 p-2 ps-4 text-gray-700 dark:text-[#ebebeb] ${
//                 dropdownOpen === 'sku' ? 'bg-transparent' : 'bg-transparent'
//               } ${i18n.language === 'ar' ? `mt-1 py-3 text-[11px]` : ''} `}
//             >
//               {selectedOptions.sku ||
//                 t('advancedSearch.valuesInSarFieldPlaceholder')}
//             </div>
//             {dropdownOpen === 'sku' && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="shadow-1xl absolute left-0 top-full z-10 mt-1 w-full bg-[#e4ffde] dark:bg-[black] dark:text-[#ebebeb]"
//                 style={{
//                   borderRadius: '15px',
//                 }}
//               >
//                 <div>
//                   {['sku1', 'sku2', 'sku3'].map((item, index) => (
//                     <div
//                       key={index}
//                       className={`cursor-pointer p-2 ps-5 hover:bg-[#d6ffad] dark:hover:bg-[#310606] ${
//                         selectedOptions.sku === item
//                           ? 'bg-blue-500 text-white'
//                           : ''
//                       }`}
//                       style={{
//                         borderRadius: '15px',
//                       }}
//                       onClick={() => handleDropdownSelect('sku', item)}
//                     >
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>

//         {/* Values in SAR */}
//         <div className="mb-3">
//           <label
//             className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
//           >
//             {t('advancedSearch.valuesInSar')}
//           </label>
//           <input
//             type="text"
//             className={`${AdvanceSearchModuleCss.searchInputFields} ${i18n.language === 'ar' ? `${AdvanceSearchModuleCss.arabicSearchInputFields} mt-1` : ''} w-full bg-transparent p-2 ps-4 text-gray-700 dark:text-[#ebebeb]`}
//             placeholder={t('advancedSearch.valuesInSarFieldPlaceholder')}
//             value={selectedOptions.valuesInSar}
//             onChange={(e) => {
//               setSelectedOptions({
//                 ...selectedOptions,
//                 valuesInSar: e.target.value,
//               });
//             }}
//           />
//         </div>

//         <div className="mt-4 flex gap-4">
//           <button
//             className={`${AdvanceSearchModuleCss.searchControlButtons} w-1/2 bg-primary py-2 text-[#ebebeb] hover:bg-gray-700`}
//             onClick={handleReset}
//           >
//             {t('advancedSearch.resetButton')}
//           </button>
//           <button
//             className={`${AdvanceSearchModuleCss.searchControlButtons} w-1/2 bg-secondary py-2 text-[#ebebeb] hover:bg-[#0c3f0c]`}
//             onClick={handleSubmit}
//           >
//             {t('advancedSearch.searchButton')}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default OffcanvasSearch;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FaSearch } from 'react-icons/fa';
import AdvanceSearchModuleCss from './AdvanceSearch.module.css';
import fontStyle from '@styles/fontStyle.module.css';
import { useTranslation } from 'react-i18next';
import { useAxios } from '@hooks/useAxios';

interface OffcanvasSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchData: any) => void;
  supplierId: string; // Add supplierId to props
}

interface SelectedOptions {
  order: string;
  location: string;
  city: string;
  poType: string;
  sku: string;
  orderStart: string;
  orderEnd: string;
  notAfterDate: string;
  valuesInSar: string;
  [key: string]: string;
}

const OffcanvasSearch: React.FC<OffcanvasSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  supplierId = 798293,
}) => {
  const { t, i18n } = useTranslation();
  const today = new Date().toISOString().split('T')[0];
  const minDate = '2025-01-01';

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    order: '',
    location: '',
    city: '',
    poType: '',
    sku: '',
    orderStart: '',
    orderEnd: '',
    notAfterDate: '',
    valuesInSar: '',
  });

  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  const { useAxiosRequest } = useAxios();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    // Fetch cities data
    console.log('supplier ', supplierId);
    const fetchDropdownItems = async () => {
      try {
        const response1 = await useAxiosRequest(`/address/city`, 'GET');
        setCities(response1.data);

        const response2 = await useAxiosRequest(
          `/address/site/${supplierId}`,
          'GET',
        );
        setLocations(response2.data);
      } catch (error) {
        console.error('Failed to fetch order counts:', error);
      }
    };
    fetchDropdownItems();
  }, [supplierId]);

  const handleDropdownToggle = (field: string) => {
    setDropdownOpen(dropdownOpen === field ? null : field);
  };

  const handleDropdownSelect = (field: string, value: string) => {
    setSelectedOptions({ ...selectedOptions, [field]: value });
    setDropdownOpen(null);
  };

  const handleSubmit = () => {
    const searchData = { ...selectedOptions };

    onSearch(searchData);
    onClose();
  };

  const handleReset = () => {
    setSelectedOptions({
      order: '',
      location: '',
      city: '',
      poType: '',
      sku: '',
      orderEnd: '',
      orderStart: '',
      notAfterDate: '',
      valuesInSar: '',
    });
  };

  return (
    <motion.div
      className={`fixed ${i18n.language === 'ar' ? 'left-0' : 'right-0'} top-0 z-50 h-full w-96 max-w-sm transform bg-[#ffffff] p-6 shadow-lg dark:bg-[#171717] ${isOpen && i18n.language === 'en' && 'translate-x-0'} ${!isOpen && i18n.language === 'en' && 'translate-x-full'} transition-transform duration-300 ${isOpen && i18n.language === 'ar' && 'translate-x-0'} ${!isOpen && i18n.language === 'ar' && '-translate-x-full'} `}
    >
      <motion.div
        className={`absolute ${i18n.language === 'ar' ? 'right-[155px] translate-x-1/2' : 'left-[155px] -translate-x-1/2'} top-2 my-5`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <FaSearch size={54} className="text-secondary dark:text-white" />
      </motion.div>

      <div
        className="mt-16 pb-8 md:pb-0"
        style={{
          height: 'calc(100dvh - 4rem)',
          overflowY: 'auto',
        }}
      >
        {[
          t('advancedSearch.order'),
          t('advancedSearch.location'),
          t('advancedSearch.city'),
          t('advancedSearch.poType'),
        ].map((label, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-3"
          >
            <label
              className={`block ps-3 text-sm font-medium text-secondary dark:text-white ${fontStyle.regularText}`}
            >
              {label}
            </label>
            <div
              className="relative focus:border-none focus:outline-none"
              onClick={() => handleDropdownToggle(label.toLowerCase())}
            >
              <div
                className={`${AdvanceSearchModuleCss.searchInputFields} w-full cursor-pointer border p-2 ps-3 text-secondary dark:text-[#ebebeb] ${fontStyle.regularText} ${
                  dropdownOpen === label.toLowerCase()
                    ? 'dark:bg-[black]'
                    : 'bg-transparent'
                }`}
              >
                {selectedOptions[label.toLowerCase()] ||
                  `${t('advancedSearch.select')} ${label}`}
                <ChevronDown
                  size={16}
                  className={`absolute ${i18n.language === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 transform text-gray-500`}
                />
              </div>
              {dropdownOpen === label.toLowerCase() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderRadius: '15px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                  className={`${i18n.language === 'ar' ? 'right-0' : 'left-0'} absolute top-full z-10 mt-1 w-full bg-[#f2fcef] shadow-lg dark:bg-[black] dark:text-[#c8dbc6]`}
                >
                  <div style={{ borderRadius: '15px' }}>
                    {label.toLowerCase() === 'city' &&
                      cities.map((city, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer p-2 ps-5 hover:bg-[#f4fced] dark:hover:bg-[#310606]${
                            selectedOptions[label.toLowerCase()] === city
                              ? 'text-white dark:bg-[#220b0b] dark:text-[#ff5e5e]'
                              : ''
                          }`}
                          style={{ borderRadius: '15px 15px' }}
                          onClick={() =>
                            handleDropdownSelect(label.toLowerCase(), city)
                          }
                        >
                          {city}
                        </div>
                      ))}
                    {label.toLowerCase() === 'location' &&
                      locations.map((location, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer p-2 ps-5 hover:bg-[#d6ffad] dark:hover:bg-[#310606]${
                            selectedOptions[label.toLowerCase()] ===
                            location.location_name
                              ? 'text-white dark:bg-[#220b0b] dark:text-[#ff5e5e]'
                              : ''
                          }`}
                          style={{ borderRadius: '15px 15px' }}
                          onClick={() =>
                            handleDropdownSelect(
                              label.toLowerCase(),
                              location.location_name,
                            )
                          }
                        >
                          {location.location_name}
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}

        <div className="mb-3 flex gap-4">
          {[t('advancedSearch.orderStart'), t('advancedSearch.orderEnd')].map(
            (label, index) => (
              <div key={index} className="w-1/2">
                <label
                  className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
                >
                  {label}
                </label>
                <input
                  type="date"
                  className={`${AdvanceSearchModuleCss.searchInputFields} w-full border border-gray-300 bg-transparent p-2 ps-2 text-gray-700 dark:text-[#ebebeb]`}
                  min={minDate}
                  max={label === 'Order Start' ? today : undefined}
                  onClick={(e) => {
                    if ((e.target as HTMLInputElement).showPicker) {
                      (e.target as HTMLInputElement).showPicker();
                    }
                  }}
                  value={
                    selectedOptions[
                      label.toLowerCase() as keyof SelectedOptions
                    ] || ''
                  }
                  onChange={(e) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      [label.toLowerCase()]: e.target.value,
                    });
                  }}
                />
              </div>
            ),
          )}
        </div>

        {/* Not After Date */}
        <div className="mb-3">
          <label
            className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
          >
            {t('advancedSearch.notAfterDate')}
          </label>
          <input
            type="date"
            className={`${AdvanceSearchModuleCss.searchInputFields} w-full border border-gray-300 bg-transparent p-2 ps-2 text-gray-700 dark:text-[#ebebeb]`}
            min={minDate}
            value={selectedOptions.notAfterDate}
            onClick={(e) => {
              if ((e.target as HTMLInputElement).showPicker) {
                (e.target as HTMLInputElement).showPicker(); // Force open date picker
              }
            }}
            onChange={(e) => {
              setSelectedOptions({
                ...selectedOptions,
                notAfterDate: e.target.value,
              });
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-3"
        >
          <label
            className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
          >
            {t('advancedSearch.sku')}
          </label>
          <div className="relative" onClick={() => handleDropdownToggle('sku')}>
            <div
              className={`${AdvanceSearchModuleCss.searchInputFields} w-full cursor-pointer border border-gray-300 p-2 ps-4 text-gray-700 dark:text-[#ebebeb] ${
                dropdownOpen === 'sku' ? 'bg-transparent' : 'bg-transparent'
              } ${i18n.language === 'ar' ? `mt-1 py-3 text-[11px]` : ''} `}
            >
              {selectedOptions.sku ||
                t('advancedSearch.valuesInSarFieldPlaceholder')}
            </div>
            {dropdownOpen === 'sku' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="shadow-1xl absolute left-0 top-full z-10 mt-1 w-full bg-[#e4ffde] dark:bg-[black] dark:text-[#ebebeb]"
                style={{
                  borderRadius: '15px',
                }}
              >
                <div>
                  {['sku1', 'sku2', 'sku3'].map((item, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer p-2 ps-5 hover:bg-[#d6ffad] dark:hover:bg-[#310606] ${
                        selectedOptions.sku === item
                          ? 'bg-blue-500 text-white'
                          : ''
                      }`}
                      style={{
                        borderRadius: '15px',
                      }}
                      onClick={() => handleDropdownSelect('sku', item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Values in SAR */}
        <div className="mb-3">
          <label
            className={`block ps-3 text-sm text-secondary ${fontStyle.regularText} dark:text-[#ebebeb]`}
          >
            {t('advancedSearch.valuesInSar')}
          </label>
          <input
            type="text"
            className={`${AdvanceSearchModuleCss.searchInputFields} ${i18n.language === 'ar' ? `${AdvanceSearchModuleCss.arabicSearchInputFields} mt-1` : ''} w-full bg-transparent p-2 ps-4 text-gray-700 dark:text-[#ebebeb]`}
            placeholder={t('advancedSearch.valuesInSarFieldPlaceholder')}
            value={selectedOptions.valuesInSar}
            onChange={(e) => {
              setSelectedOptions({
                ...selectedOptions,
                valuesInSar: e.target.value,
              });
            }}
          />
        </div>

        <div className="mt-4 flex gap-4">
          <button
            className={`${AdvanceSearchModuleCss.searchControlButtons} w-1/2 bg-primary py-2 text-[#ebebeb] hover:bg-gray-700`}
            onClick={handleReset}
          >
            {t('advancedSearch.resetButton')}
          </button>
          <button
            className={`${AdvanceSearchModuleCss.searchControlButtons} w-1/2 bg-secondary py-2 text-[#ebebeb] hover:bg-[#0c3f0c]`}
            onClick={handleSubmit}
          >
            {t('advancedSearch.searchButton')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OffcanvasSearch;
