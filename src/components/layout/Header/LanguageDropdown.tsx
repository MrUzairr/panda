import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { LANGUAGE_DROPDOWN_ITEMS } from '@constants/index';

function LanguageDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const handleSelect = (languageKey: string) => {
    setSelectedLanguage(languageKey);
  };

  return (
    <div className="group relative">
      {/* <button className="inline-flex items-center justify-center rounded-full bg-primary px-2 py-1 text-sm font-semibold text-white transition-colors hover:bg-[#bb0a0a]">
        <FontAwesomeIcon icon={faGlobe} className="mr-1 text-xl" />{' '}
        {selectedLanguage}
        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-sm" />{' '}
      </button> */}
      <button className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-3 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-yellow-300">
        {/* Display the language code (AR/EN) */}
        <span className="text-xl">dddd{selectedLanguage}</span>
        <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-sm" />
      </button>

      <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-gray-200 opacity-0 shadow-lg transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <ul className="py-1">
          {LANGUAGE_DROPDOWN_ITEMS.filter(
            (item) => item.name !== selectedLanguage,
          ).map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleSelect(item.name)}
                className="block w-full px-4 py-2 font-merriweather text-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LanguageDropdown;
