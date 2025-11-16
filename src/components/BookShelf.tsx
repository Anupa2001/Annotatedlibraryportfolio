import { Book } from '../App';
import { BookCard } from './BookCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface BookShelfProps {
  booksByGenre: Record<string, Book[]>;
  bookmarkedIds: Set<string>;
  onBookClick: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
}

export function BookShelf({ booksByGenre, bookmarkedIds, onBookClick, onToggleBookmark }: BookShelfProps) {
  const genres = Object.keys(booksByGenre);

  if (genres.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#9a7557] text-xl italic">
          No books found in this section of the library...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {genres.map((genre) => (
        <GenreSection
          key={genre}
          genre={genre}
          books={booksByGenre[genre]}
          bookmarkedIds={bookmarkedIds}
          onBookClick={onBookClick}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}

interface GenreSectionProps {
  genre: string;
  books: Book[];
  bookmarkedIds: Set<string>;
  onBookClick: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
}

function GenreSection({ genre, books, bookmarkedIds, onBookClick, onToggleBookmark }: GenreSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative" id={`genre-${genre.replace(/\s+/g, '-')}`}>
      {/* Library Section Header - like a placard on the shelf */}
      <div className="mb-8 relative">
        <div className="bg-[#511626] text-[#d4af37] px-8 py-4 inline-block rounded shadow-lg border-2 border-[#d4af37]">
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-[#d4af37]" />
            <div>
              <h2 className="text-[#e9ddd1] mb-1">{genre}</h2>
              <p className="text-[#b88b7d] text-sm italic">{books.length} {books.length === 1 ? 'volume' : 'volumes'} in collection</p>
            </div>
            <div className="w-1 h-12 bg-[#d4af37]" />
          </div>
        </div>
        {/* Decorative line extending from placard */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-[#d4af37] via-[#b88b7d] to-transparent -z-10" />
      </div>

      {/* Wooden Shelf */}
      <div className="relative bg-[#9a7557] rounded-lg shadow-2xl p-6 border-t-4 border-[#511626]">
        {/* Wood grain texture */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#511626_2px,#511626_4px)] rounded-lg" />
        
        {/* Shelf edge highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b88b7d] to-transparent" />
        
        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          {books.length > 3 && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#511626] text-[#d4af37] p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#6b1d2a] hover:scale-110 -translate-x-6"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#511626] text-[#d4af37] p-4 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#6b1d2a] hover:scale-110 translate-x-6"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Scrollable Books on Shelf */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 px-2 scroll-smooth hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {books.map((book) => (
              <div key={book.id} className="flex-shrink-0 w-72">
                <BookCard
                  book={book}
                  isBookmarked={bookmarkedIds.has(book.id)}
                  onClick={() => onBookClick(book)}
                  onToggleBookmark={() => onToggleBookmark(book.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Shelf support brackets */}
        <div className="absolute -bottom-3 left-8 w-12 h-6 bg-[#511626] rounded-b-lg shadow-md border-x-2 border-b-2 border-[#d4af37]" />
        <div className="absolute -bottom-3 right-8 w-12 h-6 bg-[#511626] rounded-b-lg shadow-md border-x-2 border-b-2 border-[#d4af37]" />
      </div>
    </section>
  );
}