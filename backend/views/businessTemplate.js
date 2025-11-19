/**
 * Generate HTML template for business website
 * This can be used to render business pages for subdomain/subdirectory routing
 */
export const generateBusinessHTML = (business) => {
  // Theme configurations
  const themes = {
    modern: {
      primary: 'from-blue-600 via-indigo-600 to-purple-600',
      primarySolid: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
      secondary: 'bg-indigo-600',
      accent: 'text-purple-600',
      navBorder: 'border-blue-200',
      navBg: 'bg-white',
      button: 'bg-blue-600 hover:bg-blue-700',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      footer: 'from-gray-900 via-gray-800 to-gray-900',
    },
    classic: {
      primary: 'from-amber-600 via-orange-600 to-red-600',
      primarySolid: 'bg-amber-600',
      primaryHover: 'hover:bg-amber-700',
      secondary: 'bg-orange-600',
      accent: 'text-amber-600',
      navBorder: 'border-amber-200',
      navBg: 'bg-white',
      button: 'bg-amber-600 hover:bg-amber-700',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      footer: 'from-amber-900 via-orange-900 to-red-900',
    },
    minimal: {
      primary: 'from-gray-100 via-gray-200 to-gray-300',
      primarySolid: 'bg-gray-600',
      primaryHover: 'hover:bg-gray-700',
      secondary: 'bg-gray-500',
      accent: 'text-gray-600',
      navBorder: 'border-gray-200',
      navBg: 'bg-white',
      button: 'bg-gray-600 hover:bg-gray-700',
      cardBg: 'bg-white',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      footer: 'from-gray-800 via-gray-700 to-gray-800',
    },
  };

  const theme = themes[business.theme] || themes.modern;

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(business.youtubeVideo);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  // Escape HTML to prevent XSS
  const escapeHtml = (text) => {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(business.businessName)} - ${escapeHtml(business.category)}</title>
  <meta name="description" content="${escapeHtml(business.description.substring(0, 160))}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html { scroll-behavior: smooth; }
    .nav-active { color: #2563eb; background-color: #eff6ff; }
    .edit-button-float {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      animation: pulse 2s infinite;
    }
    @media (max-width: 640px) {
      .edit-button-float {
        bottom: 15px;
        right: 15px;
      }
      .edit-button-float a {
        padding: 12px 16px;
        font-size: 12px;
      }
      .edit-button-float svg {
        width: 16px;
        height: 16px;
      }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  </style>
</head>
<body class="bg-gray-50">
  <!-- Edit Button (shown only to owner) -->
  <div id="editButtonContainer" style="display: none;" class="edit-button-float">
    <a 
      href="/edit-website/${business.id}" 
      class="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 font-bold text-sm md:text-base"
      style="box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);"
      title="Edit Your Website"
    >
      <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
      </svg>
      <span class="hidden sm:inline">Edit Website</span>
      <span class="sm:hidden">Edit</span>
    </a>
  </div>
  
  <script>
    // Check if current user is the owner
    (function() {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          const businessUserId = ${business.userId ? business.userId : 'null'};
          
          // If user ID matches business owner ID, show edit button
          if (user.id === businessUserId) {
            const editButton = document.getElementById('editButtonContainer');
            if (editButton) {
              editButton.style.display = 'block';
            }
          }
        }
      } catch (error) {
        console.error('Error checking ownership:', error);
      }
    })();
  </script>
  <!-- Navbar -->
  <nav class="sticky top-0 z-50 ${theme.navBg} shadow-2xl border-b-2 ${theme.navBorder}">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-24">
        <!-- Logo/Brand -->
        <a href="#home" class="flex items-center gap-4 group">
          ${business.logoUrl ? `
          <div class="relative">
            <img src="${escapeHtml(business.logoUrl)}" alt="${escapeHtml(business.businessName)}" class="h-14 w-14 object-contain rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-gray-100 group-hover:ring-blue-200">
          </div>
          ` : `
          <div class="h-14 w-14 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-gray-100 group-hover:ring-blue-200">
            <span class="text-white text-2xl font-bold">${escapeHtml(business.businessName.charAt(0).toUpperCase())}</span>
          </div>
          `}
          <div>
            <div class="text-2xl font-bold text-gray-900 ${theme.accent === 'text-purple-600' ? 'group-hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'group-hover:text-amber-600' : 'group-hover:text-gray-600'} transition-colors">${escapeHtml(business.businessName)}</div>
            <div class="text-sm text-gray-500 font-medium">${escapeHtml(business.category)}</div>
            ${business.navbarTagline ? `<div class="text-xs text-gray-400 mt-1 italic">${escapeHtml(business.navbarTagline)}</div>` : ''}
          </div>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <a href="#home" class="nav-link px-5 py-2.5 text-gray-700 ${theme.accent.replace('text-', 'hover:text-')} hover:bg-gray-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Home
          </a>
          <a href="#about" class="nav-link px-5 py-2.5 text-gray-700 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} hover:bg-gray-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            About
          </a>
          ${business.services && business.services.length > 0 ? `<a href="#services" class="nav-link px-5 py-2.5 text-gray-700 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} hover:bg-gray-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            Services
          </a>` : ''}
          ${business.imagesUrl && business.imagesUrl.length > 0 ? `<a href="#gallery" class="nav-link px-5 py-2.5 text-gray-700 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} hover:bg-gray-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Gallery
          </a>` : ''}
          <a href="#contact" class="nav-link px-5 py-2.5 text-gray-700 ${theme.accent.replace('text-', 'hover:text-')} hover:bg-gray-50 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Contact
          </a>
        </div>

        <!-- Action Buttons -->
        <div class="hidden md:flex items-center gap-3">
          ${business.mobile ? `
          <a href="tel:${escapeHtml(business.mobile)}" class="flex items-center gap-2 px-5 py-2.5 ${theme.button} text-white rounded-xl transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            Call
          </a>
          ` : ''}
          ${business.whatsapp ? `
          <a href="https://wa.me/${escapeHtml(business.whatsapp.replace(/[^0-9]/g, ''))}" target="_blank" class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
          ` : ''}
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobileMenuBtn" class="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors">
          <svg id="menuIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg id="closeIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobileMenu" class="hidden lg:hidden border-t border-gray-200 py-4 bg-white">
        <div class="flex flex-col space-y-2">
          <a href="#home" class="px-4 py-3 text-gray-700 hover:bg-gray-50 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} rounded-xl transition-all font-semibold flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Home
          </a>
          <a href="#about" class="px-4 py-3 text-gray-700 hover:bg-gray-50 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} rounded-xl transition-all font-semibold flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            About
          </a>
          ${business.services && business.services.length > 0 ? `<a href="#services" class="px-4 py-3 text-gray-700 hover:bg-gray-50 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} rounded-xl transition-all font-semibold flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
            Services
          </a>` : ''}
          ${business.imagesUrl && business.imagesUrl.length > 0 ? `<a href="#gallery" class="px-4 py-3 text-gray-700 hover:bg-gray-50 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} rounded-xl transition-all font-semibold flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Gallery
          </a>` : ''}
          <a href="#contact" class="px-4 py-3 text-gray-700 hover:bg-gray-50 ${theme.accent === 'text-purple-600' ? 'hover:text-purple-600' : theme.accent === 'text-amber-600' ? 'hover:text-amber-600' : 'hover:text-gray-600'} rounded-xl transition-all font-semibold flex items-center gap-3">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Contact
          </a>
          <div class="pt-2 space-y-2">
            ${business.mobile ? `
            <a href="tel:${escapeHtml(business.mobile)}" class="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Call Us
            </a>
            ` : ''}
            ${business.whatsapp ? `
            <a href="https://wa.me/${escapeHtml(business.whatsapp.replace(/[^0-9]/g, ''))}" target="_blank" class="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main>
    <!-- Hero Section -->
    <section id="home" class="relative bg-gradient-to-br ${theme.primary} text-white py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.05\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center gap-12">
          ${business.logoUrl ? `
          <div class="flex-shrink-0">
            <img src="${escapeHtml(business.logoUrl)}" alt="${escapeHtml(business.businessName)}" class="w-40 h-40 md:w-56 md:h-56 object-contain rounded-2xl bg-white p-6 shadow-2xl ring-4 ring-white/20">
          </div>
          ` : `
          <div class="flex-shrink-0 w-40 h-40 md:w-56 md:h-56 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/20">
            <span class="text-white text-6xl md:text-7xl font-bold">${escapeHtml(business.businessName.charAt(0).toUpperCase())}</span>
          </div>
          `}
          <div class="flex-1 text-center md:text-left">
            <div class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              ${escapeHtml(business.category)}
            </div>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">${escapeHtml(business.businessName)}</h1>
            ${business.ownerName ? `<p class="text-xl md:text-2xl text-blue-100 mb-3 font-medium">Owner: ${escapeHtml(business.ownerName)}</p>` : ''}
            ${business.navbarTagline ? `<p class="text-lg md:text-xl text-blue-100 mb-8 italic">${escapeHtml(business.navbarTagline)}</p>` : ''}
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              ${business.mobile ? `
              <a href="tel:${escapeHtml(business.mobile)}" class="group px-8 py-4 bg-white ${theme.accent} rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <svg class="w-6 h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call Now
              </a>
              ` : ''}
              ${business.whatsapp ? `
              <a href="https://wa.me/${escapeHtml(business.whatsapp.replace(/[^0-9]/g, ''))}" target="_blank" class="group px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105">
                <svg class="w-6 h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <!-- About Section -->
      <section id="about" class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">About Us</h2>
        </div>
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 whitespace-pre-line leading-relaxed text-lg">${escapeHtml(business.description)}</p>
        </div>
        ${business.ownerName ? `
        <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-600">
          <p class="text-gray-700 font-semibold text-lg">
            <span class="text-blue-600">Owner:</span> ${escapeHtml(business.ownerName)}
          </p>
        </div>
        ` : ''}
      </section>

      <!-- YouTube Video -->
      ${embedUrl ? `
      <section class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Watch Our Video</h2>
        </div>
        <div class="aspect-video rounded-xl overflow-hidden shadow-xl">
          <iframe 
            src="${embedUrl}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
      </section>
      ` : ''}

      <!-- Gallery -->
      ${business.imagesUrl && business.imagesUrl.length > 0 ? `
      <section id="gallery" class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Our Gallery</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${business.imagesUrl.map(img => `
            <div class="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <img src="${escapeHtml(img)}" alt="Gallery image" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Services / Menu / Pricing Section -->
      ${business.services && business.services.length > 0 ? `
      <section id="services" class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Our Services</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${business.services.map((service, index) => `
            <div class="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${service.featured ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-gray-200'} transform hover:scale-105">
              ${service.featured ? `
              <div class="absolute top-4 right-4 z-10 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                ⭐ Featured
              </div>
              ` : ''}
              ${service.imageUrl ? `
              <div class="h-48 overflow-hidden">
                <img src="${escapeHtml(service.imageUrl)}" alt="${escapeHtml(service.title)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              </div>
              ` : `
              <div class="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <svg class="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              `}
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${escapeHtml(service.title)}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">${escapeHtml(service.description || '')}</p>
                ${service.price ? `
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span class="text-2xl font-bold text-purple-600">${escapeHtml(service.price)}</span>
                </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Special Offers / Deals Section -->
      ${business.specialOffers && business.specialOffers.length > 0 ? `
      <section id="offers" class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Special Offers</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${business.specialOffers.map((offer, index) => {
            const expiryDate = offer.expiryDate ? new Date(offer.expiryDate) : null;
            const now = new Date();
            const isExpired = expiryDate && expiryDate < now;
            const daysUntilExpiry = expiryDate ? Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24)) : null;
            const isUrgent = daysUntilExpiry !== null && daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
            
            return `
            <div class="relative p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 rounded-2xl border-2 ${isUrgent ? 'border-red-400 ring-2 ring-red-200' : 'border-orange-200'} shadow-lg hover:shadow-xl transition-all">
              ${isUrgent ? `
              <div class="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                🔥 Urgent!
              </div>
              ` : ''}
              ${isExpired ? `
              <div class="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                Expired
              </div>
              ` : ''}
              <h3 class="text-2xl font-bold text-gray-900 mb-3">${escapeHtml(offer.title)}</h3>
              <p class="text-gray-700 mb-4">${escapeHtml(offer.description || '')}</p>
              ${expiryDate && !isExpired ? `
              <div class="flex items-center gap-2 text-sm">
                <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-gray-600 font-medium">Expires: ${expiryDate.toLocaleDateString()}</span>
                ${daysUntilExpiry !== null ? `
                <span class="ml-auto px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold">
                  ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''} left
                </span>
                ` : ''}
              </div>
              ` : ''}
            </div>
            `;
          }).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Business Hours Section -->
      ${business.businessHours && Object.keys(business.businessHours).length > 0 ? `
      <section id="hours" class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Business Hours</h2>
            ${(() => {
              const now = new Date();
              const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
              const currentTime = now.getHours() * 100 + now.getMinutes();
              const todayHours = business.businessHours[currentDay];
              let isOpen = false;
              if (todayHours && todayHours.open) {
                const start = parseInt(todayHours.start.replace(':', ''));
                const end = parseInt(todayHours.end.replace(':', ''));
                isOpen = currentTime >= start && currentTime <= end;
              }
              return `
              <div class="mt-2 flex items-center gap-3">
                <div class="px-4 py-2 rounded-full font-bold text-sm ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                  ${isOpen ? '🟢 Open Now' : '🔴 Closed Now'}
                </div>
              </div>
              `;
            })()}
          </div>
        </div>
        <div class="space-y-3">
          ${['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
            const hours = business.businessHours[day];
            if (!hours) return '';
            const isOpen = hours.open;
            const now = new Date();
            const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
            const isToday = day === currentDay;
            
            return `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 ${isToday ? 'border-teal-400 bg-teal-50' : 'border-gray-200'}">
              <span class="text-lg font-semibold text-gray-800 capitalize">${day}</span>
              ${isOpen ? `
              <div class="flex items-center gap-3">
                <span class="text-gray-700 font-medium">${escapeHtml(hours.start)} - ${escapeHtml(hours.end)}</span>
                ${isToday ? '<span class="px-3 py-1 bg-teal-600 text-white rounded-full text-xs font-bold">Today</span>' : ''}
              </div>
              ` : `
              <span class="text-gray-400 italic">Closed</span>
              `}
            </div>
            `;
          }).join('')}
        </div>
      </section>
      ` : ''}

      <!-- Appointment / Booking Section -->
      ${business.appointmentSettings && business.appointmentSettings.contactMethod ? `
      <section id="booking" class="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border-2 border-pink-200">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Book an Appointment</h2>
        </div>
        <div class="max-w-2xl mx-auto">
          <p class="text-gray-700 text-lg mb-6 text-center">
            Ready to get started? Book your appointment now and we'll get back to you!
          </p>
          ${business.appointmentSettings.availableSlots && business.appointmentSettings.availableSlots.length > 0 ? `
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Available Time Slots</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              ${business.appointmentSettings.availableSlots.map(slot => `
                <div class="p-3 bg-white rounded-lg border-2 border-gray-200 text-center">
                  <p class="text-sm text-gray-500 mb-1">${escapeHtml(slot.label || '')}</p>
                  <p class="font-bold text-gray-900">${escapeHtml(slot.time || '')}</p>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
          <div class="text-center">
            ${business.appointmentSettings.contactMethod === 'whatsapp' && business.whatsapp ? `
            <a href="https://wa.me/${escapeHtml(business.whatsapp.replace(/[^0-9]/g, ''))}?text=${encodeURIComponent('Hello! I would like to book an appointment.')}" target="_blank" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Book via WhatsApp
            </a>
            ` : business.appointmentSettings.contactMethod === 'call' && business.mobile ? `
            <a href="tel:${escapeHtml(business.mobile)}" class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Call to Book
            </a>
            ` : ''}
          </div>
        </div>
      </section>
      ` : ''}

      <!-- Contact Section -->
      <section id="contact" class="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mb-12 border border-gray-100">
        <div class="flex items-center gap-4 mb-8">
          <div class="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Information -->
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              <p class="text-gray-600 mb-6">We'd love to hear from you. Reach out to us through any of the following channels.</p>
            </div>
            <div class="space-y-5">
              ${business.mobile ? `
              <div class="flex items-start gap-4 p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500 font-medium mb-1">Phone</p>
                  <a href="tel:${escapeHtml(business.mobile)}" class="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors">${escapeHtml(business.mobile)}</a>
                </div>
              </div>
              ` : ''}
              ${business.email ? `
              <div class="flex items-start gap-4 p-5 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100">
                <div class="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500 font-medium mb-1">Email</p>
                  <a href="mailto:${escapeHtml(business.email)}" class="text-lg font-bold text-indigo-600 hover:text-indigo-700 transition-colors break-all">${escapeHtml(business.email)}</a>
                </div>
              </div>
              ` : ''}
              ${business.whatsapp ? `
              <div class="flex items-start gap-4 p-5 bg-green-50 rounded-xl hover:bg-green-100 transition-colors border border-green-100">
                <div class="flex-shrink-0 w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500 font-medium mb-1">WhatsApp</p>
                  <a href="https://wa.me/${escapeHtml(business.whatsapp.replace(/[^0-9]/g, ''))}" target="_blank" class="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">${escapeHtml(business.whatsapp)}</a>
                </div>
              </div>
              ` : ''}
            </div>
          </div>

          <!-- Location Information -->
          <div class="space-y-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-800 mb-6">Visit Us</h3>
              <p class="text-gray-600 mb-6">Come and visit our location. We're always happy to welcome you!</p>
            </div>
            <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <div class="flex items-start gap-4 mb-6">
                <div class="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-500 font-medium mb-2">Address</p>
                  <p class="text-gray-800 font-semibold text-lg leading-relaxed">${escapeHtml(business.address)}</p>
                </div>
              </div>
              ${business.mapLink ? `
              <div class="space-y-4">
                <a href="${escapeHtml(business.mapLink)}" target="_blank" class="inline-flex items-center justify-center gap-3 w-full px-6 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  View on Google Maps
                </a>
                ${(() => {
                  // Try to extract embed URL from Google Maps link
                  let embedUrl = null;
                  if (business.mapLink.includes('google.com/maps')) {
                    // Extract place ID or coordinates from URL
                    const placeIdMatch = business.mapLink.match(/place\/([^\/]+)/);
                    const queryMatch = business.mapLink.match(/q=([^&]+)/);
                    if (placeIdMatch) {
                      embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d_s6q4Zb1L3uY&q=place_id:${placeIdMatch[1]}`;
                    } else if (queryMatch) {
                      embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d_s6q4Zb1L3uY&q=${encodeURIComponent(queryMatch[1])}`;
                    } else {
                      // Try to extract coordinates
                      const coordMatch = business.mapLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
                      if (coordMatch) {
                        embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d_s6q4Zb1L3uY&center=${coordMatch[1]},${coordMatch[2]}&zoom=15`;
                      }
                    }
                  }
                  // If it's already an embed URL, use it directly
                  if (business.mapLink.includes('google.com/maps/embed')) {
                    embedUrl = business.mapLink;
                  }
                  
                  return embedUrl ? `
                  <div class="mt-4 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                    <iframe 
                      src="${escapeHtml(embedUrl)}" 
                      width="100%" 
                      height="300" 
                      style="border:0;" 
                      allowfullscreen="" 
                      loading="lazy" 
                      referrerpolicy="no-referrer-when-downgrade"
                      class="w-full"
                    ></iframe>
                  </div>
                  ` : '';
                })()}
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-gradient-to-br ${theme.footer} text-gray-300 mt-16 border-t border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Business Info -->
        <div>
          <h3 class="text-white font-bold text-xl mb-4">${escapeHtml(business.businessName)}</h3>
          <p class="text-gray-400 mb-2 font-medium">${escapeHtml(business.category)}</p>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">${escapeHtml(business.address)}</p>
          ${business.footerDescription ? `<p class="text-gray-400 text-sm leading-relaxed italic border-l-2 border-blue-600 pl-4">${escapeHtml(business.footerDescription)}</p>` : ''}
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold text-lg mb-4">Quick Links</h4>
          <ul class="space-y-3">
            <li><a href="#home" class="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </a></li>
            <li><a href="#about" class="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              About
            </a></li>
            ${business.imagesUrl && business.imagesUrl.length > 0 ? `<li><a href="#gallery" class="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Gallery
            </a></li>` : ''}
            <li><a href="#contact" class="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Contact
            </a></li>
          </ul>
        </div>

        <!-- Contact & Social -->
        <div>
          <h4 class="text-white font-semibold text-lg mb-4">Connect With Us</h4>
          <div class="space-y-4 mb-6">
            ${business.mobile ? `
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <a href="tel:${escapeHtml(business.mobile)}" class="hover:text-blue-400 transition-colors duration-200 font-medium">${escapeHtml(business.mobile)}</a>
            </div>
            ` : ''}
            ${business.email ? `
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <a href="mailto:${escapeHtml(business.email)}" class="hover:text-blue-400 transition-colors duration-200 font-medium break-all">${escapeHtml(business.email)}</a>
            </div>
            ` : ''}
            ${business.whatsapp ? `
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <a href="https://wa.me/${escapeHtml(business.whatsapp.replace(/[^0-9]/g, ''))}" target="_blank" class="hover:text-green-400 transition-colors duration-200 font-medium">${escapeHtml(business.whatsapp)}</a>
            </div>
            ` : ''}
          </div>
          ${(business.socialLinks?.instagram || business.socialLinks?.facebook || business.socialLinks?.website) ? `
          <div class="flex gap-3">
            ${business.socialLinks.instagram ? `
            <a href="${escapeHtml(business.socialLinks.instagram)}" target="_blank" class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110" aria-label="Instagram">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            ` : ''}
            ${business.socialLinks.facebook ? `
            <a href="${escapeHtml(business.socialLinks.facebook)}" target="_blank" class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110" aria-label="Facebook">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            ` : ''}
            ${business.socialLinks.website ? `
            <a href="${escapeHtml(business.socialLinks.website)}" target="_blank" class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110" aria-label="Website">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
            </a>
            ` : ''}
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-400 text-base">
          © ${new Date().getFullYear()} <span class="font-semibold text-white">${escapeHtml(business.businessName)}</span>. All rights reserved.
        </p>
        <p class="text-gray-500 text-sm mt-3">
          Powered by <a href="https://varanasihub.com" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">VaranasiHub</a>
        </p>
      </div>
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    if (mobileMenuBtn && mobileMenu && menuIcon && closeIcon) {
      mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (menuIcon) menuIcon.classList.remove('hidden');
            if (closeIcon) closeIcon.classList.add('hidden');
          }
        }
      });
    });

    // Highlight active nav link on scroll
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('nav-active');
        }
      });
    });
  </script>
</body>
</html>
  `;
};

