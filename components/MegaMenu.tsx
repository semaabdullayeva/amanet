"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";

interface MegaMenuProps {
  onSelectDevice?: (deviceName: string) => void;
}

export default function MegaMenu({ onSelectDevice }: MegaMenuProps) {
  const [brands, setBrands] = useState<{id: string, name: string}[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [centers, setCenters] = useState<{id: string, name: string, address: string}[]>([]);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://amanet-api-jk1q.onrender.com";
      
      try {
        const [brandsRes, catRes, centersRes] = await Promise.all([
          fetch(`${apiUrl}/api/Brands?pagination.size=100`),
          fetch(`${apiUrl}/api/DeviceCategories?pagination.size=100`),
          fetch(`${apiUrl}/api/ServiceCenters?pagination.size=100`)
        ]);

        if (brandsRes.ok) {
          const bJson = await brandsRes.json();
          if (bJson.success && bJson.data) setBrands(bJson.data);
        }

        if (catRes.ok) {
          const cJson = await catRes.json();
          if (cJson.success && cJson.data) setCategories(cJson.data);
        }

        if (centersRes.ok) {
          const ceJson = await centersRes.json();
          if (ceJson.success && ceJson.data) setCenters(ceJson.data);
        }
      } catch (err) {
        console.error("Failed to fetch menu data", err);
      }
    };
    fetchData();
  }, []);

  const NavItem = ({ title, items, id }: { title: string, items: any[], id: string }) => {
    return (
      <div 
        className="relative flex flex-col justify-center h-full cursor-pointer group"
        onMouseEnter={() => setActiveMenu(id)}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <span className="text-[15px] font-bold text-white flex items-center gap-1 mt-0.5 hover:text-amber-400 transition-colors py-5">
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === id ? 'rotate-180 text-amber-400' : 'text-blue-200'}`} />
        </span>
        
        <div className={`absolute top-[90%] left-0 pt-3 w-64 z-50 transition-all duration-200 ${activeMenu === id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-3 max-h-[400px] overflow-y-auto scrollbar-thin">
            {items.map((item: any) => (
              <button 
                key={item.id} 
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#034788] transition-all flex flex-col"
              >
                <span>{item.name}</span>
                {item.address && <span className="text-[11px] text-slate-400 mt-0.5 font-normal">{item.address}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MobileNavItem = ({ title, items, id }: { title: string, items: any[], id: string }) => {
    const isExpanded = expandedMobileMenu === id;
    
    return (
      <div className="border-b border-slate-100 last:border-0 pb-3 last:pb-0 pt-2 first:pt-0">
        <button
          onClick={() => setExpandedMobileMenu(isExpanded ? null : id)}
          className={`w-full flex justify-between items-center py-2 text-left transition-colors ${isExpanded ? "text-[#034788]" : "text-slate-800"}`}
        >
          <span className="text-[16px] font-bold">
            {title}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180 text-blue-500" : ""}`} />
        </button>

        {isExpanded && (
          <div className="pl-4 mt-2.5 space-y-1.5 border-l-2 border-slate-100 ml-1">
            {items.map((item: any) => (
              <button
                key={item.id}
                className="w-full text-left py-2 px-3 rounded-lg text-[14px] font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#034788] transition-colors flex flex-col"
              >
                <span>{item.name}</span>
                {item.address && <span className="text-[11px] text-slate-400 font-normal">{item.address}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#034788] relative">

      {/* Top Header Contact Bar */}
      <div className="w-full bg-white py-2 px-6 text-xs text-[#023a70] font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Bakı şəhəri, Nizami küç. 142
            </span>
            <span className="hidden md:inline text-blue-300/30">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Hər gün: 09:00 - 21:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+994501234567" className="flex items-center gap-1.5 text-[#023a70] hover:text-amber-400 transition">
              <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              +994 (50) 123-45-67
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu Bar */}
      <nav className="w-full shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 flex items-center justify-between gap-10">
            {/* Logo */}
            <Link 
              href="/"
              className="flex items-center cursor-pointer" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
            >
              <img src="/amanet.png" alt="Logo" width={120} height={40} className="object-contain" />
            </Link>

            {/* Navigation links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8 h-full mr-auto ml-4">
              <NavItem title="Brendlər" items={brands} id="brands" />
              <NavItem title="Kateqoriyalar" items={categories} id="categories" />
              <NavItem title="Filiallar" items={centers} id="centers" />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-white hover:text-amber-400 hover:bg-white/10 rounded-xl transition duration-200 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Accordion Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl z-40 max-h-[calc(100vh-80px)] overflow-y-auto transition-all duration-300">
            <div className="px-6 py-5">
              <div className="space-y-1">
                <MobileNavItem title="Brendlər" items={brands} id="brands" />
                <MobileNavItem title="Kateqoriyalar" items={categories} id="categories" />
                <MobileNavItem title="Filiallar" items={centers} id="centers" />
              </div>

              {/* Extra Mobile Contact Bar info nested inside mobile menu */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col gap-3.5 text-slate-500 text-[13px] font-semibold">
                <span className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#034788] shrink-0" />
                  Bakı şəhəri, Nizami küç. 142
                </span>
                <span className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#034788] shrink-0" />
                  Hər gün: 09:00 - 21:00
                </span>
                <a href="tel:+994501234567" className="flex items-center justify-center gap-2 font-bold text-white bg-blue-600 hover:bg-blue-500 p-3.5 rounded-2xl transition w-full shadow-md mt-2">
                  <Phone className="w-4 h-4 text-white animate-pulse shrink-0" />
                  +994 (50) 123-45-67
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
