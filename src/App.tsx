import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Atom,
  Building2,
  BrainCircuit,
  BookOpen,
  Code2,
  CloudCog,
  Cpu,
  Database,
  Dna,
  FileText,
  FlaskConical,
  Globe2,
  Microscope,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

type DomainId = "compute" | "data" | "model" | "service" | "instrument" | "carbon";

type Domain = {
  id: DomainId;
  name: string;
  label: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
  x: string;
  y: string;
  load: string;
  supply: number;
  demand: number;
  carbon: string;
  status: string;
  drill: string[];
};

const domains: Domain[] = [
  {
    id: "compute",
    name: "算力资源",
    label: "算力",
    subtitle: "超算 / 智算资源弹性调度",
    icon: <Cpu size={20} />,
    color: "#168dff",
    x: "50%",
    y: "17.5%",
    load: "82.4%",
    supply: 78,
    demand: 86,
    carbon: "7.8 tCO2e/h",
    status: "GPU 队列 18 分钟",
    drill: ["智能扩容 11 个训练副本", "错峰调度 34 个排队任务", "A100 集群利用率 91%"],
  },
  {
    id: "data",
    name: "数据资源",
    label: "数据",
    subtitle: "实验、仿真、文献、样本统一溯源",
    icon: <Database size={20} />,
    color: "#00a8ff",
    x: "20.8%",
    y: "45%",
    load: "68.7%",
    supply: 83,
    demand: 69,
    carbon: "0.9 tCO2e/h",
    status: "全链路溯源 99.1%",
    drill: ["原始实验数据 1.2PB", "仿真数据 2.4PB", "样本库 82% 已分级共享"],
  },
  {
    id: "model",
    name: "模型资源",
    label: "模型",
    subtitle: "基座模型、专用模型、微调模型路由",
    icon: <BrainCircuit size={20} />,
    color: "#1d73ff",
    x: "78.4%",
    y: "45%",
    load: "74.3%",
    supply: 71,
    demand: 88,
    carbon: "2.1 tCO2e/h",
    status: "P95 响应 436ms",
    drill: ["科学基座模型 7 个在线", "专用小模型 19 个热加载", "智能路由命中率 94.7%"],
  },
  {
    id: "service",
    name: "SCP服务与工具",
    label: "SCP",
    subtitle: "科研协同、任务调度、流程编排服务",
    icon: <Wrench size={20} />,
    color: "#18c9d2",
    x: "26.8%",
    y: "75%",
    load: "61.2%",
    supply: 92,
    demand: 74,
    carbon: "0.4 tCO2e/h",
    status: "平均响应 82ms",
    drill: ["协同服务 99.4% 在线", "调度服务 31k 次/小时", "流程编排 148 条 DAG"],
  },
  {
    id: "instrument",
    name: "实验室与仪器",
    label: "仪器",
    subtitle: "湿实验设备、传感器、检测仪器联动",
    icon: <Microscope size={20} />,
    color: "#f0ac17",
    x: "74.6%",
    y: "75.8%",
    load: "76.9%",
    supply: 68,
    demand: 91,
    carbon: "3.6 tCO2e/h",
    status: "耗材 12 项低于阈值",
    drill: ["自动化合成平台满载", "传感器在线率 98.2%", "预约队列 7 个实验"],
  },
  {
    id: "carbon",
    name: "碳足迹",
    label: "碳排",
    subtitle: "算力、实验、设备待机能耗实时核算",
    icon: <CloudCog size={20} />,
    color: "#24c6a7",
    x: "50%",
    y: "63.5%",
    load: "14.8 t/h",
    supply: 76,
    demand: 62,
    carbon: "优化空间 18%",
    status: "18 个任务可转移低碳时段",
    drill: ["算力能耗占比 52.8%", "实验能耗占比 24.3%", "设备待机占比 12.6%"],
  },
];

