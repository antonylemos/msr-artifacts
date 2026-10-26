// src/pages/marketplace/AppDetailsPage.jsx
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAuthStore } from '../../stores/authStore.js';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api.js';  
import {
  StarIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon,
  InformationCircleIcon, EyeIcon, PencilIcon, DocumentTextIcon, CheckCircleIcon,
  ChevronDownIcon as ChevronDownSolid, // For App Terms dropdown
  ArrowUpOnSquareIcon, // For "Rate this app" link
  MagnifyingGlassPlusIcon ,
  ArrowLeftIcon ,
  ArrowRightIcon ,
  ShoppingCartIcon 
} from '@heroicons/react/24/solid'; 



// --- Dummy Data (Same as before, ensure it's complete for all sections) ---
const appDetailsData = {
  id: 'whatsapp-business',
  name: 'WhatsApp Business',
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png',
  shortDescription: 'Manage your chats with WhatsApp customers in the LiveChat app',
  isVerified: true,
  rating: 4.6,
  reviewCount: 69,
  developer: 'LiveChat Integrations',
  developerLink: '#',
  worksWith: 'LiveChat',
  getButtonText: 'Get',
  getButtonLink: '#',
  overview: {
   media : [
  {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://via.placeholder.com/1280x720/2d3748/ffffff?text=WhatsApp+Business+Demo+Video',
  },
  {
    type: 'image',
    src: 'https://via.placeholder.com/1280x720/4A5568/ffffff?text=Feature+Showcase+1',
    alt: 'App screenshot 1: Forget about your phone',
    zoomable: true,
  },
  {
    type: 'image',
    src: 'https://via.placeholder.com/1280x720/718096/ffffff?text=Feature+Showcase+2',
    alt: 'App screenshot 2: Use available file formats',
    zoomable: true,
  },
  {
    type: 'image',
    src: 'https://via.placeholder.com/1280x720/A0AEC0/ffffff?text=Feature+Showcase+3',
    alt: 'App screenshot 3: Route chats seamlessly',
    zoomable: true,
  },
],
    scrollIndicatorText: [
      "WhatsApp Business Integration Video",
      "Forget about your phone. All you need is your phone number.",
      "Use available file formats to solve problems in a flash.",
      "Route chats to dedicated agents for seamless communication."
    ],
    mainDescription: `Shorten your customer's path to your business\n\nCan your customers reach you in a few seconds using WhatsApp? Can you reach them?\nRegardless of your answer, this integration can help you grow your business whether you already use WhatsApp as your communication channel or want to start using it. How?\nWhatsApp has over 2.4 billion users who send 100 billion messages daily; you can be sure that among them are the potential customers that will help you create new business opportunities. But when you integrate WhatsApp with LiveChat, you can also:\n\n- save money and time, as with this integration, you onboard yourself in minutes\n- answer your customers faster, as you see their messages in the LiveChat app, and you can answer using template messages\n- boost your sales by sending your customers marketing campaigns, discount codes, etc.\n\n#Stable and safe\nOur integration uses the official WhatsApp Business API compliant with the WhatsApp Terms of Service. It's perfect for handling both a few conversations and multiple WhatsApp chats. No app crashes during talks!\n\nSuitable for all-sizes businesses with no risk at all\n\nChoose one of the three plans that best suits your business’s needs. Whether you own a small business or work in a corporation, we have something for everyone. And the best part is that the best part is that we offer a 14-day Money-Back Guarantee. So you can try WhatsApp Business for 14 days, and if you’re not 100% satisfied, we will refund the money you paid for the plan!\n\nConvenience and effective communication\n\nIf you’ve ever used WhatsApp, you know a phone connected to the internet is essential. With this integration, it's different. All you need is a phone number to connect to your WhatsApp Business account, which many support agents can simultaneously service.\nYou can also route WhatsApp messages to a group of agents dedicated to WhatsApp chats or connect more phone numbers to your account. All for the comfort of your business.`
  },
  keyFeatures: [
    { title: 'Official WhatsApp Business API', description: 'Say goodbye to unstable integrations from unofficial providers and use the Integration compliant with the WhatsApp terms of service.' },
    { title: 'Group routing', description: 'Assign WhatsApp chats to a group of agents dedicated to this channel for seamless communication.' },
    { title: 'Support for the most popular file formats', description: 'Solve customers\' problems in a flash using the most popular file formats like photos, voice messages, location, and more.' },
    { title: 'Plan tailored to your needs', description: 'You can choose the best plan for you, whether your business best and pay only for the features you need.' },
  ],
  benefits: [
    { title: 'No more app crashes', description: 'The use of the official WhatsApp Business API makes the integration robust and stable.' },
    { title: 'Suitable for businesses of all sizes', description: 'You can choose the best plan for you, whether a small business or an enterprise, the integration guarantees high performance regardless of traffic.' },
    { title: 'Chats that won’t fade away', description: 'The integration’s design and implementation eliminate disconnections and delays. You’re at no risk of losing chats.' },
    { title: 'Better customer experience', description: 'You respond faster by managing WhatsApp chats with customers in the LiveChat app.' },
    { title: 'New business opportunities', description: 'You can send a message on WhatsApp to many customers simultaneously, create marketing campaigns, send promo codes, etc.' },
    { title: 'Money Back Guarantee', description: 'With WhatsApp Business integration, you get a 14-day Money-Back Guarantee, so trying this app is a ‘no risk, tone of fun’ experience.' },
  ],
  appTerms: {
    legalText: "By installing this app, you agree to the Marketplace Terms, App Privacy Policy and Scopes listed in this section.",
    scopes: [
      { title: 'View', details: 'Agents, Groups', isOpen: false },
      { title: 'Edit', details: 'Subscription, Chats, Customers, Settings, Webhooks and integrations', isOpen: false },
    ]
  },
  reviews: {
    averageRating: 4.6, totalReviews: 69,
    breakdown: [ {stars: 5, count: 50}, {stars: 4, count: 10}, {stars: 3, count: 5}, {stars: 2, count: 2}, {stars: 1, count: 2} ],
    userReviews: [
      { id: 'r1', name: 'Chigozieigboke36', rating: 5, comment: 'That is awesome', date: 'A month ago', avatarUrl: 'https://via.placeholder.com/40/A0AEC0/FFFFFF?text=C' },
      { id: 'r2', name: 'md rubel ali', rating: 5, comment: 'Must better', date: '2 months ago', avatarUrl: 'https://via.placeholder.com/40/CBD5E0/FFFFFF?text=M' },
      { id: 'r3', name: 'AD558844884', rating: 5, comment: ':)', date: 'A month ago', avatarUrl: 'https://via.placeholder.com/40/E2E8F0/FFFFFF?text=A' },
      { id: 'r4', name: 'Candem', rating: 5, comment: 'Simply great! I connected my number in minutes, and the possibility to send proactive messages in WhatsApp is a lifesaver!', date: '3 months ago', avatarUrl: 'https://via.placeholder.com/40/EDF2F7/FFFFFF?text=C' },
    ]
  },
  support: {
    howToUse: "Follow the app tutorial with setup instructions on how to use and properly configure this app with your LiveChat account. To get help and support contact LiveChat Integrations. You can also suggest improvements or request new features in the upcoming versions of WhatsApp Business.",
    appTutorialLink: "#",
    contactIntegrationsLink: "#",
    footerNote: "In LiveChat, we always appreciate creative and problem-solving apps, so at our own sole discretion, from time to time, we may grant some applications the “Verified” status (represented by a badge or so-called badged applications). The „Verified” status confirms only that an application went through our usability review from the user’s perspective. In any case, it is the Application Provider who has full responsibility for the application and its security level towards clients and any other third party."
  }
};


