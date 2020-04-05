import { jssPreset } from "@material-ui/styles";
import { create, Jss } from "jss";
import React, { useEffect, useRef, useState } from "react";
import root from "react-shadow";

import ShadowJss from "./ShadowJss";

const ShadowDom: React.FC = ({ children }) => {
  const [jss, setJss] = useState<Jss>();

  const rootRef = useRef<Element>(null);
  const shadowIdRef = useRef<string>(
    `___NO__WORLD___${Date.now()}_${(Math.random() * 1000).toFixed(0)}`
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      const rightJss = create({
        ...jssPreset(),
        insertionPoint:
          rootRef.current?.shadowRoot?.getElementById(shadowIdRef.current) ||
          undefined,
      });
      setJss(rightJss);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <root.div ref={rootRef}>
      <div id={shadowIdRef.current}>
        <ShadowJss jss={jss}>{children}</ShadowJss>
      </div>
    </root.div>
  );
};

export default ShadowDom;
