/**
 * 쿠키 타이쿤 (Cookie Tycoon) - 풀 밸런스 패치 & 모바일 최적화
 * 
 * [변경 사항]
 * - 천상 승화 기준: 누적 1억 쿠키당 별 1개 (완전히 재설계)
 * - 별 1개 당 전역 보너스 +0.5% (기존 +1% → 하향)
 * - 상점 기본 가격 전반 대폭 상향 (2~5배), 중후반 티어는 3~8배 인상
 * - 승화 상점 특성 효과 전반 하향 + 비용 대폭 상향
 * - 자동 생산(CPS) 기반 power 전반 하향 (후반 진행 속도 제어)
 * - 모바일: 클리커 섹션 전체 touchstart 감지로 화면 비율 무관하게 동작
 */

// ============================================================
//  1.  클릭 업그레이드 (베이킹 도구) — 17단계
// ============================================================
const CLICK_UPGRADES = [
  // tier 1~4  (초반)
  {
    id: 'wooden_spatula', name: '낡은 나무 주걱',
    desc: '손때 묻은 반죽용 나무 주걱. 클릭당 쿠키가 늘어납니다.',
    baseCost: 100, power: 1, costMultiplier: 1.18, tier: 1, icon: '🪵',
  },
  {
    id: 'silicone_mold', name: '실리콘 쿠키 틀',
    desc: '모양을 빠르게 잡아주어 생산 효율이 향상됩니다.',
    baseCost: 800, power: 5, costMultiplier: 1.20, tier: 2, icon: '🍪',
  },
  {
    id: 'electric_whisk', name: '전동 거품기',
    desc: '강력한 모터 회전으로 반죽을 빠르게 빚어냅니다.',
    baseCost: 5500, power: 22, costMultiplier: 1.22, tier: 3, icon: '🥣',
  },
  {
    id: 'baker_glove', name: '파티시에 오븐 장갑',
    desc: '뜨거운 열기를 완벽 차단해 갓 구운 쿠키를 낚아챕니다.',
    baseCost: 32000, power: 100, costMultiplier: 1.25, tier: 4, icon: '🧤',
  },
  // tier 5~7  (중반)
  {
    id: 'laser_oven_pointer', name: '레이저 베이킹 포인터',
    desc: '정밀 광선으로 순식간에 반죽을 완벽하게 구워냅니다.',
    baseCost: 200000, power: 500, costMultiplier: 1.28, tier: 5, icon: '⚡',
  },
  {
    id: 'golden_rolling_pin', name: '전설의 황금 롤링핀',
    desc: '밀대 한 번에 산더미 같은 쿠키가 탄생합니다.',
    baseCost: 1500000, power: 2800, costMultiplier: 1.32, tier: 6, icon: '🌟',
  },
  {
    id: 'quantum_spatula', name: '양자 차원 뒤집개',
    desc: '평행세계의 쿠키를 한곳으로 끌어모으는 조리도구.',
    baseCost: 12000000, power: 15000, costMultiplier: 1.36, tier: 7, icon: '🌀',
  },
  // tier 8~17 (후반 — 신규 10단계)
  {
    id: 'antimatter_injector', name: '반물질 초콜릿 인젝터',
    desc: '반물질 에너지로 클릭마다 폭발적인 쿠키를 생성합니다.',
    baseCost: 100000000, power: 80000, costMultiplier: 1.40, tier: 8, icon: '🧪',
  },
  {
    id: 'gravity_dough_press', name: '중력파 반죽 프레스',
    desc: '블랙홀 초중력으로 우주 최고 밀도 쿠키를 압축합니다.',
    baseCost: 900000000, power: 500000, costMultiplier: 1.44, tier: 9, icon: '🪐',
  },
  {
    id: 'higgs_glaze_brush', name: '힉스 보손 글레이징 붓',
    desc: '물질에 질량을 부여하는 신의 입자로 황금 시럽을 코팅합니다.',
    baseCost: 8000000000, power: 3500000, costMultiplier: 1.47, tier: 10, icon: '🖌️',
  },
  {
    id: 'superstring_whisk', name: '초끈이론 거품기',
    desc: '11차원 미세 진동으로 시공간 거품을 일으켜 쿠키를 연성합니다.',
    baseCost: 70000000000, power: 25000000, costMultiplier: 1.50, tier: 11, icon: '🎻',
  },
  {
    id: 'singularity_ladle', name: '사건의 지평선 국자',
    desc: '은하 블랙홀 너머 원초적 반죽을 퍼 담습니다.',
    baseCost: 700000000000, power: 200000000, costMultiplier: 1.53, tier: 12, icon: '🕳️',
  },
  {
    id: 'multiverse_projector', name: '다중우주 쿠키 프로젝터',
    desc: '무한한 평행우주의 쿠키들을 현실로 실체화합니다.',
    baseCost: 7000000000000, power: 1600000000, costMultiplier: 1.56, tier: 13, icon: '🔮',
  },
  {
    id: 'dark_matter_gauntlet', name: '암흑 물질 건틀릿',
    desc: '우주 질량의 85%를 차지하는 암흑 물질을 반죽에 주무릅니다.',
    baseCost: 80000000000000, power: 14000000000, costMultiplier: 1.59, tier: 14, icon: '🫱',
  },
  {
    id: 'big_bang_cutter', name: '빅뱅 시뮬레이션 커터',
    desc: '대폭발을 재현하여 순간적으로 무한한 쿠키 결정을 찍어냅니다.',
    baseCost: 1000000000000000, power: 130000000000, costMultiplier: 1.62, tier: 15, icon: '💥',
  },
  {
    id: 'creation_god_tweezer', name: '창조신의 오븐 핀셋',
    desc: '별자리들을 집어 올려 완벽한 초코칩으로 배치합니다.',
    baseCost: 15000000000000000, power: 1200000000000, costMultiplier: 1.66, tier: 16, icon: '✨',
  },
  {
    id: 'infinity_pastry_wand', name: '절대 특이점의 제과 봉',
    desc: '모든 차원과 시공간을 초월해 온 우주를 쿠키로 채웁니다.',
    baseCost: 200000000000000000, power: 12000000000000, costMultiplier: 1.70, tier: 17, icon: '👑',
  },
];

