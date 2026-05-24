# Course Index

Quick-lookup index over all 60 days of curriculum + question bank. Built so an agent (or human) can answer "where is X covered?" without reading the full `curriculum.ts` / `questions.ts` files.

## How to use

- **Find a concept** → search this file for the topic (e.g. "ROC", "nullity"), note the day(s).
- **Find a day's content** → jump to the row, read the `curriculum.ts` line for notes/objectives, the `questions.ts` line for quiz items.
- **Line numbers are approximate** — they shift after edits. Use them as read offsets, not exact addresses. Re-grep for `id: N,` (curriculum) or `^  N:` (questions) when in doubt.
- **`Qs` column** is `base + officialSample2026 injections`. Total per day = base + injections.
- **`Syll` column**: ✓ = entirely in official IITM 2026 syllabus · ◐ = day has off-syllabus sections (look for the yellow "Extension" banner in the notes) · ✗ = day is entirely off-syllabus (skip if time-pressed).
- Source files: [src/data/curriculum.ts](src/data/curriculum.ts), [src/data/questions.ts](src/data/questions.ts), [src/data/types.ts](src/data/types.ts).

## Official 2026 syllabus (verbatim)

- **Probability and Statistics**: intro to probability (conditional, joint), random variables, PMFs / PDFs, joint probability distributions, sample statistics, graphical descriptive statistics, central limit theorem, hypothesis testing (t-test, z-test, χ²-test, F-test).
- **Linear Algebra**: vectors, matrices, matrix-vector product, rank, null space, solution of equations and pseudo-inverse, distance, projections, eigenvalue decomposition.
- **Optimization**: types of optimization, **unconstrained** univariate and multivariate optimization, gradient descent.
- **Basic Machine Learning**: simple and multiple linear regression, least-squares, kNN, logistic regression, k-means clustering, cross-validation.

Anything outside these four lists is "extension" — included in this app for defensive coverage (IITM occasionally drifts) but explicitly flagged with a yellow banner in the curriculum HTML.

## Phase map

| Phase | Days | Subject | Subject weight in mock | Curriculum file range |
|---|---|---|---|---|
| 1 | 1–14 | Probability & Statistics | 40.0% | curriculum.ts:13–728 |
| 2 | 15–28 | Linear Algebra | 35.0% | curriculum.ts:729–1400 |
| 3 | 29–35 | Optimization | 2.5% | curriculum.ts:1401–1697 |
| 4 | 36–49 | Basic ML | 22.5% | curriculum.ts:1698–2316 |
| 5 | 50–60 | Revision & Mocks | — | curriculum.ts:2317–2740 |

Weights live in `SUBJECT_WEIGHTS` at [src/data/types.ts](src/data/types.ts). Calibrated against the IITM 2026 official sample paper (16/14/1/9 split over 40 questions).

---

## Phase 1 — Probability & Statistics

| Day | Syll | curriculum.ts | questions.ts | Qs | Title | Key concepts |
|---|---|---|---|---|---|---|
| 1 | ✓ | ~13 | ~20 | 5+0 | Introduction — what is data science? | DS workflow stages; role of probability; bias-variance intro; descriptive vs inferential |
| 2 | ✓ | ~88 | ~52 | 5+2 | Sample space, events, probability axioms | axioms; union/complement; independence vs mutual exclusivity; "at least one" complement trick |
| 3 | ✓ | ~128 | ~84 | 8+2 | Conditional probability & Bayes' theorem | conditional P; total probability; Bayes; sensitivity/specificity/PPV; supplier-defect Bayes |
| 4 | ✓ | ~170 | ~134 | 6+1 | Discrete random variables | PMF; E[X], Var(X); Bernoulli/Binomial/Geometric/Poisson; E[(a+X)²] expansion |
| 5 | ✓ | ~217 | ~172 | 8+2 | Continuous random variables | PDF/CDF; Uniform/Exponential/Normal; uniform on disjoint unions; Maxwell-Boltzmann match-up |
| 6 | ✓ | ~262 | ~222 | 5+0 | Normal distribution deep dive | z-scores; 68/95/99.7; standard normal tail values |
| 7 | ✓ | ~301 | ~254 | 7+2 | Joint distributions, covariance & correlation types | marginal density; Cov, Pearson/Spearman/Kendall; order statistics min/max conditionals |
| 8 | ✓ | ~370 | ~298 | 7+4 | Descriptive statistics | mean/median/mode; variance (Bessel n−1); IQR/box plots; box-plot critical reading; monotonicity check; robustness/breakdown points; skewness ordering; recursive mean update |
| 9 | ✓ | ~443 | ~342 | 5+0 | Sampling distributions & Central Limit Theorem | CLT; SE = σ/√n; sampling distribution of mean |
| 10 | ✗ | ~477 | ~374 | 5+0 | Confidence intervals | CI = est ± crit·SE; z vs t; margin of error. *Not in syllabus — skim only.* |
| 11 | ✓ | ~518 | ~406 | 7+1 | Hypothesis testing — z and t tests | H₀ vs H₁; one-/two-tailed; Z-test for known σ; t-test; flow-rate Z-test |
| 12 | ✓ | ~584 | ~450 | 7+1 | Chi-square & F-tests | χ² goodness/independence; F-test for variances; F = (s₁²/σ₁²)/(s₂²/σ₂²); df pairs |
| 13 | ✓ | ~634 | ~494 | 5+1 | Probability review & problem set | 20-problem drill; permutations P(n,k); independence vs mutually exclusive recap |
| 14 | ✓ | ~694 | ~526 | 5+0 | Stats mini-mock + formula sheet | Phase-1 mock; one-page formula sheet |

