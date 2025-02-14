export {};

declare module 'js-cookie' {
  import Cookies from 'js-cookie';
  export default Cookies;
}

declare global {
  type HeaderItemType = {
    name: string;
    href: string;
    action?: string;
  };
  type Auth_Items_Type = {
    name: string;
    description: string;
    url?: string;
  };
  type dashboard_dropdown_items_type = {
    [key: string]: string[];
  };
  type FaqQuestion = {
    question: string;
    answer: string;
  };

  type FaqCategory = {
    name: string;
    questions: FaqQuestion[];
  };

  type FaqData_Type = FaqCategory[];
  type LoaderProps = {
    loading: boolean;
  };
  type LanguageDropdownItemType = {
    name: string;
    icon: string;
    code: string;
  };
  type UpdatesItemType = {
    id: number;
    image: string;
    label: string;
    date: string;
    content: string;
  };
  type OUR_VALUES_ITEMS = {
    heading: string;
    description: string;
    icon: string;
  };
  type HeroSectionCardType = {
    title: string;
    description: string;
    icon: string;
  };
  type ServicesItem = {
    key: string;
    Icon: React.ElementType;
    number: number;
    path: string;
  };
}