const computeProfile = {
  total: { label: "总算力", value: "18.6", unit: "PFLOPS" },
  super: { label: "超算总算力", value: "6.8", unit: "PFLOPS", share: 37 },
  intelligent: { label: "智算总算力", value: "11.8", unit: "PFLOPS", share: 63 },
  centers: { label: "互联中心总数", value: "18", unit: "个" },
  centerTypes: [
    { label: "智算中心", value: "11", unit: "个" },
    { label: "超算中心", value: "5", unit: "个" },
    { label: "训练场", value: "2", unit: "个" },
  ],
  chips: { label: "国产芯片种类", value: "8", unit: "类" },
  chipBrands: [
    { name: "沐曦", src: "/chip-logos/metax.png" },
    { name: "华为", src: "/chip-logos/huawei.png" },
    { name: "平头哥", src: "/chip-logos/thead.jpg" },
    { name: "壁仞", src: "/chip-logos/birentech.jpg" },
    { name: "天数智芯", src: "/chip-logos/iluvatar.png" },
  ],
  regions: [
    "长三角枢纽",
    "京津冀枢纽",
    "贵州枢纽",
    "内蒙古枢纽",
    "粤港澳大湾区枢纽",
    "甘肃枢纽",
    "宁夏枢纽",
    "成渝枢纽",
  ],
};

const dataProfile = {
  overview: [
    { label: "数据储备量", value: "200", unit: "PB" },
    { label: "高质量Token总量", value: "100", unit: "T Tokens" },
    { label: "学科数量", value: "50+", unit: "" },
  ],
  carrierTypes: [
    { label: "文献数据", value: "6.8亿篇", icon: <BookOpen size={20} />, position: "left top" },
    { label: "多媒数据", value: "1.5千万件", icon: <FileText size={20} />, position: "right top" },
    { label: "代码数据", value: "15TB", detail: "（2.0亿行）", icon: <Code2 size={20} />, position: "left bottom" },
    { label: "实验数据", value: "2.1万个", detail: "数据集", icon: <FlaskConical size={20} />, position: "right bottom" },
  ],
  disciplines: [
    { label: "生物医药", value: "6.5亿篇", share: "29.2%", ratio: 100, icon: <Dna size={34} /> },
    { label: "材料科学", value: "4.2亿篇", share: "18.7%", ratio: 64, icon: <Atom size={34} /> },
    { label: "物理与天文", value: "3.4亿篇", share: "15.6%", ratio: 53, icon: <Globe2 size={34} /> },
    { label: "化学与化工", value: "2.8亿篇", share: "12.5%", ratio: 43, icon: <FlaskConical size={34} /> },
    { label: "计算机科学", value: "2.4亿篇", share: "9.4%", ratio: 32, icon: <Cpu size={34} /> },
    { label: "地球与环境科学", value: "1.9亿篇", share: "8.6%", ratio: 29, icon: <Globe2 size={34} /> },
  ],
};

const modelProfile = {
  inventory: [
    { label: "模型总量", value: "126", unit: "个", detail: "已纳管模型总数" },
    { label: "基座模型", value: "8", unit: "个", detail: "科学多模态基座模型、语言基座模型、通用推理模型", icon: <BrainCircuit size={24} />, accent: "#2778ff" },
    { label: "领域模型", value: "42", unit: "个", detail: "生命科学、材料、地球、能源、化学、物理等领域模型", icon: <Atom size={24} />, accent: "#21b875" },
  ],
  types: [
    { label: "领域模型画像", value: "42", unit: "个", detail: "按科学领域模型能力划分" },
    { label: "生命科学模型", value: "10", unit: "个", detail: "支持蛋白设计、序列分析、功能预测等", position: "top-left", icon: <Dna size={15} />, accent: "#2f8cff" },
    { label: "材料科学模型", value: "8", unit: "个", detail: "支持材料性质预测、晶体结构生成等", position: "top-right", icon: <Atom size={15} />, accent: "#28b9df" },
    { label: "化学模型", value: "7", unit: "个", detail: "支持分子生成、反应预测、合成设计等", position: "middle-left", icon: <FlaskConical size={15} />, accent: "#7858ff" },
    { label: "地球科学模型", value: "6", unit: "个", detail: "支持遥感解译、气象分析、地学计算等", position: "middle-right", icon: <Globe2 size={15} />, accent: "#27bf63" },
    { label: "能源科学模型", value: "6", unit: "个", detail: "支持电催化、储能材料、光伏等", position: "bottom-left", icon: <CloudCog size={15} />, accent: "#f19922" },
    { label: "物理科学模型", value: "5", unit: "个", detail: "支持物理仿真、粒子分析、复杂系统研究等", position: "bottom-right", icon: <Cpu size={15} />, accent: "#2377ff" },
  ],
  domestic: [
    { label: "国产模型适配", value: "64", unit: "个", detail: "已完成国产芯片环境适配的模型数量" },
    { label: "适配比例", value: "50.8", unit: "%", detail: "64 / 126" },
    { label: "昇腾适配模型", value: "38", unit: "个", detail: "支持昇腾推理或训练环境", badge: "A", accent: "#df3844" },
    { label: "寒武纪适配模型", value: "11", unit: "个", detail: "支持寒武纪相关环境", badge: "◇", accent: "#7657ff" },
    { label: "海光适配模型", value: "9", unit: "个", detail: "支持国产 CPU / DCU 环境", badge: "▣", accent: "#208fff" },
    { label: "其他国产芯片适配模型", value: "6", unit: "个", detail: "支持其他国产算力环境", badge: "▣", accent: "#f19a1a" },
  ],
};

