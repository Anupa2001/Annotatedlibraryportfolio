import { useState } from 'react';
import { X, Send, Stamp, Feather } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface ContactFormProps {
  onClose: () => void;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Form submitted:', formData);
    setIsSent(true);
    setTimeout(() => {
      onClose();
      setIsSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="mb-6 text-[#9a7557] hover:text-[#511626] hover:bg-[#e9ddd1]"
      >
        <X className="w-4 h-4 mr-2" />
        Back to Library
      </Button>

      {/* Letter/Mail Form */}
      <div className="relative">
        {/* Envelope-style container */}
        <div className="bg-[#e9ddd1] border-2 border-[#b88b7d] rounded-lg shadow-2xl overflow-hidden">
          {/* Top flap decoration */}
          <div className="h-4 bg-[#511626] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6b1d2a] via-[#511626] to-[#6b1d2a]" />
          </div>

          {/* Letter header */}
          <div className="bg-white border-b-2 border-[#b88b7d]/50 p-8 relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Feather className="w-5 h-5 text-[#6b1d2a]" />
                  <h1 className="text-[#511626]">Correspondence</h1>
                </div>
                <p className="text-[#9a7557] italic">Send a message to the librarian</p>
              </div>
              
              {/* Decorative stamp */}
              <div className="hidden md:block">
                <div className="w-20 h-20 border-4 border-[#6b1d2a] rotate-12 flex items-center justify-center bg-[#e9ddd1]">
                  <Stamp className="w-10 h-10 text-[#6b1d2a]" />
                </div>
              </div>
            </div>

            {/* Date line */}
            <div className="mt-6 text-right text-[#9a7557] text-sm italic">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Letter content */}
          <div className="p-8 md:p-12 bg-white">
            {isSent ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6b1d2a] text-[#e9ddd1] rounded-full mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h2 className="text-[#511626] mb-3">Message Sent!</h2>
                <p className="text-[#9a7557] italic">
                  Your correspondence has been delivered. The librarian will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Salutation */}
                <div className="text-[#511626] mb-6">
                  <p className="italic">Dear Librarian,</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#511626]">
                    Your Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="bg-white border-[#b88b7d] focus:border-[#6b1d2a] font-serif"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[#511626]">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Regarding..."
                    className="bg-white border-[#b88b7d] focus:border-[#6b1d2a] font-serif"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#511626]">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="I am writing to inquire about..."
                    rows={8}
                    className="bg-white border-[#b88b7d] focus:border-[#6b1d2a] font-serif resize-none"
                  />
                </div>

                {/* Closing */}
                <div className="text-[#511626] mt-6">
                  <p className="italic mb-4">Sincerely,</p>
                  <div className="space-y-2 ml-8">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-white border-[#b88b7d] focus:border-[#6b1d2a] font-serif max-w-sm"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1rem' }}
                    />
                    <div className="h-px bg-[#b88b7d]/50 max-w-sm" />
                    <p className="text-sm text-[#9a7557] italic">Your signature</p>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-6 border-t-2 border-[#b88b7d]/30">
                  <Button
                    type="submit"
                    className="bg-[#6b1d2a] text-[#e9ddd1] hover:bg-[#511626] border-2 border-[#511626]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Letter
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Envelope bottom */}
          <div className="h-4 bg-[#511626] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6b1d2a] via-[#511626] to-[#6b1d2a]" />
          </div>
        </div>

        {/* Decorative wax seal */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#6b1d2a] rounded-full border-4 border-[#d4af37] flex items-center justify-center shadow-xl hidden md:flex">
          <div className="text-[#d4af37]">
            <Feather className="w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}