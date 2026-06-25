"use client";

import React, { useState, useRef, useEffect } from "react";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  MapPin,
  Check,
  Search,
  X,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Wrench,
  Shield,
  Clock,
  Sparkles,
  Award,
  Star,
  ArrowUpRight,
  Send,
  Tv,
  Volume2,
  HardDrive,
  Gamepad,
  Map,
  Calendar
} from "lucide-react";
import Link from "next/link";

interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  workingHours: string;
  regionId: string;
  files: any[];
}

// Mock Data structure for page calculator lookup
const CITIES = ["Bakı", "Sumqayıt", "Gəncə", "Xırdalan", "Lənkəran", "Naxçıvan"];

// Brand grids specifically structured for Section 4 table layout
const BRAND_GRIDS = [
  {
    img: "./iphone.jpg",
    title: "iPhone təmiri",
    iconType: "iphone",
    subcategories: [
      { name: "iPhone 17" },
      { name: "iPhone 17 Pro" },
      { name: "iPhone 17 Pro Max" },
      { name: "iPhone Air" },
      { name: "iPhone 17e" },
      { name: "iPhone 16 Plus" },
      { name: "iPhone 16e" },
      { name: "iPhone 16 Pro Max" },
      { name: "iPhone 16 Pro" },
      { name: "iPhone 16" },
      { name: "iPhone 15 Pro" },
      { name: "iPhone 15 Pro Max" },
      { name: "iPhone 15 Plus" },
      { name: "iPhone 15" },
      { name: "iPhone 14 Pro Max" },
      { name: "iPhone 14 Pro" }
    ]
  },
  {
    img: "./samsung.jpg",
    title: "Samsung təmiri",
    iconType: "samsung",
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
    img: "./honor.jpg",
    title: "Honor Təmiri",
    iconType: "honor",
    subcategories: [
      { name: "Honor 10" },
      { name: "Honor 10 Lite" },
      { name: "Honor 10i" },
      { name: "Honor 10x Lite" },
      { name: "Honor 20" },
      { name: "Honor 20 Lite" },
      { name: "Honor 20 Pro" },
      { name: "Honor 200" },
      { name: "Honor 20i" },
      { name: "Honor 20S" },
      { name: "Honor 30" },
      { name: "Honor 30 Pro" },
      { name: "Honor 30 Pro Plus" },
      { name: "Honor 30i" },
      { name: "Honor 30S" },
      { name: "Honor 50" }
    ]
  },
  {
    img: "./xiaomi.jpg",
    title: "Xiaomi təmiri",
    iconType: "xiaomi",
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
  }
];

// Flat pricing calculator estimate database
interface RepairPrice {
  service: string;
  price: number;
  time: string;
  warranty: string;
}

const getRepairPrices = (deviceName: string): RepairPrice[] => {
  const isPremium = deviceName.includes("Pro") || deviceName.includes("Max") || deviceName.includes("Ultra") || deviceName.includes("17") || deviceName.includes("16") || deviceName.includes("15") || deviceName.includes("MacBook") || deviceName.includes("iPad Pro");
  const multiplier = isPremium ? 2.5 : 1.0;

  return [
    { service: "Ekranın dəyişdirilməsi", price: Math.round(80 * multiplier), time: "25-40 dəq", warranty: "6 ay" },
    { service: "Batareyanın dəyişdirilməsi", price: Math.round(35 * multiplier), time: "20-30 dəq", warranty: "3 ay" },
    { service: "Şarj portunun təmiri", price: Math.round(25 * multiplier), time: "30-50 dəq", warranty: "3 ay" },
    { service: "Kamera şüşəsinin dəyişdirilməsi", price: Math.round(20 * multiplier), time: "15-25 dəq", warranty: "3 ay" },
    { service: "Korpusun bərpası / dəyişdirilməsi", price: Math.round(55 * multiplier), time: "40-60 dəq", warranty: "6 ay" },
    { service: "Maye təmasından sonra təmizləmə", price: Math.round(40 * multiplier), time: "2-4 saat", warranty: "N/A" }
  ];
};

