/**
 * 쿠키 타이쿤 (Cookie Tycoon) - 쿠키 클리커 & 천상 승화(Ascension) 시스템
 * 17단계 베이킹 도구 & 17단계 제빵 일꾼 대규모 확장판
 */

// --- 1. 일반 상점 아이템 설정 (각 17단계) ---
// 후반 티어로 갈수록 기본 비용과 비용 증가율(costMultiplier)이 급격히 치솟습니다.
const CLICK_UPGRADES = [
  // [초반 1~4단계]
  {
    id: 'wooden_spatula',
    name: '낡은 나무 주걱',
    desc: '손때 묻은 반죽용 나무 주걱. 클릭당 쿠키가 늘어납니다.',
    baseCost: 45,
    power: 1,
    costMultiplier: 1.15,
    tier: 1,
    icon: '🪵',
  },
  {
    id: 'silicone_mold',
    name: '실리콘 쿠키 틀',
    desc: '모양을 빠르게 잡아주어 쿠키 생산 효율이 향상됩니다.',
    baseCost: 260,
    power: 5,
    costMultiplier: 1.18,
    tier: 2,
    icon: '🍪',
  },
  {
    id: 'electric_whisk',
    name: '전동 거품기',
    desc: '위잉-! 강력한 모터 회전으로 반죽을 빠르게 빚어냅니다.',
    baseCost: 1400,
    power: 25,
    costMultiplier: 1.21,
    tier: 3,
    icon: '🥣',
  },
  {
    id: 'baker_glove',
    name: '파티시에 오븐 장갑',
    desc: '뜨거운 열기를 완벽 차단해 갓 구운 쿠키를 낚아챕니다.',
    baseCost: 7000,
    power: 120,
    costMultiplier: 1.25,
    tier: 4,
    icon: '🧤',
  },
  // [중반 5~7단계]
  {
    id: 'laser_oven_pointer',
    name: '레이저 베이킹 포인터',
    desc: '정밀 광선으로 순식간에 반죽을 완벽하게 구워냅니다.',
    baseCost: 32000,
    power: 650,
    costMultiplier: 1.30,
    tier: 5,
    icon: '⚡',
  },
  {
    id: 'golden_rolling_pin',
    name: '전설의 황금 롤링핀',
    desc: '밀대 한 번 밀어낼 때마다 산더미 같은 쿠키가 탄생합니다.',
    baseCost: 180000,
    power: 3500,
    costMultiplier: 1.35,
    tier: 6,
    icon: '🌟',
  },
  {
    id: 'quantum_spatula',
    name: '양자 차원 뒤집개',
    desc: '평행세계의 모든 쿠키를 한곳으로 끌어모으는 조리도구입니다.',
    baseCost: 1200000,
    power: 20000,
    costMultiplier: 1.40,
    tier: 7,
    icon: '🌀',
  },
  // [후반 확장 8~17단계 (신규 10단계)]
  {
    id: 'antimatter_injector',
    name: '반물질 초콜릿 인젝터',
    desc: '반물질 에너지를 주입해 클릭할 때마다 폭발적인 에너지를 냅니다.',
    baseCost: 8500000, // 850만
    power: 120000,
    costMultiplier: 1.44,
    tier: 8,
    icon: '🧪',
  },
  {
    id: 'gravity_dough_press',
    name: '중력파 반죽 프레스',
    desc: '블랙홀의 초중력으로 우주에서 가장 밀도 높은 쿠키를 압축합니다.',
    baseCost: 65000000, // 6,500만
    power: 850000,
    costMultiplier: 1.48,
    tier: 9,
    icon: '🪐',
  },
  {
    id: 'higgs_glaze_brush',
    name: '힉스 보손 글레이징 붓',
    desc: '물질에 질량을 부여하는 신의 입자로 황금빛 시럽을 코팅합니다.',
    baseCost: 500000000, // 5억
    power: 6000000,
    costMultiplier: 1.51,
    tier: 10,
    icon: '🖌️',
  },
  {
    id: 'superstring_whisk',
    name: '초끈이론 거품기',
    desc: '11차원 미세 진동으로 시공간의 거품을 일으켜 쿠키를 연성합니다.',
    baseCost: 4000000000, // 40억
    power: 45000000,
    costMultiplier: 1.54,
    tier: 11,
    icon: '🎻',
  },
  {
    id: 'singularity_ladle',
    name: '사건의 지평선 국자',
    desc: '은하 중심 블랙홀 너머에서 쏟아지는 원초적 반죽을 퍼 담습니다.',
    baseCost: 35000000000, // 350억
    power: 350000000,
    costMultiplier: 1.57,
    tier: 12,
    icon: '🕳️',
  },
  {
    id: 'multiverse_projector',
    name: '다중우주 쿠키 프로젝터',
    desc: '무한한 평행우주의 쿠키들을 현재의 현실로 실체화합니다.',
    baseCost: 300000000000, // 3,000억
    power: 2800000000,
    costMultiplier: 1.60,
    tier: 13,
    icon: '🔮',
  },
  {
    id: 'dark_matter_gauntlet',
    name: '암흑 물질 건틀릿',
    desc: '우주 질량의 85%를 차지하는 암흑 물질을 반죽에 직접 주무릅니다.',
    baseCost: 2800000000000, // 2.8조
    power: 24000000000,
    costMultiplier: 1.63,
    tier: 14,
    icon: '🧤',
  },
  {
    id: 'big_bang_cutter',
    name: '빅뱅 시뮬레이션 커터',
    desc: '우주 탄생의 대폭발을 재현하여 순간적으로 무한한 쿠키 결정을 찍어냅니다.',
    baseCost: 28000000000000, // 28조
    power: 220000000000,
    costMultiplier: 1.66,
    tier: 15,
    icon: '💥',
  },
  {
    id: 'creation_god_tweezer',
    name: '창조신의 오븐 핀셋',
    desc: '별자리들을 집어 올려 하나의 완벽한 초코칩으로 배치합니다.',
    baseCost: 300000000000000, // 300조
    power: 2000000000000,
    costMultiplier: 1.70,
    tier: 16,
    icon: '✨',
  },
  {
    id: 'infinity_pastry_wand',
    name: '절대 특이점의 제과 봉',
    desc: '모든 차원과 시공간을 초월해 손짓 한 번으로 온 우주를 쿠키로 채웁니다.',
    baseCost: 3500000000000000, // 3,500조
    power: 20000000000000,
    costMultiplier: 1.75,
    tier: 17,
    icon: '👑',
  },
];

