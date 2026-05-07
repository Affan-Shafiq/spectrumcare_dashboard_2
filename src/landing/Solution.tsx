import { FiSearch, FiSmile, FiVideo, FiHeart } from "react-icons/fi";

const pillars = [
  {
    icon: FiSearch,
    title: "Easy Screening",
    points: ["Quick, guided questionnaire", "Understand your child's needs"],
    color: "#88BDDE",
  },
  {
    icon: FiSmile,
    title: "Fun Learning Activities",
    points: ["Play-based skill building", "Designed by child development experts"],
    color: "#CDEAC0",
  },
  {
    icon: FiVideo,
    title: "Talk to Experts",
    points: ["Video sessions with specialists", "Get personalized guidance"],
    color: "#E7BE88",
  },
  {
    icon: FiHeart,
    title: "Support for Parents",
    points: ["Easy-to-follow resources", "You're never on your own"],
    color: "#DDADFF",
  },
];

export const Solution = () => {
  return (
    <section id="solution" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#88BDDE' }}>
                How we help
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                One app. Everything your family needs.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                SpectrumCare brings together screening, learning, and expert support - all in a simple, friendly experience designed specifically for early learners.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
              {pillars.map((pillar, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${pillar.color}30` }}>
                    <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ color: '#355070' }}>{pillar.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{pillar.points[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#88BDDE] opacity-10 blur-3xl rounded-full scale-150 transform -translate-x-10 translate-y-10" />
            <img src="/landing-page-images/graphic 11.webp" alt="SpectrumCare Solution Graphic" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

        </div>
      </div>
    </section>
  );
};