// ============================================================
//  2.  자동 생산 업그레이드 (제빵 일꾼) — 17단계
// ============================================================
const IDLE_UPGRADES = [
  // tier 1~4  (초반)
  {
    id: 'auto_baker_bot', name: '꼬마 제빵 봇',
    desc: '쉬지 않고 쿠키 반죽을 빚어주는 귀여운 로봇입니다.',
    baseCost: 150, power: 0.5, costMultiplier: 1.18, tier: 1, icon: '🤖',
  },
  {
    id: 'kind_grandma', name: '친절한 할머니',
    desc: '정성 어린 손길로 따뜻하고 달콤한 쿠키를 구워주십니다.',
    baseCost: 1200, power: 3, costMultiplier: 1.20, tier: 2, icon: '👵',
  },
  {
    id: 'bakery_oven', name: '대용량 상업용 오븐',
    desc: '한 번에 수백 개의 쿠키를 일정한 온도로 구워냅니다.',
    baseCost: 7000, power: 12, costMultiplier: 1.22, tier: 3, icon: '🔥',
  },
  {
    id: 'cookie_factory', name: '수제 쿠키 공장',
    desc: '컨베이어 벨트 위에서 쏟아지는 대규모 생산 라인!',
    baseCost: 45000, power: 60, costMultiplier: 1.25, tier: 4, icon: '🏭',
  },
  // tier 5~7  (중반)
  {
    id: 'ai_recipe_lab', name: 'AI 레시피 연구소',
    desc: '빅데이터 분석으로 인류 최고의 중독성 쿠키를 합성합니다.',
    baseCost: 300000, power: 280, costMultiplier: 1.28, tier: 5, icon: '🧠',
  },
  {
    id: 'galaxy_cookie_ship', name: '은하계 쿠키 모함',
    desc: '소행성 벨트를 초콜릿 칩으로 바꾸는 궁극의 모함.',
    baseCost: 2000000, power: 1500, costMultiplier: 1.32, tier: 6, icon: '🚀',
  },
  {
    id: 'time_machine_bakery', name: '시간 왜곡 베이커리',
    desc: '과거와 미래의 시간을 압축하여 끝없이 쿠키를 쏟아냅니다.',
    baseCost: 18000000, power: 9000, costMultiplier: 1.36, tier: 7, icon: '⏳',
  },
  // tier 8~17 (후반 — 신규 10단계)
  {
    id: 'cookie_alchemy_forge', name: '쿠키 연금술 제련소',
    desc: '납과 흙을 달콤한 초코 쿠키로 변환하는 고대 비전의 제련소.',
    baseCost: 150000000, power: 50000, costMultiplier: 1.40, tier: 8, icon: '🏺',
  },
  {
    id: 'interstellar_drone_fleet', name: '성간 쿠키 드론 함대',
    desc: '수억 대의 자율 드론이 은하계 전역에서 쿠키를 수확합니다.',
    baseCost: 1300000000, power: 350000, costMultiplier: 1.44, tier: 9, icon: '🛸',
  },
  {
    id: 'dyson_sphere_bakery', name: '다이슨 스피어 베이킹 쉘',
    desc: '항성 하나의 핵융합 에너지를 통째로 둘러싼 거대 오븐.',
    baseCost: 12000000000, power: 2500000, costMultiplier: 1.47, tier: 10, icon: '☀️',
  },
  {
    id: 'quantum_cloner', name: '양자 얽힘 쿠키 복제기',
    desc: '쿠키 하나가 구워지면 우주 반대편에서 즉시 쌍둥이 쿠키 생성.',
    baseCost: 110000000000, power: 20000000, costMultiplier: 1.50, tier: 11, icon: '⚛️',
  },
  {
    id: 'dimension_portal_hub', name: '차원 간 포털 허브',
    desc: '쿠키로 이루어진 이계 차원과 영구 통로를 연결해 퍼옵니다.',
    baseCost: 1100000000000, power: 160000000, costMultiplier: 1.53, tier: 12, icon: '🚪',
  },
  {
    id: 'pulsar_energy_tower', name: '펄서 에너지 가속 타워',
    desc: '중성자별 자기장 펄스를 에너지원으로 쿠키를 초고속 생산.',
    baseCost: 12000000000000, power: 1300000000, costMultiplier: 1.56, tier: 13, icon: '🗼',
  },
  {
    id: 'hyper_ai_core', name: '우주 초지능 쿠키 코어',
    desc: '우주 전체 엔트로피를 역전시켜 원자 단위로 쿠키를 무한 합성.',
    baseCost: 130000000000000, power: 11000000000, costMultiplier: 1.59, tier: 14, icon: '💻',
  },
  {
    id: 'galactic_cluster_farm', name: '은하 성단 쿠키 농장',
    desc: '수백 개의 은하가 거대한 반죽 밭이 되어 자동 회전 생산.',
    baseCost: 1500000000000000, power: 100000000000, costMultiplier: 1.62, tier: 15, icon: '🌌',
  },
  {
    id: 'spacetime_matrix_nexus', name: '시공간 매트릭스 넥서스',
    desc: '시간선 전체를 장악하여 태초부터 종말까지 모든 순간에 쿠키를 굽습니다.',
    baseCost: 20000000000000000, power: 1000000000000, costMultiplier: 1.66, tier: 16, icon: '💠',
  },
  {
    id: 'omnipresent_cookie_temple', name: '전지전능 쿠키 신전',
    desc: '우주 만물이 곧 쿠키이며, 모든 존재가 쿠키를 찬양하며 생성됩니다.',
    baseCost: 300000000000000000, power: 10000000000000, costMultiplier: 1.70, tier: 17, icon: '🏛️',
  },
];

