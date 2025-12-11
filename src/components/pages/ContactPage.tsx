import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Message envoyé !',
      description: 'Nous vous contacterons dans les plus brefs délais.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    });
    setIsSubmitting(false);
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
            Contactez-Nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-paragraph text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto"
          >
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-6">
                Envoyez-nous un Message
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 mb-8">
                Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-paragraph text-sm font-semibold text-foreground mb-2">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-paragraph text-sm font-semibold text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="jean.dupont@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-paragraph text-sm font-semibold text-foreground mb-2">
                      Téléphone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block font-paragraph text-sm font-semibold text-foreground mb-2">
                      Entreprise
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="h-12"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block font-paragraph text-sm font-semibold text-foreground mb-2">
                    Service souhaité
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-12 px-3 rounded-md border border-input bg-background font-paragraph text-base"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="it">Services Informatiques</option>
                    <option value="development">Développement</option>
                    <option value="security">Cybersécurité</option>
                    <option value="seo">SEO</option>
                    <option value="content">Création de Contenu</option>
                    <option value="ads">Publicité en Ligne</option>
                    <option value="social">Réseaux Sociaux</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph text-sm font-semibold text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}
                  <Send className="ml-2" size={20} />
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-3xl lg:text-4xl text-foreground mb-6">
                  Informations de Contact
                </h2>
                <p className="font-paragraph text-lg text-foreground/70 mb-8">
                  Vous pouvez également nous contacter directement via les coordonnées ci-dessous.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 flex items-start space-x-4 border-2 hover:border-primary transition-colors">
                  <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-2">Adresse</h3>
                    <p className="font-paragraph text-base text-foreground/70">
                     22 rue de Saussure<br />
                                       75001 Paris, France
                    </p>
                  </div>
                </Card>

                <Card className="p-6 flex items-start space-x-4 border-2 hover:border-primary transition-colors">
                  <Phone className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-2">Téléphone</h3>
                    <a
                      href="tel:+33780898367"
                      className="font-paragraph text-base text-foreground/70 hover:text-primary transition-colors"
                    >
                      +33 7 80 89 83 67
                    </a>
                  </div>
                </Card>

                <Card className="p-6 flex items-start space-x-4 border-2 hover:border-primary transition-colors">
                  <Mail className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading text-lg text-foreground mb-2">Email</h3>
                    <a
                      href="mailto:contact@waydigitech.com"
                      className="font-paragraph text-base text-foreground/70 hover:text-primary transition-colors"
                    >
                      contact@waydigitech.com
                    </a>
                  </div>
                </Card>

              
              </div>

              {/* Business Hours */}
              <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-white">
                <h3 className="font-heading text-xl mb-4">Horaires d'Ouverture</h3>
                <div className="space-y-2 font-paragraph text-base">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi:</span>
                    <span className="font-semibold">9h30 - 17h30</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi:</span>
                    <span className="font-semibold">Fermé</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche:</span>
                    <span className="font-semibold">Fermé</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
