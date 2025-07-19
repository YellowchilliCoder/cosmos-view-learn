import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Microscope, 
  Award, 
  Calendar,
  User,
  MapPin,
  Zap,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedDiscoveryProps {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  location: string;
  date: string;
  applause: number;
  comments: number;
  magnification: string;
  organism: string;
  technique: string;
  significance: string;
  tags: string[];
}

export function FeaturedDiscovery({
  id,
  title,
  description,
  image,
  author,
  location,
  date,
  applause,
  comments,
  magnification,
  organism,
  technique,
  significance,
  tags
}: FeaturedDiscoveryProps) {
  return (
    <Card className="mb-8 overflow-hidden border-0 shadow-glow bg-gradient-discovery">
      <div className="p-1 rounded-2xl">
        <div className="bg-background rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-square md:aspect-auto">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
              />
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-primary text-primary-foreground flex items-center gap-2 px-3 py-1.5">
                  <Award className="w-4 h-4" />
                  Featured Discovery
                </Badge>
              </div>

              {/* Technical Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Microscope className="w-4 h-4" />
                      <span>{magnification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>{technique}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    {title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Organism Highlight */}
                <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="font-medium text-primary">Organism</span>
                  </div>
                  <h3 className="text-lg font-semibold">{organism}</h3>
                </div>

                {/* Significance */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2 text-accent-foreground">Why This Matters</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {significance}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="space-y-4">
                {/* Meta Info */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-medium">{applause}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{comments}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}