"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Bookmark,
  BookmarkCheck,
  Share2,
  ZoomIn,
  ZoomOut,
  Printer,
  Download,
  Clock,
  Calendar,
  User,
  FileText,
  List,
  CheckCircle,
  Quote,
  ArrowRight,
} from "lucide-react";

type EbookSection = {
  id: string;
  title: string;
  content: string;
  subsections?: { title: string; content: string }[];
};

type EbookData = {
  id: string;
  title: string;
  subtitle: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedDate: string;
  lastUpdated: string;
  readTime: string;
  pages: string;
  category: string;
  tags: string[];
  overview: string;
  sections: EbookSection[];
};

const ebookData: EbookData = {
  id: "ec1",
  title: "The Complete Guide to Network Security Fundamentals",
  subtitle: "A comprehensive resource for understanding and implementing robust network security measures",
  author: {
    name: "Guru Telematika",
    avatar: "Durung Ana Gambar",
    bio: "Guru Profesional di SMKS Telematika Indramayu. Bertugas membimbing siswa dalam memahami konsep dan praktik terbaik di bidang Teknologi Informasi.",
  },
  publishedDate: "March 15, 2024",
  lastUpdated: "March 18, 2024",
  readTime: "4 hours 30 minutes",
  pages: "248 pages",
  category: "Security",
  tags: ["Network Security", "Firewalls", "VPN", "Encryption", "Cyber Defense"],
  overview:
    "This comprehensive guide provides an in-depth exploration of network security fundamentals, covering everything from basic principles to advanced implementation strategies. Whether you're a beginner or an experienced professional, this resource will equip you with the knowledge needed to secure modern network infrastructures.",
  sections: [
    {
      id: "introduction",
      title: "Introduction to Network Security",
      content:
        "Network security is the practice of securing a computer network infrastructure against unauthorized access, misuse, malfunction, modification, destruction, or improper disclosure. In today's interconnected world, where cyber threats are becoming increasingly sophisticated, understanding network security is no longer optional—it's essential.",
      subsections: [
        {
          title: "Why Network Security Matters",
          content:
            "Every day, thousands of cyberattacks occur worldwide, targeting businesses, governments, and individuals alike. The average cost of a data breach continues to rise, making prevention far more cost-effective than remediation.",
        },
        {
          title: "The Evolution of Cyber Threats",
          content:
            "From simple viruses to complex state-sponsored attacks, the threat landscape has evolved dramatically. Understanding this evolution helps security professionals anticipate and prepare for future challenges.",
        },
      ],
    },
    {
      id: "core-principles",
      title: "Core Security Principles",
      content:
        "The foundation of network security rests on three fundamental principles: Confidentiality, Integrity, and Availability—collectively known as the CIA triad. These principles guide all security decisions and implementations.",
      subsections: [
        {
          title: "Confidentiality",
          content:
            "Ensuring that information is accessible only to those authorized to have access. This is achieved through encryption, access controls, and proper data classification.",
        },
        {
          title: "Integrity",
          content:
            "Maintaining the accuracy and completeness of data and processing methods. This involves preventing unauthorized modifications and ensuring data authenticity.",
        },
        {
          title: "Availability",
          content:
            "Ensuring that authorized users have access to information and associated assets when required. This includes maintaining hardware, software, and network infrastructure.",
        },
      ],
    },
    {
      id: "threats",
      title: "Common Network Threats",
      content:
        "Understanding the various types of threats is crucial for implementing effective countermeasures. Network threats can be categorized into several types, each requiring specific defense strategies.",
      subsections: [
        {
          title: "Malware",
          content:
            "Malicious software including viruses, worms, trojans, ransomware, and spyware. Each type has unique propagation methods and payload characteristics.",
        },
        {
          title: "Phishing Attacks",
          content:
            "Social engineering attacks designed to trick users into revealing sensitive information or installing malware. These attacks often appear as legitimate communications from trusted sources.",
        },
        {
          title: "Man-in-the-Middle Attacks",
          content:
            "Attacks where the adversary secretly intercepts and relays communications between two parties who believe they are directly communicating with each other.",
        },
      ],
    },
    {
      id: "defense",
      title: "Defense Mechanisms",
      content:
        "A robust security strategy employs multiple layers of defense, known as defense in depth. This approach ensures that even if one layer is compromised, others continue to provide protection.",
      subsections: [
        {
          title: "Firewall Implementation",
          content:
            "Firewalls serve as the first line of defense, monitoring and controlling incoming and outgoing network traffic based on predetermined security rules.",
        },
        {
          title: "Intrusion Detection & Prevention",
          content:
            "IDS/IPS systems monitor network traffic for suspicious activity and can automatically block detected threats in real-time.",
        },
        {
          title: "Virtual Private Networks",
          content:
            "VPNs encrypt network communications, providing secure remote access and protecting data as it traverses untrusted networks.",
        },
      ],
    },
    {
      id: "best-practices",
      title: "Security Best Practices",
      content:
        "Implementing security best practices is essential for maintaining a secure network environment. These practices should be followed consistently across the organization.",
      subsections: [
        {
          title: "Regular Security Audits",
          content:
            "Periodic security assessments help identify vulnerabilities and ensure compliance with security policies and standards.",
        },
        {
          title: "Employee Training",
          content:
            "Human error remains one of the leading causes of security breaches. Regular training ensures all staff understand their security responsibilities.",
        },
        {
          title: "Incident Response Planning",
          content:
            "Having a well-defined incident response plan ensures quick and effective action when security incidents occur, minimizing potential damage.",
        },
      ],
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content:
        "Network security is an ongoing process, not a one-time implementation. As threats evolve, so must our defenses. By understanding the fundamentals covered in this guide and staying vigilant, organizations can significantly reduce their risk exposure and protect their valuable assets.",
    },
  ],
};

