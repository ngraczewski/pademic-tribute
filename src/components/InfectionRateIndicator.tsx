import React from 'react';
import { useSelector } from 'react-redux';
import { infectionsPerInfectionPhaseSelector } from '../redux/selectors/infectionRateSelectors';

export const InfectionRateIndicator = (): JSX.Element => {
    const infectionsPerInfectionPhase = useSelector(infectionsPerInfectionPhaseSelector);
return <div>Infection per infection phase: {infectionsPerInfectionPhase}</div>
}