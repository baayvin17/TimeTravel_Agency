import { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Compass,
  MapPin,
  Calendar,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  Sparkles,
  Star,
  ArrowRight,
  Send,
  Wand2,
  Target,
} from 'lucide-react';

// Destinations data
const destinations = [
  {
    id: 1,
    title: 'Paris 1889',
    subtitle: 'The Belle Époque',
    year: '1889',
    description: 'Witness the grand opening of the Eiffel Tower at the Exposition Universelle. Experience the artistic revolution of Montmartre, the birth of the Moulin Rouge, and the golden age of French imperialism.',
    image: 'https://i.postimg.cc/Zn91YrqP/Paris-Hero-(2).jpg',
    highlights: ['Eiffel Tower Inauguration', 'Moulin Rouge Premiere', 'Belle Époque Culture'],
    price: 'From $12,500',
  },
  {
    id: 2,
    title: 'Crétacé',
    subtitle: '-65 Million Years',
    year: '-65M',
    description: 'Journey to the late Cretaceous period and witness the majestic dinosaurs in their prime. See Triceratops herds, soaring Pterosaurs, and the legendary T-Rex in the untouched prehistoric wilderness.',
    image: 'https://i.postimg.cc/CxNYQsnK/Cretace-Hero.jpg',
    highlights: ['Live Dinosaurs', 'Prehistoric Flora', 'Volcanic Landscapes'],
    price: 'From $45,000',
  },
  {
    id: 3,
    title: 'Florence 1504',
    subtitle: 'The Renaissance Peak',
    year: '1504',
    description: 'Attend the unveiling of Michelangelo\'s David in the Piazza della Signoria. Witness Da Vinci\'s workshop, the Medici court, and the artistic revolution that shaped Western civilization.',
    image: 'https://i.postimg.cc/26PfZHM7/Florence-Hero.jpg',
    highlights: ['David Unveiling', 'Da Vinci\'s Studio', 'Medici Palace'],
    price: 'From $18,900',
  },
];

// FAQ data
const faqData = [
  {
    question: 'How does time travel work?',
    answer: 'Our exclusive Chronos technology creates a controlled temporal corridor, allowing safe passage through the space-time continuum. Each journey is supervised by certified Temporal Engineers who ensure complete safety and precise arrival at your chosen historical moment.',
  },
  {
    question: 'Are the journeys safe?',
    answer: 'Absolutely. With over 2,500 successful expeditions, we maintain a perfect safety record. Our temporal shields protect you from paradox risks, and each traveler is equipped with a personal quantum anchor for instant return capability.',
  },
  {
    question: 'Can I interact with historical figures?',
    answer: 'Yes, within controlled parameters. Our Observer Protocol allows meaningful interactions while preventing paradoxes. You can converse with historical figures, attend events, and even participate in daily activities—all while preserving the timeline.',
  },
  {
    question: 'What should I pack for my journey?',
    answer: 'We provide period-appropriate attire, universal translators, and temporal coordinates. You only need personal comfort items. Each destination includes a curated preparation guide with specific recommendations for the era and climate.',
  },
  {
    question: 'How long can I stay?',
    answer: 'Journeys range from one day to one month in local time. Extended stays include accommodation in premium historical residences, personal guides, and 24/7 quantum monitoring. Duration affects pricing accordingly.',
  },
];

// Quiz data
const quizQuestions = [
  {
    id: 1,
    question: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      { text: 'Culturelle et artistique', value: 'florence' },
      { text: 'Aventure et nature', value: 'cretace' },
      { text: 'Élégance et raffinement', value: 'paris' },
    ],
  },
  {
    id: 2,
    question: 'Votre période préférée ?',
    options: [
      { text: 'Histoire Moderne (XIXe siècle)', value: 'paris' },
      { text: 'Temps anciens (Préhistoire)', value: 'cretace' },
      { text: 'Renaissance (XVIe siècle)', value: 'florence' },
    ],
  },
  {
    id: 3,
    question: 'Vous préférez :',
    options: [
      { text: 'L\'effervescence urbaine', value: 'paris' },
      { text: 'La nature sauvage', value: 'cretace' },
      { text: 'L\'art et l\'architecture', value: 'florence' },
    ],
  },
  {
    id: 4,
    question: 'Votre activité idéale :',
    options: [
      { text: 'Visiter des monuments emblématiques', value: 'paris' },
      { text: 'Observer la faune extraordinaire', value: 'cretace' },
      { text: 'Explorer des musées et ateliers', value: 'florence' },
    ],
  },
];

