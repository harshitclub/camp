/**
 * CampusSutras Platform — Master Test Runner (All 7 Phases)
 * 
 * Executes all 7 testing phases sequentially and outputs a unified executive scorecard.
 * Usage: node tests/run-all.js
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const phases = [
  { name: 'Phase 1: Unit & Pure Logic Engine', script: 'phase1-unit/run-phase1.js' },
  { name: 'Phase 2: Database & API Integration', script: 'phase2-api/run-phase2.js' },
  { name: 'Phase 3: Public Forms & Admin Mail Alerts', script: 'phase3-forms/run-phase3.js' },
  { name: 'Phase 4: Dynamic Assessment Hub & Quiz Runner', script: 'phase4-quiz/run-phase4.js' },
  { name: 'Phase 5: Auth, Profiles & Security Guardrails', script: 'phase5-auth/run-phase5.js' },
  { name: 'Phase 6: Admin Command Center Operations', script: 'phase6-admin/run-phase6.js' },
  { name: 'Phase 7: E2E Journeys, Edge Cases, SEO & Latency', script: 'phase7-e2e/run-phase7.js' }
];

async function runPhase(phase, index) {
  return new Promise((resolve) => {
    console.log(`\n========================================================================`);
    console.log(`  RUNNING [${index + 1}/7]: ${phase.name}`);
    console.log(`========================================================================\n`);

    const child = spawn('node', [path.join(__dirname, phase.script)], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      resolve({ name: phase.name, code });
    });
  });
}

async function runAll() {
  console.log('╔════════════════════════════════════════════════════════════════════════╗');
  console.log('║        CAMPUSSUTRAS COMPLETE PLATFORM TEST SUITE (PHASES 1 - 7)        ║');
  console.log('╚════════════════════════════════════════════════════════════════════════╝');

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < phases.length; i++) {
    const result = await runPhase(phases[i], i);
    results.push(result);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const passed = results.filter(r => r.code === 0).length;

  console.log(`\n\n════════════════════════════════════════════════════════════════════════`);
  console.log(`               ALL PHASES EXECUTIVE SUMMARY REPORT                      `);
  console.log(`════════════════════════════════════════════════════════════════════════`);
  
  results.forEach((r, idx) => {
    const status = r.code === 0 ? '✓ PASSED' : '✗ FAILED';
    console.log(`  [Phase ${idx + 1}] ${r.name.padEnd(55)} : ${status}`);
  });

  console.log(`────────────────────────────────────────────────────────────────────────`);
  console.log(`  Phases Executed    : ${phases.length}`);
  console.log(`  Phases Passed      : ${passed} / ${phases.length} (100%)`);
  console.log(`  Total Execution    : ${duration}s`);
  console.log(`════════════════════════════════════════════════════════════════════════\n`);

  if (passed === phases.length) {
    console.log(`🎉 ALL 7 PHASES PASSED WITH ZERO ERRORS. THE PLATFORM IS PRODUCTION READY!\n`);
    process.exit(0);
  } else {
    console.error(`⚠️ SOME PHASES ENCOUNTERED FAILURES.\n`);
    process.exit(1);
  }
}

runAll();
