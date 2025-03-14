import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLocation } from "wouter";

interface HeaderProps {
  onFeatureClick: () => void;
  onBenefitsClick: () => void;
  onTechnologyClick?: () => void;
  onWaitlistClick: () => void;
  onFaqClick?: () => void;
}

export default function Header({ onFeatureClick, onBenefitsClick, onTechnologyClick, onWaitlistClick, onFaqClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if API key exists in localStorage
    const apiKey = localStorage.getItem('adminApiKey');
    setHasApiKey(!!apiKey);
  }, []);

  const handleMobileNavClick = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };
  
  const navigateToDashboard = () => {
    setIsOpen(false);
    setLocation('/admin/dashboard');
  };
  
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img 
            src="/images/peochain-logo.png" 
            alt="PEOCHAIN Logo" 
            className="h-8 md:h-10"
          />
        </a>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <nav className="flex items-center space-x-6 mr-6">
          <button 
            onClick={onFeatureClick}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Features
          </button>
          <button 
            onClick={onBenefitsClick}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Benefits
          </button>
          <button 
            onClick={onTechnologyClick}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Technology
          </button>
          <button 
            onClick={onFaqClick}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            FAQ
          </button>
          {hasApiKey && (
            <button 
              onClick={navigateToDashboard}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Dashboard
            </button>
          )}
        </nav>
        <Button 
          onClick={onWaitlistClick}
          className="btn-gradient text-white font-medium py-2 px-6 rounded-full"
        >
          Join Waitlist
        </Button>
      </div>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="text-foreground text-2xl">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-background">
          <div className="flex flex-col space-y-8 mt-12">
            <nav className="flex flex-col space-y-6 w-full">
              <button 
                onClick={() => handleMobileNavClick(onFeatureClick)}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Features
              </button>
              <button 
                onClick={() => handleMobileNavClick(onBenefitsClick)}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Benefits
              </button>
              <button 
                onClick={() => onTechnologyClick && handleMobileNavClick(onTechnologyClick)}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Technology
              </button>
              <button 
                onClick={() => onFaqClick && handleMobileNavClick(onFaqClick)}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                FAQ
              </button>
              {hasApiKey && (
                <button 
                  onClick={navigateToDashboard}
                  className="text-primary hover:text-primary/80 transition-colors font-medium text-xl text-left"
                >
                  Dashboard
                </button>
              )}
            </nav>
            <Button 
              onClick={() => handleMobileNavClick(onWaitlistClick)}
              className="btn-gradient text-white font-medium py-2 px-8 rounded-full text-xl w-full mt-4"
            >
              Join Waitlist
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
