import { useState } from 'react';
import { Bookmark, BookMarked, ArrowUpRight } from 'lucide-react';
import { Book } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookCardProps {
  book: Book;
  isBookmarked: boolean;
  onBookClick: () => void;
  onToggleBookmark: () => void;
}

export function BookCard({ book, isBookmarked, onBookClick, onToggleBookmark }: BookCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="project-card" onClick={onBookClick}>
      <div className="project-image-wrapper">
        <div className={`project-image-container ${imageLoaded ? 'loaded' : ''}`}>
          <ImageWithFallback
            src={book.coverImage}
            alt={book.title}
            className="project-image"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="project-image-overlay">
            <div className="overlay-content-wrapper">
              <span className="view-project-text">View Project</span>
              <ArrowUpRight className="view-project-icon" />
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark();
          }}
          className="bookmark-btn"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? (
            <BookMarked className="w-5 h-5" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="project-info">
        <div className="project-meta">
          <span className="project-genre">{book.genre}</span>
          <span className="project-year">{book.year}</span>
        </div>

        <h3 className="project-title">{book.title}</h3>
        
        <p className="project-description">{book.description}</p>

        {book.technologies && book.technologies.length > 0 && (
          <div className="project-tags">
            {book.technologies.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="project-tag">
                {tech}
              </span>
            ))}
            {book.technologies.length > 4 && (
              <span className="project-tag project-tag-more">
                +{book.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
