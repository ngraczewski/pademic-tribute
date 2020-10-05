import { sampleSize, chunk, times } from "lodash";
import { AppThunk } from "../../app/store";
import { GameOverReason } from "../../models/GameOverReason";
import { InfectionCard } from "../../models/InfectionCard";
import { Player } from "../../models/Player";
import { CardType, PlayerCard } from "../../models/PlayerCard";
import { charactersSelector } from "../selectors/charactersSelectors";
import {
  outbreaksCountSelector,
  diseaseSpreadTooMuchSelector,
} from "../selectors/citiesSelectors";
import { infectionCardsSelector } from "../selectors/infectionCardsSelectors";
import { infectionsPerInfectionPhaseSelector } from "../selectors/infectionRateSelectors";
import { playerCardsSelector } from "../selectors/playerCardsSelectors";
import {
  currentPlayerCardsSelector,
  currentPlayerSelector,
} from "../selectors/playersSelectors";
import {
  endActionsPhase,
  endInfectionCardsPhase,
  endPlayerCardsPhase,
  gameOver,
  playEpidemicCard,
  startGame,
} from "./actions";

export const checkGameOverConditionsAction = (): AppThunk => (
  dispatch,
  getState
) => {
  const outbreaksCount = outbreaksCountSelector(getState());
  const diseaseSpreadTooMuch = diseaseSpreadTooMuchSelector(getState());

  if (outbreaksCount >= 8) {
    dispatch(gameOver(GameOverReason.GLOBAL_PANIC));
  }

  if (diseaseSpreadTooMuch) {
    dispatch(gameOver(GameOverReason.DISEASE_SPREAD_TOO_MUCH));
  }
};

export const playEpidemicCardAction = (
  infectionCard: InfectionCard
): AppThunk => (dispatch) => {
  dispatch(
    playEpidemicCard({
      infectionCard,
    })
  );
  dispatch(checkGameOverConditionsAction());
};

export const startGameAction = ({
  players,
  epidemics,
}: {
  players: number;
  epidemics: number;
}): AppThunk => (dispatch, getState) => {
  const characters = sampleSize(charactersSelector(getState()), players);
  const cards = playerCardsSelector(getState());
  const cardsPerPlayer = Math.ceil(8 / players);
  const cardsToDraw = cardsPerPlayer * players;
  const playersCards = sampleSize(cards, cardsToDraw);
  const playerDecks = chunk(playersCards, cardsPerPlayer);
  const infectionCards = infectionCardsSelector(getState());

  const playersList: Player[] = times(players).map((i) => ({
    playerName: `Player ${i + 1}`,
    characterName: characters[i].characterName,
    cards: playerDecks[i],
  }));

  dispatch(
    startGame({
      epidemicsCount: epidemics,
      players: playersList,
      infectionCards: infectionCards.slice(0, 9),
    })
  );
};

export const endActionsPhaseAction = (): AppThunk => (dispatch, getState) => {
  const currentPlayerCards = currentPlayerCardsSelector(getState());
  const currentPlayer = currentPlayerSelector(getState());
  const playersCard = playerCardsSelector(getState());

  if (!currentPlayerCards || !currentPlayer) {
    return;
  }

  const drawnCards = playersCard.slice(0, 2);
  const drawnCityCards = drawnCards.filter((c) => c.type !== CardType.EPIDEMIC);

  const currentPlayerCardsCount = [...currentPlayerCards, ...drawnCityCards]
    .length;

  dispatch(endActionsPhase());
  if (currentPlayerCardsCount <= 7) {
    dispatch(
      endPlayerCardsPhaseAction({
        player: currentPlayer,
        drawnCards,
        discardedCards: [],
      })
    );
  }
};

export const endPlayerCardsPhaseAction = ({
  player,
  discardedCards,
  drawnCards,
}: {
  player: Player;
  drawnCards: PlayerCard[];
  discardedCards: PlayerCard[];
}): AppThunk => (dispatch, getState) => {
  const epidemicCards = drawnCards.filter((c) => c.type === CardType.EPIDEMIC);
  const infectionCards = infectionCardsSelector(getState());
  const drawnInfectionCards = infectionCards
    .slice(-epidemicCards.length)
    .reverse();

  dispatch(
    endPlayerCardsPhase({
      player,
      drawnCards,
      discardedCards,
    })
  );
  epidemicCards.forEach((_card, index) =>
    dispatch(playEpidemicCardAction(drawnInfectionCards[index]))
  );
  dispatch(endInfectionCardsPhaseAction());
};

export const endInfectionCardsPhaseAction = (): AppThunk => (
  dispatch,
  getState
) => {
  const infectionCards = infectionCardsSelector(getState());
  const infectionsPerInfectionPhase = infectionsPerInfectionPhaseSelector(
    getState()
  );

  const drawnInfectionCards = infectionCards.slice(
    0,
    infectionsPerInfectionPhase
  );

  dispatch(
    endInfectionCardsPhase({
      infectionCards: drawnInfectionCards,
    })
  );
  dispatch(checkGameOverConditionsAction());
};
