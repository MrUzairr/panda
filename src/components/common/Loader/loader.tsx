// src/components/Loader.tsx
import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div
      style={{
        display: loading ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(205, 205, 205, 0.3)',
        zIndex: 1000,
      }}
    >
      <Circles
        height="80"
        width="80"
        color="#1a5631"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
