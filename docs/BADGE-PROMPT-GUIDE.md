# 🎨 徽章设计指南 — AI 生成提示词手册

> 日期：2026-02-14（v5 定稿版）
> 工具：Google Gemini 3 Pro Image Preview
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

### 文件要求
- 格式：JPG（生成后手动抠图转 PNG）
- 背景：白色
- 尺寸：512 × 512 px
- 形状：圆形图标

---

## 二、设计风格

### 整体风格
- 卡通徽章，伪 3D 效果（柔和阴影、微微光泽、圆润立体感）
- 构图要美观、有设计感，能传达每个成就的含义和故事
- 色彩明快清新，饱和度适中，颜色根据徽章主题自由搭配
- 所有物体颜色符合现实常识（西瓜籽棕色/黑色，果肉红/粉，瓜皮绿）

### 西瓜拟人元素
徽章中出现的西瓜/西瓜瓣带有拟人表情（跟 app logo 一致）：
- 两个小圆点黑色眼睛 + 一条浅浅的微笑弧线
- 可选：淡淡粉色腮红
- 参考 asamimichan 风格 — 安静、温柔、不夸张
- 注意：只有西瓜元素带这种表情，徽章的其他部分（场景、道具、背景）正常设计，不要全部 asamimichan 化

---

## 三、通用提示词（每个徽章前面都加这段）

```
A beautifully designed cartoon achievement badge icon on a clean white background. Pseudo-3D style with soft rounded shapes, gentle shadows, and a glossy feel. The overall illustration style should be like asamimichan (あさみみちゃん) — soft, warm, gentle, with a dreamy cute atmosphere. The badge must be highly creative and cleverly incorporate watermelon elements (rind, flesh, seeds, slices, vines, leaves) into the scene in unexpected and delightful ways. Any watermelon in the scene has a personified face: two small round black dot eyes and a gentle subtle smile, optionally with faint pink blush cheeks. Only the watermelon has this face — other elements are drawn normally. Colors should be fresh, vibrant, and cheerful, freely chosen to match the badge theme. All object colors must be realistic (watermelon seeds are brown/black, flesh is red/pink, rind is green). No text, no letters, no numbers. Clean composition, easy to recognize at small sizes.
```

---

## 四、系列色调提示（加在通用提示词后面）

```
⭐️ 坚持系列：Warm orange-gold accent tones. Feeling of persistence and warmth.
⏱️ 专注系列：Watermelon red as the dominant accent. Feeling of energy and focus.
🏠 瓜棚系列：Fresh watermelon green as the dominant color. Feeling of growth and abundance.
🌱 农场系列：Earthy warm brown mixed with green. Feeling of nurturing and harvest.
🌟 隐藏系列：Gold and soft purple sparkle accents. Feeling of mystery and discovery.
```

---

## 五、每个徽章的提示词

每条提示词接在「通用提示词 + 系列色调」后面。