const IDLE_UPGRADES = [
  // [초반 1~4단계]
  {
    id: 'auto_baker_bot',
    name: '꼬마 제빵 봇',
    desc: '쉬지 않고 쿠키 반죽을 빚어주는 귀여운 로봇입니다.',
    baseCost: 55,
    power: 1,
    costMultiplier: 1.15,
    tier: 1,
    icon: '🤖',
  },
  {
    id: 'kind_grandma',
    name: '친절한 할머니',
    desc: '정성 어린 손길로 따뜻하고 달콤한 쿠키를 구워주십니다.',
    baseCost: 320,
    power: 5,
    costMultiplier: 1.18,
    tier: 2,
    icon: '👵',
  },
  {
    id: 'bakery_oven',
    name: '대용량 상업용 오븐',
    desc: '한 번에 수백 개의 쿠키를 일정한 온도로 구워냅니다.',
    baseCost: 1700,
    power: 22,
    costMultiplier: 1.21,
    tier: 3,
    icon: '🔥',
  },
  {
    id: 'cookie_factory',
    name: '수제 쿠키 공장',
    desc: '컨베이어 벨트 위에서 쏟아지는 대규모 쿠키 생산 라인!',
    baseCost: 9000,
    power: 110,
    costMultiplier: 1.25,
    tier: 4,
    icon: '🏭',
  },
  // [중반 5~7단계]
  {
    id: 'ai_recipe_lab',
    name: 'AI 레시피 연구소',
    desc: '빅데이터 분석으로 인류 최고의 중독성 쿠키를 합성합니다.',
    baseCost: 48000,
    power: 550,
    costMultiplier: 1.30,
    tier: 5,
    icon: '🧠',
  },
  {
    id: 'galaxy_cookie_ship',
    name: '은하계 쿠키 모함',
    desc: '우주 소행성 벨트를 초콜릿 칩으로 바꾸는 궁극의 모함입니다.',
    baseCost: 260000,
    power: 2800,
    costMultiplier: 1.35,
    tier: 6,
    icon: '🚀',
  },
  {
    id: 'time_machine_bakery',
    name: '시간 왜곡 베이커리',
    desc: '과거와 미래의 시간을 압축하여 끝없이 쿠키를 쏟아냅니다.',
    baseCost: 1800000,
    power: 18000,
    costMultiplier: 1.40,
    tier: 7,
    icon: '⏳',
  },
  // [후반 확장 8~17단계 (신규 10단계)]
  {
    id: 'cookie_alchemy_forge',
    name: '쿠키 연금술 제련소',
    desc: '납과 흙을 달콤한 초코 쿠키로 변환하는 고대 비전의 제련소입니다.',
    baseCost: 12000000, // 1,200만
    power: 100000,
    costMultiplier: 1.44,
    tier: 8,
    icon: '🏺',
  },
  {
    id: 'interstellar_drone_fleet',
    name: '성간 쿠키 드론 함대',
    desc: '수억 대의 자율 비행 드론이 은하계 전역을 누비며 쿠키를 수확합니다.',
    baseCost: 90000000, // 9,000만
    power: 750000,
    costMultiplier: 1.48,
    tier: 9,
    icon: '🛸',
  },
  {
    id: 'dyson_sphere_bakery',
    name: '다이슨 스피어 베이킹 쉘',
    desc: '항성 하나의 핵융합 에너지를 통째로 둘러싼 거대 항성급 오븐입니다.',
    baseCost: 750000000, // 7.5억
    power: 5500000,
    costMultiplier: 1.51,
    tier: 10,
    icon: '☀️',
  },
  {
    id: 'quantum_cloner',
    name: '양자 얽힘 쿠키 복제기',
    desc: '쿠키 하나가 구워지면 우주 반대편에서 즉시 쌍둥이 쿠키가 생성됩니다.',
    baseCost: 6500000000, // 65억
    power: 42000000,
    costMultiplier: 1.54,
    tier: 11,
    icon: '⚛️',
  },
  {
    id: 'dimension_portal_hub',
    name: '차원 간 포털 허브',
    desc: '쿠키로 이루어진 이계의 차원과 영구 통로를 연결해 쉴 새 없이 퍼옵니다.',
    baseCost: 55000000000, // 550억
    power: 320000000,
    costMultiplier: 1.57,
    tier: 12,
    icon: '🚪',
  },
  {
    id: 'pulsar_energy_tower',
    name: '펄서 에너지 가속 타워',
    desc: '중성자별의 강력한 자기장 펄스를 에너지원으로 쿠키를 초고속 생산합니다.',
    baseCost: 480000000000, // 4,800억
    power: 2500000000,
    costMultiplier: 1.60,
    tier: 13,
    icon: '🗼',
  },
  {
    id: 'hyper_ai_core',
    name: '우주 초지능 쿠키 코어',
    desc: '우주 전체의 엔트로피를 역전시켜 원자 단위로 쿠키를 무한 합성합니다.',
    baseCost: 4500000000000, // 4.5조
    power: 21000000000,
    costMultiplier: 1.63,
    tier: 14,
    icon: '💻',
  },
  {
    id: 'galactic_cluster_farm',
    name: '은하 성단 쿠키 농장',
    desc: '수백 개의 은하가 거대한 반죽 밭이 되어 자동으로 회전하며 생산합니다.',
    baseCost: 45000000000000, // 45조
    power: 190000000000,
    costMultiplier: 1.66,
    tier: 15,
    icon: '🌌',
  },
  {
    id: 'spacetime_matrix_nexus',
    name: '시공간 매트릭스 넥서스',
    desc: '시간선 전체를 장악하여 태초부터 종말까지의 모든 순간에 쿠키를 굽습니다.',
    baseCost: 480000000000000, // 480조
    power: 1800000000000,
    costMultiplier: 1.70,
    tier: 16,
    icon: '💠',
  },
  {
    id: 'omnipresent_cookie_temple',
    name: '전지전능 쿠키 신전',
    desc: '우주 만물이 곧 쿠키이며, 존재하는 모든 호흡이 쿠키를 찬양하며 생성됩니다.',
    baseCost: 5500000000000000, // 5,500조
    power: 18000000000000,
    costMultiplier: 1.75,
    tier: 17,
    icon: '🏛️',
  },
];

