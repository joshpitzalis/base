import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { auth, db } from '../constants/firebase.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
    };
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.redirect();
  }
  redirect() {
    auth.onAuthStateChanged(user => {
      user && this.setState({ redirectTo: '/home' });
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <Fragment>
        <article className="ph5-ns pv4-ns pa3">
          <h1 className="lh-title">
            Quick & Easy <br /> Online Polls.
          </h1>
          <button>Get Started</button>
        </article>
        <section className="ph5-ns pv4-ns pa3 ">
          <h2 className="f2 b tc w-100">Our Polls</h2>
          <p className="center measure-narrow tc">
            Create you own custom poll in seconds or click on one of our pre-prepared polls.
          </p>
          <PreparedPolls />
        </section>
        <article className="pa5-ns pa3 tc">
          <h1 className="tc lh-title">
            Create your own poll <br />in 30 seconds.
          </h1>
          <button>Begin</button>
        </article>
      </Fragment>
    );
  }
}

class PreparedPolls extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="w-100">
          <div className="grid gap1 row jcc pv4 ">
            <Link to="/fun">
              <span className="pa3 bg-brown " activeStyle={{ backgroundColor: 'red' }}>
                Fun
              </span>
            </Link>
            <Link to="/work">
              <span className="pa3 bg-brown ">Work</span>
            </Link>
            <Link to="/relationships">
              <span className="pa3 bg-brown ">Relationships</span>
            </Link>
            <Link to="/shopping">
              <span className="pa3 bg-brown ">Shopping</span>
            </Link>
          </div>

          <Route
            exact
            path="/:id"
            // render={() => <Child polls={this.state.polls} />}
            component={Child}
          />
          <Redirect from="/" to="/fun" />
        </div>
      </BrowserRouter>
    );
  }
}

class Child extends Component {
  state = { polls: [] };

  componentDidMount() {
    getPreparedPolls().then(polls => this.setState({ polls }));
  }

  render() {
    const { polls } = this.state;
    return (
      <div className="pv4 w-100 grid grid3 gap1">
        {polls &&
          polls
            .filter(poll => poll.category === (this.props.match.params.id || 'fun'))
            .map((poll, index) => <Poll key={index} title={poll.title} index={index} />)}
      </div>
    );
  }
}

const Poll = ({ title, index }) => (
  <p
    data-colour={index === 0 ? 'blue' : index === 1 ? 'red' : index === 2 ? 'orange' : 'green'}
    className={`pointer fancyFont dib pa4 mv0 h5 ${(index === 1 && 'span2 brown') ||
      (index === 2 && 'span2 brown')} `}
  >
    {title}
  </p>
);

export const getPreparedPolls = () =>
  db
    .collection('preparedPolls')
    .get()
    .then(coll => coll.docs.map(doc => doc.data()))
    .catch(error => console.error(error));
