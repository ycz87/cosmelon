# E-001-T11 第9轮差异清单（终版）

更新时间：2026-02-27 07:23 UTC
commit: `2e2741f`

## 已收敛项
- 成熟态已恢复并稳定为 **4瓜组**（桌面/移动一致），不再出现“2瓜+占位”回退。
- 移动端主农场主体已上移并放大，较上一轮明显压缩下半区留白，首屏聚焦增强。
- 底角配景已再放大并贴边处理，切边感较上一轮增强。
- 桌面/移动标注对比图已重生成，产物链路完整可复核。

## 未收敛项（含改法）
| 未收敛项 | 具体改法 |
| --- | --- |
| 移动端底部仍存在少量视觉空场（非黑边） | 下一轮将继续下调 `sceneBottomPadding`（约 10%）并提升底部地块纵向占比（`gridAutoRows` +3%~5%）。 |
| 桌面端底角配景在当前截图窗口中仍偏弱 | 对桌面分档单独增大底角配景（md 断点再 +12%~15%），并进一步向边缘外溢以强化切边。 |
| 与参考图相比地块“方正厚实感”仍可提升 | 将土壤床高度与内凹土层对比再小幅提高（bedHeight +4%~6%，inner soil 阴影加深）。 |

## 本轮改动文件
- `src/components/FarmPage.tsx`
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`

## 验证命令
- `npm run build`
- `npm run compare:e001-t11`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t11-r9b --commit-dirty=true`
