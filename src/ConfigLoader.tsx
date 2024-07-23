import React, { ReactNode, useEffect, useState } from "react";
import { load } from "./loader";
interface Props {
  children: ReactNode;
}
export function ConfigLoader({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setConfig] = useState({});
  useEffect(() => {
    load().then((config) => {
      setConfig(config);
      setIsLoaded(true);
    });
  }, []);

  return isLoaded === true ? <>{children}</> : <></>;
}
