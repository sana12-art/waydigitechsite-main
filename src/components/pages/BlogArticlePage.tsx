import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { ArticlesdeBlog } from '@/entities';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Image } from '@/components/ui/image';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticlesdeBlog | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticlesdeBlog[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      const { items } = await BaseCrudService.getAll<ArticlesdeBlog>('articlesdeblog');
      const foundArticle = items.find(a => a.slug === slug || a._id === slug);
      
      if (foundArticle) {
        setArticle(foundArticle);
        const related = items
          .filter(a => a._id !== foundArticle._id)
          .slice(0, 3);
        setRelatedArticles(related);
      }
    };
    fetchArticle();
  }, [slug]);

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'd MMMM yyyy', { locale: fr });
    } catch {
      return '';
    }
  };

  if (!article) {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary to-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center text-white hover:text-white/80 mb-8 font-paragraph">
            <ArrowLeft className="mr-2" size={20} />
            Retour au blog
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl lg:text-6xl text-white mb-6 max-w-5xl"
          >
            {article.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6 text-white/90"
          >
            {article.author && (
              <div className="flex items-center gap-2">
                <User size={20} />
                <span className="font-paragraph text-lg">{article.author}</span>
              </div>
            )}
            {article.publicationDate && (
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span className="font-paragraph text-lg">
                  {formatDate(article.publicationDate)}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            {article.featuredImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 rounded-2xl overflow-hidden"
              >
                <Image src={article.featuredImage} alt={article.title || 'Article'} className="w-full h-auto" />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <div className="font-paragraph text-lg text-foreground/80 whitespace-pre-line leading-relaxed">
                {article.content}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
            <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-12">
              Articles Connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${relatedArticle.slug || relatedArticle._id}`}>
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow">
                      {relatedArticle.featuredImage && (
                        <div className="relative overflow-hidden h-48">
                          <Image src={relatedArticle.featuredImage} alt={relatedArticle.title || 'Article'} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-heading text-xl text-foreground mb-2">
                          {relatedArticle.title}
                        </h3>
                        {relatedArticle.metaDescription && (
                          <p className="font-paragraph text-sm text-foreground/70">
                            {relatedArticle.metaDescription.substring(0, 100)}...
                          </p>
                        )}
                      </div>
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
