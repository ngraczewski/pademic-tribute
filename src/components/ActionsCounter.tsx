import React from "react";
import { useSelector } from "react-redux";
import {
  actionsCountSelector,
  totalActionsCountSelector,
} from "../redux/selectors/actionsSelectors";

export const ActionsCounter = (): JSX.Element => {
  const actionsLeft = useSelector(actionsCountSelector);
  const totalActions = useSelector(totalActionsCountSelector);

  return (
    <div>
      Actions left: {actionsLeft} / {totalActions}
    </div>
  );
};
