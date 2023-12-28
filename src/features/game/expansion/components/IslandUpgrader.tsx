import React, { useContext, useEffect, useState } from "react";
import raft from "assets/decorations/raft.png";
import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";
import { NPC } from "features/island/bumpkin/components/NPC";
import { NPC_WEARABLES } from "lib/npcs";
import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Guide } from "features/helios/components/hayseedHank/components/Guide";
import { SUNNYSIDE } from "assets/sunnyside";
import { PeteHelp } from "./PeteHelp";
import { Context } from "features/game/GameProvider";
import { useSelector } from "@xstate/react";
import { MachineState } from "features/game/lib/gameMachine";
import { getBumpkinLevel } from "features/game/lib/level";
import { GuidePath } from "features/helios/components/hayseedHank/lib/guide";
import { MapPlacement } from "./MapPlacement";

import speechBubble from "assets/ui/speech_border.png";
import { getKeys } from "features/game/types/craftables";
import { CROPS } from "features/game/types/crops";
import { Button } from "components/ui/Button";

const expansions = (state: MachineState) =>
  state.context.state.inventory["Basic Land"]?.toNumber() ?? 0;

export const IslandUpgrader: React.FC = () => {
  const { gameService } = useContext(Context);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <CloseButtonPanel
          bumpkinParts={NPC_WEARABLES["grubnuk"]}
          onClose={() => setShowModal(false)}
        >
          <div
            style={{ maxHeight: "300px" }}
            className="scrollable overflow-y-auto"
          >
            <Button onClick={() => gameService.send("farm.upgraded")}>
              Confirm
            </Button>
          </div>
        </CloseButtonPanel>
      </Modal>
      <MapPlacement x={12} y={0} width={3}>
        <div
          className="absolute"
          style={{
            top: `${2 * PIXEL_SCALE}px`,
            left: `${2 * PIXEL_SCALE}px`,
          }}
        >
          <img
            src={raft}
            style={{
              width: `${37 * PIXEL_SCALE}px`,
            }}
          />
          <div
            className="absolute"
            style={{
              top: `${-10 * PIXEL_SCALE}px`,
              left: `${14 * PIXEL_SCALE}px`,
              width: `${1 * GRID_WIDTH_PX}px`,
              transform: "scaleX(-1)",
            }}
          >
            <NPC
              parts={NPC_WEARABLES["grubnuk"]}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </MapPlacement>
    </>
  );
};