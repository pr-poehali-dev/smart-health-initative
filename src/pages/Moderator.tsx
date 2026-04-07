import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { FooterSection } from "@/components/sections/FooterSection"
import Icon from "@/components/ui/icon"

type Status = "pending" | "approved" | "rejected"

interface Video {
  id: number
  title: string
  author: string
  school: string
  category: string
  description: string
  vkUrl: string
  tags: string[]
  submittedAt: string
  status: Status
  rejectReason?: string
}

const initialVideos: Video[] = [
  {
    id: 1,
    title: "Один день из жизни хирурга",
    author: "Петя Иванов",
    school: "Школа №14, Москва",
    category: "Медицина",
    description: "Папа взял меня на дежурство и рассказал, как проходит операция. Снял видео прямо в больнице.",
    vkUrl: "https://vk.com/video-123456",
    tags: ["медицина", "хирург", "помогаю людям"],
    submittedAt: "2026-04-05",
    status: "pending",
  },
  {
    id: 2,
    title: "Как стать программистом в 16 лет",
    author: "Маша Кузнецова",
    school: "Гимназия №3, Казань",
    category: "IT",
    description: "Рассказываю о своём опыте — как начала программировать, где учиться и какие проекты уже сделала.",
    vkUrl: "https://vk.com/video-789012",
    tags: ["IT", "программирование", "школьникам"],
    submittedAt: "2026-04-06",
    status: "pending",
  },
  {
    id: 3,
    title: "Профессия агроном — это не скучно!",
    author: "Дима Соловьёв",
    school: "Школа №2, Краснодар",
    category: "Сельское хозяйство",
    description: "Съездил на ферму к дяде. Оказывается, агроном использует дроны и современные технологии!",
    vkUrl: "https://vk.com/video-345678",
    tags: ["агроном", "технологии", "природа"],
    submittedAt: "2026-04-06",
    status: "pending",
  },
  {
    id: 4,
    title: "Дизайнер интерьеров: моя мама",
    author: "Аня Белова",
    school: "Лицей №7, Санкт-Петербург",
    category: "Творчество",
    description: "Мама показала, как создаётся дизайн-проект квартиры — от эскиза до финальной отделки.",
    vkUrl: "https://vk.com/video-901234",
    tags: ["дизайн", "творчество", "карьера"],
    submittedAt: "2026-04-07",
    status: "pending",
  },
]

const rejectReasons = [
  "Видео недоступно по ссылке",
  "Не по теме профориентации",
  "Плохое качество звука/видео",
  "Нарушение правил платформы",
  "Другое",
]