// ============================================================
//  3.  승화 상점 (영구 특성) — 전반 하향 조정
//      ▸ 효과 수치 대폭 감소 / 비용 대폭 인상 / 최대 레벨 하향
// ============================================================
const PRESTIGE_UPGRADES = [
  {
    id: 'prestige_click', name: '천상의 손길',
    desc: '클릭당 쿠키 생산량이 레벨당 영구 +15% 증가합니다.',
    baseCost: 5, maxLevel: 30, costMultiplier: 2.2, power: 0.15, icon: '✨',
  },
  {
    id: 'prestige_cps', name: '시간 왜곡 가속기',
    desc: '모든 제빵 일꾼의 생산 속도가 레벨당 영구 +10% 증가합니다.',
    baseCost: 8, maxLevel: 30, costMultiplier: 2.2, power: 0.10, icon: '⚡',
  },
  {
    id: 'prestige_discount', name: '비밀 원가 절감서',
    desc: '일반 상점 아이템의 가격 증가율이 레벨당 2%씩 영구 감소합니다.',
    baseCost: 15, maxLevel: 5, costMultiplier: 4.0, power: 0.02, icon: '📉',
  },
  {
    id: 'prestige_starter', name: '골든 스타터 팩',
    desc: '천상 승화 직후 시작 쿠키가 레벨당 +5,000,000(500만)개씩 영구 지급됩니다.',
    baseCost: 3, maxLevel: 15, costMultiplier: 2.5, power: 5000000, icon: '🎁',
  },
  {
    id: 'prestige_crit', name: '행운의 크런치 (크리티컬)',
    desc: '클릭 시 2% 확률로 5배 크리티컬 대박 쿠키가 터집니다.',
    baseCost: 20, maxLevel: 10, costMultiplier: 3.0, power: 0.02, icon: '💥',
  },
  {
    id: 'prestige_offline', name: '영원의 오븐',
    desc: '오프라인 방치 수익률이 레벨당 20%씩 추가 증가합니다.',
    baseCost: 10, maxLevel: 8, costMultiplier: 2.8, power: 0.20, icon: '🌌',
  },
];

// ============================================================
//  4.  업적 목록
// ============================================================
const ACHIEVEMENTS = [
  { id: 'first_click',    name: '첫 번째 쿠키',       desc: '쿠키를 처음으로 1회 구워내세요.',                        icon: '🍪', check: (s) => s.totalClicks >= 1            },
  { id: 'click_100',     name: '열정의 베이커',        desc: '쿠키를 총 100회 클릭/타이핑하세요.',                     icon: '🔥', check: (s) => s.totalClicks >= 100           },
  { id: 'click_1000',    name: '광속의 손가락',        desc: '쿠키를 총 1,000회 클릭/타이핑하세요.',                   icon: '⚡', check: (s) => s.totalClicks >= 1000          },
  { id: 'click_10000',   name: '신들린 제빵사',        desc: '쿠키를 총 10,000회 클릭/타이핑하세요.',                  icon: '🌪️', check: (s) => s.totalClicks >= 10000         },
  { id: 'coin_1m',       name: '첫 백만장자',          desc: '누적 1,000,000 쿠키를 달성하세요.',                      icon: '🧁', check: (s) => s.totalCoinsEarned >= 1e6      },
  { id: 'coin_100m',     name: '억만 제빵왕',          desc: '누적 100,000,000 쿠키를 달성하세요.',                    icon: '💰', check: (s) => s.totalCoinsEarned >= 1e8      },
  { id: 'coin_10b',      name: '조 단위의 제과 제국',   desc: '누적 10,000,000,000 쿠키를 달성하세요.',                 icon: '🏰', check: (s) => s.totalCoinsEarned >= 1e10     },
  { id: 'coin_1t',       name: '조 조 조 달성',         desc: '누적 1,000,000,000,000 쿠키를 달성하세요.',              icon: '🪐', check: (s) => s.totalCoinsEarned >= 1e12     },
  { id: 'coin_1q',       name: '경 단위 우주 베이커리', desc: '누적 1,000,000,000,000,000 쿠키를 달성하세요.',           icon: '🌌', check: (s) => s.totalCoinsEarned >= 1e15     },
  { id: 'first_upgrade', name: '첫 주방 도구 구매',    desc: '상점에서 첫 번째 업그레이드를 구매하세요.',               icon: '🛍️', check: (s) => Object.values(s.inventory).some(c => c > 0) },
  { id: 'tier10',        name: '신의 영역 진입',        desc: '10티어 이상 제빵 장비를 구매하세요.',                     icon: '🖌️', check: (s) => (s.inventory['higgs_glaze_brush'] || 0) > 0 || (s.inventory['dyson_sphere_bakery'] || 0) > 0 },
  { id: 'first_prestige',name: '천상으로의 승화',       desc: '처음으로 천상 승화를 완료하세요.',                        icon: '🌟', check: (s) => s.prestigeCount >= 1           },
  { id: 'prestige5',     name: '천상의 달인',           desc: '천상 승화를 5회 완료하세요.',                             icon: '💫', check: (s) => s.prestigeCount >= 5           },
  { id: 'stars_10',      name: '은하수 수집가',         desc: '천상의 별을 누적 10개 이상 모으세요.',                    icon: '✨', check: (s) => s.prestigeLifetimeStars >= 10  },
  { id: 'stars_100',     name: '천상의 지배자',         desc: '천상의 별을 누적 100개 이상 모으세요.',                   icon: '👑', check: (s) => s.prestigeLifetimeStars >= 100 },
  { id: 'cps_1k',        name: '자동화의 서막',         desc: '초당 쿠키 생산량(CPS)이 1,000 이상에 도달하세요.',        icon: '🏭', check: (s) => s.idleIncome >= 1000           },
  { id: 'cps_1m',        name: '초당 백만 쿠키',        desc: '초당 쿠키 생산량(CPS)이 1,000,000 이상에 도달하세요.',    icon: '🚀', check: (s) => s.idleIncome >= 1e6            },
  { id: 'cps_1b',        name: '초당 십억 쿠키',        desc: '초당 쿠키 생산량(CPS)이 1,000,000,000 이상에 도달하세요.', icon: '🛸', check: (s) => s.idleIncome >= 1e9           },
];

