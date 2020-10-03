import React from "react";
import { useSelector } from "react-redux"
import { outbreaksCountSelector } from "../redux/selectors/citiesSelectors"

export const OutbreaksIndicator = (): JSX.Element => {
    const outbreaks = useSelector(outbreaksCountSelector);

    return <div>Outbreaks: {outbreaks} / 8</div>
}