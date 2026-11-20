import React, { useState, useEffect } from 'react';

export const TypingEffect = ({ words = ["Software Developer", "Cybersecurity Specialist"], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const fullWord = words[currentWordIndex % words.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullWord.length) {
          // Pause when done
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        if (currentText.length - 1 === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span className="cyber-gradient-text font-bold">{currentText}</span>
      <span className="w-[3px] h-[1.2em] bg-cyan-400 ml-1 inline-block animate-pulse"></span>
    </span>
  );
};
