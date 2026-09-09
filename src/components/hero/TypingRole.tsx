import React, { useState, useEffect } from 'react';
import { roles as defaultRoles } from '../../data/roles';
import { useReducedMotion } from 'motion/react';

interface TypingRoleProps {
  roles?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export const TypingRole: React.FC<TypingRoleProps> = ({
  roles = defaultRoles,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 1800,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(roles[0]);
      return;
    }

    const currentFullRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentFullRole.length) {
        timer = setTimeout(() => {
          setCurrentText(currentFullRole.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing full word, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentFullRole.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseDuration, shouldReduceMotion]);

  return (
    <div className={`inline-flex items-center text-cyan-400 font-semibold tracking-tight min-h-[1.5em] ${className}`}>
      <span>{currentText}</span>
      {!shouldReduceMotion && (
        <span
          className="inline-block w-[2px] h-[1.1em] ml-1.5 bg-gradient-to-b from-cyan-300 to-blue-500 rounded-full animate-pulse align-middle"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
