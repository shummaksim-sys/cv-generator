/*
 * CraftCV — Landing Page
 * Design: Obsidian Glass — dark luxury glassmorphism
 * Fonts: Sora (headings), DM Sans (body)
 * Colors: Deep obsidian bg, indigo/cyan accents, frosted glass panels
 */
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  FileText, Sparkles, Download, Eye, Palette, Shield,
  ArrowRight, Check, Moon, Sun, Star, Zap, Layout,
  ChevronRight, Globe, Lock, RefreshCw
} from "lucide-react";
import { TEMPLATES } from "@/lib/types";

const HERO_BG = "https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/hero-bg-hmFa6ZCNM66Yn2wwcenDdo.webp?Expires=1807956696&Signature=aOszXsljOrpbRDbo5LGV1y2d2REgvhIpVOiSPYKiHy0Z-hobGkSNu4SaKgGwge~4YHval77P8tV7fgNEE-vxCHBEwbylxLBFPqRbqCqcZt95eMNRFh6pGJ-xYCwosCO1BhclceKFo5fWf6If~5AyP7EfmC9H~I1h4HCj6B~Rtm2WQsFsTjV~9TruxDCCLfMBrV10kWh~LMjpx3uFWpMgX9PnKxw7tIInGCynm~kkR5Yj6wv3XfzmUBxfI3puw1TailTKQUx6Hon3gxeIiNPda-Y5a~t-O1aymp2i5FJsgdISB12T5EKpR4mSz2Z4bOKytBhFAD8bEdArMDuNHHA1GA__&Key-Pair-Id=K1MP89RTKNH4J";
const CV_MOCKUP = "https://d36hbw14aib5lz.cloudfront.net/310519663568042885/BERCQpxmCEZcK8jZsU586d/cv-preview-mockup-Gq8Uono2etnCesjzPaVqSy.webp?Expires=1807956697&Signature=Zx-YRi1j2vGndmkiGWEwCRVf7N84pexeYI~kJ-JAb-IiJBO8HI4~juvp2BmOg38kgmb0xOJo9VpVWqVKcmH0~1y1ugxAXQIpHCNpkX714FBF2wRSfqZ7dKDVmVw0qff19l92xNg4Zxfhc5LpmaO2GEG8Sygh2Qi60eI0Q-GkDAUeiPA0BjOhZdt9Sqqzo7wYuuxek4Sm1iP~f85tMESwgyJOliHp5872xfVb1pH52RfzrWrVU1prVudSjTAMUafrbiMlylat8MKBPecgcXNG0SPLOnxm-Bt3KO0SQhpRGNooSj6pmuQUCK1IqQ4MIXknFELKhzvjtexPaVUs6DTDtw__&Key-Pair-Id=K1MP89RTKNH4J";

const FEATURES = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Multi-Step Form",
    description: "Guided sections for personal info, experience, education, skills, projects, and more.",
    color: "from-indigo-500/20 to-indigo-600/5",
    accent: "text-indigo-400",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Live Preview",
    description: "See your CV update in real time as you type. No surprises when you download.",
    color: "from-cyan-500/20 to-cyan-600/5",
    accent: "text-cyan-400",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "5 Templates",
    description: "Choose from Classic, Modern, Creative, Executive, and Minimal designs.",
    color: "from-violet-500/20 to-violet-600/5",
    accent: "text-violet-400",
  },
  {
    icon: <Download className="w-5 h-5" />,
    title: "PDF Export",
    description: "Download a pixel-perfect PDF ready to send to any recruiter or ATS system.",
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "text-emerald-400",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Drag & Drop",
    description: "Reorder CV sections with intuitive drag-and-drop to match your priorities.",
    color: "from-amber-500/20 to-amber-600/5",
    accent: "text-amber-400",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Auto-Save",
    description: "Your progress is automatically saved locally. Never lose your work again.",
    color: "from-rose-500/20 to-rose-600/5",
    accent: "text-rose-400",
  },
];

