import { useEffect, useRef } from 'react';
import { X, ArrowLeft, BookMarked } from 'lucide-react';
import { Book } from '../App';
import { BookCard } from './BookCard';

interface BookmarkedCollectionProps {
  bookmarkedBooks: Book[];
  onBookClick: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
  onClose: () => void;
}

export function BookmarkedCollection({ bookmarkedBooks, onBookClick, onToggleBookmark, onClose }: BookmarkedCollectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / 600}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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
      window.removeEventListener('scroll', handleScroll);
      cardObserver.disconnect();
    };
  }, [bookmarkedBooks]);

  return (
    <div className="collection-page">
      {/* Header */}
      <header className="detail-header">
        <button onClick={onClose} className="detail-back-btn">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Library</span>
        </button>

        <button onClick={onClose} className="detail-close-btn">
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Hero */}
      <section className="collection-hero">
        <div className="collection-hero-content" ref={heroRef}>
          <div className="collection-icon-wrapper">
            <BookMarked className="collection-icon" />
          </div>
          
          <h1 className="collection-title">
            <span className="collection-title-line">Your</span>
            <span className="collection-title-line">Collection</span>
          </h1>
          
          <p className="collection-subtitle">
            {bookmarkedBooks.length === 0 
              ? "You haven't bookmarked any projects yet. Browse the library and save your favorites."
              : `${bookmarkedBooks.length} ${bookmarkedBooks.length === 1 ? 'project' : 'projects'} saved for later reference.`
            }
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="collection-content">
        {bookmarkedBooks.length === 0 ? (
          <div className="collection-empty">
            <div className="collection-empty-card">
              <BookMarked className="collection-empty-icon" />
              <h2 className="collection-empty-title">No Bookmarks Yet</h2>
              <p className="collection-empty-text">
                Start building your collection by bookmarking projects that inspire you.
              </p>
              <button onClick={onClose} className="btn-primary">
                Browse Projects
              </button>
            </div>
          </div>
        ) : (
          <div className="collection-grid">
            {bookmarkedBooks.map((book, index) => (
              <div
                key={book.id}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className="project-card-wrapper"
                style={{ '--card-index': index } as React.CSSProperties}
              >
                <BookCard
                  book={book}
                  isBookmarked={true}
                  onBookClick={() => onBookClick(book)}
                  onToggleBookmark={() => onToggleBookmark(book.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
