import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing products to re-seed with new data
  await prisma.product.deleteMany();
  console.log('🗑️  Cleared existing products');

  // Create sample products with translations, descriptions, and specifications
  const products = await prisma.product.createMany({
    data: [
      // Audio
      {
        name: { en: 'Wireless Headphones', cs: 'Bezdrátová Sluchátka' },
        description: {
          en: 'Premium wireless headphones with exceptional sound quality and long-lasting comfort. Perfect for music lovers and professionals alike.',
          cs: 'Prémiová bezdrátová sluchátka s výjimečnou kvalitou zvuku a dlouhotrvajícím pohodlím. Ideální pro milovníky hudby i profesionály.'
        },
        specifications: { 'Driver Size': '40mm', 'Frequency Response': '20Hz-20kHz', 'Battery Life': '30 hours', 'Connectivity': 'Bluetooth 5.0', 'Weight': '250g' },
        price: 79.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
      },
      {
        name: { en: 'Bluetooth Speaker', cs: 'Bluetooth Reproduktor' },
        description: {
          en: 'Portable Bluetooth speaker with powerful bass and 360-degree sound. Water-resistant design perfect for outdoor adventures.',
          cs: 'Přenosný Bluetooth reproduktor s výkonnými basy a 360stupňovým zvukem. Voděodolný design ideální pro venkovní dobrodružství.'
        },
        specifications: { 'Output Power': '20W', 'Battery Life': '12 hours', 'Waterproof Rating': 'IPX7', 'Bluetooth Version': '5.0', 'Weight': '540g' },
        price: 59.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'
      },
      {
        name: { en: 'Studio Microphone', cs: 'Studiový Mikrofon' },
        description: {
          en: 'Professional condenser microphone for studio recording, podcasting, and streaming. Crystal clear audio capture with minimal background noise.',
          cs: 'Profesionální kondenzátorový mikrofon pro studiové nahrávání, podcasty a streamování. Křišťálově čistý záznam zvuku s minimálním šumem pozadí.'
        },
        specifications: { 'Type': 'Condenser', 'Polar Pattern': 'Cardioid', 'Frequency Response': '20Hz-20kHz', 'Sample Rate': '192kHz/24bit', 'Connection': 'XLR' },
        price: 129.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400'
      },
      {
        name: { en: 'Earbuds Pro', cs: 'Sluchátka Pro' },
        description: {
          en: 'True wireless earbuds with active noise cancellation and premium sound quality. Ergonomic design for all-day comfort.',
          cs: 'Skutečně bezdrátová sluchátka s aktivním potlačením hluku a prémiovou kvalitou zvuku. Ergonomický design pro celodenní pohodlí.'
        },
        specifications: { 'Driver Size': '11mm', 'ANC': 'Yes', 'Battery Life': '8h (28h with case)', 'Waterproof Rating': 'IPX4', 'Weight': '5.4g each' },
        price: 199.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400'
      },
      {
        name: { en: 'Noise Cancelling Headphones', cs: 'Sluchátka s Potlačením Hluku' },
        description: {
          en: 'Industry-leading noise cancellation technology for immersive listening. Premium materials and exceptional build quality.',
          cs: 'Špičková technologie potlačení hluku pro pohlcující poslech. Prémiové materiály a výjimečná kvalita zpracování.'
        },
        specifications: { 'ANC Level': 'Advanced', 'Driver Size': '40mm', 'Battery Life': '35 hours', 'Quick Charge': '10min = 5h', 'Weight': '254g' },
        price: 249.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400'
      },
      {
        name: { en: 'Portable Speaker', cs: 'Přenosný Reproduktor' },
        description: {
          en: 'Compact and lightweight speaker that delivers surprisingly powerful sound. Perfect for travel and small gatherings.',
          cs: 'Kompaktní a lehký reproduktor s překvapivě silným zvukem. Ideální na cesty a malá setkání.'
        },
        specifications: { 'Output Power': '10W', 'Battery Life': '8 hours', 'Waterproof Rating': 'IPX5', 'Dimensions': '95x95x36mm', 'Weight': '215g' },
        price: 45.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400'
      },
      {
        name: { en: 'USB Microphone', cs: 'USB Mikrofon' },
        description: {
          en: 'Plug-and-play USB microphone ideal for video calls, podcasting, and content creation. No additional equipment needed.',
          cs: 'USB mikrofon typu plug-and-play ideální pro videohovory, podcasty a tvorbu obsahu. Není potřeba žádné další vybavení.'
        },
        specifications: { 'Type': 'Condenser', 'Sample Rate': '96kHz/24bit', 'Polar Pattern': 'Cardioid', 'Connection': 'USB-C', 'Cable Length': '2m' },
        price: 79.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400'
      },
      {
        name: { en: 'Gaming Headset', cs: 'Herní Sluchátka' },
        description: {
          en: 'Immersive gaming headset with 7.1 surround sound and detachable microphone. RGB lighting and comfortable memory foam ear cushions.',
          cs: 'Pohlcující herní headset s 7.1 prostorovým zvukem a odnímatelným mikrofonem. RGB osvětlení a pohodlné paměťové pěnové polštářky.'
        },
        specifications: { 'Surround Sound': '7.1 Virtual', 'Driver Size': '50mm', 'Microphone': 'Detachable', 'RGB': 'Yes', 'Connection': 'USB / 3.5mm' },
        price: 119.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400'
      },
      {
        name: { en: 'Soundbar', cs: 'Soundbar' },
        description: {
          en: 'Sleek soundbar with built-in subwoofer for powerful home theater audio. Easy setup with HDMI ARC and Bluetooth connectivity.',
          cs: 'Elegantní soundbar s vestavěným subwooferem pro výkonný zvuk domácího kina. Snadné nastavení s HDMI ARC a Bluetooth připojením.'
        },
        specifications: { 'Total Power': '120W', 'Channels': '2.1', 'Connectivity': 'HDMI ARC, Optical, Bluetooth', 'Subwoofer': 'Built-in', 'Dimensions': '890x58x85mm' },
        price: 179.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400'
      },
      {
        name: { en: 'Audio Interface', cs: 'Zvuková Karta' },
        description: {
          en: 'Professional audio interface for musicians and producers. High-quality preamps and ultra-low latency for seamless recording.',
          cs: 'Profesionální zvukové rozhraní pro hudebníky a producenty. Vysoce kvalitní předzesilovače a ultra nízká latence pro plynulé nahrávání.'
        },
        specifications: { 'Inputs': '2x XLR/TRS', 'Outputs': '2x TRS', 'Sample Rate': '192kHz/24bit', 'Preamp Gain': '60dB', 'Connection': 'USB-C' },
        price: 299.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400'
      },
      {
        name: { en: 'Wireless Earphones', cs: 'Bezdrátová Sluchátka' },
        description: {
          en: 'Lightweight wireless earphones with secure fit for sports and everyday use. Sweat-resistant with powerful bass.',
          cs: 'Lehká bezdrátová sluchátka s pevným uchycením pro sport a každodenní použití. Odolná proti potu s výkonnými basy.'
        },
        specifications: { 'Driver Size': '10mm', 'Battery Life': '6h (24h with case)', 'Waterproof Rating': 'IPX5', 'Bluetooth': '5.2', 'Weight': '6g each' },
        price: 89.99,
        category: 'audio',
        imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'
      },

      // Keyboards & Mice
      {
        name: { en: 'Mechanical Keyboard', cs: 'Mechanická Klávesnice' },
        description: {
          en: 'Premium mechanical keyboard with tactile switches and customizable RGB backlighting. Built for precision and durability.',
          cs: 'Prémiová mechanická klávesnice s hmatovými spínači a přizpůsobitelným RGB podsvícením. Vytvořena pro přesnost a odolnost.'
        },
        specifications: { 'Switch Type': 'Cherry MX Brown', 'Layout': 'Full-size', 'Backlighting': 'RGB', 'Connection': 'USB-C', 'Key Rollover': 'N-Key' },
        price: 149.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
      },
      {
        name: { en: 'Wireless Mouse', cs: 'Bezdrátová Myš' },
        description: {
          en: 'Ergonomic wireless mouse with precision tracking and long battery life. Silent clicks for quiet work environments.',
          cs: 'Ergonomická bezdrátová myš s přesným sledováním a dlouhou výdrží baterie. Tiché klikání pro klidné pracovní prostředí.'
        },
        specifications: { 'DPI': '4000', 'Buttons': '6', 'Battery Life': '24 months', 'Connection': '2.4GHz Wireless', 'Weight': '99g' },
        price: 39.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
      },
      {
        name: { en: 'Gaming Keyboard RGB', cs: 'Herní Klávesnice RGB' },
        description: {
          en: 'High-performance gaming keyboard with per-key RGB and rapid trigger switches. Designed for competitive gaming.',
          cs: 'Vysoce výkonná herní klávesnice s RGB podsvícením každé klávesy a rychlými spínači. Navržena pro kompetitivní hraní.'
        },
        specifications: { 'Switch Type': 'Optical', 'Actuation': '1.0mm', 'Polling Rate': '8000Hz', 'RGB': 'Per-key', 'Wrist Rest': 'Included' },
        price: 179.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400'
      },
      {
        name: { en: 'Ergonomic Mouse', cs: 'Ergonomická Myš' },
        description: {
          en: 'Specially designed ergonomic mouse that reduces wrist strain. Natural hand position for comfortable all-day use.',
          cs: 'Speciálně navržená ergonomická myš, která snižuje namáhání zápěstí. Přirozená poloha ruky pro pohodlné celodenní používání.'
        },
        specifications: { 'DPI': '2400', 'Buttons': '5', 'Angle': '57°', 'Connection': 'USB / Bluetooth', 'Weight': '120g' },
        price: 49.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400'
      },
      {
        name: { en: 'Compact Keyboard', cs: 'Kompaktní Klávesnice' },
        description: {
          en: '65% compact keyboard with wireless connectivity. Space-saving design without sacrificing functionality.',
          cs: '65% kompaktní klávesnice s bezdrátovým připojením. Prostorově úsporný design bez ztráty funkčnosti.'
        },
        specifications: { 'Layout': '65%', 'Switch Type': 'Gateron Red', 'Battery': '4000mAh', 'Connection': 'USB-C / Bluetooth', 'Hot-swappable': 'Yes' },
        price: 89.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1560762484-813fc97650a0?w=400'
      },
      {
        name: { en: 'Vertical Mouse', cs: 'Vertikální Myš' },
        description: {
          en: 'Vertical mouse design promotes natural hand position and reduces strain. Perfect for long work sessions.',
          cs: 'Vertikální design myši podporuje přirozenou polohu ruky a snižuje namáhání. Ideální pro dlouhé pracovní sessions.'
        },
        specifications: { 'DPI': '1600', 'Buttons': '6', 'Angle': '60°', 'Connection': '2.4GHz Wireless', 'Battery': '2x AAA' },
        price: 59.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1586882829491-b81178aa622e?w=400'
      },
      {
        name: { en: 'Gaming Mouse', cs: 'Herní Myš' },
        description: {
          en: 'Ultra-lightweight gaming mouse with flawless sensor and customizable buttons. Built for esports performance.',
          cs: 'Ultralehká herní myš s bezchybným senzorem a přizpůsobitelnými tlačítky. Vytvořena pro esportový výkon.'
        },
        specifications: { 'Sensor': 'PAW3395', 'DPI': '26000', 'Polling Rate': '8000Hz', 'Weight': '58g', 'Buttons': '8' },
        price: 79.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400'
      },
      {
        name: { en: 'Wireless Keyboard', cs: 'Bezdrátová Klávesnice' },
        description: {
          en: 'Slim wireless keyboard with quiet keys and multi-device connectivity. Seamlessly switch between devices.',
          cs: 'Tenká bezdrátová klávesnice s tichými klávesami a připojením více zařízení. Plynulé přepínání mezi zařízeními.'
        },
        specifications: { 'Layout': 'Full-size', 'Connection': 'Bluetooth / USB', 'Battery Life': '12 months', 'Multi-device': '3 devices', 'Weight': '425g' },
        price: 69.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400'
      },
      {
        name: { en: 'Split Ergonomic Keyboard', cs: 'Rozdělená Ergonomická Klávesnice' },
        description: {
          en: 'Split design ergonomic keyboard for the ultimate typing comfort. Reduce strain with customizable tenting.',
          cs: 'Ergonomická klávesnice s rozděleným designem pro maximální pohodlí při psaní. Snižte namáhání s přizpůsobitelným náklonem.'
        },
        specifications: { 'Layout': 'Split', 'Tenting': 'Adjustable 0-15°', 'Palm Rest': 'Included', 'Connection': 'USB-C', 'Switch Type': 'Low Profile' },
        price: 199.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
      },
      {
        name: { en: 'Wireless Trackpad', cs: 'Bezdrátový Trackpad' },
        description: {
          en: 'Large wireless trackpad with multi-touch gestures. Smooth glass surface for precise control.',
          cs: 'Velký bezdrátový trackpad s multi-touch gesty. Hladký skleněný povrch pro přesné ovládání.'
        },
        specifications: { 'Surface': 'Glass', 'Gestures': 'Multi-touch', 'Connection': 'Bluetooth', 'Battery': 'Rechargeable', 'Dimensions': '160x115mm' },
        price: 99.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400'
      },
      {
        name: { en: 'Numeric Keypad', cs: 'Numerická Klávesnice' },
        description: {
          en: 'Wireless numeric keypad for efficient data entry. Perfect companion for compact keyboards.',
          cs: 'Bezdrátová numerická klávesnice pro efektivní zadávání dat. Ideální doplněk ke kompaktním klávesnicím.'
        },
        specifications: { 'Keys': '22', 'Connection': 'Bluetooth / USB', 'Battery': '2x AAA', 'Dimensions': '130x85mm', 'Weight': '90g' },
        price: 29.99,
        category: 'keyboardsAndMice',
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
      },

      // Monitors & Displays
      {
        name: { en: '4K Monitor', cs: '4K Monitor' },
        description: {
          en: 'Stunning 4K UHD monitor with vibrant colors and sharp details. Perfect for creative professionals and content consumption.',
          cs: 'Ohromující 4K UHD monitor s živými barvami a ostrými detaily. Ideální pro kreativní profesionály a konzumaci obsahu.'
        },
        specifications: { 'Resolution': '3840x2160', 'Panel': 'IPS', 'Refresh Rate': '60Hz', 'Response Time': '5ms', 'Size': '27"' },
        price: 399.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
      },
      {
        name: { en: 'Ultrawide Monitor', cs: 'Ultraširoký Monitor' },
        description: {
          en: 'Immersive ultrawide monitor for enhanced productivity and gaming. Replace dual monitor setup with one seamless display.',
          cs: 'Pohlcující ultraširoký monitor pro zvýšenou produktivitu a hraní. Nahraďte dvoumonitorové nastavení jedním plynulým displejem.'
        },
        specifications: { 'Resolution': '3440x1440', 'Aspect Ratio': '21:9', 'Panel': 'VA', 'Refresh Rate': '144Hz', 'Size': '34"' },
        price: 599.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'
      },
      {
        name: { en: 'Portable Monitor', cs: 'Přenosný Monitor' },
        description: {
          en: 'Lightweight portable monitor for mobile productivity. USB-C powered with built-in stand and protective cover.',
          cs: 'Lehký přenosný monitor pro mobilní produktivitu. Napájený přes USB-C s vestavěným stojánkem a ochranným krytem.'
        },
        specifications: { 'Resolution': '1920x1080', 'Size': '15.6"', 'Panel': 'IPS', 'Connection': 'USB-C / Mini HDMI', 'Weight': '700g' },
        price: 249.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400'
      },
      {
        name: { en: 'Gaming Monitor 144Hz', cs: 'Herní Monitor 144Hz' },
        description: {
          en: 'Fast 144Hz gaming monitor with 1ms response time. G-Sync compatible for smooth, tear-free gaming.',
          cs: 'Rychlý herní monitor 144Hz s odezvou 1ms. Kompatibilní s G-Sync pro plynulé hraní bez trhání.'
        },
        specifications: { 'Resolution': '2560x1440', 'Refresh Rate': '144Hz', 'Response Time': '1ms', 'Panel': 'IPS', 'Adaptive Sync': 'G-Sync Compatible' },
        price: 449.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400'
      },
      {
        name: { en: 'Curved Monitor', cs: 'Prohnutý Monitor' },
        description: {
          en: 'Curved monitor for immersive viewing experience. Reduces eye strain with comfortable viewing angles.',
          cs: 'Prohnutý monitor pro pohlcující zážitek ze sledování. Snižuje namáhání očí pohodlnými pozorovacími úhly.'
        },
        specifications: { 'Curvature': '1500R', 'Resolution': '2560x1440', 'Size': '32"', 'Panel': 'VA', 'Refresh Rate': '75Hz' },
        price: 379.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=400'
      },
      {
        name: { en: 'Touchscreen Monitor', cs: 'Dotykový Monitor' },
        description: {
          en: 'Interactive touchscreen monitor with 10-point multi-touch. Perfect for creative work and presentations.',
          cs: 'Interaktivní dotykový monitor s 10bodovým multi-touch. Ideální pro kreativní práci a prezentace.'
        },
        specifications: { 'Touch Points': '10', 'Resolution': '1920x1080', 'Size': '24"', 'Panel': 'IPS', 'Tilt': '-5° to 90°' },
        price: 329.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400'
      },
      {
        name: { en: 'Dual Monitor Stand', cs: 'Stojan pro Dva Monitory' },
        description: {
          en: 'Heavy-duty dual monitor stand with full adjustability. Free up desk space and improve ergonomics.',
          cs: 'Robustní stojan pro dva monitory s plnou nastavitelností. Uvolněte místo na stole a zlepšete ergonomii.'
        },
        specifications: { 'Capacity': '2 monitors', 'Max Weight': '10kg each', 'VESA': '75x75, 100x100', 'Height Adjust': '35cm', 'Screen Size': '17"-32"' },
        price: 129.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400'
      },
      {
        name: { en: 'Monitor Arm Mount', cs: 'Držák Monitoru na Rameno' },
        description: {
          en: 'Premium monitor arm with gas spring mechanism. Effortlessly position your monitor at the perfect height.',
          cs: 'Prémiové rameno monitoru s plynovým mechanismem. Bez námahy umístěte monitor do ideální výšky.'
        },
        specifications: { 'Type': 'Gas Spring', 'Max Weight': '9kg', 'VESA': '75x75, 100x100', 'Rotation': '360°', 'Cable Management': 'Yes' },
        price: 89.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400'
      },
      {
        name: { en: '8K Monitor', cs: '8K Monitor' },
        description: {
          en: 'Professional 8K monitor for ultimate detail and clarity. Ideal for video editing, 3D rendering, and high-end content creation.',
          cs: 'Profesionální 8K monitor pro maximální detail a čistotu. Ideální pro střih videa, 3D renderování a tvorbu špičkového obsahu.'
        },
        specifications: { 'Resolution': '7680x4320', 'Size': '32"', 'Panel': 'IPS', 'Color Accuracy': 'Delta E<1', 'HDR': 'HDR1000' },
        price: 1299.99,
        category: 'monitors',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
      },

      // Accessories
      {
        name: { en: 'USB-C Hub', cs: 'USB-C Rozbočovač' },
        description: {
          en: 'Compact USB-C hub expands your laptop connectivity. Multiple ports in a sleek aluminum design.',
          cs: 'Kompaktní USB-C rozbočovač rozšiřuje konektivitu vašeho notebooku. Více portů v elegantním hliníkovém provedení.'
        },
        specifications: { 'Ports': '4x USB-A, 1x HDMI, 1x USB-C PD', 'Power Delivery': '100W', 'HDMI Output': '4K@60Hz', 'Material': 'Aluminum', 'Cable Length': '15cm' },
        price: 49.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400'
      },
      {
        name: { en: 'Laptop Stand', cs: 'Stojan na Notebook' },
        description: {
          en: 'Ergonomic laptop stand raises screen to eye level. Improves posture and increases airflow for cooling.',
          cs: 'Ergonomický stojan na notebook zvedá obrazovku do úrovně očí. Zlepšuje držení těla a zvyšuje proudění vzduchu pro chlazení.'
        },
        specifications: { 'Material': 'Aluminum', 'Height Levels': '6', 'Max Laptop Size': '17"', 'Foldable': 'Yes', 'Weight': '260g' },
        price: 29.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'
      },
      {
        name: { en: 'Webcam HD', cs: 'HD Webkamera' },
        description: {
          en: 'Full HD webcam with auto-focus and built-in microphone. Perfect for video calls and streaming.',
          cs: 'Full HD webkamera s automatickým ostřením a vestavěným mikrofonem. Ideální pro videohovory a streamování.'
        },
        specifications: { 'Resolution': '1080p', 'Frame Rate': '30fps', 'Focus': 'Auto', 'Microphone': 'Dual Stereo', 'FOV': '78°' },
        price: 89.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400'
      },
      {
        name: { en: 'Mouse Pad XL', cs: 'Podložka pod Myš XL' },
        description: {
          en: 'Extra-large mouse pad covers your entire desk. Smooth surface for precise mouse control.',
          cs: 'Extra velká podložka pod myš pokrývá celý váš stůl. Hladký povrch pro přesné ovládání myši.'
        },
        specifications: { 'Size': '900x400mm', 'Thickness': '4mm', 'Material': 'Cloth/Rubber', 'Stitched Edges': 'Yes', 'Water Resistant': 'Yes' },
        price: 19.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400'
      },
      {
        name: { en: 'Cable Management Kit', cs: 'Sada pro Správu Kabelů' },
        description: {
          en: 'Complete cable management solution for a clean desk setup. Includes clips, sleeves, and cable ties.',
          cs: 'Kompletní řešení pro správu kabelů pro čistý pracovní stůl. Obsahuje klipy, návleky a stahovací pásky.'
        },
        specifications: { 'Contents': '50+ pieces', 'Cable Sleeve Length': '2m', 'Clips': '20', 'Ties': '30', 'Color': 'Black' },
        price: 14.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      },
      {
        name: { en: 'Desk Lamp LED', cs: 'LED Stolní Lampa' },
        description: {
          en: 'Modern LED desk lamp with adjustable color temperature. Touch control with memory function.',
          cs: 'Moderní LED stolní lampa s nastavitelnou teplotou barev. Dotykové ovládání s funkcí paměti.'
        },
        specifications: { 'Brightness Levels': '5', 'Color Temperatures': '5', 'Power': '10W', 'Lifespan': '50000 hours', 'USB Charging': 'Yes' },
        price: 34.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400'
      },
      {
        name: { en: 'Phone Stand', cs: 'Stojan na Telefon' },
        description: {
          en: 'Adjustable phone stand for hands-free viewing. Compatible with all smartphones and small tablets.',
          cs: 'Nastavitelný stojan na telefon pro sledování bez držení. Kompatibilní se všemi smartphony a malými tablety.'
        },
        specifications: { 'Material': 'Aluminum', 'Adjustable Angle': 'Yes', 'Foldable': 'Yes', 'Max Device Size': '12"', 'Weight': '150g' },
        price: 24.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'
      },
      {
        name: { en: 'Ergonomic Cushion', cs: 'Ergonomický Polštář' },
        description: {
          en: 'Memory foam seat cushion for improved posture and comfort. Reduces pressure on spine and tailbone.',
          cs: 'Sedací polštář z paměťové pěny pro lepší držení těla a pohodlí. Snižuje tlak na páteř a kostrč.'
        },
        specifications: { 'Material': 'Memory Foam', 'Cover': 'Breathable Mesh', 'Dimensions': '45x35x7cm', 'Washable Cover': 'Yes', 'Weight Capacity': '120kg' },
        price: 39.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400'
      },
      {
        name: { en: 'Document Holder', cs: 'Držák Dokumentů' },
        description: {
          en: 'Adjustable document holder reduces neck strain while typing. Keeps documents at eye level.',
          cs: 'Nastavitelný držák dokumentů snižuje namáhání krku při psaní. Drží dokumenty v úrovni očí.'
        },
        specifications: { 'Material': 'Plastic/Metal', 'Paper Size': 'A4', 'Height Adjustable': 'Yes', 'Angle Adjustable': 'Yes', 'Line Guide': 'Yes' },
        price: 22.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1544016768-982d1554f0b9?w=400'
      },
      {
        name: { en: 'Desk Organizer', cs: 'Organizér na Stůl' },
        description: {
          en: 'Multi-compartment desk organizer keeps your workspace tidy. Store pens, notes, and small accessories.',
          cs: 'Vícekomorový organizér na stůl udržuje váš pracovní prostor uklizený. Ukládejte pera, poznámky a drobné příslušenství.'
        },
        specifications: { 'Compartments': '7', 'Material': 'Bamboo', 'Dimensions': '25x15x12cm', 'Drawer': '1', 'Phone Slot': 'Yes' },
        price: 27.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400'
      },
      {
        name: { en: 'Screen Cleaning Kit', cs: 'Čisticí Sada na Obrazovku' },
        description: {
          en: 'Safe and effective screen cleaning solution. Removes fingerprints and dust without streaks.',
          cs: 'Bezpečný a účinný čisticí roztok na obrazovky. Odstraňuje otisky prstů a prach bez šmouh.'
        },
        specifications: { 'Solution': '200ml', 'Cloth': 'Microfiber', 'Safe For': 'All screens', 'Alcohol Free': 'Yes', 'Brush': 'Included' },
        price: 16.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400'
      },
      {
        name: { en: 'Anti-Glare Screen Filter', cs: 'Antireflexní Filtr na Obrazovku' },
        description: {
          en: 'Reduces glare and blue light from your monitor. Easy attachment with included tabs.',
          cs: 'Snižuje odlesky a modré světlo z monitoru. Snadná instalace s přiloženými úchytkami.'
        },
        specifications: { 'Size': '24"', 'Blue Light Reduction': '30%', 'Anti-Glare': 'Yes', 'Privacy': 'No', 'Attachment': 'Magnetic tabs' },
        price: 29.99,
        category: 'accessories',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400'
      },

      // Storage
      {
        name: { en: 'External SSD 1TB', cs: 'Externí SSD 1TB' },
        description: {
          en: 'Blazing fast external SSD with USB 3.2 Gen 2 interface. Compact and shock-resistant for reliable portable storage.',
          cs: 'Bleskově rychlé externí SSD s rozhraním USB 3.2 Gen 2. Kompaktní a odolné proti nárazům pro spolehlivé přenosné úložiště.'
        },
        specifications: { 'Capacity': '1TB', 'Read Speed': '1050 MB/s', 'Write Speed': '1000 MB/s', 'Interface': 'USB 3.2 Gen 2', 'Dimensions': '100x55x10mm' },
        price: 109.99,
        category: 'storage',
        imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400'
      },
      {
        name: { en: 'External HDD 4TB', cs: 'Externí HDD 4TB' },
        description: {
          en: 'High-capacity external hard drive for backups and media storage. Quiet operation with reliable performance.',
          cs: 'Velkokapacitní externí pevný disk pro zálohy a ukládání médií. Tichý provoz se spolehlivým výkonem.'
        },
        specifications: { 'Capacity': '4TB', 'Speed': '5400 RPM', 'Interface': 'USB 3.0', 'Cache': '64MB', 'Format': 'NTFS (Windows)' },
        price: 89.99,
        category: 'storage',
        imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400'
      },
      {
        name: { en: 'USB Flash Drive 128GB', cs: 'USB Flash Disk 128GB' },
        description: {
          en: 'Compact USB flash drive with high-speed USB 3.0. Durable metal casing with keychain hole.',
          cs: 'Kompaktní USB flash disk s vysokorychlostním USB 3.0. Odolné kovové pouzdro s otvorem pro klíčenku.'
        },
        specifications: { 'Capacity': '128GB', 'Read Speed': '150 MB/s', 'Interface': 'USB 3.0', 'Material': 'Metal', 'Weight': '12g' },
        price: 24.99,
        category: 'storage',
        imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400'
      },
      {
        name: { en: 'M.2 SSD 1TB', cs: 'M.2 SSD 1TB' },
        description: {
          en: 'High-performance M.2 NVMe SSD for internal storage upgrade. PCIe Gen 4 for maximum speed.',
          cs: 'Vysoce výkonné M.2 NVMe SSD pro upgrade interního úložiště. PCIe Gen 4 pro maximální rychlost.'
        },
        specifications: { 'Capacity': '1TB', 'Read Speed': '7000 MB/s', 'Write Speed': '5300 MB/s', 'Interface': 'PCIe Gen 4 x4', 'Form Factor': 'M.2 2280' },
        price: 129.99,
        category: 'storage',
        imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400'
      },
      {
        name: { en: 'NAS Drive 8TB', cs: 'NAS Disk 8TB' },
        description: {
          en: 'Enterprise-grade NAS hard drive designed for 24/7 operation. Optimized for RAID and multi-bay systems.',
          cs: 'NAS pevný disk podnikové třídy navržený pro nepřetržitý provoz. Optimalizovaný pro RAID a vícepozicové systémy.'
        },
        specifications: { 'Capacity': '8TB', 'Speed': '7200 RPM', 'Cache': '256MB', 'Workload': '180TB/year', 'MTBF': '1M hours' },
        price: 299.99,
        category: 'storage',
        imageUrl: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400'
      },
      {
        name: { en: 'MicroSD Card 512GB', cs: 'MicroSD Karta 512GB' },
        description: {
          en: 'High-capacity microSD card for cameras, drones, and mobile devices. A2 rated for app performance.',
          cs: 'Velkokapacitní microSD karta pro fotoaparáty, drony a mobilní zařízení. Hodnocení A2 pro výkon aplikací.'
        },
        specifications: { 'Capacity': '512GB', 'Read Speed': '170 MB/s', 'Write Speed': '90 MB/s', 'Class': 'UHS-I U3 A2', 'Video Speed': 'V30' },
        price: 69.99,
        category: 'storage',
        imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400'
      },

      // Cables & Adapters
      {
        name: { en: 'USB-C Cable 6ft', cs: 'USB-C Kabel 2m' },
        description: {
          en: 'Durable braided USB-C cable with fast charging support. Universal compatibility with all USB-C devices.',
          cs: 'Odolný opletený USB-C kabel s podporou rychlého nabíjení. Univerzální kompatibilita se všemi USB-C zařízeními.'
        },
        specifications: { 'Length': '2m', 'Power Delivery': '100W', 'Data Transfer': '480 Mbps', 'Material': 'Nylon Braided', 'Connector': 'USB-C to USB-C' },
        price: 12.99,
        category: 'cables',
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'
      },
      {
        name: { en: 'USB-C to USB-A Adapter', cs: 'USB-C na USB-A Adaptér' },
        description: {
          en: 'Compact adapter connects USB-A devices to USB-C ports. Plug and play with no drivers needed.',
          cs: 'Kompaktní adaptér připojuje USB-A zařízení k USB-C portům. Plug and play bez potřeby ovladačů.'
        },
        specifications: { 'Input': 'USB-A', 'Output': 'USB-C', 'Data Speed': 'USB 3.0', 'Material': 'Aluminum', 'Weight': '5g' },
        price: 9.99,
        category: 'cables',
        imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400'
      },
      {
        name: { en: 'Ethernet Cable 25ft', cs: 'Ethernetový Kabel 8m' },
        description: {
          en: 'High-speed Cat 6 ethernet cable for reliable wired connections. Supports gigabit speeds with minimal interference.',
          cs: 'Vysokorychlostní ethernetový kabel Cat 6 pro spolehlivé kabelové připojení. Podporuje gigabitové rychlosti s minimálním rušením.'
        },
        specifications: { 'Category': 'Cat 6', 'Length': '8m', 'Speed': '1 Gbps', 'Bandwidth': '250 MHz', 'Shielded': 'UTP' },
        price: 11.99,
        category: 'cables',
        imageUrl: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400'
      },
      {
        name: { en: 'USB-C Hub 7-in-1', cs: 'USB-C Rozbočovač 7v1' },
        description: {
          en: 'Versatile 7-in-1 USB-C hub with HDMI, USB ports, and SD card reader. Essential for laptop productivity.',
          cs: 'Všestranný 7v1 USB-C rozbočovač s HDMI, USB porty a čtečkou SD karet. Nezbytný pro produktivitu s notebookem.'
        },
        specifications: { 'Ports': 'HDMI, 2x USB-A, USB-C PD, SD, microSD, 3.5mm', 'HDMI Output': '4K@30Hz', 'PD Pass-through': '100W', 'Material': 'Aluminum', 'Cable Length': '15cm' },
        price: 59.99,
        category: 'cables',
        imageUrl: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400'
      },
      {
        name: { en: 'Thunderbolt 3 Cable', cs: 'Thunderbolt 3 Kabel' },
        description: {
          en: 'High-performance Thunderbolt 3 cable for maximum bandwidth. Supports displays, data, and power delivery.',
          cs: 'Vysoce výkonný kabel Thunderbolt 3 pro maximální šířku pásma. Podporuje displeje, data a napájení.'
        },
        specifications: { 'Length': '1m', 'Bandwidth': '40 Gbps', 'Display Support': '5K@60Hz or 2x 4K@60Hz', 'Power Delivery': '100W', 'Certified': 'Intel Thunderbolt 3' },
        price: 29.99,
        category: 'cables',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
      },
      {
        name: { en: 'HDMI to DisplayPort Adapter', cs: 'HDMI na DisplayPort Adaptér' },
        description: {
          en: 'Active adapter converts HDMI output to DisplayPort input. Perfect for connecting older devices to new monitors.',
          cs: 'Aktivní adaptér převádí HDMI výstup na DisplayPort vstup. Ideální pro připojení starších zařízení k novým monitorům.'
        },
        specifications: { 'Input': 'HDMI', 'Output': 'DisplayPort', 'Max Resolution': '4K@60Hz', 'Active Conversion': 'Yes', 'Cable Length': '20cm' },
        price: 24.99,
        category: 'cables',
        imageUrl: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400'
      },
    ],
  });

  console.log(`✅ Seeded ${products.count} products with descriptions and specifications`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