### ⭐️ 坚持系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| S1-three-day-streak.png | 三天打鱼 | Three watermelon slices used as stepping stones floating upward like a staircase, each slice with a cute asamimichan face. The top slice has a small warm flame made of watermelon-red and orange. Soft golden glow behind. |
| S2-week-warrior.png | 一周达人 | A mini weekly calendar where each of the 7 day cells is a watermelon slice cross-section. Completed days show the red flesh side, the last day glows golden. The calendar frame is made of watermelon rind. |
| S3-fortnight-focus.png | 半月坚持 | A chain where each link is a watermelon seed shape, curving in a strong semicircle. The center seed-link glows golden. Tiny watermelon vines weave between the links, symbolizing growth through persistence. |
| S4-iron-will.png | 钢铁意志 | A shield where the surface is a watermelon cross-section — green rind border, white ring, red flesh center with brown seeds arranged like a clock face. Two clock hands cross behind the shield. Powerful yet cute. |
| S5-century-legend.png | 百日传说 | A golden trophy cup where the bowl is a hollowed watermelon half (green rind outside, glowing gold inside). Watermelon vine handles on each side. Sparkles and tiny golden seeds rise like fireworks from the cup. |
| S6-hundred-days.png | 累计百天 | A sunrise where the sun is a whole watermelon (asamimichan smile) rising over a horizon made of watermelon slices. Warm orange-pink rays spread outward. Tiny watermelon seeds float in the sky like birds. |
| S7-early-bird.png | 早起鸟 | A cute bird whose body is shaped like a watermelon (green back, red belly with seed spots). It perches on a branch made of watermelon vine, with morning dew drops on leaves. Soft pastel sunrise behind. |
| S8-night-owl.png | 夜猫子 | A cute owl whose round belly is a watermelon cross-section (green feather rim, red center with seeds). It sits on a crescent moon. The moon is pale yellow, stars twinkle in deep blue-purple sky. Peaceful night. |
| S9-weekend-warrior.png | 周末战士 | A watermelon slice standing upright like a warrior (asamimichan face), wearing a tiny headband made of watermelon vine. It holds a miniature clock as a shield. Energetic pose with cute motion lines. |
| S10-year-one.png | 西瓜元年 | A whole watermelon as a birthday cake — watermelon rind as the cake body, a single candle on top whose flame is shaped like a tiny watermelon leaf. Confetti made of watermelon seeds and tiny vine curls. The watermelon has a happy asamimichan face. |

### ⏱️ 专注系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| F1-first-melon.png | 第一颗西瓜 | A tiny baby watermelon (asamimichan shy smile) sitting in a small nest made of watermelon leaves. A single green sprout with two leaves grows from its top. Soft warm glow around it like a newborn. Tender, hopeful. |
| F2-focus-rookie.png | 专注新手 | A watermelon cross-section used as a clock face — green rind rim, red flesh face, brown seeds as hour markers, two vine-shaped clock hands. A tiny sprout grows from the top of the clock. The face has an eager asamimichan expression. |
| F3-focus-pro.png | 专注达人 | A watermelon-clock (cross-section as clock face) with three golden stars orbiting it. The clock hands are made of watermelon vines. A confident asamimichan wink on the watermelon face. Subtle red energy trail behind the hands. |
| F4-focus-master.png | 专注大师 | A watermelon-clock wearing a crown made of intertwined watermelon vines with tiny golden watermelon seeds as jewels. The clock has a proud asamimichan expression. Royal red glow behind. |
| F5-focus-legend.png | 专注传奇 | A watermelon-clock radiating golden light. All the seeds on the clock face have turned to gold. The vine clock hands glow with light. An epic golden aura of watermelon leaves surrounds it. Serene asamimichan expression. |
| F6-time-lord.png | 时间领主 | An hourglass where both bulbs are watermelon halves (green rind frame, red interior). Tiny golden watermelon seeds flow between the halves as sand. Watermelon vines elegantly wrap around the hourglass frame like ornate decoration. |
| F7-deep-dive.png | 深度潜水 | A watermelon slice (asamimichan excited face) wearing a diving mask made of watermelon rind. Underwater scene — bubbles are tiny watermelon seeds floating upward. Small fish shaped like watermelon seeds swim by. Deep blue tones. |
| F8-marathon-runner.png | 马拉松选手 | A watermelon slice character (asamimichan face) with tiny running shoes made of watermelon rind, breaking through a finish line ribbon. The ribbon is a watermelon vine. Speed lines behind. Tiny sweat drop. Triumphant and fun. |
| F9-ten-a-day.png | 日产十瓜 | A pyramid of 10 tiny watermelons stacked up, each with a different asamimichan expression. The top one wears a crown of watermelon leaves. They sit on a bed of watermelon vines. Abundant, joyful harvest feeling. |
| F10-project-pro.png | 项目达人 | A clipboard where the board is a watermelon slice (green rind edge, red surface). The clip at top is a watermelon vine curl. Five task lines with watermelon-seed checkboxes, all checked in gold. A golden watermelon seed star at top. |

