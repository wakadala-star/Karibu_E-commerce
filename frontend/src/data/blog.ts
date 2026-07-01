export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorRole: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  image: string;
}

export const blogCategories = [
  { id: "all", name: "All Posts" },
  { id: "product-guides", name: "Product Guides" },
  { id: "tech-news", name: "Tech News" },
  { id: "home-security", name: "Home Security" },
  { id: "audio", name: "Audio & Music" },
  { id: "lifestyle", name: "Lifestyle" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Choose the Right Security Camera for Your Home",
    slug: "choose-right-security-camera",
    excerpt:
      "A comprehensive guide to selecting the perfect CCTV system based on your home layout, budget, and security needs.",
    content: `
      <p>Home security is no longer a luxury — it's a necessity. With so many options on the market, choosing the right security camera can feel overwhelming. Here's what you need to consider.</p>

      <h3>1. Assess Your Needs</h3>
      <p>Before purchasing, walk around your property and identify vulnerable entry points. Front doors, backyards, garages, and driveways are the most common areas that need surveillance coverage.</p>

      <h3>2. Indoor vs. Outdoor</h3>
      <p>Outdoor cameras need to be weatherproof with an IP65 or higher rating. Indoor cameras can be smaller and more discreet. For comprehensive coverage, you'll likely need both.</p>

      <h3>3. Resolution Matters</h3>
      <p>Go for at least 1080p resolution. Higher resolution means clearer footage, which is crucial for identifying faces and license plates. Our CCTV Maling camera offers crystal-clear 2K resolution at an affordable price point.</p>

      <h3>4. Night Vision</h3>
      <p>Most break-ins happen at night. Ensure your camera has infrared night vision or color night vision for 24/7 protection.</p>

      <h3>5. Storage Options</h3>
      <p>Cloud storage offers remote access but requires a subscription. Local storage via SD cards is a one-time cost. Many modern cameras offer both options for flexibility.</p>

      <p>At Karibu, we stock a range of security cameras suited for every need and budget. Visit our shop to find the perfect fit for your home.</p>
    `,
    category: "home-security",
    tags: ["security", "cameras", "home", "CCTV"],
    author: "David Okafor",
    authorRole: "Security Specialist",
    readTime: "5 min read",
    publishedAt: "2026-06-28",
    featured: true,
    image: "/images/cctv.jpg",
  },
  {
    id: "2",
    title: "Top 5 Wireless Earbuds for Every Budget in 2026",
    slug: "top-wireless-earbuds-2026",
    excerpt:
      "From budget-friendly options to premium audio gear, here are our top picks for wireless earbuds this year.",
    content: `
      <p>Wireless earbuds have become essential for music lovers, commuters, and fitness enthusiasts alike. Here are our top picks across every budget range.</p>

      <h3>Budget Range (Under $15)</h3>
      <p>The Karibu RT75 delivers surprising audio quality at its price point. With solid bass and clear mids, it's perfect for everyday listening without breaking the bank.</p>

      <h3>Mid-Range ($15–$30)</h3>
      <p>The TWS Bujog offers active noise cancellation and a comfortable fit. With 6 hours of playback and a charging case that extends it to 24 hours, it's a solid choice for daily commuters.</p>

      <h3>Premium ($30+)</h3>
      <p>For audiophiles who demand the best, look for earbuds with LDAC support, adaptive EQ, and spatial audio. These features make a noticeable difference in sound staging.</p>

      <h3>Key Features to Look For</h3>
      <ul>
        <li>IPX4 or higher water resistance for workouts</li>
        <li>Active noise cancellation for commuting</li>
        <li>Wireless charging case convenience</li>
        <li>Low latency mode for gaming</li>
      </ul>

      <p>Visit Karibu's music collection to explore our full range of wireless earbuds and find your perfect match.</p>
    `,
    category: "audio",
    tags: ["earbuds", "wireless", "audio", "music"],
    author: "Amina Bello",
    authorRole: "Audio Editor",
    readTime: "4 min read",
    publishedAt: "2026-06-25",
    image: "/images/tws-earbuds.jpg",
  },
  {
    id: "3",
    title: "Setting Up a Smart Home on a Budget",
    slug: "smart-home-budget",
    excerpt:
      "You don't need to spend thousands to make your home smarter. Here's how to get started with affordable gadgets.",
    content: `
      <p>The idea of a smart home often comes with a hefty price tag, but it doesn't have to. With a few strategic purchases, you can automate your home without emptying your wallet.</p>

      <h3>Start With Security</h3>
      <p>A smart security camera is the foundation of any smart home. It gives you peace of mind with remote monitoring via your phone. Our CCTV Maling cameras connect easily to your home Wi-Fi and provide real-time alerts.</p>

      <h3>Smart Lighting</h3>
      <p>Smart bulbs are one of the cheapest ways to add automation. Set schedules, change colors, and control them with your voice — all for under $10 per bulb.</p>

      <h3>Phone Holders and Mounts</h3>
      <p>It sounds simple, but a good phone mount transforms how you interact with your smart home. Use your phone as a control center while keeping it accessible and charged.</p>

      <h3>Prioritize Your Needs</h3>
      <p>Don't buy everything at once. Start with the basics — security, lighting, and a central hub — then expand as your budget allows.</p>

      <p>Karibu offers a curated selection of smart home essentials that won't break the bank. Start building your connected home today.</p>
    `,
    category: "lifestyle",
    tags: ["smart home", "budget", "automation", "gadgets"],
    author: "Chidi Eze",
    authorRole: "Tech Writer",
    readTime: "4 min read",
    publishedAt: "2026-06-20",
    image: "/images/phone-holder.jpg",
  },
  {
    id: "4",
    title: "Understanding Storage Devices: HDD vs. SSD vs. Cloud",
    slug: "storage-devices-guide",
    excerpt:
      "Confused about storage options? We break down the differences between HDD, SSD, and cloud storage to help you decide.",
    content: `
      <p>Storage is one of the most important decisions when setting up your tech ecosystem. Each type has its strengths and weaknesses.</p>

      <h3>HDD (Hard Disk Drive)</h3>
      <p>HDDs are the oldest and most affordable storage option. They use spinning磁platters to read and write data. While slower than SSDs, they offer massive storage capacities at low cost — perfect for backing up large files and media libraries.</p>

      <h3>SSD (Solid State Drive)</h3>
      <p>SSDs use flash memory with no moving parts, making them significantly faster and more durable than HDDs. Boot times, file transfers, and app loading are all dramatically improved. The trade-off is a higher cost per gigabyte.</p>

      <h3>Cloud Storage</h3>
      <p>Cloud storage offers accessibility from anywhere with an internet connection. Services like Google Drive, iCloud, and Dropbox provide varying tiers of storage. The downside is ongoing subscription costs and reliance on internet connectivity.</p>

      <h3>Which Should You Choose?</h3>
      <p>For most people, a combination works best: an SSD for your operating system and frequently used apps, an HDD for bulk storage, and cloud for backups and remote access.</p>

      <p>Check out Karibu's storage collection for reliable devices at competitive prices.</p>
    `,
    category: "product-guides",
    tags: ["storage", "HDD", "SSD", "cloud", "guide"],
    author: "David Okafor",
    authorRole: "Security Specialist",
    readTime: "5 min read",
    publishedAt: "2026-06-15",
    image: "/images/speaker.jpg",
  },
  {
    id: "5",
    title: "The Rise of Affordable Audio: Quality Sound for Everyone",
    slug: "affordable-audio-rise",
    excerpt:
      "Gone are the days when great sound meant spending hundreds. Here's how budget audio gear has evolved.",
    content: `
      <p>The audio industry has undergone a revolution. What once required expensive equipment can now be achieved with surprisingly affordable gear.</p>

      <h3>The Democratization of Audio</h3>
      <p>Advances in driver technology, Bluetooth codecs, and manufacturing have driven prices down while quality has soared. Brands like Karibu are proving that excellent sound doesn't require a premium price tag.</p>

      <h3>What to Expect From Budget Audio in 2026</h3>
      <p>Modern budget headphones and earbuds offer features that were exclusive to high-end models just a few years ago: active noise cancellation, transparency modes, spatial audio, and multi-device connectivity.</p>

      <h3>Making the Most of Your Setup</h3>
      <p>Room acoustics matter more than you think. Soft furnishings, rugs, and curtains can dramatically improve sound quality in your listening space. Pair this with well-positioned speakers for the best experience.</p>

      <h3>Our Picks</h3>
      <p>From the Headsound headphones to the TWS Bujog earbuds, Karibu's audio collection is designed to deliver maximum value. Every product is tested for sound quality, comfort, and durability.</p>
    `,
    category: "audio",
    tags: ["audio", "headphones", "earbuds", "music", "budget"],
    author: "Amina Bello",
    authorRole: "Audio Editor",
    readTime: "4 min read",
    publishedAt: "2026-06-10",
    image: "/images/headphones.jpg",
  },
  {
    id: "6",
    title: "5 Tech Gadgets That Make Great Gifts",
    slug: "tech-gifts-guide",
    excerpt:
      "Stuck on what to get someone? These affordable tech gadgets are crowd-pleasers for any occasion.",
    content: `
      <p>Finding the perfect gift can be challenging, but tech gadgets are always a safe bet. Here are five options that suit almost anyone on your list.</p>

      <h3>1. Wireless Earbuds</h3>
      <p>Everyone uses them, and a good pair is always appreciated. The Karibu RT75 offers great sound quality and comfort at a price that won't break your gift budget.</p>

      <h3>2. Phone Holder</h3>
      <p>A versatile phone holder is practical for desk workers, content creators, and anyone who video calls regularly. It's one of those gifts people didn't know they needed.</p>

      <h3>3. Portable Speaker</h3>
      <p>Portable speakers are perfect for outdoor gatherings, picnics, and bathroom sing-alongs. Look for water-resistant models for extra durability.</p>

      <h3>4. Smart Home Camera</h3>
      <p>Giving the gift of security is thoughtful and practical. A smart camera lets loved ones monitor their home from their phone.</p>

      <h3>5. Quality Headphones</h3>
      <p>A solid pair of over-ear headphones is a gift that keeps giving. Whether for music, podcasts, or work calls, they'll be used daily.</p>

      <p>Browse Karibu's gift guide collection for curated tech gifts at every price point.</p>
    `,
    category: "lifestyle",
    tags: ["gifts", "gadgets", "tech", "shopping"],
    author: "Chidi Eze",
    authorRole: "Tech Writer",
    readTime: "3 min read",
    publishedAt: "2026-06-05",
    image: "/images/earbuds-case.jpg",
  },
];