## Phase 2 — Linear Algebra

| Day | Syll | curriculum.ts | questions.ts | Qs | Title | Key concepts |
|---|---|---|---|---|---|---|
| 15 | ✓ | ~729 | ~562 | 8+1 | Vectors and vector spaces | ℝⁿ; span, independence, basis, dimension; symmetric/skew-sym dimensions; linear combinations |
| 16 | ✓ | ~766 | ~612 | 8+0 | Linear transformations & matrices | linearity (additivity + scaling); identity, rotation, translation-is-not-linear; sym+skew decomposition |
| 17 | ✓ | ~837 | ~662 | 5+0 | Matrix multiplication | row · column; tr(AB) = tr(BA); non-commutativity; outer products |
| 18 | ✓ | ~873 | ~694 | 9+1 | Systems of equations | Gaussian elimination; rank vs consistency; Rouché–Capelli; homogeneous; underdetermined |
| 19 | ✓ | ~929 | ~750 | 8+2 | Rank, null space, column space | four fundamental subspaces; rank-nullity; rank-1 outer product; **det = 0 ⇔ non-trivial null space** |
| 20 | ✓ | ~995 | ~800 | 6+1 | Determinants | det properties; cofactor expansion; volume scaling; parametrised det = 0 |
| 21 | ✓ | ~1035 | ~838 | 7+1 | Matrix inverse & pseudo-inverse | 2×2 inverse; Moore-Penrose A⁺; OLS β̂ = X⁺y; **Neumann series for nilpotent (I−A)⁻¹** |
| 22 | ✓ | ~1111 | ~882 | 6+2 | Dot products & projections | u·v algebraic + geometric; projection formula; Cauchy-Schwarz; **orthonormalisation û=u/‖u‖** |
| 23 | ✓ | ~1154 | ~920 | 9+4 | Eigenvalues & eigenvectors | characteristic polynomial; sum=trace, product=det; complex conjugate pairs for real A; rank-1 eigenvalue; involutory ±1 |
| 24 | ✓ | ~1208 | ~977 | 6+1 | Eigenvalue decomposition | A = PDP⁻¹; symmetric → orthogonal eigenvectors; eigenvalues of Aᵏ |
| 25 | ✗ | ~1243 | ~1015 | 6+0 | Singular value decomposition (SVD) | A = UΣVᵀ; singular values = √eigenvalues of AᵀA. *Extension — syllabus lists eigenvalue decomp only.* |
| 26 | ✓ | ~1282 | ~1053 | 5+0 | Distance metrics | Euclidean, Manhattan, Minkowski; cosine similarity; standardise before kNN |
| 27 | ✓ | ~1329 | ~1085 | 5+1 | Linear algebra problem set | mixed drills; **solution-differences span Null(A)**; Gram-Schmidt construction |
| 28 | ✓ | ~1366 | ~1117 | 5+0 | Linear algebra mini-mock | Phase-2 mock; LA formula sheet |

## Phase 3 — Optimization

