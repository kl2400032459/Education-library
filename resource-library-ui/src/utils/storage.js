// App Local Storage Utility for mock backend

export const getDownloads = () => {
    return JSON.parse(localStorage.getItem('edu_downloads') || '[]');
};

export const addDownload = (resource) => {
    const downloads = getDownloads();
    if (!downloads.find(d => d.id === resource.id)) {
        downloads.push({
            id: resource.id,
            title: resource.title,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('edu_downloads', JSON.stringify(downloads));
    }
};

export const getBookmarks = () => {
    return JSON.parse(localStorage.getItem('edu_bookmarks') || '[]');
};

export const addBookmark = (resource) => {
    const bookmarks = getBookmarks();
    if (!bookmarks.find(b => b.id === resource.id)) {
        bookmarks.push({
            id: resource.id,
            title: resource.title,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('edu_bookmarks', JSON.stringify(bookmarks));
    }
};

export const removeBookmark = (id) => {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(b => b.id !== id);
    localStorage.setItem('edu_bookmarks', JSON.stringify(bookmarks));
};

export const isBookmarked = (id) => {
    return getBookmarks().some(b => b.id === id);
};

export const getFeedback = () => {
    return JSON.parse(localStorage.getItem('edu_feedback') || '[]');
};

export const addFeedback = (feedbackItem) => {
    const feedback = getFeedback();
    feedback.push(feedbackItem);
    localStorage.setItem('edu_feedback', JSON.stringify(feedback));
};
