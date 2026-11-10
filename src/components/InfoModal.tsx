import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BIOGRAPHY_DATA } from '../data/portfolioData';
import { X, Mail, MapPin, Phone, Check } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BIOGRAPHY_DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#fcfcfc] dark:bg-[#111113] border border-black/10 dark:border-white/10 rounded-xs shadow-2xl p-6 sm:p-10 text-neutral-900 dark:text-neutral-100 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer rounded-xs"
          aria-label="Cerrar biografía"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-black/[0.08] dark:border-white/[0.08] pb-6 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Biografía & Archivo Fotográfico
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            {BIOGRAPHY_DATA.name}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
            {BIOGRAPHY_DATA.birth} · {BIOGRAPHY_DATA.profession}
          </p>
        </div>

        {/* Main Content: Split Portrait & Biography Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Portrait & Poetic Quote */}
          <div className="md:col-span-5 flex flex-col">
            <div className="relative aspect-[2/3] w-full max-w-xs mx-auto md:max-w-none overflow-hidden rounded-xs border border-black/10 dark:border-white/10 shadow-sm bg-neutral-100 dark:bg-neutral-900">
              <img
                src="/assets/images/jorge-fdez.jpg"
                alt="Jorge Fernández Bolado — Autorretrato con cámara"
                className="w-full h-full object-cover grayscale contrast-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="block mt-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 text-center md:text-left">
              Jorge Fernández Bolado · Autorretrato con cámara
            </span>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="md:col-span-7 space-y-4 text-sm sm:text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p>
              <strong>Jorge Fernández Bolado</strong> (Santander, 1950) comenzó a realizar fotografías a los 18 años. En 1971 se traslada a Barcelona, donde se matricula en la escuela <strong>E.M.A.V.</strong> (Escuela de Medios Audiovisuales), primera escuela de Formación Profesional en Imagen y Sonido de España, donde estudia fotografía, cine, televisión, diseño y artes gráficas, y realiza prácticas en 16 mm.
            </p>
            <p>
              Reside en Barcelona hasta 1979, año en que realiza su primer gran encargo profesional: las fotografías y ampliaciones en papel de las obras del arquitecto <strong>Fernando Obregón Ansorena</strong> para la exposición monográfica organizada por el Colegio Oficial de Arquitectos.
            </p>
            <p>
              En 1981, de vuelta en Santander, funda como fotógrafo profesional su emblemático <strong>estudio y escuela de fotografía Nadar</strong>, donde formó a nuevas generaciones de fotógrafos hasta 1986. Paralelamente, inicia una prolongada labor documentando obras de arte para los catálogos de los principales creadores e instituciones. Colaboró junto con Bernardo Riego y Pablo Hojas en la página de Fotografía del diario <em>Alerta</em>, impulsando la histórica muestra colectiva <em>Agosto fotográfico-84</em> en las salas María Blanchard y el Palacete del Embarcadero.
            </p>
            <p>
              Desde 1986 su actividad se traslada al estudio de la <strong>calle Frontón, 1 de Santander</strong>, desde donde continúa desarrollando libros, catálogos, colaboraciones editoriales y series personales de autor.
            </p>
            {/* Poetic quote */}
            {/* <blockquote className="mt-5 p-4 bg-neutral-100/70 dark:bg-neutral-900/60 rounded-xs border-l-2 border-neutral-900 dark:border-white">
              <p className="text-xs sm:text-sm italic text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed">
                {BIOGRAPHY_DATA.quote}
              </p>
              <cite className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 not-italic">
                — Jorge Fernández Bolado
              </cite>
            </blockquote> */}
          </div>
        </div>

        {/* Two Columns: Exposiciones y Clientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 pt-8 border-t border-black/[0.08] dark:border-white/[0.08]">
          {/* Exposiciones Individuales y Colectivas */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
              Exposiciones Seleccionadas
            </h3>
            <ul className="space-y-3">
              {BIOGRAPHY_DATA.exhibitions.map((ex, i) => (
                <li key={i} className="text-xs sm:text-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-neutral-400 shrink-0">{ex.year}</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {ex.title}
                    </span>
                  </div>
                  <span className="block text-neutral-500 dark:text-neutral-400 text-xs pl-12">
                    {ex.venue}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colaboraciones Institucionales */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
              Colaboraciones & Fondos Institucionales
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {BIOGRAPHY_DATA.clientsAndInstitutions.map((client, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-neutral-400 font-mono mt-0.5">·</span>
                  <span>{client}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Studio Section */}
        <div className="mt-8 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-900/40 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 sm:p-10 rounded-b-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Contacto Profesional
              </span>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                {BIOGRAPHY_DATA.studio}
              </h4>

              <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{BIOGRAPHY_DATA.contact.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{BIOGRAPHY_DATA.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <button
                    onClick={handleCopyEmail}
                    className="hover:underline flex items-center gap-1.5 cursor-pointer font-mono"
                    title="Copiar correo"
                  >
                    <span>{BIOGRAPHY_DATA.contact.email}</span>
                    {copiedEmail ? (
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copiado
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-400">(copiar)</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            {/* <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                Consulta de Obras, Archivo o Catálogos
              </h5>

              {formSubmitted ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xs text-xs text-emerald-800 dark:text-emerald-200">
                  Mensaje registrado correctamente. El estudio se pondrá en contacto a la mayor brevedad.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre o institución"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico de contacto"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Motivo de consulta (adquisición de copia, cesión para exposición, consulta de archivo...)"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-950 dark:focus:ring-white resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold uppercase tracking-wider rounded-xs hover:opacity-90 transition-opacity cursor-pointer text-xs"
                  >
                    Enviar Mensaje al Estudio
                  </button>
                </form>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
