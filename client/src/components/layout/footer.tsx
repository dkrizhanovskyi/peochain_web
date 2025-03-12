import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Twitter, MessageCircle, Send, FileText } from "lucide-react";

export default function Footer() {
  const handleWaitlistClick = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="px-4 md:px-8 py-12 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="md:text-center">
          <div className="text-foreground font-poppins font-bold text-2xl mb-4">
            PEO<span className="text-primary">CHAIN</span>
          </div>
          <p className="text-foreground/70 mb-6 md:max-w-xl md:mx-auto">
            PEOCHAIN drives progress by blending unparalleled security, accessibility, and collaboration. We're not just a platform, we're a movement for financial inclusion.
          </p>
          <div className="flex space-x-4 mb-8 md:justify-center">
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Discord">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Telegram">
              <Send className="w-5 h-5" />
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Medium">
              <FileText className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-center mb-8">
            <Button 
              onClick={handleWaitlistClick}
              className="btn-gradient text-white font-medium py-3 px-8 rounded-full"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-primary/5 text-center mb-8">
          <p className="text-foreground/80">
            The next billion users are counting on this. Be part of something bigger—PEOCHAIN launches soon.
          </p>
        </div>
        
        <Separator className="my-6 bg-foreground/10" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PEOCHAIN. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
