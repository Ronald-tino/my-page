import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle.jsx";
import {
  AiOutlineTeam, AiOutlineClockCircle, AiOutlineTrophy,
  AiOutlineHome, AiOutlineSmile, AiOutlineThunderbolt,
  AiOutlinePlus, AiOutlineDelete, AiOutlineUser,
  AiOutlinePause, AiOutlineSound, AiOutlinePlayCircle,
  AiOutlineClose, AiOutlineGlobal, AiOutlineCheck,
} from "react-icons/ai";
import { BsShuffle, BsPeopleFill } from "react-icons/bs";
import {
  FaDog, FaHamburger, FaFootballBall, FaFilm,
  FaStar, FaGlobeAmericas, FaBoxOpen, FaHome,
  FaBriefcase, FaMountain, FaHeartbeat, FaRunning,
  FaMusic, FaTree, FaGraduationCap, FaBus,
  FaComments, FaFutbol, FaBaby, FaCalendarAlt,
} from "react-icons/fa";

/* ================================================================ */
/*                INTERNATIONAL WORD BANK (480 words)                */
/* ================================================================ */
const INTERNATIONAL = {
  Animals: [
    "cat","dog","elephant","giraffe","shark","penguin","butterfly","snake","dolphin","lion",
    "monkey","parrot","crocodile","rabbit","eagle","whale","turtle","horse","spider","frog",
    "hamster","goldfish","cheetah","gorilla","flamingo","octopus","panda","zebra","bat","chicken",
    "duck","pigeon","mosquito","cockroach","rat","goat","cow","bee","ant","jellyfish",
  ],
  "Food & Drinks": [
    "pizza","banana","chocolate","coffee","ice cream","rice","egg","popcorn","burger","orange juice",
    "bread","pasta","watermelon","cheese","pancake","soup","honey","milk","cookie","cake",
    "fries","noodles","avocado","cereal","sandwich","donut","mango","grapes","yogurt","sushi",
    "taco","hot dog","peanut butter","ketchup","smoothie","chips","toast","bacon","lemonade","cupcake",
  ],
  "Sports & Games": [
    "football","basketball","swimming","boxing","tennis","chess","running","volleyball","golf","skateboard",
    "cricket","cycling","wrestling","surfing","table tennis","karate","gymnastics","archery","baseball","yoga",
    "rugby","badminton","ice skating","rock climbing","darts","pool","bowling","arm wrestling","push ups","marathon",
    "penalty kick","free kick","slam dunk","high jump","relay race","sit ups","skipping rope","dodgeball","tug of war","handball",
  ],
  "Movies & TV": [
    "Titanic","Frozen","Batman","Shrek","Friends","Lion King","Spider-Man","Tom and Jerry","Harry Potter","Star Wars",
    "Finding Nemo","Avengers","Squid Game","The Office","Black Panther","Jurassic Park","Toy Story","Matrix","Wednesday","Moana",
    "Stranger Things","Breaking Bad","Money Heist","John Wick","Fast and Furious","Top Gun","Hunger Games","Joker","Minions","Barbie",
    "Sonic","Deadpool","Wakanda","Game of Thrones","Rick and Morty","SpongeBob","Simpsons","Naruto","Dragon Ball","Peppa Pig",
  ],
  "Famous People": [
    "Messi","Obama","Beyonce","Einstein","Bob Marley","Oprah","Michael Jordan","Rihanna","Mandela","Cristiano Ronaldo",
    "Usain Bolt","Taylor Swift","The Rock","Adele","LeBron James","Shakira","Drake","Elon Musk","Serena Williams","Will Smith",
    "Cardi B","Snoop Dogg","Kevin Hart","Nicki Minaj","Travis Scott","Bad Bunny","Ed Sheeran","Billie Eilish","Mike Tyson","Eminem",
    "Jay Z","Kim Kardashian","Mr Beast","Kylie Jenner","Post Malone","Kendrick Lamar","Zendaya","Ice Spice","Steph Curry","Conor McGregor",
  ],
  "Countries & Cities": [
    "Paris","Japan","Brazil","London","Egypt","New York","Australia","Dubai","China","Mexico",
    "Rome","India","Hawaii","Jamaica","Canada","Moscow","Hollywood","Tokyo","South Africa","Las Vegas",
    "Nigeria","Ghana","Kenya","Zimbabwe","Germany","Spain","Thailand","Morocco","Colombia","Argentina",
    "Miami","Atlanta","Los Angeles","Barcelona","Istanbul","Singapore","Bali","Amsterdam","Seoul","Zanzibar",
  ],
  "Everyday Objects": [
    "phone","umbrella","mirror","key","toothbrush","pillow","wallet","sunglasses","candle","clock",
    "scissors","ladder","remote control","backpack","headphones","towel","doorbell","battery","chair","lightbulb",
    "charger","earbuds","laptop","microwave","blanket","soap","comb","pen","stapler","tape",
    "plug","bucket","mop","broom","plate","cup","fork","straw","dustbin","hanger",
  ],
  "Around the House": [
    "kitchen","bathtub","garden","roof","doormat","fridge","staircase","garage","window","couch",
    "oven","bedroom","toilet","balcony","chimney","shower","carpet","shelf","curtain","closet",
    "plug socket","washing machine","front door","microwave","sink","dining table","TV stand","bedsheet",
    "pillow case","door handle","light switch","ceiling fan","clothes line","shoe rack","trash can",
    "water tap","drawer","wardrobe","mailbox","doorstep",
  ],
  "Jobs & Professions": [
    "doctor","teacher","pilot","chef","firefighter","police","farmer","dentist","singer","driver",
    "nurse","mechanic","lawyer","soldier","barber","waiter","photographer","plumber","actor","coach",
    "DJ","influencer","YouTuber","security guard","cashier","delivery guy","taxi driver","cleaner","carpenter","painter",
    "electrician","receptionist","journalist","manager","accountant","babysitter","lifeguard","personal trainer","flight attendant","bouncer",
  ],
  "Nature & Weather": [
    "ocean","mountain","rainbow","volcano","thunder","sunset","desert","waterfall","earthquake","snowflake",
    "forest","river","tornado","beach","island","lightning","moon","stars","rain","glacier",
    "sunrise","heatwave","flood","drought","fog","hail","hurricane","tide","cliff","cave",
    "valley","jungle","pond","mud","dust","shadow","echo","frost","breeze","dew",
  ],
  "Body & Health": [
    "elbow","eyebrow","knee","tongue","fingerprint","muscle","stomach","backbone","heartbeat","sneeze",
    "hiccup","yawn","blister","bruise","dimple","ankle","wrist","freckle","eyelash","rib",
    "armpit","belly button","goosebumps","Adam's apple","knuckle","shin","forehead","jawline","collarbone","nostril",
    "palm","heel","waist","hip","thigh","shoulder","chest","fingernail","throat","temple",
  ],
  Actions: [
    "dancing","sleeping","cooking","laughing","sneezing","clapping","whistling","swimming","jumping","crying",
    "running","painting","singing","waving","climbing","hugging","yawning","blinking","crawling","snoring",
    "dabbing","flexing","scrolling","ghosting","vibing","texting","selfie","photobomb","fist bump","high five",
    "eye roll","thumbs up","whispering","stretching","tiptoeing","tripping","slipping","shivering","winking","nodding",
  ],
};

