"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  Menu,
  X
} from "lucide-react";

// Mock Data structure for the navigation dropdowns
interface Subcategory {
  name: string;
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface NavItem {
  label: string;
  subLabel?: string;
  hasDropdown: boolean;
  categories?: Category[];
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Alma",
    subLabel: "Təmir",
    hasDropdown: true,
    categories: [
      {
        name: "iPhone təmiri",
        subcategories: [
          { name: "iPhone 17 Pro Max" },
          { name: "iPhone 17 Pro" },
          { name: "iPhone 17" },
          { name: "iPhone Air" },
          { name: "iPhone 17e" },
          { name: "iPhone 16 Pro Max" },
          { name: "iPhone 16 Pro" },
          { name: "iPhone 16 Plus" },
          { name: "iPhone 16" },
          { name: "iPhone 16e" },
          { name: "iPhone 15 Pro Max" },
          { name: "iPhone 15 Pro" },
          { name: "iPhone 15 Plus" },
          { name: "iPhone 15" },
          { name: "iPhone 14 Pro Max" },
          { name: "iPhone 14 Pro" },
          { name: "iPhone 14 Plus" },
          { name: "iPhone 14" },
          { name: "iPhone 13 Pro Max" },
          { name: "iPhone 13 Pro" },
          { name: "iPhone 13" },
          { name: "iPhone 13 mini" },
          { name: "iPhone 12 Pro Max" }
        ]
      },
      {
        name: "iPad təmiri",
        subcategories: [
          { name: "iPad Air 5" },
          { name: "iPad Air 4" },
          { name: "iPad Air 3" },
          { name: "iPad Air 2" },
          { name: "iPad Air" },
          { name: "iPad mini 6" },
          { name: "iPad mini 5" },
          { name: "iPad mini 4" },
          { name: "iPad Pro 12.9" },
          { name: "iPad Pro 11" },
          { name: "iPad 10.2" },
          { name: "iPad 9.7" }
        ]
      },
      {
        name: "Apple Watch Tamiri",
        subcategories: [
          { name: "Apple Watch Ultra 2" },
          { name: "Apple Watch Ultra" },
          { name: "Apple Watch Series 9" },
          { name: "Apple Watch Series 8" },
          { name: "Apple Watch Series 7" },
          { name: "Apple Watch SE" },
          { name: "Apple Watch Series 6" },
          { name: "Apple Watch Series 5" }
        ]
      },
      {
        name: "MacBook təmiri",
        subcategories: [
          { name: "MacBook Air M3" },
          { name: "MacBook Air M2" },
          { name: "MacBook Air M1" },
          { name: "MacBook Pro M3" },
          { name: "MacBook Pro M2" },
          { name: "MacBook Pro M1" },
          { name: "MacBook Pro Intel" }
        ]
      },
      {
        name: "iMac təmiri",
        subcategories: [
          { name: "iMac 24\" M3" },
          { name: "iMac 24\" M1" },
          { name: "iMac 27\" Retina" },
          { name: "iMac 21.5\"" }
        ]
      },
      {
        name: "MacBook Pro təmiri",
        subcategories: [
          { name: "MacBook Pro 16\"" },
          { name: "MacBook Pro 14\"" },
          { name: "MacBook Pro 13\" M2" },
          { name: "MacBook Pro 13\" M1" }
        ]
      },
      {
        name: "MacBook Air təmiri",
        subcategories: [
          { name: "MacBook Air 15\" M3" },
          { name: "MacBook Air 13\" M3" },
          { name: "MacBook Air 13\" M1" }
        ]
      }
    ]
  },
  {
    label: "Telefonlar",
    subLabel: "Təmir",
    hasDropdown: true,
    categories: [
      {
        name: "Samsung təmiri",
        subcategories: [
          { name: "Galaxy A02" },
          { name: "Galaxy A10" },
          { name: "Galaxy A12 (2020)" },
          { name: "Galaxy A20" },
          { name: "Galaxy A21s" },
          { name: "Galaxy A22" },
          { name: "Galaxy A23" },
          { name: "Galaxy A3 (2016)" },
          { name: "Galaxy A3 (2017)" },
          { name: "Galaxy A30" },
          { name: "Galaxy A30s" },
          { name: "Galaxy A31" },
          { name: "Galaxy A32" },
          { name: "Galaxy A33" },
          { name: "Galaxy A40" },
          { name: "Galaxy A41" }
        ]
      },
      {
        name: "Xiaomi təmiri",
        subcategories: [
          { name: "Xiaomi 11 Lite NE" },
          { name: "Xiaomi 11T" },
          { name: "Xiaomi 11T Pro" },
          { name: "Xiaomi 12" },
          { name: "Xiaomi 12 Pro" },
          { name: "Xiaomi 12X" },
          { name: "Xiaomi 13" },
          { name: "Xiaomi 13 Lite" },
          { name: "Xiaomi Mi 10" },
          { name: "Xiaomi Mi 10T" },
          { name: "Xiaomi Mi 10T Pro" },
          { name: "Xiaomi Mi 11 Lite" },
          { name: "Xiaomi Mi 11 Lite 5G" },
          { name: "Xiaomi Mi 11 Pro" },
          { name: "Xiaomi Mi 11 Ultra" },
          { name: "Xiaomi Mi 9 SE" }
        ]
      },
      {
        name: "Huawei təmiri",
        subcategories: [
          { name: "Pura 70 Ultra" },
          { name: "Pura 70" },
          { name: "Mate 60 Pro" },
          { name: "P60 Pro" },
          { name: "Nova 12" },
          { name: "Nova 11" }
        ]
      },
      {
        name: "Honor təmiri",
        subcategories: [
          { name: "Honor Magic 6 Pro" },
          { name: "Honor 90" },
          { name: "Honor X9b" },
          { name: "Honor X8b" },
          { name: "Honor 70" }
        ]
      },
      {
        name: "Realme təmiri",
        subcategories: [
          { name: "Realme GT3" },
          { name: "Realme 12 Pro+" },
          { name: "Realme 11 Pro" },
          { name: "Realme C67" }
        ]
      }
    ]
  },
  {
    label: "Noutbuklar",
    subLabel: "Təmir",
    hasDropdown: true,
    categories: [
      {
        name: "ASUS təmiri",
        subcategories: [
          { name: "Zenbook 14" },
          { name: "Vivobook 15" },
          { name: "ROG Strix" },
          { name: "TUF Gaming F15" },
          { name: "ExpertBook" }
        ]
      },
      {
        name: "HP təmiri",
        subcategories: [
          { name: "Spectre x360" },
          { name: "Envy 16" },
          { name: "Pavilion 15" },
          { name: "Victus 16" },
          { name: "Omen 17" }
        ]
      },
      {
        name: "Lenovo təmiri",
        subcategories: [
          { name: "ThinkPad X1 Carbon" },
          { name: "Legion 5 Pro" },
          { name: "IdeaPad Slim 3" },
          { name: "Yoga Book" },
          { name: "LOQ" }
        ]
      },
      {
        name: "Acer təmiri",
        subcategories: [
          { name: "Aspire 5" },
          { name: "Nitro V 15" },
          { name: "Predator Helios" },
          { name: "Swift Go" }
        ]
      },
      {
        name: "Dell təmiri",
        subcategories: [
          { name: "XPS 15" },
          { name: "Inspiron 16" },
          { name: "G15 Gaming" },
          { name: "Latitude" }
        ]
      }
    ]
  },
  {
    label: "Digər cihazlar",
    subLabel: "Təmir",
    hasDropdown: true,
    categories: [
      {
        name: "Planşet təmiri",
        subcategories: [
          { name: "Samsung Galaxy Tab S9" },
          { name: "Lenovo Tab P12" },
          { name: "Xiaomi Pad 6" },
          { name: "Huawei MatePad" }
        ]
      },
      {
        name: "Oyun konsolları",
        subcategories: [
          { name: "PlayStation 5" },
          { name: "PlayStation 4 Pro" },
          { name: "PlayStation 4" },
          { name: "Xbox Series X" },
          { name: "Xbox Series S" },
          { name: "Nintendo Switch" }
        ]
      },
      {
        name: "Smart saatlar",
        subcategories: [
          { name: "Samsung Galaxy Watch 6" },
          { name: "Huawei Watch GT 4" },
          { name: "Xiaomi Watch 2 Pro" },
          { name: "Amazfit GTR 4" }
        ]
      },
      {
        name: "Qulaqlıqlar",
        subcategories: [
          { name: "AirPods Pro 2" },
          { name: "AirPods Max" },
          { name: "Sony WH-1000XM5" },
          { name: "Bose QuietComfort Ultra" }
        ]
      }
    ]
  },

