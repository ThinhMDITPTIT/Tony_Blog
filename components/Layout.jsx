import React from 'react';
import { Header } from './';
import { Footer } from './';
import Particles from 'react-tsparticles';

const Layout = ({ children }) => {
  return (
    <>
      <Particles
        options={{
          background: {
            color: {
              value: '#f0f0f0',
            },
            opacity: 0.1,
          },
          fps_limit: 30,
          interactivity: {
            events: {
              onClick: { enable: false, mode: 'push' },
              onHover: { enable: true, mode: 'repulse' },
              resize: true,
            },
            modes: {
              push: { particles_nb: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: '#17a2b8' },
            links: {
              color: '#17a2b8',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              bounce: false,
              direction: 'none',
              enable: true,
              outMode: 'out',
              random: false,
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 1000 }, value: 80 },
            opacity: { value: 0.1 },
            shape: { type: 'circle' },
            size: { random: true, value: 5 },
          },
          detectRetina: true,
        }}
      />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
