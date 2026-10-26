// src/pages/KnowledgeBasePage.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  MagnifyingGlassIcon, PlusIcon, AdjustmentsHorizontalIcon,
  ChevronDownIcon, ChevronRightIcon,
  FolderOpenIcon, DocumentTextIcon, LinkIcon,
  EyeIcon, HandThumbUpIcon, HandThumbDownIcon,
  EllipsisHorizontalIcon,
  BookOpenIcon,
  CubeTransparentIcon,
  Bars2Icon
} from '@heroicons/react/24/solid';

// DND-Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  MeasuringStrategy
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


// Dummy Data (ensure unique IDs are present and nested correctly)
const initialKnowledgeBase = {
  trialDaysLeft: 14,
  kbId: '41984ecd-28bb-4109-8bbf-dd7b969494f8.kb.help',
  categories: [
    {
      id: 'cat-general', name: 'General', articleCount: 1, defaultOpen: true,
      articles: [
        { id: 'art-uae', title: 'UAE', status: 'Published', lastUpdated: 'Jun 4th, 2025', views: 1, likes: 0, dislikes: 0, isLink: true, linkUrl: '#', linkText: 'https://kb.example.com/uae' }
      ]
    },
    {
      id: 'cat-getting-started', name: 'Getting started', articleCount: 4, defaultOpen: true,
      articles: [
        { id: 'art-see-kb', title: 'See what KnowledgeBase can do for you', status: 'Draft', lastUpdated: 'Jun 4th, 2025', views: 0, likes: 0, dislikes: 0, isLink: false },
        { id: 'art-use-chat', title: 'Step 3: Use articles in the chat', status: 'Published', lastUpdated: 'Jun 4th, 2025', views: 2, likes: 0, dislikes: 0, isLink: true, linkUrl: '#', linkText: 'https://kb.example.com/use-in-chat' },
        { id: 'art-launch-hc', title: 'Step 2: Launch your Help Center', status: 'Draft', lastUpdated: 'Jun 4th, 2025', views: 0, likes: 0, dislikes: 0, isLink: true, linkUrl: '#', linkText: 'https://kb.example.com/launch-hc' },
        { id: 'art-dental-services', title: 'Exploring the Spectrum of Dental Services From Preventive Care to ...', status: 'Published', lastUpdated: 'Jun 4th, 2025', views: 0, likes: 0, dislikes: 0, isLink: false }
      ]
    },
    {
      id: 'cat-hightech', name: 'HighTech', articleCount: 1, defaultOpen: false,
      articles: [
        { id: 'art-transforming', title: 'Transforming Business Operations: How Hightech Leads the Way in A...', status: 'Published', lastUpdated: 'Jun 4th, 2025', views: 0, likes: 0, dislikes: 0, isLink: true, linkUrl: '#', linkText: 'https://kb.example.com/hightech' }
      ]
    },
  ]
};

// --- Reusable Components (Refactored for DnD) ---