| Day | Syll | curriculum.ts | questions.ts | Qs | Title | Key concepts |
|---|---|---|---|---|---|---|
| 29 | ✓ | ~1401 | ~1153 | 5+0 | Types of optimization | convex vs non-convex; unconstrained/constrained; convex functions table |
| 30 | ✓ | ~1444 | ~1185 | 7+1 | Univariate optimization | f'=0; second-derivative test; endpoints on closed intervals; f'=f''=0 needs higher-order |
| 31 | ✓ | ~1482 | ~1229 | 5+0 | Multivariate optimization | gradient ∇f=0; Hessian definiteness for min/max/saddle |
| 32 | ✓ | ~1525 | ~1261 | 5+0 | Gradient descent | x ← x − η∇f; step size; SGD; Adam/momentum |
| 33 | ◐ | ~1567 | ~1293 | 5+0 | Convexity & Lagrange multipliers | convex functions; **Lagrange L = f + λg (extension)**; **KKT (extension)**; Slater (extension) |
| 34 | ◐ | ~1613 | ~1325 | 5+0 | Optimization problem set | mixed opt drills; **Newton's method (extension)**; **coordinate descent (extension)** |
| 35 | ✓ | ~1660 | ~1357 | 5+0 | Optimization mini-mock | Phase-3 mock; L-smooth formal definition (one-liner) |

## Phase 4 — Machine Learning

| Day | Syll | curriculum.ts | questions.ts | Qs | Title | Key concepts |
|---|---|---|---|---|---|---|
| 36 | ✓ | ~1698 | ~1393 | 5+0 | ML framework & terminology | supervised/unsupervised/RL; train/val/test; loss functions |
| 37 | ✓ | ~1745 | ~1425 | 5+1 | Simple linear regression | y = β₀ + β₁x; OLS minimises Σ(y−ŷ)²; R² interpretation |
| 38 | ✓ | ~1787 | ~1457 | 5+0 | Multiple linear regression | β̂ = (XᵀX)⁻¹Xᵀy; multicollinearity; VIF; ridge = (XᵀX + λI)⁻¹Xᵀy |
| 39 | ✗ | ~1831 | ~1489 | 5+0 | Model assessment & selection | AIC = 2k − 2 ln L; BIC; adjusted R²; forward selection; Lasso (L1) vs Ridge (L2). *Extension — not in syllabus.* |
| 40 | ◐ | ~1871 | ~1521 | 5+0 | Bias–variance tradeoff | MSE = bias² + var + σ²; underfit/overfit symptoms; regularisation effect. *Bias-variance is foundational; regularisation is extension.* |
| 41 | ✓ | ~1917 | ~1553 | 5+2 | Logistic regression | P(y=1|x) = σ(wᵀx+b); log-odds; cross-entropy; **σ(−∞)=0, σ(0)=0.5, σ(+∞)=1**; **linear posterior ⇒ linear boundary** |
| 42 | ✓ | ~1966 | ~1585 | 5+2 | Logistic regression for classification | thresholding; confusion matrix; precision/recall/F1/AUC; **ROC corner points (0,0), (1,1), (0,1)** |
| 43 | ✓ | ~2016 | ~1617 | 5+1 | k-Nearest Neighbours | non-parametric; k effect on bias/variance; distance metrics; feature scaling; curse of dimensionality |
| 44 | ✓ | ~2064 | ~1649 | 5+1 | k-Means clustering | minimise within-cluster SSE; initialisation sensitivity; elbow method; spherical-cluster assumption |
| 45 | ✓ | ~2110 | ~1681 | 5+1 | Cross-validation | k-fold, LOOCV (low bias, high variance, **no parsimony preference**); stratified; pipeline leakage |
| 46 | ✓ | ~2154 | ~1713 | 5+0 | ML problem set 1 — regression | OLS by hand; R², adjusted R²; ridge; VIF; **residual-pattern diagnostics** |
| 47 | ✓ | ~2199 | ~1745 | 5+1 | ML problem set 2 — classification | confusion matrix arithmetic; sigmoid evaluation; kNN by hand; FNR |
| 48 | ◐ | ~2234 | ~1777 | 5+0 | Combined ML review | algorithm comparison table; **discriminative vs generative (extension framing)** |
| 49 | ✓ | ~2281 | ~1809 | 5+0 | ML mini-mock | Phase-4 mock; ML formula sheet |

## Phase 5 — Revision & Mocks

