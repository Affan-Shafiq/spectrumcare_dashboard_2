import { FiSmile, FiMessageCircle, FiCalendar, FiMic } from "react-icons/fi";

const games = [
  {
    icon: FiSmile,
    title: "Feelings & Emotions",
    description: "Playful activities that help children recognize and express different emotions.",
    color: "#E7BE88",
  },
  {
    icon: FiMessageCircle,
    title: "Making Friends",
    description: "Fun scenarios where children practice saying hello, sharing, and taking turns.",
    color: "#88BDDE",
  },
  {
    icon: FiCalendar,
    title: "My Daily Routine",
    description: "Visual schedules and activities to build independence.",
    color: "#CDEAC0",
  },
  {
    icon: FiMic,
    title: "Let's Talk",
    description: "Engaging activities that encourage your child to communicate.",
    color: "#DDADFF",
  },
];

export const Games = () => {
  return (
    <section id="games" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#CDEAC0' }}>
                Learning through play
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Games that grow with your child
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                Every activity is designed by child development specialists to be fun, gentle, and effective.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-6">
              {games.map((game, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${game.color}30` }}>
                    <game.icon className="w-6 h-6" style={{ color: "#355070" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#355070' }}>{game.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{game.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#E7BE88] opacity-10 blur-3xl rounded-full scale-150 transform -translate-x-10 translate-y-10" />
            <img src="/landing-page-images/graphic 4.webp" alt="SpectrumCare Games" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

        </div>
      </div>
    </section>
  );
};
