import type { Day, Video, Formula } from "./types";
import { dateForDay } from "./types";
import { questionBank } from "./questions";

const V = (id: string, title: string, channel: string, duration: string, tag: Video["tag"] = "core"): Video => ({
  id, title, channel, duration, tag,
});

const F = (name: string, latex: string, description: string): Formula => ({ name, latex, description });

const phase1: Omit<Day, "questions">[] = [
  {
    id: 1, date: dateForDay(1), phase: 1, subject: "probability",
    title: "Introduction — what is data science?",
    objectives: [
      "Understand the four stages of the data-science workflow",
      "See why probability, linear algebra, optimisation and ML matter for AI",
      "Set up your 60-day study cadence and exam strategy",
    ],
    videos: [
      V("YUrbUOcZcB8", "Introduction to Data Science", "NPTEL · IIT Madras · Raghunathan Rengaswamy", "41:57"),
      V("MTjOuCbdBCo", "Course philosophy and expectation", "NPTEL · IIT Madras", "10:38", "supplement"),
      V("aircAruvnKk", "But what is a neural network? (motivation)", "3Blue1Brown", "18:39", "supplement"),
    ],
    notes: `
<h2>Welcome to the 60-day prep</h2>
<p>You're preparing for the <strong>IIT Madras CODE Web-Enabled MTech in AI</strong> entrance exam (target: July 19, 2026) — the program at <a href="https://code.iitm.ac.in/webmtech">code.iitm.ac.in/webmtech</a>. It's a computer-based / written proctored test. The four-topic syllabus published in the official CODE brochure is:</p>
<ul>
  <li><strong>Probability & Statistics</strong> — conditional and joint probability, RVs, PMF/PDF, joint distributions, sample statistics, graphical descriptive stats, CLT, hypothesis testing (t, z, χ², F)</li>
  <li><strong>Linear Algebra</strong> — vectors, matrices, products, rank, null space, solving systems, pseudo-inverse, distance, projections, eigenvalue decomposition</li>
  <li><strong>Optimization</strong> — types, univariate, multivariate, gradient descent</li>
  <li><strong>Basic Machine Learning</strong> — simple & multiple linear regression, least-squares, kNN, logistic regression, k-means, cross-validation</li>
</ul>
<p>Approximate weighting: Stats ~38%, LA ~27%, Opt ~15%, ML ~20%.</p>
<h3>What the actual paper looks like</h3>
<p>CODE IITM has not published a sample paper for the AI entrance, but its sister program at IIT Madras Zanzibar uses the <em>same four-topic syllabus</em>, and IITMZ's 2023 sample paper is the closest publicly available reference for question style. Patterns to expect:</p>
<ol>
  <li>Which correlation method works for categorical variables? (MSQ — Spearman, Kendall's Tau, Pearson)</li>
  <li>Conditional probability across multiple supplier batches</li>
  <li>Z-score reverse lookup (given z and mean/SD, find score)</li>
  <li>Bayes / COVID test with sensitivity 96.5% and specificity 97%, prevalence 0.23%</li>
  <li>t-statistic for a sample of 10</li>
  <li>Rank of a matrix; eigenvectors of a 2×2; properties of singular matrices (MSQ)</li>
  <li>Joint probability of two uniform RVs</li>
  <li>Absolute max/min of polynomial like 8x − x⁴</li>
  <li>Updating a running mean given a new observation</li>
</ol>
<p>You will solve every one of these patterns by Day 60.</p>
<h3>The official bridge course</h3>
<p>The primary videos for this app are from the NPTEL <em>Data Science for Engineers</em> course taught by Prof. Raghunathan Rengaswamy (IIT Madras Chemical Engineering) — the playlist that current IIT Madras MTech AI students recommend to applicants. The course uses R for code demos; you do <strong>not</strong> need to learn R for the exam. Focus on the maths.</p>
<h3>How exam questions are built</h3>
<p>Short MCQ / MSQ / Numerical, each solvable in under three minutes. Roughly half are conceptual; half are short numerical drills. Two-hour total → ~2.5 minutes per question on average.</p>
<h3>Plan for the next 60 days</h3>
<ul>
  <li><strong>Phase 1 (D1–14):</strong> Probability & Statistics fluency</li>
  <li><strong>Phase 2 (D15–28):</strong> Linear Algebra</li>
  <li><strong>Phase 3 (D29–35):</strong> Optimization</li>
  <li><strong>Phase 4 (D36–49):</strong> Basic ML</li>
  <li><strong>Phase 5 (D50–60):</strong> Three full mocks + targeted revision</li>
</ul>
<h3>How to use this app</h3>
<p>Each day has a primary video (the official NPTEL lecture), optional supplements for visual intuition (StatQuest, 3Blue1Brown), formatted notes, a flashcard formula sheet and a 5-question quiz. You unlock <em>Mark Complete</em> only after attempting the quiz. Aim for 60–90 minutes per day; mocks (D50, D54, D59) require a 2-hour block.</p>
<p><strong>If you are rusty</strong> (CS grad, did ML once long ago), start with the supplement video for visual intuition, then watch the NPTEL primary for the formal version that aligns with what the examiners teach.</p>
<h3>Why probability for AI?</h3>
<p>Every prediction a model makes — a class label, a forecast, a parameter estimate — is <strong>uncertain</strong>. Probability is the language in which that uncertainty is measured, communicated and reasoned about. Without it, "the model says cat" is a guess; with it, "the model assigns 0.87 probability to cat" is a calibrated belief you can act on. This is why probability is the first phase of this prep: every later topic (regression, classification, mock-test scoring) rests on it.</p>
<h3>Statistics in two flavours: descriptive vs inferential</h3>
<p>You will meet both:</p>
<ul>
  <li><strong>Descriptive statistics</strong> summarise a dataset you already have — mean, median, mode, standard deviation, variance, quartiles, histograms, box plots. They describe what is.</li>
  <li><strong>Inferential statistics</strong> generalise from a sample to a population — confidence intervals, hypothesis tests, p-values, test statistics. They reason about what could be.</li>
</ul>
<p>The exam tests both. Days 8–9 build descriptive fluency; Days 10–12 build inferential fluency. A common trap on Day-1-style questions: deciding which side of the line a quantity falls on (e.g., the p-value is inferential; the median is descriptive).</p>
<h3>A 30-second preview of bias and variance (full lesson — Day 40)</h3>
<p>When you train a model on a sample of data, two errors compete:</p>
<ul>
  <li><strong>Bias</strong> — how far off the model's average prediction is from the truth (under-fitting; the model is too simple).</li>
  <li><strong>Variance</strong> — how much the prediction shifts as you re-sample the training set (over-fitting; the model memorises noise).</li>
</ul>
<p>"Low bias + high variance" describes a model that fits the training data very well (low average error) but is unstable across samples — the textbook signature of <strong>over-fitting</strong>. We unpack this fully on Day 40; for Day 1 the headline is enough.</p>
`,
    formulas: [
      F("Exam weight", "Stats 38% · LA 27% · Opt 15% · ML 20%", "Allocate study time roughly in proportion to weight."),
      F("Study cadence", "60–90 min/day, 7 days/week", "Daily consistency beats long weekend bursts for retention."),
    ],
    summary: "Today you set the foundation — the four-stage data-science workflow and your daily cadence. From tomorrow, we go deep into probability.",
  },
  {
    id: 2, date: dateForDay(2), phase: 1, subject: "probability",
    title: "Sample space, events, probability axioms",
    objectives: [
      "Define sample space and event",
      "State Kolmogorov's three axioms",
      "Apply complement, union and inclusion-exclusion rules",
      "Distinguish mutually exclusive from independent events",
    ],
    videos: [
      V("uzkc-qNVoOk", "Probability explained — independent and dependent events", "Khan Academy", "10:02"),
      V("OyddY7DlV58", "Probability Part 1: Rules and Patterns", "Crash Course Statistics", "12:34", "supplement"),
      V("KqlKCO9X9VI", "Statistical Modelling (formal IITM lecture)", "NPTEL · IIT Madras", "25:04", "supplement"),
    ],
    notes: `
<h2>Sample space and events</h2>
<p>A random experiment has a <strong>sample space</strong> Ω of all possible outcomes. An <strong>event</strong> A is a subset of Ω. A single roll of a die has Ω = {1,2,3,4,5,6}; "even" is the event A = {2,4,6}.</p>
<h3>Kolmogorov's three axioms</h3>
<div class="formula-block">1. P(A) ≥ 0 for every event A</div>
<div class="formula-block">2. P(Ω) = 1</div>
<div class="formula-block">3. For pairwise disjoint A₁, A₂, ...: P(∪Aᵢ) = Σ P(Aᵢ)</div>
<h3>Derived rules</h3>
<p><strong>Complement:</strong> P(A') = 1 − P(A). <strong>Union (general):</strong> P(A∪B) = P(A) + P(B) − P(A∩B).</p>
<p><strong>Inclusion–exclusion (3 events):</strong></p>
<div class="formula-block">P(A∪B∪C) = ΣP(Aᵢ) − ΣP(Aᵢ∩Aⱼ) + P(A∩B∩C)</div>
<h3>Mutually exclusive vs independent</h3>
<p>Two events are <em>mutually exclusive</em> if P(A∩B)=0; they cannot both happen. They are <em>independent</em> if P(A∩B)=P(A)P(B); knowing B doesn't change P(A). These are different ideas — a useful exam trap.</p>
<h3>Worked example</h3>
<p>Of 100 students, 60 like maths, 40 like physics, 20 like both. P(student likes at least one)?</p>
<p>P(M∪P) = 0.60 + 0.40 − 0.20 = 0.80. So 80%.</p>
`,
    formulas: [
      F("Complement", "P(A') = 1 − P(A)", "Probability of NOT-A."),
      F("Union", "P(A∪B) = P(A) + P(B) − P(A∩B)", "General addition rule."),
      F("Mutually exclusive", "P(A∩B) = 0", "A and B cannot happen together."),
      F("Independent", "P(A∩B) = P(A) · P(B)", "Knowing one event does not change the other."),
      F("Inclusion–exclusion (3)", "P(A∪B∪C) = ΣP − ΣP(∩) + P(∩∩)", "Alternating sum over intersections."),
    ],
    summary: "You now have the axioms and union/complement rules. Tomorrow we condition probabilities — and that's where Bayes shows up.",
  },
  {
    id: 3, date: dateForDay(3), phase: 1, subject: "probability",
    title: "Conditional probability & Bayes' theorem",
    objectives: [
      "Define P(A|B) and apply it correctly",
      "Use the law of total probability",
      "Derive and use Bayes' theorem",
      "Solve a sensitivity/specificity diagnostic question",
    ],
    videos: [
      V("HZGCoVF3YvM", "Bayes theorem — the geometry of changing beliefs", "3Blue1Brown", "15:11"),
      V("R13BD8qKeTg", "The Bayesian Trap (intuition)", "Veritasium", "10:38", "supplement"),
    ],
    notes: `
<h2>Conditional probability</h2>
<p>The probability of A given B is the fraction of B-outcomes that also satisfy A:</p>
<div class="formula-block">P(A|B) = P(A∩B) / P(B), where P(B) > 0</div>
<p>This restricts the sample space to B, then asks: within B, how often does A occur?</p>
<h3>Multiplication rule</h3>
<div class="formula-block">P(A∩B) = P(A|B) · P(B) = P(B|A) · P(A)</div>
<h3>Law of total probability</h3>
<p>If A₁,...,A_k partition Ω,</p>
<div class="formula-block">P(B) = Σᵢ P(B|Aᵢ) · P(Aᵢ)</div>
<h3>Bayes' theorem</h3>
<div class="formula-block">P(A|B) = P(B|A) · P(A) / P(B)</div>
<p>It reverses the direction of conditioning. The denominator P(B) is usually computed via total probability.</p>
<h3>Worked example — diagnostic test (2023 IITMZ sample paper Q7, same syllabus as CODE IITM)</h3>
<p>"A new COVID-19 test gives a positive result in 96.5% of cases when the individual is affected (sensitivity). It gives a positive in 3% of cases when the individual is healthy. Out of 10,000 individuals, 23 have COVID-19. What is the probability that an individual with a positive test is affected?"</p>
<p>Sensitivity P(+ | disease) = 0.965. P(+ | healthy) = 0.03. Prevalence P(disease) = 23/10000 = 0.0023.</p>
<div class="formula-block">PPV = (0.965 × 0.0023) / (0.965 × 0.0023 + 0.03 × 0.9977) ≈ 0.0691</div>
<p>Even a "95%-accurate" test yields a positive predictive value of only ~6.9% when the base rate is tiny — the classic Bayes paradox. Practise computing this fluently — at exam pace it should take under 90 seconds.</p>
<h3>Mnemonic</h3>
<p>Posterior ∝ Likelihood × Prior. The data updates your belief but cannot create it from nothing.</p>
`,
    formulas: [
      F("Conditional", "P(A|B) = P(A∩B) / P(B)", "Restrict the sample space to B."),
      F("Multiplication", "P(A∩B) = P(A|B)·P(B)", "Chain of conditioning."),
      F("Total probability", "P(B) = Σ P(B|Aᵢ)·P(Aᵢ)", "Marginal via partition."),
      F("Bayes' theorem", "P(A|B) = P(B|A)·P(A) / P(B)", "Reverse the conditioning direction."),
    ],
    summary: "Bayes' theorem is the single most testable result in the qualifier — practise reading sensitivity/specificity questions until they feel obvious.",
  },
  {
    id: 4, date: dateForDay(4), phase: 1, subject: "probability",
    title: "Discrete random variables",
    objectives: [
      "Define PMF, expectation, variance",
      "Use Bernoulli, Binomial, Geometric and Poisson distributions",
      "Compute E[X] and Var(X) for standard discrete distributions",
    ],
    videos: [
      V("Hnq0Gj0H5FQ", "Random Variables and Probability Mass / Density Functions", "NPTEL · IIT Madras", "28:22"),
      V("J8jNoF-K8E8", "The Binomial Distribution and Test, Clearly Explained", "StatQuest with Josh Starmer", "13:51", "supplement"),
      V("oI3hZJqXJuc", "The Main Ideas behind Probability Distributions", "StatQuest with Josh Starmer", "5:14", "supplement"),
    ],
    notes: `
<h2>Discrete random variables</h2>
<p>A discrete RV X takes values in a countable set with PMF p(x) = P(X = x).</p>
<div class="formula-block">Σₓ p(x) = 1,  p(x) ≥ 0</div>
<h3>Expectation and variance</h3>
<div class="formula-block">E[X] = Σ x · p(x);  Var(X) = E[(X − μ)²] = E[X²] − (E[X])²</div>
<h3>Bernoulli(p)</h3>
<p>X ∈ {0,1}, P(X=1) = p. E[X] = p, Var(X) = p(1−p).</p>
<h3>Binomial(n,p)</h3>
<p>Number of successes in n independent Bernoulli(p) trials.</p>
<div class="formula-block">P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ,  E[X] = np,  Var(X) = np(1−p)</div>
<h3>Geometric(p)</h3>
<p>Number of trials until first success.</p>
<div class="formula-block">P(X=k) = (1−p)^{k−1} p,  E[X] = 1/p,  Var(X) = (1−p)/p²</div>
<h3>Poisson(λ)</h3>
<p>Count of events in a fixed interval at rate λ.</p>
<div class="formula-block">P(X=k) = e^{−λ} λᵏ / k!,  E[X] = Var(X) = λ</div>
<h3>Worked example</h3>
<p>Calls arrive at a switchboard at λ=3/hour. P(exactly 5 calls in an hour)?</p>
<p>P(X=5) = e^{−3} · 3⁵ / 5! = (0.0498)(243/120) ≈ 0.1008.</p>
`,
    formulas: [
      F("PMF", "p(x) ≥ 0, Σ p(x) = 1", "Valid probability mass function."),
      F("Expectation", "E[X] = Σ x · p(x)", "Long-run average value of X."),
      F("Variance", "Var(X) = E[X²] − (E[X])²", "Average squared deviation."),
      F("Binomial mean", "E[X] = np", "Sum of independent Bernoullis."),
      F("Poisson mean = variance", "E[X] = Var(X) = λ", "Distinctive identity for Poisson."),
    ],
    summary: "Bernoulli → Binomial → Geometric → Poisson. Memorise the four PMFs and their means/variances — they recur every paper.",
  },
  {
    id: 5, date: dateForDay(5), phase: 1, subject: "probability",
    title: "Continuous random variables",
    objectives: [
      "Define PDF and CDF for continuous RVs",
      "Compute probabilities by integration",
      "Recognise Uniform, Exponential and Normal distributions",
    ],
    videos: [
      V("5iUOa3fz-X4", "Probability Density Functions (PDFs) — continuous random variables", "Socratica", "6:48"),
      V("rzFX5NWojp0", "The Normal Distribution, Clearly Explained", "StatQuest with Josh Starmer", "5:13", "supplement"),
      V("Hnq0Gj0H5FQ", "Random Variables and PMF/PDF (IITM formal version)", "NPTEL · IIT Madras", "28:22", "supplement"),
    ],
    notes: `
<h2>Continuous random variables</h2>
<p>A continuous RV has a probability density function f(x), with P(X ∈ [a,b]) = ∫ₐᵇ f(x) dx. Note: P(X = a) = 0 for any single point.</p>
<div class="formula-block">f(x) ≥ 0,  ∫_{−∞}^{∞} f(x) dx = 1</div>
<h3>CDF</h3>
<div class="formula-block">F(x) = P(X ≤ x) = ∫_{−∞}^{x} f(t) dt</div>
<p>F is non-decreasing, right-continuous, with F(−∞)=0 and F(∞)=1.</p>
<h3>Expectation</h3>
<div class="formula-block">E[X] = ∫ x · f(x) dx;  Var(X) = ∫ (x − μ)² f(x) dx</div>
<h3>Uniform(a, b)</h3>
<p>f(x) = 1/(b−a) on [a,b]. E[X] = (a+b)/2, Var(X) = (b−a)²/12.</p>
<h3>Exponential(λ)</h3>
<p>f(x) = λ e^{−λx} for x ≥ 0. Memory-less. E[X] = 1/λ, Var(X) = 1/λ².</p>
<h3>Normal(μ, σ²)</h3>
<div class="formula-block">f(x) = (1/(σ√(2π))) · exp(−(x−μ)² / (2σ²))</div>
<p>E[X] = μ, Var(X) = σ². Standardise via Z = (X − μ)/σ ~ N(0,1).</p>
<h3>Worked example</h3>
<p>X uniform on [0,5]. P(X ≤ 2) = 2/5 = 0.4. E[X] = 2.5.</p>
`,
    formulas: [
      F("PDF", "f(x) ≥ 0, ∫ f = 1", "Probability density."),
      F("CDF", "F(x) = ∫_{−∞}^{x} f(t) dt", "Cumulative probability."),
      F("Uniform mean", "(a+b)/2", "Centre of the interval."),
      F("Exponential mean", "1/λ", "Reciprocal of the rate."),
      F("Normal density", "f(x) = (1/(σ√2π)) e^{−(x−μ)²/(2σ²)}", "Bell curve, mean μ, variance σ²."),
    ],
    summary: "Continuous RVs replace sums with integrals. The Normal density is worth memorising character-for-character.",
  },
  {
    id: 6, date: dateForDay(6), phase: 1, subject: "probability",
    title: "Normal distribution deep dive",
    objectives: [
      "Convert to z-scores and read standard normal tables",
      "Apply the 68–95–99.7 rule",
      "Compute tail probabilities and percentiles",
    ],
    videos: [
      V("rzFX5NWojp0", "The Normal Distribution — z-scores in context", "StatQuest with Josh Starmer", "5:13"),
    ],
    notes: `
<h2>Standard normal Z ~ N(0, 1)</h2>
<p>Any X ~ N(μ, σ²) can be standardised:</p>
<div class="formula-block">Z = (X − μ) / σ</div>
<h3>The 68–95–99.7 rule</h3>
<ul>
  <li>~68% of mass within ±1σ</li>
  <li>~95% within ±2σ (more precisely 1.96σ)</li>
  <li>~99.7% within ±3σ</li>
</ul>
<h3>Tail probabilities you must memorise</h3>
<div class="formula-block">P(Z > 1.645) ≈ 0.05;  P(Z > 1.96) ≈ 0.025;  P(Z > 2.33) ≈ 0.01;  P(Z > 2.58) ≈ 0.005</div>
<h3>Worked example</h3>
<p>X ~ N(70, 10²). Find P(X > 85).</p>
<p>z = (85 − 70)/10 = 1.5. From tables P(Z > 1.5) ≈ 0.0668. So ~6.7%.</p>
<h3>Percentile inversion</h3>
<p>For 90th percentile, find z such that Φ(z) = 0.90 → z ≈ 1.28. Then x = μ + 1.28 σ.</p>
<h3>Linear combinations</h3>
<p>If X₁,...,Xₙ independent and Normal, then Σ aᵢ Xᵢ is also Normal with mean Σaᵢμᵢ and variance Σaᵢ²σᵢ².</p>
`,
    formulas: [
      F("Z-score", "Z = (X − μ)/σ", "Standardisation."),
      F("68–95–99.7", "P(|Z| ≤ 1, 2, 3) ≈ 0.68, 0.95, 0.997", "Empirical rule."),
      F("95% z", "z = 1.96", "Two-tailed 95% critical value."),
      F("Linear combo", "Σ aᵢ Xᵢ ~ N(Σ aᵢμᵢ, Σ aᵢ²σᵢ²)", "Sum of independent normals."),
    ],
    summary: "Standardise then table-lookup. Memorise z=1.645, 1.96, 2.58 — they cover most exam tail-probability questions.",
  },
  {
    id: 7, date: dateForDay(7), phase: 1, subject: "probability",
    title: "Joint distributions, covariance & correlation types",
    objectives: [
      "Define joint PMF/PDF and marginal distributions",
      "Compute covariance and Pearson correlation",
      "Distinguish Pearson, Spearman's rank, and Kendall's tau correlation",
      "Recognise independence vs uncorrelatedness",
    ],
    videos: [
      V("ar8QlLtYYx0", "Types of Correlation: Pearson, Spearman, Kendall, Point-Biserial, Partial", "Owori Benard", "12:23"),
      V("pYxNSUDSFH4", "Probability is not Likelihood (covariance intuition)", "StatQuest with Josh Starmer", "5:01", "supplement"),
      V("Pm8KV5f3JM0", "Kendall's Tau — easily explained", "numiqo", "8:48", "supplement"),
    ],
    notes: `
<h2>Joint distributions</h2>
<p>For two RVs X and Y, the joint PMF p(x, y) gives P(X=x, Y=y); jointly continuous case uses density f(x,y).</p>
<h3>Marginals</h3>
<div class="formula-block">p_X(x) = Σ_y p(x, y);  f_X(x) = ∫ f(x, y) dy</div>
<h3>Conditional</h3>
<div class="formula-block">p(y | x) = p(x, y) / p_X(x)</div>
<h3>Covariance</h3>
<div class="formula-block">Cov(X, Y) = E[(X − μ_X)(Y − μ_Y)] = E[XY] − E[X]E[Y]</div>
<p><strong>Independent ⇒ uncorrelated</strong>, but the reverse is not generally true. (For jointly Gaussian RVs the reverse <em>does</em> hold.)</p>
<h3>Pearson correlation</h3>
<div class="formula-block">ρ(X, Y) = Cov(X, Y) / (σ_X · σ_Y) ∈ [−1, 1]</div>
<p>Measures <em>linear</em> association between continuous variables. Assumes roughly Normal distributions for the standard inference.</p>
<h3>Spearman's rank correlation (ρ_s)</h3>
<p>Compute Pearson correlation on the <em>ranks</em> of the data, not the raw values:</p>
<div class="formula-block">ρ_s = 1 − (6 Σ dᵢ²) / (n(n² − 1))   (no ties version)</div>
<p>where dᵢ is the difference in ranks of the i-th pair. Robust to monotonic but non-linear relationships and to outliers. Works on <strong>ordinal</strong> data.</p>
<h3>Kendall's tau (τ)</h3>
<div class="formula-block">τ = (concordant pairs − discordant pairs) / (n choose 2)</div>
<p>A pair (xᵢ, yᵢ), (xⱼ, yⱼ) is concordant if both x and y move in the same direction; discordant if they move oppositely. Also rank-based, also for ordinal data; more robust than Spearman with small samples and ties.</p>
<h3>Which to use? (exam favorite — Q1 of the 2023 sample paper)</h3>
<table>
  <tr><td>Data type</td><td>Use</td></tr>
  <tr><td>Continuous, roughly linear, roughly Normal</td><td>Pearson</td></tr>
  <tr><td>Ordinal / ranked, monotonic relationship</td><td>Spearman OR Kendall's tau</td></tr>
  <tr><td>Small sample, lots of ties</td><td>Kendall's tau</td></tr>
  <tr><td>Nominal (unordered) categorical</td><td>Chi-square / Cramér's V (not these)</td></tr>
</table>
<p><strong>Memorise:</strong> for categorical (ordinal) variables, Spearman and Kendall's tau apply; Pearson does <em>not</em>.</p>
<h3>Variance of a sum</h3>
<div class="formula-block">Var(aX + bY) = a²Var(X) + b²Var(Y) + 2ab Cov(X, Y)</div>
<h3>Worked example — sample-paper style</h3>
<p>X and Y independent, both Uniform on [−1, 1]. Find P(X + Y &lt; 1).</p>
<p>The joint density on the square [−1,1]² is 1/4. The region X + Y &lt; 1 covers almost the entire square except the triangle with vertices (1, 0), (0, 1), (1, 1). Triangle area = 1/2; total square area = 4; so P(X+Y &lt; 1) = (4 − 1/2)/4 = 7/8.</p>
`,
    formulas: [
      F("Covariance", "Cov(X,Y) = E[XY] − E[X]E[Y]", "Linear co-movement."),
      F("Pearson ρ", "Cov(X,Y)/(σ_X σ_Y)", "Continuous, linear, roughly Normal."),
      F("Spearman ρ_s", "1 − 6 Σ dᵢ² / (n(n² − 1))", "Pearson on ranks; ordinal data."),
      F("Kendall τ", "(concordant − discordant)/C(n,2)", "Ordinal data; robust with ties / small samples."),
      F("Variance of sum", "Var(aX+bY) = a²Var(X) + b²Var(Y) + 2ab Cov(X,Y)", "Watch the cross term."),
      F("Independence ⇒", "Cov = 0", "But Cov = 0 ⇏ independence in general."),
    ],
    summary: "Pearson for continuous/linear; Spearman and Kendall's tau for ordinal/ranked data. The 2023 sample paper opened with exactly this distinction.",
  },
  {
    id: 8, date: dateForDay(8), phase: 1, subject: "probability",
    title: "Descriptive statistics",
    objectives: [
      "Compute mean, median, mode, variance, SD",
      "Distinguish population vs sample statistics",
      "Read quartiles, IQR and box plots",
    ],
    videos: [
      V("Tg5V-11YIqc", "Sample Statistics", "NPTEL · IIT Madras", "33:54"),
      V("mk8tOD0t8M0", "Mode, Median, Mean, Range, and Standard Deviation", "Simple Learning Pro", "9:48", "supplement"),
      V("qBigTkBLU6g", "Histograms, Clearly Explained", "StatQuest with Josh Starmer", "3:25", "supplement"),
      V("fHLhBnmwUM0", "Boxplots are Awesome!!!", "StatQuest with Josh Starmer", "5:22", "supplement"),
    ],
    notes: `
<h2>Centre and spread</h2>
<p><strong>Mean</strong> x̄ = (1/n) Σ xᵢ — sensitive to outliers. <strong>Median</strong> — middle value, robust. <strong>Mode</strong> — most frequent.</p>
<h3>Variance and SD</h3>
<div class="formula-block">σ² (population) = (1/N) Σ (xᵢ − μ)²;  s² (sample) = (1/(n−1)) Σ (xᵢ − x̄)²</div>
<p>The sample variance uses n−1 (Bessel's correction) to make it an unbiased estimator of σ².</p>
<h3>Quartiles and IQR</h3>
<p>Q1 = 25th percentile, Q2 = median, Q3 = 75th percentile. IQR = Q3 − Q1 captures the middle 50% of the data.</p>
<h3>Box plot whiskers</h3>
<p>Standard whiskers extend to min/max within Q1 − 1.5·IQR and Q3 + 1.5·IQR; points outside are flagged as outliers.</p>
<div class="formula-block">Lower fence = Q1 − 1.5·IQR;  Upper fence = Q3 + 1.5·IQR</div>
<p>Worked: data 2, 4, 5, 5, 6, 6, 7, 8, 9, 20. Q1 = 5, Q3 = 8, IQR = 3. Fences = 5 − 4.5 = 0.5 and 8 + 4.5 = 12.5. Value 20 lies above the upper fence ⇒ outlier.</p>
<h3>Reading graphical descriptive plots</h3>
<ul>
  <li><strong>Histogram</strong> — bar heights = frequency in each bin. Long right tail ⇒ right-skewed (mean > median). Long left tail ⇒ left-skewed (mean &lt; median). Two peaks ⇒ bimodal (possibly a mix of two populations).</li>
  <li><strong>Box plot</strong> — box = IQR, line inside = median, whiskers = non-outlier extremes, dots = outliers. Median off-centre inside the box flags skew. Compare distributions across groups by stacking boxplots.</li>
  <li><strong>Scatter plot</strong> — used for bivariate data. Tight band along a line ⇒ strong linear correlation. Curved cloud ⇒ non-linear association. Random cloud ⇒ no relationship.</li>
  <li><strong>Pareto / bar chart</strong> — categorical frequencies sorted descending. Top few bars often dominate; useful for prioritisation.</li>
</ul>
<h3>Skewness ordering (worth memorising)</h3>
<p>Right-skewed: <strong>mode &lt; median &lt; mean</strong>. Left-skewed: <strong>mean &lt; median &lt; mode</strong>. Symmetric: all three coincide.</p>
<h3>Effect of transformations</h3>
<ul>
  <li>Adding c shifts mean by c, variance unchanged</li>
  <li>Scaling by a multiplies mean by a, variance by a²</li>
</ul>
<h3>Updating the mean with a new observation (sample-paper Q14)</h3>
<p>If x̄_n is the mean of the first n observations and a new observation x_{n+1} arrives, the updated mean is:</p>
<div class="formula-block">x̄_{n+1} = (n · x̄_n + x_{n+1}) / (n + 1)</div>
<p>Worked: 48 observations had mean 20. A new value 39 arrives. Updated mean = (48 × 20 + 39) / 49 = 999/49 ≈ 20.39.</p>
<h3>Worked example</h3>
<p>{1, 3, 5, 7, 9}: mean 5, median 5, population variance 8, SD ≈ 2.83.</p>
`,
    formulas: [
      F("Sample mean", "x̄ = (1/n) Σ xᵢ", "Arithmetic mean."),
      F("Sample variance", "s² = (1/(n−1)) Σ (xᵢ − x̄)²", "Unbiased estimator of σ²."),
      F("IQR", "Q3 − Q1", "Middle-50% spread."),
      F("Outlier fences", "[Q1 − 1.5·IQR,  Q3 + 1.5·IQR]", "Values outside are box-plot outliers."),
      F("Skewness order", "right-skew: mode < median < mean", "Mirror for left skew."),
      F("Scaling", "Var(aX + b) = a² Var(X)", "Shifts do not affect variance."),
      F("Recursive mean", "x̄_{n+1} = (n x̄_n + x_{n+1}) / (n + 1)", "Update a running mean — sample-paper Q14."),
    ],
    summary: "Centre with mean/median; spread with variance/IQR. Population uses N, sample uses n−1 — a popular trap. Practice recursive-mean updates — the 2023 paper asked one.",
  },
  {
    id: 9, date: dateForDay(9), phase: 1, subject: "probability",
    title: "Sampling distributions & Central Limit Theorem",
    objectives: [
      "Distinguish population, sample and sampling distributions",
      "State the CLT precisely",
      "Use the standard error of the mean",
    ],
    videos: [
      V("YAlJCEDH2uY", "The Central Limit Theorem, Clearly Explained", "StatQuest with Josh Starmer", "7:35"),
      V("Tg5V-11YIqc", "Sample Statistics — sampling distributions (continued)", "NPTEL · IIT Madras", "33:54", "supplement"),
    ],
    notes: `
<h2>Sampling distribution of the mean</h2>
<p>If we draw many samples of size n from a population and compute each sample's mean, the resulting distribution is the <em>sampling distribution of x̄</em>.</p>
<h3>Two facts you must know</h3>
<div class="formula-block">E[x̄] = μ;  Var(x̄) = σ²/n;  SE = σ/√n</div>
<p>The standard error shrinks as 1/√n — quadrupling the sample halves the SE.</p>
<h3>Central Limit Theorem</h3>
<p>If X₁,...,Xₙ are i.i.d. with mean μ and finite variance σ², then as n → ∞:</p>
<div class="formula-block">√n (x̄ − μ) / σ  →  N(0, 1) in distribution</div>
<p>This holds for <strong>any</strong> population shape — uniform, exponential, even bimodal — provided variance is finite.</p>
<h3>Rule of thumb</h3>
<p>For most populations, n ≥ 30 gives a sample mean that is very close to Normal. Skewed populations need larger n.</p>
<h3>Worked example</h3>
<p>Population σ = 20, n = 100. SE = 20/√100 = 2. So x̄ ~ approximately N(μ, 4).</p>
`,
    formulas: [
      F("Standard error", "SE = σ/√n", "SD of the sample mean."),
      F("CLT", "x̄ ≈ N(μ, σ²/n) for large n", "Independent of population shape."),
      F("E[x̄]", "= μ", "Sample mean is unbiased for population mean."),
    ],
    summary: "CLT is the bedrock of inference. Use SE = σ/√n and standardise to z whenever you see 'sample mean of size n'.",
  },
  {
    id: 10, date: dateForDay(10), phase: 1, subject: "probability",
    title: "Confidence intervals",
    objectives: [
      "Construct CIs for a mean (known and unknown σ)",
      "Interpret the frequentist meaning of confidence",
      "Use the t-distribution for small samples",
    ],
    videos: [
      V("TqOeMYtOc1w", "Confidence Intervals, Clearly Explained", "StatQuest with Josh Starmer", "6:54"),
      V("hlM7zdf7zwU", "Confidence intervals and margin of error", "Khan Academy", "9:11", "supplement"),
    ],
    notes: `
<h2>Confidence interval for a mean</h2>
<p>Given x̄ from n samples with population σ known:</p>
<div class="formula-block">CI = x̄ ± z_{α/2} · σ/√n</div>
<p>For 95% confidence, z_{α/2} = 1.96. For 99%, use 2.58.</p>
<h3>Interpretation (frequentist)</h3>
<p>In 95% of repeated samples, the constructed interval contains μ. It is <strong>not</strong> "P(μ ∈ interval) = 0.95" — μ is fixed.</p>
<h3>Unknown σ — use the t-distribution</h3>
<p>Replace σ with sample SD s and z with t_{n−1, α/2}:</p>
<div class="formula-block">CI = x̄ ± t_{n−1, α/2} · s/√n</div>
<p>The t-distribution has fatter tails than Normal to compensate for the extra uncertainty from estimating σ.</p>
<h3>Worked example</h3>
<p>n=25, x̄=80, s=10. 95% CI? t_{24, 0.025} ≈ 2.064.</p>
<p>ME = 2.064 × 10/5 = 4.128. CI ≈ [75.87, 84.13].</p>
<h3>Margin of error rules</h3>
<ul>
  <li>Larger n → narrower CI (∝ 1/√n)</li>
  <li>Larger confidence → wider CI</li>
  <li>Larger σ → wider CI</li>
</ul>
`,
    formulas: [
      F("CI (σ known)", "x̄ ± z · σ/√n", "Use z from normal table."),
      F("CI (σ unknown)", "x̄ ± t_{n−1} · s/√n", "Use Student's t-distribution."),
      F("Margin of error", "ME = critical · SE", "Determines half-width of CI."),
      F("95% z", "1.96", "Two-sided 95% critical value."),
    ],
    summary: "CI = estimate ± critical × SE. For small samples or unknown σ, use t instead of z.",
  },
  {
    id: 11, date: dateForDay(11), phase: 1, subject: "probability",
    title: "Hypothesis testing — z and t tests",
    objectives: [
      "Frame H₀ vs H₁",
      "Compute z and t test statistics",
      "Interpret p-values and Type I/II errors",
    ],
    videos: [
      V("8oNGkvuRP60", "Hypothesis Testing", "NPTEL · IIT Madras", "37:21"),
      V("0zZYBALbZgg", "Hypothesis testing: p-value, t-test (visual)", "Dr Nic's Maths and Stats", "9:27", "supplement"),
    ],
    notes: `
<h2>The hypothesis-testing pipeline</h2>
<ol>
  <li>State H₀ (status quo) and H₁ (alternative)</li>
  <li>Choose α (significance level), commonly 0.05</li>
  <li>Compute the test statistic</li>
  <li>Find p-value or compare with critical value</li>
  <li>Reject H₀ if p &lt; α, else fail to reject</li>
</ol>
<h3>One-sample z-test (σ known)</h3>
<div class="formula-block">z = (x̄ − μ₀) / (σ/√n)</div>
<h3>One-sample t-test (σ unknown)</h3>
<div class="formula-block">t = (x̄ − μ₀) / (s/√n) with df = n − 1</div>
<h3>Error types</h3>
<ul>
  <li><strong>Type I (α)</strong>: reject true H₀ (false positive)</li>
  <li><strong>Type II (β)</strong>: fail to reject false H₀ (false negative)</li>
  <li><strong>Power</strong>: 1 − β</li>
</ul>
<h3>What a p-value <em>is</em></h3>
<p>P(data at least as extreme as observed | H₀ true). It is NOT the probability that H₀ is true.</p>
<h3>One-sided vs two-sided alternatives</h3>
<p>The form of H₁ determines whether you compare to one or both tails:</p>
<ul>
  <li><strong>Two-sided</strong> H₁: μ ≠ μ₀ — reject if |z| &gt; z<sub>α/2</sub>. Use when "different in either direction" is the claim.</li>
  <li><strong>One-sided (right)</strong> H₁: μ &gt; μ₀ — reject if z &gt; z<sub>α</sub>.</li>
  <li><strong>One-sided (left)</strong> H₁: μ &lt; μ₀ — reject if z &lt; −z<sub>α</sub>.</li>
</ul>
<p><strong>Framing rule:</strong> the claim you want to <em>establish</em> goes in H₁; H₀ is the status quo. Example: a civil engineer wants to show average build time T &lt; 6 months. Hypotheses: H₀: T = 6 vs H₁: T &lt; 6 (left-tailed). You then gather evidence strong enough to reject H₀.</p>
<h3>Selector: which test for which question?</h3>
<p>Knowing <em>which</em> test to reach for is half the exam. The full selector:</p>
<table>
  <thead><tr><th>Test</th><th>Tests…</th><th>When to use</th><th>Statistic</th></tr></thead>
  <tbody>
    <tr><td><strong>z-test</strong></td><td>Mean (or two means)</td><td>Population variance σ² is <em>known</em></td><td>z = (x̄ − μ₀) / (σ/√n)</td></tr>
    <tr><td><strong>t-test</strong></td><td>Mean (or two means)</td><td>Population variance σ² is <em>unknown</em>, sample SD s used instead; small n</td><td>t = (x̄ − μ₀) / (s/√n), df = n − 1</td></tr>
    <tr><td><strong>χ²-test</strong></td><td>Goodness-of-fit / independence / one variance</td><td>Compare observed counts to expected, or compare a sample variance to a hypothesised value (Day 12)</td><td>χ² = Σ (O − E)² / E</td></tr>
    <tr><td><strong>F-test</strong></td><td>Equality of two variances / ANOVA / regression overall</td><td>Ratio of two variances or two mean-square terms (Day 12)</td><td>F = s₁² / s₂²</td></tr>
  </tbody>
</table>
<p>Common MSQ trap: "z-test can be used to (i) test a mean when σ known ✓, (ii) test a <em>variance</em> when σ unknown ✗ (that's χ²), (iii) compare two means with known variances ✓, (iv) compare two <em>variances</em> ✗ (that's F)."</p>
<h3>Worked example</h3>
<p>Claim: μ = 100. Sample x̄ = 104, σ = 15, n = 36. z = 4/(15/6) = 1.6. p ≈ 2 × 0.0548 = 0.11. At α=0.05, do not reject.</p>
`,
    formulas: [
      F("z-statistic", "z = (x̄ − μ₀)/(σ/√n)", "Known population SD."),
      F("t-statistic", "t = (x̄ − μ₀)/(s/√n)", "df = n−1, unknown population SD."),
      F("Type I error", "α = P(reject H₀ | H₀ true)", "Significance level."),
      F("Power", "1 − β", "P(reject H₀ | H₁ true)."),
      F("One-sided reject", "z > z_α  or  z < −z_α", "Use when H₁ is directional (e.g. μ < μ₀)."),
      F("Test selector", "z mean (σ known) · t mean (σ unknown) · χ² counts/variance · F variance-ratio", "First decide what you're testing, then pick the family."),
    ],
    summary: "Test statistic = (estimate − null) / SE. Compare to a critical value; small p ⇒ reject H₀.",
  },
  {
    id: 12, date: dateForDay(12), phase: 1, subject: "probability",
    title: "Chi-square & F-tests",
    objectives: [
      "Use chi-square for goodness-of-fit and independence",
      "Compute degrees of freedom correctly",
      "Recognise when to use F-tests for variances or ANOVA",
    ],
    videos: [
      V("7_cs1YlZoug", "Chi-Square Tests: Crash Course Statistics #29", "CrashCourse", "13:01"),
      V("R7xd624pR1A", "Using Linear Models for t tests and ANOVA, Clearly Explained", "StatQuest with Josh Starmer", "10:05", "supplement"),
      V("7GJkxSYsX70", "Hypothesis Tests for Equality of Two Variances", "jbstatistics", "8:14", "supplement"),
    ],
    notes: `
<h2>Chi-square statistic</h2>
<div class="formula-block">χ² = Σ (Oᵢ − Eᵢ)² / Eᵢ</div>
<h3>Goodness of fit</h3>
<p>Compare observed category frequencies against expected ones from a hypothesised distribution. df = (k − 1) − (parameters estimated).</p>
<h3>Test of independence</h3>
<p>For an r × c contingency table, df = (r − 1)(c − 1). E_{ij} = (row total × column total) / grand total.</p>
<h3>Rule of thumb</h3>
<p>Each expected count should be ≥ 5 for the chi-square approximation to be reliable.</p>
<h3>F-test</h3>
<p>The F-statistic is a ratio of two scaled chi-square variables (sample variances divided by their df). Three exam-relevant uses:</p>
<ul>
  <li><strong>Two-sample test of equal variances</strong> — see formula below</li>
  <li><strong>One-way ANOVA</strong> — between-group MS / within-group MS</li>
  <li><strong>Overall significance test in regression</strong></li>
</ul>
<h3>Two-sample F-test for variance equality</h3>
<p>To test H₀: σ₁² = σ₂² vs H₁: σ₁² ≠ σ₂² (e.g. before pooling samples or before a t-test that assumes equal variances), put the <em>larger</em> sample variance on top:</p>
<div class="formula-block">F = s₁² / s₂²  with df = (n₁ − 1, n₂ − 1)</div>
<p>Reject H₀ if F &gt; F_{α/2, n₁−1, n₂−1} (or below the lower critical value).</p>
<h3>Worked examples</h3>
<p><strong>Chi-square independence:</strong> 3×4 contingency table → df = 2 × 3 = 6. With χ² = 14.07 and df = 6, p ≈ 0.029 → reject independence at α=0.05.</p>
<p><strong>F-test for variances:</strong> Sample 1: n₁=11, s₁²=24. Sample 2: n₂=16, s₂²=8. F = 24/8 = 3. Critical F_{0.025, 10, 15} ≈ 3.06. Since 3 &lt; 3.06, do <strong>not</strong> reject equal variances at α=0.05.</p>
`,
    formulas: [
      F("Chi-square", "χ² = Σ (O−E)²/E", "Goodness of fit and independence."),
      F("df (independence)", "(r−1)(c−1)", "Degrees of freedom for r×c table."),
      F("F-statistic (general)", "F = (s₁²/σ₁²) / (s₂²/σ₂²)", "Ratio of scaled chi-squares."),
      F("F-test for variances", "F = s₁² / s₂²,  df = (n₁−1, n₂−1)", "Larger variance on top; check homoscedasticity."),
    ],
    summary: "Chi-square sums squared standardised residuals across cells. F-tests compare variances or model groups via variance ratios. For variance equality, F = larger s²/smaller s² with df pair (n₁−1, n₂−1).",
  },
  {
    id: 13, date: dateForDay(13), phase: 1, subject: "probability",
    title: "Probability review & problem set",
    objectives: [
      "Consolidate Bayes, distributions, CLT, CIs and tests",
      "Solve 20 timed GATE-style problems across all topics",
      "Flag weak areas for tomorrow's mini-mock",
    ],
    videos: [],
    notes: `
<h2>Revision day — no new theory</h2>
<p>Today is pure consolidation. Below is a curated 20-problem set ordered by topic. Aim for 75 minutes total (≈ 3.5 minutes per problem). The 5 quiz questions at the bottom are a sample.</p>
<h3>Set A — basic probability (5 problems)</h3>
<ol>
  <li>Inclusion–exclusion in a 3-way Venn</li>
  <li>Conditional probability given a partition</li>
  <li>Bayes posterior with sensitivity/specificity</li>
  <li>Independence vs mutual exclusivity</li>
  <li>Combinatorial enumeration of outcomes</li>
</ol>
<h3>Set B — distributions (5 problems)</h3>
<ol>
  <li>Binomial probability and mean/variance</li>
  <li>Poisson rate over a fixed window</li>
  <li>Uniform tail probability</li>
  <li>Exponential memoryless property</li>
  <li>Normal z-score and tail look-up</li>
</ol>
<h3>Set C — inference (5 problems)</h3>
<ol>
  <li>Standard error after CLT</li>
  <li>95% CI for a mean</li>
  <li>One-sample z-test</li>
  <li>One-sample t-test (n = 16)</li>
  <li>Chi-square independence</li>
</ol>
<h3>Set D — joint distributions (5 problems)</h3>
<ol>
  <li>Marginal from joint PMF</li>
  <li>Compute Cov and ρ</li>
  <li>Var(aX + bY)</li>
  <li>Independence check from joint table</li>
  <li>Conditional expectation E[Y | X = x]</li>
</ol>
<p>The 5 quiz questions in this app are spot-checks from these sets — attempt them, then revisit any wrong answers in the relevant prior days.</p>
`,
    formulas: [
      F("Top-of-mind checklist", "P(A|B), Bayes, CLT, CI, z/t-test, χ², ρ", "If any of these feel slow, revisit days 2–12."),
    ],
    summary: "A revision day is your fastest gain. Time-box the 20 problems and note the topic of every wrong answer.",
  },
  {
    id: 14, date: dateForDay(14), phase: 1, subject: "probability",
    title: "Stats mini-mock + formula sheet",
    objectives: [
      "Sit a 40-minute, 45-question Phase-1 mock",
      "Diagnose your weakest sub-topic",
      "Lock in a one-page formula sheet for the final exam",
    ],
    videos: [],
    notes: `
<h2>Mini-mock — Phase 1 only</h2>
<p>Open the Mock Tests page and select "50-mark paper" with topic filter <em>Probability</em>. Allocate 40 minutes for 45 questions. Report your score in the Progress page.</p>
<h3>One-page formula sheet (Phase 1)</h3>
<ul>
  <li><strong>Probability:</strong> P(A|B) = P(A∩B)/P(B); Bayes; total probability</li>
  <li><strong>Discrete RVs:</strong> Bernoulli, Binomial (np, np(1−p)), Geometric (1/p), Poisson (λ, λ)</li>
  <li><strong>Continuous RVs:</strong> Uniform ((a+b)/2, (b−a)²/12), Exponential (1/λ, 1/λ²), Normal</li>
  <li><strong>Normal:</strong> z = (X−μ)/σ; 68–95–99.7; z=1.645, 1.96, 2.58</li>
  <li><strong>Joint:</strong> Cov(X,Y) = E[XY] − E[X]E[Y]; ρ ∈ [−1,1]</li>
  <li><strong>CLT:</strong> x̄ ~ N(μ, σ²/n); SE = σ/√n</li>
  <li><strong>CI:</strong> x̄ ± critical · SE; use t when σ unknown</li>
  <li><strong>Tests:</strong> z = (x̄ − μ₀)/(σ/√n); t with df n−1</li>
  <li><strong>χ²:</strong> Σ(O−E)²/E; df = (r−1)(c−1)</li>
</ul>
<h3>Self-grading rubric</h3>
<p>Target ≥ 80% on this mini-mock. Below 65%? Re-attempt days 3, 6, 10, 11 over the next two days <em>in parallel</em> with starting Phase 2.</p>
`,
    formulas: [
      F("Phase 1 takeaway", "Bayes + CLT + z-table + χ² table", "These five cover ~80% of probability marks."),
    ],
    summary: "End-of-phase mock + formula sheet. Tomorrow we start linear algebra; carry only what's on this one page.",
  },
];

