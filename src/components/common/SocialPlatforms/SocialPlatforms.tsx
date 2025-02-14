import React from 'react';
import SOCIAL_MEDIA_PLATFORMS from '@services/socialMediaPlatforms';
import fontStyle from '@styles/fontStyle.module.css';
import styles from './SocialPlatforms.module.css';

interface SocialMediaIconsProps {
  IconsGap: number;
  servicesPage?: boolean;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({
  IconsGap = 3,
  servicesPage = false,
}) => {
  return (
    <div
      className={`${servicesPage ? '' : 'mr-5'} flex flex-row`}
      style={{ gap: `${IconsGap}px` }}
    >
      {SOCIAL_MEDIA_PLATFORMS.map((platform, index) => (
        <a
          key={platform.name}
          href={platform.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={platform.alt}
          style={{ textDecoration: 'none' }}
          className={`${fontStyle.boldText} text-headerItemsColor transition-colors duration-300 hover:text-headerItemsHoverColor`}
        >
          <div
            className={`${styles.iconWrapper}`}
            style={{
              transitionDelay: `${index * 0.1}s`, // Adds a slight delay to each icon for staggered animation
            }}
          >
            <platform.Icon size={17} color="currentColor" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
