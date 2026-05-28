import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, BookOpen, UserCheck, Lock, LogOut, Trash2, Loader2, RefreshCw } from 'lucide-react';
import api from '../services/api';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [adminUser, setAdminUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    if (token && user) {
      setIsAuthenticated(true);
      setAdminUser(JSON.parse(user));
    }
  }, []);

  // Load dashboard data
  const loadDashboard = useCallback(async () => {
    setLoadingData(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboard();
    }
  }, [isAuthenticated, loadDashboard]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const res = await api.post('/admin/login', { username, password });
      localStorage.setItem('admin_token', res.data.accessToken);
      localStorage.setItem('admin_user', JSON.stringify(res.data.user));
      setAdminUser(res.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
    setStats(null);
    setUsers([]);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setDeleteConfirm(null);
      if (stats) setStats({ ...stats, totalUsers: stats.totalUsers - 1 });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete user');
    }
  };

  // ─── Login Screen ───
  if (!isAuthenticated) {
    return (
      <div className="admin-container center-page">
        <motion.form
          className="login-card glass-panel"
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="login-icon">
            <Lock size={36} color="var(--primary-color)" />
          </div>
          <h2>Admin Login</h2>
          <p className="login-desc">Enter your admin credentials to access the dashboard.</p>

          <div className="form-group">
            <label>Username (User ID)</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Ab3xK9mQ"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && <p className="error-text">{loginError}</p>}

          <button type="submit" className="btn-primary full-width" disabled={loginLoading}>
            {loginLoading ? <><Loader2 size={18} className="spin" /> Signing in...</> : 'Sign In'}
          </button>
        </motion.form>
      </div>
    );
  }

  // ─── Dashboard ───
  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="gradient-text">Dashboard</h1>
          <p>Welcome, {adminUser?.displayName || adminUser?.email || adminUser?.id}</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon" onClick={loadDashboard} title="Refresh">
            <RefreshCw size={18} className={loadingData ? 'spin' : ''} />
          </button>
          <button className="btn-icon danger" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <motion.div className="stats-grid" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <StatCard icon={Users} color="#6366f1" label="Total Users" value={stats.totalUsers} />
          <StatCard icon={Activity} color="#10b981" label="Active Today" value={stats.activeUsersToday} />
          <StatCard icon={UserCheck} color="#a855f7" label="Linked (Google)" value={stats.linkedUsers} />
          <StatCard icon={BookOpen} color="#ec4899" label="Quizzes Done" value={stats.totalGrammarQuizCompleted} />
        </motion.div>
      )}

      {/* Users Table */}
      <motion.div className="users-section glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="section-title">
          <h2>All Users</h2>
          <span className="count-badge">{users.length}</span>
        </div>

        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Type</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="mono">{user.id}</td>
                  <td>{user.email || <span className="text-muted">—</span>}</td>
                  <td>{user.displayName || <span className="text-muted">Anonymous</span>}</td>
                  <td><span className={`role-badge ${user.role?.toLowerCase()}`}>{user.role}</span></td>
                  <td>{user.isAnonymous ? <span className="text-muted">Device</span> : <span className="text-linked">Google</span>}</td>
                  <td className="text-muted">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <AnimatePresence>
                      {deleteConfirm === user.id ? (
                        <motion.div className="confirm-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <button className="btn-sm danger" onClick={() => handleDeleteUser(user.id)}>Confirm</button>
                          <button className="btn-sm" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                        </motion.div>
                      ) : (
                        <button
                          className="btn-icon-sm danger"
                          onClick={() => setDeleteConfirm(user.id)}
                          disabled={user.role === 'ADMIN'}
                          title={user.role === 'ADMIN' ? 'Cannot delete admin' : 'Delete user'}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon: Icon, color, label, value }) {
  return (
    <motion.div className="stat-card glass-panel" whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <div className="stat-icon" style={{ background: `${color}22` }}>
        <Icon size={22} color={color} />
      </div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{typeof value === 'number' ? value.toLocaleString() : value}</span>
      </div>
    </motion.div>
  );
}

export default Admin;
