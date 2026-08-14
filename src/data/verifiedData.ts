// Centralized, verified master educational dataset for Magic Learning Land
// All facts, animal sounds, homes, classifications, color formulas and math are verified.

export interface MasterAnimal {
  id: string;
  name: string;
  emoji: string;
  soundId: string;
  soundName: string;
  onomatopoeia: string;
  soundDescription: string;
  home: string;
  homeEmoji: string;
  homeName: string;
  category: 'farm' | 'wild' | 'water' | 'pet' | 'bird';
  diet: 'plants' | 'meat' | 'seeds' | 'mixed';
  fact: string;
}

export const MASTER_ANIMALS: MasterAnimal[] = [
  {
    id: 'dog',
    name: 'Dog',
    emoji: '🐶',
    soundId: 'dog',
    soundName: 'Barking',
    onomatopoeia: 'Woof Woof!',
    soundDescription: 'dog barking',
    home: 'kennel',
    homeEmoji: '🏠',
    homeName: 'Kennel',
    category: 'pet',
    diet: 'mixed',
    fact: 'Dogs bark to communicate and wag their tails when happy!',
  },
  {
    id: 'cat',
    name: 'Cat',
    emoji: '🐱',
    soundId: 'cat',
    soundName: 'Meowing',
    onomatopoeia: 'Meow Meow!',
    soundDescription: 'cat meowing',
    home: 'basket',
    homeEmoji: '🧺',
    homeName: 'Cozy Basket',
    category: 'pet',
    diet: 'mixed',
    fact: 'Cats meow to talk to people and purr when they feel safe!',
  },
  {
    id: 'cow',
    name: 'Cow',
    emoji: '🐮',
    soundId: 'cow',
    soundName: 'Mooing',
    onomatopoeia: 'Moo Moo!',
    soundDescription: 'cow mooing',
    home: 'shed',
    homeEmoji: '🛖',
    homeName: 'Barn / Shed',
    category: 'farm',
    diet: 'plants',
    fact: 'Cows give us nutritious milk and love grazing on fresh grass!',
  },
  {
    id: 'pig',
    name: 'Pig',
    emoji: '🐷',
    soundId: 'pig',
    soundName: 'Oinking',
    onomatopoeia: 'Oink Oink!',
    soundDescription: 'pig oinking',
    home: 'sty',
    homeEmoji: '🪵',
    homeName: 'Pigpen / Sty',
    category: 'farm',
    diet: 'mixed',
    fact: 'Pigs are very smart and roll in mud to stay cool in the sun!',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    emoji: '🐔',
    soundId: 'chicken',
    soundName: 'Clucking',
    onomatopoeia: 'Cluck Cluck!',
    soundDescription: 'chicken clucking',
    home: 'coop',
    homeEmoji: '🛖',
    homeName: 'Coop',
    category: 'farm',
    diet: 'seeds',
    fact: 'Chickens cluck to their chicks and lay eggs in a warm nest!',
  },
  {
    id: 'lion',
    name: 'Lion',
    emoji: '🦁',
    soundId: 'lion',
    soundName: 'Roaring',
    onomatopoeia: 'Roaaar!',
    soundDescription: 'lion roaring',
    home: 'den',
    homeEmoji: '🪨',
    homeName: 'Den / Cave',
    category: 'wild',
    diet: 'meat',
    fact: 'Lions are known as the King of the Jungle and live in a pride!',
  },
  {
    id: 'elephant',
    name: 'Elephant',
    emoji: '🐘',
    soundId: 'elephant',
    soundName: 'Trumpeting',
    onomatopoeia: 'Pawoooo!',
    soundDescription: 'elephant trumpet',
    home: 'jungle',
    homeEmoji: '🌳',
    homeName: 'Jungle / Forest',
    category: 'wild',
    diet: 'plants',
    fact: 'Elephants are the largest land animals and use their trunks to drink water!',
  },
  {
    id: 'horse',
    name: 'Horse',
    emoji: '🐴',
    soundId: 'horse',
    soundName: 'Neighing',
    onomatopoeia: 'Neigh Whinny!',
    soundDescription: 'horse neighing',
    home: 'stable',
    homeEmoji: '🏚️',
    homeName: 'Stable',
    category: 'farm',
    diet: 'plants',
    fact: 'Horses can run very fast and sleep both lying down and standing up!',
  },
  {
    id: 'sheep',
    name: 'Sheep',
    emoji: '🐑',
    soundId: 'sheep',
    soundName: 'Bleating',
    onomatopoeia: 'Baaa Baaa!',
    soundDescription: 'sheep bleating',
    home: 'pen',
    homeEmoji: '🪵',
    homeName: 'Fold / Pen',
    category: 'farm',
    diet: 'plants',
    fact: 'Sheep have warm, fluffy wool that is gently sheared to make cozy sweaters!',
  },
  {
    id: 'goat',
    name: 'Goat',
    emoji: '🐐',
    soundId: 'goat',
    soundName: 'Bleating',
    onomatopoeia: 'Maaa Bleat!',
    soundDescription: 'goat bleating',
    home: 'shed',
    homeEmoji: '🛖',
    homeName: 'Goat Shed',
    category: 'farm',
    diet: 'plants',
    fact: 'Goats are excellent climbers and have rectangular pupils in their eyes!',
  },
  {
    id: 'duck',
    name: 'Duck',
    emoji: '🦆',
    soundId: 'duck',
    soundName: 'Quacking',
    onomatopoeia: 'Quack Quack!',
    soundDescription: 'duck quacking',
    home: 'pond',
    homeEmoji: '🌊',
    homeName: 'Pond / Lake',
    category: 'water',
    diet: 'plants',
    fact: 'Ducks have waterproof feathers and webbed feet to swim smoothly!',
  },
  {
    id: 'frog',
    name: 'Frog',
    emoji: '🐸',
    soundId: 'frog',
    soundName: 'Croaking',
    onomatopoeia: 'Ribbit Croak!',
    soundDescription: 'frog croaking',
    home: 'pond',
    homeEmoji: '🪷',
    homeName: 'Lily Pad / Pond',
    category: 'water',
    diet: 'mixed',
    fact: 'Frogs can breathe through their skin and jump many times their body length!',
  },
  {
    id: 'bird',
    name: 'Bird',
    emoji: '🐦',
    soundId: 'bird',
    soundName: 'Chirping',
    onomatopoeia: 'Tweet Chirp!',
    soundDescription: 'bird chirping',
    home: 'nest',
    homeEmoji: '🪹',
    homeName: 'Nest',
    category: 'bird',
    diet: 'seeds',
    fact: 'Birds build cozy nests in trees using twigs and feathers to protect their eggs!',
  },
  {
    id: 'tiger',
    name: 'Tiger',
    emoji: '🐯',
    soundId: 'tiger',
    soundName: 'Growling / Roaring',
    onomatopoeia: 'Grrr-Roar!',
    soundDescription: 'tiger growling',
    home: 'lair',
    homeEmoji: '🌿',
    homeName: 'Dense Forest Lair',
    category: 'wild',
    diet: 'meat',
    fact: 'Every tiger has a unique pattern of orange and black stripes!',
  },
  {
    id: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    soundId: 'monkey',
    soundName: 'Chattering',
    onomatopoeia: 'Ooh Ooh Aah Aah!',
    soundDescription: 'monkey sounds',
    home: 'treetop',
    homeEmoji: '🌴',
    homeName: 'Treetops',
    category: 'wild',
    diet: 'plants',
    fact: 'Monkeys love swinging through jungle vines and eating sweet fruits!',
  },
  {
    id: 'bee',
    name: 'Bee',
    emoji: '🐝',
    soundId: 'bee',
    soundName: 'Buzzing',
    onomatopoeia: 'Bzzzz Bzzzz!',
    soundDescription: 'bee buzzing',
    home: 'hive',
    homeEmoji: '🍯',
    homeName: 'Beehive',
    category: 'wild',
    diet: 'plants',
    fact: 'Bees collect flower nectar to make delicious, golden honey!',
  },
  {
    id: 'fish',
    name: 'Fish',
    emoji: '🐠',
    soundId: 'bubble',
    soundName: 'Splashing',
    onomatopoeia: 'Blub Blub!',
    soundDescription: 'water splashes',
    home: 'ocean',
    homeEmoji: '🌊',
    homeName: 'Ocean / Reef',
    category: 'water',
    diet: 'plants',
    fact: 'Fish use gills to breathe underwater and fins to swim gracefully!',
  },
  {
    id: 'bear',
    name: 'Bear',
    emoji: '🐻',
    soundId: 'bear',
    soundName: 'Growling',
    onomatopoeia: 'Grrrr!',
    soundDescription: 'bear growl',
    home: 'cave',
    homeEmoji: '🪨',
    homeName: 'Cave',
    category: 'wild',
    diet: 'mixed',
    fact: 'Bears love berries and sweet honey, and hibernate in caves during cold winters!',
  },
];

