import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { TbBrandLinkedinFilled } from 'react-icons/tb';
import { RiInstagramFill } from 'react-icons/ri';

type IconComponent = React.ComponentType<{ size?: number; color?: string }>;

type SocialPlatform = {
  name: string;
  link: string;
  Icon: IconComponent;
  alt: string;
  color?: string;
};

const SOCIAL_MEDIA_PLATFORMS: SocialPlatform[] = [
  {
    name: 'instagram',
    link: 'https://www.instagram.com/pandasaudi/',
    Icon: RiInstagramFill,
    alt: 'Click here to navigate to our Instagram account',
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/company/azizia-panda-united-savola-group/',
    Icon: TbBrandLinkedinFilled,
    alt: 'Click here to navigate to our LinkedIn account',
  },
  {
    name: 'facebook',
    link: 'https://www.facebook.com/PandaSaudi',
    Icon: FaFacebookSquare,
    alt: 'Click here to navigate to our Facebook account',
  },
  {
    name: 'twitter',
    link: 'https://www.x.com/pandasaudi',
    Icon: FaSquareXTwitter,
    alt: 'Click here to navigate to our Twitter (X) account',
  },
];

export default SOCIAL_MEDIA_PLATFORMS;
