import { useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import { Book } from '../App';
import { BookCard } from './BookCard';

interface MagneticCardProps {
  book: Book;
  isBookmarked: boolean;
  onBookClick: () => void;
  onToggleBookmark: () => void;
  index: number;
}

export function MagneticCard({ book, isBookmarked, onBookClick, onToggleBookmark, index }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateStyle, setRotateStyle] = useState({});

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotateStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setRotateStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={rotateStyle}
    >
      <BookCard
        book={book}
        isBookmarked={isBookmarked}
        onBookClick={onBookClick}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
}