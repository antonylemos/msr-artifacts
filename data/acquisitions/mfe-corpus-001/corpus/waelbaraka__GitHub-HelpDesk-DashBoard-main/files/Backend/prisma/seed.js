// prisma/seed-modules.js
import sql from '../src/db/sqlClient.js'; // Adjust path to your sqlClient
import 'dotenv/config'; // To load DATABASE_URL from .env

// Helper to safely stringify JSON for insertion into JSONB columns
const safeJson = (data) => {
  if (data === undefined || data === null) return null;
  try {
    return JSON.stringify(data);
  } catch (e) {
    console.error("Error stringifying JSON for seed:", data, e);
    return null;
  }
};

const modulesToSeed = [
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business',
    description: 'Manage your chats with WhatsApp customers directly within Your Platform. Send and receive messages, use templates, and keep all conversations organized. Leverage the official API for stable and reliable communication.',
    shortDescription: 'Manage your chats with WhatsApp customers in the LiveChat app',
    version: '1.0.5', // Updated version
    author: 'Platform Integrations Team',
    developerLink: 'https://yourplatform.com/integrations',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png',
    isVerified: true,
    averageRating: 4.6,
    reviewCount: 78, // Updated
    worksWithText: 'Your Platform Name',
    getButtonText: 'Get',
    getButtonLink: null, // Link is usually for external apps, internal install handled by button
    category: 'Communication Channels',
    tags: ['messaging', 'official_api', 'crm', 'popular', 'customer_support'],
    paymentTypes: ['subscription_per_month', 'free_tier_available'],
    placementAreas: ['Navigation', 'ChatDetailsSidebar', 'Settings', 'AgentDashboard'],
    installCount: 1350,
    publishedAt: new Date('2023-01-15T10:00:00Z'),
    uiComponents: {
      sidebar: { icon: 'ChatBubbleLeftEllipsisIcon', path: '/integrations/whatsapp', label: 'WhatsApp', type: 'page', isBottom: false },
      settings: { path: '/settings/integrations/whatsapp', remoteName: 'whatsapp_app', component: './WhatsAppChannelSettingsPage', label: 'WhatsApp Channels' },
      page: { path: '/integrations/whatsapp', remoteName: 'whatsapp_app', component: './WhatsAppDashboardPage', label: 'WhatsApp Dashboard' },
      chatDetails: { // Example for future ChatDetailsSidebar injection
        sections: [
          { id: "wa_message_templates", title: "Send WA Template", remoteName: "whatsapp_app", component: "./WhatsAppTemplateSelectorPanel" }
        ]
      }
    },
    requiredPermissions: ['whatsapp:manage_channels', 'whatsapp:send_message', 'conversation:read_all', 'client:read_all'],
    overviewContent: {
      media: [
        { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: 'https://via.placeholder.com/1280x720/2c3e50/ffffff?text=WhatsApp+Demo+Video' },
        { type: 'image', src: 'https://via.placeholder.com/1280x720/34495e/ffffff?text=Feature+Showcase+1', alt: 'WhatsApp Feature 1: Unified Inbox', zoomable: true },
        { type: 'image', src: 'https://via.placeholder.com/1280x720/95a5a6/ffffff?text=Feature+Showcase+2', alt: 'WhatsApp Feature 2: Template Messages', zoomable: true },
        { type: 'image', src: 'https://via.placeholder.com/1280x720/7f8c8d/ffffff?text=Feature+Showcase+3', alt: 'WhatsApp Feature 3: Automation', zoomable: true },
      ],
      scrollIndicatorText: [
        "Official WhatsApp Business API Integration",
        "Forget about your phone. All you need is your phone number.",
        "Use available file formats to solve problems in a flash.",
        "Route chats to dedicated agents for seamless communication."
      ],
      mainDescription: "Shorten your customer's path to your business.\n\nCan your customers reach you in a few seconds using WhatsApp? Can you reach them?\nRegardless of your answer, this integration can help you grow your business whether you already use WhatsApp as your communication channel or want to start using it. How?\nWhatsApp has over 2.4 billion users who send 100 billion messages daily; you can be sure that among them are the potential customers that will help you create new business opportunities. But when you integrate WhatsApp with Your Platform, you can also:\n\n- save money and time, as with this integration, you onboard yourself in minutes\n- answer your customers faster, as you see their messages in the Your Platform app, and you can answer using template messages\n- boost your sales by sending your customers marketing campaigns, discount codes, etc.\n\n#Stable and safe\nOur integration uses the official WhatsApp Business API compliant with the WhatsApp Terms of Service. It's perfect for handling both a few conversations and multiple WhatsApp chats. No app crashes during talks!\n\nSuitable for all-sizes businesses with no risk at all\n\nChoose one of the three plans that best suits your business’s needs. Whether you own a small business or work in a corporation, we have something for everyone. And the best part is that the best part is that we offer a 14-day Money-Back Guarantee. So you can try WhatsApp Business for 14 days, and if you’re not 100% satisfied, we will refund the money you paid for the plan!\n\nConvenience and effective communication\n\nIf you’ve ever used WhatsApp, you know a phone connected to the internet is essential. With this integration, it's different. All you need is a phone number to connect to your WhatsApp Business account, which many support agents can simultaneously service.\nYou can also route WhatsApp messages to a group of agents dedicated to WhatsApp chats or connect more phone numbers to your account. All for the comfort of your business."
    },
    keyFeatures: [
      { title: 'Official WhatsApp Business API', description: 'Compliant with WhatsApp terms of service for stable and reliable messaging. No risk of unofficial API bans.' },
      { title: 'Group Routing & Assignment', description: 'Assign incoming WhatsApp chats to dedicated agent groups or specific agents based on your routing rules for specialized support.' },
      { title: 'Template Message Support', description: 'Utilize pre-approved WhatsApp Message Templates for notifications, alerts, and proactive customer outreach, even outside the 24-hour window.' },
      { title: 'Rich Media Sharing', description: 'Send and receive images, videos, documents, audio notes, and location messages to provide comprehensive support.' },
      { title: 'Unified Agent Interface', description: 'Agents handle WhatsApp conversations alongside other channels directly within the Your Platform dashboard, improving response times.' },
      { title: 'Automation Ready', description: 'Integrate with the Flow Builder to automate common WhatsApp interactions, FAQs, and qualification processes before agent handoff.'}
    ],
    benefits: [
      { title: 'No More App Crashes', description: 'The use of the official WhatsApp Business API makes the integration robust and stable.' },
      { title: 'Suitable for Businesses of All Sizes', description: 'Scales from small businesses to large enterprises, guaranteeing high performance regardless of traffic.' },
      { title: 'Chats That Won’t Fade Away', description: 'The integration’s design and implementation eliminate disconnections and delays. You’re at no risk of losing chats.' },
      { title: 'Better Customer Experience', description: 'Respond faster and more consistently by managing WhatsApp chats with customers in the Your Platform app.' },
      { title: 'New Business Opportunities', description: 'Send messages on WhatsApp to many customers simultaneously (with opt-in), create marketing campaigns, send promo codes, etc.' },
      { title: 'Secure & Compliant', description: 'Leverage Meta-hosted infrastructure and ensure compliance with WhatsApp policies for business messaging.' },
    ],
    appTerms: {
      legalText: "By installing this app, you agree to Your Platform's Marketplace Terms, this App's Privacy Policy, and the Scopes listed. You also agree to Meta's WhatsApp Business Terms of Service.",
      scopes: [
        { title: 'View WhatsApp Conversations', details: 'Allows the app to read message content, timestamps, and participant information for conversations originating from or directed to connected WhatsApp channels.' },
        { title: 'Send WhatsApp Messages', details: 'Permits the app to send messages (text, media, templates, interactive) through your connected WhatsApp Business API number on behalf of your agents or automations.' },
        { title: 'Manage WhatsApp Channel Configuration', details: 'Allows the app to view, create, and update settings related to your WhatsApp channel connection, such as API tokens, phone number IDs, and webhook configurations (stored securely within Your Platform).' },
        { title: 'Access Client Information', details: 'To associate WhatsApp users with client profiles in Your Platform, the app may access and update client names, phone numbers, and other identifiers.'}
      ]
    },
    supportInfo: {
      howToUse: "1. Navigate to Settings > Integrations > WhatsApp Business.\n2. Click 'Add New Channel'.\n3. Follow the on-screen instructions to connect your WhatsApp Business API account. You will typically need your Meta Phone Number ID, WhatsApp Business Account (WABA) ID, and a System User Access Token from your Meta Business Manager.\n4. Configure your webhook in the Meta App Dashboard to point to the URL provided by Your Platform.\n5. Once verified, set the channel to active and start receiving/sending messages.",
      appTutorialLink: "https://yourplatform.com/help/whatsapp-business-setup",
      contactIntegrationsLink: "mailto:support@yourplatform.com?subject=WhatsApp%20Business%20Integration%20Help",
      footerNote: "This integration utilizes the official Meta Cloud API for WhatsApp Business. Ensure your use case complies with WhatsApp Commerce and Business Policies. Message sending fees from Meta may apply based on conversation categories and volume."
    },
    pricingDetails: "Requires an active WhatsApp Business API account with Meta. Messaging costs are determined by Meta's conversation-based pricing. This integration may have its own subscription tiers based on features or volume, visible during the 'Get' process."
  },
  {
    id: 'app1', name: 'AgentTrainer (Example)', description: 'AI-powered agent training simulations.', shortDescription: 'Train agents with realistic customer interaction scenarios.',
    version: '1.1.0', author: 'SimuCorp Inc.', logoUrl: '🤖', isVerified: false, averageRating: 4.2, reviewCount: 22,
    category: 'Training & Onboarding', tags: ['ai', 'simulation', 'agent_tools'], paymentTypes: ['subscription_per_agent', 'enterprise_plan'],
    placementAreas: ['Settings', 'AgentDashboard'], installCount: 150, publishedAt: new Date('2023-03-10T12:00:00Z'),
    getButtonText: "View Details",
    uiComponents: { sidebar: {icon: "AcademicCapIcon", path: "/apps/agent-trainer", label: "Agent Trainer"}, page: {path: "/apps/agent-trainer", component: "AgentTrainerPage"} },
    requiredPermissions: ['user:read_all_org'],
    overviewContent: {mainDescription: "Enhance your agent skills with AI-driven training modules that simulate real customer interactions."},
    keyFeatures: [{title: "Realistic Scenarios", description: "Covers various support and sales situations."}],
    benefits: [{title: "Faster Onboarding", description: "Get new agents up to speed quickly."}],
    appTerms: {legalText: "AgentTrainer usage terms apply.", scopes: [{title: "View Agent Data", details: "Accesses agent performance metrics for tailored training."}]},
    supportInfo: {howToUse: "Access via the Apps menu after installation."},
    worksWithText: "Your Platform Name",
  },
  {
    id: 'app2', name: 'Transcript Exporter', description: 'Export chat transcripts to CSV or PDF for archiving and analysis.', shortDescription: 'Easily export your chat history.',
    version: '1.0.1', author: 'DataTools Ltd.', logoUrl: '📄', isVerified: true, averageRating: 4.0, reviewCount: 35,
    category: 'Analytics & Reporting', tags: ['export', 'data_management', 'compliance'], paymentTypes: ['one_time_payment', 'free_limited'],
    placementAreas: ['ArchivesPageActions', 'Settings'], installCount: 450, publishedAt: new Date('2022-11-20T09:00:00Z'),
    getButtonText: "View Details",
    uiComponents: { settings: {path: "/settings/apps/exporter", component: "ExporterSettingsPage"}},
    requiredPermissions: ['conversation:read_all_org', 'archive:export'],
    overviewContent: {mainDescription: "Securely export conversation transcripts for your records or for further analysis in external tools."},
    keyFeatures: [{title: "Multiple Formats", description: "Supports CSV and PDF export."}],
    benefits: [{title: "Compliance", description: "Helps meet data retention and auditing requirements."}],
    worksWithText: "Your Platform Name",
  },
    // Add app3 and app8 with at least id, name, description, shortDescription, version, author, logoUrl, uiComponents.page.path, uiComponents.page.component
  {
    id: 'app3', name: 'Getscreen.me Connector', description: 'Remote desktop access integration.', shortDescription: 'Launch remote sessions from chat.',
    version: '1.2.0', author: 'Getscreen.me', logoUrl: '💻', isVerified: true, averageRating: 4.8, reviewCount: 112,
    category: 'Desktop Sharing', tags: ['remote_support', 'cobrowsing'], paymentTypes: ['requires_getscreen_subscription'],
    placementAreas: ['ChatDetailsSidebar', 'MessageActions'], installCount: 800, publishedAt: new Date('2023-02-01T14:00:00Z'),
    getButtonText: "View Details",
    uiComponents: { page: {path: "/apps/details/getscreen", component: "GenericAppDetailPage"}, settings: {path: "/settings/apps/getscreen", component: "GetscreenSettingsPage"} },
    requiredPermissions: ['chat:control_remote_session'],
    worksWithText: "Your Platform Name",
  },
  {
    id: 'app8', name: 'Facebook Messenger', description: 'Integrate Facebook Messenger for customer communication.', shortDescription: 'Chat with customers via Facebook.',
    version: '1.5.0', author: 'Platform Integrations Team', logoUrl: '💬', isVerified: true, averageRating: 4.4, reviewCount: 210,
    category: 'Communication Channels', tags: ['messaging', 'social_media', 'facebook'], paymentTypes: ['free_with_platform_plan'],
    placementAreas: ['Navigation', 'ChatDetailsSidebar', 'Settings'], installCount: 2100, publishedAt: new Date('2022-09-05T10:00:00Z'),
    getButtonText: "View Details",
    uiComponents: { sidebar: {icon: "ChatBubbleOvalLeftEllipsisIcon", path: "/integrations/facebook", label: "Facebook"}, page: {path: "/integrations/facebook", component: "FacebookDashboardPage"}, settings: {path: "/settings/integrations/facebook", component: "FacebookChannelSettingsPage"} },
    requiredPermissions: ['facebook:manage_pages', 'conversation:read_all'],
    worksWithText: "Your Platform Name",
  }
];

