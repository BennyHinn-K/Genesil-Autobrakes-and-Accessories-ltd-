import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/genesil-logo.png" alt="Genesil" width={60} height={40} className="brightness-0 invert" />
              <div>
                <h3 className="text-lg font-bold text-yellow-400">Genesil Autobrake</h3>
                <p className="text-sm text-gray-300">and Accessories LTD</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted spare parts supplier in Nairobi. Real parts. Real performance. No excuses.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100063551427097"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/genesil_auto_ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Quick Links</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition-colors duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Categories</h3>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Brake Parts
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Engine Parts
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Filters
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Transmission
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-yellow-400">Contact Info</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-yellow-400/30 transition-colors">
                  <Phone className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">+254 722 683 434</p>
                  <p className="text-sm text-gray-400">Call us anytime</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-yellow-400/30 transition-colors">
                  <Mail className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">info@genesilautobrakeandaccessories.com</p>
                  <p className="text-sm text-gray-400">Email support</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-3 mt-1 group-hover:bg-yellow-400/30 transition-colors">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Kirinyaga Road</p>
                  <p className="text-sm text-gray-400">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-start group">
                <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center mr-3 mt-1 group-hover:bg-yellow-400/30 transition-colors">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium">Mon-Fri: 8AM-6PM</p>
                  <p className="text-sm text-gray-400">Sat: 8AM-4PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} Genesil Autobrake and Accessories LTD. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <span>genesilautobrakeandaccessories.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
