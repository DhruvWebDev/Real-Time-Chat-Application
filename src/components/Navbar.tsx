import { SignIn, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, BriefcaseBusiness, Heart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import logo from "/image.png";

export default function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);


  return (
    <>
      <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-md text-white py-2 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="rounded">
                <img
                src = {logo}
                  alt="Logo"
                  className="h-8 w-10 mr-2"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:flex gap-6 items-center">
            <Button variant="ghost" className="text-white hover:text-emerald-400 transition-colors text-sm py-1">Find Jobs</Button>
            <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors text-sm py-1">Post a Job</Button>
            <SignedOut>
              <Button
                onClick={() => setShowSignIn(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 text-sm py-1"
              >
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-emerald-500 hover:border-blue-500 transition-colors duration-300"
                  }
                }}
              >
                </UserButton>
            </SignedIn>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 text-white p-4">
          <div className="flex flex-col gap-4">
            <Button variant="ghost" className="text-white hover:text-emerald-400 transition-colors text-sm py-1">Find Jobs</Button>
            <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors text-sm py-1">Post a Job</Button>
            <SignedOut>
              <Button
                onClick={() => setShowSignIn(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 text-sm py-1"
              >
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-emerald-500 hover:border-blue-500 transition-colors duration-300"
                  }
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/saved-jobs"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>
      )}

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50"
          onClick={() => setShowSignIn(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-gray-900 p-8 rounded-lg shadow-2xl">
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary: "bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transition-all duration-300",
                  formFieldInput: "bg-gray-800 border-gray-700 text-white",
                  footerActionLink: "text-emerald-400 hover:text-blue-400"
                }
              }}
              signUpForceRedirectUrl="/chat-app"
              fallbackRedirectUrl="/"
            />
          </div>
        </div>
      )}
    </>
  );
}