import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Book } from '../App';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookCardProps {
  book: Book;
  isBookmarked: boolean;
  onClick: () => void;
  onToggleBookmark: () => void;
}

export function BookCard({ book, isBookmarked, onClick, onToggleBookmark }: BookCardProps) {
  return (
    <div className="group relative h-full">
      {/* Book spine effect - more prominent */}
      <div className="absolute -left-3 top-6 bottom-6 w-4 bg-gradient-to-b from-[#511626] via-[#9a7557] to-[#511626] rounded-l shadow-lg border-l-2 border-[#b88b7d]">
        {/* Spine decorative lines */}
        <div className="absolute top-4 left-1 right-1 h-px bg-[#d4af37]" />
        <div className="absolute bottom-4 left-1 right-1 h-px bg-[#d4af37]" />
      </div>
      
      <div
        className="bg-[#e9ddd1] border-4 border-[#b88b7d] hover:border-[#1e443d] rounded-r-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(30,68,61,0.3)] transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col"
        onClick={onClick}
      >
        {/* Book cover image */}
        <div className="relative h-80 overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${book.coverColor} opacity-50 mix-blend-multiply`} />
          
          {/* Leather texture overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.2)_100%)]" />
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
          
          {/* Annotation tab - golden ribbon bookmark */}
          {book.annotation && (
            <div className="absolute top-0 right-8 w-12 h-24 bg-gradient-to-b from-[#d4af37] to-[#b88b7d] border-x-2 border-[#511626] shadow-2xl">
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-transparent to-[#511626] clip-path-[polygon(0_0,100%_0,50%_100%)]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            </div>
          )}
          
          {/* Genre badge on cover - like a library sticker */}
          <div className="absolute top-6 left-6">
            <div className="inline-block px-4 py-2 rounded-full text-xs text-[#e9ddd1] bg-[#511626] shadow-2xl border-2 border-[#d4af37] backdrop-blur">
              {book.genre}
            </div>
          </div>

          {/* Gold embossing effect on edges */}
          <div className="absolute inset-0 border-4 border-[#d4af37]/20 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>
        
        {/* Book pages - visible from side */}
        <div className="absolute right-0 top-10 bottom-10 w-2 bg-gradient-to-r from-white to-[#e9ddd1] shadow-inner">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-px bg-[#b88b7d]/30" style={{ marginTop: `${(i + 1) * 15}%` }} />
          ))}
        </div>
        
        <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-white to-[#e9ddd1] relative">
          {/* Aged paper texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />
          
          <div className="flex items-start justify-between gap-2 mb-3 relative z-10">
            <div className="flex-1">
              <h3 className="text-[#511626] group-hover:text-[#6b1d2a] transition-colors leading-tight">
                {book.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark();
              }}
              className="text-[#6b1d2a] hover:text-[#511626] hover:bg-[#e9ddd1] shrink-0"
            >
              {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 fill-current" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          <p className="text-[#9a7557] text-sm italic mb-4 relative z-10 border-b border-[#b88b7d]/30 pb-2">by {book.author}</p>
          
          <p className="text-[#511626] mb-4 line-clamp-3 flex-1 relative z-10">
            {book.description}
          </p>
          
          <div className="flex items-center justify-between text-sm pt-4 border-t-2 border-[#b88b7d]/50 relative z-10">
            <span className="text-[#6b1d2a] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6b1d2a]" />
              {book.year}
            </span>
            <span className="text-[#9a7557] italic group-hover:underline group-hover:text-[#6b1d2a] flex items-center gap-1">
              Open Book →
            </span>
          </div>
        </div>
        
        {/* Decorative corner embellishments */}
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] opacity-50" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] opacity-50" />
      </div>
    </div>
  );
}