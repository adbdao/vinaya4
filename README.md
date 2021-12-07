## 四分律五分律等律藏綱目  
#### 四分律綱目，作業時用的軟體及流程  
>> 展示網址 https://adbdao.github.io/vinaya4/  
> 因為閱讀三大部時，處處需連結到律藏原文，所以乾脆自訂四分律綱目，標記CBETA的行首位置，以後寫文章或閱讀時，直接可使用現成的連結點，以便連結到律藏原文  
* 原檔是v開頭的檔案：v4index.txt、v4.txt。  
* 使用node.js的檔案：v4.js、v4ok.js。  
* 成果是轉換出三種檔：CBreader的toc的T1428.xml、 四分律綱目檢索.html、 Accelon3的v4search.xml  
>##### 五分律亦然  
>* 直接用四分律的v4.txt來作標記，這樣戒條名相相同，比較好搜尋、比對    
>* 所以只需v5index.txt、 v5ok.js。一樣可轉換出三種檔  
  
### 下載方法：  
幾年前，本來想用TEI5的xml標記《四分律》，分類歸納戒律名詞，來幫助學習戒律，但TEI5的xml標記太複雜、太費人力、太難維護！  
後來閱讀《三大部》時，想到作一個連結原文的綜合綱目，不也是一樣嘛！就用40天完成《四分律綱目》，其實就是一個樹狀目錄而已！  
https://drive.google.com/drive/u/0/folders/13CjFXUassdCKPtt3rXQnIfX-vxteq09f  
1 下載"T1428.xml"，加入cbreader2018以後版本中  
複製到你安裝的路徑，一般是：C:\CBETA\CBReader2X\Bookcase\CBETA\toc\T  
取代原來的檔案。  
開啟cbreader2018，在「到」輸入經號1428，或者搜尋「四分律」，即可看見新的目錄。  
> 但此目錄無法檢索，所以請用下面的方法：  
  
2 下載"四分律綱目檢索.html"，先輸入關鍵字查詢。再點選條目，會自動複製「行首資訊」位置。再開啟CBReader貼上，連結到經文位置。  
> 就是多了一個手動貼上「行首資訊」的動作  
>* 點選文字，可直接連結到CBETAonline。(2021年底新增)  
  
3 下載"v4search.adb"，Accelon3包含以上兩種功能，放入你的Accelon3資料夾中，  
> 但同一目錄中，要有taisho.adb或rdg2011.adb兩個《大正藏》的adb檔，才能連結到經文！  
  
---  
#### Git常用指令  
* 刪除上一次推送。出問題時，使用此命令  
git remote rm origin  
  
* 一次進行：加入與提交  
git commit -a -m "first commit"  
或者  
git commit -am "first commit"  
  
* 將這次提交，合併到上一次提交  
git commit --amend --no-edit  
合并上一次提交（用于反复修改）  
git commit --amend -m 'xxx'  
  
---  
#### Git基本起始指令  
1. echo "# mycoding" >> README.md  
git init  
git add README.md  
git commit -m "first commit"  
git remote add origin https://github.com/adbdao/vinaya4.git  
git push -u origin master  
  
2. 直接拉取  
git clone https://github.com/adbdao/vinaya4.git  
git remote add origin https://github.com/adbdao/vinaya4.git  
git push -u origin master  
  
---  
#### 如何告訴 git 縮寫的指令  
git config alias.co checkout  
查看所有指令  
git config --list  