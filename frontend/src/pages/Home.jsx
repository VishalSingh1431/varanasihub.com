import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Smartphone, 
  Cloud, 
  Video, 
  MessageCircle, 
  LayoutDashboard,
  Globe,
  Users,
  Shield,
  ArrowRight,
  ExternalLink,
  Phone,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  Map,
  Building2,
  Music,
  Utensils,
  Camera,
  Zap,
  Star,
  TrendingUp,
  Rocket,
  Sparkle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { varanasiHighlights as highlightData } from '../data/varanasiHighlights';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  
  // Image slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508675801634-7d612b996d09?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=1920&h=1080&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1920&h=1080&fit=crop&q=80'
  ];

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const businesses = [
    {
      name: 'Gupta Medical',
      category: 'Pharmacy',
      address: 'Lanka Road',
      subdomain: 'guptamedical.varansihub.com',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop'
    },
    {
      name: 'Hotel Rudra',
      category: 'Budget Hotel',
      address: 'Dashashwamedh Road',
      subdomain: 'hotelrudra.varansihub.com',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
    },
    {
      name: 'Kashi Sweets',
      category: 'Sweet Shop',
      address: 'Chowk',
      subdomain: 'kashisweets.varansihub.com',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop'
    },
    {
      name: 'Sharma Clinic',
      category: 'General Clinic',
      address: 'Sigra',
      subdomain: 'sharmaclinic.varansihub.com',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
    },
    {
      name: 'Saraswati Library',
      category: 'Library',
      address: 'Near Assi Ghat',
      subdomain: 'saraswatlibrary.varansihub.com',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e58f587?w=400&h=300&fit=crop'
    },
    {
      name: 'Bharat General Store',
      category: 'Grocery',
      address: 'Bhelupur',
      subdomain: 'bharatstore.varansihub.com',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop'
    }
  ];

  const features = [
    {
      icon: Globe,
      title: 'Instant Subdomain',
      description: 'Get your business URL instantly with zero configuration',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Ready',
      description: 'Perfectly responsive design that looks stunning on all devices',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Unlimited photo uploads with fast CDN delivery',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Video,
      title: 'Video Embedding',
      description: 'Showcase your videos with seamless YouTube integration',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp & Call',
      description: 'One-tap contact options for instant customer connection',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: LayoutDashboard,
      title: 'Easy Dashboard',
      description: 'Simple, intuitive interface for managing your website',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const whyPoints = [
    { text: 'Reach real customers in Varanasi', icon: Users, color: 'blue' },
    { text: 'Zero technical skills needed', icon: Zap, color: 'yellow' },
    { text: 'Your business gets a clean, fast website', icon: Rocket, color: 'purple' },
    { text: 'One-tap WhatsApp & Call buttons', icon: MessageCircle, color: 'green' },
    { text: 'Perfect for shops, clinics, homestays, services', icon: Star, color: 'pink' }
  ];

  const featuredHighlights = highlightData.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
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
        title="VaranasiHub - Create Your Business Website in Minutes"
        description="Help your Varanasi business go online. Create a professional website in minutes with zero coding skills. Get instant subdomain, mobile-ready design, and more."
        image="/og-image.jpg"
        url={window.location.origin}
      />
      <Navbar />
      
      {/* 1. Hero Section - Image Slider */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Image Slider Background */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
          <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentSlide]}
                alt={`Varanasi ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=1920&h=1080&fit=crop&q=80';
                }}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous/Next Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <motion.svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: -3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </motion.svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <motion.svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: 3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </button>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
          <motion.div
            style={{ opacity, scale, y }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-3 md:mb-4 leading-[1.1] tracking-tight"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Create Your Business
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Website in Minutes
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg lg:text-xl text-white/90 max-w-4xl mx-auto mb-6 leading-relaxed font-light"
            >
              Give your Varanasi shop, clinic, hotel, or service a stunning online presence. 
              <span className="text-yellow-300 font-semibold"> Zero coding. </span>
              <span className="text-green-300 font-semibold"> Instant results.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/create-website">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -4,
                    boxShadow: "0 20px 60px rgba(99, 102, 241, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-bold text-base shadow-[0_10px_40px_rgba(99,102,241,0.4)] overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Create My Website
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              <Link to="/businesses">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-base hover:bg-white/20 hover:border-white/50 transition-all duration-300 shadow-xl"
                >
                  Explore Businesses
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator with Pulse Animation */}
            <motion.div
          initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                  animate={{
              y: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center relative"
          >
        <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            />
          <motion.div
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Trust Strip - Modern Glassmorphism */}
      <section className="relative -mt-24 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Users, number: '500+', label: 'Local Businesses', gradient: 'from-blue-500 to-cyan-500' },
                { icon: Globe, number: '300+', label: 'Websites Live', gradient: 'from-purple-500 to-pink-500' },
                { icon: Shield, number: '98%', label: 'Trusted by Shop Owners', gradient: 'from-green-500 to-emerald-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                    className="text-5xl md:text-6xl font-black text-gray-900 mb-3 tracking-tight"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works - Colorful Cards */}
      <section className="py-32 md:py-40 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-sm mb-6 tracking-wide uppercase shadow-lg"
            >
              Simple Process
            </motion.span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VaranasiHub</span> Works
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-light">
              Get your business online in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: 1,
                title: 'Sign Up',
                description: 'Login via Google or Email OTP (4-digit).',
                icon: Users,
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                number: 2,
                title: 'Add Details',
                description: 'Name, category, address, WhatsApp, gallery, and YouTube video.',
                icon: LayoutDashboard,
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                number: 3,
                title: 'Instant Website',
                description: 'We publish your site on a subdomain + subdirectory immediately.',
                icon: Zap,
                gradient: 'from-orange-500 to-red-500'
              },
              {
                number: 4,
                title: 'Share & Grow',
                description: 'Customers can call, WhatsApp, view photos, and find you easily.',
                icon: Rocket,
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.gradient} opacity-10 rounded-full blur-3xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-center mb-4">
                    <span className={`text-5xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Key Features - Colorful Gradient Cards */}
      <section className="py-32 md:py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Powerful <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-light">
              Everything you need to create a stunning business website
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-3xl p-8 border border-gray-100 h-full shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-3xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. Popular Businesses - Colorful Grid */}
      <section className="py-32 md:py-40 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                Popular <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Businesses</span>
              </h2>
              <p className="text-xl text-gray-600 font-light">Discover amazing local businesses in Varanasi</p>
            </motion.div>
            <Link to="/businesses">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                View All
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-bold shadow-lg">
                        {business.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{business.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{business.address}</span>
                    </div>
                    <p className="text-sm text-blue-600 mb-6 font-semibold">{business.subdomain}</p>
                    <a
                      href={`https://${business.subdomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group/link"
                    >
                      View Website
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/businesses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="md:hidden inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl"
              >
                View All Businesses
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why VaranasiHub - Colorful List */}
      <section className="py-32 md:py-40 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Why Choose <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">VaranasiHub</span>?
            </h2>
            <p className="text-2xl text-gray-600 font-light">Everything you need to succeed online</p>
          </motion.div>

          <div className="space-y-4">
            {whyPoints.map((point, index) => {
              const Icon = point.icon;
              const colorMap = {
                blue: 'from-blue-500 to-cyan-500',
                yellow: 'from-yellow-500 to-orange-500',
                purple: 'from-purple-500 to-pink-500',
                green: 'from-green-500 to-emerald-500',
                pink: 'from-pink-500 to-rose-500'
              };
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 10, scale: 1.01 }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100 flex items-center gap-6 group-hover:shadow-2xl transition-all duration-500">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${colorMap[point.color]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xl text-gray-900 font-semibold flex-1">{point.text}</p>
                    <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Famous Varanasi Section - Colorful */}
      <section id="famous-varanasi" className="py-32 md:py-40 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl mb-8 shadow-2xl"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Famous <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Varanasi</span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Discover what makes Varanasi one of the world's most spiritual and culturally rich cities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: 'Spiritual Capital',
                description: 'Varanasi, also known as Kashi or Banaras, is one of the world\'s oldest continuously inhabited cities and the spiritual capital of India.',
                image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Sparkles,
                title: 'Ganga Aarti',
                description: 'The mesmerizing Ganga Aarti at Dashashwamedh Ghat is a daily evening ritual that attracts thousands of devotees and tourists.',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Building2,
                title: 'Banarasi Silk',
                description: 'Varanasi is world-famous for its exquisite Banarasi silk sarees, known for their intricate zari work and traditional designs.',
                image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=600&fit=crop&q=80',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: Music,
                title: 'Classical Music',
                description: 'Varanasi is the birthplace of many legendary musicians and is a center for Hindustani classical music.',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: Utensils,
                title: 'Street Food',
                description: 'Varanasi offers an incredible variety of street food including kachori sabzi, chaat, lassi, malaiyyo, and the famous Banarasi paan.',
                image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&q=80',
                gradient: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Map,
                title: 'Ghats & Temples',
                description: 'The city is home to over 80 ghats along the Ganges River and countless ancient temples with unique histories.',
                image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80',
                gradient: 'from-indigo-500 to-purple-500'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12 }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-all duration-500">
                    <div className="h-64 relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Apna Banaras Section - Colorful */}
      <section id="apna-banaras" className="py-32 md:py-40 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl mb-8 shadow-2xl"
            >
              <Map className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Apna <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Banaras</span>
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Discover the essence of Varanasi through its iconic ghats, sacred temples, and rich cultural heritage
            </p>
          </motion.div>

          {/* Ghats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Map className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Famous Ghats of Varanasi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Dashashwamedh Ghat',
                  description: 'The most famous ghat, known for its spectacular evening Ganga Aarti. Legend says Lord Brahma performed a Dashashwamedh Yajna here.',
                  location: 'Main Ghat, Near Kashi Vishwanath',
                  image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Manikarnika Ghat',
                  description: 'One of the oldest and most sacred cremation ghats. It\'s believed that Goddess Parvati\'s earring (Manikarnika) fell here.',
                  location: 'Sacred Cremation Ghat',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Assi Ghat',
                  description: 'The southernmost ghat where the Assi River meets the Ganges. Famous for Subah-e-Banaras morning ritual.',
                  location: 'Southern End, Near BHU',
                  image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Harishchandra Ghat',
                  description: 'Another important cremation ghat named after the legendary King Harishchandra.',
                  location: 'Near Manikarnika Ghat',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Tulsi Ghat',
                  description: 'Named after the great poet-saint Tulsidas, who wrote the Ramcharitmanas here.',
                  location: 'Near Assi Ghat',
                  image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Pancaganga Ghat',
                  description: 'A beautiful ghat where five rivers are believed to meet.',
                  location: 'Central Varanasi',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
                }
              ].map((ghat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={ghat.image}
                      alt={ghat.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{ghat.name}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{ghat.description}</p>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <MapPin className="w-5 h-5" />
                      <span>{ghat.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Temples Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Sacred Temples of Varanasi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Kashi Vishwanath Temple',
                  description: 'One of the twelve Jyotirlingas, dedicated to Lord Shiva. The current temple was built in 1780 by Queen Ahilyabai Holkar.',
                  location: 'Near Dashashwamedh Ghat',
                  image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Sankat Mochan Hanuman Temple',
                  description: 'A famous temple dedicated to Lord Hanuman, established by Tulsidas.',
                  location: 'Near BHU Campus',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Vishalakshi Temple',
                  description: 'Dedicated to Goddess Vishalakshi, an aspect of Parvati. It\'s considered one of the 51 Shakti Pithas.',
                  location: 'Mir Ghat Area',
                  image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Durga Temple',
                  description: 'Also known as Monkey Temple, this 18th-century temple is dedicated to Goddess Durga.',
                  location: 'Durga Kund Area',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Bharat Mata Temple',
                  description: 'A unique temple dedicated to Mother India, featuring a marble relief map of undivided India.',
                  location: 'Mahatma Gandhi Kashi Vidyapith',
                  image: 'https://images.unsplash.com/photo-1606144048614-495e053e9067?w=800&h=600&fit=crop&q=80'
                },
                {
                  name: 'Tulsi Manas Temple',
                  description: 'Built in 1964, this temple is dedicated to Lord Rama. The walls are inscribed with verses from the Ramcharitmanas.',
                  location: 'Near Durga Temple',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
                }
              ].map((temple, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={temple.image}
                      alt={temple.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{temple.name}</h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">{temple.description}</p>
                    <div className="flex items-center gap-2 text-purple-600 font-semibold">
                      <MapPin className="w-5 h-5" />
                      <span>{temple.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cultural Heritage Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Cultural Heritage</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Dev Deepawali',
                  description: 'The Festival of Lights of the Gods, celebrated 15 days after Diwali. All ghats are illuminated with thousands of diyas, creating a magical spectacle.',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80',
                  gradient: 'from-yellow-500 to-orange-500'
                },
                {
                  title: 'Classical Arts',
                  description: 'Varanasi is a hub for Hindustani classical music, dance, and traditional arts. The city has produced legendary artists.',
                  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&q=80',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Banarasi Cuisine',
                  description: 'From kachori sabzi to malaiyyo, thandai to lassi, and the famous Banarasi paan - the city\'s culinary heritage is rich.',
                  image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&q=80',
                  gradient: 'from-orange-500 to-red-500'
                },
                {
                  title: 'Handicrafts',
                  description: 'Beyond Banarasi silk, the city is known for brassware, wooden toys, stone carvings, and traditional crafts.',
                  image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=600&fit=crop&q=80',
                  gradient: 'from-blue-500 to-cyan-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="h-80 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-80`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-3xl font-bold text-white mb-3">{item.title}</h4>
                      <p className="text-white/90 leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Living Varanasi Highlights */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-white/80 text-sm font-semibold tracking-wide"
            >
              <Sparkles className="w-4 h-4" />
              Living Varanasi Stories
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 mb-4"
            >
              Feel the Pulse of <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">Varanasi</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto"
            >
              From sunrise yoga at Assi Ghat to midnight aartis at Dashashwamedh, Banaras never sleeps. Explore the experiences locals swear by.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {featuredHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.slug}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              >
                <Link to={`/varanasi/${highlight.slug}`} className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <div className="p-8 flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-semibold w-fit">
                      <Globe className="w-4 h-4" />
                      Varanasi Highlight
                    </div>
                    <h3 className="text-2xl font-bold text-white">{highlight.title}</h3>
                    <p className="text-white/70 leading-relaxed">{highlight.tagline}</p>
                    <div className="flex items-center gap-2 text-amber-300 font-semibold">
                      <Sparkles className="w-5 h-5" />
                      {highlight.stats[0]?.value} {highlight.stats[0]?.label}
                    </div>
                  </div>
                  <div className="relative h-64 lg:h-full">
                    <div className="absolute inset-0">
                      <img
                        src={highlight.heroImage}
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 10. CTA Banner - Stunning Gradient */}
      <section className="relative py-32 md:py-40 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        ></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight"
            >
              Ready to Go Live? 🚀
            </motion.h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
              Create your Varanasi website now — it's free to start and takes just minutes!
            </p>
            <Link to="/create-website">
              <motion.button
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-14 py-6 bg-white text-gray-900 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-[0_25px_60px_rgba(255,255,255,0.3)] overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Create My Website Now
                  <Rocket className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