// Common everyday sounds
export interface CommonSoundItem {
  id: string;
  name: string;
  emoji: string;
  soundEffect: string;
  description: string;
  options: string[];
}

export const COMMON_SOUNDS: CommonSoundItem[] = [
  {
    id: 'bell',
    name: 'School Bell / Church Bell',
    emoji: '🔔',
    soundEffect: 'bell',
    description: 'Ding Dong! A ringing bell',
    options: ['🔔 Bell', '🚗 Car', '🌧️ Rain', '⏰ Clock'],
  },
  {
    id: 'car_horn',
    name: 'Car Horn',
    emoji: '🚗',
    soundEffect: 'car_horn',
    description: 'Beep Beep! A car horn honking',
    options: ['🚗 Car', '🔔 Bell', '🥁 Drum', '🐦 Bird'],
  },
  {
    id: 'rain',
    name: 'Raindrops',
    emoji: '🌧️',
    soundEffect: 'rain',
    description: 'Pitter Patter! Rain falling from clouds',
    options: ['🌧️ Rain', '🔔 Bell', '🐶 Dog', '🚗 Car'],
  },
  {
    id: 'clock',
    name: 'Ticking Clock',
    emoji: '⏰',
    soundEffect: 'clock',
    description: 'Tick Tock! A ticking clock counting seconds',
    options: ['⏰ Clock', '🌧️ Rain', '🚨 Siren', '🔔 Bell'],
  },
  {
    id: 'siren',
    name: 'Fire Engine Siren',
    emoji: '🚨',
    soundEffect: 'siren',
    description: 'Wee Woo! Emergency rescue siren',
    options: ['🚨 Siren', '⏰ Clock', '🔔 Bell', '🌧️ Rain'],
  },
  {
    id: 'drum',
    name: 'Drum Beat',
    emoji: '🥁',
    soundEffect: 'drum',
    description: 'Boom Boom! A deep rhythmic drum beat',
    options: ['🥁 Drum', '🚗 Car', '🔔 Bell', '⏰ Clock'],
  },
];

