import { Card, Badge } from "konsta/react";
import { User, Heart, Calendar } from "lucide-react";

interface PatientProfileCardProps {
  name: string;
  age: number;
  bloodGroup: string;
  gender: string;
  photo?: string;
  isMain?: boolean;
  onClick?: () => void;
}

const PatientProfileCard = ({
  name,
  age,
  bloodGroup,
  gender,
  photo,
  isMain = false,
  onClick
}: PatientProfileCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all ${isMain ? 'ring-2 ring-life-green' : ''}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{name}</h3>
              {isMain && (
                <Badge colors={{ bg: "bg-life-green", text: "text-white" }}>
                  Primary
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {age} years
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {bloodGroup}
              </span>
              <span className="capitalize">{gender}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientProfileCard;
