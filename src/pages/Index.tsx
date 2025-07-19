import { useState, useMemo } from 'react';
import { DiscoveryCard } from '@/components/DiscoveryCard';
import { DiscoveryFilters } from '@/components/DiscoveryFilters';
import { FeaturedDiscovery } from '@/components/FeaturedDiscovery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  Search, 
  Sparkles, 
  TrendingUp,
  ChevronDown,
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockDiscoveries = [
  {
    id: '1',
    title: 'Tardigrade in Cryptobiosis State',
    description: 'Incredible microscopic view of a tardigrade entering its remarkable survival state, showcasing nature\'s most resilient creature.',
    image: 'https://storage.googleapis.com/microcosmosdelta.appspot.com/post_media%2Fundefined%2Fundefined%2F4nugfdw25q_Screenshot%202025-07-01%20at%2012.03.02%20AM_300x300.jpeg',
    author: 'Dr. Sarah Chen',
    location: 'University of California, Berkeley',
    date: '2 days ago',
    applause: 47,
    comments: 12,
    category: 'rare' as const,
    featured: true,
    isNew: true,
    magnification: '400x',
    organism: 'Tardigrade (Hypsibius dujardini)',
    technique: 'Phase Contrast',
    significance: 'This discovery shows the remarkable ability of tardigrades to survive extreme conditions by entering cryptobiosis, where all metabolic processes essentially stop.',
    tags: ['Cryptobiosis', 'Extremophile', 'Microscopy', 'Survival']
  },
  {
    id: '2',
    title: 'Marine Diatom Collection',
    description: 'Beautiful geometric patterns found in marine diatoms collected from coastal waters.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    author: 'Prof. Michael Rodriguez',
    location: 'Marine Biology Station, Woods Hole',
    date: '1 week ago',
    applause: 23,
    comments: 8,
    category: 'educational' as const,
    magnification: '200x',
    organism: 'Various Diatom Species',
    technique: 'Brightfield',
    significance: 'These diatoms showcase the incredible diversity of microscopic life in our oceans and their role in marine ecosystems.',
    tags: ['Diatoms', 'Marine', 'Patterns', 'Silica']
  },
  {
    id: '3',
    title: 'Paramecium Feeding Behavior',
    description: 'Live observation of Paramecium engulfing bacteria through phagocytosis.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    author: 'Student Research Team',
    location: 'MIT Biology Lab',
    date: '3 days ago',
    applause: 18,
    comments: 5,
    category: 'research' as const,
    magnification: '600x',
    organism: 'Paramecium caudatum',
    technique: 'Dark Field',
    significance: 'This observation demonstrates the fundamental process of phagocytosis, crucial for understanding cellular nutrition.',
    tags: ['Paramecium', 'Feeding', 'Behavior', 'Protist']
  },
  {
    id: '4',
    title: 'Pollen Grain Structure',
    description: 'Detailed view of pollen grain surface showing intricate sculptural patterns.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=400&fit=crop',
    author: 'Dr. Emma Watson',
    location: 'Royal Botanic Gardens, Kew',
    date: '5 days ago',
    applause: 31,
    comments: 7,
    category: 'common' as const,
    magnification: '150x',
    organism: 'Hibiscus pollen',
    technique: 'SEM Simulation',
    significance: 'The unique surface patterns help scientists identify plant species and understand pollination mechanisms.',
    tags: ['Pollen', 'Botany', 'Structure', 'Plant Biology']
  },
  {
    id: '5',
    title: 'Crystalline Formation',
    description: 'Salt crystals forming beautiful geometric patterns under polarized light.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop',
    author: 'Chemistry Students',
    location: 'Stanford University',
    date: '1 week ago',
    applause: 15,
    comments: 3,
    category: 'educational' as const,
    magnification: '100x',
    organism: 'Sodium Chloride Crystals',
    technique: 'Polarized Light',
    significance: 'Perfect demonstration of crystal lattice structures and the beauty of molecular organization.',
    tags: ['Crystals', 'Chemistry', 'Polarized Light', 'Geometry']
  },
  {
    id: '6',
    title: 'Euglena Movement Study',
    description: 'Time-lapse study of Euglena gracilis showing flagellar movement and phototaxis.',
    image: 'https://images.unsplash.com/photo-1578761499019-d8c7c38ba8e0?w=400&h=400&fit=crop',
    author: 'Dr. James Liu',
    location: 'Harvard Medical School',
    date: '4 days ago',
    applause: 28,
    comments: 9,
    category: 'research' as const,
    magnification: '800x',
    organism: 'Euglena gracilis',
    technique: 'Differential Interference Contrast',
    significance: 'This study reveals how single-celled organisms navigate toward light sources for photosynthesis.',
    tags: ['Euglena', 'Movement', 'Flagella', 'Phototaxis']
  }
];

const featuredDiscovery = mockDiscoveries[0];

interface FilterState {
  search: string;
  category: string;
  dateRange: string;
  location: string;
  magnification: string;
  organism: string;
  sortBy: string;
}

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    dateRange: 'all',
    location: '',
    magnification: 'all',
    organism: '',
    sortBy: 'newest'
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort discoveries
  const filteredDiscoveries = useMemo(() => {
    let filtered = mockDiscoveries.filter(discovery => {
      // Skip featured discovery in regular list
      if (discovery.id === featuredDiscovery.id) return false;
      
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchableText = [
          discovery.title,
          discovery.description,
          discovery.author,
          discovery.organism || '',
          discovery.technique || '',
          ...(discovery.tags || [])
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(searchTerm)) return false;
      }

      // Category filter
      if (filters.category !== 'all' && discovery.category !== filters.category) {
        return false;
      }

      return true;
    });

    // Sort discoveries
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'popular':
          return (b.applause + b.comments) - (a.applause + a.comments);
        case 'applause':
          return b.applause - a.applause;
        case 'commented':
          return b.comments - a.comments;
        case 'newest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [filters]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'all') count++;
    if (filters.dateRange !== 'all') count++;
    if (filters.location) count++;
    if (filters.magnification !== 'all') count++;
    if (filters.organism) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen bg-background pattern-microscopy science-glow">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/90 backdrop-blur-xl sticky top-0 z-40 shadow-glow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
                <Microscope className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Microcosmos
                </h1>
                <p className="text-sm text-primary/80 font-medium">Discover the invisible world</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="flex items-center gap-2 bg-primary/20 text-primary border-primary/30">
                <Sparkles className="w-4 h-4" />
                {mockDiscoveries.length} Discoveries
              </Badge>
              
              <div className="flex items-center bg-muted/50 rounded-lg p-1 border border-border/50">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Discovery */}
        <FeaturedDiscovery {...featuredDiscovery} />

        {/* Filters */}
        <DiscoveryFilters 
          filters={filters}
          onFiltersChange={setFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">
              Latest Discoveries
            </h2>
            <Badge variant="outline" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {filteredDiscoveries.length} Results
            </Badge>
          </div>
        </div>

        {/* Discovery Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredDiscoveries.map((discovery, index) => (
            <div
              key={discovery.id}
              className="animate-discovery-appear"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <DiscoveryCard
                {...discovery}
              />
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredDiscoveries.length > 0 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4" />
              Load More Discoveries
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredDiscoveries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No discoveries found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({
                search: '',
                category: 'all',
                dateRange: 'all',
                location: '',
                magnification: 'all',
                organism: '',
                sortBy: 'newest'
              })}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
