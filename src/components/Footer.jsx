import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function AdvancedFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Section 1: Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 text-center md:text-left">
            <h3 className="text-white text-3xl font-extrabold mb-4 tracking-wider">
              Stream<span className="text-red-600">Flix</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Your ultimate destination for endless entertainment. Discover, stream, and enjoy.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Movies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  TV Shows
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  My List
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4: Legal & Social */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-lg font-semibold mb-4">Legal & Social</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Preferences
                </a>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} StreamFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}