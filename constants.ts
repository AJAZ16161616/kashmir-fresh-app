import { Category, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  // --- PRODUCE (Fruits & Vegetables) ---
  {
    id: '101',
    name: 'Kashmiri Apple (Delicious)',
    price: 180,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=400&q=80',
    description: 'Crisp, sweet, and juicy apples directly from Sopore orchards.',
    unit: 'kg',
    rating: 4.9
  },
  {
    id: '102',
    name: 'Fresh Nadru (Lotus Stem)',
    price: 350,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1628840045765-f97576f30ec7?auto=format&fit=crop&w=400&q=80',
    description: 'Authentic lotus stems from Dal Lake, perfect for Yakhni.',
    unit: 'bundle',
    rating: 4.8
  },
  {
    id: '103',
    name: 'Kashmiri Haak (Collard Greens)',
    price: 80,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh green leafy vegetable, a staple of Kashmiri cuisine.',
    unit: 'kg',
    rating: 4.7
  },
  {
    id: '104',
    name: 'Organic Bananas',
    price: 60,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1571771896429-70dee661c1bc?auto=format&fit=crop&w=400&q=80',
    description: 'Sweet and starchy bananas, great for energy.',
    unit: 'dozen',
    rating: 4.5
  },
  {
    id: '105',
    name: 'Pomegranate (Anar)',
    price: 220,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=400&q=80',
    description: 'Ruby red pomegranates rich in antioxidants.',
    unit: 'kg',
    rating: 4.6
  },
  {
    id: '106',
    name: 'Sweet Oranges',
    price: 120,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=400&q=80',
    description: 'Juicy citrus oranges packed with Vitamin C.',
    unit: 'kg',
    rating: 4.4
  },
  {
    id: '107',
    name: 'Red Onions',
    price: 50,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
    description: 'Essential kitchen staple for curries and salads.',
    unit: 'kg',
    rating: 4.3
  },
  {
    id: '108',
    name: 'Potatoes (Pahadi)',
    price: 40,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    description: 'Starchy potatoes perfect for fries or dum aloo.',
    unit: 'kg',
    rating: 4.2
  },
  {
    id: '109',
    name: 'Fresh Tomatoes',
    price: 60,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    description: 'Ripe red tomatoes for sauces and salads.',
    unit: 'kg',
    rating: 4.4
  },
  {
    id: '110',
    name: 'Ginger Root',
    price: 120,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    description: 'Aromatic ginger for tea and cooking.',
    unit: '250g',
    rating: 4.6
  },
  {
    id: '111',
    name: 'Garlic Bulbs',
    price: 80,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=400&q=80',
    description: 'Strong flavored garlic for enhancing taste.',
    unit: '250g',
    rating: 4.5
  },
  {
    id: '112',
    name: 'Green Chillies',
    price: 30,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    description: 'Spicy green chillies to add heat.',
    unit: '200g',
    rating: 4.3
  },
  {
    id: '113',
    name: 'Fresh Coriander',
    price: 20,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1590412200988-5c8e93892837?auto=format&fit=crop&w=400&q=80',
    description: 'Aromatic cilantro leaves for garnishing.',
    unit: 'bunch',
    rating: 4.7
  },
  {
    id: '114',
    name: 'Lemon',
    price: 10,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=400&q=80',
    description: 'Zesty yellow lemons.',
    unit: 'pc',
    rating: 4.4
  },
  {
    id: '115',
    name: 'Cucumber',
    price: 40,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=400&q=80',
    description: 'Cool and crunchy cucumbers.',
    unit: 'kg',
    rating: 4.2
  },
  {
    id: '116',
    name: 'Carrots',
    price: 50,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
    description: 'Sweet orange carrots rich in Vitamin A.',
    unit: 'kg',
    rating: 4.5
  },
  {
    id: '117',
    name: 'Spinach',
    price: 40,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=400&q=80',
    description: 'Iron-rich fresh spinach leaves.',
    unit: 'bunch',
    rating: 4.6
  },
  {
    id: '118',
    name: 'Cauliflower',
    price: 60,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh white cauliflower head.',
    unit: 'pc',
    rating: 4.3
  },
  {
    id: '119',
    name: 'Capsicum',
    price: 80,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdf5dbc240?auto=format&fit=crop&w=400&q=80',
    description: 'Crunchy green bell peppers.',
    unit: 'kg',
    rating: 4.4
  },
  {
    id: '120',
    name: 'Pineapple',
    price: 150,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=400&q=80',
    description: 'Sweet and tangy tropical pineapple.',
    unit: 'pc',
    rating: 4.7
  },
  {
    id: '121',
    name: 'Watermelon',
    price: 90,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1563114773-880cd2bf99cd?auto=format&fit=crop&w=400&q=80',
    description: 'Refreshing summer fruit.',
    unit: 'pc',
    rating: 4.6
  },
  {
    id: '122',
    name: 'Papaya',
    price: 80,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1617112848923-cc5c3ac3514e?auto=format&fit=crop&w=400&q=80',
    description: 'Ripe papaya, great for digestion.',
    unit: 'pc',
    rating: 4.4
  },
  {
    id: '123',
    name: 'Green Grapes',
    price: 140,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1596363805836-674c1e956d5b?auto=format&fit=crop&w=400&q=80',
    description: 'Seedless green grapes.',
    unit: 'kg',
    rating: 4.5
  },
  {
    id: '124',
    name: 'Strawberries',
    price: 250,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4b032?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh red strawberries.',
    unit: 'box',
    rating: 4.8
  },
  {
    id: '125',
    name: 'Mushrooms',
    price: 180,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh button mushrooms.',
    unit: 'pack',
    rating: 4.3
  },
  {
    id: '126',
    name: 'Mint Leaves (Pudina)',
    price: 15,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1628556270448-46f004d5e974?auto=format&fit=crop&w=400&q=80',
    description: 'Refreshing aromatic mint.',
    unit: 'bunch',
    rating: 4.6
  },
  {
    id: '127',
    name: 'Brinjal (Eggplant)',
    price: 45,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1615286221762-c0e86b978509?auto=format&fit=crop&w=400&q=80',
    description: 'Purple brinjal, ideal for curry.',
    unit: 'kg',
    rating: 4.2
  },
  {
    id: '128',
    name: 'Kiwi',
    price: 40,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?auto=format&fit=crop&w=400&q=80',
    description: 'Vitamin C rich kiwi fruit.',
    unit: 'pc',
    rating: 4.5
  },
  {
    id: '129',
    name: 'Beetroot',
    price: 40,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1525286102393-82b5f7e77d33?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh beetroot for salads.',
    unit: 'kg',
    rating: 4.3
  },
  {
    id: '130',
    name: 'Sweet Corn',
    price: 30,
    category: Category.PRODUCE,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    description: 'Juicy sweet corn cob.',
    unit: 'pc',
    rating: 4.6
  },

  // --- DAIRY & EGGS ---
  {
    id: '201',
    name: 'Full Cream Milk',
    price: 70,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80',
    description: 'Rich and creamy farm fresh milk.',
    unit: 'liter',
    rating: 4.8
  },
  {
    id: '202',
    name: 'Farm Eggs',
    price: 90,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1569254994521-dd6813295c27?auto=format&fit=crop&w=400&q=80',
    description: 'Organic brown eggs, 12 pack.',
    unit: 'dozen',
    rating: 4.7
  },
  {
    id: '203',
    name: 'Salted Butter',
    price: 250,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80',
    description: 'Creamy salted butter block.',
    unit: '500g',
    rating: 4.9
  },
  {
    id: '204',
    name: 'Paneer (Cottage Cheese)',
    price: 180,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1567332262529-61f2249a5b6d?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh soft paneer for cooking.',
    unit: '400g',
    rating: 4.8
  },
  {
    id: '205',
    name: 'Greek Yogurt',
    price: 85,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80',
    description: 'Thick and creamy plain yogurt.',
    unit: 'cup',
    rating: 4.6
  },
  {
    id: '206',
    name: 'Cheddar Cheese',
    price: 350,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80',
    description: 'Sharp cheddar cheese block.',
    unit: '200g',
    rating: 4.7
  },
  {
    id: '207',
    name: 'Desi Ghee',
    price: 650,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
    description: 'Pure cow ghee for authentic flavor.',
    unit: '500ml',
    rating: 4.9
  },
  {
    id: '208',
    name: 'Fresh Cream',
    price: 120,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1627485937980-221c88ac04f9?auto=format&fit=crop&w=400&q=80',
    description: 'Rich fresh cream for cooking and desserts.',
    unit: '250ml',
    rating: 4.5
  },
  {
    id: '209',
    name: 'Mozzarella Cheese',
    price: 300,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1588195537909-6fa65e4ce22d?auto=format&fit=crop&w=400&q=80',
    description: 'Stretchy mozzarella for pizzas.',
    unit: '200g',
    rating: 4.6
  },
  {
    id: '210',
    name: 'Buttermilk (Chaas)',
    price: 30,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1626139576127-b5b637e19273?auto=format&fit=crop&w=400&q=80',
    description: 'Spiced refreshing buttermilk.',
    unit: '500ml',
    rating: 4.4
  },
  {
    id: '211',
    name: 'Condensed Milk',
    price: 130,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80',
    description: 'Sweetened condensed milk for sweets.',
    unit: 'tin',
    rating: 4.7
  },
  {
    id: '212',
    name: 'Soy Milk',
    price: 110,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1600788937968-0a068019e34e?auto=format&fit=crop&w=400&q=80',
    description: 'Dairy-free soy milk.',
    unit: 'liter',
    rating: 4.3
  },
  {
    id: '213',
    name: 'Cheese Slices',
    price: 140,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1624806992066-5d544f4d2f02?auto=format&fit=crop&w=400&q=80',
    description: 'Processed cheese slices for sandwiches.',
    unit: 'pack',
    rating: 4.2
  },
  {
    id: '214',
    name: 'Toned Milk',
    price: 60,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80',
    description: 'Low fat toned milk.',
    unit: 'liter',
    rating: 4.4
  },
  {
    id: '215',
    name: 'Khoya (Mawa)',
    price: 400,
    category: Category.DAIRY,
    image: 'https://images.unsplash.com/photo-1599320623318-7b44585322d9?auto=format&fit=crop&w=400&q=80',
    description: 'Dried milk solids for Indian sweets.',
    unit: 'kg',
    rating: 4.8
  },

  // --- BAKERY ---
  {
    id: '301',
    name: 'Traditional Kashmiri Naan',
    price: 40,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
    description: 'Soft and fluffy traditional naan.',
    unit: 'pc',
    rating: 4.8
  },
  {
    id: '302',
    name: 'Sheermal',
    price: 50,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1610450953606-c845b46e3396?auto=format&fit=crop&w=400&q=80',
    description: 'Saffron-flavored traditional sweet bread.',
    unit: 'pc',
    rating: 4.9
  },
  {
    id: '303',
    name: 'Bakarkhani',
    price: 30,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    description: 'Layered spiced bread, a tea-time favorite.',
    unit: 'pc',
    rating: 4.7
  },
  {
    id: '304',
    name: 'Whole Wheat Bread',
    price: 55,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    description: 'Healthy whole wheat sliced bread.',
    unit: 'loaf',
    rating: 4.5
  },
  {
    id: '305',
    name: 'Sourdough Bread',
    price: 150,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1585478402435-625791a93321?auto=format&fit=crop&w=400&q=80',
    description: 'Artisanal tangy sourdough loaf.',
    unit: 'loaf',
    rating: 4.7
  },
  {
    id: '306',
    name: 'Croissants',
    price: 220,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    description: 'Buttery flaky croissants.',
    unit: '4-pack',
    rating: 4.8
  },
  {
    id: '307',
    name: 'Chocolate Muffins',
    price: 180,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=400&q=80',
    description: 'Rich chocolate chip muffins.',
    unit: '4-pack',
    rating: 4.6
  },
  {
    id: '308',
    name: 'Burger Buns',
    price: 40,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1592186938953-27c9551c6c59?auto=format&fit=crop&w=400&q=80',
    description: 'Soft sesame seeded burger buns.',
    unit: '4-pack',
    rating: 4.3
  },
  {
    id: '309',
    name: 'Garlic Bread',
    price: 90,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1573140247632-f84660f67127?auto=format&fit=crop&w=400&q=80',
    description: 'Buttery garlic baguette.',
    unit: 'loaf',
    rating: 4.6
  },
  {
    id: '310',
    name: 'Bagels',
    price: 120,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1585478402435-625791a93321?auto=format&fit=crop&w=400&q=80',
    description: 'Chewy plain bagels.',
    unit: '4-pack',
    rating: 4.4
  },
  {
    id: '311',
    name: 'Fruit Cake',
    price: 250,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=400&q=80',
    description: 'Dense cake with dried fruits.',
    unit: '500g',
    rating: 4.5
  },
  {
    id: '312',
    name: 'Butter Cookies',
    price: 150,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80',
    description: 'Melt-in-mouth butter cookies.',
    unit: 'box',
    rating: 4.7
  },
  {
    id: '313',
    name: 'Pizza Base',
    price: 50,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1598516063682-1df8a939db26?auto=format&fit=crop&w=400&q=80',
    description: 'Ready to cook pizza bases.',
    unit: '2-pack',
    rating: 4.3
  },
  {
    id: '314',
    name: 'Rusk (Toast)',
    price: 60,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1549557723-5857245d81b8?auto=format&fit=crop&w=400&q=80',
    description: 'Crispy tea-time toast rusks.',
    unit: 'pack',
    rating: 4.4
  },
  {
    id: '315',
    name: 'Pita Bread',
    price: 70,
    category: Category.BAKERY,
    image: 'https://images.unsplash.com/photo-1574542562479-7f55b9319e3f?auto=format&fit=crop&w=400&q=80',
    description: 'Middle eastern flatbread.',
    unit: '6-pack',
    rating: 4.5
  },

  // --- MEAT & SEAFOOD ---
  {
    id: '401',
    name: 'Kashmiri Trout',
    price: 650,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1517926966401-2b00aa389182?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh Himalayan river trout.',
    unit: 'kg',
    rating: 4.9
  },
  {
    id: '402',
    name: 'Chicken Breast',
    price: 280,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80',
    description: 'Boneless skinless chicken breast.',
    unit: 'kg',
    rating: 4.6
  },
  {
    id: '403',
    name: 'Fresh Mutton',
    price: 750,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=400&q=80',
    description: 'Premium quality fresh mutton.',
    unit: 'kg',
    rating: 4.8
  },
  {
    id: '404',
    name: 'Ground Beef',
    price: 450,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=400&q=80',
    description: 'Lean ground beef mince.',
    unit: 'kg',
    rating: 4.5
  },
  {
    id: '405',
    name: 'Chicken Drumsticks',
    price: 240,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80',
    description: 'Juicy chicken drumsticks.',
    unit: 'kg',
    rating: 4.5
  },
  {
    id: '406',
    name: 'Prawns',
    price: 550,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh cleaned medium prawns.',
    unit: 'kg',
    rating: 4.7
  },
  {
    id: '407',
    name: 'Salmon Fillet',
    price: 1200,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=400&q=80',
    description: 'Atlantic salmon fillet.',
    unit: '500g',
    rating: 4.8
  },
  {
    id: '408',
    name: 'Lamb Chops',
    price: 900,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?auto=format&fit=crop&w=400&q=80',
    description: 'Tender lamb chops.',
    unit: 'kg',
    rating: 4.7
  },
  {
    id: '409',
    name: 'Chicken Whole',
    price: 180,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=400&q=80',
    description: 'Whole skinless chicken.',
    unit: 'kg',
    rating: 4.4
  },
  {
    id: '410',
    name: 'Salami Slices',
    price: 320,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1551065112-c2834c9c1187?auto=format&fit=crop&w=400&q=80',
    description: 'Spiced chicken salami slices.',
    unit: '250g',
    rating: 4.3
  },
  {
    id: '411',
    name: 'Chicken Sausages',
    price: 280,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1595486850493-cc4b14d24a0d?auto=format&fit=crop&w=400&q=80',
    description: 'Breakfast chicken sausages.',
    unit: '500g',
    rating: 4.4
  },
  {
    id: '412',
    name: 'Rohu Fish',
    price: 250,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1611171711791-b34b432463e2?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh Rohu fish curry cut.',
    unit: 'kg',
    rating: 4.2
  },
  {
    id: '413',
    name: 'Smoked Ham',
    price: 450,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1524177507963-3d0d0e1b12b5?auto=format&fit=crop&w=400&q=80',
    description: 'Sliced smoked ham.',
    unit: '250g',
    rating: 4.5
  },
  {
    id: '414',
    name: 'Crab Meat',
    price: 600,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1553659971-f01207815844?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh cleaned crab.',
    unit: 'kg',
    rating: 4.6
  },
  {
    id: '415',
    name: 'Turkey Breast',
    price: 800,
    category: Category.MEAT,
    image: 'https://images.unsplash.com/photo-1563721344-93368297079d?auto=format&fit=crop&w=400&q=80',
    description: 'Lean turkey breast meat.',
    unit: 'kg',
    rating: 4.4
  },

  // --- PANTRY ---
  {
    id: '501',
    name: 'Pure Saffron (Kesar)',
    price: 550,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1627931327101-f86c2303c734?auto=format&fit=crop&w=400&q=80',
    description: 'Premium grade A Kashmiri saffron threads.',
    unit: '1g',
    rating: 5.0
  },
  {
    id: '502',
    name: 'Kashmiri Walnuts (Giri)',
    price: 1200,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1563595471467-3342372f9c99?auto=format&fit=crop&w=400&q=80',
    description: 'Organic walnut kernels from Kashmir.',
    unit: 'kg',
    rating: 4.9
  },
  {
    id: '503',
    name: 'Bhaderwah Rajma',
    price: 220,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1567375698509-4622738ed69d?auto=format&fit=crop&w=400&q=80',
    description: 'Famous Kashmiri red kidney beans.',
    unit: 'kg',
    rating: 4.8
  },
  {
    id: '504',
    name: 'Kashmiri Red Chilli Powder',
    price: 350,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1600109033379-3c35b863d0c3?auto=format&fit=crop&w=400&q=80',
    description: 'Vibrant red chilli powder, mild heat.',
    unit: '500g',
    rating: 4.8
  },
  {
    id: '505',
    name: 'Basmati Rice',
    price: 150,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80',
    description: 'Long grain aromatic basmati rice.',
    unit: 'kg',
    rating: 4.7
  },
  {
    id: '506',
    name: 'Almonds (Mamra)',
    price: 1800,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d61?auto=format&fit=crop&w=400&q=80',
    description: 'Premium Mamra almonds.',
    unit: 'kg',
    rating: 4.9
  },
  {
    id: '507',
    name: 'Honey',
    price: 450,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
    description: 'Pure organic Himalayan honey.',
    unit: '500g',
    rating: 4.7
  },
  {
    id: '508',
    name: 'Mustard Oil',
    price: 180,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    description: 'Cold pressed mustard oil.',
    unit: 'liter',
    rating: 4.5
  },
  {
    id: '509',
    name: 'Turmeric Powder',
    price: 200,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1615485290341-2831b439c2c5?auto=format&fit=crop&w=400&q=80',
    description: 'Pure turmeric powder.',
    unit: '500g',
    rating: 4.6
  },
  {
    id: '510',
    name: 'Olive Oil',
    price: 850,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    description: 'Extra virgin olive oil.',
    unit: 'liter',
    rating: 4.7
  },
  {
    id: '511',
    name: 'Pasta (Penne)',
    price: 120,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1551443874-09631526487e?auto=format&fit=crop&w=400&q=80',
    description: 'Durum wheat penne pasta.',
    unit: '500g',
    rating: 4.4
  },
  {
    id: '512',
    name: 'Tomato Ketchup',
    price: 110,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1607590209749-d3dd78519d0e?auto=format&fit=crop&w=400&q=80',
    description: 'Classic tomato ketchup.',
    unit: 'bottle',
    rating: 4.3
  },
  {
    id: '513',
    name: 'Salt',
    price: 25,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1518110925495-5fe214a4cf71?auto=format&fit=crop&w=400&q=80',
    description: 'Iodized table salt.',
    unit: 'kg',
    rating: 4.5
  },
  {
    id: '514',
    name: 'Sugar',
    price: 45,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1610419330920-83b9c0864d26?auto=format&fit=crop&w=400&q=80',
    description: 'Refined white sugar.',
    unit: 'kg',
    rating: 4.4
  },
  {
    id: '515',
    name: 'Moong Dal',
    price: 130,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=400&q=80',
    description: 'Yellow split moong lentils.',
    unit: 'kg',
    rating: 4.5
  },
  {
    id: '516',
    name: 'Cashews',
    price: 900,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1536591375315-1988d6960991?auto=format&fit=crop&w=400&q=80',
    description: 'Whole premium cashew nuts.',
    unit: 'kg',
    rating: 4.8
  },
  {
    id: '517',
    name: 'Mixed Fruit Jam',
    price: 140,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1590408542159-28c949755b41?auto=format&fit=crop&w=400&q=80',
    description: 'Mixed fruit jam.',
    unit: '500g',
    rating: 4.5
  },
  {
    id: '518',
    name: 'Instant Noodles',
    price: 25,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&q=80',
    description: 'Masala instant noodles.',
    unit: 'pack',
    rating: 4.2
  },
  {
    id: '519',
    name: 'Gulab Jamun Tin',
    price: 240,
    category: Category.PANTRY,
    image: 'https://images.unsplash.com/photo-1593701461250-d716e01b24e3?auto=format&fit=crop&w=400&q=80',
    description: 'Traditional Indian sweet. Soft milk-solid balls in rose syrup.',
    unit: '1kg',
    rating: 4.9
  },

  // --- BEVERAGES ---
  {
    id: '601',
    name: 'Kashmiri Kahwa Mix',
    price: 450,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231847233?auto=format&fit=crop&w=400&q=80',
    description: 'Authentic spice mix for Kashmiri tea.',
    unit: '250g',
    rating: 4.9
  },
  {
    id: '602',
    name: 'Apple Juice',
    price: 140,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80',
    description: '100% natural apple juice.',
    unit: 'liter',
    rating: 4.6
  },
  {
    id: '603',
    name: 'Orange Juice',
    price: 140,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=400&q=80',
    description: 'Fresh squeezed orange juice.',
    unit: 'liter',
    rating: 4.5
  },
  {
    id: '604',
    name: 'Green Tea Bags',
    price: 180,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80',
    description: 'Healthy green tea bags.',
    unit: '25 pack',
    rating: 4.4
  },
  {
    id: '605',
    name: 'Coffee Powder',
    price: 250,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=400&q=80',
    description: 'Aromatic instant coffee.',
    unit: '100g',
    rating: 4.5
  },
  {
    id: '606',
    name: 'Cola Drink',
    price: 40,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
    description: 'Fizzy cola soft drink.',
    unit: '750ml',
    rating: 4.2
  },
  {
    id: '607',
    name: 'Mineral Water',
    price: 20,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150c504?auto=format&fit=crop&w=400&q=80',
    description: 'Pure mineral water.',
    unit: 'liter',
    rating: 4.1
  },
  {
    id: '608',
    name: 'Mango Drink',
    price: 60,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1623065422902-80354727637c?auto=format&fit=crop&w=400&q=80',
    description: 'Thick mango pulp drink.',
    unit: 'liter',
    rating: 4.6
  },
  {
    id: '609',
    name: 'Energy Drink',
    price: 110,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=400&q=80',
    description: 'Caffeinated energy drink.',
    unit: 'can',
    rating: 4.0
  },
  {
    id: '610',
    name: 'Iced Tea Lemon',
    price: 50,
    category: Category.BEVERAGES,
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=400&q=80',
    description: 'Refreshing lemon iced tea.',
    unit: '500ml',
    rating: 4.3
  }
];