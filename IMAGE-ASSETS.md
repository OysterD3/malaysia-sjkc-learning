# 图片素材清单（替换 emoji 用）

给 ChatGPT 生成图片用。建议风格统一：

> **统一风格提示词（每张都加在前面）：**
> "Simple flat **outline line-art** icon for a 6–7 year-old children's learning app. Bold, clean strokes, minimal detail, friendly and cute, centered, **transparent background**, no text, no shadow. Subject: ___"

输出建议：**PNG（透明背景，512×512）**，或 SVG 更好。文件放到 `public/icons/`。

---

## 需要的图片（去重后 ~22 张）

| 文件名 | 代表 | 主体提示词（接在统一风格后） |
|---|---|---|
| `tiger.png` | 老虎 | a cute tiger face/body with stripes |
| `banana.png` | 香蕉 | a single curved banana |
| `bee.png` | 蜜蜂 | a honey bee |
| `moon.png` | 月亮 | a crescent moon |
| `swan.png` | 天鹅 | a swan floating on water |
| `ant.png` | 蚂蚁 | an ant |
| `cat.png` | 猫 | a sitting cat |
| `tree.png` | 树 | a single leafy tree |
| `mountain.png` | 大山 | a mountain |
| `tooth.png` | 牙齿 | a tooth |
| `photo.png` | 相片 | a framed photo / picture frame |
| `rain.png` | 雨 / 下雨 | a cloud with raindrops |
| `book.png` | 读书 | an open book |
| `rice.png` | 吃饭 | a bowl of rice with chopsticks |
| `blocks.png` | 积木 | stacked toy building blocks |
| `umbrella.png` | 一个小孩打伞回家 | ONE child walking home with an umbrella in the rain |
| `piano.png` | 上音乐课 | a piano / keyboard with a music note |
| `toycar.png` | 玩玩具车 | a child playing with a toy car |
| `sunrise.png` | 早上日出 | a sunrise over the horizon |
| `watering.png` | 浇花 | a child watering a flower with a watering can |
| `slide.png` | 游乐场玩滑梯 | children playing on a playground slide |
| `lineup-food.png` | 排队打饭 | children lining up with lunch trays |

> 量词题里「一群天鹅」「一群蜜蜂」如果想体现「群」，可以另外生成 `swan-group.png`（3 只天鹅）和 `bee-group.png`（3 只蜜蜂）；否则沿用单只 + 题目文字「一群」也行。

---

## 各题用到哪张图

### G 看图选词（图里是什么？选词）
1. `tiger.png` → 老虎
2. `banana.png` → 香蕉
3. `bee.png` → 蜜蜂
4. `moon.png` → 月亮
5. `swan.png` → 天鹅
6. `ant.png` → 蚂蚁

### H 填量词（一 ___ ？）
1. `cat.png` → 一（只）猫
2. `swan.png` ×3 / `swan-group.png` → 一（群）天鹅
3. `tree.png` → 一（棵）树
4. `mountain.png` → 一（座）大山
5. `tooth.png` → 一（颗）牙
6. `photo.png` → 一（张）相片
7. `bee.png` ×3 / `bee-group.png` → 一（群）蜜蜂

### I 句子连图（图 ↔ 句子配对）
**第 1 组**
- `ant.png` → 小蚂蚁搬小虫。
- `bee.png` → 小蜜蜂飞到花园。
- `rain.png` → 雨停了，天更蓝了。
- `banana.png` → 香蕉弯弯像滑梯。
- `swan.png` → 一群天鹅在游水。

**第 2 组**
- `book.png` → 我们一起读书写字。
- `moon.png` → 天上有星星和月亮。
- `rice.png` → 全家开心吃晚饭。
- `blocks.png` → 我跟妹妹搭积木。

### J 看图完成句子
1. `umbrella.png` → 下雨了，______ →「我打着伞走路回家。」（图里是一个小孩）
2. `piano.png` → 上音乐课时，______ →「老师教同学们唱歌。」
3. `toycar.png` → 在客厅里，______ →「弟弟在玩玩具车。」
4. `sunrise.png` → 早上，______ →「太阳出来了，红红的。」

### K 看图写话
1. `watering.png`（小女孩浇花）→ 点出所有对的句子：她在浇花 / 花儿很美丽 / 她很开心（错：下雪、小狗睡觉、鱼在天上飞）
2. `slide.png`（小朋友在游乐场）→ 他们在游乐场 / 大家玩得很开心 / 他们在玩滑梯（错：全家吃晚饭、蜜蜂采花蜜）
3. `lineup-food.png`（排队打饭）→ 最适合开头：「下课了，大家排队打饭。」

---

## 拿到图片之后

把 PNG/SVG 放进 `public/icons/`，告诉我，我来：
1. 在题目数据里把 emoji 换成图片引用（加一个 `image` 字段）；
2. 改 quiz 组件（选择题 / 连线 / 看图写话）让它显示图片而不是 emoji。
