export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  healthBenefits: string[];
  ingredients: string[];
  nutritionHighlights: NutritionItem[];
  storageInstructions: string;
  preparationInstructions: string;
  images: string[];
  price: number;
  currency: 'KES' | 'USD' | 'EUR';
  badge?: string;
  featured?: boolean;
  trending?: boolean;
}

export type ProductCategory =
  | 'frozen-meals'
  | 'ready-meals'
  | 'healthy-kids'
  | 'sun-dried-fruits'
  | 'frozen-fruits'
  | 'organic-foods';

export interface NutritionItem {
  label: string;
  value: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: Author;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
  tags: string[];
}

export type BlogCategory =
  | 'healthy-living'
  | 'african-nutrition'
  | 'frozen-foods'
  | 'meal-prep'
  | 'family-wellness'
  | 'food-innovation'
  | 'nutrition-education';

export interface ResearchPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ResearchCategory;
  date: string;
  image: string;
  featured?: boolean;
  tags: string[];
  readTime: number;
  type: 'publication' | 'report' | 'insight' | 'study';
}

export type ResearchCategory =
  | 'nutrition-innovation'
  | 'african-wellness'
  | 'food-sustainability'
  | 'export-markets'
  | 'consumer-health'
  | 'food-science';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  type: 'news' | 'event' | 'podcast' | 'influencer' | 'video';
  featured?: boolean;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export type Language = 'en' | 'it' | 'de' | 'fr' | 'es';

export type Currency = 'KES' | 'USD' | 'EUR';
