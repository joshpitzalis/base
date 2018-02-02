import React from 'react';

export const Thunder = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="49"
    viewBox="0 0 36 49"
    className="dim"
  >
    <path
      fill="none"
      stroke={color || '#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M12.948125,5.6946875 L12.948125,25.8759375 M18.6346875,29.3978125 L18.6346875,49.5790625 M12.948125,25.876875 L2.795,21.670625 M28.788125,33.6034375 L18.635,29.3971875 M2.7946875,21.67125 L18.5696875,49.60875 M12.948125,5.6946875 L28.78875,33.6040625 M12.948125,5.661875 L21.75125,2.015 M28.788125,33.6034375 L37.59125,29.9565625 M2.7946875,21.67125 L11.5978125,18.024375 M18.6346875,49.58 L27.4378125,45.933125 M21.7521875,2.015 L37.5928125,29.955625 M27.43875,45.933125 L27.43875,33.1175 M11.59875,18.0246875 L12.94875,18.5871875"
      transform="translate(-2 -1)"
    />
  </svg>
);
