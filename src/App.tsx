import { useState } from 'react';
import { BookOpen, Bookmark, Library, Search, Mail, User, BookMarked } from 'lucide-react';
import { BookShelf } from './components/BookShelf';
import { BookDetail } from './components/BookDetail';
import { AboutLibrarian } from './components/AboutLibrarian';
import { ContactForm } from './components/ContactForm';
import { BookmarkedCollection } from './components/BookmarkedCollection';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverColor: string;
  coverImage: string;
  description: string;
  year: string;
  content: string;
  technologies?: string[];
  link?: string;
  annotation?: string;
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The E-Commerce Chronicles',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjMxNzYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A full-stack e-commerce platform with real-time inventory management and secure payment processing.',
    year: '2024',
    content: 'Built a comprehensive e-commerce solution featuring user authentication, shopping cart functionality, order tracking, and admin dashboard. Implemented using React, Node.js, and PostgreSQL with Stripe integration for payments.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    link: 'https://github.com/yourusername/ecommerce',
    annotation: 'A challenging project that taught me the intricacies of payment processing and state management at scale.'
  },
  {
    id: '2',
    title: 'Design System Odyssey',
    author: 'Your Name',
    genre: 'UI/UX Design',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1756576357697-13dfc5fff61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMTk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive design system for a SaaS product, featuring 50+ reusable components and detailed documentation.',
    year: '2024',
    content: 'Created a cohesive design language including typography, color palettes, spacing systems, and component libraries. Collaborated with 5 developers to ensure seamless implementation across web and mobile platforms.',
    technologies: ['Figma', 'Storybook', 'React', 'Tailwind CSS'],
    annotation: 'This project transformed how our team thinks about consistency and scalability in design.'
  },
  {
    id: '3',
    title: 'AI Assistant Tales',
    author: 'Your Name',
    genre: 'Machine Learning',
    coverColor: 'bg-[#9a7557]',
    coverImage: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjMxNDU3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An AI-powered chatbot that provides customer support with natural language understanding and context awareness.',
    year: '2023',
    content: 'Developed a conversational AI using transformer models and fine-tuned on customer service data. Achieved 85% accuracy in intent classification and reduced response time by 60%.',
    technologies: ['Python', 'TensorFlow', 'OpenAI API', 'FastAPI'],
    link: 'https://github.com/yourusername/ai-assistant',
    annotation: 'My first deep dive into NLP - the moment I realized the true power of transformer architectures.'
  },
  {
    id: '4',
    title: 'Mobile App Saga',
    author: 'Your Name',
    genre: 'Mobile Development',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1580983703451-bf6bb44a9917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2MzI0ODY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A cross-platform fitness tracking app with social features and personalized workout recommendations.',
    year: '2023',
    content: 'Built a React Native application with offline-first architecture, real-time syncing, and integration with health APIs. Garnered 10K+ downloads in first month.',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
    annotation: 'Learning to optimize for mobile performance while maintaining rich functionality was incredibly rewarding.'
  },
  {
    id: '5',
    title: 'Data Visualization Compendium',
    author: 'Your Name',
    genre: 'Data Science',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjMyMDEyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Interactive dashboards for analyzing complex datasets with real-time updates and predictive analytics.',
    year: '2024',
    content: 'Created dynamic visualizations using D3.js and Python to help stakeholders make data-driven decisions. Processed millions of records with optimized queries and caching strategies.',
    technologies: ['D3.js', 'Python', 'Pandas', 'PostgreSQL'],
    link: 'https://github.com/yourusername/data-viz',
    annotation: 'The challenge of making data beautiful and accessible never gets old.'
  },
  {
    id: '6',
    title: 'Blockchain Adventures',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzYzMjE1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A decentralized marketplace for digital assets with smart contract integration and Web3 wallet support.',
    year: '2023',
    content: 'Developed smart contracts in Solidity and built a React frontend with Web3 integration. Implemented IPFS for decentralized storage and created an intuitive UI for crypto newcomers.',
    technologies: ['Solidity', 'Web3.js', 'React', 'IPFS'],
    annotation: 'Entering the world of blockchain felt like discovering a new paradigm of software architecture.'
  },
  {
    id: '7',
    title: 'Social Network Renaissance',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjMxNzYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A modern social platform with real-time messaging, stories, and intelligent content recommendation algorithms.',
    year: '2024',
    content: 'Built a scalable social network supporting millions of concurrent users with WebSocket connections for real-time updates.',
    technologies: ['React', 'WebSocket', 'Redis', 'MongoDB'],
    link: 'https://github.com/yourusername/social'
  },
  {
    id: '8',
    title: 'Cloud Infrastructure Memoirs',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzYzMjE1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'DevOps automation suite for managing multi-cloud infrastructure with Kubernetes orchestration.',
    year: '2023',
    content: 'Designed and implemented CI/CD pipelines reducing deployment time by 80% across AWS, Azure, and GCP.',
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions']
  },
  {
    id: '9',
    title: 'The Wireframing Anthology',
    author: 'Your Name',
    genre: 'UI/UX Design',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1756576357697-13dfc5fff61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMTk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Complete redesign of enterprise dashboard improving user satisfaction scores by 45%.',
    year: '2024',
    content: 'Conducted user research, created personas, and delivered high-fidelity prototypes tested with 200+ users.',
    technologies: ['Figma', 'Adobe XD', 'Miro', 'UserTesting']
  },
  {
    id: '10',
    title: 'Mobile Banking Revolution',
    author: 'Your Name',
    genre: 'Mobile Development',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1580983703451-bf6bb44a9917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2MzI0ODY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Secure mobile banking app with biometric authentication and instant money transfers.',
    year: '2023',
    content: 'Developed a fintech app handling $10M+ in daily transactions with bank-grade security.',
    technologies: ['Flutter', 'Firebase', 'Plaid API', 'Face ID']
  },
  {
    id: '11',
    title: 'Neural Networks Decoded',
    author: 'Your Name',
    genre: 'Machine Learning',
    coverColor: 'bg-[#9a7557]',
    coverImage: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjMxNDU3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Computer vision model for medical imaging achieving 94% accuracy in disease detection.',
    year: '2024',
    content: 'Trained deep learning models on 100K+ medical scans, collaborating with healthcare professionals.',
    technologies: ['PyTorch', 'OpenCV', 'CUDA', 'Docker'],
    annotation: 'This project showed me the life-changing potential of AI in healthcare.'
  },
  {
    id: '12',
    title: 'Predictive Analytics Journal',
    author: 'Your Name',
    genre: 'Data Science',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjMyMDEyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Machine learning pipeline predicting customer churn with 89% accuracy.',
    year: '2023',
    content: 'Built end-to-end ML system processing 50GB daily data, generating actionable business insights.',
    technologies: ['Python', 'Scikit-learn', 'Apache Spark', 'Airflow']
  },
  {
    id: '13',
    title: 'Accessibility Handbook',
    author: 'Your Name',
    genre: 'UI/UX Design',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1756576357697-13dfc5fff61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMTk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'WCAG 2.1 AAA compliant redesign making digital products accessible to all users.',
    year: '2024',
    content: 'Led accessibility audit and redesign, improving screen reader compatibility and keyboard navigation.',
    technologies: ['ARIA', 'NVDA', 'JAWS', 'axe DevTools']
  },
  {
    id: '14',
    title: 'IoT Smart Home Legacy',
    author: 'Your Name',
    genre: 'Mobile Development',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1580983703451-bf6bb44a9917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2MzI0ODY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Mobile app controlling 50+ IoT devices with voice commands and automation.',
    year: '2023',
    content: 'Integrated with Alexa, Google Home, and HomeKit for seamless smart home control.',
    technologies: ['Swift', 'Kotlin', 'MQTT', 'AWS IoT']
  }
];