// Status Badge (Published/Draft) - unchanged
const StatusBadge = React.memo(({ status }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-700';
  if (status === 'Published') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-700';
  } else if (status === 'Draft') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-700';
  }
  return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${bgColor} ${textColor}`}>{status}</span>;
});

// Article Row Component (Sortable Item for Articles)
// Needs activeDragItem to determine if it's being dragged over by a category
const ArticleRow = React.memo(({ article, id, onMoreActions, onArticleClick, isDragOverlay = false, activeDragItem }) => { // <<<< ADDED activeDragItem prop
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver
  } = useSortable({ id: id, data: { type: 'article', article: article } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 100 : undefined,
    paddingLeft: '32px', // Indent in both normal and overlay
  };

  // Drag destination indicator
  const dragOverIndicator = isOver && !isDragging && activeDragItem?.type === 'article' ? 'bg-blue-100' : ''; // Highlight if another article is dragged over it

  return (
    <tr
      ref={setNodeRef}
      style={style}
      onClick={onArticleClick}
      className={`hover:bg-gray-50 cursor-pointer ${dragOverIndicator}`}
    >
      {/* Drag Handle Column */}
      <td className="w-8 px-2 py-3 text-center">
        {!isDragOverlay && ( // Don't render drag handle if this is the DragOverlay item
          <button type="button" {...attributes} {...listeners} className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
            <Bars2Icon className="w-5 h-5 rotate-90"/>
          </button>
        )}
      </td>
      {/* Icon + Title Column */}
      <td className="py-3">
        <div className="flex items-center">
          <DocumentTextIcon className="w-5 h-5 text-gray-500 mr-2"/>
          <span className="text-gray-800 font-medium truncate max-w-xs">{article.title}</span>
          {article.isLink && <LinkIcon className="w-4 h-4 text-blue-600 ml-1 flex-shrink-0" title={article.linkText}/>}
        </div>
      </td>
      {/* Status Column */}
      <td className="py-3 whitespace-nowrap">
        <StatusBadge status={article.status}/>
      </td>
      {/* Last Updated Column */}
      <td className="py-3 text-gray-600 whitespace-nowrap">{article.lastUpdated}</td>
      {/* Performance Column */}
      <td className="py-3 whitespace-nowrap text-gray-600">
        <div className="flex items-center space-x-3">
          <span className="flex items-center"><EyeIcon className="w-4 h-4 mr-1"/> {article.views}</span>
          <span className="flex items-center"><HandThumbUpIcon className="w-4 h-4 mr-1"/> {article.likes}</span>
          <span className="flex items-center"><HandThumbDownIcon className="w-4 h-4 mr-1"/> {article.dislikes}</span>
        </div>
      </td>
      {/* More Actions Column */}
      <td className="py-3 text-right">
        <button onClick={onMoreActions} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
          <EllipsisHorizontalIcon className="w-5 h-5"/>
        </button>
      </td>
    </tr>
  );
});

// Category Section Component (Sortable Item for Categories, and contains SortableContext for Articles)
// Needs activeDragItem to determine if it's being dragged over by an article
const CategorySection = React.memo(({ category, onAddArticle, onMoreActions, articles, onArticleMoreActions, onArticleClick, isDragOverlay = false, activeDragItem }) => { // <<<< ADDED activeDragItem prop
  const [isOpen, setIsOpen] = useState(category.defaultOpen);

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);
  const handleCategoryMoreActions = useCallback((e) => { // Renamed to avoid conflict
    e.stopPropagation();
    onMoreActions(category.id); // Use prop handler
  }, [category.id, onMoreActions]);

  // DnD for Category itself
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, // isDragging for visual feedback
    isOver // <<<< NEW: To check if a category is being dragged over
  } = useSortable({ id: category.id, data: { type: 'category', category: category } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1, // Visual feedback for dragging
    zIndex: isDragging ? 100 : undefined,
  };

  const articleIds = useMemo(() => articles.map(a => a.id), [articles]);

  // Drag destination indicator for category header (when an article is dragged over it)
  // This is for visual feedback when an article is dragged over the category header
  const dragOverHeaderIndicator = isOver && !isDragging && activeDragItem?.type === 'article' ? 'bg-blue-50 border-blue-300' : '';
  // This indicates a drop position *between* categories, not into the current one.
  const dropPositionIndicator = isOver && !isDragging && activeDragItem?.type === 'category' ? 'border-t-2 border-blue-500' : '';


  return (
    <div ref={setNodeRef} style={style} className={`mb-0 ${dropPositionIndicator}`}> {/* Apply dropPositionIndicator */}
      {/* Category Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${dragOverHeaderIndicator}`}>
        <div className="flex items-center" onClick={handleToggle}>
          {!isDragOverlay && ( // Only show drag handle if not DragOverlay
            <button type="button" {...attributes} {...listeners} className="p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing mr-2"> {/* Category Drag Handle */}
              <Bars2Icon className="w-5 h-5 rotate-90"/>
            </button>
          )}
          {isOpen ? <ChevronDownIcon className="w-5 h-5 text-gray-500 mr-2"/> : <ChevronRightIcon className="w-5 h-5 text-gray-500 mr-2"/>}
          <FolderOpenIcon className="w-5 h-5 text-gray-500 mr-2"/>
          <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
          <span className="ml-2 text-sm text-gray-500">{category.articleCount} article(s)</span>
        </div>
        <button onClick={handleCategoryMoreActions} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
          <EllipsisHorizontalIcon className="w-5 h-5"/>
        </button>
      </div>

      {/* Articles List Table */}
      {isOpen && (
        <SortableContext items={articleIds} strategy={verticalListSortingStrategy}>
          <table className={`min-w-full`}> {/* Removed dragOverTableIndicator from table */}
            <tbody className="bg-white">
              {articles.map(article => (
                <ArticleRow
                  key={article.id}
                  id={article.id}
                  article={article}
                  onMoreActions={onArticleMoreActions}
                  onArticleClick={onArticleClick}
                  activeDragItem={activeDragItem} // <<<< NEW: Pass activeDragItem to ArticleRow
                />
              ))}
              {/* Add new article row */}
              <tr>
                <td colSpan="6" className="px-4 py-3">
                  <button onClick={() => onAddArticle(category.id)} className="flex items-center text-blue-600 hover:underline text-sm font-medium">
                    <PlusIcon className="w-4 h-4 mr-2"/> Add article
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </SortableContext>
      )}
    </div>
  );
});