// ============================================================
//  5.  게임 상태
// ============================================================
const STORAGE_KEY = 'cookie_tycoon_save_v6';

const defaultState = {
  coins: 0,
  totalCoinsEarned: 0,
  totalClicks: 0,
  clickPower: 1,
  idleIncome: 0,
  inventory: {},
  prestigeInventory: {},
  prestigeStars: 0,
  prestigeLifetimeStars: 0,
  prestigeCount: 0,
  unlockedAchievements: [],
  soundEnabled: true,
  lastTimestamp: Date.now(),
};

let state = { ...defaultState };

// ============================================================
//  6.  사운드 (Web Audio API)
// ============================================================
class SoundManager {
  constructor() { this.ctx = null; }

  init() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  _play(freq1, freq2, dur, type = 'triangle', vol = 0.18) {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = type;
      osc.frequency.setValueAtTime(freq1, now);
      osc.frequency.exponentialRampToValueAtTime(freq2, now + dur);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + dur);
    } catch (e) { console.warn(e); }
  }

  playCoinSound(isCrit = false) {
    if (isCrit) this._play(600, 1800, 0.18, 'sawtooth', 0.22);
    else        this._play(850, 1300, 0.08, 'triangle', 0.16);
  }

  playBuySound() {
    [523.25, 659.25, 783.99].forEach((f, i) => {
      setTimeout(() => this._play(f, f, 0.12, 'sine', 0.16), i * 60);
    });
  }

  playPrestigeSound() {
    [440, 554, 659, 880, 1108].forEach((f, i) => {
      setTimeout(() => this._play(f, f * 1.1, 0.35, 'triangle', 0.22), i * 90);
    });
  }

  playAchievementSound() {
    [587, 739, 880, 1174].forEach((f, i) => {
      setTimeout(() => this._play(f, f, 0.18, 'triangle', 0.20), i * 80);
    });
  }
}

const sounds = new SoundManager();

// ============================================================
//  7.  유틸리티
// ============================================================
function formatNumber(num) {
  if (!isFinite(num) || isNaN(num)) return '0';
  if (num < 1000) return Math.floor(num).toLocaleString('ko-KR');
  const units = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극'];
  let ui = 0, temp = Math.abs(num);
  while (temp >= 10000 && ui < units.length - 1) { temp /= 10000; ui++; }
  return `${temp.toFixed(temp >= 100 ? 1 : 2)} ${units[ui]}`;
}

// 가격 계산: 후반 레벨일수록 가파르게 상승
function getItemCost(item, count) {
  const discountLv = state.prestigeInventory['prestige_discount'] || 0;
  // 2% 단위 할인, 최대 10% 감소 (5레벨 × 2%)
  const discountFactor = Math.max(0.75, 1 - discountLv * 0.02);
  const accel = Math.floor(count / 15) * 0.012; // 15레벨마다 가속
  const m = Math.min((item.costMultiplier + accel) * discountFactor, 2.5);
  return Math.floor(item.baseCost * Math.pow(m, count));
}

function getPrestigeItemCost(item, count) {
  return Math.ceil(item.baseCost * Math.pow(item.costMultiplier, count));
}

// ★ 핵심 변경: 누적 1억 쿠키당 별 1개
const PRESTIGE_COOKIE_PER_STAR = 1e8; // 1억

function calculateTotalStarsForCookies(totalCoins) {
  if (totalCoins < PRESTIGE_COOKIE_PER_STAR) return 0;
  return Math.floor(totalCoins / PRESTIGE_COOKIE_PER_STAR);
}

