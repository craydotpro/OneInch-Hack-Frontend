import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import PopupOverlay from "./popup_overlay";
import { Loader, X } from "lucide-react";

const Modal = ({
  prop = {},
  page,
  children,
  close,
  onClickOutside,
  className,
  title,
  isLoading,
}: any) => {
  const ref = useRef(null) as any;
  const closeModal = (e: any) => {
    if (
      (ref.current && ref.current.children[1].contains(e.target)) ||
      !document.body?.contains(e.target)
    ) {
      return;
    }

    if (onClickOutside) {
      onClickOutside();
    } else {
      ref.current.children[1].classList.add("animate__modal__headShake");
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.children[1].classList.remove("animate__modal__headShake");
      }, 400);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      document.body.addEventListener("click", closeModal);
    }, 0);
    return function cleanup() {
      document.body.removeEventListener("click", closeModal);
    };
  }, []);
  return (
    <>
      <div ref={ref} className="modal-component ">
        <PopupOverlay />
        <div
          className={twMerge(
            `animate__animated fixed  z-[21] bottom-0 md:bottom-auto md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[500px] md:rounded-2xl md:h-auto rounded-lg bg-white py-5 px-3 md:p-7  
                        ${page ? "w-full h-full top-0 " : "w-full"} `,
            className
          )}
        >
          {close ? (
            <span
              onClick={close}
              className={`absolute right-2 top-2 cursor-pointer rounded-full p-1 hover:bg-slate-200 z-10 ${
                prop._alert && "invisible"
              }`}
            >
              <X />
              {/* <X /> */}
            </span>
          ) : null}
          <p className=" text-[18px] font-bold pb-4">{title}</p>
          <div className="max-h-[80vh] overflow-scroll ">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className=" animate-spin" />
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
