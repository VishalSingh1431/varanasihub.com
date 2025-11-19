import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '₹499',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      icon: Zap,
      features: [
        'Basic website listing',
        'Contact information display',
        'Social media links',
        'Mobile responsive design',
        'Basic SEO optimization',
        'Email support'
      ],
      popular: false,
      color: 'blue'
    },
    {
      name: 'Professional',
      price: '₹1,499',
      period: '/month',
      description: 'Ideal for growing businesses',
      icon: Star,
      features: [
        'Everything in Basic',
        'Custom domain support',
        'Advanced SEO features',
        'Analytics dashboard',
        'Priority support',
        'Social media integration',
        'Photo gallery (up to 20 images)',
        'Online booking system'
      ],
      popular: true,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: '₹2,999',
      period: '/month',
      description: 'For established businesses with advanced needs',
      icon: Crown,
      features: [
        'Everything in Professional',
        'Unlimited images & media',
        'Custom design & branding',
        'E-commerce integration',
        'Multi-language support',
        '24/7 priority support',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics'
      ],
      popular: false,
      color: 'gold'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const getColorClasses = (color, popular) => {
    const colors = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        light: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-600'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        light: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-600'
      },
      gold: {
        bg: 'bg-yellow-600',
        hover: 'hover:bg-yellow-700',
        light: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-600'
      }
    };
    return colors[color];
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const colors = getColorClasses(plan.color, plan.popular);
              
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                    plan.popular ? 'ring-4 ring-purple-500 scale-105 md:scale-110' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`${colors.light} p-8 text-center`}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full ${colors.bg} ${colors.hover} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 shadow-lg`}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Is there a setup fee?
                </h3>
                <p className="text-gray-600">
                  No, there are no setup fees. You only pay the monthly subscription fee for your chosen plan.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, debit cards, UPI, and bank transfers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;