// --- 2. 천상 승화 상점 아이템 목록 (확장) ---
const PRESTIGE_UPGRADES = [
  {
    id: 'prestige_click',
    name: '천상의 손길',
    desc: '클릭당 쿠키 생산량이 레벨당 영구 +50% 증가합니다.',
    baseCost: 1,
    maxLevel: 50,
    costMultiplier: 1.8,
    power: 0.5,
    icon: '✨',
  },
  {
    id: 'prestige_cps',
    name: '시간 왜곡 가속기',
    desc: '모든 제빵 일꾼의 생산 속도가 레벨당 영구 +30% 증가합니다.',
    baseCost: 2,
    maxLevel: 50,
    costMultiplier: 1.8,
    power: 0.3,
    icon: '⚡',
  },
  {
    id: 'prestige_discount',
    name: '비밀 원가 절감서',
    desc: '일반 상점 아이템의 가격 증가율이 5%씩 영구 감소합니다.',
    baseCost: 3,
    maxLevel: 5,
    costMultiplier: 3,
    power: 0.05,
    icon: '📉',
  },
  {
    id: 'prestige_starter',
    name: '골든 스타터 팩',
    desc: '천상 승화 직후 시작 쿠키가 +10,000개씩 영구 지급됩니다.',
    baseCost: 1,
    maxLevel: 20,
    costMultiplier: 2,
    power: 10000,
    icon: '🎁',
  },
  {
    id: 'prestige_crit',
    name: '행운의 크런치 (크리티컬)',
    desc: '클릭 시 5% 확률로 10배 크리티컬 대박 쿠키가 터집니다.',
    baseCost: 4,
    maxLevel: 15,
    costMultiplier: 2.2,
    power: 0.05,
    icon: '💥',
  },
  {
    id: 'prestige_offline',
    name: '영원의 오븐',
    desc: '오프라인 방치 수익률이 레벨당 50%씩 추가 증가합니다.',
    baseCost: 2,
    maxLevel: 10,
    costMultiplier: 2.2,
    power: 0.5,
    icon: '🌌',
  },
];

