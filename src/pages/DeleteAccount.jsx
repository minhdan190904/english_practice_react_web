import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Loader2, ArrowLeft, Trash2, ShieldAlert, User as UserIcon, Mail, Calendar, Hash } from 'lucide-react';
import { signInWithGoogle, firebaseSignOut } from '../services/firebase';
import api from '../services/api';
import './DeleteAccount.css';

function DeleteAccount() {
  const [step, setStep] = useState(1); // 1=intro, 2=verifying, 3=confirmed user, 4=deleting, 5=done
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [idToken, setIdToken] = useState('');

  // Step 1 → 2: User clicks "Sign in with Google"
  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const googleResult = await signInWithGoogle();
      setIdToken(googleResult.idToken);

      // Verify with backend — check if account exists and is Google-linked
      const res = await api.post('/public/delete-account/verify', {
        idToken: googleResult.idToken,
      });

      setUserInfo(res.data);
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Failed to sign in. Please try again.';
      setError(msg);
      await firebaseSignOut();
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3 → 5: User confirms deletion
  const handleConfirmDelete = async () => {
    setError('');
    setStep(4);
    try {
      await api.post('/public/delete-account/confirm', { idToken });
      await firebaseSignOut();
      setStep(5);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete account. Please try again.');
      setStep(3);
    }
  };

  const handleBack = async () => {
    await firebaseSignOut();
    setStep(1);
    setError('');
    setUserInfo(null);
    setIdToken('');
  };

  return (
    <div className="delete-page">
      <div className="delete-wrapper">
        <AnimatePresence mode="wait">

          {/* ─── Step 1: Introduction ─── */}
          {step === 1 && (
            <motion.div key="intro" className="delete-card glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-icon danger-bg">
                <ShieldAlert size={36} />
              </div>
              <h1>Delete Your Account</h1>
              <p className="card-desc">
                Request permanent deletion of your VG English account and all associated data.
              </p>

              <div className="notice-box">
                <h4>⚠️ Important Notice</h4>
                <ul>
                  <li>Only accounts <strong>linked with Google</strong> can be deleted through this page.</li>
                  <li>You must <strong>sign in with the same Google account</strong> used in the VG English app.</li>
                  <li>Anonymous / device-only accounts cannot be deleted here.</li>
                  <li>This action is <strong>permanent and irreversible</strong>.</li>
                </ul>
              </div>

              <div className="data-list">
                <h4>Data that will be permanently deleted:</h4>
                <div className="data-grid">
                  <span>📧 Account & profile info</span>
                  <span>📚 All grammar lesson progress</span>
                  <span>🧠 AI-generated lessons & images</span>
                  <span>📝 Quiz scores & achievements</span>
                  <span>📇 Saved vocabulary & flashcards</span>
                  <span>🔥 Streaks & daily goals</span>
                </div>
              </div>

              {error && <p className="error-msg">{error}</p>}

              <button className="btn-google" onClick={handleGoogleLogin} disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 size={20} className="spin" /> Signing in...</>
                ) : (
                  <>
                    <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google to continue
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* ─── Step 3: Confirm user ─── */}
          {step === 3 && userInfo && (
            <motion.div key="confirm" className="delete-card glass-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="card-icon danger-bg">
                <Trash2 size={36} />
              </div>
              <h1>Confirm Account Deletion</h1>
              <p className="card-desc">We found your account. Please review your information below before proceeding.</p>

              <div className="user-card glass-panel">
                {userInfo.avatarUrl && (
                  <img src={userInfo.avatarUrl} alt="Avatar" className="user-avatar" />
                )}
                <div className="user-details">
                  <div className="detail-row">
                    <Hash size={16} />
                    <span className="label">User ID</span>
                    <span className="value mono">{userInfo.userId}</span>
                  </div>
                  <div className="detail-row">
                    <Mail size={16} />
                    <span className="label">Email</span>
                    <span className="value">{userInfo.email}</span>
                  </div>
                  {userInfo.displayName && (
                    <div className="detail-row">
                      <UserIcon size={16} />
                      <span className="label">Name</span>
                      <span className="value">{userInfo.displayName}</span>
                    </div>
                  )}
                  {userInfo.createdAt && (
                    <div className="detail-row">
                      <Calendar size={16} />
                      <span className="label">Joined</span>
                      <span className="value">{new Date(userInfo.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="warning-box">
                <AlertTriangle size={18} />
                <p>All your data will be <strong>permanently deleted</strong>. This action cannot be undone. You will not be able to recover your progress, lessons, or vocabulary.</p>
              </div>

              {error && <p className="error-msg">{error}</p>}

              <div className="btn-group">
                <button className="btn-back" onClick={handleBack}>
                  <ArrowLeft size={18} /> Go Back
                </button>
                <button className="btn-delete" onClick={handleConfirmDelete}>
                  <Trash2 size={18} /> Delete My Account
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Step 4: Deleting ─── */}
          {step === 4 && (
            <motion.div key="deleting" className="delete-card glass-panel center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Loader2 size={48} className="spin" color="var(--danger-color)" />
              <h2>Deleting your account...</h2>
              <p className="card-desc">Please wait while we remove all your data.</p>
            </motion.div>
          )}

          {/* ─── Step 5: Done ─── */}
          {step === 5 && (
            <motion.div key="done" className="delete-card glass-panel center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="card-icon success-bg">
                <CheckCircle size={40} />
              </div>
              <h1>Account Deleted</h1>
              <p className="card-desc">
                Your VG English account and all associated data have been permanently deleted. You can no longer sign in with this Google account.
              </p>
              <p className="card-desc secondary">
                If you ever want to use VG English again, you can download the app and create a new account.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

export default DeleteAccount;
