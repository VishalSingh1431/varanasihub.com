import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

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
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
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
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50'
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
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Pricing - VaranasiHub Plans & Pricing"
        description="Choose the perfect plan for your business. All plans include a 14-day free trial. Simple, transparent pricing for Varanasi businesses."
        image="/og-image.jpg"
        url={`${window.location.origin}/pricing`}
      />
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section - Gradient */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -80, 0],
                y: [0, 80, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight"
            >
              Simple, Transparent <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Pricing</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
        >
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </motion.p>
        </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Pricing Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className={`relative bg-white rounded-3xl shadow-xl border-2 overflow-hidden transition-all duration-500 ${
                    plan.popular 
                      ? 'border-purple-500 scale-105 md:scale-110 shadow-2xl' 
                      : 'border-gray-100 hover:border-purple-300 hover:shadow-2xl'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 text-sm font-bold rounded-bl-2xl shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-br ${plan.bgGradient} p-8 text-center relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${plan.gradient} opacity-10 rounded-full blur-3xl`}></div>
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${plan.gradient} rounded-2xl mb-4 shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                    </div>
                      <h3 className="text-3xl font-black text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6 font-medium">{plan.description}</p>
                    <div className="mb-6">
                        <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: featureIndex * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-6 h-6 bg-gradient-to-br ${plan.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Link to="/create-website">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      Get Started
                    </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: 'Can I change plans later?',
                  answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
                },
                {
                  question: 'Is there a setup fee?',
                  answer: 'No, there are no setup fees. You only pay the monthly subscription fee for your chosen plan.'
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, debit cards, UPI, and bank transfers.'
                },
                {
                  question: 'Do you offer refunds?',
                  answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our service.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {faq.question}
                </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