// --- 3. 업적 목록 (후반부 대규모 업적 추가) ---
const ACHIEVEMENTS = [
  {
    id: 'first_click',
    name: '첫 번째 쿠키',
    desc: '쿠키를 처음으로 1회 구워내세요.',
    icon: '🍪',
    check: (s) => s.totalClicks >= 1,
  },
  {
    id: 'click_100',
    name: '열정의 베이커',
    desc: '쿠키를 총 100회 클릭/타이핑하세요.',
    icon: '🔥',
    check: (s) => s.totalClicks >= 100,
  },
  {
    id: 'click_1000',
    name: '광속의 손가락',
    desc: '쿠키를 총 1,000회 클릭/타이핑하세요.',
    icon: '⚡',
    check: (s) => s.totalClicks >= 1000,
  },
  {
    id: 'click_5000',
    name: '신들린 제빵사',
    desc: '쿠키를 총 5,000회 클릭/타이핑하세요.',
    icon: '🌪️',
    check: (s) => s.totalClicks >= 5000,
  },
  {
    id: 'coin_1000',
    name: '달콤한 저축',
    desc: '누적 1,000 쿠키를 달성하세요.',
    icon: '🧁',
    check: (s) => s.totalCoinsEarned >= 1000,
  },
  {
    id: 'coin_100000',
    name: '쿠키 백만장자',
    desc: '누적 100,000 쿠키를 달성하세요.',
    icon: '👑',
    check: (s) => s.totalCoinsEarned >= 100000,
  },
  {
    id: 'coin_100m',
    name: '억만장자의 반죽',
    desc: '누적 1억(100,000,000) 쿠키를 달성하세요.',
    icon: '💰',
    check: (s) => s.totalCoinsEarned >= 100000000,
  },
  {
    id: 'coin_1t',
    name: '조 단위의 제과 제국',
    desc: '누적 1조(1,000,000,000,000) 쿠키를 달성하세요.',
    icon: '🏰',
    check: (s) => s.totalCoinsEarned >= 1000000000000,
  },
  {
    id: 'coin_1000t',
    name: '경 단위의 우주 베이커리',
    desc: '누적 1,000조 쿠키를 달성하세요.',
    icon: '🪐',
    check: (s) => s.totalCoinsEarned >= 1000000000000000,
  },
  {
    id: 'first_upgrade',
    name: '첫 주방 도구 구매',
    desc: '상점에서 첫 번째 업그레이드를 구매하세요.',
    icon: '🛍️',
    check: (s) => Object.values(s.inventory).some((cnt) => cnt > 0),
  },
  {
    id: 'tier_10_collector',
    name: '신의 영역 진입',
    desc: '10티어 이상의 고급 제빵 장비를 구매하세요.',
    icon: '🖌️',
    check: (s) => {
      const highTiers = ['higgs_glaze_brush', 'dyson_sphere_bakery'];
      return highTiers.some((id) => (s.inventory[id] || 0) > 0);
    },
  },
  {
    id: 'first_prestige',
    name: '천상으로의 승화',
    desc: '처음으로 천상 승화를 완료하세요.',
    icon: '🌟',
    check: (s) => s.prestigeCount >= 1,
  },
  {
    id: 'prestige_10_stars',
    name: '은하수 수집가',
    desc: '천상의 별을 누적 10개 이상 모으세요.',
    icon: '🌌',
    check: (s) => s.prestigeLifetimeStars >= 10,
  },
  {
    id: 'prestige_100_stars',
    name: '천상의 지배자',
    desc: '천상의 별을 누적 100개 이상 모으세요.',
    icon: '💫',
    check: (s) => s.prestigeLifetimeStars >= 100,
  },
  {
    id: 'idle_master',
    name: '쿠키 자동화 제국',
    desc: '초당 쿠키 생산량(CPS)이 1,000 이상에 도달하세요.',
    icon: '🏭',
    check: (s) => s.idleIncome >= 1000,
  },
  {
    id: 'cps_1m',
    name: '초당 백만 쿠키',
    desc: '초당 쿠키 생산량(CPS)이 1,000,000 이상에 도달하세요.',
    icon: '🚀',
    check: (s) => s.idleIncome >= 1000000,
  },
  {
    id: 'cps_1b',
    name: '초당 십억 쿠키',
    desc: '초당 쿠키 생산량(CPS)이 1,000,000,000 이상에 도달하세요.',
    icon: '🛸',
    check: (s) => s.idleIncome >= 1000000000,
  },
];

// --- 게임 상태 관리 ---
const STORAGE_KEY = 'cookie_tycoon_save_v5';

const defaultState = {
  coins: 0,
  totalCoinsEarned: 0,
  totalClicks: 0,
  clickPower: 1,
  idleIncome: 0,
  inventory: {}, // itemId: count (일반 상점)
  prestigeInventory: {}, // itemId: count (천상 승화 상점)
  prestigeStars: 0, // 보유 천상의 별
  prestigeLifetimeStars: 0, // 지금까지 획득한 총 별 개수
  prestigeCount: 0, // 총 승화 횟수
  unlockedAchievements: [],
  soundEnabled: true,
  lastTimestamp: Date.now(),
};

let state = { ...defaultState };

