let writer = null;
let currentThemeIndex = 0;

const themes = [
    { name: 'theme-day-grass', label: '🌿 草原白天' },
    { name: 'theme-day-sand', label: '🏜️ 沙漠白天' },
    { name: 'theme-day-snow', label: '❄️ 雪地白天' },
    { name: 'theme-sunset', label: '🌅 日落时分' },
    { name: 'theme-night', label: '🌙 夜晚星空' },
    { name: 'theme-night-moon', label: '🌕 月夜皎洁' },
    { name: 'theme-nether', label: '🔥 地狱火山' },
    { name: 'theme-end', label: '🌌 末地虚空' },
    { name: 'theme-ocean', label: '🌊 深海世界' },
    { name: 'theme-candy', label: '🍬 糖果乐园' }
];

const pinyinMap = {
    'ni': { hanzi: '你', pinyin: 'nǐ', words: ['你好', '你们'] },
    'wo': { hanzi: '我', pinyin: 'wǒ', words: ['我们', '我的'] },
    'hao': { hanzi: '好', pinyin: 'hǎo', words: ['好人', '好处'] },
    'ta': { hanzi: '他', pinyin: 'tā', words: ['他们', '他人'] },
    'ren': { hanzi: '人', pinyin: 'rén', words: ['人民', '人生'] },
    'da': { hanzi: '大', pinyin: 'dà', words: ['大小', '大家'] },
    'xiao': { hanzi: '小', pinyin: 'xiǎo', words: ['小孩', '小心'] },
    'shang': { hanzi: '上', pinyin: 'shàng', words: ['上下', '上学'] },
    'xia': { hanzi: '下', pinyin: 'xià', words: ['下雨', '下去'] },
    'tian': { hanzi: '天', pinyin: 'tiān', words: ['天空', '今天'] },
    'di': { hanzi: '地', pinyin: 'dì', words: ['地方', '地球'] },
    'ri': { hanzi: '日', pinyin: 'rì', words: ['日子', '日期'] },
    'yue': { hanzi: '月', pinyin: 'yuè', words: ['月亮', '月份'] },
    'shui': { hanzi: '水', pinyin: 'shuǐ', words: ['水果', '水平'] },
    'huo': { hanzi: '火', pinyin: 'huǒ', words: ['火车', '火山'] },
    'shan': { hanzi: '山', pinyin: 'shān', words: ['山水', '山上'] },
    'mu': { hanzi: '木', pinyin: 'mù', words: ['木头', '树木'] },
    'jin': { hanzi: '金', pinyin: 'jīn', words: ['金色', '金子'] },
    'tu': { hanzi: '土', pinyin: 'tǔ', words: ['土地', '泥土'] },
    'men': { hanzi: '门', pinyin: 'mén', words: ['门口', '大门'] },
    'chuang': { hanzi: '窗', pinyin: 'chuāng', words: ['窗户', '窗口'] },
    'che': { hanzi: '车', pinyin: 'chē', words: ['汽车', '火车'] },
    'ma': { hanzi: '马', pinyin: 'mǎ', words: ['马车', '马上'] },
    'niu': { hanzi: '牛', pinyin: 'niú', words: ['牛奶', '牛肉'] },
    'yang': { hanzi: '羊', pinyin: 'yáng', words: ['羊毛', '山羊'] },
    'gou': { hanzi: '狗', pinyin: 'gǒu', words: ['小狗', '狗年'] },
    'mao': { hanzi: '猫', pinyin: 'māo', words: ['小猫', '花猫'] },
    'ji': { hanzi: '鸡', pinyin: 'jī', words: ['鸡蛋', '公鸡'] },
    'ya': { hanzi: '鸭', pinyin: 'yā', words: ['鸭子', '鸭蛋'] },
    'yu': { hanzi: '鱼', pinyin: 'yú', words: ['小鱼', '金鱼'] },
    'niao': { hanzi: '鸟', pinyin: 'niǎo', words: ['小鸟', '鸟儿'] },
    'hua': { hanzi: '花', pinyin: 'huā', words: ['花朵', '花园'] },
    'cao': { hanzi: '草', pinyin: 'cǎo', words: ['草地', '小草'] },
    'shu': { hanzi: '树', pinyin: 'shù', words: ['大树', '树叶'] },
    'lin': { hanzi: '林', pinyin: 'lín', words: ['森林', '树林'] },
    'bi': { hanzi: '笔', pinyin: 'bǐ', words: ['铅笔', '钢笔'] },
    'zhi': { hanzi: '纸', pinyin: 'zhǐ', words: ['纸张', '白纸'] },
    'ben': { hanzi: '本', pinyin: 'běn', words: ['本子', '课本'] },
    'chi': { hanzi: '吃', pinyin: 'chī', words: ['吃饭', '小吃'] },
    'he': { hanzi: '喝', pinyin: 'hē', words: ['喝水', '喝茶'] },
    'shui2': { hanzi: '睡', pinyin: 'shuì', words: ['睡觉', '睡眠'] },
    'zuo': { hanzi: '坐', pinyin: 'zuò', words: ['坐下', '坐车'] },
    'li': { hanzi: '立', pinyin: 'lì', words: ['站立', '立正'] },
    'zou': { hanzi: '走', pinyin: 'zǒu', words: ['走路', '走开'] },
    'pao': { hanzi: '跑', pinyin: 'pǎo', words: ['跑步', '快跑'] },
    'tiao': { hanzi: '跳', pinyin: 'tiào', words: ['跳舞', '跳高'] },
    'xiao2': { hanzi: '笑', pinyin: 'xiào', words: ['笑容', '笑声'] },
    'ku': { hanzi: '哭', pinyin: 'kū', words: ['哭泣', '哭声'] },
    'ai': { hanzi: '爱', pinyin: 'ài', words: ['爱心', '喜爱'] },
    'hen': { hanzi: '恨', pinyin: 'hèn', words: ['仇恨', '悔恨'] },
    'kai': { hanzi: '开', pinyin: 'kāi', words: ['开心', '开门'] },
    'guan': { hanzi: '关', pinyin: 'guān', words: ['关门', '关闭'] },
    'jin3': { hanzi: '进', pinyin: 'jìn', words: ['进来', '进去'] },
    'chu': { hanzi: '出', pinyin: 'chū', words: ['出去', '出来'] },
    'lai': { hanzi: '来', pinyin: 'lái', words: ['来到', '来回'] },
    'qu': { hanzi: '去', pinyin: 'qù', words: ['去向', '去来'] },
    'kan': { hanzi: '看', pinyin: 'kàn', words: ['看见', '看书'] },
    'ting': { hanzi: '听', pinyin: 'tīng', words: ['听见', '听话'] },
    'shuo': { hanzi: '说', pinyin: 'shuō', words: ['说话', '说明'] },
    'xie': { hanzi: '写', pinyin: 'xiě', words: ['写字', '写信'] },
    'du': { hanzi: '读', pinyin: 'dú', words: ['读书', '朗读'] },
    'suan': { hanzi: '算', pinyin: 'suàn', words: ['算术', '计算'] },
    'hua2': { hanzi: '画', pinyin: 'huà', words: ['画画', '图画'] },
    'chang': { hanzi: '唱', pinyin: 'chàng', words: ['唱歌', '演唱'] },
    'wan': { hanzi: '玩', pinyin: 'wán', words: ['玩耍', '玩具'] },
    'xue': { hanzi: '学', pinyin: 'xué', words: ['学习', '学生'] },
    'jiao': { hanzi: '教', pinyin: 'jiào', words: ['教师', '教育'] },
    'gong': { hanzi: '工', pinyin: 'gōng', words: ['工作', '工人'] },
    'nong': { hanzi: '农', pinyin: 'nóng', words: ['农民', '农业'] },
    'shang2': { hanzi: '商', pinyin: 'shāng', words: ['商人', '商店'] },
    'bing': { hanzi: '兵', pinyin: 'bīng', words: ['士兵', '军队'] },
    'yi': { hanzi: '医', pinyin: 'yī', words: ['医生', '医院'] },
    'shi': { hanzi: '师', pinyin: 'shī', words: ['老师', '师傅'] },
    'sheng': { hanzi: '生', pinyin: 'shēng', words: ['生日', '生活'] },
    'si': { hanzi: '死', pinyin: 'sǐ', words: ['死亡', '生死'] },
    'jia': { hanzi: '家', pinyin: 'jiā', words: ['家庭', '家人'] },
    'guo': { hanzi: '国', pinyin: 'guó', words: ['国家', '中国'] },
    'shi2': { hanzi: '世', pinyin: 'shì', words: ['世界', '世纪'] },
    'jie': { hanzi: '界', pinyin: 'jiè', words: ['边界', '界限'] },
    'shi3': { hanzi: '时', pinyin: 'shí', words: ['时间', '时候'] },
    'jian': { hanzi: '间', pinyin: 'jiān', words: ['房间', '中间'] },
    'nian': { hanzi: '年', pinyin: 'nián', words: ['新年', '年龄'] },
    'yue2': { hanzi: '月', pinyin: 'yuè', words: ['月亮', '月份'] },
    'ri2': { hanzi: '日', pinyin: 'rì', words: ['日子', '日期'] },
    'xing': { hanzi: '星', pinyin: 'xīng', words: ['星星', '明星'] },
    'yun': { hanzi: '云', pinyin: 'yún', words: ['云朵', '白云'] },
    'yu': { hanzi: '雨', pinyin: 'yǔ', words: ['下雨', '雨水'] },
    'xue2': { hanzi: '雪', pinyin: 'xuě', words: ['下雪', '雪花'] },
    'feng': { hanzi: '风', pinyin: 'fēng', words: ['大风', '风景'] },
    'lei': { hanzi: '雷', pinyin: 'léi', words: ['打雷', '雷雨'] },
    'dian': { hanzi: '电', pinyin: 'diàn', words: ['闪电', '电灯'] },
    'hong': { hanzi: '红', pinyin: 'hóng', words: ['红色', '火红'] },
    'huang': { hanzi: '黄', pinyin: 'huáng', words: ['黄色', '黄河'] },
    'lan': { hanzi: '蓝', pinyin: 'lán', words: ['蓝色', '蓝天'] },
    'lv': { hanzi: '绿', pinyin: 'lǜ', words: ['绿色', '草地'] },
    'bai': { hanzi: '白', pinyin: 'bái', words: ['白色', '白天'] },
    'hei': { hanzi: '黑', pinyin: 'hēi', words: ['黑色', '黑夜'] }
};