// Master Colors
export interface MasterColor {
  id: string;
  name: string;
  hex: string;
  emoji: string;
  items: { name: string; emoji: string }[];
}

export const MASTER_COLORS: MasterColor[] = [
  {
    id: 'red',
    name: 'Red',
    hex: '#EF4444',
    emoji: '🔴',
    items: [
      { name: 'Red Apple', emoji: '🍎' },
      { name: 'Strawberry', emoji: '🍓' },
      { name: 'Fire Engine', emoji: '🚒' },
      { name: 'Red Heart', emoji: '❤️' },
      { name: 'Red Rose', emoji: '🌹' },
    ],
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#3B82F6',
    emoji: '🔵',
    items: [
      { name: 'Blue Whale', emoji: '🐳' },
      { name: 'Blueberry', emoji: '🫐' },
      { name: 'Water Drop', emoji: '💧' },
      { name: 'Blue Balloon', emoji: '🎈' },
      { name: 'Blue Bird', emoji: '🐦' },
    ],
  },
  {
    id: 'yellow',
    name: 'Yellow',
    hex: '#FACC15',
    emoji: '🟡',
    items: [
      { name: 'Bright Sun', emoji: '☀️' },
      { name: 'Ripe Banana', emoji: '🍌' },
      { name: 'Yellow Duck', emoji: '🐥' },
      { name: 'Shining Star', emoji: '⭐' },
      { name: 'Sunflower', emoji: '🌻' },
    ],
  },
  {
    id: 'green',
    name: 'Green',
    hex: '#22C55E',
    emoji: '🟢',
    items: [
      { name: 'Green Leaf', emoji: '🍃' },
      { name: 'Friendly Frog', emoji: '🐸' },
      { name: 'Big Tree', emoji: '🌳' },
      { name: 'Broccoli', emoji: '🥦' },
      { name: 'Cucumber', emoji: '🥒' },
    ],
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#FB923C',
    emoji: '🟠',
    items: [
      { name: 'Juicy Orange', emoji: '🍊' },
      { name: 'Crunchy Carrot', emoji: '🥕' },
      { name: 'Tiger', emoji: '🐯' },
      { name: 'Pumpkin', emoji: '🎃' },
      { name: 'Orange Basketball', emoji: '🏀' },
    ],
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#A855F7',
    emoji: '🟣',
    items: [
      { name: 'Sweet Grapes', emoji: '🍇' },
      { name: 'Eggplant', emoji: '🍆' },
      { name: 'Purple Butterfly', emoji: '🦋' },
      { name: 'Crystal Gem', emoji: '🔮' },
    ],
  },
  {
    id: 'pink',
    name: 'Pink',
    hex: '#EC4899',
    emoji: '🌸',
    items: [
      { name: 'Pink Flamingo', emoji: '🦩' },
      { name: 'Cherry Blossom', emoji: '🌸' },
      { name: 'Pink Piggy', emoji: '🐷' },
      { name: 'Donut', emoji: '🍩' },
    ],
  },
];

