import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { RessourcesTlchargeables } from '@/entities';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Image } from '@/components/ui/image';

export default function ResourcesPage() {
  const [resources, setResources] = useState<RessourcesTlchargeables[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      const { items } = await BaseCrudService.getAll<RessourcesTlchargeables>('ressourcestelechargeables');
      setResources(items);

      const uniqueCategories = Array.from(
        new Set(items.map(r => r.category).filter(Boolean))
      ) as string[];
      setCategories(['all', ...uniqueCategories]);
    };
    fetchResources();
  }, []);

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'd MMMM yyyy', { locale: fr });
    } catch {
      return '';
    }
  };

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

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
            Ressources Téléchargeables
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto"
          >
            Guides, livres blancs et documents pour vous aider à réussir votre transformation digitale
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 1 && (
        <section className="py-12 bg-white border-b">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap items-center gap-4">
              <FileText className="text-foreground/60" size={20} />
              <span className="font-paragraph text-base text-foreground/60">Catégorie:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="h-10"
                >
                  {category === 'all' ? 'Toutes' : category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                Aucune ressource disponible pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow group">
                    {resource.coverImage && (
                      <div className="relative overflow-hidden h-56">
                        <Image src={resource.coverImage} alt={resource.title || 'Resource'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      {resource.category && (
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-lg font-paragraph text-xs font-semibold mb-3">
                          {resource.category}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl text-foreground mb-3">
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p className="font-paragraph text-base text-foreground/70 mb-4">
                          {resource.description}
                        </p>
                      )}
                      {resource.publicationDate && (
                        <div className="flex items-center gap-2 text-foreground/60 mb-6">
                          <Calendar size={16} />
                          <span className="font-paragraph text-sm">
                            {formatDate(resource.publicationDate)}
                          </span>
                        </div>
                      )}
                      {resource.downloadUrl && (
                        <a
                          href={resource.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full"
                        >
                          <Button className="w-full h-12">
                            <Download className="mr-2" size={20} />
                            Télécharger
                          </Button>
                        </a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
            Besoin de Plus d'Informations ?
          </h2>
          <p className="font-paragraph text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg"
          >
            <a href="/contact">Contactez-Nous</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
