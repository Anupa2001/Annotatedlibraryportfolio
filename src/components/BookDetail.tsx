import { X, Bookmark, BookmarkCheck, ExternalLink, Calendar, Tag, Pen, StickyNote, Lightbulb, Target, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { Book } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookDetailProps {
  book: Book;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: () => void;
  onViewCollection: () => void;
}

export function BookDetail({ book, isBookmarked, onClose, onToggleBookmark, onViewCollection }: BookDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="mb-6 text-[#9a7557] hover:text-[#511626] hover:bg-[#e9ddd1]"
      >
        <X className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      {/* Open Book Layout */}
      <div className="bg-[#e9ddd1] border-4 border-[#b88b7d] rounded-lg shadow-2xl overflow-hidden">
        {/* Book Top Edge */}
        <div className="h-3 bg-gradient-to-r from-[#511626] via-[#9a7557] to-[#511626] relative">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_11px)]" />
        </div>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Page - Cover & Overview */}
          <div className="bg-white p-8 lg:p-10 border-r-2 border-[#d4af37] relative overflow-hidden">
            {/* Page lines texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="h-px bg-[#b88b7d]" style={{ marginTop: '32px' }} />
              ))}
            </div>

            {/* Sticky content */}
            <div className="relative z-10">
              {/* Cover Image with Post-it */}
              <div className="relative mb-6 group">
                <div className="relative h-72 overflow-hidden rounded shadow-lg border-2 border-[#b88b7d]">
                  <ImageWithFallback
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${book.coverColor} opacity-40 mix-blend-multiply`} />
                </div>

                {/* Yellow Post-it Note */}
                <div className="absolute -right-4 -bottom-4 w-48 bg-[#fef3c7] p-3 shadow-xl transform rotate-3 border border-[#fbbf24]">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-[#fbbf24] opacity-20" />
                  <p className="text-[#92400e] text-sm relative z-10" style={{ fontFamily: "'Caveat', cursive" }}>
                    Started: {book.year}
                    <br />
                    {book.technologies?.slice(0, 2).join(', ')}
                    <br />
                    ⭐ Featured Project
                  </p>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mb-6">
                <Badge className="bg-[#511626] text-[#d4af37] border-2 border-[#d4af37] mb-3">
                  <Tag className="w-3 h-3 mr-1" />
                  {book.genre}
                </Badge>
                <h1 className="text-[#511626] mb-2 leading-tight">
                  {book.title}
                </h1>
                <p className="text-[#9a7557] italic text-lg mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
                  by {book.author}
                </p>
                
                {/* Date stamp */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6b1d2a]/10 border border-[#6b1d2a]/30 rounded text-sm text-[#6b1d2a]">
                  <Calendar className="w-4 h-4" />
                  Published {book.year}
                </div>
              </div>

              {/* Synopsis with margin notes */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Pen className="w-4 h-4 text-[#6b1d2a]" />
                  <h3 className="text-[#511626]">Synopsis</h3>
                  <div className="flex-1 h-px bg-[#b88b7d]" />
                </div>
                <p className="text-[#511626] leading-relaxed pl-4 border-l-2 border-[#fbbf24]">
                  {book.description}
                </p>
                
                {/* Handwritten margin note */}
                <div className="mt-4 ml-4 text-[#6b1d2a] text-sm italic transform -rotate-1" style={{ fontFamily: "'Caveat', cursive" }}>
                  ✓ Really proud of this one!
                </div>
              </div>

              {/* Quick Stats - Index Cards */}
              <div className="mb-6 space-y-3">
                <div className="bg-white p-4 rounded shadow border-l-4 border-[#1e443d]">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-[#1e443d]" />
                    <span className="text-[#511626] text-sm">Project Type</span>
                  </div>
                  <p className="text-[#9a7557] text-sm">{book.genre}</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow border-l-4 border-[#1e443d]">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#1e443d]" />
                    <span className="text-[#511626] text-sm">Technologies</span>
                  </div>
                  <p className="text-[#9a7557] text-sm">{book.technologies?.length || 0} core tools used</p>
                </div>
              </div>

              {/* Bookmark actions */}
              <div className="space-y-3">
                <Button
                  onClick={onToggleBookmark}
                  className={`w-full ${
                    isBookmarked 
                      ? 'bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626]' 
                      : 'bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626]'
                  }`}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="w-5 h-5 mr-2 fill-current" />
                      Bookmarked - Remove
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-5 h-5 mr-2" />
                      Add to My Collection
                    </>
                  )}
                </Button>
                
                {isBookmarked && (
                  <Button
                    onClick={onViewCollection}
                    variant="outline"
                    className="w-full border-2 border-[#1e443d] text-[#1e443d] hover:bg-[#1e443d] hover:text-[#e9ddd1]"
                  >
                    View My Collection →
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right Page - Detailed Content */}
          <div className="bg-[#fdfcfb] p-8 lg:p-10 relative">
            {/* Page lines texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="h-px bg-[#b88b7d]" style={{ marginTop: '32px' }} />
              ))}
            </div>

            {/* Scrollable content */}
            <div className="relative z-10 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#b88b7d] scrollbar-track-transparent" style={{ maxHeight: '1000px' }}>
              
              {/* Project Overview */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-1 bg-[#6b1d2a]" />
                  <h2 className="text-[#511626]">Project Overview</h2>
                </div>
                <div className="bg-white/50 p-5 rounded border border-[#b88b7d]/30 shadow-inner">
                  <p className="text-[#511626] leading-relaxed whitespace-pre-line">
                    {book.content}
                  </p>
                </div>

                {/* Handwritten highlight note */}
                <div className="mt-3 flex items-start gap-2">
                  <div className="w-2 h-2 bg-[#fbbf24] rounded-full mt-2" />
                  <p className="text-[#6b1d2a] text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                    Key learning: Understanding the full project lifecycle
                  </p>
                </div>
              </div>

              {/* Research & Discovery Phase */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#fbbf24]" />
                  <h2 className="text-[#511626]">Research & Discovery</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#fef9f0] p-4 rounded border-l-4 border-[#fbbf24]">
                    <h4 className="text-[#511626] mb-2">Initial Challenge</h4>
                    <p className="text-[#9a7557] text-sm leading-relaxed">
                      The project began with identifying user pain points and conducting competitive analysis. 
                      Through user interviews and surveys, we discovered key opportunities for innovation in {book.genre.toLowerCase()}.
                    </p>
                  </div>
                  
                  <div className="bg-[#fef9f0] p-4 rounded border-l-4 border-[#fbbf24]">
                    <h4 className="text-[#511626] mb-2">Research Methods</h4>
                    <ul className="text-[#9a7557] text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-[#fbbf24] mt-1">▸</span>
                        <span>User interviews with 25+ participants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#fbbf24] mt-1">▸</span>
                        <span>Competitive analysis of 10 similar solutions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#fbbf24] mt-1">▸</span>
                        <span>Market research and trend analysis</span>
                      </li>
                    </ul>
                  </div>

                  {/* Research note */}
                  <div className="ml-6 text-[#6b1d2a] text-sm italic" style={{ fontFamily: "'Caveat', cursive" }}>
                    → Research phase took 3 weeks but was crucial for success
                  </div>
                </div>
              </div>

              {/* Design Process */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Pen className="w-5 h-5 text-[#1e443d]" />
                  <h2 className="text-[#511626]">Design & Planning</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-[#511626] leading-relaxed">
                    The design phase involved creating wireframes, prototypes, and iterating based on user feedback. 
                    We focused on creating an intuitive user experience that addresses the core problems identified during research.
                  </p>
                  
                  {/* Design iterations sticky note */}
                  <div className="bg-[#e0f2fe] p-4 shadow-md transform -rotate-1 border-l-4 border-[#0ea5e9] relative">
                    <div className="absolute top-2 right-4 w-12 h-4 bg-[#fbbf24]/40" />
                    <h4 className="text-[#075985] mb-2">Design Iterations</h4>
                    <p className="text-[#0c4a6e] text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                      "Went through 4 major iterations before landing on the final design. 
                      User testing after each iteration helped refine the experience."
                    </p>
                  </div>
                </div>
              </div>

              {/* Development & Implementation */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-1 bg-[#6b1d2a]" />
                  <h2 className="text-[#511626]">Development Process</h2>
                </div>
                <div className="bg-white/50 p-5 rounded border border-[#b88b7d]/30 shadow-inner">
                  <p className="text-[#511626] leading-relaxed mb-4">
                    Implementation followed agile methodology with 2-week sprints. The tech stack was chosen based on 
                    scalability requirements, team expertise, and long-term maintainability.
                  </p>
                  
                  <div className="bg-[#f0fdf4] p-4 rounded border border-[#86efac]">
                    <h4 className="text-[#166534] mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Technical Challenges
                    </h4>
                    <p className="text-[#15803d] text-sm">
                      Overcame several technical challenges including performance optimization, 
                      scalability issues, and third-party API integration. Each challenge taught valuable lessons about system architecture.
                    </p>
                  </div>
                </div>
              </div>

              {/* Curator's Annotation - Pink Post-it */}
              {book.annotation && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <StickyNote className="w-4 h-4 text-[#ec4899]" />
                    <h3 className="text-[#511626] text-sm uppercase tracking-wide">Personal Reflections</h3>
                  </div>
                  
                  {/* Pink sticky note */}
                  <div className="bg-[#fce7f3] p-5 shadow-xl transform -rotate-1 border-l-4 border-[#ec4899] relative">
                    <div className="absolute top-0 right-4 w-16 h-6 bg-[#fbbf24]/30 transform -rotate-2" />
                    <p className="text-[#831843] leading-relaxed text-lg mb-3" style={{ fontFamily: "'Caveat', cursive" }}>
                      "{book.annotation}"
                    </p>
                    <div className="mt-3 flex justify-end">
                      <div className="text-[#831843] text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                        - {book.author}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results & Impact */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#6b1d2a]" />
                  <h2 className="text-[#511626]">Results & Impact</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#fef3c7] to-[#fef9f0] p-4 rounded shadow">
                    <div className="text-2xl mb-1 text-[#92400e]">85%</div>
                    <div className="text-[#92400e] text-sm">User Satisfaction</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#fef3c7] to-[#fef9f0] p-4 rounded shadow">
                    <div className="text-2xl mb-1 text-[#92400e]">10K+</div>
                    <div className="text-[#92400e] text-sm">Active Users</div>
                  </div>
                </div>
                <div className="mt-3 text-[#6b1d2a] text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                  ✨ Exceeded initial goals by 40%
                </div>
              </div>

              {/* Technologies - Bullet journal style */}
              {book.technologies && book.technologies.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-1 bg-[#6b1d2a]" />
                    <h2 className="text-[#511626]">Tech Stack</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {book.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white/50 p-2 rounded">
                        <div className="w-2 h-2 border-2 border-[#6b1d2a] rounded-full" />
                        <span className="text-[#511626] text-sm">{tech}</span>
                        {index % 2 === 0 && (
                          <span className="text-[#1e443d] text-lg ml-auto" style={{ fontFamily: "'Caveat', cursive" }}>✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Learnings */}
              <div className="mb-8 bg-[#fef3c7]/30 p-5 rounded border-2 border-dashed border-[#fbbf24] relative">
                <div className="absolute -top-3 left-4 bg-[#fdfcfb] px-2">
                  <span className="text-[#92400e] text-sm" style={{ fontFamily: "'Caveat', cursive" }}>Key Takeaways:</span>
                </div>
                <ul className="space-y-2 mt-2">
                  <li className="text-[#92400e]" style={{ fontFamily: "'Caveat', cursive" }}>
                    → Completed in {book.year} - Learned importance of user feedback
                  </li>
                  <li className="text-[#92400e]" style={{ fontFamily: "'Caveat', cursive" }}>
                    → Mastered {book.technologies?.[0] || 'modern tech'} through hands-on experience
                  </li>
                  <li className="text-[#92400e]" style={{ fontFamily: "'Caveat', cursive" }}>
                    → Collaboration and communication were key to success
                  </li>
                  <li className="text-[#92400e]" style={{ fontFamily: "'Caveat', cursive" }}>
                    → Would love to build on this further with v2.0
                  </li>
                </ul>
              </div>

              {/* View Project Link */}
              {book.link && (
                <div className="pt-6 border-t-2 border-dashed border-[#b88b7d]">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#6b1d2a] text-[#6b1d2a] hover:bg-[#6b1d2a] hover:text-white"
                    onClick={() => window.open(book.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Live Project & Case Study
                  </Button>
                </div>
              )}

              {/* Bottom doodle */}
              <div className="mt-8 text-center">
                <div className="inline-block transform rotate-2">
                  <svg width="120" height="30" className="opacity-30">
                    <path d="M 0 15 Q 30 5, 60 15 T 120 15" stroke="#6b1d2a" strokeWidth="2" fill="none" strokeDasharray="2,3" />
                    <circle cx="60" cy="15" r="8" stroke="#6b1d2a" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Bottom Edge */}
        <div className="h-4 bg-gradient-to-r from-[#511626] via-[#9a7557] to-[#511626] relative border-t-2 border-[#d4af37]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_11px)]" />
        </div>
      </div>

      {/* Coffee stain decoration */}
      <div className="absolute -right-12 top-32 w-24 h-24 rounded-full bg-[#b88b7d] opacity-5 blur-xl pointer-events-none hidden xl:block" />
    </div>
  );
}