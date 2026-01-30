import { Button } from '@/components/ui/button';
import {
  BookOpen,
  FlaskConical,
  PenTool,
  School,
  ScrollText,
  Armchair
} from 'lucide-react';

const productIcons = [
  BookOpen,      // Self-help
  ScrollText,    // Exams
  FlaskConical,  // Laboratory
  School,        // Textbooks
  PenTool,       // Stationery
  Armchair,      // Furniture
];

export function ProductsShowcase() {
  const products = [
    {
      category: 'Self-Help',
      title: 'Personal Development Books',
      description: 'Rattle your mind and spark the leader in you with great personal development books from our shelves.',
      price: 'From Ksh 500.00',
      members: 'Popular Choice',
    },
    {
      category: 'Revision',
      title: 'Exams & Revision Materials',
      description: 'Comprehensive KICD-approved revision materials and past exams for all levels.',
      price: 'From Ksh 20.00',
      members: 'Student Favorite',
    },
    {
      category: 'Laboratory',
      title: 'Science & Lab Equipment',
      description: 'High-quality laboratory apparatus and chemicals conveniently under one roof.',
      price: 'From Ksh 50.00',
      members: 'Schools Edition',
    },
    {
      category: 'Academic',
      title: "Textbooks & Teachers' Guides",
      description: 'The complete set of learning resources for every school, from classroom to library.',
      price: 'Ksh 400.00',
      members: 'Bestseller',
    },
    {
      category: 'Supplies',
      title: 'Stationery & Office Supplies',
      description: 'Essential stationery for staffrooms, offices, and classrooms to keep learning smooth.',
      price: 'From Ksh 50.00',
      members: 'In Stock',
    },
    {
      category: 'Furniture',
      title: 'School & Office Furniture',
      description: 'Durable and ergonomic furniture for dormitories, staffrooms, and classrooms.',
      price: 'Request Quote',
      members: 'Bulk Available',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Quality Learning Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your one-stop shop for learning and teaching essentials. From classroom to playgrounds, conveniently under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const IconComponent = productIcons[index];
            return (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg hover:border-[#d4af37] transition-all group"
              >
                {/* Header with Icon */}
                <div className="h-24 bg-gradient-to-r from-[#1a1a1a] to-gray-800 flex items-center justify-center">
                  <IconComponent size={48} className="text-[#ffd700]" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-[#d4af37] bg-[#ffd700] bg-opacity-10 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs font-bold text-gray-900">{product.price}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <p className="text-xs text-gray-400 mb-3 italic">{product.members}</p>
                    <Button className="w-full bg-[#1a1a1a] hover:bg-gray-900 text-white">
                      Inquire Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/catalog.pdf"
            download="Vision_Blueprints_Catalog.pdf"
          >
            <Button
              size="lg"
              className="bg-[#d4af37] hover:bg-[#c19a1a] text-[#1a1a1a] font-semibold px-8"
            >
              Download Product Catalogue
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}