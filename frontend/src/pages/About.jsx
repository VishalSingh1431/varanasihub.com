import { motion } from 'framer-motion';
import { Target, Users, Award, Heart, MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To help local businesses in Varanasi establish a strong online presence and reach more customers through professional websites.'
    },
    {
      icon: Users,
      title: 'Our Vision',
      description: 'To become the leading platform for businesses in Varanasi to showcase their services and connect with their community.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'We believe in supporting local businesses, providing exceptional service, and building long-term relationships with our clients.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Businesses Served' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
    { number: '5+', label: 'Years of Experience' }
  ];

  const team = [
    {
      name: 'Local Expertise',
      role: 'Deep understanding of Varanasi market',
      description: 'We know the local business landscape and what works best for Varanasi businesses.'
    },
    {
      name: 'Professional Team',
      role: 'Skilled designers and developers',
      description: 'Our team combines creativity with technical expertise to deliver outstanding results.'
    },
    {
      name: 'Customer First',
      role: 'Your success is our priority',
      description: 'We go above and beyond to ensure your website helps grow your business.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
              About VaranasiHub
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Empowering local businesses in Varanasi with professional websites and digital presence.
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                VaranasiHub was born from a simple idea: every local business in Varanasi deserves 
                a professional online presence. In today's digital age, having a website is not just 
                a luxury—it's a necessity.
              </p>
              <p>
                We started with a mission to help small and medium businesses in Varanasi establish 
                their digital footprint without the complexity and high costs typically associated 
                with web development. Our team understands the unique needs of local businesses and 
                creates websites that truly represent their brand and connect with their customers.
              </p>
              <p>
                Today, we're proud to have helped hundreds of businesses in Varanasi grow their 
                online presence, reach more customers, and thrive in the digital marketplace.
              </p>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl shadow-xl p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-6 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{item.role}</p>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
          >
            <Globe className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the VaranasiHub Community
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of the growing network of successful businesses in Varanasi.
            </p>
            <Link to="/create-website">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

