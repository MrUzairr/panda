import { QUICK_LINKS } from '@constants/index';

const QuickLinks = () => {
  return (
    <ul className="list-none space-y-2">
      {QUICK_LINKS.map((item) => (
        <li key={item.name}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-merriweather block cursor-pointer text-black no-underline transition-colors hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default QuickLinks;
