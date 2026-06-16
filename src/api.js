import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Palettes CRUD operations
export const savePalette = async (paletteData) => {
  try {
    const docRef = await addDoc(collection(db, 'palettes'), {
      ...paletteData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving palette:', error);
    throw error;
  }
};

export const getPalettes = async () => {
  try {
    const q = query(collection(db, 'palettes'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const palettes = [];
    querySnapshot.forEach((doc) => {
      palettes.push({ id: doc.id, ...doc.data() });
    });
    return palettes;
  } catch (error) {
    console.error('Error fetching palettes:', error);
    throw error;
  }
};

export const deletePalette = async (paletteId) => {
  try {
    await deleteDoc(doc(db, 'palettes', paletteId));
    return true;
  } catch (error) {
    console.error('Error deleting palette:', error);
    throw error;
  }
};

export const getPaletteById = async (paletteId) => {
  try {
    const docRef = doc(db, 'palettes', paletteId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error fetching palette:', error);
    throw error;
  }
};

// Reviews CRUD operations
export const addReview = async (reviewData) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

export const getReviews = async (batchSize = 20, lastDoc = null) => {
  try {
    let q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc'),
      limit(batchSize)
    );
    
    if (lastDoc) {
      q = query(
        collection(db, 'reviews'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(batchSize)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });
    
    return {
      reviews,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      hasMore: querySnapshot.docs.length === batchSize
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Mock data for development when Firebase is not configured
export const getMockReviews = () => {
  return [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      company: 'TechFlow',
      rating: 5,
      text: 'ColorCraft has revolutionized my design workflow. The AI suggestions are spot-on!',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      role: 'Frontend Developer',
      company: 'StartupLab',
      rating: 5,
      text: 'Perfect tool for creating consistent color systems. Love the export options!',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Emma Wilson',
      role: 'Creative Director',
      company: 'DesignStudio',
      rating: 5,
      text: 'The live preview feature is incredible. I can see exactly how colors work together before implementing.',
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'James Thompson',
      role: 'Product Designer',
      company: 'InnovateCorp',
      rating: 5,
      text: 'Best color palette generator I\'ve used. The harmony options are extensive and accurate.',
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Olivia Martinez',
      role: 'Brand Designer',
      company: 'BrandCraft',
      rating: 5,
      text: 'Saves me hours of work. The color role assignment feature is brilliant!',
      createdAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'David Kim',
      role: 'Web Developer',
      company: 'CodeForge',
      rating: 5,
      text: 'The export functionality is seamless. Integrates perfectly with our design workflow.',
      createdAt: new Date().toISOString()
    },
    {
      id: '7',
      name: 'Sophie Brown',
      role: 'Art Director',
      company: 'CreativeHub',
      rating: 5,
      text: 'Professional and intuitive. The gradient-based UI is stunning!',
      createdAt: new Date().toISOString()
    },
    {
      id: '8',
      name: 'Michael Chen',
      role: 'Design Lead',
      company: 'StudioX',
      rating: 5,
      text: 'The AI-powered generation creates palettes I would never think of. Amazing!',
      createdAt: new Date().toISOString()
    },
    {
      id: '9',
      name: 'Lisa Anderson',
      role: 'UX Designer',
      company: 'UserFirst',
      rating: 5,
      text: 'Clean interface and powerful features. Highly recommend to all designers.',
      createdAt: new Date().toISOString()
    },
    {
      id: '10',
      name: 'Robert Taylor',
      role: 'Freelance Designer',
      company: 'Independent',
      rating: 5,
      text: 'Game changer for my freelance work. Clients love the professional palettes.',
      createdAt: new Date().toISOString()
    },
    {
      id: '11',
      name: 'Jennifer Lee',
      role: 'Product Manager',
      company: 'TechVision',
      rating: 5,
      text: 'Essential tool for our design system. The consistency is outstanding.',
      createdAt: new Date().toISOString()
    },
    {
      id: '12',
      name: 'Alex Garcia',
      role: 'Graphic Designer',
      company: 'VisualLab',
      rating: 5,
      text: 'The color theory implementation is spot on. Professional grade tool.',
      createdAt: new Date().toISOString()
    },
    {
      id: '13',
      name: 'Amanda White',
      role: 'Brand Strategist',
      company: 'BrandPro',
      rating: 5,
      text: 'Perfect for creating brand color palettes. The results are always impressive.',
      createdAt: new Date().toISOString()
    },
    {
      id: '14',
      name: 'Kevin Zhang',
      role: 'UI Designer',
      company: 'AppCraft',
      rating: 5,
      text: 'The mobile preview is genius! Saves so much time in the design process.',
      createdAt: new Date().toISOString()
    },
    {
      id: '15',
      name: 'Rachel Green',
      role: 'Visual Designer',
      company: 'CreativeMinds',
      rating: 5,
      text: 'Intuitive and powerful. The best color tool I\'ve used in years.',
      createdAt: new Date().toISOString()
    },
    {
      id: '16',
      name: 'Daniel Park',
      role: 'Frontend Architect',
      company: 'DevSolutions',
      rating: 5,
      text: 'Technical excellence meets design. Perfect for our development team.',
      createdAt: new Date().toISOString()
    },
    {
      id: '17',
      name: 'Maria Lopez',
      role: 'Design Consultant',
      company: 'DesignConsult',
      rating: 5,
      text: 'Professional results every time. This tool pays for itself.',
      createdAt: new Date().toISOString()
    },
    {
      id: '18',
      name: 'Thomas Wright',
      role: 'Creative Technologist',
      company: 'TechArt',
      rating: 5,
      text: 'The perfect blend of creativity and technology. Absolutely love it!',
      createdAt: new Date().toISOString()
    },
    {
      id: '19',
      name: 'Jessica Scott',
      role: 'Digital Designer',
      company: 'DigitalWorks',
      rating: 5,
      text: 'Streamlined workflow and beautiful results. Can\'t imagine working without it.',
      createdAt: new Date().toISOString()
    },
    {
      id: '20',
      name: 'Christopher Lee',
      role: 'UI/UX Lead',
      company: 'DesignForge',
      rating: 5,
      text: 'Sets the standard for color palette tools. Simply outstanding!',
      createdAt: new Date().toISOString()
    }
  ];
};