// --- 사운드 효과 (Web Audio API) ---
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCoinSound(isCrit = false) {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isCrit ? 'sawtooth' : 'triangle';
      const now = this.ctx.currentTime;

      if (isCrit) {
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else {
        osc.frequency.setValueAtTime(850, now);
        osc.frequency.exponentialRampToValueAtTime(1300, now + 0.08);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  playBuySound() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.12);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  playPrestigeSound() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880, 1108.73].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.25, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.35);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  playAchievementSound() {
    if (!state.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [587.33, 739.99, 880.0, 1174.66].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.22, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.18);
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

const sounds = new SoundManager();

// --- 4. 유틸리티 함수 (큰 단위 지원 확장) ---
function formatNumber(num) {
  if (num < 1000) return Math.floor(num).toLocaleString('ko-KR');
  if (num < 10000) return Math.floor(num).toLocaleString('ko-KR');
  
  const units = ['', '만', '억', '조', '경', '해', '자', '양', '구', '간', '정', '재', '극'];
  let unitIndex = 0;
  let temp = num;

  while (temp >= 10000 && unitIndex < units.length - 1) {
    temp /= 10000;
    unitIndex++;
  }

  return `${temp.toFixed(temp >= 100 ? 1 : 2)} ${units[unitIndex]}`;
}

// 일반 상점 아이템 가격 계산:
// 1) 기본 가격 * (비용배수 + 수량/20 * 0.01)^수량
// 2) 천상 승화 상점의 원가 절감서 레벨에 따라 영구 할인 적용
function getItemCost(item, count) {
  const discountLv = state.prestigeInventory['prestige_discount'] || 0;
  const discountFactor = Math.max(0.65, 1 - discountLv * 0.05);

  const acceleration = Math.floor(count / 20) * 0.01;
  const effectiveMultiplier = (item.costMultiplier + acceleration) * discountFactor;

  return Math.floor(item.baseCost * Math.pow(effectiveMultiplier, count));
}

// 승화 상점 아이템 가격 계산
function getPrestigeItemCost(item, count) {
  return Math.floor(item.baseCost * Math.pow(item.costMultiplier, count));
}

// 천상 승화 시 획득 가능한 천상의 별 계산:
// 천상 승화 최소 기준: 누적 획득 1,000,000 (100만) 쿠키 이상
const PRESTIGE_MIN_COOKIES = 1000000;

function calculateTotalStarsForCookies(totalCoins) {
  if (totalCoins < PRESTIGE_MIN_COOKIES) return 0;
  return Math.floor(Math.pow(totalCoins / PRESTIGE_MIN_COOKIES, 0.55));
}

function getAvailablePrestigeStars() {
  const totalStars = calculateTotalStarsForCookies(state.totalCoinsEarned);
  return Math.max(0, totalStars - state.prestigeLifetimeStars);
}

// 전체 능력치 재계산
function recalculateStats() {
  let baseClick = 1;
  let baseIdle = 0;

  // 1. 일반 아이템 합산
  CLICK_UPGRADES.forEach((item) => {
    const count = state.inventory[item.id] || 0;
    baseClick += item.power * count;
  });

  IDLE_UPGRADES.forEach((item) => {
    const count = state.inventory[item.id] || 0;
    baseIdle += item.power * count;
  });

  // 2. 천상 승화 영구 특성 적용
  const clickBuffLv = state.prestigeInventory['prestige_click'] || 0;
  const clickMultiplier = 1 + clickBuffLv * 0.5;

  const cpsBuffLv = state.prestigeInventory['prestige_cps'] || 0;
  const cpsMultiplier = 1 + cpsBuffLv * 0.3;

  // 3. 보유 천상의 별 1개당 전역 +1% 생산량 보너스
  const globalBonus = 1 + (state.prestigeStars * 0.01);

  state.clickPower = Math.floor(baseClick * clickMultiplier * globalBonus);
  state.idleIncome = Math.floor(baseIdle * cpsMultiplier * globalBonus);
}

// --- DOM 엘리먼트 참조 ---
const elCoinCount = document.getElementById('coinCount');
const elClickPowerText = document.getElementById('clickPowerText');
const elIdleIncomeText = document.getElementById('idleIncomeText');
const elStatTotalClicks = document.getElementById('statTotalClicks');
const elStatTotalCoins = document.getElementById('statTotalCoins');
const elStatPrestigeCount = document.getElementById('statPrestigeCount');
const elPrestigeStarCount = document.getElementById('prestigeStarCount');
const elPrestigeGlobalBonus = document.getElementById('prestigeGlobalBonus');
const elGainStarCount = document.getElementById('gainStarCount');
const elPrestigeBtn = document.getElementById('prestigeBtn');
const elCoinBtn = document.getElementById('coinBtn');
const elCoinInteractiveArea = document.getElementById('coinInteractiveArea');
const elParticleContainer = document.getElementById('particleContainer');
const elSoundToggleBtn = document.getElementById('soundToggleBtn');
const elSaveBtn = document.getElementById('saveBtn');
const elResetBtn = document.getElementById('resetBtn');
const elToast = document.getElementById('toast');
const elClickShopList = document.getElementById('clickShopList');
const elIdleShopList = document.getElementById('idleShopList');
const elPrestigeShopList = document.getElementById('prestigeShopList');
const elAchievementList = document.getElementById('achievementList');
const elShopStarCount = document.getElementById('shopStarCount');

// 모달
const elPrestigeModal = document.getElementById('prestigeModal');
const elModalGainStars = document.getElementById('modalGainStars');
const elModalConfirmPrestigeBtn = document.getElementById('modalConfirmPrestigeBtn');
const elModalCancelPrestigeBtn = document.getElementById('modalCancelPrestigeBtn');

// --- UI 업데이트 ---
function updateUI() {
  elCoinCount.textContent = formatNumber(state.coins);
  elClickPowerText.textContent = `+${formatNumber(state.clickPower)}`;
  elIdleIncomeText.textContent = `+${formatNumber(state.idleIncome)} /초`;
  elStatTotalClicks.textContent = state.totalClicks.toLocaleString('ko-KR');
  elStatTotalCoins.textContent = formatNumber(state.totalCoinsEarned);
  elStatPrestigeCount.textContent = state.prestigeCount.toLocaleString('ko-KR');

  // 천상 승화 상태 띠 바
  elPrestigeStarCount.textContent = state.prestigeStars.toLocaleString('ko-KR');
  elPrestigeGlobalBonus.textContent = `+${(state.prestigeStars * 1).toFixed(0)}%`;
  elShopStarCount.textContent = state.prestigeStars.toLocaleString('ko-KR');

  const earnableStars = getAvailablePrestigeStars();
  elGainStarCount.textContent = `+${earnableStars.toLocaleString('ko-KR')}`;

  if (earnableStars > 0) {
    elPrestigeBtn.classList.remove('disabled');
    elPrestigeBtn.classList.add('can-prestige');
  } else {
    elPrestigeBtn.classList.add('disabled');
    elPrestigeBtn.classList.remove('can-prestige');
  }

  // 일반 상점 아이템 구매 가능 여부 갱신
  document.querySelectorAll('.shop-item:not(.prestige-item)').forEach((itemEl) => {
    const cost = parseFloat(itemEl.dataset.cost);
    if (state.coins >= cost) {
      itemEl.classList.remove('disabled');
    } else {
      itemEl.classList.add('disabled');
    }
  });

  // 승화 상점 아이템 구매 가능 여부 갱신
  document.querySelectorAll('.shop-item.prestige-item').forEach((itemEl) => {
    const cost = parseFloat(itemEl.dataset.cost);
    const isMax = itemEl.dataset.isMax === 'true';
    if (!isMax && state.prestigeStars >= cost) {
      itemEl.classList.remove('disabled');
    } else {
      itemEl.classList.add('disabled');
    }
  });
}

// --- 상점 아이템 렌더링 ---
function renderShop() {
  // 1. 클릭 업그레이드
  elClickShopList.innerHTML = '';
  CLICK_UPGRADES.forEach((item) => {
    const count = state.inventory[item.id] || 0;
    const cost = getItemCost(item, count);

    const div = document.createElement('div');
    div.className = `shop-item ${state.coins < cost ? 'disabled' : ''}`;
    div.dataset.itemId = item.id;
    div.dataset.cost = cost;

    div.innerHTML = `
      <div class="item-icon-box">${item.icon}</div>
      <div class="item-details">
        <div class="item-top-row">
          <span class="item-name">${item.name}</span>
          <span class="item-level">T${item.tier} · Lv. ${count}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-effect">클릭당 +${formatNumber(item.power)} 쿠키 (비용증가율 ${(item.costMultiplier * 100 - 100).toFixed(0)}%)</div>
      </div>
      <div class="item-cost-btn">
        <span>🍪</span>
        <span>${formatNumber(cost)}</span>
      </div>
    `;

    div.addEventListener('click', () => buyItem(item, 'click'));
    elClickShopList.appendChild(div);
  });

  // 2. 자동 생산 업그레이드
  elIdleShopList.innerHTML = '';
  IDLE_UPGRADES.forEach((item) => {
    const count = state.inventory[item.id] || 0;
    const cost = getItemCost(item, count);

    const div = document.createElement('div');
    div.className = `shop-item ${state.coins < cost ? 'disabled' : ''}`;
    div.dataset.itemId = item.id;
    div.dataset.cost = cost;

    div.innerHTML = `
      <div class="item-icon-box">${item.icon}</div>
      <div class="item-details">
        <div class="item-top-row">
          <span class="item-name">${item.name}</span>
          <span class="item-level">T${item.tier} · Lv. ${count}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-effect">초당 +${formatNumber(item.power)} 쿠키 (비용증가율 ${(item.costMultiplier * 100 - 100).toFixed(0)}%)</div>
      </div>
      <div class="item-cost-btn">
        <span>🍪</span>
        <span>${formatNumber(cost)}</span>
      </div>
    `;

    div.addEventListener('click', () => buyItem(item, 'idle'));
    elIdleShopList.appendChild(div);
  });

  // 3. 천상 승화 상점
  elPrestigeShopList.innerHTML = '';
  PRESTIGE_UPGRADES.forEach((item) => {
    const count = state.prestigeInventory[item.id] || 0;
    const isMax = count >= item.maxLevel;
    const cost = isMax ? 0 : getPrestigeItemCost(item, count);

    const div = document.createElement('div');
    div.className = `shop-item prestige-item ${isMax || state.prestigeStars < cost ? 'disabled' : ''}`;
    div.dataset.itemId = item.id;
    div.dataset.cost = cost;
    div.dataset.isMax = isMax;

    div.innerHTML = `
      <div class="item-icon-box">${item.icon}</div>
      <div class="item-details">
        <div class="item-top-row">
          <span class="item-name">${item.name}</span>
          <span class="item-level">${isMax ? 'MAX' : `Lv. ${count}/${item.maxLevel}`}</span>
        </div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-effect">영구 지속 특성</div>
      </div>
      <div class="item-cost-btn">
        <span>🌟</span>
        <span>${isMax ? '완료' : `${formatNumber(cost)} 별`}</span>
      </div>
    `;

    if (!isMax) {
      div.addEventListener('click', () => buyPrestigeItem(item));
    }
    elPrestigeShopList.appendChild(div);
  });

  // 4. 업적 렌더링
  renderAchievements();
}

function renderAchievements() {
  elAchievementList.innerHTML = '';
  ACHIEVEMENTS.forEach((ach) => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    const div = document.createElement('div');
    div.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;

    div.innerHTML = `
      <div class="achievement-icon">${ach.icon}</div>
      <div class="achievement-info">
        <div class="achievement-title">${ach.name}</div>
        <div class="achievement-desc">${ach.desc}</div>
      </div>
      <div class="achievement-status">${isUnlocked ? '달성 완료 ✨' : '진행 중'}</div>
    `;

    elAchievementList.appendChild(div);
  });
}

