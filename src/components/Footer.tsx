import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            {/* Logo avec même fond que le footer */}
            <div className="bg-primary inline-block p-2 rounded mb-4">
              <Image
                src="https://static.wixstatic.com/media/a53f55_8e91b33eef0e49458e7b5a1aee4b4578~mv2.jpeg"
                alt="Waydigitech Logo"
                width={600}       // ↑ augmenter la largeur
                className="h-25 w-auto " // ↑ ajuster la hauteur avec Tailwind
              />
            </div>

            <p className="font-paragraph text-sm text-primary-foreground/90 mb-6">
              Votre partenaire de confiance pour la transformation digitale et les services informatiques.
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#it" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Services Informatiques
                </Link>
              </li>
              <li>
                <Link to="/services#digital" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Marketing Digital
                </Link>
              </li>
              <li>
                <Link to="/services#development" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Développement
                </Link>
              </li>
              <li>
                <Link to="/services#security" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Cybersécurité
                </Link>
              </li>
              <li>
                <Link to="/resources" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  Ressources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="font-paragraph text-sm">
                  22 rue de Saussure<br />
                  75001 Paris, France
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+33780898367" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  +33 7 80 89 83 67
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:contact@waydigitech.com" className="font-paragraph text-sm hover:text-secondary transition-colors">
                  contact@waydigitech.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} Waydigitech. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