const phase2: Omit<Day, "questions">[] = [
  {
    id: 15, date: dateForDay(15), phase: 2, subject: "linear-algebra",
    title: "Vectors and vector spaces",
    objectives: [
      "Define vectors, vector addition and scalar multiplication",
      "Test for linear independence and span",
      "Identify a basis and dimension",
    ],
    videos: [
      V("ehwt18bt3h8", "Linear Algebra for Data Science", "NPTEL · IIT Madras", "28:40"),
      V("fNk_zzaMoSs", "Vectors — Chapter 1, Essence of Linear Algebra (visual)", "3Blue1Brown", "9:52", "supplement"),
      V("k7RM-ot2NWY", "Linear combinations, span, and basis vectors — Chapter 2", "3Blue1Brown", "9:59", "supplement"),
    ],
    notes: `
<h2>Vectors as arrows, lists and abstractions</h2>
<p>A vector in ℝⁿ is an ordered list of n real numbers. Addition is component-wise; scalar multiplication scales every entry.</p>
<h3>Vector space axioms (informal)</h3>
<p>A set V with addition and scalar multiplication is a vector space if both operations are well-defined inside V (closure), addition is commutative and associative, and the usual distributive laws hold.</p>
<h3>Span</h3>
<p>span{v₁,...,v_k} = { c₁v₁ + ... + c_kv_k : cᵢ ∈ ℝ }. The span of two non-parallel vectors in ℝ³ is a plane through the origin.</p>
<h3>Linear independence</h3>
<p>{v₁,...,v_k} is linearly independent if Σ cᵢvᵢ = 0 ⇒ all cᵢ = 0.</p>
<h3>Basis and dimension</h3>
<p>A basis is a linearly independent spanning set; its size is the dimension of the space. ℝⁿ has dimension n, with standard basis e₁,...,e_n.</p>
<h3>Norm and inner product</h3>
<div class="formula-block">⟨u, v⟩ = u·v = Σ uᵢvᵢ;  ||u|| = √(u·u)</div>
<h3>Worked example</h3>
<p>Are (1,2,3), (2,4,6), (1,0,0) linearly independent? No — the second is twice the first.</p>
`,
    formulas: [
      F("Dot product", "u · v = Σ uᵢ vᵢ", "Inner product on ℝⁿ."),
      F("Euclidean norm", "||u|| = √(u · u)", "Length of a vector."),
      F("Span", "span{v₁,...,v_k}", "Set of all linear combinations."),
      F("Linear independence", "Σ cᵢ vᵢ = 0 ⇒ cᵢ = 0", "No vector is a combination of the others."),
    ],
    summary: "Vectors live in ℝⁿ; span and independence let you describe subspaces compactly. Basis size = dimension.",
  },
  {
    id: 16, date: dateForDay(16), phase: 2, subject: "linear-algebra",
    title: "Linear transformations & matrices",
    objectives: [
      "Define linearity (additivity + homogeneity)",
      "View matrices as encodings of linear maps",
      "Compose transformations via matrix multiplication",
    ],
    videos: [
      V("kYB8IZa5AuE", "Linear transformations and matrices — Chapter 3", "3Blue1Brown", "10:59"),
      V("XkY2DOUCWMU", "Matrix multiplication as composition — Chapter 4", "3Blue1Brown", "10:03", "supplement"),
    ],
    notes: `
<h2>What makes a map linear</h2>
<p>T: V → W is linear if T(u + v) = T(u) + T(v) and T(cu) = cT(u). Equivalently T(au + bv) = aT(u) + bT(v).</p>
<h3>Matrix representation</h3>
<p>Once you fix bases of V and W, a linear T: ℝⁿ → ℝᵐ corresponds to a unique m × n matrix A with T(x) = Ax. Column j of A is T(eⱼ).</p>
<h3>Common 2D transformations</h3>
<ul>
  <li>Identity: [[1,0],[0,1]]</li>
  <li>Scaling by k: [[k,0],[0,k]]</li>
  <li>Rotation by θ: [[cosθ, −sinθ],[sinθ, cosθ]]</li>
  <li>Reflection across x-axis: [[1,0],[0,−1]]</li>
  <li>Shear (horizontal): [[1, k],[0, 1]]</li>
</ul>
<h3>Composition = product</h3>
<p>If T₁(x) = Ax and T₂(y) = By, then (T₂ ∘ T₁)(x) = B(Ax) = (BA)x.</p>
<h3>Why translation is NOT linear</h3>
<p>T(x) = x + b takes 0 to b ≠ 0, breaking linearity. Combine with linear maps via <em>affine</em> transformations: x ↦ Ax + b.</p>
<h3>Matrix algebra rules you will lean on (preview of Day 17)</h3>
<p>For any real square matrices X and Y of the same size and α ∈ ℝ:</p>
<ul>
  <li><strong>Addition is commutative:</strong> X + Y = Y + X</li>
  <li><strong>Multiplication is NOT:</strong> XY ≠ YX in general</li>
  <li><strong>Scalar distributes over sums:</strong> α(X + Y) = αX + αY</li>
  <li><strong>Transpose</strong> (Xᵀ) swaps rows and columns. Properties: (Xᵀ)ᵀ = X, (X + Y)ᵀ = Xᵀ + Yᵀ, (XY)ᵀ = YᵀXᵀ (reverse order), (αX)ᵀ = αXᵀ</li>
</ul>
<p>Memorise: Xᵀ = X is a strictly stronger property than "X is a matrix" — it defines <em>symmetry</em>, covered next.</p>
<h3>Symmetric, skew-symmetric, and the decomposition every matrix admits</h3>
<p>A square matrix A is</p>
<ul>
  <li><strong>symmetric</strong> if Aᵀ = A — e.g. covariance matrices, real Laplacians;</li>
  <li><strong>skew-symmetric</strong> if Aᵀ = −A — e.g. 2D rotation generator [[0,−1],[1,0]] is skew-symmetric (and orthogonal).</li>
</ul>
<p>Every square matrix decomposes uniquely as the sum of its symmetric and skew-symmetric parts:</p>
<div class="formula-block">A = ½(A + Aᵀ) + ½(A − Aᵀ),  where the first term is symmetric and the second is skew-symmetric</div>
<p><strong>Why this matters for the exam (IITMZ 2025 Q4):</strong> if a linear map T sends every symmetric matrix to 0 AND every skew-symmetric matrix to 0, then T sends <em>every</em> A to 0 (because A is a sum of those two pieces). So rank(T) = 0. Without the decomposition fact, the question looks unsolvable.</p>
<h3>Spaces of structured matrices and their dimensions</h3>
<p>Inside M<sub>n</sub>(ℝ) (dimension n²):</p>
<ul>
  <li>Symmetric n × n matrices form a subspace of dimension <strong>n(n+1)/2</strong> (the diagonal plus the upper triangle).</li>
  <li>Skew-symmetric n × n matrices form a subspace of dimension <strong>n(n−1)/2</strong> (the strictly upper triangle; diagonal is forced to 0 since A<sub>ii</sub> = −A<sub>ii</sub>).</li>
  <li>The sum gives n(n+1)/2 + n(n−1)/2 = n² = dim M<sub>n</sub>(ℝ). The subspaces intersect only at 0, confirming the direct-sum decomposition above.</li>
  <li><strong>Trace-0 symmetric 2 × 2 matrices</strong>: symmetric gives dim 3 [[a,b],[b,c]]; trace 0 forces c = −a, leaving 2 free parameters ⇒ dim 2.</li>
</ul>
<h3>Worked example</h3>
<p>Rotate 90° about origin then reflect across y = x. R₉₀ = [[0,−1],[1,0]]; reflection [[0,1],[1,0]]. Product = [[1,0],[0,−1]] — a reflection across x-axis.</p>
`,
    formulas: [
      F("Linearity", "T(au + bv) = a T(u) + b T(v)", "Defining property of linear maps."),
      F("Rotation 2D", "[[cosθ, −sinθ],[sinθ, cosθ]]", "Counter-clockwise by θ."),
      F("Composition", "(T₂ ∘ T₁)(x) = (BA)x", "Matrix multiplication encodes composition."),
      F("Transpose", "Xᵀ swaps rows ↔ columns", "(XY)ᵀ = YᵀXᵀ, reverse order."),
      F("Symmetric", "Aᵀ = A", "Equivalent to A_{ij} = A_{ji}."),
      F("Skew-symmetric", "Aᵀ = −A", "Forces zero diagonal; 2D example: [[0,−1],[1,0]]."),
      F("Sym + Skew decomposition", "A = ½(A+Aᵀ) + ½(A−Aᵀ)", "Unique split; underlies many MSQ traps."),
      F("dim symmetric n×n", "n(n+1)/2", "Free params: diagonal + upper triangle."),
      F("dim skew-symmetric n×n", "n(n−1)/2", "Strict upper triangle only; diagonal forced 0."),
    ],
    summary: "Linear maps preserve addition and scaling; matrices are their basis-dependent fingerprints. Every square matrix splits as symmetric + skew-symmetric — a fact the exam loves to lean on.",
  },
  {
    id: 17, date: dateForDay(17), phase: 2, subject: "linear-algebra",
    title: "Matrix multiplication",
    objectives: [
      "Compute matrix products by row · column",
      "Apply associativity and (non-)commutativity",
      "Use block-matrix tricks for fast computations",
    ],
    videos: [
      V("XkY2DOUCWMU", "Matrix multiplication as composition", "3Blue1Brown", "10:03"),
    ],
    notes: `
<h2>Rules of the game</h2>
<p>AB is defined when A is m × k and B is k × n; the result is m × n. Entry (AB)_{i,j} = Σ_p A_{i,p} B_{p,j}.</p>
<h3>Properties</h3>
<ul>
  <li><strong>Associative:</strong> (AB)C = A(BC)</li>
  <li><strong>Distributive:</strong> A(B + C) = AB + AC</li>
  <li><strong>NOT commutative:</strong> AB ≠ BA in general</li>
  <li><strong>Identity:</strong> AI = IA = A</li>
  <li><strong>Transpose:</strong> (AB)^T = B^T A^T (reverse order)</li>
</ul>
<h3>Block matrices</h3>
<p>If A = [[A₁₁, A₁₂],[A₂₁, A₂₂]] and B is partitioned compatibly, the product follows the same rule with blocks instead of scalars.</p>
<h3>Trace identities</h3>
<div class="formula-block">tr(A + B) = tr(A) + tr(B);  tr(AB) = tr(BA);  tr(cA) = c · tr(A)</div>
<h3>Worked example</h3>
<p>A = [[1,2],[3,4]], B = [[2,0],[1,2]]. AB = [[4, 4],[10, 8]]. BA = [[2, 4],[7, 10]]. Different — confirming non-commutativity.</p>
`,
    formulas: [
      F("Product entry", "(AB)_{ij} = Σ_k A_{ik} B_{kj}", "Row i of A dot column j of B."),
      F("Transpose product", "(AB)^T = B^T A^T", "Order reverses."),
      F("Trace cycle", "tr(AB) = tr(BA)", "Even when AB ≠ BA."),
    ],
    summary: "Matrix multiplication is row · column. Associative and distributive but not commutative — memorise the identities.",
  },
  {
    id: 18, date: dateForDay(18), phase: 2, subject: "linear-algebra",
    title: "Systems of equations",
    objectives: [
      "Reduce Ax = b via Gaussian elimination",
      "Classify systems as inconsistent, unique, or infinite",
      "Use the Rouché–Capelli theorem",
    ],
    videos: [
      V("vEf0vry_UaA", "Solving Linear Equations", "NPTEL · IIT Madras", "24:34"),
      V("bnRTwPur4PU", "Solving Linear Equations (continued)", "NPTEL · IIT Madras", "24:33", "supplement"),
      V("uQhTuRlWMxw", "Inverse matrices, column space and null space (visual)", "3Blue1Brown", "12:09", "supplement"),
    ],
    notes: `
<h2>The three outcomes of Ax = b</h2>
<ul>
  <li><strong>No solution</strong> — system is inconsistent: rank(A) &lt; rank([A|b])</li>
  <li><strong>Unique solution</strong> — rank(A) = rank([A|b]) = n</li>
  <li><strong>Infinitely many solutions</strong> — rank(A) = rank([A|b]) &lt; n</li>
</ul>
<h3>Gaussian elimination</h3>
<p>Apply elementary row operations to reach row echelon form (REF):</p>
<ul>
  <li>Swap two rows</li>
  <li>Multiply a row by a non-zero scalar</li>
  <li>Add a multiple of one row to another</li>
</ul>
<p>Continue to reduced row echelon form (RREF) for the unique solution / parametric family.</p>
<h3>Worked example</h3>
<p>x + 2y = 5, 3x − y = 1.</p>
<p>Row 2 − 3 · Row 1 ⇒ −7y = −14 ⇒ y = 2. Back-substitute: x = 5 − 4 = 1.</p>
<h3>Geometric picture</h3>
<p>Each linear equation is a hyperplane. Solutions are intersections — a point (unique), a line / plane (infinite), or empty (inconsistent). In 2D the picture simplifies:</p>
<ul>
  <li><strong>Coincident lines</strong> (same equation, possibly scaled): infinitely many solutions.</li>
  <li><strong>Parallel lines</strong> (same slope, different intercept): no solution.</li>
  <li><strong>Intersecting lines</strong> (different slopes): exactly one solution.</li>
</ul>
<h3>Homogeneous systems: Ax = 0</h3>
<p>A system with right-hand side 0 is called <strong>homogeneous</strong>. Three facts you must internalise:</p>
<ul>
  <li>It <em>always</em> has the trivial solution x = 0 — so it is never inconsistent.</li>
  <li>For an m × n matrix A, when <strong>m &lt; n</strong> (fewer equations than unknowns), the row-reduced form must have at least one free variable ⇒ <em>infinitely many</em> solutions.</li>
  <li>When m ≥ n, uniqueness of x = 0 depends on rank: unique iff rank(A) = n; otherwise infinitely many.</li>
</ul>
<p><strong>Common MSQ trap (IITMZ 2025 Q16):</strong> "If m &gt; n, no solution" is FALSE for homogeneous systems (x = 0 always works). "m = n ⇒ unique" is FALSE unless A has full rank.</p>
`,
    formulas: [
      F("Rouché–Capelli", "Consistent ⇔ rank(A) = rank([A|b])", "Existence test."),
      F("Unique solution", "rank = n", "When the number of pivots equals the number of unknowns."),
      F("Elementary ops", "swap · scale · add", "Preserve solution set."),
      F("Homogeneous", "Ax = 0", "Always has x = 0 as a (trivial) solution; nullity > 0 ⇒ infinitely many."),
      F("m < n homogeneous", "always infinitely many solutions", "More unknowns than equations ⇒ free variables."),
    ],
    summary: "Gauss-eliminate to REF; classify by ranks; back-substitute. Three cases: none, one, infinitely many. Homogeneous systems Ax = 0 are never inconsistent.",
  },
  {
    id: 19, date: dateForDay(19), phase: 2, subject: "linear-algebra",
    title: "Rank, null space, column space",
    objectives: [
      "Define the four fundamental subspaces",
      "Apply the rank-nullity theorem",
      "Read rank off a row-echelon form",
      "Compute Null(A) by row reduction",
    ],
    videos: [
      V("uQhTuRlWMxw", "Inverse matrices, column space and null space — Chapter 7", "3Blue1Brown", "12:09"),
      V("_uTAdf_AsfQ", "Null space and column space basis (worked example)", "Khan Academy", "24:46", "supplement"),
    ],
    notes: `
<h2>Four fundamental subspaces</h2>
<p>For A ∈ ℝ^{m×n}:</p>
<ul>
  <li><strong>Column space</strong> Col(A) ⊆ ℝᵐ — span of columns</li>
  <li><strong>Null space</strong> Null(A) ⊆ ℝⁿ — { x : Ax = 0 }</li>
  <li><strong>Row space</strong> = Col(Aᵀ) ⊆ ℝⁿ</li>
  <li><strong>Left null space</strong> Null(Aᵀ) ⊆ ℝᵐ</li>
</ul>
<h3>Rank-nullity theorem</h3>
<div class="formula-block">rank(A) + nullity(A) = n  (number of columns)</div>
<h3>Equality of row rank and column rank</h3>
<p>For every matrix, dim Row(A) = dim Col(A) = rank(A). This is non-obvious yet fundamental.</p>
<h3>Reading rank from REF</h3>
<p>Number of non-zero rows in REF equals rank. The pivot columns of A form a basis of Col(A).</p>
<h3>Worked example — rank from a matrix at a glance</h3>
<p>A = [[1,2,3],[2,4,6],[3,6,9]]. All rows are multiples of (1,2,3), so rank = 1, nullity = 2.</p>
<h3>Worked example — computing Null(A) by row reduction</h3>
<p>Find Null(A) for A = [[1, 2, 3], [0, 1, 2]]. Solve Ax = 0:</p>
<ol>
  <li>Row 2 already reads: x₂ + 2x₃ = 0 ⇒ x₂ = −2x₃</li>
  <li>Row 1: x₁ + 2x₂ + 3x₃ = 0 ⇒ x₁ = −2x₂ − 3x₃ = −2(−2x₃) − 3x₃ = x₃</li>
  <li>Pivots are in columns 1 and 2; column 3 is free. Set x₃ = t.</li>
  <li>x = t · (1, −2, 1)ᵀ. So <strong>Null(A) = span { (1, −2, 1)ᵀ }</strong>, dimension 1.</li>
</ol>
<p>Sanity check via rank-nullity: A has rank 2 (two pivot rows), n = 3 columns, so nullity = 3 − 2 = 1. ✓</p>
<h3>Recipe</h3>
<ol>
  <li>Row-reduce A to RREF.</li>
  <li>Identify pivot columns (basic variables) and non-pivot columns (free variables).</li>
  <li>Express each basic variable in terms of the free variables.</li>
  <li>Set each free variable to 1 (others 0) in turn — each gives a basis vector for Null(A).</li>
</ol>
`,
    formulas: [
      F("Rank-nullity", "rank(A) + nullity(A) = n", "n = number of columns."),
      F("Column space", "Col(A) = span of columns", "Image of x ↦ Ax."),
      F("Null space", "{ x : Ax = 0 }", "Kernel of the linear map."),
      F("Nullity from RREF", "nullity = (free columns)", "Each free variable contributes one basis vector."),
    ],
    summary: "Rank = number of independent columns = number of independent rows. Nullity fills the rest of ℝⁿ.",
  },
  {
    id: 20, date: dateForDay(20), phase: 2, subject: "linear-algebra",
    title: "Determinants",
    objectives: [
      "Compute determinants by cofactor expansion",
      "Use determinant properties for fast evaluation",
      "Interpret determinant as a volume scaling factor",
    ],
    videos: [
      V("Ip3X9LOh2dk", "The determinant — Chapter 6, Essence of Linear Algebra", "3Blue1Brown", "10:03"),
    ],
    notes: `
<h2>What the determinant means</h2>
<p>For a 2 × 2 matrix [[a,b],[c,d]], det = ad − bc. Geometrically, |det| is the area of the parallelogram spanned by the columns; the sign captures orientation.</p>
<h3>Key properties</h3>
<ul>
  <li>det(I) = 1</li>
  <li>det(AB) = det(A) · det(B)</li>
  <li>det(Aᵀ) = det(A)</li>
  <li>Swapping two rows multiplies det by −1</li>
  <li>Multiplying a row by k multiplies det by k</li>
  <li>Adding a multiple of one row to another leaves det unchanged</li>
  <li>If a row or column is zero, det = 0</li>
  <li>If two rows are equal, det = 0</li>
</ul>
<h3>3 × 3 by cofactor expansion</h3>
<div class="formula-block">det(A) = a₁₁ M₁₁ − a₁₂ M₁₂ + a₁₃ M₁₃</div>
<p>where M_{ij} is the minor (determinant of the 2 × 2 block obtained by deleting row i and column j).</p>
<h3>Invertibility</h3>
<p>A is invertible iff det(A) ≠ 0. The inverse is (1/det(A)) · adj(A).</p>
<h3>Worked example</h3>
<p>det([[2,1],[3,4]]) = 2·4 − 1·3 = 5.</p>
`,
    formulas: [
      F("2 × 2 det", "ad − bc", "Signed area of parallelogram."),
      F("Multiplicativity", "det(AB) = det(A) det(B)", "Volumes compose."),
      F("Invertibility", "det(A) ≠ 0", "Equivalent to full rank."),
    ],
    summary: "Determinant = signed volume scaling. Use elementary row operations to simplify before expansion.",
  },
  {
    id: 21, date: dateForDay(21), phase: 2, subject: "linear-algebra",
    title: "Matrix inverse & pseudo-inverse",
    objectives: [
      "Compute A^{-1} for 2 × 2 and 3 × 3 matrices",
      "Distinguish invertible from singular matrices",
      "Define the Moore-Penrose pseudo-inverse",
      "Know when to use A⁺ instead of A^{-1}",
    ],
    videos: [
      V("uQhTuRlWMxw", "Inverse matrices, column space and null space — Chapter 7", "3Blue1Brown", "12:09"),
      V("bZSuzCsq4w4", "The Moore-Penrose Pseudo-Inverse", "Mike the Mathematician", "11:48", "supplement"),
    ],
    notes: `
<h2>When does A^{-1} exist?</h2>
<p>A square matrix has an inverse iff it is non-singular: rank(A) = n equivalently det(A) ≠ 0.</p>
<h3>2 × 2 inverse</h3>
<div class="formula-block">[[a,b],[c,d]]^{-1} = (1/(ad − bc)) · [[d, −b],[−c, a]]</div>
<h3>General inverse via Gauss-Jordan</h3>
<p>Augment [A | I] and reduce to [I | A^{-1}] using elementary row operations.</p>
<h3>Key identities</h3>
<ul>
  <li>(AB)^{-1} = B^{-1} A^{-1}</li>
  <li>(Aᵀ)^{-1} = (A^{-1})ᵀ</li>
  <li>(cA)^{-1} = (1/c) A^{-1}</li>
</ul>
<h3>Pseudo-inverse (Moore-Penrose)</h3>
<p>For any matrix A (even non-square or singular), the pseudo-inverse A⁺ exists. From SVD A = UΣVᵀ:</p>
<div class="formula-block">A⁺ = V Σ⁺ Uᵀ</div>
<p>where Σ⁺ replaces non-zero singular values by their reciprocals (zeros remain zero).</p>
<h3>When to use A⁺ instead of A^{-1}</h3>
<p>The ordinary inverse only exists for square, full-rank A. In real ML / regression problems, the design matrix X is almost always:</p>
<ul>
  <li><strong>Tall and thin</strong> (m &gt; n, more data points than features) — so X is rectangular, never invertible</li>
  <li><strong>Possibly rank-deficient</strong> — collinear features ⇒ XᵀX is singular</li>
</ul>
<p>For these cases, A⁺ gives the unique least-squares minimum-norm solution. The closed-form OLS estimator becomes:</p>
<div class="formula-block">β̂ = X⁺ y</div>
<h3>Two cleaner formulas when X has full column rank</h3>
<p>If X is m × n with rank n (no collinearity), A⁺ collapses to a simple closed form:</p>
<div class="formula-block">X⁺ = (XᵀX)^{-1} Xᵀ  ⇒  β̂ = (XᵀX)^{-1} Xᵀ y</div>
<p>This is the formula you'll meet in Day 38 (multiple linear regression). Mirror form: if X has full row rank (m &lt; n, wide matrix), X⁺ = Xᵀ(XXᵀ)^{-1}.</p>
<h3>Worked example — square invertible</h3>
<p>A = [[1,2],[3,4]]. det = −2. A^{-1} = (1/−2) [[4,−2],[−3,1]] = [[−2,1],[1.5,−0.5]].</p>
<h3>Worked example — tall thin via X⁺ = (XᵀX)^{-1} Xᵀ</h3>
<p>Fit y = β₀ + β₁ x through three points (1, 1), (2, 2), (3, 2). Design matrix X = [[1,1],[1,2],[1,3]] (column of 1s, then x).</p>
<ol>
  <li>XᵀX = [[3, 6], [6, 14]], det = 6. (XᵀX)^{-1} = (1/6) · [[14, −6], [−6, 3]].</li>
  <li>Xᵀy = [[1+2+2], [1·1+2·2+3·2]] = [[5], [11]].</li>
  <li>β̂ = (XᵀX)^{-1} Xᵀy = (1/6) · [[14·5 − 6·11], [−6·5 + 3·11]] = (1/6) · [[4], [3]] = [0.667, 0.5]ᵀ.</li>
</ol>
<p>So the best-fit line is y ≈ 0.667 + 0.5 x. β̂ = X⁺ y was used implicitly — the pseudo-inverse <em>is</em> the OLS solver.</p>
<h3>Properties of A⁺ (Penrose conditions)</h3>
<ol>
  <li>A A⁺ A = A</li>
  <li>A⁺ A A⁺ = A⁺</li>
  <li>(A A⁺)ᵀ = A A⁺  (A A⁺ is symmetric)</li>
  <li>(A⁺ A)ᵀ = A⁺ A  (A⁺ A is symmetric)</li>
</ol>
<p>If A is square invertible, A⁺ = A^{-1}.</p>
`,
    formulas: [
      F("2 × 2 inverse", "1/det · [[d,−b],[−c,a]]", "Swap diagonal, negate off-diagonal."),
      F("Product inverse", "(AB)^{-1} = B^{-1} A^{-1}", "Reverse order."),
      F("Pseudo-inverse (SVD)", "A⁺ = V Σ⁺ Uᵀ", "Always exists; reciprocal of non-zero singular values."),
      F("Pseudo-inverse (full col rank)", "X⁺ = (XᵀX)^{-1} Xᵀ", "OLS closed form for tall X."),
      F("Pseudo-inverse (full row rank)", "X⁺ = Xᵀ (XXᵀ)^{-1}", "Minimum-norm solution for wide X."),
      F("OLS via pseudo-inverse", "β̂ = X⁺ y", "Solves min ||y − Xβ||²."),
    ],
    summary: "Inverse exists ⇔ square + non-singular. Pseudo-inverse always exists via SVD and is the universal least-squares solver: β̂ = X⁺ y. For full column rank X, X⁺ = (XᵀX)^{-1} Xᵀ — the formula you'll use in regression.",
  },
  {
    id: 22, date: dateForDay(22), phase: 2, subject: "linear-algebra",
    title: "Dot products & projections",
    objectives: [
      "Use the algebraic and geometric definitions of dot product",
      "Project a vector onto another vector",
      "Apply orthogonality and Cauchy–Schwarz",
    ],
    videos: [
      V("nMtNPiRzd8Q", "Linear Algebra — Distance, Hyperplanes, Halfspaces, Eigenvalues", "NPTEL · IIT Madras", "33:17"),
      V("LyGKycYT2v0", "Dot products and duality — Chapter 9 (visual)", "3Blue1Brown", "14:11", "supplement"),
    ],
    notes: `
<h2>Two definitions, one number</h2>
<div class="formula-block">u · v = Σ uᵢ vᵢ = ||u|| ||v|| cos θ</div>
<h3>Orthogonality</h3>
<p>u and v are orthogonal iff u · v = 0. The zero vector is orthogonal to everything.</p>
<h3>Projection</h3>
<p>The component of u along v:</p>
<div class="formula-block">proj_v(u) = (u · v / ||v||²) v</div>
<p>The error vector u − proj_v(u) is orthogonal to v — the basis of least squares.</p>
<h3>Cauchy–Schwarz</h3>
<div class="formula-block">|u · v| ≤ ||u|| ||v||</div>
<p>Equality iff u and v are parallel.</p>
<h3>Worked example</h3>
<p>u = (3, 0, 0), v = (1, 1, 0). u · v = 3. proj_v(u) = (3/2)(1,1,0) = (1.5, 1.5, 0). Residual: (1.5, −1.5, 0), which dots with v to zero — orthogonality confirmed.</p>
<h3>Connection to least squares</h3>
<p>The OLS fitted values are projections of y onto Col(X). Residuals are orthogonal to every column of X.</p>
`,
    formulas: [
      F("Dot product", "u·v = Σ uᵢ vᵢ", "Algebraic form."),
      F("Geometric dot", "u·v = ||u|| ||v|| cos θ", "Captures angle."),
      F("Projection", "(u·v/||v||²) v", "Component along v."),
      F("Cauchy–Schwarz", "|u·v| ≤ ||u|| ||v||", "Bound for inner products."),
    ],
    summary: "Dot product fuses length and angle. Projection underpins OLS and PCA.",
  },
  {
    id: 23, date: dateForDay(23), phase: 2, subject: "linear-algebra",
    title: "Eigenvalues & eigenvectors",
    objectives: [
      "Solve det(A − λI) = 0",
      "Find eigenvectors for each eigenvalue",
      "Relate eigenvalues to trace and determinant",
    ],
    videos: [
      V("NzGKuQ7afR8", "Distance, Hyperplanes, Eigenvalues, Eigenvectors (continued 1)", "NPTEL · IIT Madras", "28:32"),
      V("PFDu9oVAE-g", "Eigenvectors and eigenvalues — Chapter 14 (visual)", "3Blue1Brown", "17:15", "supplement"),
      V("FgakZw6K1QQ", "StatQuest: Principal Component Analysis (PCA), Step-by-Step", "StatQuest with Josh Starmer", "21:58", "supplement"),
    ],
    notes: `
<h2>Defining property</h2>
<div class="formula-block">A v = λ v,  v ≠ 0</div>
<p>A scales v by the scalar λ without rotating it. v is an eigenvector, λ is its eigenvalue.</p>
<h3>Characteristic polynomial</h3>
<div class="formula-block">det(A − λI) = 0</div>
<p>For an n × n matrix, this is a degree-n polynomial in λ with n (possibly complex, possibly repeated) roots.</p>
<h3>Trace and determinant</h3>
<div class="formula-block">Σ λᵢ = tr(A);  Π λᵢ = det(A)</div>
<h3>Finding eigenvectors</h3>
<p>For each eigenvalue λ, solve (A − λI) v = 0 — the null space of (A − λI) is the eigenspace.</p>
<h3>Worked example</h3>
<p>A = [[2, 1], [1, 2]]. det(A − λI) = (2 − λ)² − 1 = λ² − 4λ + 3 = (λ − 1)(λ − 3). Eigenvalues: 1, 3.</p>
<p>For λ = 3: A − 3I = [[−1,1],[1,−1]] → eigenvector v = (1, 1). For λ = 1: v = (1, −1). Orthogonal because A is symmetric.</p>
<h3>Important properties</h3>
<ul>
  <li>Real symmetric matrices have real eigenvalues and orthogonal eigenvectors</li>
  <li>If λ is an eigenvalue of A, then λᵏ is an eigenvalue of Aᵏ; 1/λ is an eigenvalue of A⁻¹ (when A is invertible); and (1/λ − λ) is an eigenvalue of A⁻¹ − A</li>
  <li>A and Aᵀ share the same eigenvalues</li>
</ul>
<h3>Complex eigenvalues of real matrices (rotation pattern)</h3>
<p>A real matrix can have complex eigenvalues — they always come in conjugate pairs (a ± bi). The canonical example is the 2D rotation by 90°:</p>
<div class="formula-block">R = [[0, −1],[1, 0]]  ⇒  characteristic poly λ² + 1 = 0  ⇒  λ = ±i</div>
<p>That matrix R is simultaneously <strong>orthogonal</strong> (RᵀR = I, det R = 1), <strong>skew-symmetric</strong> (Rᵀ = −R), and <strong>invertible</strong> (det = 1 ≠ 0). It is <em>not</em> symmetric — a real symmetric matrix is forced to have real eigenvalues, so seeing eigenvalues i, −i rules symmetry out (IITMZ 2025 Q15).</p>
<h3>Involutory matrices: P² = I</h3>
<p>A matrix that is its own inverse (P² = I) is called <em>involutory</em>. Its eigenvalues satisfy λ² = 1 ⇒ λ = ±1. Reflections about any line through the origin are involutory:</p>
<div class="formula-block">P_θ = [[cos 2θ, sin 2θ],[sin 2θ, −cos 2θ]]  satisfies  P_θ² = I  for every θ ∈ [0, π)</div>
<p>Distinct θ give distinct matrices, so there are <strong>infinitely many</strong> real 2 × 2 involutory matrices (IITMZ 2025 Q21).</p>
<h3>Structured / block patterns</h3>
<p>For an anti-diagonal block matrix X = [[0, αI],[αI, 0]], compute X² block-wise: X² = [[α²I, 0],[0, α²I]] = α²I. So X²v = α²v for every v ⇒ eigenvalues of X satisfy λ² = α² ⇒ λ = ±α (each with multiplicity matching the block size). This is the structure behind IITMZ 2025 Q5 (eigenvalues ±2 of a 4×4 with 2I on the anti-diagonal).</p>
`,
    formulas: [
      F("Eigen equation", "A v = λ v", "v is an eigenvector with eigenvalue λ."),
      F("Characteristic polynomial", "det(A − λI) = 0", "Roots = eigenvalues."),
      F("Sum and product", "Σλ = tr A,  Πλ = det A", "Fast sanity checks."),
      F("Eigenvalues of A⁻¹", "1/λ", "Reciprocate non-zero eigenvalues of A."),
      F("Conjugate pairs", "real A ⇒ complex λ come as a ± bi", "Rotation R_{90°} has λ = ±i."),
      F("Involutory", "P² = I ⇒ λ ∈ {+1, −1}", "Reflections give a continuous family."),
    ],
    summary: "Eigenpairs reveal a matrix's preferred axes. Symmetric ⇒ real, orthogonal eigenvectors. Real eigenvalues i, −i ⇒ rotation-like, skew-symmetric. Involutory matrices have λ = ±1 — infinitely many in 2D.",
  },
  {
    id: 24, date: dateForDay(24), phase: 2, subject: "linear-algebra",
    title: "Eigenvalue decomposition",
    objectives: [
      "Decompose diagonalisable A as PΛP^{-1}",
      "Compute matrix powers and exponentials efficiently",
      "Recognise spectral theorem for symmetric matrices",
    ],
    videos: [
      V("yOtFCa9Naxo", "Eigenvalues, Eigenvectors and diagonalisation (continued 2)", "NPTEL · IIT Madras", "33:42"),
      V("PFDu9oVAE-g", "Eigendecomposition recap — Chapter 14 (visual)", "3Blue1Brown", "17:15", "supplement"),
    ],
    notes: `
<h2>Diagonalisation</h2>
<p>If A has n linearly independent eigenvectors, stack them in P and the eigenvalues on the diagonal of Λ:</p>
<div class="formula-block">A = P Λ P^{-1}</div>
<h3>Why it's powerful</h3>
<div class="formula-block">Aᵏ = P Λᵏ P^{-1},  Λᵏ = diag(λ₁ᵏ, ..., λₙᵏ)</div>
<p>Hundredth power of a matrix becomes trivial once diagonalised.</p>
<h3>Spectral theorem</h3>
<p>If A is real symmetric, there exists an orthogonal Q (Qᵀ Q = I) such that:</p>
<div class="formula-block">A = Q Λ Qᵀ</div>
<p>Eigenvalues are real; eigenvectors are pairwise orthogonal. This is the foundation of PCA.</p>
<h3>When can't we diagonalise?</h3>
<p>If geometric multiplicity &lt; algebraic multiplicity for some eigenvalue, A is defective and lacks a full set of eigenvectors. Use Jordan form instead.</p>
<h3>Worked example</h3>
<p>A = [[2, 1], [1, 2]] (from yesterday). Q = (1/√2) [[1, 1], [1, −1]]; Λ = diag(3, 1). Verify A = Q Λ Qᵀ.</p>
`,
    formulas: [
      F("Diagonalisation", "A = P Λ P^{-1}", "Columns of P are eigenvectors."),
      F("Spectral theorem", "Symmetric A = Q Λ Qᵀ", "Orthogonal Q."),
      F("Power", "Aᵏ = P Λᵏ P^{-1}", "Cheap repeated multiplication."),
    ],
    summary: "Diagonalisation reveals the natural axes. Symmetric matrices always admit an orthogonal one.",
  },
  {
    id: 25, date: dateForDay(25), phase: 2, subject: "linear-algebra",
    title: "Singular value decomposition (SVD)",
    objectives: [
      "State the SVD theorem for arbitrary matrices",
      "Interpret singular values geometrically",
      "Use SVD for rank, pseudo-inverse and low-rank approximation",
    ],
    videos: [
      V("tztdsBUiGHo", "Eigen decomposition / pseudoinverse / SVD (continued 3)", "NPTEL · IIT Madras", "24:13"),
      V("gXbThCXjZFM", "Singular Value Decomposition (SVD): Overview", "Steve Brunton", "13:23", "supplement"),
    ],
    notes: `
<h2>SVD theorem</h2>
<p>Every real m × n matrix A admits a factorisation:</p>
<div class="formula-block">A = U Σ Vᵀ</div>
<p>where U (m × m) and V (n × n) are orthogonal and Σ (m × n) is diagonal with non-negative entries σ₁ ≥ σ₂ ≥ ... ≥ 0.</p>
<h3>Singular values</h3>
<p>σᵢ = √λᵢ(AᵀA). They measure how much A stretches each principal direction.</p>
<h3>Geometric picture</h3>
<p>A maps the unit sphere in ℝⁿ to an ellipsoid in ℝᵐ. Σ specifies the axis lengths; V picks the input axes; U picks the output axes.</p>
<h3>Applications</h3>
<ul>
  <li><strong>Rank</strong> = number of non-zero singular values</li>
  <li><strong>Pseudo-inverse</strong> A⁺ = V Σ⁺ Uᵀ — solves least squares</li>
  <li><strong>Low-rank approximation</strong> — keep top-k singular values (Eckart–Young theorem)</li>
  <li><strong>PCA</strong> — right singular vectors of centered X give principal components</li>
</ul>
<h3>Worked example</h3>
<p>For A = [[3,0],[0,2]]: σ₁ = 3, σ₂ = 2. U = V = I; Σ = diag(3,2). Easy because A is already diagonal.</p>
`,
    formulas: [
      F("SVD", "A = U Σ Vᵀ", "Always exists."),
      F("Singular values", "σᵢ = √λᵢ(AᵀA)", "Non-negative."),
      F("Rank", "# non-zero σᵢ", "Reading rank from SVD."),
      F("Low-rank approx", "A_k = Σ_{i=1..k} σᵢ uᵢ vᵢᵀ", "Best rank-k in Frobenius/spectral norm."),
    ],
    summary: "SVD is the universal decomposition. Singular values stretch unit spheres into ellipsoids.",
  },
  {
    id: 26, date: dateForDay(26), phase: 2, subject: "linear-algebra",
    title: "Distance metrics",
    objectives: [
      "Use Euclidean and Manhattan distances",
      "Apply Mahalanobis distance with a covariance matrix",
      "Compute cosine similarity for direction comparisons",
    ],
    videos: [
      V("LyGKycYT2v0", "Dot product / cosine intuition", "3Blue1Brown", "14:11"),
    ],
    notes: `
<h2>Common metrics on ℝⁿ</h2>
<h3>Euclidean (L2)</h3>
<div class="formula-block">d(u, v) = √Σ (uᵢ − vᵢ)²</div>
<h3>Manhattan (L1)</h3>
<div class="formula-block">d(u, v) = Σ |uᵢ − vᵢ|</div>
<h3>Chebyshev (L∞)</h3>
<div class="formula-block">d(u, v) = max |uᵢ − vᵢ|</div>
<h3>Cosine similarity</h3>
<div class="formula-block">cos θ = u · v / (||u|| ||v||) ∈ [−1, 1]</div>
<p>Measures direction, ignoring magnitude. Common in text/embedding similarity.</p>
<p><strong>Interpretation by value:</strong></p>
<ul>
  <li>cos θ = 1 ⇒ same direction (u and v are positive scalar multiples).</li>
  <li>cos θ = 0 ⇒ vectors are <strong>orthogonal</strong> (perpendicular) — u · v = 0. Day 22 introduced this.</li>
  <li>cos θ = −1 ⇒ opposite directions.</li>
</ul>
<p><strong>Quick check:</strong> cosine similarity of (1, 0) and (0, 1) is 0 ⇒ the standard basis vectors are orthogonal.</p>
<h3>Mahalanobis distance</h3>
<div class="formula-block">d_M(u, v) = √((u − v)ᵀ Σ^{-1} (u − v))</div>
<p>Standardises by the covariance Σ — invariant under linear coordinate changes. Reduces to Euclidean when Σ = I.</p>
<h3>When to use what</h3>
<ul>
  <li>kNN with mixed-scale features → standardise then Euclidean</li>
  <li>Document/text → cosine</li>
  <li>Detecting outliers in correlated data → Mahalanobis</li>
</ul>
`,
    formulas: [
      F("L2", "√Σ (uᵢ − vᵢ)²", "Euclidean."),
      F("L1", "Σ |uᵢ − vᵢ|", "Manhattan / taxicab."),
      F("Cosine", "u·v / (||u|| ||v||)", "Direction similarity."),
      F("Mahalanobis", "√((u−v)ᵀ Σ⁻¹ (u−v))", "Covariance-aware."),
    ],
    summary: "Pick a metric that matches your data's geometry. Standardise before Euclidean kNN.",
  },
  {
    id: 27, date: dateForDay(27), phase: 2, subject: "linear-algebra",
    title: "Linear algebra problem set",
    objectives: [
      "Solve 20 mixed GATE-style problems",
      "Time each problem at &lt; 3 minutes",
      "Identify weakest sub-topic before tomorrow's mock",
    ],
    videos: [],
    notes: `
<h2>Revision day — practise drills</h2>
<p>No new theory. Curated topic mix:</p>
<h3>Set A — vectors & operations (5)</h3>
<p>Span, independence, dot product, projection, Cauchy–Schwarz.</p>
<h3>Set B — matrices (5)</h3>
<p>Multiplication, transpose, trace, inverse, determinant.</p>
<h3>Set C — systems (5)</h3>
<p>Gaussian elimination, ranks, classification of solutions, parametric forms.</p>
<h3>Set D — eigen / SVD (5)</h3>
<p>Eigenvalues, eigenvectors, diagonalisation, SVD basics.</p>
<h3>Today's quiz samples 5 of these.</h3>
<p>After scoring, revisit the worst-performing sub-topic days before tomorrow's mock.</p>
`,
    formulas: [
      F("Phase 2 checklist", "rank · det · eigen · SVD · projection", "If any feel slow, retreat to days 17–25."),
    ],
    summary: "Two hours of drills cement everything. Time per problem matters as much as accuracy.",
  },
  {
    id: 28, date: dateForDay(28), phase: 2, subject: "linear-algebra",
    title: "Linear algebra mini-mock",
    objectives: [
      "Attempt 35 timed questions in 35 minutes",
      "Refresh the LA formula sheet",
      "Prepare to switch to Optimization tomorrow",
    ],
    videos: [],
    notes: `
<h2>Mini-mock — Phase 2</h2>
<p>Use the Mock Tests page with topic filter <em>Linear Algebra</em>. Target ≥ 80%.</p>
<h3>One-page LA formula sheet</h3>
<ul>
  <li>Dot product: u · v = Σ uᵢ vᵢ; cos θ = (u·v)/(||u||||v||)</li>
  <li>Projection: proj_v(u) = (u·v / ||v||²) v</li>
  <li>2 × 2 inverse: (1/det) [[d, −b], [−c, a]]</li>
  <li>Determinant 3 × 3 by cofactor; multiplicativity</li>
  <li>Rank-nullity: rank + nullity = n</li>
  <li>Eigen: det(A − λI) = 0; Σλ = trA, Πλ = detA</li>
  <li>Diagonalisation: A = PΛP^{-1}; symmetric → A = QΛQᵀ</li>
  <li>SVD: A = UΣVᵀ; rank = # non-zero σ; A⁺ = VΣ⁺Uᵀ</li>
  <li>Distance: L2, L1, cosine, Mahalanobis</li>
</ul>
<h3>Next phase</h3>
<p>Tomorrow we pivot to <strong>Optimization</strong> — gradient descent, convexity, Lagrange multipliers. The good news: it's only 7 days.</p>
`,
    formulas: [
      F("Phase 2 wrap", "Vectors → matrices → eigen → SVD", "These four moves cover every LA question."),
    ],
    summary: "Phase 2 complete. Tomorrow: optimization. Carry only this formula sheet.",
  },
];