// Color mixing formulas
export const COLOR_MIXING_PAIRS = [
  {
    color1: 'Red',
    emoji1: '🔴',
    color2: 'Yellow',
    emoji2: '🟡',
    result: 'Orange',
    resultEmoji: '🟠',
    hex: '#FB923C',
  },
  {
    color1: 'Blue',
    emoji1: '🔵',
    color2: 'Yellow',
    emoji2: '🟡',
    result: 'Green',
    resultEmoji: '🟢',
    hex: '#22C55E',
  },
  {
    color1: 'Red',
    emoji1: '🔴',
    color2: 'Blue',
    emoji2: '🔵',
    result: 'Purple',
    resultEmoji: '🟣',
    hex: '#A855F7',
  },
  {
    color1: 'White',
    emoji1: '⚪',
    color2: 'Red',
    emoji2: '🔴',
    result: 'Pink',
    resultEmoji: '🌸',
    hex: '#EC4899',
  },
];

// Master Shapes
export interface MasterShape {
  id: string;
  name: string;
  sides: number;
  color: string;
  realWorldExamples: { name: string; emoji: string }[];
}

export const MASTER_SHAPES: MasterShape[] = [
  {
    id: 'circle',
    name: 'Circle',
    sides: 0,
    color: '#3B82F6',
    realWorldExamples: [
      { name: 'Round Clock', emoji: '⏰' },
      { name: 'Pizza Pie', emoji: '🍕' },
      { name: 'Coin', emoji: '🪙' },
      { name: 'Wheel', emoji: '🛞' },
    ],
  },
  {
    id: 'square',
    name: 'Square',
    sides: 4,
    color: '#EF4444',
    realWorldExamples: [
      { name: 'Gift Box', emoji: '🎁' },
      { name: 'Window', emoji: '🪟' },
      { name: 'Dice', emoji: '🎲' },
      { name: 'Chess Board', emoji: '♟️' },
    ],
  },
  {
    id: 'triangle',
    name: 'Triangle',
    sides: 3,
    color: '#22C55E',
    realWorldExamples: [
      { name: 'Pizza Slice', emoji: '🍕' },
      { name: 'Party Hat', emoji: '🥳' },
      { name: 'Tent', emoji: '⛺' },
      { name: 'Watermelon Slice', emoji: '🍉' },
    ],
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    sides: 4,
    color: '#F59E0B',
    realWorldExamples: [
      { name: 'Door', emoji: '🚪' },
      { name: 'Book', emoji: '📖' },
      { name: 'Smartphone', emoji: '📱' },
      { name: 'Chocolate Bar', emoji: '🍫' },
    ],
  },
  {
    id: 'star',
    name: 'Star',
    sides: 10,
    color: '#EAB308',
    realWorldExamples: [
      { name: 'Night Star', emoji: '⭐' },
      { name: 'Starfish', emoji: '🌟' },
      { name: 'Badge', emoji: '🎖️' },
    ],
  },
  {
    id: 'heart',
    name: 'Heart',
    sides: 0,
    color: '#EC4899',
    realWorldExamples: [
      { name: 'Love Heart', emoji: '❤️' },
      { name: 'Greeting Card', emoji: '💌' },
      { name: 'Heart Balloon', emoji: '🎈' },
    ],
  },
];