// --- 일반 아이템 구매 처리 ---
function buyItem(item, type) {
  const count = state.inventory[item.id] || 0;
  const cost = getItemCost(item, count);

  if (state.coins >= cost) {
    state.coins -= cost;
    state.inventory[item.id] = count + 1;
    recalculateStats();
    sounds.playBuySound();
    renderShop();
    updateUI();
    checkAchievements();
    showToast(`"${item.name}"을(를) 업그레이드했습니다!`);
  } else {
    showToast('쿠키가 부족합니다!');
  }
}

// --- 승화 상점 아이템 구매 처리 ---
function buyPrestigeItem(item) {
  const count = state.prestigeInventory[item.id] || 0;
  if (count >= item.maxLevel) {
    showToast('이미 최대 레벨에 도달한 특성입니다!');
    return;
  }

  const cost = getPrestigeItemCost(item, count);
  if (state.prestigeStars >= cost) {
    state.prestigeStars -= cost;
    state.prestigeInventory[item.id] = count + 1;
    recalculateStats();
    sounds.playBuySound();
    renderShop();
    updateUI();
    showToast(`🌟 천상 특성 "${item.name}"을(를) 획득했습니다!`);
  } else {
    showToast('천상의 별이 부족합니다!');
  }
}

// --- 천상 승화 모달 및 실행 처리 ---
function openPrestigeModal() {
  const earnableStars = getAvailablePrestigeStars();
  if (earnableStars <= 0) {
    showToast(`천상 승화하려면 누적 ${formatNumber(PRESTIGE_MIN_COOKIES)} 쿠키 이상이 필요합니다!`);
    return;
  }

  elModalGainStars.textContent = `+${earnableStars.toLocaleString('ko-KR')}개의 천상의 별`;
  elPrestigeModal.classList.add('show');
}

