import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, Scissors, AlertCircle } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('Iniciante');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          experience_level: level,
        }
      }
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      // Se não necessitar confirmação de e-mail ou se o auto-login estiver ativo:
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-image-side">
        <img src="/illustration.png" alt="Ateliê Digital - Costura" />
      </div>
      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <div className="logo-header">
            <h1>Ateliê Digital</h1>
            <p>Junte-se à nossa comunidade de costura</p>
          </div>
          
          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              <span>{error === 'User already registered' ? 'E-mail já está em uso.' : error}</span>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nome completo</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="text" 
                  id="name"
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maria Silva"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="email" 
                  id="email"
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="level">Nível de experiência</label>
              <div style={{ position: 'relative' }}>
                <Scissors size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <select 
                  id="level"
                  className="form-input"
                  style={{ paddingLeft: '2.5rem', appearance: 'none', backgroundColor: 'var(--white)' }}
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  required
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Senha (mínimo 6 caracteres)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="password" 
                  id="password"
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  required 
                  minLength={6}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirmar senha</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="password" 
                  id="confirmPassword"
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  required 
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <div className="auth-footer">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
