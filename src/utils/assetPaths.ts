
// This file maps the original file paths to the new organized assets
export const assetPaths = {
  // Videos
  heroVideo: {
    original: '/lovable-uploads/1bfbcad9-04e3-445e-8d19-840a15a1642a.mp4',
    new: '/assets/videos/hero-video.mp4'
  },
  
  // Images
  founderImage: {
    original: '/lovable-uploads/5105021d-b044-4cfc-8833-37ce9098c033.png',
    new: '/assets/images/founder.png'
  },
  founderBackground: {
    original: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    new: '/assets/images/founder-background.png'
  },
  packageBackground: {
    original: '/lovable-uploads/97c40b5f-db2d-4367-a2ae-4a67d17b3bb2.png',
    new: '/assets/images/package-background.png'
  },
  
  // Experience Photos
  artExhibition: {
    original: '/lovable-uploads/96279a5f-6291-4c07-9ed1-946fbc4ae3dc.png',
    new: '/assets/images/art-exhibition.png'
  },
  olumoRock: {
    original: '/lovable-uploads/99d1a1e9-33f0-48d1-884c-3aa027ee3443.png',
    new: '/assets/images/olumo-rock.png'
  },
  abeokuta: {
    original: '/lovable-uploads/98c065bb-d219-401e-90c2-6c8db78dbb40.png',
    new: '/assets/images/abeokuta.png'
  },
  nationalTheatre: {
    original: '/lovable-uploads/5617c3ad-1f1f-4878-ae9a-40862d14df7b.png',
    new: '/assets/images/national-theatre.png'
  },
  
  // Helper function to convert old paths to new paths
  convertPath: (oldPath: string): string => {
    // If the path is already using the new format, return it
    if (oldPath.startsWith('/assets/')) {
      return oldPath;
    }
    
    // Handle simple replacements for lovable-uploads
    if (oldPath.startsWith('/lovable-uploads/')) {
      const filename = oldPath.split('/').pop();
      
      // Determine if it's a video or image based on extension
      if (filename?.endsWith('.mp4')) {
        return `/assets/videos/${filename}`;
      } else {
        return `/assets/images/${filename}`;
      }
    }
    
    // Return original if no match
    return oldPath;
  }
};
