import { FiClock, FiDollarSign, FiAlertCircle } from "react-icons/fi";

const problems = [
  {
    icon: FiClock,
    title: "Many Signs Go Unnoticed",
    description:
      "Most children aren't screened until school age, but the best time to start support is much earlier. The sooner you know, the more you can help.",
    color: "#E7BE88",
  },
  {
    icon: FiDollarSign,
    title: "Getting Help Can Be Hard",
    description:
      "Finding a specialist is expensive and wait times can be months long. Every family deserves faster access to guidance and answers.",
    color: "#DDADFF",
  },
  {
    icon: FiAlertCircle,
    title: "Parents Need Better Resources",
    description:
      "It can feel overwhelming when you don't know what to look for or where to start. We believe parents should never have to figure this out alone.",
    color: "#CDEAC0",
  },
];

export const Problem = () => {
  return (
    <section className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#E7BE88] opacity-20 blur-3xl rounded-full scale-150 transform -translate-x-10 translate-y-10" />
            <img src="/landing-page-images/graphic 12.webp" alt="Why it matters" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

          {/* Right Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#E7BE88' }}>
                Why it matters
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Early support changes everything
              </h2>
            </div>
            
            <div className="flex flex-col gap-6 mt-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${problem.color}30` }}>
                    <problem.icon className="w-6 h-6" style={{ color: problem.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#355070' }}>{problem.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
