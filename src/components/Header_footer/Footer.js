import React from 'react';
import { CityLogo } from '../utils/tools';

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo="/" width={70} height={70} />
      </div>
      <div className="footer_desc1">
        Manchester City 2021, All right reserved
      </div>
    </footer>
  );
};

export default Footer;