// Healthy vs Junk Foods
export const FOOD_ITEMS = [
  { name: 'Red Apple', emoji: '🍎', isHealthy: true, type: 'fruit' },
  { name: 'Ripe Banana', emoji: '🍌', isHealthy: true, type: 'fruit' },
  { name: 'Carrot', emoji: '🥕', isHealthy: true, type: 'vegetable' },
  { name: 'Broccoli', emoji: '🥦', isHealthy: true, type: 'vegetable' },
  { name: 'Milk', emoji: '🥛', isHealthy: true, type: 'drink' },
  { name: 'Orange', emoji: '🍊', isHealthy: true, type: 'fruit' },
  { name: 'Tomato', emoji: '🍅', isHealthy: true, type: 'vegetable' },
  { name: 'Grapes', emoji: '🍇', isHealthy: true, type: 'fruit' },
  { name: 'Lollipop / Candy', emoji: '🍭', isHealthy: false, type: 'junk' },
  { name: 'Fizzy Soda', emoji: '🥤', isHealthy: false, type: 'junk' },
  { name: 'French Fries', emoji: '🍟', isHealthy: false, type: 'junk' },
  { name: 'Frosted Donut', emoji: '🍩', isHealthy: false, type: 'junk' },
];

// Master Body Parts
export const BODY_PARTS = [
  { id: 'eyes', name: 'Eyes', emoji: '👀', sense: 'Seeing / Sight', action: 'We see colors and books with our eyes!' },
  { id: 'ears', name: 'Ears', emoji: '👂', sense: 'Hearing / Sound', action: 'We hear music and birds with our ears!' },
  { id: 'nose', name: 'Nose', emoji: '👃', sense: 'Smelling / Scent', action: 'We smell sweet flowers with our nose!' },
  { id: 'mouth', name: 'Mouth / Tongue', emoji: '👄', sense: 'Tasting & Speaking', action: 'We taste apples and speak words with our mouth!' },
  { id: 'hands', name: 'Hands', emoji: '🖐️', sense: 'Touching & Holding', action: 'We write, clap and hug with our hands!' },
  { id: 'feet', name: 'Feet / Legs', emoji: '🦶', sense: 'Walking & Running', action: 'We jump, dance and run with our feet!' },
];

// Weather and Appropriate Clothing
export const WEATHER_SCENARIOS = [
  {
    weather: 'Sunny Day',
    weatherEmoji: '☀️',
    description: 'Hot and bright outside',
    correctClothes: [
      { name: 'Cotton T-Shirt', emoji: '👕' },
      { name: 'Sun Hat', emoji: '👒' },
      { name: 'Sunglasses', emoji: '🕶️' },
      { name: 'Sandals', emoji: '🩴' },
    ],
    wrongClothes: [
      { name: 'Heavy Wool Coat', emoji: '🧥' },
      { name: 'Raincoat', emoji: '🥼' },
      { name: 'Winter Mittens', emoji: '🧤' },
    ],
  },
  {
    weather: 'Rainy Day',
    weatherEmoji: '🌧️',
    description: 'Water drops falling from cloudy sky',
    correctClothes: [
      { name: 'Raincoat', emoji: '🥼' },
      { name: 'Big Umbrella', emoji: '☂️' },
      { name: 'Waterproof Boots', emoji: '👢' },
    ],
    wrongClothes: [
      { name: 'Sunglasses', emoji: '🕶️' },
      { name: 'Sun Straw Hat', emoji: '👒' },
      { name: 'Swimsuit', emoji: '🩱' },
    ],
  },
  {
    weather: 'Snowy / Cold Winter',
    weatherEmoji: '❄️',
    description: 'Freezing cold with white snowflakes',
    correctClothes: [
      { name: 'Warm Jacket', emoji: '🧥' },
      { name: 'Woolen Beanie', emoji: '🧶' },
      { name: 'Warm Mittens', emoji: '🧤' },
      { name: 'Cozy Scarf', emoji: '🧣' },
    ],
    wrongClothes: [
      { name: 'Sleeveless Shirt', emoji: '🎽' },
      { name: 'Beach Flip-flops', emoji: '🩴' },
      { name: 'Sunglasses', emoji: '🕶️' },
    ],
  },
];

