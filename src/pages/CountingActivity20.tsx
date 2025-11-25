import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Circle, Users, IceCream, Cake, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";

const CountingActivity20 = () => {
  const [currentActivity, setCurrentActivity] = useState("intro");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Lesson 20</h1>
            <p className="text-sm text-muted-foreground">Arrange and Count 5 Objects in a Circle</p>
          </div>
          <div className="w-24" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="intro" value={currentActivity} onValueChange={setCurrentActivity}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="fluency">Fluency</TabsTrigger>
            <TabsTrigger value="family">Family Photo</TabsTrigger>
            <TabsTrigger value="circle">Circle Games</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="intro">
            <IntroductionSection />
          </TabsContent>

          <TabsContent value="fluency">
            <FluencyPractice />
          </TabsContent>

          <TabsContent value="family">
            <FamilyPhotoActivity />
          </TabsContent>

          <TabsContent value="circle">
            <CircleGamesActivity />
          </TabsContent>

          <TabsContent value="practice">
            <PracticeActivity />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const IntroductionSection = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Circle className="w-6 h-6" />
        Lesson Objective
      </CardTitle>
      <CardDescription>Learning to count objects arranged in a circle</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="bg-accent/20 p-6 rounded-lg">
        <h3 className="font-bold text-lg mb-3">🎯 Today's Goal</h3>
        <p className="text-lg">Arrange and count 5 objects in a circular configuration.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">⏱️ Lesson Structure (25 minutes)</h4>
          <ul className="space-y-2 text-sm">
            <li>• Fluency Practice (6 min)</li>
            <li>• Application Problem (2 min)</li>
            <li>• Concept Development (14 min)</li>
            <li>• Student Debrief (3 min)</li>
          </ul>
        </div>

        <div className="bg-card p-4 rounded-lg border border-border">
          <h4 className="font-semibold mb-2">🎓 Key Concept</h4>
          <p className="text-sm">
            When counting objects in a circle, we need to mark where we start so we know when to stop counting!
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">🎪 Today's Context</h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          We'll be learning about carnivals and carousels! A carousel is a merry-go-round with animals and horses that go around in a circle.
        </p>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">Click the tabs above to start the activities!</p>
      </div>
    </CardContent>
  </Card>
);