| Day | Syll | curriculum.ts | questions.ts | Qs | Title | Key concepts |
|---|---|---|---|---|---|---|
| 50 | ✓ | ~2317 | ~1846 | 5+0 | Full mock test 1 (50 marks) | Mock 1 |
| 51 | ◐ | ~2346 | ~1878 | 5+0 | Mock 1 review — weak topic analysis | review checklist; root-cause taxonomy; **No Free Lunch theorem (extension)** |
| 52 | ✓ | ~2386 | ~1910 | 5+0 | Targeted revision — stats weak topics | stats re-drill on top-3 weak areas |
| 53 | ✓ | ~2421 | ~1942 | 5+0 | Targeted revision — LA / Opt / ML weak topics | non-stats re-drill |
| 54 | ✓ | ~2452 | ~1974 | 5+0 | Full mock test 2 (100 marks) | Mock 2 (full length) |
| 55 | ◐ | ~2484 | ~2006 | 5+0 | Mock 2 review + formula sheet consolidation | master sheet; **MLE, consistency, MAP, Bayesian posterior (extension)** |
| 56 | ✓ | ~2525 | ~2038 | 5+0 | Speed drilling — Bayes & z-score | 30 problems in 45 min; Bayes canonical form |
| 57 | ◐ | ~2558 | ~2070 | 5+0 | Speed drilling — eigenvalues & matrix ops | 2×2 cheats; eigenvalue quadratic; **PCA in one paragraph (extension)** |
| 58 | ◐ | ~2606 | ~2102 | 5+0 | Speed drilling — regression & kNN | confusion-matrix reflex; sigmoid table; **decision trees, random forests, Naive Bayes (extension)** |
| 59 | ✓ | ~2661 | ~2134 | 5+0 | Full mock test 3 — final simulation | Mock 3 (dress rehearsal) |
| 60 | ✓ | ~2696 | ~2166 | 5+0 | Exam eve — light review only | one-page formula sheet only |

---

## Official 2026 Sample Paper (40 Qs)

The full IITM CODE AI 2026 sample paper lives in `officialSample2026` at the bottom of [src/data/questions.ts](src/data/questions.ts) (~2210+). Each question is also injected into a topically-aligned day (see `officialDayAssignments` map at ~2453).

Quick concept map (Q-number → day):

| Q | Topic | Day |
|---|---|---|
| Q1 | Event independence | 2 |
| Q2 | Sigmoid limits | 41 |
| Q3 | Markov-like compound prob | 3 |
| Q4 | Orthogonal vectors, orthonormalisation | 22 |
| Q5 | Confusion matrix metric comparison | 42 |
| Q6 | Box plot critical reading | 8 |
| Q7 | Eigenvalues + det, complex conjugate pair | 23 |
| Q8 | Null space ↔ det = 0 | 19 |
| Q9 | Linear posterior ⇒ linear boundary | 41 |
| Q10 | Monotonicity from scattered data | 8 |
| Q11 | Nilpotent (I−A)⁻¹ via geometric series | 21 |
| Q12 | Eigenvalues from rank + trace | 23 |
| Q13 | Nullity of rank-1 matrix | 19 |
| Q14 | Sum of squares of eigenvalues of A⁶ ⚠ (see note in question explanation re: OCR sign) | 24 |
| Q15 | Uniform on disjoint support, mean | 5 |
| Q16 | Marginal from joint density | 7 |
| Q17 | All-ones matrix eigenvalue | 23 |
| Q18 | Least squares minimises Σdᵢ² | 37 |
| Q19 | Right-skewed → mean > median | 8 |
| Q20 | Z-test for controller mean | 11 |
| Q21 | Linear system 3 unknowns | 18 |
| Q22 | Recognise Maxwell-Boltzmann as Normal | 5 |
| Q23 | Two coin tosses, at least one head | 2 |
| Q24 | E[(2+X)²] from Var, E[X] | 4 |
| Q25 | False negative rate | 47 |
| Q26 | ROC point (1, 1) | 42 |
| Q27 | LOOCV bias/variance/parsimony | 45 |
| Q28 | Vector linear combination | 15 |
| Q29 | Perpendicular vectors | 22 |
| Q30 | K-means objective | 44 |
| Q31 | Sum of eigenvalues = trace | 23 |
| Q32 | Necessary condition for minimum | 30 |
| Q33 | Parametrised det = 0 (MSQ) | 20 |
| Q34 | Bayes — battery accept/reject | 3 |
| Q35 | kNN steps in order | 43 |
| Q36 | Null space from 3 solutions | 27 |
| Q37 | F-statistic from sample variances | 12 |
| Q38 | Counting permutations | 13 |
| Q39 | Conditional with min/max of uniforms | 7 |
| Q40 | Median is outlier-robust | 8 |

