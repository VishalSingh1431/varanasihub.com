import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Award, Heart, MapPin, Globe, Sparkles, Map, Building2, Music, Utensils, Camera, CheckCircle, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To help local businesses in Varanasi establish a strong online presence and reach more customers through professional websites.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Our Vision',
      description: 'To become the leading platform for businesses in Varanasi to showcase their services and connect with their community.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'We believe in supporting local businesses, providing exceptional service, and building long-term relationships with our clients.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { number: '500+', label: 'Businesses Served', gradient: 'from-blue-500 to-cyan-500' },
    { number: '98%', label: 'Client Satisfaction', gradient: 'from-purple-500 to-pink-500' },
    { number: '24/7', label: 'Support Available', gradient: 'from-green-500 to-emerald-500' },
    { number: '5+', label: 'Years of Experience', gradient: 'from-orange-500 to-red-500' }
  ];

  const team = [
    {
      name: 'Local Expertise',
      role: 'Deep understanding of Varanasi market',
      description: 'We know the local business landscape and what works best for Varanasi businesses.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional Team',
      role: 'Skilled designers and developers',
      description: 'Our team combines creativity with technical expertise to deliver outstanding results.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Customer First',
      role: 'Your success is our priority',
      description: 'We go above and beyond to ensure your website helps grow your business.',
      gradient: 'from-green-500 to-emerald-500'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <SEOHead
        title="About VaranasiHub - Empowering Varanasi Businesses"
        description="Learn about VaranasiHub's mission to help local businesses in Varanasi establish their digital presence. We make it easy to create professional websites."
        image="/og-image.jpg"
        url={`${window.location.origin}/about`}
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
              About <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">VaranasiHub</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light"
        >
              Empowering local businesses in Varanasi with professional websites and digital presence.
            </motion.p>
        </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Our Story</h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6 text-lg leading-relaxed">
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
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 shadow-lg`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center hover:shadow-2xl transition-all duration-500 overflow-hidden relative group"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-10 rounded-full blur-3xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{item.role}</p>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            </div>
            <div className="relative z-10">
                  <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 1 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6"
              >
                <Globe className="w-10 h-10 text-white" />
                  </motion.div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Join the VaranasiHub Community
            </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
              Be part of the growing network of successful businesses in Varanasi.
            </p>
            <Link to="/create-website">
              <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Started Today
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

export default About;