const phase3: Omit<Day, "questions">[] = [
  {
    id: 29, date: dateForDay(29), phase: 3, subject: "optimization",
    title: "Types of optimization",
    objectives: [
      "Classify problems: unconstrained vs constrained, convex vs non-convex, linear vs non-linear",
      "Recognise the canonical forms (LP, QP, NLP)",
      "Understand why convexity matters",
    ],
    videos: [
      V("LpamajnMpZY", "Optimization for Data Science", "NPTEL · IIT Madras", "39:43"),
      V("kV1ru-Inzl4", "Convex Optimization I — Lecture 1 (deeper / optional)", "Stanford Online · Stephen Boyd", "1:18:31", "supplement"),
    ],
    notes: `
<h2>The optimisation problem</h2>
<div class="formula-block">min_x f(x) subject to gᵢ(x) ≤ 0, hⱼ(x) = 0</div>
<p>f is the objective, gᵢ are inequality constraints, hⱼ equality constraints. The feasible set is the set of x satisfying all constraints.</p>
<h3>Taxonomy</h3>
<ul>
  <li><strong>Unconstrained</strong> vs <strong>constrained</strong></li>
  <li><strong>Linear</strong> (LP), <strong>Quadratic</strong> (QP), general <strong>Non-linear</strong> (NLP)</li>
  <li><strong>Convex</strong> (any local min is global) vs <strong>non-convex</strong></li>
  <li><strong>Smooth</strong> (gradients exist) vs <strong>non-smooth</strong> (e.g. L1 penalties)</li>
</ul>
<h3>Convex sets and functions</h3>
<p>A set C is convex if every line segment between its points stays inside. A function f is convex if its epigraph is a convex set; equivalently, for t ∈ [0,1]:</p>
<div class="formula-block">f(tx + (1−t)y) ≤ t f(x) + (1−t) f(y)</div>
<h3>Why convexity matters</h3>
<p>On convex problems, any local minimum is a global minimum, and efficient algorithms exist with provable convergence guarantees. Deep learning is non-convex — we accept local minima.</p>
<h3>Examples</h3>
<ul>
  <li>Linear programming: convex</li>
  <li>Least squares (no regularisation): convex</li>
  <li>Logistic regression: convex (in weights)</li>
  <li>Training a neural network: non-convex</li>
</ul>
`,
    formulas: [
      F("Standard form", "min f(x) s.t. g ≤ 0, h = 0", "Feasible set is intersection of constraints."),
      F("Convex function", "f(tx+(1−t)y) ≤ tf(x)+(1−t)f(y)", "Line segment above curve."),
      F("Key theorem", "Convex problem ⇒ local = global min", "Why we love convexity."),
    ],
    summary: "Optimisation is everywhere in ML. If your problem is convex, life is easy; if not, you settle for local optima.",
  },
  {
    id: 30, date: dateForDay(30), phase: 3, subject: "optimization",
    title: "Univariate optimization",
    objectives: [
      "Find critical points via f'(x) = 0",
      "Apply the second-derivative test",
      "Handle endpoints on closed intervals",
    ],
    videos: [
      V("bMEmJMI3ViE", "Unconstrained Multivariate Optimization (univariate foundations)", "NPTEL · IIT Madras", "29:57"),
      V("IHZwWFHWa-w", "Gradient descent, how neural networks learn (visual)", "3Blue1Brown", "20:33", "supplement"),
    ],
    notes: `
<h2>Necessary and sufficient conditions</h2>
<p>For differentiable f on an interval:</p>
<div class="formula-block">First-order necessary: f'(x*) = 0</div>
<div class="formula-block">Second-order sufficient (min): f'(x*) = 0 and f''(x*) > 0</div>
<h3>Types of stationary points</h3>
<ul>
  <li>f''(x*) &gt; 0 → local minimum</li>
  <li>f''(x*) &lt; 0 → local maximum</li>
  <li>f''(x*) = 0 → inconclusive; use higher derivatives</li>
</ul>
<h3>Closed intervals [a, b]</h3>
<p>By the extreme value theorem, f attains its max/min at either an interior critical point or at an endpoint. Check all candidates.</p>
<h3>Worked example</h3>
<p>Minimise f(x) = x² − 4x + 7 on ℝ.</p>
<p>f'(x) = 2x − 4 = 0 ⇒ x* = 2. f''(2) = 2 &gt; 0 ⇒ minimum. f(2) = 3.</p>
<h3>Constrained univariate</h3>
<p>Minimise f(x) = (x − 3)² on [0, 2]. Critical point x = 3 is outside [0, 2]; compare endpoints: f(0) = 9, f(2) = 1 ⇒ minimum at x = 2.</p>
`,
    formulas: [
      F("Stationary point", "f'(x*) = 0", "Necessary condition for interior extremum."),
      F("Second-derivative test", "f''(x*) > 0 ⇒ min", "Sufficient if first derivative is zero."),
      F("Extreme value theorem", "Min/max on closed [a,b] exist", "Look at criticals AND endpoints."),
    ],
    summary: "Find zeros of f', test sign of f''. On a closed interval, never forget the endpoints.",
  },
  {
    id: 31, date: dateForDay(31), phase: 3, subject: "optimization",
    title: "Multivariate optimization",
    objectives: [
      "Compute gradients and Hessians",
      "Classify critical points using Hessian eigenvalues",
      "Distinguish saddle points from extrema",
    ],
    videos: [
      V("BdTEKVELwQg", "Unconstrained Multivariate Optimization (continued)", "NPTEL · IIT Madras", "18:35"),
      V("U7HQ_G_N6vo", "Gradient — Partial derivatives, gradient, divergence, curl", "Khan Academy", "9:45", "supplement"),
    ],
    notes: `
<h2>Gradient and Hessian</h2>
<p>For f: ℝⁿ → ℝ:</p>
<div class="formula-block">∇f = [∂f/∂x₁, ..., ∂f/∂xₙ]ᵀ</div>
<div class="formula-block">H_{ij} = ∂²f / (∂xᵢ ∂xⱼ)</div>
<p>The Hessian is symmetric (under standard smoothness assumptions).</p>
<h3>Conditions at a critical point</h3>
<ul>
  <li>∇f(x*) = 0 (necessary)</li>
  <li>H(x*) positive definite ⇒ local min</li>
  <li>H(x*) negative definite ⇒ local max</li>
  <li>H(x*) indefinite (mixed-sign eigenvalues) ⇒ saddle point</li>
  <li>H(x*) singular ⇒ inconclusive</li>
</ul>
<h3>Definiteness checks</h3>
<p>For a 2 × 2 Hessian [[a, b],[b, c]]:</p>
<ul>
  <li>a &gt; 0 and ac − b² &gt; 0 ⇒ positive definite</li>
  <li>a &lt; 0 and ac − b² &gt; 0 ⇒ negative definite</li>
  <li>ac − b² &lt; 0 ⇒ saddle</li>
</ul>
<h3>Worked example</h3>
<p>f(x, y) = x² + 2y² − 4x + 4y + 10. ∇f = (2x − 4, 4y + 4) = 0 ⇒ x = 2, y = −1. H = diag(2, 4) — both positive ⇒ minimum at (2, −1).</p>
`,
    formulas: [
      F("Gradient", "∇f = (∂f/∂xᵢ)", "Vector of first partials."),
      F("Hessian", "H_{ij} = ∂²f/∂xᵢ∂xⱼ", "Matrix of second partials."),
      F("Min test", "∇f = 0 and H positive definite", "Local minimum sufficient condition."),
    ],
    summary: "Gradient zero, Hessian PD = local min. Mixed-sign eigenvalues = saddle.",
  },
  {
    id: 32, date: dateForDay(32), phase: 3, subject: "optimization",
    title: "Gradient descent",
    objectives: [
      "Use the gradient descent update rule",
      "Choose a learning rate; understand convergence",
      "Recognise SGD, momentum, Adam at a high level",
    ],
    videos: [
      V("mMHR4iEswTU", "Gradient (Steepest) Descent or Learning Rule", "NPTEL · IIT Madras", "24:00"),
      V("sDv4f4s2SB8", "Gradient Descent, Step-by-Step (visual walk-through)", "StatQuest with Josh Starmer", "23:54", "supplement"),
    ],
    notes: `
<h2>Update rule</h2>
<div class="formula-block">x_{k+1} = x_k − η ∇f(x_k)</div>
<p>η is the learning rate (step size). Move opposite to the gradient — the direction of steepest descent.</p>
<h3>Choosing η</h3>
<ul>
  <li>η too small → slow convergence</li>
  <li>η too large → overshoot, oscillation, or divergence</li>
  <li>Common tactic: line search, cosine schedules, Adam's adaptive scaling</li>
</ul>
<h3>Convergence on convex, smooth f</h3>
<p>If f is L-smooth (gradient is L-Lipschitz), choosing η ≤ 1/L guarantees convergence. Stronger convexity (µ-strongly convex) gives linear (geometric) convergence rate (1 − µ/L)ᵏ.</p>
<h3>Stochastic gradient descent</h3>
<p>Compute ∇f using a single sample (or mini-batch) instead of the full dataset. Each step is noisy but cheap. With diminishing step size η_k, SGD still converges in expectation on convex losses.</p>
<h3>Popular variants</h3>
<ul>
  <li><strong>Momentum:</strong> v ← β v + ∇f; x ← x − η v</li>
  <li><strong>RMSprop / Adagrad:</strong> scale step by past gradient magnitudes</li>
  <li><strong>Adam:</strong> momentum + adaptive scaling</li>
</ul>
<h3>Worked example</h3>
<p>f(x) = x²; x₀ = 5; η = 0.1. ∇f = 2x. x₁ = 5 − 0.1·10 = 4. x₂ = 4 − 0.1·8 = 3.2. Converges geometrically to 0.</p>
`,
    formulas: [
      F("GD update", "x ← x − η ∇f(x)", "Steepest descent."),
      F("Smoothness step", "η ≤ 1/L", "Safe step for L-smooth f."),
      F("SGD", "x ← x − η ∇f_i(x)", "Single-sample gradient estimate."),
    ],
    summary: "Move opposite the gradient with a careful step. Variants like Adam wrap this with momentum and adaptation.",
  },
  {
    id: 33, date: dateForDay(33), phase: 3, subject: "optimization",
    title: "Convexity & Lagrange multipliers",
    objectives: [
      "Verify convexity of common functions",
      "Use Lagrange multipliers for equality constraints",
      "Sketch KKT conditions for inequalities",
    ],
    videos: [
      V("W5W9krjFrNE", "Multivariate Optimization with Equality Constraints (Lagrange)", "NPTEL · IIT Madras", "30:50"),
      V("IgTzPczE14I", "Multivariate Optimization with Inequality Constraints (KKT)", "NPTEL · IIT Madras", "44:54", "supplement"),
      V("yuqB-d5MjZA", "Lagrange multipliers — using tangency (visual)", "Khan Academy", "12:08", "supplement"),
    ],
    notes: `
<h2>Convex toolkit</h2>
<ul>
  <li>Affine functions are convex (and concave)</li>
  <li>x², e^x, |x|, max(x, 0) are convex</li>
  <li>−log(x) on (0, ∞) is convex</li>
  <li>Sum of convex functions is convex</li>
  <li>Composition with affine: f(Ax + b) convex if f is</li>
</ul>
<h3>Lagrange multipliers for equality constraints</h3>
<p>min f(x) s.t. g(x) = 0. Form the Lagrangian:</p>
<div class="formula-block">L(x, λ) = f(x) + λ g(x)</div>
<p>At an extremum, ∇_x L = 0 and ∇_λ L = g(x) = 0. Geometrically, ∇f is parallel to ∇g at the optimum.</p>
<h3>Worked example</h3>
<p>Maximise f(x, y) = xy subject to x + y = 10.</p>
<p>L = xy + λ(x + y − 10). ∂L/∂x = y + λ = 0; ∂L/∂y = x + λ = 0; so x = y. Combined with x + y = 10, we get x = y = 5, max f = 25.</p>
<h3>KKT conditions (inequalities)</h3>
<p>min f(x) s.t. g_i(x) ≤ 0, h_j(x) = 0. With multipliers μᵢ ≥ 0, λⱼ:</p>
<ul>
  <li>Stationarity: ∇f + Σ μᵢ ∇g_i + Σ λⱼ ∇h_j = 0</li>
  <li>Primal feasibility: g_i(x) ≤ 0, h_j(x) = 0</li>
  <li>Dual feasibility: μᵢ ≥ 0</li>
  <li>Complementary slackness: μᵢ g_i(x) = 0</li>
</ul>
<p>For convex problems with Slater's condition, KKT is necessary and sufficient for optimality.</p>
`,
    formulas: [
      F("Lagrangian", "L = f + λ g", "Combine objective and equality."),
      F("Stationarity", "∇f + λ ∇g = 0", "Optimum condition."),
      F("KKT complementary", "μᵢ g_i = 0", "Either constraint binds or its multiplier is zero."),
    ],
    summary: "Lagrange multipliers turn constrained problems into stationary-point problems in one extra variable per constraint.",
  },
  {
    id: 34, date: dateForDay(34), phase: 3, subject: "optimization",
    title: "Optimization problem set",
    objectives: [
      "Drill 15 short optimisation problems",
      "Mix univariate, multivariate, GD, and Lagrange",
      "Identify the slowest sub-topic before tomorrow's mock",
    ],
    videos: [],
    notes: `
<h2>Drill set</h2>
<h3>Univariate (4)</h3>
<p>Stationary points, second-derivative test, endpoints, inflection.</p>
<h3>Multivariate (4)</h3>
<p>Gradient zero, Hessian definiteness, saddle classification.</p>
<h3>Gradient descent (4)</h3>
<p>Manual steps with given η, step-size effects, convergence rate.</p>
<h3>Constrained (3)</h3>
<p>Lagrange multipliers, KKT stationarity, complementary slackness.</p>
<h3>Tips</h3>
<ul>
  <li>Always verify whether the problem is convex — it tells you whether local = global</li>
  <li>Sketch a 2D contour if you can — it makes saddle vs minimum obvious</li>
  <li>For GD, after each step recompute the gradient at the new point, not the old one</li>
</ul>
<h3>Optimisation meets ML: regularisation (preview of Days 38, 41, 42)</h3>
<p>Several ML problem sets reuse the optimisation language to introduce <strong>regularisation</strong>: adding a penalty term to the loss to discourage large weights.</p>
<ul>
  <li><strong>L2 / Ridge regularisation</strong> — loss + λ · ‖w‖²₂. The added quadratic is convex; adding it to a convex loss leaves the problem convex with a <em>unique</em> minimum. Day 38 (multiple linear regression) derives ridge as the closed-form (XᵀX + λI)⁻¹ Xᵀy.</li>
  <li><strong>L1 / Lasso regularisation</strong> — loss + λ · ‖w‖₁. Convex but non-smooth, so the optimum often sits on a vertex of the L1 ball → many weights become exactly zero (feature selection).</li>
</ul>
<p>For Day-34 questions: adding L2 to a convex loss <em>keeps the problem convex</em> — and strictly convex if λ &gt; 0, so the minimiser is unique.</p>
`,
    formulas: [
      F("Phase 3 checklist", "∇f = 0 · H positive definite · Lagrange L = f + λg", "These three carry every question."),
      F("L2-regularised loss", "L(w) + λ‖w‖²₂", "Convex + strictly convex penalty ⇒ unique minimum (Days 38, 41)."),
      F("L1-regularised loss", "L(w) + λ‖w‖₁", "Convex but non-smooth ⇒ sparse solutions (Lasso)."),
    ],
    summary: "Optimisation has narrow toolkit, broad applicability. Drill the same five moves until they feel automatic. Regularisation simply adds a convex penalty — covered in depth on Days 38 / 41 / 42.",
  },
  {
    id: 35, date: dateForDay(35), phase: 3, subject: "optimization",
    title: "Optimization mini-mock",
    objectives: [
      "Sit a 20-question, 20-minute optimisation mock",
      "Confirm one-page Opt formula sheet",
      "Prepare for Phase 4 — Machine Learning",
    ],
    videos: [],
    notes: `
<h2>Mini-mock — Phase 3</h2>
<p>Filter the Mock page to <em>Optimization</em>. Aim for ≥ 80%.</p>
<h3>One-page Opt formula sheet</h3>
<ul>
  <li>Stationary point: ∇f = 0</li>
  <li>Second-derivative test: f''(x*) &gt; 0 ⇒ min</li>
  <li>Hessian PD ⇒ min; ND ⇒ max; indefinite ⇒ saddle</li>
  <li>Gradient descent: x ← x − η ∇f</li>
  <li>Step size η ≤ 1/L for L-smooth f</li>
  <li>SGD: gradient on one sample</li>
  <li>Lagrange: L = f + λg; ∇_x L = 0, ∇_λ L = 0</li>
  <li>KKT: stationarity + primal + dual + complementary slackness</li>
  <li>Convex set: closed under convex combination</li>
  <li>Convex function: line segment above curve</li>
</ul>
<h3>Tomorrow</h3>
<p>Phase 4 — basic ML. We finally use the maths to build models.</p>
`,
    formulas: [
      F("Phase 3 wrap", "Convexity · ∇f = 0 · H definiteness · Lagrange · KKT", "Five anchors for any optimisation problem."),
    ],
    summary: "Optimisation done. Carry your formula sheet into Phase 4 — many ML algorithms minimise loss functions you can now analyse.",
  },
];