const hanziMap = {};
for (const key in pinyinMap) {
    hanziMap[pinyinMap[key].hanzi] = pinyinMap[key];
}

function setTheme(index) {
    currentThemeIndex = index;
    const html = document.documentElement;
    const oldTheme = html.className;
    html.classList.remove(oldTheme);
    const newTheme = themes[currentThemeIndex];
    html.classList.add(newTheme.name);
    document.getElementById('themeIndicator').textContent = `当前主题: ${newTheme.label}`;
    
    localStorage.setItem('themeIndex', currentThemeIndex);
}

function nextTheme() {
    const newIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(newIndex);
}

function getThemeBasedOnTime() {
    const hour = new Date().getHours();
    let themeIndex;
    
    if (hour >= 6 && hour < 10) {
        themeIndex = 0;
    } else if (hour >= 10 && hour < 14) {
        themeIndex = 1;
    } else if (hour >= 14 && hour < 17) {
        themeIndex = 2;
    } else if (hour >= 17 && hour < 19) {
        themeIndex = 3;
    } else if (hour >= 19 && hour < 22) {
        themeIndex = 4;
    } else if (hour >= 22 || hour < 2) {
        themeIndex = 5;
    } else if (hour >= 2 && hour < 4) {
        themeIndex = 6;
    } else {
        themeIndex = 7;
    }
    
    return themeIndex;
}