### 🏠 瓜棚系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| H1-first-harvest.png | 初次收获 | A watermelon seed cracking open in rich brown soil, the crack glowing with warm red light (like watermelon flesh inside). A tiny bright green sprout pushes through. Above, a faint translucent watermelon silhouette shows its future. Hopeful, tender. |
| H2-full-garden.png | 满园春色 | Five watermelon growth stages in a gentle arc: a seed, a sprout, a flower with watermelon-pattern petals, a small melon, and a big watermelon. Each stage with a progressively happier asamimichan face. Connected by a flowing watermelon vine. |
| H3-golden-arrival.png | 金瓜降临 | A golden watermelon (asamimichan amazed face) descending from above on a beam of golden light. Its rind pattern shimmers in gold. Golden watermelon seeds orbit around it like a halo. Sacred, precious moment. |
| H4-golden-collector.png | 金瓜收藏家 | Five golden watermelons arranged on a display shelf made of watermelon vines. Each has a content asamimichan face. The shelf is decorated with golden watermelon leaves. Rich warm glow. Collector's pride. |
| H5-warehouse-tycoon.png | 仓库大亨 | A charming shed whose roof is a giant watermelon slice (green rind top, red underside). The walls are made of stacked watermelon rinds. The door bursts open with watermelons of all sizes tumbling out. Overflowing abundance. |
| H6-first-synthesis.png | 合成初体验 | Two small watermelons (asamimichan faces) spinning toward each other with sparkle trails made of watermelon seeds. In the center where they meet, a bigger glowing watermelon forms. Magical green vine energy swirls around. |
| H7-synthesis-master.png | 合成大师 | An alchemy flask shaped like a watermelon (green glass body with rind pattern). Inside, bubbling red liquid with a golden watermelon (asamimichan face) floating and glowing. Watermelon vine tendrils as the flask stand. |
| H8-first-slice.png | 第一刀 | A watermelon being sliced — two halves separating with a satisfying splash of red juice. The juice droplets are shaped like tiny hearts. Brown seeds fly outward. Both halves have surprised asamimichan faces. Dynamic, juicy. |
| H9-hundred-slices.png | 切瓜百刀 | A chef's knife whose blade reflects watermelon red. The handle is wrapped in watermelon vine. Around it, perfectly cut watermelon pieces arranged in a beautiful flower pattern. Brown seeds scattered artfully. Masterful. |
| H10-tool-collector.png | 道具全收集 | A treasure chest made of watermelon rind (green with darker stripe pattern). The chest lid is a watermelon slice. It's open, revealing colorful glowing tools nestled among watermelon seeds. Golden light spills out. Wonder and discovery. |

### 🌱 农场系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| G1-first-planting.png | 播种者 | A gentle hand placing a glowing watermelon seed into soil. The seed glows red like watermelon flesh inside. A tiny watering can shaped like a watermelon sits nearby. Warm afternoon light. Tender gardening moment. |
| G2-first-farm-harvest.png | 第一次丰收 | A ripe watermelon (happy asamimichan face) being lifted from its vine with a sparkle burst. The vine forms a heart shape around the watermelon. Lush green leaves frame the scene. Joyful harvest. |
| G3-hundred-plants.png | 种植百株 | A bird's-eye view of a miniature farm where the planted rows form a watermelon slice pattern (wedge shape, with seed-like dots in rows). Tiny watermelons visible among green leaves. Creative aerial view. |
| G4-galaxy-conqueror.png | 星系征服者 | A small planet that IS a watermelon — green rind continents, red flesh oceans, brown seed mountains. A tiny flag with a watermelon-clock symbol planted on top. Stars and watermelon-seed-shaped asteroids orbit around. Cosmic adventure. |
| G5-codex-master.png | 图鉴大师 | An open book whose pages are watermelon slices (red pages with seed-like illustrations). Beautiful watermelon variety drawings on each page. The book cover is watermelon rind green. A golden glow of completion. Knowledge and wonder. |
| G6-alien-friend.png | 外星人之友 | A cute small green alien offering a watermelon (asamimichan face) as a gift. The alien's spaceship in the background is shaped like a watermelon seed. The alien wears a necklace with a tiny watermelon-clock pendant. Friendly encounter. |
| G7-thief-buster.png | 瓜贼克星 | A cage trap made of woven watermelon vines with a caught comically defeated raccoon inside. A watermelon guard (asamimichan smug face, tiny vine arms crossed) stands proudly next to it. The cage lock is a watermelon seed. Victory! |
| G8-evergreen-farm.png | 不枯之田 | A peaceful circular farm plot where watermelon vines spiral inward like a mandala. Healthy watermelons at various stages, all with sleeping asamimichan faces. Warm golden sunset. Fireflies that look like tiny glowing watermelon seeds. Eternal peace. |