function getAvailablePrestigeStars() {
  return Math.max(0, calculateTotalStarsForCookies(state.totalCoinsEarned) - state.prestigeLifetimeStars);
}

// 능력치 재계산
function recalculateStats() {
  let baseClick = 1, baseIdle = 0;

  CLICK_UPGRADES.forEach(item => {
    baseClick += item.power * (state.inventory[item.id] || 0);
  });
  IDLE_UPGRADES.forEach(item => {
    baseIdle += item.power * (state.inventory[item.id] || 0);
  });

  // 승화 특성 — 하향된 수치 적용
  const clickBuffLv = state.prestigeInventory['prestige_click'] || 0;
  const clickMult = 1 + clickBuffLv * 0.15;  // 레벨당 +15%

  const cpsBufLv = state.prestigeInventory['prestige_cps'] || 0;
  const cpsMult = 1 + cpsBufLv * 0.10;       // 레벨당 +10%

  // 별 1개당 +0.5% (기존 +1% → 절반)
  const globalBonus = 1 + state.prestigeStars * 0.005;

  state.clickPower = Math.max(1, Math.floor(baseClick * clickMult * globalBonus));
  state.idleIncome = Math.floor(baseIdle * cpsMult * globalBonus);
}

// ============================================================
//  8.  DOM 참조
// ============================================================
const elCoinCount          = document.getElementById('coinCount');
const elClickPowerText     = document.getElementById('clickPowerText');
const elIdleIncomeText     = document.getElementById('idleIncomeText');
const elStatTotalClicks    = document.getElementById('statTotalClicks');
const elStatTotalCoins     = document.getElementById('statTotalCoins');
const elStatPrestigeCount  = document.getElementById('statPrestigeCount');
const elPrestigeStarCount  = document.getElementById('prestigeStarCount');
const elPrestigeGlobalBonus= document.getElementById('prestigeGlobalBonus');
const elGainStarCount      = document.getElementById('gainStarCount');
const elPrestigeBtn        = document.getElementById('prestigeBtn');
const elCoinBtn            = document.getElementById('coinBtn');
const elCoinInteractiveArea= document.getElementById('coinInteractiveArea');
const elClickerSection     = document.getElementById('clickerSection');
const elParticleContainer  = document.getElementById('particleContainer');
const elSoundToggleBtn     = document.getElementById('soundToggleBtn');
const elSaveBtn            = document.getElementById('saveBtn');
const elResetBtn           = document.getElementById('resetBtn');
const elToast              = document.getElementById('toast');
const elClickShopList      = document.getElementById('clickShopList');
const elIdleShopList       = document.getElementById('idleShopList');
const elPrestigeShopList   = document.getElementById('prestigeShopList');
const elAchievementList    = document.getElementById('achievementList');
const elShopStarCount      = document.getElementById('shopStarCount');
const elPrestigeModal      = document.getElementById('prestigeModal');
const elModalGainStars     = document.getElementById('modalGainStars');
const elModalConfirmBtn    = document.getElementById('modalConfirmPrestigeBtn');
const elModalCancelBtn     = document.getElementById('modalCancelPrestigeBtn');

// ============================================================
//  9.  UI 업데이트
// ============================================================
function updateUI() {
  elCoinCount.textContent       = formatNumber(state.coins);
  elClickPowerText.textContent  = `+${formatNumber(state.clickPower)}`;
  elIdleIncomeText.textContent  = `+${formatNumber(state.idleIncome)} /초`;
  elStatTotalClicks.textContent = state.totalClicks.toLocaleString('ko-KR');
  elStatTotalCoins.textContent  = formatNumber(state.totalCoinsEarned);
  elStatPrestigeCount.textContent = state.prestigeCount.toLocaleString('ko-KR');

  elPrestigeStarCount.textContent  = state.prestigeStars.toLocaleString('ko-KR');
  elPrestigeGlobalBonus.textContent= `+${(state.prestigeStars * 0.5).toFixed(1)}%`;
  elShopStarCount.textContent      = state.prestigeStars.toLocaleString('ko-KR');

  const earn = getAvailablePrestigeStars();
  elGainStarCount.textContent = `+${earn.toLocaleString('ko-KR')}`;
  if (earn > 0) {
    elPrestigeBtn.classList.remove('disabled');
    elPrestigeBtn.classList.add('can-prestige');
  } else {
    elPrestigeBtn.classList.add('disabled');
    elPrestigeBtn.classList.remove('can-prestige');
  }

  // 일반 상점 활성화 (현재 buyMode 기준 비용 재평가)
  document.querySelectorAll('.shop-item:not(.prestige-item)').forEach(el => {
    const cost = parseFloat(el.dataset.cost);
    const isMax = buyMode === 'max' && cost === 0;
    el.classList.toggle('disabled', isMax || state.coins < cost);
  });
  // 승화 상점 활성화
  document.querySelectorAll('.shop-item.prestige-item').forEach(el => {
    if (el.dataset.isMax === 'true') return;
    el.classList.toggle('disabled', state.prestigeStars < parseFloat(el.dataset.cost));
  });
}

