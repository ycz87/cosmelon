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
A beautifully designed cartoon achievement badge icon on a clean white background. Pseudo-3D style with soft rounded shapes, gentle shadows, and a glossy feel. The badge should look polished and visually appealing, clearly conveying the achievement's meaning through its composition. Any watermelon or watermelon slice in the scene has a cute personified face: two small round black dot eyes and a gentle subtle smile (like asamimichan — quiet and warm, not exaggerated), optionally with faint pink blush. Only the watermelon has this face — other elements are drawn normally. Colors should be fresh, vibrant, and cheerful, freely chosen to match the badge theme. All object colors must be realistic (watermelon seeds are brown/black, flesh is red/pink, rind is green). No text, no letters, no numbers. Clean composition, easy to recognize at small sizes.
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
| S1-three-day-streak.png | 三天打鱼 | Three watermelon slices arranged like stepping stones going upward, each with a cute asamimichan face. A small warm flame floats above the top slice. Background has a soft orange glow suggesting momentum. |
| S2-week-warrior.png | 一周达人 | A cute mini weekly calendar (7 columns) made of light wood. Each day has a small watermelon seed as a checkmark. The 7th day's seed is golden and slightly larger. Warm, accomplished feeling. |
| S3-fortnight-focus.png | 半月坚持 | A strong chain made of watermelon-green links curving in a semicircle. The center link glows golden, symbolizing the unbroken streak. Subtle sparkles around the glowing link. |
| S4-iron-will.png | 钢铁意志 | A sturdy cute shield — the outer frame is dark watermelon green, the center shows a red watermelon heart shape. Two small clock hands cross behind the shield like a crest. Powerful yet adorable. |
| S5-century-legend.png | 百日传说 | A magnificent golden trophy cup. The cup's bowl is shaped like a watermelon half (green outside, golden inside). Sparkles and tiny stars rise from the cup. Grand, legendary atmosphere. |
| S6-hundred-days.png | 累计百天 | A warm sunrise scene. The rising sun is a watermelon cross-section with an asamimichan smile. Soft orange and pink rays spread outward. Clouds below are fluffy and peaceful. |
| S7-early-bird.png | 早起鸟 | A cute round robin bird (orange breast) perched on a watermelon slice branch. Behind them, a soft pastel sunrise (peach and lavender). The watermelon slice has a sleepy-but-happy asamimichan face. Morning dew drops. |
| S8-night-owl.png | 夜猫子 | A cute round owl with big gentle eyes sitting on top of a whole watermelon. The watermelon has a peaceful asamimichan sleeping face. A crescent moon and stars in a deep blue-purple sky behind them. |
| S9-weekend-warrior.png | 周末战士 | A round watermelon character (asamimichan face) wearing a tiny colorful headband, standing in a confident pose with tiny fists raised. Energetic motion lines around it. Fun, spirited vibe. |
| S10-year-one.png | 西瓜元年 | A whole watermelon styled as a birthday cake on a small plate. One lit candle on top shaped like the number 1. Colorful confetti and tiny party flags around. The watermelon has a happy asamimichan face. Celebration mood. |

### ⏱️ 专注系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| F1-first-melon.png | 第一颗西瓜 | A single tiny baby watermelon sitting on a small mound of brown soil. It has a shy asamimichan smile and a small green sprout with two leaves on top. A faint warm glow around it. Tender, hopeful feeling. |
| F2-focus-rookie.png | 专注新手 | A small watermelon-clock (green rim, red face with brown seeds, clock hands) with a tiny green sprout growing from the top. The clock face has an eager asamimichan expression. Beginner energy. |
| F3-focus-pro.png | 专注达人 | A watermelon-clock with a confident asamimichan wink. Three small golden stars orbit around it in a circular path. The clock hands leave a subtle red energy trail. Upward angle, heroic feel. |
| F4-focus-master.png | 专注大师 | A watermelon-clock wearing a small elegant golden crown with tiny red gems. The clock has a proud asamimichan expression. A soft royal red glow behind. Regal and cute. |
| F5-focus-legend.png | 专注传奇 | A watermelon-clock radiating golden light beams. The seeds have turned golden. An epic golden aura surrounds it. The face shows a serene, powerful asamimichan expression. Legendary, divine lighting. |
| F6-time-lord.png | 时间领主 | An elegant hourglass where the glass bulbs are watermelon halves (green rind frame, red interior). Tiny golden seeds flow between the halves as sand. Delicate watermelon vines wrap around the frame. Timeless and majestic. |
| F7-deep-dive.png | 深度潜水 | A cute round watermelon (asamimichan face) wearing an oversized diving mask. Underwater scene with blue-tinted lighting, rising bubbles, and tiny fish. The watermelon looks excited behind the mask. Deep ocean blue tones. |
| F8-marathon-runner.png | 马拉松选手 | A round watermelon character (asamimichan face) with tiny red running shoes, mid-stride breaking through a finish line ribbon. Speed lines behind. Triumphant expression with a tiny sweat drop. Dynamic and fun. |
| F9-ten-a-day.png | 日产十瓜 | A cheerful pyramid stack of 10 tiny watermelons, each with a slightly different asamimichan expression (happy, sleepy, surprised). The top watermelon wears a tiny golden crown. Abundant, joyful feeling. |
| F10-project-pro.png | 项目达人 | A clipboard made of light wood with a green watermelon-rind clip at top. Five task lines with watermelon-seed checkboxes, all checked in gold. A small gold star at the top. Organized, accomplished feeling. |

