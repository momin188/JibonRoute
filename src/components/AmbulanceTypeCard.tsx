import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Info } from "lucide-react";

interface AmbulanceTypeCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  popular?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onInfoClick?: () => void;
}

const AmbulanceTypeCard = ({
  name,
  description,
  price,
  features,
  image,
  popular = false,
  selected = false,
  onClick,
  onInfoClick
}: AmbulanceTypeCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md relative ${
        selected 
          ? 'ring-2 ring-life-green bg-life-green/5' 
          : 'hover:bg-muted/50'
      }`}
      onClick={onClick}
    >
      {popular && (
        <Badge className="absolute -top-2 left-4 bg-life-green text-white z-10">
          Most Popular
        </Badge>
      )}
      <CardContent className="p-0 overflow-hidden">
        <div className="space-y-3">
          <div className="relative h-32 overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            {onInfoClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onInfoClick();
                }}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
              >
                <Info className="w-4 h-4 text-life-green" />
              </button>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{name}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-life-green">{price}</div>
                <div className="text-xs text-muted-foreground">Estimated</div>
              </div>
            </div>
            <div className="space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-3 h-3 text-life-green" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbulanceTypeCard;