export default function Home() {
  // Page calculator states
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("Bakı");
  const [deviceSearch, setDeviceSearch] = useState<string>("");
  const [isDeviceDropdownOpen, setIsDeviceDropdownOpen] = useState<boolean>(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);

  // Device list state
  const [devicesList, setDevicesList] = useState<{name: string, category: string}[]>([]);
  const [centers, setCenters] = useState<ServiceCenter[]>([]);
  const [loadingCenters, setLoadingCenters] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/DeviceModels`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
             const getCategoryFromName = (name: string) => {
                const lowerName = name.toLowerCase();
                if (lowerName.includes('iphone') || lowerName.includes('ipad') || lowerName.includes('apple') || lowerName.includes('mac')) return 'Apple təmiri';
                if (lowerName.includes('samsung') || lowerName.includes('galaxy')) return 'Samsung təmiri';
                if (lowerName.includes('xiaomi') || lowerName.includes('redmi') || lowerName.includes('poco')) return 'Xiaomi təmiri';
                if (lowerName.includes('honor')) return 'Honor təmiri';
                if (lowerName.includes('lenovo') || lowerName.includes('thinkpad')) return 'Lenovo təmiri';
                if (lowerName.includes('asus')) return 'ASUS təmiri';
                if (lowerName.includes('huawei')) return 'Huawei təmiri';
                if (lowerName.includes('sony')) return 'Sony təmiri';
                return 'Cihaz təmiri';
             };

            const mappedDevices = json.data.map((device: any) => ({
              name: device.name,
              category: getCategoryFromName(device.name)
            }));
            setDevicesList(mappedDevices);
          }
        }
      } catch (error) {
        console.error("Failed to fetch devices:", error);
      }
    };
    fetchDevices();

    const fetchCenters = async () => {
      try {
        setLoadingCenters(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ServiceCenters`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setCenters(json.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch service centers:", error);
      } finally {
        setLoadingCenters(false);
      }
    };
    fetchCenters();
  }, []);

  // Modal visibility
  const [showResult, setShowResult] = useState<boolean>(false);

  // Scroll ref anchor point
  const heroRef = useRef<HTMLDivElement>(null);

  const handleDeviceSelection = (deviceName: string) => {
    setSelectedDevice(deviceName);
    setShowResult(true);
    // Smooth scroll to calculator
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredDevices = devicesList.filter(device =>
    device.name.toLowerCase().includes(deviceSearch.toLowerCase())
  );

  const SMALL_CARDS = [
    { title: "Noutbuk təmiri", mockDevice: "MacBook Air M3", icon: <Laptop className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "iPad təmiri", mockDevice: "iPad Air 5", icon: <Tablet className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Apple Watch Təmiri", mockDevice: "Apple Watch Ultra 2", icon: <Watch className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "MacBook təmiri", mockDevice: "MacBook Pro M3", icon: <Laptop className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "iMac təmiri", mockDevice: "iMac 24\" M3", icon: <Tv className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Kompüter Təmiri", mockDevice: "Masaüstü PC", icon: <HardDrive className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Planşet təmiri", mockDevice: "Samsung Galaxy Tab S9", icon: <Tablet className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Meizu təmiri", mockDevice: "Meizu 20 Pro", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Huawei təmiri", mockDevice: "Pura 70 Ultra", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "ASUS Təmiri", mockDevice: "Zenbook 14", icon: <Laptop className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Blackview Təmiri", mockDevice: "Blackview A96", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "HTC təmiri", mockDevice: "HTC U23 Pro", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Lenovo təmiri", mockDevice: "ThinkPad X1 Carbon", icon: <Laptop className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Motorola Təmiri", mockDevice: "Edge 50 Ultra", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Nokia təmiri", mockDevice: "Nokia G42", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "OnePlus Təmiri", mockDevice: "OnePlus 12", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "OPPO təmiri", mockDevice: "Find X7 Ultra", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Philips təmiri", mockDevice: "Philips S566", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Realme Təmiri", mockDevice: "Realme GT3", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Sony təmiri", mockDevice: "Xperia 1 VI", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "ZTE təmiri", mockDevice: "ZTE Nubia Z60 Ultra", icon: <Smartphone className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Joystik təmiri", mockDevice: "DualSense PS5", icon: <Gamepad className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Portativ dinamik təmiri", mockDevice: "JBL Charge 5", icon: <Volume2 className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> },
    { title: "Oyun konsolunun təmiri", mockDevice: "PlayStation 5", icon: <Gamepad className="w-12 h-12 text-slate-300 group-hover:text-blue-500 transition-colors" /> }
  ];

  // Generate dynamic Yandex Map URL with placemarks
  const mapUrl = React.useMemo(() => {
    const baseUrl = "https://yandex.com/map-widget/v1/";
    if (!centers || centers.length === 0) {
      return `${baseUrl}?ll=49.867092%2C40.409262&z=11`;
    }
    
    // Use first center as map center
    const ll = `${centers[0].longitude}%2C${centers[0].latitude}`;
    
    // Construct placemarks parameter (pt)
    // pm2blm1 generates a blue marker with "1" inside it.
    const pt = centers.map((c, idx) => `${c.longitude},${c.latitude},pm2blm${idx + 1}`).join('~');
    
    return `${baseUrl}?ll=${ll}&z=11&pt=${pt}`;
  }, [centers]);

  return (
    <div className="w-full bg-white min-h-screen">

      {/* 1. Header Navigation Menu */}
      <MegaMenu onSelectDevice={handleDeviceSelection} />

      {/* 2. Hero Calculator Banner */}
      <main ref={heroRef} className="w-full bg-[#034788] py-16 md:py-24 px-6 text-white relative overflow-hidden">
        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Glowing circle ambient light */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Hero left content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight select-none">
              <span className="text-amber-400 tracking-wider drop-shadow-md">amanet</span>
              <span className="text-white">— peşəkar</span> <br />
              şəhərli xidmət şəbəkəsi
            </h1>

            <p className="text-lg text-blue-100 max-w-xl font-medium leading-relaxed">
              Planşet, telefon, noutbuk və digər cihazların peşəkar təmiri. Original detallar, 180 günədək zəmanət və təcrübəli ustalarımızla xidmətinizdəyik.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Wrench className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-sm font-bold">15 Dəqiqə</span>
                <span className="text-xs text-blue-200">Ekspres təmir</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-sm font-bold">180 Gün</span>
                <span className="text-xs text-blue-200">Zəmanət</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center">
                <Check className="w-6 h-6 text-amber-400 mb-2" />
                <span className="text-sm font-bold">Orijinal</span>
                <span className="text-xs text-blue-200">Ehtiyat hissələri</span>
              </div>
            </div>
          </div>

          {/* Calculator Card Right */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white text-slate-800 w-full max-w-[420px] rounded-[32px] shadow-2xl p-8 border border-slate-100 transform transition-all">

              <h2 className="text-2xl font-semibold text-slate-900 tracking-tight text-center mb-6">
                Təmir qiymətini 1 dəqiqəyə <span className="text-[#034788]">öyrənin</span>
              </h2>

              <div className="space-y-4">

                {/* Field 1: Device Selector */}
                <div className="relative">
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1.5 ml-1">Cihazınız</label>
                  <button
                    onClick={() => {
                      setIsDeviceDropdownOpen(!isDeviceDropdownOpen);
                      setIsCityDropdownOpen(false);
                    }}
                    className={`w-full bg-slate-50 border ${isDeviceDropdownOpen ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"} hover:border-slate-300 rounded-2xl px-4 py-4 text-left font-medium flex justify-between items-center transition`}
                  >
                    <span className={selectedDevice ? "text-slate-800 font-bold" : "text-slate-400"}>
                      {selectedDevice || "Cihazı seçin..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDeviceDropdownOpen ? "rotate-180 text-blue-500" : ""}`} />
                  </button>

                  {/* Device search dropdown */}
                  {isDeviceDropdownOpen && (
                    <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl z-30 p-3 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="relative mb-2">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Məs. iPhone 15, iPad Air..."
                          value={deviceSearch}
                          onChange={(e) => setDeviceSearch(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto space-y-0.5 scrollbar-thin">
                        {filteredDevices.length > 0 ? (
                          filteredDevices.map((device, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setSelectedDevice(device.name);
                                setIsDeviceDropdownOpen(false);
                                setDeviceSearch("");
                              }}
                              className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#034788] rounded-lg transition-colors flex justify-between items-center"
                            >
                              <span>{device.name}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase">{device.category.split(" ")[0]}</span>
                            </button>
                          ))
                        ) : (
                          <div className="text-center text-xs text-slate-400 py-4 font-semibold">Heç bir cihaz tapılmadı.</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Field 2: City Selector */}
                <div className="relative">
                  <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1.5 ml-1">Sizin şəhəriniz</label>
                  <button
                    onClick={() => {
                      setIsCityDropdownOpen(!isCityDropdownOpen);
                      setIsDeviceDropdownOpen(false);
                    }}
                    className={`w-full bg-slate-50 border ${isCityDropdownOpen ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200"} hover:border-slate-300 rounded-2xl px-4 py-4 text-left font-medium flex justify-between items-center transition`}
                  >
                    <span className="text-slate-800 font-bold">{selectedCity}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isCityDropdownOpen ? "rotate-180 text-blue-500" : ""}`} />
                  </button>

                  {isCityDropdownOpen && (
                    <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-slate-100 shadow-2xl rounded-2xl z-30 p-2 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="space-y-0.5 max-h-48 overflow-y-auto scrollbar-thin">
                        {CITIES.map((city, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedCity(city);
                              setIsCityDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors flex justify-between items-center ${selectedCity === city
                              ? "bg-blue-50 text-[#034788]"
                              : "text-slate-700 hover:bg-slate-50"
                              }`}
                          >
                            <span>{city}</span>
                            {selectedCity === city && <Check className="w-4 h-4 text-blue-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  onClick={() => {
                    if (selectedDevice) {
                      setShowResult(true);
                    } else {
                      setIsDeviceDropdownOpen(true);
                    }
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 font-extrabold text-[15px] py-4 rounded-2xl mt-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Wrench className="w-4.5 h-4.5" />
                  Təmir qiymətini öyrənin
                </button>

              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Team & Careers Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-16">
        <div className="w-full bg-[#034788] rounded-[32px] overflow-hidden shadow-xl border border-blue-500/20 text-white relative p-8 md:py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Komandamızın bir hissəsi olun
            </h2>

            <div className="pt-2">
              <a
                href="#apply"
                className="bg-amber-500 text-white hover:bg-amber-400 font-bold text-xs md:text-sm px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition inline-block uppercase tracking-wider"
              >
                Daha çox oxu
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Statistics grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight">
          amanet.az ən böyük xidmət şəbəkəsidir
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          {/* Card 1: 707 services */}
          <div className="bg-slate-50 border rounded-3xl p-6 flex items-center justify-between transition-all group">
            <div className="space-y-1">
              <span className="text-3xl md:text-4xl font-bold text-[#034788] block group-hover:scale-105 transform origin-left transition duration-200">707</span>
              <span className="text-sm font-bold text-slate-500 block">Rusiyada xidmətlər</span>
            </div>
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-[#034788]">
              <Wrench className="w-10 h-10" />
            </div>
          </div>

          {/* Card 2: 2 Million+ annual repairs */}
          <div className="bg-slate-50 border rounded-3xl p-6 flex items-center justify-between transition-all group">
            <div className="space-y-1">
              <span className="text-3xl md:text-4xl font-bold text-[#034788] block group-hover:scale-105 transform origin-left transition duration-200">2 MİLYON +</span>
              <span className="text-sm font-bold text-slate-500 block">İllik təmirlər</span>
            </div>
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-[#034788]">
              <Award className="w-10 h-10" />
            </div>
          </div>

          {/* Card 3: 180 Cities */}
          <div className="bg-slate-50 border rounded-3xl p-6 flex items-center justify-between transition-all group">
            <div className="space-y-1">
              <span className="text-3xl md:text-4xl font-bold text-[#034788] block group-hover:scale-105 transform origin-left transition duration-200">180</span>
              <span className="text-sm font-bold text-slate-500 block">Şəhərlər</span>
            </div>
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-[#034788]">
              <MapPin className="w-10 h-10" />
            </div>
          </div>

          {/* Card 4: Rating */}
          <div className="bg-slate-50 border rounded-3xl p-6 flex items-center justify-between transition-all group lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 text-white font-extrabold text-xl px-3 py-1.5 rounded-2xl">4.9</div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-800 flex items-center gap-1">
                  amanet.az <span className="text-emerald-500 text-xs font-bold font-sans">✓ Rəsmi reytinq</span>
                </h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">216,537-dən çox müsbət müştəri rəyi</p>
              </div>
            </div>
            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
              ))}
            </div>
          </div>

          {/* Card 5: Franchise */}
          <div className="bg-slate-50 border rounded-3xl p-6 flex flex-col justify-between transition-all group cursor-pointer">
            <h4 className="text-lg font-bold text-slate-800 leading-tight">amanet.az françayzinq</h4>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs font-bold text-[#034788] flex items-center gap-1 group-hover:text-blue-500">
                Daha çox oxu <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Telegram pricing banner */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <div className="w-full bg-[#034788] rounded-[32px] p-6 py-8 md:py-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3.5 rounded-2xl hidden md:inline">
              <Send className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-lg md:text-xl font-bold max-w-xl leading-relaxed">
              Telegram botundan istifadə edərək dəqiq təmir qiymətini 1 dəqiqəyə öyrənin.
            </p>
          </div>
          <div>
            <a
              href="https://t.me/pedant_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] hover:bg-[#0077b5] active:scale-98 text-white font-extrabold text-[14px] md:text-[15px] px-8 py-4 rounded-2xl flex items-center gap-2.5 shadow-lg transition-all"
            >
              <Send className="w-4 h-4 fill-white text-[#0088cc]" />
              Dəqiq qiyməti öyrənin
            </a>
          </div>
        </div>
      </section>

      {/* 6. Device Selector Grid ("Cihazınızı seçin") */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Cihazınızı seçin
        </h2>

        {/* Large cards grid */}
        <div className="grid grid-cols-1 gap-8 mt-8">
          {BRAND_GRIDS.map((brand, idx) => {
            return (
              <div
                key={idx}
                className="bg-white border border-[#d5dbe4] transition-all rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-stretch gap-6 md:gap-10"
              >
                {/* Brand Illustration Left */}
                <div className="w-24 rounded-2xl ">
                  <img src={brand.img} alt={brand.title} className="w-full h-full object-contain" />
                </div>

                {/* Grid Links Right */}
                <div className="flex-1 space-y-4">
                  <button
                    onClick={() => handleDeviceSelection(brand.subcategories[0].name)}
                    className="text-lg font-extrabold text-slate-900 hover:text-[#034788] flex items-center gap-1 group"
                  >
                    {brand.title}
                    <ChevronRight className="w-4.5 h-4.5 text-slate-300 group-hover:text-[#034788] transition-colors" />
                  </button>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2.5">
                    {brand.subcategories.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleDeviceSelection(sub.name)}
                        className="text-left text-xs md:text-sm font-semibold text-[#034788] hover:text-blue-500 hover:underline transition-colors"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small cards grid (24 cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
          {SMALL_CARDS.map((card, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleDeviceSelection(card.mockDevice)}
                className="bg-white border border-[#d5dbe4] rounded-2xl p-4 flex flex-col justify-between items-start h-36 hover:shadow-lg hover:border-blue-100 transition-all group cursor-pointer"
              >
                <span className="text-[12px] md:text-[13px] font-bold text-slate-800 group-hover:text-[#034788] transition-colors flex items-center gap-0.5">
                  {card.title} <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" />
                </span>
                <div className="self-end mt-2">
                  {card.icon}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quality Parts Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002855] tracking-tight text-center lg:text-left">
              Keyfiyyətli hissələr
            </h2>
            <div className="space-y-5 md:space-y-6">
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Orijinal sinif displeyləri</h3>
                <p className="text-[13px] sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                  Orijinal zənginlik, görüntü keyfiyyəti, parlaqlıq, rəng göstərilməsi və toxunma həssaslığı
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Batareyalar</h3>
                <p className="text-[13px] sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                  1000-dən çox doldurma dövrü təmin edən istehsalçılardan. Hər bir batareya nominal tutumunu təmin etmək üçün əlavə sınaqdan keçirilir.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Qatarlar</h3>
                <p className="text-[13px] sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                  Kabellərdəki elektron komponentlər (kameralar, şarj konnektorları, mikrofonlar) istehsalçı standartlarına tam uyğundur
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Düymələr</h3>
                <p className="text-[13px] sm:text-sm text-slate-500 font-semibold mt-1 leading-relaxed">
                  Orijinal materiallardan hazırlanmış aşınmaya davamlı düymələr
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-[4/3] rounded-[32px] overflow-hidden bg-[#034788] flex items-center justify-center p-6 shadow-xl mx-auto lg:mx-0 lg:ml-auto">
              <img
                src="/quality_parts.png"
                alt="Keyfiyyətli hissələr"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Banner Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-20 lg:mt-24">
        <div className="border border-[#d5dbe4] rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8 bg-white shadow-sm">
          <div className="space-y-3 text-left w-full lg:max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#002855] leading-snug text-center lg:text-left">
              Hər hansı bir sualınız varmı və ya təmir planlaşdırmaq istəyirsiniz?
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 text-[13px] sm:text-sm font-semibold mt-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              Biz onlaynıq, yazın və ya zəng edin
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto min-w-[280px] sm:min-w-[340px] justify-center">
            <a
              href="tel:+99450000000"
              className="w-full bg-[#0fa958] hover:bg-[#0d954e] active:scale-98 text-white font-extrabold text-sm py-4 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              Zəng edin
            </a>
            <div className="flex gap-3 w-full">
              <a
                href="https://t.me/pedant_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#24a1de] hover:bg-[#2090c7] active:scale-98 text-white font-extrabold text-sm py-4 px-4 rounded-2xl flex items-center justify-center transition-all shadow-md"
              >
                <Send className="w-4 h-4 fill-white text-[#24a1de]" />
              </a>
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#0077ff] hover:bg-[#006be5] active:scale-98 text-white font-extrabold text-sm py-4 px-4 rounded-2xl flex items-center justify-center transition-all shadow-md"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M15.687 12.186c-1.411-.861-1.189-.727 0-2.316 1.187-1.587 2.052-2.736 2.052-2.736s.22-.32.115-.494c-.104-.176-.411-.115-.411-.115h-3.415s-.254-.035-.443.084c-.183.116-.299.349-.299.349s-.54 1.444-1.261 2.67c-1.522 2.589-2.131 2.726-2.381 2.564-.58-.378-.436-1.517-.436-2.327 0-2.531.383-3.585-.749-3.858-.376-.091-.652-.15-1.615-.16-1.234-.012-2.28.006-2.871.295-.393.193-.697.622-.512.647.23.031.748.14.996.478.32.436.308 1.416.308 1.416s.184 2.979-.431 3.35c-.422.254-1.002-.265-2.247-2.613-.695-1.31-1.22-2.756-1.22-2.756s-.103-.252-.286-.388c-.223-.166-.536-.153-.536-.153H1.472s-.418-.012-.572.194c-.139.186-.011.569-.011.569s2.671 6.248 5.7 9.387c2.777 2.877 5.939 2.688 5.939 2.688h1.618s.488-.053.737-.32c.228-.244.22-.7.22-.7s-.031-2.17.977-2.487c.995-.312 2.277 1.83 2.585 2.296.347.525.795.694.795.694h3.415s1.025.074 1.199-.272c.162-.321-.132-.97-.132-.97s-1.895-3.04-2.83-4.175c-.71-.861-.83-.984 0-2.09z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Protector Section */}
      <section className="max-w-7xl mx-auto px-6 mt-12 md:mt-20 lg:mt-24">
        <div className="w-full bg-[#034788] rounded-[32px] overflow-hidden shadow-xl text-white pt-8 px-6 pb-0 sm:pt-10 sm:px-10 lg:pt-12 lg:px-16 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 relative">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

          <div className="space-y-6 max-w-2xl relative z-10 pb-8 lg:pb-12 text-left w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-center lg:text-left">
              İnnovativ örtüklü ekran qorunması
            </h2>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[13px] sm:text-sm md:text-base font-semibold">Cihazınızı hər tərəfdən qoruyun</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[13px] sm:text-sm md:text-base font-semibold leading-relaxed">
                  Minimal örtük qalınlığı cihazın ölçüsünü artırmır və ekran həssaslığını qoruyur. Film qalınlığı 0,16 mm, korpus/qoruyucu şüşə qalınlığı isə 0,30 mm-dir ki, bu da 2 qat fərqdir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[13px] sm:text-sm md:text-base font-semibold">Özünü sağaldır - cızıqlar bir müddət sonra sağalır</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[13px] sm:text-sm md:text-base font-semibold">Tez-tez dəyişdirilməsini tələb etmir (1 hidrogel örtük = aşınma müddəti baxımından 3-5 stəkan)</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[13px] sm:text-sm md:text-base font-semibold">Film hər bir xüsusi model üçün hazırlandığı üçün istənilən smartfon üçün uyğundur</span>
              </li>
            </ul>

            <div className="pt-2 text-center lg:text-left">
              <a
                href="#apply"
                className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition inline-block"
              >
                Daha çox oxu
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[35%] flex justify-center lg:justify-end items-end relative z-10 mt-4 lg:mt-0">
            <div className="w-full max-w-[280px] lg:max-w-[320px] aspect-[3/4] flex items-end justify-center">
              <img
                src="/screen_protector.png"
                alt="İnnovativ örtüklü ekran qorunması"
                className="w-full h-auto object-contain block align-bottom"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. Service Centers Map & List Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Xidmət Mərkəzlərimiz
        </h2>
        <div className="flex flex-col lg:flex-row w-full h-[500px] border border-[#d5dbe4] rounded-[32px] overflow-hidden shadow-sm bg-white">
          {/* Left Side: Map */}
          <div className="w-full lg:w-3/5 h-[350px] lg:h-full relative bg-slate-100 flex-shrink-0">
            <iframe
              src={mapUrl}
              className="w-full h-full border-none"
              allowFullScreen={true}
            ></iframe>
          </div>

          {/* Right Side: List of Service Centers */}
          <div className="w-full lg:w-2/5 h-[350px] lg:h-full flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-[#d5dbe4]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#d5dbe4] flex items-center justify-between shrink-0 bg-white z-10">
              <h3 className="text-[15px] sm:text-[17px] font-semibold text-slate-800">
                Göstərilir <span className="font-extrabold text-[#034788]">{centers.length}</span> xidmət mərkəzi
              </h3>
              <button className="bg-slate-100 hover:bg-slate-200 text-[#034788] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors">
                Hamısını göstər
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-300">
              {loadingCenters ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="border border-slate-200 rounded-[20px] p-4 flex gap-4 animate-pulse">
                    <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0"></div>
                    <div className="flex-1 space-y-2.5">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-full"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : centers.length === 0 ? (
                <div className="text-center py-10 text-slate-500 font-medium">
                  Heç bir xidmət mərkəzi tapılmadı.
                </div>
              ) : (
                centers.map((center) => (
                  <Link 
                    href={`/filiallar/${center.id}`}
                    key={center.id}
                    className="group flex flex-col sm:flex-row gap-4 sm:gap-5 border border-[#d5dbe4] hover:border-blue-300 hover:shadow-md rounded-[24px] p-4 transition-all bg-white cursor-pointer block"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                      {center.files && center.files.length > 0 ? (
                        <img 
                          src={center.files[0].url || center.files[0]} 
                          alt={center.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                          <Map className="w-8 h-8 mb-1" />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm sm:hidden">
                        <MapPin className="w-4 h-4 text-red-500 fill-red-500/20" />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-red-500 font-bold text-lg leading-none">M</span>
                          <h4 className="font-extrabold text-[15px] sm:text-[16px] text-slate-900 leading-tight">
                            {center.name}
                          </h4>
                          <Star className="w-4 h-4 text-[#034788] fill-[#034788] ml-1" />
                        </div>
                        <ChevronRight className="hidden sm:block w-5 h-5 text-slate-400 group-hover:text-[#034788] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>

                      <p className="text-[13px] sm:text-[14px] text-slate-600 font-medium mt-1.5 line-clamp-2">
                        {center.address}
                      </p>

                      <div className="mt-auto pt-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-slate-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {center.workingHours}
                        </div>
                        <p className="text-[11px] sm:text-[12px] text-slate-400 font-medium pl-5">
                          İstirahət günləri yoxdur
                        </p>
                        
                        <div className="flex items-center gap-1.5 text-[#034788] font-extrabold text-[14px] sm:text-[15px] pt-1 mt-1 border-t border-slate-50">
                          <Phone className="w-3.5 h-3.5" />
                          {center.phone}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer CTA card */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 mb-16 md:mb-24">
        <div className="w-full bg-white border border-[#d5dbe4] rounded-[32px] p-8 md:py-10 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Cihazınızı tapmadınız?</h3>
            <p className="text-slate-500 font-semibold text-sm md:text-base leading-relaxed max-w-xl">
              Bütün cihazları təmir edirik. Tam qiyməti və təmir vaxtını 1 dəqiqə ərzində Telegram botunda öyrənin.
            </p>
          </div>
          <div>
            <a
              href="https://t.me/pedant_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0088cc] hover:bg-[#0077b5] active:scale-98 text-white font-extrabold text-[14px] md:text-[15px] px-8 py-4 rounded-2xl flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4 fill-white text-[#0088cc]" />
              Dəqiq dəyəri öyrənin
            </a>
          </div>
        </div>
      </section>

      {/* Footer component */}
      <Footer onSelectDevice={handleDeviceSelection} />

      {/* 8. Pricing Estimation Modal */}
      {showResult && selectedDevice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all duration-350 scale-100 animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-6 text-white flex justify-between items-center">
              <div>
                <span className="text-[11px] text-blue-200 font-bold uppercase tracking-wider">Təmir Qiymətləri</span>
                <h3 className="text-2xl font-bold tracking-tight">{selectedDevice}</h3>
              </div>
              <button
                onClick={() => setShowResult(false)}
                className="bg-white/10 hover:bg-white/20 active:bg-white/30 p-2 rounded-full transition text-white/95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center text-sm bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <span className="font-semibold text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-4.5 h-4.5 text-[#034788]" />
                  Xidmət nöqtəsi: {selectedCity}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Detal anbarda var
                </span>
              </div>

              {/* Price Grid */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 text-[11px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="px-6 py-3.5">Təmir Xidməti</th>
                      <th className="px-6 py-3.5 text-center">Müddət</th>
                      <th className="px-6 py-3.5 text-center">Zəmanət</th>
                      <th className="px-6 py-3.5 text-right">Qiymət</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {getRepairPrices(selectedDevice).map((priceItem, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 text-[14px] font-bold text-slate-800">{priceItem.service}</td>
                        <td className="px-6 py-4 text-center text-xs text-slate-500 font-medium">{priceItem.time}</td>
                        <td className="px-6 py-4 text-center text-xs text-emerald-600 font-bold">{priceItem.warranty}</td>
                        <td className="px-6 py-4 text-right text-[15px] font-bold text-[#034788]">{priceItem.price} AZN</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center gap-4 pt-2">
                <p className="text-xs text-slate-400 max-w-sm font-medium">
                  * Qiymətlərə işçilik haqqı və ehtiyat hissəsinin dəyəri daxildir. Zəmanət rəsmi talonla verilir.
                </p>
                <button
                  onClick={() => {
                    alert(`${selectedDevice} təmiri üçün sifariş qəbul olundu. Tezliklə əlaqə saxlayacağıq!`);
                    setShowResult(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200 transition-all text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" /> Təmir sifariş et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
