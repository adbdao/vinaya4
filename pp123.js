// 導入模組
var fs = require('fs')
var path = require('path')

// 配合timeEnd()成對出現。 打印出代碼執行的時間
console.time('共耗費了')

// cbeta的xml一卷一個，所以要計算標記行，在第幾卷
// 設定共用函數
function pp123(file) {
    // 讀取index的檔案，並導入陣列
    var g = fs.readFileSync(file, 'utf8')
        // 先刪除空行，但不可以直接用\s+轉\n
        // .replace(/\s+/g, '\n')
        .replace(/ +/g, '')
        .replace(/[\n\r]+/g, '\n')
        .split('\n')

    var k = [], m = [], x = [], ZZ = [], PP1, PP2, PP3, cor = [], pus, AA = '', BB, CC

    // 用for of來轉換二維陣列都失敗，可能在node.js中，都必須用最原始的for循環，及最簡單的正規式
    // 轉換內容
    for (var i = 0; i < g.length; i++) {
        // 找出每卷最後的文字
        if (/【中華電子佛典協會資料庫版權宣告】/.test(g[i])) {
            if (g[i + 1]) {
                // 先取出行首資訊
                k[i] = g[i + 1].substring(0, (g[i + 1].indexOf('║')))

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
                // 用push才不會多出很多空陣列
                m.push(Number(PP1 + PP2 + PP3))
            }
        }
    }

    // 加入我要的內容
    for (var i = 0; i < m.length - 1; i++) {
        // 計算前面要補幾個0，要除去第1行的特例，及i從0開始，所以i+2
        CC = String(i + 2).length
        for (var j = 0; j < (3 - CC); j++) {
            AA = '0' + AA
        }

        ZZ[i] = "if (" + String(m[i]) + " < ZZ && ZZ < " + String(m[i + 1] - 1) + ") { k[i] = k[i].replace('_', '_" + AA + String(i + 2) + ".xml#') }"

        // 補上第1行及最末行的特例
        if (i == m.length - 2) {
            ZZ.push("if (" + String(m[i + 1]) + " < ZZ) { k[i] = k[i].replace('_', '_" + AA + String(i + 3) + ".xml#') }")
            ZZ.unshift("if (ZZ < " + String(m[0] - 1) + ") { k[i] = k[i].replace('_', '_001.xml#') }")
        }
        AA = ''
    }
    // 五分律各卷首的行號，來判斷大小，加入xml號
    // if (ZZ < 7118) { k[i] = k[i].replace('_', '_001.xml#') }
    // if (7119 < ZZ && ZZ < 14220) { k[i] = k[i].replace('_', '_002.xml#') }
    // if (190210 < ZZ) { k[i] = k[i].replace('_', '_030.xml#') }

    // 寫入檔案
    fs.writeFileSync('ppOK.txt', ZZ.join('\n'), 'utf8')

    // 完成時返回通知
    console.log(file + ' is OK')
}

// 套用檔案
pp123('v3Index.txt')

// 'test'名字要和time()中的名字保持一致
console.timeEnd('共耗費了')