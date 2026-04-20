"use client";
import { useEffect, useState } from "react";

export default function TypingText({
  text = "Hello, world!",
  speed = 100,
  loop = true,
}) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayed(text.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);
    } else if (loop) {
      timeout = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [index, text, speed, loop]);

  return (
    <span>
      {displayed}
      <span className="cursor">|</span>

      <style jsx>{`
        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s infinite;
          color: red;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
