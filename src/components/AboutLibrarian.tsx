import { User, Glasses, Coffee, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface AboutLibrarianProps {
  onClose: () => void;
}

export function AboutLibrarian({ onClose }: AboutLibrarianProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="mb-6 text-[#9a7557] hover:text-[#511626] hover:bg-[#e9ddd1]"
      >
        <X className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      <section className="bg-[#e9ddd1] border-2 border-[#b88b7d] rounded-lg shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-3 gap-0">
          {/* Portrait */}
          <div className="relative h-64 md:h-auto">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1643900173035-e90587358d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwcG9ydHJhaXQlMjBwZXJzb258ZW58MXx8fHwxNzYzMjQ4NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Librarian portrait"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#e9ddd1] md:block hidden" />
          </div>

          {/* About Content */}
          <div className="md:col-span-2 p-8 md:p-12 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-[#6b1d2a]" />
              <h2 className="text-[#511626]">About the Librarian</h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#511626] leading-relaxed mb-4">
                Welcome to my portfolio library. I'm <span className="text-[#6b1d2a]">Your Name</span>, a passionate developer and curator of digital experiences. Like a librarian who carefully catalogs and preserves knowledge, I craft each project with attention to detail and purpose.
              </p>
              
              <p className="text-[#511626] leading-relaxed mb-6">
                With a background spanning web development, design systems, and machine learning, I believe every project tells a story—one that deserves to be documented, annotated, and shared. This library represents not just my work, but my journey through the ever-evolving landscape of technology.
              </p>

              {/* Quick facts */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start gap-3 p-4 bg-[#e9ddd1] rounded border border-[#b88b7d]">
                  <Glasses className="w-5 h-5 text-[#6b1d2a] mt-1 shrink-0" />
                  <div>
                    <p className="text-[#511626] mb-1">Specialties</p>
                    <p className="text-[#9a7557] text-sm">Full-Stack Development, UI/UX Design, Machine Learning</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-[#e9ddd1] rounded border border-[#b88b7d]">
                  <Coffee className="w-5 h-5 text-[#6b1d2a] mt-1 shrink-0" />
                  <div>
                    <p className="text-[#511626] mb-1">Philosophy</p>
                    <p className="text-[#9a7557] text-sm italic">"Code is poetry written for both machines and humans"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="mt-8 pt-6 border-t border-[#b88b7d]/30">
              <p className="text-[#6b1d2a] italic text-sm">
                Currently accepting new commissions and collaborations. Feel free to send me a message via the mail form.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}