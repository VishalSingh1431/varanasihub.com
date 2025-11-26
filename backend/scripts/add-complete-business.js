import pool from '../config/database.js';
import User from '../models/User.js';
import Business from '../models/Business.js';
import { slugify } from '../utils/slugify.js';

/**
 * Script to add a complete business with all sections filled
 * Uses admin email to find the user and create the business
 */
async function addCompleteBusiness() {
  try {
    const adminEmail = 'vishalsingh05072003@gmail.com';
    
    console.log(`Finding admin user with email: ${adminEmail}...`);

    // Find admin user by email
    const adminUser = await User.findByEmail(adminEmail);
    
    if (!adminUser) {
      console.error(`❌ Admin user with email ${adminEmail} not found`);
      process.exit(1);
    }

    console.log(`✓ Found admin user: ${adminUser.name || 'N/A'} (ID: ${adminUser.id})`);
    console.log(`  Role: ${adminUser.role || 'normal'}`);

    // Generate unique business name and slug
    const timestamp = Date.now();
    const businessName = `Premium Business Hub ${timestamp}`;
    let slug = slugify(businessName);
    
    // Check if slug exists and make it unique
    let slugExists = await Business.slugExists(slug);
    let counter = 1;
    while (slugExists) {
      slug = `${slugify(businessName)}-${counter}`;
      slugExists = await Business.slugExists(slug);
      counter++;
    }

    console.log(`\nCreating business: ${businessName}`);
    console.log(`Slug: ${slug}`);

    // Complete business data with all sections filled
    const businessData = {
      businessName: businessName,
      ownerName: 'Rajesh Kumar',
      category: 'Restaurant', // You can change this to any valid category
      mobile: '9876543210',
      email: `business${timestamp}@example.com`, // Unique email
      address: '123 Main Street, Varanasi, Uttar Pradesh 221001, India',
      mapLink: 'https://www.google.com/maps/place/Varanasi,+Uttar+Pradesh',
      whatsapp: '9876543210',
      description: 'Welcome to Premium Business Hub! We are a leading establishment in Varanasi, offering exceptional services and products to our valued customers. With years of experience and a commitment to excellence, we strive to provide the best quality and customer satisfaction. Our team is dedicated to serving you with professionalism and care. Visit us today and experience the difference!',
      logoUrl: 'https://via.placeholder.com/300x300?text=Business+Logo', // Placeholder logo
      imagesUrl: [
        'https://via.placeholder.com/800x600?text=Business+Image+1',
        'https://via.placeholder.com/800x600?text=Business+Image+2',
        'https://via.placeholder.com/800x600?text=Business+Image+3',
        'https://via.placeholder.com/800x600?text=Business+Image+4',
      ],
      youtubeVideo: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Sample YouTube video
      navbarTagline: 'Your Trusted Partner in Excellence',
      footerDescription: 'Premium Business Hub - Serving Varanasi with quality and dedication since 2020. Contact us for all your needs.',
      services: [
        {
          name: 'Premium Service 1',
          description: 'Comprehensive service offering with professional expertise and quality assurance. We ensure the best results for all our clients.',
          price: '₹1,500',
          image: 'https://via.placeholder.com/400x300?text=Service+1',
        },
        {
          name: 'Premium Service 2',
          description: 'Advanced solutions tailored to your specific needs. Our experienced team delivers exceptional value and results.',
          price: '₹2,500',
          image: 'https://via.placeholder.com/400x300?text=Service+2',
        },
        {
          name: 'Premium Service 3',
          description: 'Expert consultation and support services. We provide personalized attention to every detail of your project.',
          price: '₹3,000',
          image: 'https://via.placeholder.com/400x300?text=Service+3',
        },
        {
          name: 'Premium Service 4',
          description: 'Complete end-to-end solutions with ongoing support. Trust us to handle all aspects of your requirements.',
          price: '₹4,500',
          image: 'https://via.placeholder.com/400x300?text=Service+4',
        },
      ],
      specialOffers: [
        {
          title: 'Grand Opening Special',
          description: 'Get 30% off on all services this month! Limited time offer for new customers.',
          discount: '30% OFF',
          validUntil: '2024-12-31',
        },
        {
          title: 'Weekend Special',
          description: 'Special weekend discounts available. Book your appointment now and save big!',
          discount: '25% OFF',
          validUntil: '2024-12-31',
        },
        {
          title: 'Referral Bonus',
          description: 'Refer a friend and both of you get amazing benefits. Spread the word!',
          discount: '20% OFF',
          validUntil: '2024-12-31',
        },
      ],
      businessHours: {
        monday: { open: true, start: '09:00', end: '18:00' },
        tuesday: { open: true, start: '09:00', end: '18:00' },
        wednesday: { open: true, start: '09:00', end: '18:00' },
        thursday: { open: true, start: '09:00', end: '18:00' },
        friday: { open: true, start: '09:00', end: '18:00' },
        saturday: { open: true, start: '10:00', end: '16:00' },
        sunday: { open: false, start: '09:00', end: '18:00' },
      },
      appointmentSettings: {
        contactMethod: 'whatsapp', // 'whatsapp' or 'call'
        availableSlots: [
          { day: 'monday', slots: ['09:00', '11:00', '14:00', '16:00'] },
          { day: 'tuesday', slots: ['09:00', '11:00', '14:00', '16:00'] },
          { day: 'wednesday', slots: ['09:00', '11:00', '14:00', '16:00'] },
          { day: 'thursday', slots: ['09:00', '11:00', '14:00', '16:00'] },
          { day: 'friday', slots: ['09:00', '11:00', '14:00', '16:00'] },
          { day: 'saturday', slots: ['10:00', '12:00', '14:00'] },
        ],
      },
      theme: 'modern', // 'modern', 'classic', 'minimal'
      socialLinks: {
        instagram: 'https://www.instagram.com/premiumbusinesshub',
        facebook: 'https://www.facebook.com/premiumbusinesshub',
        website: 'https://www.premiumbusinesshub.com',
      },
      slug: slug,
      status: 'approved', // Set to approved since it's from admin
      userId: adminUser.id,
      isPremium: false,
    };

    // Generate URLs
    const isDevelopment = process.env.NODE_ENV === 'development' || 
                         !process.env.BASE_DOMAIN || 
                         process.env.BASE_DOMAIN.includes('localhost');
    
    const port = process.env.PORT || 5000;
    const baseDomain = process.env.BASE_DOMAIN || 'varanasihub.com';
    
    if (isDevelopment) {
      businessData.subdomainUrl = `http://${slug}.localhost:${port}`;
      businessData.subdirectoryUrl = `http://localhost:${port}/${slug}`;
    } else {
      businessData.subdomainUrl = `https://${slug}.${baseDomain}`;
      businessData.subdirectoryUrl = `https://${baseDomain}/${slug}`;
    }

    // Create the business
    const business = await Business.create(businessData);

    console.log('\n✅ Business created successfully!');
    console.log(`\nBusiness Details:`);
    console.log(`  ID: ${business.id}`);
    console.log(`  Name: ${business.businessName}`);
    console.log(`  Slug: ${business.slug}`);
    console.log(`  Subdomain URL: ${business.subdomainUrl}`);
    console.log(`  Subdirectory URL: ${business.subdirectoryUrl}`);
    console.log(`  Status: ${business.status}`);
    console.log(`  Owner: ${business.ownerName}`);
    console.log(`  Category: ${business.category}`);
    console.log(`  Email: ${business.email}`);
    console.log(`  Mobile: ${business.mobile}`);
    console.log(`  Services: ${business.services?.length || 0} services added`);
    console.log(`  Special Offers: ${business.specialOffers?.length || 0} offers added`);
    console.log(`  Business Hours: Configured for all days`);
    console.log(`  Appointment Settings: Configured with available slots`);
    console.log(`  Theme: ${business.theme}`);
    console.log(`  Social Links: Instagram, Facebook, Website added`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating business:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

addCompleteBusiness();

