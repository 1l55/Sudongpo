/**
 * 剧情数据 — 苏东坡人生 RPG
 * 覆盖6个人生阶段，17个场景，每场景2-3个选择
 */

const storyData = {
  // ==================== 幼年阶段 (1037-1050) ====================
  childhood_1: {
    id: 'childhood_1',
    stage: '幼年',
    stageIndex: 0,
    title: '眉山降世',
    year: '景祐三年（1037年）',
    age: '初生',
    narrative: `蜀地眉山，青山环绕，岷江水碧如翡翠。这一年的腊月，苏家宅院中传来婴儿啼哭，声如洪钟。\n\n父亲苏洵抱起这孩子，见他天庭饱满，目光炯炯，喜不自胜，为其取名"轼"——取自车前横木，望其虽不居中，却能扶助前行、泽被天下。\n\n母亲程氏温柔地接过孩子，轻声道："轼儿，愿你此生坦荡。"\n\n你便是苏轼。眉山苏家的长子，一段传奇的开端。`,
    poem: null,
    choices: [
      {
        text: '勤学苦读 — 自幼展露聪慧，手不释卷',
        effects: { talent: 5, career: 2, charm: 0, spirit: 0 },
        nextScene: 'childhood_2',
        flavor: '你似乎天生便与书卷有缘，三岁识字，五岁诵诗，令苏洵欣喜不已。',
      },
      {
        text: '与弟嬉戏 — 天性烂漫，与苏辙相伴为乐',
        effects: { talent: 2, career: 0, charm: 5, spirit: 3 },
        nextScene: 'childhood_2',
        flavor: '弟弟苏辙出生后，你总是牵着他的小手，在眉山的竹林间奔跑嬉闹。',
      },
    ],
  },

  childhood_2: {
    id: 'childhood_2',
    stage: '幼年',
    stageIndex: 0,
    title: '苏洵授业',
    year: '庆历二年（1042年）',
    age: '六岁',
    narrative: `苏洵虽屡试不第，却学识渊博。他决心将自己的全部所学倾注于你们兄弟二人身上。\n\n每日清晨，天色未明，苏洵便已在书房中点燃灯烛。他教你读《孟子》《庄子》，教你写文章要"有为而作"。\n\n"轼儿，文章当如行云流水，初无定质。"父亲的声音沉稳有力。\n\n母亲程氏在一旁缝补衣裳，偶尔抬头微笑。她也是饱读诗书的女子，常给你讲范滂等忠臣义士的故事。`,
    poem: null,
    choices: [
      {
        text: '钻研经义 — 循父亲之教，深究儒家经典',
        effects: { talent: 3, career: 5, charm: 0, spirit: 0 },
        nextScene: 'childhood_3',
        flavor: '你日日苦读，对经义的理解远超同龄孩童，父亲赞你"他日必成大器"。',
      },
      {
        text: '偏爱诗赋 — 更喜辞章之美，吟咏山水',
        effects: { talent: 5, career: 0, charm: 0, spirit: 3 },
        nextScene: 'childhood_3',
        flavor: '你偷偷翻阅屈原、李白的诗篇，在月光下吟诵，心中激荡着壮阔的山河。',
      },
    ],
  },

  childhood_3: {
    id: 'childhood_3',
    stage: '幼年',
    stageIndex: 0,
    title: '兄弟情深',
    year: '庆历五年（1045年）',
    age: '九岁',
    narrative: `苏辙小你两岁，性情温润如玉。你们兄弟二人，一文一静，却心意相通。\n\n后山的竹林中，你与弟弟常常读书论学。你高谈阔论，他静静聆听，偶尔一句话便点醒你。\n\n"哥哥，你说我们以后能一起考中进士吗？"苏辙仰头问道。\n\n眉山的溪水潺潺流过，映着两张稚气而认真的面孔。这是你一生中最无忧的时光。`,
    poem: null,
    choices: [
      {
        text: '以兄长之责护弟 — 承诺此生照看弟弟',
        effects: { talent: 0, career: 0, charm: 5, spirit: 2 },
        nextScene: 'youth_1',
        flavor: '"子由，放心，有哥哥在。"你拉着弟弟的手，庄重地许下诺言。',
      },
      {
        text: '与弟切磋学问 — 相互砥砺，共同进步',
        effects: { talent: 5, career: 0, charm: 3, spirit: 0 },
        nextScene: 'youth_1',
        flavor: '你们常常秉烛夜谈，从诗词歌赋到经国济世，彼此启发，日渐精进。',
      },
    ],
  },

  // ==================== 少年阶段 (1050-1057) ====================
  youth_1: {
    id: 'youth_1',
    stage: '少年',
    stageIndex: 1,
    title: '科举之志',
    year: '皇祐二年（1050年）',
    age: '十四岁',
    narrative: `眉山虽美，却装不下你的志向。天下之大，你想要去看看。\n\n父亲苏洵决定带你和弟弟出蜀赴京，参加科举。这是苏家改变命运的唯一机会。\n\n离别的清晨，母亲站在门口，眼中有不舍也有期望。"轼儿，要做个正直的人。"\n\n你回头望了望眉山，那片生养你的青山绿水。然后转身，踏上了东去的路。\n\n蜀道之难，难于上青天。但你心中的火焰，比蜀道更险峻。`,
    poem: null,
    choices: [
      {
        text: '闭门苦读 — 日夜不辍，誓中进士',
        effects: { talent: 5, career: 3, charm: 0, spirit: 0 },
        nextScene: 'youth_2',
        flavor: '你在客栈中日夜攻读，灯火通明，直到天明。',
      },
      {
        text: '游历山川 — 读万卷书，行万里路',
        effects: { talent: 3, career: 0, charm: 0, spirit: 5 },
        nextScene: 'youth_2',
        flavor: '你在赶考途中流连山水，用心感受天地之大，胸中豪气渐生。',
      },
    ],
  },

  youth_2: {
    id: 'youth_2',
    stage: '少年',
    stageIndex: 1,
    title: '兄弟同赴',
    year: '嘉祐元年（1056年）',
    age: '二十岁',
    narrative: `数年寒窗苦读，终到一试锋芒之时。你与弟弟苏辙一同赴京赶考。\n\n途中经过渑池，住过的那间寺庙、骑过的那匹瘦驴，都成了日后的回忆。人生如飞鸿踏雪，偶留痕迹，便又远去。\n\n京城汴梁，繁华如梦。天下英才汇聚于此，你却毫无惧色。胸中锦绣万千，只待一纸试卷，便让天下人知晓眉山苏轼之名。`,
    poem: ['he zi you mian chi huai jiu'],
    choices: [
      {
        text: '专心备考 — 全力以赴，志在必得',
        effects: { talent: 3, career: 5, charm: 0, spirit: 0 },
        nextScene: 'young_adult_1',
        flavor: '你日夜温习策论，将天下大事了然于胸，只待考场上挥洒自如。',
      },
      {
        text: '交友论学 — 广结天下英才',
        effects: { talent: 3, career: 0, charm: 5, spirit: 0 },
        nextScene: 'young_adult_1',
        flavor: '你在京城结交各地举子，谈诗论文，眼界大开，人缘渐广。',
      },
    ],
  },

  // ==================== 青年阶段 (1057-1071) ====================
  young_adult_1: {
    id: 'young_adult_1',
    stage: '青年',
    stageIndex: 2,
    title: '名动京师',
    year: '嘉祐二年（1057年）',
    age: '二十一岁',
    narrative: `这一年的科举，注定载入史册。\n\n你写的《刑赏忠厚之至论》，令主考官欧阳修拍案叫绝。欧阳修对同事说："读此文，不觉汗出。快哉！此人当是苏轼！"\n\n然而欧阳修以为此文是其弟子曾巩所作，为避嫌，将你列为第二。后来得知真相，欧阳修感叹道："此人可谓善读书，善用书，他日文章必独步天下。"\n\n你的名字，一夜之间传遍京城。苏家父子三人，名动天下，人称"三苏"。\n\n功名如花绽放，但前路漫漫。`,
    poem: null,
    choices: [
      {
        text: '谦虚退让 — 感恩前辈提携，韬光养晦',
        effects: { talent: 0, career: 0, charm: 5, spirit: 3 },
        nextScene: 'young_adult_2',
        flavor: '你向欧阳修致谢，虚心请教，不骄不躁，众人都赞你谦和有礼。',
      },
      {
        text: '锋芒毕露 — 以才学自信，直言无讳',
        effects: { talent: 5, career: 3, charm: -2, spirit: 0 },
        nextScene: 'young_adult_2',
        flavor: '你在文会上纵论天下，文采飞扬，有人叹服，也有人暗生不快。',
      },
    ],
  },

  young_adult_2: {
    id: 'young_adult_2',
    stage: '青年',
    stageIndex: 2,
    title: '红袖添香',
    year: '嘉祐五年（1060年）',
    age: '二十四岁',
    narrative: `你娶了王弗为妻。她是青神县乡贡进士王方之女，温柔聪慧，善识人心。\n\n新婚之夜，烛影摇红，你揭开盖头，只见她眉目如画，含笑不语。\n\n"弗儿，此后风雨同舟。"\n\n王弗不仅是你的妻子，更是你的知己。你为人率直，常不能辨人善恶，王弗总在帘后提醒你："此人言辞阿谀，不可深交。"她比你看人更准。\n\n这一段姻缘，如春日暖阳，是你一生最温暖的时光。`,
    poem: null,
    choices: [
      {
        text: '深情相伴 — 与王弗相敬如宾',
        effects: { talent: 0, career: 0, charm: 5, spirit: 5 },
        nextScene: 'young_adult_3',
        flavor: '你与王弗琴瑟和鸣，她替你把关交友，你替她写诗作赋。那是最好的岁月。',
      },
      {
        text: '以事业为重 — 专注仕途，聚少离多',
        effects: { talent: 0, career: 5, charm: 0, spirit: -3 },
        nextScene: 'young_adult_3',
        flavor: '你忙于公务，常常早出晚归。王弗独自在家，默默守候。',
      },
    ],
  },

  young_adult_3: {
    id: 'young_adult_3',
    stage: '青年',
    stageIndex: 2,
    title: '生死茫茫',
    year: '治平三年（1066年）',
    age: '三十岁',
    narrative: `王弗病逝了。\n\n她走的那天，窗外梅花初绽，你握着她渐渐冰冷的手，一句话也说不出来。\n\n你想起她帘后轻声提醒的声音，想起她为你研墨时低垂的眉眼，想起她笑起来弯弯的嘴角。\n\n一切都成了回忆。\n\n父亲苏洵也在这前后辞世。你扶柩归蜀，将他们葬在眉山。居丧三年，不饮不食，形销骨立。\n\n十年后，你会梦到她。在梦里，她还是初见时的模样。`,
    poem: ['jiang cheng zi ji meng'],
    choices: [
      {
        text: '深陷悲痛 — 此恨绵绵，刻骨铭心',
        effects: { talent: 5, career: 0, charm: 0, spirit: -5 },
        nextScene: 'prime_1',
        flavor: '悲痛化为文字的力量，你写出的诗文字字血泪，令读者无不动容。',
      },
      {
        text: '化悲为力 — 擦干眼泪，继续前行',
        effects: { talent: 3, career: 0, charm: 0, spirit: 3 },
        nextScene: 'prime_1',
        flavor: '"弗儿，我会好好活下去。"你对着她的灵位低声说道，然后转身面向未来。',
      },
    ],
  },

  // ==================== 壮年阶段 (1071-1085) ====================
  prime_1: {
    id: 'prime_1',
    stage: '壮年',
    stageIndex: 3,
    title: '新旧之争',
    year: '熙宁三年（1070年）',
    age: '三十四岁',
    narrative: `王安石变法，朝堂风云变幻。新法急进，青苗法、免役法、市易法……天下骚动。\n\n你看到民间疾苦——青苗法逼得农人卖儿鬻女，免役法让小吏中饱私囊。你忍不住了。\n\n你不是旧党的守旧派，你只是觉得变法不应伤民。但在这个非黑即白的朝堂上，中立意味着两面不讨好。\n\n上书？还是沉默？这个选择，将改变你的一生。`,
    poem: null,
    choices: [
      {
        text: '上书反对新法 — 不计后果，为民请命',
        effects: { talent: 0, career: -5, charm: -3, spirit: 5 },
        nextScene: 'prime_2',
        flavor: '你洋洋洒洒写下万言书，陈说新法之弊。朝堂震动，王安石怒目而视。',
      },
      {
        text: '随波逐流 — 审时度势，明哲保身',
        effects: { talent: 0, career: 5, charm: 0, spirit: -5 },
        nextScene: 'prime_2',
        flavor: '你选择了沉默。但每个夜晚，那些百姓的哭声都在你耳边回响。',
      },
    ],
  },

  prime_2: {
    id: 'prime_2',
    stage: '壮年',
    stageIndex: 3,
    title: '乌台诗案',
    year: '元丰二年（1079年）',
    age: '四十三岁',
    narrative: `终于来了。你早就知道会有这一天。\n\n御史台的官差闯入你的府邸，将你锁拿。你的诗文被逐字逐句地曲解——"根到九泉无曲处，世间唯有蛰龙知"被说成是讽刺皇上，"读书万卷不读律"被说成是攻击新法。\n\n你在乌台（御史台）的牢狱中度日如年。与儿子约定：若送来的饭菜中有鱼，便是死期将至。\n\n中秋之夜，你在狱中望月，想起了弟弟苏辙，想起了这半生的功名与坎坷。\n\n你不知道自己能否活着走出这座牢笼。`,
    poem: ['shui diao ge tou'],
    choices: [
      {
        text: '据理力争 — 文人的脊梁不能弯',
        effects: { talent: 3, career: -5, charm: 0, spirit: 3 },
        nextScene: 'prime_3',
        flavor: '你在审讯中慷慨陈词，宁死不屈。太皇太后暗中为你求情，朝中故旧奔走相救。',
      },
      {
        text: '低头认罪 — 忍辱求生，来日方长',
        effects: { talent: 0, career: 3, charm: 3, spirit: -5 },
        nextScene: 'prime_3',
        flavor: '你含泪写下认罪书，心中满是苦涩。活着，才有翻盘的机会。',
      },
    ],
  },

  prime_3: {
    id: 'prime_3',
    stage: '壮年',
    stageIndex: 3,
    title: '贬谪黄州',
    year: '元丰三年（1080年）',
    age: '四十四岁',
    narrative: `你活下来了。但代价是——贬谪黄州，充团练副使，本州安置，不得签书公事。\n\n也就是说，你被软禁了。\n\n初到黄州，你几乎一无所有。没有俸禄，没有官舍，没有朋友。你开垦城东一片荒地，自号"东坡居士"。\n\n你在东坡种稻、栽橘、酿酒。日出而作，日落而读。你发现，当官不是唯一的活法。\n\n赤壁就在眼前。那条大江，见证过三国英雄的豪情，如今也在倾听你的心声。`,
    poem: ['nian nu jiao chi bi huai gu'],
    choices: [
      {
        text: '潜心创作 — 将满腔心事化为诗文',
        effects: { talent: 8, career: 0, charm: 0, spirit: 5 },
        nextScene: 'prime_4',
        flavor: '你夜夜秉烛挥毫，才思如泉涌。黄州五年，你写出的作品足以照耀千年。',
      },
      {
        text: '与民同乐 — 在烟火人间中寻找温暖',
        effects: { talent: 0, career: 0, charm: 5, spirit: 5 },
        nextScene: 'prime_4',
        flavor: '你和黄州的渔夫、樵夫交上了朋友，东坡肉的香气飘满了街巷。',
      },
    ],
  },

  prime_4: {
    id: 'prime_4',
    stage: '壮年',
    stageIndex: 3,
    title: '赤壁之思',
    year: '元丰五年（1082年）',
    age: '四十六岁',
    narrative: `这一年的秋天，月光如银。你与友人在赤壁下泛舟。\n\n江风拂面，水天一色。你吟诵着诗句，忽然生出一种奇异的感悟——世间万物，变与不变，皆在心中。\n\n"客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。"\n\n你又独自去了赤壁。那一次是在冬天，山高月小，水落石出。你独自攀上山巅，长啸一声，山鸣谷应。\n\n有一次，你在路上遇到骤雨。同行的人都狼狈躲避，你却拄着竹杖，踩着草鞋，在雨中从容前行。\n\n风雨终会过去。而走过风雨的人，心已不同。`,
    poem: ['qian chi bi fu', 'hou chi bi fu', 'ding feng bo'],
    choices: [
      {
        text: '寄情山水 — 天地之间，自有大乐',
        effects: { talent: 5, career: 0, charm: 0, spirit: 8 },
        nextScene: 'middle_1',
        flavor: '你登赤壁、游庐山、泛江海，胸襟日益开阔，笔下的文字愈发通透。',
      },
      {
        text: '思虑归朝 — 天下苍生，仍需有人担当',
        effects: { talent: 0, career: 5, charm: 0, spirit: -3 },
        nextScene: 'middle_1',
        flavor: '你虽在江湖，心系庙堂。你暗暗积蓄力量，等待东山再起的那一天。',
      },
    ],
  },

  // ==================== 中年阶段 (1085-1094) ====================
  middle_1: {
    id: 'middle_1',
    stage: '中年',
    stageIndex: 4,
    title: '还朝风云',
    year: '元祐元年（1086年）',
    age: '五十岁',
    narrative: `神宗驾崩，哲宗即位，高太后垂帘听政。旧党司马光执政，新法尽数废除。\n\n你被召回朝廷，任翰林学士、知制诰。一时之间，位极人臣，风光无限。\n\n然而你很快发现，旧党并不比新党更高尚。司马光要废除一切新法，哪怕其中有些确实利民。\n\n你又忍不住了。你反对全盘否定新法中的合理部分，又一次成为两党的靶子。\n\n"我本将心向明月，奈何明月照沟渠。"你苦笑着对秦观说。`,
    poem: null,
    choices: [
      {
        text: '积极从政 — 力谏改革弊端，匡扶正道',
        effects: { talent: 0, career: 8, charm: 0, spirit: -3 },
        nextScene: 'middle_2',
        flavor: '你在朝堂上据理力争，得罪了旧党新贵，但他们也不得不承认你的才干。',
      },
      {
        text: '保持距离 — 少惹是非，多留余地',
        effects: { talent: 0, career: 3, charm: 0, spirit: 5 },
        nextScene: 'middle_2',
        flavor: '你学会了在风口浪尖保持平衡，不再事事冲在最前面。但心中仍有不甘。',
      },
    ],
  },

  middle_2: {
    id: 'middle_2',
    stage: '中年',
    stageIndex: 4,
    title: '西湖筑堤',
    year: '元祐四年（1089年）',
    age: '五十三岁',
    narrative: `你主动请求外放，出知杭州。\n\n杭州，又是杭州。你第一次来这里时还是青年，如今已是饱经沧桑的中年人。\n\n西湖淤塞，你主持疏浚工程，用挖出的淤泥筑成一道长堤。堤上种桃植柳，春来花开如锦。\n\n百姓感念你的恩德，将这道堤称为"苏堤"。苏堤春晓，日后成为西湖十景之首。\n\n你在湖上饮酒，雨后初晴，水光山色美不胜收。你举杯望湖，心中澄明如镜。`,
    poem: ['yin hu shang chu qing hou yu'],
    choices: [
      {
        text: '全力治水修堤 — 以实干造福一方百姓',
        effects: { talent: 0, career: 5, charm: 8, spirit: 0 },
        nextScene: 'middle_3',
        flavor: '苏堤修成之日，百姓夹道欢呼。你知道，这比任何朝堂上的赞誉都更真实。',
      },
      {
        text: '游赏西湖赋诗 — 在诗画中安放灵魂',
        effects: { talent: 5, career: 0, charm: 0, spirit: 5 },
        nextScene: 'middle_3',
        flavor: '你在西湖边流连忘返，写出一首首传世佳作。文人的心，终究属于山水。',
      },
    ],
  },

  middle_3: {
    id: 'middle_3',
    stage: '中年',
    stageIndex: 4,
    title: '庐山悟道',
    year: '元丰七年（1084年）',
    age: '四十八岁',
    narrative: `你离开黄州，途中游历庐山。\n\n庐山的云雾千变万化，你在山中行走数日，所见皆是不同景致。横看是岭，侧看是峰，远近高低各不相同。\n\n你忽然悟到——人看世界，何尝不是如此？每个人都在自己的"山中"，所见不过是冰山一角。朝堂上那些争斗，新党旧党，你争我夺，岂不都是"不识庐山真面目"吗？\n\n你的心境，在庐山的云雾中，又通透了几分。`,
    poem: ['ti xi lin bi'],
    choices: [
      {
        text: '坚持己见 — 纵然身在山中，也要发出自己的声音',
        effects: { talent: 0, career: -5, charm: 0, spirit: 5 },
        nextScene: 'old_1',
        flavor: '你依旧直言不讳，朝中小人记恨在心，等待报复的时机。',
      },
      {
        text: '委曲求全 — 学会沉默，等待时局变化',
        effects: { talent: 0, career: 5, charm: 0, spirit: -5 },
        nextScene: 'old_1',
        flavor: '你咬紧牙关忍了。可沉默的苦涩，比黄州的穷困更难以下咽。',
      },
    ],
  },

  // ==================== 晚年阶段 (1094-1101) ====================
  old_1: {
    id: 'old_1',
    stage: '晚年',
    stageIndex: 5,
    title: '再贬惠州',
    year: '绍圣元年（1094年）',
    age: '五十八岁',
    narrative: `新党再度得势。章惇为相，清算旧党，你被贬至岭南惠州。\n\n惠州在当时是蛮荒之地，瘴气弥漫，虫蛇遍地。许多人都以为你会一蹶不振。\n\n但你没有。\n\n你种菜、酿酒、写诗。你发现惠州的荔枝甘甜无比，罗浮山的泉水清冽如玉。你甚至说——如果每天能吃三百颗荔枝，"不辞长作岭南人"。\n\n那些想要折磨你的人，恐怕没想到，你居然能在天涯海角过得快活。这就是苏东坡——无论命运把他扔到哪里，他都能在泥泞中开出花来。`,
    poem: ['hui zhou yi jue'],
    choices: [
      {
        text: '随遇而安 — 既来之则安之，苦中作乐',
        effects: { talent: 0, career: 0, charm: 3, spirit: 8 },
        nextScene: 'old_2',
        flavor: '你的乐观感染了当地人，惠州百姓敬你如父，你的日子反倒有滋有味。',
      },
      {
        text: '思念中原 — 时刻盼望北归，心系故土',
        effects: { talent: 0, career: 3, charm: 0, spirit: -5 },
        nextScene: 'old_2',
        flavor: '你每个夜晚都望向北方，心中满是思乡之情。岭南再好，终究不是家。',
      },
    ],
  },

  old_2: {
    id: 'old_2',
    stage: '晚年',
    stageIndex: 5,
    title: '远渡儋州',
    year: '绍圣四年（1097年）',
    age: '六十一岁',
    narrative: `章惇见你在惠州居然过得不错，又把你贬到了儋州——也就是今天的海南。\n\n在那个年代，流放儋州几乎等于判了死刑。海天茫茫，举目无亲。\n\n但苏东坡终究是苏东坡。\n\n你在儋州办学堂、教读书。你教当地的孩子识字、作文，将中原文化的种子撒在这片蛮荒之地。你成了海南文化的先驱——在你之前，海南从未出过一个进士；在你之后，人才辈出。\n\n"九死南荒吾不恨，兹游奇绝冠平生。"你这样写道。这一生，即便再多磨难，你也不曾后悔。`,
    poem: null,
    choices: [
      {
        text: '教化当地百姓 — 开办学堂，播撒文脉',
        effects: { talent: 0, career: 0, charm: 8, spirit: 5 },
        nextScene: 'old_3',
        flavor: '你的学生们围坐在椰树下，听你讲《论语》。这些孩子，是海南未来的希望。',
      },
      {
        text: '孤独度日 — 以诗酒自遣，等待终局',
        effects: { talent: 5, career: 0, charm: 0, spirit: -5 },
        nextScene: 'old_3',
        flavor: '你在海边的茅屋中独酌，海风咸腥，诗稿散落一地。',
      },
    ],
  },

  old_3: {
    id: 'old_3',
    stage: '晚年',
    stageIndex: 5,
    title: '北归渡海',
    year: '建中靖国元年（1101年）',
    age: '六十五岁',
    narrative: `哲宗驾崩，徽宗即位，大赦天下。你终于获准北归。\n\n渡海的那天，夜色如墨，星辰漫天。你站在船头，看着身后渐渐远去的海南，心中百感交集。\n\n这一生，从眉山到汴梁，从汴梁到黄州，从黄州到杭州，从杭州到惠州，从惠州到儋州。你走过的路，比任何文人都远。\n\n但你的心，始终如一。\n\n你回望那片大海。风浪之中，你想起了一生的起起落落。功名利禄如浮云，唯有心中那团火，从未熄灭。\n\n北归途中，你病倒了。你知道，这一次，恐怕再也回不去了。`,
    poem: ['liu yue er shi ri ye du hai'],
    choices: [
      {
        text: '回味一生，了悟自在 — 心已无憾，此生足矣',
        effects: { talent: 0, career: 0, charm: 0, spirit: 10 },
        nextScene: 'ending',
        flavor: '你微笑着闭上眼睛。这一生，虽有遗憾，但更多的是无憾。你活得通透、畅快。',
      },
      {
        text: '遗憾未竟之志 — 若再给一生，当续前缘',
        effects: { talent: 0, career: 5, charm: 0, spirit: -5 },
        nextScene: 'ending',
        flavor: '你叹息着望向北方。还有太多事没有做完，还有太多人没有见。但命运，已不再给你时间。',
      },
    ],
  },
};

export default storyData;
