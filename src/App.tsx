/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Battery, Video, ExternalLink } from 'lucide-react';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isArchiveExpanded, setIsArchiveExpanded] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const assetPath = (file: string) => `${import.meta.env.BASE_URL}${file}`;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  const previewData: Record<string, { label: string; images: string[] }[]> = {
    'early-china': [
      { label: 'Contents', images: ['early-china-contents-1.png', 'early-china-contents-2.png'] },
      { label: 'List of Figures', images: ['early-china-figures-1.png', 'early-china-figures-2.png'] },
      { label: 'List of Tables', images: ['early-china-tables-1.png'] },
      { label: 'Foreword', images: ['early-china-foreword-1.png', 'early-china-foreword-2.png', 'early-china-foreword-3.png', 'early-china-foreword-4.png'] },
    ],
    haojiao: [
      { label: 'Contents', images: ['haojiao-contents-1.png', 'haojiao-contents-2.png', 'haojiao-contents-3.png', 'haojiao-contents-4.png'] },
      { label: 'Preface', images: ['haojiao-preface-1.png', 'haojiao-preface-2.png', 'haojiao-preface-3.png', 'haojiao-preface-4.png'] },
    ],
    nanjing: [
      { label: 'Contents', images: ['nanjing-contents-1.png', 'nanjing-contents-2.png'] },
      { label: 'Preface', images: ['nanjing-preface-1.png', 'nanjing-preface-2.png'] },
    ],
    yunnan: [
      { label: 'Contents', images: ['yunnan-contents.png'] },
      { label: 'Page 12', images: ['yunnan-p12.png'] },
      { label: 'Featured Spread', images: ['yunnan-spread.png', 'yunnan-spread2.png'] },
    ],
    
  };

  const handleScrollToArchive = () => {
    setIsArchiveOpen(true);
    setIsArchiveExpanded(false);
    setTimeout(() => {
      document.getElementById('archive-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const projects = [
    // ===== 独立编校项目 =====
    // --- 学术 ---
    { title: "早期中国—中国文化圈的形成和发展", publisher: "人民大学出版社", collections: "哈佛大学，耶鲁大学，普林斯顿大学，宾夕法尼亚大学，华盛顿大学，斯坦福大学，纽约大学，香港中文大学，明尼苏达大学，约翰霍普金斯大学，香港科技大学", tag: "学术外译项目 & 国家社会科学基金项成果", isbn: "9781487812133" },
    { title: "5G 标准之网络架构—构建万物互联的智能世界", publisher: "电子工业出版社", collections: "帕萨迪纳公共图书馆，布朗斯维尔公共图书馆，芒特尤宁大学，因弗卡吉尔市图书馆", tag: "丝路书香工程", isbn: "9781487811662" },
    { title: "号角—红色印刷记忆", publisher: "江西人民出版社", collections: "哈佛大学，芝加哥大学，纽约大学，达特茅斯学院，宾夕法尼亚大学，克利夫兰艺术博物馆，香港中文大学", tag: "经典中国工程 & 国家出版基金项目", isbn: "9781487812737" },
    { title: "中国佛教哲学要义（两卷）", publisher: "人民大学出版社", collections: "哈佛大学，普林斯顿大学，布朗大学，斯坦福大学，宾夕法尼亚大学，加利福尼亚大学，纽约大学，香港中文大学", isbn: "9781487812287 9781487812294" },
    { title: "中国有个毛泽东", publisher: "人民出版社", collections: "哈佛大学，斯坦福大学，纽约大学，达特茅斯图书馆，杜兰大学，柏林国家图书馆，香港中文大学，香港科技大学，国王大学，旧金山公共图书馆", tag: "当代作品翻译工程", isbn: "9781487812690" },
    { title: "世界社会主义研究（社科院期刊）", publisher: "中国社会科学出版社", collections: "哈佛大学，哥伦比亚大学，麻省理工学院，纽约大学，加州大学洛杉矶分校，悉尼大学", isbn: "9781487813161 9781487813734" },
    { title: "基于科学的产业创新—从诺贝尔奖成果到商业产品的过程研究", publisher: "清华大学出版社", collections: "柏林国家图书馆，纽约大学，悉尼大学，香港科技大学，加利福尼亚大学", tag: "国家社会科学基金重点项目 & 国家自然科学基金青年项目成果", isbn: "9781487811686" },
    { title: "世界开放报告（2024，2025）", publisher: "中国社会科学出版社", collections: "哈佛大学，耶鲁大学，普林斯顿大学", tag: "虹桥国际经济论坛旗舰成果", isbn: "9781487813055 9781487813789" },
    { title: "读懂中国共产党", publisher: "北京联合出版公司", collections: "哈佛大学，普林斯顿大学，布朗大学，耶鲁大学，斯坦福大学，纽约大学，香港中文大学，巴伐利亚州立图书馆", isbn: "9781487812355" },
    { title: "中国票据简史", publisher: "中国金融出版社", collections: "", isbn: "9781487813345" },
    { title: "资源生成与经济增长：兼论有为政府行为准则", publisher: "北京大学出版社", collections: "", isbn: "9781487813437" },
    { title: "中国司法制度的基础理论问题研究", publisher: "经济科学出版社", collections: "", tag: "教育部哲学社会科学研究重大课题攻关项目成果", isbn: "本项目仅编辑" },
    { title: "地图上的中国历史（四册）", publisher: "江苏人民出版社", collections: "", tag: "经典中国工程", isbn: "9781487809355 9781487809348 9781487809362 9781487809379" },
    { title: "丝绸之路十八讲", publisher: "江西人民出版社", collections: "", tag: "丝路书香工程", isbn: "9781487813918" },
    { title: "中国海洋文化遗产保护研究", publisher: "福建教育出版社", collections: "", tag: "国家出版基金项目 & 教育部人文社会科学重点研究基地重大项目", isbn: "9781487813857" },
    { title: "遣唐使在长安", publisher: "陕西人民出版社", collections: "", tag: "陕西省出版资金资助项目", isbn: "9781487813758" },
    { title: "人圈", publisher: "河海大学出版社", collections: "耶鲁大学，哥伦比亚大学", tag: "国家出版基金项目 & “十三五”江苏省重点图书出版规划项目", isbn: "9781487813680" },
    { title: "澳门通史：从远古至 2019 年", publisher: "广东教育出版社", collections: "", tag: "国家出版基金项目 & 经典中国工程", isbn: "9781487813925" },
    { title: "正道：中国文化传统", publisher: "北京大学出版社", collections: "", tag: "经典中国工程", isbn: "9781487813949" },
    { title: "竞争优势论：经济增长导向说", publisher: "北京大学出版社", collections: "", isbn: "9781487813956" },
    { title: "国际合作视域下的全球抗疫", publisher: "黄山书社", collections: "耶鲁大学，宾夕法尼亚大学", isbn: "9798985249002" },
    { title: "丝绸之路千问千答", publisher: "西北大学出版社", collections: "", isbn: "9781487813970" },
    { title: "体验经济", publisher: "中国大百科全书出版社", collections: "", isbn: "9781487813581" },
    { title: "金沙考古：太阳神鸟重现", publisher: "成都时代出版社", collections: "普林斯顿大学，哥伦比亚大学，威斯康星大学麦迪逊分校，皇后区公共图书馆", isbn: "9781487811570" },
    { title: "Metaphors We Report: A Cognitive-Translational Study of\nNovel Metaphors in Business Discourse", publisher: "英文原版，作者王俊超", collections: "", isbn: "" },
    { title: "Sino-Asia Agriculture Development and Cooperation", publisher: "英文原版，作者陈凯文", collections: "国际食物政策研究所", tag: "浙江大学学术精品走出去项目", isbn: "9781487811761" },
    // --- 艺术 ---
    { title: "什么是云南", publisher: "云南教育出版社", collections: "哈佛大学，布朗大学，耶鲁大学，斯坦福大学，哥伦比亚大学，普林斯顿大学，香港中文大学，加利福利亚大学，旧金山公共图书馆，加州大学洛杉矶分校，密歇根大学", isbn: "9781487811556" },
    { title: "炳灵寺石窟艺术（五册）", publisher: "安徽美术出版社", collections: "马尔堡大学，欧洲学院，蒙特克莱尔州立大学，OCLC WorldCat 知识库", tag: "国家出版基金项目 & 国家社科基金艺术学重大项目", isbn: "9781487812614" },
    // --- 大众 ---
    { title: "万里长城在哪里", publisher: "中信出版集团", collections: "", tag: "经典中国工程", isbn: "9781487813901" },
    { title: "故宫里的大怪兽", publisher: "大百科全书出版社", collections: "多佛公共图书馆，迈阿密戴德公共图书馆", tag: "经典中国工程", isbn: "9781487812775" },
    { title: "桦皮船", publisher: "安徽少儿出版社", collections: "", tag: "”十四五”国家重点出版物出版专项规划项目 & 中国作家协会重点作品扶持项目", isbn: "9781487812966" },
    { title: "盗墓笔记（磨铁版）", publisher: "人民大学出版社", collections: "", isbn: "" },
    { title: "世界文学之都：南京", publisher: "南京出版社", collections: "哈佛大学，普林斯顿大学，哥伦比亚大学，费城免费图书馆，旧金山公共图书馆，密苏拉公共图书馆", tag: "亚洲经典著作互译计划", isbn: "9781487811327" },
    { title: "我和小素", publisher: "安徽少儿出版社", collections: "", tag: "优秀现实题材文学出版工程", isbn: "9781487812423" },
    { title: "这就是村 BA", publisher: "贵州人民出版社", collections: "", tag: "贵州省出版传媒事业发展专项资金资助项目", isbn: "9781487813413" },
    { title: "中国—东盟谚语引共鸣", publisher: "云南教育出版社", collections: "哈佛大学，纽约大学，香港中文大学，国王大学", isbn: "9781487812973" },
    { title: "RCEP 框架下的中老铁路", publisher: "云南教育出版社", collections: "哈佛大学，普林斯顿大学，哥伦比亚大学，纽约大学，新加坡国家图书馆，西北大学，香港中文大学", isbn: "9781487812997" },
    { title: "速读澜湄合作 点赞丰硕成果", publisher: "云南教育出版社", collections: "哈佛大学，纽约大学，密歇根大学，柏林国家图书馆", isbn: "9781487812980" },
    { title: "沿着运河看中国", publisher: "河海大学出版社", collections: "", isbn: "9781487804718" },
    { title: "七彩中文", publisher: "暨南大学出版社", collections: "普林斯顿大学，悉尼大学，旧金山公共图书馆，多伦多公共图书馆，洛杉矶公共图书馆，西肯塔基大学", isbn: "9781487811730" },
    { title: "理想的足迹：党的故事青少年读本", publisher: "广东教育出版社", collections: "洛杉矶公共图书馆，伍斯特公共图书馆", isbn: "9781487811679" },
    { title: "砂粒与星尘", publisher: "安徽少儿出版社", collections: "法明顿公共图书馆，皮阿拉普公共图书馆，代顿大都会图书馆", isbn: "9781487811747" },
    { title: "战”疫”装备—应对新冠肺炎疫情的新技术和新装备", publisher: "电子工业出版社", collections: "哈佛大学，斯坦福大学", isbn: "9781487804589" },
    { title: "中国人的文化常识课（三册）", publisher: "广东教育出版社", collections: "美利坚大学，OCLC WorldCat 知识库，越南-德国大学", isbn: "9781487813208" },
    { title: "掼蛋心法", publisher: "首都经济贸易大学出版社", collections: "澳大利亚电子书图书馆", isbn: "9781487813383" },
    { title: "创造自主的数学研究", publisher: "大连理工大学出版社", collections: "科罗拉多大学博尔德分校", isbn: "9781487813604" },
    { title: "做好的数学", publisher: "大连理工大学出版社", collections: "加州州立大学富勒顿分校，科罗拉多大学博尔德分校", isbn: "9781487813444" },
    { title: "新声", publisher: "广西教育出版社", collections: "香港中文大学，乔治梅森大学，科罗拉多大学博尔德分校", isbn: "9781487813598" },
    { title: "我的表情", publisher: "江苏凤凰文艺出版社", collections: "", isbn: "9781487813864" },
    { title: "Quantum Technology: The Power to Disrupt the Future", publisher: "英文原版，作者陈根", collections: "纽约大学，多伦多公共图书馆，皇后区公共图书馆，香港城市大学", isbn: "9781487811778" },
    { title: "The New Quantum Mechanics", publisher: "英文原版，作者陈根", collections: "宾夕法尼亚大学，山姆休斯顿州立大学，乔治梅森大学", isbn: "9781487811785" },
    { title: "Mind Meld: The Rise of the Brain-Computer Interface", publisher: "英文原版，作者陈根", collections: "耶鲁大学，宾夕法尼亚大学，纽约大学，中央图书馆，杜兰大学，布鲁克林公共图书馆，多伦多公共图书馆，香港大学，香港科技大学", isbn: "9781487811808" },
    { title: "The Future of 4D Printing: Innovations and Applications", publisher: "英文原版，作者陈根", collections: "耶鲁大学，纽约大学，多伦多公共图书馆，香港大学，香港城市大学", isbn: "9781487811846" },
    { title: "Stargazing: Exploring the Mysteries of the Starlink", publisher: "英文原版，作者陈根", collections: "哈佛大学，迈阿密大学，乔治城大学，佐治亚大学，多伦多公共图书馆，香港大学，香港中文大学，悉尼大学", isbn: "9781487811792" },
    { title: "Wearable Technologies: From Basics to Advanced Applications", publisher: "英文原版，作者陈根", collections: "耶鲁大学，多伦多公共图书馆，香港中文大学，香港科技大学，上海图书馆，悉尼大学", isbn: "9781487811839" },
    { title: "Web 3.0: The Future of Decentralized Internet", publisher: "英文原版，作者陈根", collections: "纽约大学，多伦多公共图书馆，丹佛大学，悉尼大学，香港大学，香港科技大学", isbn: "9781487811815" },
    { title: "The Rise of ChatGPT: An Insight into the Next Era of AI", publisher: "英文原版，作者陈根", collections: "美国总统行政办公室图书馆，林肯总统图书馆，布鲁克林公共图书馆，东芝加哥公共图书馆", isbn: "9781487811594" },
    { title: "The Digital Twin 2.0: The Future of Technology and Business", publisher: "英文原版，作者陈根", collections: "中西部州立大学，多伦多公共图书馆，香港城市大学，昆士兰科技大学", isbn: "9781487811822" },
    { title: "Citizen of New Confucianism", publisher: "英文原版，作者徐诚直", collections: "", isbn: "9781487812201" },
    { title: "《提灯者》（三册）", publisher: "河海大学出版社", collections: "", isbn: "9781487813895" },
    { title: "百褶裙", publisher: "广西民族出版社", collections: "阿卡迪亚公共图书馆", tag: "经典中国工程", isbn: "9798985249095" },
    { title: "哪吒闹海", publisher: "长江少儿出版社", collections: "阿卡迪亚公共图书馆，代顿大都会图书馆", tag: "经典中国工程", isbn: "9798985249071" },
    { title: "麒麟的远航", publisher: "长江少儿出版社", collections: "欧文公共图书馆，艾伦县公共图书馆", isbn: "9781487812713" },
    { title: "种梨", publisher: "长江少儿出版社", collections: "阿卡迪亚公共图书馆，代顿大都会图书馆", tag: "经典中国工程", isbn: "9798985249088" },
    { title: "中国故事 节日篇（四册）", publisher: "河海大学出版社", collections: "金县图书馆系统，莫林公共图书馆", isbn: "9781487811518" },
    { title: "数学简史探秘之旅（三册）", publisher: "电子工业出版社", collections: "新西兰国家图书馆，拉伯克公共图书馆", isbn: "9781487811716" },
    { title: "中国故事 四大贡献（四册）", publisher: "河海大学出版社", collections: "哈佛大学，耶鲁大学", isbn: "9781487813291" },
    { title: "浙里蔚蓝色 海博士带你探究海域立体分层", publisher: "浙江科学技术出版社", collections: "美利坚大学，诺威治大学，OCLC WorldCat 知识库，马尔堡大学", isbn: "9781487813406" },
    // ===== 指导编校项目 =====
    // --- 学术 ---
    { title: "现代儒家哲学研究", publisher: "北京大学出版社", collections: "哈佛大学，普林斯顿大学，斯坦福大学，布朗大学，宾夕法尼亚大学，芝加哥大学，纽约大学，香港中文大学，香港科技大学，悉尼大学", tag: "经典中国工程 · 指导编校", isbn: "9781487812027" },
    { title: "超级杂交水稻亩产 900 千克栽培新技术", publisher: "湖南科技出版社（袁隆平团队）", collections: "哈佛大学，普林斯顿大学，哥伦比亚大学，加州大学戴维斯分校", tag: "国家出版基金项目 & 中国图书对外推广计划 · 指导编校", isbn: "9781487813048" },
    { title: "中华人民共和国改革开放史（1978–2021）", publisher: "人民大学出版社", collections: "哈佛大学，普林斯顿大学，斯坦福大学，纽约大学，香港中文大学，香港科技大学，悉尼大学", tag: "指导编校", isbn: "9781487810795" },
    { title: "中国挖泥船研发史", publisher: "上海交通大学出版社", collections: "", tag: "指导编校（Springer 出版）", isbn: "" },
    { title: "长城：追问与共鸣", publisher: "燕山大学出版社", collections: "纽约大学，加利福尼亚大学，香港中文大学，乔治梅森大学，俄克拉荷马大学", tag: "指导编校", isbn: "9781487813260" },
    { title: "革命与先驱—早期革命者的家国情怀与历史形象", publisher: "中国社会科学出版社", collections: "", tag: "指导编校", isbn: "" },
    { title: "Visualized Gender and Gendered Visuality:\nContemporary Chinese Women's Visual Culture", publisher: "英文原版，作者姚玲玲", collections: "", tag: "指导编校", isbn: "" },
    // --- 大众 ---
    { title: "中国关键词：文明理念篇", publisher: "新世界出版社", collections: "", tag: "中国外文局牵头国家级重点项目 · 指导编校", isbn: "9781487813833" },
    { title: "细胞简史", publisher: "上海交大出版社", collections: "宾夕法尼亚大学，华盛顿大学，纽约大学，香港中文大学", tag: "指导编校", isbn: "9781487813017" },
    { title: "壮医药", publisher: "广西科技出版社", collections: "", tag: "经典中国工程 · 指导编校", isbn: "9781487813093" },
    { title: "成都茶馆", publisher: "成都时代出版社", collections: "普林斯顿大学，哥伦比亚大学，威斯康星大学麦迪逊分校", tag: "指导编校", isbn: "9781487811563" },
    { title: "雷锋：人类美好的向往", publisher: "湖北教育出版社", collections: "乔治城大学，科罗拉多州立大学", tag: "指导编校", isbn: "9781487813321" },
    { title: "罗氏正骨", publisher: "广西科技出版社", collections: "爱丽丝·L·沃尔顿医学院，OCLC WorldCat 知识库，生命太平洋大学", tag: "指导编校", isbn: "9781487813079" },
    { title: "舌尖上的三月三", publisher: "广西科技出版社", collections: "爱丽丝·L·沃尔顿医学院，生命太平洋大学", tag: "指导编校", isbn: "9781487813086" },
    { title: "一带一路走东盟", publisher: "广西科技出版社", collections: "OCLC WorldCat 知识库，生命太平洋大学", tag: "指导编校", isbn: "9781487813062" },
    { title: "花山岩画", publisher: "广西科技出版社", collections: "OCLC WorldCat 知识库，生命太平洋大学", tag: "指导编校", isbn: "9781487813109" },
    { title: "远山灯火", publisher: "安徽少儿出版社", collections: "", tag: "指导编校", isbn: "9781487812430" },
    { title: "街上的马", publisher: "安徽少儿出版社", collections: "", tag: "指导编校", isbn: "9798989077083" },
    // --- 绘本 ---
    { title: "一滴水的奇妙之旅", publisher: "河海大学出版社", collections: "迈阿密戴德公共图书馆系统，盐湖县图书馆", tag: "”十四五”江苏省重点出版物出版专项规划项目 · 指导编校", isbn: "9781487813024" },
    { title: "马兰的歌声", publisher: "安徽少儿出版社", collections: "多伦多公共图书馆", tag: "指导编校", isbn: "9781487811754" },
    { title: "人类与千年洪水", publisher: "科学普及出版社", collections: "", tag: "指导编校", isbn: "9781487813826" },
    { title: "历代名医故事 绘本", publisher: "上海科学技术出版社", collections: "", tag: "指导编校", isbn: "9781487814076" },
    // --- 艺术 ---
    { title: "中国长城", publisher: "燕山大学出版社", collections: "", tag: "国家出版基金项目 · 指导编校", isbn: "9781487814045" },
    { title: "狞厉与肃穆：中国古代青铜器的纹样", publisher: "浙江古籍出版社", collections: "", tag: "指导编校", isbn: "9781487813963" },
    { title: "什么是青海", publisher: "青海人民出版社", collections: "", tag: "指导编校", isbn: "9781487814090" },
    { title: "西南民间艺术珍藏·蜡染", publisher: "贵州教育出版社", collections: "", tag: "贵州省出版传媒事业发展专项资金资助 · 指导编校", isbn: "9781487814069" },
  ];

  const independentProjects = projects.filter(p => !p.tag?.includes('指导编校'));
  const supervisedProjects = projects.filter(p => p.tag?.includes('指导编校'));
  const displayTag = (tag?: string) => tag?.replace(/[··]?\s*指导编校.*$/g, '').trim();
  const codeSnippet = `// 1. 英文拼写数字识别 (English number spelling recognition)
var baseNumbers = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
function findSpelledNumbers() {
    app.findGrepPreferences.findWhat = "(?i)\\\\b(" + baseNumbers.join("|") + ")\\\\b";
    return app.activeDocument.findGrep();
}

// 2. 行尾连字符校对 (End-of-line hyphenation check)
function checkEndHyphens() {
    app.findGrepPreferences.findWhat = "-\\\\r";
    var found = app.activeDocument.findGrep();
    // Highlight or log for manual review
}

// 3. 连续数字格式化 (CMOS Inclusive numbers)
function formatInclusiveNumbers() {
    app.findGrepPreferences.findWhat = "\\\\d+-\\\\d+";
    var found = app.activeDocument.findGrep();
    for (var i = 0; i < found.length; i++) {
        var nums = found[i].contents.split("-");
        found[i].contents = applyCMOSRule(nums[0], nums[1]);
    }
}

// 4. 序数词格式化 (Ordinal number formatting)
function formatOrdinals() {
    app.findGrepPreferences.findWhat = "(?<=\\\\d)(st|nd|rd|th)\\\\b";
    var found = app.activeDocument.findGrep();
    for (var i = 0; i < found.length; i++) {
        found[i].fillColor = app.activeDocument.swatches.item("MyRed");
    }
}

// 5. 行尾漏空检查 (End-of-line missing space check)
function checkMissingSpaces() {
    app.findGrepPreferences.findWhat = " +\\\\r";
    var found = app.activeDocument.findGrep();
    // Highlight or remove trailing spaces
}`;

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-sans selection:bg-grayblue selection:text-white pb-24">
      <div className="grain-overlay"></div>
      
      {/* DV UI Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 p-4 md:p-8 flex flex-col justify-between font-mono text-xs md:text-sm text-ink/60 mix-blend-multiply">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent dv-rec"></div>
            <span className="font-bold tracking-widest">REC</span>
            <span className="ml-4">{formatTime(time)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>SP</span>
            <Battery className="w-5 h-5" />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex space-x-4 items-center">
            <Video className="w-5 h-5" />
            <span>F2.8</span>
            <span>0dB</span>
          </div>
          <div>
            <span>{formatDate(time)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-8 glitch-hover cursor-default">
              Han<br/>Songwen
            </h1>
            <div className="scan-edge pl-6 md:pl-8 border-l-2 border-ink/20">
              <p className="text-2xl md:text-3xl font-serif text-ink mb-6">
                Technology for Knowledge
              </p>
              <p className="text-sm md:text-base font-mono max-w-2xl leading-relaxed text-ink/70">
                Exploring how technology reshapes the way knowledge
                is created, preserved, and shared.
              </p>

              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-8 max-w-lg">
                <div className="border border-ink/15 bg-white/50 p-3 md:p-4 text-center hover:border-ink/30 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-ink">120+</div>
                  <div className="font-mono text-[10px] md:text-xs text-ink/50 mt-1 uppercase tracking-wider">Published<br/>Titles</div>
                </div>
                <div className="border border-ink/15 bg-white/50 p-3 md:p-4 text-center hover:border-ink/30 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-ink">20+</div>
                  <div className="font-mono text-[10px] md:text-xs text-ink/50 mt-1 uppercase tracking-wider">National<br/>Projects</div>
                </div>
                <div className="border border-ink/15 bg-white/50 p-3 md:p-4 text-center hover:border-ink/30 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold tracking-tight text-ink">30%</div>
                  <div className="font-mono text-[10px] md:text-xs text-ink/50 mt-1 uppercase tracking-wider">Workflow<br/>Efficiency</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative flex items-center justify-center mt-12 lg:mt-0">
            {/* Complete Archive Button */}
            <button 
              onClick={handleScrollToArchive}
              className="w-full aspect-square bg-ink text-paper p-8 flex flex-col justify-between transform hover:scale-105 transition-all duration-500 shadow-2xl relative overflow-hidden group text-left z-10"
            >
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/texture/800/800?grayscale')] opacity-10 mix-blend-overlay pointer-events-none"></div>
              <div className="flex justify-between font-mono text-xs uppercase tracking-widest opacity-60 relative z-10">
                <span>Index</span>
                <span className="group-hover:text-accent transition-colors">Open</span>
              </div>
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 leading-tight group-hover:text-accent transition-colors">
                  COMPLETE<br/>ARCHIVE
                </div>
                <div className="font-mono text-xs opacity-60 mt-4 border-t border-paper/20 pt-4">(120+ TITLES)</div>
              </div>
            </button>
            
            </div>
        </div>

        {/* Selected Works */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b-2 border-ink/10 pb-4 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
                Selected Works
              </h2>
              <p className="mt-3 font-mono text-sm md:text-base text-ink/60 tracking-wide leading-relaxed">
                Books, scholarship, and visual heritage.
              </p>
              <p className="mt-1 font-mono text-xs text-ink/40 tracking-wide">
                Selected from 120+ published titles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

            {/* Card 1 — 南京: Knowledge Across Cultures */}
            <div className="group cursor-pointer flex flex-col h-full">
              <div className="bg-white p-1 border border-ink/20 shadow-sm aspect-[3/4] mb-4 overflow-hidden relative dreamcore-cover transition-transform duration-500 group-hover:-translate-y-1">
                <img src={assetPath('南京.jpg')} alt="世界文学之都：南京" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="flex-grow flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Across Cultures</div>
                <h3 className="font-serif font-bold text-xl leading-tight">世界文学之都：南京</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/70">
                  Telling the story of Nanjing as a UNESCO City of Literature to a global audience.
                </p>
                <div className="mt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">Contribution </span>
                  <span className="font-mono text-[11px] text-ink/60">Editorial Coordination &middot; International Publishing</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Cultural Heritage</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Literary History</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Cross-cultural Communication</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 italic leading-relaxed mt-2 border-t border-ink/10 pt-3">
                  Held by Harvard, Princeton, Columbia, and other global libraries.
                </p>
                <button onClick={() => setSelectedPreview('nanjing')} className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">Document Preview</button>
              </div>
            </div>

            {/* Card 2 — 号角: Knowledge Through Print */}
            <div className="group cursor-pointer md:translate-y-6 flex flex-col h-full">
              <div className="bg-white p-1 border border-ink/20 shadow-sm aspect-[3/4] mb-4 overflow-hidden relative dreamcore-cover transition-transform duration-500 transform rotate-1 group-hover:-translate-y-1 group-hover:rotate-1 group-hover:shadow-md">
                <img src={assetPath('号角.jpg')} alt="号角—红色印刷记忆" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="flex-grow flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Through Print</div>
                <h3 className="font-serif font-bold text-xl leading-tight">号角：红色印刷记忆</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/70">
                  Preserving the material history of revolutionary print culture in modern China.
                </p>
                <div className="mt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">Contribution </span>
                  <span className="font-mono text-[11px] text-ink/60">Editorial Coordination &middot; Print History Research</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Print Culture</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Cultural Memory</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Publishing History</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 italic leading-relaxed mt-2 border-t border-ink/10 pt-3">
                  Held by Harvard, Chicago, NYU, Penn, Dartmouth, and other research libraries.
                </p>
                <button onClick={() => setSelectedPreview('haojiao')} className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">Document Preview</button>
              </div>
            </div>

            {/* Card 3 — 早期中国: Knowledge Through Scholarship */}
            <div className="group cursor-pointer flex flex-col h-full">
              <div className="bg-white p-1 border border-ink/20 shadow-sm aspect-[3/4] mb-4 overflow-hidden relative dreamcore-cover transition-transform duration-500 group-hover:-translate-y-1">
                <img src={assetPath('早期中国.jpg')} alt="早期中国" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="flex-grow flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Through Scholarship</div>
                <h3 className="font-serif font-bold text-xl leading-tight">早期中国</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/70">
                  Bringing Chinese archaeological and historical scholarship to an international readership.
                </p>
                <div className="mt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">Contribution </span>
                  <span className="font-mono text-[11px] text-ink/60">Editorial Coordination &middot; Academic Publishing</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Archaeology</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Chinese History</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Academic Dissemination</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 italic leading-relaxed mt-2 border-t border-ink/10 pt-3">
                  Held by Harvard, Yale, Princeton, Stanford, Penn, and other university libraries.
                </p>
                <button onClick={() => setSelectedPreview('early-china')} className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">Document Preview</button>
              </div>
            </div>

            {/* Card 4 — 什么是云南: Knowledge Through Visual Culture */}
            <div className="group cursor-pointer flex flex-col h-full">
              <div className="bg-white p-1 border border-ink/20 shadow-sm aspect-[3/4] mb-4 overflow-hidden relative dreamcore-cover transition-transform duration-500 group-hover:-translate-y-1">
                <img src={assetPath('什么是云南.png')} alt="什么是云南" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
              </div>
              <div className="flex-grow flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Through Visual Culture</div>
                <h3 className="font-serif font-bold text-xl leading-tight">什么是云南</h3>
                <p className="font-mono text-xs leading-relaxed text-ink/70">
                  Introducing Yunnan&apos;s landscapes and cultures through a landmark visual publication.
                </p>
                <div className="mt-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink/40">Contribution </span>
                  <span className="font-mono text-[11px] text-ink/60">Editorial Coordination &middot; Visual Publishing</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Visual Culture</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Regional Heritage</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Art Publishing</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 italic leading-relaxed mt-2 border-t border-ink/10 pt-3">
                  Held by Harvard, Yale, Stanford, Columbia, Princeton, and other global libraries.
                </p>
                <button onClick={() => setSelectedPreview('yunnan')} className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">Document Preview</button>
              </div>
            </div>

          </div>
        </div>

        {/* AI Lab Section */}
        <div className="mb-24 border border-ink/20 p-4 md:p-8 relative bg-paper/80 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-ink/10 pb-5 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
                AI Lab
              </h2>
              <p className="mt-3 font-mono text-sm md:text-base text-ink/60 tracking-wide leading-relaxed">
                Building AI tools for knowledge work.
              </p>
            </div>
          </div>

          {/* ── PRODUCTS ── */}
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-6">Products</div>

          {/* ── Card 1: Publishing Automation ── */}
          <div className="group mb-10 pb-10 border-b border-ink/5 last:border-b-0 last:pb-0 last:mb-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Visual */}
              <div className="lg:col-span-2">
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
              </div>
              {/* Content */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Workflow</div>
                <h3 className="font-serif font-bold text-xl leading-tight">Publishing Automation</h3>
                <p className="font-mono text-sm leading-relaxed text-ink/70">
                  Turning repetitive editorial rules into executable workflows.
                </p>
                <p className="font-mono text-xs leading-relaxed text-ink/50 mt-0.5">
                  Built automation scripts to support editorial checks, formatting consistency, and production efficiency.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Editorial Workflow</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Automation</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Publishing Tools</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 mt-2">
                  Adobe ExtendScript &middot; GREP &middot; InDesign
                </p>
              </div>
            </div>
          </div>

          {/* ── Card 2: Future Pulse ── */}
          <div className="group mb-10 pb-10 border-b border-ink/5">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Visual — product screenshot */}
              <div className="lg:col-span-2">
                <a href="https://h-wren.github.io/Future-Pulse/" target="_blank" rel="noreferrer" className="block group">
                  <div className="border border-ink/15 overflow-hidden bg-white shadow-sm">
                    <img src={assetPath('future-pulse.png')} alt="Future Pulse" className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-all duration-700" />
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-mono text-[10px] text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Open &rarr;</div>
                  </div>
                </a>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Discovery</div>
                <h3 className="font-serif font-bold text-xl leading-tight">Future Pulse</h3>
                <p className="font-mono text-sm leading-relaxed text-ink/70">
                  Monitoring emerging AI technologies and transforming information into structured intelligence.
                </p>
                <p className="font-mono text-xs leading-relaxed text-ink/50 mt-0.5">
                  Designed a personal intelligence workflow for tracking AI trends, mapping opportunities, and exporting structured reports.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Knowledge Discovery</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">AI Workflow</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Intelligence</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 mt-2">
                  Live Demo &middot; React &middot; Gemini API
                </p>
                <a href="https://h-wren.github.io/Future-Pulse/" target="_blank" rel="noreferrer" className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">Visit Project &rarr;</a>
              </div>
            </div>
          </div>

          {/* ── Card 3: Calligraphy Reader ── */}
          <div className="group mb-10 pb-10 border-b border-ink/5">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Visual — product screenshot */}
              <div className="lg:col-span-2">
                <a href="https://h-wren.github.io/Calligraphy/" target="_blank" rel="noreferrer" className="block group">
                  <div className="border border-ink/15 overflow-hidden bg-white shadow-sm">
                    <img src={assetPath('calligraphy-3.png')} alt="Calligraphy Reader" className="w-full aspect-video object-cover group-hover:scale-[1.02] transition-all duration-700" />
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-mono text-[10px] text-accent mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Open &rarr;</div>
                  </div>
                </a>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Preservation</div>
                <h3 className="font-serif font-bold text-xl leading-tight">Calligraphy Reader</h3>
                <p className="font-mono text-sm leading-relaxed text-ink/70">
                  Recognizing, transcribing, and preserving Chinese calligraphy through AI-assisted document understanding.
                </p>
                <p className="font-mono text-xs leading-relaxed text-ink/50 mt-0.5">
                  AI-assisted Recognition &middot; OCR Workflow &middot; Digital Heritage
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Digital Humanities</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Calligraphy</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">OCR</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Knowledge Preservation</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 mt-2">
                  Python &middot; FastAPI &middot; PaddleOCR &middot; PaddleClas
                </p>
                <a href="https://h-wren.github.io/Calligraphy/" target="_blank" rel="noreferrer" className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">Visit Project &rarr;</a>
              </div>
            </div>
          </div>
{/* ── Card 4: Vibecho ── */}
          <div className="group mb-10 pb-10 border-b border-ink/5">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Visual */}
              <div className="lg:col-span-2">
                <div className="polaroid p-2 pb-8">
                  <div className="relative overflow-hidden bg-white">
                    <video src="https://raw.githubusercontent.com/H-Wren/Website/main/public/vibecho-demo.mp4" controls preload="metadata" playsInline className="w-full aspect-video object-cover bg-ink/5 block">
                      Your browser does not support video playback.
                    </video>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-ink/40 mb-0.5">Prototype</div>
                    <div className="text-lg font-bold tracking-tight uppercase text-ink">Vibecho</div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Transfer</div>
                <h3 className="font-serif font-bold text-xl leading-tight">Vibecho</h3>
                <p className="font-mono text-sm leading-relaxed text-ink/70">
                  Closing the gap between memorization and real communication through AI-assisted practice.
                </p>
                <p className="font-mono text-xs leading-relaxed text-ink/50 mt-0.5">
                  Designed a language-learning prototype that combines shadowing, contextual practice, and feedback.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Language Learning</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">AI Tutor</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Prototype</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 mt-2">
                  Demo Video &middot; React &middot; Gemini API
                </p>
                <a href="https://ai.studio/apps/e8491f42-25a1-417e-8532-fd613b5fbdf2" target="_blank" rel="noreferrer" className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">View Demo &rarr;</a>
              </div>
            </div>
          </div>

          

          {/* ── Workflow 1: Interview Copilot ── */}
          <div className="group mb-10 pb-10 border-b border-ink/5 mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Visual — Editorial Diagram */}
              <div className="lg:col-span-2">
                <div className="border border-ink/15 bg-[#faf9f5] aspect-video flex items-center p-4 relative overflow-hidden">
                  {/* Subtle ruled lines */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(0deg, #2c2e30, #2c2e30 1px, transparent 1px, transparent 16px)'}}></div>
                  <div className="relative z-10 w-full">
                    <div className="leading-snug">
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">│</span>
                      <span className="font-mono text-[10px] text-ink/70">Interview</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Question Analysis</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Knowledge Retrieval</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Prompt Refinement</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Practice</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Feedback</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">└──</span>
                      <span className="font-mono text-[10px] text-ink/70">Iteration</span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Knowledge Organization</div>
                <h3 className="font-serif font-bold text-xl leading-tight">Interview Copilot</h3>
                <p className="font-mono text-sm leading-relaxed text-ink/70">
                  Structuring interview preparation into reusable AI-assisted workflows.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Knowledge Organization</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">AI Workflow</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Prompt Engineering</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 mt-2">
                  Claude Code &middot; Skill
                </p>
                <a href="https://github.com/H-Wren/my-interview.git" target="_blank" rel="noreferrer" className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">View Repository &rarr;</a>
              </div>
            </div>
          </div>

          {/* ── Workflow 2: Career Preparation Workflow ── */}
          <div className="group mb-10 pb-10 border-b border-ink/5">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Visual — Editorial Diagram */}
              <div className="lg:col-span-2">
                <div className="border border-ink/15 bg-[#faf9f5] aspect-video flex items-center p-4 relative overflow-hidden">
                  {/* Subtle ruled lines */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(0deg, #2c2e30, #2c2e30 1px, transparent 1px, transparent 16px)'}}></div>
                  <div className="relative z-10 w-full">
                    <div className="leading-snug">
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">│</span>
                      <span className="font-mono text-[10px] text-ink/70">Job Description</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Requirement Analysis</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Knowledge Extraction</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Learning Plan</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Mock Interview</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">├──</span>
                      <span className="font-mono text-[10px] text-ink/70">Reflection</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-ink/20 w-5 shrink-0 font-mono text-[10px]">└──</span>
                      <span className="font-mono text-[10px] text-ink/70">Improvement</span>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">Learning Workflow</div>
                <h3 className="font-serif font-bold text-xl leading-tight">Career Preparation Workflow</h3>
                <p className="font-mono text-sm leading-relaxed text-ink/70">
                  Transforming fragmented career research into structured learning and preparation workflows.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Learning Workflow</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Knowledge Management</span>
                  <span className="font-mono text-[10px] border border-ink/15 px-2 py-0.5 text-ink/60">Career Development</span>
                </div>
                <p className="font-mono text-[10px] text-ink/30 mt-2">
                  Codex &middot; Skill
                </p>
                <a href="https://github.com/H-Wren/job-interview-prep.git" target="_blank" rel="noreferrer" className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-3 py-1.5 hover:bg-accent hover:text-white transition-colors duration-300 self-start">View Repository &rarr;</a>
              </div>
            </div>
          </div>

          {/* ── Skills Tag Cloud ── */}
          <div className="mt-8 pt-8 border-t border-ink/10">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/30 mb-4">Core Skills</div>
            <div className="flex flex-wrap gap-2">
              {['Knowledge Management', 'Automation', 'AI Applications', 'Prompt Engineering', 'Editorial Workflow', 'Digital Archives', 'Publishing Tools', 'Research Workflow', 'Python', 'React'].map((skill) => (
                <span key={skill} className="font-mono text-[10px] border border-ink/15 px-2.5 py-1 text-ink/50 hover:border-ink/30 hover:text-ink/70 transition-colors cursor-default">{skill}</span>
              ))}
            </div>
          </div>

          {/* ── Open Source / GitHub ── */}
          <div className="mt-8 pt-8 border-t border-ink/10">
            <div className="bg-ink text-paper p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/30 mb-2">Open Source</div>
                  <p className="text-sm leading-relaxed text-paper/60 font-mono max-w-2xl">
                    Exploring AI agents, tools, and automation workflows through code.
                  </p>
                </div>
                <a href="https://github.com/H-Wren" target="_blank" rel="noreferrer" className="shrink-0 inline-flex items-center gap-2 border border-paper/20 px-4 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-paper hover:text-ink transition-colors">View GitHub <ExternalLink className="w-3 h-3" /></a>
              </div>
            </div>
          </div>
        </div>


        {/* Independent Projects Drawer */}
        <div id="archive-section" className="scroll-mt-24">
          <AnimatePresence>
            {isArchiveOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden mb-32"
              >
                <div className="bg-paper/80">
                  <div className="mb-6 border-b-2 border-ink/10 pb-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center">
                      <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
                      Independent Projects
                    </h2>
                    <p className="mt-2 font-mono text-sm md:text-base text-ink/60 tracking-wide leading-relaxed">
                      Editorial and publishing projects completed independently.
                    </p>
                  </div>

<p className="font-mono text-[11px] text-ink/40 leading-relaxed mb-6">
                    Bibliographic information is provided where available. Readers may use the ISBN to locate publications through WorldCat, Amazon, and other international library catalogues.
                  </p>

                  <div className="space-y-0 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {(isArchiveExpanded ? independentProjects : independentProjects.slice(0, 8)).map((p, i) => (
                      <div key={i} className="group flex flex-col md:flex-row md:items-start border-b border-ink/10 py-4 hover:bg-ink/5 transition-colors -mx-4 px-4 md:-mx-8 md:px-8">
                        <div className="font-mono text-xs text-ink/40 w-12 shrink-0 pt-1">{(i+1).toString().padStart(3, '0')}</div>
                        <div className="flex-grow md:pr-8">
                          <h3 className="text-lg font-serif font-bold group-hover:text-grayblue transition-colors inline-block leading-tight whitespace-pre-wrap">{p.title}</h3>
                          {displayTag(p.tag) && (
                            <div className="text-xs font-mono text-ink/50 mt-1">{displayTag(p.tag)}</div>
                          )}
                          <div className="text-sm font-mono text-ink/60 mt-1">{p.publisher}</div>
                        </div>
                        <div className="md:w-5/12 mt-3 md:mt-0 font-mono text-xs text-ink/70 leading-relaxed flex flex-col justify-end relative md:self-stretch pb-0.5">
                          {p.collections && <span className="block">{p.collections}</span>}
{p.isbn && p.isbn !== '本项目仅编辑' && (
                            <div className="font-mono text-[10px] text-ink/30 leading-relaxed mt-1">
                              ISBN {p.isbn}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {independentProjects.length > 8 && !isArchiveExpanded && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setIsArchiveExpanded(true)}
                        className="font-mono text-xs uppercase tracking-widest text-ink/60 border border-ink/20 px-5 py-2.5 hover:border-ink/40 hover:text-ink transition-colors duration-300"
                      >
                        View All Independent Projects (+{independentProjects.length - 8} more) &darr;
                      </button>
                    </div>
                  )}

                  <div className="mt-6 pt-4 border-t border-dashed border-ink/20 flex justify-between items-center font-mono text-xs uppercase text-ink/50">
                    <span>End of Record</span>
                    <span>Showing {isArchiveExpanded ? independentProjects.length : Math.min(independentProjects.length, 8)} of {independentProjects.length} Items</span>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {supervisedProjects.length > 0 && (
          <div className="mb-24 border border-ink/20 p-4 md:p-8 relative bg-paper/80 shadow-sm">
            <div className="mb-6 border-b-2 border-ink/10 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
                Supervised Projects
              </h2>
              <p className="mt-2 font-mono text-sm md:text-base text-ink/60 tracking-wide leading-relaxed">
                Projects supervised and reviewed.
              </p>
            </div>

                  <p className="font-mono text-[11px] text-ink/40 leading-relaxed mb-6">
                    Bibliographic information is provided where available. Readers may use the ISBN to locate publications through WorldCat, Amazon, and other international library catalogues.
                  </p>

            <div className="space-y-0 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {(isArchiveExpanded ? supervisedProjects : supervisedProjects.slice(0, 8)).map((p, i) => (
                <div key={'supervised-' + i} className="group flex flex-col md:flex-row md:items-start border-b border-ink/10 py-4 hover:bg-ink/5 transition-colors -mx-4 px-4 md:-mx-8 md:px-8">
                  <div className="font-mono text-xs text-ink/40 w-12 shrink-0 pt-1">{(i + 1).toString().padStart(3, '0')}</div>
                  <div className="flex-grow md:pr-8">
                    <h3 className="text-lg font-serif font-bold group-hover:text-grayblue transition-colors inline-block leading-tight whitespace-pre-wrap">{p.title}</h3>
                    {displayTag(p.tag) && <div className="text-xs font-mono text-ink/50 mt-1">{displayTag(p.tag)}</div>}
                    <div className="text-sm font-mono text-ink/60 mt-1">{p.publisher}</div>
                  </div>
                  <div className="md:w-5/12 mt-3 md:mt-0 font-mono text-xs text-ink/70 leading-relaxed flex flex-col justify-end relative md:self-stretch pb-0.5">
                    {p.collections && <span className="block">{p.collections}</span>}
{p.isbn && p.isbn !== '本项目仅编辑' && (
                      <div className="font-mono text-[10px] text-ink/30 leading-relaxed mt-1">
                        ISBN {p.isbn}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {supervisedProjects.length > 8 && !isArchiveExpanded && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsArchiveExpanded(true)}
                  className="font-mono text-xs uppercase tracking-widest text-ink/60 border border-ink/20 px-5 py-2.5 hover:border-ink/40 hover:text-ink transition-colors duration-300"
                >
                  View All Supervised Projects (+{supervisedProjects.length - 8} more) &darr;
                </button>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-dashed border-ink/20 flex justify-between items-center font-mono text-xs uppercase text-ink/50">
              <span>End of Supervised Records</span>
              <span>{isArchiveExpanded ? supervisedProjects.length : Math.min(supervisedProjects.length, 8)} of {supervisedProjects.length} Items</span>
            </div>

          </div>
        )}

        <AnimatePresence>
          {selectedPreview && previewData[selectedPreview] && (
            <motion.div
              key="preview-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedPreview(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-paper w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border border-ink/20 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 z-10 bg-paper border-b border-ink/20 flex items-center justify-between px-4 md:px-6 py-3">
                  <div className="font-mono text-xs uppercase tracking-widest text-ink/70">
                    {selectedPreview === 'early-china' ? '早期中国 — 内文预览' : selectedPreview === 'haojiao' ? '号角 — 内文预览' : selectedPreview === 'nanjing' ? '南京 — 内文预览' : '什么是云南 — Interior Page'}
                  </div>
                  <button onClick={() => setSelectedPreview(null)} className="font-mono text-xs text-ink/50 hover:text-accent transition-colors border border-ink/20 px-3 py-1 hover:border-accent">x Close</button>
                </div>
                <div className="p-4 md:p-6 space-y-8">
                  {previewData[selectedPreview].map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <div className="flex items-center gap-3 mb-3 border-b border-ink/10 pb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-ink/70 font-semibold">{section.label}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.images.map((image, imageIndex) => (
                          <a key={imageIndex} href={assetPath(image)} target="_blank" rel="noreferrer" className="border border-ink/20 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group/img">
                            <img src={assetPath(image)} alt={`${section.label} page ${imageIndex + 1}`} className="w-full h-auto object-contain group-hover/img:scale-[1.02] transition-transform duration-500" loading="lazy" />
                            <div className="font-mono text-[9px] text-ink/40 text-center py-1 border-t border-ink/10">Click to open full size · Page {imageIndex + 1}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sticky bottom-0 bg-paper border-t border-ink/20 px-4 md:px-6 py-3 flex justify-between items-center font-mono text-[10px] text-ink/40">
                  <span>End of Preview</span>
                  <button onClick={() => setSelectedPreview(null)} className="text-accent hover:text-ink transition-colors uppercase tracking-widest">x Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Contact */}
        <div className="mb-16">
          <div className="mb-6 border-b-2 border-ink/10 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center">
              <span className="w-2 h-2 rounded-full bg-accent mr-3 animate-pulse"></span>
              Contact
            </h2>
          </div>
          <p className="font-mono text-sm text-ink/60 leading-relaxed mb-4">
            Open to collaborations in publishing, AI, and knowledge systems.
          </p>
          <div className="flex flex-col gap-1 font-mono text-sm text-ink/60">
            <a href="mailto:hsw05859@gmail.com" className="hover:text-accent transition-colors">hsw05859@gmail.com</a>
            <a href="https://github.com/H-Wren" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/songwen-han-1990093ab/" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
          </div>
        </div>

        {/* Footer Marquee */}
        <div className="overflow-hidden whitespace-nowrap border-y border-ink/20 py-4 flex -mx-6 px-6 mt-16">
          <div className="animate-[marquee_20s_linear_infinite] flex space-x-8 font-mono text-sm uppercase tracking-widest opacity-50">
            <span>Knowledge Creation</span>
            <span>•</span>
            <span>Knowledge Preservation</span>
            <span>•</span>
            <span>Knowledge Dissemination</span>
            <span>•</span>
            <span>Editorial Workflow</span>
            <span>•</span>
            <span>Digital Archives</span>
            <span>•</span>
            <span>AI Workflow</span>
            <span>•</span>
            <span>Automation</span>
            <span>•</span>
            <span>Publishing</span>
            <span>•</span>
            <span>Cultural Heritage</span>
            <span>•</span>
            <span>Knowledge Creation</span>
            <span>•</span>
            <span>Knowledge Preservation</span>
            <span>•</span>
            <span>Knowledge Dissemination</span>
            <span>•</span>
            <span>Editorial Workflow</span>
            <span>•</span>
            <span>Digital Archives</span>
            <span>•</span>
            <span>AI Workflow</span>
            <span>•</span>
            <span>Automation</span>
            <span>•</span>
            <span>Publishing</span>
            <span>•</span>
            <span>Cultural Heritage</span>
          </div>

          {/* Colophon */}
          <div className="text-center font-mono text-[10px] text-ink/25 mt-8 tracking-wide">
            Technology for Knowledge &middot; Portfolio v2.0 &middot; Updated July 2026
          </div>
        </div>
      </div>
    </div>
  );
}