  {
    label: "amanet.az saytında işləyirəm",
    hasDropdown: false,
    href: "#work"
  }
];

interface MegaMenuProps {
  onSelectDevice: (deviceName: string) => void;
}

export default function MegaMenu({ onSelectDevice }: MegaMenuProps) {
  // Shared interactive states
  const [activeNavIndex, setActiveNavIndex] = useState<number>(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  // Mobile menu states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [expandedNavIndex, setExpandedNavIndex] = useState<number | null>(null);
  const [expandedCategoryIndex, setExpandedCategoryIndex] = useState<number | null>(null);

  const handleMobileSelectDevice = (deviceName: string) => {
    onSelectDevice(deviceName);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full bg-slate-50 relative">

      {/* Top Header Contact Bar */}
      <div className="w-full bg-slate-100 border-b border-slate-200 py-1.5 px-6 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#034788]" />
              Bakı şəhəri, Nizami küç. 142
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#034788]" />
              Hər gün: 09:00 - 21:00
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+994501234567" className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#034788] transition">
              <Phone className="w-3.5 h-3.5 text-[#034788] animate-pulse" />
              +994 (50) 123-45-67
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu Bar */}
      <nav className="w-full bg-white border-b border-slate-100 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between lg:justify-start gap-10">
            {/* Logo */}
            <div className="flex items-center cursor-pointer mr-4" onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMobileMenuOpen(false);
            }}>
              <img src="./amanet.png" alt="Logo" width={140} height={100} />
            </div>

            {/* Navigation links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8 h-full">
              {NAV_ITEMS.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex flex-col justify-center h-full cursor-pointer group"
                    onMouseEnter={() => {
                      setActiveNavIndex(index);
                      setActiveCategoryIndex(0);
                    }}
                  >
                    {item.subLabel ? (
                      <div className="flex flex-col select-none">
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">
                          {item.subLabel}
                        </span>
                        <span className="text-[14px] font-semibold text-slate-800 flex items-center gap-1 mt-0.5 group-hover:text-[#034788] transition-colors">
                          {item.label}
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 group-hover:text-[#034788] transition-transform duration-200" />
                        </span>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="text-[14px] font-semibold text-slate-600 hover:text-[#034788] transition-colors py-2 flex items-center"
                      >
                        {item.label}
                      </a>
                    )}

                    {/* MEGA MENU DROPDOWN PANEL (Pure CSS + JS Interaction) */}
                    {item.hasDropdown && item.categories && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                        <div className="flex gap-2 items-start pointer-events-auto">

                          {/* Column 1: Categories list (Left Panel) */}
                          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-2 py-3 w-64 transform transition-all duration-200">
                            <div className="space-y-0.5">
                              {item.categories.map((category, idx) => {
                                const isActive = activeNavIndex === index && activeCategoryIndex === idx;
                                return (
                                  <button
                                    key={idx}
                                    onMouseEnter={() => {
                                      setActiveCategoryIndex(idx);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[14px] font-semibold flex justify-between items-center transition-all ${isActive
                                        ? "bg-blue-50/70 text-[#034788]"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                      }`}
                                  >
                                    <span>{category.name}</span>
                                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "transform translate-x-0.5 text-blue-500" : "text-slate-300"
                                      }`} />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Column 2: Subcategories (Right Panel) */}
                          {activeNavIndex === index && item.categories[activeCategoryIndex] && (
                            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 p-3 py-4 w-60 min-h-[300px] max-h-[460px] overflow-y-auto transform transition-all duration-200 scrollbar-thin">
                              <div className="space-y-1">
                                {item.categories[activeCategoryIndex].subcategories.map((sub, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => onSelectDevice(sub.name)}
                                    className="w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium text-slate-600 hover:bg-blue-50/40 hover:text-[#034788] transition-all"
                                  >
                                    {sub.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-[#034788] hover:bg-slate-50 rounded-xl transition duration-200 focus:outline-none ml-auto"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Accordion Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl z-40 max-h-[calc(100vh-80px)] overflow-y-auto transition-all duration-300">
            <div className="px-6 py-5 space-y-5">

              {/* Navigation Items Accordion */}
              <div className="space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const isNavExpanded = expandedNavIndex === index;

                  return (
                    <div key={index} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0 pt-2 first:pt-0">
                      {item.hasDropdown && item.categories ? (
                        <div>
                          {/* Main Nav Item Header */}
                          <button
                            onClick={() => {
                              setExpandedNavIndex(isNavExpanded ? null : index);
                              setExpandedCategoryIndex(null); // Reset Level 2 nested selection
                            }}
                            className={`w-full flex justify-between items-center py-2 text-left transition-colors ${isNavExpanded ? "text-[#034788]" : "text-slate-800"
                              }`}
                          >
                            <div className="flex flex-col">
                              {item.subLabel && (
                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">
                                  {item.subLabel}
                                </span>
                              )}
                              <span className="text-[16px] font-bold mt-0.5">
                                {item.label}
                              </span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isNavExpanded ? "rotate-180 text-blue-500" : ""
                              }`} />
                          </button>

                          {/* Level 2: Categories (Sub-Accordion) */}
                          {isNavExpanded && (
                            <div className="pl-4 mt-2.5 space-y-2 border-l-2 border-slate-100 ml-1">
                              {item.categories.map((category, catIdx) => {
                                const isCatExpanded = expandedCategoryIndex === catIdx;
                                return (
                                  <div key={catIdx} className="space-y-1.5">
                                    <button
                                      onClick={() => {
                                        setExpandedCategoryIndex(isCatExpanded ? null : catIdx);
                                      }}
                                      className={`w-full flex justify-between items-center py-1.5 text-left text-[14px] font-semibold transition-colors ${isCatExpanded ? "text-blue-500" : "text-slate-700 hover:text-slate-900"
                                        }`}
                                    >
                                      <span>{category.name}</span>
                                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isCatExpanded ? "rotate-180 text-blue-500" : ""
                                        }`} />
                                    </button>

                                    {/* Level 3: Subcategories (Devices) */}
                                    {isCatExpanded && (
                                      <div className="pl-2 pr-1 py-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {category.subcategories.map((sub, subIdx) => (
                                          <button
                                            key={subIdx}
                                            onClick={() => handleMobileSelectDevice(sub.name)}
                                            className="text-left px-3 py-2 rounded-xl text-[13px] font-bold text-slate-600 bg-slate-50 hover:bg-blue-50/60 hover:text-[#034788] transition-all border border-slate-100"
                                          >
                                            {sub.name}
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Simple link item without dropdown */
                        <a
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-[16px] font-bold text-slate-700 hover:text-[#034788] transition-colors"
                        >
                          {item.label}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Extra Mobile Contact Bar info nested inside mobile menu */}
              <div className="pt-5 border-t border-slate-100 flex flex-col gap-3.5 text-slate-500 text-[13px] font-semibold">
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
