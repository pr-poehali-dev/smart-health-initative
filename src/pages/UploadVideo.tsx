import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { FooterSection } from "@/components/sections/FooterSection"
import Icon from "@/components/ui/icon"

const categories = [
  "IT",
  "Медицина",
  "Технологии",
  "Образование",
  "Медиа",
  "Творчество",
  "Сельское хозяйство",
  "Право",
  "Кулинария",
  "Другое",
]

const popularTags = [
  "школьникам", "практика", "зарплата", "обучение", "карьера",
  "технологии", "творчество", "помогаю людям", "наука",
]

export default function UploadVideo() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    vkUrl: "",
    category: "",
    tags: [] as string[],
    customTag: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const toggleTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  const addCustomTag = () => {
    const tag = form.customTag.trim()
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag], customTag: "" }))
    }
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = "Введите название"
    if (!form.description.trim()) e.description = "Добавьте описание"
    if (!form.vkUrl.trim()) e.vkUrl = "Вставьте ссылку на видео"
    else if (!form.vkUrl.includes("vk.com") && !form.vkUrl.includes("vkvideo.ru")) {
      e.vkUrl = "Ссылка должна быть с ВК Видео (vk.com или vkvideo.ru)"
    }
    if (!form.category) e.category = "Выберите категорию"
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <main className="pt-24 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={32} className="text-zinc-300" />
            </div>
            <h2 className="font-display text-3xl font-bold text-zinc-100 mb-4">Видео отправлено!</h2>
            <p className="text-zinc-500 mb-8">
              Твоё видео отправлено на проверку. Модератор рассмотрит его в ближайшее время и ты получишь уведомление о результате.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { setSubmitted(false); setForm({ title: "", description: "", vkUrl: "", category: "", tags: [], customTag: "" }) }}
                className="px-6 py-3 rounded-full bg-zinc-800 text-zinc-100 text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                Загрузить ещё
              </button>
              <a
                href="/dictionary"
                className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 transition-colors"
              >
                К словарю профессий
              </a>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Платформа ЛАБА</p>
            <h1 className="font-display text-4xl font-bold text-zinc-100 mb-4">Загрузить видео</h1>
            <p className="text-zinc-500">
              Расскажи о профессии в формате видео — загрузи его на ВК Видео и вставь ссылку сюда.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Название */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Название видео <span className="text-zinc-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Например: «Один день из жизни хирурга»"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors ${
                  errors.title ? "border-red-500/60" : "border-zinc-800 focus:border-zinc-600"
                }`}
              />
              {errors.title && <p className="mt-1.5 text-xs text-red-400">{errors.title}</p>}
            </div>

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Описание <span className="text-zinc-500">*</span>
              </label>
              <textarea
                placeholder="Расскажи, о чём видео и кому оно будет полезно..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors resize-none ${
                  errors.description ? "border-red-500/60" : "border-zinc-800 focus:border-zinc-600"
                }`}
              />
              {errors.description && <p className="mt-1.5 text-xs text-red-400">{errors.description}</p>}
            </div>

            {/* Ссылка на ВК Видео */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Ссылка на ВК Видео <span className="text-zinc-500">*</span>
              </label>
              <div className="relative">
                <Icon name="Link" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="url"
                  placeholder="https://vk.com/video..."
                  value={form.vkUrl}
                  onChange={(e) => handleChange("vkUrl", e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.vkUrl ? "border-red-500/60" : "border-zinc-800 focus:border-zinc-600"
                  }`}
                />
              </div>
              {errors.vkUrl ? (
                <p className="mt-1.5 text-xs text-red-400">{errors.vkUrl}</p>
              ) : (
                <p className="mt-1.5 text-xs text-zinc-500">Сначала загрузи видео на ВК Видео, затем вставь ссылку</p>
              )}
            </div>

            {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Категория профессии <span className="text-zinc-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-zinc-100 focus:outline-none transition-colors appearance-none ${
                    errors.category ? "border-red-500/60" : "border-zinc-800 focus:border-zinc-600"
                  } ${!form.category ? "text-zinc-500" : ""}`}
                >
                  <option value="" disabled>Выберите категорию...</option>
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-zinc-900">{c}</option>
                  ))}
                </select>
                <Icon name="ChevronDown" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
              </div>
              {errors.category && <p className="mt-1.5 text-xs text-red-400">{errors.category}</p>}
            </div>

            {/* Метки */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Метки</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      form.tags.includes(tag)
                        ? "bg-zinc-100 text-zinc-900 font-medium"
                        : "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              {form.tags.filter(t => !popularTags.includes(t)).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.tags.filter(t => !popularTags.includes(t)).map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-sm font-medium"
                    >
                      #{tag}
                      <button type="button" onClick={() => toggleTag(tag)}>
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Своя метка..."
                  value={form.customTag}
                  onChange={(e) => setForm(prev => ({ ...prev, customTag: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomTag() } }}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={addCustomTag}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 transition-colors"
                >
                  Добавить
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-zinc-100 text-zinc-900 font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Upload" size={18} />
              Отправить на проверку
            </button>
          </form>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
