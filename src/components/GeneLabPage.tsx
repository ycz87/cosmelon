/**
 * GeneLabPage — 基因实验室背包页面
 *
 * 按星系分组展示已收集的基因片段，支持折叠展开查看每个星系的片段明细。
 */
import { useMemo, useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../i18n';
import type { GeneInventory } from '../types/gene';
import { GALAXIES, VARIETY_DEFS, RARITY_COLOR, RARITY_STARS } from '../types/farm';
import type { GalaxyId } from '../types/farm';

interface GeneLabPageProps {
  geneInventory: GeneInventory;
}

type GeneFragmentItem = GeneInventory['fragments'][number];

interface GalaxyFragmentGroup {
  galaxyId: GalaxyId;
  galaxyEmoji: string;
  fragments: GeneFragmentItem[];
}

export function GeneLabPage({ geneInventory }: GeneLabPageProps) {
  const theme = useTheme();
  const t = useI18n();
  const [expandedGalaxyIds, setExpandedGalaxyIds] = useState<Set<GalaxyId>>(() => new Set());

  const totalFragments = geneInventory.fragments.length;

  const galaxyGroups = useMemo<GalaxyFragmentGroup[]>(() => {
    const fragmentsByGalaxy = new Map<GalaxyId, GeneFragmentItem[]>();

    geneInventory.fragments.forEach((fragment) => {
      const existing = fragmentsByGalaxy.get(fragment.galaxyId);
      if (existing) {
        existing.push(fragment);
        return;
      }
      fragmentsByGalaxy.set(fragment.galaxyId, [fragment]);
    });

    return GALAXIES.flatMap((galaxy) => {
      const fragments = fragmentsByGalaxy.get(galaxy.id) ?? [];
      if (fragments.length === 0) {
        return [];
      }
      return [{
        galaxyId: galaxy.id,
        galaxyEmoji: galaxy.emoji,
        fragments,
      }];
    });
  }, [geneInventory.fragments]);

  const handleToggleGalaxy = (galaxyId: GalaxyId) => {
    setExpandedGalaxyIds((prev) => {
      const next = new Set(prev);
      if (next.has(galaxyId)) {
        next.delete(galaxyId);
      } else {
        next.add(galaxyId);
      }
      return next;
    });
  };

  return (
    <div className="flex-1 w-full px-4 pb-4 overflow-y-auto">
      <h2 className="text-base sm:text-lg font-semibold mb-3" style={{ color: theme.text }}>
        {t.geneLabTitle}
      </h2>

      {totalFragments === 0 ? (
        <div
          className="rounded-2xl border px-4 py-8 text-center"
          style={{ backgroundColor: theme.surface, borderColor: theme.border }}
        >
          <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
            {t.geneLabEmpty}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {galaxyGroups.map((group) => {
            const isExpanded = expandedGalaxyIds.has(group.galaxyId);
            return (
              <section
                key={group.galaxyId}
                className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: theme.surface, borderColor: theme.border }}
              >
                <button
                  type="button"
                  onClick={() => handleToggleGalaxy(group.galaxyId)}
                  className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0 flex items-center gap-2">
                    <span className="text-base shrink-0">{group.galaxyEmoji}</span>
                    <span className="text-sm font-medium truncate" style={{ color: theme.text }}>
                      {t.galaxyName(group.galaxyId)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs" style={{ color: theme.textMuted }}>
                      {t.geneLabFragmentCount(group.fragments.length)}
                    </span>
                    <span
                      className="text-xs transition-transform duration-200"
                      style={{
                        color: theme.textFaint,
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                      }}
                    >
                      &gt;
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-2">
                    {group.fragments.map((fragment, index) => {
                      const variety = VARIETY_DEFS[fragment.varietyId];
                      const rarityColor = RARITY_COLOR[fragment.rarity];
                      const rarityStars = RARITY_STARS[fragment.rarity];
                      return (
                        <div
                          key={fragment.id}
                          className={`py-2 flex items-center justify-between gap-3${index === 0 ? '' : ' border-t'}`}
                          style={{ borderColor: theme.border }}
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span className="text-lg shrink-0">{variety.emoji}</span>
                            <span className="text-sm truncate" style={{ color: theme.text }}>
                              {t.varietyName(fragment.varietyId)}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 shrink-0">
                            {Array.from({ length: rarityStars }).map((_, starIndex) => (
                              <span key={`${fragment.id}-star-${starIndex}`} className="text-xs" style={{ color: rarityColor }}>
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      <div
        className="mt-4 rounded-2xl border px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: theme.surface, borderColor: theme.border }}
      >
        <span className="text-xs" style={{ color: theme.textMuted }}>
          {t.geneLabFragments}
        </span>
        <span className="text-sm font-semibold" style={{ color: theme.text }}>
          {t.geneLabFragmentCount(totalFragments)}
        </span>
      </div>
    </div>
  );
}