/* ================================================================ */
/*               ZIMBABWEAN WORD BANK (480 words)                    */
/* ================================================================ */
const ZIMBABWEAN = {
  "Zim Food & Drinks": [
    "sadza","muriwo","dovi","maputi","maheu","mazoe","madora","kapenta","matemba","biltong",
    "boerewors","magwinya","chimodho","rupiza","derere","nyama","mukaka","doro","chibuku","freezit",
    "nhopi","mufushwa","mangoye","zvinyenze","guava","mupunga","muboora","tsunga","huku","nyimo",
    "nzungu","muto","bota","peanut butter bread","rice and chicken","braai","scud","mapfura","mvura","tea",
  ],
  "Shona Everyday Words": [
    "mhoro","maita basa","ndapota","zvakanaka","mangwanani","masikati","manheru","enda","uya","gara",
    "mira","teerera","tamba","seka","chema","dya","mhanya","rara","vhura","vhara",
    "tsvaira","bika","imbwa","kamba","gonzo","shiri","mbeva","mvura","zuva","mwedzi",
    "nyeredzi","moto","mhepo","nyika","gomo","rwizi","danga","mombe","mbudzi","huku",
  ],
  "Zim Places": [
    "Harare","Bulawayo","Mutare","Masvingo","Gweru","Kwekwe","Chitungwiza","Victoria Falls","Great Zimbabwe","Nyanga",
    "Kariba","Chinhoyi Caves","Hwange","Mana Pools","Beitbridge","Matopos","Chipinge","Kadoma","Bindura","Rusape",
    "Mbare","Borrowdale","Avondale","Sam Levy","Joina City","Eastgate","Copacabana","Lake Chivero","Epworth","Norton",
    "Chegutu","Zvishavane","Shurugwi","Karoi","Banket","Mazowe","Highfield","Glen View","Warren Park","Budiriro",
  ],
  "Zim Celebrities": [
    "Winky D","Jah Prayzah","Oliver Mtukudzi","Thomas Mapfumo","Alick Macheso","Suluman Chimbetu","Mai TT","Madam Boss",
    "Comic Pastor","Tyra Chikocho","Gary Magadzire","Roki","Holy Ten","Ti Gonzi","ExQ","Tocky Vibes",
    "Peter Ndlovu","Benjani Mwaruwari","Knowledge Musona","Kirsty Coventry","Henry Olonga","Strive Masiyiwa",
    "Charles Charamba","Mechanic Manyeruke","Leonard Zhakata","Baba Harare","Seh Calaz","Freeman",
    "Ammara Brown","Fungisai","Andy Muridzo","Mark Chinouriri","Cindy Munyavi","Stunner",
    "Soul Jah Love","Killer T","Enzo Ishall","Nutty O","Takura","Gemma Griffiths",
  ],
  "School & Growing Up": [
    "assembly","PT shorts","sadza ne muriwo","homework","prep","tuckshop","groundnut","mango season",
    "guava tree","marbles","nhodo","pada","wire car","catapult","hide and seek","swimming in the river",
    "herding cattle","fetching water","grinding mill","school shoes","uniform","report card","boarding school",
    "prefect","headmaster","detention","caning","sports day","inter-house","ndiro","nhava","chikoro",
    "penzura","chibage","hopscotch","skipping rope","stone game","river bathing","choir","prize giving",
  ],
  "Transport & Street Life": [
    "kombi","hwindi","rank","mushikashika","pirate taxi","emergency taxi","Copacabana rank","OK","TM","Spar",
    "flea market","tuck shop","vendor","airtime","EcoCash","bond note","USD","load shedding","borehole",
    "Blair toilet","durawall","precast wall","gate","tollgate","pothole","tarred road","dust road",
    "scotch cart","wheelbarrow","pushcart","bicycle","round about","robot","boom box","generator",
    "solar panel","water tank","jeri can","black market","cross border",
  ],
  "Zim Slang": [
    "sharp sharp","ndeipi","zvakanaka","bhora musango","magetsi","kushaina","pamusoro","pasi",
    "kudhakwa","kushanda","kuenda","kubuda","kupinda","kutenga","kutengesa","kushanya","kukumbira",
    "shamwari","bro","sisi","mukoma","mainini","sekuru","mbuya","babamukuru","tete","muzukuru",
    "tigere","handei","baba","amai","chinja maitiro","kukiya taya","kufaya","zvinhu","manje manje",
    "ini hangu","ita zvako","hazvina basa","ko iwe",
  ],
  "Zim Wildlife & Nature": [
    "elephant","lion","buffalo","leopard","rhino","kudu","impala","warthog","baboon","crocodile",
    "hippo","giraffe","sable antelope","eland","wildebeest","hyena","jackal","python","mamba","eagle",
    "vulture","pangolin","honey badger","chameleon","monitor lizard","baobab","msasa","jacaranda",
    "flamboyant tree","bougainvillea","mopane","teak","mukwa","muhacha","muzhanje","marula",
    "flame lily","lucky bean","wild fig","acacia",
  ],
  "Zim Music & Entertainment": [
    "sungura","chimurenga","jit","Zimdancehall","mbira","hosho","ngoma","drum","guitar","bass",
    "keyboard","concert","album","hit song","riddim","track","beat","mic","stage","Harare Gardens",
    "Glamis","HICC","Book Cafe","Reps Theatre","HIFA","Star FM","ZBC TV",
    "Jah Signal","Dobba Don","Shinsoman","Poptain","dancehall","gospel","rhumba","afro pop",
    "music video","download","trending","remix","feature",
  ],
  "Zim Sports": [
    "football","cricket","rugby","netball","tennis","swimming","athletics","CAPS United","Dynamos",
    "Highlanders","Chicken Inn","FC Platinum","Black Rhinos","ZPC Kariba","Warriors","Chevrons",
    "Peter Ndlovu","Kirsty Coventry","national stadium","Rufaro","Barbourfields","goal","penalty",
    "corner kick","red card","offside","try","scrum","wicket","six","four","marathon","boxing",
    "chess","darts","pool table","Olympics","Commonwealth Games","trophy","league",
  ],
  "Home & Family Life": [
    "musha","dare","kitchen","bedroom","bathroom","garden","veranda","yard","gate","fence",
    "well","fireplace","granary","chicken run","orchard","compound","rural home","urban home",
    "lodger","landlord","tenant","rent","rates","ZESA","water bill","cooking oil","mealie meal",
    "sugar","salt","tea","bread","relish","firewood","paraffin","gas stove","electric stove",
    "braai stand","washing line","broom","bucket",
  ],
  "Holidays & Traditions": [
    "Independence Day","Heroes Day","Unity Day","Christmas","Easter","New Year","Mothers Day",
    "lobola","roora","nhimbe","kurova guva","bira","ceremony","church","wedding","birthday",
    "funeral","memorial","thanksgiving","harvest","planting season","rain season","winter",
    "dare","traditional healer","totem","mutupo","clan","rural area","growth point","township",
    "suburb","CBD","high density","low density","plot","stand","musika","trade fair","agricultural show",
  ],
};

