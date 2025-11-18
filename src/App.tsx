import { useState, useEffect, useRef } from 'react';
import { BookOpen, Library, Search, ArrowRight, BookMarked } from 'lucide-react';
import { BookShelf } from './components/BookShelf';
import { BookDetail } from './components/BookDetail';
import { ClimatePositivityDetail } from './components/ClimatePositivityDetail';
import { AboutLibrarian } from './components/AboutLibrarian';
import { ContactForm } from './components/ContactForm';
import { BookmarkedCollection } from './components/BookmarkedCollection';
import { CustomCursor } from './components/CustomCursor';
import { FloatingParticles } from './components/FloatingParticles';
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
    title: 'Climate Positivity',
    author: 'Your Name',
    genre: 'Trend Research',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzYzMjQ4NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive trend analysis exploring climate positivity as an emerging movement in fashion and beyond.',
    year: '2021',
    content: 'Project content here...',
    technologies: ['Media Scanning', 'Trend Forecasting', 'Data Analysis', 'Consumer Research'],
    annotation: 'This research opened my eyes to how language shapes climate action.'
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMG9ubGluZXxlbnwxfHx8fDE3NjMxNzYxNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Full-stack e-commerce platform with real-time inventory management and secure payment processing.',
    year: '2024',
    content: 'Built a comprehensive e-commerce solution...',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
  },
  {
    id: '3',
    title: 'Design System',
    author: 'Your Name',
    genre: 'UI/UX Design',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1756576357697-13dfc5fff61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMTk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Comprehensive design system for SaaS product with 50+ reusable components and documentation.',
    year: '2024',
    content: 'Created a cohesive design language...',
    technologies: ['Figma', 'Storybook', 'React', 'Tailwind CSS']
  },
  {
    id: '4',
    title: 'AI Assistant',
    author: 'Your Name',
    genre: 'Machine Learning',
    coverColor: 'bg-[#9a7557]',
    coverImage: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjMxNDU3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'AI-powered chatbot with natural language understanding and context awareness for customer support.',
    year: '2023',
    content: 'Developed a conversational AI...',
    technologies: ['Python', 'TensorFlow', 'OpenAI API', 'FastAPI']
  },
  {
    id: '5',
    title: 'Fitness Tracking App',
    author: 'Your Name',
    genre: 'Mobile Development',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1580983703451-bf6bb44a9917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2MzI0ODY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Cross-platform fitness app with social features and personalized workout recommendations.',
    year: '2023',
    content: 'Built a React Native application...',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit']
  },
  {
    id: '6',
    title: 'Data Visualization Dashboard',
    author: 'Your Name',
    genre: 'Data Science',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjMyMDEyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Interactive dashboards for analyzing complex datasets with real-time updates and predictions.',
    year: '2024',
    content: 'Created dynamic visualizations...',
    technologies: ['D3.js', 'Python', 'Pandas', 'PostgreSQL']
  },
  {
    id: '7',
    title: 'Blockchain Marketplace',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzYzMjE1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Decentralized marketplace for digital assets with smart contract integration and Web3 support.',
    year: '2023',
    content: 'Developed smart contracts...',
    technologies: ['Solidity', 'Web3.js', 'React', 'IPFS']
  },
  {
    id: '8',
    title: 'Neural Networks Research',
    author: 'Your Name',
    genre: 'Machine Learning',
    coverColor: 'bg-[#9a7557]',
    coverImage: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjMxNDU3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Computer vision model for medical imaging achieving 94% accuracy in disease detection.',
    year: '2024',
    content: 'Trained deep learning models...',
    technologies: ['PyTorch', 'OpenCV', 'CUDA', 'Docker']
  },
  {
    id: '9',
    title: 'Accessibility Redesign',
    author: 'Your Name',
    genre: 'UI/UX Design',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1756576357697-13dfc5fff61c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMTk3OTc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'WCAG 2.1 AAA compliant redesign making digital products accessible to all users.',
    year: '2024',
    content: 'Led accessibility audit...',
    technologies: ['ARIA', 'NVDA', 'JAWS', 'axe DevTools']
  },
  {
    id: '10',
    title: 'Banking Mobile App',
    author: 'Your Name',
    genre: 'Mobile Development',
    coverColor: 'bg-[#1e443d]',
    coverImage: 'https://images.unsplash.com/photo-1580983703451-bf6bb44a9917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbW9iaWxlJTIwYXBwfGVufDF8fHx8MTc2MzI0ODY0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Secure mobile banking app with biometric authentication and instant money transfers.',
    year: '2023',
    content: 'Developed a fintech app...',
    technologies: ['Flutter', 'Firebase', 'Plaid API', 'Face ID']
  },
  {
    id: '11',
    title: 'Predictive Analytics Engine',
    author: 'Your Name',
    genre: 'Data Science',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjMyMDEyODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Machine learning pipeline predicting customer churn with 89% accuracy.',
    year: '2023',
    content: 'Built end-to-end ML system...',
    technologies: ['Python', 'Scikit-learn', 'Apache Spark', 'Airflow']
  },
  {
    id: '12',
    title: 'Cloud Infrastructure',
    author: 'Your Name',
    genre: 'Web Development',
    coverColor: 'bg-[#6b1d2a]',
    coverImage: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzYzMjE1MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'DevOps automation suite for managing multi-cloud infrastructure with Kubernetes.',
    year: '2023',
    content: 'Designed and implemented CI/CD pipelines...',
    technologies: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions']
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
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / 600}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === null || book.genre === activeGenre;
    return matchesSearch && matchesGenre;
  });

  const booksByGenre = filteredBooks.reduce((acc, book) => {
    if (!acc[book.genre]) {
      acc[book.genre] = [];
    }
    acc[book.genre].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

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
    <div className="min-h-screen bg-[#faf8f5]">
      <CustomCursor />
      <FloatingParticles />
      
      {/* Header */}
      <header className="header-sticky">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <button 
              className="logo-button" 
              onClick={() => {
                setSelectedBook(null);
                setShowAbout(false);
                setShowContact(false);
                setShowBookmarked(false);
              }}
            >
              <Library className="logo-icon" />
              <span className="logo-text">The Annotated Library</span>
            </button>
            
            {/* Navigation */}
            <nav className="nav-menu">
              <button onClick={() => {
                setShowAbout(true);
                setShowContact(false);
                setShowBookmarked(false);
                setSelectedBook(null);
              }} className="nav-link">
                About
              </button>
              <button onClick={handleViewBookmarks} className="nav-link nav-link-bookmark">
                Collection
                {bookmarkedIds.size > 0 && (
                  <span className="bookmark-badge">{bookmarkedIds.size}</span>
                )}
              </button>
              <button onClick={() => {
                setShowContact(true);
                setShowAbout(false);
                setShowBookmarked(false);
                setSelectedBook(null);
              }} className="btn-primary">
                Contact <ArrowRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
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
          selectedBook.title === 'Climate Positivity' ? (
            <ClimatePositivityDetail
              book={selectedBook}
              isBookmarked={bookmarkedIds.has(selectedBook.id)}
              onClose={() => setSelectedBook(null)}
              onToggleBookmark={() => toggleBookmark(selectedBook.id)}
              onViewCollection={handleViewBookmarks}
            />
          ) : (
            <BookDetail
              book={selectedBook}
              isBookmarked={bookmarkedIds.has(selectedBook.id)}
              onClose={() => setSelectedBook(null)}
              onToggleBookmark={() => toggleBookmark(selectedBook.id)}
              onViewCollection={handleViewBookmarks}
            />
          )
        ) : (
          <div className="page-wrapper">
            {/* Hero */}
            <section className="hero-section">
              <div className="hero-content">
                <div className="hero-title-wrapper">
                  <h1 className="hero-title">
                    <span className="hero-title-line">Curated</span>
                    <span className="hero-title-line">Projects</span>
                  </h1>
                </div>
                
                <p className="hero-subtitle">
                  A collection of work spanning research, development, and design—each
                  project documented with notes and insights.
                </p>
              </div>
            </section>

            {/* Search & Filters */}
            <section className="filter-section">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="genre-filters">
                <button
                  onClick={() => setActiveGenre(null)}
                  className={activeGenre === null ? 'filter-pill filter-pill-active' : 'filter-pill'}
                >
                  All
                </button>
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={activeGenre === genre ? 'filter-pill filter-pill-active' : 'filter-pill'}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="projects-section">
              <BookShelf
                booksByGenre={booksByGenre}
                bookmarkedIds={bookmarkedIds}
                onBookClick={setSelectedBook}
                onToggleBookmark={toggleBookmark}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}