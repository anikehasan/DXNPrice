
document.addEventListener('DOMContentLoaded', () => {
    // ১. Staggered Table Animation
    const animateRows = () => {
        const rows = document.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.classList.add('stagger-row');
            setTimeout(() => {
                row.classList.add('show');
            }, index * 100); // প্রতি রো ১০০ মিলিসেকেন্ড পর পর আসবে
        });
    };

    // ২. Search Filtering with Animation Re-trigger
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                if (text.includes(term)) {
                    row.style.display = '';
                    row.classList.add('show');
                } else {
                    row.style.display = 'none';
                    row.classList.remove('show');
                }
            });
        });
    }

    // ৩. অটোমেটিক ক্যালকুলেশন এবং ইন্টারেকশন (উদাহরণ)
    const qtyInputs = document.querySelectorAll('input[type="number"]');
    qtyInputs.forEach(input => {
        input.addEventListener('change', () => {
            // এখানে আপনি আপনার টোটাল ক্যালকুলেশন লজিক রাখতে পারেন
            console.log("Quantity Updated: ", input.value);
            
            // ছোট একটি এনিমেশন যখন ভ্যালু চেঞ্জ হবে
            input.style.borderColor = 'var(--neon-orange)';
            setTimeout(() => { input.style.borderColor = 'rgba(255, 107, 0, 0.3)'; }, 500);
        });
    });

    // পেজ লোড হলে অ্যানিমেশন শুরু হবে
    animateRows();
});



// Search Logic
function searchProducts() {
    let input = document.getElementById('productSearch').value.toLowerCase();
    let rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        let productName = row.cells[0].textContent.toLowerCase();
        if (productName.includes(input)) {
            row.style.display = ""; // দেখাবে
        } else {
            row.style.display = "none"; // লুকিয়ে ফেলবে
        }
    });
}

// Update showName function for the new input style
document.getElementById("memberName").addEventListener("input", (e) => {
    document.getElementById("showName").textContent = e.target.value || "Guest";
});
const officialProducts = [
{name:"DXN RG Powder-50 g",pv:1070,dp:3455,sv:1450},

{name:"DXN GL Powder-80 g",pv:770,dp:2550,sv:1071},

{name:"DXN Corsyceps Powder-30 g",pv:760,dp:2730,sv:1197},

{name:"DXN Lion's Mane Powder-30 g",pv:390,dp:1400,sv:614},

{name:"DXN White Coffee Zino",pv:290,dp:2125,sv:815},

{name:"DXN Spirulina Cereal",pv:540,dp:2650,sv:1112},

{name:"DXN Cordyceps Cereal",pv:825,dp:3545,sv:1490},

{name:"DXN Lemonzhi",pv:175,dp:745,sv:287},

{name:"DXN Zhi Mocha",pv:290,dp:1260,sv:482},

{name:"DXN Zhi Yobite 30 g",pv:125,dp:555,sv:236},

{name:"DXN Lina Yobite 30 g",pv:125,dp:555,sv:236},

{name:"DXN Lingzhi Black Coffee ",pv:350,dp:990,sv:424},

{name:"DXN Lingzhi Coffee 3 in 1",pv:395,dp:1710,sv:727},

{name:"DXN Cordyceps Coffee",pv:340,dp:1480,sv:611},

{name:"DXN Cocozhi",pv:525,dp:2245,sv:857},

{name:"DXN Lingzhi Coffee 3 in 1 Lite",pv:365,dp:1555,sv:658},

{name:"DXN Eu Cafe",pv:300,dp:1500,sv:573},

{name:"DXN Vita Cafe",pv:345,dp:1710,sv:655},

{name:"DXN Reishi Gano Tea",pv:90,dp:380,sv:145},

{name:"DXN Masala Tea",pv:60,dp:250,sv:96},

{name:"DXN Talcum Powder",pv:225,dp:1190,sv:453},

{name:"DXN Ganozhi Soap",pv:65,dp:390,sv:149},

{name:"DXN Aloe Vera Bathing Bar",pv:35,dp:155,sv:59},

{name:"DXN A. Vera 8 Bar Family Pack",pv:95,dp:410,sv:157},

{name:"Neem Bathing Bar",pv:35,dp:155,sv:59},

{name:"Neem Bathing Bar Family Pack",pv:95,dp:410,sv:157},

{name:"DXN Ganozhi Toothpaste-150g",pv:110,dp:835,sv:318},

{name:"DXN Ganozhi Toothpaste-75g",pv:70,dp:535,sv:204},

{name:"DXN Ganozhi Plus Toothpaste-150g",pv:135,dp:700,sv:270},

{name:"DXN Ganozhi Plus Toothpaste-75g",pv:85,dp:470,sv:180},

{name:"Massage Oil",pv:155,dp:1175,sv:485},

{name:"DXN Hair Oil",pv:135,dp:590,sv:228},

{name:"DXN Aloe V Cleansing Gel",pv:145,dp:1090,sv:415},

{name:"DXN Aloe V Hand & Body Lotion",pv:180,dp:1275,sv:490},

{name:"DXN Aloe V Facial Scrub",pv:190,dp:1165,sv:446},

{name:"DXN Papaya Facial Scrub",pv:55,dp:235,sv:90},

{name:"DXN Neem Facewash",pv:45,dp:190,sv:73},

{name:"DXN Apricot Facial Scrub",pv:55,dp:235,sv:90},

{name:"DXN Vegi Cleen",pv:170,dp:885,sv:350},

{name:"DXN Apple Enzyme Drink",pv:570,dp:2460,sv:937},

{name:"DXN Lion's Mane Coffee",pv:390,dp:1690,sv:644},

{name:"DXN Apple Fermented Jam",pv:225,dp:960,sv:368},

{name:"DXN Lion's Mane Oocha",pv:395,dp:1715,sv:654},

{name:"DXN Spirudle",pv:190,dp:965,sv:372},

{name:"DXN Lions Mane Lemon Matcha",pv:305,dp:1305,sv:496},

{name:"DXN Oocha Noodle",pv:175,dp:885,sv:341},

{name:"DXN Goji Berries",pv:625,dp:2690,sv:902},

{name:"DXN OOCHA NOODLE(T Y F)",pv:235,dp:1240,sv:479}
];

