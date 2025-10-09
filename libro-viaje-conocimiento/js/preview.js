// Array of images for the book preview
const bookImages = [
    { src: 'images/cover.jpg', alt: 'Book Cover' },
    null, // blank page
    { src: 'images/paginas/p1.png', alt: 'Page 1' },
    null, // blank page
    { src: 'images/paginas/p2.png', alt: 'Page 2' },
    { src: 'images/paginas/p3.png', alt: 'Page 3' },
    { src: 'images/paginas/p4.png', alt: 'Page 4' },
    { src: 'images/paginas/p5.png', alt: 'Page 5' },
    { src: 'images/paginas/p6.png', alt: 'Page 6' },
    null, // blank page
    { src: 'images/paginas/p7.png', alt: 'Page 7' },
    { src: 'images/paginas/p8.png', alt: 'Page 8' },
    { src: 'images/paginas/p9.png', alt: 'Page 9' },
    { src: 'images/paginas/p10.png', alt: 'Page 10' },
    { src: 'images/paginas/p11.png', alt: 'Page 11' },
    null, // blank page
    { src: 'images/paginas/p12.png', alt: 'Page 12' },
    { src: 'images/paginas/p13.png', alt: 'Page 13' },
    { src: 'images/paginas/p14.png', alt: 'Page 14' },
    { src: 'images/cover-back.jpg', alt: 'Synopsis' }
];

// Function to generate book pages dynamically
function generateBookPages() {
    const pagesContainer = document.getElementById('pages');
    
    // Clear existing content
    pagesContainer.innerHTML = '';
    
    // Generate pages from the images array
    bookImages.forEach((imageData, index) => {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'page';
        
        if (imageData !== null) {
            // Add cover class for pages with images
            pageDiv.className += ' cover';
            
            // Create and configure image element
            const img = document.createElement('img');
            img.className = 'page-img';
            img.src = imageData.src;
            img.alt = imageData.alt;
            
            // Add error handling for missing images
            img.onerror = function() {
                console.warn(`Failed to load image: ${imageData.src}`);
                this.src = 'images/placeholder.png'; // fallback image
            };
            
            pageDiv.appendChild(img);
        }
        // Blank pages remain empty (no cover class, no image)
        
        pagesContainer.appendChild(pageDiv);
    });
}

// Initialize book functionality
(initBook = () => {
    document.addEventListener('DOMContentLoaded', () => {
        // Generate book pages dynamically
        generateBookPages();
        
        // Get pages after generation
        var pages = document.getElementsByClassName('page');
        
        // Set z-index for proper layering
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (i % 2 === 0) {
                page.style.zIndex = (pages.length - i);
            }
        }
        
        // Add click functionality for page flipping
        for (var i = 0; i < pages.length; i++) {
            pages[i].pageNum = i + 1;
            pages[i].onclick = function () {
                if (this.pageNum % 2 === 0) {
                    this.classList.remove('flipped');
                    this.previousElementSibling.classList.remove('flipped');
                } else {
                    this.classList.add('flipped');
                    this.nextElementSibling.classList.add('flipped');
                }
            }
        }
    });
})();