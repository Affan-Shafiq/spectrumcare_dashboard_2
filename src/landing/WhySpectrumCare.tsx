const cards = [
  {
    icon: "/landing-page-images/home.svg",
    title: "Essential education at home",
    description: "SpectrumCare gives the necessary fundamental education at home.",
    color: "#FFB5C5", // Pinkish from reference image
  },
  {
    icon: "/landing-page-images/clock.svg",
    title: "Saving time for families",
    description: "Kids can play on their own without the need for any instructions.",
    color: "#D8B4E2", // Purpleish
  },
  {
    icon: "/landing-page-images/people.svg",
    title: "Affordable for everyone",
    description: "SpectrumCare does not contain any ads.",
    color: "#B4E2B4", // Greenish
  },
  {
    icon: "/landing-page-images/graduate.svg",
    title: "Assisting to enroll in public schools",
    description: "SpectrumCare facilitates the process of attending public schools.",
    color: "#B4DDF0", // Blueish
  }
];

export const WhySpectrumCare = () => {
  return (
    <section id="why-spectrumcare" className="py-20 lg:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 xl:px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-extrabold" style={{ color: '#00AEEF', fontFamily: "'Nunito', sans-serif" }}>
            Why SpectrumCare?
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side: 2x2 Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-3xl" style={{ backgroundColor: `${card.color}40` }}>
                  <img src={card.icon} alt={card.title} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#355070' }}>{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          {/* Right Side: Video Player */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/BcPSAWXWP74"
                title="SpectrumCare"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
