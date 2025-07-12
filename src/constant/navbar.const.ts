import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Meals", href: "/meals" },
  { name: "Blogs", href: "/blogs" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const navLinkForMobileForUser = [
  { name: "Kitchen", href: "/kitchen" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
];

export const navbarLinkWithoutUser = [
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

export const icons = [
  { icon: FaFacebookF },
  { icon: FaXTwitter },
  { icon: SiDiscord },
  { icon: FaLinkedinIn },
];
