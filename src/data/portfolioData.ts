export interface PhotoItem {
  id: string;
  collectionId: string;
  collectionName: string;
  title: string;
  year: string;
  location: string;
  medium: string;
  src: string;
  description?: string;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  yearSpan: string;
  venueOrClient: string;
  curatorNote: string;
  coverImage: string;
  items: PhotoItem[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'arquitectura-patrimonio',
    name: 'Arquitectura & Patrimonio',
    tagline: 'Defensa del patrimonio, Paseo Pereda y el frente marítimo de Santander',
    yearSpan: '1979 — Actualidad',
    venueOrClient: 'Colegio de Arquitectos / Autoridad Portuaria de Santander',
    curatorNote: 'Desde su primer encargo profesional en 1979 con las obras de Fernando Obregón Ansorena, hasta la histórica serie sobre el Paseo Pereda y Castelar (1980) y el libro "Santander, el Puerto y su Historia" (1985–2017). Rigor compositivo, perspectiva y la sobria luz atlántica del Cantábrico.',
    coverImage: '/assets/images/arquitectura_pereda.jpg',
    items: [
      {
        id: 'arq-01',
        collectionId: 'arquitectura-patrimonio',
        collectionName: 'Arquitectura & Patrimonio',
        title: 'Paseo Pereda y Bahía de Santander',
        year: '1980',
        location: 'Santander, Cantabria',
        medium: 'Ampliación en papel baritado / Formato Medio',
        src: '/assets/images/arquitectura_pereda.jpg',
        description: 'Fotografía realizada para la exposición y catálogo "Paseo Pereda / Castelar, defensa de nuestro patrimonio" (1980), organizada con el Colegio Oficial de Arquitectos.'
      },
      {
        id: 'arq-02',
        collectionId: 'arquitectura-patrimonio',
        collectionName: 'Arquitectura & Patrimonio',
        title: 'Palacete del Embarcadero y Muelle',
        year: '1985',
        location: 'Dársena de Santander',
        medium: 'Gelatina de plata / 35mm',
        src: '/assets/images/arquitectura_palacete.jpg',
        description: 'Encargo histórico para la Autoridad Portuaria de Santander, documentando la memoria viva de la dársena santanderina.'
      },
      {
        id: 'arq-03',
        collectionId: 'arquitectura-patrimonio',
        collectionName: 'Arquitectura & Patrimonio',
        title: 'Fachada y Miradores de Santander',
        year: '1979',
        location: 'Santander',
        medium: 'Copia fotográfica sobre papel baritado',
        src: '/assets/images/arquitectura_edificio.jpg',
        description: 'Primer trabajo profesional de Jorge Fernández Bolado tras regresar de Barcelona en 1979 para el Colegio de Arquitectos.'
      }
    ]
  },
  {
    id: 'santander-jazz-83',
    name: "Santander Jazz '83",
    tagline: 'Atmósfera nocturna, humo y claroscuros del jazz en vivo',
    yearSpan: '1983 / Exp. 2006',
    venueOrClient: 'Bar Rvbicón (Calle del Sol, Santander)',
    curatorNote: 'Serie analógica en 35mm tomada durante las sesiones de jazz en Santander en 1983. Rescatada y expuesta en 2006 en el legendario bar Rvbicón. Grano denso, luz escénica directa y gestos suspendidos en el compás musical.',
    coverImage: '/assets/images/jazz_saxo.jpg',
    items: [
      {
        id: 'jazz-01',
        collectionId: 'santander-jazz-83',
        collectionName: "Santander Jazz '83",
        title: 'Solo de Saxo Alto en Rvbicón',
        year: '1983',
        location: 'Calle del Sol, Santander',
        medium: 'Gelatina de plata / Ilford HP5 forzado a 1600 ISO',
        src: '/assets/images/jazz_saxo.jpg',
        description: 'Exposición "Santander Jazz´83" presentada en el bar Rvbicón en 2006. Instantánea del trance interpretativo.'
      },
      {
        id: 'jazz-02',
        collectionId: 'santander-jazz-83',
        collectionName: "Santander Jazz '83",
        title: 'El Contrabajista en penumbra',
        year: '1983',
        location: 'Santander',
        medium: 'Gelatina de plata en papel baritado',
        src: '/assets/images/jazz_contrabajo.jpg',
        description: 'Las manos tensando las cuerdas en el fondo de la sala, revelado en el estudio Nadar de Santander.'
      },
      {
        id: 'jazz-03',
        collectionId: 'santander-jazz-83',
        collectionName: "Santander Jazz '83",
        title: 'Trompeta bajo el haz de luz',
        year: '1983',
        location: 'Santander',
        medium: 'Copia analógica de época / 35mm',
        src: '/assets/images/jazz_trompeta.jpg',
        description: 'Detalle del músico en plena improvisación bajo el foco incandescente del local.'
      }
    ]
  },
  {
    id: 'jardines-sin-dueno',
    name: 'Jardines sin dueño',
    tagline: 'Botánica indómita, sombras y texturas salvajes de Cantabria',
    yearSpan: '2005',
    venueOrClient: 'Galería Trazos Tres (Santander)',
    curatorNote: 'Exposición individual realizada en 2005 en la Galería Trazos Tres. Un ensayo poético sobre rincones vegetales que escapan al control humano: muros de piedra cubiertos de musgo húmedo, helechos gigantes y luz filtrada.',
    coverImage: '/assets/images/jardines_muro.jpg',
    items: [
      {
        id: 'jar-01',
        collectionId: 'jardines-sin-dueno',
        collectionName: 'Jardines sin dueño',
        title: 'Muro musgoso y helechos cantábricos',
        year: '2005',
        location: 'Cantabria',
        medium: 'C-Print sobre papel baritado mate',
        src: '/assets/images/jardines_muro.jpg',
        description: 'Exposición individual en la Galería Trazos Tres de Santander (2005). La flora autóctona recuperando el espacio de la piedra.'
      },
      {
        id: 'jar-02',
        collectionId: 'jardines-sin-dueno',
        collectionName: 'Jardines sin dueño',
        title: 'Peldaños de piedra y bosque umbrío',
        year: '2005',
        location: 'Entorno de Santander',
        medium: 'Fotografía color analógica',
        src: '/assets/images/jardines_musgo.jpg',
        description: 'Un sendero cubierto de musgo y helechos donde la naturaleza crece con absoluta autonomía estética.'
      },
      {
        id: 'jar-03',
        collectionId: 'jardines-sin-dueno',
        collectionName: 'Jardines sin dueño',
        title: 'Detalle de helecho silvestre bajo el rocío',
        year: '2005',
        location: 'Valle de Liébana / Santander',
        medium: 'Impresión giclée sobre papel de algodón',
        src: '/assets/images/jardines_helechos.jpg',
        description: 'Macro de frondas de helecho empapadas por la lluvia fina del norte.'
      }
    ]
  },
  {
    id: 'arte-catalogos',
    name: 'Arte & Catálogos',
    tagline: 'Sol LeWitt, MAS Santander, Fundación Botín y artistas contemporáneos',
    yearSpan: '1981 — Actualidad',
    venueOrClient: 'Fundación Botín / MAS Bellas Artes / Sala Robayera',
    curatorNote: 'Documentación rigurosa de obras de arte, exposiciones e instalaciones para catálogos de referencia: "Sol LeWitt 17 wall drawings 1970-2015" (Fundación Botín), catálogos Sedano (1981), Joaquín Martínez Cano (1986), "La Idea de Arte" (2014) y "Siempre nos quedará la pintura" (2011).',
    coverImage: '/assets/images/arte_sol_lewitt.jpg',
    items: [
      {
        id: 'art-01',
        collectionId: 'arte-catalogos',
        collectionName: 'Arte & Catálogos',
        title: 'Sol LeWitt: 17 Wall Drawings',
        year: '2015',
        location: 'Santander',
        medium: 'Fotografía digital de sala / Formato técnico',
        src: '/assets/images/arte_sol_lewitt.jpg',
        description: 'Registro de la monumental exposición retrospectiva de Sol LeWitt para el catálogo de la Fundación Botín.'
      },
      {
        id: 'art-02',
        collectionId: 'arte-catalogos',
        collectionName: 'Arte & Catálogos',
        title: 'Escultura moderna en el MAS',
        year: '2014',
        location: 'MAS Santander',
        medium: 'Archivo fotográfico de bellas artes',
        src: '/assets/images/arte_escultura.jpg',
        description: 'Diálogo entre la geometría escultórica en sala y la luz limpia del museo santanderino.'
      },
      {
        id: 'art-03',
        collectionId: 'arte-catalogos',
        collectionName: 'Arte & Catálogos',
        title: 'Catálogo Joaquín Martínez Cano',
        year: '1986',
        location: 'Fundación Botín, Santander',
        medium: 'Reproducción fotográfica en color / Diapositiva 6x6',
        src: '/assets/images/arte_martinez_cano.jpg',
        description: 'Pintura de gran formato documentada para la publicación monográfica de la Fundación Botín.'
      }
    ]
  },
  {
    id: 'fabrica-suenos',
    name: 'Fábrica de Sueños',
    tagline: 'Reflejos cromáticos, abstracción en el agua y juegos de luz',
    yearSpan: '2008',
    venueOrClient: 'Galería DelSol St. / Centro Cultural La Vidriera',
    curatorNote: 'Conjunto surgido de la exposición "Sueños Fugaces" en La Vidriera (Camargo, 2008) y la publicación del libro "Fábrica de sueños" junto con la serie de 8 obras en color en la Galería DelSol St. de Santander. Geometría líquida y resonancia tonal.',
    coverImage: '/assets/images/suenos_reflejo.jpg',
    items: [
      {
        id: 'sue-01',
        collectionId: 'fabrica-suenos',
        collectionName: 'Fábrica de Sueños',
        title: 'Reflejo arquitectónico en agua calma',
        year: '2008',
        location: 'Galería DelSol St., Santander',
        medium: 'C-Print sobre aluminio dibond',
        src: '/assets/images/suenos_reflejo.jpg',
        description: 'Presentado en la exposición y libro "Fábrica de sueños" (2008). Vibración de colores cálidos y turquesas sobre la superficie del agua.'
      },
      {
        id: 'sue-02',
        collectionId: 'fabrica-suenos',
        collectionName: 'Fábrica de Sueños',
        title: 'Sueños Fugaces: Vidrieras y geometrías de luz',
        year: '2008',
        location: 'Camargo, Cantabria',
        medium: 'Fotografía en color de autor',
        src: '/assets/images/suenos_vidriera.jpg',
        description: 'Exposición "Sueños Fugaces" en La Vidriera (2008). Exploración de la luz atravesando estructuras acristaladas.'
      },
      {
        id: 'sue-03',
        collectionId: 'fabrica-suenos',
        collectionName: 'Fábrica de Sueños',
        title: 'Oleaje dorado en la bahía',
        year: '2008',
        location: 'Santander',
        medium: 'Copia en papel de algodón',
        src: '/assets/images/suenos_oleaje.jpg',
        description: 'Una visión abstracta donde la luz marina de Santander se descompone en partitura cromática.'
      }
    ]
  },
  {
    id: 'viajes-mirada-casual',
    name: 'Viajes & Mirada Casual',
    tagline: '"Con la libertad e improvisación del turista aficionado: vemos otra cosa"',
    yearSpan: '1968 — Actualidad',
    venueOrClient: 'Exposiciones individuales y archivo personal',
    curatorNote: 'Como Jorge mismo reflexiona: "Fotografía con la libertad e improvisación del turista aficionado, algunas veces atina y la mirada se transforma: vemos otra cosa". Encuentros fortuitos, la luz sesgada del atardecer y la silenciosa condición humana.',
    coverImage: '/assets/images/viajes_mujer.jpg',
    items: [
      {
        id: 'via-01',
        collectionId: 'viajes-mirada-casual',
        collectionName: 'Viajes & Mirada Casual',
        title: 'La mujer en el umbral y sombras de piedra',
        year: '1992',
        location: 'Ruta europea / Archivo de viaje',
        medium: 'Copia fotográfica baritada / Leica 35mm',
        src: '/assets/images/viajes_mujer.jpg',
        description: 'La espera tranquila en una empinada calle adoquinada, cruzada por la luz dorada y sombras angulares.'
      },
      {
        id: 'via-02',
        collectionId: 'viajes-mirada-casual',
        collectionName: 'Viajes & Mirada Casual',
        title: 'Bicicleta en arco de piedra',
        year: '1995',
        location: 'Plaza marinera',
        medium: 'Gelatina de plata / 35mm',
        src: '/assets/images/viajes_bicicleta.jpg',
        description: 'De la serie de viajes expuesta en Cantabria. La espontaneidad del turista aficionado capturando un instante suspendido.'
      },
      {
        id: 'via-03',
        collectionId: 'viajes-mirada-casual',
        collectionName: 'Viajes & Mirada Casual',
        title: 'El viajero frente a los acantilados',
        year: '2001',
        location: 'Costa cantábrica',
        medium: 'C-Print analógico',
        src: '/assets/images/viajes_acantilado.jpg',
        description: 'Contemplación solitaria de la fuerza del mar del norte y los acantilados escarpados.'
      }
    ]
  }
];

