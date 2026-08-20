const STORAGE_KEY = "one-bite-state-v1";
const INSTALL_DISMISSED_KEY = "one-bite-install-dismissed";
const DAY = 24 * 60 * 60 * 1000;

const CATEGORY_LABELS = {
  xinjiang: "新疆菜",
  northwest: "西北菜",
  northeast: "东北菜",
  shandong: "鲁菜",
  hotpot: "火锅",
  home: "家常菜"
};

const dish = (id, name, category, icon, stage, meals, tags, note, safety = "") => ({
  id, name, category, icon, stage, meals, tags, note, safety
});

const STAPLE_OPTIONS = ["米饭", "面条", "拉条子", "泡面", "大馒头"];
const HOME_SAFETY = {
  meat: "肉类完全熟透",
  poultry: "禽肉完全熟透",
  seafood: "鱼虾贝类完全熟透并留意鱼刺或硬壳",
  egg: "鸡蛋完全熟透"
};
const homeDish = (id, name, icon, tags, note, safetyType = "") =>
  dish(id, name, "home", icon, "late", ["main"], tags, note, HOME_SAFETY[safetyType] || "");

const foodItems = [
  dish("yangchun-noodles", "阳春面", "home", "🍜", "early", ["breakfast", "main", "snack"], ["热乎的", "带汤的", "清淡", "小份", "面食"], "早期喜欢过，适合偶尔回访"),
  dish("millet-porridge", "小米粥", "home", "🥣", "all", ["breakfast", "snack"], ["热乎的", "带汤的", "清淡", "软糯", "小份", "不闻油烟"], "从早期到晚期都比较稳定"),
  dish("northern-mantou", "北方大馒头", "home", "🍞", "early", ["breakfast", "main", "snack"], ["热乎的", "清淡", "小份", "不闻油烟"], "早期喜欢过，简单稳妥"),
  dish("dip-vegetables", "蘸酱菜", "northeast", "🥬", "mid", ["main"], ["清爽的", "咸鲜"], "中期喜欢过，想换清爽口时回访", "蔬菜充分清洗，酱料与配菜现做现吃"),
  dish("cumin-lamb", "孜然羊肉", "xinjiang", "🍖", "mid", ["main"], ["热乎的", "干香", "咸鲜", "香辣"], "中期喜欢过的香料型热菜", "羊肉完全熟透"),
  dish("seafood-paella", "西班牙海鲜烩饭", "home", "🥘", "mid", ["main"], ["热乎的", "咸鲜", "软糯"], "中期喜欢过，偶尔换换口", "海鲜完全熟透"),
  dish("vermicelli-pork-stew", "粉丝白菜炖五花肉", "northeast", "🍲", "mid", ["main"], ["热乎的", "带汤的", "软糯", "咸鲜", "炖菜"], "中期喜欢过的炖菜"),
  dish("guizhou-cuisine", "贵州酸汤菜", "home", "🌶️", "late", ["main"], ["热乎的", "酸一点", "咸鲜", "酸香"], "孕晚期明确喜欢过的酸香口"),
  dish("hakka-cuisine", "客家小炒", "home", "🍚", "late", ["main"], ["热乎的", "咸鲜", "干香"], "孕晚期明确喜欢过的客家风味"),
  dish("laghman", "新疆拉条子", "xinjiang", "🍝", "late", ["main"], ["热乎的", "干香", "有嚼劲", "咸鲜", "面食"], "孕晚期喜欢的新疆面食"),
  dish("qiepianzi", "新疆揪片子", "xinjiang", "🥣", "late", ["main", "snack"], ["热乎的", "带汤的", "有嚼劲", "小份", "面食"], "能做成一小碗汤面"),
  dish("big-plate-chicken", "新疆大盘鸡", "xinjiang", "🍗", "late", ["main"], ["热乎的", "干香", "咸鲜", "香辣"], "适合两个人一起吃", "鸡肉完全熟透"),
  dish("pilaf", "新疆抓饭", "xinjiang", "🍛", "late", ["main"], ["热乎的", "干香", "咸鲜", "软糯"], "孕晚期喜欢的主食型选择"),
  dish("boiled-egg", "水煮鸡蛋", "home", "🥚", "all", ["breakfast", "snack"], ["热乎的", "清淡", "小份", "不闻油烟"], "贯穿孕期的稳定早餐", "鸡蛋煮至蛋黄、蛋白完全凝固"),
  dish("oatmeal", "燕麦", "home", "🌾", "all", ["breakfast", "snack"], ["热乎的", "软糯", "小份", "不闻油烟"], "贯穿孕期的稳定早餐"),
  dish("yogurt", "原味酸奶", "home", "🥛", "all", ["breakfast", "snack"], ["清爽的", "小份", "不闻油烟"], "容易开始的一小份", "选择巴氏杀菌乳制品并注意冷藏"),
  dish("toast-bagel", "吐司或贝果", "home", "🥯", "all", ["breakfast", "snack"], ["清淡", "干香", "小份", "不闻油烟"], "贯穿孕期的稳定早餐"),
  dish("milk", "温牛奶", "home", "🥛", "all", ["breakfast", "snack"], ["热乎的", "清淡", "小份", "不闻油烟"], "贯穿孕期的稳定早餐", "选择巴氏杀菌或超高温灭菌牛奶"),
  dish("turkey-noodles", "火鸡面", "home", "🔥", "burst", ["main", "snack"], ["热乎的", "干香", "香辣", "面食"], "曾短期迷恋，目前先冷却"),

  dish("lamb-skewers", "烤羊肉串", "xinjiang", "🍢", "late", ["main"], ["热乎的", "干香", "有嚼劲", "香辣"], "想吃孜然香时很直接", "羊肉完全熟透"),
  dish("naan-lamb", "馕包肉", "xinjiang", "🫓", "late", ["main"], ["热乎的", "带汤的", "软糯", "咸鲜"], "馕吸足汤汁的满足口"),
  dish("pepper-chicken", "椒麻鸡", "xinjiang", "🍗", "late", ["main"], ["清爽的", "咸鲜", "香辣"], "麻香里带一点清爽", "鸡肉完全熟透，选择现做现吃"),
  dish("baked-buns", "新疆烤包子", "xinjiang", "🥟", "late", ["main", "snack"], ["热乎的", "干香", "有嚼劲", "小份"], "一次先来一两个"),
  dish("dingding-noodles", "丁丁炒面", "xinjiang", "🍝", "late", ["main"], ["热乎的", "干香", "有嚼劲", "面食"], "比长面更适合一勺一口"),
  dish("xinjiang-rice-noodles", "新疆炒米粉", "xinjiang", "🍜", "late", ["main"], ["热乎的", "有嚼劲", "香辣", "面食"], "想吃辣和韧劲时选它"),
  dish("xinjiang-naan", "热馕配酸奶", "xinjiang", "🫓", "late", ["breakfast", "snack"], ["干香", "清爽的", "小份", "不闻油烟"], "不想吃一整顿时先垫一口", "酸奶选择巴氏杀菌乳制品"),
  dish("pumpkin-lamb", "南瓜炖羊肉", "xinjiang", "🎃", "late", ["main"], ["热乎的", "带汤的", "软糯", "炖菜"], "软糯甜香的炖菜", "羊肉完全熟透"),

  dish("lamb-paomo", "羊肉泡馍", "northwest", "🥣", "late", ["main"], ["热乎的", "带汤的", "软糯", "面食"], "汤、肉和馍可以自己控制比例", "羊肉完全熟透"),
  dish("youpo-noodles", "油泼面", "northwest", "🍜", "late", ["main"], ["热乎的", "干香", "有嚼劲", "香辣", "面食"], "宽面配辣香，口感很明确"),
  dish("saozi-noodles", "岐山臊子面", "northwest", "🍜", "late", ["main", "snack"], ["热乎的", "带汤的", "酸一点", "小份", "面食"], "酸香汤面，适合先来小碗"),
  dish("roujiamo", "肉夹馍", "northwest", "🥙", "late", ["main", "snack"], ["热乎的", "干香", "有嚼劲", "小份"], "一个就能形成完整的一小顿"),
  dish("liangpi", "陕西凉皮", "northwest", "🥗", "late", ["main", "snack"], ["清爽的", "酸一点", "有嚼劲", "小份"], "没胃口时换成酸爽凉口", "选择卫生可靠的店，现拌现吃"),
  dish("yangyu-caca", "洋芋擦擦", "northwest", "🥔", "late", ["main", "snack"], ["热乎的", "干香", "软糯"], "土豆香、口感松软"),
  dish("northwest-stew", "西北烩菜", "northwest", "🍲", "late", ["main"], ["热乎的", "带汤的", "软糯", "炖菜"], "一锅里有肉有菜，适合分小碗"),
  dish("hand-grabbed-lamb", "手抓羊肉", "northwest", "🍖", "late", ["main"], ["热乎的", "咸鲜", "有嚼劲"], "想吃直接肉香时选它", "羊肉完全熟透"),
  dish("biangbiang-noodles", "臊子 Biangbiang 面", "northwest", "🍜", "late", ["main"], ["热乎的", "干香", "酸一点", "有嚼劲", "面食"], "宽面、臊子和酸香都很突出"),
  dish("northwest-lamb-soup", "羊杂汤配饼", "northwest", "🥣", "late", ["breakfast", "main"], ["热乎的", "带汤的", "咸鲜", "面食"], "适合想喝热汤又想有主食时", "内脏与羊肉彻底熟透，选择卫生可靠的店"),

  dish("guobaorou", "锅包肉", "northeast", "🥩", "late", ["main"], ["热乎的", "酸一点", "干香"], "酸甜脆口，胃口弱时也有存在感"),
  dish("disanxian", "地三鲜", "northeast", "🍆", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "土豆茄子青椒的家常组合"),
  dish("chicken-mushroom-stew", "小鸡炖蘑菇", "northeast", "🍲", "late", ["main"], ["热乎的", "带汤的", "软糯", "炖菜"], "东北菜里很稳的一锅", "鸡肉完全熟透，使用来源可靠的食用菌"),
  dish("pork-vermicelli", "猪肉炖粉条", "northeast", "🍲", "late", ["main"], ["热乎的", "带汤的", "软糯", "炖菜"], "粉条吸汤，适合慢慢吃"),
  dish("sauerkraut-pork", "酸菜白肉", "northeast", "🥘", "late", ["main"], ["热乎的", "带汤的", "酸一点", "炖菜"], "酸香解腻的热炖菜", "肉片完全熟透"),
  dish("northeast-stew", "东北乱炖", "northeast", "🍲", "late", ["main"], ["热乎的", "带汤的", "软糯", "炖菜"], "想吃多种蔬菜又不想点很多盘"),
  dish("liurouduan", "溜肉段", "northeast", "🥩", "late", ["main"], ["热乎的", "干香", "咸鲜"], "咸鲜挂汁，比纯炖菜更提胃口"),
  dish("pepper-tofu-skin", "尖椒干豆腐", "northeast", "🌶️", "late", ["main"], ["热乎的", "咸鲜", "软糯"], "豆香加一点尖椒味"),
  dish("northeast-dumplings", "酸菜猪肉饺子", "northeast", "🥟", "late", ["main", "snack"], ["热乎的", "带汤的", "小份", "面食"], "可以按个数控制分量", "肉馅完全熟透"),

  dish("sweet-sour-carp", "糖醋鲤鱼", "shandong", "🐟", "late", ["main"], ["热乎的", "酸一点", "咸鲜"], "鲁菜里醒胃口的一道", "鱼肉完全熟透并留意鱼刺"),
  dish("four-joy-meatballs", "四喜丸子", "shandong", "🍖", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "软嫩肉香，适合配一点主食", "肉馅完全熟透"),
  dish("braised-prawns", "油焖大虾", "shandong", "🦐", "late", ["main"], ["热乎的", "咸鲜", "干香"], "鲜香带一点甜口", "虾完全熟透"),
  dish("dezhou-chicken", "德州扒鸡", "shandong", "🍗", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "软烂入味，方便分成小份", "鸡肉完全熟透"),
  dish("zaoliu-fish", "糟溜鱼片", "shandong", "🐟", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "鱼片软嫩、味道温和", "鱼肉完全熟透"),
  dish("spanish-mackerel-dumplings", "鲅鱼水饺", "shandong", "🥟", "late", ["main", "snack"], ["热乎的", "带汤的", "小份", "面食"], "胶东风味，可以少量开始", "鱼馅完全熟透"),
  dish("scallion-beef", "葱爆牛肉", "shandong", "🥩", "late", ["main"], ["热乎的", "干香", "咸鲜"], "葱香明确、下饭", "牛肉完全熟透"),
  dish("shandong-tofu", "锅塌豆腐", "shandong", "🍲", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "外香内软，没胃口时也好入口"),
  dish("shandong-mantou", "山东大馒头配炖菜", "shandong", "🍞", "late", ["breakfast", "main"], ["热乎的", "软糯", "清淡", "炖菜"], "主食和炖菜都很踏实"),

  dish("tomato-beef-hotpot", "番茄牛肉锅", "hotpot", "🍅", "late", ["main"], ["热乎的", "带汤的", "酸一点", "火锅"], "酸甜汤底，接受度通常更稳", "肉类、蛋类和海鲜全部涮熟"),
  dish("mushroom-chicken-hotpot", "菌菇鸡汤锅", "hotpot", "🍄", "late", ["main"], ["热乎的", "带汤的", "清淡", "火锅"], "想吃锅物但不想太刺激时", "鸡肉完全熟透，仅使用来源可靠的食用菌"),
  dish("beef-hotpot", "潮汕牛肉火锅", "hotpot", "🥩", "late", ["main"], ["热乎的", "清淡", "咸鲜", "火锅"], "牛肉和蔬菜都能按量涮", "牛肉不要追求生嫩，彻底涮熟"),
  dish("mandarin-duck-hotpot", "番茄麻辣鸳鸯锅", "hotpot", "🍲", "late", ["main"], ["热乎的", "带汤的", "香辣", "火锅"], "同桌可以各取所需", "所有食材使用公筷并彻底煮熟"),
  dish("coconut-chicken", "椰子鸡火锅", "hotpot", "🥥", "late", ["main"], ["热乎的", "带汤的", "清淡", "火锅"], "汤底清甜，鸡肉和蔬菜都好搭", "鸡肉完全熟透"),
  dish("lamb-spine-hotpot", "羊蝎子火锅", "hotpot", "🍖", "late", ["main"], ["热乎的", "带汤的", "咸鲜", "火锅"], "适合想吃浓郁羊肉香时", "羊肉完全熟透"),
  dish("beijing-lamb-hotpot", "清汤涮羊肉", "hotpot", "🥘", "late", ["main"], ["热乎的", "带汤的", "清淡", "火锅"], "清汤底，蘸料可以自己控制", "羊肉彻底涮熟"),
  dish("sauerkraut-hotpot", "酸菜白肉锅", "hotpot", "🥬", "late", ["main"], ["热乎的", "带汤的", "酸一点", "火锅"], "东北味的酸香锅物", "肉片完全熟透"),

  dish("tomato-eggs", "番茄炒蛋", "home", "🍅", "late", ["main"], ["热乎的", "酸一点", "软糯", "咸鲜"], "家常、熟悉、容易配饭", "鸡蛋完全熟透"),
  dish("potato-shreds", "青椒土豆丝", "home", "🥔", "late", ["main"], ["热乎的", "清爽的", "干香"], "想吃脆口蔬菜时很直接"),
  dish("cabbage-tofu", "白菜炖豆腐", "home", "🍲", "late", ["main"], ["热乎的", "带汤的", "软糯", "炖菜"], "清淡一点的热乎炖菜"),
  dish("cola-wings", "可乐鸡翅", "home", "🍗", "late", ["main"], ["热乎的", "干香", "咸鲜"], "甜咸熟悉味，适合配一点米饭", "鸡肉完全熟透"),
  dish("braised-pork", "红烧肉", "home", "🥩", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "想吃浓香下饭菜时选小份"),
  dish("corn-rib-soup", "玉米排骨汤", "home", "🌽", "late", ["main"], ["热乎的", "带汤的", "清淡", "炖菜"], "汤、玉米和排骨可以分开吃", "排骨完全熟透"),
  dish("steamed-seabass", "清蒸鲈鱼", "home", "🐟", "late", ["main"], ["热乎的", "清淡", "软糯"], "清蒸鲜味，不想吃重口时备用", "鱼肉完全熟透并留意鱼刺"),
  dish("minced-pork-egg", "肉末蒸蛋", "home", "🥚", "late", ["main", "snack"], ["热乎的", "软糯", "小份"], "软嫩、分量容易控制", "肉末和鸡蛋完全熟透"),
  dish("mapo-tofu", "麻婆豆腐", "home", "🌶️", "late", ["main"], ["热乎的", "软糯", "香辣"], "想吃辣又不想费力咀嚼时"),
  dish("kungpao-chicken", "宫保鸡丁", "home", "🍗", "late", ["main"], ["热乎的", "酸一点", "干香", "咸鲜"], "酸甜咸香都占一点", "鸡肉完全熟透"),
  dish("tomato-brisket", "番茄牛腩", "home", "🍅", "late", ["main"], ["热乎的", "带汤的", "酸一点", "炖菜"], "浓一点的番茄汤炖菜", "牛肉完全熟透"),
  dish("shrimp-eggs", "虾仁滑蛋", "home", "🦐", "late", ["main"], ["热乎的", "软糯", "咸鲜"], "软嫩鲜香、容易入口", "虾仁与鸡蛋完全熟透"),
  dish("garlic-broccoli", "蒜蓉西兰花", "home", "🥦", "late", ["main"], ["热乎的", "清爽的", "咸鲜"], "想加一道清爽热蔬菜时"),
  dish("winter-melon-meatballs", "冬瓜丸子汤", "home", "🥣", "late", ["main", "snack"], ["热乎的", "带汤的", "清淡", "小份"], "先喝汤，再决定要不要多吃", "肉丸完全熟透")
];

