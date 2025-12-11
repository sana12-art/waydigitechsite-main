/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: articlesdeblog
 * Interface for ArticlesdeBlog
 */
export interface ArticlesdeBlog {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType datetime */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  metaDescription?: string;
}


/**
 * Collection ID: etudesdecas
 * Interface for TudesdeCas
 */
export interface TudesdeCas {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  challenge?: string;
  /** @wixFieldType text */
  solutionProvided?: string;
  /** @wixFieldType text */
  resultsAchieved?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: membresdelequipe
 * Interface for Membresdelquipe
 */
export interface Membresdelquipe {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  memberPhoto?: string;
  /** @wixFieldType text */
  memberName?: string;
  /** @wixFieldType text */
  memberPosition?: string;
  /** @wixFieldType text */
  memberExpertise?: string;
  /** @wixFieldType text */
  memberBio?: string;
  /** @wixFieldType url */
  linkedInProfile?: string;
}


/**
 * Collection ID: portfolio
 * Interface for Portfolio
 */
export interface Portfolio {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  projectDescription?: string;
  /** @wixFieldType text */
  projectCategory?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType text */
  clientName?: string;
}


/**
 * Collection ID: ressourcestelechargeables
 * Interface for RessourcesTlchargeables
 */
export interface RessourcesTlchargeables {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  coverImage?: string;
  /** @wixFieldType url */
  downloadUrl?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  serviceCategory?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
}


/**
 * Collection ID: temoignagesclients
 * Interface for TmoignagesClients
 */
export interface TmoignagesClients {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientCompany?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType image */
  clientPhoto?: string;
  /** @wixFieldType text */
  serviceProvided?: string;
  /** @wixFieldType date */
  testimonialDate?: Date | string;
}
