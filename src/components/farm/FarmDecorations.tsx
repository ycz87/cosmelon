/**
 * FarmDecorations - Corner props and animals around the farm.
 *
 * Adds houses, barns, fences, and light nature props around the scene
 * to complete the farm atmosphere without affecting gameplay layers.
 */

interface HouseIconProps {
  roof: 'red' | 'blue';
}

function HouseIcon({ roof }: HouseIconProps) {
  if (roof === 'red') {
    return (
      <img
        src="/assets/farm/house-orange-roof-v2.png"
        alt=""
        className="h-[62px] w-[78px] sm:h-[80px] sm:w-[98px] md:h-[94px] md:w-[114px] object-contain"
      />
    );
  }

  // Blue roof house - keep SVG
  const roofMain = '#73AEEA';
  const roofDark = '#447AB8';

  return (
    <svg viewBox="0 0 150 132" className="h-[62px] w-[78px] sm:h-[80px] sm:w-[98px] md:h-[94px] md:w-[114px]">
      <ellipse cx="75" cy="120" rx="46" ry="8" fill="#00000020" />
      <rect x="34" y="48" width="82" height="58" rx="10" fill="#F7E7CC" stroke="#9D7651" strokeWidth="4" />
      <path d="M24 58 L75 20 L126 58 L118 68 L75 36 L32 68 Z" fill={roofMain} stroke={roofDark} strokeWidth="4" />
      <rect x="96" y="26" width="11" height="22" rx="3" fill="#A87C56" stroke="#7C5A3D" strokeWidth="2.5" />
      <rect x="67" y="68" width="16" height="38" rx="3.5" fill="#BF8D5D" stroke="#845E3E" strokeWidth="3" />
      <circle cx="79" cy="87" r="1.8" fill="#F7E7CC" />
      <rect x="44" y="65" width="16" height="15" rx="3" fill="#D4EEFF" stroke="#845E3E" strokeWidth="3" />
      <rect x="90" y="65" width="16" height="15" rx="3" fill="#D4EEFF" stroke="#845E3E" strokeWidth="3" />
      <line x1="52" y1="65" x2="52" y2="80" stroke="#845E3E" strokeWidth="2" />
      <line x1="44" y1="72.5" x2="60" y2="72.5" stroke="#845E3E" strokeWidth="2" />
      <line x1="98" y1="65" x2="98" y2="80" stroke="#845E3E" strokeWidth="2" />
      <line x1="90" y1="72.5" x2="106" y2="72.5" stroke="#845E3E" strokeWidth="2" />
    </svg>
  );
}

function BarnIcon() {
  return (
    <img
      src="/assets/farm/barn-red-v2.png"
      alt=""
      className="h-[64px] w-[80px] sm:h-[82px] sm:w-[100px] md:h-[96px] md:w-[116px] object-contain"
    />
  );
}

interface FenceSegmentProps {
  mirrored?: boolean;
}

function FenceSegment({ mirrored = false }: FenceSegmentProps) {
  return (
    <img
      src="/assets/farm/fence-segment-v2.png"
      alt=""
      className="h-[22px] w-[48px] sm:h-[28px] sm:w-[60px] md:h-[32px] md:w-[68px] object-contain"
      style={{ transform: mirrored ? 'scaleX(-1)' : undefined }}
    />
  );
}

interface AnimalIconProps {
  className?: string;
}

