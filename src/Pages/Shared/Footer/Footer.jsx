import React from 'react';
import Logo from '../Logo/Logo';

const Footer = () => {
    return (
       <div>
        <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content  p-10">
  <aside>
   <Logo></Logo>
    <p className="font-bold">
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
      
      </a>
      <a>
       
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>
       </div>
    );
};

export default Footer;