---

## Concept-to-day reverse lookup

Find a concept fast. Format: `concept → day(s)`.

### Probability & Stats
- axioms / sample space → 2
- combinatorics / permutations → 13
- conditional probability → 3
- Bayes' theorem → 3, 34 (battery example), 51, 56 (drill)
- Bernoulli / Binomial / Geometric / Poisson → 4
- continuous distributions (Uniform / Exponential / Normal) → 5
- uniform on disjoint support → 5
- Normal — z-scores, 68/95/99.7 → 6
- joint distributions, marginals → 7
- order statistics (min, max) → 7
- Cov, Pearson / Spearman / Kendall → 7
- mean, median, mode, IQR → 8
- box plots, critical reading → 8
- skewness ordering → 8
- robustness / breakdown point → 8
- CLT, SE = σ/√n → 9
- confidence intervals → 10
- z-test / t-test, p-value, power → 11
- chi-square, F-test → 12
- E[(a+X)²] expansion → 4

### Linear Algebra
- vector spaces, span, basis, dimension → 15
- symmetric / skew-symmetric → 16, 23
- linear transformations → 16
- matrix multiplication, trace identities → 17
- systems of equations, Rouché–Capelli → 18
- rank, nullity, four subspaces → 19
- non-trivial null space ⇔ det = 0 → 19
- determinants → 20
- matrix inverse (2×2 cheat) → 21, 57
- pseudo-inverse (Moore-Penrose) → 21
- Neumann / geometric series for (I−A)⁻¹ → 21
- dot products, projection, Cauchy-Schwarz → 22
- orthogonal vectors, normalisation, Gram-Schmidt → 22, 27
- eigenvalues, eigenvectors → 23, 57
- complex conjugate eigenvalues for real matrices → 23
- diagonalisation → 24
- SVD → 25
- distance metrics → 26
- PCA → 57 (intro)
- solution differences spanning Null(A) → 27

### Optimization
- convex / concave functions → 29, 33
- univariate optimisation, second-derivative test → 30
- multivariate ∇f = 0, Hessian → 31
- gradient descent, SGD → 32
- Lagrange multipliers, KKT → 33
- Newton's method, quadratic convergence → 34
- coordinate descent → 34
- L-smooth (formal definition) → 35
- ridge / Lasso regularisation → 34, 39

### ML
- supervised vs unsupervised vs RL → 36
- simple linear regression, OLS → 37
- multiple linear regression, multicollinearity, VIF, ridge → 38
- AIC, BIC, adjusted R², stepwise → 39
- bias-variance decomposition → 40
- logistic regression, sigmoid, log-odds → 41
- sigmoid limits σ(±∞), σ(0) → 41
- linear posterior ⇒ linear boundary → 41
- confusion matrix, precision/recall/F1 → 42, 47
- ROC, AUC, ROC corner points → 42
- kNN → 43
- k-Means → 44
- cross-validation, LOOCV, leakage → 45
- residual-pattern diagnostics → 46
- discriminative vs generative → 48
- No Free Lunch theorem → 51
- MLE, consistency, MAP, Bayesian posterior → 55
- decision trees (Gini, entropy), random forests, Naive Bayes → 58

---

## Test types and answer encoding

In [src/data/types.ts](src/data/types.ts) `QuizQuestion`:

- `type: "mcq"` — single correct, `answer` is a 0-based number index
- `type: "msq"` — multi-select, `answer` is `number[]` (0-based indices)
- `type: "numerical"` — single correct, `answer` is a 0-based number index (rendered with the options the same as mcq)

A question is correct iff the user's selected option set equals the answer set exactly.

## Recent integrity checks

- Cross-file curriculum-vs-questions audit done. 5 official-sample gaps + ~16 day-level gaps closed in `curriculum.ts`. See git log.
- Full ~340-question correctness audit done. 2 errors found and fixed: `d15q6` (off-by-one answer index), `d57q3` (broken option set replaced with correct 2±√3 form).
