// 導入模組
var fs = require('fs')
var path = require('path')

// 配合timeEnd()成對出現。 打印出代碼執行的時間
console.time('共耗費了')

// 標記好的檔案，轉為cbreader的xml目錄、html網頁檔、Accelon3的XML檔。以便閱讀、搜尋
// 設定共用函數
function addV5OK(file) {
    // 讀取index的檔案，並導入陣列
    var g = fs.readFileSync(file, 'utf8').split('\n')
    // 準備轉另一個HTML,XML的陣列
    var k = [], m = [], x = [], ZZ, PP1, PP2, PP3

    // 用for of來轉換二維陣列都失敗，可能在node.js中，都必須用最原始的for循環，及最簡單的正規式
    // 轉換內容
    for (var i = 0; i < g.length; i++) {
        // 刪除CBETA2018以後才有的空白空行
        if (/^\s+$/.test(g[i])) {
            g[i] = ''
            // console.log('a2')
            // 跳過下面的工作，可省時間
            continue
        }
        if (/^[^T]/.test(g[i])) {
            if (/^T/.test(g[i + 1])) {
                // 先把行首資訊，導入標記行。無標記的行，就不處理
                k[i] = g[i] + g[i + 1]
                // 刪除行末文字
                // m[i]準備轉另一個HTML的陣列
                m[i] = k[i] = k[i].replace(/║.+$/, '').replace(/ 四分律/g, ' 五分律').replace(/鉢/g, '缽').replace(/徧/g, '遍').replace(/麁/g, '粗').replace(/磔/g, '搩').replace(/虫/g, '蟲').replace(/污/g, '汙')
                // 準備轉另一個Accelon3的XML的陣列，加入一個內嵌的<有>，頻次檢索時，呈現才不會差一行
                x[i] = m[i].replace(/^([^T]+)T(\d+)n\d+\_p0?(\d+\w)(\d+)/, '<聯 i="taisho?$2p$3\#$4"><有>$1</有></聯>　<聯 i="rdg2011?$2p$3\#$4">校勘版</聯>')
                // 在行內加上<章節>樹狀目錄無法呈現內容，必須分行
                if (/\<有\>[^\t]/.test(x[i])) {
                    x[i] = x[i].replace(/^([^有]+有\>)([^<]+)(\<\/有\>.+)/, '<章>$2</章>\n$1$2$3')
                }
                if (/\<有\>\t[^\t]/.test(x[i])) {
                    x[i] = x[i].replace(/^([^有]+有\>)([^<]+)(\<\/有\>.+)/, '<節>$2</節>\n$1$2$3')
                }

                // cbeta的xml一卷一個，所以要判斷
                // 取出頁碼
                PP1 = k[i].substr(k[i].indexOf('p') + 1, 4)
                // 取出欄號，轉成數字
                if (/a/.test(k[i])) { PP2 = '1' }
                if (/b/.test(k[i])) { PP2 = '2' }
                if (/c/.test(k[i])) { PP2 = '3' }
                // 取出行號
                PP3 = k[i].substr(k[i].length - 2, 2)
                // 三個相加，變成數字，才可以判斷大小
                ZZ = Number(PP1 + PP2 + PP3)
                // 五分律各卷首的行號，來判斷大小，加入xml號
                if (ZZ < 7118) { k[i] = k[i].replace('_', '_001.xml#') }
                if (7119 < ZZ && ZZ < 14220) { k[i] = k[i].replace('_', '_002.xml#') }
                if (14221 < ZZ && ZZ < 22307) { k[i] = k[i].replace('_', '_003.xml#') }
                if (22308 < ZZ && ZZ < 30127) { k[i] = k[i].replace('_', '_004.xml#') }
                if (30201 < ZZ && ZZ < 37207) { k[i] = k[i].replace('_', '_005.xml#') }
                if (37208 < ZZ && ZZ < 45311) { k[i] = k[i].replace('_', '_006.xml#') }
                if (45312 < ZZ && ZZ < 53325) { k[i] = k[i].replace('_', '_007.xml#') }
                if (54101 < ZZ && ZZ < 62311) { k[i] = k[i].replace('_', '_008.xml#') }
                if (62312 < ZZ && ZZ < 71226) { k[i] = k[i].replace('_', '_009.xml#') }
                if (71301 < ZZ && ZZ < 77220) { k[i] = k[i].replace('_', '_010.xml#') }
                if (77221 < ZZ && ZZ < 83106) { k[i] = k[i].replace('_', '_011.xml#') }
                if (83107 < ZZ && ZZ < 89105) { k[i] = k[i].replace('_', '_012.xml#') }
                if (89106 < ZZ && ZZ < 94228) { k[i] = k[i].replace('_', '_013.xml#') }
                if (94301 < ZZ && ZZ < 101105) { k[i] = k[i].replace('_', '_014.xml#') }
                if (101106 < ZZ && ZZ < 107205) { k[i] = k[i].replace('_', '_015.xml#') }
                if (108101 < ZZ && ZZ < 114122) { k[i] = k[i].replace('_', '_016.xml#') }
                if (114123 < ZZ && ZZ < 121126) { k[i] = k[i].replace('_', '_017.xml#') }
                if (121201 < ZZ && ZZ < 129101) { k[i] = k[i].replace('_', '_018.xml#') }
                if (129102 < ZZ && ZZ < 133320) { k[i] = k[i].replace('_', '_019.xml#') }
                if (133321 < ZZ && ZZ < 140321) { k[i] = k[i].replace('_', '_020.xml#') }
                if (140322 < ZZ && ZZ < 147125) { k[i] = k[i].replace('_', '_021.xml#') }
                if (147201 < ZZ && ZZ < 153321) { k[i] = k[i].replace('_', '_022.xml#') }
                if (153322 < ZZ && ZZ < 158225) { k[i] = k[i].replace('_', '_023.xml#') }
                if (158301 < ZZ && ZZ < 164112) { k[i] = k[i].replace('_', '_024.xml#') }
                if (164113 < ZZ && ZZ < 169123) { k[i] = k[i].replace('_', '_025.xml#') }
                if (169201 < ZZ && ZZ < 176323) { k[i] = k[i].replace('_', '_026.xml#') }
                if (177101 < ZZ && ZZ < 180317) { k[i] = k[i].replace('_', '_027.xml#') }
                if (180318 < ZZ && ZZ < 185128) { k[i] = k[i].replace('_', '_028.xml#') }
                if (185201 < ZZ && ZZ < 190209) { k[i] = k[i].replace('_', '_029.xml#') }
                if (190210 < ZZ) { k[i] = k[i].replace('_', '_030.xml#') }

                // 加上cbreader2019的目錄標記
                k[i] = k[i].replace(/^(\s*)([^T]+)(T.+$)/, '$1<li><cblink href="XML/T/T22/$3">$2</cblink></li>')
            }
        }
        // 跳過無標記的行之後，就不需要下面這項 刪除無標記的行 的工作
        // 刪除無標記的行，刪除不要的行
        // if (/^\s*[T\-【]/.test(k[i])) {
        //     k[i] = ''
        //     // 測試：是否有此不必要的行，結果，只有a1存在，不知何因？
        //     // console.log('a1')
        // }
        // if (/^\s+$/.test(k[i])) {
        //     k[i] = ''
        //     console.log('a2')
        // }
        // if (/^\s*[T\-【]/.test(m[i])) {
        //     m[i] = ''
        //     console.log('a3')
        // }
        // if (/^\s+$/.test(m[i])) {
        //     m[i] = ''
        //     console.log('a4')
        // }
    }

    // 刪除空行
    // 無法在陣列中刪除，只好轉入另一個物件中，再刪除空行
    var j = k.join('\n').replace(/\n+/g, '\n')

    // 加上<ol>
    // 無法在前一個循環中加上<ol>標記，會混亂。只好重新加入陣列，再重新循環
    k = j.split('\n')
    for (var i = 0; i < k.length; i++) {
        if (/^[^\t]/.test(k[i]) && /^\t[^\t]/.test(k[i + 1])) {
            k[i] = k[i].replace('</li>', '')
            k[i] = k[i] + '\n\t<ol>'
        }
        if (/^\t[^\t]/.test(k[i]) && /^\t\t[^\t]/.test(k[i + 1])) {
            k[i] = k[i].replace('</li>', '')
            k[i] = k[i] + '\n\t\t<ol>'
        }
        if (/^\t/.test(k[i]) && /^[^\t]/.test(k[i + 1])) {
            k[i] = k[i] + '\n\t\t</ol>\n\t\t</li>\n\t</ol>\n\t</li>'
        }
        if (/^\t\t[^\t]/.test(k[i]) && /^\t[^\t]/.test(k[i + 1])) {
            k[i] = k[i] + '\n\t\t</ol>\n\t\t</li>'
        }
    }
    // 補檔頭檔尾的<ol>直接插入xml的標記
    k.unshift('<?xml version="1.0" encoding="utf-8"?>\n<html>\n	<head>\n		<meta charset="UTF-8" />\n		<title>本經目次</title>\n	</head>\n<body>\n<nav type="catalog">\n<h1>五分律綱目</h1>\n<ol>')
    k.push('</ol>\n</nav>\n<nav type="catalog">\n<h1>目錄</h1>\n<ol>\n	<li><cblink href="XML/T/T22/T22n1421_001.xml#p0001a07">第一分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1421_001.xml#p0001a07">1 波羅夷法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_002.xml#p0010b01">2 僧殘法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1421_002.xml#p0010b01">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_003.xml#p0014b23">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1421_004.xml#p0022c14">3 不定法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_004.xml#p0023a13">4 捨墮法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1421_004.xml#p0023a13">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_005.xml#p0030b02">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1421_006.xml#p0037b14">5 墮法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1421_006.xml#p0037b14">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_007.xml#p0045c14">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_008.xml#p0054a02">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_009.xml#p0062c14">4</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1421_010.xml#p0071c06">6 悔過法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_010.xml#p0073c27">7 眾學法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_010.xml#p0077b06">8 七滅諍法</cblink></li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1421_011.xml#p0077b27">第二分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1421_011.xml#p0077b27">1 尼律波羅夷法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_011.xml#p0079a11">2 尼律僧殘法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_012.xml#p0083a13">3 尼律捨墮法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_012.xml#p0085b06">4 尼律墮法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1421_012.xml#p0085b06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_013.xml#p0089a08">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1421_014.xml#p0100a16">5 尼律悔過法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_014.xml#p0100b11">6 尼律眾學法</cblink></li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1421_015.xml#p0101a12">第三分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1421_015.xml#p0101a12">1 受戒法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1421_015.xml#p0101a12">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_016.xml#p0108a02">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_017.xml#p0114a24">3</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1421_018.xml#p0121b06">2 布薩法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_019.xml#p0129a08">3 安居法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_019.xml#p0130c19">4 自恣法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_020.xml#p0133c27">5 衣法上</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_021.xml#p0144a12">6 皮革法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_022.xml#p0147b06">7 藥法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_022.xml#p0147c28">8 食法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_022.xml#p0153a18">9 迦絺那衣法</cblink></li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1421_023.xml#p0153c28">第四分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1421_023.xml#p0153c28">1 滅諍法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_023.xml#p0156b19">2 羯磨法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1421_023.xml#p0156b19">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1421_024.xml#p0158c02">2</cblink></li>\n		</ol>\n		</li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1421_025.xml#p0164a19">第五分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1421_025.xml#p0164a19">1 破僧法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_025.xml#p0166b08">2 臥具法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_026.xml#p0169b06">3 雜法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_027.xml#p0177a05">4 四威儀法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_028.xml#p0180c24">5 遮布薩法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_028.xml#p0181b05">6 別住法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_028.xml#p0182a05">7 調伏法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_029.xml#p0185b06">8 比丘尼法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_030.xml#p0190b16">9 五百集法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1421_030.xml#p0192a26">10 七百集法</cblink></li>\n	</ol>\n	</li>\n</ol>\n</nav>\n<nav type="juan">\n<h1>卷</h1>\n<ol>\n	<li><cblink href="XML/T/T22/T22n1421_001.xml#p0001a03">第一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_002.xml#p0007a22">第二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_003.xml#p0014b23">第三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_004.xml#p0022c10">第四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_005.xml#p0030b02">第五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_006.xml#p0037b10">第六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_007.xml#p0045c14">第七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_008.xml#p0054a02">第八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_009.xml#p0062c14">第九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_010.xml#p0071c02">第十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_011.xml#p0077b23">第十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_012.xml#p0083a09">第十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_013.xml#p0089a08">第十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_014.xml#p0094c02">第十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_015.xml#p0101a08">第十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_016.xml#p0108a02">第十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_017.xml#p0114a24">第十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_018.xml#p0121b02">第十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_019.xml#p0129a04">第十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_020.xml#p0133c23">第二十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_021.xml#p0140c24">第二十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_022.xml#p0147b02">第二十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_023.xml#p0153c24">第二十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_024.xml#p0158c02">第二十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_025.xml#p0164a15">第二十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_026.xml#p0169b02">第二十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_027.xml#p0177a01">第二十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_028.xml#p0180c20">第二十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_029.xml#p0185b02">第二十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1421_030.xml#p0190b12">第三十</cblink></li>\n</ol>\n</nav>\n</body></html>')
    // 重新轉入物件，刪除空行
    j = k.join('\n').replace(/\n+/g, '\n')

    // 為了重新命名
    // 取得本檔絕對路徑
    var p = path.parse(file)

    // 用相對路徑寫入檔案
    fs.writeFileSync('T1421.xml', j, 'utf8')
    // fs.writeFileSync(p.name + '_ok_T1421.xml', j, 'utf8')
    // fs.writeFileSync(p.name + '_ok.txt', n, 'utf8')
    // fs.writeFileSync(p.name + '_A3_ok.xml', YY, 'utf8')


    // 後2個可以直接寫入檔案
    // 刪除空行
    // var n = "'" + m.join("','").replace(/\,\'\'/g, '') + "'"
    // 讀取v5search.html，後來改為中文檔名
    var index = fs.readFileSync('五分律綱目檢索.html', 'utf8')
    // 在陣列中找出「檔名陣列」
    var HH = index.split('\n')
    for (var i = 0; i < HH.length; i++) {
        if (/var ArrLi\s?\=/.test(HH[i])) {
            // 插入陣列，刪除空陣列
            HH[i] = 'var ArrLi = ["' + m.join('","').replace(/\,\"\"/g, '') + '"]'
        }
    }
    // 寫入檔案
    fs.writeFileSync('五分律綱目檢索.html', HH.join('\n'), 'utf8')

    // 直接插入Accelon3的標記
    // 若有\，要用\\
    var YY = '<檔 n="v5search.xml">\n<集 c="hidden" l="g,序,分,跋,會,其他,附文,經,other,xu,科判,卷,冊,編,書,章,節,類,篇,項,文,年,詩,著者,詞,人名,問,答,字,頁碼,偏右字,小字,原出處,參考書,期,編目資訊,原書分頁,相應部,藥,方,症,品,細,部畫,本文,標,頁,作者,專欄,問答,部,講,作,史,典,編輯,版本,英標,副標,英,X,圖片,拼音,斜英,面,版,表,大,日期,名,_名,甲,乙,丙,丁,戊,己,庚,辛,壬,癸,子,丑,寅,卯,辰,巳,午,未,申,酉,戌,亥,天,地,玄,黃,宇,宙,洪,荒,日,月,盈,昃,晨,宿,列,張,寒,來,暑,往,秋,收,冬,藏,閏,餘,成,歲,律,呂,調,陽,雲,騰,致,雨,露,結,為,霜,金,生,麗,水,玉,出,崑,崗,劍,號,巨,闕,珠,稱,夜,光,果,珍,李,柰,菜,重,芥,薑,海,鹹,河,淡,鱗,潛,羽,翔,龍,師,火,帝,鳥,官,人,皇,始,制,文,字,乃,服,衣,裳,推,位,讓,國,有,虞,陶,唐.">五分律綱目</集>\n<隱><樹 s="*" t="書,章,節,有.">樹狀目錄</樹></隱>\n<隱><樹 s="*有">綱目頻次檢索</樹></隱>\n<隱><樹 s="$有">綱目檢索</樹></隱>\n<隱><引>《$集;\\$有;》：「$_;」</引><摘要頭>$有;</摘要頭><參考資料 n="ency,yinshun,taixu,newest article,vinaya2np,vinaya2,ts lin,ShinMing,yugasidi,yugasidi1,wiki,verse,TXJW,ttctk,thonzu-s,thonzu,Sutanta,sila,panna,paauk,osed,lt,library,lbss,kt,gaya,dic4v33np,dic4v33,dic5v33,dic-china,color,cbeta2011,cbeta2014,age,lbm,gh,ght,aodbs,土觀宗派源流(轉為繁體),卡耐基口才學,印度佛教史(上冊)(平川彰著),和尚與哲學家_佛教與西方思想的對話,松下幸之助用人之道,法音叢書,空海大師傳,空海大師傳(轉為繁體),達摩易筋經,藏傳佛教概說(洛本仁波切),ziyu,pcd,滅苦之道,朱邦復文選,中藥小常識,minlun,chm,尊者阿迦曼傳,念住呼吸,法苑談叢,史念原始佛法,禪話禪畫,中國佛教,土觀宗派源流,弘法大師——空海,五明佛學院淨土,combdict,中華佛學學報,中華佛學研究,藏族英雄格薩爾大王,當代南傳佛教大師,TextProV6使用說明,瑜伽師地論(福嚴授課講義),攝阿毗達摩義論,清淨道論及涅槃的北二高,大史—斯里蘭卡佛教史,菩提道次第書畾,道證法師全集,南傳課誦本性恩編,bhd,cpi,ced,scdt,scd,other,上座部現代譯著,水野弘元著作選集,漢藏佛法百科光碟第二版文摘,戒律書畾,劉墉文選,tzuchi_monthly,taisho,wxzj,yulinpo,miuking,tibetan,ebst,rdg2011,網路讀書會,佛門必備課蓄本,念死無常,死亡無懼,學佛箴言,中醫書畾,中醫書畾1,中國古典醫學大全,cbeta-other2011,西藏生死書,santagavesaka,npt1,yugasidi4,VN,GuangLun."/></隱>\n<頁 id="00"/>\n<英文名>Vinaya 5 Search</英文名>\n因為閱讀三大部時，處處需連結到律藏原文，所以乾脆自訂五分律綱目，標記CBETA的行首位置，以後寫文章或閱讀時，直接可使用現成的連結點，以便連結到律藏原文\n<書>五分律綱目</書>\n' + x.join('\n').replace(/\n+/g, '\n') + '\n</檔>'
    // 寫入檔案
    fs.writeFileSync('v5search.xml', YY, 'utf8')

    // 完成時返回通知
    console.log(file + ' is OK')
}

// 套用檔案
addV5OK('v5Index.txt')

// 'test'名字要和time()中的名字保持一致
console.timeEnd('共耗費了')