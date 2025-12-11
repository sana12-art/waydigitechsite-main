import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Server, Code, Shield, TrendingUp, Search, Share2, BarChart, Megaphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { items } = await BaseCrudService.getAll<Services>('services');
      setServices(items);
    };
    fetchServices();
  }, []);

  const itServices = services.filter(s => s.serviceCategory?.toLowerCase().includes('informatique') || s.serviceCategory?.toLowerCase().includes('it'));
  const digitalServices = services.filter(s => s.serviceCategory?.toLowerCase().includes('digital') || s.serviceCategory?.toLowerCase().includes('marketing'));
  const otherServices = services.filter(s => !itServices.includes(s) && !digitalServices.includes(s));

  const serviceIcons: { [key: string]: any } = {
    'informatique': Server,
    'développement': Code,
    'cybersécurité': Shield,
    'marketing': TrendingUp,
    'seo': Search,
    'réseaux sociaux': Share2,
    'analyse': BarChart,
    'publicité': Megaphone,
  };

  const getIcon = (category?: string) => {
    if (!category) return Server;
    const lowerCategory = category.toLowerCase();
    for (const [key, icon] of Object.entries(serviceIcons)) {
      if (lowerCategory.includes(key)) return icon;
    }
    return Server;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl lg:text-7xl text-white mb-6"
          >
            Nos Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto"
          >
            Des solutions complètes et personnalisées pour répondre à tous vos besoins en informatique et marketing digital
          </motion.p>
        </div>
      </section>

      {/* IT Services Section */}
      <section id="it" className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
              Services Informatiques
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl">
              Maintenance, développement, cybersécurité et gestion de réseaux pour assurer la performance et la sécurité de vos systèmes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(itServices.length > 0 ? itServices : otherServices.slice(0, 3)).map((service, index) => {
              const Icon = getIcon(service.serviceCategory);
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services/${service._id}`}>
                    <Card className="p-8 h-full hover:shadow-xl transition-all border-2 hover:border-primary group">
                      <Icon className="text-primary mb-6 group-hover:scale-110 transition-transform" size={48} />
                      {service.serviceImage && (
                        <div className="mb-6 rounded-lg overflow-hidden">
                          <Image src={service.serviceImage} alt={service.serviceName || 'Service'} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      )}
                      <h3 className="font-heading text-2xl text-foreground mb-3">
                        {service.serviceName}
                      </h3>
                      <p className="font-paragraph text-base text-foreground/70 mb-4">
                        {service.shortDescription}
                      </p>
                      <span className="text-primary font-paragraph text-base font-semibold inline-flex items-center">
                        En savoir plus
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </span>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Digital Marketing Services Section */}
      <section id="digital" className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
              Marketing Digital
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl">
              SEO, création de contenu, publicité en ligne et gestion des réseaux sociaux pour maximiser votre visibilité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(digitalServices.length > 0 ? digitalServices : otherServices.slice(3, 6)).map((service, index) => {
              const Icon = getIcon(service.serviceCategory);
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services/${service._id}`}>
                    <Card className="p-8 h-full hover:shadow-xl transition-all border-2 hover:border-primary group">
                      <Icon className="text-secondary mb-6 group-hover:scale-110 transition-transform" size={48} />
                      {service.serviceImage && (
                        <div className="mb-6 rounded-lg overflow-hidden">
                          <Image src={service.serviceImage} alt={service.serviceName || 'Service'} className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      )}
                      <h3 className="font-heading text-2xl text-foreground mb-3">
                        {service.serviceName}
                      </h3>
                      <p className="font-paragraph text-base text-foreground/70 mb-4">
                        {service.shortDescription}
                      </p>
                      <span className="text-secondary font-paragraph text-base font-semibold inline-flex items-center">
                        En savoir plus
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                      </span>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
            Besoin d'un Service Personnalisé ?
          </h2>
          <p className="font-paragraph text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques et obtenir une solution sur mesure
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary hover:bg-white/90 h-14 px-8 rounded-lg font-paragraph text-lg font-semibold inline-flex items-center"
            >
              Demander un Devis
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