const phase4: Omit<Day, "questions">[] = [
  {
    id: 36, date: dateForDay(36), phase: 4, subject: "ml",
    title: "ML framework & terminology",
    objectives: [
      "Define supervised, unsupervised and reinforcement learning",
      "Distinguish training, validation and test sets",
      "Articulate the loss-minimisation framing of ML",
    ],
    videos: [
      V("_KNDrnLILFI", "Predictive Modelling (ML framework)", "NPTEL · IIT Madras", "23:43"),
      V("Gv9_4yMHFhI", "A Gentle Introduction to Machine Learning", "StatQuest with Josh Starmer", "12:46", "supplement"),
      V("I48yqXg2PBo", "Solving Data Analysis Problems — guided thought process", "NPTEL · IIT Madras", "34:36", "supplement"),
    ],
    notes: `
<h2>What is ML?</h2>
<p>Machine learning fits a function f̂ to data so that future predictions on unseen inputs are close to true outputs.</p>
<h3>Three paradigms</h3>
<ul>
  <li><strong>Supervised:</strong> labelled (x, y); learn x → y. Classification (discrete y) or regression (continuous y). Examples: <em>linear regression, logistic regression, k-nearest neighbours, decision trees, support vector machines</em>.</li>
  <li><strong>Unsupervised:</strong> no labels; discover structure (clusters, latent variables, density). Examples: <em>k-means clustering, hierarchical clustering, PCA, Gaussian mixture models</em>.</li>
  <li><strong>Reinforcement:</strong> agent interacts with environment, maximises reward over time. Examples: <em>Q-learning, policy gradient</em>.</li>
</ul>
<p><strong>Exam-style recognition:</strong> if you see a question asking "which of these is unsupervised?", the algorithm to recognise is one that needs only x (no labels) — typically <em>k-means</em>, PCA, hierarchical clustering. Logistic regression and kNN are supervised because they require y.</p>
<h3>The data split</h3>
<ul>
  <li><strong>Training set</strong> — fit parameters</li>
  <li><strong>Validation set</strong> — tune hyperparameters, model selection</li>
  <li><strong>Test set</strong> — single final estimate of generalisation</li>
</ul>
<p>Never use the test set to choose between models — that's leakage.</p>
<h3>Loss functions</h3>
<ul>
  <li>Regression: MSE (1/n)Σ(yᵢ − ŷᵢ)², MAE (1/n)Σ|yᵢ − ŷᵢ|</li>
  <li>Binary classification: log-loss / cross-entropy</li>
  <li>Multi-class: categorical cross-entropy</li>
  <li>Margin-based: hinge loss (SVM)</li>
</ul>
<h3>Generalisation</h3>
<p>Training loss is what we minimise; <em>test</em> loss is what we ultimately care about. The gap is governed by model complexity, data size and regularisation.</p>
`,
    formulas: [
      F("MSE", "(1/n) Σ (yᵢ − ŷᵢ)²", "Regression loss."),
      F("Cross-entropy", "−Σ yᵢ log ŷᵢ", "Classification loss."),
      F("Train / val / test", "fit · tune · evaluate", "Three disjoint sets."),
    ],
    summary: "ML = fit f̂ on training, tune on validation, evaluate on test. Pick a loss matched to the task.",
  },
  {
    id: 37, date: dateForDay(37), phase: 4, subject: "ml",
    title: "Simple linear regression",
    objectives: [
      "Derive OLS estimators for one feature",
      "Interpret slope, intercept and R²",
      "State key OLS assumptions",
    ],
    videos: [
      V("sg_qvRl9gAI", "Linear Regression", "NPTEL · IIT Madras", "41:03"),
      V("7ArmBVF2dCs", "Linear Regression, Clearly Explained (visual)", "StatQuest with Josh Starmer", "27:27", "supplement"),
      V("ce3xsqy1qZU", "Simple Linear Regression Model Building (short)", "NPTEL · IIT Madras", "11:52", "supplement"),
    ],
    notes: `
<h2>Model</h2>
<div class="formula-block">y = β₀ + β₁ x + ε,  ε ~ i.i.d., mean 0, variance σ²</div>
<h3>OLS estimators</h3>
<p>Minimise Σ(yᵢ − β₀ − β₁ xᵢ)². Setting derivatives to zero:</p>
<div class="formula-block">β̂₁ = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)² = Cov(x,y) / Var(x)</div>
<div class="formula-block">β̂₀ = ȳ − β̂₁ x̄</div>
<h3>Goodness of fit</h3>
<p>SST = Σ(yᵢ − ȳ)² (total), SSR = Σ(yᵢ − ŷᵢ)² (residual), SSE = SST − SSR (explained).</p>
<div class="formula-block">R² = 1 − SSR/SST = SSE/SST</div>
<p>R² ∈ [0, 1] (for OLS with intercept) — fraction of variance in y explained by the model.</p>
<h3>Assumptions</h3>
<ul>
  <li>Linearity: E[y | x] is linear in x</li>
  <li>Independence of errors</li>
  <li>Homoscedasticity: Var(ε) is constant</li>
  <li>Normality of errors (for inference, not for point estimates)</li>
  <li>No measurement error in x</li>
</ul>
<h3>Worked example</h3>
<p>Data: (1, 2), (2, 3), (3, 5). x̄ = 2, ȳ = 10/3. β̂₁ = (−1)(−4/3) + 0 + (1)(5/3) all over 2 = 3/2. β̂₀ = 10/3 − 3 = 1/3.</p>
`,
    formulas: [
      F("Slope (1 var)", "β̂₁ = Cov(x,y) / Var(x)", "OLS estimate."),
      F("Intercept", "β̂₀ = ȳ − β̂₁ x̄", "Forces fit through (x̄, ȳ)."),
      F("R²", "1 − SSR/SST", "Variance-explained fraction."),
    ],
    summary: "OLS gives a closed-form slope/intercept by minimising squared residuals. R² tells you how much variance you captured.",
  },
  {
    id: 38, date: dateForDay(38), phase: 4, subject: "ml",
    title: "Multiple linear regression",
    objectives: [
      "Write the model matrix form y = Xβ + ε",
      "Derive β̂ = (XᵀX)⁻¹ Xᵀ y",
      "Diagnose multicollinearity",
    ],
    videos: [
      V("I6AVFwkAMJc", "Multiple Linear Regression", "NPTEL · IIT Madras", "39:04"),
      V("EkAQAi3a4js", "Multiple Regression, Clearly Explained (visual)", "StatQuest with Josh Starmer", "11:33", "supplement"),
      V("MnBUgv7yYnM", "MLR Model Building and Selection (short)", "NPTEL · IIT Madras", "14:47", "supplement"),
    ],
    notes: `
<h2>Matrix form</h2>
<div class="formula-block">y = X β + ε,  X is n × (p + 1)</div>
<p>X has a column of 1s for the intercept; each subsequent column is a feature.</p>
<h3>Normal equations</h3>
<div class="formula-block">β̂ = (Xᵀ X)⁻¹ Xᵀ y</div>
<p>Geometrically: project y onto Col(X). Residuals ŷ are orthogonal to every column of X.</p>
<h3>When XᵀX is singular</h3>
<p>Caused by perfect multicollinearity (one feature is a linear combination of others). Remedies:</p>
<ul>
  <li>Drop redundant features</li>
  <li>Use the pseudo-inverse β̂ = X⁺ y</li>
  <li>Add L2 regularisation: β̂ = (XᵀX + λI)⁻¹ Xᵀ y (ridge)</li>
</ul>
<h3>Multicollinearity diagnostics</h3>
<ul>
  <li>Condition number of XᵀX — large = unstable</li>
  <li>Variance Inflation Factor (VIF) per feature — VIF > 5 or 10 indicates problem</li>
</ul>
<h3>Inference</h3>
<p>Under Gaussian errors, β̂ ~ N(β, σ² (XᵀX)⁻¹). Standard errors of coefficients come from the diagonal.</p>
<h3>Worked example</h3>
<p>With X having columns [1, x₁, x₂], OLS minimises ||y − Xβ||². The closed form (XᵀX)⁻¹Xᵀy gives the unique β̂ when XᵀX is invertible.</p>
`,
    formulas: [
      F("Normal equations", "β̂ = (XᵀX)⁻¹ Xᵀ y", "OLS in matrix form."),
      F("Ridge", "β̂ = (XᵀX + λI)⁻¹ Xᵀ y", "L2 regularisation stabilises XᵀX."),
      F("VIF", "1 / (1 − R²_j)", "Multicollinearity indicator for feature j."),
    ],
    summary: "Multiple regression generalises with linear algebra. Watch for multicollinearity; ridge cures it.",
  },
  {
    id: 39, date: dateForDay(39), phase: 4, subject: "ml",
    title: "Model assessment & selection",
    objectives: [
      "Compute adjusted R², AIC, BIC",
      "Apply forward and backward selection",
      "Recognise the difference between R² and predictive accuracy",
    ],
    videos: [
      V("KvhEifwVxrE", "Model Assessment", "NPTEL · IIT Madras", "35:42"),
      V("5fJjWU7ovac", "Diagnostics to Improve Linear Model Fit", "NPTEL · IIT Madras", "29:10", "supplement"),
      V("2AQKmw14mHM", "R-squared, Clearly Explained (visual)", "StatQuest with Josh Starmer", "9:48", "supplement"),
    ],
    notes: `
<h2>R² and its limits</h2>
<p>R² never decreases when features are added — so it's a poor stand-alone criterion. Use:</p>
<h3>Adjusted R²</h3>
<div class="formula-block">R²_adj = 1 − (1 − R²) · (n − 1) / (n − p − 1)</div>
<p>Penalises additional predictors that don't improve fit.</p>
<h3>AIC and BIC</h3>
<div class="formula-block">AIC = 2k − 2 ln L</div>
<div class="formula-block">BIC = k ln n − 2 ln L</div>
<p>Lower is better. BIC penalises complexity more heavily than AIC when n &gt; e² ≈ 7.4.</p>
<h3>Variable selection</h3>
<ul>
  <li><strong>Best subset</strong> — exhaustive; only feasible for small p</li>
  <li><strong>Forward selection</strong> — start empty, add the feature that most improves criterion</li>
  <li><strong>Backward elimination</strong> — start full, remove the least useful feature</li>
  <li><strong>Lasso</strong> — embedded selection via L1 penalty (some coefficients drop to zero)</li>
</ul>
<h3>Regularisation as model selection</h3>
<p>L1 (Lasso) does feature selection. L2 (Ridge) shrinks coefficients but keeps them all. Elastic Net mixes both.</p>
`,
    formulas: [
      F("Adjusted R²", "1 − (1−R²)(n−1)/(n−p−1)", "Penalises extra predictors."),
      F("AIC", "2k − 2 ln L", "Information criterion."),
      F("BIC", "k ln n − 2 ln L", "Heavier penalty for large n."),
    ],
    summary: "Penalised criteria (AIC, BIC, adjusted R²) and regularisation (Lasso, Ridge) keep models honest.",
  },
  {
    id: 40, date: dateForDay(40), phase: 4, subject: "ml",
    title: "Bias–variance tradeoff",
    objectives: [
      "Decompose expected error into bias² + variance + noise",
      "Diagnose under- vs over-fitting from learning curves",
      "Apply regularisation to trade variance for bias",
    ],
    videos: [
      V("EuBBz3bI-aA", "Bias-variance tradeoff", "StatQuest", "10:32"),
    ],
    notes: `
<h2>The decomposition</h2>
<p>For squared loss and a fixed test input x:</p>
<div class="formula-block">E[(y − f̂(x))²] = Bias(f̂(x))² + Var(f̂(x)) + σ²</div>
<ul>
  <li><strong>Bias</strong> — error from oversimplifying the true function</li>
  <li><strong>Variance</strong> — error from sensitivity to training set</li>
  <li><strong>Irreducible noise (σ²)</strong> — what the best possible model still can't avoid</li>
</ul>
<h3>Symptoms</h3>
<ul>
  <li>High bias (underfitting): high train error and similar test error</li>
  <li>High variance (overfitting): low train error, high test error</li>
  <li>Good fit: low train and test error, both similar</li>
</ul>
<h3>Levers</h3>
<table>
  <tr><td>Lever</td><td>Effect</td></tr>
  <tr><td>More data</td><td>↓ variance</td></tr>
  <tr><td>Simpler model</td><td>↑ bias, ↓ variance</td></tr>
  <tr><td>More features</td><td>↓ bias (usually), ↑ variance</td></tr>
  <tr><td>L2 regularisation</td><td>↑ bias, ↓ variance</td></tr>
  <tr><td>Early stopping</td><td>↓ variance</td></tr>
  <tr><td>Bagging / ensembles</td><td>↓ variance</td></tr>
</table>
<h3>Practical rule</h3>
<p>If train and test gap is wide → overfit → regularise or add data. If both are high → underfit → enrich features or use more flexible model.</p>
`,
    formulas: [
      F("Bias-variance", "MSE = Bias² + Var + σ²", "Decomposition of expected squared error."),
      F("Overfit symptom", "Train ≪ Test error", "Add regularisation or data."),
      F("Underfit symptom", "Train ≈ Test, both high", "Add features or capacity."),
    ],
    summary: "Total error = bias² + variance + noise. Tune complexity to balance the first two.",
  },
  {
    id: 41, date: dateForDay(41), phase: 4, subject: "ml",
    title: "Logistic regression",
    objectives: [
      "Use sigmoid to map linear scores to probabilities",
      "Interpret coefficients as log-odds",
      "Fit via maximum likelihood / cross-entropy",
    ],
    videos: [
      V("H4986KDZkeI", "Logistic Regression", "NPTEL · IIT Madras", "29:22"),
      V("yIYKR4sgzI8", "StatQuest: Logistic Regression (visual)", "StatQuest with Josh Starmer", "9:14", "supplement"),
      V("32M5v9jJtJ0", "Classification (framing)", "NPTEL · IIT Madras", "19:20", "supplement"),
    ],
    notes: `
<h2>Model</h2>
<div class="formula-block">P(y = 1 | x) = σ(wᵀx + b) = 1 / (1 + e^{−(wᵀx + b)})</div>
<h3>Why sigmoid?</h3>
<p>Maps any real number into (0, 1), so output behaves like a probability. The linear score wᵀx + b is interpreted as log-odds:</p>
<div class="formula-block">log(p / (1 − p)) = wᵀx + b</div>
<h3>Loss function</h3>
<p>Negative log-likelihood under Bernoulli model = binary cross-entropy:</p>
<div class="formula-block">L = −Σ [yᵢ log ŷᵢ + (1 − yᵢ) log(1 − ŷᵢ)]</div>
<p>It is convex in w — no local minima trouble. No closed form; fit via gradient descent / Newton / IRLS.</p>
<h3>Interpretation of coefficients</h3>
<p>Exponentiated coefficient e^{w_j} is the odds-ratio per unit increase in feature j (holding others fixed).</p>
<h3>Worked example</h3>
<p>If wᵀx = 0, P(y=1) = σ(0) = 0.5 — exactly the decision boundary. If wᵀx = 1, P ≈ 0.73.</p>
<h3>Regularisation</h3>
<p>Add λ ||w||² (L2) or λ ||w||₁ (L1) to the loss to control overfitting / induce sparsity.</p>
`,
    formulas: [
      F("Sigmoid", "σ(z) = 1/(1 + e^{−z})", "Squash to (0, 1)."),
      F("Log-odds", "logit(p) = log(p/(1−p))", "Linear in features."),
      F("Cross-entropy", "−Σ[y log ŷ + (1−y) log(1 − ŷ)]", "Convex loss for logistic regression."),
    ],
    summary: "Logistic regression = linear log-odds + sigmoid + cross-entropy. Convex and interpretable.",
  },
  {
    id: 42, date: dateForDay(42), phase: 4, subject: "ml",
    title: "Logistic regression for classification",
    objectives: [
      "Threshold probabilities to make decisions",
      "Read confusion matrices and compute precision/recall",
      "Use ROC curves and AUC",
    ],
    videos: [
      V("lIHDgiluhQ8", "Logistic Regression (continued — decision rule & odds)", "NPTEL · IIT Madras", "18:37"),
      V("Sowy3iZyRVk", "Performance Measures (confusion matrix, precision, recall, AUC)", "NPTEL · IIT Madras", "32:50"),
      V("vN5cNN2-HWE", "Logistic Regression Details: Coefficients (visual)", "StatQuest with Josh Starmer", "10:30", "supplement"),
    ],
    notes: `
<h2>Decision rule</h2>
<p>Predict y = 1 when P(y=1 | x) ≥ τ. The default τ = 0.5; varying τ trades precision for recall.</p>
<h3>Confusion matrix</h3>
<table>
  <tr><td></td><td>Predicted 1</td><td>Predicted 0</td></tr>
  <tr><td>Actual 1</td><td>TP</td><td>FN</td></tr>
  <tr><td>Actual 0</td><td>FP</td><td>TN</td></tr>
</table>
<h3>Core metrics</h3>
<div class="formula-block">Accuracy = (TP + TN)/N</div>
<div class="formula-block">Precision = TP / (TP + FP)</div>
<div class="formula-block">Recall (TPR) = TP / (TP + FN)</div>
<div class="formula-block">F1 = 2 · Precision · Recall / (Precision + Recall)</div>
<div class="formula-block">Specificity = TN / (TN + FP)</div>
<h3>ROC curve</h3>
<p>Plot TPR vs FPR as τ varies. AUC (area under the ROC) summarises performance: 0.5 random, 1.0 perfect.</p>
<h3>Class imbalance</h3>
<p>With rare positives, accuracy is misleading (predicting all-zero may score 99%). Prefer precision, recall, F1, AUC, or balanced accuracy. Resampling or class weights can help training.</p>
<h3>Worked example</h3>
<p>Confusion: TP=40, FN=10, FP=20, TN=30. Precision = 40/60 ≈ 0.67. Recall = 40/50 = 0.80. F1 ≈ 0.73.</p>
`,
    formulas: [
      F("Precision", "TP / (TP + FP)", "Of predicted positives, how many right."),
      F("Recall", "TP / (TP + FN)", "Of actual positives, how many caught."),
      F("F1", "2 PR / (P + R)", "Harmonic mean of P and R."),
      F("AUC", "Area under ROC", "0.5 random, 1.0 perfect."),
    ],
    summary: "Threshold → confusion → precision/recall/F1/AUC. Choose metrics that match the cost of errors.",
  },
  {
    id: 43, date: dateForDay(43), phase: 4, subject: "ml",
    title: "k-Nearest Neighbours",
    objectives: [
      "Predict using k closest training points",
      "Tune k to balance bias and variance",
      "Apply distance metrics correctly with feature scaling",
    ],
    videos: [
      V("2ATqoglcHus", "K-Nearest Neighbors (kNN)", "NPTEL · IIT Madras", "26:25"),
      V("HVXime0nQeI", "StatQuest: K-nearest neighbors (visual)", "StatQuest with Josh Starmer", "5:30", "supplement"),
    ],
    notes: `
<h2>The algorithm</h2>
<p>Store the training set. For a new x*:</p>
<ol>
  <li>Compute distance from x* to every training point</li>
  <li>Pick the k nearest neighbours</li>
  <li>Classification: majority vote (with optional distance weighting). Regression: average</li>
</ol>
<h3>Properties</h3>
<ul>
  <li>Non-parametric, instance-based</li>
  <li>No explicit training phase — all the work is at prediction time</li>
  <li>O(n) per query with naive implementation; KD-trees / ball trees reduce this for low-to-moderate dimensions</li>
</ul>
<h3>Choosing k</h3>
<ul>
  <li>k = 1 — most flexible, high variance, overfits noise</li>
  <li>k large — smoother boundary, high bias</li>
  <li>Pick k by cross-validation. Common starting point: k = √n (rounded to odd for binary classification)</li>
</ul>
<h3>Curse of dimensionality</h3>
<p>In high dimensions, pairwise distances concentrate (all points become roughly equidistant), eroding kNN's basis for "near".</p>
<h3>Practical tips</h3>
<ul>
  <li>Always standardise features before kNN — distances are scale-sensitive</li>
  <li>Use weighted kNN if neighbours are very unequal in distance</li>
  <li>For imbalanced classes, consider distance-weighted votes or threshold tuning on probabilities</li>
</ul>
`,
    formulas: [
      F("kNN prediction", "Majority vote / average of k nearest", "Non-parametric model."),
      F("Default metric", "Euclidean (scaled features)", "Distance must be meaningful across features."),
      F("Choose k", "Cross-validation", "Trade bias / variance."),
    ],
    summary: "kNN is conceptually the simplest classifier — but only useful with scaled features and modest dimensionality.",
  },
  {
    id: 44, date: dateForDay(44), phase: 4, subject: "ml",
    title: "k-Means clustering",
    objectives: [
      "Run the k-means algorithm to convergence",
      "Choose k using the elbow method or silhouette",
      "Recognise k-means' assumptions and failure modes",
    ],
    videos: [
      V("ZTP6b3LaVGg", "K-means Clustering", "NPTEL · IIT Madras", "31:20"),
      V("4b5d3muPQmA", "StatQuest: K-means clustering (visual)", "StatQuest with Josh Starmer", "8:31", "supplement"),
    ],
    notes: `
<h2>The algorithm</h2>
<ol>
  <li>Initialise k cluster centroids (random, or k-means++)</li>
  <li>Assign each point to the nearest centroid (Euclidean)</li>
  <li>Update each centroid to the mean of its assigned points</li>
  <li>Repeat until assignments stop changing</li>
</ol>
<h3>Objective</h3>
<div class="formula-block">J = Σ_k Σ_{x ∈ C_k} ||x − μ_k||²</div>
<p>The within-cluster sum of squared distances. The algorithm strictly decreases J each iteration (proven by alternation of the two minimisations).</p>
<h3>Convergence</h3>
<p>Always converges in finite steps because there are finitely many partitions and J decreases monotonically. Often to a local minimum — re-run with multiple initialisations or use k-means++.</p>
<h3>Choosing k</h3>
<ul>
  <li><strong>Elbow method</strong> — plot J vs k, pick where the curve bends</li>
  <li><strong>Silhouette score</strong> — measures how similar points are to their own cluster vs others, range [−1, 1]</li>
  <li><strong>Gap statistic</strong> — compares J to a null reference</li>
</ul>
<h3>Failure modes</h3>
<ul>
  <li>Clusters of very different sizes / densities</li>
  <li>Non-spherical (elongated) clusters</li>
  <li>Outliers shifting centroids</li>
</ul>
<p>Alternatives: GMM (probabilistic, soft assignments), DBSCAN (density-based), hierarchical.</p>
`,
    formulas: [
      F("Objective", "J = Σ ||x − μ_k||²", "Within-cluster sum of squares."),
      F("Update rule", "μ_k ← mean of points in cluster k", "Closed-form M-step."),
      F("Elbow", "Plot J vs k, find bend", "Heuristic choice of k."),
    ],
    summary: "k-means alternates assignment and centroid update; always converges, often to a local optimum.",
  },
  {
    id: 45, date: dateForDay(45), phase: 4, subject: "ml",
    title: "Cross-validation",
    objectives: [
      "Run k-fold and leave-one-out CV",
      "Use stratification for imbalanced data",
      "Avoid leakage during hyperparameter tuning",
    ],
    videos: [
      V("jtZfCpo0858", "Cross Validation", "NPTEL · IIT Madras", "23:08"),
      V("fSytzGwwBVw", "Machine Learning Fundamentals: Cross Validation (visual)", "StatQuest with Josh Starmer", "6:05", "supplement"),
    ],
    notes: `
<h2>Why cross-validation?</h2>
<p>A single train/test split gives a noisy estimate. CV averages over multiple splits, giving a more reliable estimate and using each example for both training and validation across folds.</p>
<h3>k-fold</h3>
<ol>
  <li>Split data into k equal folds</li>
  <li>For each i: train on the other k − 1 folds, validate on fold i</li>
  <li>Average the k validation scores</li>
</ol>
<p>Typical k = 5 or 10. k = n is leave-one-out (LOOCV) — high variance but nearly unbiased.</p>
<h3>Stratified k-fold</h3>
<p>Preserve class proportions within each fold. Essential for imbalanced classification.</p>
<h3>Pipeline discipline</h3>
<p>Fit preprocessing (scaling, imputation, feature selection) inside each fold using only the training portion. Fitting on the entire dataset first causes data leakage and over-optimistic CV scores.</p>
<h3>Nested CV</h3>
<p>For honest performance estimation with hyperparameter tuning, use nested CV: outer loop estimates generalisation; inner loop tunes hyperparameters.</p>
<h3>Worked rule of thumb</h3>
<p>Keep a held-out test set for the final number, even when using CV — CV scores from tuning are still optimistic.</p>
`,
    formulas: [
      F("k-fold CV", "Avg of k held-out fold scores", "Reliable performance estimate."),
      F("LOOCV", "k = n", "Nearly unbiased, high-variance."),
      F("Stratify", "Preserve class ratios per fold", "For imbalanced classification."),
    ],
    summary: "Cross-validation averages over folds. Fit preprocessing inside each fold to avoid leakage.",
  },
  {
    id: 46, date: dateForDay(46), phase: 4, subject: "ml",
    title: "ML problem set 1 — regression",
    objectives: [
      "Drill numerical regression problems",
      "Practice OLS hand calculations",
      "Compute R², adjusted R², AIC by hand",
    ],
    videos: [],
    notes: `
<h2>Drill day — regression</h2>
<h3>Problem 1 — slope by hand</h3>
<p>Given (1,2), (2,3), (3,5). Compute β̂₁ and β̂₀. (Answer: 1.5 and 1/3.)</p>
<h3>Problem 2 — R² from sums of squares</h3>
<p>SST = 100, SSR = 25. R² = 1 − 25/100 = 0.75. Adjusted R² with p = 1, n = 10? 1 − (0.25)(9/8) = 0.719.</p>
<h3>Problem 3 — ridge solution shape</h3>
<p>β̂_ridge = (XᵀX + λI)⁻¹ Xᵀ y. As λ → ∞, β̂ → 0. As λ → 0, β̂ → OLS.</p>
<h3>Problem 4 — multicollinearity diagnosis</h3>
<p>VIF_j = 1 / (1 − R²_j) where R²_j regresses feature j on all others. VIF &gt; 5 raises a flag; &gt; 10 a serious problem.</p>
<h3>Problem 5 — projection residuals</h3>
<p>OLS residuals e = y − ŷ satisfy Xᵀ e = 0, so they are orthogonal to every feature.</p>
<h3>Tips</h3>
<ul>
  <li>For 2-variable problems, the formula β̂₁ = Cov(x,y)/Var(x) is faster than the matrix form</li>
  <li>Standardise before ridge/lasso so the penalty is uniform across features</li>
  <li>R² is for OLS-with-intercept; without an intercept, R² loses its [0,1] interpretation</li>
</ul>
`,
    formulas: [
      F("OLS slope (1D)", "Cov(x,y)/Var(x)", "Quick formula."),
      F("Adjusted R²", "1−(1−R²)(n−1)/(n−p−1)", "Compare different-p models."),
      F("Ridge", "(XᵀX + λI)⁻¹ Xᵀ y", "Stabilises with L2 penalty."),
    ],
    summary: "Numerical regression drills sharpen your speed on the slope, residual, and R² formulas.",
  },
  {
    id: 47, date: dateForDay(47), phase: 4, subject: "ml",
    title: "ML problem set 2 — classification",
    objectives: [
      "Drill confusion-matrix metrics",
      "Practice logistic regression hand-computations",
      "Compute kNN classifications by hand",
    ],
    videos: [],
    notes: `
<h2>Drill day — classification</h2>
<h3>Problem 1 — confusion matrix</h3>
<p>TP=40, FN=10, FP=20, TN=30. Compute accuracy (0.70), precision (0.67), recall (0.80), F1 (0.73), specificity (0.60).</p>
<h3>Problem 2 — sigmoid evaluation</h3>
<p>wᵀx + b = 1.5 → σ(1.5) = 1/(1+e^{−1.5}) ≈ 0.818.</p>
<h3>Problem 3 — kNN by hand</h3>
<p>Training: (1,1)→A, (2,2)→A, (8,8)→B, (9,9)→B. Test point (5,5). Euclidean distances: 5.66, 4.24, 4.24, 5.66. With k=3: B wins 2–1 if you pick the three smallest (4.24 A, 4.24 B, 5.66 — tie-break choice matters).</p>
<h3>Problem 4 — odds and log-odds</h3>
<p>P = 0.8 → odds = 4 → log-odds = log(4) ≈ 1.386. A coefficient of 0.4 means odds multiply by e^{0.4} ≈ 1.49 per unit increase.</p>
<h3>Problem 5 — AUC interpretation</h3>
<p>AUC = P(model scores a random positive higher than a random negative). 0.85 means 85% of such pairs are correctly ranked.</p>
<h3>Tips</h3>
<ul>
  <li>Always recompute P+R+F1 from the confusion matrix slowly — sign errors are common under time pressure</li>
  <li>For kNN ties, the convention is to break by nearest distance or randomness; the exam will tell you</li>
  <li>For sigmoid, σ(z) + σ(−z) = 1 — useful identity</li>
</ul>
`,
    formulas: [
      F("Sigmoid identity", "σ(z) + σ(−z) = 1", "Symmetric across 0."),
      F("Odds ratio", "e^{w_j}", "Per-unit multiplicative effect on odds."),
      F("AUC ranking", "P(score+ > score−)", "Pairwise ranking interpretation."),
    ],
    summary: "Classification drills lock in your confusion-matrix arithmetic, sigmoid values, and kNN tie-breaking.",
  },
  {
    id: 48, date: dateForDay(48), phase: 4, subject: "ml",
    title: "Combined ML review",
    objectives: [
      "Reflect on all four algorithms (lin reg, logistic, kNN, k-means)",
      "Compare model assumptions and complexity",
      "Choose the right algorithm for a given task",
    ],
    videos: [],
    notes: `
<h2>Cheat-sheet by algorithm</h2>
<table>
  <tr><td>Algorithm</td><td>Task</td><td>Loss</td><td>Hyperparams</td></tr>
  <tr><td>Linear regression</td><td>Regression</td><td>MSE</td><td>(none / L1, L2)</td></tr>
  <tr><td>Logistic regression</td><td>Classification</td><td>Cross-entropy</td><td>L1/L2 strength</td></tr>
  <tr><td>kNN</td><td>Classification / regression</td><td>—</td><td>k, metric, weighting</td></tr>
  <tr><td>k-means</td><td>Clustering</td><td>WCSS</td><td>k, init method</td></tr>
</table>
<h3>Choosing an algorithm</h3>
<ul>
  <li><strong>Interpretability needed</strong> → linear / logistic with regularisation</li>
  <li><strong>Strong non-linearity expected</strong> → kNN, trees, or NN (out of scope here)</li>
  <li><strong>Unsupervised structure discovery</strong> → k-means, GMM, hierarchical</li>
  <li><strong>Very high dimensionality</strong> → linear methods + regularisation; avoid raw kNN</li>
</ul>
<h3>Common mistakes to avoid</h3>
<ul>
  <li>Forgetting to scale features for distance-based methods</li>
  <li>Reporting train accuracy as final performance</li>
  <li>Tuning on the same set used for evaluation</li>
  <li>Misinterpreting R² as predictive accuracy</li>
</ul>
<h3>Tomorrow</h3>
<p>Phase 4 mini-mock (40 questions). Push hard.</p>
`,
    formulas: [
      F("Algorithm matrix", "Task · loss · hyperparam · scale-sensitive?", "Use this table to pick the right tool."),
    ],
    summary: "Linear, logistic, kNN, k-means — four algorithms covering most exam ML questions. Know their assumptions cold.",
  },
  {
    id: 49, date: dateForDay(49), phase: 4, subject: "ml",
    title: "ML mini-mock",
    objectives: [
      "Sit a 40-question ML-only mock in 35 minutes",
      "Identify your weakest sub-topic",
      "Lock in a one-page ML formula sheet",
    ],
    videos: [],
    notes: `
<h2>Mini-mock — Phase 4</h2>
<p>Filter the Mock page to <em>Machine Learning</em>. Target ≥ 80%.</p>
<h3>One-page ML formula sheet</h3>
<ul>
  <li>OLS: β̂ = (XᵀX)⁻¹ Xᵀ y</li>
  <li>R² = 1 − SSR/SST</li>
  <li>Ridge: β̂ = (XᵀX + λI)⁻¹ Xᵀ y</li>
  <li>AIC = 2k − 2 ln L; BIC = k ln n − 2 ln L</li>
  <li>Bias-variance: MSE = Bias² + Var + σ²</li>
  <li>Sigmoid σ(z) = 1/(1+e^{−z})</li>
  <li>Logistic loss: −Σ[y log ŷ + (1−y)log(1−ŷ)]</li>
  <li>Confusion: Acc, Precision, Recall, F1, AUC</li>
  <li>kNN: k via CV; standardise features</li>
  <li>k-means: J = Σ ||x − μ_k||²; elbow / silhouette</li>
</ul>
<h3>Next phase</h3>
<p>Phase 5 starts tomorrow — three full mock tests and targeted revision over 11 days.</p>
`,
    formulas: [
      F("Phase 4 wrap", "OLS · Logistic · kNN · k-means", "Four algorithms, one consistent loss-minimisation frame."),
    ],
    summary: "Maths is mostly done. Phase 5 is about doing real mocks under time pressure.",
  },
];

