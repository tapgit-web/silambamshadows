import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

const SplitText = forwardRef(({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
}, ref) => {
  const elRef = useRef(null);
  const splitterRef = useRef(null);

  const animate = () => {
    if (!elRef.current) return;

    // Revert old split
    if (splitterRef.current) {
      splitterRef.current.revert();
    }

    // Split again
    const splitter = new GSAPSplitText(elRef.current, { type: splitType });
    splitterRef.current = splitter;

    const targets = splitter[splitType] || splitter.chars;

    gsap.set(targets, from);
    gsap.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000
    });
  };

  useImperativeHandle(ref, () => ({
    play: animate
  }));

  useEffect(() => {
    animate();
    return () => {
      if (splitterRef.current) splitterRef.current.revert();
    };
  }, [text]);

  return (
    <p
      ref={elRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      {text}
    </p>
  );
});

export default SplitText;
