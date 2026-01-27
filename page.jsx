"use client";

import React, { useState } from 'react';

export default function OrgChart() {
  const [activePhase, setActivePhase] = useState('pre');
  const [optionScenario, setOptionScenario] = useState('exercised');

  const phases = {
    pre: 'Pre-Reorganization',
    phase1: 'Post-Reorganization: Phase 1',
    phase2: 'Post-Reorganization: Phase 2 — Option Agreement',
    timeline: 'Timeline of Key Events'
  };

  const EntityBox = ({ name, subtitle, definedTerm, owners, treasury = false }) => (
    <div 
      className="bg-slate-800 border-2 border-slate-600 rounded-lg p-4 text-center shadow-lg"
      style={{ minWidth: '240px' }}
    >
      <div className="font-bold text-white text-sm leading-tight">{name}</div>
      {subtitle && <div className="text-slate-400 text-xs mt-1">{subtitle}</div>}
      {definedTerm && <div className="text-blue-400 text-xs mt-1 font-semibold">{definedTerm}</div>}
      <div className="mt-3 space-y-1">
        {owners.map((owner, idx) => (
          <div key={idx} className={`text-xs px-2 py-1 rounded ${owner.highlight ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
            {owner.name}: <span className="font-semibold">{owner.percent}%</span>
            {owner.note && <span className="text-amber-300 ml-1">({owner.note})</span>}
          </div>
        ))}
        {treasury && (
          <div className="text-xs px-2 py-1 rounded bg-emerald-700 text-emerald-100">
            Treasury: <span className="font-semibold">51%</span>
          </div>
        )}
      </div>
    </div>
  );

  const PersonBox = ({ name, highlight = false }) => (
    <div className={`rounded-full px-4 py-2 text-center text-sm font-medium shadow ${highlight ? 'bg-amber-600 text-white border-2 border-amber-400' : 'bg-slate-600 text-white border-2 border-slate-500'}`}>
      {name}
    </div>
  );

  const PotentialBuyerBox = ({ name }) => (
    <div className="bg-purple-900/50 border-2 border-dashed border-purple-400 rounded-lg px-3 py-2 text-center">
      <div className="text-purple-300 text-xs font-medium uppercase tracking-wide mb-1">Potential Buyer</div>
      <div className="text-purple-100 text-sm font-semibold">{name}</div>
    </div>
  );

  const DottedLineVertical = ({ note }) => (
    <div className="flex flex-col items-center my-2">
      <div className="border-l-2 border-dashed border-red-400 h-6"></div>
      <div className="text-red-400 text-xs italic text-center px-2 py-1 bg-slate-900/80 rounded max-w-48 leading-tight">
        {note}
      </div>
      <div className="border-l-2 border-dashed border-red-400 h-6"></div>
    </div>
  );

  const DottedLineHorizontal = () => (
    <div className="border-t-2 border-dashed border-purple-400 w-16"></div>
  );

  const timelineEvents = [
    { date: 'April 2018', event: 'Finalization of Webster estate litigation settlement', category: 'legal' },
    { date: 'May 11, 2018', event: 'Curtis McGraw Group, Inc. created', category: 'formation' },
    { date: 'May 18, 2018', event: 'Letter of Intent for 20% share purchase by Curtis in Curtis McGraw Group', category: 'transaction' },
    { date: 'July 29, 2019', event: 'McGraw Holdings New Jersey, Inc. (the "Company") created', category: 'formation' },
    { date: '2019', event: 'WMBE application filed', category: 'regulatory' },
    { date: 'August 2019', event: 'Invoice to Shycast marked "Paid"', category: 'financial' },
    { date: '2019', event: 'Cannabis application filed', category: 'regulatory' },
    { date: 'December 7, 2021', event: 'Permit endorsement received', category: 'regulatory' },
    { date: 'December 2022', event: 'Request for extension of deadline to become operational', category: 'regulatory' },
    { date: 'April 28, 2023', event: 'Reorganization Phase I: Reorganization Agreement, Stock Purchase Agreement, Stockholders Agreement, Option Agreement, Promissory Note, Personal Guaranty, Mutual Releases', category: 'transaction', highlight: true },
    { date: 'December 2023', event: 'Second request for extension granted (to June 4, 2024)', category: 'regulatory' },
    { date: 'June 2024', event: 'Company terminates operations', category: 'termination' },
    { date: 'April 15, 2025', event: 'Stephanie Peloso brings suit against Jennifer Ortega and Curtis McGraw Webster (does not name the Company)', category: 'litigation', highlight: true },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      legal: 'bg-blue-600',
      formation: 'bg-green-600',
      transaction: 'bg-amber-600',
      regulatory: 'bg-cyan-600',
      financial: 'bg-purple-600',
      termination: 'bg-red-600',
      litigation: 'bg-red-700'
    };
    return colors[category] || 'bg-slate-600';
  };

  const renderTimeline = () => (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Definition reminder */}
      <div className="mb-6 bg-blue-900/30 border border-blue-500 rounded-lg px-4 py-2 text-blue-200 text-sm">
        <strong>Note:</strong> McGraw Holdings New Jersey, Inc. is referred to herein as the <strong>"Company"</strong>
      </div>
      
      {/* Timeline */}
      <div className="relative w-full">
        {/* Vertical line */}
        <div className="absolute left-24 top-0 bottom-0 w-0.5 bg-slate-600"></div>
        
        {/* Events */}
        <div className="space-y-4">
          {timelineEvents.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {/* Date */}
              <div className="w-24 text-right text-xs text-slate-400 pt-1 flex-shrink-0">
                {item.date}
              </div>
              
              {/* Dot */}
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)} flex-shrink-0 mt-1.5 ring-2 ring-slate-900`}></div>
              
              {/* Event */}
              <div className={`flex-1 text-sm ${item.highlight ? 'bg-slate-700 border border-slate-500 rounded-lg p-2' : ''}`}>
                <span className={item.highlight ? 'text-white font-medium' : 'text-slate-300'}>
                  {item.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-600"></div><span className="text-slate-400">Legal</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-600"></div><span className="text-slate-400">Formation</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-600"></div><span className="text-slate-400">Transaction</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-cyan-600"></div><span className="text-slate-400">Regulatory</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-purple-600"></div><span className="text-slate-400">Financial</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-600"></div><span className="text-slate-400">Termination/Litigation</span></div>
      </div>
    </div>
  );

  const renderPreReorg = () => (
    <div className="flex flex-col items-center">
      {/* Definition */}
      <div className="mb-4 bg-blue-900/30 border border-blue-500 rounded-lg px-4 py-2 text-blue-200 text-sm">
        McGraw Holdings New Jersey, Inc. is referred to herein as the <strong>"Company"</strong>
      </div>

      {/* Top row - People */}
      <div className="flex justify-center items-start gap-12 mb-6">
        <PersonBox name="Andrew Peloso" />
        <PersonBox name="Stephanie Peloso" />
        <PersonBox name="Curtis McGraw Webster" />
      </div>

      {/* Entity hierarchy with dotted lines */}
      <div className="flex flex-col items-center">
        {/* Curtis McGraw Group */}
        <EntityBox 
          name="Curtis McGraw Group, Inc."
          owners={[
            { name: 'Andrew Peloso', percent: 80 },
            { name: 'Curtis McGraw Webster', percent: 20 }
          ]}
        />
        
        {/* Dotted line to McGraw Holdings */}
        <DottedLineVertical note="No ownership interest ever formalized" />
        
        {/* McGraw Holdings Inc */}
        <EntityBox 
          name="McGraw Holdings, Inc."
          subtitle="(Delaware)"
          owners={[
            { name: 'Andrew Peloso', percent: 100 }
          ]}
        />
        
        {/* Dotted line to McGraw Holdings NJ */}
        <DottedLineVertical note="No ownership interest ever formalized" />
        
        {/* McGraw Holdings NJ with Potential Buyers on sides */}
        <div className="flex items-center gap-4">
          {/* Left Potential Buyer */}
          <div className="flex items-center gap-2">
            <PotentialBuyerBox name="Sammy Dorf / Verano" />
            <DottedLineHorizontal />
          </div>

          {/* McGraw Holdings NJ */}
          <EntityBox 
            name="McGraw Holdings New Jersey, Inc."
            definedTerm='(the "Company")'
            owners={[
              { name: 'Stephanie Peloso', percent: 51 },
              { name: 'Andrew Peloso', percent: 29 },
              { name: 'Curtis McGraw Webster', percent: 20 }
            ]}
          />

          {/* Right Potential Buyer */}
          <div className="flex items-center gap-2">
            <DottedLineHorizontal />
            <PotentialBuyerBox name="Mark & Timory Ridall" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhase1 = () => (
    <div className="flex flex-col items-center">
      {/* Top row - People */}
      <div className="flex justify-center items-start gap-8 mb-6">
        <PersonBox name="Andrew Peloso" />
        <PersonBox name="Stephanie Peloso" />
        <PersonBox name="Curtis McGraw Webster" />
        <PersonBox name="Jennifer Ortega" highlight={true} />
      </div>

      {/* Entity hierarchy with dotted lines */}
      <div className="flex flex-col items-center">
        {/* Curtis McGraw Group */}
        <EntityBox 
          name="Curtis McGraw Group, Inc."
          owners={[
            { name: 'Andrew Peloso', percent: 80 },
            { name: 'Curtis McGraw Webster', percent: 20 }
          ]}
        />
        
        {/* Dotted line to McGraw Holdings */}
        <DottedLineVertical note="No ownership interest ever formalized" />
        
        {/* McGraw Holdings Inc */}
        <EntityBox 
          name="McGraw Holdings, Inc."
          subtitle="(Delaware)"
          owners={[
            { name: 'Andrew Peloso', percent: 100 }
          ]}
        />
        
        {/* Dotted line to McGraw Holdings NJ */}
        <DottedLineVertical note="No ownership interest ever formalized" />
        
        {/* McGraw Holdings NJ */}
        <EntityBox 
          name="McGraw Holdings New Jersey, Inc."
          definedTerm='(the "Company")'
          owners={[
            { name: 'Stephanie Peloso', percent: 51 },
            { name: 'Jennifer Ortega', percent: 29, highlight: true, note: 'from Andrew' },
            { name: 'Curtis McGraw Webster', percent: 20 }
          ]}
        />
      </div>

      {/* Transaction note */}
      <div className="mt-6 bg-amber-900/50 border border-amber-600 rounded-lg px-4 py-2 text-amber-200 text-sm max-w-xl text-center">
        <strong>Transaction:</strong> Andrew Peloso sold his 29% interest in the Company to Jennifer Ortega.
      </div>
    </div>
  );

  const renderPhase2 = () => (
    <div className="flex flex-col items-center">
      {/* Option scenario toggle */}
      <div className="mb-6 bg-slate-800 rounded-lg p-3 flex gap-2">
        <button
          onClick={() => setOptionScenario('exercised')}
          className={`px-4 py-2 rounded text-sm font-medium transition-all ${
            optionScenario === 'exercised'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          If Option Exercised
        </button>
        <button
          onClick={() => setOptionScenario('not-exercised')}
          className={`px-4 py-2 rounded text-sm font-medium transition-all ${
            optionScenario === 'not-exercised'
              ? 'bg-red-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          If Option Not Exercised
        </button>
      </div>

      {optionScenario === 'exercised' ? (
        <>
          {/* Top row - People (Option Exercised) */}
          <div className="flex justify-center items-start gap-10 mb-6">
            <PersonBox name="Andrew Peloso" />
            <PersonBox name="Curtis McGraw Webster" />
            <PersonBox name="Jennifer Ortega" />
          </div>

          {/* Entity hierarchy with dotted lines */}
          <div className="flex flex-col items-center">
            <EntityBox 
              name="Curtis McGraw Group, Inc."
              owners={[
                { name: 'Andrew Peloso', percent: 80 },
                { name: 'Curtis McGraw Webster', percent: 20 }
              ]}
            />
            
            <DottedLineVertical note="No ownership interest ever formalized" />
            
            <EntityBox 
              name="McGraw Holdings, Inc."
              subtitle="(Delaware)"
              owners={[
                { name: 'Andrew Peloso', percent: 100 }
              ]}
            />
            
            <DottedLineVertical note="No ownership interest ever formalized" />
            
            <EntityBox 
              name="McGraw Holdings New Jersey, Inc."
              definedTerm='(the "Company")'
              owners={[
                { name: 'Jennifer Ortega', percent: 29 },
                { name: 'Curtis McGraw Webster', percent: 20 }
              ]}
              treasury={true}
            />
          </div>

          {/* Transaction note - Option Exercised */}
          <div className="mt-6 bg-emerald-900/50 border border-emerald-600 rounded-lg px-4 py-3 text-emerald-200 text-sm max-w-2xl text-center">
            <strong>If Option Exercised:</strong> Stephanie Peloso to sell her 51% interest in the Company for a nominal $1, plus a promissory note for $750,000 payable to Stephanie by the Company. Shares to be held in treasury (may be cancelled or retained).
          </div>
        </>
      ) : (
        <>
          {/* Top row - People (Option Not Exercised) */}
          <div className="flex justify-center items-start gap-8 mb-6">
            <PersonBox name="Andrew Peloso" />
            <PersonBox name="Stephanie Peloso" />
            <PersonBox name="Curtis McGraw Webster" />
            <PersonBox name="Jennifer Ortega" />
          </div>

          {/* Entity hierarchy with dotted lines */}
          <div className="flex flex-col items-center">
            <EntityBox 
              name="Curtis McGraw Group, Inc."
              owners={[
                { name: 'Andrew Peloso', percent: 80 },
                { name: 'Curtis McGraw Webster', percent: 20 }
              ]}
            />
            
            <DottedLineVertical note="No ownership interest ever formalized" />
            
            <EntityBox 
              name="McGraw Holdings, Inc."
              subtitle="(Delaware)"
              owners={[
                { name: 'Andrew Peloso', percent: 100 }
              ]}
            />
            
            <DottedLineVertical note="No ownership interest ever formalized" />
            
            <EntityBox 
              name="McGraw Holdings New Jersey, Inc."
              definedTerm='(the "Company")'
              owners={[
                { name: 'Stephanie Peloso', percent: 51 },
                { name: 'Jennifer Ortega', percent: 29 },
                { name: 'Curtis McGraw Webster', percent: 20 }
              ]}
            />
          </div>

          {/* Transaction note - Option Not Exercised */}
          <div className="mt-6 bg-red-900/50 border border-red-600 rounded-lg px-4 py-3 text-red-200 text-sm max-w-2xl text-center">
            <strong>If Option Not Exercised (Terminated):</strong> Pursuant to the terms of the Option Agreement, Stephanie Peloso retains her 51% ownership interest in the Company.
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Stephanie Peloso v. Curtis McGraw, et al.
        </h1>
        <h2 className="text-lg text-slate-300 mb-1">
          In Arbitration Before the American Arbitration Association
        </h2>
        <h3 className="text-md text-slate-400 font-mono">
          Case No. 01-25-0001-8558
        </h3>
      </div>

      {/* Phase selector */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {Object.entries(phases).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActivePhase(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activePhase === key
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Phase title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white border-b-2 border-blue-500 inline-block pb-1">
          {phases[activePhase]}
        </h2>
      </div>

      {/* Chart content */}
      <div className="flex justify-center">
        {activePhase === 'pre' && renderPreReorg()}
        {activePhase === 'phase1' && renderPhase1()}
        {activePhase === 'phase2' && renderPhase2()}
        {activePhase === 'timeline' && renderTimeline()}
      </div>

      {/* Legend - only show for org charts, not timeline */}
      {activePhase !== 'timeline' && (
        <div className="mt-8 flex justify-center">
          <div className="bg-slate-800 rounded-lg p-4 inline-flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 border-t-2 border-dashed border-red-400"></div>
              <span className="text-slate-300">No formalized ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 border-t-2 border-dashed border-purple-400"></div>
              <span className="text-slate-300">Potential buyers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-600 rounded"></div>
              <span className="text-slate-300">New/Changed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-emerald-700 rounded"></div>
              <span className="text-slate-300">Treasury shares</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-8 text-slate-500 text-xs">
        DEMONSTRATIVE EXHIBIT — FOR ILLUSTRATIVE PURPOSES ONLY
      </div>
    </div>
  );
}
