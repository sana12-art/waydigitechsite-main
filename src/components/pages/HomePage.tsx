// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Shield, Code, TrendingUp, Users, CheckCircle, Star, Cpu, Globe, Zap, Server, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Services, TmoignagesClients } from '@/entities';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}>{children}</div>;
};

const ParallaxText = ({ children, baseVelocity = 100 }: { children: string; baseVelocity: number }) => {
  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="font-heading text-6xl md:text-9xl font-bold uppercase text-primary/5 flex whitespace-nowrap" style={{ x: 0 }}>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [services, setServices] = useState<Services[]>([]);
  const [testimonials, setTestimonials] = useState<TmoignagesClients[]>([]);
  
  // Scroll hooks for advanced motion
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  useEffect(() => {
    const fetchData = async () => {
      const [servicesData, testimonialsData] = await Promise.all([
        BaseCrudService.getAll<Services>('services'),
        BaseCrudService.getAll<TmoignagesClients>('temoignagesclients'),
      ]);
      setServices(servicesData.items.slice(0, 6));
      setTestimonials(testimonialsData.items.slice(0, 3));
    };
    fetchData();
  }, []);

  // Mouse move effect for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="min-h-screen bg-background overflow-clip selection:bg-primary selection:text-white">
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .clip-diagonal-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
      `}</style>

      <Header />

      {/* --- HERO SECTION: Immersive Tech Environment --- */}
      <section 
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary"
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-background pointer-events-none" />
        
        {/* Interactive Gradient Blob */}
        <motion.div
          className="absolute rounded-full bg-secondary blur-[100px] opacity-30 pointer-events-none"
          style={{
            width: 500,
            height: 500,
            x: useSpring(mouseX, { stiffness: 50, damping: 20 }),
            y: useSpring(mouseY, { stiffness: 50, damping: 20 }),
          }}
        />

        <motion.div 
  style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
  className="relative z-10 max-w-[120rem] w-full mx-auto px-6 lg:px-12 flex flex-col items-center text-center py-20"
>
  {/* Titre principal */}
  <h1 className="font-heading text-6xl md:text-8xl font-bold text-white tracking-tight mb-6 leading-tight">
    WAYDIGITECH
  </h1>

  {/* Sous-titre */}
  <p className="font-paragraph text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
    Digital solutions for cybersecurity, development, and marketing.
  </p>

  {/* Boutons */}
  <div className="flex flex-col sm:flex-row gap-5 items-center">
    <Button
      asChild
      size="lg"
      className="bg-secondary hover:bg-secondary/90 text-white h-14 px-10 rounded-full text-lg font-medium transition-transform hover:scale-105 shadow-md"
    >
      <Link to="/contact">
        Start Transformation
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </Button>
    <Button
      asChild
      variant="ghost"
      size="lg"
      className="text-white hover:bg-white/10 h-14 px-10 rounded-full text-lg border border-white/20 transition-colors"
    >
      <Link to="/services">Explore Ecosystem</Link>
    </Button>
  </div>
</motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <div className="bg-background py-12 border-b border-black/5 overflow-hidden">
        <ParallaxText baseVelocity={-5}>INNOVATION SECURITY GROWTH DATA</ParallaxText>
      </div>

      {/* --- ABOUT / BRAND IDENTITY SECTION --- */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedElement className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-white p-2">
                 {/* Using the provided logo image as requested for brand identity */}
                <div className="aspect-[16/9] relative rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src="https://static.wixstatic.com/media/a53f55_8e91b33eef0e49458e7b5a1aee4b4578~mv2.jpeg?id=brand-identity"
                    alt="Waydigitech Brand Identity"
                    width={1200}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Decorative elements behind */}
              <div className="absolute -top-10 -left-10 w-full h-full border-2 border-primary/10 rounded-2xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-full h-full bg-secondary/5 rounded-2xl -z-10" />
            </AnimatedElement>

            <div className="space-y-10">
              <AnimatedElement delay={200}>
                <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  We Don't Just Build Tech. <br/>
                  <span className="text-primary">We Engineer Success.</span>
                </h2>
              </AnimatedElement>
              
              <AnimatedElement delay={300}>
                <p className="font-paragraph text-xl text-foreground/70 leading-relaxed">
                  At Waydigitech, we bridge the gap between complex technological challenges and seamless business growth. Our DNA is composed of rigorous code, creative marketing strategies, and an unyielding commitment to security.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h3 className="font-heading text-4xl font-bold text-secondary">98%</h3>
                    <p className="text-sm text-foreground/60 uppercase tracking-wider">Client Retention</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-4xl font-bold text-secondary">24/7</h3>
                    <p className="text-sm text-foreground/60 uppercase tracking-wider">Active Monitoring</p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={500}>
                <Button asChild variant="link" className="p-0 text-lg text-primary hover:text-secondary transition-colors group">
                  <Link to="/about" className="flex items-center gap-2">
                    Discover Our Story 
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </Link>
                </Button>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION: Sticky Header + Horizontal/Grid Flow --- */}
      <section className="py-32 bg-primary text-white clip-diagonal relative">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/a53f55_94878147d499415aa9d1be44e8fac840~mv2.png?originWidth=1152&originHeight=768')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                <AnimatedElement>
                  <div className="w-12 h-1 bg-secondary mb-8" />
                  <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6">
                    Core <br/> Modules
                  </h2>
                  <p className="font-paragraph text-xl text-white/70 mb-8">
                    Comprehensive digital solutions designed to scale with your ambition. From infrastructure to visibility.
                  </p>
                  <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-8 h-12">
                    <Link to="/services">View All Services</Link>
                  </Button>
                </AnimatedElement>
              </div>
            </div>

            {/* Services Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {services.map((service, index) => (
    <AnimatedElement key={service._id} delay={index * 100}>
      <Link to={`/services/${service._id}`} className="group block h-full">
        <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-500 p-8 flex flex-col justify-between backdrop-blur-sm group-hover:-translate-y-2">
          <div>
            <div className="mb-6 p-3 bg-secondary/20 w-fit rounded-lg text-secondary group-hover:text-white group-hover:bg-secondary transition-colors">
              <Cpu size={32} />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3 text-white group-hover:text-secondary transition-colors">
              {service.serviceName}
            </h3>
            <p className="font-paragraph text-white mb-6 line-clamp-3">
              {service.shortDescription}
            </p>
          </div>
          <div className="flex items-center text-sm font-medium text-white group-hover:text-white transition-colors">
            Explore Module <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>
      </Link>
    </AnimatedElement>
  ))}
</div>

            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION: Bento Grid Layout --- */}
      <section className="py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">The Waydigitech Standard</h2>
              <p className="font-paragraph text-xl text-foreground/60">Built on pillars of excellence, security, and unwavering support.</p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Card */}
            <AnimatedElement className="md:col-span-2 row-span-1 md:row-span-2">
              <div className="h-full w-full rounded-3xl bg-primary p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-black/50 z-0" />
                <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 transform translate-x-1/4 translate-y-1/4">
                  <Shield size={400} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="p-4 bg-white/10 w-fit rounded-2xl backdrop-blur-md">
                    <Shield className="text-white w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-heading text-3xl md:text-4xl text-white font-bold mb-4">Enterprise-Grade Security</h3>
                    <p className="font-paragraph text-white/70 text-lg max-w-md">
                      We prioritize the sanctity of your data above all else. Our cybersecurity protocols are rigorous, proactive, and constantly evolving to meet new threats.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Standard Cards */}
            <AnimatedElement delay={100}>
              <div className="h-full w-full rounded-3xl bg-white border border-black/5 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-500 group">
                <div className="p-3 bg-secondary/10 w-fit rounded-xl text-secondary group-hover:scale-110 transition-transform">
                  <Code size={32} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Clean Code</h3>
                  <p className="text-foreground/60">Scalable, maintainable, and efficient development practices.</p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="h-full w-full rounded-3xl bg-white border border-black/5 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-500 group">
                <div className="p-3 bg-blue-100 w-fit rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Data Driven</h3>
                  <p className="text-foreground/60">Marketing strategies backed by real analytics, not guesswork.</p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="h-full w-full rounded-3xl bg-secondary p-8 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-purple-900" />
                <div className="relative z-10">
                  <div className="p-3 bg-white/20 w-fit rounded-xl text-white mb-auto">
                    <Users size={32} />
                  </div>
                </div>
                <div className="relative z-10 mt-auto">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">24/7 Support</h3>
                  <p className="text-white/80">Always here when you need us most.</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION: Horizontal Scroll --- */}
      
      

      {/* --- CTA SECTION: Final Impact --- */}
      <section className="relative py-40 bg-primary overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/a53f55_fce5bd928b7c4417b93799ba9113e1d0~mv2.png?originWidth=1152&originHeight=768')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedElement>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Ready to Upgrade Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Digital Infrastructure?</span>
            </h2>
            <p className="font-paragraph text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Join the forward-thinking companies that trust Waydigitech for their technological evolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 h-16 px-12 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform"
              >
                <Link to="/contact">
                  Get Your Free Quote
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 h-16 px-12 rounded-full text-lg backdrop-blur-sm"
              >
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}