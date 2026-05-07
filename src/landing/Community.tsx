import { FiMessageSquare, FiHeart, FiHelpCircle } from "react-icons/fi";

const communityFeatures = [
  {
    icon: FiMessageSquare,
    title: "Parent Forums",
    description: "Ask questions, share experiences, and find comfort from families who truly understand what you're going through.",
    color: "#88BDDE",
  },
  {
    icon: FiHeart,
    title: "Stories & Celebrations",
    description: "Read real stories from families, celebrate progress together, and know that every small win matters.",
    color: "#E7BE88",
  },
  {
    icon: FiHelpCircle,
    title: "Ask an Expert",
    description: "Get reliable answers from verified specialists in regular community Q&A sessions.",
    color: "#CDEAC0",
  },
];

export const Community = () => {
  return (
    <section id="community" className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#FFE6EE' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left content */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#355070' }}>
                You're not alone
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                A community that understands
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Parenting is a journey - and it's so much better when you have people who get it. Connect with families, teachers, and specialists who share your goal: helping every child thrive.
              </p>
            </div>

            <div className="space-y-6 mt-4">
              {communityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/60 shadow-sm"
                  >
                    <feature.icon className="w-6 h-6" style={{ color: '#355070' }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1" style={{ color: '#355070' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="lg:w-1/2 flex justify-center relative">
            <img src="/landing-page-images/graphic 7.webp" alt="SpectrumCare Community" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

        </div>
      </div>
    </section>
  );
};
