/*
 * ============================================================
 * DESIGN: Contemporary Legal Craft
 * 山田・鈴木法律事務所 Landing Page
 * Colors: Navy (#0f1f3d) × Champagne Gold (#b8965a) × Cream (#fdf9f3)
 * Fonts: Cormorant Garamond (display) + Noto Serif JP (heading) + Noto Sans JP (body)
 * Layout: Asymmetric, zigzag sections, left-right alternating
 * ============================================================
 */

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Award,
  BookOpen,
  Building2,
  ChevronDown,
  Clock,
  FileText,
  Home as HomeIcon,
  Mail,
  MapPin,
  Menu,
  Phone,
  Scale,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString("ja-JP"));

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ─── Fade-in Section ────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Gold Divider ────────────────────────────────────────────────────────────
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-px w-12 bg-[#b8965a]" />
      <div className="h-1 w-1 rounded-full bg-[#b8965a]" />
      <div className="h-px w-6 bg-[#b8965a]" />
    </div>
  );
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "事務所について", href: "#about" },
    { label: "業務内容", href: "#services" },
    { label: "弁護士紹介", href: "#attorneys" },
    { label: "解決実績", href: "#results" },
    { label: "よくある質問", href: "#faq" },
    { label: "アクセス", href: "#access" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0f1f3d]/95 backdrop-blur-md shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-tight">
          <span className="font-display text-[#b8965a] text-xl font-semibold tracking-wider">
            YAMADA & SUZUKI
          </span>
          <span className="font-serif-jp text-white text-xs tracking-[0.3em] font-light">
            山田・鈴木法律事務所
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans-jp text-white/80 hover:text-[#b8965a] text-sm tracking-wide transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b8965a] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden lg:flex items-center gap-2 bg-[#b8965a] hover:bg-[#d4a96a] text-white font-sans-jp text-sm px-5 py-2.5 transition-all duration-300 tracking-wider"
        >
          <Phone size={14} />
          無料相談
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="メニュー"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-[#0f1f3d] border-t border-white/10"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans-jp text-white/80 hover:text-[#b8965a] text-sm py-2 border-b border-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="bg-[#b8965a] text-white font-sans-jp text-sm px-5 py-3 text-center mt-2 tracking-wider"
            >
              無料相談のお申し込み
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f1f3d]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://private-us-east-1.manuscdn.com/sessionFile/u9w7rMzT8qClq2MkE6E7fa/sandbox/GzEoug7TQoNmLu6TMtjH5L-img-1_1771543793000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdTl3N3JNelQ4cUNscTJNa0U2RTdmYS9zYW5kYm94L0d6RW91ZzdUUW9ObUx1NlRNdGpINUwtaW1nLTFfMTc3MTU0Mzc5MzAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ClzoNIQMe8MloZYXbneG9BDR-tB41-hMy3mC6kiSjqCKfKwlqJsXrGBepdzttqfAXS4TS0~sRituYdlmvNZFVo19XWU1KaZXLibw~eoxE90VC7az20Q~CHRbnRR~0ZEM2TdXP6tQlprHeRvtV~DJCf95ptuVM~O3EXth5SPRjHQxCFJQhbva56ZZWIaTjO3cUbBjX45O4UgrYeW9uQE9UqzW1zEsTTtcMy2H4DxrLkQmOdDyQRNWzOfFSygfmfjgom8rwQiD-AxDqZknhbatfqo7spUQObC0Oc-xKwxNgG2kqE14Wsdb457UnJy55s-73mFcWjLMj9gatW28sLJULA__")`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3d]/90 via-[#0f1f3d]/70 to-[#0f1f3d]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f3d]/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-[#b8965a]" />
            <span className="font-display text-[#b8965a] text-sm tracking-[0.3em] uppercase">
              Since 1998 · Tokyo
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif-jp text-white font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            あなたの権利を、
            <br />
            <span className="text-[#b8965a]">全力で守る。</span>
          </motion.h1>

          {/* Sub Heading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-display text-white/70 italic mb-4"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          >
            Protecting Your Rights with Integrity
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="font-sans-jp text-white/75 text-sm lg:text-base leading-relaxed mb-10 max-w-lg"
          >
            創業25年以上の実績と信頼。企業法務から個人の法律問題まで、
            経験豊富な弁護士チームが丁寧にサポートいたします。
            初回相談は無料です。まずはお気軽にご連絡ください。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-[#b8965a] hover:bg-[#d4a96a] text-white font-sans-jp text-sm px-8 py-4 transition-all duration-300 tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone size={16} />
              無料相談を予約する
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-[#b8965a] text-white hover:text-[#b8965a] font-sans-jp text-sm px-8 py-4 transition-all duration-300 tracking-wider"
            >
              <FileText size={16} />
              業務内容を見る
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-display text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} className="text-[#b8965a]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Stats Section ────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { value: 3200, suffix: "+", label: "解決実績", sub: "件" },
    { value: 25, suffix: "年", label: "創業からの年数", sub: "" },
    { value: 98, suffix: "%", label: "依頼者満足度", sub: "" },
    { value: 12, suffix: "名", label: "在籍弁護士", sub: "" },
  ];

  return (
    <section className="bg-[#0f1f3d] py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1} className="text-center lg:px-8">
              <div className="font-display text-[#b8965a] font-semibold mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-lg ml-1">{stat.sub}</span>
              </div>
              <div className="font-sans-jp text-white/60 text-sm tracking-wide">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#fdf9f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <FadeIn direction="left" className="relative">
            <div className="relative">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/u9w7rMzT8qClq2MkE6E7fa/sandbox/GzEoug7TQoNmLu6TMtjH5L-img-3_1771543790000_na1fn_b2ZmaWNlLWludGVyaW9y.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdTl3N3JNelQ4cUNscTJNa0U2RTdmYS9zYW5kYm94L0d6RW91ZzdUUW9ObUx1NlRNdGpINUwtaW1nLTNfMTc3MTU0Mzc5MDAwMF9uYTFmbl9iMlptYVdObExXbHVkR1Z5YVc5eS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Sk-rQqzG-7lR6bNhkMCIR0h42C~6tveYch8T3xQ7dAmz2lALG-F8GzzM1GuVxbCR5pifk7T-JM6hsExOiUBqIYKk8yPctLjqx-pnYD4XK-uWlshc1CAu41O4CYgYGWaIyjqPJRgbRlNPNzeJYsWDZLRZF-di6a3BqoiuSLeL4MiXgKDcCWgtEf~CsXzB4Ww5vlHg842eoTOUEcT7fk6zmciJYiY0ZA1dqublqIZIS9kAeT5YUxOGiu~P9PqnWVvt9MMNvT~ptJrY-TnAva2WmCvkZv5JofqqYsyygV-NEbVRuhqNlBcEWzYAvD2krz9AUTF626ezcoVt0vVbUjva8g__"
                alt="事務所内観"
                className="w-full h-[480px] object-cover"
              />
              {/* Overlay card */}
              <div className="absolute -bottom-8 -right-8 bg-[#0f1f3d] text-white p-6 w-48 hidden lg:block">
                <div className="font-display text-[#b8965a] text-3xl font-semibold">1998</div>
                <div className="font-sans-jp text-white/70 text-xs mt-1 tracking-wider">創業年</div>
                <div className="h-px w-8 bg-[#b8965a] mt-3" />
                <div className="font-sans-jp text-white/60 text-xs mt-2">東京都千代田区</div>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="right">
            <div className="section-number mb-4">01 — ABOUT US</div>
            <GoldDivider className="mb-6" />
            <h2 className="font-serif-jp text-[#0f1f3d] font-bold mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              依頼者の利益を最優先に、
              <br />
              誠実に向き合う法律事務所
            </h2>
            <p className="font-sans-jp text-gray-600 text-sm leading-relaxed mb-6">
              山田・鈴木法律事務所は、1998年の創業以来、東京を拠点として企業法務・民事訴訟・刑事弁護など幅広い法律問題に対応してまいりました。
            </p>
            <p className="font-sans-jp text-gray-600 text-sm leading-relaxed mb-8">
              私たちは「依頼者の立場に立ち、最善の解決策を提供する」という理念のもと、複雑な法律問題をわかりやすく説明し、依頼者が安心して手続きを進められるよう全力でサポートいたします。
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Shield, text: "守秘義務の徹底" },
                { icon: Clock, text: "迅速な対応" },
                { icon: Award, text: "豊富な実績" },
                { icon: Users, text: "チーム体制" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#b8965a]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#b8965a]" />
                  </div>
                  <span className="font-sans-jp text-[#0f1f3d] text-sm">{text}</span>
                </div>
              ))}
            </div>
            <a
              href="#attorneys"
              className="inline-flex items-center gap-2 text-[#b8965a] font-sans-jp text-sm tracking-wider border-b border-[#b8965a] pb-1 hover:gap-4 transition-all duration-300"
            >
              弁護士を紹介する →
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  const services = [
    {
      icon: Building2,
      title: "企業法務",
      desc: "契約書の作成・審査、M&A、コンプライアンス体制の構築など、企業活動全般にわたる法的サポートを提供します。",
      items: ["契約書作成・審査", "M&A・事業承継", "コンプライアンス", "労働問題対応"],
    },
    {
      icon: Scale,
      title: "民事訴訟・紛争解決",
      desc: "不動産トラブル、金銭トラブル、離婚・相続など、あらゆる民事紛争において最善の解決策を追求します。",
      items: ["不動産紛争", "金銭・債権回収", "離婚・親権", "相続・遺産分割"],
    },
    {
      icon: Shield,
      title: "刑事弁護",
      desc: "逮捕・勾留から裁判まで、刑事手続きの各段階において迅速かつ的確な弁護活動を行います。",
      items: ["逮捕・勾留対応", "示談交渉", "公判弁護", "再審請求"],
    },
    {
      icon: HomeIcon,
      title: "不動産・相続",
      desc: "不動産取引の法的サポートから相続手続きまで、財産に関わる問題を総合的に解決します。",
      items: ["不動産売買", "遺言書作成", "相続手続き", "成年後見"],
    },
    {
      icon: Users,
      title: "労働問題",
      desc: "不当解雇、残業代未払い、ハラスメントなど、労働に関するあらゆる問題に対応します。",
      items: ["不当解雇対応", "残業代請求", "ハラスメント", "労働審判"],
    },
    {
      icon: BookOpen,
      title: "知的財産",
      desc: "特許・商標・著作権などの知的財産権の保護と活用に関する法的アドバイスを提供します。",
      items: ["特許・商標登録", "著作権保護", "不正競争防止", "ライセンス交渉"],
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="section-number mb-4">02 — PRACTICE AREAS</div>
          <GoldDivider className="mb-6" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-serif-jp text-[#0f1f3d] font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              業務内容
            </h2>
            <p className="font-sans-jp text-gray-500 text-sm max-w-sm leading-relaxed">
              幅広い法律分野において、専門知識と豊富な経験を活かした質の高いリーガルサービスを提供します。
            </p>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-white p-8 group hover:bg-[#0f1f3d] transition-colors duration-500 h-full">
                <div className="w-12 h-12 bg-[#b8965a]/10 group-hover:bg-[#b8965a]/20 flex items-center justify-center mb-6 transition-colors duration-500">
                  <service.icon size={22} className="text-[#b8965a]" />
                </div>
                <h3 className="font-serif-jp text-[#0f1f3d] group-hover:text-white font-semibold text-lg mb-3 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="font-sans-jp text-gray-500 group-hover:text-white/60 text-sm leading-relaxed mb-5 transition-colors duration-500">
                  {service.desc}
                </p>
                <ul className="space-y-1.5">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 font-sans-jp text-xs text-gray-400 group-hover:text-white/50 transition-colors duration-500">
                      <div className="w-1 h-1 rounded-full bg-[#b8965a] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Attorneys Section ────────────────────────────────────────────────────────
function AttorneysSection() {
  const attorneys = [
    {
      name: "山田 健一郎",
      nameEn: "Kenichiro Yamada",
      title: "代表弁護士 / 所長",
      bar: "東京弁護士会",
      year: "1998年登録",
      specialty: "企業法務・M&A・国際取引",
      education: "東京大学法学部卒 / 東京大学法科大学院修了",
      awards: ["法務省表彰 (2015)", "東京弁護士会優秀弁護士賞 (2019)"],
      bio: "企業法務を専門とし、国内外のM&Aや大型契約交渉を数多く手がける。上場企業の社外取締役も務める。",
    },
    {
      name: "鈴木 美咲",
      nameEn: "Misaki Suzuki",
      title: "パートナー弁護士",
      bar: "東京弁護士会",
      year: "2003年登録",
      specialty: "家事事件・相続・労働問題",
      education: "慶應義塾大学法学部卒 / 慶應義塾大学法科大学院修了",
      awards: ["日弁連女性弁護士奨励賞 (2018)"],
      bio: "離婚・相続・労働問題を専門とし、依頼者に寄り添った丁寧な対応で高い評価を得ている。",
    },
    {
      name: "田中 誠司",
      nameEn: "Seiji Tanaka",
      title: "アソシエイト弁護士",
      bar: "東京弁護士会",
      year: "2012年登録",
      specialty: "刑事弁護・民事訴訟",
      education: "早稲田大学法学部卒 / 早稲田大学法科大学院修了",
      awards: ["司法試験優秀賞"],
      bio: "刑事弁護と民事訴訟を専門とし、複雑な案件においても粘り強い弁護活動で依頼者の権利を守る。",
    },
  ];

  return (
    <section id="attorneys" className="py-24 lg:py-32 bg-[#fdf9f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="section-number mb-4">03 — OUR ATTORNEYS</div>
          <GoldDivider className="mb-6" />
          <h2 className="font-serif-jp text-[#0f1f3d] font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
            弁護士紹介
          </h2>
        </FadeIn>

        {/* Attorneys */}
        <div className="space-y-12">
          {attorneys.map((attorney, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`grid lg:grid-cols-5 gap-8 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Photo placeholder */}
                <div className={`lg:col-span-2 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="relative bg-[#0f1f3d] aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full bg-[#b8965a]/20 flex items-center justify-center mx-auto mb-4">
                          <Users size={40} className="text-[#b8965a]" />
                        </div>
                        <div className="font-serif-jp text-white font-semibold text-lg">{attorney.name}</div>
                        <div className="font-display text-[#b8965a] text-sm italic mt-1">{attorney.nameEn}</div>
                      </div>
                    </div>
                    {/* Number overlay */}
                    <div className="absolute top-4 left-4 font-display text-white/10 font-bold" style={{ fontSize: "6rem", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className={`lg:col-span-3 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-sans-jp text-[#b8965a] text-xs tracking-wider bg-[#b8965a]/10 px-3 py-1">
                      {attorney.title}
                    </span>
                  </div>
                  <h3 className="font-serif-jp text-[#0f1f3d] font-bold text-2xl mb-1">{attorney.name}</h3>
                  <p className="font-display text-gray-400 italic text-base mb-4">{attorney.nameEn}</p>
                  <GoldDivider className="mb-5" />
                  <p className="font-sans-jp text-gray-600 text-sm leading-relaxed mb-6">{attorney.bio}</p>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">所属・登録</div>
                      <div className="font-sans-jp text-gray-700">{attorney.bar}</div>
                      <div className="font-sans-jp text-gray-500 text-xs">{attorney.year}</div>
                    </div>
                    <div>
                      <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">専門分野</div>
                      <div className="font-sans-jp text-gray-700 text-xs">{attorney.specialty}</div>
                    </div>
                    <div>
                      <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">学歴</div>
                      <div className="font-sans-jp text-gray-600 text-xs">{attorney.education}</div>
                    </div>
                    <div>
                      <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">受賞歴</div>
                      {attorney.awards.map((award, j) => (
                        <div key={j} className="font-sans-jp text-gray-600 text-xs flex items-center gap-1">
                          <Star size={10} className="text-[#b8965a]" />
                          {award}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {i < attorneys.length - 1 && <div className="h-px bg-gray-200 mt-12" />}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Results Section ──────────────────────────────────────────────────────────
function ResultsSection() {
  const results = [
    {
      category: "企業法務",
      title: "大手製造業のM&A案件",
      amount: "約50億円規模",
      desc: "複数の子会社を含む大型M&Aにおいて、デューデリジェンスから契約交渉、クロージングまで一貫してサポート。スムーズな事業統合を実現。",
      outcome: "成約",
    },
    {
      category: "労働問題",
      title: "不当解雇による損害賠償請求",
      amount: "解決金 1,200万円",
      desc: "突然の解雇通告を受けた依頼者の代理人として交渉。会社側の違法性を立証し、依頼者の希望する条件での和解を実現した。",
      outcome: "和解成立",
    },
    {
      category: "相続",
      title: "遺産分割調停・審判",
      amount: "遺産総額 3億円超",
      desc: "複数の相続人間で争われた遺産分割問題。綿密な財産調査と交渉により、依頼者に有利な形での調停成立を実現。",
      outcome: "調停成立",
    },
    {
      category: "刑事弁護",
      title: "詐欺被疑事件の弁護",
      amount: "—",
      desc: "複雑な事実関係が絡む詐欺被疑事件において、証拠の精査と被害者との示談交渉を通じ、起訴猶予処分を獲得した。",
      outcome: "不起訴",
    },
  ];

  return (
    <section id="results" className="py-24 lg:py-32 bg-[#0f1f3d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="section-number mb-4 text-[#b8965a]/70">04 — CASE RESULTS</div>
          <GoldDivider className="mb-6" />
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-serif-jp text-white font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              解決実績
            </h2>
            <p className="font-sans-jp text-white/50 text-sm max-w-sm leading-relaxed">
              ※掲載事例はすべて依頼者の同意を得た上で、個人情報を加工・匿名化したものです。
            </p>
          </div>
        </FadeIn>

        {/* Cases */}
        <div className="grid md:grid-cols-2 gap-6">
          {results.map((result, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border border-white/10 hover:border-[#b8965a]/50 p-8 transition-all duration-500 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-sans-jp text-[#b8965a] text-xs tracking-wider bg-[#b8965a]/10 px-3 py-1">
                    {result.category}
                  </span>
                  <span className="font-sans-jp text-green-400 text-xs tracking-wider border border-green-400/30 px-3 py-1">
                    {result.outcome}
                  </span>
                </div>
                <h3 className="font-serif-jp text-white font-semibold text-lg mb-2">{result.title}</h3>
                {result.amount !== "—" && (
                  <div className="font-display text-[#b8965a] text-xl italic mb-4">{result.amount}</div>
                )}
                <p className="font-sans-jp text-white/60 text-sm leading-relaxed">{result.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      text: "離婚問題で途方に暮れていた時に相談しました。鈴木先生は私の話を丁寧に聞いてくださり、複雑な財産分与の問題も納得のいく形で解決していただきました。",
      name: "T.M. 様",
      detail: "40代 / 離婚・財産分与",
    },
    {
      text: "会社設立から契約書の整備まで、山田先生には創業期から一貫してサポートいただいています。法律の専門家がいてくれる安心感は何物にも代えがたいです。",
      name: "K.S. 様",
      detail: "50代 / 企業法務",
    },
    {
      text: "突然の逮捕で家族が混乱する中、田中先生が迅速に対応してくださいました。不起訴という結果に、家族全員で先生に感謝しています。",
      name: "A.N. 様",
      detail: "30代 / 刑事弁護",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn className="mb-16">
          <div className="section-number mb-4">05 — TESTIMONIALS</div>
          <GoldDivider className="mb-6" />
          <h2 className="font-serif-jp text-[#0f1f3d] font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
            依頼者の声
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="relative p-8 border-l-2 border-[#b8965a] bg-[#fdf9f3] h-full">
                <div className="font-display text-[#b8965a]/30 text-8xl absolute top-4 left-6 leading-none">"</div>
                <p className="font-sans-jp text-gray-600 text-sm leading-relaxed mb-6 relative z-10 pt-4">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0f1f3d] flex items-center justify-center">
                    <Users size={14} className="text-[#b8965a]" />
                  </div>
                  <div>
                    <div className="font-serif-jp text-[#0f1f3d] font-semibold text-sm">{t.name}</div>
                    <div className="font-sans-jp text-gray-400 text-xs">{t.detail}</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="text-[#b8965a] fill-[#b8965a]" />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "初回相談は本当に無料ですか？",
      a: "はい、初回のご相談は60分まで無料で承っております。お気軽にご連絡ください。なお、2回目以降のご相談は1時間あたり22,000円（税込）となります。",
    },
    {
      q: "相談から依頼までの流れを教えてください。",
      a: "①お電話またはメールでご予約 → ②初回無料相談（対面またはオンライン） → ③費用・方針のご説明 → ④委任契約の締結 → ⑤案件対応開始、という流れになります。",
    },
    {
      q: "弁護士費用はどのくらいかかりますか？",
      a: "案件の種類や複雑さによって異なります。着手金・報酬金制の場合、着手金は10〜50万円程度、報酬金は経済的利益の10〜15%程度が目安です。初回相談時に詳しくご説明いたします。",
    },
    {
      q: "オンライン相談は可能ですか？",
      a: "はい、ZoomやGoogle Meetを使ったオンライン相談に対応しております。全国どこからでもご相談いただけます。",
    },
    {
      q: "夜間・休日の相談は可能ですか？",
      a: "緊急案件（逮捕・勾留など）については24時間対応しております。通常の相談については、事前にご予約いただければ平日夜間（20時まで）および土曜日（要予約）にも対応可能です。",
    },
    {
      q: "相談内容は秘密にしてもらえますか？",
      a: "弁護士には法律上の守秘義務があります。ご相談内容が外部に漏れることは一切ありません。安心してご相談ください。",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-[#fdf9f3]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="section-number mb-4">06 — FAQ</div>
            <GoldDivider className="mb-6" />
            <h2 className="font-serif-jp text-[#0f1f3d] font-bold mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              よくある
              <br />
              ご質問
            </h2>
            <p className="font-sans-jp text-gray-500 text-sm leading-relaxed mb-8">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/u9w7rMzT8qClq2MkE6E7fa/sandbox/GzEoug7TQoNmLu6TMtjH5L-img-4_1771543770000_na1fn_c2NhbGVzLWp1c3RpY2U.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdTl3N3JNelQ4cUNscTJNa0U2RTdmYS9zYW5kYm94L0d6RW91ZzdUUW9ObUx1NlRNdGpINUwtaW1nLTRfMTc3MTU0Mzc3MDAwMF9uYTFmbl9jMk5oYkdWekxXcDFjM1JwWTJVLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Dn4LdgRX7ROoS45EZRUUmay-YaouZZx6oK~jHKIgz5GQPfPCwWrgDwxIyo-ojmH3TfD7cCJUhDfBapliy05NlXQ7fHeV1qmV2ms~oh9oMxqkTFnjQanLyFQqBs9P2s~h7W03BYZa9S1jG0vh7WXXXvK6oWyNaM8-N-oM-~bTDvqaK5GPVCHlLrITjoHyRYCDZVPTPoWiGgIlQJV3gRzeEhiNO~RAPHvKFnK9UfmWz~gMhx7D~7UsrywEJWYpaVzFDaTvyIZRGTnQtGsqj~HalpGxXveH~Y3S73AQ-9tx5Xym3kphDJwIFZVPMR45OyMVJpDrEBKz6etN~QmB9IuzFg__"
              alt="正義の天秤"
              className="w-full max-w-xs object-cover opacity-80"
            />
          </FadeIn>

          {/* Right - FAQ List */}
          <FadeIn direction="right" className="lg:col-span-3">
            <div className="space-y-0 divide-y divide-gray-200">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 text-left group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-display text-[#b8965a] font-semibold text-lg mt-0.5 flex-shrink-0">Q.</span>
                      <span className="font-serif-jp text-[#0f1f3d] font-medium text-sm leading-relaxed group-hover:text-[#b8965a] transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <div className="w-5 h-5 border border-[#b8965a] flex items-center justify-center">
                        <span className="text-[#b8965a] text-xs font-light">+</span>
                      </div>
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pl-8 pr-8">
                      <div className="flex items-start gap-3">
                        <span className="font-display text-gray-400 font-semibold text-lg mt-0.5 flex-shrink-0">A.</span>
                        <p className="font-sans-jp text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせを受け付けました。担当者より2営業日以内にご連絡いたします。");
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left Info */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="section-number mb-4">07 — CONTACT</div>
            <GoldDivider className="mb-6" />
            <h2 className="font-serif-jp text-[#0f1f3d] font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
              無料相談の
              <br />
              お申し込み
            </h2>
            <p className="font-sans-jp text-gray-500 text-sm leading-relaxed mb-10">
              初回60分の相談は無料です。お気軽にご連絡ください。
              秘密は厳守いたします。
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#b8965a]" />
                </div>
                <div>
                  <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">電話番号</div>
                  <div className="font-display text-[#0f1f3d] text-xl font-semibold">03-1234-5678</div>
                  <div className="font-sans-jp text-gray-400 text-xs mt-1">平日 9:00〜18:00 / 緊急は24時間対応</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#b8965a]" />
                </div>
                <div>
                  <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">メールアドレス</div>
                  <div className="font-sans-jp text-[#0f1f3d] text-sm">info@yamada-suzuki-law.jp</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0f1f3d] flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#b8965a]" />
                </div>
                <div>
                  <div className="font-sans-jp text-[#b8965a] text-xs tracking-wider mb-1">所在地</div>
                  <div className="font-sans-jp text-[#0f1f3d] text-sm">〒100-0001</div>
                  <div className="font-sans-jp text-gray-600 text-sm">東京都千代田区千代田1-1-1</div>
                  <div className="font-sans-jp text-gray-500 text-xs mt-1">大手町ビル 15F</div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Form */}
          <FadeIn direction="right" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-sans-jp text-[#0f1f3d] text-xs tracking-wider block mb-2">
                    お名前 <span className="text-[#b8965a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="山田 太郎"
                    className="w-full border border-gray-200 focus:border-[#b8965a] outline-none px-4 py-3 font-sans-jp text-sm text-gray-700 placeholder-gray-300 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-sans-jp text-[#0f1f3d] text-xs tracking-wider block mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="03-0000-0000"
                    className="w-full border border-gray-200 focus:border-[#b8965a] outline-none px-4 py-3 font-sans-jp text-sm text-gray-700 placeholder-gray-300 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="font-sans-jp text-[#0f1f3d] text-xs tracking-wider block mb-2">
                  メールアドレス <span className="text-[#b8965a]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full border border-gray-200 focus:border-[#b8965a] outline-none px-4 py-3 font-sans-jp text-sm text-gray-700 placeholder-gray-300 transition-colors"
                />
              </div>
              <div>
                <label className="font-sans-jp text-[#0f1f3d] text-xs tracking-wider block mb-2">
                  ご相談内容の種別
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-200 focus:border-[#b8965a] outline-none px-4 py-3 font-sans-jp text-sm text-gray-700 transition-colors bg-white"
                >
                  <option value="">選択してください</option>
                  <option value="corporate">企業法務</option>
                  <option value="civil">民事訴訟・紛争解決</option>
                  <option value="criminal">刑事弁護</option>
                  <option value="real-estate">不動産・相続</option>
                  <option value="labor">労働問題</option>
                  <option value="ip">知的財産</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className="font-sans-jp text-[#0f1f3d] text-xs tracking-wider block mb-2">
                  ご相談内容 <span className="text-[#b8965a]">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="ご相談内容をご記入ください。詳しい内容は面談時にお伺いします。"
                  className="w-full border border-gray-200 focus:border-[#b8965a] outline-none px-4 py-3 font-sans-jp text-sm text-gray-700 placeholder-gray-300 transition-colors resize-none"
                />
              </div>
              <p className="font-sans-jp text-gray-400 text-xs leading-relaxed">
                ご入力いただいた個人情報は、ご相談への対応のみに使用し、第三者への提供は一切行いません。
              </p>
              <button
                type="submit"
                className="w-full bg-[#0f1f3d] hover:bg-[#1a3060] text-white font-sans-jp text-sm py-4 tracking-wider transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                無料相談を申し込む
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Access Section ───────────────────────────────────────────────────────────
function AccessSection() {
  return (
    <section id="access" className="py-24 lg:py-32 bg-[#0f1f3d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FadeIn className="mb-12">
          <div className="section-number mb-4 text-[#b8965a]/70">08 — ACCESS</div>
          <GoldDivider className="mb-6" />
          <h2 className="font-serif-jp text-white font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
            アクセス
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map placeholder */}
          <FadeIn direction="left">
            <div className="bg-[#1a3060] aspect-video flex items-center justify-center border border-white/10">
              <div className="text-center">
                <MapPin size={40} className="text-[#b8965a] mx-auto mb-3" />
                <p className="font-sans-jp text-white/60 text-sm">東京都千代田区千代田1-1-1</p>
                <p className="font-sans-jp text-white/40 text-xs mt-1">大手町ビル 15F</p>
              </div>
            </div>
          </FadeIn>

          {/* Access Info */}
          <FadeIn direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="font-serif-jp text-[#b8965a] font-semibold mb-4">所在地</h3>
                <p className="font-sans-jp text-white/80 text-sm">〒100-0001</p>
                <p className="font-sans-jp text-white/80 text-sm">東京都千代田区千代田1-1-1</p>
                <p className="font-sans-jp text-white/80 text-sm">大手町ビル 15F</p>
              </div>
              <div>
                <h3 className="font-serif-jp text-[#b8965a] font-semibold mb-4">交通アクセス</h3>
                <div className="space-y-2">
                  {[
                    "東京メトロ丸ノ内線「大手町駅」A1出口より徒歩2分",
                    "東京メトロ千代田線「大手町駅」C3出口より徒歩3分",
                    "JR「東京駅」丸の内北口より徒歩8分",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#b8965a] mt-2 flex-shrink-0" />
                      <p className="font-sans-jp text-white/60 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-serif-jp text-[#b8965a] font-semibold mb-4">営業時間</h3>
                <div className="space-y-1">
                  {[
                    ["平日", "9:00〜18:00"],
                    ["土曜日", "10:00〜16:00（要予約）"],
                    ["日曜・祝日", "休業（緊急案件は24時間対応）"],
                  ].map(([day, time], i) => (
                    <div key={i} className="flex gap-4">
                      <span className="font-sans-jp text-white/40 text-sm w-20 flex-shrink-0">{day}</span>
                      <span className="font-sans-jp text-white/70 text-sm">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#080f1e] text-white/60 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-display text-[#b8965a] text-lg font-semibold tracking-wider mb-1">
              YAMADA & SUZUKI
            </div>
            <div className="font-serif-jp text-white/80 text-xs tracking-[0.3em] mb-4">
              山田・鈴木法律事務所
            </div>
            <p className="font-sans-jp text-white/40 text-xs leading-relaxed max-w-xs">
              1998年創業。東京都千代田区を拠点に、企業法務から個人の法律問題まで幅広く対応する総合法律事務所です。
            </p>
          </div>
          {/* Links */}
          <div>
            <div className="font-sans-jp text-white/70 text-xs tracking-wider mb-4">業務内容</div>
            <ul className="space-y-2">
              {["企業法務", "民事訴訟", "刑事弁護", "不動産・相続", "労働問題", "知的財産"].map((item) => (
                <li key={item}>
                  <a href="#services" className="font-sans-jp text-white/40 hover:text-[#b8965a] text-xs transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-sans-jp text-white/70 text-xs tracking-wider mb-4">事務所情報</div>
            <ul className="space-y-2">
              {[
                ["事務所について", "#about"],
                ["弁護士紹介", "#attorneys"],
                ["解決実績", "#results"],
                ["よくある質問", "#faq"],
                ["アクセス", "#access"],
                ["無料相談", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="font-sans-jp text-white/40 hover:text-[#b8965a] text-xs transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px bg-white/5 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans-jp text-white/30 text-xs">
            © 2024 山田・鈴木法律事務所. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["プライバシーポリシー", "利用規約", "弁護士費用"].map((item) => (
              <a key={item} href="#" className="font-sans-jp text-white/30 hover:text-[#b8965a] text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <AttorneysSection />
      <ResultsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <AccessSection />
      <Footer />
    </div>
  );
}
