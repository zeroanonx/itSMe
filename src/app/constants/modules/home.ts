/**
 * @description 首页与技能页共用的社交链接项
 */
export interface SocialLinkItem {
  href: string;
  icon: string;
  label: string;
}

/**
 * @description 首页与技能页共用的技能项
 */
export const SKILL_CATEGORY = {
  coreFrontend: "Core Frontend", // 核心前端
  frameworks: "Frameworks", // 框架
  frontendTooling: "Frontend Tooling", // 前端工具
  backend: "Backend", // 后端
} as const;

export type SkillCategory =
  (typeof SKILL_CATEGORY)[keyof typeof SKILL_CATEGORY];

export interface SkillItem {
  category: SkillCategory;
  href: string;
  icon: string;
  image: string;
  label: string;
}

/**
 * @description 首页展示的语录项
 */
export interface HomeQuoteItem {
  accent: string;
  content: string[];
  source: string;
}

/**
 * @description 首页展示的个人标签项
 */
export interface HomeTagItem {
  accent: string;
  label: string;
}

/**
 * @constant 首页语录与局部强调共用的色板
 */
export const HOME_ACCENT_COLORS = {
  primary: "var(--accent-primary)",
  secondary: "var(--accent-secondary)",
  tertiary: "var(--accent-tertiary)",
  warm: "var(--accent-warm)",
  sky: "var(--accent-sky)",
  mint: "var(--accent-mint)",
  coral: "var(--accent-coral)",
  peach: "var(--accent-peach)",
  rose: "var(--accent-rose)",
  lilac: "var(--accent-lilac)",
} as const;

/**
 * @constant 首页展示的社交链接集合
 */
export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    href: "https://github.com/zeroanonx",
    icon: "mdi:github",
    label: "GitHub",
  },
  {
    href: "/others/wechat",
    icon: "solar:link-bold",
    label: "Toolkit",
  },
  {
    href: "mailto:2188817393@qq.com",
    icon: "lucide:mail",
    label: "Email",
  },
  {
    href: "/rss.xml",
    icon: "ri:rss-line",
    label: "RSS",
  },
];

/**
 * @constant 首页随机展示的语录集合
 */
export const HOME_QUOTES: HomeQuoteItem[] = [
  {
    accent: HOME_ACCENT_COLORS.sky,
    content: ["你当像鸟飞往你的山，", "去见你真正想成为的自己。"],
    source: "塔拉·韦斯特弗《你当像鸟飞往你的山》",
  },
  {
    accent: HOME_ACCENT_COLORS.tertiary,
    content: ["不做圣经里腐朽的诗集，", "要做禁书里最惊世骇俗的篇章"],
    source: "zeroanon",
  },
  {
    accent: HOME_ACCENT_COLORS.primary,
    content: [
      "我步入丛林，因为我希望生活得有意义，",
      "我希望活得深刻，吸取生命中所有的精华。",
    ],
    source: "梭罗《瓦尔登湖》",
  },

  {
    accent: HOME_ACCENT_COLORS.secondary,
    content: [
      "世界上只有一种真正的英雄主义，",
      "那就是在认清生活真相之后依然热爱生活。",
    ],
    source: "罗曼·罗兰《米开朗琪罗传》",
  },
  {
    accent: HOME_ACCENT_COLORS.lilac,
    content: [
      "一个人只有在独处时才能成为自己，",
      "谁要是不热爱独处，那他就不热爱自由。",
    ],
    source: "叔本华《人生的智慧》",
  },
  {
    accent: HOME_ACCENT_COLORS.warm,
    content: ["生命并不是要超越别人，", "而是要超越自己。"],
    source: "威廉·福克纳",
  },
  {
    accent: HOME_ACCENT_COLORS.peach,
    content: ["凡是过往，皆为序章，", "而真正重要的是你接下来如何生活。"],
    source: "莎士比亚《暴风雨》",
  },
  {
    accent: HOME_ACCENT_COLORS.coral,
    content: [
      "人可以被毁灭，但不能被打败，",
      "重要的是始终向着心里的方向前行。",
    ],
    source: "海明威《老人与海》",
  },
  {
    accent: HOME_ACCENT_COLORS.rose,
    content: ["愿你在看清生活的复杂之后，", "依然保有温柔、勇气与热爱。"],
    source: "改写自罗曼·罗兰",
  },
];

/**
 * @constant 首页展示的个人标签
 */
export const HOME_PROFILE_TAGS: HomeTagItem[] = [
  {
    label: "安静地",
    accent: HOME_ACCENT_COLORS.primary,
  },
  {
    label: "独立地",
    accent: HOME_ACCENT_COLORS.secondary,
  },
  {
    label: "自由地",
    accent: HOME_ACCENT_COLORS.warm,
  },
  {
    label: "INFJ",
    accent: HOME_ACCENT_COLORS.rose,
  },
  {
    label: "天蝎",
    accent: HOME_ACCENT_COLORS.sky,
  },
];

/**
 * @constant 核心前端技能集合
 */