const serviceProfile = {
  metrics: [
    { label: "工具服务", value: "2200+", unit: "" },
    { label: "工作流程模板", value: "200+", unit: "" },
  ],
  disciplines: [
    "生命科学",
    "地球科学",
    "神经科学",
    "材料科学",
    "化学",
    "物理",
    "数学",
    "通用",
  ],
  types: ["文献检索", "计算工具", "模型服务", "数据库", "湿实验操作", "知识库"],
};

const instrumentProfile = {
  overview: [
    { label: "实验室", value: "9", unit: "个" },
    { label: "设备", value: "X", unit: "个" },
  ],
  labs: [
    "嘉兴大学",
    "厦门大学",
    "xxx",
    "实验室 04",
    "实验室 05",
    "实验室 06",
    "实验室 07",
    "实验室 08",
    "实验室 09",
  ],
  equipment: [
    { label: "蛋白质高通量", icon: <Dna size={18} />, accent: "#2f8cff" },
    { label: "高通量", icon: <Sparkles size={18} />, accent: "#21b875" },
    { label: "生命科学", icon: <Microscope size={18} />, accent: "#7858ff" },
    { label: "光刻胶", icon: <FlaskConical size={18} />, accent: "#f0ac17" },
  ],
};

export default function App() {
  const [selectedId, setSelectedId] = useState<DomainId>("model");
  const [closedCards, setClosedCards] = useState<Set<string>>(() => new Set());
  const selected = domains.find((domain) => domain.id === selectedId) ?? domains[0];
  const closeCard = (cardId: string) => {
    setClosedCards((current) => new Set(current).add(cardId));
  };
  const isCardOpen = (cardId: string) => !closedCards.has(cardId);
  const selectedPanelId = `${selected.id}-panel`;
  const selectDomain = (domainId: DomainId) => {
    setSelectedId(domainId);
    setClosedCards((current) => {
      const next = new Set(current);
      next.delete(`${domainId}-panel`);
      return next;
    });
  };

  return (
    <main className="resource-screen">
      <section className="map-stage" aria-label="AGI4S 全域资源动态全景图">
        <header className="top-bar">
          <div className="brand">
            <span><Network size={24} /></span>
            <div>
              <p>AGI4S Research Infrastructure</p>
              <h1>全域资源管理看板</h1>
            </div>
          </div>
        </header>

        <div className="resource-hotspots">
          {domains.filter((domain) => domain.id !== "carbon").map((domain) => (
            <button
              aria-label={`下钻查看${domain.name}`}
              className={`hotspot ${domain.id === selectedId ? "active" : ""} ${domain.id}`}
              key={domain.id}
              onClick={() => selectDomain(domain.id)}
              style={{ "--accent": domain.color, left: domain.x, top: domain.y } as CSSProperties}
              type="button"
            >
              <span className="pulse-ring" />
              <span className="hotspot-chip">
                {domain.icon}
                <b>{domain.label}下钻</b>
              </span>
            </button>
          ))}
        </div>

        {isCardOpen(selectedPanelId) ? (
        <footer
          className={`bottom-console closable-card ${selected.id === "compute" ? "compute-mode" : ""} ${selected.id === "data" ? "data-mode" : ""} ${selected.id === "model" ? "model-mode" : ""} ${selected.id === "service" ? "service-mode" : ""} ${selected.id === "instrument" ? "instrument-mode" : ""}`}
          style={{ "--accent": selected.color } as CSSProperties}
        >
          <CardCloseButton cardId={selectedPanelId} onCloseCard={closeCard} />
          {selected.id === "compute" ? (
            <ComputePanel />
          ) : selected.id === "data" ? (
            <DataPanel />
          ) : selected.id === "model" ? (
            <ModelPanel />
          ) : selected.id === "service" ? (
            <ServicePanel />
          ) : selected.id === "instrument" ? (
            <InstrumentPanel />
          ) : (
            <section className="generic-resource-card">
              <div className="selected-summary">
                <span>{selected.icon}</span>
                <div>
                  <h2>{selected.name}</h2>
                </div>
                <strong>{selected.load}</strong>
              </div>
              <div className="console-detail">
                <div className="console-title">
                  <Route size={18} />
                  <strong>{selected.subtitle}</strong>
                </div>
                <div className="event-row">
                  <span><ShieldCheck size={15} /> {selected.status}</span>
                  <span><CloudCog size={15} /> {selected.carbon}</span>
                  {selected.drill.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </section>
          )}
        </footer>
        ) : null}
      </section>
    </main>
  );
}

function InstrumentPanel() {
  return (
    <div className="instrument-visual-panel">
      <section className="instrument-title-card">
        <div className="compute-heading">
          <span><Microscope size={20} /></span>
          <div>
            <h2>实验室和仪器卡片</h2>
            <p>实验室名录与设备类型纳管</p>
          </div>
        </div>
      </section>

      <section className="instrument-lab-card">
        <div className="instrument-section-head">
          <h3>9个实验室</h3>
          <strong>{instrumentProfile.labs.length}</strong>
        </div>
        <div className="lab-grid">
          {instrumentProfile.labs.map((item, index) => (
            <article className="lab-item" key={`${item}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Building2 size={16} />
              <b>{item}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="instrument-device-card">
        <div className="instrument-section-head">
          <h3>设备</h3>
          <strong>X</strong>
        </div>
        <div className="device-grid">
          {instrumentProfile.equipment.map((item) => (
            <article
              className="device-item"
              key={item.label}
              style={{ "--item-accent": item.accent } as CSSProperties}
            >
              <span>{item.icon}</span>
              <b>{item.label}</b>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function CardCloseButton({ cardId, onCloseCard }: { cardId: string; onCloseCard: (cardId: string) => void }) {
  return (
    <button
      aria-label="关闭卡片"
      className="card-close-button"
      onClick={() => onCloseCard(cardId)}
      type="button"
    >
      <X size={14} />
    </button>
  );
}

function ModelPanel() {
  const domainTypes = modelProfile.types.slice(1);

  return (
    <div className="model-visual-panel">
        <section className="model-title-card">
          <div className="compute-heading">
            <span><BrainCircuit size={20} /></span>
            <div>
              <h2>模型资源</h2>
              <p>模型资产、能力类型与国产算力适配</p>
            </div>
          </div>
        </section>

        <section className="model-inventory-card">
          <div className="model-card-head">
            <h3>模型资产总览</h3>
            <strong>{modelProfile.inventory[0].value}<em>{modelProfile.inventory[0].unit}</em></strong>
          </div>
          <div className="model-inventory-grid">
            {modelProfile.inventory.slice(1).map((item) => (
              <ModelStatCard item={item} key={item.label} />
            ))}
          </div>
        </section>

        <section className="model-type-card">
          <div className="model-card-head">
            <h3>{modelProfile.types[0].label}</h3>
            <strong>{modelProfile.types[0].value}<em>{modelProfile.types[0].unit}</em></strong>
          </div>
          <div className="model-domain-topology">
            <svg className="model-domain-lines" viewBox="0 0 520 172" aria-hidden="true">
              <line x1="260" y1="86" x2="92" y2="28" />
              <line x1="260" y1="86" x2="428" y2="28" />
              <line x1="260" y1="86" x2="88" y2="86" />
              <line x1="260" y1="86" x2="432" y2="86" />
              <line x1="260" y1="86" x2="92" y2="144" />
              <line x1="260" y1="86" x2="428" y2="144" />
            </svg>
            <div className="model-domain-hub">
              <BrainCircuit size={22} />
              <strong>领域模型</strong>
              <span>42 个</span>
            </div>
            {domainTypes.map((item) => (
              <article className={`model-domain-node ${item.position}`} key={item.label}>
                <span className="model-domain-icon">{item.icon}</span>
                <div>
                  <b>{item.label}</b>
                  <span>{item.detail}</span>
                </div>
                <strong>{item.value}<em>{item.unit}</em></strong>
              </article>
            ))}
          </div>
        </section>

        <section className="model-domestic-card">
          <div className="model-card-head">
            <h3>国产模型适配</h3>
            <strong>{modelProfile.domestic[1].value}<em>{modelProfile.domestic[1].unit}</em></strong>
          </div>
          <div className="model-adapt-hero">
            <div className="model-adapt-ring" aria-hidden="true">
              <span>{modelProfile.domestic[1].value}%</span>
            </div>
            <div>
              <span>{modelProfile.domestic[0].label}</span>
              <strong>{modelProfile.domestic[0].value}<em>{modelProfile.domestic[0].unit}</em></strong>
              <small>{modelProfile.domestic[1].detail}</small>
            </div>
          </div>
          <div className="model-adapt-grid">
            {modelProfile.domestic.slice(2).map((item) => (
              <ModelStatCard item={item} key={item.label} compact />
            ))}
          </div>
        </section>
    </div>
  );
}

function ModelStatCard({
  compact = false,
  item,
}: {
  compact?: boolean;
  item: { label: string; value: string; unit: string; detail: string; icon?: ReactNode; badge?: string; accent?: string };
}) {
  return (
    <article
      className={`model-stat-card ${compact ? "compact" : ""}`}
      style={{ "--item-accent": item.accent ?? "#1d73ff" } as CSSProperties}
    >
      {item.icon || item.badge ? (
        <span className="model-stat-icon">{item.icon ?? item.badge}</span>
      ) : null}
      <div>
        <b>{item.label}</b>
        <span>{item.detail}</span>
      </div>
      <strong>{item.value}<em>{item.unit}</em></strong>
    </article>
  );
}

function ServicePanel() {
  return (
    <div className="service-visual-panel">
        <section className="service-title-card">
          <div className="compute-heading">
            <span><Wrench size={20} /></span>
            <div>
              <h2>SCP卡片</h2>
              <p>工具服务与流程编排画像</p>
            </div>
          </div>
        </section>

        <section className="service-metric-card">
          {serviceProfile.metrics.map((item) => (
            <article className="service-big-number" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="service-coverage-card">
          <div className="service-section-head">
            <h3>覆盖学科</h3>
            <strong>8</strong>
          </div>
          <div className="service-tag-grid discipline-tags">
            {serviceProfile.disciplines.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="service-coverage-card">
          <div className="service-section-head">
            <h3>覆盖类型</h3>
            <strong>6</strong>
          </div>
          <div className="service-tag-grid type-tags">
            {serviceProfile.types.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

    </div>
  );
}

function DataPanel() {
  return (
    <div className="data-visual-panel">
        <section className="data-panel-title">
          <div className="compute-heading">
            <span><Database size={20} /></span>
            <div>
              <h2>数据资源</h2>
              <p>科研数据资源汇聚与学科服务</p>
            </div>
          </div>
        </section>
        <section className="data-card data-overview-card">
          <div className="data-section-head overview-head">
            <h3>总体规模</h3>
          </div>
          <div className="overview-hero">
            <div className="overview-orbit">
              <span>{dataProfile.overview[0].label}</span>
              <strong>{dataProfile.overview[0].value}<em>{dataProfile.overview[0].unit}</em></strong>
            </div>
          </div>
          <div className="overview-mini-grid">
            {dataProfile.overview.slice(1).map((item) => (
              <article className="overview-mini-card" key={item.label}>
                <Database size={20} />
                <strong>{item.value}<em>{item.unit}</em></strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="data-card data-carrier-card">
          <div className="data-section-head">
            <h3>载体类型画像</h3>
            <span>多源载体</span>
          </div>
          <div className="carrier-network">
            <svg className="carrier-lines" viewBox="0 0 520 260" aria-hidden="true">
              <path d="M260 130 C205 60 160 58 116 72" />
              <path d="M260 130 C315 60 360 58 404 72" />
              <path d="M260 130 C205 200 160 202 116 188" />
              <path d="M260 130 C315 200 360 202 404 188" />
            </svg>
            <div className="carrier-hub">
              <Network size={34} />
              <span>多源异构载体汇聚</span>
            </div>
            {dataProfile.carrierTypes.map((item) => (
              <article className={`carrier-node ${item.position}`} key={item.label}>
                <span>{item.icon}</span>
                <div>
                  <b>{item.label}</b>
                  <strong>{item.value}</strong>
                  {item.detail ? <em>{item.detail}</em> : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="data-card data-discipline-card">
          <div className="data-section-head">
            <h3>学科领域矩阵</h3>
            <span>Top 6</span>
          </div>
          <div className="discipline-grid">
            {dataProfile.disciplines.map((item, index) => (
              <article className="discipline-item" key={item.label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <b>{item.label}</b>
                  <em>{item.value} / {item.share}</em>
                  <i>
                    <small style={{ width: `${item.ratio}%` }} />
                  </i>
                </div>
                <mark>{item.icon}</mark>
              </article>
            ))}
          </div>
        </section>
    </div>
  );
}

function ComputePanel() {
  return (
    <div className="compute-visual-panel">
        <section className="compute-title-card">
          <div className="compute-heading">
            <span><Cpu size={20} /></span>
            <div>
              <h2>算力资源</h2>
              <p>全域算力供给画像</p>
            </div>
          </div>
        </section>

        <section className="compute-split-card">
          <h3 className="compute-card-title">算力总览</h3>
          <div className="split-hero">
            <div className="compute-total-number compute-kpi">
              <strong>{computeProfile.total.value}</strong>
              <em>{computeProfile.total.unit}</em>
              <span>{computeProfile.total.label}</span>
            </div>
          </div>
          <div className="split-head">
            <span>超算 / 智算构成</span>
            <b>{computeProfile.super.share}% / {computeProfile.intelligent.share}%</b>
          </div>
          <div className="compute-stack">
            <i className="super" style={{ width: `${computeProfile.super.share}%` }} />
            <i className="intelligent" style={{ width: `${computeProfile.intelligent.share}%` }} />
          </div>
          <div className="split-metrics">
            <MetricBlock className="compute-kpi" item={computeProfile.super} />
            <MetricBlock className="compute-kpi" item={computeProfile.intelligent} />
          </div>
        </section>

        <section className="compute-center-card">
          <h3 className="compute-card-title">互联中心</h3>
          <div className="center-node-row">
            {computeProfile.centerTypes.map((item) => (
              <MetricBlock className="center-node compute-kpi" item={item} key={item.label} />
            ))}
          </div>
          <div className="center-topology" aria-label="互联中心地域拓扑">
            <svg className="topology-lines" viewBox="0 0 320 150" aria-hidden="true">
              <line x1="160" y1="74" x2="44" y2="28" />
              <line x1="160" y1="74" x2="160" y2="18" />
              <line x1="160" y1="74" x2="276" y2="28" />
              <line x1="160" y1="74" x2="36" y2="78" />
              <line x1="160" y1="74" x2="284" y2="78" />
              <line x1="160" y1="74" x2="76" y2="126" />
              <line x1="160" y1="74" x2="160" y2="132" />
              <line x1="160" y1="74" x2="244" y2="126" />
            </svg>
            <div className="topology-hub">
              <span />
              <b>18</b>
              <small>互联中心</small>
            </div>
            {computeProfile.regions.map((region, index) => (
              <span className={`topology-node node-${index}`} key={region}>
                <i />
                <b>{region}</b>
              </span>
            ))}
          </div>
        </section>

        <section className="compute-capability-card">
          <h3 className="compute-card-title">国产芯片生态</h3>
          <article className="chip-logo-card compute-kpi">
            <div className="chip-logo-head">
              <span>{computeProfile.chips.label}</span>
              <strong>{computeProfile.chips.value}<em>{computeProfile.chips.unit}</em></strong>
            </div>
            <div className="chip-logo-grid" aria-label="芯片品牌 logo">
              {computeProfile.chipBrands.map((brand) => (
                <span className="brand-logo" key={brand.name}>
                  <img alt={`${brand.name} logo`} src={brand.src} />
                </span>
              ))}
            </div>
          </article>
        </section>
    </div>
  );
}

function MetricBlock({
  className = "",
  item,
}: {
  className?: string;
  item: { label: string; value: string; unit: string };
}) {
  return (
    <article className={`metric-block ${className}`}>
      <span>{item.label}</span>
      <strong>{item.value}<em>{item.unit}</em></strong>
    </article>
  );
}