function initWriter(hanzi) {
    try {
        if (writer) {
            writer = null;
        }
        
        document.getElementById('hanziCanvas').innerHTML = '';
        
        writer = HanziWriter.create('hanziCanvas', hanzi, {
            width: 280,
            height: 280,
            padding: 5,
            showOutline: true,
            strokeAnimationSpeed: 1,
            delayBetweenStrokes: 200,
            radicalColor: '#667eea',
            strokeColor: '#333',
            outlineColor: '#ddd',
            onLoadCharacter: function() {
                writer.animateCharacter();
            }
        });
    } catch (error) {
        console.error('Error initializing Hanzi Writer:', error);
        showStaticHanzi(hanzi);
    }
}

function showStaticHanzi(hanzi) {
    const canvas = document.getElementById('hanziCanvas');
    canvas.innerHTML = '';
    const hanziEl = document.createElement('div');
    hanziEl.style.fontSize = '180px';
    hanziEl.style.textAlign = 'center';
    hanziEl.style.lineHeight = '280px';
    hanziEl.textContent = hanzi;
    canvas.appendChild(hanziEl);
}

function updateDisplay(data) {
    document.getElementById('pinyinDisplay').textContent = data.pinyin;
    
    const wordsContainer = document.getElementById('wordsDisplay');
    wordsContainer.innerHTML = '';
    data.words.forEach(word => {
        const wordEl = document.createElement('div');
        wordEl.className = 'word-item';
        wordEl.textContent = word;
        wordsContainer.appendChild(wordEl);
    });
}

