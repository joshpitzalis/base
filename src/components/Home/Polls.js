import React from 'react';
import {
  compose,
  branch,
  renderComponent,
  renderNothing,
  setDisplayName,
  setPropTypes,
} from 'recompose';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from '../Loading';
import { markOnboardingStepComplete } from '../Onboarding/helpers';
import PieChart from 'react-minimal-pie-chart';

const NoPollsAvailable = () => <p>No Polls available.</p>;

const onlyShowIfPollsAvailable = branch(
  ({ polls }) => polls && polls.length === 0,
  renderComponent(NoPollsAvailable),
);

const showSpinnerWhileLoading = branch(({ polls }) => !polls, renderComponent(Loading));

// const onlyShowIfAuthenticated = branch(({ user }) => !user, renderNothing);

const ListOfPolls = ({ polls, user }) => (
  <ul className="list pl0 ml0 center mw6 br2 tl ">
    {polls.map((poll, index) => (
      <div className="flex jcc" key={index}>
        <PieChart
          data={
            poll.responses
              ? Object.values(poll.responses).map((response, index) => ({
                  value: response,
                  key: index,
                  color: {
                    0: '#f7db8c',
                    1: '#adcfe2',
                    2: '#f37966',
                    3: '#dce8bd',
                    4: '#ffaf39',
                  }[index],
                }))
              : [
                  {
                    value: 1,
                    key: 0,
                    color: '#dce8bd',
                  },
                ]
          }
          className="h3 w3 dib top-1 relative ml2"
        />
        <li
          data-colour="green"
          className="ph3 pv3 mv3 grow dib h3 w-100 mh3"
          data-test={`response${index}`}
        >
          <Link
            to={`/responses/${poll.id}`}
            onClick={() => markOnboardingStepComplete(user.providerData[0].uid, 'response')}
          >
            {Object.keys(poll.participants).length > 0 &&
              poll.completedBy &&
              `${calculatePercentageComplete(
                Object.keys(poll.participants).length,
                poll.completedBy.length,
              )}%`}
            {poll.title}
          </Link>
        </li>
      </div>
    ))}
  </ul>
);

export default compose(
  setDisplayName('Polls'),
  setPropTypes({
    polls: PropTypes.array,
  }),
  // onlyShowIfAuthenticated,
  onlyShowIfPollsAvailable,
  showSpinnerWhileLoading,
)(ListOfPolls);

export const calculatePercentageComplete = (participants, completedBy) =>
  Math.floor(completedBy / participants * 100);