function CowIcon({ className = 'h-[56px] w-[74px] sm:h-[72px] sm:w-[94px] md:h-[84px] md:w-[108px]' }: AnimalIconProps) {
  return (
    <svg viewBox="0 0 134 98" className={className}>
      <ellipse cx="66" cy="90" rx="42" ry="6" fill="#00000020" />
      <ellipse cx="68" cy="54" rx="38" ry="24" fill="#FFFFFF" stroke="#2C2C2C" strokeWidth="3" />
      <ellipse cx="50" cy="48" rx="10" ry="8" fill="#1F1F1F" />
      <ellipse cx="76" cy="60" rx="8" ry="6" fill="#1F1F1F" />
      <ellipse cx="88" cy="44" rx="6" ry="5" fill="#1F1F1F" />
      <ellipse cx="28" cy="50" rx="14" ry="13" fill="#FFFFFF" stroke="#2C2C2C" strokeWidth="3" />
      <ellipse cx="18" cy="44" rx="5" ry="7" fill="#FFFFFF" stroke="#2C2C2C" strokeWidth="2.5" />
      <ellipse cx="26" cy="64" rx="10" ry="7" fill="#F6B9B7" stroke="#2C2C2C" strokeWidth="2.5" />
      <circle cx="22.5" cy="63.5" r="1.6" fill="#3A2A2A" />
      <circle cx="29.5" cy="63.5" r="1.6" fill="#3A2A2A" />
      <circle cx="24" cy="47" r="2.1" fill="#2C2C2C" />
      <rect x="48" y="72" width="8" height="18" rx="3" fill="#FFFFFF" stroke="#2C2C2C" strokeWidth="2.5" />
      <rect x="70" y="72" width="8" height="18" rx="3" fill="#FFFFFF" stroke="#2C2C2C" strokeWidth="2.5" />
      <path d="M104 48 C114 44 116 36 111 31" fill="none" stroke="#2C2C2C" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SheepIcon({ className = 'h-[54px] w-[72px] sm:h-[70px] sm:w-[90px] md:h-[82px] md:w-[104px]' }: AnimalIconProps) {
  return (
    <svg viewBox="0 0 132 98" className={className}>
      <ellipse cx="64" cy="90" rx="40" ry="6" fill="#00000020" />
      <circle cx="48" cy="52" r="18" fill="#FFFFFF" stroke="#CFCFCF" strokeWidth="3" />
      <circle cx="65" cy="46" r="18" fill="#FFFFFF" stroke="#CFCFCF" strokeWidth="3" />
      <circle cx="81" cy="54" r="16" fill="#FFFFFF" stroke="#CFCFCF" strokeWidth="3" />
      <ellipse cx="31" cy="54" rx="14" ry="13" fill="#EFEFEF" stroke="#8D8D8D" strokeWidth="2.8" />
      <ellipse cx="24" cy="50" rx="4.5" ry="6" fill="#EFEFEF" stroke="#8D8D8D" strokeWidth="2.2" />
      <ellipse cx="30" cy="66" rx="9" ry="6.5" fill="#FADEE2" stroke="#8D8D8D" strokeWidth="2.3" />
      <circle cx="27.5" cy="66" r="1.5" fill="#6B5961" />
      <circle cx="32.8" cy="66" r="1.5" fill="#6B5961" />
      <circle cx="28.5" cy="52" r="2" fill="#4A4A4A" />
      <rect x="52" y="71" width="7" height="17" rx="3" fill="#F7F7F7" stroke="#B7B7B7" strokeWidth="2.2" />
      <rect x="73" y="71" width="7" height="17" rx="3" fill="#F7F7F7" stroke="#B7B7B7" strokeWidth="2.2" />
    </svg>
  );
}

function BushIcon() {
  return (
    <svg viewBox="0 0 120 72" className="h-[26px] w-[34px] sm:h-[32px] sm:w-[42px] md:h-[36px] md:w-[48px]">
      <ellipse cx="60" cy="60" rx="44" ry="10" fill="#0000001f" />
      <ellipse cx="34" cy="39" rx="21" ry="18" fill="#8BC667" />
      <ellipse cx="60" cy="31" rx="27" ry="22" fill="#97D277" />
      <ellipse cx="86" cy="40" rx="20" ry="17" fill="#84BE61" />
    </svg>
  );
}

function FlowerPatch() {
  return (
    <svg viewBox="0 0 90 40" className="h-[16px] w-[34px] sm:h-[18px] sm:w-[38px] md:h-[20px] md:w-[42px]">
      <circle cx="12" cy="28" r="4" fill="#FDE68A" />
      <circle cx="22" cy="20" r="3.6" fill="#FCA5A5" />
      <circle cx="36" cy="26" r="3.8" fill="#86EFAC" />
      <circle cx="52" cy="18" r="3.8" fill="#F9A8D4" />
      <circle cx="68" cy="24" r="3.6" fill="#BFDBFE" />
    </svg>
  );
}

export function FarmDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[8]" aria-hidden="true">
      <div className="absolute left-[17%] top-[45.5%] opacity-92">
        <FenceSegment />
      </div>
      <div className="absolute right-[17%] top-[45%] opacity-92">
        <FenceSegment mirrored />
      </div>
      <div className="absolute left-[18%] bottom-[10%] opacity-90">
        <FenceSegment />
      </div>
      <div className="absolute right-[19%] bottom-[9.4%] opacity-90">
        <FenceSegment mirrored />
      </div>

      <div className="absolute left-[2.2%] top-[39%] drop-shadow-[0_2px_3px_rgba(76,68,48,0.24)]">
        <HouseIcon roof="red" />
      </div>
      <div className="absolute right-[2.2%] top-[38.2%] drop-shadow-[0_2px_3px_rgba(76,68,48,0.24)]">
        <BarnIcon />
      </div>
      <div className="absolute left-[0.8%] bottom-[1.8%] drop-shadow-[0_2px_3px_rgba(76,68,48,0.24)]">
        <BarnIcon />
      </div>
      <div className="absolute right-[1%] bottom-[2.2%] drop-shadow-[0_2px_3px_rgba(76,68,48,0.24)]">
        <HouseIcon roof="blue" />
      </div>

      <div className="absolute left-[0.8%] top-[62.5%] -translate-y-1/2">
        <CowIcon />
      </div>
      <div className="absolute right-[0.8%] top-[64.5%] -translate-y-1/2">
        <SheepIcon />
      </div>
      <div className="absolute left-[14%] bottom-[7.4%]">
        <CowIcon className="h-[44px] w-[58px] sm:h-[56px] sm:w-[72px] md:h-[64px] md:w-[84px]" />
      </div>
      <div className="absolute right-[19%] bottom-[7.2%]">
        <SheepIcon className="h-[40px] w-[54px] sm:h-[52px] sm:w-[68px] md:h-[60px] md:w-[78px]" />
      </div>

      <div className="absolute left-[1.6%] top-[46.2%]">
        <BushIcon />
      </div>
      <div className="absolute right-[1.6%] top-[46%]">
        <BushIcon />
      </div>
      <div className="absolute left-[7%] bottom-[14.2%]">
        <BushIcon />
      </div>
      <div className="absolute right-[7%] bottom-[14%]">
        <BushIcon />
      </div>

      <div className="absolute left-[10%] top-[56%] opacity-85">
        <FlowerPatch />
      </div>
      <div className="absolute right-[11%] top-[58%] opacity-85">
        <FlowerPatch />
      </div>
      <div className="absolute left-[28%] bottom-[12.4%] opacity-85">
        <FlowerPatch />
      </div>
      <div className="absolute right-[30%] bottom-[12.2%] opacity-85">
        <FlowerPatch />
      </div>
    </div>
  );
}
