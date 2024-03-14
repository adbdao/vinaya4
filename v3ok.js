// 導入模組
var fs = require('fs')
var path = require('path')

// 配合timeEnd()成對出現。 打印出代碼執行的時間
console.time('共耗費了')

// 標記好的檔案，轉為cbreader的xml目錄、html網頁檔、Accelon3的XML檔、Accelon2017的cor檔。以便閱讀、搜尋
// 設定共用函數
function addV3OK(file) {
    // 讀取index的檔案，並導入陣列
    var g = fs.readFileSync(file, 'utf8').split('\n')
    // 準備轉另一個HTML,XML的陣列
    var k = [], m = [], x = [], ZZ, PP1, PP2, PP3, cor = [], pus

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
                // 2021年5月後，g[i] + g[i + 1]直接相加會加入段落符號，所以改用substring()
                // k[i] = g[i] + g[i + 1]
                k[i] = g[i].substring(0, (g[i].length - 1)) + g[i + 1].substring(0, (g[i + 1].indexOf('║')))

                // 刪除行末文字
                // m[i]準備轉另一個HTML的陣列
                m[i] = k[i] = k[i].replace(/ 四分律/g, ' 僧祇律').replace(/鉢/g, '缽').replace(/徧/g, '遍').replace(/麁/g, '粗').replace(/磔/g, '搩').replace(/虫/g, '蟲').replace(/污/g, '汙').replace(/靺/g, '襪').replace(/偷羅遮/g, '偷蘭遮')

                // 準備轉另一個Accelon2017的XML的陣列
                cor[i] = m[i].replace(/^([^T]+)T(\d+)n\d+\_p0*(\d+\w)(\d+)/, '<k to="taisho@$2p$3$400-03">$1</k>')
                // 在行內加上<章節h1>樹狀目錄
                if (/">[^\t]/.test(cor[i])) {
                    cor[i] = '<h1>' + cor[i] + '</h1>'
                }
                if (/">\t[^\t]/.test(cor[i])) {
                    cor[i] = '<h2>' + cor[i] + '</h2>'
                }

                // 準備轉另一個Accelon3的XML的陣列，加入一個內嵌的<有>，頻次檢索時，呈現才不會差一行
                x[i] = m[i].replace(/^([^T]+)T(\d+)n\d+\_p0*(\d+\w)(\d+)/, '<聯 i="taisho?$2p$3\#$4"><有>$1</有></聯>　<聯 i="rdg2011?$2p$3\#$4">校勘版</聯>')
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
                // 僧祇律各卷首的行號，來判斷大小，加入xml號
                if (ZZ < 235110) { k[i] = k[i].replace('_', '_001.xml#') }
                if (235111 < ZZ && ZZ < 242218) { k[i] = k[i].replace('_', '_002.xml#') }
                if (242219 < ZZ && ZZ < 253301) { k[i] = k[i].replace('_', '_003.xml#') }
                if (253302 < ZZ && ZZ < 262112) { k[i] = k[i].replace('_', '_004.xml#') }
                if (262113 < ZZ && ZZ < 271112) { k[i] = k[i].replace('_', '_005.xml#') }
                if (271113 < ZZ && ZZ < 281112) { k[i] = k[i].replace('_', '_006.xml#') }
                if (281113 < ZZ && ZZ < 291109) { k[i] = k[i].replace('_', '_007.xml#') }
                if (291110 < ZZ && ZZ < 300214) { k[i] = k[i].replace('_', '_008.xml#') }
                if (300215 < ZZ && ZZ < 310300) { k[i] = k[i].replace('_', '_009.xml#') }
                if (310301 < ZZ && ZZ < 318220) { k[i] = k[i].replace('_', '_010.xml#') }
                if (318221 < ZZ && ZZ < 324300) { k[i] = k[i].replace('_', '_011.xml#') }
                if (324301 < ZZ && ZZ < 330320) { k[i] = k[i].replace('_', '_012.xml#') }
                if (330321 < ZZ && ZZ < 337215) { k[i] = k[i].replace('_', '_013.xml#') }
                if (337216 < ZZ && ZZ < 344100) { k[i] = k[i].replace('_', '_014.xml#') }
                if (344101 < ZZ && ZZ < 351200) { k[i] = k[i].replace('_', '_015.xml#') }
                if (351201 < ZZ && ZZ < 359203) { k[i] = k[i].replace('_', '_016.xml#') }
                if (359204 < ZZ && ZZ < 367305) { k[i] = k[i].replace('_', '_017.xml#') }
                if (367306 < ZZ && ZZ < 376300) { k[i] = k[i].replace('_', '_018.xml#') }
                if (376301 < ZZ && ZZ < 385220) { k[i] = k[i].replace('_', '_019.xml#') }
                if (385221 < ZZ && ZZ < 394300) { k[i] = k[i].replace('_', '_020.xml#') }
                if (394301 < ZZ && ZZ < 403121) { k[i] = k[i].replace('_', '_021.xml#') }
                if (403122 < ZZ && ZZ < 412216) { k[i] = k[i].replace('_', '_022.xml#') }
                if (412217 < ZZ && ZZ < 419318) { k[i] = k[i].replace('_', '_023.xml#') }
                if (419319 < ZZ && ZZ < 427115) { k[i] = k[i].replace('_', '_024.xml#') }
                if (427116 < ZZ && ZZ < 435100) { k[i] = k[i].replace('_', '_025.xml#') }
                if (435101 < ZZ && ZZ < 443200) { k[i] = k[i].replace('_', '_026.xml#') }
                if (443201 < ZZ && ZZ < 452102) { k[i] = k[i].replace('_', '_027.xml#') }
                if (452103 < ZZ && ZZ < 460200) { k[i] = k[i].replace('_', '_028.xml#') }
                if (460201 < ZZ && ZZ < 467311) { k[i] = k[i].replace('_', '_029.xml#') }
                if (467312 < ZZ && ZZ < 477100) { k[i] = k[i].replace('_', '_030.xml#') }
                if (477101 < ZZ && ZZ < 485213) { k[i] = k[i].replace('_', '_031.xml#') }
                if (485214 < ZZ && ZZ < 493120) { k[i] = k[i].replace('_', '_032.xml#') }
                if (493121 < ZZ && ZZ < 499117) { k[i] = k[i].replace('_', '_033.xml#') }
                if (499118 < ZZ && ZZ < 506311) { k[i] = k[i].replace('_', '_034.xml#') }
                if (506312 < ZZ && ZZ < 514118) { k[i] = k[i].replace('_', '_035.xml#') }
                if (514119 < ZZ && ZZ < 521208) { k[i] = k[i].replace('_', '_036.xml#') }
                if (521209 < ZZ && ZZ < 528105) { k[i] = k[i].replace('_', '_037.xml#') }
                if (528106 < ZZ && ZZ < 535311) { k[i] = k[i].replace('_', '_038.xml#') }
                if (535312 < ZZ && ZZ < 542200) { k[i] = k[i].replace('_', '_039.xml#') }
                if (542201 < ZZ) { k[i] = k[i].replace('_', '_040.xml#') }

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
    k.unshift('<?xml version="1.0" encoding="utf-8"?>\n<html>\n	<head>\n		<meta charset="UTF-8" />\n		<title>本經目次</title>\n	</head>\n<body>\n<nav type="catalog">\n<h1>僧祇律綱目</h1>\n<ol>')

    k.push('</ol>\n</nav>\n<nav type="catalog">\n<h1>目錄</h1>\n<ol>\n	<li><cblink href="XML/T/T22/T22n1425_001.xml#p0227a07">比丘僧戒法</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1425_001.xml#p0227a07">1 四波羅夷法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_001.xml#p0227a07">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_002.xml#p0235a13">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_003.xml#p0242b21">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_004.xml#p0253c04">4</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_005.xml#p0262a19">2 明僧殘戒(十三僧伽婆尸沙法)</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_005.xml#p0262a19">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_006.xml#p0271a15">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_007.xml#p0281a15">3</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_007.xml#p0289c18">3 二不定法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1425_008.xml#p0291a16">4 三十尼薩耆波夜提法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_008.xml#p0291a16">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_009.xml#p0300b17">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_010.xml#p0310c02">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_011.xml#p0318b23">4</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_012.xml#p0324c06">5 單提九十二事法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_012.xml#p0324c06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_013.xml#p0330c23">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_014.xml#p0337b18">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_015.xml#p0344a02">4</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_016.xml#p0351b02">5</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_017.xml#p0359b06">6</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_018.xml#p0367c08">7</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_019.xml#p0376c02">8</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_020.xml#p0385b23">9</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_021.xml#p0394c02">10</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_021.xml#p0396b16">6 四提舍尼</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1425_021.xml#p0399b07">7 眾學法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_021.xml#p0399b07">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_022.xml#p0403a24">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_023.xml#p0412b23">8 雜誦跋渠法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_023.xml#p0412b23">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_024.xml#p0419c21">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_025.xml#p0427a18">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_026.xml#p0435a02">4</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_027.xml#p0443b02">5</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_028.xml#p0452a05">6</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_029.xml#p0460b02">7</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_030.xml#p0467c14">8</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_031.xml#p0477a02">9</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_032.xml#p0485b17">10</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_033.xml#p0493a23">11</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_034.xml#p0499a24">9 威儀法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_034.xml#p0499a24">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_035.xml#p0506c14">2</cblink></li>\n		</ol>\n		</li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1425_036.xml#p0514a25">比丘尼戒法</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1425_036.xml#p0514a25">1 八波羅夷法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1425_036.xml#p0517b29">2 十九僧殘法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_036.xml#p0517b29">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_037.xml#p0521b11">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1425_037.xml#p0524b04">3 三十事</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1425_037.xml#p0527b17">4 一百四十一波夜提法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1425_037.xml#p0527b17">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_038.xml#p0528a08">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_039.xml#p0535c14">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1425_040.xml#p0542b02">4</cblink></li>\n		</ol>\n		</li>\n	</ol>\n	</li>\n</ol>\n</nav>\n<nav type="juan">\n<h1>卷</h1>\n<ol>\n	<li><cblink href="XML/T/T22/T22n1425_001.xml#p0227a03">第一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_002.xml#p0235a13">第二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_003.xml#p0242b21">第三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_004.xml#p0253c04">第四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_005.xml#p0262a15">第五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_006.xml#p0271a15">第六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_007.xml#p0281a15">第七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_008.xml#p0291a12">第八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_009.xml#p0300b17">第九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_010.xml#p0310c02">第十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_011.xml#p0318b23">第十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_012.xml#p0324c02">第十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_013.xml#p0330c23">第十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_014.xml#p0337b18">第十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_015.xml#p0344a02">第十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_016.xml#p0351b02">第十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_017.xml#p0359b06">第十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_018.xml#p0367c08">第十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_019.xml#p0376c02">第十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_020.xml#p0385b23">第二十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_021.xml#p0394c02">第二十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_022.xml#p0403a24">第二十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_023.xml#p0412b19">第二十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_024.xml#p0419c21">第二十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_025.xml#p0427a18">第二十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_026.xml#p0435a02">第二十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_027.xml#p0443b02">第二十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_028.xml#p0452a05">第二十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_029.xml#p0460b02">第二十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_030.xml#p0467c14">第三十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_031.xml#p0477a02">第三十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_032.xml#p0485b17">第三十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_033.xml#p0493a23">第三十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_034.xml#p0499a20">第三十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_035.xml#p0506c14">第三十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_036.xml#p0514a21">第三十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_037.xml#p0521b11">第三十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_038.xml#p0528a08">第三十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_039.xml#p0535c14">第三十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1425_040.xml#p0542b02">第四十</cblink></li>\n</ol>\n</nav>\n</body></html>')
    // 重新轉入物件，刪除空行
    j = k.join('\n').replace(/\n+/g, '\n')

    // 為了重新命名
    // 取得本檔絕對路徑
    var p = path.parse(file)

    // 用相對路徑寫入檔案
    fs.writeFileSync('T1425.xml', j, 'utf8')
    // fs.writeFileSync(p.name + '_ok_T1421.xml', j, 'utf8')
    // fs.writeFileSync(p.name + '_ok.txt', n, 'utf8')
    // fs.writeFileSync(p.name + '_A3_ok.xml', YY, 'utf8')


    // 後2個可以直接寫入檔案
    // 刪除空行
    // var n = "'" + m.join("','").replace(/\,\'\'/g, '') + "'"
    // 讀取v3search.html，後來改為中文檔名
    var index = fs.readFileSync('僧祇律綱目檢索.html', 'utf8')
    // 在陣列中找出「檔名陣列」
    var HH = index.split('\n')
    for (var i = 0; i < HH.length; i++) {
        if (/var ArrLi\s?\=/.test(HH[i])) {
            // 插入陣列，刪除空陣列
            HH[i] = 'var ArrLi = ["' + m.join('","').replace(/\,\"\"/g, '') + '"]'
        }
    }
    // 寫入檔案
    fs.writeFileSync('僧祇律綱目檢索.html', HH.join('\n'), 'utf8')

    // 直接插入Accelon3的標記
    // 若有\，要用\\
    var YY = '<檔 n="v3search.xml">\n<集 c="hidden" l="g,序,分,跋,會,其他,附文,經,other,xu,科判,卷,冊,編,書,章,節,類,篇,項,文,年,詩,著者,詞,人名,問,答,字,頁碼,偏右字,小字,原出處,參考書,期,編目資訊,原書分頁,相應部,藥,方,症,品,細,部畫,本文,標,頁,作者,專欄,問答,部,講,作,史,典,編輯,版本,英標,副標,英,X,圖片,拼音,斜英,面,版,表,大,日期,名,_名,甲,乙,丙,丁,戊,己,庚,辛,壬,癸,子,丑,寅,卯,辰,巳,午,未,申,酉,戌,亥,天,地,玄,黃,宇,宙,洪,荒,日,月,盈,昃,晨,宿,列,張,寒,來,暑,往,秋,收,冬,藏,閏,餘,成,歲,律,呂,調,陽,雲,騰,致,雨,露,結,為,霜,金,生,麗,水,玉,出,崑,崗,劍,號,巨,闕,珠,稱,夜,光,果,珍,李,柰,菜,重,芥,薑,海,鹹,河,淡,鱗,潛,羽,翔,龍,師,火,帝,鳥,官,人,皇,始,制,文,字,乃,服,衣,裳,推,位,讓,國,有,虞,陶,唐.">僧祇律綱目</集>\n<隱><樹 s="*" t="書,章,節,有.">樹狀目錄</樹></隱>\n<隱><樹 s="*有">綱目頻次檢索</樹></隱>\n<隱><樹 s="$有">綱目檢索</樹></隱>\n<隱><引>《$集;\\$有;》：「$_;」</引><摘要頭>$有;</摘要頭><參考資料 n="ency,yinshun,taixu,newest article,vinaya2np,vinaya2,ts lin,ShinMing,yugasidi,yugasidi1,wiki,verse,TXJW,ttctk,thonzu-s,thonzu,Sutanta,sila,panna,paauk,osed,lt,library,lbss,kt,gaya,dic4v33np,dic4v33,dic5v33,dic-china,color,cbeta2011,cbeta2014,age,lbm,gh,ght,aodbs,土觀宗派源流(轉為繁體),卡耐基口才學,印度佛教史(上冊)(平川彰著),和尚與哲學家_佛教與西方思想的對話,松下幸之助用人之道,法音叢書,空海大師傳,空海大師傳(轉為繁體),達摩易筋經,藏傳佛教概說(洛本仁波切),ziyu,pcd,滅苦之道,朱邦復文選,中藥小常識,minlun,chm,尊者阿迦曼傳,念住呼吸,法苑談叢,史念原始佛法,禪話禪畫,中國佛教,土觀宗派源流,弘法大師——空海,五明佛學院淨土,combdict,中華佛學學報,中華佛學研究,藏族英雄格薩爾大王,當代南傳佛教大師,TextProV6使用說明,瑜伽師地論(福嚴授課講義),攝阿毗達摩義論,清淨道論及涅槃的北二高,大史—斯里蘭卡佛教史,菩提道次第書畾,道證法師全集,南傳課誦本性恩編,bhd,cpi,ced,scdt,scd,other,上座部現代譯著,水野弘元著作選集,漢藏佛法百科光碟第二版文摘,戒律書畾,劉墉文選,tzuchi_monthly,taisho,wxzj,yulinpo,miuking,tibetan,ebst,rdg2011,網路讀書會,佛門必備課蓄本,念死無常,死亡無懼,學佛箴言,中醫書畾,中醫書畾1,中國古典醫學大全,cbeta-other2011,西藏生死書,santagavesaka,npt1,yugasidi4,VN,GuangLun,v4search,v5search,samgha_picture,ajm,js dic,zhimin,other2021,BDB2015,四律五論,cixingchao,fezhengqing,lbss-more,india_buddhism_history."/></隱>\n<頁 id="00"/>\n<英文名>Vinaya 3 Search</英文名>\n因為閱讀三大部時，處處需連結到律藏原文，所以乾脆自訂僧祇律綱目，標記CBETA的行首位置，以後寫文章或閱讀時，直接可使用現成的連結點，以便連結到律藏原文\n<書>僧祇律綱目</書>\n' + x.join('\n').replace(/\n+/g, '\n') + '\n</檔>'

    // 直接插入Accelon2017的標記
    // 無法在陣列中刪除，只好轉入另一個物件中，再刪除空行，空行會增加<pb>數
    pus = '<file>\n<article>僧祇律綱目</article>\n' + cor.join('\n').replace(/\n+/g, '\n') + '\n</file>'
    // 重新加入陣列，再重新循環
    cor = pus.split('\n')

    // 加上批次頁碼
    // 預設變量，才能累加頁碼
    var s0 = 0
    // var s1 = 0
    var s2 = 1
    for (var i = 1; i < cor.length; i++) {
        // <pb>不能寫在cor[0]之前，否則「位元組順序記號」 EF BB BF ，會跑到第2行，變成亂碼
        // cor[i] = cor[i] + '<pb n="' + j + '"/>'
        // 先刪除舊的<頁>標記
        cor[i] = cor[i].replace(/<頁 id.+>/, '')
        // 加上頁碼
        if (/<article/.test(cor[i]) || s2 > 1023) {
            s2 = 1
            // s1++
            cor[i] = '<pb n="' + s2 + '"/>\n' + cor[i]
            s0 = i + 30
        }
        if (i == s0) {
            s2++
            cor[i] = '<pb n="' + s2 + '"/>\n' + cor[i]
            s0 = i + 30
        }
    }

    // 寫入檔案 for corpus
    fs.writeFileSync('v3search.txt', cor.join('\n'), 'utf8')

    // 直接插入v4search，整合四分律五分律僧祇律，以便Accelon3搜尋
    var YY4 = '<檔 n="v3search.xml">\n<頁 id="01"/>\n<英文名>Vinaya 3 Search</英文名>\n因為閱讀三大部時，處處需連結到律藏原文，所以乾脆自訂僧祇律綱目，標記CBETA的行首位置，以後寫文章或閱讀時，直接可使用現成的連結點，以便連結到律藏原文\n<書>僧祇律綱目</書>\n' + x.join('\n').replace(/\n+/g, '\n') + '\n</檔>'
    // 讀取v4search.xml
    var V4 = fs.readFileSync('v4search.xml', 'utf8').split('\n')
    // 先刪除舊僧祇律資料
    if (V4.indexOf('<檔 n="v3search.xml">') > 0) {
        // 用陣列的長度來刪除
        V4.length = V4.indexOf('<檔 n="v3search.xml">')
    }
    // 加入僧祇律資料
    V4.push(YY4)

    // 寫入檔案
    fs.writeFileSync('v3search.xml', YY, 'utf8')
    fs.writeFileSync('v4search.xml', V4.join('\n'), 'utf8')

    // 完成時返回通知
    console.log(file + ' is OK')
}

// 套用檔案
addV3OK('v3Index.txt')

// 'test'名字要和time()中的名字保持一致
console.timeEnd('共耗費了')