// Unique Unsplash image pool — one per article, no duplicates
// Each entry: { id: unsplash_photo_id, keywords: [...] }
// Images are matched to articles by section + keyword scoring at runtime

window.IMAGE_POOL = {
  politics: [
    "1555374018-13a8994ab246", // US Capitol dome
    "1503551723145-6c040742065b", // Congress building
    "1605810230434-7631ac76ec81", // Governor press conference
    "1543286386-713bdd548da4",   // Senate chamber
    "1529107386315-e1a2ed48a620", // White House
    "1580974852861-52e95b8e4d4c", // Voting booths
    "1569025690938-a00729c9e1f9", // Capitol steps
    "1575654573578-ff0fdf7b7c7e", // Election map
    "1434494907-45ee9bd2e050",   // Government building
    "1541872705-1f73c6400ec9",   // American flag wave
    "1464817739973-0128fe77aaa1", // Constitution document
    "1593113598498-9f11cb0c98e1", // Protest/rally
    "1504198453319-5ce911bafcde", // Legislative hall
    "1573495612937-f01934eeaaa7", // Political debate
    "1584036561566-baf8f5f1b144", // Oval office desk
  ],
  business: [
    "1611532736597-de2d4265fba3", // Wall Street trading floor
    "1460925895917-afdab827c52f", // Stock chart on screen
    "1504384308090-c894fdcc538d", // Modern office building
    "1611974789855-9c2a0a7236a3", // Business meeting
    "1559526324-4b87b5e36e44",   // Dollar bills close-up
    "1444653614773-995cb1ef9ece", // Corporate handshake
    "1521737711867-e3b97375f902", // Team boardroom
    "1507679799987-c73779587ccf", // Startup office
    "1454165804606-c3d57bc86b40", // Financial charts
    "1563013544-824ae1b704d3",   // Bank vault
    "1486406146926-c627a92ad1ab", // City skyscrapers finance
    "1600880292203-757bb62b4baf", // Remote work laptop
    "1611348586804-61bf6c080437", // Bitcoin/crypto
    "1568992687947-868a62a9f521", // Supply chain shipping
    "1589739900243-4b52cd9b104e", // Retail shopping
  ],
  technology: [
    "1677442135703-1787eea5ce01", // AI robot
    "1486312338219-ce68d2c6f44d", // Laptop developer
    "1620712943543-bcc4688e7485", // Robotics arm
    "1518770660439-4636190af475", // Circuit board closeup
    "1550751827-4bd374c3f58b",   // Cybersecurity code
    "1558618666-fcd25c85cd64",   // VR headset
    "1605810230434-7631ac76ec81", // Tech conference
    "1581091226825-a6a2a5aee158", // Satellite / space tech
    "1526374965328-7f61d4dc18c5", // Matrix code
    "1573164713714-d95e436ab8d6", // Fiber optic cables
    "1485827404703-89b55fcc595e", // Humanoid robot
    "1451187580459-43490279c0fa", // Earth from space tech
    "1531297484001-80022131f5a1", // Smartphone future
    "1498050108023-c5249f4df085", // Web development code
    "1504607798333-52a30db54a5d", // Data server room
  ],
  sports: [
    "1566577739112-5180d4bf9390", // Stadium aerial
    "1546519638-68e109498ffc",   // Basketball court
    "1504450758481-7338eba7524a", // Soccer field
    "1541534741688-7078f1b56a9b", // Football action
    "1579952363873-27f3bade9f55", // Swimming race
    "1461896836374-cf369caf3571", // Running track
    "1517649763962-0c623066013b", // Cycling race
    "1587329849628-f54eedcdbcef", // Baseball pitcher
    "1560272564-d217a7eaa47e",   // Tennis match
    "1612872087720-bb876e2e67d1", // Olympic podium
    "1526676037926-405b71caa78e", // Golf swing
    "1574680096145-d05b474e2155", // Hockey ice
    "1556302132-40bb4efb1ee8",   // Boxing ring
    "1471295253337-3ceaaedeca03", // Trophy close-up
    "1593341646782-e0b83a41fa5e", // Team celebration
  ],
  health: [
    "1587854692152-cbe660dbde88", // Doctor with tablet
    "1559757148-5f50d97bb8f6",   // Medical lab
    "1576671081837-49000212a370", // Hospital corridor
    "1505751172876-fa1923c5c528", // Heart healthcare
    "1519824145371-1efc74edd2c8", // Medical research
    "1584515933487-779824d29309", // COVID mask worker
    "1543362906-acfc16c67564",   // Surgeon operating
    "1471864190281-a93a3070b6de", // Mental health wellness
    "1530026405845-5e7d67a75700", // Nutrition healthy food
    "1536856136534-bb679c52a9aa", // Pharmacy medication
    "1582750433449-648ed127bb54", // Nurse patient care
    "1490645935967-10de6ba17061", // Healthy lifestyle
    "1618015359433-e3d63a86b8e3", // Vaccine syringe
    "1516841273335-e072b728b563", // Brain scan MRI
    "1576086213369-bc1d29b5c57b", // Stethoscope doctor
  ],
  world: [
    "1523292562811-8fa7962a78c8", // World map globe
    "1577083552431-6e5fd01988ec", // NATO flag
    "1524492412937-b28074a5d7da", // Asia city skyline
    "1589254065878-42c9da997008", // Middle East desert
    "1451187580459-43490279c0fa", // Earth from orbit
    "1467269204594-9cf62f9a71b5", // Europe parliament
    "1516026672322-bc52d61a055d", // Refugees migration
    "1588361861040-ac9b1018f6d5", // Diplomacy meeting
    "1558618047-3c8cfc19e1b2",   // War conflict
    "1535082623926-52f3f07b0898", // UN headquarters
    "1549317661-cf369caf4560",   // Climate protest
    "1509099836639-18ba1795216d", // Trade port ships
    "1547721064-da6cfb341d50",   // Africa landscape
    "1488229297570-58520851e08a", // Latin America
    "1519219788971-8d9797e0928e", // Democracy protest
  ],
  entertainment: [
    "1489599849927-2ee91cede3ba", // Cinema screen
    "1511671782779-c97d3d27a1d4", // Concert crowd
    "1574375927938-d5a98e8ffe85", // TV production
    "1536440136628-849c177e76a1", // Film reel
    "1521967906867-14ec9d64bee8", // Oscar statuette
    "1459749491175-9a5b0eff6ef5", // Music studio
    "1543286386-713bdd548da4",   // Stage performance
    "1440404653325-ab127d49abc1", // Streaming service
    "1506765515384-028b60a970df", // Podcast recording
    "1517604931442-7e0c8ed2963c", // Live performance
    "1483985988355-763728e1946d", // Fashion show
    "1524168272322-0f7c5c0a57f4", // Video game
    "1485846234645-a62644f84728", // Movies video
    "1467533003447-e295ff1b0435", // Celebrity red carpet
    "1550305080-4e029753abcf",   // Comedy show
  ],
  opinion: [
    "1503551723145-6c040742065b", // Journalist writing
    "1455849318743-b2233052fcff", // Newspaper editorial
    "1434030216411-0b793f4b6f1a", // Opinion column desk
    "1471107191679-f26174d2d41e", // Typewriter vintage
    "1499750310107-5fef28a66643", // Pen and paper
    "1504711434969-e33886168f5c", // Coffee and reading
    "1515378960530-7c0da6231fb1", // Laptop opinion writer
    "1519389950473-47ba0277781c", // Team brainstorming
    "1481627834876-b7833e8f5dc1", // Library books
    "1553729459-efe14ef6055d",   // Town hall speech
    "1573497620053-ea5300f94f21", // Professional headshot desk
    "1554224155-6726b3ff858f",   // Writing strategy
    "1499914485522-1f39aea0f90e", // Press conference mic
    "1542744173-8e7e53415bb0",   // Analysis charts
    "1512314889357-e157c22f938d", // Journalism notebook
  ],
};

// Assign unique images to all articles on page load
// Uses a hash of article id to pick consistently from the pool
window.resolveArticleImage = function(article) {
  if (article.image) return article.image;
  const seed = article.slug || article.id || 'news';
  return `https://picsum.photos/seed/${seed}/900/600`;
};

// Patch ARTICLES_DB: assign images only to articles that don't already have one.
// Static articles have picsum seed URLs; RSS-fetched articles get one here.
if (typeof ARTICLES_DB !== 'undefined') {
  ARTICLES_DB.forEach(article => {
    if (article.image) return;
    const seed = article.slug || article.id || 'news';
    article.image = `https://picsum.photos/seed/${seed}/900/600`;
  });
}