const extraHomeDishes = [
  homeDish("pepper-pork-shreds", "青椒肉丝", "🫑", ["热乎的", "干香", "咸鲜"], "脆嫩青椒配肉丝，很适合下主食", "meat"),
  homeDish("yuxiang-pork-shreds", "鱼香肉丝", "🥩", ["热乎的", "酸一点", "咸鲜"], "酸甜咸香比较醒胃口", "meat"),
  homeDish("mushu-pork", "木须肉", "🥚", ["热乎的", "软糯", "咸鲜"], "肉片、鸡蛋和木耳的一盘家常搭配", "meat"),
  homeDish("beijing-sauce-pork", "京酱肉丝", "🥩", ["热乎的", "干香", "咸鲜"], "酱香肉丝，适合卷饼或配馒头", "meat"),
  homeDish("farmhouse-pork", "农家小炒肉", "🌶️", ["热乎的", "干香", "香辣"], "想吃辣香下饭菜时选小份", "meat"),
  homeDish("twice-cooked-pork", "回锅肉", "🥩", ["热乎的", "干香", "香辣"], "味道浓郁，适合配清淡主食", "meat"),
  homeDish("garlic-sprout-pork", "蒜苗炒肉片", "🌿", ["热乎的", "干香", "咸鲜"], "蒜苗香和肉片很家常", "meat"),
  homeDish("lotus-root-pork", "莲藕炒肉片", "🪷", ["热乎的", "清爽的", "咸鲜"], "莲藕脆口，肉片增加满足感", "meat"),
  homeDish("celery-pork-shreds", "芹菜炒肉丝", "🌿", ["热乎的", "清爽的", "干香"], "芹菜清香，适合配饭或面", "meat"),
  homeDish("mustard-pork-shreds", "榨菜肉丝", "🥩", ["热乎的", "干香", "咸鲜"], "小份就很有味，适合配粥以外的主食", "meat"),
  homeDish("bamboo-pork", "冬笋炒肉片", "🎋", ["热乎的", "清爽的", "咸鲜"], "笋片脆嫩，口感不单调", "meat"),
  homeDish("mushroom-pork", "香菇炒肉片", "🍄", ["热乎的", "软糯", "咸鲜"], "香菇吸汁，味道温和", "meat"),
  homeDish("green-bean-mince", "豆角炒肉末", "🫛", ["热乎的", "干香", "咸鲜"], "肉末容易入口，豆角有嚼感", "meat"),
  homeDish("minced-pork-eggplant", "肉末茄子", "🍆", ["热乎的", "软糯", "咸鲜"], "茄子软、肉末香，很适合拌主食", "meat"),
  homeDish("minced-pork-long-beans", "肉末酸豆角", "🫛", ["热乎的", "酸一点", "干香"], "酸香肉末，少量就能带起胃口", "meat"),
  homeDish("braised-ribs", "红烧排骨", "🍖", ["热乎的", "软糯", "咸鲜"], "熟悉的红烧味，适合配米饭或馒头", "meat"),
  homeDish("sweet-sour-ribs", "糖醋排骨", "🍖", ["热乎的", "酸一点", "干香"], "酸甜口比较提胃口", "meat"),
  homeDish("potato-ribs", "土豆烧排骨", "🥔", ["热乎的", "软糯", "炖菜"], "土豆吸汁，能和排骨一起慢慢吃", "meat"),
  homeDish("black-bean-steamed-ribs", "豆豉蒸排骨", "🍖", ["热乎的", "软糯", "咸鲜"], "蒸出来较软嫩，适合配主食", "meat"),
  homeDish("meicai-pork", "梅菜扣肉", "🥩", ["热乎的", "软糯", "咸鲜"], "浓香型家常菜，建议先来小份", "meat"),
  homeDish("garlic-pork-belly", "蒜片炒五花肉", "🧄", ["热乎的", "干香", "咸鲜"], "蒜香明显，配大馒头也合适", "meat"),
  homeDish("cabbage-pork-rolls", "白菜肉卷", "🥬", ["热乎的", "软糯", "清淡"], "白菜包肉馅，口感软嫩", "meat"),
  homeDish("steamed-pork-rice-flour", "粉蒸肉", "🥩", ["热乎的", "软糯", "咸鲜"], "粉糯肉香，适合分成小块", "meat"),
  homeDish("braised-beef-slices", "家常卤牛肉", "🥩", ["干香", "有嚼劲", "咸鲜"], "切几片配面条、米饭或馒头", "meat"),
  homeDish("potato-beef-stew", "土豆炖牛肉", "🥔", ["热乎的", "带汤的", "软糯", "炖菜"], "土豆和牛肉都炖软，配什么主食都稳", "meat"),
  homeDish("pepper-beef-shreds", "青椒牛肉丝", "🫑", ["热乎的", "干香", "咸鲜"], "青椒脆、牛肉香，适合配饭", "meat"),
  homeDish("celery-beef", "芹菜炒牛肉", "🌿", ["热乎的", "清爽的", "干香"], "芹菜清香，牛肉增加饱足感", "meat"),
  homeDish("black-pepper-beef", "黑椒牛柳", "🥩", ["热乎的", "干香", "咸鲜"], "黑椒香明确但不必做得太辣", "meat"),
  homeDish("onion-beef", "洋葱炒牛肉", "🧅", ["热乎的", "软糯", "咸鲜"], "洋葱甜香，牛肉适合配面或饭", "meat"),
  homeDish("radish-brisket", "萝卜炖牛腩", "🥕", ["热乎的", "带汤的", "软糯", "炖菜"], "萝卜吸汤，牛腩炖软更好入口", "meat"),
  homeDish("scallion-lamb", "葱爆羊肉", "🍖", ["热乎的", "干香", "咸鲜"], "葱香和羊肉香都很直接", "meat"),
  homeDish("red-braised-lamb", "红焖羊肉", "🍖", ["热乎的", "带汤的", "软糯", "炖菜"], "浓香羊肉炖菜，适合配馒头", "meat"),
  homeDish("carrot-lamb-stew", "胡萝卜炖羊肉", "🥕", ["热乎的", "带汤的", "软糯", "炖菜"], "胡萝卜甜、羊肉香，适合慢慢吃", "meat"),
  homeDish("yellow-braised-chicken", "黄焖鸡", "🍗", ["热乎的", "带汤的", "咸鲜", "炖菜"], "汤汁适合拌饭、面条或拉条子", "poultry"),
  homeDish("mushroom-steamed-chicken", "香菇蒸鸡", "🍄", ["热乎的", "软糯", "咸鲜"], "蒸鸡软嫩，香菇吸汁", "poultry"),
  homeDish("potato-braised-chicken", "土豆烧鸡", "🥔", ["热乎的", "软糯", "炖菜"], "土豆和鸡肉是一顿很完整的家常菜", "poultry"),
  homeDish("chestnut-chicken", "栗子烧鸡", "🌰", ["热乎的", "软糯", "咸鲜"], "栗子粉糯，鸡肉咸香", "poultry"),
  homeDish("three-cup-chicken", "家常三杯鸡", "🍗", ["热乎的", "干香", "咸鲜"], "酱香比较浓，适合配米饭", "poultry"),
  homeDish("spicy-chicken-cubes", "辣子鸡丁", "🌶️", ["热乎的", "干香", "香辣"], "想吃辣香脆口时少量配主食", "poultry"),
  homeDish("soy-sauce-chicken", "酱油鸡", "🍗", ["热乎的", "软糯", "咸鲜"], "酱香温和，鸡肉可以拆成小块", "poultry"),
  homeDish("scallion-oil-chicken", "葱油鸡", "🌿", ["热乎的", "软糯", "咸鲜"], "葱油香但口感不硬", "poultry"),
  homeDish("braised-chicken-wings", "红烧鸡翅", "🍗", ["热乎的", "软糯", "咸鲜"], "红烧味熟悉，适合配主食", "poultry"),
  homeDish("teriyaki-chicken-leg", "照烧鸡腿", "🍗", ["热乎的", "软糯", "咸鲜"], "甜咸鸡腿肉，适合盖饭或配面", "poultry"),
  homeDish("potato-duck", "土豆焖鸭", "🥔", ["热乎的", "带汤的", "软糯", "炖菜"], "土豆吸鸭肉汤汁，适合配馒头", "poultry"),
  homeDish("radish-duck", "萝卜烧鸭", "🥕", ["热乎的", "带汤的", "软糯", "炖菜"], "萝卜解腻，鸭肉炖软", "poultry"),
  homeDish("lotus-root-duck", "莲藕焖鸭", "🪷", ["热乎的", "带汤的", "软糯", "炖菜"], "莲藕和鸭肉都是耐吃的炖菜", "poultry"),
  homeDish("cordyceps-chicken", "虫草花蒸鸡", "🍄", ["热乎的", "软糯", "清淡"], "蒸制口感软嫩，味道相对温和", "poultry"),
  homeDish("yam-meat-patty", "山药蒸肉饼", "🍖", ["热乎的", "软糯", "清淡"], "山药和肉饼都软，适合小份开始", "meat"),
  homeDish("pearl-meatballs", "珍珠糯米丸子", "🍡", ["热乎的", "软糯", "小份"], "一颗一颗控制分量很方便", "meat"),
  homeDish("mushroom-stuffed-meat", "香菇酿肉", "🍄", ["热乎的", "软糯", "咸鲜"], "香菇和肉馅一口一个", "meat"),

  homeDish("braised-hairtail", "红烧带鱼", "🐟", ["热乎的", "咸鲜", "软糯"], "红烧鱼味道熟悉，适合配米饭", "seafood"),
  homeDish("pan-fried-hairtail", "香煎带鱼", "🐟", ["热乎的", "干香", "咸鲜"], "外香内嫩，适合配馒头或饭", "seafood"),
  homeDish("steamed-cod", "清蒸鳕鱼", "🐟", ["热乎的", "清淡", "软糯"], "鱼肉细嫩，不想吃重口时备用", "seafood"),
  homeDish("tomato-fish-slices", "番茄鱼片", "🍅", ["热乎的", "带汤的", "酸一点"], "番茄汤底醒胃，鱼片软嫩", "seafood"),
  homeDish("tofu-fish-stew", "豆腐炖鱼", "🐟", ["热乎的", "带汤的", "软糯", "炖菜"], "鱼和豆腐都适合配米饭或馒头", "seafood"),
  homeDish("sauerkraut-fish", "家常酸菜鱼", "🐟", ["热乎的", "带汤的", "酸一点", "香辣"], "酸香鱼片，辣度可以降低", "seafood"),
  homeDish("boiled-fish-slices", "家常水煮鱼片", "🌶️", ["热乎的", "带汤的", "香辣"], "想吃麻辣时做成小份", "seafood"),
  homeDish("garlic-vermicelli-shrimp", "蒜蓉粉丝蒸虾", "🦐", ["热乎的", "软糯", "咸鲜"], "蒜香、粉丝和虾可以一起夹", "seafood"),
  homeDish("plain-boiled-shrimp", "白灼虾", "🦐", ["热乎的", "清淡", "有嚼劲"], "味道清爽，蘸料可以自己控制", "seafood"),
  homeDish("tomato-shrimp", "番茄虾仁", "🍅", ["热乎的", "酸一点", "软糯"], "番茄酸甜配虾仁，适合拌饭", "seafood"),
  homeDish("broccoli-shrimp", "西兰花炒虾仁", "🥦", ["热乎的", "清爽的", "咸鲜"], "蔬菜和虾仁都在一盘", "seafood"),
  homeDish("shrimp-tofu", "虾仁烧豆腐", "🦐", ["热乎的", "软糯", "咸鲜"], "豆腐软、虾仁鲜，适合配主食", "seafood"),
  homeDish("steamed-scallops", "蒜蓉蒸扇贝", "🐚", ["热乎的", "软糯", "咸鲜"], "蒜香贝肉，一次先吃少量", "seafood"),
  homeDish("clam-steamed-egg", "蛤蜊蒸蛋", "🥚", ["热乎的", "软糯", "咸鲜"], "蒸蛋和蛤蜊都很软嫩", "seafood"),
  homeDish("pan-fried-salmon", "全熟香煎三文鱼", "🐟", ["热乎的", "干香", "软糯"], "煎到全熟后配米饭或面条", "seafood"),

  homeDish("chive-eggs", "韭菜炒鸡蛋", "🥚", ["热乎的", "干香", "咸鲜"], "韭菜香和鸡蛋很下主食", "egg"),
  homeDish("pepper-eggs", "青椒炒鸡蛋", "🫑", ["热乎的", "干香", "咸鲜"], "快手家常菜，适合配馒头", "egg"),
  homeDish("wood-ear-eggs", "木耳炒鸡蛋", "🥚", ["热乎的", "软糯", "咸鲜"], "木耳脆、鸡蛋软，口感有变化", "egg"),
  homeDish("cucumber-eggs", "黄瓜炒鸡蛋", "🥒", ["热乎的", "清爽的", "软糯"], "口味清爽，适合配饭或面", "egg"),
  homeDish("dried-shrimp-steamed-egg", "虾皮蒸蛋", "🥚", ["热乎的", "软糯", "小份"], "蒸蛋柔软，虾皮提供一点鲜味", "egg"),
  homeDish("home-style-tofu", "家常豆腐", "🍲", ["热乎的", "软糯", "咸鲜"], "酱汁豆腐配米饭很稳"),
  homeDish("pan-fried-tofu", "香煎豆腐", "🍳", ["热乎的", "干香", "软糯"], "外香内软，可以配面条或馒头"),
  homeDish("braised-tofu", "红烧豆腐", "🍲", ["热乎的", "软糯", "咸鲜"], "红烧汁适合拌主食"),
  homeDish("mushroom-tofu", "蘑菇烧豆腐", "🍄", ["热乎的", "软糯", "清淡"], "蘑菇和豆腐口感都温和"),
  homeDish("minced-pork-tofu", "肉末烧豆腐", "🍲", ["热乎的", "软糯", "咸鲜"], "不做麻辣版也很下饭", "meat"),
  homeDish("tomato-tofu", "番茄烧豆腐", "🍅", ["热乎的", "酸一点", "软糯"], "番茄汁裹豆腐，适合配饭"),
  homeDish("chive-tofu-pockets", "韭菜豆腐盒", "🥟", ["热乎的", "干香", "软糯"], "外皮香、内馅软，适合一两个开始"),
  homeDish("tofu-steamed-egg", "豆腐蒸蛋", "🥚", ["热乎的", "软糯", "清淡"], "豆腐和蒸蛋都是软口", "egg"),
  homeDish("yuba-wood-ear", "腐竹炒木耳", "🥢", ["热乎的", "有嚼劲", "咸鲜"], "腐竹吸汁、木耳脆口"),
  homeDish("celery-yuba", "西芹炒腐竹", "🌿", ["热乎的", "清爽的", "有嚼劲"], "西芹和腐竹适合配清淡主食"),

  homeDish("hand-torn-cabbage", "手撕包菜", "🥬", ["热乎的", "干香", "咸鲜"], "脆口包菜，适合配饭或泡面"),
  homeDish("vinegar-cabbage", "醋溜白菜", "🥬", ["热乎的", "酸一点", "清爽的"], "酸香白菜，胃口弱时有存在感"),
  homeDish("cabbage-wood-ear", "白菜炒木耳", "🥬", ["热乎的", "清爽的", "咸鲜"], "白菜软、木耳脆，口感不单一"),
  homeDish("stir-fried-bok-choy", "清炒上海青", "🥬", ["热乎的", "清爽的", "清淡"], "给主食配一盘热青菜"),
  homeDish("garlic-lettuce", "蒜蓉生菜", "🥬", ["热乎的", "清爽的", "咸鲜"], "蒜香但不厚重，适合配面"),
  homeDish("oyster-sauce-choy-sum", "蚝油菜心", "🥬", ["热乎的", "清爽的", "咸鲜"], "菜心清脆，调味可以少一点"),
  homeDish("stir-fried-youmai", "清炒油麦菜", "🥬", ["热乎的", "清爽的", "清淡"], "简单热蔬菜，适合搭浓味主食"),
  homeDish("stir-fried-small-cabbage", "清炒小白菜", "🥬", ["热乎的", "清爽的", "清淡"], "一盘轻口蔬菜作为配菜"),
  homeDish("dry-fried-green-beans", "干煸豆角", "🫛", ["热乎的", "干香", "咸鲜"], "豆角干香，适合配米饭", ""),
  homeDish("garlic-green-beans", "蒜蓉四季豆", "🫛", ["热乎的", "干香", "咸鲜"], "蒜香四季豆，口感有嚼劲"),
  homeDish("tomato-braised-eggplant", "番茄烧茄子", "🍆", ["热乎的", "酸一点", "软糯"], "番茄酸甜、茄子软，适合拌饭"),
  homeDish("garlic-eggplant", "蒜蓉茄子", "🍆", ["热乎的", "软糯", "咸鲜"], "茄子软嫩，蒜香带胃口"),
  homeDish("sour-spicy-lotus-root", "酸辣藕丁", "🪷", ["热乎的", "酸一点", "香辣"], "藕丁脆、酸辣醒口"),
  homeDish("lotus-pond-stir-fry", "荷塘小炒", "🪷", ["热乎的", "清爽的", "清淡"], "莲藕、木耳和时蔬的清爽组合"),
  homeDish("yam-wood-ear", "山药炒木耳", "🍄", ["热乎的", "清爽的", "软糯"], "山药软脆、木耳有嚼感"),
  homeDish("carrot-broccoli", "胡萝卜炒西兰花", "🥦", ["热乎的", "清爽的", "清淡"], "颜色丰富的一盘热蔬菜"),
  homeDish("mushroom-greens", "香菇炒青菜", "🍄", ["热乎的", "清爽的", "咸鲜"], "香菇和青菜很适合作为配菜"),
  homeDish("pepper-king-oyster-mushroom", "青椒炒杏鲍菇", "🍄", ["热乎的", "干香", "有嚼劲"], "杏鲍菇有嚼感，青椒添清香"),
  homeDish("stir-fried-luffa", "清炒丝瓜", "🥒", ["热乎的", "软糯", "清淡"], "丝瓜软嫩、汁水足"),
  homeDish("luffa-edamame", "丝瓜烧毛豆", "🫛", ["热乎的", "软糯", "清淡"], "丝瓜和毛豆组成一盘轻口家常菜")
];

