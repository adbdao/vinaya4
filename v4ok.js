// 導入模組
var fs = require('fs')
var path = require('path')

// 配合timeEnd()成對出現。 打印出代碼執行的時間
console.time('共耗費了')

// 標記好的檔案，轉為cbreader的xml目錄、html網頁檔、Accelon3的XML檔、Accelon2017的cor檔。以便閱讀、搜尋
// 設定共用函數
function addV4OK(file) {
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
                m[i] = k[i] = k[i].replace(/鉢/g, '缽').replace(/徧/g, '遍').replace(/麁/g, '粗').replace(/磔/g, '搩').replace(/虫/g, '蟲').replace(/污/g, '汙').replace(/靺/g, '襪').replace(/偷羅遮/g, '偷蘭遮')


                // T22n1421_p0001a03║彌沙塞部和醯五分律卷第一
                // <聯 i="taisho?22p6b#06">
                // 五分律T22n1421_p0006a25
                // <k to="taisho@1p1c0500-05">彌沙塞部和</k>

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
                // 四分律各卷首的行號，來判斷大小，加入xml號
                if (ZZ < 575303) { k[i] = k[i].replace(/\_/, '_001.xml#') }
                if (575304 < ZZ && ZZ < 581125) { k[i] = k[i].replace(/\_/, '_002.xml#') }
                if (581201 < ZZ && ZZ < 588104) { k[i] = k[i].replace(/\_/, '_003.xml#') }
                if (588105 < ZZ && ZZ < 594228) { k[i] = k[i].replace(/\_/, '_004.xml#') }
                if (594301 < ZZ && ZZ < 601224) { k[i] = k[i].replace(/\_/, '_005.xml#') }
                if (601301 < ZZ && ZZ < 608113) { k[i] = k[i].replace(/\_/, '_006.xml#') }
                if (608114 < ZZ && ZZ < 614322) { k[i] = k[i].replace(/\_/, '_007.xml#') }
                if (615101 < ZZ && ZZ < 621224) { k[i] = k[i].replace(/\_/, '_008.xml#') }
                if (621301 < ZZ && ZZ < 626310) { k[i] = k[i].replace(/\_/, '_009.xml#') }
                if (626311 < ZZ && ZZ < 634101) { k[i] = k[i].replace(/\_/, '_010.xml#') }
                if (634102 < ZZ && ZZ < 641226) { k[i] = k[i].replace(/\_/, '_011.xml#') }
                if (641301 < ZZ && ZZ < 649304) { k[i] = k[i].replace(/\_/, '_012.xml#') }
                if (649305 < ZZ && ZZ < 657206) { k[i] = k[i].replace(/\_/, '_013.xml#') }
                if (657207 < ZZ && ZZ < 663210) { k[i] = k[i].replace(/\_/, '_014.xml#') }
                if (663211 < ZZ && ZZ < 670203) { k[i] = k[i].replace(/\_/, '_015.xml#') }
                if (671101 < ZZ && ZZ < 677316) { k[i] = k[i].replace(/\_/, '_016.xml#') }
                if (677317 < ZZ && ZZ < 685124) { k[i] = k[i].replace(/\_/, '_017.xml#') }
                if (685201 < ZZ && ZZ < 692303) { k[i] = k[i].replace(/\_/, '_018.xml#') }
                if (692304 < ZZ && ZZ < 699310) { k[i] = k[i].replace(/\_/, '_019.xml#') }
                if (699311 < ZZ && ZZ < 707124) { k[i] = k[i].replace(/\_/, '_020.xml#') }
                if (707201 < ZZ && ZZ < 713329) { k[i] = k[i].replace(/\_/, '_021.xml#') }
                if (714101 < ZZ && ZZ < 721201) { k[i] = k[i].replace(/\_/, '_022.xml#') }
                if (721202 < ZZ && ZZ < 728219) { k[i] = k[i].replace(/\_/, '_023.xml#') }
                if (728220 < ZZ && ZZ < 735308) { k[i] = k[i].replace(/\_/, '_024.xml#') }
                if (735309 < ZZ && ZZ < 743112) { k[i] = k[i].replace(/\_/, '_025.xml#') }
                if (743113 < ZZ && ZZ < 750121) { k[i] = k[i].replace(/\_/, '_026.xml#') }
                if (750122 < ZZ && ZZ < 757304) { k[i] = k[i].replace(/\_/, '_027.xml#') }
                if (757305 < ZZ && ZZ < 764312) { k[i] = k[i].replace(/\_/, '_028.xml#') }
                if (764313 < ZZ && ZZ < 771123) { k[i] = k[i].replace(/\_/, '_029.xml#') }
                if (771201 < ZZ && ZZ < 778213) { k[i] = k[i].replace(/\_/, '_030.xml#') }
                if (779101 < ZZ && ZZ < 786312) { k[i] = k[i].replace(/\_/, '_031.xml#') }
                if (786313 < ZZ && ZZ < 794306) { k[i] = k[i].replace(/\_/, '_032.xml#') }
                if (794307 < ZZ && ZZ < 803119) { k[i] = k[i].replace(/\_/, '_033.xml#') }
                if (803120 < ZZ && ZZ < 812215) { k[i] = k[i].replace(/\_/, '_034.xml#') }
                if (812216 < ZZ && ZZ < 821203) { k[i] = k[i].replace(/\_/, '_035.xml#') }
                if (821204 < ZZ && ZZ < 830124) { k[i] = k[i].replace(/\_/, '_036.xml#') }
                if (830201 < ZZ && ZZ < 837312) { k[i] = k[i].replace(/\_/, '_037.xml#') }
                if (837313 < ZZ && ZZ < 845129) { k[i] = k[i].replace(/\_/, '_038.xml#') }
                if (845201 < ZZ && ZZ < 851323) { k[i] = k[i].replace(/\_/, '_039.xml#') }
                if (852101 < ZZ && ZZ < 859204) { k[i] = k[i].replace(/\_/, '_040.xml#') }
                if (859205 < ZZ && ZZ < 866223) { k[i] = k[i].replace(/\_/, '_041.xml#') }
                if (866301 < ZZ && ZZ < 874224) { k[i] = k[i].replace(/\_/, '_042.xml#') }
                if (874301 < ZZ && ZZ < 885107) { k[i] = k[i].replace(/\_/, '_043.xml#') }
                if (885108 < ZZ && ZZ < 893326) { k[i] = k[i].replace(/\_/, '_044.xml#') }
                if (894101 < ZZ && ZZ < 903320) { k[i] = k[i].replace(/\_/, '_045.xml#') }
                if (904101 < ZZ && ZZ < 913311) { k[i] = k[i].replace(/\_/, '_046.xml#') }
                if (913312 < ZZ && ZZ < 920116) { k[i] = k[i].replace(/\_/, '_047.xml#') }
                if (920117 < ZZ && ZZ < 927322) { k[i] = k[i].replace(/\_/, '_048.xml#') }
                if (928101 < ZZ && ZZ < 936217) { k[i] = k[i].replace(/\_/, '_049.xml#') }
                if (936218 < ZZ && ZZ < 944101) { k[i] = k[i].replace(/\_/, '_050.xml#') }
                if (944102 < ZZ && ZZ < 951205) { k[i] = k[i].replace(/\_/, '_051.xml#') }
                if (951206 < ZZ && ZZ < 958310) { k[i] = k[i].replace(/\_/, '_052.xml#') }
                if (958311 < ZZ && ZZ < 966111) { k[i] = k[i].replace(/\_/, '_053.xml#') }
                if (966112 < ZZ && ZZ < 971303) { k[i] = k[i].replace(/\_/, '_054.xml#') }
                if (971304 < ZZ && ZZ < 978314) { k[i] = k[i].replace(/\_/, '_055.xml#') }
                if (978315 < ZZ && ZZ < 986218) { k[i] = k[i].replace(/\_/, '_056.xml#') }
                if (986219 < ZZ && ZZ < 994112) { k[i] = k[i].replace(/\_/, '_057.xml#') }
                if (994113 < ZZ && ZZ < 1001313) { k[i] = k[i].replace(/\_/, '_058.xml#') }
                if (1001314 < ZZ && ZZ < 1008202) { k[i] = k[i].replace(/\_/, '_059.xml#') }
                if (1008203 < ZZ) { k[i] = k[i].replace(/\_/, '_060.xml#') }

                // 加上cbreader2019的目錄標記
                k[i] = k[i].replace(/^(\s*)([^T]+)(T.+$)/, '$1<li><cblink href="XML/T/T22/$3">$2</cblink></li>')
            }
        }
        // 跳過無標記的行之後，就不需要下面這項 刪除無標記的行 的工作
        // 刪除無標記的行，刪除不要的行
        // if (/^[T\-【]/.test(k[i])) {
        //     k[i] = ''
        //     // 測試：是否有此不必要的行，結果，只有a1存在，不知何因？
        //     // console.log('a1')
        // }
        // if (/^\s+$/.test(k[i])) {
        //     k[i] = ''
        //     console.log('a2')
        // }
        // if (/^[T\-【]/.test(m[i])) {
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
    k.unshift('<?xml version="1.0" encoding="utf-8"?>\n<html>\n	<head>\n		<meta charset="UTF-8" />\n		<title>本經目次</title>\n	</head>\n<body>\n<nav type="catalog">\n<h1>四分律綱目</h1>\n<ol>')
    k.push('</ol>\n</nav>\n<nav type="catalog">\n<h1>目錄</h1>\n<ol>\n	<li><cblink href="XML/T/T22/T22n1428_001.xml#p0567a03">序</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_001.xml#p0567b26">初分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1428_001.xml#p0568c06">1 四波羅夷法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_001.xml#p0568c06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_002.xml#p0575c06">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_002.xml#p0579a10">2 十三僧殘法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_002.xml#p0579a10">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_003.xml#p0581b02">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_004.xml#p0588a07">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_005.xml#p0594c02">4</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_005.xml#p0600b08">3 二不定法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_006.xml#p0601c06">4 三十捨墮法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_006.xml#p0601c06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_007.xml#p0608a16">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_008.xml#p0615a02">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_009.xml#p0621c02">4</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_010.xml#p0626c12">5</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_011.xml#p0634a08">5 九十單提法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_011.xml#p0634a08">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_012.xml#p0641c02">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_013.xml#p0649c07">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_014.xml#p0657b09">4</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_015.xml#p0663b13">5</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_016.xml#p0671a02">6</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_017.xml#p0677c19">7</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_018.xml#p0685b02">8</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_019.xml#p0692c06">9</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_019.xml#p0695c16">6 四提舍尼法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_019.xml#p0698a07">7 式叉迦羅尼法(百眾學法)</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_019.xml#p0698a07">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_020.xml#p0699c13">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_021.xml#p0707b02">3</cblink></li>\n		</ol>\n		</li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1428_022.xml#p0714a06">第二分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1428_022.xml#p0714a06">1 尼戒法八波羅夷法</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_022.xml#p0718b01">2 尼戒法十七僧殘法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_022.xml#p0718b01">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_023.xml#p0721b04">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_023.xml#p0727b29">3 尼戒法三十捨墮法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_023.xml#p0727b29">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_024.xml#p0728b24">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_024.xml#p0734c06">4 尼戒法一百七十八單提法</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_024.xml#p0734c06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_025.xml#p0735c11">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_026.xml#p0743a15">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_027.xml#p0750a24">4</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_028.xml#p0757c07">5</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_029.xml#p0764c14">6</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_030.xml#p0771b02">7</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_031.xml#p0779a06">5 受戒揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_031.xml#p0779a06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_032.xml#p0786c15">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_033.xml#p0794c09">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_034.xml#p0803a22">4</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_035.xml#p0812b18">5</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_035.xml#p0816c05">6 說戒揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_035.xml#p0816c05">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_036.xml#p0821b06">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_037.xml#p0830b06">7 安居揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_037.xml#p0835c12">8 自恣揵度上</cblink></li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1428_038.xml#p0837c19">第三分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1428_038.xml#p0837c19">1 自恣揵度下</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_038.xml#p0843b11">2 皮革揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_038.xml#p0843b11">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_039.xml#p0845b02">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_039.xml#p0849b10">3 衣揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_039.xml#p0849b10">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_040.xml#p0852a03">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_041.xml#p0859b07">3</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_042.xml#p0866c07">4 藥揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_042.xml#p0866c07">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_043.xml#p0874c03">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_043.xml#p0877c05">5 迦絺那衣揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_043.xml#p0879b23">6 拘睒彌揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_044.xml#p0885a14">7 瞻波揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_044.xml#p0889a13">8 呵責揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_044.xml#p0889a13">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_045.xml#p0894a03">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_045.xml#p0896b25">9 人揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_046.xml#p0904a06">10 覆藏揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_046.xml#p0906a09">11 遮揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_046.xml#p0909b07">12 破僧揵度</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_047.xml#p0913c18">13 滅諍揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_047.xml#p0913c18">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_048.xml#p0920a19">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_048.xml#p0922c06">14 比丘尼揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_048.xml#p0922c06">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_049.xml#p0928a02">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_049.xml#p0930c06">15 法揵度</cblink></li>\n	</ol>\n	</li>\n	<li><cblink href="XML/T/T22/T22n1428_050.xml#p0936b24">第四分</cblink>\n	<ol>\n		<li><cblink href="XML/T/T22/T22n1428_050.xml#p0936b24">1 房舍揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_050.xml#p0936b24">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_051.xml#p0944a04">2</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_051.xml#p0945a20">2 雜揵度</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_051.xml#p0945a20">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_052.xml#p0951b08">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_053.xml#p0958c13">3</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_054.xml#p0966a18">3 集法毘尼五百人</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_054.xml#p0968c18">4 七百集法毘尼</cblink></li>\n		<li><cblink href="XML/T/T22/T22n1428_055.xml#p0971c10">5 調部</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_055.xml#p0971c10">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_056.xml#p0978c17">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_057.xml#p0986b21">3</cblink></li>\n		</ol>\n		</li>\n		<li><cblink href="XML/T/T22/T22n1428_057.xml#p0990b08">6 毘尼增一</cblink>\n		<ol>\n			<li><cblink href="XML/T/T22/T22n1428_057.xml#p0990b08">1</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_058.xml#p0994a15">2</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_059.xml#p1001c16">3</cblink></li>\n			<li><cblink href="XML/T/T22/T22n1428_060.xml#p1008b05">4</cblink></li>\n		</ol>\n		</li>\n	</ol>\n	</li>\n</ol>\n</nav>\n<nav type="juan">\n<h1>卷</h1>\n<ol>\n	<li><cblink href="XML/T/T22/T22n1428_001.xml#p0567b22">第一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_002.xml#p0575c06">第二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_003.xml#p0581b02">第三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_004.xml#p0588a07">第四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_005.xml#p0594c02">第五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_006.xml#p0601c02">第六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_007.xml#p0608a16">第七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_008.xml#p0615a02">第八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_009.xml#p0621c02">第九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_010.xml#p0626c12">第十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_011.xml#p0634a04">第十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_012.xml#p0641c02">第十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_013.xml#p0649c07">第十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_014.xml#p0657b09">第十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_015.xml#p0663b13">第十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_016.xml#p0671a02">第十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_017.xml#p0677c19">第十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_018.xml#p0685b02">第十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_019.xml#p0692c06">第十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_020.xml#p0699c13">第二十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_021.xml#p0707b02">第二十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_022.xml#p0714a02">第二十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_023.xml#p0721b04">第二十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_024.xml#p0728b24">第二十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_025.xml#p0735c11">第二十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_026.xml#p0743a15">第二十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_027.xml#p0750a24">第二十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_028.xml#p0757c07">第二十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_029.xml#p0764c14">第二十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_030.xml#p0771b02">第三十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_031.xml#p0779a02">第三十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_032.xml#p0786c15">第三十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_033.xml#p0794c09">第三十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_034.xml#p0803a22">第三十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_035.xml#p0812b18">第三十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_036.xml#p0821b06">第三十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_037.xml#p0830b02">第三十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_038.xml#p0837c15">第三十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_039.xml#p0845b02">第三十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_040.xml#p0852a03">第四十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_041.xml#p0859b07">第四十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_042.xml#p0866c03">第四十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_043.xml#p0874c03">第四十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_044.xml#p0885a10">第四十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_045.xml#p0894a03">第四十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_046.xml#p0904a02">第四十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_047.xml#p0913c14">第四十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_048.xml#p0920a19">第四十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_049.xml#p0928a02">第四十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_050.xml#p0936b20">第五十</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_051.xml#p0944a04">第五十一</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_052.xml#p0951b08">第五十二</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_053.xml#p0958c13">第五十三</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_054.xml#p0966a14">第五十四</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_055.xml#p0971c06">第五十五</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_056.xml#p0978c17">第五十六</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_057.xml#p0986b21">第五十七</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_058.xml#p0994a15">第五十八</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_059.xml#p1001c16">第五十九</cblink></li>\n	<li><cblink href="XML/T/T22/T22n1428_060.xml#p1008b05">第六十</cblink></li>\n</ol>\n</nav>\n</body></html>')
    // 重新轉入物件，刪除空行
    j = k.join('\n').replace(/\n+/g, '\n')

    // 為了重新命名
    // 取得本檔絕對路徑
    var p = path.parse(file)

    // 用相對路徑寫入檔案
    fs.writeFileSync('T1428.xml', j, 'utf8')
    // fs.writeFileSync(p.name + '_ok_T1428.xml', j, 'utf8')
    // fs.writeFileSync(p.name + '_ok.txt', n, 'utf8')
    // fs.writeFileSync(p.name + '_A3_ok.xml', YY, 'utf8')


    // 後2個可以直接寫入檔案
    // 刪除空行
    // var n = "'" + m.join("','").replace(/\,\'\'/g, '') + "'"
    // 讀取v4search.html，後來改為中文檔名
    var index = fs.readFileSync('四分律綱目檢索.html', 'utf8')
    // 在陣列中找出「檔名陣列」
    var HH = index.split('\n')
    for (var i = 0; i < HH.length; i++) {
        if (/var ArrLi\s?\=/.test(HH[i])) {
            // 插入陣列，刪除空陣列
            HH[i] = 'var ArrLi = ["' + m.join('","').replace(/\,\"\"/g, '') + '"]'
        }
    }
    // 寫入檔案
    fs.writeFileSync('四分律綱目檢索.html', HH.join('\n'), 'utf8')

    // 直接插入Accelon3的標記
    // 若有\，要用\\
    var YY = '<檔 n="v4search.xml">\n<集 c="hidden" l="g,序,分,跋,會,其他,附文,經,other,xu,科判,卷,冊,編,書,章,節,類,篇,項,文,年,詩,著者,詞,人名,問,答,字,頁碼,偏右字,小字,原出處,參考書,期,編目資訊,原書分頁,相應部,藥,方,症,品,細,部畫,本文,標,頁,作者,專欄,問答,部,講,作,史,典,編輯,版本,英標,副標,英,X,圖片,拼音,斜英,面,版,表,大,日期,名,_名,甲,乙,丙,丁,戊,己,庚,辛,壬,癸,子,丑,寅,卯,辰,巳,午,未,申,酉,戌,亥,天,地,玄,黃,宇,宙,洪,荒,日,月,盈,昃,晨,宿,列,張,寒,來,暑,往,秋,收,冬,藏,閏,餘,成,歲,律,呂,調,陽,雲,騰,致,雨,露,結,為,霜,金,生,麗,水,玉,出,崑,崗,劍,號,巨,闕,珠,稱,夜,光,果,珍,李,柰,菜,重,芥,薑,海,鹹,河,淡,鱗,潛,羽,翔,龍,師,火,帝,鳥,官,人,皇,始,制,文,字,乃,服,衣,裳,推,位,讓,國,有,虞,陶,唐.">四分律綱目</集>\n<隱><樹 s="*" t="書,章,節,有.">樹狀目錄</樹></隱>\n<隱><樹 s="*有">綱目頻次檢索</樹></隱>\n<隱><樹 s="$有">綱目檢索</樹></隱>\n<隱><引>《$集;\\$有;》：「$_;」</引><摘要頭>$有;</摘要頭><參考資料 n="ency,yinshun,taixu,newest article,vinaya2np,vinaya2,ts lin,ShinMing,yugasidi,yugasidi1,wiki,verse,TXJW,ttctk,thonzu-s,thonzu,Sutanta,sila,panna,paauk,osed,lt,library,lbss,kt,gaya,dic4v33np,dic4v33,dic5v33,dic-china,color,cbeta2011,cbeta2014,age,lbm,gh,ght,aodbs,土觀宗派源流(轉為繁體),卡耐基口才學,印度佛教史(上冊)(平川彰著),和尚與哲學家_佛教與西方思想的對話,松下幸之助用人之道,法音叢書,空海大師傳,空海大師傳(轉為繁體),達摩易筋經,藏傳佛教概說(洛本仁波切),ziyu,pcd,滅苦之道,朱邦復文選,中藥小常識,minlun,chm,尊者阿迦曼傳,念住呼吸,法苑談叢,史念原始佛法,禪話禪畫,中國佛教,土觀宗派源流,弘法大師——空海,五明佛學院淨土,combdict,中華佛學學報,中華佛學研究,藏族英雄格薩爾大王,當代南傳佛教大師,TextProV6使用說明,瑜伽師地論(福嚴授課講義),攝阿毗達摩義論,清淨道論及涅槃的北二高,大史—斯里蘭卡佛教史,菩提道次第書畾,道證法師全集,南傳課誦本性恩編,bhd,cpi,ced,scdt,scd,other,上座部現代譯著,水野弘元著作選集,漢藏佛法百科光碟第二版文摘,戒律書畾,劉墉文選,tzuchi_monthly,taisho,wxzj,yulinpo,miuking,tibetan,ebst,rdg2011,網路讀書會,佛門必備課蓄本,念死無常,死亡無懼,學佛箴言,中醫書畾,中醫書畾1,中國古典醫學大全,cbeta-other2011,西藏生死書,santagavesaka,npt1,yugasidi4,VN,GuangLun,v4search,v5search."/></隱>\n<頁 id="00"/>\n<英文名>Vinaya 4 Search</英文名>\n因為閱讀三大部時，處處需連結到律藏原文，所以乾脆自訂四分律綱目，標記CBETA的行首位置，以後寫文章或閱讀時，直接可使用現成的連結點，以便連結到律藏原文\n<書>四分律綱目</書>\n' + x.join('\n').replace(/\n+/g, '\n') + '\n</檔>'
    // 寫入檔案
    fs.writeFileSync('v4search.xml', YY, 'utf8')

    // 直接插入Accelon2017的標記
    // 無法在陣列中刪除，只好轉入另一個物件中，再刪除空行，空行會增加<pb>數
    pus = '<file>\n<article>四分律綱目</article>\n' + cor.join('\n').replace(/\n+/g, '\n') + '\n</file>'
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
    fs.writeFileSync('v4search.txt', cor.join('\n'), 'utf8')

    // 完成時返回通知
    console.log(file + ' is OK')
}

// 套用檔案
addV4OK('v4Index.txt')
// addV4OK('v4Index1.txt')

// 'test'名字要和time()中的名字保持一致
console.timeEnd('共耗費了')