# 🎨 徽章设计指南 — AI 生成提示词手册

> 日期：2026-02-14
> 用途：Charles 用 AI 生成徽章图标时的参考手册
> 关联文档：[成就系统 v2](ACHIEVEMENT-DESIGN-v2.md)

---

## 一、文件规范

### 存放位置
```
cosmelon/docs/badges/
```

### 命名规则
```
{系列前缀}{编号}-{英文短名}.png
```

示例：
- `S1-three-day-streak.png`
- `F5-focus-legend.png`
- `H3-golden-arrival.png`
- `G4-galaxy-conqueror.png`
- `X2-valentine-melon.png`

### 文件要求
- 格式：PNG
- 背景：透明
- 尺寸：512 × 512 px（正方形，app 内会缩放到 64/48/32px，大图保证清晰度）
- 色彩模式：sRGB
- 形状：圆形图标（内容在圆形区域内，圆外透明）

---

## 二、基础提示词（所有徽章通用）

每个徽章生成时，先粘贴这段基础提示词，再接上具体徽章的提示词。

```
A circular badge icon, 512x512px, transparent background.
Style: cartoon, rounded, cute, textured — similar to Duolingo achievement badges or Apple Watch activity awards.
The badge has a subtle 3D feel with soft shadows and highlights.
Only ONE core visual element in the center, keep it simple and readable at small sizes.
No text on the badge. No letters, no numbers, no words.
The icon should look good on both dark and light backgrounds.
```

---

## 三、系列基础色调

每个系列的徽章在基础提示词后加上系列色调：

```
⭐️ 坚持系列：Warm orange color scheme (#FF8C42), with calendar/chain/flame visual elements.
⏱️ 专注系列：Watermelon red color scheme (#FF3B5C), with clock/timer/fire visual elements.
🏠 瓜棚系列：Watermelon green color scheme (#4CAF50), with watermelon/plant/harvest visual elements.
🌱 农场系列：Earthy brown color scheme (#8D6E63), with soil/farm/seedling visual elements.
🌟 隐藏系列：Gold-to-purple gradient color scheme (#FFD700 to #9C27B0), with mysterious/sparkle visual elements.
```

---

## 四、每个徽章的具体提示词

### ⭐️ 坚持系列（10个）

| 文件名 | 提示词（接在基础提示词 + 系列色调后面） |
|--------|--------------------------------------|
| S1-three-day-streak.png | Three small flames in a row, representing a 3-day streak. Warm and encouraging feeling. |
| S2-week-warrior.png | A mini calendar page showing 7 days, all checked with orange checkmarks. Neat and satisfying. |
| S3-fortnight-focus.png | A half-moon shape made of chain links, symbolizing 14 days of persistence. Sturdy and warm. |
| S4-iron-will.png | A metallic shield with iron texture, glowing warm orange edges. Strong and determined. |
| S5-century-legend.png | A golden trophy with the number "100" subtly embedded in its design. Grand and legendary. |
| S6-hundred-days.png | A warm glowing sun with radiating rays, symbolizing 100 days of companionship. Cozy and bright. |
| S7-early-bird.png | A cute small bird perched on a branch with a sunrise in the background. Fresh morning colors with orange tint. |
| S8-night-owl.png | A cute owl with big round eyes sitting on a branch, crescent moon behind. Night sky with warm orange accents. |
| S9-weekend-warrior.png | A small sword crossed with a shield, decorated with "SAT/SUN" calendar motif. Playful warrior vibe. |
| S10-year-one.png | A birthday cake with a single watermelon-slice candle on top, celebration sparkles around it. Milestone feeling. |

### ⏱️ 专注系列（10个）

| 文件名 | 提示词 |
|--------|--------|
| F1-first-melon.png | A single small cute watermelon with a tiny sprout on top, glowing softly. First achievement feeling, fresh and new. |
| F2-focus-rookie.png | A simple clock face showing "1h" with a small watermelon vine wrapping around it. Beginner energy. |
| F3-focus-pro.png | A clock with small stars orbiting around it, watermelon red glow. Growing confidence. |
| F4-focus-master.png | A royal crown sitting on top of a clock, rich red and gold tones. Mastery achieved. |
| F5-focus-legend.png | A golden glowing clock radiating light beams outward, epic and legendary aura. Bright red and gold. |
| F6-time-lord.png | An hourglass with watermelon vines growing around it, sand glowing golden. Timeless and majestic. |
| F7-deep-dive.png | A cute diving mask with air bubbles floating upward, deep blue-red gradient. Underwater exploration feeling. |
| F8-marathon-runner.png | A pair of running shoes crossing a finish line ribbon, motion lines behind. Energetic and triumphant. |
| F9-ten-a-day.png | A pile of 10 tiny cute watermelons stacked together, overflowing abundance. Joyful harvest feeling. |
| F10-project-pro.png | A checklist with all items checked off and a gold star at the top. Organized and accomplished. |

