import { motion } from 'framer-motion';
import { Smartphone, BookOpen, Star, Brain, Zap, BarChart3, ArrowRight, Shield, Globe } from 'lucide-react';
import './Home.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const features = [
  { icon: BookOpen, color: '#6366f1', title: 'Smart Grammar', desc: 'Master English grammar with interactive lessons, from tenses to conditionals. Each topic includes detailed explanations in both English and Vietnamese.' },
  { icon: Brain, color: '#a855f7', title: 'AI Tutor', desc: 'Get personalized AI-generated lessons based on your interests. Our AI creates unique passages, vocabulary lists, and practice exercises just for you.' },
  { icon: Zap, color: '#ec4899', title: 'Spaced Repetition', desc: 'Never forget a word with our intelligent flashcard system. Review words at scientifically optimal intervals for maximum retention.' },
  { icon: BarChart3, color: '#10b981', title: 'Progress Tracking', desc: 'Track your daily streaks, completed lessons, and vocabulary growth. Set daily goals and earn achievements as you improve.' },
  { icon: Shield, color: '#f59e0b', title: 'Grammar Quizzes', desc: 'Test your knowledge with fill-in-the-blank, multiple choice, sentence correction, and word ordering exercises for every grammar topic.' },
  { icon: Globe, color: '#06b6d4', title: 'Bilingual Support', desc: 'All grammar lessons available in both English and Vietnamese. Switch languages anytime to better understand complex grammar rules.' },
];

function Home() {
  return (
    <div className="home-container">
      {/* Hero */}
      <motion.section className="hero-section" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="badge glass-panel">
          <Star size={16} color="#ec4899" />
          <span>Free English Learning App</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-title">
          Learn English<br />
          <span className="gradient-text">Smarter, Not Harder</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-subtitle">
          VG English combines AI-powered lessons, smart grammar exercises, and spaced repetition flashcards to help you achieve fluency faster than ever.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-cta">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="btn-primary cta-btn">
            <Smartphone size={20} />
            Download on Google Play
          </a>
          <a href="#features" className="btn-outline cta-btn glass-panel">
            Explore Features
            <ArrowRight size={20} />
          </a>
        </motion.div>

        {/* Floating orbs for visual effect */}
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
      </motion.section>

      {/* Features */}
      <section id="features" className="features-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <h2>Everything You Need to <span className="gradient-text">Master English</span></h2>
          <p>From grammar fundamentals to AI-powered conversations — all in one app.</p>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" style={{ background: `${f.color}22` }}>
                <f.icon size={24} color={f.color} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="cta-section glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Ready to Start Your English Journey?</h2>
        <p>Join thousands of learners improving their English every day with VG English.</p>
        <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="btn-primary cta-btn">
          <Smartphone size={20} />
          Get VG English — It&apos;s Free
        </a>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} VG English. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