const unofficialProducts = [
        const dxnProductList = [
  // --- HEALTH FOOD PRODUCT ---
  { name: "RG-90", pv: 669.5, dp: 4435.2, sv: 1332.5 },
  { name: "RG-30", pv: 240.5, dp: 1641.6, sv: 483.6 },
  { name: "GL-90", pv: 474.5, dp: 3155.2, sv: 946.4 },
  { name: "GL-30", pv: 162.5, dp: 1126.4, sv: 327.6 },
  { name: "RG Powder 15g", pv: 325.0, dp: 2505.6, sv: 683.8 },
  { name: "GL Powder 30g", pv: 221.0, dp: 1699.2, sv: 477.1 },
  { name: "Andro-G 90", pv: 364.0, dp: 3104.0, sv: 763.1 },
  { name: "Andro-G 30", pv: 130.0, dp: 1126.4, sv: 276.9 },
  { name: "Reshilium Powder (3 Bottles)", pv: 1144.0, dp: 7673.6, sv: 2262.0 },
  { name: "Reshilium Powder (30 Bottles)", pv: 10530.0, dp: 69440.0, sv: 20992.4 },
  { name: "DXN Bee Pollen 120's", pv: 273.0, dp: 2307.2, sv: 578.5 },
  { name: "DXN Cordyceps Capsule 60’s", pv: 845.0, dp: 5888.0, sv: 1635.4 },
  { name: "DXN Roselle Tablet 120's", pv: 182.0, dp: 1763.2, sv: 440.7 },
  { name: "DXN Lion's Mane Tablet 120's", pv: 429.0, dp: 3712.0, sv: 906.1 },
  { name: "DXN Cordyceps Tablet 120's", pv: 1105.0, dp: 7744.0, sv: 2178.8 },
  { name: "DXN Spirulina Tablet 120's", pv: 260.0, dp: 2185.6, sv: 546.0 },
  { name: "RG-360", pv: 2535.0, dp: 16896.0, sv: 5047.9 },
  { name: "GL-360", pv: 1820.0, dp: 12038.4, sv: 3636.1 },
  { name: "DXN Spirulina Capsule (30's)", pv: 104.0, dp: 780.8, sv: 211.9 },
  { name: "DXN Spirulina Capsule (90's)", pv: 299.0, dp: 2288.0, sv: 601.9 },
  { name: "DXN Spirulina Tablet 500's", pv: 975.0, dp: 7779.2, sv: 2009.8 },
  { name: "DXN MycoVeggie (Bottle)", pv: 1235.0, dp: 8480.0, sv: 2414.1 },
  { name: "DXN Potenzhi-30", pv: 331.5, dp: 2748.8, sv: 669.5 },
  { name: "DXN Potenzhi-90", pv: 910.0, dp: 7456.0, sv: 1821.3 },
  { name: "DXN Mycovita (24g x 30)", pv: 10530.0, dp: 69440.0, sv: 20992.4 },
  { name: "DXN MycoVeggie (Box)", pv: 689.0, dp: 4704.0, sv: 1331.2 },
  { name: "DXN Black Cumin Plus Capsule 30's", pv: 295.1, dp: 1673.6, sv: 427.7 },
  { name: "DXN Black Cumin Plus Capsule 90's", pv: 796.9, dp: 4512.0, sv: 1151.8 },
  { name: "DXN Monascus Capsule 90's", pv: 513.5, dp: 4096.0, sv: 1043.9 },
  { name: "DXN Monascus Capsule 30's", pv: 182.0, dp: 1440.0, sv: 367.9 },
  { name: "DXN Bee Pollen Tablet 300's", pv: 663.0, dp: 5472.0, sv: 1378.0 },
  { name: "DXN Spirulina Tablet 300's", pv: 650.0, dp: 5244.8, sv: 1337.7 },
  { name: "DXN Mycovita (12g x 30)", pv: 5798.0, dp: 38400.0, sv: 11620.7 },
  { name: "DXN Spirulina Capsule (360's)", pv: 1124.5, dp: 8518.4, sv: 2245.1 },
  { name: "DXN Spirulina Powder 50g", pv: 390.0, dp: 3158.4, sv: 809.9 },
  { name: "DXN Cordyceps Powder 30g", pv: 617.5, dp: 4320.0, sv: 1190.8 },
  { name: "DXN Lion's Mane Powder 30g", pv: 357.5, dp: 3040.0, sv: 741.0 },
  { name: "DXN Poria S Capsule 30’s", pv: 143.0, dp: 1158.4, sv: 313.3 },
  { name: "DXN Poria S Capsule 90’s", pv: 403.0, dp: 3200.0, sv: 868.4 },
  { name: "DXN Poria S Powder 30g", pv: 208.0, dp: 1753.6, sv: 477.1 },
  { name: "DXN Lignosus Plus Syrup", pv: 175.5, dp: 1398.4, sv: 314.6 },
  { name: "DXN Pearl Powder 30g", pv: 338.0, dp: 2604.8, sv: 696.8 },
  { name: "DXN Lion's Mane Powder 10's Box", pv: 422.5, dp: 3616.0, sv: 881.4 },
  { name: "DXN Shiitake Powder 10's Box", pv: 422.5, dp: 3840.0, sv: 936.0 },
  { name: "DXN Agaricus Blazei Murill Powder", pv: 757.9, dp: 3840.0, sv: 936.0 },
  { name: "DXN Agaricus Blazei Murill Capsule 30", pv: 222.3, dp: 1126.4, sv: 275.6 },
  { name: "DXN Agaricus Blazei Murill Capsule 90", pv: 579.8, dp: 2950.4, sv: 718.9 },
  { name: "DXN Hong T Powder", pv: 299.0, dp: 2425.6, sv: 648.7 },
  { name: "Reishilium Powder 70g", pv: 1196.0, dp: 8060.8, sv: 2372.5 },
  { name: "DXN Gegen Plus Powder", pv: 695.5, dp: 3264.0, sv: 859.3 },
  { name: "DXN Gegen Plus Capsule 30's", pv: 296.4, dp: 1388.8, sv: 367.9 },
  { name: "DXN Gegen Plus Capsule 90's", pv: 806.0, dp: 3776.0, sv: 995.8 },
  { name: "DXN Ros L Powder", pv: 149.5, dp: 1395.2, sv: 349.7 },
  { name: "DXN Mengkudu 350mg Capsule 30's", pv: 143.0, dp: 1068.8, sv: 250.9 },
  { name: "DXN Mengkudu 350mg Capsule 90's", pv: 403.0, dp: 2969.6, sv: 698.1 },
  { name: "DXN Ligno-L Powder 40g", pv: 461.5, dp: 3584.0, sv: 800.8 },
  { name: "DXN Shiitake Mushroom Powder 30g", pv: 357.5, dp: 3027.2, sv: 737.1 },
  { name: "DXN Black Cumin Plus Powder 30g", pv: 683.8, dp: 3328.0, sv: 847.6 },
  { name: "DXN Scelium Capsule 30's", pv: 130.0, dp: 976.0, sv: 257.4 },
  { name: "DXN Scelium Capsule 90's", pv: 351.0, dp: 2707.2, sv: 712.4 },
  { name: "DXN Hong T Capsule 90's", pv: 344.5, dp: 2691.2, sv: 718.9 },
  { name: "DXN Hong T Capsule 360's", pv: 1293.5, dp: 9984.0, sv: 2671.5 },
  { name: "DXN Wild Betel 66.6mg Pill", pv: 117.0, dp: 1148.8, sv: 279.5 },
  { name: "DXN Garcinia 350mg Capsule 30's", pv: 157.3, dp: 793.6, sv: 193.7 },
  { name: "DXN Garcinia 350mg Capsule 90's", pv: 432.9, dp: 2192.0, sv: 536.9 },
  { name: "DXN Garcinia 350mg Capsule 360's", pv: 1610.7, dp: 8160.0, sv: 1992.9 },
  { name: "DXN Spirulina Tablet 300’s (5 bottles)", pv: 2730.0, dp: 21964.8, sv: 5636.8 },
  { name: "DXN Lighoney Syrup", pv: 175.5, dp: 1292.8, sv: 289.9 },
  { name: "DXN Fomes 1g/g G Powder", pv: 325.0, dp: 2505.6, sv: 682.5 },
  { name: "DXN Fomes 270mg G 30’s", pv: 240.5, dp: 1641.6, sv: 482.3 },
  { name: "DXN Fomes 270mg G 90’s", pv: 669.5, dp: 4435.2, sv: 1331.2 },
  { name: "DXN Zhicurcu Capsule 30's", pv: 182.0, dp: 1328.0, sv: 338.0 },
  { name: "DXN Zhicurcu Capsule 90's", pv: 488.8, dp: 3584.0, sv: 916.5 },
  { name: "DXN Fuling Plus Pill", pv: 117.0, dp: 1148.8, sv: 279.5 },
  { name: "DXN Black Ginger Capsul 30’s", pv: 182.0, dp: 1328.0, sv: 338.0 },
  { name: "DXN Black Ginger Capsul 90’s", pv: 488.8, dp: 3584.0, sv: 916.5 },
  { name: "DXN Huang Qi Plus Pill", pv: 117.0, dp: 1148.8, sv: 279.5 },

  // --- FOOD & BEVERAGE PRODUCT ---
  { name: "DXN Lingzhi Coffee 2 In 1", pv: 123.5, dp: 1232.0, sv: 291.2 },
  { name: "DXN Roselle Juice", pv: 130.0, dp: 1289.6, sv: 314.6 },
  { name: "DXN Morinzhi", pv: 208.0, dp: 1680.0, sv: 426.4 },
  { name: "DXN Morinzyme", pv: 208.0, dp: 1680.0, sv: 426.4 },
  { name: "DXN Cordypine 700ml", pv: 1690.0, dp: 11584.0, sv: 3192.8 },
  { name: "DXN Spirulina Cereal (Box)", pv: 247.0, dp: 3232.0, sv: 652.6 },
  { name: "DXN Zhi Mocha", pv: 143.0, dp: 1424.0, sv: 327.6 },
  { name: "DXN Eu Cafe", pv: 156.0, dp: 1459.2, sv: 352.3 },
  { name: "DXN Reishi Gano Tea", pv: 130.0, dp: 1660.8, sv: 344.5 },
  { name: "DXN Vinaigrette (700ml)", pv: 598.0, dp: 4160.0, sv: 1054.3 },
  { name: "DXN Cordypine (285ml)", pv: 728.0, dp: 5280.0, sv: 1456.0 },
  { name: "DXN Kiwi", pv: 231.4, dp: 2400.0, sv: 534.3 },
  { name: "DXN Zhi Cafe Classic", pv: 123.5, dp: 1526.4, sv: 300.3 },
  { name: "DXN Lingzhi Coffee 3 In 1 Lite", pv: 123.5, dp: 1328.0, sv: 309.4 },
  { name: "DXN Vinaigrette 285ml", pv: 262.6, dp: 1840.0, sv: 464.1 },
  { name: "DXN Cream Coffee", pv: 126.1, dp: 1276.8, sv: 306.8 },
  { name: "DXN Cordyceps Cereal", pv: 585.0, dp: 5408.0, sv: 1235.0 },
  { name: "DXN Morinzhi (6 Bottles)", pv: 1248.0, dp: 9536.0, sv: 2553.2 },
  { name: "DXN Morinzyme (6 Bottles)", pv: 1248.0, dp: 9536.0, sv: 2553.2 },
  { name: "DXN Roselle Juice (6 Bottles)", pv: 780.0, dp: 7328.0, sv: 1869.4 },
  { name: "DXN Pineapple Jam (400g)", pv: 46.8, dp: 572.8, sv: 106.6 },
  { name: "DXN White Coffee Zhino", pv: 136.5, dp: 1257.6, sv: 243.1 },
  { name: "DXN Lingzhi Coffee 3 In 1", pv: 123.5, dp: 1328.0, sv: 297.7 },
  { name: "DXN Fruzim", pv: 208.0, dp: 1705.6, sv: 348.4 },
  { name: "DXN Spica Tea", pv: 143.0, dp: 1312.0, sv: 369.2 },
  { name: "DXN Lingzhi Black Coffee (New)", pv: 143.0, dp: 1283.2, sv: 332.8 },
  { name: "DXN Cocozhi", pv: 117.0, dp: 1702.4, sv: 321.1 },
  { name: "DXN Spirulina Cereal (Bag)", pv: 247.0, dp: 2416.0, sv: 487.5 },
  { name: "DXN Zhi Mocha (Bag)", pv: 143.0, dp: 1200.0, sv: 274.3 },
  { name: "DXN Vita Cafe Bag", pv: 156.0, dp: 1644.8, sv: 353.6 },
  { name: "DXN Cordyceps Coffee 3 In 1", pv: 136.5, dp: 1328.0, sv: 288.6 },
  { name: "DXN Newtrizhi", pv: 234.0, dp: 3097.6, sv: 635.7 },
  { name: "DXN Zhi Mint P (Sachet)", pv: 22.1, dp: 236.8, sv: 50.7 },
  { name: "DXN Zhi Mint (Sachet)", pv: 22.1, dp: 236.8, sv: 50.7 },
  { name: "DXN Zhi Mint (Box)", pv: 530.4, dp: 5504.0, sv: 1267.5 },
  { name: "DXN Zhi Mint P (Box)", pv: 265.2, dp: 2780.8, sv: 633.1 },
  { name: "DXN Civattino Coffee 200g", pv: 1094.6, dp: 5120.0, sv: 1207.7 },
  { name: "DXN L-Vegmix", pv: 442.0, dp: 2656.0, sv: 486.2 },
  { name: "DXN Ganoderma Mushroom 100g", pv: 241.8, dp: 1433.6, sv: 266.5 },
  { name: "DXN Lemonzhi", pv: 91.0, dp: 1097.6, sv: 201.5 },
  { name: "DXN Goji Berries", pv: 215.8, dp: 2105.6, sv: 300.3 },
  { name: "DXN Lingzhi Black Coffee Bag", pv: 143.0, dp: 1312.0, sv: 332.8 },
  { name: "DXN D'Latte ( Box )", pv: 153.4, dp: 1632.0, sv: 314.6 },
  { name: "DXN Ganoodle (Tom Yam Flavour)", pv: 59.8, dp: 588.8, sv: 96.2 },
  { name: "DXN Spirudle (Tom Yam Flavour)", pv: 59.8, dp: 588.8, sv: 96.2 },
  { name: "DXN Lignopine 285ml", pv: 728.0, dp: 5280.0, sv: 1456.0 },
  { name: "DXN Lignopine 700ml", pv: 1690.0, dp: 11584.0, sv: 3192.8 },
  { name: "DXN Hong-T (Hong Tian Wu)", pv: 241.8, dp: 1433.6, sv: 266.5 },
  { name: "DXN Cin-G", pv: 195.0, dp: 1824.0, sv: 336.7 },
  { name: "DXN Cinnamon Herbs Bag", pv: 442.0, dp: 4640.0, sv: 754.0 },
  { name: "DXN Apple Enzyme Drink", pv: 364.0, dp: 3520.0, sv: 717.6 },
  { name: "DXN Cucumber Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Carrot Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Goji Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Bitter Bean Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Pumpkin Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Tomato Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Lion's Mane Coffee", pv: 162.5, dp: 1619.2, sv: 263.9 },
  { name: "DXN Aloe Vita", pv: 45.5, dp: 476.8, sv: 98.8 },
  { name: "DXN Vinaigrette Honey 285ml", pv: 360.1, dp: 2544.0, sv: 642.2 },
  { name: "DXN Vinaigrette Honey 700ml", pv: 821.6, dp: 5760.0, sv: 1459.9 },
  { name: "DXN Zhitea", pv: 282.1, dp: 1712.0, sv: 384.8 },
  { name: "DXN Sweet Potato Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Orange Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Papaya Candy With Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Oocha", pv: 226.2, dp: 1548.8, sv: 310.7 },
  { name: "DXN VCO-L 285ml", pv: 221.0, dp: 2912.0, sv: 473.2 },
  { name: "DXN Komb-B 285ml", pv: 45.5, dp: 403.2, sv: 78.0 },
  { name: "DXN Apple Fermented Jam", pv: 71.5, dp: 886.4, sv: 144.3 },
  { name: "DXN White Radish Candy with Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Leek Candy with Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Lions’s Mane Oocha", pv: 169.0, dp: 1721.6, sv: 280.8 },
  { name: "DXN Himalayan Salt", pv: 62.4, dp: 627.2, sv: 104.0 },
  { name: "DXN Moricinia 285ml", pv: 360.1, dp: 1680.0, sv: 426.4 },
  { name: "DXN Moricinia 700ml", pv: 778.7, dp: 3616.0, sv: 920.4 },
  { name: "DXN Red Beet Candy with Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Ginger Candy with Honey", pv: 249.6, dp: 2083.2, sv: 338.0 },
  { name: "DXN Lion’s Mane Coffee (cup)", pv: 18.2, dp: 176.0, sv: 28.6 },
  { name: "DXN Moricinia 285ml x 6", pv: 2159.3, dp: 9536.0, sv: 2553.2 },
  { name: "DXN Neph-V 285ml", pv: 416.0, dp: 1824.0, sv: 460.2 },
  { name: "DXN Spirudle", pv: 52.0, dp: 512.0, sv: 84.5 },
  { name: "DXN Roselle Juice 50ml", pv: 739.7, dp: 3680.0, sv: 913.9 },
  { name: "DXN Morinzyme Juice 50ml", pv: 1059.5, dp: 4832.0, sv: 1259.7 },
  { name: "DXN Cordypine Juice 50ml", pv: 3199.3, dp: 14144.0, sv: 3906.5 },
  { name: "DXN Florathemum", pv: 283.4, dp: 1849.6, sv: 391.3 },
  { name: "DXN Oozhi Tea", pv: 187.2, dp: 1689.6, sv: 383.5 },
  { name: "DXN Zhi Yobite", pv: 65.0, dp: 659.2, sv: 120.9 },
  { name: "DXN Lina Yobite", pv: 65.0, dp: 659.2, sv: 120.9 },
  { name: "DXN Lion's Mane Lemon Matcha", pv: 161.2, dp: 1584.0, sv: 247.0 },
  { name: "DXN Spirudle (Curry Flavour)", pv: 68.9, dp: 646.4, sv: 105.3 },
  { name: "DXN Curry Paste (For Fish)", pv: 65.0, dp: 598.4, sv: 98.8 },
  { name: "DXN Curry Paste (For Chicken & Meat)", pv: 65.0, dp: 598.4, sv: 98.8 },
  { name: "DXN Lingzhi Pineapple Cake", pv: 208.0, dp: 1955.2, sv: 338.0 },
  { name: "DXN Lingzhi Oolong Tea", pv: 334.1, dp: 2569.6, sv: 434.2 },
  { name: "DXN Lion’s Mane Oolong Tea", pv: 334.1, dp: 2569.6, sv: 434.2 },
  { name: "DXN Zhi Honey", pv: 273.0, dp: 2483.2, sv: 513.5 },
  { name: "DXN Cocozhi Neo", pv: 117.0, dp: 1596.8, sv: 321.1 },
  { name: "DXN Multipurpose Seasoning", pv: 201.5, dp: 1366.4, sv: 222.3 },
  { name: "DXN Spirunanas", pv: 208.0, dp: 1955.2, sv: 338.0 },
  { name: "DXN Lion's Mane Black Tea", pv: 213.2, dp: 1488.0, sv: 276.9 },
  { name: "DXN Lingzhi Black Tea", pv: 213.2, dp: 1488.0, sv: 276.9 },
  { name: "DXN Oocha Noodle (Tom Yam Flavour)", pv: 59.8, dp: 588.8, sv: 96.2 },
  { name: "DXN Oocha Noodle (Curry Flavour)", pv: 68.9, dp: 646.4, sv: 105.3 },
  { name: "DXN Oozhi Tea 30g", pv: 97.5, dp: 614.4, sv: 140.4 },
  { name: "DXN Oozhi Tea 30's", pv: 118.3, dp: 739.2, sv: 169.0 },
  { name: "DXN Freeze Dried Instant Mushroom Soup", pv: 40.3, dp: 278.4, sv: 45.5 },
  { name: "DXN Coffeepine Cake", pv: 208.0, dp: 1955.2, sv: 338.0 },
  { name: "DXN Cocoapine Cake", pv: 208.0, dp: 1955.2, sv: 338.0 },
  { name: "DXN Sugar", pv: 18.2, dp: 172.8, sv: 26.0 },
  { name: "DXN Non Dairy Creamer", pv: 36.4, dp: 358.4, sv: 53.3 },
  { name: "DXN Oolong Tea Powder 30g", pv: 141.7, dp: 944.0, sv: 192.4 },
  { name: "DXN Zhi Roasted Coffee", pv: 249.6, dp: 1216.0, sv: 296.4 },
  { name: "DXN Ootea Lingzhi Coffee Mix 3 in 1", pv: 249.6, dp: 1315.2, sv: 299.0 },
  { name: "DXN Ootea Lingzhi Coffee Mix 3 in 1 Lite", pv: 260.0, dp: 1315.2, sv: 312.0 },
  { name: "DXN Ootea Lingzhi Coffee Mix 2 in 1", pv: 240.5, dp: 1216.0, sv: 287.3 },
  { name: "DXN Ootea Cordyceps Coffee Mix 3 in 1", pv: 237.9, dp: 1315.2, sv: 284.7 },
  { name: "DXN Ootea Zhi Mocha Mix", pv: 273.0, dp: 1414.4, sv: 326.3 },
  { name: "DXN Ootea White Coffee Zhino Mix", pv: 198.9, dp: 1171.2, sv: 235.3 },
  { name: "DXN Ootea Lingzhi Black Coffee Mix", pv: 278.2, dp: 1276.8, sv: 331.5 },
  { name: "DXN Ootea Vita Cafe Mix", pv: 291.2, dp: 1619.2, sv: 347.1 },
  { name: "DXN Ootea Eu Cafe Mix", pv: 289.9, dp: 1436.8, sv: 347.1 },
  { name: "DXN Chicken Rice (Box)", pv: 136.5, dp: 1232.0, sv: 200.2 },
  { name: "DXN Tomato Rice (Box)", pv: 97.5, dp: 880.0, sv: 143.0 },
  { name: "DXN Spirulina Crostini", pv: 78.0, dp: 569.6, sv: 93.6 },
  { name: "DXN Zhi Crostini", pv: 78.0, dp: 569.6, sv: 93.6 },
  { name: "DXN Dried Goji Berries – 100g", pv: 98.8, dp: 985.6, sv: 124.8 },
  { name: "DXN Dried Jujube Fruits – 180g", pv: 87.1, dp: 864.0, sv: 110.5 },
  { name: "DXN Lion's Mane Coffee Latte", pv: 162.5, dp: 1388.8, sv: 226.2 },
  { name: "DXN Lion's Mane Oocha Latte", pv: 196.3, dp: 1936.0, sv: 314.6 },
  { name: "DXN Spirulina Coffee", pv: 162.5, dp: 1788.8, sv: 280.8 },
  { name: "DXN Bitter Bean Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Carrot Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Cucumber Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Ginger Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Goji Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Kemili Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Leek Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Okra Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Orange Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Papaya Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Pumpkin Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Red Beet Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Sweet Potato Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Tomato Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN White Radish Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Kolesom Candy with Honey 40g", pv: 57.2, dp: 499.2, sv: 81.9 },
  { name: "DXN Spirulina Buckwheat Noodle", pv: 61.1, dp: 608.0, sv: 98.8 },
  { name: "DXN VCO-L 30ml", pv: 41.6, dp: 400.0, sv: 66.3 },
  { name: "DXN Iodised Bamboo Salt", pv: 127.4, dp: 1180.8, sv: 192.4 },
  { name: "DXN Biryani Rice", pv: 156.0, dp: 1408.0, sv: 200.2 },
  { name: "DXN Mushroom Patty", pv: 148.2, dp: 1344.0, sv: 163.8 },
  { name: "DXN Ginpine 285ml", pv: 728.0, dp: 5280.0, sv: 1456.0 },
  { name: "DXN Ganoodle (Curry Flavour)", pv: 68.9, dp: 646.4, sv: 105.3 },
  { name: "DXN Oyster Mushroom Seasoning", pv: 110.5, dp: 880.0, sv: 143.0 },
  { name: "DXN Lingzhi Coffee 3 in 1 Neo", pv: 123.5, dp: 1260.8, sv: 297.7 },
  { name: "DXN Lingzhi Coffee 3 in 1 Lite Neo", pv: 123.5, dp: 1260.8, sv: 309.4 },
  { name: "DXN Cordyceps Coffee 3 in 1 Neo", pv: 136.5, dp: 1260.8, sv: 288.6 },
  { name: "DXN D'Latte Neo", pv: 153.4, dp: 1574.4, sv: 314.6 },
  { name: "DXN Lingzhi 3 in 1", pv: 123.5, dp: 1328.0, sv: 297.7 },
  { name: "DXN Iodised Bamboo Salt Lingzhi Coffee", pv: 110.5, dp: 1340.8, sv: 310.7 },
  { name: "DXN Saffron (1g)", pv: 227.5, dp: 1654.4, sv: 302.9 },
  { name: "DXN Civattino Coffee Bean (100g)", pv: 566.8, dp: 2656.0, sv: 627.9 },
  { name: "DXN Civattino Coffee (11g)", pv: 1326.0, dp: 6176.0, sv: 1462.5 },
  { name: "DXN Truffle Coffee 3 in 1", pv: 123.5, dp: 1328.0, sv: 297.7 },
  { name: "DXN Truffle Coffee 3 in 1 Lite", pv: 123.5, dp: 1328.0, sv: 309.4 },
  { name: "DXN Truffle Coffee 2 in 1", pv: 123.5, dp: 1196.8, sv: 291.2 },
  { name: "DXN Truffle Black Coffee", pv: 143.0, dp: 1283.2, sv: 332.8 },
  { name: "DXN Truffle Cream Coffee", pv: 126.1, dp: 1276.8, sv: 306.8 },
  { name: "DXN Truffle Mocha", pv: 143.0, dp: 1424.0, sv: 327.6 },
  { name: "DXN Truffle Latte", pv: 153.4, dp: 1574.4, sv: 314.6 },
  { name: "DXN Lemontruff", pv: 91.0, dp: 1097.6, sv: 201.5 },
  { name: "DXN Cocotruff", pv: 117.0, dp: 1596.8, sv: 321.1 },
  { name: "DXN Ootea 2 in 1", pv: 208.0, dp: 1420.8, sv: 278.2 },
  { name: "DXN Cordyceps Ootea 3 in 1", pv: 226.2, dp: 1548.8, sv: 310.7 },
  { name: "DXN Eu Ootea", pv: 230.1, dp: 1580.8, sv: 315.9 },
  { name: "DXN Vita Ootea", pv: 284.7, dp: 1948.8, sv: 377.0 },
  { name: "DXN Iodised Bamboo Salt Lingzhi Tea Latte", pv: 104.0, dp: 832.0, sv: 154.7 },

  // --- PERSONAL CARE PRODUCT ---
  { name: "DXN Ganozhi Shampoo", pv: 156.0, dp: 1296.0, sv: 377.0 },
  { name: "DXN Ganozhi Body Foam", pv: 156.0, dp: 1296.0, sv: 377.0 },
  { name: "Ganozhi Toothpaste", pv: 81.9, dp: 662.4, sv: 179.4 },
  { name: "Gano Massage Oil", pv: 136.5, dp: 1084.8, sv: 299.0 },
  { name: "Fresh Perfume (Male)", pv: 305.5, dp: 3232.0, sv: 760.5 },
  { name: "Fresh Perfume (Female)", pv: 305.5, dp: 3232.0, sv: 760.5 },
  { name: "Tea Tree Cream", pv: 66.3, dp: 656.0, sv: 158.6 },
  { name: "DXN Talcum Powder", pv: 58.5, dp: 700.8, sv: 169.0 },
  { name: "DXN Toileteries Travel Kit", pv: 45.5, dp: 1024.0, sv: 110.5 },
  { name: "DXN Ganozhi Shampoo (100ml)", pv: 71.5, dp: 643.2, sv: 169.0 },
  { name: "DXN Ganozhi Body Foam (100ml)", pv: 71.5, dp: 643.2, sv: 169.0 },
  { name: "DXN Ganozhi Toothpaste (75g/tube)", pv: 52.0, dp: 422.4, sv: 111.8 },
  { name: "DXN Ganozhi Plus Toothpaste", pv: 92.3, dp: 745.6, sv: 200.2 },
  { name: "DXN Ganozhi Shampoo (30 sachet)", pv: 169.0, dp: 1472.0, sv: 396.5 },
  { name: "DXN Ganozhi Body Foam (30 sachet)", pv: 169.0, dp: 1472.0, sv: 396.5 },
  { name: "DXN Ganozhi Soap", pv: 45.5, dp: 390.4, sv: 104.0 },
  { name: "DXN Ganozhi Plus Shampoo 250 ml", pv: 171.6, dp: 1420.8, sv: 414.7 },
  { name: "DXN Ganozhi Plus Body Foam 250 ml", pv: 171.6, dp: 1420.8, sv: 414.7 },
  { name: "DXN Toothbrush (For Adults)", pv: 22.1, dp: 243.2, sv: 41.6 },
  { name: "DXN Toothbrush (For Children)", pv: 22.1, dp: 243.2, sv: 41.6 },
  { name: "Zhimeko", pv: 49.4, dp: 752.0, sv: 137.8 },
  { name: "DXN Zhicare Toothpaste", pv: 89.7, dp: 659.2, sv: 128.7 },
  { name: "DXN Zhi Hand Sanitizer", pv: 130.0, dp: 1158.4, sv: 237.9 },
  { name: "DXN Face Mask", pv: 150.8, dp: 928.0, sv: 166.4 },
  { name: "DXN Oocha Toothpaste", pv: 92.3, dp: 700.8, sv: 189.8 },
  { name: "DXN Ganozhi Trans Soap", pv: 317.2, dp: 1305.6, sv: 348.4 },
  { name: "DXN Oocha Trans Soap", pv: 317.2, dp: 1305.6, sv: 348.4 },
  { name: "Gano Massage Oil 40ml", pv: 106.6, dp: 880.0, sv: 218.4 },
  { name: "DXN Bomsalt Toothpaste 150g", pv: 92.3, dp: 700.8, sv: 189.8 },

  // --- SKIN CARE PRODUCT ---
  { name: "Ganozhi Toner", pv: 429.0, dp: 4800.0, sv: 1068.6 },
  { name: "Ganozhi Moisturizing Micro Emulsion", pv: 650.0, dp: 7008.0, sv: 1595.1 },
  { name: "Ganozhi Liquid Cleanser", pv: 429.0, dp: 4800.0, sv: 1068.6 },
  { name: "Chubby Baby Oil (200ml)", pv: 49.4, dp: 704.0, sv: 132.6 },
  { name: "Ganozhi Lipstick – Coco Red", pv: 145.6, dp: 1772.8, sv: 365.3 },
  { name: "Ganozhi Lipstick – Pearly Red", pv: 145.6, dp: 1772.8, sv: 365.3 },
  { name: "Ganozhi Lipstick – Pearly Pink", pv: 145.6, dp: 1772.8, sv: 365.3 },
  { name: "Ganozhi Lipstick – Pearly Grape", pv: 145.6, dp: 1772.8, sv: 365.3 },
  { name: "DXN Aloe V Cleansing Gel", pv: 54.6, dp: 825.6, sv: 159.9 },
  { name: "DXN Aloe V Hydrating Toner", pv: 67.6, dp: 851.2, sv: 163.8 },
  { name: "DXN Aloe V Aqua Gel", pv: 143.0, dp: 1795.2, sv: 352.3 },
  { name: "DXN Aloe V Nutricare Cream", pv: 92.3, dp: 1174.4, sv: 230.1 },
  { name: "DXN Aloe V Hand & Body Lotion", pv: 49.4, dp: 844.8, sv: 162.5 },
  { name: "DXN Ganozhi Complete Skin Care Series", pv: 338.0, dp: 4000.0, sv: 833.3 },
  { name: "DXN Ganozhi E Deep Cleansing Cream", pv: 384.8, dp: 3840.0, sv: 903.5 },
  { name: "DXN Ganozhi E Hydrasoft Toner", pv: 400.4, dp: 4000.0, sv: 942.5 },
  { name: "DXN Ganozhi E UV Defense Day Cream", pv: 527.8, dp: 5280.0, sv: 1238.9 },
  { name: "DXN Ganozhi E Nourishing Night Cream", pv: 565.5, dp: 5632.0, sv: 1320.8 },
  { name: "Dxn Aloe. V Facial Scrub", pv: 74.1, dp: 880.0, sv: 169.0 },
  { name: "Dxn Aloe.V Hydrating Mask", pv: 96.2, dp: 1123.2, sv: 218.4 },
  { name: "Ganozhi Lipstick – Coral Pink", pv: 145.6, dp: 1772.8, sv: 365.3 },
  { name: "DXN Papaya Facial Scrub", pv: 92.3, dp: 1008.0, sv: 195.0 },
  { name: "DXN Chubby Baby Oil 40ml", pv: 18.2, dp: 230.4, sv: 37.7 },
  { name: "DXN Gempyuri Multi Massage Cleanser", pv: 845.0, dp: 7136.0, sv: 1682.2 },
  { name: "DXN Gempyuri Tightening Fresh Toner", pv: 1326.0, dp: 11104.0, sv: 2615.6 },
  { name: "DXN Gempyuri Volume Energy Serum", pv: 1599.0, dp: 13344.0, sv: 3143.4 },
  { name: "DXN Gempyuri Rejuvenation Cream", pv: 1846.0, dp: 15456.0, sv: 3640.0 },
  { name: "DXN Gempyuri Lifting Impact Ampoule Oil", pv: 1599.0, dp: 13440.0, sv: 3165.5 },
  { name: "DXN Gempyuri Skin Care Set", pv: 6669.0, dp: 55680.0, sv: 13119.6 },
  { name: "DXN Anti-Aging Face Mask", pv: 494.0, dp: 4160.0, sv: 980.2 },
  { name: "DXN Oolong Tea Mask", pv: 429.0, dp: 3552.0, sv: 837.2 },
  { name: "DXN Spiru Face Mask", pv: 429.0, dp: 3552.0, sv: 837.2 },
  { name: "DXN Ootea Bomsalt Scrub", pv: 223.6, dp: 2515.2, sv: 460.2 },
  { name: "Evelyn Finish Powder Golden Sands", pv: 377.0, dp: 4576.0, sv: 943.8 },
  { name: "Evelyn Finish Powder Endless Coffee", pv: 377.0, dp: 4576.0, sv: 943.8 },
  { name: "Evelyn Finish Powder Creamy Vanilla", pv: 377.0, dp: 4576.0, sv: 943.8 },
  { name: "Evelyn Finish Powder Milky Cream", pv: 377.0, dp: 4576.0, sv: 943.8 },
  { name: "Evelyn Velvet Matte Lipstick She’s The One", pv: 312.0, dp: 3808.0, sv: 783.9 },
  { name: "Evelyn Velvet Matte Lipstick Winner", pv: 312.0, dp: 3808.0, sv: 783.9 },
  { name: "Evelyn Velvet Matte Lipstick Posh", pv: 312.0, dp: 3808.0, sv: 783.9 },
  { name: "Evelyn Velvet Matte Lipstick Attitude", pv: 312.0, dp: 3808.0, sv: 783.9 },
  { name: "Evelyn Lipstick She’s One In a Billion", pv: 312.0, dp: 3808.0, sv: 783.9 },
  { name: "Evelyn Finish Powder Collections", pv: 1391.0, dp: 16896.0, sv: 3484.0 },
  { name: "Evelyn Velvet Matte Lipstick Collections", pv: 1443.0, dp: 17536.0, sv: 3604.9 }
];
            
        
      
];

