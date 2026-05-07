import { FiCheck } from "react-icons/fi";

const plans = [
  {
    title: "Free",
    subtitle: "Get started",
    description: "Everything you need to take the first step - completely free.",
    features: [
      "Basic developmental screening",
      "Progress summary",
      "Community access",
      "Parent resource library",
    ],
    color: "#88BDDE",
    highlighted: false,
  },
  {
    title: "Premium",
    subtitle: "Full experience",
    description: "Unlock all learning activities and detailed insights for your child.",
    features: [
      "Advanced screening reports",
      "All learning games",
      "Visual progress dashboard",
      "Priority community support",
      "Personalized recommendations",
    ],
    color: "#355070",
    highlighted: true,
  },
  {
    title: "Professional",
    subtitle: "Expert support",
    description: "Add one-on-one sessions with child development specialists.",
    features: [
      "Video consultations",
      "Specialist reports",
      "Personalized care plans",
      "Team collaboration",
      "Dedicated support",
    ],
    color: "#E7BE88",
    highlighted: false,
  },
];

export const BusinessModel = () => {
  return (
    <section id="pricing" className="py-20 lg:py-28" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="text-center mb-16">
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#CDEAC0' }}>
                Plans
              </span>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Start free. Grow when you're ready.
              </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                We believe every family deserves access to quality support - that's why our core tools are always free.
              </p>
            </div>
            
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
              className={`rounded-3xl p-8 transition-all border ${
                    plan.highlighted
                  ? 'shadow-2xl scale-105 text-white border-transparent'
                  : 'bg-white shadow-sm border-gray-100 hover:shadow-lg'
                  }`}
                  style={plan.highlighted ? { backgroundColor: '#355070' } : {}}
                >
              <div className="mb-6">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: plan.highlighted ? '#88BDDE' : plan.color }}
                      >
                        {plan.subtitle}
                      </span>
                      <h3
                  className={`text-2xl font-bold mt-2 ${plan.highlighted ? 'text-white' : ''}`}
                        style={!plan.highlighted ? { color: '#355070' } : {}}
                      >
                        {plan.title}
                      </h3>
                <p className={`text-sm mt-2 ${plan.highlighted ? 'text-white/70' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
                    </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <FiCheck
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: plan.highlighted ? '#CDEAC0' : plan.color }}
                    />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

                    <button
                className={`w-full py-3 rounded-xl font-bold transition-all hover:scale-105 ${
                        plan.highlighted
                          ? 'bg-white text-[#355070]'
                          : 'text-white'
                      }`}
                      style={!plan.highlighted ? { backgroundColor: plan.color } : {}}
                    >
                      Get Started
                    </button>
                  </div>
          ))}
        </div>
      </div>
    </section>
  );
};
