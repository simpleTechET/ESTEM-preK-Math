import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface SortingItem {
  id: number;
  name: string;
  image: string;
  belongsToGroup: boolean;
}

interface SortingGameProps {
  items: SortingItem[];
  groupName: string;
  instruction: string;
  onComplete?: () => void;
}

const SortingGame = ({ items, groupName, instruction, onComplete }: SortingGameProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleItemClick = (item: SortingItem) => {
    if (selectedItems.includes(item.id)) {
      // Deselect item
      setSelectedItems(selectedItems.filter(id => id !== item.id));
    } else {
      // Select item
      setSelectedItems([...selectedItems, item.id]);
      
      if (item.belongsToGroup) {
        toast.success("Good choice! 🎉", {
          description: `${item.name} belongs in this group!`,
        });
      } else {
        toast.error("Not quite! 💭", {
          description: `Does ${item.name} really belong in the ${groupName} group?`,
        });
      }
    }
  };

  const handleCheckAnswer = () => {
    const correctItems = items.filter(item => item.belongsToGroup).map(item => item.id);
    const isCorrect = correctItems.length === selectedItems.length && 
                      correctItems.every(id => selectedItems.includes(id));

    if (isCorrect) {
      setIsComplete(true);
      toast.success("Perfect! 🌟", {
        description: "You sorted all the objects correctly!",
      });
      setTimeout(() => {
        onComplete?.();
      }, 2000);
    } else {
      toast.error("Try again! 🤔", {
        description: "Look carefully at which objects belong together.",
      });
    }
  };

  const correctCount = items.filter(item => item.belongsToGroup).length;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎯</div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">{instruction}</h3>
            <p className="text-gray-700">
              Click on all the objects that belong in the <strong>{groupName}</strong> group!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Hint: There are {correctCount} correct objects to find.
            </p>
          </div>
        </div>
      </Card>

      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Selected: <span className="font-semibold text-foreground">{selectedItems.length}</span>
        </div>
        <Button 
          onClick={handleCheckAnswer}
          disabled={selectedItems.length === 0 || isComplete}
          className="bg-primary hover:bg-primary/90"
        >
          Check My Answer
        </Button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          
          return (
            <Card
              key={item.id}
              onClick={() => !isComplete && handleItemClick(item)}
              className={`
                relative aspect-square cursor-pointer transition-all duration-300
                ${isSelected ? 'border-primary border-4 scale-105 bg-primary/5' : 'hover:scale-105 hover:shadow-lg'}
                ${isComplete && item.belongsToGroup ? 'border-success border-4 bg-success/10' : ''}
                ${isComplete && !item.belongsToGroup ? 'opacity-40' : ''}
              `}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="text-sm font-medium text-center text-gray-700">
                  {item.name}
                </p>
              </div>
              {isComplete && item.belongsToGroup && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-8 h-8 text-success fill-success/20" />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <Card className="p-8 text-center bg-gradient-to-br from-success/10 to-primary/10 border-2 border-success">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">Amazing Work!</h3>
          <p className="text-muted-foreground mb-4">
            You made one group of {groupName}! Great sorting!
          </p>
        </Card>
      )}
    </div>
  );
};

export default SortingGame;
