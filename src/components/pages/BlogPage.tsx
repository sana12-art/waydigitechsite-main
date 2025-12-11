import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { ArticlesdeBlog } from '@/entities';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Image } from '@/components/ui/image';

export default function BlogPage() {
  const [articles, setArticles] = useState<ArticlesdeBlog[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { items } = await BaseCrudService.getAll<ArticlesdeBlog>('articlesdeblog');
      const sortedArticles = items.sort((a, b) => {
        const dateA = a.publicationDate ? new Date(a.publicationDate).getTime() : 0;
        const dateB = b.publicationDate ? new Date(b.publicationDate).getTime() : 0;
        return dateB - dateA;
      });
      setArticles(sortedArticles);
    };
    fetchArticles();
  }, []);

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'd MMMM yyyy', { locale: fr });
    } catch {
      return '';
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
            Notre Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto"
          >
            Actualités, conseils et expertise en technologie et marketing digital
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/70">
                Aucun article disponible pour le moment. Revenez bientôt !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${article.slug || article._id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow group">
                      {article.featuredImage && (
                        <div className="relative overflow-hidden h-56">
                          <Image src={article.featuredImage} alt={article.title || 'Article'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4 text-foreground/60">
                          {article.author && (
                            <div className="flex items-center gap-2">
                              <User size={16} />
                              <span className="font-paragraph text-sm">{article.author}</span>
                            </div>
                          )}
                          {article.publicationDate && (
                            <div className="flex items-center gap-2">
                              <Calendar size={16} />
                              <span className="font-paragraph text-sm">
                                {formatDate(article.publicationDate)}
                              </span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-heading text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        {article.metaDescription && (
                          <p className="font-paragraph text-base text-foreground/70 mb-4">
                            {article.metaDescription}
                          </p>
                        )}
                        <span className="text-primary font-paragraph text-base font-semibold inline-flex items-center">
                          Lire l'article
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </span>
                      </div>
                    </Card>
                  </Link>
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
