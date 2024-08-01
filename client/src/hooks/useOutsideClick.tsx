import { useEffect } from "react";

type RefType = React.RefObject<HTMLElement>;
type HandlerType = () => void;

const useOutsideClick = (ref: RefType, handler: HandlerType) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
