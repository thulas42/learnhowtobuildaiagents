# Global Language Support & Localization Strategy

## Mission

Make AI agent development education accessible to every learner on the planet, regardless of their native language, region, or economic background.

---

## Language Coverage

### Phase 1: Launch Languages (25)

| # | Language | Code | Script | Direction | Region(s) | Speakers (M) |
|---|----------|------|--------|-----------|-----------|--------------|
| 1 | English | en | Latin | LTR | Global | 1,500+ |
| 2 | Mandarin Chinese (Simplified) | zh-CN | CJK | LTR | China, Singapore | 1,100+ |
| 3 | Hindi | hi | Devanagari | LTR | India | 600+ |
| 4 | Spanish | es | Latin | LTR | Spain, Latin America | 550+ |
| 5 | Arabic | ar | Arabic | RTL | Middle East, North Africa | 420+ |
| 6 | French | fr | Latin | LTR | France, Africa, Canada | 320+ |
| 7 | Bengali | bn | Bengali | LTR | Bangladesh, India | 270+ |
| 8 | Portuguese (Brazilian) | pt-BR | Latin | LTR | Brazil, Portugal | 260+ |
| 9 | Russian | ru | Cyrillic | LTR | Russia, CIS | 250+ |
| 10 | Japanese | ja | CJK | LTR | Japan | 125+ |
| 11 | German | de | Latin | LTR | Germany, Austria, Switzerland | 130+ |
| 12 | Korean | ko | Hangul | LTR | South Korea | 80+ |
| 13 | Turkish | tr | Latin | LTR | Turkey | 80+ |
| 14 | Vietnamese | vi | Latin | LTR | Vietnam | 85+ |
| 15 | Italian | it | Latin | LTR | Italy | 65+ |
| 16 | Thai | th | Thai | LTR | Thailand | 60+ |
| 17 | Indonesian | id | Latin | LTR | Indonesia | 200+ |
| 18 | Polish | pl | Latin | LTR | Poland | 45+ |
| 19 | Ukrainian | uk | Cyrillic | LTR | Ukraine | 40+ |
| 20 | Dutch | nl | Latin | LTR | Netherlands, Belgium | 25+ |
| 21 | Persian (Farsi) | fa | Arabic | RTL | Iran, Afghanistan | 110+ |
| 22 | Urdu | ur | Arabic | RTL | Pakistan, India | 230+ |
| 23 | Tamil | ta | Tamil | LTR | India, Sri Lanka, Singapore | 80+ |
| 24 | Swahili | sw | Latin | LTR | East Africa | 100+ |
| 25 | Hebrew | he | Hebrew | RTL | Israel | 9+ |

### Phase 2: Expansion Languages (15+)

| Language | Code | Region | Priority |
|----------|------|--------|----------|
| Tagalog/Filipino | tl | Philippines | High |
| Malay | ms | Malaysia | High |
| Amharic | am | Ethiopia | Medium |
| Hausa | ha | West Africa | Medium |
| Yoruba | yo | Nigeria | Medium |
| Zulu | zu | South Africa | Medium |
| Romanian | ro | Romania | Medium |
| Czech | cs | Czech Republic | Medium |
| Hungarian | hu | Hungary | Medium |
| Greek | el | Greece | Medium |
| Swedish | sv | Sweden | Low |
| Norwegian | no | Norway | Low |
| Finnish | fi | Finland | Low |
| Danish | da | Denmark | Low |
| Burmese | my | Myanmar | Low |

### Phase 3: Community-Driven
- Open translation contributions via Crowdin
- Community reviewers for quality assurance
- Prioritized by user demand and volunteer availability

---

## Localization Depth Levels

### Level 1: Full Localization (Top 10 languages)
- All course text professionally translated
- Video voiceover (native speakers)
- Subtitles
- Localized quizzes
- Localized certificate
- Localized UI/UX
- Regional examples and case studies
- Dedicated community forums
- Live support in language

### Level 2: Standard Localization (Languages 11–25)
- All course text professionally translated
- Video subtitles (no voiceover)
- Localized quizzes
- Localized certificate
- Localized UI/UX
- Community forums (shared with similar languages)

### Level 3: Community Localization (Phase 2+)
- AI-assisted translation with community review
- Video subtitles (community-contributed)
- Localized quizzes (community-reviewed)
- Localized certificate
- Basic UI localization

---

## Translation Workflow

### Process
```
1. English source content created
       ↓
2. Content sent to translation management system (Crowdin/Lokalise)
       ↓
3. Professional translators produce initial translation
       ↓
4. AI quality check (consistency, terminology, completeness)
       ↓
5. Native-speaker reviewer validates
       ↓
6. Technical reviewer checks code-adjacent content
       ↓
7. Published to platform
       ↓
8. Ongoing: User feedback → corrections → updates
```

