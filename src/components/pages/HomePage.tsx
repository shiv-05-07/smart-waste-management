// HPI 1.6-G
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { FileText, Eye, CheckCircle, Users, Building2, ArrowRight, MapPin, Activity, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ImageSlideshow from '@/components/ImageSlideshow';

// --- Utility Components ---

/**
 * AnimatedReveal: A wrapper that triggers a reveal animation when the element enters the viewport.
 * Uses IntersectionObserver for performance and stability.
 */
type AnimatedRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

const AnimatedReveal: React.FC<AnimatedRevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translate-y-12 opacity-0';
        case 'down': return '-translate-y-12 opacity-0';
        case 'left': return 'translate-x-12 opacity-0';
        case 'right': return '-translate-x-12 opacity-0';
        default: return 'translate-y-12 opacity-0';
      }
    }
    return 'translate-y-0 translate-x-0 opacity-100';
  };

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${getDirectionStyles()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Section Components ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen w-full overflow-clip flex flex-col justify-center bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-light-green/20 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-light-blue/20 to-transparent opacity-30" />
      </div>

      <div className="container relative z-10 max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20">
        
        {/* Text Content */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
          <AnimatedReveal delay={100}>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-paragraph tracking-wider uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Civic Tech Initiative</span>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[0.95] tracking-tight">
              Smart <br />
              <span className="text-primary italic">Community</span> <br />
              Waste Mgmt.
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={300}>
            <p className="text-xl font-paragraph text-foreground/70 max-w-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              Empowering citizens and municipalities to create cleaner, healthier communities through efficient waste reporting and management.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={400}>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/citizen-signup">
                <Button size="lg" className="h-14 px-8 rounded-full bg-primary text-white hover:bg-primary/90 text-lg font-paragraph transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Report Garbage Issue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-foreground/20 text-foreground hover:bg-foreground/5 text-lg font-paragraph">
                  Learn More
                </Button>
              </Link>
            </div>
          </AnimatedReveal>
        </div>

        {/* Hero Visuals */}
        <div className="lg:col-span-7 relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full hidden sm:block">
          <motion.div style={{ y: y1 }} className="absolute top-4 sm:top-6 md:top-10 right-4 sm:right-6 md:right-10 w-4/5 h-4/5 z-10">
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-2xl md:rounded-[2rem] shadow-lg sm:shadow-xl md:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10" />
              <Image 
                src="https://static.wixstatic.com/media/2c4374_3b905f49fa014074bae322da6ff64f70~mv2.png?originWidth=1280&originHeight=704" 
                alt="A pristine, green urban park representing the goal of the waste management system"
                className="w-full h-full object-cover scale-105"
              />
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute bottom-10 sm:bottom-14 md:bottom-20 left-0 w-1/2 h-1/2 z-20">
            <div className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-2xl md:rounded-[2rem] shadow-lg sm:shadow-xl md:shadow-2xl border-2 sm:border-3 md:border-4 border-white">
              <Image 
                src="https://static.wixstatic.com/media/2c4374_59bbf739af36497ab5b7ff442c2bd84c~mv2.png?originWidth=1280&originHeight=704" 
                alt="Municipal worker using a tablet to track waste collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-heading text-base sm:text-lg md:text-2xl">Real-time Tracking</p>
                <p className="font-paragraph text-xs sm:text-sm opacity-80">Efficient resolution</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const VisionSection = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-foreground text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Image 
          src="https://static.wixstatic.com/media/2c4374_1c637369fedf4b7d9d2d3e78a69367c9~mv2.png?originWidth=1152&originHeight=768" 
          alt="Abstract texture"
          className="w-full h-full object-cover grayscale"
        />
      </div>
      
      <div className="container max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <AnimatedReveal direction="right">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading leading-tight">
              "A clean city is not just a goal, it's a <span className="text-light-green italic">shared responsibility</span>."
            </h2>
          </AnimatedReveal>
          
          <div className="space-y-6 md:space-y-8">
            <AnimatedReveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl font-paragraph text-gray-300 leading-relaxed">
                Waste management is one of the most critical challenges facing modern urban environments. Our system bridges the gap between concerned citizens and municipal action, creating a transparent loop of accountability.
              </p>
            </AnimatedReveal>
            
            <AnimatedReveal delay={300}>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 border-t border-white/20 pt-6 md:pt-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading text-light-green mb-1">100%</h3>
                  <p className="text-xs sm:text-sm font-paragraph text-gray-400">Digital Tracking</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading text-light-blue mb-1">24/7</h3>
                  <p className="text-xs sm:text-sm font-paragraph text-gray-400">Reporting Access</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-heading text-white mb-1">Zero</h3>
                  <p className="text-xs sm:text-sm font-paragraph text-gray-400">Paperwork</p>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Sticky Process Section ---

const steps = [
  {
    id: 1,
    title: "Report",
    description: "Citizens submit waste complaints with photos, descriptions, and location details through our easy-to-use platform.",
    icon: FileText,
    color: "bg-light-green",
    image: "https://static.wixstatic.com/media/2c4374_b734e6b4d3c543bca9a2e33aa90a7ab4~mv2.png?originWidth=384&originHeight=576"
  },
  {
    id: 2,
    title: "Track",
    description: "Monitor the status of your complaint in real-time as it moves from pending to in-progress to resolved.",
    icon: Eye,
    color: "bg-light-blue",
    image: "https://static.wixstatic.com/media/2c4374_90f4c26bdc9843c48e3a7616eca66cd1~mv2.png?originWidth=384&originHeight=576"
  },
  {
    id: 3,
    title: "Resolve",
    description: "Municipal workers are assigned and dispatched to resolve issues efficiently, creating cleaner communities.",
    icon: CheckCircle,
    color: "bg-primary",
    image: "https://static.wixstatic.com/media/2c4374_aaf85e87867745dba27789863369c25a~mv2.png?originWidth=384&originHeight=576"
  }
];

const ProcessSection = () => {
  return (
    <section className="relative bg-background py-16 sm:py-20 md:py-24">
      <div className="container max-w-[100rem] mx-auto px-6 md:px-12">
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <AnimatedReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg font-paragraph text-foreground/60">Three simple steps to a cleaner community</p>
          </AnimatedReveal>
        </div>

        <div className="space-y-12 md:space-y-16">
          {/* Step 1: Report */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gray-200">01</span>
                <div className="h-px flex-1 bg-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-primary">
                {steps[0].title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-paragraph text-foreground/80 leading-relaxed">
                {steps[0].description}
              </p>
            </div>
            <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
              <ImageSlideshow
                images={[
                  {
                    src: steps[0].image,
                    alt: steps[0].title,
                    title: steps[0].title,
                    description: steps[0].description
                  }
                ]}
                autoPlay={false}
                showControls={true}
                showDots={false}
                enableSwipe={true}
              />
            </div>
          </motion.div>

          {/* Step 2: Track */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] w-full md:order-2">
              <ImageSlideshow
                images={[
                  {
                    src: steps[1].image,
                    alt: steps[1].title,
                    title: steps[1].title,
                    description: steps[1].description
                  }
                ]}
                autoPlay={false}
                showControls={true}
                showDots={false}
                enableSwipe={true}
              />
            </div>
            <div className="md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gray-200">02</span>
                <div className="h-px flex-1 bg-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-primary">
                {steps[1].title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-paragraph text-foreground/80 leading-relaxed">
                {steps[1].description}
              </p>
            </div>
          </motion.div>

          {/* Step 3: Resolve */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gray-200">03</span>
                <div className="h-px flex-1 bg-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-primary">
                {steps[2].title}
              </h3>
              <p className="text-base sm:text-lg md:text-xl font-paragraph text-foreground/80 leading-relaxed">
                {steps[2].description}
              </p>
            </div>
            <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] w-full">
              <ImageSlideshow
                images={[
                  {
                    src: steps[2].image,
                    alt: steps[2].title,
                    title: steps[2].title,
                    description: steps[2].description
                  }
                ]}
                autoPlay={false}
                showControls={true}
                showDots={false}
                enableSwipe={true}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};



const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="container max-w-[100rem] mx-auto px-6 md:px-12">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <AnimatedReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-3 md:mb-4">Benefits for Everyone</h2>
            <p className="text-base sm:text-lg font-paragraph text-foreground/60">Creating value for citizens and municipalities alike</p>
          </AnimatedReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Citizen Card */}
          <AnimatedReveal direction="left" className="h-full">
            <div className="group relative h-full bg-background rounded-lg sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-10 lg:p-16 overflow-hidden transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-primary/20">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-light-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-lg sm:rounded-2xl shadow-sm flex items-center justify-center mb-6 sm:mb-8 text-primary">
                  <Users className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-6 sm:mb-8">For Citizens</h3>
                
                <ul className="space-y-4 sm:space-y-6">
                  {[
                    "Easy and convenient waste complaint submission",
                    "Real-time tracking of complaint status",
                    "Transparent communication with municipal authorities",
                    "Contribute to a cleaner, healthier community",
                    "Historical record of all submitted complaints"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start group/item">
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-primary mt-0.5 mr-3 sm:mr-4 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                      <span className="font-paragraph text-base sm:text-lg text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedReveal>

          {/* Municipality Card */}
          <AnimatedReveal direction="right" className="h-full">
            <div className="group relative h-full bg-background rounded-lg sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-10 lg:p-16 overflow-hidden transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-secondary/20">
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-light-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
              
              <div className="relative z-10">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-lg sm:rounded-2xl shadow-sm flex items-center justify-center mb-6 sm:mb-8 text-secondary">
                  <Building2 className="w-6 sm:w-8 h-6 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-6 sm:mb-8">For Municipalities</h3>
                
                <ul className="space-y-4 sm:space-y-6">
                  {[
                    "Centralized complaint management system",
                    "Efficient worker assignment and task allocation",
                    "Data-driven insights and analytics",
                    "Improved accountability and transparency",
                    "Enhanced citizen satisfaction and trust"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start group/item">
                      <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-secondary mt-0.5 mr-3 sm:mr-4 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                      <span className="font-paragraph text-base sm:text-lg text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
};

// --- CTA Section ---

const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Background Image with Parallax-like fixed attachment */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://static.wixstatic.com/media/2c4374_29a16b5794834560be2c2a30b4962219~mv2.png?originWidth=1280&originHeight=704" 
          alt="Community working together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <AnimatedReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-6 sm:mb-8">
            Ready to Make a Difference?
          </h2>
        </AnimatedReveal>
        
        <AnimatedReveal delay={200}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-paragraph text-white/90 mb-8 sm:mb-12 leading-relaxed">
            Join thousands of citizens working together to create cleaner, healthier communities. Your voice matters.
          </p>
        </AnimatedReveal>
        
        <AnimatedReveal delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/citizen-signup">
              <Button 
                size="lg" 
                className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 bg-white text-primary hover:bg-gray-100 rounded-full text-base sm:text-lg md:text-xl font-paragraph transition-transform hover:scale-105 shadow-xl"
              >
                Get Started Now
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 bg-transparent text-white border-2 border-white hover:bg-white/10 rounded-full text-base sm:text-lg md:text-xl font-paragraph transition-transform hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-paragraph">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <VisionSection />
        <ProcessSection />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}