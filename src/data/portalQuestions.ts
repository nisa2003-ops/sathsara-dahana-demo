export interface PortalOption {
  id: string;
  label: string;
  text: string;
}

export interface PortalQuestion {
  id: number;
  questionNumber: string; // e.g. "01/03"
  category: string;
  title: string;
  description?: string;
  options: PortalOption[];
  correctOptionId: string;
  explanation: string;
}

export const PORTAL_QUESTIONS: PortalQuestion[] = [
  {
    id: 1,
    questionNumber: "01/03",
    category: "TEMPORAL LOGIC // SECTOR ALPHA",
    title: "In relativistic quantum computing, which mechanism prevents paradoxes when an asynchronous calculation resolves before its dispatch trigger?",
    description: "Analyze causal loop stabilization protocols across hyperspace coordinates.",
    options: [
      { id: "A", label: "A", text: "Novikov Self-Consistency Vector Quarantine" },
      { id: "B", label: "B", text: "Tachyon-Buffer State Invalidation" },
      { id: "C", label: "C", text: "Chrono-Deterministic Asynchronous Locking" },
      { id: "D", label: "D", text: "Entropy-Reversal Snapshot Pruning" },
    ],
    correctOptionId: "A",
    explanation: "Novikov Self-Consistency ensures local causality by constraining quantum probability paths to non-paradoxical worldlines.",
  },
  {
    id: 2,
    questionNumber: "02/03",
    category: "DIMENSIONAL TRAVERSAL // SECTOR BETA",
    title: "To calculate the shortest harmonic geodesic through a 4D Calabi-Yau manifold, which algorithm minimizes dimensional drift?",
    description: "Targeting optimal energy transfer during cross-continuum jumps.",
    options: [
      { id: "A", label: "A", text: "Hyper-Spherical Dijkstra Expansion" },
      { id: "B", label: "B", text: "Tesseract A* with Metric Tensor Heuristic" },
      { id: "C", label: "C", text: "Quantum Topological Simplex Annealing" },
      { id: "D", label: "D", text: "Hamiltonian Phase-Space Convolution" },
    ],
    correctOptionId: "B",
    explanation: "A* utilizing Riemannian metric tensors accounts for curved dimensional manifolds, eliminating temporal shear.",
  },
  {
    id: 3,
    questionNumber: "03/03",
    category: "CODEXIA CORE // SECTOR GAMMA",
    title: "What is CODEXIA's core architectural protocol for synchronizing acoustic resonance with spatial reality?",
    description: "The harmonic foundation bridging music, movement, and the continuum.",
    options: [
      { id: "A", label: "A", text: "Polyphonic Spatial Phase Modulation" },
      { id: "B", label: "B", text: "Sathsara Harmonic Resonance Alignment" },
      { id: "C", label: "C", text: "Sub-atomic Frequency Entanglement" },
      { id: "D", label: "D", text: "Acoustic-Temporal Field Oscillation" },
    ],
    correctOptionId: "B",
    explanation: "Sathsara Harmonic Resonance aligns acoustic vibrational nodes directly with dimensional rift frequencies.",
  },
];