### 🌟 隐藏系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| X1-time-traveler.png | 时间旅行者 | A swirling time vortex made of watermelon vine spirals in purple-gold. A watermelon-clock (asamimichan surprised face) is being pulled into the center. Tiny clock gears shaped like watermelon seeds float in the vortex. Mysterious, surreal. |
| X2-valentine-melon.png | 情人节西瓜 | A watermelon naturally grown in a perfect heart shape (green rind heart, a small cut reveals red flesh). A pink bow made of watermelon vine on top. The watermelon has a blushing asamimichan face. Tiny hearts shaped like watermelon seeds float around. Romantic. |
| X3-sound-explorer.png | 音效探索家 | Over-ear headphones where each ear cup is a watermelon half (green outside, red inside with brown seeds). The headband is a watermelon vine. Colorful music notes flow out, some notes shaped like watermelon seeds. Vibrant, musical, playful. |
| X4-perfectionist.png | 完美主义者 | A watermelon cut into a perfect geometric diamond/gem shape — green rind facets and red flesh facets alternating precisely. It floats and refracts light. Five golden watermelon seeds orbit it like electrons. Flawless, precious, brilliant. |
| X5-all-rounder.png | 全能玩家 | Three overlapping translucent circles — red (with a tiny clock inside), green (with a tiny watermelon shed inside), brown (with a tiny sprout inside). Where all three overlap, a golden watermelon seed star glows. Unity and mastery. |
| X6-midnight-gardener.png | 午夜园丁 | A small watermelon plant with one tiny glowing watermelon (peaceful sleeping asamimichan face). A lantern next to it is made from a hollowed watermelon (light shining through carved seed-shaped holes). Dark starry sky, crescent moon, fireflies. Secret midnight garden. |

---

## 六、生成技巧

1. 每次只生成一个徽章
2. 如果太复杂 → 加 "Simpler composition, fewer details, keep it clean and readable."
3. 如果不够美观 → 加 "Make it more visually polished and aesthetically pleasing, like a professional app badge."
4. 如果颜色不协调 → 加 "Fresh, cheerful, harmonious color palette."
5. 如果出现文字 → 加 "Absolutely no text or letters anywhere."
6. 如果西瓜表情太夸张 → 加 "The watermelon face should be very subtle: just two tiny dot eyes and a gentle smile curve, asamimichan style — quiet and warm."
7. 如果西瓜表情缺失 → 加 "The watermelon must have a cute personified face: two small dot eyes and a gentle smile."

## 七、生成后检查清单

- [ ] 512 × 512 px
- [ ] 白色背景（后期抠图）
- [ ] 构图美观，能传达成就含义
- [ ] 没有文字/字母/数字
- [ ] 西瓜元素带 asamimichan 拟人表情
- [ ] 其他元素正常设计，不全部拟人化
- [ ] 物体颜色符合现实（西瓜籽棕/黑色等）
- [ ] 色彩明快清新
- [ ] 缩小到 48px 仍能辨认主体
- [ ] 文件名正确，放在 `docs/badges/`
