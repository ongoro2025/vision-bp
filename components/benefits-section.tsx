import { Lightbulb, Users, TrendingUp, Target, Trophy, Sprout } from 'lucide-react';

const benefitIcons = [
  Lightbulb,
  Users,
  TrendingUp,
  Target,
  Trophy,
  Sprout,
];

export function BenefitsSection() {
  const benefits = [
    {
      title: 'Expert Curation',
      description: 'Handpicked content from industry leaders and bestselling authors',
    },
    {
      title: 'Community Support',
      description: 'Connect with thousands of members on similar journeys',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your growth with personalized insights and analytics',
    },
    {
      title: 'Goal Alignment',
      description: 'Resources tailored to your specific goals and aspirations',
    },
    {
      title: 'Success Stories',
      description: 'Learn from real members who achieved their breakthroughs',
    },
    {
      title: 'Continuous Growth',
      description: 'Weekly updates with fresh content and new programs',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Vision Blueprints?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the benefits that have transformed thousands of lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefitIcons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg hover:border-[#d4af37] transition-all group"
              >
                <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-lg bg-[#ffd700] bg-opacity-10 group-hover:bg-opacity-20 transition-all">
                  <IconComponent size={32} className="text-[#d4af37]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 bg-[#1a1a1a] rounded-lg p-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#ffd700] mb-2">
              5,000+
            </div>
            <p className="text-gray-300">Active Members</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#ffd700] mb-2">
              500+
            </div>
            <p className="text-gray-300">Premium Resources</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#ffd700] mb-2">
              95%
            </div>
            <p className="text-gray-300">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#ffd700] mb-2">
              12+
            </div>
            <p className="text-gray-300">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
}
