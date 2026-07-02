const fs = require('fs');

const file = 'src/App.tsx';
let source = fs.readFileSync(file, 'utf8');

function parseField(line, name, nextName) {
  const startToken = `${name}: “`;
  const start = line.indexOf(startToken);
  if (start === -1) return undefined;
  const valueStart = start + startToken.length;
  const endToken = nextName ? `”, ${nextName}:` : '”';
  const end = nextName
    ? line.indexOf(endToken, valueStart)
    : line.lastIndexOf(endToken);
  if (end === -1 || end < valueStart) return undefined;
  return line.slice(valueStart, end);
}

source = source
  .split(/\r?\n/)
  .map((line) => {
    if (!line.includes('{ title: “')) return line;
    const indent = line.match(/^\s*/)?.[0] ?? '';
    const title = parseField(line, 'title', 'publisher');
    const publisher = parseField(line, 'publisher', 'collections');
    const hasTag = line.includes('”, tag: “');
    const collections = parseField(line, 'collections', hasTag ? 'tag' : 'isbn');
    const tag = hasTag ? parseField(line, 'tag', 'isbn') : undefined;
    const isbn = parseField(line, 'isbn');
    if (title === undefined || publisher === undefined || collections === undefined || isbn === undefined) {
      return line;
    }
    const parts = [
      `title: ${JSON.stringify(title)}`,
      `publisher: ${JSON.stringify(publisher)}`,
      `collections: ${JSON.stringify(collections)}`,
    ];
    if (tag !== undefined) parts.push(`tag: ${JSON.stringify(tag)}`);
    parts.push(`isbn: ${JSON.stringify(isbn)}`);
    return `${indent}{ ${parts.join(', ')} },`;
  })
  .join('\n');

const start = source.indexOf('        {/* AI Lab Section */}');
const end = source.indexOf('        {/* Complete Archive Drawer */}');
if (start === -1 || end === -1 || end <= start) {
  throw new Error('AI Lab replacement markers not found');
}