// ============================================================
//  10.  상점 렌더링
// ============================================================
function getDisplayCostAndLabel(item, currentCount) {
  let times, totalCost, label;

  if (buyMode === 'max') {
    times = getMaxBuyCount(item, currentCount);
    if (times === 0) {
      totalCost = getItemCost(item, currentCount);
      label = '×MAX';
    } else {
      totalCost = getBulkCost(item, currentCount, times);
      label = `×MAX(${times})`;
    }
  } else {
    times = parseInt(buyMode, 10);
    totalCost = getBulkCost(item, currentCount, times);
    label = `×${times}`;
  }

  return { totalCost, label, times };
}
function renderShop() {
  // 클릭 강화
  elClickShopList.innerHTML = '';
  CLICK_UPGRADES.forEach(item => {
    const count = state.inventory[item.id] || 0;
    const { totalCost, label, times } = getDisplayCostAndLabel(item, count);
    const canAfford = state.coins >= totalCost && (buyMode === 'max' ? times > 0 : true);
    const div = document.createElement('div');
    div.className = `shop-item ${!canAfford ? 'disabled' : ''}`;
    div.dataset.itemId = item.id;
    div.dataset.cost   = totalCost;
    div.innerHTML = `
      <div class="item-icon-box">${item.icon}</div>
      <div class="item-details">
        <div class="item-top-row">
          <span class="item-name">${item.name}</span>
          <span class="item-level">T${item.tier}·Lv.${count}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-effect">클릭당 +${formatNumber(item.power)} 쿠키 (상승률 ${((item.costMultiplier - 1) * 100).toFixed(0)}%)</div>
      </div>
      <div class="item-cost-btn">
        <span class="buy-label">${label}</span>
        <span>🍪</span>
        <span>${formatNumber(totalCost)}</span>
      </div>
    `;
    div.addEventListener('click', () => buyItem(item));
    elClickShopList.appendChild(div);
  });

  // 자동 생산
  elIdleShopList.innerHTML = '';
  IDLE_UPGRADES.forEach(item => {
    const count = state.inventory[item.id] || 0;
    const { totalCost, label, times } = getDisplayCostAndLabel(item, count);
    const canAfford = state.coins >= totalCost && (buyMode === 'max' ? times > 0 : true);
    const div = document.createElement('div');
    div.className = `shop-item ${!canAfford ? 'disabled' : ''}`;
    div.dataset.itemId = item.id;
    div.dataset.cost   = totalCost;
    div.innerHTML = `
      <div class="item-icon-box">${item.icon}</div>
      <div class="item-details">
        <div class="item-top-row">
          <span class="item-name">${item.name}</span>
          <span class="item-level">T${item.tier}·Lv.${count}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-effect">초당 +${formatNumber(item.power)} 쿠키 (상승률 ${((item.costMultiplier - 1) * 100).toFixed(0)}%)</div>
      </div>
      <div class="item-cost-btn">
        <span class="buy-label">${label}</span>
        <span>🍪</span>
        <span>${formatNumber(totalCost)}</span>
      </div>
    `;
    div.addEventListener('click', () => buyItem(item));
    elIdleShopList.appendChild(div);
  });

  // 승화 상점
  elPrestigeShopList.innerHTML = '';
  PRESTIGE_UPGRADES.forEach(item => {
    const count = state.prestigeInventory[item.id] || 0;
    const isMax = count >= item.maxLevel;
    const cost  = isMax ? 0 : getPrestigeItemCost(item, count);
    const div = document.createElement('div');
    div.className = `shop-item prestige-item ${isMax || state.prestigeStars < cost ? 'disabled' : ''}`;
    div.dataset.itemId = item.id;
    div.dataset.cost   = cost;
    div.dataset.isMax  = isMax;
    div.innerHTML = `
      <div class="item-icon-box">${item.icon}</div>
      <div class="item-details">
        <div class="item-top-row">
          <span class="item-name">${item.name}</span>
          <span class="item-level">${isMax ? 'MAX' : `Lv.${count}/${item.maxLevel}`}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-effect">영구 지속 특성</div>
      </div>
      <div class="item-cost-btn"><span>🌟</span><span>${isMax ? '완료' : `${formatNumber(cost)} 별`}</span></div>
    `;
    if (!isMax) div.addEventListener('click', () => buyPrestigeItem(item));
    elPrestigeShopList.appendChild(div);
  });

  renderAchievements();
}

function renderAchievements() {
  elAchievementList.innerHTML = '';
  ACHIEVEMENTS.forEach(ach => {
    const ok = state.unlockedAchievements.includes(ach.id);
    const div = document.createElement('div');
    div.className = `achievement-card ${ok ? 'unlocked' : ''}`;
    div.innerHTML = `
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-info">
        <div class="achievement-title">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
      </div>
      <div class="achievement-status">${ok ? '달성 완료 ✨' : '진행 중'}</div>
    `;
    elAchievementList.appendChild(div);
  });
}

// ============================================================
//  11.  구매 처리 (×1 / ×10 / ×100 / MAX 지원)
// ============================================================

// 현재 선택된 구매 수량 모드 ('1' | '10' | '100' | 'max')
let buyMode = '1';

function setupBuyMode() {
  document.querySelectorAll('.buy-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.buy-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buyMode = btn.dataset.mode;
      renderShop(); // 가격 표시 갱신
    });
  });
}

/**
 * count 번째부터 times 개를 연속 구매했을 때의 총 비용 계산
 */
function getBulkCost(item, currentCount, times) {
  let total = 0;
  for (let i = 0; i < times; i++) {
    total += getItemCost(item, currentCount + i);
  }
  return total;
}

/**
 * 현재 보유 쿠키로 살 수 있는 최대 구매 수량 계산
 */
