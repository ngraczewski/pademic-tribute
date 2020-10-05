import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../models/PlayerCard";
import { endPlayerCardsPhaseAction } from "../redux/actions/gameThunks";
import { isPlayerCardsPhaseSelector } from "../redux/selectors/gameStageSelectors";
import { playerCardsSelector } from "../redux/selectors/playerCardsSelectors";
import {
  currentPlayerCardsSelector,
  currentPlayerSelector,
} from "../redux/selectors/playersSelectors";
import { Modal } from "./Modal";

export const DiscardCardModal = (): JSX.Element => {
  const currentPlayerCards = useSelector(currentPlayerCardsSelector);
  const isPlayerCardsPhase = useSelector(isPlayerCardsPhaseSelector);
  const playerCards = useSelector(playerCardsSelector);
  const currentPlayer = useSelector(currentPlayerSelector);

  const drawnCards = playerCards.slice(0, 2);
  const drawnCityCards = drawnCards.filter((c) => c.type !== CardType.EPIDEMIC);
  const cardsInHandCount =
    (currentPlayerCards?.length ?? 0) + drawnCityCards.length;
  const hasTooManyCards = cardsInHandCount > 7;
  const isModalOpen = isPlayerCardsPhase && hasTooManyCards;

  const dispatch = useDispatch();

  const [markedCard, setMarkedCard] = useState<number[]>([]);
  const toggleMarkedCard = (cardId: number) => {
    if (markedCard.includes(cardId)) {
      setMarkedCard(markedCard.filter((c) => c !== cardId));
    } else if (cardsInHandCount - markedCard.length > 7) {
      setMarkedCard([...markedCard, cardId]);
    }
  };

  const endPlayerCardsPhase = () => {
    if (!currentPlayer || !currentPlayerCards) {
      return;
    }
    dispatch(
      endPlayerCardsPhaseAction({
        player: currentPlayer,
        drawnCards,
        discardedCards: [...currentPlayerCards, ...drawnCityCards].filter((c) =>
          markedCard.includes(c.cardId)
        ),
      })
    );
    setMarkedCard([]);
  };

  return (
    <Modal isOpen={isModalOpen}>
      <>
        <div>
          Discarded {markedCard.length} / {cardsInHandCount - 7}
        </div>
        {[...(currentPlayerCards ?? []), ...drawnCityCards]?.map((card) => (
          <div key={card.cardId} onClick={() => toggleMarkedCard(card.cardId)}>
            {markedCard.includes(card.cardId) ? "(Y)" : ""}
            {card.cardName}
          </div>
        ))}
        <button onClick={endPlayerCardsPhase}>Discard selected</button>
      </>
    </Modal>
  );
};
