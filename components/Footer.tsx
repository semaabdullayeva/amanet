"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Send,
  ArrowUp,
  Wrench
} from "lucide-react";

interface FooterProps {
  onSelectDevice: (deviceName: string) => void;
}

export default function Footer({ onSelectDevice }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    { label: "iPhone təmiri", device: "iPhone 17 Pro Max" },
    { label: "Samsung təmiri", device: "Galaxy A33" },
    { label: "Xiaomi təmiri", device: "Xiaomi 13" },
    { label: "MacBook təmiri", device: "MacBook Air M3" },
    { label: "iPad təmiri", device: "iPad Air 5" }
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 px-6 relative overflow-hidden select-none">
      {/* Background ambient light */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-slate-900">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop}>
              <span className="text-3xl font-black bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent tracking-wider">
                amanet
              </span>
              <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
                Xidmət
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Peşəkar şəhərli xidmət şəbəkəsi. Telefonların, planşetlərin, noutbukların və digər ağıllı cihazların operativ, keyfiyyətli və 180 günədək zəmanətlə peşəkar təmiri.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-widest flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-500" />
              Təmir Xidmətləri
            </h4>
            <ul className="space-y-2.5 text-sm font-bold">
              {services.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelectDevice(item.device)}
                    className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-200 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-widest">
              Şirkət
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <a href="#about" className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-200 inline-block">
                  Haqqımızda
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-200 inline-block">
                  Vakansiyalar
                </a>
              </li>
              <li>
                <a href="#franchise" className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-200 inline-block">
                  Françayzinq
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-200 inline-block">
                  Gizlilik Siyasəti
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-amber-400 hover:translate-x-1.5 transition-all duration-200 inline-block">
                  Əlaqə
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-widest">
              Əlaqə Məlumatı
            </h4>
            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Bakı şəhəri, Nizami küç. 142</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Hər gün: 09:00 - 21:00</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <a href="tel:+994501234567" className="text-white font-bold hover:text-amber-400 transition-colors">
                  +994 (50) 123-45-67
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <a href="mailto:info@amanet.az" className="hover:text-amber-400 transition-colors">
                  info@amanet.az
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Socials & Copyright Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-600 font-semibold text-center md:text-left">
            &copy; {new Date().getFullYear()} amanet.az. Bütün hüquqlar qorunur.
          </div>

          <div className="flex items-center gap-6">
            {/* Social media links */}
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/pedant_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0088cc] hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4 fill-current text-xs" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877f2] hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#ff0000] hover:border-transparent hover:scale-110 active:scale-95 transition-all duration-200 shadow-md"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.872.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Back to top scroll button */}
            <button
              onClick={handleScrollToTop}
              className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-amber-400 hover:scale-110 active:scale-95 transition-all duration-200 shadow-md cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
