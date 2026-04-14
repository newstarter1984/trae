#!/bin/bash

# 获取当前时间（格式：YYYY-MM-DD HH:MM:SS）
CURRENT_TIME=$(date "+%Y-%m-%d %H:%M:%S")

# 更新app.js中的时间戳
sed -i '' "s|const deployTime = '.*'|const deployTime = '$CURRENT_TIME'|g" app.js

# 获取当前版本号
OLD_VERSION=$(grep -Eo "app.js\?v=[0-9]+" index.html | head -1 | grep -Eo "[0-9]+")
NEW_VERSION=$((OLD_VERSION + 1))

# 更新index.html中的版本号
sed -i '' "s|style.css\?v=[0-9]*|style.css?v=$NEW_VERSION|g" index.html
sed -i '' "s|app.js\?v=[0-9]*|app.js?v=$NEW_VERSION|g" index.html

echo "✅ 已更新版本号至 v$NEW_VERSION"
echo "✅ 已更新时间戳至 $CURRENT_TIME"
echo ""

# 提交并推送
git add app.js index.html
git commit -m "⏰ 自动部署 - $CURRENT_TIME"
git push

git checkout gh-pages
git merge main -m "Merge main"
git push
git checkout main

echo ""
echo "🎉 部署完成！"