function getMaxBuyCount(item, currentCount) {
  let total = 0;
  let n = 0;
  while (true) {
    const next = getItemCost(item, currentCount + n);
    if (total + next > state.coins) break;
    total += next;
    n++;
    if (n >= 10000) break; // 무한 루프 안전망
  }
  return n;
}

function buyItem(item) {
  const currentCount = state.inventory[item.id] || 0;

  let times;
  if (buyMode === 'max') {
    times = getMaxBuyCount(item, currentCount);
  } else {
    times = parseInt(buyMode, 10);
  }

  if (times <= 0) {
    showToast('쿠키가 부족합니다!');
    return;
  }

  const totalCost = getBulkCost(item, currentCount, times);

  if (state.coins >= totalCost) {
    state.coins -= totalCost;
    state.inventory[item.id] = currentCount + times;
    recalculateStats();
    sounds.playBuySound();
    renderShop();
    updateUI();
    checkAchievements();
    showToast(times > 1 ? `"${item.name}" ×${times} 구매!` : `"${item.name}" 업그레이드!`);
  } else {
    showToast('쿠키가 부족합니다!');
  }
}

function buyPrestigeItem(item) {
  const count = state.prestigeInventory[item.id] || 0;
  if (count >= item.maxLevel) { showToast('최대 레벨입니다!'); return; }
  const cost = getPrestigeItemCost(item, count);
  if (state.prestigeStars >= cost) {
    state.prestigeStars -= cost;
    state.prestigeInventory[item.id] = count + 1;
    recalculateStats();
    sounds.playBuySound();
    renderShop();
    updateUI();
    showToast(`🌟 "${item.name}" 획득!`);
  } else {
    showToast('천상의 별이 부족합니다!');
  }
}

// ============================================================
//  12.  천상 승화
// ============================================================
function openPrestigeModal() {
  const earn = getAvailablePrestigeStars();
  if (earn <= 0) {
    const need = formatNumber(PRESTIGE_COOKIE_PER_STAR - (state.totalCoinsEarned % PRESTIGE_COOKIE_PER_STAR));
    showToast(`천상 승화까지 ${need} 쿠키가 더 필요합니다!`);
    return;
  }
  elModalGainStars.textContent = `+${earn.toLocaleString('ko-KR')}개의 천상의 별`;
  elPrestigeModal.classList.add('show');
}

function closePrestigeModal() {
  elPrestigeModal.classList.remove('show');
}

function executePrestige() {
  const earn = getAvailablePrestigeStars();
  if (earn <= 0) return;

  state.prestigeStars       += earn;
  state.prestigeLifetimeStars += earn;
  state.prestigeCount       += 1;

  // 골든 스타터 팩
  const starterLv = state.prestigeInventory['prestige_starter'] || 0;
  state.coins = starterLv * 5000000;

  state.inventory = {};
  closePrestigeModal();
  sounds.playPrestigeSound();
  recalculateStats();
  renderShop();
  updateUI();
  checkAchievements();
  showToast(`🎉 천상 승화! 천상의 별 ${earn}개 획득!`);
}

// ============================================================
//  13.  업적 확인
// ============================================================
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id) && ach.check(state)) {
      state.unlockedAchievements.push(ach.id);
      sounds.playAchievementSound();
      showToast(`🏆 업적 달성! [${ach.name}]`);
      renderAchievements();
    }
  });
}

// ============================================================
//  14.  쿠키 굽기
// ============================================================
function triggerCookieBake(clientX = null, clientY = null) {
  const critLv = state.prestigeInventory['prestige_crit'] || 0;
  // 크리티컬: 레벨당 2% 확률, 5배
  const isCrit = critLv > 0 && Math.random() < critLv * 0.02;
  const earned = isCrit ? state.clickPower * 5 : state.clickPower;

  state.coins           += earned;
  state.totalCoinsEarned += earned;
  state.totalClicks     += 1;
  sounds.playCoinSound(isCrit);

  // 파티클 좌표 계산
  const rect     = elParticleContainer.getBoundingClientRect();
  const coinRect = elCoinBtn.getBoundingClientRect();
  if (clientX === null || clientY === null) {
    clientX = coinRect.left + coinRect.width  / 2 + (Math.random() - 0.5) * 40;
    clientY = coinRect.top  + coinRect.height / 2 + (Math.random() - 0.5) * 40;
  }
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  spawnFloatingText(x, y, isCrit ? `CRIT! +${formatNumber(earned)}` : `+${formatNumber(earned)}`, isCrit);
  spawnSparks(x, y, isCrit ? 14 : 8);

  // 쿠키 눌림 애니메이션
  elCoinBtn.classList.add('pressed');
  setTimeout(() => elCoinBtn.classList.remove('pressed'), 80);

  updateUI();
  checkAchievements();
}

// ============================================================
//  15.  파티클 효과
// ============================================================
function spawnFloatingText(x, y, text, isCrit = false) {
  const el = document.createElement('div');
  el.className = `floating-text ${isCrit ? 'critical' : ''}`;
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;
  elParticleContainer.appendChild(el);
  setTimeout(() => el.remove(), isCrit ? 900 : 750);
}