export default function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [showBookmarked, setShowBookmarked] = useState(false);

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === null || book.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });

  // Group books by genre
  const booksByGenre = filteredBooks.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  // Get all unique genres
  const genres = Array.from(new Set(mockBooks.map(book => book.genre)));

  const toggleBookmark = (bookId: string) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  const handleViewBookmarks = () => {
    setSelectedBook(null);
    setShowAbout(false);
    setShowContact(false);
    setShowBookmarked(true);
  };

  const bookmarkedBooks = mockBooks.filter(book => bookmarkedIds.has(book.id));

  return (
    <div className="min-h-screen bg-[#e9ddd1]">
      {/* Library Header - Grand Reading Room Style */}
      <header className="bg-gradient-to-b from-[#511626] to-[#6b1d2a] text-[#e9ddd1] shadow-2xl border-b-4 border-[#d4af37] sticky top-0 z-50">
        {/* Ornamental top border */}
        <div className="h-2 bg-gradient-to-r from-[#d4af37] via-[#1e443d] to-[#d4af37]" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <Library className="w-10 h-10 text-[#d4af37]" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#d4af37] rounded-full animate-pulse" />
                </div>
                <div>
                  <h1 className="text-5xl text-[#e9ddd1] tracking-wide">The Portfolio Library</h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-[#d4af37] to-transparent mt-2" />
                </div>
              </div>
              <p className="text-[#b88b7d] italic text-lg ml-14">
                "A curated collection of projects, each a story worth reading"
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={() => setShowAbout(true)}
                variant="outline"
                className="border-2 border-[#1e443d] text-[#1e443d] hover:bg-[#1e443d] hover:text-[#e9ddd1] transition-colors"
              >
                <User className="w-5 h-5 mr-2" />
                About
              </Button>
              <Button
                onClick={handleViewBookmarks}
                variant="outline"
                className="border-2 border-[#1e443d] text-[#1e443d] hover:bg-[#1e443d] hover:text-[#e9ddd1] transition-colors relative"
              >
                <BookMarked className="w-5 h-5 mr-2" />
                My Collection
                {bookmarkedIds.size > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1e443d] text-[#e9ddd1] text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#d4af37]">
                    {bookmarkedIds.size}
                  </span>
                )}
              </Button>
              <Button
                onClick={() => setShowContact(true)}
                className="bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626] border-2 border-[#511626]"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Mail
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar - Library Card Catalog Style */}
      <div className="bg-[#9a7557] border-b-4 border-[#511626] shadow-inner">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#e9ddd1] rounded-lg p-2 shadow-xl border-2 border-[#b88b7d]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b1d2a] w-6 h-6" />
                <Input
                  type="text"
                  placeholder="Search the card catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-4 h-14 bg-white border-2 border-[#b88b7d] focus:border-[#d4af37] text-[#511626] text-lg rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Navigation */}
      <div className="bg-[#e9ddd1] border-b-2 border-[#b88b7d] shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setActiveGenre(null)}
              variant={activeGenre === null ? "default" : "outline"}
              className={activeGenre === null 
                ? "bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626] border-2 border-[#511626]" 
                : "border-2 border-[#1e443d] text-[#1e443d] hover:bg-[#1e443d] hover:text-[#e9ddd1]"}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              All Books
            </Button>
            
            {genres.map((genre) => (
              <Button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                variant={activeGenre === genre ? "default" : "outline"}
                className={activeGenre === genre 
                  ? "bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626] border-2 border-[#511626]" 
                  : "border-2 border-[#1e443d] text-[#1e443d] hover:bg-[#1e443d] hover:text-[#e9ddd1]"}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Reading Room */}
      <main className="container mx-auto px-4 py-12">
        {showAbout ? (
          <AboutLibrarian onClose={() => setShowAbout(false)} />
        ) : showContact ? (
          <ContactForm onClose={() => setShowContact(false)} />
        ) : showBookmarked ? (
          <BookmarkedCollection
            bookmarkedBooks={bookmarkedBooks}
            onBookClick={setSelectedBook}
            onToggleBookmark={toggleBookmark}
            onClose={() => setShowBookmarked(false)}
          />
        ) : selectedBook ? (
          <BookDetail
            book={selectedBook}
            isBookmarked={bookmarkedIds.has(selectedBook.id)}
            onClose={() => setSelectedBook(null)}
            onToggleBookmark={() => toggleBookmark(selectedBook.id)}
            onViewCollection={handleViewBookmarks}
          />
        ) : (
          <>
            {/* Subtle nudge to about section - like a library notice board */}
            <div className="mb-12 bg-gradient-to-r from-[#e9ddd1] to-white border-2 border-[#b88b7d] rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#511626] px-6 py-2 border-b-2 border-[#d4af37]">
                <p className="text-[#d4af37] text-sm uppercase tracking-wider">Library Notice</p>
              </div>
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#6b1d2a] rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-[#511626]">
                      <span className="italic">Curious about the curator behind this collection?</span>
                    </p>
                    <p className="text-[#9a7557] text-sm">Learn about the librarian's journey and expertise</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowAbout(true)}
                  className="bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626] border-2 border-[#511626]"
                >
                  Meet the Librarian
                </Button>
              </div>
            </div>

            {/* Library Stacks - Genre Sections */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-16 bg-[#d4af37]" />
                <div>
                  <h2 className="text-[#511626]">Browse the Stacks</h2>
                  <p className="text-[#9a7557] italic">Organized by genre for your convenience</p>
                </div>
              </div>
            </div>

            <BookShelf
              booksByGenre={booksByGenre}
              bookmarkedIds={bookmarkedIds}
              onBookClick={setSelectedBook}
              onToggleBookmark={toggleBookmark}
            />

            {/* Mobile Contact Button */}
            <div className="mt-16 flex justify-center gap-4 md:hidden">
              <Button
                onClick={() => setShowAbout(true)}
                variant="outline"
                className="border-2 border-[#511626] text-[#511626] hover:bg-[#511626] hover:text-[#e9ddd1]"
              >
                <User className="w-5 h-5 mr-2" />
                About
              </Button>
              <Button
                onClick={handleViewBookmarks}
                variant="outline"
                className="border-2 border-[#511626] text-[#511626] hover:bg-[#511626] hover:text-[#e9ddd1] relative"
              >
                <BookMarked className="w-5 h-5 mr-2" />
                Collection
                {bookmarkedIds.size > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#6b1d2a] text-[#e9ddd1] text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {bookmarkedIds.size}
                  </span>
                )}
              </Button>
              <button
                onClick={() => setShowContact(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#6b1d2a] text-[#e9ddd1] rounded hover:bg-[#511626] transition-colors border-2 border-[#511626]"
              >
                <Mail className="w-5 h-5" />
                Send Mail
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#511626] text-[#b88b7d] py-8 mt-20 border-t-4 border-[#d4af37]">
        <div className="container mx-auto px-4 text-center">
          <p className="italic text-[#e9ddd1] text-lg mb-2">
            "The only thing you absolutely have to know is the location of the library." - Albert Einstein
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <p className="text-[#b88b7d]">© 2024 Your Portfolio Library</p>
            <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
          </div>
        </div>
      </footer>
    </div>
  );
}