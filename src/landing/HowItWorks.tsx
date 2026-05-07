import { FiEdit3, FiZap, FiPhoneCall, FiTrendingUp } from "react-icons/fi";

const steps = [
  {
    icon: FiEdit3,
    title: "Answer a Few Questions",
    description: "A short, friendly questionnaire helps us understand your child.",
    color: "#88BDDE",
    step: "01",
  },
  {
    icon: FiZap,
    title: "Get Personalized Insights",
    description: "See clear results and recommendations tailored to your child.",
    color: "#E7BE88",
    step: "02",
  },
  {
    icon: FiPhoneCall,
    title: "Connect with a Specialist",
    description: "Book a video session with a child development expert.",
    color: "#DDADFF",
    step: "03",
  },
  {
    icon: FiTrendingUp,
    title: "Watch Them Grow",
    description: "Track progress and celebrate milestones over time.",
    color: "#CDEAC0",
    step: "04",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#E7BE88] opacity-20 blur-3xl rounded-full scale-150 transform translate-x-10 -translate-y-10" />
            <img src="/landing-page-images/graphic 6.webp" alt="How SpectrumCare Works" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

          {/* Right Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#E7BE88' }}>
                How it works
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Getting started is simple
              </h2>
            </div>
            
            <div className="flex flex-col gap-6 mt-4">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden" style={{ backgroundColor: `${step.color}20` }}>
                    <div className="absolute -right-2 -bottom-2 text-3xl font-black opacity-10" style={{ color: step.color }}>{step.step}</div>
                    <step.icon className="w-6 h-6 relative z-10" style={{ color: step.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#355070' }}>{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
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
