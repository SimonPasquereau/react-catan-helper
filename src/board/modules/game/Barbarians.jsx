/** @flow */

import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import './Barbarians.css';

const BarbariansContainer = () => {
  // use history value if history mode is enabled
  const position = useSelector(state => {
    const { enabled: isHistoryEnabled } = state.gameHistory;
    const { visualizedTurnState } = state.gameHistory;

    return isHistoryEnabled && visualizedTurnState
      ? visualizedTurnState.barbarians.position
      : state.barbarians.position;
  });

  return (
    <div className="barbarians-container">
      <div
        className={cn('step', {
          overtaken: position > 0,
          current: position === 0,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 1,
          current: position === 1,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 2,
          current: position === 2,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 3,
          current: position === 3,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 4,
          current: position === 4,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 5,
          current: position === 5,
        })}
      />
      <div
        className={cn('step', {
          overtaken: position > 6,
          current: position === 6,
        })}
      />
      <div className="step attack" />
    </div>
  );
};

export default BarbariansContainer;
