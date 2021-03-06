import { computePlayersScores } from '@core/index';
import { Player, PlayerAction } from '@redux/types/players';

const reducer = (
  state: ReadonlyArray<Player> = [],
  action: PlayerAction
): ReadonlyArray<Player> => {
  let newState: ReadonlyArray<Player>;

  switch (action.type) {
    case 'PLAYER::ADD::COLONY': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        colonies: player.uuid === action.payload.playerUuid ? player.colonies + 1 : player.colonies,
      }));
      break;
    }

    case 'PLAYER::DESTROY::COLONY': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        colonies: player.uuid === action.payload.playerUuid ? player.colonies - 1 : player.colonies,
      }));
      break;
    }

    case 'PLAYER::ADD::CITY': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        colonies: player.uuid === action.payload.playerUuid ? player.colonies - 1 : player.colonies,
        cities: player.uuid === action.payload.playerUuid ? player.cities + 1 : player.cities,
      }));
      break;
    }

    case 'PLAYER::DESTROY::CITY': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        colonies: player.uuid === action.payload.playerUuid ? player.colonies + 1 : player.colonies,
        cities: player.uuid === action.payload.playerUuid ? player.cities - 1 : player.cities,
      }));
      break;
    }

    case 'PLAYER::ADD::POINT': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        victoryPoints:
          player.uuid === action.payload.playerUuid
            ? player.victoryPoints + 1
            : player.victoryPoints,
      }));
      break;
    }

    case 'PLAYER::REMOVE::POINT': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        victoryPoints:
          player.uuid === action.payload.playerUuid
            ? player.victoryPoints - 1
            : player.victoryPoints,
      }));
      break;
    }

    case 'PLAYER::ATTRIBUTE::ROAD': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        hasLongestRoad: player.uuid === action.payload.playerUuid,
      }));
      break;
    }

    case 'PLAYER::ATTRIBUTE::ARMY': {
      newState = state.map<Player>((player: Player) => ({
        ...player,
        hasStrongestArmy: player.uuid === action.payload.playerUuid,
      }));
      break;
    }

    case 'PLAYER::SAVE::NICKNAME': {
      const { playerUuid, nickname } = action.payload;
      newState = state.map<Player>((player: Player) => ({
        ...player,
        nickname: player.uuid === playerUuid ? nickname : player.nickname,
      }));
      break;
    }

    default: {
      if (process.env.NODE_ENV === 'development')
        console.warn(
          `Ooops, the player reducer is about to return the current players state without changes! The action is ${action.type}`
        );
      newState = state;
      break;
    }
  }

  return computePlayersScores(newState);
};

export default reducer;