foodItems.push(...extraHomeDishes);

const restaurantItems = [
  { id: "xinjiang-home", name: "新疆家常菜馆", icon: "🍗", cuisine: "新疆菜", image: "xinjiang", area: "优先看大盘鸡、抓饭、馕包肉", tags: ["大盘鸡", "抓饭", "馕包肉"], modes: ["delivery", "dineout"] },
  { id: "xinjiang-noodle-shop", name: "新疆面馆", icon: "🍜", cuisine: "新疆菜", image: "xinjiang", area: "优先看拉条子和揪片子", tags: ["拉条子", "揪片子", "丁丁炒面"], modes: ["delivery", "dineout"] },
  { id: "xinjiang-grill", name: "新疆烧烤 / 清真菜馆", icon: "🍢", cuisine: "新疆菜", image: "xinjiang", area: "优先看羊肉串和烤包子", tags: ["羊肉串", "烤包子", "手抓肉"], modes: ["delivery", "dineout"] },
  { id: "northwest-noodle-shop", name: "陕西面馆", icon: "🍜", cuisine: "西北菜", image: "northwest", area: "优先看油泼面和臊子面", tags: ["油泼面", "臊子面", "Biangbiang 面"], modes: ["delivery", "dineout"] },
  { id: "paomo-shop", name: "羊肉泡馍馆", icon: "🥣", cuisine: "西北菜", image: "northwest", area: "适合想吃热汤和馍", tags: ["羊肉泡馍", "肉夹馍", "凉皮"], modes: ["delivery", "dineout"] },
  { id: "northwest-home", name: "西北家常菜馆", icon: "🍖", cuisine: "西北菜", image: "northwest", area: "优先看烩菜和手抓羊肉", tags: ["西北烩菜", "手抓羊肉", "洋芋擦擦"], modes: ["delivery", "dineout"] },
  { id: "iron-pot-stew", name: "东北铁锅炖", icon: "🍲", cuisine: "东北菜", image: "northeast", area: "适合两个人一起分着吃", tags: ["小鸡炖蘑菇", "排骨炖豆角", "贴饼子"], modes: ["delivery", "dineout"] },
  { id: "northeast-home", name: "东北家常菜馆", icon: "🥩", cuisine: "东北菜", image: "northeast", area: "优先看锅包肉和炖菜", tags: ["锅包肉", "地三鲜", "猪肉炖粉条"], modes: ["delivery", "dineout"] },
  { id: "northeast-dumpling-shop", name: "东北饺子馆", icon: "🥟", cuisine: "东北菜", image: "northeast", area: "可按个数控制分量", tags: ["酸菜猪肉", "白菜猪肉", "蘸酱菜"], modes: ["delivery", "dineout"] },
  { id: "classic-shandong", name: "传统鲁菜馆", icon: "🐟", cuisine: "鲁菜", image: "shandong", area: "优先看糖醋鱼和四喜丸子", tags: ["糖醋鲤鱼", "四喜丸子", "锅塌豆腐"], modes: ["delivery", "dineout"] },
  { id: "jiaodong-home", name: "胶东家常菜馆", icon: "🦐", cuisine: "鲁菜", image: "shandong", area: "偏鱼虾和胶东风味", tags: ["油焖大虾", "糟溜鱼片", "鲅鱼水饺"], modes: ["delivery", "dineout"] },
  { id: "shandong-staples", name: "山东面食小馆", icon: "🍞", cuisine: "鲁菜", image: "shandong", area: "馒头、水饺配热菜", tags: ["山东馒头", "鲅鱼水饺", "炖菜"], modes: ["delivery", "dineout"] },
  { id: "gentle-hotpot", name: "番茄 / 菌汤火锅", icon: "🍅", cuisine: "火锅", image: "hotpot", area: "口味相对温和", tags: ["番茄锅", "菌汤锅", "蔬菜"], modes: ["delivery", "dineout"] },
  { id: "beef-hotpot-place", name: "潮汕牛肉火锅", icon: "🥩", cuisine: "火锅", image: "hotpot", area: "牛肉和蔬菜按量涮", tags: ["牛肉", "牛肉丸", "粿条"], modes: ["delivery", "dineout"] },
  { id: "lamb-hotpot-place", name: "涮羊肉 / 羊蝎子", icon: "🍖", cuisine: "火锅", image: "hotpot", area: "想吃羊肉香时选", tags: ["清汤涮羊肉", "羊蝎子", "烧饼"], modes: ["delivery", "dineout"] },
  { id: "home-restaurant", name: "家常菜馆", icon: "🍚", cuisine: "家常菜", image: "home", area: "两菜一汤也容易搭", tags: ["番茄炒蛋", "红烧肉", "时蔬"], modes: ["delivery", "dineout"] },
  { id: "soup-restaurant", name: "炖汤小馆", icon: "🥣", cuisine: "家常菜", image: "home", area: "适合没胃口先喝一点", tags: ["玉米排骨汤", "冬瓜丸子汤", "炖菜"], modes: ["delivery", "dineout"] },
  { id: "quick-home-meal", name: "小炒 / 盖饭店", icon: "🍛", cuisine: "家常菜", image: "home", area: "适合只想点一份主食", tags: ["宫保鸡丁", "番茄牛腩", "麻婆豆腐"], modes: ["delivery", "dineout"] }
];