const phase5: Omit<Day, "questions">[] = [
  {
    id: 50, date: dateForDay(50), phase: 5, subject: "revision",
    title: "Full mock test 1 (50 marks)",
    objectives: [
      "Sit a 2-hour full paper under exam conditions",
      "Not look up anything during the mock",
      "Get a baseline score across all four subjects",
    ],
    videos: [],
    notes: `
<h2>Mock 1 — full paper</h2>
<p>Today is non-negotiable: 2 hours, phone in another room, single attempt. Open the Mock Tests page and select "50-mark paper". The system will draw questions weighted by exam proportions.</p>
<h3>Strategy guidelines</h3>
<ul>
  <li>Pace: ~2.5 minutes per question average. Faster on conceptual MCQs, slower on numerical.</li>
  <li>If a question takes &gt; 4 minutes, mark it and move on.</li>
  <li>Attempt every question — there is no negative marking in the qualifier MSQs (verify on official site).</li>
  <li>Use the last 10 minutes to revisit marked questions.</li>
</ul>
<h3>After the mock</h3>
<p>Do <em>not</em> look at answers yet. Save your score, take a 30-minute break, then return for tomorrow's review.</p>
<h3>Expected outcome</h3>
<p>Realistic first-mock score: 60–75%. Don't panic — the next 9 days are about closing the gap.</p>
`,
    formulas: [
      F("Mock plan", "2hr · 50 marks · all topics", "Open Mock page, choose 50-mark paper."),
    ],
    summary: "Sit Mock 1. No notes, no breaks. The score is a diagnostic, not a verdict.",
  },
  {
    id: 51, date: dateForDay(51), phase: 5, subject: "revision",
    title: "Mock 1 review — weak topic analysis",
    objectives: [
      "Review every wrong/skipped question",
      "Tag each by topic and root cause",
      "Build a targeted revision list",
    ],
    videos: [],
    notes: `
<h2>Mock 1 review checklist</h2>
<p>For each question you got wrong or skipped:</p>
<ol>
  <li>Re-attempt without time pressure</li>
  <li>If still wrong, read the explanation carefully</li>
  <li>Identify root cause: knowledge gap, computational error, time pressure, misread question?</li>
  <li>Tag the topic (e.g. "Bayes — diagnostic", "Eigenvalues — 3×3", "k-means — elbow")</li>
</ol>
<h3>Categorise by phase</h3>
<p>Count errors per phase. The phase with the most errors is your priority for days 52–53.</p>
<h3>Root-cause table</h3>
<table>
  <tr><td>Cause</td><td>Action</td></tr>
  <tr><td>Knowledge gap</td><td>Revisit the relevant day's notes &amp; formulas</td></tr>
  <tr><td>Arithmetic slip</td><td>Slow down and re-check on numerical questions</td></tr>
  <tr><td>Misread question</td><td>Underline keywords (NOT, MUST, EXACTLY)</td></tr>
  <tr><td>Out of time</td><td>Practise pace with speed drills (D56–58)</td></tr>
</table>
<h3>Output</h3>
<p>End the day with a written list of 5–10 specific topics to drill over the next two days.</p>
`,
    formulas: [
      F("Review template", "Wrong? → re-attempt → root cause → action", "Apply this to every error."),
    ],
    summary: "Review is the highest-leverage activity in the entire 60 days. Treat every mistake as a diagnostic gift.",
  },
  {
    id: 52, date: dateForDay(52), phase: 5, subject: "revision",
    title: "Targeted revision — stats weak topics",
    objectives: [
      "Revisit the 3–5 weakest stats topics from Mock 1",
      "Drill 20 fresh questions on those topics",
      "Re-derive each key formula from scratch",
    ],
    videos: [],
    notes: `
<h2>Targeted revision — based on Mock 1 review</h2>
<p>This day is custom-built. Pick from these likely culprits based on yesterday's tagging:</p>
<ul>
  <li>Conditional probability and Bayes' theorem with sensitivity/specificity</li>
  <li>Standard normal z-tables and tail probabilities</li>
  <li>CLT, standard error, and confidence intervals</li>
  <li>One-sample z-test and t-test</li>
  <li>Chi-square tests with df computation</li>
  <li>Covariance, correlation, and variance of linear combinations</li>
</ul>
<h3>Approach</h3>
<ol>
  <li>Open each weak day's notes and re-read the worked example</li>
  <li>Re-derive the key formula on paper from scratch</li>
  <li>Solve 20 fresh questions across the weak topics — use Mock Tests page with Stats filter</li>
  <li>For any persisting confusion, re-watch the primary video at 1.5× speed</li>
</ol>
<h3>Output</h3>
<p>By the end of the day, every wrong answer from Mock 1's stats section should be one you can solve correctly in &lt; 3 minutes.</p>
`,
    formulas: [
      F("Stats revision focus", "Bayes · z-table · CLT · CI · χ²", "These five cover ~80% of Phase 1 marks."),
    ],
    summary: "Targeted revision is your highest-leverage move. Don't re-read everything — re-drill the topics you got wrong.",
  },
  {
    id: 53, date: dateForDay(53), phase: 5, subject: "revision",
    title: "Targeted revision — LA / Opt / ML weak topics",
    objectives: [
      "Cover weak topics from Phases 2–4",
      "Re-derive any forgotten formulas",
      "Confirm full-paper readiness for tomorrow's Mock 2",
    ],
    videos: [],
    notes: `
<h2>Targeted revision — Phases 2–4</h2>
<p>Likely culprits:</p>
<ul>
  <li><strong>LA:</strong> 3×3 determinant, eigenvalues of small matrices, rank/nullity, projection formula, SVD intuition</li>
  <li><strong>Opt:</strong> Hessian definiteness, GD step size selection, Lagrange setup for equality constraints</li>
  <li><strong>ML:</strong> OLS normal equations, R² vs adjusted R², logistic odds-ratio interpretation, kNN pre-processing, k-means convergence</li>
</ul>
<h3>Practice</h3>
<ol>
  <li>For each tagged topic, solve at least 5 fresh questions</li>
  <li>Set a 3-minute timer per question to simulate exam pace</li>
  <li>If you cross 4 minutes consistently, schedule another speed-drilling day after Mock 2</li>
</ol>
<h3>Mock 2 prep</h3>
<p>Tomorrow you sit a full 100-mark paper — heavier than Mock 1. Today is the last calm day before that. Sleep 7+ hours.</p>
`,
    formulas: [
      F("LA / Opt / ML focus", "Eigen · Hessian · OLS · Logistic · k-means", "Plug the leaks before Mock 2."),
    ],
    summary: "Wrap up weak topics from Phases 2–4 today. Tomorrow is Mock 2.",
  },
  {
    id: 54, date: dateForDay(54), phase: 5, subject: "revision",
    title: "Full mock test 2 (100 marks)",
    objectives: [
      "Sit a 2-hour, 100-mark paper",
      "Match Mock 1 conditions strictly",
      "Compare progress against Mock 1",
    ],
    videos: [],
    notes: `
<h2>Mock 2 — full paper, 100 marks</h2>
<p>Open Mock Tests and choose "100-mark paper". 50 questions weighted by exam proportions, 2 hours.</p>
<h3>Differences from Mock 1</h3>
<ul>
  <li>Twice as many questions in the same time</li>
  <li>Forces faster decision-making per question</li>
  <li>Reveals whether your speed has improved with the targeted revision</li>
</ul>
<h3>Strategy</h3>
<ul>
  <li>Two passes: pass 1 sweep easy + medium questions (~70 min); pass 2 attack hard / marked questions (~40 min); reserve 10 min for sanity-check</li>
  <li>Skip > 4 minutes — no question is worth ruining your time budget</li>
  <li>For MSQs, if uncertain, mark only the options you are confident about (depending on negative marking rules)</li>
</ul>
<h3>Target</h3>
<p>Score ≥ 80%. If you exceed 90%, you are in a strong position for July 19.</p>
`,
    formulas: [
      F("Mock 2 setup", "100 marks · 50 Qs · 2 hr", "Two-pass strategy."),
    ],
    summary: "Mock 2 doubles the volume in the same time. Pace is everything.",
  },
  {
    id: 55, date: dateForDay(55), phase: 5, subject: "revision",
    title: "Mock 2 review + formula sheet consolidation",
    objectives: [
      "Review every wrong/skipped question",
      "Consolidate four phase-formula sheets into one final master sheet",
      "Identify any remaining 'never seen this' topics",
    ],
    videos: [],
    notes: `
<h2>Mock 2 review</h2>
<p>Repeat the same five-step routine from Mock 1 review (D51). Tag root causes, build a list.</p>
<h3>Master formula sheet (consolidated)</h3>
<p>Combine the four mini-sheets from D14, D28, D35, and D49 into a single one-page document. Limit yourself to one A4 page (font size 10–11). If something doesn't make the cut, it isn't a 'must-memorise'.</p>
<h3>Contents (target):</h3>
<ul>
  <li><strong>Probability:</strong> Bayes, conditional, total prob, Bin/Pois/Norm means &amp; variances, z-table 1.645/1.96/2.58, CLT SE</li>
  <li><strong>Inference:</strong> CI, z-test, t-test, χ² df, F</li>
  <li><strong>LA:</strong> 2×2 inverse, projection, rank-nullity, eigen sum/product, SVD intuition</li>
  <li><strong>Opt:</strong> ∇f=0 + H test, GD update, Lagrange L = f + λg, KKT slackness</li>
  <li><strong>ML:</strong> OLS, ridge, R², bias-variance, sigmoid, cross-entropy, confusion-matrix metrics, k-means objective</li>
</ul>
<h3>Carry-along version</h3>
<p>This becomes the only sheet you study on D60 (exam eve) and the only thing you carry mentally into the exam.</p>
`,
    formulas: [
      F("Master sheet", "One A4 page, 5 sections", "If you can't write it from memory, you can't use it on exam day."),
    ],
    summary: "Consolidate everything into one A4 page. Anything that doesn't fit is not crucial.",
  },
  {
    id: 56, date: dateForDay(56), phase: 5, subject: "revision",
    title: "Speed drilling — Bayes & z-score",
    objectives: [
      "Solve 30 Bayes / z-score problems in 45 minutes",
      "Practise mental arithmetic for diagnostic-test questions",
      "Lock in z-table values from memory",
    ],
    videos: [],
    notes: `
<h2>Speed drill — Phase 1 fastest questions</h2>
<p>The exam loves Bayes / z-score because they are quick to set, quick to solve, and easy to mess up. Today: 30 problems, 90 seconds each.</p>
<h3>Bayes tricks</h3>
<ul>
  <li>Memorise the canonical form: posterior = (sens × prior) / (sens × prior + (1 − spec)(1 − prior))</li>
  <li>For low-prevalence + high-specificity: PPV is dominated by the false-positive arm</li>
  <li>Write out odds when probabilities feel unwieldy: posterior odds = prior odds × likelihood ratio</li>
</ul>
<h3>Z-score tricks</h3>
<ul>
  <li>z = (x − μ)/σ — flatten any normal question into Φ(z)</li>
  <li>Memorise: Φ(1) ≈ 0.84, Φ(1.5) ≈ 0.93, Φ(1.96) ≈ 0.975, Φ(2) ≈ 0.98, Φ(2.33) ≈ 0.99, Φ(2.58) ≈ 0.995</li>
  <li>For "X is between μ ± kσ", apply the empirical rule (68/95/99.7)</li>
</ul>
<h3>Drill format</h3>
<p>Open Mock Tests, set topic to <em>Probability</em>, count of 30, time of 45 min. After the drill, review every error.</p>
`,
    formulas: [
      F("Bayes canonical", "P(D|+) = (sens·p) / (sens·p + (1-spec)·(1-p))", "Drill until reflexive."),
      F("Z-shortcut", "Φ(1.96) ≈ 0.975", "95% one-tail boundary."),
    ],
    summary: "30 Bayes / z-score questions, 90 seconds each. Speed is built by repetition, not insight.",
  },
  {
    id: 57, date: dateForDay(57), phase: 5, subject: "revision",
    title: "Speed drilling — eigenvalues & matrix ops",
    objectives: [
      "Solve 30 LA problems in 45 minutes",
      "Compute 2×2 / 3×3 determinants reflexively",
      "Identify eigenvalues from trace + determinant",
    ],
    videos: [],
    notes: `
<h2>Speed drill — Phase 2 fastest moves</h2>
<h3>2 × 2 cheats</h3>
<ul>
  <li>det = ad − bc — never use cofactors for 2 × 2</li>
  <li>Inverse = (1/det) × [[d, −b], [−c, a]] — swap diagonal, negate off-diagonal</li>
  <li>Eigenvalues from Σλ = trace, Πλ = det: solve λ² − (tr)λ + det = 0</li>
</ul>
<h3>3 × 3 cheats</h3>
<ul>
  <li>For triangular / diagonal matrices, eigenvalues are diagonal entries</li>
  <li>Look for rows that are linearly dependent → det = 0 instantly</li>
  <li>For symmetric → eigenvalues are real and eigenvectors orthogonal</li>
</ul>
<h3>Common traps</h3>
<ul>
  <li>(AB)ᵀ = BᵀAᵀ (not AᵀBᵀ)</li>
  <li>(AB)⁻¹ = B⁻¹A⁻¹ (not A⁻¹B⁻¹)</li>
  <li>tr(AB) = tr(BA) — even when AB ≠ BA</li>
</ul>
<h3>Drill format</h3>
<p>30 problems, 90 seconds each, topic = Linear Algebra. Track which sub-areas (eigen, det, rank) slow you down most.</p>
`,
    formulas: [
      F("Eigen quadratic", "λ² − (tr)λ + det = 0", "Fast 2 × 2 eigenvalues."),
      F("Inverse swap", "(1/det)[[d,−b],[−c,a]]", "Instant 2 × 2 inverse."),
    ],
    summary: "30 LA problems at 90 seconds each. Learn the 2 × 2 cheats by heart.",
  },
  {
    id: 58, date: dateForDay(58), phase: 5, subject: "revision",
    title: "Speed drilling — regression & kNN",
    objectives: [
      "Solve 30 ML problems in 45 minutes",
      "Compute confusion-matrix metrics by reflex",
      "Apply OLS / ridge / logistic identities without re-derivation",
    ],
    videos: [],
    notes: `
<h2>Speed drill — Phase 4 fastest moves</h2>
<h3>Regression cheats</h3>
<ul>
  <li>β̂₁ = Cov(x,y)/Var(x) for one variable — quicker than the matrix form</li>
  <li>β̂₀ passes through (x̄, ȳ)</li>
  <li>R² = 1 − SSR/SST. Adjusted R² = 1 − (1 − R²)(n − 1)/(n − p − 1)</li>
  <li>Ridge shrinks toward 0; Lasso may zero some coefficients</li>
</ul>
<h3>Logistic cheats</h3>
<ul>
  <li>σ(0) = 0.5; σ(1) ≈ 0.73; σ(2) ≈ 0.88; σ(−1) ≈ 0.27</li>
  <li>e^{w_j} = odds ratio per unit of feature j</li>
  <li>Cross-entropy = −Σ[y log ŷ + (1−y) log(1 − ŷ)]</li>
</ul>
<h3>Confusion-matrix reflex</h3>
<p>Given TP/FP/TN/FN, compute accuracy / precision / recall / F1 in &lt; 30 seconds. Practise on five different matrices.</p>
<h3>kNN tips</h3>
<ul>
  <li>Always confirm: standardised features?</li>
  <li>Ties? Distance-weighted vote or nearest of the tied points</li>
  <li>k = 1 may overfit; k = n shrinks to majority class</li>
</ul>
<h3>Drill format</h3>
<p>30 problems, ML filter. The objective: complete the easy 70% in 25 minutes, then attack the 30% harder ones in 20 minutes.</p>
`,
    formulas: [
      F("Sigmoid table", "σ(0,1,2) ≈ 0.5, 0.73, 0.88", "Worth memorising."),
      F("Confusion matrix reflex", "(P, R, F1) in 30 s", "Bank time on these."),
    ],
    summary: "30 ML problems at 90 seconds each. Build automatic reflexes for the confusion matrix and sigmoid.",
  },
  {
    id: 59, date: dateForDay(59), phase: 5, subject: "revision",
    title: "Full mock test 3 — final simulation",
    objectives: [
      "Sit Mock 3 exactly like exam day",
      "Use the master formula sheet only in the warm-up",
      "Aim for ≥ 85% as a strong proxy for exam performance",
    ],
    videos: [],
    notes: `
<h2>Mock 3 — final simulation</h2>
<p>Today's mock is your closest dress rehearsal for July 19. Match conditions exactly:</p>
<ul>
  <li>Start at the same time of day as your exam slot</li>
  <li>Phone in another room</li>
  <li>Single 5-minute bathroom break only if absolutely needed</li>
  <li>Use the same scratch-paper format you intend to use on exam day</li>
</ul>
<h3>Strategy reminders</h3>
<ul>
  <li>Two passes: easy + medium first (~70 min), then hard / marked (~40 min), then sanity-check (~10 min)</li>
  <li>If a question is taking &gt; 4 minutes, mark and skip — every time</li>
  <li>For numerical answers, sanity check the order of magnitude before committing</li>
  <li>If unsure between two MSQs, pick the more conservative answer (only options you are highly confident in)</li>
</ul>
<h3>After the mock</h3>
<p>Save the score. Take a 90-minute break (walk, snack, light music). Then do a quick error-review — no deep dive. The night-before should be calm.</p>
<h3>Target</h3>
<p>≥ 85% in this mock correlates well with strong exam performance. Anything ≥ 80% means you are exam-ready.</p>
`,
    formulas: [
      F("Mock 3 plan", "Two-pass · time-box · sanity check", "Exam-day muscle memory."),
    ],
    summary: "Mock 3 is the dress rehearsal. Score and strategy should both feel exam-ready.",
  },
  {
    id: 60, date: dateForDay(60), phase: 5, subject: "revision",
    title: "Exam eve — light review only",
    objectives: [
      "Look at the master formula sheet once",
      "Re-attempt 5 confidence-builder questions",
      "Sleep 8 hours",
    ],
    videos: [],
    notes: `
<h2>Day before exam — calm energy</h2>
<p>You have done 59 days of work. Today is for confidence, not learning. Two short blocks:</p>
<h3>Block 1 — formula sheet (45 min)</h3>
<ul>
  <li>Read the master one-page sheet slowly twice</li>
  <li>Close it. Try to rewrite the entire sheet from memory on a fresh page</li>
  <li>Compare and note any forgotten items — but don't drill them; just be aware</li>
</ul>
<h3>Block 2 — confidence builders (30 min)</h3>
<p>Open Mock Tests, choose 10 random questions. Pick the topics you find easiest. Solve them confidently. This re-anchors your self-trust before the real exam.</p>
<h3>Logistics for tomorrow</h3>
<ul>
  <li>Set out admit card, ID, pens, water</li>
  <li>Plan transport with 30-minute buffer</li>
  <li>Light dinner — nothing experimental</li>
  <li>No new material under any circumstances</li>
  <li>Sleep by 10:30 PM, wake by 6:30 AM</li>
</ul>
<h3>Tomorrow morning</h3>
<p>Breakfast, glance at the formula sheet once over coffee, then leave for the centre. You have done enough. Trust the process.</p>
`,
    formulas: [
      F("Exam eve rule", "Read · rewrite · sleep", "No new material."),
    ],
    summary: "59 days behind you. Read the sheet, sleep well, go in calm.",
  },
];

const allDayData = [...phase1, ...phase2, ...phase3, ...phase4, ...phase5];

export const curriculum: Day[] = allDayData.map((d) => ({
  ...d,
  questions: questionBank[d.id] ?? [],
}));

export function dayById(id: number): Day | undefined {
  return curriculum.find((d) => d.id === id);
}