/* ================================================================ */
/*                      CATEGORY METADATA                            */
/* ================================================================ */
const INT_META = {
  Animals:             { color: "#f97316", emoji: "\uD83D\uDC3E" },
  "Food & Drinks":     { color: "#ef4444", emoji: "\uD83C\uDF54" },
  "Sports & Games":    { color: "#22c55e", emoji: "\u26BD" },
  "Movies & TV":       { color: "#8b5cf6", emoji: "\uD83C\uDFAC" },
  "Famous People":     { color: "#ec4899", emoji: "\u2B50" },
  "Countries & Cities":{ color: "#3b82f6", emoji: "\uD83C\uDF0D" },
  "Everyday Objects":  { color: "#eab308", emoji: "\uD83C\uDF92" },
  "Around the House":  { color: "#14b8a6", emoji: "\uD83C\uDFE0" },
  "Jobs & Professions":{ color: "#f43f5e", emoji: "\uD83D\uDC68\u200D\u2695\uFE0F" },
  "Nature & Weather":  { color: "#06b6d4", emoji: "\uD83C\uDF0A" },
  "Body & Health":     { color: "#a855f7", emoji: "\uD83D\uDCAA" },
  Actions:             { color: "#84cc16", emoji: "\uD83C\uDFC3" },
};

const ZIM_META = {
  "Zim Food & Drinks":       { color: "#ef4444", emoji: "\uD83C\uDF5A" },
  "Shona Everyday Words":    { color: "#f97316", emoji: "\uD83D\uDDE3\uFE0F" },
  "Zim Places":              { color: "#3b82f6", emoji: "\uD83C\uDDFF\uD83C\uDDFC" },
  "Zim Celebrities":         { color: "#ec4899", emoji: "\uD83C\uDF1F" },
  "School & Growing Up":     { color: "#eab308", emoji: "\uD83C\uDFEB" },
  "Transport & Street Life": { color: "#14b8a6", emoji: "\uD83D\uDE8C" },
  "Zim Slang":               { color: "#8b5cf6", emoji: "\uD83D\uDCAC" },
  "Zim Wildlife & Nature":   { color: "#22c55e", emoji: "\uD83E\uDD81" },
  "Zim Music & Entertainment":{ color: "#f43f5e", emoji: "\uD83C\uDFB5" },
  "Zim Sports":              { color: "#06b6d4", emoji: "\uD83C\uDFC6" },
  "Home & Family Life":      { color: "#a855f7", emoji: "\uD83C\uDFE1" },
  "Holidays & Traditions":   { color: "#84cc16", emoji: "\uD83C\uDF8A" },
};

function getWordBank(pack) { return pack === "zimbabwean" ? ZIMBABWEAN : INTERNATIONAL; }
function getCategoryMeta(pack) { return pack === "zimbabwean" ? ZIM_META : INT_META; }

