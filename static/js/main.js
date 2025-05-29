// Main JavaScript for Patrick Sheedy's Portfolio

(function() {
    'use strict';

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const postsGrid = document.getElementById('posts-grid');

    if (searchInput && window.searchIndex) {
        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => performSearch(this.value), 300);
        });

        searchInput.addEventListener('focus', function() {
            if (this.value.trim() && searchResults.children.length > 0) {
                searchResults.style.display = 'block';
            }
        });

        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchResults.contains(e.target) && e.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });

        if (searchButton) {
            searchButton.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
        }

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }

    function performSearch(query) {
        if (!query.trim() || !window.searchIndex) {
            searchResults.style.display = 'none';
            if (postsGrid) {
                showAllPosts();
            }
            return;
        }

        const results = fuzzySearch(query, window.searchIndex);
        displaySearchResults(results);
        
        if (postsGrid) {
            filterPosts(results);
        }
    }

    function fuzzySearch(query, index) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        
        return index.filter(item => {
            const searchText = (item.title + ' ' + item.content + ' ' + (item.tags || []).join(' ')).toLowerCase();
            return searchTerms.some(term => searchText.includes(term));
        }).sort((a, b) => {
            // Sort by relevance (title matches first, then content)
            const aScore = getRelevanceScore(a, searchTerms);
            const bScore = getRelevanceScore(b, searchTerms);
            return bScore - aScore;
        });
    }

    function getRelevanceScore(item, searchTerms) {
        let score = 0;
        const title = item.title.toLowerCase();
        const content = item.content.toLowerCase();
        
        searchTerms.forEach(term => {
            if (title.includes(term)) score += 10;
            if (content.includes(term)) score += 1;
        });
        
        return score;
    }

    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result"><p class="text-muted mb-0">No results found.</p></div>';
        } else {
            searchResults.innerHTML = results.slice(0, 5).map(result => `
                <div class="search-result" onclick="window.location.href='${result.url}'">
                    <h6 class="mb-1">${highlightSearchTerms(result.title, searchInput.value)}</h6>
                    <p class="mb-1">${highlightSearchTerms(truncateText(result.summary || result.content, 100), searchInput.value)}</p>
                    <small>${new Date(result.date).toLocaleDateString()}</small>
                </div>
            `).join('');
        }
        searchResults.style.display = 'block';
    }

    function highlightSearchTerms(text, query) {
        if (!query.trim()) return text;
        
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        let highlightedText = text;
        
        searchTerms.forEach(term => {
            const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });
        
        return highlightedText;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    function filterPosts(results) {
        const postItems = postsGrid.querySelectorAll('.post-item');
        const resultUrls = results.map(r => r.url);
        
        postItems.forEach(item => {
            const link = item.querySelector('a[href]');
            if (link && resultUrls.includes(link.getAttribute('href'))) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function showAllPosts() {
        const postItems = postsGrid.querySelectorAll('.post-item');
        postItems.forEach(item => {
            item.style.display = 'block';
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and other elements for animation
    document.querySelectorAll('.card, .skill-card').forEach(card => {
        observer.observe(card);
    });

    // Contact form handling (if present)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Simple form validation
            if (!data.name || !data.email || !data.message) {
                showAlert('Please fill in all required fields.', 'warning');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showAlert('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert at top of container
        const container = document.querySelector('.container');
        if (container) {
            container.insertBefore(alertDiv, container.firstChild);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 5000);
        }
    }

    // Copy code blocks functionality
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-secondary copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copy code';
        
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';
    });

    // Reading progress indicator for blog posts
    if (document.body.classList.contains('single') || window.location.pathname.includes('/posts/')) {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--primary-color);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Initialize tooltips and popovers if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Initialize popovers
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }

    console.log('🚀 Patrick Sheedy Portfolio - JavaScript Loaded');
})();
