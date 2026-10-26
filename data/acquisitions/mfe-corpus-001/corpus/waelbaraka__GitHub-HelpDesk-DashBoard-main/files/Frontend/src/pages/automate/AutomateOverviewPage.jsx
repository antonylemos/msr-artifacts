import React from 'react';

// --- Reusable SVG Icons for the cards ---
// In a real app, these would be imported from a central icon library
const ChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
const HashtagIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>);
const ReplyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>);
const ListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>);
const TagIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 8V5c0-1.1.9-2 2-2h2z" /></svg>);
const AiTagIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12.5M16 21h-4.5M16 21a4 4 0 004-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4z" /></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>);
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const WorkflowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h2" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);

// --- Reusable Feature Card Component ---
const FeatureCard = ({ icon, title, description, linkText, linkHref = "#", tag = null }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:bg-gray-50/75 hover:shadow-md transition-all duration-200 flex flex-col">
        <div className="flex justify-between items-start">
            <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
            {tag && <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{tag}</span>}
        </div>
        <h3 className="text-base font-semibold text-gray-800 mt-4">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{description}</p>
        <a href={linkHref} className="text-sm font-semibold text-blue-600 mt-4 group">
            {linkText} <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </a>
    </div>
);


// --- The Main Page Component ---
const AutomateOverviewPage = () => {
    return (
        <div className="bg-white w-full font-sans p-8 md:p-12 lg:p-16">
            <div className="max-w-5xl mx-auto">
                {/* --- 1. Headline Section --- */}
                <header className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Save <span className="text-blue-600">up to 50% of time</span> by automating customer service
                    </h1>
                    <div className="mt-6 flex justify-center items-center gap-x-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2"><CheckIcon /> provide 24/7 availability</span>
                        <span className="flex items-center gap-2"><CheckIcon /> respond 3x faster</span>
                        <span className="flex items-center gap-2"><CheckIcon /> improve customer satisfaction</span>
                    </div>
                </header>

                {/* --- 2. ChatBot Feature Card --- */}
                <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">Support and sell automatically with ChatBot</h2>
                        <p className="mt-4 text-gray-600">
                            Build a bot with no coding skills that will provide round-the-clock support and take a thousand chats at the same time.
                        </p>
                        <button className="mt-8 bg-black text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                            Set up ChatBot
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
                            <div className="flex items-start gap-3">
                                <img src="https://i.pravatar.cc/40?u=anne" alt="Anne" className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold text-sm">Anne</p>
                                    <p className="text-sm text-gray-700 bg-gray-100 p-2 rounded-lg mt-1">Hi there!</p>
                                </div>
                            </div>
                            <div className="flex items-end gap-3 mt-3 justify-end">
                                <div className="bg-blue-600 text-white p-3 rounded-lg text-sm">
                                    Hey Anne! Good to see you again. How are you liking your new TV? I saw it was delivered yesterday. 😊
                                </div>
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-lg font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-1.293 1.293a1 1 0 001.414 1.414L6 15.414V16a6 6 0 1012 0v-1.586l2.293-2.293a1 1 0 00-1.414-1.414L14 13.586V8a6 6 0 00-6-6z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 3. Speed up Chatting Section --- */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900">Speed up chatting</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard icon={<ChatIcon/>} title="Chat with Copilot" description="Get instant answers from AI assistant." linkText="Chat now →" />
                        <FeatureCard icon={<HashtagIcon/>} title="Get canned response suggestions" description="Suggest responses based on specific events." linkText="Manage →" />
                        <FeatureCard icon={<SparklesIcon/>} title="Enhance your messages" description="Adjust the tone, fix grammar and more." linkText="Tell me more →" />
                        <FeatureCard icon={<ReplyIcon/>} title="Get Reply suggestions" description="Suggest smart replies while chatting with customers." linkText="Manage →" />
                    </div>
                </section>

                {/* --- 4. Automate Routine Tasks Section --- */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900">Automate routine tasks</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard icon={<ListIcon/>} title="Summarize your chats" description="Get chat summaries in form of a simple list." linkText="Tell me more →" />
                        <FeatureCard icon={<TagIcon/>} title="Auto-tag your chats" description="Tag chats based on the canned response used." linkText="Tell me more →" />
                        <FeatureCard icon={<AiTagIcon/>} title="Get AI tag suggestions" description="Suggest tags based on previous tag usage." linkText="Tell me more →" />
                    </div>
                </section>

                {/* --- 5. Ensure Team Efficiency Section --- */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900">Ensure team efficiency</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard icon={<FilterIcon/>} title="Route your chats" description="Direct customers to appropriate teams." linkText="Manage →" />
                        <FeatureCard icon={<ClockIcon/>} title="Set working hours" description="Guarantee proper staffing for each shift." linkText="Manage →" />
                        <FeatureCard icon={<WorkflowIcon/>} title="Set up Workflows" description="Automate manual processes and routine tasks." linkText="Manage →" tag="Beta" />
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AutomateOverviewPage;