// Helper to get all selection items (3 from each collection = 18 items)
export const SELECTION_ITEMS: PhotoItem[] = COLLECTIONS.flatMap((col) => col.items.slice(0, 3));

export const BIOGRAPHY_DATA = {
  name: 'Jorge Fernández Bolado',
  birth: 'Santander, 1950',
  profession: 'Fotógrafo profesional desde 1981 hasta la actualidad',
  studio: 'Estudio Nadar — Calle Frontón 1, Santander (desde 1986)',
  quote: '“Fotografía con la libertad e improvisación del turista aficionado, algunas veces atina y la mirada se transforma: vemos otra cosa.”',
  summary: `Jorge Fernández Bolado (Santander, 1950) comenzó a realizar fotografías a los 18 años. En 1971 se traslada a Barcelona, donde se matricula en la escuela E.M.A.V. (Escuela de Medios Audiovisuales), primera escuela de Formación Profesional en Imagen y Sonido, donde estudia fotografía, cine, T.V., diseño y artes gráficas, y donde realiza prácticas de fotografía y cine en 16 mm.

Reside en Barcelona hasta 1979, año en que realiza el primer trabajo profesional: fotografías y ampliaciones en papel de las obras del arquitecto Fernando Obregón Ansorena para la exposición organizada por el Colegio de Arquitectos.

En 1981, como fotógrafo profesional, inaugura su estudio y escuela de fotografía Nadar en Santander, donde impartirá cursos hasta 1986. Comienza a realizar fotografías de diferentes obras para los catálogos de los artistas, trabajo que ha continuado hasta la actualidad. Colabora, junto con Bernardo Riego y Pablo Hojas, en la página de Fotografía del diario Alerta, desde donde se organiza la exposición colectiva "Agosto fotográfico-84" en las salas María Blanchard y Palacete del Embarcadero.

En 1986 se traslada al actual estudio en la calle Frontón, 1 de Santander, donde sigue realizando trabajos para publicaciones, catálogos y libros; fotografía publicitaria y personal.`,
  exhibitions: [
    { year: '1980', title: 'Paseo Pereda/Castelar defensa de nuestro patrimonio', venue: 'Colegio Oficial de Arquitectos de Cantabria' },
    { year: '1984', title: 'Agosto fotográfico-84', venue: 'Salas María Blanchard y Palacete del Embarcadero (Santander)' },
    { year: '1987', title: 'Fotografías 1985/87', venue: 'Museo de Bellas Artes (actual MAS) de Santander' },
    { year: '1994', title: 'Fotografías 1990-1993', venue: 'Galería Índice de Torrelavega (Cantabria)' },
    { year: '2005', title: 'Jardines sin dueño', venue: 'Galería Trazos Tres (Santander)' },
    { year: '2006', title: 'Santander Jazz´83', venue: 'Bar Rvbicón (Santander)' },
    { year: '2008', title: 'Sueños Fugaces', venue: 'Centro Cultural La Vidriera (Camargo)' },
    { year: '2008', title: 'Fábrica de sueños (Libro y exposición de 8 fotografías en color)', venue: 'Galería DelSol St. (Santander)' }
  ],
  clientsAndInstitutions: [
    'Colegio Oficial de Arquitectos de Cantabria',
    'Autoridad Portuaria de Santander (Catálogos y libro "Santander, el Puerto y su Historia", 1985–2017)',
    'Fundación Botín (Sol LeWitt 17 wall drawings 1970–2015, Joaquín Martínez Cano 1986)',
    'Obra Social y Cultural de Caja Cantabria ("Cántabros la génesis de un pueblo", "Siempre nos quedará la pintura")',
    'Museo Municipal de Bellas Artes de Santander y actual MAS (Catálogo Sedano 1981, La Idea de Arte 2014)',
    'Fundación Santillana',
    'Sala Robayera (Miengo)',
    'Universidad de Cantabria'
  ],
  contact: {
    address: 'Calle Frontón, 1 — 39003 Santander, Cantabria, España',
    email: 'estudio@jorgefernandezbolado.com',
    phone: '+34 942 22 18 40',
    studioName: 'Estudio Nadar Santander'
  }
};