export default function EbookDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showToC, setShowToC] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((element) => {
      if (observerRef.current && element) {
        observerRef.current.observe(element);
      }
    });

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadProgress(Math.min(100, progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 relative">

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-[1200px] py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/elearning" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-pink-start transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Kembali ke E-Learning</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-gray-100 rounded-[10px] p-1">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="p-2 hover:bg-white rounded transition-colors"
                title="Perkecil teks"
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xs text-gray-500 px-2">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-2 hover:bg-white rounded transition-colors"
                title="Perbesar teks"
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-[10px] transition-colors ${isBookmarked ? "bg-brand-pink-start text-white" : "hover:bg-gray-100 text-gray-600"}`}
              title="Tandai bacaan"
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-[10px] transition-colors" title="Bagikan">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-1 bg-gray-100">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-pink-start to-brand-blue-start"
            style={{ width: `${readProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </nav>

      <div className="container mx-auto px-6 max-w-[1200px] py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <div className="sticky top-24 bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#1e2a4a] flex items-center gap-2">
                    <List className="w-4 h-4" /> Daftar Isi
                  </h3>
                  <button onClick={() => setShowToC(!showToC)} className="p-1 hover:bg-gray-200 rounded transition-colors lg:hidden">
                    {showToC ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showToC && (
                  <motion.nav
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 max-h-[60vh] overflow-y-auto">
                      {ebookData.sections.map((section, index) => (
                        <motion.button
                          key={section.id}
                          whileHover={{ x: 4 }}
                          onClick={() => scrollToSection(section.id)}
                          className={`w-full text-left p-3 rounded-[10px] mb-1 transition-all ${
                            activeSection === section.id
                              ? "bg-brand-pink-start/10 text-brand-pink-start"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <span className="text-xs text-gray-400 block mb-0.5">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium">{section.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>

              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <h4 className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-3">Informasi</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{ebookData.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{ebookData.publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>{ebookData.pages}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <header className="bg-white rounded-[10px] border border-gray-200 shadow-sm p-8 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-brand-pink-start/10 text-brand-pink-start text-xs font-bold rounded-[10px]">
                  {ebookData.category}
                </span>
                {ebookData.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-[10px]">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1e2a4a] font-serif mb-3 leading-tight">
                {ebookData.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">{ebookData.subtitle}</p>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[10px]">
                <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-white shadow">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1e2a4a]">{ebookData.author.name}</h3>
                  <p className="text-sm text-gray-500">{ebookData.author.bio}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-pink-start text-white rounded-[10px] text-sm font-bold hover:bg-[#d94f92] transition-colors">
                  <Bookmark className="w-4 h-4" /> Simpan
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-[10px] text-sm font-bold hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" /> Bagikan
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-[10px] text-sm font-bold hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" /> Unduh PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-[10px] text-sm font-bold hover:bg-gray-200 transition-colors">
                  <Printer className="w-4 h-4" /> Cetak
                </button>
              </div>
            </header>

            <div className="bg-white rounded-[10px] border border-gray-200 shadow-sm p-8">
              <section 
                data-section="overview" 
                className="mb-10"
                ref={(el) => registerSection("overview", el)}
              >
                <h2 className="text-xl font-bold text-[#1e2a4a] font-serif mb-4 pb-3 border-b-2 border-brand-pink-start">
                  Ringkasan
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
                  {ebookData.overview}
                </p>
              </section>

              {ebookData.sections.map((section, index) => (
                <section 
                  key={section.id} 
                  data-section={section.id} 
                  className="mb-12 scroll-mt-24"
                  ref={(el) => registerSection(section.id, el)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-xl font-bold text-[#1e2a4a] font-serif mb-4 pb-3 border-b-2 border-brand-pink-start flex items-center gap-3">
                      <span className="w-8 h-8 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center text-brand-pink-start text-sm font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </h2>

                    <p className="text-gray-600 mb-6" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
                      {section.content}
                    </p>

                    {section.subsections && (
                      <div className="space-y-6 ml-4">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex} className="bg-gray-50 rounded-[10px] p-5 border-l-4 border-brand-blue-start">
                            <h3 className="font-bold text-[#1e2a4a] mb-3 flex items-center gap-2">
                              <ArrowRight className="w-4 h-4 text-brand-blue-start" />
                              {subsection.title}
                            </h3>
                            <p className="text-gray-600" style={{ fontSize: `${fontSize - 1}px`, lineHeight: 1.7 }}>
                              {subsection.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </section>
              ))}

              <section className="mt-12 pt-8 border-t border-gray-200">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-brand-pink-start/5 to-brand-blue-start/5 rounded-[10px] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0">
                      <Quote className="w-6 h-6 text-brand-pink-start" />
                    </div>
                    <div>
                      <p className="text-gray-600 italic text-lg leading-relaxed mb-4">
                        "Keamanan jaringan bukan hanya tentang teknologi, tetapi juga tentang kesadaran, pelatihan, dan budaya keamanan yang diterapkan secara konsisten."
                      </p>
                      <p className="text-sm font-bold text-gray-700">— {ebookData.author.name}</p>
                    </div>
                  </div>
                </motion.div>
              </section>

              <section className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-[#1e2a4a] mb-6">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {ebookData.tags.map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-[10px] hover:bg-brand-pink-start/10 hover:text-brand-pink-start transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-[#1e2a4a] mb-6">Tentang Penulis</h3>
                <div className="bg-gray-50 rounded-[10px] p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-[10px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-brand-pink-start">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e2a4a] text-lg">{ebookData.author.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">Penulis & Pakar Keamanan Siber</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{ebookData.author.bio}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-6 bg-white rounded-[10px] border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-[#1e2a4a] mb-4">Materi Terkait</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-50 rounded-[10px] p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-[10px] mb-3" />
                    <h4 className="text-sm font-bold text-gray-700 truncate">Related Material {i}</h4>
                    <p className="text-xs text-gray-400">15 min read</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </main>
  );
}
