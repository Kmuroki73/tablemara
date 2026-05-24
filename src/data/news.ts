import type { NewsItem } from '../types';

export const newsItems: NewsItem[] = [
  {
    id: 'n1',
    slug: 'mara-table-european-retail-expansion',
    title: 'MaraTable Group Announces European Retail Distribution Partnership',
    excerpt: 'MaraTable Group has signed a landmark distribution agreement with a major European retail group, marking our first significant foothold in the European market.',
    date: '2026-04-28',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'news',
    featured: true,
  },
  {
    id: 'n2',
    slug: 'nairobi-food-innovation-summit-2026',
    title: 'MaraTable Group at Nairobi Food Innovation Summit 2026',
    excerpt: 'Our CEO presents "The Future of African Frozen Foods" at East Africa\'s premier food and agri-business conference.',
    date: '2026-04-10',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'event',
    featured: true,
  },
  {
    id: 'n3',
    slug: 'wellness-table-podcast-episode-12',
    title: 'Wellness Table Podcast Ep.12: Cooking with Frozen African Greens',
    excerpt: 'In this episode, we explore the culinary versatility of frozen African greens with celebrity chef Auma Otieno and nutritionist Dr. Kamau.',
    date: '2026-03-22',
    image: 'https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'podcast',
  },
  {
    id: 'n4',
    slug: 'influencer-nairobi-kitchen-tour',
    title: '@NairobiKitchen\'s Week of MaraTable Cooking',
    excerpt: 'Food influencer @NairobiKitchen cooked every meal using MaraTable Group products for 7 days. Her honest review has 2.3 million views.',
    date: '2026-03-05',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'influencer',
  },
  {
    id: 'n5',
    slug: 'mara-table-product-launch-video',
    title: 'Watch: MaraTable Group 2026 Product Range Launch Film',
    excerpt: 'Our cinematic brand film for the 2026 product range captures the farm-to-table journey of East African greens from field to frozen.',
    date: '2026-02-18',
    image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'video',
    featured: true,
  },
  {
    id: 'n6',
    slug: 'series-a-funding-announcement',
    title: 'MaraTable Group Closes Series A Funding Round',
    excerpt: 'We are proud to announce the close of our Series A round, led by AfricInvest and co-invested by Vegpro Group, to accelerate our regional and export growth strategy.',
    date: '2026-01-30',
    image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'news',
    featured: true,
  },
];

export const getFeaturedNews = () => newsItems.filter((n) => n.featured);