const STATS = [
  { value: "50K+", label: "CVs Created" },
  { value: "5", label: "Templates" },
  { value: "Free", label: "Forever" },
  { value: "100%", label: "Private" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Fill in your details",
    description: "Use our guided multi-step form to enter your personal info, experience, education, and skills.",
  },
  {
    step: "02",
    title: "Choose a template",
    description: "Pick from 5 professionally designed templates and customize the accent color to your preference.",
  },
  {
    step: "03",
    title: "Preview & download",
    description: "Review your CV in real time and download a polished PDF ready for job applications.",
  },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">CraftCV</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button
              onClick={() => navigate('/editor')}
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-lg shadow-indigo-500/25"
            >
              Build my CV
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 mb-6"
              >
                <Sparkles className="w-3 h-3" />
                Free CV builder — no sign-up required
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
              >
                Build a CV that{" "}
                <span className="gradient-text">lands the job</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
              >
                CraftCV helps you create a polished, professional resume in minutes. Choose from 5 beautiful templates, fill in your details, and download a PDF — completely free.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 mb-10"
              >
                <Button
                  onClick={() => navigate('/editor')}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-xl shadow-indigo-500/30 text-base h-12 px-8 glow-indigo"
                >
                  Start building for free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => navigate('/editor?sample=true')}
                  variant="outline"
                  size="lg"
                  className="glass border-white/10 hover:bg-white/8 text-base h-12 px-6"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  See a sample CV
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-6 text-sm text-muted-foreground"
              >
                {["No sign-up needed", "Free PDF download", "100% private"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative animate-float">
                <div className="glass-card p-2 gradient-border">
                  <img
                    src={CV_MOCKUP}
                    alt="CV Preview Mockup"
                    className="w-full rounded-xl"
                  />
                </div>
                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-8 top-1/4 glass px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Auto-saving...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  className="absolute -right-4 bottom-1/3 glass px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2"
                >
                  <Download className="w-3 h-3 text-indigo-400" />
                  PDF ready
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-indigo-300 mb-4"
            >
              <Sparkles className="w-3 h-3" />
              Everything you need
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl font-bold mb-4"
            >
              Powerful features,{" "}
              <span className="gradient-text">zero complexity</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              CraftCV packs everything a job seeker needs into a clean, intuitive interface. No bloat, no confusion.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 glass-hover group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 ${feature.accent}`}>
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEMPLATES ===== */}
      <section id="templates" className="py-24 border-t border-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl font-bold mb-4"
            >
              Choose your{" "}
              <span className="gradient-text">perfect template</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Five professionally designed templates to match your industry and personal style.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
            {TEMPLATES.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => navigate('/editor')}
                className="template-card glass group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-t-xl">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="font-display font-semibold text-sm mb-0.5">{template.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{template.description}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-center pb-4">
                  <span className="text-xs font-medium text-white glass px-3 py-1.5 rounded-full">
                    Use this template
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 border-t border-white/5">
        <div className="container">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl font-bold mb-4"
            >
              Ready in{" "}
              <span className="gradient-text">3 simple steps</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl glass gradient-border flex items-center justify-center mx-auto mb-5">
                  <span className="font-display text-2xl font-bold gradient-text">{step.step}</span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => navigate('/editor')}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0 shadow-xl shadow-indigo-500/30 text-base h-12 px-10"
            >
              Build my CV now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <section className="py-16 border-t border-white/5">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Lock className="w-5 h-5" />, title: "100% Private", desc: "All data stays in your browser. Nothing is sent to our servers.", color: "text-emerald-400" },
              { icon: <Globe className="w-5 h-5" />, title: "Works Everywhere", desc: "Fully responsive — use on desktop, tablet, or mobile.", color: "text-cyan-400" },
              { icon: <RefreshCw className="w-5 h-5" />, title: "Always Free", desc: "No subscriptions, no paywalls. CraftCV is free forever.", color: "text-indigo-400" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex items-start gap-4"
              >
                <div className={`mt-0.5 ${item.color}`}>{item.icon}</div>
                <div>
                  <div className="font-display font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 border-t border-white/5">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-semibold text-foreground">CraftCV</span>
            <span className="text-xs">— Professional CV Generator</span>
          </div>
          <div className="text-xs">
            Built with care · Free forever · No data collected
          </div>
        </div>
      </footer>
    </div>
  );
}
