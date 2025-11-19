import { motion } from 'framer-motion';
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
  Image as ImageIcon
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
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
      description: 'Get your business URL instantly'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Ready Business Page',
      description: 'Looks great on all devices'
    },
    {
      icon: Cloud,
      title: 'Cloud Photo Storage',
      description: 'Unlimited photo uploads'
    },
    {
      icon: Video,
      title: 'YouTube Video Embedding',
      description: 'Showcase your videos easily'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp & Call Buttons',
      description: 'One-tap contact options'
    },
    {
      icon: LayoutDashboard,
      title: 'Simple Business Dashboard',
      description: 'Easy updates and management'
    }
  ];

  const whyPoints = [
    'Reach real customers in Varanasi',
    'Zero technical skills needed',
    'Your business gets a clean, fast website',
    'One-tap WhatsApp & Call buttons',
    'Perfect for shops, clinics, homestays, services'
  ];

  return (
    <>
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Create Your Business Website in Minutes
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Give your Varanasi shop, clinic, hotel, or service a modern online presence with instant subdomain and easy updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create-website">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    Create My Website
                  </motion.button>
                </Link>
                <Link to="/directory">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
                  >
                    Explore Businesses
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            {/* Preview Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-lg shadow-2xl p-4">
                <div className="bg-gray-100 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-24 bg-gray-200 rounded"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">
                    WhatsApp
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  guptamedical.varansihub.com
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <Users className="w-10 h-10 text-blue-600" />
              <div className="text-3xl font-bold text-gray-800">500+</div>
              <div className="text-gray-600">Local Businesses</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <Globe className="w-10 h-10 text-blue-600" />
              <div className="text-3xl font-bold text-gray-800">300+</div>
              <div className="text-gray-600">Websites Live</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <Shield className="w-10 h-10 text-blue-600" />
              <div className="text-lg font-semibold text-gray-800">Trusted by Varanasi shop owners</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. How Varansihub Works */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            How Varansihub Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: 1,
                title: 'Sign Up',
                description: 'Login via Google or Email OTP (4-digit).'
              },
              {
                number: 2,
                title: 'Add Business Details',
                description: 'Name, category, address, WhatsApp, gallery, and YouTube video.'
              },
              {
                number: 3,
                title: 'Instant Website',
                description: 'We publish your site on a subdomain + subdirectory immediately.'
              },
              {
                number: 4,
                title: 'Share & Grow',
                description: 'Customers can call, WhatsApp, view photos, and find you easily.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Key Features */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-500 transition-colors duration-200"
                >
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Popular Businesses */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              Popular Businesses
            </motion.h2>
            <Link to="/directory">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-white opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{business.name}</h3>
                  <p className="text-gray-600 mb-1">{business.category} • {business.address}</p>
                  <p className="text-sm text-blue-600 mb-4">{business.subdomain}</p>
                  <a
                    href={`https://${business.subdomain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
                  >
                    View Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/directory">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                View All Businesses
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Varansihub? */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Why Varansihub?
          </motion.h2>
          <div className="space-y-4">
            {whyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-gray-50 rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg text-gray-700">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to go live?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Create your Varanasi website now — it's free to start.
            </p>
            <Link to="/create-website">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Create My Website
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

