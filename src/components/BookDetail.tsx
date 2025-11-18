import { useEffect, useRef } from 'react';
import { X, ExternalLink, Calendar, Tag, BookMarked, Bookmark, ArrowLeft } from 'lucide-react';
import { Book } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface BookDetailProps {
  book: Book;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: () => void;
  onViewCollection: () => void;
}

export function BookDetail({ book, isBookmarked, onClose, onToggleBookmark, onViewCollection }: BookDetailProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="detail-page">
      {/* Header */}
      <header className="detail-header">
        <button onClick={onClose} className="detail-back-btn">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </button>

        <div className="detail-header-actions">
          <button
            onClick={onToggleBookmark}
            className={isBookmarked ? 'bookmark-btn-active' : 'bookmark-btn-inactive'}
          >
            {isBookmarked ? (
              <>
                <BookMarked className="w-5 h-5" />
                <span>Bookmarked</span>
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5" />
                <span>Bookmark</span>
              </>
            )}
          </button>

          <button onClick={onClose} className="detail-close-btn">
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-text" ref={heroRef}>
            <div className="detail-meta-tags">
              <span className="detail-tag">{book.genre}</span>
              <span className="detail-year">
                <Calendar className="w-4 h-4" />
                {book.year}
              </span>
            </div>

            <h1 className="detail-title">
              <span className="detail-title-line">{book.title}</span>
            </h1>

            <p className="detail-subtitle">{book.description}</p>

            {book.link && (
              <div className="detail-hero-actions">
                <a 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View Live Project
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          <div className="detail-hero-image">
            <ImageWithFallback
              src={book.coverImage}
              alt={book.title}
              className="detail-cover-image"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="detail-content" ref={contentRef}>
        <div className="detail-content-wrapper">
          {/* Main Content */}
          <article className="detail-main">
            <section className="detail-section">
              <h2 className="detail-section-title">Overview</h2>
              <div className="detail-section-content">
                <p>{book.content}</p>
                {book.annotation && (
                  <div className="detail-annotation">
                    <div className="annotation-marker" />
                    <p className="annotation-text">{book.annotation}</p>
                  </div>
                )}
              </div>
            </section>

            {book.technologies && book.technologies.length > 0 && (
              <section className="detail-section">
                <h2 className="detail-section-title">Technologies & Tools</h2>
                <div className="detail-tech-grid">
                  {book.technologies.map((tech, idx) => (
                    <div key={idx} className="detail-tech-card">
                      <Tag className="w-4 h-4 text-[#6b1d2a]" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            <div className="detail-sidebar-card">
              <h3 className="detail-sidebar-title">Project Info</h3>
              
              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <span className="detail-info-label">Category</span>
                  <span className="detail-info-value">{book.genre}</span>
                </div>

                <div className="detail-info-item">
                  <span className="detail-info-label">Year</span>
                  <span className="detail-info-value">{book.year}</span>
                </div>

                <div className="detail-info-item">
                  <span className="detail-info-label">Author</span>
                  <span className="detail-info-value">{book.author}</span>
                </div>
              </div>

              {isBookmarked && (
                <button onClick={onViewCollection} className="detail-collection-btn">
                  View Collection
                  <BookMarked className="w-4 h-4" />
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
