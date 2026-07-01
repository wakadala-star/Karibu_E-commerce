import Link from "next/link";

const footerLinks = {
  About: [
    { name: "Blog", href: "/blog" },
    { name: "Meet The Team", href: "/team" },
    { name: "Contact Us", href: "/contact" },
  ],
  Support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping", href: "/shipping" },
    { name: "Return", href: "/returns" },
    { name: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { name: "X", icon: "X", href: "#" },
  { name: "Facebook", icon: "f", href: "#" },
  { name: "LinkedIn", icon: "in", href: "#" },
  { name: "Instagram", icon: "@", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end gap-16">
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-bold text-black mb-4">About</h4>
              <ul className="space-y-3">
                {footerLinks.About.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-black mb-4">Support</h4>
              <ul className="space-y-3">
                {footerLinks.Support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ml-auto text-center">
            <h4 className="text-sm font-bold text-black mb-4">Social Media</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            Copyright &copy; 2023 Karibu. All Rights Reserved
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
