import { useState } from 'react';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileHeaderProps {
  cartItems: number;
}

const MobileHeader = ({ cartItems }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <Button variant="ghost" className="justify-start text-base">
                <User className="mr-3 h-5 w-5" />
                Profile
              </Button>
              <Button variant="ghost" className="justify-start text-base">
                <Bell className="mr-3 h-5 w-5" />
                Orders
              </Button>
              <Button variant="ghost" className="justify-start text-base">
                Settings
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex justify-center">
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            DineScape
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 relative">
            <Bell className="h-5 w-5" />
            {cartItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]">
                {cartItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;