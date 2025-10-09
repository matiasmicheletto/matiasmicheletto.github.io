// Image Carousel with Dissolve Effect
(function() {
    // Array of carousel images
    const carouselImages = [
        'images/carrousel/image1.jpeg',
        'images/carrousel/image2.jpeg',
        'images/carrousel/image3.jpeg',
        'images/carrousel/image4.jpeg'
    ];
    
    let currentImageIndex = 0;
    let carouselInterval;
    
    // Initialize carousel when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        const carouselImage = document.getElementById('carousel-image');
        
        if (!carouselImage) {
            console.warn('Carousel image element not found');
            return;
        }
        
        // Start the carousel
        startCarousel();
        
        // Pause carousel on hover
        carouselImage.addEventListener('mouseenter', pauseCarousel);
        carouselImage.addEventListener('mouseleave', startCarousel);
    });
    
    function startCarousel() {
        // Clear any existing interval
        if (carouselInterval) {
            clearInterval(carouselInterval);
        }
        
        // Set interval to change image every 2 seconds
        carouselInterval = setInterval(changeImage, 3000);
    }
    
    function pauseCarousel() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }
    
    function changeImage() {
        const carouselImage = document.getElementById('carousel-image');
        
        if (!carouselImage) {
            pauseCarousel();
            return;
        }
        
        // Add fade-out class to start dissolve effect
        carouselImage.classList.add('fade-out');
        
        // After fade out completes, change image and fade in
        setTimeout(function() {
            // Move to next image index
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            
            // Change the image source
            carouselImage.src = carouselImages[currentImageIndex];
            
            // Update alt text
            carouselImage.alt = `Carousel Image ${currentImageIndex + 1}`;
            
            // Remove fade-out class to fade in the new image
            carouselImage.classList.remove('fade-out');
        }, 500); // Wait for half the CSS transition duration
    }
    
    // Preload images for smoother transitions
    function preloadImages() {
        carouselImages.forEach(function(imageSrc) {
            const img = new Image();
            img.src = imageSrc;
        });
    }
    
    // Preload images when script loads
    preloadImages();
    
    // Public API for manual control (optional)
    window.CarouselAPI = {
        next: function() {
            changeImage();
        },
        pause: pauseCarousel,
        resume: startCarousel,
        getCurrentIndex: function() {
            return currentImageIndex;
        }
    };
})();