function clearDisplay() {
    document.getElementById('hanziCanvas').innerHTML = '';
    document.getElementById('pinyinDisplay').textContent = '';
    document.getElementById('wordsDisplay').innerHTML = '';
    writer = null;
}

function showTimestamp() {
    const deployTime = '2026-04-14 10:00:00';
    document.getElementById('timestamp').textContent = `部署版本: ${deployTime}`;
}

document.getElementById('pinyinInput').addEventListener('input', function(e) {
    const input = e.target.value.toLowerCase().trim();
    let data = null;
    
    if (input) {
        if (pinyinMap[input]) {
            data = pinyinMap[input];
        } else if (hanziMap[input]) {
            data = hanziMap[input];
        }
    }
    
    if (data) {
        initWriter(data.hanzi);
        updateDisplay(data);
    } else if (input === '') {
        clearDisplay();
    }
});

document.getElementById('animateBtn').addEventListener('click', function() {
    if (writer) {
        try {
            writer.animateCharacter();
        } catch (error) {
            console.error('Error animating character:', error);
        }
    }
});

document.getElementById('nextThemeBtn').addEventListener('click', function() {
    nextTheme();
});

document.addEventListener('DOMContentLoaded', function() {
    showTimestamp();
    
    let savedTheme = localStorage.getItem('themeIndex');
    if (savedTheme !== null) {
        currentThemeIndex = parseInt(savedTheme);
    } else {
        currentThemeIndex = getThemeBasedOnTime();
    }
    setTheme(currentThemeIndex);
    
    setInterval(function() {
        const timeBasedIndex = getThemeBasedOnTime();
        if (timeBasedIndex !== currentThemeIndex) {
            setTheme(timeBasedIndex);
        }
    }, 600000);
    
    setTimeout(() => {
        const defaultData = pinyinMap['ni'];
        if (defaultData) {
            initWriter(defaultData.hanzi);
            updateDisplay(defaultData);
            document.getElementById('pinyinInput').value = 'ni';
        }
    }, 500);
});
