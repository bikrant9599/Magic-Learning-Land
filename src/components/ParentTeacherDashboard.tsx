import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  X,
  Printer,
  Sparkles,
  Heart,
  Star,
  Brain,
  Calculator,
  Compass,
  Smile,
} from 'lucide-react';
import { ParentProgressData, GradeLevel } from '../types';
import { ALL_GAMES, GRADE_INFO } from '../data/allGamesData';
import { motion } from 'motion/react';

interface ParentTeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  stats: ParentProgressData;
  onResetProgress: () => void;
}

export const ParentTeacherDashboard: React.FC<ParentTeacherDashboardProps> = ({
  isOpen,
  onClose,
  stats,
  onResetProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'grades' | 'safety'>('overview');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const totalMinutes = Math.max(1, Math.round(stats.timeSpentSeconds / 60));
  const overallAccuracy =
    stats.totalAttempts > 0 ? Math.round((stats.correctAttempts / stats.totalAttempts) * 100) : 100;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-2 xs:p-4 md:p-6 antialiased">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl xs:rounded-3xl max-w-4xl 2xl:max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border-3 xs:border-4 border-indigo-400 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-4 xs:p-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 xs:gap-3 min-w-0">
            <div className="p-2 xs:p-3 bg-white/20 rounded-xl xs:rounded-2xl backdrop-blur-sm shrink-0">
              <ShieldCheck className="w-6 h-6 xs:w-8 xs:h-8 text-yellow-300" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg xs:text-2xl 2xl:text-3xl font-black truncate">Parent & Teacher Learning Portal</h2>
              <p className="text-indigo-100 text-[11px] xs:text-xs md:text-sm line-clamp-1">
                Real-time progress, accuracy analytics, curriculum mastery & child safety
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] xs:min-h-[44px] xs:min-w-[44px] p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer shrink-0 flex items-center justify-center"
          >
            <X className="w-5 h-5 xs:w-6 xs:h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-3 xs:px-6 gap-1 xs:gap-2 text-[11px] xs:text-xs md:text-sm font-bold text-stone-600 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'subjects', label: '🧠 Subjects' },
            { id: 'grades', label: '🐣 Grades (Nursery–5)' },
            { id: 'safety', label: '🛡️ Safety Pledge' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-2.5 xs:py-3 px-3 xs:px-4 border-b-2 font-black transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 xs:p-6 space-y-4 xs:space-y-6 text-stone-800">
          {activeTab === 'overview' && (
            <>
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 xs:gap-4">
                <div className="bg-amber-50 border-2 border-amber-200 p-3 xs:p-4 rounded-xl xs:rounded-2xl">
                  <div className="flex items-center justify-between text-amber-700 text-[10px] xs:text-xs font-black uppercase">
                    <span>Stars Earned</span>
                    <Star className="w-3.5 h-3.5 xs:w-4 xs:h-4 fill-current text-amber-500" />
                  </div>
                  <div className="text-2xl xs:text-3xl font-black text-amber-900 mt-1 xs:mt-2">{stats.starsEarned}</div>
                  <span className="text-[10px] xs:text-xs text-amber-700">Total learning stars</span>
                </div>

                <div className="bg-emerald-50 border-2 border-emerald-200 p-3 xs:p-4 rounded-xl xs:rounded-2xl">
                  <div className="flex items-center justify-between text-emerald-700 text-[10px] xs:text-xs font-black uppercase">
                    <span>Accuracy Rate</span>
                    <TrendingUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl xs:text-3xl font-black text-emerald-900 mt-1 xs:mt-2">{overallAccuracy}%</div>
                  <span className="text-[10px] xs:text-xs text-emerald-700">{stats.correctAttempts} / {stats.totalAttempts} questions</span>
                </div>

                <div className="bg-sky-50 border-2 border-sky-200 p-3 xs:p-4 rounded-xl xs:rounded-2xl">
                  <div className="flex items-center justify-between text-sky-700 text-[10px] xs:text-xs font-black uppercase">
                    <span>Time Engaged</span>
                    <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-sky-600" />
                  </div>
                  <div className="text-2xl xs:text-3xl font-black text-sky-900 mt-1 xs:mt-2">{totalMinutes}m</div>
                  <span className="text-[10px] xs:text-xs text-sky-700">Active educational time</span>
                </div>

                <div className="bg-purple-50 border-2 border-purple-200 p-3 xs:p-4 rounded-xl xs:rounded-2xl">
                  <div className="flex items-center justify-between text-purple-700 text-[10px] xs:text-xs font-black uppercase">
                    <span>Completed</span>
                    <Award className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl xs:text-3xl font-black text-purple-900 mt-1 xs:mt-2">{stats.completedGameIds.length} / 80</div>
                  <span className="text-[10px] xs:text-xs text-purple-700">Curriculum games</span>
                </div>
              </div>

              {/* Recommendations & Strengths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 xs:gap-4">
                <div className="bg-emerald-50/70 border-2 border-emerald-300 p-4 xs:p-5 rounded-xl xs:rounded-2xl">
                  <h4 className="font-extrabold text-emerald-900 flex items-center gap-2 mb-2 text-sm xs:text-base">
                    <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-600" />
                    <span>Demonstrated Strengths</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs md:text-sm text-emerald-950 font-medium">
                    <li>• Strong auditory association in verified animal sounds and everyday noises</li>
                    <li>• Solid visual recognition in primary and secondary color identification</li>
                    <li>• Keen spatial discrimination in basic geometric 2D shapes</li>
                  </ul>
                </div>

                <div className="bg-indigo-50/70 border-2 border-indigo-300 p-4 xs:p-5 rounded-xl xs:rounded-2xl">
                  <h4 className="font-extrabold text-indigo-900 flex items-center gap-2 mb-2 text-sm xs:text-base">
                    <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-indigo-600" />
                    <span>Recommended Next Focus</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs md:text-sm text-indigo-950 font-medium">
                    <li>• Practice CVC 3-letter word blending in UKG Reading Forest</li>
                    <li>• Explore skip-counting by 2s and 5s in UKG / Class 1 Math</li>
                    <li>• Learn analog clock reading and currency calculations in Class 1</li>
                  </ul>
                </div>
              </div>

              {/* Certificate Download Bar */}
              <div className="bg-amber-100/80 border-2 border-amber-300 p-3.5 xs:p-4 rounded-xl xs:rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <Award className="w-7 h-7 xs:w-8 xs:h-8 text-amber-700 shrink-0 hidden sm:block" />
                  <div>
                    <h4 className="font-black text-amber-900 text-xs xs:text-sm">Official Learning Progress Certificate</h4>
                    <p className="text-[11px] xs:text-xs text-amber-800">Print or save a colorful certificate of achievement for the student.</p>
                  </div>
                </div>
                <button
                  onClick={handlePrintCertificate}
                  className="min-h-[44px] w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-transform hover:scale-105 cursor-pointer shrink-0"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Report</span>
                </button>
              </div>
            </>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-4">
              <h3 className="font-black text-lg text-stone-900">Subject-by-Subject Curriculum Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    subject: 'English & Phonics',
                    icon: '🔤',
                    color: 'bg-rose-50 border-rose-300',
                    desc: 'Alphabet letters, CVC blending, sight words, spelling & sentence building',
                    games: 16,
                  },
                  {
                    subject: 'Mathematics & Numeracy',
                    icon: '🔢',
                    color: 'bg-sky-50 border-sky-300',
                    desc: 'Numbers 1-100, addition, subtraction, place value, clock & ₹ money',
                    games: 24,
                  },
                  {
                    subject: 'Logic & Spatial Reasoning',
                    icon: '🧠',
                    color: 'bg-purple-50 border-purple-300',
                    desc: 'Patterns, odd one out, differences, Sudoku & memory puzzles',
                    games: 16,
                  },
                  {
                    subject: 'Science & World Knowledge',
                    icon: '🌱',
                    color: 'bg-emerald-50 border-emerald-300',
                    desc: 'Animals, habitats, plants, body senses, weather, living vs non-living & GK',
                    games: 16,
                  },
                ].map((subj) => (
                  <div key={subj.subject} className={`p-4 rounded-2xl border-2 ${subj.color} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl">{subj.icon}</span>
                        <h4 className="font-extrabold text-base text-stone-900">{subj.subject}</h4>
                      </div>
                      <p className="text-xs text-stone-600 mb-3">{subj.desc}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-700 bg-white/70 p-2 rounded-xl">
                      <span>Total Games: {subj.games}</span>
                      <span className="text-emerald-700 font-extrabold">Active in Curriculum</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="space-y-4">
              <h3 className="font-black text-lg text-stone-900">8 Progressive Developmental Worlds (160 Games Total)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[55vh] overflow-y-auto pr-1">
                {(['nursery', 'lkg', 'ukg', 'class1', 'class2', 'class3', 'class4', 'class5'] as GradeLevel[]).map((grd) => {
                  const info = GRADE_INFO[grd];
                  const gradeGames = ALL_GAMES.filter((g) => g.grade === grd);
                  const completedInGrade = gradeGames.filter((g) => stats.completedGameIds.includes(g.id)).length;
                  const totalInGrade = gradeGames.length || 20;

                  return (
                    <div key={grd} className="p-4 rounded-2xl border-2 border-stone-200 bg-stone-50 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-3xl">{info.icon}</span>
                          <div>
                            <h4 className="font-black text-base text-stone-900">{info.name} • {info.worldEmoji} {info.worldName}</h4>
                            <span className="text-xs font-bold text-stone-500">{info.ageRange}</span>
                          </div>
                        </div>
                        <p className="text-xs text-stone-600 mb-3">{info.tagline}</p>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span>Progress: {completedInGrade} / {totalInGrade} Games</span>
                          <span>{Math.round((completedInGrade / totalInGrade) * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all"
                            style={{ width: `${(completedInGrade / totalInGrade) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4 text-xs md:text-sm text-stone-700">
              <div className="bg-emerald-50 border-2 border-emerald-300 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                  <div>
                    <h3 className="font-black text-lg text-emerald-950">100% Kid-Safe & Private Learning Environment</h3>
                    <p className="text-emerald-800 text-xs">Built strictly following COPPA & international child safety standards.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-900">
                  <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">Zero Advertisements</span>
                      <p className="text-xs text-stone-600">No pop-up ads, third-party banners, or commercial sponsors ever.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">No External Social Links</span>
                      <p className="text-xs text-stone-600">Children cannot navigate outside or access chatrooms/social feeds.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">Private On-Device Data</span>
                      <p className="text-xs text-stone-600">Stars, coins and scores remain completely private on your device.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-3 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm">100% Educational Focus</span>
                      <p className="text-xs text-stone-600">Every single mini-game teaches an accredited foundation curriculum skill.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset progress option with explicit modal protection */}
              <div className="bg-stone-100 p-4 rounded-2xl border border-stone-300 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Reset Student Progress</h4>
                  <p className="text-xs text-stone-600">Clears stars, coins, and completion records for a fresh start.</p>
                </div>
                <button
                  id="btn_open_reset_confirm"
                  onClick={() => setShowResetConfirm(true)}
                  className="bg-stone-200 hover:bg-rose-100 hover:text-rose-700 text-stone-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Reset Records
                </button>
              </div>

              {/* Explicit Reset Confirmation Dialog */}
              {showResetConfirm && (
                <div className="fixed inset-0 z-60 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-rose-400 text-center space-y-4">
                    <span className="text-4xl">⚠️</span>
                    <h4 className="text-lg font-black text-stone-900">
                      Are you sure you want to reset this player's progress?
                    </h4>
                    <p className="text-xs text-stone-600 font-medium">
                      This will reset stars, coins, and completed games back to the beginning. This action cannot be undone.
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        id="btn_cancel_reset"
                        onClick={() => setShowResetConfirm(false)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        id="btn_confirm_reset_progress"
                        onClick={() => {
                          onResetProgress();
                          setShowResetConfirm(false);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs cursor-pointer shadow-md"
                      >
                        Reset Progress
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