const dropAnimation = {
  // Styles for the dragged item when it's released (default behavior)
  sideEffects: ({ active, dragSource, measuring }) => {
    // This is default behavior, no change
  },
};

const KnowledgeBasePage = React.memo(({ sectionConfig, onIconClick }) => {
  const [kbData, setKbData] = useState(initialKnowledgeBase);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDragItem, setActiveDragItem] = useState(null); // For DragOverlay (data of dragged item)

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setKbData(initialKnowledgeBase);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Close add menu when clicking outside (unchanged)
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addMenuRef = useRef(null);
  const addButtonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAddMenuOpen && addMenuRef.current && !addMenuRef.current.contains(event.target) &&
          addButtonRef.current && !addButtonRef.current.contains(event.target)) {
        setIsAddMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddMenuOpen]);

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const handleFilterChange = useCallback((filter) => setActiveFilter(filter), []);

  const handleAddArticle = useCallback((categoryId) => {
    console.log(`Add new article to category: ${categoryId}`);
    onIconClick({ id: 'article', type: 'page', categoryId: categoryId });
  }, [onIconClick]);

  const handleCategoryMoreActions = useCallback((categoryId) => {
    console.log('More actions for category ID:', categoryId);
  }, []);
  const handleArticleMoreActions = useCallback((e) => {
    e.stopPropagation();
    console.log('More actions for article:', e.currentTarget.closest('tr').textContent);
  }, []);
  const handleArticleClick = useCallback((e) => {
    console.log('Article row clicked:', e.currentTarget.textContent);
  }, []);

  const handleAddNewButtonClick = useCallback(() => {
    setIsAddMenuOpen(prev => !prev);
  }, []);

  const handleAddMenuItemClick = useCallback((type) => {
    setIsAddMenuOpen(false);
    if (type === 'new_article') {
      onIconClick({ id: 'article', type: 'page' });
    } else if (type === 'new_topic') {
      alert('Opening New Topic creation form/modal');
    }
  }, [onIconClick]);


  // Filtered categories and articles logic
  const filteredCategories = useMemo(() => {
    if (loading) return [];

    return kbData.categories
      .map(category => {
        const filteredArticles = category.articles.filter(article => {
          const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesFilter = activeFilter === 'All' || article.status === activeFilter;
          return matchesSearch && matchesFilter;
        });
        // Ensure articleCount is updated based on filtered articles
        return { ...category, articles: filteredArticles, articleCount: filteredArticles.length };
      })
      .filter(category => category.articleCount > 0);
  }, [kbData, searchTerm, activeFilter, loading]);


  // Helper to find parent category ID of an item (used in DnD logic)
  const findCategoryOfItem = useCallback((itemId) => {
    for (const category of kbData.categories) {
      if (category.id === itemId) return category.id; // It's a category
      if (category.articles.some(art => art.id === itemId)) return category.id; // It's an article
    }
    return null;
  }, [kbData.categories]);


  // DnD Logic
  const handleDragStart = useCallback((event) => {
    setActiveDragItem(event.active.data.current);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveDragItem(null); // Clear active drag item

    if (!over) return; // Dropped outside any droppable

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    setKbData(prevKbData => {
      let newCategories = [...prevKbData.categories];

      if (activeType === 'category') {
        if (overType === 'category') {
          // Reorder categories
          const oldIndex = newCategories.findIndex(cat => cat.id === activeId);
          const newIndex = newCategories.findIndex(cat => cat.id === overId);
          if (oldIndex !== newIndex) {
            newCategories = arrayMove(newCategories, oldIndex, newIndex);
            console.log(`Reordered category ${activeId} from index ${oldIndex} to ${newIndex}`);
          }
        }
      } else if (activeType === 'article') {
        const activeArticle = active.data.current.article;
        const oldCategoryId = findCategoryOfItem(activeId);
        const newCategoryId = findCategoryOfItem(overId);

        if (!oldCategoryId || !newCategoryId) return prevKbData;

        const oldCategoryIndex = newCategories.findIndex(cat => cat.id === oldCategoryId);
        const newCategoryIndex = newCategories.findIndex(cat => cat.id === newCategoryId);

        if (oldCategoryId === newCategoryId) {
          // Reorder articles within the same category
          const updatedArticles = arrayMove(
            newCategories[oldCategoryIndex].articles,
            newCategories[oldCategoryIndex].articles.findIndex(art => art.id === activeId),
            newCategories[oldCategoryIndex].articles.findIndex(art => art.id === overId)
          );
          newCategories[oldCategoryIndex] = { ...newCategories[oldCategoryIndex], articles: updatedArticles };
          console.log(`Reordered article ${activeId} within category ${oldCategoryId}`);
        } else {
          // Cross-category move (more complex: remove from old, insert into new)
          // Ensure we're working on copies of article arrays
          const oldCategoryArticles = newCategories[oldCategoryIndex].articles.filter(art => art.id !== activeId);
          const newCategoryArticles = [...newCategories[newCategoryIndex].articles];

          // Determine insert position in new category
          let insertIndex = newCategoryArticles.findIndex(art => art.id === overId);
          if (insertIndex === -1 && overType === 'category') { // Dropped on category header
            insertIndex = newCategoryArticles.length; // Insert at end if dropped on header
          }
          if (insertIndex !== -1) {
             newCategoryArticles.splice(insertIndex, 0, activeArticle);
          } else { // Fallback if target article not found, add to end (shouldn't happen with overId logic)
             newCategoryArticles.push(activeArticle);
          }

          newCategories[oldCategoryIndex] = { ...newCategories[oldCategoryIndex], articles: oldCategoryArticles, articleCount: oldCategoryArticles.length };
          newCategories[newCategoryIndex] = { ...newCategories[newCategoryIndex], articles: newCategoryArticles, articleCount: newCategoryArticles.length };

          console.log(`Moved article ${activeId} from ${oldCategoryId} to ${newCategoryId}`);
        }
      }
      return { ...prevKbData, categories: newCategories };
    });
  }, [findCategoryOfItem]);


  const trialDaysLeft = kbData.trialDaysLeft;

  return (
    <div className="flex flex-col flex-1 bg-gray-50 overflow-y-auto"> {/* Main page background (gray-50) */}
      {/* Top Yellow Bar - Remains a distinct bar */}
      <div className="bg-yellow-400 text-center py-2 relative">
        <span className="text-sm font-medium text-gray-800">Subscribe to KnowledgeBase</span>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 flex items-center text-gray-800 text-sm font-medium">
          <span className="inline-block p-1 bg-white rounded-full mr-1">{trialDaysLeft}</span> trial days left
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-800 text-sm">
          <LinkIcon className="w-4 h-4 mr-1 text-gray-600"/>
          <span className="text-gray-600">{kbData.kbId}</span>
          <label className="flex items-center cursor-pointer ml-3">
            <div className="relative">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="block bg-gray-300 w-10 h-5 rounded-full transition-colors peer-checked:bg-green-500"></div>
              <div className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Main Content Area - Overall white background, sits on gray-50 page background */}
      <div className="flex-1 p-6 bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-semibold text-gray-800">{sectionConfig?.label || "My knowledge base"}</h1>
            <ChevronDownIcon className="w-5 h-5 text-gray-500 cursor-pointer"/>
            <span className="text-green-600 text-xs font-medium ml-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Live / Publicly Available
            </span>
          </div>
          <div className="flex space-x-2 relative">
            <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Import</button>
            <button
              onClick={handleAddNewButtonClick}
              ref={addButtonRef}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
            >
              <PlusIcon className="w-4 h-4 mr-1.5"/> Add new
            </button>

            {/* Add New Pop-up Menu */}
            {isAddMenuOpen && (
              <div
                ref={addMenuRef}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
              >
                <div
                  onClick={() => handleAddMenuItemClick('new_topic')}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  New Topic
                </div>
                <div
                  onClick={() => handleAddMenuItemClick('new_article')}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  New Article
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 mb-6">
          {/* Filters Column */}
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <span className="text-gray-600">Filters</span>
            <button
              onClick={() => handleFilterChange('All')}
              className={`px-3 py-1.5 rounded-md text-left ${activeFilter === 'All' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >All</button>
            <button
              onClick={() => handleFilterChange('Published')}
              className={`px-3 py-1.5 rounded-md text-left ${activeFilter === 'Published' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >Published</button>
            <button
              onClick={() => handleFilterChange('Draft')}
              className={`px-3 py-1.5 rounded-md text-left ${activeFilter === 'Draft' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >Draft</button>
          </div>

          {/* Search and Content Column */}
          <div className="flex flex-col">
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Find an article"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            </div>

            {/* Category Sections / Articles List with DnD */}
            {loading ? (
              <div className="animate-pulse space-y-6">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ) : filteredCategories.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                dropAnimation={dropAnimation}
                measuring={ { droppable: { strategy: MeasuringStrategy.Always } } }
              >
                <SortableContext items={filteredCategories.map(c => c.id)} strategy={verticalListSortingStrategy}>
                  {filteredCategories.map(category => (
                    <CategorySection
                      key={category.id}
                      id={category.id}
                      category={category}
                      onAddArticle={handleAddArticle}
                      onArticleMoreActions={handleArticleMoreActions}
                      onArticleClick={handleArticleClick}
                      onMoreActions={handleCategoryMoreActions}
                      articles={category.articles}
                      activeDragItem={activeDragItem} // <<<< FIX: Pass activeDragItem down to CategorySection
                    />
                  ))}
                </SortableContext>
                <DragOverlay>
                  {activeDragItem ? (
                    <div className="opacity-80">
                      {activeDragItem.type === 'category' ? (
                        <div className="flex items-center px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg shadow-md">
                          <Bars2Icon className="w-5 h-5 text-blue-600 mr-2 rotate-90"/>
                          <FolderOpenIcon className="w-5 h-5 text-blue-600 mr-2"/>
                          <span className="text-lg font-medium text-blue-800">{activeDragItem.category.name}</span>
                        </div>
                      ) : (
                        // Indent DragOverlay for articles and apply custom styling
                        // This matches the indentation of the ArticleRow
                        <div className="flex items-center px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg shadow-md" style={{ paddingLeft: '32px' }}>
                          <Bars2Icon className="w-5 h-5 text-blue-600 mr-2 rotate-90"/>
                          <DocumentTextIcon className="w-5 h-5 text-blue-600 mr-2"/>
                          <span className="text-gray-800 font-medium truncate">{activeDragItem.article.title}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            ) : (
              <p className="text-center text-gray-500 mt-10">No articles found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default KnowledgeBasePage;