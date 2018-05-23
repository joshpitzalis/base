import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { withUserData } from '../hocs/withUserData';
// import { LogoutButton } from './Navigation/AuthButtons';

const Footer = ({ user }) => (
  <Fragment>
    <div className="grid row footerBar">
      <div data-colour="orange" />
      <div data-colour="yellow" />
      <div data-colour="red" />
      <div data-colour="green" />
      <div data-colour="blue" />
    </div>
    <footer className="flex justify-between items-center ph5-ns ph3">
      <p className="white f4">
        &copy; 2018
        {new Date().getFullYear() > 2018 && '-' + new Date().getFullYear()}
        Palpoll.
      </p>
      <p className="white f4">hello@palpoll.com</p>
    </footer>
  </Fragment>
);

export default withUserData(Footer);