export const CORE_FRONTEND_SKILLS: SkillItem[] = [
  {
    label: "Vue.js",
    href: "https://vuejs.org/",
    icon: "logos:vue",
    image: "/assets/images/home/vue.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "React",
    href: "https://react.dev/",
    icon: "logos:react",
    image: "/assets/images/home/react.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "Next.js",
    href: "https://nextjs.org/",
    icon: "logos:nextjs-icon",
    image: "/assets/images/home/next.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "uniApp",
    href: "https://uniapp.dcloud.net.cn/",
    icon: "logos:vue",
    image: "/assets/images/home/uniapp.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "Taro",
    href: "https://docs.taro.zone/docs/",
    icon: "logos:vue",
    image: "/assets/images/home/taro.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "Nuxt",
    href: "https://nuxt.com/",
    icon: "logos:nuxt-icon",
    image: "/assets/images/home/nuxt.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "WeChat Mini Program",
    href: "https://developers.weixin.qq.com/miniprogram/dev/framework/",
    icon: "ic:baseline-wechat",
    image: "/assets/images/home/wechat.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
  {
    label: "HarmonyOS",
    href: "https://www.harmonyos.com/",
    icon: "arcticons:harmony",
    image: "/assets/images/home/harmonyos.png",
    category: SKILL_CATEGORY.coreFrontend,
  },
];

/**
 * @constant 框架与状态管理技能集合
 */
export const FRAMEWORK_SKILLS: SkillItem[] = [
  {
    label: "Pinia",
    href: "https://pinia.vuejs.org/",
    icon: "logos:pinia",
    image: "/assets/images/home/pinia.png",
    category: SKILL_CATEGORY.frameworks,
  },
  {
    label: "Vuex",
    href: "https://vuex.vuejs.org/",
    icon: "logos:vue",
    image: "/assets/images/home/vuex.png",
    category: SKILL_CATEGORY.frameworks,
  },
  {
    label: "VueUse",
    href: "https://vueuse.org/",
    icon: "logos:vueuse",
    image: "/assets/images/home/vueuse.png",
    category: SKILL_CATEGORY.frameworks,
  },
  {
    label: "TailwindCSS",
    href: "https://tailwindcss.com/",
    icon: "logos:tailwindcss-icon",
    image: "/assets/images/home/tw.png",
    category: SKILL_CATEGORY.frameworks,
  },
  {
    label: "UnoCSS",
    href: "https://unocss.dev/",
    icon: "logos:unocss",
    image: "/assets/images/home/unocss.png",
    category: SKILL_CATEGORY.frameworks,
  },
  {
    label: "TypeScript",
    href: "https://www.typescriptlang.org/",
    icon: "logos:typescript-icon",
    image: "/assets/images/home/typescript.png",
    category: SKILL_CATEGORY.frameworks,
  },
  {
    label: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/",
    icon: "logos:javascript",
    image: "/assets/images/home/js.png",
    category: SKILL_CATEGORY.frameworks,
  },
];

/**
 * @constant 前端工程化与平台技能集合
 */
export const FRONTEND_TOOLING_SKILLS: SkillItem[] = [
  {
    label: "Vite",
    href: "https://vitejs.dev/",
    icon: "logos:vitejs",
    image: "/assets/images/home/vite.png",
    category: SKILL_CATEGORY.frontendTooling,
  },
];

/**
 * @constant 后端技能集合
 */
export const BACKEND_SKILLS: SkillItem[] = [
  {
    label: "Node.js",
    href: "https://nodejs.org/",
    icon: "logos:nodejs-icon",
    image: "/assets/images/home/node.png",
    category: SKILL_CATEGORY.backend,
  },
  {
    label: "Express",
    href: "https://expressjs.com/",
    icon: "skill-icons:expressjs-dark",
    image: "/assets/images/home/express.png",
    category: SKILL_CATEGORY.backend,
  },
  {
    label: "MySQL",
    href: "https://www.mysql.com/",
    icon: "logos:mysql",
    image: "/assets/images/home/mysql.png",
    category: SKILL_CATEGORY.backend,
  },
];

/**
 * @constant 技能页的完整技能集合
 */
export const ALL_SKILLS: SkillItem[] = [
  ...CORE_FRONTEND_SKILLS,
  ...FRAMEWORK_SKILLS,
  ...FRONTEND_TOOLING_SKILLS,
  ...BACKEND_SKILLS,
];

/**
 * @constant 首页精选技能名称
 */
export const FEATURED_SKILL_LABELS = [
  "TypeScript",
  "React",
  "Vue.js",
  "TailwindCSS",
  "Vite",
  "Nuxt",
];

/**
 * @constant 首页精选技能列表
 */
export const FEATURED_SKILLS = ALL_SKILLS.filter((skill) =>
  FEATURED_SKILL_LABELS.includes(skill.label)
);

/**
 * @constant 技能页分类顺序
 */
export const SKILL_CATEGORIES = [
  SKILL_CATEGORY.coreFrontend,
  SKILL_CATEGORY.frameworks,
  SKILL_CATEGORY.frontendTooling,
  SKILL_CATEGORY.backend,
] as const;