function getRandomWords(count, category, wordBank, usedWords) {
  const pool = wordBank[category] || [];
  const available = pool.filter((w) => !usedWords.has(w));
  const source = available.length >= count ? available : pool;
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/* ================================================================ */
/*                         CONSTANTS                                 */
/* ================================================================ */
const PLAYER_COLORS = [
  "#8b5cf6","#f97316","#22c55e","#ec4899","#3b82f6",
  "#eab308","#14b8a6","#ef4444","#a855f7","#06b6d4",
  "#f43f5e","#84cc16","#6366f1","#fb923c","#2dd4bf",
  "#e879f9","#38bdf8","#fbbf24","#4ade80","#f87171",
];
const TEAM_PRESETS = [
  { name: "Team Sun", icon: "\u2600\uFE0F" },
  { name: "Team Moon", icon: "\uD83C\uDF19" },
  { name: "Team Star", icon: "\u2B50" },
  { name: "Team Fire", icon: "\uD83D\uDD25" },
  { name: "Team Wave", icon: "\uD83C\uDF0A" },
];
const WORD_BORDER_COLORS = ["#f97316","#8b5cf6","#22c55e","#3b82f6","#ec4899","#eab308","#14b8a6"];

/* ================================================================ */
/*                       SHARED STYLES                               */
/* ================================================================ */
const cardStyle = {
  background: "rgba(255,255,255,0.06)", borderRadius: "20px",
  padding: "28px", border: "1px solid rgba(255,255,255,0.08)",
};
const orangeBtn = {
  background: "linear-gradient(135deg, #ff6b35, #ff8c42, #ffa64d)",
  border: "none", padding: "14px 45px", fontSize: "1.15em",
  fontWeight: "700", borderRadius: "50px", color: "#fff",
  cursor: "pointer", position: "relative", zIndex: 2,
};
const purpleBtn = {
  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  border: "none", padding: "14px 45px", fontSize: "1.15em",
  fontWeight: "700", borderRadius: "50px", color: "#fff",
  cursor: "pointer", position: "relative", zIndex: 2,
};
const outlineBtn = {
  background: "transparent", border: "2px solid rgba(255,255,255,0.3)",
  padding: "12px 35px", fontSize: "1em", fontWeight: "600",
  borderRadius: "50px", color: "#fff", cursor: "pointer",
  position: "relative", zIndex: 2,
};
const gradientDivider = {
  height: "4px", borderRadius: "2px",
  background: "linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)",
  margin: "30px 0", opacity: 0.6,
};
const mb = { marginBottom: "25px" };

/* ================================================================ */
/*              SCREEN 1: LANDING PAGE                               */
/* ================================================================ */
function LandingPage({ onStart }) {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{
          width: "85px", height: "85px", borderRadius: "20px",
          background: "linear-gradient(135deg, #ff6b35, #c770f0, #00d4ff, #51cf66)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 18px", fontSize: "1.8em", fontWeight: "800", color: "#fff",
        }}>30</div>
        <h1 style={{ color: "#fff", fontSize: "2.8em", fontWeight: "800", lineHeight: 1.1, marginBottom: "8px" }}>
          30 Seconds<br /><span style={{ color: "#c770f0" }}>Online</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05em", marginBottom: "20px" }}>
          Free 30 Second Word Game Online
        </p>
      </div>
      <div style={{ ...cardStyle, ...mb }}>
        <h3 style={{ color: "#fff", textAlign: "center", fontWeight: "700", marginBottom: "6px" }}>How to play?</h3>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: "0.88em", marginBottom: "25px" }}>
          A fast-paced word game where teams race to describe words without saying them.
          Score as many words as possible in 30 seconds!
        </p>
        {[
          { icon: <AiOutlineTeam />, color: "#f97316", bg: "rgba(249,115,22,0.15)", title: "4+ Players", desc: "Perfect for teams and parties. At least 2 players needed." },
          { icon: <AiOutlineClockCircle />, color: "#8b5cf6", bg: "rgba(139,92,246,0.15)", title: "30 Seconds", desc: "Describe as many words as possible in the time limit." },
          { icon: <AiOutlineTrophy />, color: "#22c55e", bg: "rgba(34,197,94,0.15)", title: "Score Points", desc: "Each correctly guessed word earns your team a point." },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: i < 2 ? "18px" : 0 }}>
            <div style={{ background: item.bg, borderRadius: "12px", padding: "10px", flexShrink: 0, fontSize: "1.4em", color: item.color }}>{item.icon}</div>
            <div>
              <h5 style={{ color: "#fff", margin: "0 0 3px", fontWeight: "600", fontSize: "1em" }}>{item.title}</h5>
              <p style={{ color: "rgba(255,255,255,0.45)", margin: 0, fontSize: "0.83em" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={gradientDivider} />
      <div style={{ ...cardStyle, ...mb }}>
        <h4 style={{ color: "#fff", textAlign: "center", fontWeight: "700", marginBottom: "22px" }}>Perfect for every occasion</h4>
        {[
          { icon: <AiOutlineHome />, color: "#ec4899", title: "Home with family", desc: "Fun for all ages, perfect family game night activity" },
          { icon: <AiOutlineSmile />, color: "#eab308", title: "Parties and gatherings", desc: "Great icebreaker that gets everyone laughing and talking" },
          { icon: <AiOutlineThunderbolt />, color: "#00d4ff", title: "School and work", desc: "Perfect for team building and quick brain-teaser breaks" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: i < 2 ? "18px" : 0 }}>
            <span style={{ color: item.color, fontSize: "1.4em", flexShrink: 0 }}>{item.icon}</span>
            <div>
              <h6 style={{ color: "#fff", margin: "0 0 2px", fontWeight: "600" }}>{item.title}</h6>
              <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.82em" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", padding: "10px 0 30px" }}>
        <button onClick={onStart} style={orangeBtn}>{"\u25B6\uFE0F"} Start Game</button>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85em", marginTop: "14px" }}>
          Perfect for friends, family and parties! {"\uD83C\uDF89"}
        </p>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 2: LANGUAGE / WORD PACK SELECT                */
/* ================================================================ */
function LanguageSelect({ onSelect }) {
  const packs = [
    {
      id: "international", emoji: "\uD83C\uDF0D",
      gradient: "linear-gradient(135deg, #f97316, #ff8c42)",
      title: "International",
      desc: "Common words everyone knows. 12 categories, 480 words. Perfect for mixed groups.",
      borderColor: "rgba(249,115,22,0.3)", hoverBorder: "rgba(249,115,22,0.7)", hoverBg: "rgba(249,115,22,0.08)",
    },
    {
      id: "zimbabwean", emoji: "\uD83C\uDDFF\uD83C\uDDFC",
      gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
      title: "Zimbabwean",
      desc: "Shona words, Zim slang, local places, celebrities & culture. 12 categories, 480 words.",
      borderColor: "rgba(34,197,94,0.3)", hoverBorder: "rgba(34,197,94,0.7)", hoverBg: "rgba(34,197,94,0.08)",
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <AiOutlineGlobal style={{ fontSize: "2.5em", color: "#8b5cf6", marginBottom: "12px" }} />
        <h2 style={{ color: "#fff", fontWeight: "700", marginBottom: "5px" }}>Choose Word Pack</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9em" }}>
          Pick which word set you want to play with
        </p>
      </div>
      {packs.map((pack) => (
        <div key={pack.id} onClick={() => onSelect(pack.id)}
          style={{
            ...cardStyle, marginBottom: "15px", cursor: "pointer",
            border: `2px solid ${pack.borderColor}`, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = pack.hoverBorder; e.currentTarget.style.background = pack.hoverBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = pack.borderColor; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "55px", height: "55px", borderRadius: "14px", background: pack.gradient,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6em", flexShrink: 0,
            }}>{pack.emoji}</div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: "#fff", margin: "0 0 4px", fontWeight: "700" }}>{pack.title}</h4>
              <p style={{ color: "rgba(255,255,255,0.45)", margin: 0, fontSize: "0.82em" }}>{pack.desc}</p>
            </div>
            <div style={{ color: "#fff", fontSize: "1.5em", flexShrink: 0, opacity: 0.4 }}>{"\u2192"}</div>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <button onClick={() => onSelect("back")} style={outlineBtn}>Back</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*         SCREEN (per turn): PICK CATEGORY                          */
/* ================================================================ */
function PickCategory({ wordPack, currentPlayer, currentTeam, teams, currentRound, onPick }) {
  const meta = getCategoryMeta(wordPack);
  const bank = getWordBank(wordPack);
  const categories = Object.keys(bank);

  return (
    <div>
      <Scoreboard teams={teams} currentRound={currentRound} />

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", justifyContent: "center" }}>
        <div style={{
          width: "45px", height: "45px", borderRadius: "50%", background: currentPlayer.color,
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2em",
        }}><AiOutlineUser /></div>
        <div>
          <span style={{ color: "#fff", fontWeight: "600" }}>{currentPlayer.name}</span>
          <span style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.78em" }}>{currentTeam.name}</span>
        </div>
      </div>

      <h3 style={{ color: "#fff", textAlign: "center", fontWeight: "700", marginBottom: "5px" }}>Pick a Category</h3>
      <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", fontSize: "0.85em", marginBottom: "22px" }}>
        Choose which category you want to play this round
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {categories.map((cat) => {
          const m = meta[cat] || { color: "#8b5cf6", emoji: "\uD83C\uDFAE" };
          return (
            <div key={cat} onClick={() => onPick(cat)}
              style={{
                ...cardStyle, padding: "18px 14px", cursor: "pointer",
                border: `2px solid rgba(255,255,255,0.06)`,
                transition: "all 0.15s ease", position: "relative", zIndex: 2, textAlign: "center",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${m.color}60`; e.currentTarget.style.background = `${m.color}12`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            >
              <div style={{ fontSize: "2em", marginBottom: "6px" }}>{m.emoji}</div>
              <h6 style={{ color: "#fff", margin: "0 0 3px", fontWeight: "600", fontSize: "0.82em" }}>{cat}</h6>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7em" }}>{bank[cat].length} words</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 3: ADD PLAYERS                                */
/* ================================================================ */
function AddPlayers({ players, setPlayers, onNext, onBack }) {
  const [name, setName] = useState("");
  const [numTeams, setNumTeams] = useState(2);
  const [teamMode, setTeamMode] = useState("random");

  const addPlayer = () => {
    const trimmed = name.trim();
    if (!trimmed || players.length >= 20) return;
    setPlayers((prev) => [...prev, { name: trimmed, color: PLAYER_COLORS[prev.length % PLAYER_COLORS.length], id: Date.now() }]);
    setName("");
  };
  const removePlayer = (id) => setPlayers((prev) => prev.filter((p) => p.id !== id));
  const handleKeyDown = (e) => { if (e.key === "Enter") addPlayer(); };

  return (
    <div>
      <h2 style={{ color: "#fff", textAlign: "center", fontWeight: "700", marginBottom: "5px" }}>Add Players</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "25px", fontSize: "0.9em" }}>Minimum 2 players, maximum 20</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Enter player name..." maxLength={20}
          style={{ flex: 1, padding: "12px 18px", borderRadius: "12px", border: "2px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: "1em", outline: "none" }} />
        <button onClick={addPlayer} style={{ ...orangeBtn, padding: "12px 16px", fontSize: "1.2em", borderRadius: "12px", opacity: name.trim() ? 1 : 0.4 }}><AiOutlinePlus /></button>
      </div>

      {players.length > 0 && (
        <div style={{ ...cardStyle, ...mb }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
            <h5 style={{ color: "#fff", margin: 0, fontWeight: "600" }}>Players</h5>
            <span style={{ background: "#f97316", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75em", fontWeight: "700" }}>{players.length}</span>
          </div>
          {players.map((p) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "35px", height: "35px", borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "0.9em", textTransform: "uppercase" }}>{p.name[0]}</div>
                <span style={{ color: "#fff", fontWeight: "500" }}>{p.name}</span>
              </div>
              <button onClick={() => removePlayer(p.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.2em", padding: "4px", position: "relative", zIndex: 2 }}><AiOutlineDelete /></button>
            </div>
          ))}
        </div>
      )}

      <div style={gradientDivider} />

      <div style={{ ...cardStyle, ...mb }}>
        <h5 style={{ color: "#fff", fontWeight: "600", marginBottom: "15px" }}>Team Creation</h5>
        <div style={{ display: "flex", borderRadius: "50px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)", marginBottom: "20px", width: "fit-content" }}>
          {["random", "manual"].map((mode) => (
            <button key={mode} onClick={() => setTeamMode(mode)} style={{
              padding: "8px 22px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.85em", display: "flex", alignItems: "center", gap: "6px",
              background: teamMode === mode ? "linear-gradient(135deg, #f97316, #ff8c42)" : "transparent",
              color: teamMode === mode ? "#fff" : "rgba(255,255,255,0.5)", position: "relative", zIndex: 2,
            }}>{mode === "random" ? <><BsShuffle /> Random</> : <><BsPeopleFill /> Manual</>}</button>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85em", margin: "0 0 8px" }}>Number of Teams</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setNumTeams(n)} disabled={players.length < n} style={{
              padding: "8px 18px", borderRadius: "50px", fontWeight: "600", fontSize: "0.85em",
              cursor: players.length >= n ? "pointer" : "not-allowed", border: "none",
              background: numTeams === n ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "rgba(255,255,255,0.08)",
              color: numTeams === n ? "#fff" : "rgba(255,255,255,0.5)", opacity: players.length >= n ? 1 : 0.3, position: "relative", zIndex: 2,
            }}>{n} Teams</button>
          ))}
        </div>
        {players.length >= 2 && <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78em", marginTop: "8px" }}>{numTeams} teams with ~{Math.round(players.length / numTeams)} players each</p>}
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onBack} style={outlineBtn}>Back</button>
        <button onClick={() => onNext(numTeams, teamMode)} style={{ ...orangeBtn, opacity: players.length >= 2 ? 1 : 0.4 }} disabled={players.length < 2}>Create Teams</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 4: TEAMS CREATED                              */
/* ================================================================ */
function TeamsCreated({ teams, onStart, onReshuffle, onBack }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2em", marginBottom: "8px" }}>{"\u2728"}</div>
      <h2 style={{ color: "#fff", fontWeight: "700", marginBottom: "5px" }}>Teams Created!</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "25px", fontSize: "0.9em" }}>Ready to start the game!</p>
      {teams.map((team, i) => (
        <div key={i} style={{ ...cardStyle, marginBottom: "15px", textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.3em" }}>{team.icon}</span>
              <h5 style={{ color: "#fff", margin: 0, fontWeight: "600" }}>{team.name}</h5>
            </div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85em" }}>{team.players.length} players</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {team.players.map((p) => (
              <span key={p.id} style={{ padding: "5px 14px", borderRadius: "50px", fontSize: "0.82em", fontWeight: "500", background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}40` }}>{p.name}</span>
            ))}
          </div>
        </div>
      ))}
      <div style={{ marginTop: "25px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <button onClick={onStart} style={purpleBtn}>{"\u25B6\uFE0F"} Start Game</button>
        <button onClick={onReshuffle} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "0.9em", display: "flex", alignItems: "center", gap: "6px", position: "relative", zIndex: 2 }}><BsShuffle /> Reshuffle Teams</button>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "0.85em", position: "relative", zIndex: 2 }}>Back to Players</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 5: GAME SETTINGS                              */
/* ================================================================ */
function GameSettings({ settings, setSettings, onStart, onBack }) {
  const { timerDuration, winMode, winTarget, wordsPerTurn, sound } = settings;
  const update = (key, val) => setSettings((s) => ({ ...s, [key]: val }));
  return (
    <div>
      <h2 style={{ color: "#fff", textAlign: "center", fontWeight: "700", marginBottom: "5px" }}>Game Settings</h2>
      <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "30px", fontSize: "0.9em" }}>Customize the game to your preference</p>

      <div style={{ ...cardStyle, ...mb }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AiOutlineClockCircle style={{ color: "#8b5cf6", fontSize: "1.3em" }} />
            <div><h5 style={{ color: "#fff", margin: 0, fontWeight: "600", fontSize: "0.95em" }}>Timer Duration</h5><p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.78em" }}>How long per turn</p></div>
          </div>
          <span style={{ background: "linear-gradient(135deg, #f97316, #ff8c42)", color: "#fff", padding: "4px 12px", borderRadius: "50px", fontWeight: "700", fontSize: "0.85em" }}>{timerDuration}s</span>
        </div>
        <input type="range" min="15" max="60" step="5" value={timerDuration} onChange={(e) => update("timerDuration", Number(e.target.value))} style={{ width: "100%", accentColor: "#8b5cf6" }} />
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.3)", fontSize: "0.75em" }}><span>15s</span><span>60s</span></div>
      </div>

      <div style={{ ...cardStyle, ...mb }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
          <AiOutlineTrophy style={{ color: "#f97316", fontSize: "1.3em" }} />
          <h5 style={{ color: "#fff", margin: 0, fontWeight: "600", fontSize: "0.95em" }}>Win Condition</h5>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78em", marginBottom: "12px" }}>Choose how the game ends</p>
        <div style={{ display: "flex", borderRadius: "50px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)", marginBottom: "15px", width: "fit-content" }}>
          {["points", "rounds"].map((mode) => (
            <button key={mode} onClick={() => update("winMode", mode)} style={{
              padding: "8px 22px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.85em", textTransform: "capitalize",
              background: winMode === mode ? "linear-gradient(135deg, #f97316, #ff8c42)" : "transparent",
              color: winMode === mode ? "#fff" : "rgba(255,255,255,0.5)", position: "relative", zIndex: 2,
            }}>{mode}</button>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8em", marginBottom: "8px" }}>{winMode === "points" ? "First to reach points" : "Play set number of rounds"}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {(winMode === "points" ? [30, 60, 90, 120, 150] : [3, 5, 10, 15]).map((n) => (
            <button key={n} onClick={() => update("winTarget", n)} style={{
              padding: "7px 16px", borderRadius: "50px", fontWeight: "600", fontSize: "0.82em", border: "none", cursor: "pointer",
              background: winTarget === n ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "rgba(255,255,255,0.08)",
              color: winTarget === n ? "#fff" : "rgba(255,255,255,0.5)", position: "relative", zIndex: 2,
            }}>{n} {winMode === "points" ? "pts" : "rounds"}</button>
          ))}
        </div>
      </div>

      <div style={{ ...cardStyle, ...mb }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <h5 style={{ color: "#fff", margin: 0, fontWeight: "600", fontSize: "0.95em" }}>Words per Turn</h5>
          <span style={{ background: "#22c55e", color: "#fff", padding: "3px 10px", borderRadius: "50px", fontWeight: "700", fontSize: "0.82em" }}>{wordsPerTurn}</span>
        </div>
        <input type="range" min="3" max="7" step="1" value={wordsPerTurn} onChange={(e) => update("wordsPerTurn", Number(e.target.value))} style={{ width: "100%", accentColor: "#8b5cf6" }} />
      </div>

      <div style={{ ...cardStyle, ...mb }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AiOutlineSound style={{ color: "#3b82f6", fontSize: "1.2em" }} />
            <h5 style={{ color: "#fff", margin: 0, fontWeight: "600", fontSize: "0.95em" }}>Sound</h5>
          </div>
          <label style={{ position: "relative", width: "48px", height: "26px", cursor: "pointer" }}>
            <input type="checkbox" checked={sound} onChange={(e) => update("sound", e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50px", background: sound ? "#8b5cf6" : "rgba(255,255,255,0.15)", transition: "0.3s" }}>
              <span style={{ position: "absolute", top: "3px", left: sound ? "25px" : "3px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "0.3s" }} />
            </span>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onBack} style={outlineBtn}>Back</button>
        <button onClick={onStart} style={orangeBtn}>{"\u25B6\uFE0F"} Start Game!</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCOREBOARD                                           */
/* ================================================================ */
function Scoreboard({ teams, currentRound }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 20px", background: "rgba(255,255,255,0.04)",
      borderRadius: "14px", marginBottom: "25px", border: "1px solid rgba(255,255,255,0.06)",
    }}>
      {teams.map((t, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ color: i === 0 ? "#f97316" : i === 1 ? "#8b5cf6" : "#22c55e", fontSize: "1.5em", fontWeight: "800" }}>{t.score}</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7em" }}>{t.name}</div>
        </div>
      ))}
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78em" }}>Round</div>
        <div style={{ color: "#fff", fontWeight: "700" }}>{currentRound}</div>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 6: TURN ANNOUNCEMENT                          */
/* ================================================================ */
function TurnAnnounce({ teams, currentPlayer, currentTeam, currentRound, onPlay }) {
  return (
    <div>
      <Scoreboard teams={teams} currentRound={currentRound} />
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: currentPlayer.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: "2em", color: "#fff" }}><AiOutlineUser /></div>
        <h2 style={{ color: "#fff", fontWeight: "700", marginBottom: "5px" }}>{currentPlayer.name}'s Turn</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "40px", fontSize: "0.9em" }}>{currentTeam.name} {"\u2013"} Pick a category to play</p>
        <button onClick={onPlay} style={{
          width: "80px", height: "80px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f97316, #ff8c42)",
          border: "none", cursor: "pointer", fontSize: "2em", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto", boxShadow: "0 4px 25px rgba(249,115,22,0.4)", position: "relative", zIndex: 2,
        }}><AiOutlinePlayCircle /></button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 7: GAMEPLAY                                   */
/* ================================================================ */
function GameplayScreen({ teams, currentPlayer, currentTeam, currentRound, activeCategory, words, checked, timeLeft, timerDuration, paused, onToggle, onPause, onEndTurn, wordPack }) {
  const timerColor = timeLeft > 10 ? "#22c55e" : timeLeft > 5 ? "#eab308" : "#ef4444";
  const meta = getCategoryMeta(wordPack);
  const catMeta = meta[activeCategory] || { color: "#8b5cf6", emoji: "\uD83C\uDFAE" };

  return (
    <div>
      <Scoreboard teams={teams} currentRound={currentRound} />

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", justifyContent: "center" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: currentPlayer.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.1em" }}><AiOutlineUser /></div>
        <div>
          <span style={{ color: "#fff", fontWeight: "600" }}>{currentPlayer.name}'s Turn</span>
          <span style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.78em" }}>{currentTeam.name}</span>
        </div>
      </div>

      {/* Active category badge */}
      <div style={{ textAlign: "center", marginBottom: "18px" }}>
        <span style={{ padding: "6px 18px", borderRadius: "50px", fontSize: "0.85em", fontWeight: "600", background: `${catMeta.color}20`, color: catMeta.color, border: `1px solid ${catMeta.color}40` }}>
          {catMeta.emoji} {activeCategory}
        </span>
      </div>

      <div style={{ textAlign: "center", marginBottom: "22px" }}>
        <div style={{ color: timerColor, fontSize: "3em", fontWeight: "800", lineHeight: 1 }}>{timeLeft}</div>
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75em" }}>seconds</div>
        <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden", marginTop: "10px" }}>
          <div style={{ width: `${(timeLeft / timerDuration) * 100}%`, height: "100%", background: timerColor, borderRadius: "3px", transition: "width 1s linear, background 0.3s" }} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
        {words.map((word, i) => {
          const borderColor = WORD_BORDER_COLORS[i % WORD_BORDER_COLORS.length];
          return (
            <div key={i} onClick={() => onToggle(i)} style={{
              padding: "16px 20px", borderRadius: "12px", cursor: "pointer",
              background: checked[i] ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)",
              borderLeft: `4px solid ${checked[i] ? "#22c55e" : borderColor}`,
              borderTop: checked[i] ? "2px solid rgba(34,197,94,0.35)" : "2px solid rgba(255,255,255,0.06)",
              borderRight: checked[i] ? "2px solid rgba(34,197,94,0.35)" : "2px solid rgba(255,255,255,0.06)",
              borderBottom: checked[i] ? "2px solid rgba(34,197,94,0.35)" : "2px solid rgba(255,255,255,0.06)",
              transition: "all 0.15s ease", userSelect: "none", position: "relative", zIndex: 2,
            }}>
              <span style={{ color: checked[i] ? "#22c55e" : "#fff", fontSize: "1.15em", fontWeight: "600", textDecoration: checked[i] ? "line-through" : "none" }}>{word}</span>
            </div>
          );
        })}
      </div>

      <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: "14px", padding: "16px 18px", marginBottom: "22px", border: "1px solid rgba(239,68,68,0.15)" }}>
        <h6 style={{ color: "#ef4444", fontWeight: "700", fontSize: "0.85em", marginBottom: "10px" }}>Rules {"\u2013"} What you CANNOT do:</h6>
        {["Say the word itself or parts of it","Spell or translate the word to another language","Use direct rhyming words (e.g. cat \u2192 hat)","Point to, write down or draw the word","Make sounds that directly give away the word"].map((rule, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: i < 4 ? "5px" : 0 }}>
            <AiOutlineClose style={{ color: "#ef4444", fontSize: "0.8em", marginTop: "3px", flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78em" }}>{rule}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onPause} style={outlineBtn}><AiOutlinePause style={{ marginRight: "6px" }} />{paused ? "Resume" : "Pause"}</button>
        <button onClick={onEndTurn} style={{ ...orangeBtn, background: "linear-gradient(135deg, #ef4444, #f97316)" }}>End Turn</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 8: TURN RESULTS                               */
/* ================================================================ */
function TurnResults({ teams, currentPlayer, currentTeam, currentRound, activeCategory, words, checked, turnScore, onNext, wordPack }) {
  const meta = getCategoryMeta(wordPack);
  const catMeta = meta[activeCategory] || { color: "#8b5cf6", emoji: "\uD83C\uDFAE" };
  return (
    <div>
      <Scoreboard teams={teams} currentRound={currentRound} />
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "55px", height: "55px", borderRadius: "50%", background: currentPlayer.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: "#fff", fontSize: "1.3em" }}><AiOutlineUser /></div>
        <h3 style={{ color: "#fff", fontWeight: "700", marginBottom: "3px" }}>{currentPlayer.name}'s Results</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85em", marginBottom: "8px" }}>{currentTeam.name}</p>
        <span style={{ padding: "4px 14px", borderRadius: "50px", fontSize: "0.78em", fontWeight: "600", background: `${catMeta.color}20`, color: catMeta.color }}>{catMeta.emoji} {activeCategory}</span>
        <div style={{ fontSize: "3em", fontWeight: "800", color: turnScore > 0 ? "#22c55e" : "#ef4444", marginTop: "15px", marginBottom: "5px" }}>
          {turnScore} <span style={{ fontSize: "0.35em", color: "rgba(255,255,255,0.4)" }}>/ {words.length}</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85em", marginBottom: "25px" }}>words guessed correctly</p>
      </div>
      <div style={{ ...cardStyle, marginBottom: "25px" }}>
        {words.map((word, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < words.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <span style={{ fontSize: "1.1em" }}>{checked[i] ? "\u2705" : "\u274C"}</span>
            <span style={{ color: checked[i] ? "#22c55e" : "rgba(255,255,255,0.35)", fontWeight: "500" }}>{word}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}><button onClick={onNext} style={orangeBtn}>Next Turn</button></div>
    </div>
  );
}

/* ================================================================ */
/*              SCREEN 9: GAME OVER                                  */
/* ================================================================ */
function GameOver({ teams, onPlayAgain, onBackToMenu }) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const winner = sorted[0];
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "3em", marginBottom: "10px" }}>{"\uD83C\uDFC6"}</div>
      <h2 style={{ color: "#fff", fontWeight: "800", fontSize: "2em", marginBottom: "5px" }}>Game Over!</h2>
      <p style={{ color: "#22c55e", fontSize: "1.2em", fontWeight: "700", marginBottom: "30px" }}>{winner.icon} {winner.name} wins with {winner.score} points!</p>
      <div style={{ ...cardStyle, marginBottom: "30px", textAlign: "left" }}>
        <h5 style={{ color: "#fff", fontWeight: "600", marginBottom: "15px", textAlign: "center" }}>Final Standings</h5>
        {sorted.map((team, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < sorted.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: i === 0 ? "#eab308" : i === 1 ? "#94a3b8" : "#cd7c2f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "800", fontSize: "0.85em" }}>{i + 1}</span>
              <span style={{ fontSize: "1.1em" }}>{team.icon}</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>{team.name}</span>
            </div>
            <span style={{ color: i === 0 ? "#eab308" : "#fff", fontWeight: "700", fontSize: "1.3em" }}>{team.score}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onPlayAgain} style={orangeBtn}>Play Again</button>
        <button onClick={onBackToMenu} style={outlineBtn}>Back to Menu</button>
      </div>
    </div>
  );
}

/* ================================================================ */
/*              MAIN CONTROLLER                                      */
/* ================================================================ */
function ThirtySeconds() {
  const [screen, setScreen] = useState("landing");
  const [wordPack, setWordPack] = useState("international");
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [settings, setSettings] = useState({ timerDuration: 30, winMode: "points", winTarget: 30, wordsPerTurn: 5, sound: true });

  const [currentRound, setCurrentRound] = useState(1);
  const [currentTeamIdx, setCurrentTeamIdx] = useState(0);
  const [playerIndices, setPlayerIndices] = useState({});
  const [activeCategory, setActiveCategory] = useState("");
  const [currentWords, setCurrentWords] = useState([]);
  const [checked, setChecked] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [paused, setPaused] = useState(false);
  const [usedWords, setUsedWords] = useState(new Set());

  const checkedRef = useRef([]);
  useEffect(() => { checkedRef.current = checked; }, [checked]);

  useEffect(() => {
    if (screen !== "playing" || paused) return;
    if (timeLeft <= 0) { handleEndTurn(); return; }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [screen, timeLeft, paused]);

  const createTeams = (numTeams, mode) => {
    const shuffled = mode === "random" ? [...players].sort(() => Math.random() - 0.5) : [...players];
    const newTeams = Array.from({ length: numTeams }, (_, i) => ({ ...TEAM_PRESETS[i], players: [], score: 0 }));
    shuffled.forEach((p, i) => newTeams[i % numTeams].players.push(p));
    setTeams(newTeams);
    const indices = {};
    newTeams.forEach((_, i) => { indices[i] = 0; });
    setPlayerIndices(indices);
    setScreen("teamsCreated");
  };

  const reshuffleTeams = () => createTeams(teams.length, "random");

  const startGame = () => {
    setCurrentRound(1);
    setCurrentTeamIdx(0);
    const indices = {};
    teams.forEach((_, i) => { indices[i] = 0; });
    setPlayerIndices(indices);
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setUsedWords(new Set());
    setScreen("settings");
  };

  const startTurn = () => setScreen("turnAnnounce");

  // After turn announce, go to category picker
  const goPickCategory = () => setScreen("pickCategory");

  // After picking category, start playing
  const playTurn = (category) => {
    setActiveCategory(category);
    const bank = getWordBank(wordPack);
    const words = getRandomWords(settings.wordsPerTurn, category, bank, usedWords);
    setCurrentWords(words);
    setChecked(new Array(words.length).fill(false));
    setTimeLeft(settings.timerDuration);
    setPaused(false);
    setScreen("playing");
  };

  const handleToggle = (index) => {
    if (screen !== "playing" || paused) return;
    setChecked((prev) => { const next = [...prev]; next[index] = !next[index]; return next; });
  };

  const handlePause = () => setPaused((p) => !p);

  const handleEndTurn = useCallback(() => {
    const c = checkedRef.current;
    const turnScore = c.filter(Boolean).length;
    setUsedWords((prev) => { const next = new Set(prev); currentWords.forEach((w) => next.add(w)); return next; });
    setTeams((prev) => {
      const next = [...prev];
      next[currentTeamIdx] = { ...next[currentTeamIdx], score: next[currentTeamIdx].score + turnScore };
      return next;
    });
    setScreen("turnResults");
  }, [currentTeamIdx, currentWords]);

  const nextTurn = () => {
    const updatedTeam = teams[currentTeamIdx];
    if (settings.winMode === "points" && updatedTeam.score >= settings.winTarget) { setScreen("gameOver"); return; }

    const newPlayerIndices = { ...playerIndices };
    newPlayerIndices[currentTeamIdx] = (newPlayerIndices[currentTeamIdx] + 1) % teams[currentTeamIdx].players.length;
    setPlayerIndices(newPlayerIndices);

    const nextTeamIdx = (currentTeamIdx + 1) % teams.length;
    setCurrentTeamIdx(nextTeamIdx);

    if (nextTeamIdx === 0) {
      const newRound = currentRound + 1;
      setCurrentRound(newRound);
      if (settings.winMode === "rounds" && currentRound >= settings.winTarget) { setScreen("gameOver"); return; }
    }
    setScreen("turnAnnounce");
  };

  const getCurrentTeam = () => teams[currentTeamIdx] || { name: "", players: [], score: 0, icon: "" };
  const getCurrentPlayer = () => {
    const team = getCurrentTeam();
    return team.players[playerIndices[currentTeamIdx] || 0] || { name: "", color: "#8b5cf6" };
  };

  const turnScore = checked.filter(Boolean).length;

  return (
    <div style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "50px", position: "relative" }}>
      <Particle />
      <Container style={{ position: "relative", zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>

            {screen === "landing" && <LandingPage onStart={() => setScreen("language")} />}

            {screen === "language" && (
              <LanguageSelect onSelect={(choice) => {
                if (choice === "back") setScreen("landing");
                else { setWordPack(choice); setScreen("addPlayers"); }
              }} />
            )}

            {screen === "addPlayers" && (
              <AddPlayers players={players} setPlayers={setPlayers}
                onNext={(numTeams, mode) => createTeams(numTeams, mode)}
                onBack={() => setScreen("language")} />
            )}

            {screen === "teamsCreated" && (
              <TeamsCreated teams={teams} onStart={startGame} onReshuffle={reshuffleTeams} onBack={() => setScreen("addPlayers")} />
            )}

            {screen === "settings" && (
              <GameSettings settings={settings} setSettings={setSettings} onStart={startTurn} onBack={() => setScreen("teamsCreated")} />
            )}

            {screen === "turnAnnounce" && (
              <TurnAnnounce teams={teams} currentPlayer={getCurrentPlayer()} currentTeam={getCurrentTeam()} currentRound={currentRound} onPlay={goPickCategory} />
            )}

            {screen === "pickCategory" && (
              <PickCategory wordPack={wordPack} currentPlayer={getCurrentPlayer()} currentTeam={getCurrentTeam()} teams={teams} currentRound={currentRound} onPick={playTurn} />
            )}

            {screen === "playing" && (
              <GameplayScreen teams={teams} currentPlayer={getCurrentPlayer()} currentTeam={getCurrentTeam()} currentRound={currentRound}
                activeCategory={activeCategory} words={currentWords} checked={checked} timeLeft={timeLeft}
                timerDuration={settings.timerDuration} paused={paused} wordPack={wordPack}
                onToggle={handleToggle} onPause={handlePause} onEndTurn={handleEndTurn} />
            )}

            {screen === "turnResults" && (
              <TurnResults teams={teams} currentPlayer={getCurrentPlayer()} currentTeam={getCurrentTeam()} currentRound={currentRound}
                activeCategory={activeCategory} words={currentWords} checked={checked} turnScore={turnScore} wordPack={wordPack} onNext={nextTurn} />
            )}

            {screen === "gameOver" && (
              <GameOver teams={teams}
                onPlayAgain={() => {
                  setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
                  setCurrentRound(1); setCurrentTeamIdx(0);
                  const indices = {}; teams.forEach((_, i) => { indices[i] = 0; }); setPlayerIndices(indices);
                  setUsedWords(new Set()); startTurn();
                }}
                onBackToMenu={() => { setPlayers([]); setTeams([]); setScreen("landing"); }} />
            )}

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ThirtySeconds;
