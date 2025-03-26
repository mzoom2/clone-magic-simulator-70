
// This file centralizes all asset paths for easy management
export const assetPaths = {
  // Videos
  videos: {
    heroVideo: "/assets/media/hero-video.mp4",
  },
  
  // Images
  images: {
    // Experience photos
    experiencePhotos: {
      artExhibition: "/assets/media/art-exhibition.png",
      olumoRock: "/assets/media/olumo-rock.png",
      abeokuta: "/assets/media/abeokuta.png",
      nationalTheatre: "/assets/media/national-theatre.png",
    },
    
    // People photos
    people: {
      founder: "/assets/media/founder.png",
    },
    
    // Background images
    backgrounds: {
      founder: "/assets/media/founder-background.png",
      package: "/assets/media/package-background.png",
    }
  },
  
  // Legacy path mapping (for backward compatibility)
  // Maps the original file paths to the new organized assets
  legacy: {
    // Videos
    "/assets/videos/hero-video.mp4": "/assets/media/hero-video.mp4",
    
    // Images
    "/assets/images/founder.png": "/assets/media/founder.png",
    "/assets/images/founder-background.png": "/assets/media/founder-background.png",
    "/assets/images/package-background.png": "/assets/media/package-background.png",
    "/assets/images/art-exhibition.png": "/assets/media/art-exhibition.png",
    "/assets/images/olumo-rock.png": "/assets/media/olumo-rock.png",
    "/assets/images/abeokuta.png": "/assets/media/abeokuta.png",
    "/assets/images/national-theatre.png": "/assets/media/national-theatre.png",
  },
  
  // Helper function to convert old paths to new paths
  convertPath: (oldPath: string): string => {
    // First check if we have a direct mapping in legacy
    if (assetPaths.legacy[oldPath as keyof typeof assetPaths.legacy]) {
      return assetPaths.legacy[oldPath as keyof typeof assetPaths.legacy];
    }
    
    // If the path is already using the new format, return it
    if (oldPath.startsWith('/assets/media/')) {
      return oldPath;
    }
    
    // Handle simple replacements for older formats
    if (oldPath.startsWith('/assets/videos/')) {
      const filename = oldPath.split('/').pop();
      return `/assets/media/${filename}`;
    } 
    
    if (oldPath.startsWith('/assets/images/')) {
      const filename = oldPath.split('/').pop();
      return `/assets/media/${filename}`;
    }
    
    // Handle lovable-uploads paths
    if (oldPath.startsWith('/lovable-uploads/')) {
      const filename = oldPath.split('/').pop();
      return `/assets/media/${filename}`;
    }
    
    // Return original if no match
    return oldPath;
  }
};
