"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  User,
  FileText,
  MessageCircle,
  Download,
  CheckCircle,
  Home,
  BookOpen,
  Users,
  Headphones,
  ChevronRight,
  Search,
  Bookmark,
  Share2,
  ThumbsUp,
  Filter,
  Grid,
  List,
} from "lucide-react";

type PlaylistModule = {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
};

type VideoData = {
  id: string;
  title: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    rating: number;
    totalStudents: string;
    totalCourses: string;
  };
  description: {
    overview: string;
    sections: { title: string; content: string }[];
  };
  playlist: PlaylistModule[];
  resources: { name: string; type: string; size: string }[];
};

const videoData: VideoData = {
  id: "vc1",
  title: "The Ultimate Guide to Usability Testing and UX Law",
  instructor: {
    name: "Guru Telematika",
    avatar: "Durung Ana Gambar",
    bio: "Guru Profesional di SMKS Telematika Indramayu dengan pengalaman mengajar di bidang Teknik Komputer dan Jaringan. Berdedikasi untuk memberikan pengetahuan terbaik kepada siswa.",
    rating: 4.8,
    totalStudents: "12,450",
    totalCourses: "8",
  },
  description: {
    overview:
      "This comprehensive course covers the fundamentals of usability testing and understanding UX laws. You will learn how to conduct effective usability tests, analyze user behavior, and apply proven UX principles to create better digital products.",
    sections: [
      {
        title: "Introduction to Usability Testing",
        content:
          "Usability testing is a technique used in user-centered interaction design to evaluate a product by testing it on users. This section introduces the core concepts and methodologies.",
      },
      {
        title: "Setting Up Your First Test",
        content:
          "Learn how to prepare for a usability test, from defining objectives to selecting participants and creating test scenarios.",
      },
      {
        title: "UX Laws and Principles",
        content:
          "Discover the fundamental laws that govern user experience design, including Fitts's Law, Hick's Law, and the Gestalt principles.",
      },
      {
        title: "Analyzing Test Results",
        content:
          "Master the art of analyzing qualitative and quantitative data from usability tests to derive actionable insights.",
      },
      {
        title: "Iterating and Improving",
        content:
          "Learn how to use test findings to iterate on your designs and continuously improve user experience.",
      },
    ],
  },
  playlist: [
    { id: "v1", title: "Introduction to Usability Testing", duration: "15:30", isCompleted: true },
    { id: "v2", title: "Setting Up Your First Test", duration: "22:45", isCompleted: true },
    { id: "v3", title: "UX Laws and Principles", duration: "18:20", isCompleted: false },
    { id: "v4", title: "Fitts's Law Explained", duration: "12:15", isCompleted: false },
    { id: "v5", title: "Hick's Law in Practice", duration: "14:30", isCompleted: false },
    { id: "v6", title: "Gestalt Principles Overview", duration: "20:00", isCompleted: false },
    { id: "v7", title: "Analyzing Test Results", duration: "25:10", isCompleted: false },
    { id: "v8", title: "Creating Test Scenarios", duration: "17:45", isCompleted: false },
    { id: "v9", title: "Remote vs In-Person Testing", duration: "19:30", isCompleted: false },
    { id: "v10", title: "Iterating and Improving", duration: "21:00", isCompleted: false },
  ],
  resources: [
    { name: "Course Slides.pdf", type: "PDF", size: "2.4 MB" },
    { name: "Test Templates.zip", type: "ZIP", size: "1.8 MB" },
    { name: "UX Laws Cheatsheet.pdf", type: "PDF", size: "0.5 MB" },
  ],
};

