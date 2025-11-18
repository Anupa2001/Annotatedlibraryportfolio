import { useEffect, useRef } from 'react';
import { X, ExternalLink, Calendar, ArrowLeft, BookMarked, Bookmark, TrendingUp } from 'lucide-react';
import { Book } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ClimatePositivityDetailProps {
  book: Book;
  isBookmarked: boolean;
  onClose: () => void;
  onToggleBookmark: () => void;
  onViewCollection: () => void;
}

export function ClimatePositivityDetail({ book, isBookmarked, onClose, onToggleBookmark, onViewCollection }: ClimatePositivityDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    // Scroll animations
    const observer = new IntersectionObserver(
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
      if (ref) observer.observe(ref);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
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

            {/* Annotation */}
            {book.annotation && (
              <div className="climate-annotation">
                <div className="annotation-marker" />
                <p className="annotation-text">✏️ {book.annotation}</p>
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

      {/* Main Content */}
      <div className="climate-content">
        <div className="climate-grid">
          {/* Left Column - Main Content */}
          <div className="climate-main">
            
            {/* Project Objectives */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[0] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">Project Objectives</h2>
              <div className="climate-objectives-grid">
                <div className="climate-objective">
                  <div className="objective-number">01</div>
                  <p>Create a media scan of the selected trends</p>
                </div>
                <div className="climate-objective">
                  <div className="objective-number">02</div>
                  <p>To provide a suitable name to the trend</p>
                </div>
                <div className="climate-objective">
                  <div className="objective-number">03</div>
                  <p>To find out who started the trend?</p>
                </div>
                <div className="climate-objective">
                  <div className="objective-number">04</div>
                  <p>To find out who are innovators and potential early adopters?</p>
                </div>
                <div className="climate-objective">
                  <div className="objective-number">05</div>
                  <p>To study the physical or virtual space where the trend emerges</p>
                </div>
                <div className="climate-objective">
                  <div className="objective-number">06</div>
                  <p>To find out the potential triggers and drivers for the trends</p>
                </div>
                <div className="climate-objective">
                  <div className="objective-number">07</div>
                  <p>To study where the trend is heading in the future</p>
                </div>
              </div>
            </section>

            {/* Defining Climate Positivity */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[1] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">Defining Climate Positivity</h2>
              <div className="climate-definition-block">
                <p className="climate-definition-text">
                  Climate positivity or "earth positivity" suggests that a brand is playing an active role in reversing climate change by offsetting significantly more than it emits.
                </p>
              </div>
            </section>

            {/* Key Takeaways */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[2] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">Key Takeaways from Media Scan</h2>
              <div className="climate-takeaways">
                <div className="takeaway-card">
                  <p>The media scan shows this is an emerging trend and will be the new buzzword in the fashion industry this year. It is emerging in several industries like F&B, Automobiles, Textiles and most recently fashion.</p>
                </div>
                <div className="takeaway-card">
                  <p>It also shows a shift from sustainability in the next few decades where brands will be looking at more specific and scalable goals under climate positivity.</p>
                </div>
                <div className="takeaway-card">
                  <p>Around 350 brands are working with the organisation, Climate Neutral to achieve a certification which shows their commitment to the plan.</p>
                </div>
                <div className="takeaway-card">
                  <p>Brands will relook the way they use their resources or the way they brand themselves in the market, promoting the right ideas.</p>
                </div>
              </div>

              {/* Media Scan Links Placeholder */}
              <div className="climate-links-placeholder">
                <h3 className="links-placeholder-title">📎 Media Scan Documentation</h3>
                <div className="links-placeholder-list">
                  <div className="link-placeholder-item">
                    <ExternalLink className="w-4 h-4" />
                    <span>Link to research article 1</span>
                  </div>
                  <div className="link-placeholder-item">
                    <ExternalLink className="w-4 h-4" />
                    <span>Link to research article 2</span>
                  </div>
                  <div className="link-placeholder-item">
                    <ExternalLink className="w-4 h-4" />
                    <span>Link to research article 3</span>
                  </div>
                </div>
              </div>
            </section>

            {/* When Was It Introduced */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[3] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">When Was the Word Introduced?</h2>
              <div className="climate-timeline">
                <div className="timeline-item">
                  <div className="timeline-year">2018</div>
                  <div className="timeline-content">
                    <p>It was defined by <strong>Fast Company in June 2018</strong> as "an activity that goes beyond achieving net zero carbon emissions to actually create an environmental benefit by removing additional carbon dioxide from the atmosphere".</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-year">Recent</div>
                  <div className="timeline-content">
                    <p>Social and environmental justice non-profit <strong>Slow Factory Foundation</strong> proposed a new term to replace sustainability: "climate positivity".</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Early Adopters and Innovators */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[4] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">Early Adopters and Innovators</h2>
              <div className="climate-adopters-grid">
                <div className="adopter-card">
                  <div className="adopter-icon">🍔</div>
                  <div className="adopter-content">
                    <h3>Max Burgers</h3>
                    <span className="adopter-date">June 2018</span>
                    <p>A Swedish burger joint was the first brand to introduce the word in the market by creating climate positive burgers.</p>
                  </div>
                </div>

                <div className="adopter-card">
                  <div className="adopter-icon">🏠</div>
                  <div className="adopter-content">
                    <h3>IKEA</h3>
                    <span className="adopter-date">January 2020</span>
                    <p>Announced its plan to reduce their carbon emissions by 2030 significantly, bringing the term closer to the fashion industry.</p>
                  </div>
                </div>

                <div className="adopter-card">
                  <div className="adopter-icon">👟</div>
                  <div className="adopter-content">
                    <h3>Allbirds</h3>
                    <span className="adopter-date">January 2020</span>
                    <p>Became the first fashion brand to label their products with the carbon footprint, thus initiating a major conversation.</p>
                  </div>
                </div>

                <div className="adopter-card">
                  <div className="adopter-icon">👗</div>
                  <div className="adopter-content">
                    <h3>Reformation</h3>
                    <span className="adopter-date">December 2020</span>
                    <p>Declared it will be climate positive and used regenerative agriculture to achieve climate neutral certification the same year.</p>
                  </div>
                </div>

                <div className="adopter-card">
                  <div className="adopter-icon">👜</div>
                  <div className="adopter-content">
                    <h3>Burberry</h3>
                    <span className="adopter-date">June 2021</span>
                    <p>Charted out its plan to go climate positive by 2040, becoming one of the first luxury brands to set science based targets for it.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Drivers Fueling the Growth */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[5] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">Drivers Fueling the Growth of Climate Positivity</h2>
              <div className="climate-drivers">
                
                {/* Driver 1: Shift from Sustainability */}
                <div className="driver-card">
                  <div className="driver-image-wrapper">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1592285694277-861ac7587079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJpbGl0eSUyMGdyZWVuJTIwZnV0dXJlfGVufDF8fHx8MTc2MzMzMDI4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Sustainability"
                      className="driver-image"
                    />
                    <div className="driver-overlay">
                      <span className="driver-emoji">🔄</span>
                    </div>
                  </div>
                  <div className="driver-content">
                    <h3>Shift from Sustainability</h3>
                    <p>The evolution from traditional sustainability practices to more aggressive climate-positive strategies reflects a growing understanding that merely sustaining current conditions is insufficient. Brands are recognizing the need to actively reverse environmental damage.</p>
                  </div>
                </div>

                {/* Driver 2: Climate Crisis */}
                <div className="driver-card">
                  <div className="driver-image-wrapper">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1642714388464-9d350c8cff39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwZWFydGh8ZW58MXx8fHwxNzYzMjQ3MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Climate Crisis"
                      className="driver-image"
                    />
                    <div className="driver-overlay">
                      <span className="driver-emoji">🌍</span>
                    </div>
                  </div>
                  <div className="driver-content">
                    <h3>Climate Crisis</h3>
                    <p>Increasing awareness of the climate emergency has pushed both consumers and corporations to demand more impactful environmental action. The urgency of the crisis has accelerated the adoption of climate-positive practices.</p>
                  </div>
                </div>

                {/* Driver 3: Overconsumption */}
                <div className="driver-card">
                  <div className="driver-image-wrapper">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1665702860632-4dfcd4b2d869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3VzdGFpbmFibGUlMjBjbG90aGluZ3xlbnwxfHx8fDE3NjMzMzAyODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Overconsumption"
                      className="driver-image"
                    />
                    <div className="driver-overlay">
                      <span className="driver-emoji">🛍️</span>
                    </div>
                  </div>
                  <div className="driver-content">
                    <h3>Overconsumption</h3>
                    <p>The fashion industry's role in overconsumption and waste generation has driven the need for radical change. Climate positivity offers a framework for addressing these systemic issues while maintaining business viability.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Google Trend Reports */}
            <section 
              ref={(el) => { if (el) sectionRefs.current[6] = el; }}
              className="climate-section"
            >
              <h2 className="climate-section-title">Google Trend Reports</h2>
              
              {/* Graph 1: Search Interest Over Time */}
              <div className="trends-chart-container">
                <div className="trends-chart">
                  <h3 className="trends-chart-title">Search Interest Over Time</h3>
                  <svg className="trends-svg" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e443d" />
                        <stop offset="100%" stopColor="#6b1d2a" />
                      </linearGradient>
                    </defs>
                    
                    <line x1="50" y1="180" x2="550" y2="180" stroke="#b88b7d" strokeWidth="2"/>
                    <line x1="50" y1="10" x2="50" y2="180" stroke="#b88b7d" strokeWidth="2"/>
                    
                    <line x1="50" y1="45" x2="550" y2="45" stroke="#e9ddd1" strokeWidth="1"/>
                    <line x1="50" y1="90" x2="550" y2="90" stroke="#e9ddd1" strokeWidth="1"/>
                    <line x1="50" y1="135" x2="550" y2="135" stroke="#e9ddd1" strokeWidth="1"/>
                    
                    <polyline
                      points="50,170 150,160 250,140 350,110 450,80 550,50"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                    />
                    
                    <circle cx="50" cy="170" r="4" fill="#6b1d2a"/>
                    <circle cx="150" cy="160" r="4" fill="#6b1d2a"/>
                    <circle cx="250" cy="140" r="4" fill="#6b1d2a"/>
                    <circle cx="350" cy="110" r="4" fill="#6b1d2a"/>
                    <circle cx="450" cy="80" r="4" fill="#6b1d2a"/>
                    <circle cx="550" cy="50" r="4" fill="#6b1d2a"/>
                    
                    <text x="40" y="15" fontSize="12" fill="#9a7557">100</text>
                    <text x="40" y="95" fontSize="12" fill="#9a7557">50</text>
                    <text x="40" y="185" fontSize="12" fill="#9a7557">0</text>
                    
                    <text x="45" y="195" fontSize="12" fill="#9a7557">2018</text>
                    <text x="245" y="195" fontSize="12" fill="#9a7557">2020</text>
                    <text x="445" y="195" fontSize="12" fill="#9a7557">2022</text>
                  </svg>
                </div>
                
                <div className="trends-insight">
                  <div className="insight-icon">📌</div>
                  <div>
                    <h4 className="insight-title">Key Takeaway 1</h4>
                    <p>Search interest for "climate positivity" has grown exponentially since 2018, with a significant spike in 2020-2021 as major brands began adopting the terminology. The trend shows sustained growth indicating mainstream acceptance.</p>
                  </div>
                </div>
              </div>

              {/* Graph 2: Regional Interest Comparison */}
              <div className="trends-chart-container">
                <div className="trends-chart">
                  <h3 className="trends-chart-title">Regional Interest Comparison</h3>
                  <svg className="trends-svg" viewBox="0 0 600 200">
                    <line x1="50" y1="180" x2="550" y2="180" stroke="#b88b7d" strokeWidth="2"/>
                    <line x1="50" y1="10" x2="50" y2="180" stroke="#b88b7d" strokeWidth="2"/>
                    
                    <rect x="80" y="60" width="60" height="120" fill="#1e443d" opacity="0.8" rx="4"/>
                    <rect x="170" y="90" width="60" height="90" fill="#1e443d" opacity="0.8" rx="4"/>
                    <rect x="260" y="100" width="60" height="80" fill="#1e443d" opacity="0.8" rx="4"/>
                    <rect x="350" y="110" width="60" height="70" fill="#1e443d" opacity="0.8" rx="4"/>
                    <rect x="440" y="130" width="60" height="50" fill="#1e443d" opacity="0.8" rx="4"/>
                    
                    <text x="95" y="195" fontSize="11" fill="#9a7557">Sweden</text>
                    <text x="190" y="195" fontSize="11" fill="#9a7557">UK</text>
                    <text x="275" y="195" fontSize="11" fill="#9a7557">USA</text>
                    <text x="360" y="195" fontSize="11" fill="#9a7557">France</text>
                    <text x="455" y="195" fontSize="11" fill="#9a7557">Asia</text>
                    
                    <text x="40" y="15" fontSize="12" fill="#9a7557">100</text>
                    <text x="40" y="95" fontSize="12" fill="#9a7557">50</text>
                    <text x="40" y="185" fontSize="12" fill="#9a7557">0</text>
                  </svg>
                </div>
                
                <div className="trends-insight">
                  <div className="insight-icon">📌</div>
                  <div>
                    <h4 className="insight-title">Key Takeaway 2</h4>
                    <p>Northern Europe, particularly Sweden and the UK, shows the highest regional interest in climate positivity - likely influenced by early adopters like Max Burgers and progressive environmental policies. Asia Pacific region shows growing interest as the concept gains global traction.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <aside className="climate-sidebar">
            <div className="climate-sidebar-sticky">
              
              {/* Key Definitions */}
              <div className="climate-sidebar-card">
                <h3 className="climate-sidebar-title">📝 Key Definitions</h3>
                <div className="definitions-list">
                  <div className="definition-item">
                    <h4>Carbon Neutral</h4>
                    <p>An activity releases net zero carbon emissions into the atmosphere.</p>
                  </div>
                  <div className="definition-item">
                    <h4>Climate Positive</h4>
                    <p>Goes beyond net zero to actually remove additional CO₂ from the atmosphere.</p>
                  </div>
                  <div className="definition-item">
                    <h4>Carbon Negative</h4>
                    <p>Same as "climate positive."</p>
                  </div>
                  <div className="definition-item">
                    <h4>Carbon Positive</h4>
                    <p>Marketing term—can be confusing, generally avoided.</p>
                  </div>
                </div>
              </div>

              {/* Future Trajectory */}
              <div className="climate-sidebar-card">
                <h3 className="climate-sidebar-title">📈 Where is it headed?</h3>
                <div className="trajectory-list">
                  <div className="trajectory-item">
                    <div className="trajectory-dot" />
                    <span>Mainstream adoption by 2025</span>
                  </div>
                  <div className="trajectory-item">
                    <div className="trajectory-dot" />
                    <span>Industry-wide certifications</span>
                  </div>
                  <div className="trajectory-item">
                    <div className="trajectory-dot" />
                    <span>Regulatory requirements</span>
                  </div>
                  <div className="trajectory-item">
                    <div className="trajectory-dot" />
                    <span>Consumer expectation</span>
                  </div>
                </div>
              </div>

              {/* Research Methods */}
              {book.technologies && book.technologies.length > 0 && (
                <div className="climate-sidebar-card">
                  <h3 className="climate-sidebar-title">🔬 Research Methods</h3>
                  <div className="methods-list">
                    {book.technologies.map((tech, idx) => (
                      <div key={idx} className="method-item">
                        <div className="method-dot" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collection Link */}
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
