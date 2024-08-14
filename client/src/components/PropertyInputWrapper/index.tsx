import { useEffect, useRef, useState } from "react";
import {
  PropertyInputContent,
  PropertyInputContentOverlay,
  StyledPropertyInputWrapper,
} from "./styledComponents";

export default function PropertyInputWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [transitionLevel, setTransitionLevel] = useState<number>(0);
  const [domRect, setDomRect] = useState<DOMRect>();

  const handleOpen = () => {
    setTimeout(() => setTransitionLevel(1), 0);
    setTimeout(() => setTransitionLevel(2), 100);
    setTimeout(() => setTransitionLevel(3), 600);
  };

  const handleClose = () => {
    setTimeout(() => setTransitionLevel(2), 0);
    setTimeout(() => setTransitionLevel(1), 0);
    setTimeout(() => setTransitionLevel(0), 300);
  };

  useEffect(() => {
    if (!domRect && wrapperRef.current) {
      const _domRect = wrapperRef.current.getBoundingClientRect();
      setDomRect(_domRect);
    }
  }, [domRect]);

  const levelOneIsActive = transitionLevel >= 1;
  const levelTwoIsActive = transitionLevel >= 2;
  const levelThreeIsActive = transitionLevel >= 3;

  return (
    <StyledPropertyInputWrapper
      className={levelTwoIsActive ? "is-open" : ""}
      ref={wrapperRef}
    >
      {domRect && (
        <PropertyInputContent
          className={levelTwoIsActive ? "is-open" : ""}
          $domrect={domRect}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            provident doloremque veniam corporis hic qui eius quaerat excepturi
            inventore optio unde rerum numquam recusandae, sint nemo! Fugit
            aliquid, temporibus deserunt nulla consequuntur, itaque hic
            perspiciatis cum incidunt at illum! Voluptatum culpa similique amet
            veritatis tempore totam atque accusamus. Laudantium, odit!
          </p>
          {levelThreeIsActive && (
            <>
              <button onClick={handleClose}>Close</button>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet,
                beatae?
              </p>
            </>
          )}
        </PropertyInputContent>
      )}

      <PropertyInputContentOverlay
        className={levelOneIsActive ? "is-open" : ""}
        onClick={handleOpen}
      >
        <p style={{ color: "white" }}>E</p>
      </PropertyInputContentOverlay>
    </StyledPropertyInputWrapper>
  );
}