const defaultState = () => ({
  history: [],
  cooldowns: {
    "turkey-noodles": Date.now() + 21 * DAY
  }
});

let state = loadState();
let selectedMeal = detectMeal();
let selectedStaple = "random";
let selectedFoodTags = new Set();
let selectedFoodCategories = new Set();
let selectedRestaurantMode = "delivery";
let selectedCuisine = new Set();
let foodSessionSkips = new Set();
let restaurantSessionSkips = new Set();
let currentFoodResults = [];
let currentRestaurantResults = [];
let recommendationRound = 0;
let toastTimer;

const refs = {
  layers: document.querySelectorAll("[data-layer]"),
  layerButtons: document.querySelectorAll("[data-layer-button]"),
  mealButtons: document.querySelectorAll("[data-meal]"),
  stapleButtons: document.querySelectorAll("[data-staple]"),
  stapleField: document.querySelector("[data-staple-field]"),
  foodTagButtons: document.querySelectorAll("[data-tag]"),
  foodCategoryButtons: document.querySelectorAll("[data-food-category]"),
  cuisineButtons: document.querySelectorAll("[data-cuisine]"),
  restaurantModeButtons: document.querySelectorAll("[data-mode]"),
  foodResults: document.querySelector("[data-food-results]"),
  foodList: document.querySelector("[data-food-list]"),
  foodDecision: document.querySelector("[data-food-decision]"),
  restaurantResults: document.querySelector("[data-restaurant-results]"),
  restaurantList: document.querySelector("[data-restaurant-list]"),
  restaurantTitle: document.querySelector("[data-restaurant-title]"),
  historySection: document.querySelector("[data-history-section]"),
  historyList: document.querySelector("[data-history-list]"),
  historyCount: document.querySelector("[data-history-count]"),
  restoreCooldowns: document.querySelector("[data-restore-cooldowns]"),
  toast: document.querySelector("[data-toast]"),
  installTip: document.querySelector("[data-install-tip]")
};