async function seedModules() {
  console.log('Starting to seed modules...');

  for (const moduleData of modulesToSeed) {
    const { 
        overviewContent, keyFeatures, benefits, appTerms, supportInfo, 
        uiComponents, tags, paymentTypes, placementAreas, requiredPermissions,
        // Ensure all fields from the Module table definition are destructured or in restOfModuleData
        id, name, description, shortDescription, version, author, developerLink,
        logoUrl, category, averageRating, reviewCount, installCount, isVerified,
        publishedAt, worksWithText, getButtonText, getButtonLink, pricingDetails,
        ...otherFields // This catches any fields not explicitly destructured
    } = moduleData;

    let dataForSql = { // Use let to allow modification
        id, name, description, shortDescription, version, author, developerLink,
        logoUrl, category,
        averageRating: typeof averageRating === 'number' ? averageRating : null,
        reviewCount: typeof reviewCount === 'number' ? reviewCount : 0,
        installCount: typeof installCount === 'number' ? installCount : 0,
        isVerified: typeof isVerified === 'boolean' ? isVerified : false,
        publishedAt: publishedAt instanceof Date ? publishedAt.toISOString() : (publishedAt || new Date().toISOString()), // Ensure publishedAt has a value
        worksWithText: worksWithText || 'Your Platform Name', // Add default
        getButtonText: getButtonText || 'View Details',       // Add default
        getButtonLink: getButtonLink || null,                 // Add default
        pricingDetails: pricingDetails || null,               // Add default

        tags: Array.isArray(tags) ? tags : [],
        paymentTypes: Array.isArray(paymentTypes) ? paymentTypes : [],
        placementAreas: Array.isArray(placementAreas) ? placementAreas : [],
        requiredPermissions: Array.isArray(requiredPermissions) ? requiredPermissions : [],
        
        uiComponents: uiComponents ? safeJson(uiComponents) : '{}',
        overviewContent: overviewContent ? safeJson(overviewContent) : null,
        keyFeatures: keyFeatures && keyFeatures.length > 0 ? keyFeatures : null,
        benefits: benefits && benefits.length > 0 ? benefits : null,
        appTerms: appTerms ? safeJson(appTerms) : null,
        supportInfo: supportInfo ? safeJson(supportInfo) : null,
    };

    // Filter out any top-level keys that are strictly undefined
    // Note: `null` is a valid SQL value, `undefined` is not for the postgres library here.
    dataForSql = Object.fromEntries(
        Object.entries(dataForSql).filter(([_, v]) => v !== undefined)
    );

     try {
      // ... (SQL INSERT/UPDATE statement as before) ...
      await sql`
        INSERT INTO "Module" ${sql(dataForSql)}
        ON CONFLICT (id) DO UPDATE 
        SET 
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          "shortDescription" = EXCLUDED."shortDescription",
          version = EXCLUDED.version,
          author = EXCLUDED.author,
          "developerLink" = EXCLUDED."developerLink",
          "logoUrl" = EXCLUDED."logoUrl",
          category = EXCLUDED.category,
          tags = EXCLUDED.tags,
          "paymentTypes" = EXCLUDED."paymentTypes",
          "pricingDetails" = EXCLUDED."pricingDetails",
          "placementAreas" = EXCLUDED."placementAreas",
          "averageRating" = EXCLUDED."averageRating",
          "reviewCount" = EXCLUDED."reviewCount",
          "installCount" = EXCLUDED."installCount",
          "isVerified" = EXCLUDED."isVerified",
          "requiredPermissions" = EXCLUDED."requiredPermissions",
          "uiComponents" = EXCLUDED."uiComponents",
          "overviewContent" = EXCLUDED."overviewContent",
          "keyFeatures" = EXCLUDED."keyFeatures",
          benefits = EXCLUDED.benefits,
          "appTerms" = EXCLUDED."appTerms",
          "supportInfo" = EXCLUDED."supportInfo",
          "publishedAt" = EXCLUDED."publishedAt",
          "lastUpdatedAt" = NOW(),
          "worksWithText" = EXCLUDED."worksWithText",
          "getButtonText" = EXCLUDED."getButtonText",
          "getButtonLink" = EXCLUDED."getButtonLink";
      `;
      console.log(`Seeded/Updated module: ${moduleData.name} (ID: ${moduleData.id})`);
    } catch (error) {
      console.error(`Error seeding module ${moduleData.name} (ID: ${moduleData.id}):`, error.message);
      // Optionally log dataForSql for deeper inspection of what was attempted
      // console.error("Data attempted:", dataForSql);
    }
  }

  console.log('Module seeding finished.');
  await sql.end({ timeout: 5 });
}

seedModules().catch(err => {
  console.error("Seeding script failed globally:", err);
  process.exit(1);
});