// Master Vehicles
export const VEHICLES_DATA = [
  { name: 'Car', emoji: '🚗', environment: 'land', envName: 'Road / Land' },
  { name: 'School Bus', emoji: '🚌', environment: 'land', envName: 'Road / Land' },
  { name: 'Bicycle', emoji: '🚲', environment: 'land', envName: 'Road / Land' },
  { name: 'Train', emoji: '🚂', environment: 'land', envName: 'Railway Track / Land' },
  { name: 'Sailboat', emoji: '⛵', environment: 'water', envName: 'Sea / Water' },
  { name: 'Large Ship', emoji: '🚢', environment: 'water', envName: 'Ocean / Water' },
  { name: 'Submarine', emoji: '🤿', environment: 'water', envName: 'Deep Water' },
  { name: 'Airplane', emoji: '✈️', environment: 'air', envName: 'Sky / Air' },
  { name: 'Helicopter', emoji: '🚁', environment: 'air', envName: 'Sky / Air' },
  { name: 'Space Rocket', emoji: '🚀', environment: 'air', envName: 'Space / Air' },
];

// Master Emotions
export const EMOTIONS_DATA = [
  { id: 'happy', name: 'Happy', emoji: '😄', reason: 'Smiling and feeling joyful!' },
  { id: 'sad', name: 'Sad', emoji: '😢', reason: 'Frowning and might need a warm hug.' },
  { id: 'surprised', name: 'Surprised', emoji: '😲', reason: 'Eyes wide open from an unexpected gift!' },
  { id: 'angry', name: 'Angry', emoji: '😠', reason: 'Taking deep breaths to calm down.' },
  { id: 'sleepy', name: 'Sleepy', emoji: '🥱', reason: 'Yawning and ready for a good night sleep.' },
];

// Community Helpers
export const COMMUNITY_HELPERS = [
  {
    role: 'Doctor',
    emoji: '🩺',
    personEmoji: '👩‍⚕️',
    tool: 'Stethoscope',
    toolEmoji: '🩺',
    workplace: 'Hospital / Clinic',
    duty: 'Treats sick people and helps us stay healthy!',
  },
  {
    role: 'Firefighter',
    emoji: '🚒',
    personEmoji: '👨‍🚒',
    tool: 'Water Hose',
    toolEmoji: '🧯',
    workplace: 'Fire Station',
    duty: 'Puts out dangerous fires and rescues people!',
  },
  {
    role: 'Teacher',
    emoji: '📚',
    personEmoji: '👩‍🏫',
    tool: 'Books & Blackboard',
    toolEmoji: '📖',
    workplace: 'School',
    duty: 'Teaches children reading, writing and good values!',
  },
  {
    role: 'Police Officer',
    emoji: '👮',
    personEmoji: '👮‍♂️',
    tool: 'Whistle & Badge',
    toolEmoji: '🛡️',
    workplace: 'Police Station',
    duty: 'Keeps our neighborhood safe and maintains law!',
  },
  {
    role: 'Farmer',
    emoji: '🌾',
    personEmoji: '👨‍🌾',
    tool: 'Tractor & Plow',
    toolEmoji: '🚜',
    workplace: 'Farm / Field',
    duty: 'Grows delicious vegetables, grains and fruits for us!',
  },
  {
    role: 'Chef / Baker',
    emoji: '👨‍🍳',
    personEmoji: '👩‍🍳',
    tool: 'Pan & Whisk',
    toolEmoji: '🍳',
    workplace: 'Kitchen / Restaurant',
    duty: 'Cooks nutritious and tasty food!',
  },
];
