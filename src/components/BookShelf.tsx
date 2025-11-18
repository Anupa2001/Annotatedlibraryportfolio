import { useEffect, useRef } from 'react';
import { Book } from '../App';
import { MagneticCard } from './MagneticCard';

interface BookShelfProps {
  booksByGenre: Record<string, Book[]>;
  bookmarkedIds: Set<string>;
  onBookClick: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
}

export function BookShelf({ booksByGenre, bookmarkedIds, onBookClick, onToggleBookmark }: BookShelfProps) {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const cardRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Animate sections on scroll
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) sectionObserver.observe(ref);
    });

    // Stagger animate cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-in-view');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, [booksByGenre]);

  const allBooks = Object.values(booksByGenre).flat();

  if (allBooks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <p className="empty-state-title">No projects found</p>
          <p className="empty-state-subtitle">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  let cardIndex = 0;

  return (
    <div className="bookshelf-container">
      {Object.entries(booksByGenre).map(([genre, books], genreIndex) => (
        <section
          key={genre}
          ref={(el) => {
            if (el) sectionRefs.current[genreIndex] = el;
          }}
          className="genre-section"
        >
          <div className="genre-header">
            <h2 className="genre-title">{genre}</h2>
            <div className="genre-count-wrapper">
              <div className="genre-line" />
              <span className="genre-count">{books.length.toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="projects-grid">
            {books.map((book, index) => {
              const currentIndex = cardIndex++;
              return (
                <div
                  key={book.id}
                  ref={(el) => {
                    if (el) cardRefs.current[currentIndex] = el;
                  }}
                  className="project-card-wrapper"
                  style={{ '--card-index': currentIndex % books.length } as React.CSSProperties}
                >
                  <MagneticCard
                    book={book}
                    isBookmarked={bookmarkedIds.has(book.id)}
                    onBookClick={() => onBookClick(book)}
                    onToggleBookmark={() => onToggleBookmark(book.id)}
                    index={currentIndex}
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}