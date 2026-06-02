import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>;

  const metadata = user.user_metadata || {};

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--accent-color)', fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Olá, {metadata.full_name || 'Costureiro(a)'}!</h1>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Bem-vindo ao seu Dashboard do Ateliê Digital.</p>
      
      <div style={{ backgroundColor: 'var(--white)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Seu Perfil</h3>
        <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {user.email}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Nível de Experiência:</strong> {metadata.experience_level || 'Não informado'}</p>
      </div>

      <button onClick={handleLogout} className="btn-social" style={{ maxWidth: '200px' }}>
        Sair
      </button>
    </div>
  );
}