const FluencyPractice = () => {
  const [cubeCount, setCubeCount] = useState(0);
  const [cups, setCups] = useState([0, 0, 0]);
  const [currentCup, setCurrentCup] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [baggieObjects, setBaggieObjects] = useState(0);
  const [baggieAnswer, setBaggieAnswer] = useState<number | null>(null);
  const [baggieFeedback, setBaggieFeedback] = useState<"correct" | "incorrect" | null>(null);

  const resetIceCubes = () => {
    setCups([0, 0, 0]);
    setCurrentCup(0);
    setCubeCount(Math.floor(Math.random() * 3) + 1);
    setShowFeedback(false);
  };

  const addCubeToCup = (cupIndex: number) => {
    if (cups[cupIndex] < 3) {
      const newCups = [...cups];
      newCups[cupIndex]++;
      setCups(newCups);
    }
  };

  const removeCubeFromCup = (cupIndex: number) => {
    if (cups[cupIndex] > 0) {
      const newCups = [...cups];
      newCups[cupIndex]--;
      setCups(newCups);
    }
  };

  const checkIceCubes = () => {
    setShowFeedback(true);
  };

  const startBaggieBuddies = () => {
    setBaggieObjects(Math.floor(Math.random() * 3) + 1);
    setBaggieAnswer(null);
    setBaggieFeedback(null);
  };

  const checkBaggieAnswer = (answer: number) => {
    setBaggieAnswer(answer);
    setBaggieFeedback(answer === baggieObjects ? "correct" : "incorrect");
  };

  const isIceCubesCorrect = cups[currentCup] === cubeCount;

  useState(() => {
    resetIceCubes();
    startBaggieBuddies();
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IceCream className="w-6 h-6" />
            Counting Ice Cubes to 3
          </CardTitle>
          <CardDescription>Fill the cup with the right number of ice cubes (3 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center bg-accent/20 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Fill the cup with</p>
              <p className="text-6xl font-bold text-primary">{cubeCount}</p>
              <p className="text-lg font-semibold mt-2">ice cube{cubeCount !== 1 ? 's' : ''}</p>
            </div>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="w-32 h-40 bg-gradient-to-b from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 rounded-b-3xl border-4 border-blue-400 dark:border-blue-600 flex flex-col-reverse items-center p-2 gap-1">
                  {Array.from({ length: cups[currentCup] }).map((_, idx) => (
                    <div key={idx} className="w-20 h-10 bg-blue-100 dark:bg-blue-400 rounded border-2 border-blue-300 dark:border-blue-500" />
                  ))}
                </div>
                <div className="mt-4 flex gap-2 justify-center">
                  <Button onClick={() => addCubeToCup(currentCup)} disabled={cups[currentCup] >= 3}>
                    Add Cube
                  </Button>
                  <Button onClick={() => removeCubeFromCup(currentCup)} disabled={cups[currentCup] === 0} variant="outline">
                    Remove
                  </Button>
                </div>
                <p className="mt-2 font-bold text-xl">Count: {cups[currentCup]}</p>
              </div>
            </div>

            {!showFeedback ? (
              <div className="flex justify-center">
                <Button onClick={checkIceCubes} size="lg">
                  Check My Answer
                </Button>
              </div>
            ) : (
              <div className={`p-4 rounded-lg text-center ${isIceCubesCorrect ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-red-500/20 text-red-700 dark:text-red-300"}`}>
                <p className="font-bold text-lg mb-2">
                  {isIceCubesCorrect ? "✓ Perfect! You counted correctly!" : "✗ Not quite! Try again."}
                </p>
                <Button onClick={resetIceCubes} variant="outline" className="mt-2">
                  Try Another One
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            Baggie Buddies
          </CardTitle>
          <CardDescription>Match the number to the quantity (3 minutes)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">How many objects do you see?</p>
              <div className="flex justify-center gap-3 mb-6">
                {Array.from({ length: baggieObjects }).map((_, idx) => (
                  <div key={idx} className="text-6xl">🍃</div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((num) => (
                <Button
                  key={num}
                  onClick={() => checkBaggieAnswer(num)}
                  variant={baggieAnswer === num ? (baggieFeedback === "correct" ? "default" : "destructive") : "outline"}
                  className="w-20 h-20 text-3xl font-bold"
                  disabled={baggieFeedback !== null}
                >
                  {num}
                </Button>
              ))}
            </div>

            {baggieFeedback && (
              <div className={`p-4 rounded-lg text-center ${baggieFeedback === "correct" ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-red-500/20 text-red-700 dark:text-red-300"}`}>
                <p className="font-bold text-lg mb-2">
                  {baggieFeedback === "correct" ? "✓ Excellent matching!" : "✗ Try counting again!"}
                </p>
                <Button onClick={startBaggieBuddies} variant="outline" className="mt-2">
                  Next Question
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FamilyPhotoActivity = () => {
  const [selectedGroups, setSelectedGroups] = useState<{ group1: any[], group2: any[] }>({ group1: [], group2: [] });
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const [showCounts, setShowCounts] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  const familyMembers = [
    { id: 1, type: "adult", gender: "female", hat: false, emoji: "👩" },
    { id: 2, type: "adult", gender: "male", hat: true, emoji: "👨" },
    { id: 3, type: "child", gender: "female", hat: false, emoji: "👧" },
    { id: 4, type: "child", gender: "male", hat: false, emoji: "👦" },
    { id: 5, type: "child", gender: "female", hat: true, emoji: "👧" },
  ];

  const sortOptions = [
    { label: "Adults vs Children", criteria: "type" },
    { label: "Boys vs Girls", criteria: "gender" },
    { label: "Wearing Hat vs No Hat", criteria: "hat" },
  ];

  const applySorting = (criteria: string) => {
    setSortCriteria(criteria);
    setShowCounts(false);
    setShowTotal(false);
    
    if (criteria === "type") {
      setSelectedGroups({
        group1: familyMembers.filter(m => m.type === "adult"),
        group2: familyMembers.filter(m => m.type === "child"),
      });
    } else if (criteria === "gender") {
      setSelectedGroups({
        group1: familyMembers.filter(m => m.gender === "female"),
        group2: familyMembers.filter(m => m.gender === "male"),
      });
    } else if (criteria === "hat") {
      setSelectedGroups({
        group1: familyMembers.filter(m => m.hat),
        group2: familyMembers.filter(m => !m.hat),
      });
    }
  };

  const getGroupLabels = () => {
    if (sortCriteria === "type") return ["👨‍👩 Adults", "👧‍👦 Children"];
    if (sortCriteria === "gender") return ["👧 Girls", "👦 Boys"];
    if (sortCriteria === "hat") return ["🎩 Wearing Hat", "🙅 No Hat"];
    return ["Group 1", "Group 2"];
  };

  const labels = getGroupLabels();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          Family Photo Activity
        </CardTitle>
        <CardDescription>Count the family and make groups (2 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-8 rounded-lg border-2 border-amber-200 dark:border-amber-800">
          <h3 className="text-center font-bold text-xl mb-4">📸 Family Photo</h3>
          <p className="text-center text-sm text-muted-foreground mb-4">[Teacher: Display your family photo here]</p>
          <div className="flex justify-center gap-4 text-7xl">
            {familyMembers.map((member) => (
              <div key={member.id} className="relative">
                {member.emoji}
                {member.hat && <div className="absolute -top-2 -right-1 text-3xl">🎩</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold mb-2">How many people are in the family?</p>
          <p className="text-6xl font-bold text-primary">{familyMembers.length}</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-center">How can we make this family into two groups?</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {sortOptions.map((option) => (
              <Button
                key={option.criteria}
                onClick={() => applySorting(option.criteria)}
                variant={sortCriteria === option.criteria ? "default" : "outline"}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {sortCriteria && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {[selectedGroups.group1, selectedGroups.group2].map((group, idx) => (
                <div key={idx} className="bg-accent/20 p-6 rounded-lg border-2 border-primary/30">
                  <h4 className="font-bold text-lg mb-4 text-center">{labels[idx]}</h4>
                  <div className="flex justify-center gap-3 flex-wrap min-h-[100px] items-center">
                    {group.map((member) => (
                      <div key={member.id} className="relative text-6xl">
                        {member.emoji}
                        {member.hat && <div className="absolute -top-1 -right-1 text-2xl">🎩</div>}
                      </div>
                    ))}
                  </div>
                  {showCounts && (
                    <p className="text-center mt-4 text-3xl font-bold text-primary">
                      {group.length}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              {!showCounts && (
                <Button onClick={() => setShowCounts(true)} size="lg">
                  Count Each Group
                </Button>
              )}
              {showCounts && !showTotal && (
                <Button onClick={() => setShowTotal(true)} size="lg">
                  Put Groups Back Together
                </Button>
              )}
              {showTotal && (
                <div className="bg-green-500/20 text-green-700 dark:text-green-300 p-6 rounded-lg text-center">
                  <p className="font-bold text-lg mb-2">
                    When we put the groups back together:
                  </p>
                  <p className="text-4xl font-bold">
                    {selectedGroups.group1.length} + {selectedGroups.group2.length} = {familyMembers.length}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const CircleGamesActivity = () => {
  const [duckDuckCount, setDuckDuckCount] = useState(0);
  const [markedStart, setMarkedStart] = useState(false);
  const [countingPastFive, setCountingPastFive] = useState(false);
  const [merryGoRound, setMerryGoRound] = useState({ 
    bears: ["🧸", "🐻", "🐻‍❄️", "🐨", "🧸"], 
    marked: null as number | null, 
    counting: false, 
    count: 0 
  });
  const [tableCount, setTableCount] = useState({ 
    marked: null as number | null, 
    count: 0, 
    complete: false 
  });

  const friends = ["👧", "👦", "👨", "👩", "🧒"];
  const plates = ["🍽️", "🍽️", "🍽️", "🍽️", "🍽️"];

  const startDuckDuck = () => {
    setDuckDuckCount(0);
    setMarkedStart(false);
    setCountingPastFive(false);
  };

  const countFriend = () => {
    if (duckDuckCount < 5 || !markedStart) {
      setDuckDuckCount(prev => prev + 1);
      if (duckDuckCount >= 5 && !markedStart) {
        setCountingPastFive(true);
      }
    }
  };

  const markStartDuck = () => {
    setMarkedStart(true);
    setDuckDuckCount(0);
    setCountingPastFive(false);
  };

  const setupMerryGoRound = () => {
    setMerryGoRound({ bears: ["🧸", "🐻", "🐻‍❄️", "🐨", "🧸"], marked: null, counting: false, count: 0 });
  };

  const markStartBear = (index: number) => {
    setMerryGoRound({ ...merryGoRound, marked: index, counting: false, count: 0 });
  };

  const countBears = () => {
    if (merryGoRound.marked !== null && merryGoRound.count < 5) {
      setMerryGoRound({ ...merryGoRound, counting: true, count: merryGoRound.count + 1 });
    }
  };

  const resetMerryGoRound = () => {
    setMerryGoRound({ ...merryGoRound, counting: false, count: 0 });
  };

  const markPlate = (index: number) => {
    if (tableCount.marked === null) {
      setTableCount({ marked: index, count: 0, complete: false });
    }
  };

  const countPlates = () => {
    if (tableCount.marked !== null && tableCount.count < 5) {
      setTableCount({ ...tableCount, count: tableCount.count + 1 });
      if (tableCount.count + 1 === 5) {
        setTableCount({ ...tableCount, count: 5, complete: true });
      }
    }
  };

  const resetTable = () => {
    setTableCount({ marked: null, count: 0, complete: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle className="w-6 h-6" />
          Circle Counting Games
        </CardTitle>
        <CardDescription>Learn to count objects arranged in circles (14 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Duck Duck Goose */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border-2 border-green-200 dark:border-green-800">
          <h3 className="font-bold text-xl mb-4 text-center">🎮 Duck-Duck-Goose Circle</h3>
          <p className="text-center text-sm mb-6">5 friends are playing in a circle</p>
          
          <div className="relative w-80 h-80 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-400 dark:border-green-600"></div>
            {friends.map((friend, idx) => {
              const angle = (idx * 72 - 90) * (Math.PI / 180);
              const x = 140 + 120 * Math.cos(angle);
              const y = 140 + 120 * Math.sin(angle);
              return (
                <div
                  key={idx}
                  className={`absolute text-6xl transition-all ${idx === 0 && markedStart ? 'scale-125' : ''}`}
                  style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                >
                  {friend}
                  {idx === 0 && markedStart && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl">🎩</div>}
                  {duckDuckCount > idx && markedStart && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl">{idx + 1}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center space-y-4">
            <p className="font-semibold">Count: {duckDuckCount}</p>
            {countingPastFive && (
              <div className="bg-red-500/20 text-red-700 dark:text-red-300 p-3 rounded">
                <p className="font-bold">⚠️ We need to mark where we started!</p>
              </div>
            )}
            <div className="flex justify-center gap-3 flex-wrap">
              {!markedStart ? (
                <>
                  <Button onClick={countFriend}>Tap & Count</Button>
                  <Button onClick={markStartDuck} variant="outline">Mark the Start</Button>
                </>
              ) : (
                <>
                  <Button onClick={countFriend} disabled={duckDuckCount >= 5}>
                    Count Friend
                  </Button>
                  <Button onClick={startDuckDuck} variant="outline">
                    Reset
                  </Button>
                </>
              )}
            </div>
            {duckDuckCount === 5 && markedStart && (
              <div className="bg-green-500/20 text-green-700 dark:text-green-300 p-4 rounded-lg">
                <p className="font-bold text-lg">✓ Perfect! There are 5 friends!</p>
              </div>
            )}
          </div>
        </div>

        {/* Merry-Go-Round */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border-2 border-purple-200 dark:border-purple-800">
          <h3 className="font-bold text-xl mb-4 text-center">🎠 Carousel Merry-Go-Round</h3>
          <p className="text-center text-sm mb-6">Bear friends riding the carousel</p>
          
          <div className="relative w-80 h-80 mx-auto mb-6 bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-full border-8 border-amber-400 dark:border-amber-600">
            {merryGoRound.bears.map((bear, idx) => {
              const angle = (idx * 72 - 90) * (Math.PI / 180);
              const x = 140 + 110 * Math.cos(angle);
              const y = 140 + 110 * Math.sin(angle);
              return (
                <button
                  key={idx}
                  onClick={() => markStartBear(idx)}
                  disabled={merryGoRound.marked !== null && merryGoRound.marked !== idx}
                  className={`absolute text-6xl transition-all hover:scale-110 ${
                    merryGoRound.marked === idx ? 'scale-125' : ''
                  }`}
                  style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                >
                  {bear}
                  {merryGoRound.marked === idx && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">📍</div>
                  )}
                  {merryGoRound.counting && idx < merryGoRound.count && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl font-bold bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                      {idx + 1}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-center space-y-4">
            <p className="font-semibold">Bears Counted: {merryGoRound.count}</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {merryGoRound.marked === null ? (
                <p className="text-muted-foreground">Click a bear to mark the start!</p>
              ) : (
                <>
                  <Button onClick={countBears} disabled={merryGoRound.count >= 5}>
                    Count Next Bear
                  </Button>
                  <Button onClick={resetMerryGoRound} variant="outline">
                    Reset Count
                  </Button>
                  <Button onClick={setupMerryGoRound} variant="secondary">
                    New Round
                  </Button>
                </>
              )}
            </div>
            {merryGoRound.count === 5 && (
              <div className="bg-green-500/20 text-green-700 dark:text-green-300 p-4 rounded-lg">
                <p className="font-bold text-lg">✓ Great! There are 5 bears on the carousel!</p>
              </div>
            )}
          </div>
        </div>

        {/* Table Setting */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-xl mb-4 text-center">🍽️ Setting the Table</h3>
          <p className="text-center text-sm mb-6">Jordan helped set the table. Count the plates!</p>
          
          <div className="relative w-96 h-96 mx-auto mb-6">
            <div className="absolute inset-8 bg-gradient-to-br from-amber-700 to-amber-900 dark:from-amber-800 dark:to-amber-950 rounded-full border-8 border-amber-500 dark:border-amber-700"></div>
            {plates.map((plate, idx) => {
              const angle = (idx * 72 - 90) * (Math.PI / 180);
              const x = 192 + 140 * Math.cos(angle);
              const y = 192 + 140 * Math.sin(angle);
              return (
                <button
                  key={idx}
                  onClick={() => markPlate(idx)}
                  disabled={tableCount.marked !== null && tableCount.marked !== idx}
                  className={`absolute text-6xl transition-all hover:scale-110 ${
                    tableCount.marked === idx ? 'scale-125' : ''
                  }`}
                  style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                >
                  {plate}
                  {tableCount.marked === idx && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">🔴</div>
                  )}
                  {tableCount.count > idx && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl font-bold bg-white dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center">
                      {idx + 1}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-center space-y-4">
            <p className="font-semibold">Plates Counted: {tableCount.count}</p>
            <div className="flex justify-center gap-3 flex-wrap">
              {tableCount.marked === null ? (
                <p className="text-muted-foreground">Click a plate to mark the start!</p>
              ) : (
                <>
                  <Button onClick={countPlates} disabled={tableCount.count >= 5}>
                    Count Next Plate
                  </Button>
                  <Button onClick={resetTable} variant="outline">
                    Reset Count
                  </Button>
                </>
              )}
            </div>
            {tableCount.complete && (
              <div className="bg-green-500/20 text-green-700 dark:text-green-300 p-4 rounded-lg">
                <p className="font-bold text-lg">✓ Excellent! There are 5 plates on the table!</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PracticeActivity = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [selectedSets, setSelectedSets] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const problems = [
    {
      title: "Strawberries",
      items: Array(5).fill("🍓"),
      correctSets: [0, 2, 4],
      description: "Color the sets that show 5"
    },
    {
      title: "Juice Boxes", 
      items: Array(5).fill("🧃"),
      correctSets: [1, 3],
      description: "Color the sets that show 5"
    },
    {
      title: "Cupcakes",
      items: Array(5).fill("🧁"),
      correctSets: [0, 2, 3],
      description: "Color the sets that show 5"
    }
  ];

  const currentProblemData = problems[currentProblem];

  const toggleSet = (setIndex: number) => {
    if (selectedSets.includes(setIndex)) {
      setSelectedSets(selectedSets.filter(idx => idx !== setIndex));
    } else {
      setSelectedSets([...selectedSets, setIndex]);
    }
    setShowFeedback(false);
  };

  const checkAnswer = () => {
    setShowFeedback(true);
  };

  const isCorrect = selectedSets.length === currentProblemData.correctSets.length && 
                   currentProblemData.correctSets.every(idx => selectedSets.includes(idx));

  const nextProblem = () => {
    setCurrentProblem(prev => Math.min(prev + 1, problems.length - 1));
    setSelectedSets([]);
    setShowFeedback(false);
  };

  const prevProblem = () => {
    setCurrentProblem(prev => Math.max(prev - 1, 0));
    setSelectedSets([]);
    setShowFeedback(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PartyPopper className="w-6 h-6" />
          Practice Activity
        </CardTitle>
        <CardDescription>Touch and count objects in circles (3 minutes)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Problem {currentProblem + 1} of {problems.length}</p>
          <h3 className="text-2xl font-bold mb-2">{currentProblemData.title}</h3>
          <p className="text-lg text-primary font-semibold">{currentProblemData.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[0, 1, 2, 3, 4].map((setIndex) => (
            <div key={setIndex} className="text-center">
              <button
                onClick={() => toggleSet(setIndex)}
                className={`w-full p-4 rounded-lg border-4 transition-all ${
                  selectedSets.includes(setIndex) 
                    ? 'border-primary bg-primary/10 scale-105' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300"></div>
                  {currentProblemData.items.map((item, idx) => {
                    const angle = (idx * 72 - 90) * (Math.PI / 180);
                    const x = 64 + 45 * Math.cos(angle);
                    const y = 64 + 45 * Math.sin(angle);
                    return (
                      <div
                        key={idx}
                        className="absolute text-3xl"
                        style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm font-medium">Set {setIndex + 1}</p>
                {selectedSets.includes(setIndex) && (
                  <div className="mt-2 text-primary font-bold">✓ Selected</div>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={checkAnswer} size="lg" disabled={selectedSets.length === 0}>
            Check My Answer
          </Button>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-lg text-center ${
            isCorrect ? "bg-green-500/20 text-green-700 dark:text-green-300" : "bg-red-500/20 text-red-700 dark:text-red-300"
          }`}>
            <p className="font-bold text-lg mb-2">
              {isCorrect ? "✓ Perfect! You colored the correct sets!" : "✗ Not quite right. Try again!"}
            </p>
            {!isCorrect && (
              <p className="text-sm">Look for the circles that have exactly 5 items.</p>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4 border-t border-border">
          <Button onClick={prevProblem} disabled={currentProblem === 0} variant="outline">
            Previous
          </Button>
          <Button onClick={nextProblem} disabled={currentProblem === problems.length - 1}>
            Next Problem
          </Button>
        </div>

        <div className="bg-accent/20 p-4 rounded-lg text-center">
          <h4 className="font-semibold mb-2">🎓 Student Debrief Questions</h4>
          <ul className="text-sm space-y-1">
            <li>• How did you know which item you counted first?</li>
            <li>• What did you do to mark the first item you counted?</li>
            <li>• Is it easier to count things in a line or in a circle? Why?</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountingActivity20;
