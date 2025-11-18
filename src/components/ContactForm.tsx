import { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, Send, Mail, User, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface ContactFormProps {
  onClose: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="contact-page">
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
      <section className="contact-hero">
        <div className="contact-hero-content" ref={heroRef}>
          <h1 className="contact-title">
            <span className="contact-title-line">Get in</span>
            <span className="contact-title-line">Touch</span>
          </h1>
          
          <p className="contact-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Drop me a message and let's create something great together.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="contact-content">
        <div className="contact-content-wrapper">
          {/* Form */}
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <Send className="w-12 h-12" />
                </div>
                <h2 className="contact-success-title">Message Sent!</h2>
                <p className="contact-success-text">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User className="w-4 h-4" />
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows={8}
                    className="form-textarea"
                  />
                </div>

                <Button type="submit" className="btn-primary w-full">
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="contact-sidebar">
            <div className="contact-sidebar-card">
              <h3 className="contact-sidebar-title">Other Ways to Connect</h3>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="contact-method-content">
                    <span className="contact-method-label">Email</span>
                    <a href="mailto:hello@example.com" className="contact-method-value">
                      hello@example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-sidebar-card">
              <h3 className="contact-sidebar-title">Response Time</h3>
              <p className="contact-response-text">
                I typically respond within 24-48 hours during business days. For urgent
                inquiries, please mention "urgent" in your subject line.
              </p>
            </div>

            <div className="contact-sidebar-card">
              <h3 className="contact-sidebar-title">What to Include</h3>
              <ul className="contact-checklist">
                <li>Project timeline</li>
                <li>Budget range (if applicable)</li>
                <li>Key requirements</li>
                <li>Any relevant links or examples</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
