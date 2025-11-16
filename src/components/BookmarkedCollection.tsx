import { X, BookMarked, Trash2, BookOpen } from 'lucide-react';
import { Book } from '../App';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookmarkedCollectionProps {
  bookmarkedBooks: Book[];
  onBookClick: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
  onClose: () => void;
}

export function BookmarkedCollection({ bookmarkedBooks, onBookClick, onToggleBookmark, onClose }: BookmarkedCollectionProps) {
  // Group bookmarked books by genre
  const booksByGenre = bookmarkedBooks.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  const genres = Object.keys(booksByGenre);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="mb-6 text-[#9a7557] hover:text-[#511626] hover:bg-[#e9ddd1]"
      >
        <X className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      {/* Collection Header - Reading Table Style */}
      <div className="bg-[#e9ddd1] border-4 border-[#b88b7d] rounded-lg shadow-2xl overflow-hidden mb-12">
        {/* Wood grain top edge */}
        <div className="h-3 bg-gradient-to-r from-[#511626] via-[#9a7557] to-[#511626] relative">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_11px)]" />
        </div>

        <div className="bg-white p-8 md:p-12 relative">
          {/* Page lines texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="h-px bg-[#b88b7d]" style={{ marginTop: '40px' }} />
            ))}
          </div>

          {/* Header content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#6b1d2a] rounded-lg flex items-center justify-center shadow-xl border-2 border-[#d4af37]">
                  <BookMarked className="w-8 h-8 text-[#d4af37]" />
                </div>
                <div>
                  <h1 className="text-[#511626] mb-2">My Personal Collection</h1>
                  <p className="text-[#9a7557] italic" style={{ fontFamily: "'Caveat', cursive" }}>
                    A carefully curated reading list
                  </p>
                </div>
              </div>

              {/* Bookplate decoration */}
              <div className="hidden md:block bg-white border-2 border-[#b88b7d] p-4 rounded shadow-lg transform rotate-2">
                <div className="text-center">
                  <p className="text-[#511626] text-sm mb-1">Ex Libris</p>
                  <div className="h-px bg-[#d4af37] mb-1" />
                  <p className="text-[#9a7557] text-xs italic">Your Name</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-[#fef3c7]/30 to-transparent border-l-4 border-[#d4af37] rounded-r">
              <div className="w-1 h-16 bg-[#d4af37]" />
              <div>
                <p className="text-[#511626] mb-2 leading-relaxed">
                  This is your personal reading list—a curated collection of projects that caught your attention.
                  Each bookmark represents a project worth revisiting, studying, and drawing inspiration from.
                </p>
                <p className="text-[#9a7557] text-sm italic" style={{ fontFamily: "'Caveat', cursive" }}>
                  "We are what we repeatedly study and admire."
                </p>
              </div>
            </div>

            {/* Collection stats */}
            {bookmarkedBooks.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-[#b88b7d] shadow-md text-center">
                  <div className="text-3xl text-[#6b1d2a] mb-1">{bookmarkedBooks.length}</div>
                  <div className="text-[#9a7557] text-sm">Total Books</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-[#b88b7d] shadow-md text-center">
                  <div className="text-3xl text-[#1e443d] mb-1">{genres.length}</div>
                  <div className="text-[#9a7557] text-sm">Genres</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-[#b88b7d] shadow-md text-center">
                  <div className="text-3xl text-[#6b1d2a] mb-1">
                    {Math.round((bookmarkedBooks.length / 14) * 100)}%
                  </div>
                  <div className="text-[#9a7557] text-sm">Collection</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wood grain bottom edge */}
        <div className="h-3 bg-gradient-to-r from-[#511626] via-[#9a7557] to-[#511626] relative border-t-2 border-[#d4af37]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_11px)]" />
        </div>
      </div>

      {/* Bookmarked Books - Organized by Genre */}
      {bookmarkedBooks.length === 0 ? (
        <div className="bg-white border-4 border-[#b88b7d] rounded-lg shadow-xl overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-[#511626] via-[#9a7557] to-[#511626]" />
          <div className="text-center py-20 px-8 relative">
            {/* Page texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-px bg-[#b88b7d]" style={{ marginTop: '50px' }} />
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-[#e9ddd1] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#b88b7d]">
                <BookMarked className="w-12 h-12 text-[#b88b7d]" />
              </div>
              <h2 className="text-[#511626] mb-3">No Bookmarks Yet</h2>
              <p className="text-[#9a7557] mb-2 max-w-md mx-auto leading-relaxed">
                Your reading list is empty. Start building your collection by bookmarking projects that inspire you.
              </p>
              <p className="text-[#6b1d2a] text-sm mb-8 italic" style={{ fontFamily: "'Caveat', cursive" }}>
                → Browse the library and click the bookmark icon on any project
              </p>
              <Button
                onClick={onClose}
                className="bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626]"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Library
              </Button>
            </div>
          </div>
          <div className="h-3 bg-gradient-to-r from-[#511626] via-[#9a7557] to-[#511626] border-t-2 border-[#d4af37]" />
        </div>
      ) : (
        <div className="space-y-12">
          {genres.map((genre) => (
            <section key={genre} className="relative">
              {/* Genre Shelf Header */}
              <div className="mb-6 relative">
                <div className="bg-[#511626] text-[#d4af37] px-6 py-3 inline-block rounded shadow-lg border-2 border-[#d4af37]">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#d4af37]" />
                    <h2 className="text-[#e9ddd1]">{genre}</h2>
                    <div className="w-1 h-8 bg-[#d4af37]" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-[#d4af37] via-[#b88b7d] to-transparent -z-10" />
              </div>

              {/* Books Grid on Shelf */}
              <div className="bg-[#9a7557] rounded-lg shadow-2xl p-6 border-t-4 border-[#511626] relative">
                {/* Wood grain texture */}
                <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#511626_2px,#511626_4px)] rounded-lg" />
                
                {/* Shelf edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#b88b7d] to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {booksByGenre[genre].map((book) => (
                    <div
                      key={book.id}
                      className="group bg-[#e9ddd1] border-4 border-[#b88b7d] hover:border-[#1e443d] rounded-r-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(30,68,61,0.3)] transition-all duration-300 overflow-hidden relative"
                    >
                      {/* Book spine */}
                      <div className="absolute -left-3 top-6 bottom-6 w-4 bg-gradient-to-b from-[#511626] via-[#9a7557] to-[#511626] rounded-l shadow-lg border-l-2 border-[#b88b7d]">
                        <div className="absolute top-4 left-1 right-1 h-px bg-[#d4af37]" />
                        <div className="absolute bottom-4 left-1 right-1 h-px bg-[#d4af37]" />
                      </div>

                      {/* Golden bookmark ribbon */}
                      <div className="absolute top-0 right-8 w-10 h-20 bg-gradient-to-b from-[#d4af37] to-[#b88b7d] z-10 shadow-xl border-x-2 border-[#511626]">
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-[#511626]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                      </div>

                      {/* Cover Image */}
                      <div
                        className="relative h-56 overflow-hidden cursor-pointer"
                        onClick={() => onBookClick(book)}
                      >
                        <ImageWithFallback
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 ${book.coverColor} opacity-50 mix-blend-multiply`} />
                        
                        {/* Leather texture */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.2)_100%)]" />
                        
                        {/* Genre badge */}
                        <div className="absolute top-4 left-4">
                          <div className="inline-block px-3 py-1 rounded-full text-xs text-[#e9ddd1] bg-[#511626] shadow-xl border-2 border-[#d4af37]">
                            {book.genre}
                          </div>
                        </div>

                        {/* Gold embossing */}
                        <div className="absolute inset-0 border-4 border-[#d4af37]/20 pointer-events-none" />
                      </div>

                      {/* Book pages visible from side */}
                      <div className="absolute right-0 top-14 bottom-14 w-2 bg-gradient-to-r from-white to-[#e9ddd1] shadow-inner">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-px bg-[#b88b7d]/30" style={{ marginTop: `${(i + 1) * 15}%` }} />
                        ))}
                      </div>

                      {/* Content */}
                      <div className="p-5 bg-gradient-to-b from-white to-[#e9ddd1] relative">
                        {/* Aged paper texture */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none" />
                        
                        <div className="relative z-10">
                          <h3
                            className="text-[#511626] mb-2 cursor-pointer hover:text-[#6b1d2a] transition-colors leading-tight"
                            onClick={() => onBookClick(book)}
                          >
                            {book.title}
                          </h3>
                          <p className="text-[#9a7557] text-sm italic mb-3 border-b border-[#b88b7d]/30 pb-2">
                            by {book.author}
                          </p>
                          <p className="text-[#511626] text-sm line-clamp-2 mb-4">
                            {book.description}
                          </p>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => onBookClick(book)}
                              className="flex-1 bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626] border border-[#511626] text-sm"
                            >
                              Open Book
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onToggleBookmark(book.id)}
                              className="border-2 border-[#6b1d2a] text-[#6b1d2a] hover:bg-[#6b1d2a] hover:text-[#e9ddd1]"
                              title="Remove from collection"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Decorative corners */}
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37] opacity-50" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37] opacity-50" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shelf support brackets */}
                <div className="absolute -bottom-3 left-8 w-12 h-6 bg-[#511626] rounded-b-lg shadow-md border-x-2 border-b-2 border-[#d4af37]" />
                <div className="absolute -bottom-3 right-8 w-12 h-6 bg-[#511626] rounded-b-lg shadow-md border-x-2 border-b-2 border-[#d4af37]" />
              </div>
            </section>
          ))}

          {/* Collection Summary Card */}
          <div className="bg-[#fef3c7] border-2 border-[#fbbf24] rounded-lg p-6 shadow-lg relative overflow-hidden">
            {/* Tape effect */}
            <div className="absolute top-0 left-1/4 w-20 h-8 bg-[#fbbf24]/30 transform -rotate-3" />
            <div className="absolute top-0 right-1/4 w-20 h-8 bg-[#fbbf24]/30 transform rotate-3" />
            
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[#92400e] text-lg mb-2" style={{ fontFamily: "'Caveat', cursive" }}>
                  📚 Collection Progress
                </p>
                <p className="text-[#92400e] text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                  You've bookmarked {bookmarkedBooks.length} {bookmarkedBooks.length === 1 ? 'project' : 'projects'} across {genres.length} {genres.length === 1 ? 'genre' : 'genres'}
                </p>
                <p className="text-[#92400e] text-sm mt-1" style={{ fontFamily: "'Caveat', cursive" }}>
                  Keep exploring and building your library!
                </p>
              </div>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-2 border-[#92400e] text-[#92400e] hover:bg-[#92400e] hover:text-[#fef3c7]"
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}