function closePrestigeModal() {
  elPrestigeModal.classList.remove('show');
}

function executePrestige() {
  const earnableStars = getAvailablePrestigeStars();
  if (earnableStars <= 0) return;

  // 1. 천상의 별 지급
  state.prestigeStars += earnableStars;
  state.prestigeLifetimeStars += earnableStars;
  state.prestigeCount += 1;

  // 2. 골든 스타터 팩 적용
  const starterLv = state.prestigeInventory['prestige_starter'] || 0;
  state.coins = starterLv * 10000;

  // 3. 일반 인벤토리 초기화
  state.inventory = {};

  closePrestigeModal();
  sounds.playPrestigeSound();
  recalculateStats();
  renderShop();
  updateUI();
  checkAchievements();

  showToast(`🎉 천상 승화 성공! 천상의 별 ${earnableStars}개를 획득했습니다!`);
}

// --- 업적 확인 ---
function checkAchievements() {
  ACHIEVEMENTS.forEach((ach) => {
    if (!state.unlockedAchievements.includes(ach.id)) {
      if (ach.check(state)) {
        state.unlockedAchievements.push(ach.id);
        sounds.playAchievementSound();
        showToast(`🏆 업적 달성! [${ach.name}]`);
        renderAchievements();
      }
    }
  });
}

// --- 쿠키 클릭 / 타격 처리 ---
function triggerCookieBake(clientX = null, clientY = null) {
  const critLv = state.prestigeInventory['prestige_crit'] || 0;
  const isCritical = critLv > 0 && Math.random() < critLv * 0.05;

  const earned = isCritical ? state.clickPower * 10 : state.clickPower;
  state.coins += earned;
  state.totalCoinsEarned += earned;
  state.totalClicks += 1;

  sounds.playCoinSound(isCritical);

  // 좌표 계산
  const rect = elParticleContainer.getBoundingClientRect();
  const coinRect = elCoinBtn.getBoundingClientRect();

  if (clientX === null || clientY === null) {
    const randomOffsetX = (Math.random() - 0.5) * 40;
    const randomOffsetY = (Math.random() - 0.5) * 40;
    clientX = coinRect.left + coinRect.width / 2 + randomOffsetX;
    clientY = coinRect.top + coinRect.height / 2 + randomOffsetY;
  }

  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const text = isCritical ? `CRIT! +${formatNumber(earned)}` : `+${formatNumber(earned)}`;
  spawnFloatingText(x, y, text, isCritical);
  spawnSparks(x, y, isCritical ? 14 : 8);

  updateUI();
  checkAchievements();
}

let lastTouchTime = 0;

// 모바일 멀티 터치 지원 (두 손가락, 세 손가락 등 동시 탭 가능)
function handleAreaTouch(e) {
  if (elPrestigeModal.classList.contains('show')) return;
  if (e.target.closest('.quick-controls') || e.target.closest('.prestige-bar-container')) {
    return;
  }

  e.preventDefault(); // 더블탭 확대 방지 및 중복 클릭 이벤트 차단
  lastTouchTime = Date.now();

  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i];
    triggerCookieBake(touch.clientX, touch.clientY);
  }
}

// PC 마우스 클릭 (모바일 터치 후 중복 실행 방지)
function handleAreaClick(e) {
  if (Date.now() - lastTouchTime < 450) {
    return;
  }
  triggerCookieBake(e.clientX, e.clientY);
}

// --- 파티클 및 팝업 효과 ---
function spawnFloatingText(x, y, text, isCritical = false) {
  const el = document.createElement('div');
  el.className = `floating-text ${isCritical ? 'critical' : ''}`;
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  elParticleContainer.appendChild(el);
  setTimeout(() => el.remove(), isCritical ? 900 : 750);
}

function spawnSparks(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark-particle';

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const distance = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--dx', `${dx}px`);
    spark.style.setProperty('--dy', `${dy}px`);

    elParticleContainer.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
}

// --- 토스트 알림 ---
let toastTimer = null;
function showToast(msg) {
  if (toastTimer) clearTimeout(toastTimer);
  elToast.textContent = msg;
  elToast.classList.add('show');
  toastTimer = setTimeout(() => {
    elToast.classList.remove('show');
  }, 2200);
}

