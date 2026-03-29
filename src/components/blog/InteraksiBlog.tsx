"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, Reply } from "lucide-react";

type Komentar = {
  id: string;
  nama: string;
  isi: string;
  createdAt: string;
  parentId: string | null;
  balasan: Komentar[];
};

type InteraksiBlogProps = {
  blogId: number;
  initialLikes: number;
};

export default function InteraksiBlog({ blogId, initialLikes }: InteraksiBlogProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [komentar, setKomentar] = useState<Komentar[]>([]);
  const [nama, setNama] = useState("");
  const [isiKomentar, setIsiKomentar] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyNama, setReplyNama] = useState("");
  const [replyIsi, setReplyIsi] = useState("");

  const fetchKomentar = async () => {
    try {
      const res = await fetch(`/api/blog/komentar?blogId=${blogId}`);
      if (res.ok) {
        const data = await res.json();
        setKomentar(data);
      }
    } catch (error) {
      console.error("Error fetching komentar:", error);
    }
  };

  useEffect(() => {
    const liked = localStorage.getItem(`liked_${blogId}`);
    if (liked) setHasLiked(true);
    fetchKomentar();
  }, [blogId, fetchKomentar]);

  const handleLike = async () => {
    if (hasLiked) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/blog/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setLikes(data.likesCount);
        setHasLiked(true);
        localStorage.setItem(`liked_${blogId}`, "true");
      }
    } catch (error) {
      console.error("Error liking:", error);
    }
    setLoading(false);
  };

  const handleSubmitKomentar = async (parentId?: string) => {
    const namaVal = parentId ? replyNama : nama;
    const isiVal = parentId ? replyIsi : isiKomentar;

    if (!isiVal.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/blog/komentar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nama: namaVal || "Anonim", 
          isi: isiVal, 
          blogId,
          parentId: parentId || null 
        }),
      });
      
      if (res.ok) {
        setNama("");
        setIsiKomentar("");
        setReplyNama("");
        setReplyIsi("");
        setReplyingTo(null);
        fetchKomentar();
      }
    } catch (error) {
      console.error("Error submitting komentar:", error);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      {/* Like Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleLike}
          disabled={hasLiked || loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            hasLiked 
              ? "bg-brand-pink-start/10 text-brand-pink-start cursor-default" 
              : "bg-slate-100 text-slate-600 hover:bg-brand-pink-start/10 hover:text-brand-pink-start"
          }`}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? "fill-brand-pink-start" : ""}`} />
          {hasLiked ? "Disukai" : "Suka"} ({likes})
        </button>
      </div>

      {/* Comment Form */}
      <div className="bg-slate-50 rounded-xl p-5 mb-8">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Tinggalkan Komentar
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nama (Opsional)"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-pink-start"
          />
          <textarea
            placeholder="Tulis komentar Anda..."
            value={isiKomentar}
            onChange={(e) => setIsiKomentar(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-pink-start resize-none"
          />
          <button
            onClick={() => handleSubmitKomentar()}
            disabled={loading || !isiKomentar.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-pink-start text-white text-sm font-bold rounded-lg hover:bg-[#d94f92] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Kirim Komentar
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 mb-4">
          Komentar ({komentar.length})
        </h3>
        
        {komentar.length === 0 && (
          <p className="text-slate-500 text-sm">Belum ada komentar. Jadilah yang pertama!</p>
        )}

        {komentar.map((k) => (
          <div key={k.id} className="bg-white border border-slate-100 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-sm font-semibold text-slate-800">{k.nama}</span>
                <span className="text-xs text-slate-400 ml-2">{formatDate(k.createdAt)}</span>
              </div>
              <button
                onClick={() => setReplyingTo(replyingTo === k.id ? null : k.id)}
                className="text-xs text-slate-400 hover:text-brand-pink-start flex items-center gap-1"
              >
                <Reply className="w-3 h-3" />
                Balas
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-3">{k.isi}</p>

            {/* Reply Form */}
            {replyingTo === k.id && (
              <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-2 mb-3">
                <input
                  type="text"
                  placeholder="Nama (Opsional)"
                  value={replyNama}
                  onChange={(e) => setReplyNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-pink-start"
                />
                <textarea
                  placeholder="Tulis balasan..."
                  value={replyIsi}
                  onChange={(e) => setReplyIsi(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-pink-start resize-none"
                />
                <button
                  onClick={() => handleSubmitKomentar(k.id)}
                  disabled={loading || !replyIsi.trim()}
                  className="text-xs px-3 py-1.5 bg-brand-pink-start text-white rounded-lg hover:bg-[#d94f92] disabled:opacity-50"
                >
                  Kirim Balasan
                </button>
              </div>
            )}

            {/* Replies */}
            {k.balasan && k.balasan.length > 0 && (
              <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-3 mt-3">
                {k.balasan.map((balasan) => (
                  <div key={balasan.id} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-800">{balasan.nama}</span>
                      <span className="text-[10px] text-slate-400">{formatDate(balasan.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-600">{balasan.isi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
