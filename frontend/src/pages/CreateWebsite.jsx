import { useState, useEffect, useRef } from 'react';
import { Building2, User, Phone, Mail, MapPin, Link as LinkIcon, MessageCircle, Instagram, Facebook, Globe, Loader2, Youtube, CheckCircle2, XCircle, Sparkles, Navigation, Plus, X, Clock, Calendar, Gift, ShoppingBag, Map, Palette, CheckCircle, AlertCircle, Edit3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormInput from '../components/forms/FormInput';
import TextArea from '../components/forms/TextArea';
import CategorySelect from '../components/forms/CategorySelect';
import FileUploader from '../components/forms/FileUploader';
import SubmitButton from '../components/forms/SubmitButton';
import { businessAPI } from '../config/api';

const CreateWebsite = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [subdomainStatus, setSubdomainStatus] = useState(null); // { checking: false, available: null, slug: '', suggestions: [] }
  const [customSlug, setCustomSlug] = useState('');
  const [showCustomSlug, setShowCustomSlug] = useState(false);
  const checkTimeoutRef = useRef(null);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    category: '',
    mobileNumber: '',
    email: '',
    address: '',
    googleMapLink: '',
    whatsappNumber: '',
    description: '',
    images: [],
    logo: null,
    youtubeVideo: '',
    instagram: '',
    facebook: '',
    website: '',
    navbarTagline: '',
    footerDescription: '',
    services: [],
    specialOffers: [],
    businessHours: {
      monday: { open: false, start: '09:00', end: '18:00' },
      tuesday: { open: false, start: '09:00', end: '18:00' },
      wednesday: { open: false, start: '09:00', end: '18:00' },
      thursday: { open: false, start: '09:00', end: '18:00' },
      friday: { open: false, start: '09:00', end: '18:00' },
      saturday: { open: false, start: '09:00', end: '18:00' },
      sunday: { open: false, start: '09:00', end: '18:00' },
    },
    appointmentSettings: {
      contactMethod: 'whatsapp', // 'whatsapp' or 'call'
      availableSlots: [],
    },
    theme: 'modern', // 'modern', 'classic', 'minimal'
  });

  // Slugify function (matches backend)
  const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
  };

  // Check subdomain availability
  const checkSubdomain = async (slug) => {
    if (!slug || slug.length < 3) {
      setSubdomainStatus(null);
      return;
    }

    setSubdomainStatus({ checking: true, available: null, slug, suggestions: [] });

    try {
      const response = await businessAPI.checkSubdomainAvailability(slug);
      setSubdomainStatus({
        checking: false,
        available: response.available,
        slug: response.slug,
        suggestions: response.suggestions || [],
      });
    } catch (error) {
      console.error('Error checking subdomain:', error);
      setSubdomainStatus({
        checking: false,
        available: null,
        slug,
        suggestions: [],
        error: error.message,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }

    // Check subdomain availability when business name changes
    if (name === 'businessName' && !showCustomSlug) {
      // Clear previous timeout
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }

      // Debounce the check (wait 500ms after user stops typing)
      checkTimeoutRef.current = setTimeout(() => {
        const slug = slugify(value);
        if (slug.length >= 3) {
          checkSubdomain(slug);
          setCustomSlug(slug);
        } else {
          setSubdomainStatus(null);
          setCustomSlug('');
        }
      }, 500);
    }
  };

  // Handle custom slug change
  const handleCustomSlugChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setCustomSlug(value);
    
    // Clear previous timeout
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    // Debounce the check
    checkTimeoutRef.current = setTimeout(() => {
      if (value.length >= 3) {
        checkSubdomain(value);
      } else {
        setSubdomainStatus({ checking: false, available: null, slug: value, suggestions: [] });
      }
    }, 500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  const handleFileChange = (name, files) => {
    setFormData(prev => ({
      ...prev,
      [name]: files,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Services handlers
  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { title: '', description: '', price: '', image: null, featured: false }]
    }));
  };

  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const toggleServiceFeatured = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, featured: !service.featured } : service
      )
    }));
  };

  // Special Offers handlers
  const addSpecialOffer = () => {
    setFormData(prev => ({
      ...prev,
      specialOffers: [...prev.specialOffers, { title: '', description: '', expiryDate: '' }]
    }));
  };

  const removeSpecialOffer = (index) => {
    setFormData(prev => ({
      ...prev,
      specialOffers: prev.specialOffers.filter((_, i) => i !== index)
    }));
  };

  const updateSpecialOffer = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      specialOffers: prev.specialOffers.map((offer, i) => 
        i === index ? { ...offer, [field]: value } : offer
      )
    }));
  };

  // Business Hours handlers
  const updateBusinessHours = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  // Appointment handlers
  const updateAppointmentSettings = (field, value) => {
    setFormData(prev => ({
      ...prev,
      appointmentSettings: {
        ...prev.appointmentSettings,
        [field]: value
      }
    }));
  };

  const addTimeSlot = () => {
    setFormData(prev => ({
      ...prev,
      appointmentSettings: {
        ...prev.appointmentSettings,
        availableSlots: [...prev.appointmentSettings.availableSlots, { time: '', label: '' }]
      }
    }));
  };

  const removeTimeSlot = (index) => {
    setFormData(prev => ({
      ...prev,
      appointmentSettings: {
        ...prev.appointmentSettings,
        availableSlots: prev.appointmentSettings.availableSlots.filter((_, i) => i !== index)
      }
    }));
  };

  const updateTimeSlot = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      appointmentSettings: {
        ...prev.appointmentSettings,
        availableSlots: prev.appointmentSettings.availableSlots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Business category is required';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Full address is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Business description is required';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    // Validate subdomain availability
    const finalSlug = showCustomSlug ? customSlug : slugify(formData.businessName);
    if (!finalSlug || finalSlug.length < 3) {
      if (formData.businessName.trim()) {
        newErrors.businessName = 'Business name must be at least 3 characters';
      }
    } else if (subdomainStatus && subdomainStatus.available === false) {
      newErrors.businessName = 'This subdomain is already taken. Please customize it or choose a different name.';
    } else if (subdomainStatus && subdomainStatus.checking) {
      newErrors.businessName = 'Please wait while we check subdomain availability...';
    }

    if (!formData.logo) {
      newErrors.logo = 'Logo is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    if (formData.whatsappNumber && !/^[0-9]{10}$/.test(formData.whatsappNumber.replace(/\D/g, ''))) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      submitData.append('businessName', formData.businessName);
      
      // If custom slug is set and available, send it as preferred slug
      const preferredSlug = showCustomSlug && customSlug ? customSlug : null;
      if (preferredSlug && subdomainStatus?.available === true) {
        submitData.append('preferredSlug', preferredSlug);
      }
      
      submitData.append('ownerName', formData.ownerName);
      submitData.append('category', formData.category);
      submitData.append('mobileNumber', formData.mobileNumber);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      submitData.append('googleMapLink', formData.googleMapLink);
      submitData.append('whatsappNumber', formData.whatsappNumber);
      submitData.append('description', formData.description);
      submitData.append('youtubeVideo', formData.youtubeVideo);
      submitData.append('instagram', formData.instagram);
      submitData.append('facebook', formData.facebook);
      submitData.append('website', formData.website);
      submitData.append('navbarTagline', formData.navbarTagline || '');
      submitData.append('footerDescription', formData.footerDescription || '');
      submitData.append('services', JSON.stringify(formData.services || []));
      submitData.append('specialOffers', JSON.stringify(formData.specialOffers || []));
      submitData.append('businessHours', JSON.stringify(formData.businessHours || {}));
      submitData.append('appointmentSettings', JSON.stringify(formData.appointmentSettings || {}));
      submitData.append('theme', formData.theme || 'modern');

      if (formData.logo) {
        submitData.append('logo', formData.logo);
      }

      formData.images.forEach((image, index) => {
        submitData.append(`images`, image);
      });

      // Add service images
      formData.services.forEach((service, index) => {
        if (service.image) {
          submitData.append(`serviceImage_${index}`, service.image);
        }
      });

      // Send to backend API
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/business/create', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create business website');
      }

      setSuccessMessage({
        title: data.requiresApproval ? 'Website Submitted for Approval!' : 'Website Created Successfully!',
        message: data.requiresApproval 
          ? 'Your website has been submitted and is pending admin approval. You will be promoted to Content Admin once approved. You can check the status in your profile.'
          : 'Your website is live!',
        subdomain: data.business.subdomainUrl,
        subdirectory: data.business.subdirectoryUrl,
        status: data.business.status
      });
      setErrorMessage(null);

      // Reset form
      setFormData({
        businessName: '',
        ownerName: '',
        category: '',
        mobileNumber: '',
        email: '',
        address: '',
        googleMapLink: '',
        whatsappNumber: '',
        description: '',
        images: [],
        logo: null,
        youtubeVideo: '',
        instagram: '',
        facebook: '',
        website: '',
        navbarTagline: '',
        footerDescription: '',
        services: [],
        specialOffers: [],
        businessHours: {
          monday: { open: false, start: '09:00', end: '18:00' },
          tuesday: { open: false, start: '09:00', end: '18:00' },
          wednesday: { open: false, start: '09:00', end: '18:00' },
          thursday: { open: false, start: '09:00', end: '18:00' },
          friday: { open: false, start: '09:00', end: '18:00' },
          saturday: { open: false, start: '09:00', end: '18:00' },
          sunday: { open: false, start: '09:00', end: '18:00' },
        },
        appointmentSettings: {
          contactMethod: 'whatsapp',
          availableSlots: [],
        },
        theme: 'modern',
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(error.message || 'Failed to submit form. Please try again.');
      setSuccessMessage(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Your Website
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build your online presence in minutes. Fill in your business details below and get your professional website ready.
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">{successMessage.title}</h3>
                  {successMessage.message && (
                    <p className="text-sm text-green-800 mb-3">{successMessage.message}</p>
                  )}
                  {successMessage.status === 'pending' && (
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-3">
                      <p className="text-sm text-yellow-800 font-semibold">⏳ Status: Pending Approval</p>
                      <p className="text-xs text-yellow-700 mt-1">Your website will be live once the admin approves it.</p>
                    </div>
                  )}
                  {successMessage.status === 'approved' && (
                    <div className="space-y-2 text-sm text-green-800">
                      <p><strong>Subdomain:</strong> <a href={successMessage.subdomain} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600">{successMessage.subdomain}</a></p>
                      <p><strong>Subdirectory:</strong> <a href={successMessage.subdirectory} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600">{successMessage.subdirectory}</a></p>
                    </div>
                  )}
                  <button
                    onClick={() => setSuccessMessage(null)}
                    className="mt-4 text-sm text-green-700 hover:text-green-900 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
                  <p className="text-sm text-red-800">{errorMessage}</p>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="mt-4 text-sm text-red-700 hover:text-red-900 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Theme Selection Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Theme <span className="text-sm font-normal text-gray-500">(Can be changed later)</span></h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Select a theme that best represents your business. You can change this anytime after creating your website.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Modern Theme */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, theme: 'modern' }))}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.theme === 'modern'
                        ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    {formData.theme === 'modern' && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl mb-3"></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Modern</h3>
                      <p className="text-sm text-gray-600">
                        Bold gradients, vibrant colors, and contemporary design. Perfect for tech startups and modern businesses.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                      <div className="w-8 h-8 bg-indigo-500 rounded"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded"></div>
                    </div>
                  </div>

                  {/* Classic Theme */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, theme: 'classic' }))}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.theme === 'classic'
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                  >
                    {formData.theme === 'classic' && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="h-32 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-xl mb-3"></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Classic</h3>
                      <p className="text-sm text-gray-600">
                        Warm tones, elegant design, and traditional aesthetics. Ideal for restaurants, salons, and service businesses.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-amber-500 rounded"></div>
                      <div className="w-8 h-8 bg-orange-500 rounded"></div>
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                    </div>
                  </div>

                  {/* Minimal Theme */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, theme: 'minimal' }))}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.theme === 'minimal'
                        ? 'border-gray-500 bg-gray-50 ring-2 ring-gray-200'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    {formData.theme === 'minimal' && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="h-32 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl mb-3 border-2 border-gray-300"></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Minimal</h3>
                      <p className="text-sm text-gray-600">
                        Clean lines, subtle colors, and focus on content. Great for professional services and consultants.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                      <div className="w-8 h-8 bg-gray-500 rounded"></div>
                      <div className="w-8 h-8 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormInput
                      label="Business Name"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Enter business name"
                      required
                      error={errors.businessName}
                      icon={Building2}
                    />
                    
                    {/* Subdomain Availability Checker */}
                    {formData.businessName && (
                      <div className="mt-3 space-y-2">
                        {!showCustomSlug ? (
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium">Subdomain:</span>
                                <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                  {customSlug || slugify(formData.businessName) || '...'}
                                </code>
                                {subdomainStatus?.checking && (
                                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowCustomSlug(true);
                                if (!customSlug) {
                                  const slug = slugify(formData.businessName);
                                  setCustomSlug(slug);
                                  if (slug.length >= 3) {
                                    checkSubdomain(slug);
                                  }
                                }
                              }}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 whitespace-nowrap"
                            >
                              <Edit3 className="w-3 h-3" />
                              Customize
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium text-gray-700">Custom Subdomain:</label>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowCustomSlug(false);
                                  const slug = slugify(formData.businessName);
                                  setCustomSlug(slug);
                                  if (slug.length >= 3) {
                                    checkSubdomain(slug);
                                  }
                                }}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Use auto-generated
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 relative">
                                <input
                                  type="text"
                                  value={customSlug}
                                  onChange={handleCustomSlugChange}
                                  placeholder="your-custom-slug"
                                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm font-mono pr-32"
                                  pattern="[a-z0-9-]{3,50}"
                                  maxLength={50}
                                />
                                <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-mono">.varanasihub.com</span>
                              </div>
                              {subdomainStatus?.checking && (
                                <Loader2 className="w-5 h-5 animate-spin text-blue-600 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        )}

                        {/* Status Messages */}
                        {subdomainStatus && !subdomainStatus.checking && (
                          <div className={`rounded-lg p-3 border-2 ${
                            subdomainStatus.available === true
                              ? 'bg-green-50 border-green-200'
                              : subdomainStatus.available === false
                              ? 'bg-red-50 border-red-200'
                              : 'bg-yellow-50 border-yellow-200'
                          }`}>
                            {subdomainStatus.available === true ? (
                              <div className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-green-900">Available!</p>
                                  <p className="text-xs text-green-700 mt-0.5">
                                    Your website will be at: <code className="bg-green-100 px-1.5 py-0.5 rounded font-mono">{subdomainStatus.slug}.varanasihub.com</code>
                                  </p>
                                </div>
                              </div>
                            ) : subdomainStatus.available === false ? (
                              <div className="flex items-start gap-2">
                                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-red-900">Already Taken</p>
                                  {subdomainStatus.suggestions && subdomainStatus.suggestions.length > 0 ? (
                                    <div className="mt-2">
                                      <p className="text-xs text-red-700 mb-1">Available alternatives:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {subdomainStatus.suggestions.map((suggestion, idx) => (
                                          <button
                                            key={idx}
                                            type="button"
                                            onClick={() => {
                                              setCustomSlug(suggestion);
                                              checkSubdomain(suggestion);
                                            }}
                                            className="px-2 py-1 bg-white border border-red-300 rounded text-xs font-mono text-red-700 hover:bg-red-50 transition-colors"
                                          >
                                            {suggestion}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-xs text-red-700 mt-0.5">Please try a different name or customize the subdomain.</p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-yellow-900">Invalid Format</p>
                                  <p className="text-xs text-yellow-700 mt-0.5">
                                    Use only lowercase letters, numbers, and hyphens (3-50 characters).
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Validation Error */}
                        {subdomainStatus && subdomainStatus.available === false && !showCustomSlug && (
                          <p className="text-xs text-red-600 mt-1">
                            Please customize the subdomain or choose a different business name.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <FormInput
                    label="Owner Name"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner name (optional)"
                    error={errors.ownerName}
                    icon={User}
                  />
                  <CategorySelect
                    label="Business Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    error={errors.category}
                  />
                  <FormInput
                    label="Mobile Number"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    required
                    error={errors.mobileNumber}
                    icon={Phone}
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="business@example.com"
                    required
                    error={errors.email}
                    icon={Mail}
                  />
                  <FormInput
                    label="WhatsApp Number"
                    name="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="10-digit WhatsApp number (optional)"
                    error={errors.whatsappNumber}
                    icon={MessageCircle}
                  />
                </div>
              </div>

              {/* Location Information Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Location Information</h2>
                </div>
                <div className="space-y-6">
                  <FormInput
                    label="Full Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete business address"
                    required
                    error={errors.address}
                    icon={MapPin}
                  />
                  <FormInput
                    label="Google Map Link"
                    name="googleMapLink"
                    type="url"
                    value={formData.googleMapLink}
                    onChange={handleChange}
                    placeholder="https://maps.google.com/... (optional)"
                    error={errors.googleMapLink}
                    icon={LinkIcon}
                  />
                </div>
              </div>

              {/* Business Description */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Business Description</h2>
                </div>
                <TextArea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your business in detail (minimum 50 characters)..."
                  required
                  rows={6}
                  error={errors.description}
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {formData.description.length >= 50 ? (
                      <span className="text-green-600 font-medium">✓ Minimum length met</span>
                    ) : (
                      <span>{formData.description.length}/50 characters minimum</span>
                    )}
                  </p>
                </div>
              </div>

              {/* YouTube Video Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Youtube className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Video Content <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <FormInput
                  label="YouTube Video URL"
                  name="youtubeVideo"
                  type="url"
                  value={formData.youtubeVideo}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  error={errors.youtubeVideo}
                  icon={Youtube}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Paste your YouTube video URL here. It will be embedded on your website.
                </p>
              </div>

              {/* Media Upload Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Media</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUploader
                    label="Business Logo"
                    name="logo"
                    accept="image/*"
                    multiple={false}
                    required
                    value={formData.logo}
                    onChange={(file) => handleFileChange('logo', file)}
                    error={errors.logo}
                  />
                  <FileUploader
                    label="Business Images"
                    name="images"
                    accept="image/*"
                    multiple={true}
                    required
                    value={formData.images}
                    onChange={(files) => handleFileChange('images', files)}
                    maxFiles={10}
                    error={errors.images}
                  />
                </div>
              </div>

              {/* Social Links Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Social Links <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormInput
                    label="Instagram"
                    name="instagram"
                    type="url"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    error={errors.instagram}
                    icon={Instagram}
                  />
                  <FormInput
                    label="Facebook"
                    name="facebook"
                    type="url"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/..."
                    error={errors.facebook}
                    icon={Facebook}
                  />
                  <FormInput
                    label="Website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    error={errors.website}
                    icon={Globe}
                  />
                </div>
              </div>

              {/* Navbar & Footer Customization Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Navbar & Footer Customization <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <div className="space-y-6">
                  <FormInput
                    label="Navbar Tagline/Slogan"
                    name="navbarTagline"
                    value={formData.navbarTagline}
                    onChange={handleChange}
                    placeholder="e.g., 'Your Trusted Partner Since 2010' or 'Quality Service, Every Time'"
                    error={errors.navbarTagline}
                    icon={Navigation}
                  />
                  <p className="text-sm text-gray-500 -mt-4">
                    A short tagline that will appear in your website's navbar below the business name
                  </p>
                  
                  <div className="mt-6">
                    <TextArea
                      label="Footer Description"
                      name="footerDescription"
                      value={formData.footerDescription}
                      onChange={handleChange}
                      placeholder="Add a custom description or message for your footer (e.g., 'We are committed to providing the best service to our customers...')"
                      rows={4}
                      error={errors.footerDescription}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      This text will appear in your website's footer section
                    </p>
                  </div>
                </div>
              </div>

              {/* Services / Menu / Pricing Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Services / Menu / Pricing <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Perfect for Salons, Restaurants, Tuition classes, Pandit ji, Photographers, etc.
                </p>
                
                <div className="space-y-6">
                  {formData.services.map((service, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Service {index + 1}</h3>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleServiceFeatured(index)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                              service.featured 
                                ? 'bg-yellow-500 text-white' 
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {service.featured ? '⭐ Featured' : 'Mark Featured'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          label="Service Title"
                          value={service.title}
                          onChange={(e) => updateService(index, 'title', e.target.value)}
                          placeholder="e.g., Haircut, Pizza, Math Tuition"
                        />
                        <FormInput
                          label="Price (Optional)"
                          type="text"
                          value={service.price}
                          onChange={(e) => updateService(index, 'price', e.target.value)}
                          placeholder="e.g., ₹500 or $20"
                        />
                      </div>
                      <div className="mt-4">
                        <TextArea
                          label="Description"
                          value={service.description}
                          onChange={(e) => updateService(index, 'description', e.target.value)}
                          placeholder="Brief description of the service..."
                          rows={3}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Image (Optional)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => updateService(index, 'image', e.target.files[0])}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                        {service.image && (
                          <p className="mt-2 text-sm text-green-600">✓ Image selected</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addService}
                    className="w-full py-3 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Service
                  </button>
                </div>
              </div>

              {/* Special Offers / Deals Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Gift className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Special Offers / Deals <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                
                <div className="space-y-6">
                  {formData.specialOffers.map((offer, index) => (
                    <div key={index} className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Offer {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeSpecialOffer(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          label="Offer Title"
                          value={offer.title}
                          onChange={(e) => updateSpecialOffer(index, 'title', e.target.value)}
                          placeholder="e.g., 50% Off on All Services"
                        />
                        <FormInput
                          label="Expiry Date"
                          type="date"
                          value={offer.expiryDate}
                          onChange={(e) => updateSpecialOffer(index, 'expiryDate', e.target.value)}
                        />
                      </div>
                      <div className="mt-4">
                        <TextArea
                          label="Offer Description"
                          value={offer.description}
                          onChange={(e) => updateSpecialOffer(index, 'description', e.target.value)}
                          placeholder="Describe your special offer..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecialOffer}
                    className="w-full py-3 border-2 border-dashed border-orange-300 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Special Offer
                  </button>
                </div>
              </div>

              {/* Business Hours Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Business Hours <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Set your business hours. The website will automatically show "Open Now" or "Closed" status.
                </p>
                
                <div className="space-y-4">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <input
                            type="checkbox"
                            checked={formData.businessHours[day].open}
                            onChange={(e) => updateBusinessHours(day, 'open', e.target.checked)}
                            className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                          />
                          <label className="text-lg font-semibold text-gray-800 capitalize min-w-[100px]">
                            {day}
                          </label>
                        </div>
                        {formData.businessHours[day].open ? (
                          <div className="flex items-center gap-3 flex-1">
                            <input
                              type="time"
                              value={formData.businessHours[day].start}
                              onChange={(e) => updateBusinessHours(day, 'start', e.target.value)}
                              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <span className="text-gray-600 font-medium">to</span>
                            <input
                              type="time"
                              value={formData.businessHours[day].end}
                              onChange={(e) => updateBusinessHours(day, 'end', e.target.value)}
                              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Closed</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment / Booking Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Appointment / Booking <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Enable customers to book appointments. The form will automatically send a message via WhatsApp or call.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => updateAppointmentSettings('contactMethod', 'whatsapp')}
                        className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                          formData.appointmentSettings.contactMethod === 'whatsapp'
                            ? 'bg-green-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => updateAppointmentSettings('contactMethod', 'call')}
                        className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${
                          formData.appointmentSettings.contactMethod === 'call'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Call
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Time Slots (Optional)
                    </label>
                    <div className="space-y-3">
                      {formData.appointmentSettings.availableSlots.map((slot, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="time"
                            value={slot.time}
                            onChange={(e) => updateTimeSlot(index, 'time', e.target.value)}
                            placeholder="Time"
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          />
                          <input
                            type="text"
                            value={slot.label}
                            onChange={(e) => updateTimeSlot(index, 'label', e.target.value)}
                            placeholder="Label (e.g., Morning, Evening)"
                            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeTimeSlot(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addTimeSlot}
                        className="w-full py-2 border-2 border-dashed border-pink-300 rounded-lg text-pink-600 font-semibold hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Time Slot
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Section */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <Map className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Google Maps <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
                </div>
                <FormInput
                  label="Google Maps Link"
                  name="googleMapLink"
                  type="url"
                  value={formData.googleMapLink}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/... or Google Maps embed URL"
                  error={errors.googleMapLink}
                  icon={Map}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Paste your Google Maps link. An interactive map will be embedded on your website's contact section.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-75"></div>
                  <div className="relative">
                    <SubmitButton loading={loading} text="Create Your Website" />
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  If you have any questions or need assistance while creating your website, feel free to contact us.
                </p>
                <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Contact Support →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateWebsite;

