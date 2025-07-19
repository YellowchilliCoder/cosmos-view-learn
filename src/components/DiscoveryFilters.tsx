import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Award, 
  Microscope, 
  Zap, 
  User, 
  Calendar,
  MapPin,
  Settings2,
  X
} from 'lucide-react';

interface FilterState {
  search: string;
  category: string;
  dateRange: string;
  location: string;
  magnification: string;
  organism: string;
  sortBy: string;
}

interface DiscoveryFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFiltersCount: number;
}

const categoryOptions = [
  { value: 'all', label: 'All Discoveries', icon: Filter },
  { value: 'rare', label: 'Rare Discoveries', icon: Award },
  { value: 'common', label: 'Common Species', icon: Microscope },
  { value: 'educational', label: 'Educational', icon: Zap },
  { value: 'research', label: 'Research', icon: User },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'applause', label: 'Most Applauded' },
  { value: 'commented', label: 'Most Discussed' },
];

const magnificationRanges = [
  { value: 'all', label: 'All Magnifications' },
  { value: 'low', label: '10x - 50x' },
  { value: 'medium', label: '50x - 200x' },
  { value: 'high', label: '200x - 1000x' },
  { value: 'ultra', label: '1000x+' },
];

const popularOrganisms = [
  'Paramecium', 'Amoeba', 'Euglena', 'Volvox', 'Diatoms', 
  'Bacteria', 'Pollen', 'Crystals', 'Tardigrades'
];

export function DiscoveryFilters({ filters, onFiltersChange, activeFiltersCount }: DiscoveryFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedOrganisms, setSelectedOrganisms] = useState<string[]>([]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      category: 'all',
      dateRange: 'all',
      location: '',
      magnification: 'all',
      organism: '',
      sortBy: 'newest'
    });
    setSelectedOrganisms([]);
  };

  const toggleOrganism = (organism: string) => {
    const updated = selectedOrganisms.includes(organism)
      ? selectedOrganisms.filter(o => o !== organism)
      : [...selectedOrganisms, organism];
    
    setSelectedOrganisms(updated);
    updateFilter('organism', updated.join(','));
  };

  return (
    <Card className="p-6 mb-6 border-0 shadow-discovery">
      <div className="space-y-4">
        {/* Search and Quick Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search discoveries, organisms, or techniques..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
          
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger className="w-48 bg-muted/50 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Settings2 className="w-4 h-4" />
            Advanced
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            {categoryOptions.map(option => {
              const Icon = option.icon;
              return (
                <TabsTrigger 
                  key={option.value} 
                  value={option.value}
                  className="flex items-center gap-2 text-xs"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{option.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Range */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date Range
                </label>
                <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <Input
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => updateFilter('location', e.target.value)}
                />
              </div>

              {/* Magnification */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Microscope className="w-4 h-4" />
                  Magnification
                </label>
                <Select value={filters.magnification} onValueChange={(value) => updateFilter('magnification', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select magnification" />
                  </SelectTrigger>
                  <SelectContent>
                    {magnificationRanges.map(range => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Organism Tags */}
            <div>
              <label className="text-sm font-medium mb-2 block">Popular Organisms</label>
              <div className="flex flex-wrap gap-2">
                {popularOrganisms.map(organism => (
                  <Badge
                    key={organism}
                    variant={selectedOrganisms.includes(organism) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => toggleOrganism(organism)}
                  >
                    {organism}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
            <span className="text-sm text-primary font-medium">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:text-primary-foreground hover:bg-primary ml-auto"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}