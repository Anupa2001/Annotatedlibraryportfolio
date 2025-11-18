import { useEffect, useRef } from 'react';
import { X, ArrowLeft, Mail, Github, Linkedin, Twitter } from 'lucide-react';

interface AboutLibrarianProps {
  onClose: () => void;
}

export function AboutLibrarian({ onClose }: AboutLibrarianProps) {
  const heroRef = useRef<HTMLDivElement>(null);

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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
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
      <section className="about-hero">
        <div className="about-hero-content" ref={heroRef}>
          <h1 className="about-title">
            <span className="about-title-line">About the</span>
            <span className="about-title-line">Librarian</span>
          </h1>
          
          <p className="about-subtitle">
            Curator of digital experiences, keeper of creative projects, and
            documenter of design thinking.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="about-content">
        <div className="about-content-wrapper">
          {/* Main Content */}
          <article className="about-main">
            <section className="about-section">
              <h2 className="about-section-title">Background</h2>
              <div className="about-section-content">
                <p>
                  I'm a designer and developer with a passion for creating thoughtful digital
                  experiences. This library represents my journey through various projects,
                  each catalogued with the care and attention you'd find in a well-curated
                  collection.
                </p>
                <p>
                  My approach combines research, design thinking, and technical execution to
                  create work that's both beautiful and functional. Every project in this
                  library tells a story—from initial research to final implementation.
                </p>
              </div>
            </section>

            <section className="about-section">
              <h2 className="about-section-title">Philosophy</h2>
              <div className="about-section-content">
                <div className="about-philosophy-grid">
                  <div className="about-philosophy-card">
                    <h3>Research-Driven</h3>
                    <p>
                      Every project begins with deep research and understanding. I believe
                      in knowing the why before tackling the how.
                    </p>
                  </div>

                  <div className="about-philosophy-card">
                    <h3>Iterative Process</h3>
                    <p>
                      Design is never finished. I embrace iteration and refinement,
                      learning from each version to create better solutions.
                    </p>
                  </div>

                  <div className="about-philosophy-card">
                    <h3>Thoughtful Documentation</h3>
                    <p>
                      Like a librarian, I believe in careful documentation. Each project
                      includes notes, insights, and lessons learned.
                    </p>
                  </div>

                  <div className="about-philosophy-card">
                    <h3>Human-Centered</h3>
                    <p>
                      Technology serves people. My work focuses on creating experiences
                      that are accessible, intuitive, and meaningful.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-section">
              <h2 className="about-section-title">Skills & Expertise</h2>
              <div className="about-section-content">
                <div className="about-skills-grid">
                  <div className="about-skill-group">
                    <h4 className="about-skill-category">Design</h4>
                    <ul className="about-skill-list">
                      <li>UI/UX Design</li>
                      <li>Design Systems</li>
                      <li>Prototyping</li>
                      <li>User Research</li>
                      <li>Accessibility</li>
                    </ul>
                  </div>

                  <div className="about-skill-group">
                    <h4 className="about-skill-category">Development</h4>
                    <ul className="about-skill-list">
                      <li>React & TypeScript</li>
                      <li>Frontend Architecture</li>
                      <li>Animation & Interaction</li>
                      <li>Performance Optimization</li>
                      <li>Responsive Design</li>
                    </ul>
                  </div>

                  <div className="about-skill-group">
                    <h4 className="about-skill-category">Research</h4>
                    <ul className="about-skill-list">
                      <li>Trend Analysis</li>
                      <li>Market Research</li>
                      <li>Data Visualization</li>
                      <li>Consumer Insights</li>
                      <li>Strategic Planning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="about-sidebar">
            <div className="about-sidebar-card">
              <h3 className="about-sidebar-title">Connect</h3>
              
              <div className="about-social-links">
                <a href="mailto:hello@example.com" className="about-social-link">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </a>

                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="about-social-link">
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="about-social-link">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>

                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="about-social-link">
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>

            <div className="about-sidebar-card">
              <h3 className="about-sidebar-title">Library Stats</h3>
              
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-number">12</span>
                  <span className="about-stat-label">Projects</span>
                </div>

                <div className="about-stat">
                  <span className="about-stat-number">6</span>
                  <span className="about-stat-label">Categories</span>
                </div>

                <div className="about-stat">
                  <span className="about-stat-number">4</span>
                  <span className="about-stat-label">Years</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
