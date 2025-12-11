import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Portfolio } from '@/entities';
import { Image } from '@/components/ui/image';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Portfolio[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { items } = await BaseCrudService.getAll<Portfolio>('portfolio');
      setProjects(items);
      setFilteredProjects(items);

      const uniqueCategories = Array.from(
        new Set(items.map(p => p.projectCategory).filter(Boolean))
      ) as string[];
      setCategories(['all', ...uniqueCategories]);
    };
    fetchProjects();
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.projectCategory === category));
    }
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
            Notre Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto"
          >
            Découvrez nos réalisations et les projets qui témoignent de notre expertise
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      {categories.length > 1 && (
        <section className="py-12 bg-white border-b">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
            <div className="flex flex-wrap items-center gap-4">
              <Filter className="text-foreground/60" size={20} />
              <span className="font-paragraph text-base text-foreground/60">Filtrer par:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleFilter(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="h-10"
                >
                  {category === 'all' ? 'Tous' : category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow group">
                    {project.mainImage && (
                      <div className="relative overflow-hidden h-64">
                        <Image src={project.mainImage} alt={project.projectName || 'Project'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-3 rounded-full transition-colors"
                            aria-label="Visit project"
                          >
                            <ExternalLink className="text-primary" size={20} />
                          </a>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      {project.projectCategory && (
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-lg font-paragraph text-xs font-semibold mb-3">
                          {project.projectCategory}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl text-foreground mb-3">
                        {project.projectName}
                      </h3>
                      {project.clientName && (
                        <p className="font-paragraph text-sm text-foreground/60 mb-3">
                          Client: {project.clientName}
                        </p>
                      )}
                      <p className="font-paragraph text-base text-foreground/70">
                        {project.projectDescription}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