// --- End Dummy Data ---


// --- Image Carousel/Slider Component (Peek-a-boo style) ---
const ImageCarousel = ({ media, scrollIndicatorText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const sliderContainerRef = useRef(null);

  const slideTo = (index) => {
    if (sliderContainerRef.current && media.length > 0) {
      const targetElement = sliderContainerRef.current.children[index];
      if (targetElement) {
        // Calculate offset to center the target element if possible
        const containerWidth = sliderContainerRef.current.offsetWidth;
        const targetWidth = targetElement.offsetWidth;
        const scrollLeft = targetElement.offsetLeft - (containerWidth / 2) + (targetWidth / 2);
        
        sliderContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
    setCurrentIndex(index);
  };

  const handleNext = useCallback(() => {
    slideTo((currentIndex + 1) % media.length);
  }, [currentIndex, media.length, slideTo]);

  const handlePrev = useCallback(() => {
    slideTo((currentIndex - 1 + media.length) % media.length);
  }, [currentIndex, media.length, slideTo]);
  
  useEffect(() => { // Initial slide to center
      slideTo(currentIndex);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (!media || media.length === 0) return null;

  return (
    <div className="relative mb-6">
      {/* Main Media Display - Container for the slides */}
      <div className="overflow-hidden relative group rounded-lg">
        <div
          ref={sliderContainerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide py-2 -mx-2 px-2" // scrollbar-hide for cleaner look
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {media.map((item, index) => (
            <div
              key={item.src || index}
              className="snap-center flex-shrink-0 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] aspect-[16/9] bg-gray-100 relative rounded-md shadow-md mx-2 first:ml-0 last:mr-0 transition-transform duration-300"
              style={{ transform: index === currentIndex ? 'scale(1)' : 'scale(0.9)', opacity: index === currentIndex ? 1 : 0.7 }}
            >
              {item.type === 'video' ? (
                <video
                  className="w-full h-full object-cover rounded-md"
                  controls={index === currentIndex}
                  poster={item.poster}
                  autoPlay={index === currentIndex}
                  muted
                  loop={index === currentIndex}
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-md" // object-cover for images too
                  onClick={() => item.zoomable && setZoomedImage(item.src)}
                />
              )}
              {item.type === 'image' && item.zoomable && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-opacity cursor-pointer"
                  onClick={() => setZoomedImage(item.src)}
                >
                  <MagnifyingGlassPlusIcon className="w-12 h-12 text-white opacity-0 hover:opacity-75 transition-opacity" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and Scroll Indicator */}
      <div className="mt-3 flex justify-between items-center">
        <button onClick={handlePrev} className="p-2.5 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50" disabled={currentIndex === 0}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <p className="text-sm text-gray-700 font-medium text-center mx-4 flex-1 truncate" title={scrollIndicatorText[currentIndex]}>
          {scrollIndicatorText[currentIndex]}
        </p>
        <button onClick={handleNext} className="p-2.5 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50" disabled={currentIndex === media.length - 1}>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[100] p-4" onClick={() => setZoomedImage(null)}>
          <button onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }} className="absolute top-6 right-6 text-white hover:text-gray-300 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full transition-colors">
            <XMarkIcon className="w-7 h-7" />
          </button>
          <img src={zoomedImage} alt="Zoomed app screenshot" className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  );
};


// --- App Term Scope Item ---
const ScopeItem = ({ title, details, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none">
                <span className="font-semibold text-gray-700">{title}</span>
                <ChevronDownSolid className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 border-t border-gray-200 text-gray-600 text-sm bg-white">{details}</div>}
        </div>
    );
};

// --- Safe rating formatter helper ---
const formatRating = (rating) => {
  const numericRating = parseFloat(rating);
  return !isNaN(numericRating) ? numericRating.toFixed(1) : '0.0';
};

// --- Main Page Component ---
const AppDetailsPage = () => {
  const { appId } = useParams(); // This gets 'app1' or 'whatsapp-business' from the URL
  const { user, setUser: updateUserInStore } = useAuthStore();
  const navigate = useNavigate(); // For navigation
  const [activeSectionId, setActiveSectionId] = useState('overview'); // Default to overview section

  const [app, setApp] = useState(null); // Will hold fetched app data
  const [isLoading, setIsLoading] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

const navItems = useMemo(() => [ // Keep navItems static or derive if app structure varies wildly
    { id: 'overview', label: 'Overview' }, { id: 'keyFeatures', label: 'Key Features' },
    { id: 'benefits', label: 'Benefits' }, { id: 'appTerms', label: 'App Terms' },
    { id: 'reviews', label: 'Reviews' }, { id: 'support', label: 'Support' },
  ], []);


  
  const sectionRefs = useRef(navItems.reduce((acc, item) => {
    acc[item.id] = React.createRef();
    return acc;
  }, {}));

 

  useEffect(() => {
    navItems.forEach(item => {
      sectionRefs.current[item.id] = React.createRef();
    });
  }, [navItems]);

   // --- Fetch App Details from API ---
  useEffect(() => {
    if (!appId) {
      toast.error("App ID is missing.");
      setIsLoading(false);
      setApp(null);
      return;
    }

    const fetchAppData = async () => {
      setIsLoading(true);
      try {
        const appDataFromApi = await api.getAppDetails(appId); // API call
        if (appDataFromApi) {
          setApp(appDataFromApi);
          const alreadyInstalled = user?.installedModules?.some(m => m.id === appId);
          setIsInstalled(!!alreadyInstalled);
        } else {
          setApp(null);
          toast.error(`App "${appId}" not found.`);
        }
      } catch (error) {
        console.error(`Failed to fetch app details for ${appId}:`, error);
        toast.error(error.response?.data?.message || `Could not load details for app "${appId}".`);
        setApp(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppData();
  }, [appId, user?.installedModules]); // Re-fetch if appId changes or user's installed modules change
  

 useEffect(() => {
  if (app && user?.installedModules) { // app is the fetched details of the current app
    const alreadyInstalled = user.installedModules.some(m => m.id === app.id);
    setIsInstalled(alreadyInstalled);
  }
}, [app, user?.installedModules]);


  
  const handleInstallApp = async () => {
  if (!app || !user?.organizationId) {
    toast.error("Cannot install app. App or organization information missing.");
    return;
  }

  // First check if already installed
  const isAlreadyInstalled = user.installedModules?.some(m => m.id === app.id);
  if (isAlreadyInstalled) {
    const moduleConfig = user.installedModules.find(m => m.id === app.id);
    if (moduleConfig?.uiComponents?.settings?.path) {
      navigate(moduleConfig.uiComponents.settings.path);
      return;
    } else {
      toast.info(`${app.name} is already installed.`);
      return;
    }
  }

  setIsInstalling(true);
  try {
    const installationResponse = await api.installOrganizationModule({ 
      moduleId: app.id,
      organizationId: user.organizationId 
    });
    
    toast.success(`${app.name} installed successfully!`);
    setIsInstalled(true);

    // Refresh user profile
    try {
      const profileResponse = await api.getAuthProfile();
      if (profileResponse?.profile) {
        updateUserInStore(profileResponse.profile);
        
        // Navigate to appropriate page
        const newModuleConfig = profileResponse.profile.installedModules?.find(m => m.id === app.id);
        if (newModuleConfig?.uiComponents?.settings?.path) {
          navigate(newModuleConfig.uiComponents.settings.path);
        }
      }
    } catch (profileError) {
      console.error("Failed to refresh profile:", profileError);
      toast.warning("Please refresh the page to see updated modules.");
    }

  } catch (error) {
    // Handle specific error cases
    if (error.response?.status === 409) {
      toast.info(`${app.name} is already installed for this organization.`);
      setIsInstalled(true);
    } else {
      console.error(`Failed to install ${app.name}:`, error);
      toast.error(error.response?.data?.message || `Failed to install ${app.name}.`);
    }
  } finally {
    setIsInstalling(false);
  }
};


  const handleNavClick = useCallback((sectionId) => {
    const headerOffset = 120; // Adjust this based on your sticky header(s) height
    const element = sectionRefs.current[sectionId]?.current;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => { // Intersection Observer for active nav item
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 });
    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach(ref => { if (ref.current) observer.observe(ref.current); });
    return () => Object.values(currentRefs).forEach(ref => { if (ref.current) observer.unobserve(ref.current); });
  }, [app]); // Re-run if app data changes, ensuring refs are attached


const renderSectionContent = (sectionId) => {
  if (!app) return <p className="text-gray-500">Loading section content...</p>;

  const totalStars = 5;

  switch (sectionId) {
    case 'overview':
      return app.overview?.mainDescription ? (
        <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
          {app.overview.mainDescription.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (index === 0) {
              return (
                <p key={index} className="text-lg text-gray-800 font-semibold mb-6">
                  {trimmed}
                </p>
              );
            }

            if (trimmed.startsWith('#')) {
              return (
                <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4 !leading-tight">
                  {trimmed.substring(1)}
                </h2>
              );
            }

            return trimmed.split('\n').map((line, lineIdx) => (
              <p key={`${index}-${lineIdx}`} className="my-4">
                {line.replace(/^- /gm, '• ').trim()}
              </p>
            ));
          })}
        </div>
      ) : (
        <p className="text-gray-500">Overview not available for this app.</p>
      );

    case 'keyFeatures':
      return app.keyFeatures?.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {Array.isArray(app.keyFeatures) && app.keyFeatures.map((feature, idx) => (
            <div key={idx} className="relative pl-10 group">
              <div className="absolute left-0 top-0 w-1.5 h-full bg-yellow-400 rounded-r-sm transition-all duration-300 group-hover:bg-yellow-500" />
              <h4 className="text-lg font-semibold text-gray-800 mb-1.5 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Key features not detailed for this app.</p>
      );

    case 'benefits':
      return app.benefits?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {app.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
            >
              <h4 className="text-md font-semibold text-gray-800 mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Benefits not detailed for this app.</p>
      );

    case 'appTerms':
      return app.appTerms ? (
        <div className="max-w-3xl">
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-8 text-sm">
            <InformationCircleIcon className="w-5 h-5 text-slate-500 inline-block mr-2 align-middle relative -top-px" />
            <span className="text-slate-700 leading-relaxed">{app.appTerms.legalText}</span>
          </div>
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Scopes</h4>
          <p className="text-sm text-gray-600 mb-6">
            Installing {app.name} will give the developer access to:
          </p>
          <div className="space-y-4">
            {app.appTerms.scopes?.map((scope) => (
              <ScopeItem
                key={scope.title}
                title={scope.title}
                details={scope.details}
                defaultOpen={scope.isOpen ?? false}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">App terms not available for this app.</p>
      );

    case 'reviews':
      const reviewsToShow = app.reviews?.userReviews?.slice(0, 4) || [];
      return app.reviews && reviewsToShow.length > 0 ? (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center mb-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-center sm:text-left sm:mr-8 mb-4 sm:mb-0">
              <span className="text-6xl font-bold text-gray-800">
                {app.reviews.averageRating?.toFixed(1) || 'N/A'}
              </span>
              <p className="text-sm text-gray-500 mt-1">out of 5</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-7 h-7 ${
                      i < Math.round(app.reviews.averageRating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-base text-gray-600 text-center sm:text-left mt-1.5">
                {app.reviews.totalReviews || 0} Ratings
              </p>
            </div>

            {app.reviews.breakdown?.length > 0 && (
              <div className="w-full sm:w-auto lg:w-1/3 mt-6 sm:mt-0 sm:ml-auto space-y-1">
                {app.reviews.breakdown
                  .sort((a, b) => b.stars - a.stars)
                  .map((item) => (
                    <div key={item.stars} className="flex items-center text-xs">
                      <span className="text-gray-500 w-10 text-right pr-2">{item.stars} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-400 h-2.5 rounded-full"
                          style={{
                            width: `${(item.count / app.reviews.totalReviews) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-gray-500 w-10 text-left pl-2 tabular-nums">{item.count}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="mb-10 text-center">
            <h4 className="text-md font-semibold text-gray-700 mb-2">How would you rate this app?</h4>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-7 h-7 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors"
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {reviewsToShow.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={
                      review.avatarUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        review.name
                      )}&background=random&color=fff&size=128`
                    }
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-semibold text-sm text-gray-800">{review.name}</h5>
                    <div className="flex items-center my-0.5">
                      {[...Array(totalStars)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed ml-[52px]">{review.comment}</p>
              </div>
            ))}
          </div>

          {app.reviews.userReviews.length > 4 && (
            <button className="mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors py-2 px-4 border border-indigo-200 rounded-md hover:bg-indigo-50">
              Show all {app.reviews.totalReviews} reviews
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No reviews available for this app yet.</p>
      );

    case 'support':
      return app.support ? (
        <div className="space-y-10 max-w-3xl">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center gap-x-8 gap-y-5">
            <InformationCircleIcon className="w-12 h-12 text-slate-400 flex-shrink-0 hidden sm:block" />
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">How to use this app</h4>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed">{app.support.howToUse}</p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto lg:self-start pt-1">
              {app.support.appTutorialLink && (
                <a
                  href={app.support.appTutorialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto text-center px-6 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap shadow-sm"
                >
                  App tutorial
                </a>
              )}
              {app.support.contactIntegrationsLink && (
                <a
                  href={app.support.contactIntegrationsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-auto text-center px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm"
                >
                  Contact Integrations
                </a>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed pt-6 border-t border-gray-200">
            {app.support.footerNote}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Support information not available for this app.</p>
      );

    default:
      return null;
  }
};


  if (isLoading) return <div className="flex-1 flex items-center justify-center p-10 text-gray-600"><p>Loading app details...</p></div>;
  if (!app) return <div className="flex-1 flex items-center justify-center p-10 text-gray-600"><p>App not found or an error occurred.</p></div>;


    const getButtonConfig = () => {
  // Default configuration
  let config = {
    text: isInstalling ? "Installing..." : "Get",
    action: handleInstallApp,
    disabled: isInstalling
  };

  // Check if user and installedModules exist
  if (isInstalled && user?.installedModules) {
    const moduleConfig = user.installedModules.find(m => m.id === app.id);
    
    if (moduleConfig?.uiComponents?.settings?.path) {
      config = {
        text: "Configure",
        action: () => navigate(moduleConfig.uiComponents.settings.path),
        disabled: false
      };
    } else {
      config = {
        text: "Installed",
        action: () => toast.info("App is installed. Configuration might be elsewhere or not applicable."),
        disabled: true
      };
    }
  }

  return config;
};

const buttonConfig = getButtonConfig();

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Breadcrumbs & Cart */}
      <div className="px-6 py-3 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-30 h-[61px]">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex items-center">
            <li className="flex items-center"><Link to="/apps/explore" className="hover:underline">Explore apps</Link></li>
            <li className="flex items-center mx-2"><ChevronRightIcon className="w-3.5 h-3.5" /></li>
            {/* Assuming category is available or fetched with app details */}
            <li className="flex items-center"><Link to={`/apps/category/${(app.category || 'general').toLowerCase().replace(' ', '-')}`} className="hover:underline">{app.category || 'General'}</Link></li>
            <li className="flex items-center mx-2"><ChevronRightIcon className="w-3.5 h-3.5" /></li>
            <li className="text-gray-700 font-medium truncate max-w-[200px]" aria-current="page">{app.name}</li>
          </ol>
        </nav>
        <a href="#" className="text-sm text-indigo-600 hover:underline flex items-center font-medium">Go to Cart <ShoppingCartIcon className="w-4 h-4 ml-1.5"/></a>
      </div>

      {/* App Header Section */}
        <header className="px-6 py-10 border-b border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-x-8 gap-y-6">
          <img src={app.logoUrl} alt={`${app.name} logo`} className="w-24 h-24 rounded-2xl border-2 border-white shadow-lg object-contain flex-shrink-0 bg-white p-1"/>
          <div className="flex-1">
             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{app.name}</h1>
             <p className="text-gray-600 mt-1.5 text-base">{app.shortDescription}</p>
            <div className="flex flex-wrap items-center text-xs text-gray-500 mt-3 gap-x-4 gap-y-1">
              {app.isVerified && <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold flex items-center shadow-sm"><CheckCircleIcon className="w-4 h-4 mr-1.5"/>Verified</span>}
              {/* {app.rating && <span className="flex items-center text-base"><StarIcon className="w-4 h-4 text-yellow-400 mr-1"/>{app.rating.toFixed(1)} • <a href="#reviews" onClick={() => handleNavClick('reviews')} className="ml-1 hover:underline">{app.reviewCount} Ratings</a></span>} */}
              <span>Developed by <a href={app.developerLink} className="text-indigo-600 hover:underline font-medium">{app.developer}</a></span>
              <span>Works with <span className="font-semibold text-gray-700">{app.worksWith}</span></span>
            </div>
          </div>
          <a href={app.getButtonLink} target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-0 bg-blue-600 text-white text-base font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex-shrink-0">
            {app.getButtonText}
          </a>
        <button 
  onClick={buttonConfig.action}
  disabled={buttonConfig.disabled}
  className="mt-4 md:mt-0 bg-blue-600 text-white text-base font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex-shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
>
  {buttonConfig.text}
</button>
        </div>
      </header>

      {/* In-Page Sticky Navigation */}
      <div className="border-b border-gray-200 sticky top-[61px] bg-white z-20 shadow-sm">
        <nav className="max-w-5xl mx-auto -mb-px flex space-x-6 sm:space-x-8 px-6 overflow-x-auto scrollbar-hide">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap py-3.5 px-1 border-b-2 font-medium text-sm focus:outline-none
                ${activeSectionId === item.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Overview Section (includes Carousel) */}
        <section id="overview" ref={sectionRefs.current.overview} className="mb-16 scroll-mt-[120px]">
          {/* Only render carousel if media exists */}
          {app.overview?.media && (
            <ImageCarousel 
              media={app.overview.media} 
              scrollIndicatorText={app.overview.scrollIndicatorText} 
            />
          )}
          
          {/* Overview content with proper null checks */}
          <div className="prose prose-sm sm:prose max-w-none text-gray-700 mt-8">
            {app.overview?.mainDescription ? (
              app.overview.mainDescription.split('\n\n').map((paragraph, index) => {
                if (!paragraph.trim()) return null;
                
                if (paragraph.startsWith('#')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-800 mt-10 mb-3 !leading-tight">
                      {paragraph.substring(1)}
                    </h2>
                  );
                }
                
                return (
                  <p key={index} className="my-4 leading-relaxed">
                    {paragraph.replace(/^- /gm, '• ')}
                  </p>
                );
              })
            ) : (
              <p className="text-gray-500">No overview content available.</p>
            )}
          </div>
        </section>

        <section id="keyFeatures" ref={sectionRefs.current.keyFeatures} className="mb-16 scroll-mt-[120px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {Array.isArray(app.keyFeatures) && app.keyFeatures.map((feature, idx) => (
              <div key={idx} className="relative pl-10">
                <div className="absolute left-0 top-0 w-2 h-full bg-yellow-400 rounded-r-sm"></div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1.5">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="benefits" ref={sectionRefs.current.benefits} className="mb-16 scroll-mt-[120px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Benefits</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <h4 className="text-md font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="appTerms" ref={sectionRefs.current.appTerms} className="mb-16 scroll-mt-[120px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">App Terms</h2>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <InformationCircleIcon className="w-5 h-5 text-gray-500 inline-block mr-2 align-text-bottom" />
                <span className="text-sm text-gray-700">{app.appTerms.legalText}</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Scopes</h4>
            <p className="text-sm text-gray-600 mb-5">Installing WhatsApp Business will give the developer access to:</p>
            <div className="space-y-4">
{Array.isArray(app.appTerms.scopes) && app.appTerms.scopes.length > 0 ? (
  app.appTerms.scopes.map(scope => (
    <ScopeItem
      key={scope.title}
      title={scope.title}
      details={scope.details}
      defaultOpen={scope.isOpen !== undefined ? scope.isOpen : false}
    />
  ))
) : (
  <p className="text-sm text-gray-500">No scopes defined for this app.</p>
)}
            </div>
        </section>

        <section id="reviews" ref={sectionRefs.current.reviews} className="mb-16 scroll-mt-[120px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ratings & Reviews</h2>
            <div className="flex flex-col sm:flex-row sm:items-center mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center sm:text-left">
                    <span className="text-5xl font-bold text-gray-800">{app.reviews.averageRating.toFixed(1)}</span>
                    <p className="text-xs text-gray-500">out of 5</p>
                </div>
                <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
                    <div className="flex items-center justify-center sm:justify-start">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-6 h-6 ${i < Math.round(app.reviews.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                    <p className="text-sm text-gray-600 text-center sm:text-left mt-1">{app.reviews.totalReviews} Ratings</p>
                </div>
                 {/* Optional Review Breakdown Bars - simplified
                 <div className="w-full sm:w-1/2 lg:w-1/3 mt-4 sm:mt-0 sm:ml-auto">
                    {app.reviews.breakdown.map(item => (
                        <div key={item.stars} className="flex items-center text-xs">
                            <span className="text-gray-500 w-8">{item.stars} star</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2"><div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(item.count / app.reviews.totalReviews) * 100}%` }}></div></div>
                            <span className="text-gray-500 w-8 text-right">{item.count}</span>
                        </div>
                    ))}
                </div> */}
            </div>
            <div className="space-y-8">
                {app.reviews.userReviews.slice(0,3).map(review => (
                     <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start space-x-3">
                            <img src={review.avatarUrl} alt={review.name} className="w-10 h-10 rounded-full object-cover"/>
                            <div>
                                <h5 className="font-semibold text-sm text-gray-800">{review.name}</h5>
                                <div className="flex items-center my-1">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                                    <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed ml-13">{review.comment}</p>
                    </div>
                ))}
            </div>
            {app.reviews.userReviews.length > 3 && <button className="mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors">Show all {app.reviews.totalReviews} reviews</button>}
        </section>

        <section id="support" ref={sectionRefs.current.support} className="scroll-mt-[120px]">
           <h2 className="text-2xl font-bold text-gray-800 mb-8">Tutorial & Support</h2>
           <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-x-6 gap-y-4">
                   <InformationCircleIcon className="w-10 h-10 text-gray-400 flex-shrink-0 hidden sm:block" />
                  <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1.5">How to use this app</h4>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{app.support.howToUse}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:self-center w-full sm:w-auto">
                      <a href={app.support.appTutorialLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-5 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap">App tutorial</a>
                      <a href={app.support.contactIntegrationsLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">Contact Integrations</a>
                  </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed pt-4 border-t border-gray-200">{app.support.footerNote}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AppDetailsPage;