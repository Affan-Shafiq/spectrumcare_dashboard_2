import { FiClipboard, FiSmile, FiBarChart2, FiBookOpen, FiUsers, FiLock } from "react-icons/fi";

const features = [
  {
    title: "Developmental Screening",
    description: "Simple, guided questions help you understand where your child is.",
    icon: FiClipboard,
    color: "#88BDDE",
  },
  {
    title: "Play-Based Learning",
    description: "Fun games designed by therapists to build key skills.",
    icon: FiSmile,
    color: "#CDEAC0",
  },
  {
    title: "Progress Tracking",
    description: "See how your child is growing with visual reports.",
    icon: FiBarChart2,
    color: "#E7BE88",
  },
  {
    title: "Parent Resources",
    description: "Helpful articles and guides written in plain language.",
    icon: FiBookOpen,
    color: "#DDADFF",
  },
  {
    title: "Community Support",
    description: "Connect with families who truly understand.",
    icon: FiUsers,
    color: "#88BDDE",
  },
  {
    title: "Safe and Private",
    description: "Your family's data is protected and secure.",
    icon: FiLock,
    color: "#CDEAC0",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#CDEAC0] opacity-20 blur-3xl rounded-full scale-150 transform translate-x-10 -translate-y-10" />
            <img src="/landing-page-images/graphic 2.png" alt="SpectrumCare Features" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

          {/* Right Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#88BDDE' }}>
                What's inside
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Tools that make a real difference
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                Everything is designed to be joyful, engaging, and easy to use - no medical background needed. Let your kids explore safely.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 mt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${feature.color}30` }}>
                    <feature.icon className="w-6 h-6" style={{ color: "#355070" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#355070' }}>{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
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
