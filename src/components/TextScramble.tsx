import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextScramble({ text, className = '', delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let frame = 0;
    const totalFrames = 30;
    
    const scrambleTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        let output = '';
        
        for (let i = 0; i < text.length; i++) {
          if (frame / totalFrames > i / text.length) {
            output += text[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(output);
        frame++;
        
        if (frame > totalFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(scrambleTimeout);
  }, [isVisible, text, delay]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}
