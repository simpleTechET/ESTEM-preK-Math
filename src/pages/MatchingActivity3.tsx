import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, BookOpen, Users, Lightbulb } from "lucide-react";
import MatchingGame from "@/components/MatchingGame";
import appleSmall from "@/assets/apple-small.png";
import appleLarge from "@/assets/apple-large.png";
import bananaSmall from "@/assets/banana-small.png";
import bananaLarge from "@/assets/banana-large.png";
import orangeSmall from "@/assets/orange-small.png";
import orangeLarge from "@/assets/orange-large.png";

const MatchingActivity3 = () => {
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const matchingItems = [
    { id: 1, image: appleSmall, matchId: "apple" },
    { id: 2, image: appleLarge, matchId: "apple" },
    { id: 3, image: bananaSmall, matchId: "banana" },
    { id: 4, image: bananaLarge, matchId: "banana" },
    { id: 5, image: orangeSmall, matchId: "orange" },
    { id: 6, image: orangeLarge, matchId: "orange" },
  ];

  const handleComplete = () => {
    navigate("/activities");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate("/activities")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                Lesson 3
              </span>
              <h1 className="text-2xl font-bold text-gray-800">Match Fruits</h1>
            </div>
            <p className="text-sm text-gray-600">Topic A: Matching Objects</p>
          </div>
        </div>

        {!showGame ? (
          <div className="space-y-6">
            {/* Learning Objective */}
            <Card className="border-2 border-green-200 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-green-700">
                  <Star className="w-6 h-6" />
                  Learning Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700">
                  Today, your child will learn to <span className="font-bold text-green-700">match objects that are the same but different sizes</span>. 
                  They'll match fruits that are the same type, even when one is bigger or smaller!
                </p>
              </CardContent>
            </Card>

            {/* Introduction */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Same, But Different!</CardTitle>
                <CardDescription>Read this together with your child</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <p className="text-lg text-gray-700 mb-4">
                    In Lesson 2, we learned that things can be <strong>the same</strong> even if they're <strong>different sizes</strong>.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Today, we'll practice with <strong>fruits</strong>! We'll find apples, bananas, and oranges that match - even when one is small and one is big!
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      🍎 Apples
                    </h4>
                    <p className="text-sm text-gray-600">
                      A small apple and a big apple are <strong>still both apples</strong>!<br/>
                      They match because they're the same fruit.
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      🍌 Bananas
                    </h4>
                    <p className="text-sm text-gray-600">
                      A small banana and a big banana are <strong>still both bananas</strong>!<br/>
                      They match because they're the same fruit.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      🍊 Oranges
                    </h4>
                    <p className="text-sm text-gray-600">
                      A small orange and a big orange are <strong>still both oranges</strong>!<br/>
                      They match because they're the same fruit.
                    </p>
                  </div>
                </div>

                {/* Parent Tips */}
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Parent Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Encourage your child to say: "They're both [fruit name]!"</li>
                      <li>• Ask: "Are they exactly the same size? What's different?"</li>
                      <li>• Help them notice: "This one is small, this one is big, but they're both..."</li>
                      <li>• Practice at home: Find items that are the same but different sizes</li>
                    </ul>
                  </div>
                </div>

                {/* Key Vocabulary */}
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-800">Key Words to Practice</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Same</p>
                      <p className="text-sm text-gray-600">They're both apples, bananas, or oranges</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Different Size</p>
                      <p className="text-sm text-gray-600">One is small, one is big</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Match</p>
                      <p className="text-sm text-gray-600">They go together</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <p className="font-bold text-green-700">Fruit</p>
                      <p className="text-sm text-gray-600">Apples, bananas, and oranges are fruits</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Start Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowGame(true)}
                className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Matching Activity
              </Button>
            </div>
          </div>
        ) : (
          <Card className="p-6 md:p-8 bg-white shadow-lg">
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  🍎 Match the Fruits
                </h2>
                <p className="text-gray-700 mb-4">
                  Look carefully at each fruit. Find the pairs that are the <strong>same type</strong> but <strong>different sizes</strong>!
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Find two apples - they're the same, but one is bigger!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Find two bananas - they're the same, but different sizes!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Find two oranges - they're the same, but one is larger!</span>
                  </li>
                </ul>
              </div>

              <MatchingGame items={matchingItems} onComplete={handleComplete} />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MatchingActivity3;
