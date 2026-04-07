import { motion } from "framer-motion"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

const testimonials = [
  {
    text: "Благодаря ЛАБЕ мои ученики впервые всерьёз задумались о профессии. Видео-формат оказался гораздо эффективнее классных часов.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Ирина Соколова",
    role: "Классный руководитель, школа №14",
  },
  {
    text: "Снимал видео о профессии инженера вместе с папой. Теперь хочу поступать в технический вуз — ЛАБА помогла мне это понять.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Артём Волков",
    role: "Ученик 10 класса",
  },
  {
    text: "Платформа очень удобная. Загрузила видео за 5 минут, модератор проверил на следующий день. Всё чётко и понятно.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Маша Николаева",
    role: "Ученица 9 класса",
  },
  {
    text: "Как завуч, я вижу огромный потенциал ЛАБЫ для всей школы. Дети стали активнее интересоваться профессиями своих родителей.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Дмитрий Петров",
    role: "Завуч, гимназия №3",
  },
  {
    text: "Функция «Федерация» позволяет видеть работы учеников со всего региона. Это вдохновляет детей соревноваться и расти.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Наталья Смирнова",
    role: "Координатор «Движения Первых»",
  },
  {
    text: "Словарь профессий — просто находка. Дети открывают для себя специальности, о которых раньше даже не слышали.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Алексей Громов",
    role: "Учитель технологии",
  },
  {
    text: "ЛАБА превратила профориентацию из скучной обязанности в настоящее приключение. Дети сами просят снять ещё одно видео!",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Лариса Тихонова",
    role: "Педагог-психолог",
  },
  {
    text: "Модерировать видео очень удобно — всё в одном месте, есть история статусов и комментарии для авторов.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Михаил Орлов",
    role: "Проверяющий (модератор)",
  },
  {
    text: "Участие в ЛАБЕ помогло нашей школе получить грант на развитие профориентации. Инвесторы были впечатлены концепцией.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Елена Кузнецова",
    role: "Директор школы",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const logos = ["Движение Первых", "Росмолодёжь", "Министерство просвещения", "Сколково", "Учитель года", "Россия — страна возможностей"]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-12"
        >
          <div className="border border-zinc-800 py-1.5 px-4 rounded-full text-sm text-zinc-400">Отзывы</div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-100 mt-6 text-center tracking-tight">
            Что говорят участники ЛАБЫ
          </h2>
          <p className="text-center mt-4 text-zinc-500 text-lg text-balance">
            Ученики, педагоги и модераторы — все уже оценили платформу.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>

        <div className="mt-16 pt-16 border-t border-zinc-800/50">
          <p className="text-center text-sm text-zinc-500 mb-8">Нас поддерживают</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex gap-12 md:gap-16"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate logos for seamless loop */}
              {[...logos, ...logos].map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-xl font-semibold text-zinc-700 whitespace-nowrap flex-shrink-0"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}