// Chatbot responses based on keywords
const chatbotResponses: Record<string, string> = {
  paris: `Paris 1889 - Ah, la Belle Époque ! Quel choix passionnant ! Vous assisterez à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle. Imaginez-vous flâner dans les rues de Montmartre au moment où les impressionnistes révolutionnent l'art, ou vivre l'effervescence du Moulin Rouge qui vient tout juste d'ouvrir ses portes. C'est l'apogée de l'élégance française ! Le prix débute à $12,500 pour un séjour de 3 jours avec guide personnel certifié.`,
  cretace: `Le Crétacé (-65 millions d'années) - Quelle aventure extraordinaire ! Vous allez découvrir un monde où les dinosaures règnent en maîtres. Imaginez observer un troupeau de Triceratops paissant paisiblement, ou voir un T-Rex majestueux à l'affût. Les paysages volcaniques et la végétation préhistorique créeront des souvenirs inoubliables. Nos boucliers temporels vous protègent à tout moment. Prix à partir de $45,000 - une expérience unique dans l'histoire de l'humanité !`,
  florence: `Florence 1504 - La Renaissance à son apogée ! Vous serez témoin du dévoilement du David de Michelange place de la Signoria. Vous pourrez visiter l'atelier de Léon de Vinci et peut-être croiser les Médicis. L'air de Florence est imprégné de créativité artistique et d'innovation intellectuelle. C'est l'un de nos voyages les plus prisés pour les amateurs d'art et d'histoire. Tarif à partir de $18,900, incluant accès privilégié aux ateliers d'artistes.`,
  prix: `Nos tarifs varient selon la destination et la durée :\n\n• Paris 1889 : dès $12,500 (3 jours)\n• Crétacé : dès $45,000 (2 jours - équipement spécial requis)\n• Florence 1504 : dès $18,900 (3 jours)\n\nChaque voyage inclut le transport temporel, l'hébergement d'époque, un guide personnel, et l'équipement de sécurité quantique. Les séjours prolongés bénéficient de tarifs préférentiels. Souhaitez-vous plus de détails sur une destination ?`,
  conseil: `Avec grand plaisir ! Pour vous guider, j'aimerais en savoir plus sur vos préférences :\n\n• Aimez-vous l'art et l'architecture ? Florence 1504 vous enchantera\n• Préférez-vous l'aventure et la nature sauvage ? Le Crétacé est fait pour vous\n• L'élégance et le raffinement vous attirent ? Paris 1889 sera parfait\n\nN'hésitez pas à me poser vos questions spécifiques sur nos destinations ! Je serais ravi de vous aider à trouver le voyage temporal idéal.`,
  default: `Bienvenue, cher voyageur ! Je suis votre Assistant Temporal, passionné d'histoire et expert en voyages à travers les époques. Posez-moi vos questions sur Paris 1889, le Crétacé, Florence 1504, nos tarifs ou demandez-moi conseil ! Je suis là pour vous guider vers l'aventure temporelle de vos rêves.`,
};

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Destinations', 'Experiences', 'About', 'FAQ'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-gold-500/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <Clock className="w-10 h-10 text-gold-500 group-hover:text-gold-400 transition-colors" />
              <Sparkles className="w-4 h-4 text-gold-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-semibold text-white tracking-wide">
                TimeTravel
              </span>
              <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-light">
                Agency
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-300 hover:text-gold-400 transition-colors duration-300 text-sm font-medium tracking-wide relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#destinations"
              className="bg-gradient-gold text-dark-900 px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 hover:scale-105"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-gold-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gold-500/10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block py-3 text-gray-300 hover:text-gold-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#destinations"
              className="block mt-4 bg-gradient-gold text-dark-900 px-6 py-2.5 rounded-full font-semibold text-sm text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
        {/* Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-medium tracking-wider">
              Luxury Temporal Experiences Since 2089
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Journey Beyond{' '}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Time</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience history's most extraordinary moments firsthand. Our exclusive temporal
            expeditions transport you to the events that shaped humanity, with unparalleled
            luxury and absolute safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#quiz"
              className="group bg-gradient-gold text-dark-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Find Your Era
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href="#destinations"
              className="text-gray-300 hover:text-gold-400 transition-colors px-8 py-4 font-medium flex items-center gap-2"
            >
              Explore Destinations
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {[
            { value: '2,500+', label: 'Successful Journeys' },
            { value: '127', label: 'Unique Eras' },
            { value: '100%', label: 'Safety Record' },
            { value: '24/7', label: 'Temporal Support' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-gold-400 text-2xl sm:text-3xl font-display font-bold">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gold-500/50" />
      </div>
    </section>
  );
}

// Quiz Section
function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [recommendedDest, setRecommendedDest] = useState<typeof destinations[0] | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const counts: Record<string, number> = { paris: 0, cretace: 0, florence: 0 };
      newAnswers.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });

      const maxKey = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
      );

      const destMap: Record<string, typeof destinations[0]> = {
        paris: destinations[0],
        cretace: destinations[1],
        florence: destinations[2],
      };

      setRecommendedDest(destMap[maxKey]);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setRecommendedDest(null);
  };

  const scrollToDestination = () => {
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <section id="quiz" className="py-24 bg-dark-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium tracking-wider mb-4">
            <Wand2 className="w-4 h-4" />
            <span>QUIZ INTERACTIF</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Trouvez vôtre{' '}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Époque Idéale</span>
          </h2>
          <p className="text-gray-400">
            Répondez à quelques questions pour découvrir la destination temporelle parfaite pour vous.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-dark-900 border border-gold-500/20 rounded-2xl overflow-hidden">
          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="h-1 bg-dark-700">
                <div
                  className="h-full bg-gradient-gold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Question */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-gold-500 text-sm mb-4">
                  <Target className="w-4 h-4" />
                  <span>Question {currentQuestion + 1} sur {quizQuestions.length}</span>
                </div>

                <h3 className="text-xl font-medium text-white mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full text-left p-4 rounded-xl bg-dark-800 border border-gold-500/10 text-gray-300 hover:border-gold-500/50 hover:bg-dark-700 hover:text-white transition-all duration-300 group"
                    >
                      <span className="flex items-center justify-between">
                        {option.text}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Result */
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-sm font-medium">Votre destination idéale</span>
              </div>

              {recommendedDest && (
                <>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">
                    {recommendedDest.title}
                  </h3>
                  <p className="text-gold-400 text-lg mb-4">{recommendedDest.subtitle}</p>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {recommendedDest.id === 1 && "L'élégance de la Belle Époque vous appelle ! Vous êtes fait pour vivre l'effervescence artistique et culturelle de Paris au XIXe siècle. La Tour Eiffel, le Moulin Rouge, et les impressionnistes n'attendent que vous."}
                    {recommendedDest.id === 2 && "L'aventure préhistorique est vôtre ! Votre esprit d'explorateur trouvera son bonheur au cœur du Crétacé. Observer des dinosaures dans leur habitat naturel sera une expérience transformative."}
                    {recommendedDest.id === 3 && "La Renaissance italienne résonne avec votre âme ! L'art, l'architecture et la créativité de Florence 1504 sont faits pour vous. Michel-Ange et de Vinci deviendront vos contemporains."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={scrollToDestination}
                      className="bg-gradient-gold text-dark-900 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Compass className="w-4 h-4" />
                      Découvrir cette destination
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="text-gray-400 hover:text-gold-400 px-6 py-3 transition-colors"
                    >
                      Refaire le quiz
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Destination Card
function DestinationCard({ destination, index }: { destination: typeof destinations[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-dark-800 border border-gold-500/10 transition-all duration-500 hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/10">
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

          {/* Year Badge */}
          <div className="absolute top-4 right-4 bg-dark-900/80 backdrop-blur-sm border border-gold-500/30 rounded-full px-4 py-1.5">
            <span className="text-gold-400 font-display font-semibold">{destination.year}</span>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4 bg-gold-500/90 rounded-full px-4 py-1.5">
            <span className="text-dark-900 font-semibold text-sm">{destination.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="text-gold-400 text-sm">{destination.subtitle}</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
            {destination.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {destination.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            {destination.highlights.map((h, i) => (
              <span
                key={i}
                className="bg-dark-700 text-gray-300 text-xs px-3 py-1 rounded-full border border-dark-600"
              >
                {h}
              </span>
            ))}
          </div>

          {/* Button */}
          <button className="w-full bg-transparent border border-gold-500/50 text-gold-400 py-3 rounded-xl font-semibold hover:bg-gold-500 hover:text-dark-900 hover:border-gold-500 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            <Compass className="w-4 h-4" />
            Explorer
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Destinations Section
function DestinationsSection() {
  return (
    <section id="destinations" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium tracking-wider mb-4">
            <Calendar className="w-4 h-4" />
            <span>DESTINATIONS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose Your{' '}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Era</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Each destination is meticulously curated for an immersive historical experience,
            with luxury accommodations and expert temporal guides.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Accordion Item
function FAQItem({ item, isOpen, onClick }: { item: typeof faqData[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-gold-500/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/30">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left bg-dark-800/50 hover:bg-dark-800 transition-colors"
      >
        <span className="text-white font-medium pr-4">{item.question}</span>
        <div className={`text-gold-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-gray-400 leading-relaxed bg-dark-800/50">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-dark-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-400">
            Everything you need to know about your temporal journey.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-10 h-10 text-gold-500" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold text-white tracking-wide">
                  TimeTravel
                </span>
                <span className="text-gold-500 text-xs tracking-[0.2em] uppercase font-light">
                  Agency
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Pioneering luxury temporal travel since 2089. Creating unforgettable historical
              experiences with complete safety and uncompromising elegance.
            </p>
            <div className="flex gap-4">
              {['twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-dark-800 border border-gold-500/10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <Sparkles className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Destinations', 'Experiences', 'Safety', 'Pricing'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>contact@timetravel.agency</li>
              <li>+1 (888) TEMPORAL</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gold-500/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 TimeTravel Agency. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Created by Claude</p>
        </div>
      </div>
    </footer>
  );
}

// Chatbot Widget
function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: chatbotResponses.default, isBot: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('paris') || lowerMessage.includes('belle époque') || lowerMessage.includes('eiffel') || lowerMessage.includes('1889')) {
      return chatbotResponses.paris;
    }
    if (lowerMessage.includes('crétacé') || lowerMessage.includes('cretace') || lowerMessage.includes('dinosaure') || lowerMessage.includes('préhistoir') || lowerMessage.includes('-65')) {
      return chatbotResponses.cretace;
    }
    if (lowerMessage.includes('florence') || lowerMessage.includes('renaissance') || lowerMessage.includes('michel') || lowerMessage.includes('1504') || lowerMessage.includes('italie')) {
      return chatbotResponses.florence;
    }
    if (lowerMessage.includes('prix') || lowerMessage.includes('tarif') || lowerMessage.includes('coût') || lowerMessage.includes('combien')) {
      return chatbotResponses.prix;
    }
    if (lowerMessage.includes('conseil') || lowerMessage.includes('recommend') || lowerMessage.includes('choisir') || lowerMessage.includes('suggérer') || lowerMessage.includes('aide')) {
      return chatbotResponses.conseil;
    }

    return "Merci pour votre question ! En tant qu'expert en voyages temporels, je serais ravi de vous aider. Posez-moi des questions sur Paris 1889, le Crétacé des dinosaures, Florence de la Renaissance, nos tarifs ou demandez-moi conseil pour choisir votr destination idéale !";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputValue('');

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-dark-800 border border-gold-500/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-gold p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-dark-900/30 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-dark-900" />
              </div>
              <div>
                <h3 className="text-dark-900 font-semibold">Assistant Temporal</h3>
                <p className="text-dark-900/70 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-700 rounded-full animate-pulse" />
                  En ligne
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-72 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 text-sm whitespace-pre-line ${
                    msg.isBot
                      ? 'bg-dark-700 text-gray-300'
                      : 'bg-gold-500 text-dark-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gold-500/10 bg-dark-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="flex-1 bg-dark-700 border border-gold-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500/50 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-gold text-dark-900 p-3 rounded-xl hover:shadow-lg hover:shadow-gold-500/25 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-gold shadow-lg shadow-gold-500/25 flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          !isOpen ? 'animate-glow' : ''
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-dark-900" />
        ) : (
          <MessageCircle className="w-6 h-6 text-dark-900" />
        )}
      </button>
    </div>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main>
        <HeroSection />
        <QuizSection />
        <DestinationsSection />
        <FAQSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

export default App;
