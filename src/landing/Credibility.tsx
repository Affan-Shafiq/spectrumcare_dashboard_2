import { FiAward, FiDatabase, FiHome, FiBook, FiShield } from "react-icons/fi";

const credentials = [
  {
    icon: FiAward,
    title: "Research-Backed Methods",
    description: "Our approach is built on validated research and clinical data.",
  },
  {
    icon: FiDatabase,
    title: "Real-World Data",
    description: "Trained on real behavioral observations for accurate insights.",
  },
  {
    icon: FiHome,
    title: "Clinical Partnership",
    description: "Developed together with Pehchaan Clinic, a trusted center.",
  },
  {
    icon: FiBook,
    title: "Expert-Designed Activities",
    description: "Every game is inspired by proven therapy techniques.",
  },
  {
    icon: FiShield,
    title: "Your Privacy Comes First",
    description: "We use strong encryption to keep your family's data safe.",
  },
];

export const Credibility = () => {
  return (
    <section id="credibility" className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#F2E4CB' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#355070' }}>
                Why families trust us
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Built by experts who care
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                SpectrumCare combines clinical expertise with modern technology to give your family the best possible support.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              {credentials.map((cred, index) => (
                <div key={index} className="flex gap-4 items-center bg-white/60 p-4 rounded-xl shadow-sm border border-white/40">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#35507015' }}>
                    <cred.icon className="w-5 h-5" style={{ color: '#355070' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: '#355070' }}>{cred.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{cred.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <img src="/landing-page-images/card1.png" alt="SpectrumCare Experts" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

        </div>
      </div>
    </section>
  );
};
