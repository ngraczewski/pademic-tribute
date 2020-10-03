import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { playersSelector } from '../redux/selectors/playersSelectors';
import { PlayerHand } from './PlayerHand';

export const PlayersHands = (): JSX.Element => {
    const players = useSelector(playersSelector);

    const containerStyle: CSSProperties = {
        display: 'flex'
    }

    return <div style={containerStyle}>
        {players.map(player => <PlayerHand key={player.playerName} playerName={player.playerName}/>)}
    </div>
}