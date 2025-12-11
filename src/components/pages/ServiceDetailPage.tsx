import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Services | null>(null);
  const [relatedServices, setRelatedServices] = useState<Services[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      
      const serviceData = await BaseCrudService.getById<Services>('services', id);
      setService(serviceData);

      const { items } = await BaseCrudService.getAll<Services>('services');
      const related = items
        .filter(s => s._id !== id && s.serviceCategory === serviceData.serviceCategory)
        .slice(0, 3);
      setRelatedServices(related);
    };
    fetchService();
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-paragraph text-lg text-foreground/70">Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const benefits = service.keyBenefits?.split('\n').filter(b => b.trim()) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <Link to="/services" className="inline-flex items-center text-white hover:text-white/80 mb-8 font-paragraph">
            <ArrowLeft className="mr-2" size={20} />
            Retour aux services
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl lg:text-6xl text-white mb-4"
          >
            {service.serviceName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl text-white/90 max-w-3xl"
          >
            {service.shortDescription}
          </motion.p>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {service.serviceImage && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl overflow-hidden"
              >
                <Image src={service.serviceImage} alt={service.serviceName || 'Service'} className="w-full h-full object-cover" />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={service.serviceImage ? '' : 'lg:col-span-2'}
            >
              <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-6">
                Description Détaillée
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 whitespace-pre-line mb-8">
                {service.detailedDescription}
              </p>
              {service.serviceCategory && (
                <div className="mb-6">
                  <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-lg font-paragraph text-sm font-semibold">
                    {service.serviceCategory}
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Key Benefits */}
          {benefits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-8">
                Avantages Clés
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="p-6 flex items-start space-x-4">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                    <p className="font-paragraph text-base text-foreground/80">
                      {benefit}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center"
          >
            <h2 className="font-heading text-3xl lg:text-4xl text-white mb-4">
              Intéressé par ce Service ?
            </h2>
            <p className="font-paragraph text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg"
            >
              <Link to="/contact">Demander un Devis</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-12">
              Services Connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services/${relatedService._id}`}>
                    <Card className="p-6 h-full hover:shadow-xl transition-shadow border-2 hover:border-primary">
                      {relatedService.serviceImage && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <Image src={relatedService.serviceImage} alt={relatedService.serviceName || 'Service'} className="w-full h-40 object-cover" />
                        </div>
                      )}
                      <h3 className="font-heading text-xl text-foreground mb-2">
                        {relatedService.serviceName}
                      </h3>
                      <p className="font-paragraph text-sm text-foreground/70">
                        {relatedService.shortDescription}
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
