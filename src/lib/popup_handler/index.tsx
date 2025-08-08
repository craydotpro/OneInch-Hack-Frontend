import { ReactNode, RefObject, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./style.css";
interface IPopups {
  name: String;
  type: "modal" | "sidesheet";
  popup: ReactNode;
  nodeRef: RefObject<HTMLDivElement>;
}
let popups: any = (window as any).popups;
import("../../../compiled_routes/popup.ts").then(async (data) => {
  popups = data.default;
  (window as any).popups = popups;
});
interface IPopupHook {
  get: {
    key: String;
    prop: any;
  }[];
  set: Function;
}
export let popupHook: IPopupHook = {
  get: [],
  set: () => {},
};
export const closeAllPopups = () => {
  popupHook.set([]);
};
let stopHistoryBack = false;
let stopButtonBack = false;
const handleClose = (props?: { stopHistoryBack: boolean }) => {
  const newState = popupHook.get;
  newState.pop();
  popupHook.set([...newState]);
  if (!stopHistoryBack && props?.stopHistoryBack) {
    stopButtonBack = true;
    history.back();
  } else {
    stopHistoryBack = false;
  }
};
window.addEventListener("popstate", () => {
  if (!stopButtonBack) {
    stopHistoryBack = true;
    handleClose();
  } else {
    stopButtonBack = false;
  }
});

export const popup = {
  open: (key: String, prop?: any) => {
    if (popups === undefined) {
      /**
       * popup list will load async. if popup list is not fetched, wait a little bit and try again
       */
      setTimeout(() => {
        popup.open(key, prop);
      }, 400);
    }
    if (!popups?.find((M: IPopups) => M.name === key)) {
      //if popup does't exists
      if (import.meta.env.MODE === "development" && popups?.length) {
        alert(
          "popup does't exists. make sure you added '.modal.jsx' in the end"
        );
      } else {
        console.warn("popup does't exists");
      }
      return;
    }
    history.pushState({}, "", "");
    popupHook.set([
      ...popupHook.get,
      {
        key,
        prop,
      },
    ]);
  },
  close: handleClose,
};
export default function PopupHandler() {
  [popupHook.get, popupHook.set] = useState([]);
  const activePopups = popupHook.get.map(({ key: popupName }, i) => {
    let M = popups?.find((popup: any) => popupName === popup.name);
    return {
      popup: M.popup,
      name: M.name,
      type: M.type,
      data: popupHook.get[i].prop || {},
      nodeRef: M.nodeRef,
    };
  });
  return (
    <>
      <TransitionGroup>
        {activePopups.map((M) => {
          return (
            <CSSTransition
              key={M.name}
              timeout={400}
              classNames={`${M.type}-component`}
              nodeRef={M.nodeRef}
            >
              <M.popup
                props={M.data}
                nodeRef={M.nodeRef}
                close={() => popup.close()}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </>
  );
}
(window as any).popup = popup;
