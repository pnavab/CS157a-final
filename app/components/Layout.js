'use client';
import internal from 'stream';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <html>
      <body className={internal.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default Layout;