function spawnSparks(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark-particle';
    const angle = (Math.PI * 2 * i / count) + (Math.random() - 0.5);
    const dist  = 40 + Math.random() * 60;
    spark.style.left = `${x}px`;
    spark.style.top  = `${y}px`;
    spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    elParticleContainer.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

// ============================================================
//  16.  토스트 알림
// ============================================================
let toastTimer = null;
function showToast(msg) {
  if (toastTimer) clearTimeout(toastTimer);
  elToast.textContent = msg;
  elToast.classList.add('show');
  toastTimer = setTimeout(() => elToast.classList.remove('show'), 2200);
}

// ============================================================
//  17.  저장 / 불러오기
// ============================================================
function saveGame(notify = true) {
  state.lastTimestamp = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (notify) showToast('저장되었습니다!');
  } catch (e) { console.error(e); }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...defaultState, ...parsed };

      // 오프라인 방치 보상 (최대 12시간)
      const elapsed = Math.min((Date.now() - (state.lastTimestamp || Date.now())) / 1000, 43200);
      recalculateStats();
      const offlineBufLv = state.prestigeInventory['prestige_offline'] || 0;
      const offlineMult  = 1 + offlineBufLv * 0.20;
      if (elapsed > 5 && state.idleIncome > 0) {
        const bonus = Math.floor(elapsed * state.idleIncome * offlineMult);
        if (bonus > 0) {
          state.coins            += bonus;
          state.totalCoinsEarned += bonus;
          setTimeout(() => showToast(`🎉 부재중 보상! ${formatNumber(bonus)} 쿠키!`), 600);
        }
      }
    }
  } catch (e) { console.error(e); }

  recalculateStats();
  renderShop();
  updateUI();
  updateSoundBtn();
}

function resetGame() {
  if (confirm('모든 진행 상황(승화 포함)을 완전히 초기화합니다. 계속하시겠습니까?')) {
    localStorage.removeItem(STORAGE_KEY);
    state = JSON.parse(JSON.stringify(defaultState));
    recalculateStats();
    renderShop();
    updateUI();
    showToast('게임이 초기화되었습니다.');
  }
}

// ============================================================
//  18.  사운드 버튼
// ============================================================
function updateSoundBtn() {
  elSoundToggleBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
}
function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  updateSoundBtn();
  showToast(state.soundEnabled ? '사운드 ON' : '사운드 OFF');
}

// ============================================================
//  19.  탭 전환
// ============================================================
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(tab.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });
}

// ============================================================
//  20.  입력 처리 (키보드 + 마우스 + 모바일 터치)
// ============================================================

// ── 키보드 (NumPad 단발 타건) ──
const activeKeys = new Set();
function setupKeyboard() {
  window.addEventListener('keydown', e => {
    if (!(e.code.startsWith('Numpad') || (e.code === 'Space' && e.target === document.body))) return;
    e.preventDefault();
    if (e.repeat || activeKeys.has(e.code)) return;
    activeKeys.add(e.code);
    triggerCookieBake();
  });
  window.addEventListener('keyup', e => {
    activeKeys.delete(e.code);
    if (activeKeys.size === 0) elCoinBtn.classList.remove('pressed');
  });
  window.addEventListener('blur', () => {
    activeKeys.clear();
    elCoinBtn.classList.remove('pressed');
  });
}

// ── 모바일 터치 (클리커 섹션 전체에 바인딩) ──
// 모달이 열려 있거나 버튼/탭 영역은 무시
let lastTouchTime = 0;
function setupTouch() {
  const section = elClickerSection;

  section.addEventListener('touchstart', e => {
    // 버튼·제어 영역은 터치 전파 통과 (쿠키 연타 무시)
    if (e.target.closest('.quick-controls, .prestige-bar-container, .clicker-footer')) return;
    if (elPrestigeModal.classList.contains('show')) return;

    e.preventDefault(); // 더블탭 줌 방지, 스크롤 방지
    lastTouchTime = Date.now();

    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      triggerCookieBake(t.clientX, t.clientY);
    }
  }, { passive: false });
}

// ── PC 마우스 클릭 (터치 직후 중복 발화 방지) ──
function setupMouseClick() {
  elCoinInteractiveArea.addEventListener('click', e => {
    if (Date.now() - lastTouchTime < 500) return; // 터치 후 500ms 이내 click 무시
    triggerCookieBake(e.clientX, e.clientY);
  });
}

// ============================================================
//  21.  메인 게임 루프 (자동 생산)
// ============================================================
let lastTick = Date.now();
function gameLoop() {
  const now = Date.now();
  const dt  = (now - lastTick) / 1000;
  lastTick  = now;

  if (state.idleIncome > 0) {
    const earned = state.idleIncome * dt;
    state.coins            += earned;
    state.totalCoinsEarned += earned;
    updateUI();
    checkAchievements();
  }

  requestAnimationFrame(gameLoop);
}

// ============================================================
//  22.  초기화
// ============================================================
function init() {
  setupTabs();
  setupBuyMode();
  setupKeyboard();
  setupTouch();
  setupMouseClick();

  elPrestigeBtn.addEventListener('click', openPrestigeModal);
  elModalConfirmBtn.addEventListener('click', executePrestige);
  elModalCancelBtn.addEventListener('click', closePrestigeModal);

  elSoundToggleBtn.addEventListener('click', toggleSound);
  elSaveBtn.addEventListener('click', () => saveGame(true));
  elResetBtn.addEventListener('click', resetGame);

  loadGame();
  setInterval(() => saveGame(false), 10000);
  window.addEventListener('beforeunload', () => saveGame(false));

  lastTick = Date.now();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('DOMContentLoaded', init);
