import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import firebase, { googleProvider } from '../utils/firebase';
import { toast$ } from '../features/toast/toast.jsx';

const propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

export default function Auth({ user }) {
  const onSignup = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch(error => {
        const message = error.message || error;
        toast$.next({
          type: 'ERROR',
          message,
        });
      });
  };

  if (user) {
    return <Redirect to={`/dashboard/${user.uid}`} />;
  }

  return (
    <section className=" pt-120 pb-120" data-testid="authPage">
      <div className="container px-xl-0">
        <form
          onSubmit={e => onSignup(e)}
          className="bg-light mx-auto mw-430 radius10 pt-40 px-50 pb-30"
        >
          <h2
            className="mb-40 small text-center"
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            Join Helm
          </h2>
          {/* <div
              className="mb-20 input_holder"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="150"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
              />
            </div> */}
          {/* <div
              className="mb-20 input_holder"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="300"
            >
              <input
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className="input border-gray focus-action-1 color-heading placeholder-heading w-full"
              />
            </div> */}

          {/* <div
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="450"
            >
              <label
                htmlFor="form_1_checkbox"
                className="mt-25 color-heading w-full"
                id="form_1_checkbox"
              >
                I agree to the Terms of Service{' '}
                <input
                  type="checkbox"
                  name="rules"
                  className="d-none border-gray focus-action-1"
                  id="form_1_checkbox"
                  checked
                />
              </label>
            </div> */}
          <div
            data-aos-duration="600"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            <button type="submit" className="mt-25 btn action-1 w-full">
              <Icon
                type="google"
                style={{ fontSize: '24px' }}
                className="pt0"
              />{' '}
              <span className="pt2 pl2">Signup or Login</span>
            </button>
          </div>
          {/* <div
              className="mt-50 hr bg-gray h-1"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="750"
            ></div> */}
          {/* <div
              className="mt-25 f-18 medium color-heading text-center"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="900"
            >
              Do you have an Account?{' '}
              <a href="#" className="link action-1">
                Sign In
              </a>{' '}
            </div> */}
        </form>
      </div>
    </section>
  );
}

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;

// {
//   /* <div
//         className="alert alert-success alert-dismissible alert-form-success"
//         role="alert"
//       >
//         <button
//           type="button"
//           className="close"
//           data-dismiss="alert"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//         Thanks for your message!
//       </div> */
// }
// {
//   /* <div
//         className="alert alert-warning alert-dismissible alert-form-check-fields"
//         role="alert"
//       >
//         <button
//           type="button"
//           className="close"
//           data-dismiss="alert"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//         Please, fill in required fields.
//       </div> */
// }
// {
//   /* <div
//         className="alert alert-danger alert-dismissible alert-form-error"
//         role="alert"
//       >
//         <button
//           type="button"
//           className="close"
//           data-dismiss="alert"
//           aria-label="Close"
//         >
//           <span aria-hidden="true">&times;</span>
//         </button>
//         An error occurred while sending data :(
//       </div> */
// }

// {
//   /* <div className="overlay"></div>

//       <div className="video_popup">
//         <a className="close">
//           <img
//             srcSet="i/close_white@2x.png 2x"
//             src="i/close_white.png"
//             alt=""
//           />
//         </a>
//         <div className="d-flex align-items-center justify-content-center w-full h-full iframe_container"></div>
//       </div> */
// }
