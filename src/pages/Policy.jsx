import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Policy.css';

function Policy() {
  return (
    <div className="policy-container">
      <motion.div
        className="policy-content glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="gradient-text">Privacy Policy</h1>
        <p className="last-updated">Last updated: May 28, 2026</p>

        <div className="policy-text">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>VG English</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). VG English is a mobile application designed to help users learn English through grammar lessons, AI-powered content, vocabulary flashcards, and interactive quizzes. We are committed to protecting your privacy and handling your personal data responsibly. This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Account Information</h3>
          <p>When you sign in with Google OAuth, we collect:</p>
          <ul>
            <li>Email address</li>
            <li>Display name</li>
            <li>Profile picture URL (avatar)</li>
            <li>Google Firebase UID (unique identifier)</li>
          </ul>
          <p>If you use the app without signing in, we generate an anonymous device-based identifier. No personal information is collected for anonymous users.</p>

          <h3>2.2 Learning Data</h3>
          <p>To provide a personalized learning experience, we collect and store:</p>
          <ul>
            <li>Grammar lesson completion progress and marks</li>
            <li>Quiz scores and completed topics</li>
            <li>Saved vocabulary words and flashcard review history</li>
            <li>AI-generated lesson content you create</li>
            <li>Daily streaks and learning time statistics</li>
            <li>Achievement unlocks</li>
          </ul>

          <h3>2.3 Technical Data</h3>
          <p>We automatically collect:</p>
          <ul>
            <li>Device identifier (for anonymous accounts)</li>
            <li>App version and platform information</li>
            <li>General usage analytics (via Amplitude)</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your data exclusively to:</p>
          <ul>
            <li><strong>Provide the service:</strong> Sync your progress across devices, generate personalized AI lessons, and track your learning journey.</li>
            <li><strong>Improve the app:</strong> Understand usage patterns to enhance features and fix bugs.</li>
            <li><strong>Manage your account:</strong> Authenticate users, handle account linking/unlinking with Google.</li>
            <li><strong>Send notifications:</strong> Remind you of daily goals and streak maintenance (only if enabled in settings).</li>
          </ul>
          <p>We <strong>do not</strong> sell, rent, or share your personal data with any third parties for marketing purposes.</p>

          <h2>4. Data Storage and Security</h2>
          <p>
            Your data is stored on secure servers. We use industry-standard security measures including HTTPS encryption for all API communications, JWT-based authentication, and API key verification. Learning progress is synced between your device and our servers to enable cross-device access.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>VG English integrates with the following third-party services:</p>
          <ul>
            <li><strong>Google Firebase:</strong> Authentication (Google Sign-In) and push notifications.</li>
            <li><strong>Google Vertex AI:</strong> Generating personalized AI lesson content.</li>
            <li><strong>Amplitude:</strong> Anonymous usage analytics to improve the app experience.</li>
            <li><strong>Cloudflare R2:</strong> Storing AI-generated lesson images.</li>
          </ul>
          <p>Each of these services has its own privacy policy, and we encourage you to review them.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> your personal data stored in our systems.</li>
            <li><strong>Correct</strong> inaccurate data by updating your Google account information.</li>
            <li><strong>Delete</strong> your account and all associated data. You can request this through our <Link to="/delete-account">Account Deletion page</Link> or within the app settings.</li>
            <li><strong>Unlink</strong> your Google account at any time from the app settings, reverting to anonymous mode.</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active. If you request account deletion, all personal data and learning progress will be permanently removed within 30 days. Anonymous usage analytics may be retained in aggregated, non-identifiable form.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            VG English is suitable for users of all ages. We do not knowingly collect personal information from children under 13 without parental consent. If you believe we have collected such data, please contact us for immediate deletion.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted within the app and on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of VG English after changes constitutes acceptance of the updated policy.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or your data, please contact us at: <a href="mailto:support@vgenglish.app">support@vgenglish.app</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Policy;