export default function VideoDetailPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "resources" | "support">("all");
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(2);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900 relative">

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-[1440px] py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/elearning" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-pink-start transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Kembali ke E-Learning</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-[10px] transition-colors">
              <Bookmark className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-[10px] transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 max-w-[1440px] py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#1e2a4a] rounded-[10px] overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-20 h-20 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-white/40 text-sm font-medium">Durung Ana Video</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-20 h-20 rounded-[10px] bg-brand-pink-start/90 flex items-center justify-center shadow-2xl backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white fill-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  )}
                </motion.div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{videoData.playlist[currentVideoIndex].title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="p-1 hover:bg-white/20 rounded transition-colors">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <button className="p-1 hover:bg-white/20 rounded transition-colors">
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 h-1 bg-white/30 rounded-[10px] overflow-hidden">
                    <div className="h-full w-3/5 bg-brand-pink-start rounded-[10px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-[10px] border border-gray-200 p-6 shadow-sm">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-[#1e2a4a] font-serif mb-2">
                      {videoData.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {videoData.playlist[currentVideoIndex].duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {videoData.instructor.totalStudents} students
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-4 py-2 bg-brand-pink-start text-white rounded-[10px] text-sm font-bold hover:bg-[#d94f92] transition-colors">
                      <ThumbsUp className="w-4 h-4" /> Like
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-[10px] mb-6">
                  <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-white shadow">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1e2a4a]">{videoData.instructor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(videoData.instructor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="font-medium ml-1">{videoData.instructor.rating}</span>
                      </div>
                      <span>|</span>
                      <span>{videoData.instructor.totalCourses} Courses</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-bold text-[#1e2a4a] font-serif mb-3">About This Course</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{videoData.description.overview}</p>

                  <div className="space-y-6">
                    {videoData.description.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="border-l-2 border-brand-pink-start pl-4"
                      >
                        <h3 className="font-bold text-[#1e2a4a] mb-2">{section.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-[#1e2a4a] mb-4">Instructor Bio</h3>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-brand-pink-start/5 to-transparent rounded-[10px]">
                    <div className="w-16 h-16 rounded-[10px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-brand-pink-start">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e2a4a]">{videoData.instructor.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(videoData.instructor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span>{videoData.instructor.rating} Rating</span>
                        <span>|</span>
                        <span>{videoData.instructor.totalStudents} Students</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{videoData.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-[10px] border border-gray-200 shadow-sm overflow-hidden sticky top-20">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#1e2a4a]">Course Playlist</h3>
                  <button onClick={() => setIsPlaylistOpen(!isPlaylistOpen)} className="p-1 hover:bg-gray-200 rounded transition-colors">
                    {isPlaylistOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  {(["all", "resources", "support"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-3 rounded-[10px] text-xs font-bold uppercase tracking-wide transition-all ${
                        activeTab === tab
                          ? "bg-brand-pink-start text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tab === "all" ? "All Videos" : tab === "resources" ? "Resources" : "Support"}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isPlaylistOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {activeTab === "all" && (
                      <div className="p-2 max-h-[500px] overflow-y-auto">
                        {videoData.playlist.map((video, index) => (
                          <motion.div
                            key={video.id}
                            whileHover={{ backgroundColor: "rgba(244, 114, 182, 0.05)" }}
                            className={`flex items-center gap-3 p-3 rounded-[10px] cursor-pointer transition-all group ${
                              currentVideoIndex === index ? "bg-brand-pink-start/10 border border-brand-pink-start/30" : ""
                            }`}
                            onClick={() => setCurrentVideoIndex(index)}
                          >
                            <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
                              currentVideoIndex === index
                                ? "bg-brand-pink-start text-white"
                                : "bg-gray-100 text-gray-500 group-hover:bg-brand-pink-start/20"
                            }`}>
                              {video.isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Play className="w-3 h-3 fill-current" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${
                                currentVideoIndex === index ? "text-brand-pink-start" : "text-gray-700"
                              }`}>
                                {video.title}
                              </p>
                              <p className="text-xs text-gray-400">{video.duration}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === "resources" && (
                      <div className="p-4 space-y-3">
                        <h4 className="font-bold text-gray-700 text-sm mb-3">Downloadable Resources</h4>
                        {videoData.resources.map((resource, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-[10px] bg-brand-blue-start/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-brand-blue-start" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">{resource.name}</p>
                              <p className="text-xs text-gray-400">{resource.type} - {resource.size}</p>
                            </div>
                            <Download className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === "support" && (
                      <div className="p-6 text-center">
                        <div className="w-16 h-16 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center mx-auto mb-4">
                          <Headphones className="w-8 h-8 text-brand-pink-start" />
                        </div>
                        <h4 className="font-bold text-gray-700 mb-2">Need Help?</h4>
                        <p className="text-sm text-gray-500 mb-4">Our support team is available 24/7 to assist you.</p>
                        <button className="w-full py-3 bg-brand-pink-start text-white rounded-[10px] font-bold text-sm hover:bg-[#d94f92] transition-colors flex items-center justify-center gap-2">
                          <MessageCircle className="w-4 h-4" /> Contact Support
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
