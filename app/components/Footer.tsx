import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">G</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Genesil</h3>
                <p className="text-sm text-black">Autobrake & Accessories</p>
              </div>
            </div>
            <p className="text-black mb-6 leading-relaxed">
              Your trusted partner for genuine automotive spare parts. Real parts, real performance, no excuses.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-black dark:!text-black hover:text-primary-foreground cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-black dark:!text-black hover:text-primary-foreground cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-black dark:!text-black hover:text-primary-foreground cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-black dark:!text-black hover:text-primary-foreground cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-black dark:!text-black hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Product Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/catalogue?category=brake-discs"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Brake Discs
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue?category=brake-pads"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Brake Pads
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue?category=brake-calipers"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Brake Calipers
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue?category=brake-fluids"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Brake Fluids
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogue?category=accessories"
                  className="text-black dark:!text-black hover:text-primary-foreground transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-black">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-black dark:!text-black mt-1 flex-shrink-0" />
                <p className="text-black dark:!text-black text-sm">Kirinyaga Road, Nairobi, Kenya</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-black dark:!text-black flex-shrink-0" />
                <p className="text-black dark:!text-black text-sm">+254 722 683 434</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-black dark:!text-black flex-shrink-0" />
                <p className="text-black dark:!text-black text-sm">info@genesilautobrake.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black dark:!text-black text-sm">
              © 2024 Genesil Autobrake & Accessories Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-black dark:!text-black hover:text-primary-foreground text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-black dark:!text-black hover:text-primary-foreground text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/warranty"
                className="text-black dark:!text-black hover:text-primary-foreground text-sm transition-colors"
              >
                Warranty
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
