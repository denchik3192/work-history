import { useEffect, useRef } from "react";

export function usePrevPropValue(value:any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }