
import React, { useState } from 'react';
import { 
  Smartphone, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  Share2, 
  Menu, 
  X, 
  Edit3, 
  Save, 
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { Testimonial, CompanyData, ProductFeature } from './types';

// --- Guía de Shopify (Componente nuevo) ---
const ShopifyGuide: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const snippets = {
    head: `<!-- 1. Pega esto en tu theme.liquid antes de </head> -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Inter', sans-serif; }
</style>`,
    hero: `<!-- 2. Crea una sección "Custom Liquid" y pega esto para el Hero -->
<section class="py-20 px-4 bg-white text-center">
  <div class="max-w-7xl mx-auto space-y-8">
    <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
      Importaciones sin límites. <br/> 
      <span class="text-slate-400">Precios directos de EE.UU.</span>
    </h1>
    <p class="text-lg text-slate-500 max-w-2xl mx-auto">
      En The White Order facilitamos el acceso a tecnología y artículos exclusivos de Estados Unidos.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="/collections/all" class="px-8 py-4 bg-black text-white rounded-full font-bold">Ver Catálogo</a>
      <a href="https://wa.me/tu-numero" class="px-8 py-4 border border-slate-200 rounded-full font-bold">WhatsApp</a>
    </div>
  </div>
</section>`
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Guía para Shopify 🛍️</h2>
            <p className="text-slate-500 text-sm">Cómo pasar este diseño a tu tienda online</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition"><X /></button>
        </div>
        
        <div className="p-8 overflow-y-auto space-y-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Preparar el Tema
            </h3>
            <p className="text-sm text-slate-600">Ve a <strong>Tienda online > Temas > Editar código</strong>. En el archivo <code>theme.liquid</code>, pega esto antes de la etiqueta <code>&lt;/head&gt;</code>:</p>
            <div className="relative group">
              <pre className="bg-slate-50 p-4 rounded-xl text-xs overflow-x-auto border border-slate-200">
                {snippets.head}
              </pre>
              <button 
                onClick={() => copyToClipboard(snippets.head, 'head')}
                className="absolute top-2 right-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition"
              >
                {copied === 'head' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Crear Secciones
            </h3>
            <p className="text-sm text-slate-600">En el <strong>Editor de Temas</strong>, añade una sección de tipo <strong>"Custom Liquid"</strong> o <strong>"HTML personalizado"</strong> y pega el código de cada bloque:</p>
            <div className="relative group">
              <pre className="bg-slate-50 p-4 rounded-xl text-xs overflow-x-auto border border-slate-200">
                {snippets.hero}
              </pre>
              <button 
                onClick={() => copyToClipboard(snippets.hero, 'hero')}
                className="absolute top-2 right-2 p-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition"
              >
                {copied === 'hero' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Nota importante</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              Las funciones de edición con IA y el estado de React no funcionan directamente en Liquid. Shopify maneja los datos a través de su propio "Personalizador". Usa esta web como referencia visual para construir tus bloques en Shopify.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Componentes Existentes Actualizados ---

const Navbar: React.FC<{ onOpenGuide: () => void }> = ({ onOpenGuide }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">W</div>
            <span className="text-xl font-bold tracking-tighter text-slate-900">THE WHITE ORDER</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition">Sobre Nosotros</a>
            <a href="#iphones" className="text-slate-600 hover:text-slate-900 transition">iPhones</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 transition">Testimonios</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onOpenGuide}
              className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 text-sm font-semibold transition bg-slate-50 px-4 py-2 rounded-full border border-slate-100"
            >
              <ExternalLink size={16} />
              <span>Pasar a Shopify</span>
            </button>
            <a 
              href="https://wa.me/yournumber" 
              target="_blank" 
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition shadow-sm"
            >
              Contactar
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 shadow-xl">
          <a href="#about" onClick={() => setIsOpen(false)} className="block text-lg font-medium">Sobre Nosotros</a>
          <a href="#iphones" onClick={() => setIsOpen(false)} className="block text-lg font-medium">iPhones</a>
          <button onClick={() => { onOpenGuide(); setIsOpen(false); }} className="block w-full text-left text-lg font-medium text-blue-600">Exportar a Shopify</button>
          <a href="https://wa.me/yournumber" className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl">WhatsApp</a>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full animate-fade-in">
          <Sparkles size={16} className="text-slate-900" />
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Lo mejor de USA en tus manos</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Importaciones sin límites. <br/> 
          <span className="text-slate-400">Precios directos de EE.UU.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          En The White Order facilitamos el acceso a tecnología y artículos exclusivos de Estados Unidos. Compra iPhones y productos de marcas premium sin complicaciones logísticas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a 
            href="#iphones" 
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            Ver catálogo iPhone
          </a>
          <a 
            href="https://wa.me/yournumber" 
            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-semibold hover:border-slate-900 transition"
          >
            Consultar por WhatsApp
          </a>
        </div>
        <div className="pt-12 relative">
          <img 
            src="https://picsum.photos/seed/iphone/1200/600" 
            alt="iPhone and tech" 
            className="rounded-2xl shadow-2xl mx-auto object-cover max-h-[500px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

const EditableSection: React.FC<{
  data: CompanyData;
  onSave: (newData: CompanyData) => void;
}> = ({ data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempWhoWeAre, setTempWhoWeAre] = useState(data.whoWeAre);
  const [tempMission, setTempMission] = useState(data.mission);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    onSave({ whoWeAre: tempWhoWeAre, mission: tempMission });
    setIsEditing(false);
  };

  const handleAISuggestion = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Redacta una descripción profesional y minimalista para una sección "Quiénes Somos" y "Misión" de una empresa llamada "The White Order" que importa iPhones y artículos de EE.UU. El tono debe ser elegante y confiable. Devuelve un objeto JSON con las claves 'who' y 'mission'.`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              who: { type: Type.STRING },
              mission: { type: Type.STRING },
            },
            required: ["who", "mission"],
          },
        },
      });
      const content = JSON.parse(response.text || '{}');
      if (content.who) setTempWhoWeAre(content.who);
      if (content.mission) setTempMission(content.mission);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Nuestra Identidad</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
              >
                {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                <span>{isEditing ? 'Cancelar' : 'Personalizar Texto'}</span>
              </button>
            </div>
            
            {isEditing ? (
              <div className="space-y-4 animate-in fade-in duration-500 bg-white p-6 rounded-3xl border border-slate-200">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">¿Quiénes somos?</label>
                  <textarea 
                    className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 h-32 text-sm"
                    value={tempWhoWeAre}
                    onChange={(e) => setTempWhoWeAre(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Misión</label>
                  <textarea 
                    className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 h-32 text-sm"
                    value={tempMission}
                    onChange={(e) => setTempMission(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={handleSave} className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                    <Save size={18} /><span>Guardar</span>
                  </button>
                  <button onClick={handleAISuggestion} disabled={isGenerating} className="flex-1 bg-white border border-slate-200 text-slate-900 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-slate-50 transition">
                    <Sparkles size={18} /><span>{isGenerating ? 'Escribiendo...' : 'IA Redactar'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-slate-900 pl-6">
                    "{data.whoWeAre}"
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Misión</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {data.mission}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-full min-h-[400px] border-8 border-white">
            <img 
              src="https://picsum.photos/seed/order/800/1000" 
              className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700" 
              alt="The White Order Office" 
            />
            <div className="absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <p className="text-sm font-medium text-white italic leading-relaxed">"Eliminamos las fronteras para que tu tecnología favorita llegue a ti sin sobrecostos innecesarios."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  const features: ProductFeature[] = [
    {
      title: "Logística USA",
      description: "Gestionamos toda la cadena desde la tienda en USA hasta tu puerta.",
      icon: <Truck size={32} />
    },
    {
      title: "Garantía Apple",
      description: "Equipos inspeccionados con garantía directa de autenticidad.",
      icon: <Smartphone size={32} />
    },
    {
      title: "Precio Directo",
      description: "Mismos precios que un cliente local en EE.UU. sin intermediarios.",
      icon: <CreditCard size={32} />
    },
    {
      title: "Compra Segura",
      description: "Transparencia total en aranceles. Sin sorpresas al recibir.",
      icon: <ShieldCheck size={32} />
    }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-slate-100 rounded-[2rem] hover:bg-slate-50 transition-all group">
              <div className="mb-6 p-4 bg-slate-900 text-white rounded-2xl inline-block shadow-lg">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* Renaming iPhoneSection to IPhoneSection to fix React naming conventions */
const IPhoneSection: React.FC = () => {
  const models = [
    { name: "iPhone 16 Pro", price: "Desde $999", img: "https://picsum.photos/seed/i16/400/400" },
    { name: "iPhone 15 Pro", price: "Desde $899", img: "https://picsum.photos/seed/i15/400/400" },
    { name: "iPhone 14", price: "Desde $699", img: "https://picsum.photos/seed/i14/400/400" }
  ];

  return (
    <section id="iphones" className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="space-y-4 text-left">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Especialistas Apple</h2>
            <p className="text-slate-500">Stock permanente y pedidos personalizados directo de Miami.</p>
          </div>
          <a href="https://wa.me/yournumber" className="text-slate-900 font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Consultar stock <Smartphone size={18} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {models.map((m, i) => (
            <div key={i} className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition group">
              <div className="aspect-square overflow-hidden rounded-[2rem] mb-6">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{m.price} + envío</p>
                <a 
                  href="https://wa.me/yournumber" 
                  className="block text-center bg-slate-50 text-slate-900 py-3 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition shadow-sm"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    { id: 1, name: "Carlos Mendoza", role: "Cliente iPhone 15", text: "Excelente servicio. Importé mi equipo y llegó impecable en 10 días.", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Lucía Fernández", role: "Importación Directa", text: "Proceso muy transparente. Me ahorré casi $300 comprando con ellos.", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Andrés Silva", role: "Cliente Recurrente", text: "Atención rápida por WhatsApp. Siempre despejan todas las dudas.", avatar: "https://i.pravatar.cc/150?u=3" }
  ];

  return (
    <section id="testimonials" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16 tracking-tight">Voces de Confianza</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between hover:-translate-y-2 transition duration-500">
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => <CheckCircle2 key={i} size={14} className="fill-current" />)}
              </div>
              <p className="text-slate-600 italic leading-relaxed mb-8">"{t.text}"</p>
              <div className="flex items-center space-x-4">
                <img src={t.avatar} className="w-10 h-10 rounded-full grayscale" alt={t.name} />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-slate-500 rounded-full blur-[120px]"></div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">¿Listo para importar?</h2>
        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          Escríbenos directamente o síguenos en TikTok para ver nuestras llegadas de stock semanales.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <a href="https://wa.me/yournumber" className="w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition shadow-xl">
            <MessageCircle size={24} /><span>WhatsApp</span>
          </a>
          <a href="https://tiktok.com/@thewhiteorder" className="w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-slate-800 text-white border border-slate-700 rounded-full font-bold hover:bg-slate-700 transition">
            <Share2 size={24} /><span>TikTok</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-slate-100 bg-white px-4 text-center">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">W</div>
          <span className="text-lg font-bold tracking-tighter text-slate-900 uppercase">The White Order</span>
        </div>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">Importaciones seguras, tecnología de punta y los mejores precios del mercado estadounidense.</p>
        <p className="text-xs text-slate-300">© {new Date().getFullYear()} The White Order.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData>({
    whoWeAre: "The White Order es una compañía líder en logística y corretaje de importaciones de alta gama. Nos especializamos en conectar el mercado estadounidense con usuarios en toda la región, garantizando transparencia y rapidez.",
    mission: "Nuestra misión es democratizar el acceso a la mejor tecnología del mundo. Trabajamos incansablemente para que importar un iPhone o cualquier producto premium sea un proceso libre de estrés, con costos reducidos."
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenGuide={() => setIsGuideOpen(true)} />
      <ShopifyGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <Hero />
      <EditableSection data={companyData} onSave={setCompanyData} />
      <Services />
      {/* Updated component call to IPhoneSection */}
      <IPhoneSection />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}