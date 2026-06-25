"use client";

import React, { useState, useEffect } from "react";
import MegaMenu from "@/components/MegaMenu";
import Footer from "@/components/Footer";
import { ChevronRight, Star, Send, Phone, MapPin, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define the type for API response
interface ServiceCenterData {
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

export default function FilialDetail() {
  const params = useParams();
  
  // Format the slug back to a readable name, fallback to a default if not present
  const slug = (params?.slug as string) || "Avtozavodskaya";
  const fallbackFormattedName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // API Data state
  const [centerData, setCenterData] = useState<ServiceCenterData | null>(null);
  const [loading, setLoading] = useState(true);

  // Local state for pricing table
  const [activeCategory, setActiveCategory] = useState("iPhone");
  const [activeModel, setActiveModel] = useState("iPhone 13");

  // Fetch API data on mount
  useEffect(() => {
    const fetchServiceCenter = async () => {
      try {
        setLoading(true);
        // Using the absolute API URL from environment variables
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ServiceCenters/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setCenterData(json.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch service center data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceCenter();
  }, [slug]);

  // Derived values from API or Fallbacks
  const displayName = centerData?.name || fallbackFormattedName;
  const address = centerData?.address || "Küç. Nümunə, ev 15/1";
  const phone = centerData?.phone || "+994 (50) 000-00-00";
  const workingHours = centerData?.workingHours || "10:00 - 21:00";
  // We can use centerData.latitude & centerData.longitude for an actual map integration later.

  const categories = ["iPhone", "Samsung", "Honor", "Xiaomi", "Meizu", "Daha çox"];
  const models = ["iPhone 13", "iPhone 17", "iPhone 17 Pro", "iPhone 17 Pro Max", "iPhone 17e", "Daha çox"];

  const repairServices = [
    { name: "Diaqnostika", device: "iPhone 13", time: "Pulsuz", price: "Pulsuz", isPromo: false },
    { name: "Batareyanın dəyişdirilməsi", device: "iPhone 13", time: "20 dəq", price: "40 AZN", oldPrice: "60 AZN", isPromo: true },
    { name: "Şüşənin dəyişdirilməsi", device: "iPhone 13", time: "20 dəq", price: "90 AZN", isPromo: false },
    { name: "Ekranın dəyişdirilməsi", device: "iPhone 13", time: "20 dəq", price: "150 AZN", oldPrice: "180 AZN", isPromo: true },
    { name: "Hidrogel qorunması", device: "iPhone 13", time: "10 dəq", price: "25 AZN", isPromo: false, badge: "HIT" },
    { name: "Arxa qapağın dəyişdirilməsi", device: "iPhone 13", time: "20 dəq", price: "60 AZN", isPromo: false },
  ];

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <MegaMenu onSelectDevice={(device) => console.log(device)} />

      {/* Hero Section */}
      <main className="w-full flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/2 bg-[#034788] text-white flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-24 relative overflow-hidden">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center flex-wrap gap-1.5 md:gap-2 text-[11px] md:text-sm text-blue-200 mb-8 md:mb-12 absolute top-6 left-6 md:top-8 md:left-16 lg:left-24 z-20">
            <Link href="/" className="hover:text-white transition-colors">Ev</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/" className="hover:text-white transition-colors">Telefon təmiri</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {loading ? (
              <span className="w-16 h-4 bg-white/20 animate-pulse rounded"></span>
            ) : (
              <span className="text-white font-medium">{displayName}</span>
            )}
          </nav>

          {/* Hero Content */}
          <div className="space-y-5 md:space-y-6 mt-8 md:mt-10 z-10 max-w-xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] min-h-[40px] md:min-h-[60px]">
              {loading ? (
                <span className="inline-block w-3/4 h-8 md:h-12 bg-white/20 animate-pulse rounded-xl"></span>
              ) : (
                `${displayName} telefon təmiri`
              )}
            </h1>

            <a href="#" className="inline-block text-white border-b border-white/40 hover:border-white transition-colors pb-0.5 text-[13px] md:text-base font-semibold">
              Başqa bir xidmət seçin
            </a>

            <ul className="space-y-3.5 md:space-y-4 pt-2 md:pt-4">
              <li className="flex items-start gap-2.5 md:gap-3">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[14px] md:text-base font-medium">
                  <strong className="text-amber-400 font-bold">15 AZN-dən başlayaraq</strong> 15-30 dəqiqə ərzində təmir
                </span>
              </li>
              <li className="flex items-start gap-2.5 md:gap-3">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[14px] md:text-base font-medium">100% zəmanət</span>
              </li>
              <li className="flex items-start gap-2.5 md:gap-3">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[14px] md:text-base font-medium">Orijinal sinif komponentləri</span>
              </li>
              <li className="flex items-start gap-2.5 md:gap-3">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                <span className="text-[14px] md:text-base font-medium">Smartfonların, noutbukların, planşetlərin təmiri</span>
              </li>
            </ul>

            <div className="pt-4 md:pt-6">
              <a
                href="https://t.me/pedant_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2eb5f0] hover:bg-[#259ed4] active:scale-98 text-white font-extrabold text-[14px] md:text-[15px] px-6 md:px-8 py-3.5 md:py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all w-full md:w-fit"
              >
                <Send className="w-5 h-5 fill-white text-[#2eb5f0]" />
                Təmir qiymətini öyrənin
              </a>
              <p className="text-xs text-blue-200 mt-3 font-medium text-center md:text-left pl-1">
                Telegram botunda 1 dəqiqəyə
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-auto bg-slate-100">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/repairman_hero.png" 
              alt="Təmirçi" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </main>

      {/* 1. Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12 md:mt-16 lg:mt-24 w-full overflow-hidden">
        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-6 md:mb-8 px-2">
          Smartfonların təmiri üçün sərfəli qiymətlər
        </h2>
        
        {/* Categories */}
        <div className="mb-4 space-y-2 md:space-y-3 px-2">
          <p className="text-xs md:text-sm font-bold text-slate-700">Kateqoriya</p>
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-[13px] sm:text-sm font-bold transition-colors ${activeCategory === cat ? "bg-[#034788] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Models */}
        <div className="mb-6 md:mb-8 space-y-2 md:space-y-3 px-2">
          <p className="text-xs md:text-sm font-bold text-slate-700">Model</p>
          <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {models.map((mod) => (
              <button 
                key={mod} 
                onClick={() => setActiveModel(mod)}
                className={`shrink-0 px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-[13px] sm:text-sm font-bold transition-colors ${activeModel === mod ? "bg-[#034788] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {mod}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="border border-[#e2e8f0] rounded-2xl md:rounded-3xl overflow-hidden mb-8 shadow-sm">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-slate-50/50 p-5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-[#e2e8f0]">
            <div className="col-span-5">Xidmət</div>
            <div className="col-span-2">Cihaz</div>
            <div className="col-span-2">Təmir vaxtı</div>
            <div className="col-span-3">İşin dəyəri <span className="lowercase text-[10px] ml-1 font-medium text-slate-400">(detalsız)</span></div>
          </div>
          
          {/* Table Body */}
          <div className="divide-y divide-[#e2e8f0]">
            {repairServices.map((service, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 p-4 md:p-5 items-start md:items-center hover:bg-slate-50 transition-colors">
                
                <div className="col-span-5 flex flex-col items-start gap-1 md:gap-1.5 w-full">
                  <span className="font-bold text-[14px] md:text-[15px] text-slate-800">{service.name}</span>
                  <div className="flex gap-2">
                    {service.isPromo && <span className="bg-amber-100 text-amber-700 text-[9px] md:text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">-20% 22 iyuna kimi</span>}
                    {service.badge && <span className="bg-amber-400 text-slate-900 text-[9px] md:text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">{service.badge}</span>}
                  </div>
                </div>

                <div className="col-span-2 text-sm font-bold text-slate-700 hidden md:block">{service.device}</div>
                <div className="col-span-2 text-[13px] md:text-sm font-semibold text-slate-500 flex items-center gap-2"><span className="md:hidden font-bold text-slate-400 text-xs">Vaxt:</span> {service.time}</div>
                
                <div className="col-span-3 flex items-center justify-between w-full mt-1 md:mt-0 pt-3 md:pt-0 border-t border-dashed border-slate-100 md:border-none">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-[15px] text-[#034788]">{service.price}</span>
                    {service.oldPrice && <span className="text-[11px] md:text-xs text-slate-400 font-semibold line-through">{service.oldPrice}</span>}
                  </div>
                  <button className="bg-amber-400 hover:bg-amber-500 active:scale-95 transition-all text-slate-900 font-bold text-[13px] px-5 py-2 md:py-2.5 rounded-xl">
                    Yazılmaq
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-10 px-2">
          <button className="w-full md:w-auto bg-[#f1f5f9] hover:bg-[#e2e8f0] text-slate-700 font-bold px-8 py-3.5 rounded-2xl text-[14px] transition-colors">
            Tam qiymət siyahısını göstərin
          </button>
        </div>

        {/* Info Box */}
        <div className="border border-slate-200 rounded-2xl md:rounded-[32px] p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6 bg-white shadow-sm max-w-4xl mx-auto mx-2 md:mx-auto">
          <div className="space-y-1.5 md:space-y-2 text-center md:text-left">
            <h3 className="text-lg md:text-2xl font-extrabold text-slate-900">Qiymət iş üçün göstərilib</h3>
            <p className="text-[13px] md:text-[15px] text-slate-500 font-medium max-w-sm mx-auto md:mx-0">Biz bütün cihazları təmir edirik, dəqiq qiyməti 1 dəqiqəyə Telegram botunda öyrənin.</p>
          </div>
          <a href="https://t.me/pedant_bot" target="_blank" rel="noopener noreferrer" className="bg-[#2eb5f0] hover:bg-[#259ed4] active:scale-98 text-white font-extrabold text-[14px] md:text-[15px] px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all w-full md:w-auto shrink-0">
            <Send className="w-4 h-4" /> Dəqiq dəyəri öyrənin
          </a>
        </div>
      </section>

      {/* 2. Service Center Info & Map Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16 lg:mt-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="space-y-6 md:space-y-8 px-2 md:px-0">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              amanet.az-da xidmət mərkəzi
            </h2>
            
            <div className="space-y-4 md:space-y-5">
              <div className="flex items-center gap-2 text-[14px] md:text-[15px] font-bold text-slate-800">
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                {loading ? (
                  <div className="w-24 h-4 bg-slate-200 animate-pulse rounded"></div>
                ) : (
                  <>
                    {displayName} <Star className="w-4 h-4 text-[#034788] fill-[#034788] ml-1 shrink-0" />
                  </>
                )}
              </div>
              
              {loading ? (
                <div className="w-40 h-4 bg-slate-200 animate-pulse rounded ml-7"></div>
              ) : (
                <p className="text-[14px] md:text-[15px] text-slate-600 font-medium pl-7">{address}</p>
              )}
              
              <div className="text-[13px] md:text-[14px] space-y-2 pl-7 pt-1 md:pt-2">
                <p className="flex items-center">
                  <span className="text-slate-500 font-semibold w-20 md:w-24">B.E - C.</span> 
                  {loading ? (
                    <div className="w-24 h-4 bg-slate-200 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <span className="font-bold text-emerald-600">{workingHours}</span> 
                      <span className="text-emerald-600 text-[10px] md:text-xs font-bold ml-2 md:ml-3 bg-emerald-50 px-2 py-0.5 rounded-full">Açıqdır</span>
                    </>
                  )}
                </p>
                <p className="flex items-center">
                  <span className="text-slate-500 font-semibold w-20 md:w-24">Ş. - B.</span> 
                  <span className="font-bold text-slate-800">10:00 - 20:00</span>
                </p>
              </div>
            </div>

            {/* Gallery Mini */}
            <div className="flex gap-2 md:gap-3 mt-4 md:mt-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {centerData?.files && centerData.files.length > 0 ? (
                centerData.files.map((file, i) => (
                  <div key={i} className="w-20 h-20 md:w-28 md:h-28 rounded-xl md:rounded-2xl bg-slate-200 overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                    <img src={file.url} alt="Xidmət mərkəzi" className="w-full h-full object-cover" />
                  </div>
                ))
              ) : (
                [1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 md:w-28 md:h-28 rounded-xl md:rounded-2xl bg-slate-200 overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                    <img src="/repairman_hero.png" alt="Xidmət mərkəzi" className="w-full h-full object-cover" />
                  </div>
                ))
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 pt-4 md:pt-6">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex-1 bg-[#0fa958] hover:bg-[#0d954e] active:scale-98 text-white font-extrabold text-[14px] md:text-base py-3.5 md:py-4 px-6 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md">
                <Phone className="w-4 h-4 md:w-5 md:h-5 fill-white" /> 
                {loading ? <span className="w-24 h-4 bg-white/20 animate-pulse rounded"></span> : phone}
              </a>
              <button className="flex-1 bg-[#f1f5f9] hover:bg-[#e2e8f0] active:scale-98 text-[#034788] font-extrabold text-[14px] md:text-base py-3.5 md:py-4 px-6 rounded-xl md:rounded-2xl transition-all">
                Necə çatmaq olar?
              </button>
            </div>
          </div>

          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-slate-200 rounded-2xl md:rounded-[32px] overflow-hidden relative border border-slate-200 shadow-sm mx-2 md:mx-0">
             {/* Fake Map integration. For production, Google Maps or Yandex iframe is recommended. 
                 Using latitude/longitude from centerData if available. */}
             <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                <div className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-lg border border-slate-100 max-w-[200px] md:max-w-none">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-1.5 md:mb-2" />
                  <span className="font-bold text-[13px] md:text-sm text-slate-800 block truncate">{displayName}</span>
                  {centerData?.latitude && centerData?.longitude ? (
                    <span className="text-[10px] md:text-xs text-slate-500 block mt-1">Koordinatlar: {centerData.latitude}, {centerData.longitude}</span>
                  ) : (
                    <span className="text-[10px] md:text-xs text-slate-500 block mt-1">Xəritə interqrasiyası</span>
                  )}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Banners */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-12 md:mt-16 lg:mt-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           <div className="bg-[#034788] rounded-2xl md:rounded-[32px] p-6 md:p-8 lg:p-10 flex flex-col justify-center items-start text-white min-h-[140px] md:min-h-[180px] relative overflow-hidden shadow-sm">
              <div className="relative z-10 max-w-[240px]">
                <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-1.5 md:mb-2 leading-tight">Ekran şüşəsini dəyişdirin</h3>
                <p className="text-[13px] md:text-sm text-blue-200 font-medium">Görüntü keyfiyyəti | Original sinif şüşə</p>
                <div className="mt-4 md:mt-5 bg-amber-400 text-slate-900 text-[10px] md:text-xs font-extrabold px-3 py-1.5 rounded-md md:rounded-lg inline-block shadow-md">
                   -30% qədər endirim
                </div>
              </div>
           </div>
           <div className="bg-[#9ca3af] rounded-2xl md:rounded-[32px] p-6 md:p-8 lg:p-10 flex flex-col justify-center items-start text-white min-h-[140px] md:min-h-[180px] relative overflow-hidden shadow-sm">
              <div className="relative z-10 max-w-[240px]">
                 <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold mb-1.5 md:mb-2 leading-tight">Qiymətlər endirildi</h3>
                 <p className="text-[13px] md:text-sm text-slate-100 font-medium">Yalnız 21 iyuna qədər</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. Quality Parts Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 md:space-y-8 px-2 md:px-0">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-[#002855] tracking-tight text-center lg:text-left leading-snug">
              Keyfiyyətli detallar populyar modellər üçün həmişə var, gözləmək lazım deyil!
            </h2>
            <div className="space-y-5 md:space-y-6">
              <div className="text-left">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-800">Orijinal sinif displeyləri</h3>
                <p className="text-[13px] sm:text-[14px] text-slate-500 font-semibold mt-1 md:mt-1.5 leading-relaxed">
                  Orijinal zənginlik, görüntü keyfiyyəti, parlaqlıq, rəng göstərilməsi və toxunma həssaslığı
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-800">Batareyalar</h3>
                <p className="text-[13px] sm:text-[14px] text-slate-500 font-semibold mt-1 md:mt-1.5 leading-relaxed">
                  1000-dən çox doldurma dövrü təmin edən istehsalçılardan. Hər bir batareya nominal tutumunu təmin etmək üçün əlavə sınaqdan keçirilir.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-800">Şleyflər</h3>
                <p className="text-[13px] sm:text-[14px] text-slate-500 font-semibold mt-1 md:mt-1.5 leading-relaxed">
                  Elektron komponentlər (kameralar, şarj konnektorları, mikrofonlar) istehsalçı standartlarına tam uyğundur
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-[15px] sm:text-lg font-bold text-slate-800">Düymələr</h3>
                <p className="text-[13px] sm:text-[14px] text-slate-500 font-semibold mt-1 md:mt-1.5 leading-relaxed">
                  Orijinal materiallardan hazırlanmış aşınmaya davamlı düymələr
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 flex justify-center mt-6 md:mt-8 lg:mt-0 px-2 md:px-0">
            <div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-2xl md:rounded-[32px] overflow-hidden bg-slate-900 shadow-xl">
              <img
                src="/repairman_hero.png"
                alt="Keyfiyyətli hissələr"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Banner Box */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-24">
        <div className="border border-[#d5dbe4] rounded-2xl md:rounded-[32px] p-5 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-6 bg-white shadow-sm">
          <div className="space-y-2 md:space-y-3 text-center lg:text-left w-full lg:max-w-md">
            <h3 className="text-lg sm:text-2xl font-extrabold text-[#002855] leading-snug">
              Suallarınız var və ya təmirə yazılmaq istəyirsiniz?
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 text-[12px] sm:text-sm font-semibold mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              Biz onlaynıq, yazın, zəng edin
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col w-full lg:w-auto min-w-[100%] sm:min-w-[340px] lg:min-w-[280px] gap-2.5 md:gap-3">
            <button className="w-full bg-[#0fa958] hover:bg-[#0d954e] active:scale-98 text-white font-extrabold text-[14px] md:text-sm py-3.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all">
              <Phone className="w-4 h-4" /> Zəng edin
            </button>
            <div className="flex gap-2.5 md:gap-3 w-full">
              <a href="https://t.me/pedant_bot" className="flex-1 bg-[#24a1de] hover:bg-[#2090c7] active:scale-98 text-white py-3.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm transition-all">
                <Send className="w-4 h-4 fill-white text-[#24a1de]" />
              </a>
              <a href="#" className="flex-1 bg-[#0077ff] hover:bg-[#006be5] active:scale-98 text-white font-extrabold text-[14px] md:text-sm py-3.5 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm transition-all">
                VK
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comfortable Service Centers */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-24 mb-16 md:mb-32">
         <h2 className="text-xl sm:text-3xl font-extrabold text-[#002855] tracking-tight mb-6 md:mb-10 max-w-2xl text-center md:text-left mx-auto md:mx-0 px-2 md:px-0">
           Müasir avadanlıqlarla rahat xidmət mərkəzləri
         </h2>
         <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center bg-slate-200 rounded-2xl md:rounded-[32px] overflow-hidden aspect-square md:aspect-[4/5] relative shadow-sm border border-slate-200">
                <img src="/repairman_hero.png" alt="Service Center" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
         </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
