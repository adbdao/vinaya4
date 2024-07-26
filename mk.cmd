node v4ok.js
node v5ok.js
node v3ok.js

copy T1428.xml C:\CBReader2X\Bookcase\CBETA\toc\T
copy T1421.xml C:\CBReader2X\Bookcase\CBETA\toc\T
copy T1425.xml C:\CBReader2X\Bookcase\CBETA\toc\T

move v4search.txt D:\GitHub\v4search-corpus
move v5search.txt D:\GitHub\v4search-corpus
move v3search.txt D:\GitHub\v4search-corpus

cd /d D:\GitHub\v4search-corpus
node gen.js
git commit -am "add v3search && update COR"
git push

cd /d D:\GitHub\vinaya4
node dir.js
git add .
git commit -am "mk v3ok v4ok v5ok to CBreader && mk COR && mk ADB"
git push


copy v4search.xml D:\F\Accelon3\aodbs
cd /d D:\F\Accelon3\aodbs
start indexer.exe

