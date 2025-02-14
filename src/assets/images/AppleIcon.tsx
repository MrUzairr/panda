import React from 'react';
import { IconProps } from '@interfaces/Icons';
const AppleIcon: React.FC<IconProps> = ({
  color = 'white',
  width = '200',
  height = '116',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.2"
      viewBox="0 0 20 11"
      width={width}
      height={height}
      style={{ fill: color }}
    >
      <title>signin</title>
      <defs>
        <image
          width="32"
          height="33"
          id="img1"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAMAAACP+FljAAAAAXNSR0IB2cksfwAAAWVQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////JBh0kQAAAHd0Uk5TADaExNe+dSEnp/D/W/RV5RjulwMlOT4uFJP2Ndrz+ebShgoH6Zk0tiMXcvzrBmDoMI/hcb8terjs/a5eRqMBCwgE2857QzI3K2MvsW9fm6bySiTBEYtZFv49z39S2GXqMWvQuTNqr23FHOJUgaTxoRLvGkmO1AnYa+VVAAABmElEQVR4nGNkwAUYoQCHNAdU6icOBTyM/2AGYZXn+wtjsWBVIMD4C8ZkR1IgDHbTCyBL8hNMjB/hSFEWZsZ3UEWMz2GiUrehCtQYn8BNkn33FcYU4boOUaDF+AAur8jIeBfKVGG8APGF4S0kF6qfM74BYWkynoZ40+wqsheYmCVATnsiy3gUxAUqsDmP6kmjwwx2jI/lDkB4jAyOjCfRgsEC7JMdMAWehxiwAvttEAV2RzlgQg5AfYfhYeiyEaLAnXM31Huq64FkEMxoBl2ZNWAFodugAt6rwFT4iTcQvi/jcrACdWgQ+i+DKozeAGUELgEriF0H4fLBwh/u6+BFYAXxayDc77AUkrAaygibD1aQtBLCjZgLFU9ZDmVEzQYrSFsK4QqZrsOuIH0JlB/7BmKZ6TVUBZmMC6EC4ZxzfgKpnPmoChhy5zHAQPIfIAFTD1dgoLGZASuAKWDIn0NAQcHbdfgVMJjazMKvgMH96nv8ChiKTlzEVBAzE6GAgaH4iPlcVHlfliXICoD26DLe3o2kQMe+C0QBAGM4ZHRHgakKAAAAAElFTkSuQmCC"
        />
      </defs>

      <g id="Layer 1">
        <use id="Bitmap" href="#img1" x="368" y="27" />
      </g>
    </svg>
  );
};

export default AppleIcon;
