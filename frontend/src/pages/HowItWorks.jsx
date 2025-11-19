import { motion } from 'framer-motion';
import { FileText, Upload, Sparkles, Rocket, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Sign Up & Choose Plan',
      description: 'Create your account and select the plan that best fits your business needs.',
      icon: FileText,
      color: 'blue'
    },
    {
      number: 2,
      title: 'Provide Business Details',
      description: 'Fill in your business information, upload photos, and add contact details.',
      icon: Upload,
      color: 'purple'
    },
    {
      number: 3,
      title: 'We Create Your Website',
      description: 'Our team designs and builds your professional website with all your information.',
      icon: Sparkles,
      color: 'green'
    },
    {
      number: 4,
      title: 'Launch & Grow',
      description: 'Your website goes live! Start attracting customers and grow your online presence.',
      icon: Rocket,
      color: 'orange'
    }
  ];

  const benefits = [
    'No technical knowledge required',
    'Professional design guaranteed',
    'Mobile-friendly websites',
    'SEO optimized',
    'Fast loading times',
    '24/7 customer support',
    'Easy content updates',
    'Secure hosting included'
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-600'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-600'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-600'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-600'
      }
    };
    return colors[color];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
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
              How It Works
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Get your business online in just 4 simple steps. No coding required!
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = getColorClasses(step.color);
              const isLast = index === steps.length - 1;

              return (
                <div key={index} className="relative">
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-center gap-8 mb-12"
                  >
                    {/* Step Card */}
                    <div className="flex-1 w-full">
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white rounded-2xl shadow-xl p-8 relative"
                      >
                        <div className="flex items-start gap-6">
                          <div className={`${colors.bg} rounded-full p-4 flex-shrink-0`}>
                            <Icon className={`w-8 h-8 ${colors.text}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`text-2xl font-bold ${colors.text}`}>
                                Step {step.number}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 text-lg">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Arrow */}
                    {!isLast && (
                      <div className="hidden md:block flex-shrink-0">
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-gray-400"
                        >
                          <ArrowRight className="w-8 h-8" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>

                  {/* Mobile Arrow */}
                  {!isLast && (
                    <div className="md:hidden flex justify-center mb-8">
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-gray-400"
                      >
                        <ArrowRight className="w-8 h-8 rotate-90" />
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Why Choose VaranasiHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses in Varanasi who trust us with their online presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/create-website">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Create Your Website
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowItWorks;

