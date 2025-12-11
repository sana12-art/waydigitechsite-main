import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Membresdelquipe, TudesdeCas } from '@/entities';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  const [team, setTeam] = useState<Membresdelquipe[]>([]);
  const [caseStudies, setCaseStudies] = useState<TudesdeCas[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [teamData, caseStudiesData] = await Promise.all([
        BaseCrudService.getAll<Membresdelquipe>('membresdelequipe'),
        BaseCrudService.getAll<TudesdeCas>('etudesdecas'),
      ]);
      setTeam(teamData.items);
      setCaseStudies(caseStudiesData.items.slice(0, 3));
    };
    fetchData();
  }, []);

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
            À Propos de Waydigitech
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto"
          >
            Votre partenaire de confiance pour la transformation digitale et l'excellence technologique
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
                Notre Histoire
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Fondée avec la vision de démocratiser l'accès aux technologies de pointe, Waydigitech s'est imposée comme un acteur majeur dans le domaine des services informatiques et du marketing digital.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Notre équipe d'experts passionnés travaille sans relâche pour offrir des solutions innovantes qui propulsent nos clients vers le succès. Nous combinons expertise technique, créativité et approche centrée sur le client pour créer des expériences digitales exceptionnelles.
              </p>
              <p className="font-paragraph text-lg text-foreground/80">
                Aujourd'hui, nous sommes fiers de servir des entreprises de toutes tailles, des startups aux grandes organisations, en leur fournissant les outils et l'accompagnement nécessaires pour prospérer dans l'ère numérique.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image src="https://static.wixstatic.com/media/a53f55_8e91b33eef0e49458e7b5a1aee4b4578~mv2.jpeg?id=brand-identity" alt="Notre équipe au travail" className="rounded-2xl w-full h-auto" />
                                 
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full text-center border-2 hover:border-primary transition-colors">
                <Target className="text-primary mx-auto mb-6" size={56} />
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Notre Mission
                </h3>
                <p className="font-paragraph text-base text-foreground/70">
                  Accompagner les entreprises dans leur transformation digitale en fournissant des solutions technologiques innovantes et un service client exceptionnel.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full text-center border-2 hover:border-primary transition-colors">
                <Eye className="text-secondary mx-auto mb-6" size={56} />
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Notre Vision
                </h3>
                <p className="font-paragraph text-base text-foreground/70">
                  Devenir le partenaire technologique de référence en Europe, reconnu pour notre excellence, notre innovation et notre engagement envers la réussite de nos clients.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full text-center border-2 hover:border-primary transition-colors">
                <Award className="text-primary mx-auto mb-6" size={56} />
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Nos Valeurs
                </h3>
                <p className="font-paragraph text-base text-foreground/70">
                  Excellence, innovation, intégrité et collaboration. Ces valeurs guident chacune de nos actions et renforcent notre engagement envers nos clients et partenaires.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Case Studies Preview */}
      {caseStudies.length > 0 && (
        <section className="py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
                Études de Cas
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
                Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-shadow border-2 hover:border-primary">
                    {caseStudy.mainImage && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <Image src={caseStudy.mainImage} alt={caseStudy.title || 'Case study'} className="w-full h-48 object-cover" />
                      </div>
                    )}
                    <h3 className="font-heading text-xl text-foreground mb-3">
                      {caseStudy.title}
                    </h3>
                    <p className="font-paragraph text-sm text-foreground/60 mb-4">
                      Client: {caseStudy.clientName}
                    </p>
                    <p className="font-paragraph text-sm text-foreground/70 mb-4">
                      {caseStudy.challenge?.substring(0, 120)}...
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
            Rejoignez Notre Aventure
          </h2>
          <p className="font-paragraph text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Prêt à transformer votre entreprise avec Waydigitech ? Contactez-nous dès aujourd'hui
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg"
          >
            <Link to="/contact">
              Commencer Maintenant
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