### 🏠 瓜棚系列（10个）

| 文件名 | 提示词 |
|--------|--------|
| H1-first-harvest.png | A single seed just sprouting with a tiny green leaf, sitting in rich soil. New beginning, hopeful. |
| H2-full-garden.png | Five different plant growth stages arranged in a row (sprout, seedling, flower, small melon, big watermelon). Colorful garden. |
| H3-golden-arrival.png | A golden watermelon glowing with divine light rays, sparkles around it. Rare and precious moment. |
| H4-golden-collector.png | Five golden watermelons arranged in a crown formation, rich golden glow. Collector's pride. |
| H5-warehouse-tycoon.png | A cute wooden shed/barn overflowing with watermelons spilling out the door. Abundance and wealth. |
| H6-first-synthesis.png | Two small items merging into one bigger glowing item, with an upward arrow. Transformation magic. |
| H7-synthesis-master.png | An alchemy flask bubbling with green liquid, a watermelon floating inside. Mad scientist energy, fun. |
| H8-first-slice.png | A watermelon being sliced open with a satisfying cut, juice splashing. Fresh and crisp. |
| H9-hundred-slices.png | A chef's knife with watermelon juice on the blade, surrounded by perfectly cut watermelon pieces. Master slicer. |
| H10-tool-collector.png | A toolbox/chest open showing various colorful tools and items inside. Collector's treasure chest. |

### 🌱 农场系列（8个）

| 文件名 | 提示词 |
|--------|--------|
| G1-first-planting.png | A hand gently placing a seed into a small hole in brown soil, warm earthy tones. Tender and hopeful. |
| G2-first-farm-harvest.png | A ripe watermelon being picked from a vine, with a satisfied sparkle. Earthy brown and green. |
| G3-hundred-plants.png | A lush green farm field stretching into the distance with many watermelon plants, brown earth visible. Abundant oasis. |
| G4-galaxy-conqueror.png | A planet/globe with a watermelon pattern, a small flag planted on top. Space exploration meets farming. |
| G5-codex-master.png | An open book/codex with watermelon illustrations on its pages, glowing with completion light. Encyclopedia feeling. |
| G6-alien-friend.png | A cute green alien with big eyes waving hello, holding a small watermelon as a gift. Friendly and quirky. |
| G7-thief-buster.png | A cage trap with a caught purple masked creature inside, looking defeated. Victorious defense. |
| G8-evergreen-farm.png | A thriving farm plot with lush green vines and healthy watermelons, a "30" calendar icon subtly in corner. Vitality and consistency. |

### 🌟 隐藏/彩蛋系列（6个）

| 文件名 | 提示词 |
|--------|--------|
| X1-time-traveler.png | A swirling time vortex/portal with a clock melting into it, gold and purple gradient. Mysterious and surreal. |
| X2-valentine-melon.png | A heart-shaped watermelon with a cute bow on top, pink sparkles. Sweet and romantic. |
| X3-sound-explorer.png | A pair of headphones with colorful music notes floating out, gold-purple gradient. Playful and musical. |
| X4-perfectionist.png | A flawless diamond with 5 small stars orbiting around it, brilliant gold-purple shine. Perfection achieved. |
| X5-all-rounder.png | Three interconnected circles (red, green, brown) forming a triangle, with a star in the center. Unity and completeness. |
| X6-midnight-gardener.png | A small watermelon plant glowing in moonlight, stars in dark sky above, a tiny lantern beside it. Peaceful and secret. |

---

## 五、生成后检查清单

生成每个徽章后，请确认：
- [ ] 512 × 512 px
- [ ] PNG 格式
- [ ] 背景透明（不是白色背景）
- [ ] 圆形构图（主要内容在圆形区域内）
- [ ] 没有文字/字母/数字出现在图上
- [ ] 在深色和浅色背景下都能看清
- [ ] 文件名正确（按上面的命名规则）
- [ ] 放在 `docs/badges/` 文件夹下
