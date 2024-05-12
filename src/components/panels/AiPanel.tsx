"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { isEditorImageElement, isEditorVideoElement } from "@/store/Store";
import { AiEffectResource } from "../entity/AiResource";

export const AiPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement;
  return (
    <>
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold">
        Ai Effects
      </div>
      {selectedElement &&
      (isEditorImageElement(selectedElement) ||
        isEditorVideoElement(selectedElement)) ? (
        <AiEffectResource editorElement={selectedElement} />
      ) : null}
    </>
  );
});
