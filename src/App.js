import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, BookOpen, Users, Globe, Award, Microscope, Leaf } from 'lucide-react';
import { ChevronLeft, Play, Pause } from 'lucide-react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

// ==================== Onboarding Animation ====================
const OnboardingAnimation = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    { icon: BookOpen, text: "Welcome to UEP", subtext: "Excellence in Education" },
    { icon: Users, text: "Join Our Community", subtext: "Connect & Grow Together" },
    { icon: Globe, text: "Global Opportunities", subtext: "Expand Your Horizons" },
    { icon: Award, text: "Achieve Excellence", subtext: "Unlock Your Potential" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 1500);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-700 z-50 flex items-center justify-center" style={{background: 'linear-gradient(135deg, #800000 0%, #a0002a 50%, #7a0029 100%)'}}>
      <div className="text-center text-white transform transition-all duration-500">
        <div className="mb-8 transform animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 inline-block">
            <CurrentIcon size={80} className="mx-auto text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          {steps[currentStep].text}
        </h1>
        <p className="text-xl md:text-2xl text-rose-100 animate-fade-in-delayed">
          {steps[currentStep].subtext}
        </p>
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-white shadow-lg' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== Navbar ====================
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    'HOME',
    'PROGRAMS',
    'STUDENT LIFE',
    'GLOBAL',
    'ALUMNI',
    'RESEARCH',
    'SUSTAINABILITY',
    'ABOUT UEP'
  ];

  return (
    <div className="w-full z-40 bg-white shadow-lg">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-rose-300" />
                <span className="hover:text-rose-200 transition-colors">info@uep.edu.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2 hover:text-rose-200 transition-colors">
                <Phone size={16} className="text-rose-300" />
                <div>
                  <div className="font-semibold">Binalonan</div>
                  <div className="text-xs">0927 440 8826</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 hover:text-rose-200 transition-colors">
                <Phone size={16} className="text-rose-300" />
                <div>
                  <div className="font-semibold">North Manila</div>
                  <div className="text-xs">0917 112 8724</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* First Row: UEP Logo + Text */}
          <div className="flex justify-center mb-4">
            <div className="flex-shrink-0 flex items-center group">
              <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white p-3 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
                <BookOpen className="h-8 w-8" />
              </div>
              <div className="ml-4 text-center">
                <div className="font-bold text-2xl text-gray-800">University of Eastern Pangasinan</div>
               
              </div>
            </div>
          </div>

          {/* Second Row: Navigation Links */}
          <div className="hidden lg:flex justify-center">
            <div className="flex items-center bg-gradient-to-r from-rose-800 to-red-900 rounded-2xl shadow-lg overflow-hidden">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`px-6 py-4 text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                    index === 0
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'text-rose-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 px-8 uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg">
                Enroll Now!
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex justify-center mt-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gradient-to-r from-rose-600 to-red-700 inline-flex items-center justify-center p-3 rounded-xl text-white hover:from-rose-500 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 mx-4">
            <div className="bg-gradient-to-r from-rose-800 to-red-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-rose-100 hover:text-white hover:bg-white/10 block px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 rounded-lg"
                  >
                    {item}
                  </a>
                ))}
                <div className="mt-6 px-4">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 uppercase tracking-wide transition-all duration-300 rounded-xl shadow-lg">
                    Enroll Now!
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};




// ==================== Hero Section ====================
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-rose-900 to-red-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-rose-500/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            right: '10%',
            bottom: '20%'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
        <div className="text-center w-full">
          <div className="mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-rose-200 text-sm font-medium mb-6">
              ✈️ Welcome to the Future of Education
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Shape Your Future at
            <span className="block bg-gradient-to-r from-rose-300 to-yellow-300 bg-clip-text text-transparent mt-2">
              University of Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-rose-100 max-w-4xl mx-auto leading-relaxed">
            Discover world-class education, groundbreaking research, and limitless opportunities 
            in our vibrant academic community where innovation meets tradition.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="group bg-white text-rose-900 font-bold py-4 px-8 rounded-full hover:bg-rose-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2">
              <span>Explore Programs</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white/50 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Virtual Tour</span>
            </button>
          </div>

          {/* Floating Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15K+', label: 'Students' },
              { number: '200+', label: 'Faculty' },
              { number: '50+', label: 'Programs' },
              { number: '95%', label: 'Employment Rate' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-rose-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
    </div>
  );
};

// ==================== Image Carousel ====================
const ImageCarousel = () => {
  const images = [
    {
      src: "https://picsum.photos/id/1011/1200/600",
      title: "Mountain Landscape",
      description: "Breathtaking mountain views at golden hour"
    },
    {
      src: "https://picsum.photos/id/1015/1200/600", 
      title: "Forest Path",
      description: "A serene walk through autumn woods"
    },
    {
      src: "https://picsum.photos/id/1016/1200/600",
      title: "Ocean Waves",
      description: "Peaceful ocean waves meeting the shore"
    },
    {
      src: "https://picsum.photos/id/1018/1200/600",
      title: "Urban Architecture", 
      description: "Modern city skyline at twilight"
    },
    {
      src: "https://picsum.photos/id/1025/1200/600",
      title: "Desert Landscape",
      description: "Vast desert dunes under starlit sky"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length, isPlaying]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto h-[600px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Container */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
              index === current 
                ? "opacity-100 scale-100" 
                : index === (current - 1 + images.length) % images.length
                ? "opacity-0 scale-110 -translate-x-full"
                : "opacity-0 scale-95 translate-x-full"
            }`}
          >
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Content Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 p-8 text-white transform transition-all duration-700 ${
              index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}>
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">{img.title}</h3>
              <p className="text-lg text-gray-200 drop-shadow-md">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } hover:scale-110 active:scale-95`}
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className={`absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } hover:scale-110 active:scale-95`}
      >
        <ChevronRight size={24} />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className={`absolute top-6 right-6 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } hover:scale-110 active:scale-95`}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Enhanced Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
          >
            {/* Progress Ring */}
            <div className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
              index === current 
                ? "border-white bg-white/20 backdrop-blur-sm scale-110" 
                : "border-white/50 hover:border-white/80 hover:scale-105"
            }`}>
              {index === current && (
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
              )}
            </div>
            
            {/* Thumbnail */}
            <img 
              src={images[index].src}
              alt={`Thumbnail ${index}`}
              className={`absolute inset-1 w-10 h-10 rounded-full object-cover transition-all duration-300 ${
                index === current ? "opacity-100" : "opacity-70 group-hover:opacity-90"
              }`}
            />
            
            {/* Tooltip */}
            <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}>
              {images[index].title}
            </div>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ease-linear"
          style={{ 
            width: `${((current + 1) / images.length) * 100}%`,
            animation: isPlaying ? 'none' : 'none'
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className={`absolute top-6 left-6 bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-300 ${
        isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}>
        <span className="text-lg font-semibold">{current + 1}</span>
        <span className="text-sm text-gray-300 mx-1">/</span>
        <span className="text-sm text-gray-300">{images.length}</span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-20 left-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-lg" />
      </div>
    </div>
  );
};

// ==================== Feature Card ====================
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up overflow-hidden border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-100 to-red-100 rounded-2xl mb-6 group-hover:from-rose-200 group-hover:to-red-200 transition-all duration-300">
          <Icon className={`h-8 w-8 text-rose-600 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-rose-700 transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
        <div className="flex items-center text-rose-600 hover:text-rose-800 font-semibold group cursor-pointer">
          <span className="mr-2">Learn more</span>
          <ChevronRight size={20} className={`transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
        </div>
      </div>
      <div className={`h-1 bg-gradient-to-r from-rose-500 to-red-600 transform origin-left transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
};

// ==================== Main Content ====================
const MainContent = () => {
  const features = [
    { icon: BookOpen, title: "Academic Excellence", description: "World-renowned faculty and cutting-edge curriculum designed to prepare you for tomorrow's challenges with innovative teaching methods." },
    { icon: Users, title: "Vibrant Community", description: "Join a diverse community of students, researchers, and innovators from around the globe, fostering lifelong connections." },
    { icon: Globe, title: "Global Opportunities", description: "Study abroad programs, international partnerships, and global career placement services to expand your horizons." },
    { icon: Microscope, title: "Research Innovation", description: "State-of-the-art facilities and groundbreaking research opportunities across all disciplines with cutting-edge technology." },
    { icon: Award, title: "Career Success", description: "Comprehensive career services and strong alumni network to launch your professional journey with confidence." },
    { icon: Leaf, title: "Sustainability Focus", description: "Leading the way in environmental responsibility and sustainable campus practices for a better tomorrow." }
  ];

  return (
    <div className="bg-gray-50">
      {/* Image Carousel Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-rose-100 to-red-100 rounded-full px-6 py-2 text-rose-700 text-sm font-semibold mb-4">
              Campus Life
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Our Campus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a visual journey through our beautiful campus and see where your future unfolds.
            </p>
          </div>
          <ImageCarousel />
        </div>
      </div>
      
      {/* Why Choose UEP Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-rose-100 to-red-100 rounded-full px-6 py-2 text-rose-700 text-sm font-semibold mb-4">
              Excellence in Education
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose UEP?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our university a leader in higher education and student success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Contact Us ====================
const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    originSchool: "",
    facebook: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! ✅ " + JSON.stringify(form, null, 2));
  };

  return (
    <div className="relative bg-gradient-to-br from-rose-900 via-red-900 to-gray-900 text-white py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title + Subtitle */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-rose-200 text-sm font-semibold mb-4">
            ✈️ Visit Our Campus
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Contact Us
          </h2>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed">
            LOOK UP! ✈️ Get an up-close, hands-on feel of the Aerotropolis.  
            Visit us from <strong>Monday to Saturday, 8am to 4pm</strong> and have an aero experience!
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="group">
              <label className="block text-sm font-semibold mb-3 text-rose-100 group-focus-within:text-white transition-colors">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-semibold mb-3 text-rose-100 group-focus-within:text-white transition-colors">Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div className="group">
              <label className="block text-sm font-semibold mb-3 text-rose-100 group-focus-within:text-white transition-colors">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                placeholder="+63 912 345 6789"
              />
            </div>

            {/* Address */}
            <div className="group">
              <label className="block text-sm font-semibold mb-3 text-rose-100 group-focus-within:text-white transition-colors">Address *</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                placeholder="Your complete address"
              />
            </div>

            {/* Origin School */}
            <div className="group">
              <label className="block text-sm font-semibold mb-3 text-rose-100 group-focus-within:text-white transition-colors">Origin School</label>
              <input
                type="text"
                name="originSchool"
                value={form.originSchool}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                placeholder="Previous school or institution"
              />
            </div>

            {/* Facebook */}
            <div className="group">
              <label className="block text-sm font-semibold mb-3 text-rose-100 group-focus-within:text-white transition-colors">Facebook Account</label>
              <input
                type="text"
                name="facebook"
                value={form.facebook}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-2xl bg-white/90 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all duration-300 shadow-lg"
                placeholder="Facebook profile or page"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-8">
              <button
                type="submit"
                className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 px-12 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Submit Application</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==================== News & Events ====================
const NewsAndEvents = () => {
  const events = [
    {
      id: 1,
      title: "UEP Aviation Week 2025 ✈️",
      date: "September 20, 2025",
      description: "A week-long celebration with exhibits, talks, and interactive aero experiences.",
      image: "https://source.unsplash.com/600x400/?airplane,airport",
      category: "Event"
    },
    {
      id: 2,
      title: "Open House for Senior High & College",
      date: "October 5, 2025",
      description: "Future students are welcome to tour our facilities and meet instructors.",
      image: "https://source.unsplash.com/600x400/?students,school",
      category: "Admission"
    },
    {
      id: 3,
      title: "LOOK UP! Campus Tour",
      date: "October 15, 2025",
      description: "Experience the Aerotropolis up close with guided tours and workshops.",
      image: "https://source.unsplash.com/600x400/?tour,aviation",
      category: "Tour"
    },
    {
      id: 4,
      title: "Innovation & Research Expo",
      date: "November 2, 2025",
      description: "Showcasing student-led research projects and innovations across various fields.",
      image: "https://source.unsplash.com/600x400/?technology,research",
      category: "Research"
    },
    {
      id: 5,
      title: "UEP Cultural Festival 🎭",
      date: "November 15, 2025",
      description: "Celebrate Pangasinan's heritage with performances, exhibits, and food fairs.",
      image: "https://source.unsplash.com/600x400/?festival,culture",
      category: "Cultural"
    },
    {
      id: 6,
      title: "Alumni Homecoming 2025 🎓",
      date: "December 10, 2025",
      description: "Reconnect with classmates, faculty, and celebrate UEP's legacy of excellence.",
      image: "https://source.unsplash.com/600x400/?alumni,celebration",
      category: "Alumni"
    }
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="relative bg-white py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-rose-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-rose-100 to-red-100 rounded-full px-6 py-2 text-rose-700 text-sm font-semibold mb-4">
            Stay Connected
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings, events, and announcements at UEP.
          </p>
        </div>

        {/* Grid of News/Events */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:scale-105"
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-rose-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {event.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                  <p className="text-sm text-rose-600 font-semibold">{event.date}</p>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-rose-700 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>
                <button className="flex items-center text-rose-600 font-semibold hover:text-rose-800 transition-colors group">
                  <span className="mr-2">Read More</span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-300 ${
                      hoveredCard === event.id ? 'translate-x-2' : ''
                    }`} 
                  />
                </button>
              </div>
              
              <div className={`h-1 bg-gradient-to-r from-rose-500 to-red-600 transform origin-left transition-transform duration-500 ${
                hoveredCard === event.id ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            View All Events
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== Footer ====================
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-rose-900 to-red-900 text-gray-300 pt-20 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Column 1 - About */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white p-3 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">University of Eastern Pangasinan</h3>
              <p className="text-rose-200 text-sm">Aeronautical & Technological College</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6">
            The University of Eastern Pangasinan (UEP) is dedicated to shaping the future
            of learners through academic excellence, innovation, and hands-on experience.  
            Located in Binalonan, Pangasinan, UEP is a hub of opportunities and growth,
            preparing students for global competitiveness.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="bg-rose-600/20 hover:bg-rose-600 p-3 rounded-xl transition-all duration-300 group">
              <Facebook className="w-5 h-5 text-rose-300 group-hover:text-white" />
            </a>
            <a href="#" className="bg-rose-600/20 hover:bg-rose-600 p-3 rounded-xl transition-all duration-300 group">
              <Twitter className="w-5 h-5 text-rose-300 group-hover:text-white" />
            </a>
            <a href="#" className="bg-rose-600/20 hover:bg-rose-600 p-3 rounded-xl transition-all duration-300 group">
              <Instagram className="w-5 h-5 text-rose-300 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3">
            {['About UEP', 'Admissions', 'Academics', 'News & Events', 'Contact Us'].map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-400 hover:text-rose-300 transition-colors duration-300 flex items-center group">
                  <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-6">Contact Information</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <MapPin className="w-5 h-5 text-rose-400 mt-1 group-hover:text-rose-300 transition-colors" />
              <div>
                <p className="text-white font-medium">Main Campus</p>
                <p className="text-gray-400 text-sm">University of Eastern Pangasinan<br />Binalonan, Pangasinan, Philippines</p>
              </div>
            </li>
            <li className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-rose-400 group-hover:text-rose-300 transition-colors" />
              <div>
                <a href="tel:+639274408826" className="text-gray-400 hover:text-rose-300 transition-colors">
                  Binalonan: 0927 440 8826
                </a>
                <br />
                <a href="tel:+639171128724" className="text-gray-400 hover:text-rose-300 transition-colors">
                  North Manila: 0917 112 8724
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-rose-400 group-hover:text-rose-300 transition-colors" />
              <a href="mailto:info@uep.edu.com" className="text-gray-400 hover:text-rose-300 transition-colors">
                info@uep.edu.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 mt-16 pt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} University of Eastern Pangasinan. All Rights Reserved.</p>
          <p className="text-rose-300 text-sm mt-2 md:mt-0">Developed with ❤️ for the future leaders of Pangasinan.</p>
        </div>
      </div>
    </footer>
  );
};

// ==================== App ====================
const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {showOnboarding && (
        <OnboardingAnimation onComplete={() => setShowOnboarding(false)} />
      )}
      
      <div className={showOnboarding ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />
        <HeroSection />
        <MainContent />
        <ContactUs /> 
        <NewsAndEvents /> 
        <Footer />  
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.5s both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #e11d48, #be123c);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #be123c, #9f1239);
        }
      `}</style>
    </div>
  );
};

export default App;