### Translation Guidelines
- **Code stays in English:** All code, variable names, function names remain in English
- **Code comments:** Translated as inline annotations alongside English originals
- **Technical terms:** Use accepted local terminology where it exists; keep English term in parentheses on first use
  - Example (Japanese): "強化学習 (Reinforcement Learning)"
- **Acronyms:** Keep English acronyms with local explanation
  - Example (Arabic): "LLM (نموذج لغوي كبير)"
- **Tone:** Match the warm, supportive, expert tone across all languages
- **Formality:** Adapt to cultural norms (e.g., formal "you" in German/Japanese, informal in Brazilian Portuguese)

### Terminology Glossary
Maintain a per-language glossary of key terms to ensure consistency:

| English Term | Mandarin | Hindi | Spanish | Arabic | Japanese |
|-------------|----------|-------|---------|--------|----------|
| AI Agent | AI代理 | एआई एजेंट | Agente de IA | وكيل ذكاء اصطناعي | AIエージェント |
| Reinforcement Learning | 强化学习 | प्रबलन अधिगम | Aprendizaje por refuerzo | التعلم المعزز | 強化学習 |
| Prompt Engineering | 提示工程 | प्रॉम्प्ट इंजीनियरिंग | Ingeniería de prompts | هندسة الأوامر | プロンプトエンジニアリング |
| Multi-Agent System | 多智能体系统 | बहु-एजेंट प्रणाली | Sistema multiagente | نظام متعدد الوكلاء | マルチエージェントシステム |
| Vector Database | 向量数据库 | वेक्टर डेटाबेस | Base de datos vectorial | قاعدة بيانات متجهة | ベクトルデータベース |

---

## Regional Considerations

### China
- Platform accessible without VPN (host within China or use approved CDN)
- WeChat login integration
- Alipay/WeChat Pay for payments
- Content compliant with local regulations
- Baidu/Alibaba Cloud model examples alongside OpenAI

### India
- UPI payment integration
- Low-bandwidth optimization (text-first, optional video)
- Multiple language support within single account
- Regional examples (Indian tech companies, local AI initiatives)

### Middle East & North Africa
- Full RTL support
- Friday/Saturday weekend consideration for live events
- Arabic dialect awareness (MSA for content)
- Local payment methods (Mada, Fawry)

### Africa
- Mobile-first design (majority mobile users)
- Offline mode critical (intermittent connectivity)
- M-Pesa and mobile money integration
- Low-data mode (compressed assets)
- SMS notifications option

### Latin America
- PIX (Brazil), OXXO (Mexico) payment methods
- Spanish dialect awareness (neutral Latin American Spanish)
- Portuguese (Brazilian) distinct from European Portuguese

### East Asia
- Line/KakaoTalk integration (Japan/Korea)
- Local cloud provider examples
- Respect for formal communication styles
- High design quality expectations

### Russia & CIS
- Yandex login integration
- Local payment methods
- Cyrillic-optimized typography
- VK social sharing

---

## Content Adaptation Examples

### Scenario Localization
Instead of one-size-fits-all examples, adapt scenarios to be regionally relevant:

**Original (English):**
> "Build a customer support agent for an e-commerce platform like Amazon."

**Adapted:**
- 🇨🇳 Chinese: "Build a customer support agent for an e-commerce platform like Taobao/JD.com."
- 🇮🇳 Hindi: "Build a customer support agent for an e-commerce platform like Flipkart."
- 🇧🇷 Portuguese: "Build a customer support agent for an e-commerce platform like Mercado Livre."
- 🇯🇵 Japanese: "Build a customer support agent for an e-commerce platform like Rakuten."
- 🇳🇬 Swahili: "Build a customer support agent for an e-commerce platform like Jumia."

### API Examples
- Primary: OpenAI, Anthropic (globally available)
- China: Include Baidu ERNIE, Alibaba Qwen examples
- Open-source: Llama, Mistral (available everywhere)

---

## Quality Assurance

### Translation Quality Metrics
- **Accuracy:** Technical correctness of translated content
- **Fluency:** Natural reading in target language
- **Consistency:** Terminology used uniformly throughout
- **Completeness:** No missing content or untranslated strings

### Review Process
- Automated: Spell check, terminology consistency, missing translations
- Human: Native speaker review, technical accuracy check
- User feedback: In-app "suggest translation improvement" button
- Quarterly quality audits per language

### Testing
- UI testing in all supported languages (text overflow, layout breaks)
- RTL layout testing
- Font rendering verification across scripts
- Quiz functionality testing per language
- Certificate generation testing per script/language