const levels = [
    { pv: 58500, percent: 25 },
    { pv: 42250, percent: 18 },
    { pv: 26000, percent: 15 },
    { pv: 13000, percent: 12 },
    { pv: 3900, percent: 9 },
    { pv: 1300, percent: 6 }
];

const officialTbody = document.getElementById("officialProducts");
const unofficialTbody = document.getElementById("unofficialProducts");

function renderTable(list, container) {
    container.innerHTML = list.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td class="pv-val">${p.pv}</td>
            <td class="dp-val">${p.dp}</td>
            <td class="sv-val">${p.sv}</td>
            <td><input type="number" min="0" value="0" oninput="calculate()"></td>
        </tr>
    `).join("");
}

function calculate() {
    let totalPV = 0, totalDP = 0, totalSV = 0;
    let summaryHTML = [];

    document.querySelectorAll("tbody tr").forEach(row => {
        const qty = parseInt(row.querySelector("input").value) || 0;
        if (qty > 0) {
            const name = row.cells[0].textContent;
            const pv = parseInt(row.querySelector(".pv-val").textContent);
            const dp = parseInt(row.querySelector(".dp-val").textContent);
            const sv = parseInt(row.querySelector(".sv-val").textContent);

            totalPV += pv * qty;
            totalDP += dp * qty;
            totalSV += sv * qty;

            summaryHTML.push(`✔️ ${name} x ${qty} <br>`);
        }
    });

    // Update UI with animation effect
    animateValue("totalPV", totalPV);
    animateValue("totalDP", totalDP);
    animateValue("totalSV", totalSV);

    document.getElementById("showName").textContent = document.getElementById("memberName").value || "-";
    document.getElementById("productSummary").innerHTML = summaryHTML.length ? summaryHTML.join("") : "No product selected";

    updateProgress(totalPV);
}

function animateValue(id, endValue) {
    const obj = document.getElementById(id);
    obj.textContent = endValue.toLocaleString();
}

function updateProgress(currentPV) {
    let achieved = levels.find(l => currentPV >= l.pv);
    let nextTarget = levels.reverse().find(l => currentPV < l.pv) || levels[0];
    levels.reverse(); // Reset order

    const posEl = document.getElementById("position");
    if (achieved) {
        posEl.innerHTML = `<span class="badge">${achieved.percent}% Achieved</span>`;
    } else {
        posEl.textContent = "No Position";
    }

    let progress = Math.min((currentPV / nextTarget.pv) * 100, 100);
    document.getElementById("progressBar").style.width = progress + "%";
    document.getElementById("progressText").textContent = Math.round(progress) + "%";
}

// Initializing
document.addEventListener("DOMContentLoaded", () => {
    renderTable(officialProducts, officialTbody);
    renderTable(unofficialProducts, unofficialTbody);
    document.getElementById("today").textContent = new Date().toLocaleDateString();
    document.getElementById("memberName").addEventListener("input", () => {
        document.getElementById("showName").textContent = document.getElementById("memberName").value || "-";
    });

});
