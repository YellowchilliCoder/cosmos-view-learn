import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Microscope, Calendar, User, MapPin, Award, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DiscoveryCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  location?: string;
  date: string;
  applause: number;
  comments: number;
  category: 'rare' | 'common' | 'educational' | 'research';
  featured?: boolean;
  isNew?: boolean;
  magnification?: string;
  organism?: string;
  technique?: string;
  tags?: string[];
}

const categoryIcons = {
  rare: Award,
  common: Microscope,
  educational: Zap,
  research: User
};

const categoryLabels = {
  rare: 'Rare Discovery',
  common: 'Common Species',
  educational: 'Educational',
  research: 'Research'
};

export function DiscoveryCard({
  id,
  title,
  description,
  image,
  author,
  location,
  date,
  applause,
  comments,
  category,
  featured = false,
  isNew = false,
  magnification,
  organism,
  technique,
  tags = []
}: DiscoveryCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(applause);

  const CategoryIcon = categoryIcons[category];

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Share functionality
  };

  return (
    <Card 
      className={cn(
        "discovery-card group cursor-pointer overflow-hidden border-0 rounded-2xl",
        featured && "discovery-glow float-animation",
        isNew && "discovery-pulse"
      )}
    >
      {/* Image Container with Overlay Info */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            {magnification && (
              <div className="flex items-center gap-2 mb-2">
                <Microscope className="w-4 h-4" />
                <span className="text-sm font-medium">{magnification}</span>
              </div>
            )}
            {technique && (
              <div className="text-xs opacity-90">{technique}</div>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant="secondary" 
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1",
              category === 'rare' && "bg-discovery-rare/20 text-discovery-rare border-discovery-rare/30",
              category === 'common' && "bg-discovery-common/20 text-discovery-common border-discovery-common/30",
              category === 'educational' && "bg-discovery-educational/20 text-discovery-educational border-discovery-educational/30",
              category === 'research' && "bg-discovery-research/20 text-discovery-research border-discovery-research/30"
            )}
          >
            <CategoryIcon className="w-3 h-3" />
            <span className="text-xs font-medium">{categoryLabels[category]}</span>
          </Badge>
        </div>

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-accent text-accent-foreground animate-pulse">
              New
            </Badge>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white"
            onClick={handleLike}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-red-500 text-red-500")} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 rounded-full bg-white/90 hover:bg-white"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Organism Info */}
        {organism && (
          <div className="mb-3 p-2 bg-muted/50 rounded-lg">
            <span className="text-xs font-medium text-primary">Organism:</span>
            <span className="text-sm ml-2">{organism}</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{author}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{location}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {likeCount}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}