initialize();

function initialize() {
  saveState();
  document.querySelector("[data-food-count]").textContent = foodItems.length;
  updateGreeting();
  syncMealButtons();
  syncStapleButtons();
  bindEvents();
  renderHistory();
  showInstallTipIfNeeded();
  registerServiceWorker();
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || !Array.isArray(parsed.history) || typeof parsed.cooldowns !== "object") {
      return defaultState();
    }
    return parsed;
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function detectMeal() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "breakfast";
  if (hour >= 14 && hour < 17) return "snack";
  return "main";
}

function updateGreeting() {
  const hour = new Date().getHours();
  const text = hour < 11 ? "今天早上" : hour < 17 ? "今天下午" : "今晚";
  document.querySelector("[data-greeting]").textContent = text;
}

function bindEvents() {
  refs.layerButtons.forEach((button) => {
    button.addEventListener("click", () => switchLayer(button.dataset.layerButton));
  });

  refs.mealButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedMeal = button.dataset.meal;
      syncMealButtons();
    });
  });

  refs.stapleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedStaple = button.dataset.staple;
      syncStapleButtons();
    });
  });

  refs.foodTagButtons.forEach((button) => {
    button.addEventListener("click", () => toggleSetButton(button, selectedFoodTags, button.dataset.tag));
  });

  refs.foodCategoryButtons.forEach((button) => {
    button.addEventListener("click", () => toggleSetButton(button, selectedFoodCategories, button.dataset.foodCategory));
  });

  refs.cuisineButtons.forEach((button) => {
    button.addEventListener("click", () => toggleSetButton(button, selectedCuisine, button.dataset.cuisine));
  });

  refs.restaurantModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedRestaurantMode = button.dataset.mode;
      refs.restaurantModeButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  document.querySelector("[data-recommend-food]").addEventListener("click", () => showFoodResults(true));
  document.querySelector("[data-swap-food]").addEventListener("click", () => showFoodResults(false));
  document.querySelector("[data-pick-again]").addEventListener("click", () => {
    refs.foodDecision.hidden = true;
    refs.foodResults.hidden = false;
    refs.foodResults.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelector("[data-recommend-restaurant]").addEventListener("click", () => showRestaurantResults(true));
  document.querySelector("[data-swap-restaurant]").addEventListener("click", () => showRestaurantResults(false));

  refs.foodList.addEventListener("click", handleFoodAction);
  refs.restaurantList.addEventListener("click", handleRestaurantAction);

  refs.restoreCooldowns.addEventListener("click", () => {
    state.cooldowns = {};
    saveState();
    renderHistory();
    showToast("已经恢复全部冷却食物；火鸡面也会重新参与推荐。");
  });

  document.querySelector("[data-dismiss-install]").addEventListener("click", () => {
    localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
    refs.installTip.hidden = true;
  });
}

function switchLayer(layerName) {
  refs.layerButtons.forEach((button) => {
    const active = button.dataset.layerButton === layerName;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  refs.layers.forEach((layer) => {
    const active = layer.dataset.layer === layerName;
    layer.classList.toggle("is-active", active);
    layer.hidden = !active;
  });
}

function syncMealButtons() {
  refs.mealButtons.forEach((button) => {
    const selected = button.dataset.meal === selectedMeal;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  refs.stapleField.hidden = selectedMeal === "breakfast";
}

function syncStapleButtons() {
  refs.stapleButtons.forEach((button) => {
    const selected = button.dataset.staple === selectedStaple;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function toggleSetButton(button, set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
  const selected = set.has(value);
  button.classList.toggle("is-selected", selected);
  button.setAttribute("aria-pressed", String(selected));
}

function showFoodResults(resetSkips) {
  if (resetSkips) foodSessionSkips = new Set();
  recommendationRound += 1;
  currentFoodResults = rankFoods();
  renderFoodCards(currentFoodResults);
  refs.foodDecision.hidden = true;
  refs.foodResults.hidden = false;
  refs.foodResults.scrollIntoView({ behavior: "smooth", block: "start" });
}

function rankFoods() {
  const now = Date.now();
  const scored = foodItems
    .filter((item) => !foodSessionSkips.has(item.id))
    .filter((item) => !state.cooldowns[item.id] || state.cooldowns[item.id] <= now)
    .filter((item) => selectedFoodCategories.size === 0 || selectedFoodCategories.has(item.category))
    .map((item) => ({ item, score: scoreFood(item, now) }))
    .sort((a, b) => b.score - a.score);

  const results = [];
  for (const entry of scored) {
    if (results.length === 3) break;
    const sameFamily = results.some((item) => foodFamily(item) === foodFamily(entry.item));
    if (sameFamily && scored.length > 5 && results.length < 2) continue;
    results.push(entry.item);
  }

  if (results.length < 3) {
    scored.forEach(({ item }) => {
      if (results.length < 3 && !results.some((result) => result.id === item.id)) results.push(item);
    });
  }
  return results;
}

function scoreFood(item, now) {
  const stageScores = { late: 12, all: 10, mid: 5, early: 3, burst: -12 };
  let score = stageScores[item.stage] ?? 0;
  score += item.meals.includes(selectedMeal) ? 10 : -7;

  selectedFoodTags.forEach((tag) => {
    score += item.tags.includes(tag) ? 5 : -1;
  });

  if (selectedFoodCategories.has(item.category)) score += 12;

  if (selectedMeal === "breakfast" && item.stage === "all") score += 4;
  if (selectedMeal === "main" && item.stage === "late") score += 3;

  const pickedTimes = state.history
    .filter((entry) => entry.id === item.id && entry.action === "picked")
    .map((entry) => entry.time)
    .sort((a, b) => b - a);

  if (pickedTimes[0]) {
    const age = now - pickedTimes[0];
    if (age < 2 * DAY) score -= 18;
    else if (age < 7 * DAY) score -= 9;
    else if (age < 14 * DAY) score -= 3;
  }

  return score + Math.random() * 3;
}

function foodFamily(item) {
  if (selectedFoodCategories.size > 0) {
    if (item.tags.includes("面食")) return "noodles";
    if (item.tags.includes("火锅")) return "hotpot";
    return item.id;
  }
  if (item.meals.includes("breakfast") && item.stage === "all") return "breakfast";
  return item.category;
}

function renderFoodCards(items) {
  refs.foodList.innerHTML = items.map((item) => {
    const staple = suggestStaple(item);
    return `
    <article class="recommendation-card" data-food-id="${item.id}" data-staple="${staple}">
      ${renderFoodPhoto(item)}
      <div class="card-top">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <p class="card-reason">${escapeHtml(item.note)}</p>
        </div>
        <span class="food-icon" aria-hidden="true">${item.icon}</span>
      </div>
      <p class="card-tags">${item.tags.slice(0, 4).map(escapeHtml).join(" · ")}</p>
      ${staple ? `<p class="staple-note"><span>主食搭配</span><strong>${staple}</strong></p>` : ""}
      ${item.safety ? `<p class="safety-note">注意：${escapeHtml(item.safety)}</p>` : ""}
      <div class="card-actions">
        <button type="button" class="pick-button" data-action="pick">就吃这个</button>
        <button type="button" class="tired-button" data-action="tired">吃腻了</button>
        <button type="button" class="skip-button" data-action="skip">今天不想</button>
      </div>
    </article>
  `;
  }).join("");
}

function suggestStaple(item) {
  if (selectedMeal === "breakfast" || item.category !== "home") return "";
  if (/面|粥|馒头|饭|吐司|贝果|酸奶|牛奶|燕麦/.test(item.name)) return "";
  if (selectedStaple !== "random") return selectedStaple;

  const seed = `${item.id}-${recommendationRound}`
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  return STAPLE_OPTIONS[seed % STAPLE_OPTIONS.length];
}

function handleFoodAction(event) {
  const button = event.target.closest("button[data-action]");
  const card = event.target.closest("[data-food-id]");
  if (!button || !card) return;
  const item = foodItems.find((candidate) => candidate.id === card.dataset.foodId);
  if (!item) return;

  if (button.dataset.action === "pick") {
    addHistory(item, "picked", "food");
    const decisionPhoto = document.querySelector("[data-decision-photo]");
    decisionPhoto.className = "dish-photo decision-photo dish-photo--food";
    decisionPhoto.style.backgroundImage = `url("${dishImagePath(item)}")`;
    decisionPhoto.innerHTML = `<span>${escapeHtml(item.name)}</span>`;
    decisionPhoto.setAttribute("aria-label", `${item.name}图片`);
    document.querySelector("[data-decision-name]").textContent = item.name;
    const decisionDetails = item.tags.slice(0, 4);
    if (card.dataset.staple) decisionDetails.push(`配${card.dataset.staple}`);
    document.querySelector("[data-decision-meta]").textContent = decisionDetails.join(" · ");
    refs.foodResults.hidden = true;
    refs.foodDecision.hidden = false;
    refs.foodDecision.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`记下了：${item.name}`);
    return;
  }

  card.classList.add("is-leaving");
  foodSessionSkips.add(item.id);
  if (button.dataset.action === "tired") {
    state.cooldowns[item.id] = Date.now() + 7 * DAY;
    addHistory(item, "tired", "food");
    showToast(`${item.name} 已冷却 7 天`);
  }

  window.setTimeout(() => {
    currentFoodResults = rankFoods();
    renderFoodCards(currentFoodResults);
  }, 150);
}

function showRestaurantResults(resetSkips) {
  if (resetSkips) restaurantSessionSkips = new Set();
  currentRestaurantResults = rankRestaurants();
  renderRestaurantCards(currentRestaurantResults);
  refs.restaurantTitle.textContent = selectedRestaurantMode === "delivery" ? "外卖先找这三类" : "出去吃先看这三类";
  refs.restaurantResults.hidden = false;
  refs.restaurantResults.scrollIntoView({ behavior: "smooth", block: "start" });
}

function rankRestaurants() {
  const now = Date.now();
  return restaurantItems
    .filter((item) => item.modes.includes(selectedRestaurantMode))
    .filter((item) => !restaurantSessionSkips.has(item.id))
    .filter((item) => !state.cooldowns[item.id] || state.cooldowns[item.id] <= now)
    .map((item) => {
      let score = 10;
      if (selectedCuisine.has(item.cuisine)) score += 20;
      const recent = state.history.find((entry) => entry.id === item.id && entry.action === "picked" && now - entry.time < 7 * DAY);
      if (recent) score -= 8;
      return { item, score: score + Math.random() * 3 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.item);
}

function renderRestaurantCards(items) {
  refs.restaurantList.innerHTML = items.map((item) => `
    <article class="recommendation-card" data-restaurant-id="${item.id}">
      ${renderDishPhoto(item.image)}
      <div class="card-top">
        <div>
          <h4>${escapeHtml(item.name)}</h4>
          <p class="restaurant-address">${escapeHtml(item.area)} · ${escapeHtml(item.cuisine)}</p>
        </div>
        <span class="food-icon" aria-hidden="true">${item.icon}</span>
      </div>
      <p class="card-tags">${item.tags.map(escapeHtml).join(" · ")}</p>
      <div class="card-actions">
        <button type="button" class="pick-button" data-restaurant-action="pick">${selectedRestaurantMode === "delivery" ? "就找这类" : "就吃这类"}</button>
        <button type="button" class="tired-button" data-restaurant-action="tired">吃腻了</button>
        <button type="button" class="skip-button" data-restaurant-action="skip">今天不想</button>
      </div>
    </article>
  `).join("");
}

function renderDishPhoto(category) {
  return `
    <div class="dish-photo dish-photo--${category}" role="img" aria-label="${CATEGORY_LABELS[category]}代表菜图片">
      <span>${CATEGORY_LABELS[category]}</span>
    </div>
  `;
}

function renderFoodPhoto(item) {
  return `
    <div class="dish-photo dish-photo--food" role="img" aria-label="${escapeHtml(item.name)}图片" style="background-image: url('${dishImagePath(item)}')">
      <span>${escapeHtml(item.name)}</span>
    </div>
  `;
}

function dishImagePath(item) {
  return `assets/dishes/${item.id}.webp`;
}

function handleRestaurantAction(event) {
  const button = event.target.closest("button[data-restaurant-action]");
  const card = event.target.closest("[data-restaurant-id]");
  if (!button || !card) return;
  const item = restaurantItems.find((candidate) => candidate.id === card.dataset.restaurantId);
  if (!item) return;

  if (button.dataset.restaurantAction === "pick") {
    addHistory(item, "picked", "restaurant");
    showToast(`记下了：${item.name}`);
    return;
  }

  card.classList.add("is-leaving");
  restaurantSessionSkips.add(item.id);
  if (button.dataset.restaurantAction === "tired") {
    state.cooldowns[item.id] = Date.now() + 7 * DAY;
    addHistory(item, "tired", "restaurant");
    showToast(`${item.name} 已冷却 7 天`);
  }

  window.setTimeout(() => {
    currentRestaurantResults = rankRestaurants();
    renderRestaurantCards(currentRestaurantResults);
  }, 150);
}

function addHistory(item, action, type) {
  state.history.unshift({
    id: item.id,
    name: item.name,
    action,
    type,
    time: Date.now()
  });
  state.history = state.history.slice(0, 40);
  saveState();
  renderHistory();
}

function renderHistory() {
  const entries = state.history.slice(0, 8);
  const activeCooldowns = Object.values(state.cooldowns).filter((until) => until > Date.now()).length;
  refs.historySection.hidden = entries.length === 0 && activeCooldowns === 0;
  refs.historyCount.textContent = `${state.history.length} 条记录`;
  refs.restoreCooldowns.hidden = activeCooldowns === 0;

  refs.historyList.innerHTML = entries.map((entry) => {
    const actionText = entry.action === "picked" ? "选了" : "吃腻 · 冷却7天";
    return `
      <div class="history-row">
        <span>${escapeHtml(entry.name)}</span>
        <span>${actionText}<br>${formatRelativeTime(entry.time)}</span>
      </div>
    `;
  }).join("");
}

function formatRelativeTime(time) {
  const age = Date.now() - time;
  if (age < 60 * 1000) return "刚刚";
  if (age < 60 * 60 * 1000) return `${Math.floor(age / (60 * 1000))}分钟前`;
  if (age < DAY) return `${Math.floor(age / (60 * 60 * 1000))}小时前`;
  return `${Math.floor(age / DAY)}天前`;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  refs.toast.textContent = message;
  refs.toast.hidden = false;
  toastTimer = window.setTimeout(() => {
    refs.toast.hidden = true;
  }, 3200);
}

function showInstallTipIfNeeded() {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY) === "1";
  refs.installTip.hidden = !(isIOS && !isStandalone && !dismissed);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
