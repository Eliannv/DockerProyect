import { useState } from 'react'

const camposIniciales = { cedula: '', nombre: '', apellido: '', email: '' };

function App() {
  const [form, setForm] = useState(camposIniciales);
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setRespuesta(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/usuarios/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'Error del servidor');
      setRespuesta(data);
      setForm(camposIniciales);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={estilos.pagina}>
      <div style={estilos.tarjeta}>
        <h1 style={estilos.titulo}>Crear Usuario</h1>

        <form onSubmit={handleSubmit} style={estilos.formulario}>
          {[
            { name: 'cedula',   label: 'Cédula',   type: 'text' },
            { name: 'nombre',   label: 'Nombre',   type: 'text' },
            { name: 'apellido', label: 'Apellido', type: 'text' },
            { name: 'email',    label: 'Email',    type: 'email' },
          ].map(({ name, label, type }) => (
            <div key={name} style={estilos.grupo}>
              <label htmlFor={name} style={estilos.label}>{label}</label>
              <input
                id={name}
                name={name}
                type={type}
                value={form[name]}
                onChange={handleChange}
                required
                style={estilos.input}
                placeholder={`Ingresa ${label.toLowerCase()}`}
              />
            </div>
          ))}

          <button type="submit" disabled={cargando} style={estilos.boton}>
            {cargando ? 'Creando...' : 'Crear usuario'}
          </button>
        </form>

        {respuesta && (
          <div style={estilos.exito}>
            ✓ {respuesta.mensaje} — ID: <strong>{respuesta.traceId || respuesta.id}</strong>
          </div>
        )}

        {error && (
          <div style={estilos.falla}>
            ✗ {error}
          </div>
        )}
      </div>
    </div>
  );
}

const estilos = {
  pagina: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    padding: '24px',
  },
  tarjeta: {
    width: '100%',
    maxWidth: '420px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '36px 32px',
    boxShadow: 'var(--shadow)',
  },
  titulo: {
    fontFamily: 'var(--heading)',
    color: 'var(--text-h)',
    fontSize: '1.5rem',
    marginBottom: '28px',
    textAlign: 'center',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-h)',
  },
  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1.5px solid var(--border)',
    background: 'var(--code-bg)',
    color: 'var(--text-h)',
    fontSize: '0.95rem',
    fontFamily: 'var(--sans)',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  boton: {
    marginTop: '8px',
    padding: '11px',
    borderRadius: '8px',
    border: 'none',
    background: 'var(--accent)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  exito: {
    marginTop: '20px',
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'rgba(34,197,94,0.1)',
    color: '#166534',
    border: '1px solid rgba(34,197,94,0.35)',
    fontSize: '0.9rem',
  },
  falla: {
    marginTop: '20px',
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'rgba(239,68,68,0.1)',
    color: '#991b1b',
    border: '1px solid rgba(239,68,68,0.35)',
    fontSize: '0.9rem',
  },
};

export default App;