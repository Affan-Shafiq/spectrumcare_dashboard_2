import { FiUsers, FiActivity, FiBookOpen, FiGrid } from "react-icons/fi";

const targetUsers = [
  {
    icon: FiUsers,
    title: "Parents & Families",
    description: "Simple tools to understand your child better and track progress.",
    color: "#88BDDE",
  },
  {
    icon: FiActivity,
    title: "Therapists & Specialists",
    description: "Monitor client progress and offer video consultations.",
    color: "#E7BE88",
  },
  {
    icon: FiBookOpen,
    title: "Teachers & Schools",
    description: "Access practical resources for creating inclusive classrooms.",
    color: "#CDEAC0",
  },
  {
    icon: FiGrid,
    title: "Clinics & Centers",
    description: "Streamline screening and collaborate with your care team.",
    color: "#DDADFF",
  },
];

export const TargetUsers = () => {
  return (
    <section id="target-users" className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Image */}
          <div className="lg:w-1/2 flex justify-center relative">
            <div className="absolute inset-0 bg-[#DDADFF] opacity-20 blur-3xl rounded-full scale-150 transform translate-x-10 -translate-y-10" />
            <img src="/landing-page-images/graphic 8.webp" alt="SpectrumCare Target Users" className="max-w-full h-auto object-contain relative z-10 hover:-translate-y-2 transition-transform duration-500" style={{ maxHeight: '600px' }} />
          </div>

          {/* Right Text */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#DDADFF' }}>
                Who it's for
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6" style={{ fontFamily: "'Nunito', sans-serif", color: '#355070' }}>
                Made for everyone who cares
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 mt-4">
              {targetUsers.map((user, index) => (
                <div key={index} className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${user.color}30` }}>
                    <user.icon className="w-6 h-6" style={{ color: "#355070" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1" style={{ color: '#355070' }}>{user.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{user.description}</p>
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
