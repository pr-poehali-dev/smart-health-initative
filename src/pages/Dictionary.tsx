import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { FooterSection } from "@/components/sections/FooterSection"
import Icon from "@/components/ui/icon"

const professions = [
  {
    id: 1,
    title: "Программист",
    category: "IT",
    description: "Разрабатывает программное обеспечение, сайты и мобильные приложения. Работает с кодом, решает логические задачи и создаёт цифровые продукты.",
    skills: ["Логическое мышление", "Внимательность", "Командная работа"],
    videos: 12,
  },
  {
    id: 2,
    title: "Врач",
    category: "Медицина",
    description: "Диагностирует и лечит заболевания, помогает людям сохранять и восстанавливать здоровье. Специализации: хирург, терапевт, педиатр и другие.",
    skills: ["Ответственность", "Стрессоустойчивость", "Эмпатия"],
    videos: 8,
  },
  {
    id: 3,
    title: "Инженер",
    category: "Технологии",
    description: "Проектирует и создаёт технические системы, механизмы и конструкции. Применяет науку и математику для решения реальных задач.",
    skills: ["Аналитическое мышление", "Точность", "Творчество"],
    videos: 15,
  },
  {
    id: 4,
    title: "Учитель",
    category: "Образование",
    description: "Передаёт знания и помогает ученикам развиваться. Формирует у детей навыки, ценности и любовь к учёбе.",
    skills: ["Терпение", "Коммуникабельность", "Творчество"],
    videos: 6,
  },
  {
    id: 5,
    title: "Журналист",
    category: "Медиа",
    description: "Собирает, проверяет и публикует информацию о событиях. Работает в газетах, на телевидении, радио и в интернет-изданиях.",
    skills: ["Любопытство", "Быстрая реакция", "Грамотность"],
    videos: 5,
  },
  {
    id: 6,
    title: "Дизайнер",
    category: "Творчество",
    description: "Создаёт визуальные решения: логотипы, сайты, упаковки, интерьеры. Совмещает творчество и технические навыки.",
    skills: ["Вкус", "Внимание к деталям", "Насмотренность"],
    videos: 9,
  },
  {
    id: 7,
    title: "Агроном",
    category: "Сельское хозяйство",
    description: "Управляет процессами выращивания растений, контролирует качество почвы и урожая, внедряет новые технологии в сельском хозяйстве.",
    skills: ["Наблюдательность", "Ответственность", "Любовь к природе"],
    videos: 3,
  },
  {
    id: 8,
    title: "Юрист",
    category: "Право",
    description: "Консультирует по правовым вопросам, составляет документы, защищает интересы клиентов в суде и переговорах.",
    skills: ["Аналитика", "Красноречие", "Стрессоустойчивость"],
    videos: 4,
  },
  {
    id: 9,
    title: "Повар",
    category: "Кулинария",
    description: "Создаёт блюда в кафе, ресторанах и столовых. Сочетает вкусы, следит за качеством продуктов и придумывает новые рецепты.",
    skills: ["Творчество", "Скорость", "Вкусовая чувствительность"],
    videos: 7,
  },
]

const categories = ["Все", "IT", "Медицина", "Технологии", "Образование", "Медиа", "Творчество", "Сельское хозяйство", "Право", "Кулинария"]

const categoryIcons: Record<string, string> = {
  "IT": "Monitor",
  "Медицина": "Heart",
  "Технологии": "Wrench",
  "Образование": "BookOpen",
  "Медиа": "Newspaper",
  "Творчество": "Palette",
  "Сельское хозяйство": "Sprout",
  "Право": "Scale",
  "Кулинария": "ChefHat",
}

export default function Dictionary() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = professions.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === "Все" || p.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-4">Платформа ЛАБА</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
              Словарь профессий
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto text-lg">
              Узнай о профессиях от тех, кто в них работает — через видео, снятые твоими сверстниками.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Найти профессию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-zinc-100 text-zinc-900"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              Профессии не найдены. Попробуй изменить запрос.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <Icon name={categoryIcons[p.category] || "Briefcase"} size={20} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                    </div>
                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-full">{p.category}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-zinc-100 text-lg mb-2">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.skills.map((skill) => (
                      <span key={skill} className="text-xs text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500 border-t border-zinc-800 pt-4">
                    <Icon name="Video" size={15} className="text-zinc-500" />
                    <span>{p.videos} {p.videos === 1 ? "видео" : p.videos < 5 ? "видео" : "видео"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