const aiLab = String.raw`        {/* AI Lab Section */}
        <div className="mb-24 border border-ink/20 p-4 md:p-8 relative bg-paper/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-ink/10 pb-5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
                AI Lab
              </h2>
              <p className="mt-3 max-w-2xl text-sm md:text-base leading-relaxed text-ink/70">
                一个 AI 产品实验室：把真实问题拆成可体验的工具、工作流和 Skill，而不是只展示代码仓库。
              </p>
            </div>
            <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest hidden md:block">
              Product Experiments / Skills / Open Source
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3 group">
              <div className="polaroid p-2 pb-8">
                <div className="relative overflow-hidden bg-white">
                  <video src="/vibecho-demo.mp4" controls preload="metadata" playsInline className="w-full aspect-video object-cover bg-ink/5 block">
                    Your browser does not support video playback.
                  </video>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-0.5">Prototype 01 · Vibe Coding</div>
                  <div className="text-lg font-bold tracking-tight uppercase text-ink">Vibecho</div>
                  <div className="font-mono text-[10px] text-accent mt-1">视频讲解 · 语言学习原型</div>
                </div>
              </div>
              <div className="font-mono text-xs text-ink/80 leading-relaxed bg-ink/5 p-3 border border-ink/10">
                <strong className="text-ink">AI 语言学习工具：</strong>帮助语言学习者把跟读、纠音和真实语境练习串成一个闭环，减少“会背不会说”的断层。
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  <span>解决：缺少即时反馈和真实对话场景</span>
                  <span>角色：产品构思、交互原型、提示词设计</span>
                  <span>亮点：影子跟读、语境模拟、反馈路径</span>
                  <span>Status：Prototype</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-[10px] border border-ink/15 px-2 py-1">Language Learning</span>
                  <span className="text-[10px] border border-ink/15 px-2 py-1">AI Tutor</span>
                  <a href="https://ai.studio/apps/e8491f42-25a1-417e-8532-fd613b5fbdf2" target="_blank" rel="noreferrer" className="text-[10px] border border-accent/30 px-2 py-1 text-accent hover:bg-accent hover:text-white transition-colors">Demo</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-[#1e1e1e] text-[#4af626] font-mono text-[10px] overflow-hidden relative h-64 border border-ink/30 shadow-inner flex flex-col">
                <div className="w-full h-7 bg-[#2d2d2d] border-b border-black/50 flex items-center px-3 text-white/50 text-[10px] shrink-0 justify-between">
                  <span>InDesign_Scripts.jsx</span>
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                  </span>
                </div>
                <div className="p-3 h-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-transparent to-[#1e1e1e] pointer-events-none z-10"></div>
                  <pre className="animate-code-scroll opacity-80 hover:opacity-100 transition-opacity text-[9px] leading-tight">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              </div>
              <div className="font-mono text-xs text-ink/80 leading-relaxed bg-ink/5 p-3 border border-ink/10">
                <strong className="text-ink">JavaScript 出版自动化脚本：</strong>保留原来的完整脚本滚动展示，用来说明我如何把重复校对规则变成可执行的出版工作流。
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  <span>解决：高频人工检查容易漏项</span>
                  <span>角色：规则整理、脚本设计、流程验证</span>
                  <span>亮点：CMOS、连字符、数字格式、漏空检查</span>
                  <span>Status：In Use</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 group">
              <a href="https://ai.studio/apps/aaaa9f8f-3a94-4f77-9419-a3563657db4f" target="_blank" rel="noreferrer" className="polaroid block p-2 pb-8">
                <div className="relative overflow-hidden bg-white">
                  <div className="bg-ink aspect-video relative flex flex-col items-center justify-center text-paper text-center p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60">Prototype 02 · AI Agent</div>
                    <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase mb-1">Future Pulse</div>
                    <div className="w-10 h-0.5 bg-accent mx-auto mb-2"></div>
                    <div className="font-mono text-[10px] opacity-50">AI 前沿信息到行动建议</div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <div className="font-mono text-[10px] text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity">点击打开 →</div>
                </div>
              </a>
              <div className="font-mono text-xs text-ink/80 leading-relaxed bg-ink/5 p-3 border border-ink/10">
                <strong className="text-ink">AI 工作流洞察 Agent：</strong>把快速变化的 AI 动态转译成更容易落地的工作流改造建议。暂时保留接口，后续继续优化展示。
                <span className="block mt-1 text-ink/50">AI Agent / Research / Workflow</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 group">
              <div className="border border-ink/20 overflow-hidden bg-white">
                <img src="/calligraphy-1.png" alt="书法识文" className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-all duration-700" />
              </div>
              <div className="font-mono text-xs text-ink/80 leading-relaxed bg-ink/5 p-3 border border-ink/10">
                <strong className="text-ink">书法识文：</strong>面向书法作品的拍照识字工具，帮助用户快速整理、复制和保存识别结果。暂时保留接口，后续再优化展示。
                <span className="block mt-1 text-ink/50">OCR / Calligraphy / PWA</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-ink/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5">
              <div>
                <h3 className="text-2xl font-bold tracking-tight uppercase">Skills / AI Toolkit</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed max-w-2xl">这些不是单纯的仓库，而是我把 AI 能力沉淀成可复用工作流的尝试。</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/40">Reusable Skills</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white/70 border border-ink/15 p-4 hover:border-accent/40 hover:shadow-md transition-all">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-2">Interview · AI · Career</div>
                <h4 className="text-xl font-bold tracking-tight">AI Interview</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink/78">模拟真实面试场景，帮助求职者围绕目标公司、岗位和简历做针对性练习。它适合准备技术、产品或跨岗位面试的人，能把公司调研、问题预测、模拟追问和反馈整理成一套可复用的准备包。</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/65 border-l-2 border-accent/40 pl-3">我负责从真实求职流程出发，设计 Skill 的任务链路、输出结构和面试反馈标准。</p>
                <a href="https://github.com/H-Wren/my-interview.git" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-4 text-accent hover:text-ink transition-colors border border-accent/30 px-2 py-1 text-[10px] uppercase tracking-widest">GitHub <ExternalLink className="w-3 h-3" /></a>
              </div>
              <div className="bg-white/70 border border-ink/15 p-4 hover:border-accent/40 hover:shadow-md transition-all">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-2">Job Search · AI Skill · Learning</div>
                <h4 className="text-xl font-bold tracking-tight">Job Interview Prep</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink/78">把面试准备从零散资料整理成系统学习流程：先建立候选人知识库，再分析 JD、公司、产品和面经，最后生成可编辑的准备报告与 HR 沟通话术。</p>
                <p className="mt-3 text-xs leading-relaxed text-ink/65 border-l-2 border-accent/40 pl-3">我负责把求职研究、产品调研、简历匹配和 AI 辅助输出整合成稳定的工作流。</p>
                <a href="https://github.com/H-Wren/job-interview-prep.git" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-4 text-accent hover:text-ink transition-colors border border-accent/30 px-2 py-1 text-[10px] uppercase tracking-widest">GitHub <ExternalLink className="w-3 h-3" /></a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-ink/10">
            <div className="bg-ink text-paper p-5 md:p-6 border border-ink/20 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50 mb-2">Open Source / GitHub</div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">H-Wren</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/75 max-w-3xl">持续探索 AI Agent、产品工具、自动化 Workflow 与效率应用。这里展示的不只是代码，而是把实际问题拆成工具、Skill 和可运行原型的过程。</p>
                </div>
                <a href="https://github.com/H-Wren" target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 border border-paper/30 px-4 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors">View GitHub <ExternalLink className="w-3 h-3" /></a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <div className="border border-paper/15 p-3"><div className="font-mono text-[10px] text-paper/40 uppercase tracking-widest">Profile</div><div className="text-lg font-bold mt-1">@H-Wren</div></div>
                <div className="border border-paper/15 p-3"><div className="font-mono text-[10px] text-paper/40 uppercase tracking-widest">Focus</div><div className="text-lg font-bold mt-1">AI Tools</div></div>
                <div className="border border-paper/15 p-3"><div className="font-mono text-[10px] text-paper/40 uppercase tracking-widest">Workflow</div><div className="text-lg font-bold mt-1">Agents</div></div>
                <div className="border border-paper/15 p-3"><div className="font-mono text-[10px] text-paper/40 uppercase tracking-widest">Status</div><div className="text-lg font-bold mt-1">Updating</div></div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {['my-interview', 'job-interview-prep', 'Website', 'Calligraphy'].map((repo) => (
                  <a key={repo} href={'https://github.com/H-Wren/' + repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 border border-paper/20 px-2 py-1 font-mono text-[10px] hover:border-accent hover:text-accent transition-colors">{repo}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

`;

source = source.slice(0, start) + aiLab + source.slice(end);
fs.writeFileSync(file, source, 'utf8');
