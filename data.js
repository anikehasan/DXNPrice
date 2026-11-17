// Category | Product code | Product name | DP | MRP | SV | PV
const RAW_PRODUCTS = `Health Food Series|HF345|DXN RG Powder-50 g|3455|4145|1450|1070
Health Food Series|HF344|DXN GL Powder-80 g|2550|3060|1071|770
Health Food Series|HF235|DXN Corsyceps Powder-30 g|2730|3275|1197|760
Health Food Series|HF236|DXN Lion's Mane Powder-30 g|1400|1680|614|390
Food & Beverage Series|FB098|DXN White Coffee Zino|2125|2550|815|290
Food & Beverage Series|FB240|DXN Spirulina Cereal|2650|3180|1112|540
Food & Beverage Series|FB241|DXN Cordyceps Cereal|3545|4255|1490|825
Food & Beverage Series|FB570|DXN Lamonzhi|745|895|286|175
Food & Beverage Series|FB571|DXN Zhi Mocha|1260|1510|482|290
Food & Beverage Series|FB310|DXN Zhi Yobite 30 g|700|840|298|125
Food & Beverage Series|FB311|DXN Lina Yobite 30 g|700|840|298|125
Food & Beverage Series|FB522|DXN Lingzhi Black Coffee|990|1190|424|350
Food & Beverage Series|FB523|DXN Lingzhi Coffee 3 in 1|2050|2460|813|475
Food & Beverage Series|FB524|DXN Cordyceps Coffee|1940|2330|745|450
Food & Beverage Series|FB525|DXN Cocozhi|2245|2695|857|525
Food & Beverage Series|FB066|DXN Lingzhi Coffee 3 in 1 Lite|1975|2370|779|365
Food & Beverage Series|FB127|DXN Eu Café|1785|2140|682|300
Food & Beverage Series|FB128|DXN Vita Café|2050|2460|785|345
Food & Beverage Series|FB458|DXN Reishi Gano Tea|455|545|175|90
Food & Beverage Series|FB460|DXN Masala Tea|250|300|96|60
Personal Care Series|PC015|DXN Talcum Powder|1190|1430|453|225
Personal Care Series|PC046|DXN Ganozhi Soap|390|470|149|65
Personal Care Series|PC106|DXN Alov Vera Bathing Bar|155|210|68|35
Personal Care Series|PC108|DXN A. Vera B Bar Family Pack|410|560|182|95
Personal Care Series|PC109|Neem Bathing Bar|175|210|68|35
Personal Care Series|PC110|Neem Bathing Bar Family Pack|410|560|182|95
Personal Care Series|PC154|DXN Shampoo 200ml|365|440|156|65
Personal Care Series|PC006|DXN Ganozhi Toothpaste-150g|835|1000|318|110
Personal Care Series|PC019|DXN Ganozhi Toothpaste-75g|535|640|204|70
Personal Care Series|PC047|DXN Ganozhi Plus Toothpaste-150g|700|840|270|135
Personal Care Series|PC063|DXN Ganozhi Plus Toothpaste-75g|470|565|180|85
Personal Care Series|PC094|DXN Hair Oil 100G|590|710|228|135
Skin Care and Cosmetics Care Series|SC020|DXN Aloe V Cleansing Gel|1090|1310|415|145
Skin Care and Cosmetics Care Series|SC024|DXN Aloe V Hand & Body Lotion|1275|1530|4902|180
Skin Care and Cosmetics Care Series|SC032|DXN Aloe V Facial Scrub|1165|1400|446|190
Skin Care and Cosmetics Care Series|SC099|DXN Papaya Facial Scrub|235|280|90|55
Skin Care and Cosmetics Care Series|SC100|DXN Neem Facewash|190|230|73|45
Skin Care and Cosmetics Care Series|SC234|DXN Hair Pack|240|290|103|45
Skin Care and Cosmetics Care Series|SC232|DXN BodyScrub|450|540|193|90
Skin Care and Cosmetics Care Series|SC233|DXN Skin Lotion 100 ml|245|295|105|35
Skin Care and Cosmetics Care Series|SC109|DXN Apricot Facial Scrub|235|280|90|55
Home care Product|HP015|DXN Vegi Cleen|885|1060|350|170
Home care Product|FB206|DXN Apple Enzyme Drink|3385|4060|1289|570
Home care Product|FB215|DXN Lion's Mane Coffee|2365|2840|901|390
Home care Product|FB237|DXN Apple Fermented Jam|1295|1555|496|225
Home care Product|FB250|DXN Lion's Mane Oocha|2340|2810|892|395
Home care Product|FB300|DXN Spirudle|1020|1225|393|190
Home care Product|FB315|DXN Lions Mane Lemon Matcha|1685|2020|642|305
Home care Product|FB318|DXN Oocha Noodle|1020|1225|393|175
Home care Product|FB345|DXN Goji Berries|3430|4115|1150|625
Home care Product|FB357|DXN OOCHA NOODLE(T Y F)|1595|1915|616|235`;
const PRODUCTS = RAW_PRODUCTS.split('\n').map(line=>{const [category,code,name,dp,mrp,sv,pv]=line.split('|');return {category,code,name,dp:+dp,mrp:+mrp,sv:+sv,pv:+pv};});