// --- 저장 및 불러오기 ---
function saveGame(showNotification = true) {
  state.lastTimestamp = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (showNotification) {
      showToast('게임이 브라우저에 저장되었습니다!');
    }
  } catch (err) {
    console.error('저장 실패:', err);
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...defaultState, ...parsed };

      // 오프라인 방치 보상 계산 (최대 12시간)
      const now = Date.now();
      const elapsedSeconds = Math.min((now - (state.lastTimestamp || now)) / 1000, 12 * 3600);
      recalculateStats();

      // 영원의 오븐 특성 적용
      const offlineBuffLv = state.prestigeInventory['prestige_offline'] || 0;
      const offlineMultiplier = 1 + offlineBuffLv * 0.5;

      if (elapsedSeconds > 5 && state.idleIncome > 0) {
        const offlineCoins = Math.floor(elapsedSeconds * state.idleIncome * offlineMultiplier);
        if (offlineCoins > 0) {
          state.coins += offlineCoins;
          state.totalCoinsEarned += offlineCoins;
          setTimeout(() => {
            showToast(`🎉 부재중 보상! ${formatNumber(offlineCoins)} 쿠키를 획득했습니다!`);
          }, 600);
        }
      }
    }
  } catch (err) {
    console.error('불러오기 실패:', err);
  }

  recalculateStats();
  renderShop();
  updateUI();
  updateSoundButtonUI();
}

function resetGame() {
  if (confirm('정말로 게임을 처음부터 완전히 리셋하시겠습니까? 천상 승화 및 모든 영구 특성이 삭제됩니다.')) {
    localStorage.removeItem(STORAGE_KEY);
    state = JSON.parse(JSON.stringify(defaultState));
    recalculateStats();
    renderShop();
    updateUI();
    showToast('게임이 전체 초기화되었습니다.');
  }
}

// --- 사운드 버튼 토글 ---
function updateSoundButtonUI() {
  elSoundToggleBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
  elSoundToggleBtn.title = state.soundEnabled ? '사운드 끄기' : '사운드 켜기';
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  updateSoundButtonUI();
  showToast(state.soundEnabled ? '사운드가 켜졌습니다.' : '사운드가 꺼졌습니다.');
}

// --- 탭 전환 로직 ---
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(tab.dataset.tab);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// --- 키보드 이벤트: 숫자 패드 꾹 누름(반복) 방지 및 단발 타건 시스템 ---
const activeKeys = new Set();

function setupKeyboardControls() {
  window.addEventListener('keydown', (e) => {
    const isNumpad = e.code.startsWith('Numpad');
    const isSpace = e.code === 'Space' && e.target === document.body;

    if (isNumpad || isSpace) {
      e.preventDefault();

      if (e.repeat || activeKeys.has(e.code)) {
        return;
      }

      activeKeys.add(e.code);
      triggerCookieBake();
      elCoinBtn.classList.add('pressed');
    }
  });

  window.addEventListener('keyup', (e) => {
    const isNumpad = e.code.startsWith('Numpad');
    const isSpace = e.code === 'Space' && e.target === document.body;

    if (isNumpad || isSpace) {
      activeKeys.delete(e.code);
      if (activeKeys.size === 0) {
        elCoinBtn.classList.remove('pressed');
      }
    }
  });

  window.addEventListener('blur', () => {
    activeKeys.clear();
    elCoinBtn.classList.remove('pressed');
  });
}

// --- 메인 타이머 루프 (자동 수입 계산) ---
let lastTick = Date.now();
function gameLoop() {
  const now = Date.now();
  const dt = (now - lastTick) / 1000;
  lastTick = now;

  if (state.idleIncome > 0) {
    const earned = state.idleIncome * dt;
    state.coins += earned;
    state.totalCoinsEarned += earned;
    updateUI();
    checkAchievements();
  }

  requestAnimationFrame(gameLoop);
}

// --- 이벤트 리스너 등록 ---
function init() {
  setupTabs();
  setupKeyboardControls();

  // 화면 터치(모바일) 및 마우스 클릭(PC) 이벤트
  if (elCoinInteractiveArea) {
    elCoinInteractiveArea.addEventListener('touchstart', handleAreaTouch, { passive: false });
    elCoinInteractiveArea.addEventListener('click', handleAreaClick);
  } else {
    elCoinBtn.addEventListener('click', handleAreaClick);
  }

  // 천상 승화 관련 버튼
  elPrestigeBtn.addEventListener('click', openPrestigeModal);
  elModalConfirmPrestigeBtn.addEventListener('click', executePrestige);
  elModalCancelPrestigeBtn.addEventListener('click', closePrestigeModal);

  // 퀵 버튼들
  elSoundToggleBtn.addEventListener('click', toggleSound);
  elSaveBtn.addEventListener('click', () => saveGame(true));
  elResetBtn.addEventListener('click', resetGame);

  // 데이터 로드
  loadGame();

  // 자동 저장 타이머 (10초마다 자동 저장)
  setInterval(() => saveGame(false), 10000);

  // 창 닫을 때 저장
  window.addEventListener('beforeunload', () => saveGame(false));

  // 게임 루프 시작
  lastTick = Date.now();
  requestAnimationFrame(gameLoop);
}

// 게임 실행
window.addEventListener('DOMContentLoaded', init);
