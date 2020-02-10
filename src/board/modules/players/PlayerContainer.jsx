/* @flow */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import PlayerModal from './PlayerModal';
import NewPlayerModal from './NewPlayerModal';
import {
  addNewPlayer,
  selectPlayer,
  deselectPlayer,
  addColony,
  addCity,
  destroyCity,
  addVictoryPoint,
  attributeLongestRoad,
  attributeStrongestArmy,
  savePlayerNickname,
  deletePlayer,
} from '../../../redux/actions/players';
import type { CatanState, Dispatch, Player } from '../../../flow';

import medalIcon from '../../../assets/images/medal_icon.png';
import armyIcon from '../../../assets/images/army_icon.png';
import roadIcon from '../../../assets/images/road_icon.png';

import './PlayerContainer.css';

type OwnProps = {
  +pausedGame: boolean,
};

type StateProps = {
  +players: $ReadOnlyArray<Player>,
  +selectedPlayerUuid?: string,
};

type DispatchProps = {
  +addNewPlayer: (nickname: string) => any,
  +selectPlayer: (playerUuid: string) => any,
  +deselectPlayer: () => any,
  +addColony: (playerUuid: string) => any,
  +addCity: (playerUuid: string) => any,
  +destroyCity: (playerUuid: string) => any,
  +addVictoryPoint: (playerUuid: string) => any,
  +attributeLongestRoad: (playerUuid: string) => any,
  +attributeStrongestArmy: (playerUuid: string) => any,
  +savePlayerNickname: (playerUuid: string, nickname: string) => any,
  +deletePlayer: (playerUuid: string) => any,
};

const mapStateToProps = (state: CatanState): StateProps => ({
  players: state.players,
  selectedPlayerUuid: state.selectedPlayerUuid,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  addNewPlayer: nickname => dispatch(addNewPlayer(nickname)),
  selectPlayer: playerUuid => dispatch(selectPlayer(playerUuid)),
  deselectPlayer: () => dispatch(deselectPlayer()),
  addColony: playerUuid => dispatch(addColony(playerUuid)),
  addCity: playerUuid => dispatch(addCity(playerUuid)),
  destroyCity: playerUuid => dispatch(destroyCity(playerUuid)),
  addVictoryPoint: playerUuid => dispatch(addVictoryPoint(playerUuid)),
  attributeLongestRoad: playerUuid =>
    dispatch(attributeLongestRoad(playerUuid)),
  attributeStrongestArmy: playerUuid =>
    dispatch(attributeStrongestArmy(playerUuid)),
  savePlayerNickname: (playerUuid, nickname) =>
    dispatch(savePlayerNickname(playerUuid, nickname)),
  deletePlayer: playerUuid => dispatch(deletePlayer(playerUuid)),
});

type Props = OwnProps & StateProps & DispatchProps;

const DicesContainer = (props: Props) => {
  const [showNewPlayerModal, toggleNewPlayerModal] = useState(false);

  const {
    players,
    selectedPlayerUuid,
    addColony,
    addCity,
    destroyCity,
    addVictoryPoint,
    attributeLongestRoad,
    attributeStrongestArmy,
    savePlayerNickname,
    deletePlayer,
  } = props;
  const playerCount = players.length;

  const submitNewPlayer = (nickname: string) => {
    toggleNewPlayerModal(false);
    props.addNewPlayer(nickname);
  };

  const selectedPlayer = players.find(
    player => player.uuid === selectedPlayerUuid
  );

  return (
    <div
      className={cn('player-container', {
        hidden: props.pausedGame,
      })}
    >
      {players.map((player, index) => {
        return (
          <>
            <div
              key={`player_${index}`}
              className={cn('player', {
                leader: player.isLeader,
              })}
              data-bg={index % playerCount}
              onClick={() => props.selectPlayer(player.uuid)}
            >
              <div className="avatar" data-avatar={index % playerCount}></div>
              <p className="nickname">{player.nickname}</p>
            </div>
            <p className="score">
              {`${player.score} points de victoire`}
              {player.isLeader ? (
                <span>
                  <img src={medalIcon} alt="Catan" />
                </span>
              ) : null}
              {player.hasStrongestArmy ? (
                <span>
                  <img src={armyIcon} alt="Catan" />
                </span>
              ) : null}
              {player.hasLongestRoad ? (
                <span>
                  <img src={roadIcon} alt="Catan" />
                </span>
              ) : null}
            </p>
          </>
        );
      })}
      <button
        className="new-player"
        onClick={() => toggleNewPlayerModal(!showNewPlayerModal)}
      >
        + Nouveau Joueur
      </button>
      {showNewPlayerModal ? (
        <NewPlayerModal
          cancel={() => toggleNewPlayerModal(false)}
          submitAndClose={nickname => submitNewPlayer(nickname)}
        />
      ) : null}
      {selectedPlayer ? (
        <PlayerModal
          deselect={props.deselectPlayer}
          player={selectedPlayer}
          addColony={uuid => addColony(uuid)}
          addCity={uuid => addCity(uuid)}
          destroyCity={uuid => destroyCity(uuid)}
          addVictoryPoint={uuid => addVictoryPoint(uuid)}
          attributeLongestRoad={uuid => attributeLongestRoad(uuid)}
          attributeStrongestArmy={uuid => attributeStrongestArmy(uuid)}
          savePlayerNickname={(uuid, nickname) =>
            savePlayerNickname(uuid, nickname)
          }
          deletePlayer={uuid => deletePlayer(uuid)}
        />
      ) : null}
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DicesContainer);