export default function Moderator() {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending")
  const [rejectModal, setRejectModal] = useState<{ open: boolean; videoId: number | null }>({ open: false, videoId: null })
  const [rejectReason, setRejectReason] = useState("")
  const [customReason, setCustomReason] = useState("")

  const approve = (id: number) => {
    setVideos((prev) => prev.map((v) => v.id === id ? { ...v, status: "approved" } : v))
  }

  const openRejectModal = (id: number) => {
    setRejectModal({ open: true, videoId: id })
    setRejectReason("")
    setCustomReason("")
  }

  const confirmReject = () => {
    const reason = rejectReason === "Другое" ? customReason : rejectReason
    if (!reason.trim()) return
    setVideos((prev) => prev.map((v) =>
      v.id === rejectModal.videoId ? { ...v, status: "rejected", rejectReason: reason } : v
    ))
    setRejectModal({ open: false, videoId: null })
  }

  const filtered = videos.filter((v) => filter === "all" || v.status === filter)

  const counts = {
    all: videos.length,
    pending: videos.filter(v => v.status === "pending").length,
    approved: videos.filter(v => v.status === "approved").length,
    rejected: videos.filter(v => v.status === "rejected").length,
  }

  const statusBadge = (status: Status) => {
    if (status === "approved") return <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1"><Icon name="CheckCircle" size={12} />Одобрено</span>
    if (status === "rejected") return <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 text-xs font-medium flex items-center gap-1"><Icon name="XCircle" size={12} />Отклонено</span>
    return <span className="px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300 text-xs font-medium flex items-center gap-1"><Icon name="Clock" size={12} />На проверке</span>
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">Платформа ЛАБА</p>
            <h1 className="font-display text-4xl font-bold text-zinc-100 mb-1">Кабинет проверяющего</h1>
            <p className="text-zinc-500">Просматривай видео учеников и принимай решение о публикации.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {(["all", "pending", "approved", "rejected"] as const).map((tab) => {
              const labels = { all: "Всего", pending: "На проверке", approved: "Одобрено", rejected: "Отклонено" }
              const icons = { all: "LayoutList", pending: "Clock", approved: "CheckCircle", rejected: "XCircle" }
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    filter === tab
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-zinc-900/50 border-zinc-800/50 hover:border-zinc-700"
                  }`}
                >
                  <Icon name={icons[tab]} size={16} className="text-zinc-400 mb-2" />
                  <div className="font-display text-2xl font-bold text-zinc-100">{counts[tab]}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{labels[tab]}</div>
                </button>
              )
            })}
          </div>

          {/* List */}
          <div className="space-y-4">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-zinc-500">
                <Icon name="Inbox" size={40} className="mx-auto mb-4 text-zinc-700" />
                Нет видео в этой категории
              </div>
            )}
            {filtered.map((video) => (
              <div
                key={video.id}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 transition-all hover:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-heading font-semibold text-zinc-100">{video.title}</h3>
                      {statusBadge(video.status)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-500">
                      <span className="flex items-center gap-1"><Icon name="User" size={13} />{video.author}</span>
                      <span className="flex items-center gap-1"><Icon name="School" size={13} fallback="Building" />{video.school}</span>
                      <span className="flex items-center gap-1"><Icon name="Calendar" size={13} />{video.submittedAt}</span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2.5 py-1 rounded-full flex-shrink-0">{video.category}</span>
                </div>

                <p className="text-zinc-400 text-sm mb-3">{video.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {video.tags.map((tag) => (
                    <span key={tag} className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">#{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <a
                    href={video.vkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <Icon name="ExternalLink" size={15} />
                    Смотреть на ВК Видео
                  </a>

                  {video.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => openRejectModal(video.id)}
                        className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 text-sm font-medium hover:bg-zinc-700 hover:text-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="X" size={14} />
                        Отклонить
                      </button>
                      <button
                        onClick={() => approve(video.id)}
                        className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="Check" size={14} />
                        Одобрить
                      </button>
                    </div>
                  )}

                  {video.status === "rejected" && video.rejectReason && (
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      <Icon name="MessageSquare" size={14} />
                      <span>Причина: {video.rejectReason}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setRejectModal({ open: false, videoId: null })} />
          <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-heading font-semibold text-zinc-100 text-lg mb-1">Отклонить видео</h3>
            <p className="text-zinc-500 text-sm mb-5">Укажи причину — автор получит уведомление.</p>

            <div className="space-y-2 mb-4">
              {rejectReasons.map((reason) => (
                <label key={reason} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="rejectReason"
                    value={reason}
                    checked={rejectReason === reason}
                    onChange={() => setRejectReason(reason)}
                    className="accent-zinc-300"
                  />
                  <span className="text-zinc-300 text-sm">{reason}</span>
                </label>
              ))}
            </div>

            {rejectReason === "Другое" && (
              <textarea
                placeholder="Опиши причину..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 resize-none text-sm mb-4"
              />
            )}

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setRejectModal({ open: false, videoId: null })}
                className="px-4 py-2 rounded-full bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={confirmReject}
                disabled={!rejectReason || (rejectReason === "Другое" && !customReason.trim())}
                className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  )
}
