import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white/70 border-t border-gray-200 dark:border-gray-800 md:px-24 px-5 py-10">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-6">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            <Image
              className="w-[35vw] md:w-[10vw]"
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Fresh meals delivered to your door. Handcrafted with love and
            quality.
          </p>
        </div>

        {/* Navigation */}
        <div className="text-white/70">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-secondary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/meals" className="hover:text-secondary">
                Meals
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-secondary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@mealbox.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <Facebook className="hover:text-blue-500 transition" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="hover:text-sky-400 transition" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="hover:text-pink-500 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-xs pt-6 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MealBox. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
