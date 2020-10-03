import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { PlayerCard } from "../models/PlayerCard";
import { discardCardAction } from "../redux/actions";
import { currentPlayerCardsSelector } from "../redux/selectors/playersSelectors"
import { Modal } from "./Modal";

export const DiscardCardModal = (): JSX.Element => {
    const playerCards = useSelector(currentPlayerCardsSelector);
    const dispatch = useDispatch();

    const discardCard = (card: PlayerCard)  => dispatch(discardCardAction(card));

return <Modal isOpen={(playerCards?.length ?? 0) > 7}><>
{playerCards?.map(card => <div key={card.cardId} onClick={() => discardCard(card)}>{card.cardName}</div>)}
</></Modal>
}