### 🏠 瓜棚系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| H1-first-harvest.png | 初次收获 | A watermelon seed cracking open in rich brown soil, a tiny bright green sprout pushing through. A soft golden light shines down. Above, a faint translucent watermelon silhouette hints at what it will become. Hopeful, tender. |
| H2-full-garden.png | 满园春色 | Five watermelon growth stages arranged in a gentle arc: seed, sprout, flower, small melon, big watermelon. Each watermelon stage has a progressively happier asamimichan face. Green grassy ground. Beautiful progression. |
| H3-golden-arrival.png | 金瓜降临 | A golden watermelon descending from above with divine light rays behind it. The golden watermelon has an amazed asamimichan face. Golden sparkle particles surround it. Sacred, precious moment. |
| H4-golden-collector.png | 金瓜收藏家 | Five golden watermelons arranged in a proud arc formation, each with a content asamimichan face. They sit on a red velvet cushion. Rich golden glow. Collector's pride, luxurious feeling. |
| H5-warehouse-tycoon.png | 仓库大亨 | A charming wooden shed (瓜棚) with a watermelon-slice-shaped roof (green top, red underside). The door is open and watermelons of various sizes tumble out abundantly. Overflowing harvest feeling. |
| H6-first-synthesis.png | 合成初体验 | Two small watermelons (asamimichan faces) floating toward each other with sparkle trails, merging into one bigger glowing watermelon in the center. Magical green glow, transformation energy. |
| H7-synthesis-master.png | 合成大师 | A round-bottom glass alchemy flask filled with bubbling green liquid. A golden watermelon (asamimichan face) floats inside, glowing. Watermelon vine tendrils wrap around the flask. Magical scientist energy. |
| H8-first-slice.png | 第一刀 | A watermelon being sliced open at the moment of the cut — two halves separating with a satisfying splash of red juice and flying brown seeds. Both halves have surprised asamimichan faces. Dynamic, juicy moment. |
| H9-hundred-slices.png | 切瓜百刀 | A master chef's knife standing upright, blade gleaming. Around it, perfectly cut watermelon pieces arranged in a beautiful fan pattern. Brown seeds scattered artfully. Professional, masterful composition. |
| H10-tool-collector.png | 道具全收集 | A treasure chest made of watermelon rind (green with darker stripes). The chest is open, revealing colorful glowing items inside (stars, potions, seeds). Golden light spills out. Discovery and wonder. |

### 🌱 农场系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| G1-first-planting.png | 播种者 | A gentle hand placing a glowing watermelon seed into a small hole in brown tilled soil. A tiny watering can sits nearby. Warm afternoon light. Tender, hopeful gardening moment. |
| G2-first-farm-harvest.png | 第一次丰收 | A ripe watermelon (happy asamimichan face) being lifted from its vine with a sparkle burst. Lush green vine and leaves frame the scene. Brown soil below. Joyful harvest moment. |
| G3-hundred-plants.png | 种植百株 | A bird's-eye view of a lush miniature watermelon farm with neat green rows stretching into the distance. Tiny watermelons visible among leaves. Brown earth paths between rows. Thriving, abundant oasis. |
| G4-galaxy-conqueror.png | 星系征服者 | A small planet with watermelon texture (green continents on red surface). A tiny flag with a clock symbol planted on top. Stars and space dust surround it. Adventurous, cosmic feeling. |
| G5-codex-master.png | 图鉴大师 | An open leather-bound book with beautiful watermelon variety illustrations on its pages. The book glows with golden completion light. A magnifying glass rests on one page. Knowledge and discovery. |
| G6-alien-friend.png | 外星人之友 | A cute small green alien (big round eyes, tiny body) waving hello, holding a small watermelon (asamimichan face) as a gift. The alien wears a tiny clock pendant. Friendly, quirky encounter. |
| G7-thief-buster.png | 瓜贼克星 | A wooden cage trap made of vines with a caught comically defeated purple raccoon inside. A small watermelon guard (asamimichan face, tiny arms crossed) stands next to it looking smug. Victory scene. |
| G8-evergreen-farm.png | 不枯之田 | A peaceful farm plot with lush watermelon vines bearing healthy watermelons, all with content sleeping asamimichan faces. Warm golden sunset behind. Fireflies float above. Eternal garden peace. |

### 🌟 隐藏系列

| 文件名 | 中文名 | 提示词 |
|--------|--------|--------|
| X1-time-traveler.png | 时间旅行者 | A swirling purple-gold time vortex spiral. A watermelon-clock (asamimichan face, surprised) is being pulled into the center, clock hands spinning. Sparkle particles and tiny clock gears float in the vortex. Mysterious, surreal. |
| X2-valentine-melon.png | 情人节西瓜 | A watermelon naturally grown in a perfect heart shape. Green rind with a small section cut to reveal red flesh. A cute pink bow on top. The watermelon has a blushing asamimichan face with tiny hearts floating around. Romantic and sweet. |
| X3-sound-explorer.png | 音效探索家 | A pair of over-ear headphones where each ear cup is a watermelon half (green outside, red inside with brown seeds). Colorful music notes and sound waves flow out from the headphones. Vibrant, musical, playful. |
| X4-perfectionist.png | 完美主义者 | A watermelon cut into a perfect geometric diamond shape with precise facets — green and red facets alternating. It floats with 5 small golden stars orbiting it. Brilliant prismatic light refractions. Flawless, precious. |
| X5-all-rounder.png | 全能玩家 | Three overlapping translucent circles — red (clock/timer), green (watermelon/shed), brown (soil/farm). Where all three overlap in the center, a golden star glows brightly. Unity, completeness, mastery. |
| X6-midnight-gardener.png | 午夜园丁 | A small watermelon plant with one tiny glowing watermelon (peaceful sleeping asamimichan face). A cute lantern sits beside it. Dark purple starry sky with crescent moon above. Fireflies dot the scene. Secret midnight garden. |

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
