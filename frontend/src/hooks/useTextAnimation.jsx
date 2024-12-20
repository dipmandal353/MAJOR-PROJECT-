import { useState, useEffect } from 'react';

export function useTextAnimation(text, typingSpeed = 150,
pauseDuration = 1000) {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && displayedText.length < text.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === text.length) {
      // Pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      // Pause before typing again
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [displayedText, text, typingSpeed, pauseDuration, isDeleting]);

  return displayedText;
}