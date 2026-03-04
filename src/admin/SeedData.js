// Datos iniciales para sembrar en Firebase
// Ejecutar desde el Dashboard la primera vez

import { collection, doc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const SEED_TESTIMONIOS = [
  {
    text_es: "Una experiencia única. Despertar entre los viñedos, el silencio, el aroma a tierra húmeda... algo que no olvidaremos. Las cabañas son impecables.",
    text_en: "A unique experience. Waking up among the vineyards, the silence, the smell of damp earth... something we will never forget. The cabins are impeccable.",
    text_pt: "Uma experiência única. Acordar entre os vinhedos, o silêncio, o aroma de terra úmida... algo que não esqueceremos. As cabanas são impecáveis.",
    author: "Mariana G.",
    origin: "Buenos Aires, Argentina",
    stars: 5,
    order: 0,
  },
  {
    text_es: "Vinimos con toda la familia y fue perfecto. Los chicos disfrutaron el campo, nosotros el vino y la tranquilidad. Volvemos seguro.",
    text_en: "We came with the whole family and it was perfect. The kids enjoyed the countryside, we enjoyed the wine and the peace. We'll definitely be back.",
    text_pt: "Viemos com toda a família e foi perfeito. As crianças curtiram o campo, nós curtimos o vinho e a tranquilidade. Voltamos com certeza.",
    author: "Roberto y Ana",
    origin: "Paraná, Entre Ríos",
    stars: 5,
    order: 1,
  },
  {
    text_es: "El viñedo es increíble. Nos hicieron un tour privado y pudimos probar las uvas directamente de la planta. La cabaña, acogedora y bien equipada.",
    text_en: "The vineyard is incredible. They gave us a private tour and we were able to taste grapes directly from the vine. The cabin, cozy and well equipped.",
    text_pt: "O vinhedo é incrível. Nos fizeram um tour privado e pudemos provar as uvas diretamente da planta. A cabana, aconchegante e bem equipada.",
    author: "Carolina S.",
    origin: "Rosario, Santa Fe",
    stars: 5,
    order: 2,
  },
];

export const SEED_FAQ = [
  {
    question_es: "¿Cómo puedo hacer una reserva?",
    question_en: "How can I make a reservation?",
    question_pt: "Como posso fazer uma reserva?",
    answer_es: "Podés reservar a través de nuestras plataformas asociadas (Booking, Airbnb) o contactarnos directamente por WhatsApp al (343) 4516846.",
    answer_en: "You can book through our partner platforms (Booking, Airbnb) or contact us directly via WhatsApp at (343) 4516846.",
    answer_pt: "Você pode reservar através das nossas plataformas parceiras (Booking, Airbnb) ou nos contactar diretamente pelo WhatsApp no (343) 4516846.",
    order: 0,
  },
  {
    question_es: "¿Cuál es la capacidad de las cabañas?",
    question_en: "What is the capacity of the cabins?",
    question_pt: "Qual é a capacidade das cabanas?",
    answer_es: "Contamos con cabañas para 2 a 6 personas (Cabernet Sauvignon, Marselan, Tannat, Viognier) y una cabaña grande para 6 a 10 personas (Chardonnay).",
    answer_en: "We have cabins for 2 to 6 people (Cabernet Sauvignon, Marselan, Tannat, Viognier) and one large cabin for 6 to 10 people (Chardonnay).",
    answer_pt: "Temos cabanas para 2 a 6 pessoas (Cabernet Sauvignon, Marselan, Tannat, Viognier) e uma cabana grande para 6 a 10 pessoas (Chardonnay).",
    order: 1,
  },
  {
    question_es: "¿Las cabañas tienen WiFi?",
    question_en: "Do the cabins have WiFi?",
    question_pt: "As cabanas têm WiFi?",
    answer_es: "Sí, todas las cabañas cuentan con WiFi de alta velocidad para que puedas trabajar o mantenerte conectado cuando lo necesites.",
    answer_en: "Yes, all cabins have high-speed WiFi so you can work or stay connected when you need to.",
    answer_pt: "Sim, todas as cabanas têm WiFi de alta velocidade para que você possa trabalhar ou ficar conectado quando precisar.",
    order: 2,
  },
  {
    question_es: "¿Se permiten mascotas?",
    question_en: "Are pets allowed?",
    question_pt: "Animais de estimação são permitidos?",
    answer_es: "¡Sí! Somos pet-friendly. Tus mascotas son bienvenidas en los espacios al aire libre del complejo. Consultanos las condiciones específicas.",
    answer_en: "Yes! We are pet-friendly. Your pets are welcome in the outdoor spaces of the complex. Ask us about the specific conditions.",
    answer_pt: "Sim! Somos pet-friendly. Seus animais de estimação são bem-vindos nos espaços ao ar livre do complexo. Pergunte-nos sobre as condições específicas.",
    order: 3,
  },
  {
    question_es: "¿Qué actividades puedo hacer en el viñedo?",
    question_en: "What activities can I do at the vineyard?",
    question_pt: "Que atividades posso fazer no vinhedo?",
    answer_es: "Podés recorrer los viñedos a pie, hacer degustaciones de uvas, participar en actividades de vendimia según la temporada, disfrutar de fogones nocturnos y explorar los 11 hectáreas de naturaleza.",
    answer_en: "You can walk through the vineyards, taste grapes, participate in harvest activities depending on the season, enjoy nighttime bonfires, and explore the 11 hectares of nature.",
    answer_pt: "Você pode percorrer os vinhedos a pé, fazer degustações de uvas, participar de atividades de vindima conforme a temporada, aproveitar fogueiras noturnas e explorar os 11 hectares de natureza.",
    order: 4,
  },
  {
    question_es: "¿Cómo llego a Cabañas del Viñedo?",
    question_en: "How do I get to Cabañas del Viñedo?",
    question_pt: "Como chego às Cabañas del Viñedo?",
    answer_es: "Estamos en Gregoria Pérez s/n y Los Zorzales, La Paz, Entre Ríos (CP 3190). A 2 horas de Paraná y a 400 km de Buenos Aires. Te compartimos la ubicación exacta por WhatsApp.",
    answer_en: "We are located at Gregoria Pérez s/n y Los Zorzales, La Paz, Entre Ríos (CP 3190). 2 hours from Paraná and 400 km from Buenos Aires. We'll share the exact location via WhatsApp.",
    answer_pt: "Estamos em Gregoria Pérez s/n y Los Zorzales, La Paz, Entre Ríos (CP 3190). A 2 horas de Paraná e a 400 km de Buenos Aires. Compartilhamos a localização exata pelo WhatsApp.",
    order: 5,
  },
];

export const SEED_STATS = {
  items: [
    { key: 'cabanas', label: 'Cabañas', value: '7', suffix: '' },
    { key: 'variedades', label: 'Variedades de uva', value: '7', suffix: '' },
    { key: 'hectareas', label: 'Hectáreas de viñedo', value: '11', suffix: ' ha' },
    { key: 'naturaleza', label: 'Naturaleza', value: '100', suffix: '%' },
  ],
};

export const SEED_CONTACTO = {
  phone: '543434516846',
  phone_display: '(343) 4516846',
  address: 'Gregoria Pérez s/n y Los Zorzales · La Paz, Entre Ríos, Argentina · CP 3190',
  instagram: 'cabanasdelvinedo',
  facebook: 'cabanasdelvinedo',
  whatsapp: '543434516846',
  email: '',
};

export async function seedFirebase() {
  const results = { testimonios: 0, faq: 0, stats: false, contacto: false };

  // Testimonios
  const testSnap = await getDocs(collection(db, 'testimonios'));
  if (testSnap.empty) {
    for (const t of SEED_TESTIMONIOS) {
      await addDoc(collection(db, 'testimonios'), t);
      results.testimonios++;
    }
  }

  // FAQ
  const faqSnap = await getDocs(collection(db, 'faq'));
  if (faqSnap.empty) {
    for (const f of SEED_FAQ) {
      await addDoc(collection(db, 'faq'), f);
      results.faq++;
    }
  }

  // Stats
  await setDoc(doc(db, 'config', 'stats'), SEED_STATS);
  results.stats = true;

  // Contacto
  await setDoc(doc(db, 'config', 'contacto'), SEED_CONTACTO);
  results.contacto = true;

  return results;
}
