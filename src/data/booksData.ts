import { Book } from '../types/book';

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-1',
    title: 'The Shadow of the Wind',
    subtitle: 'The Cemetery of Forgotten Books',
    author: 'Carlos Ruiz Zafón',
    authorBio: 'Carlos Ruiz Zafón was a Spanish novelist whose works have been translated into more than forty languages, enchanting millions across the globe.',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    category: 'Classics',
    subcategory: 'Victorian Novels',
    genre: ['Literary Mystery', 'Historical Fiction', 'Gothic Novel'],
    rating: 4.8,
    reviewCount: 342,
    formats: [
      {
        type: 'Paperback',
        price: 399,
        originalPrice: 499,
        inStock: true,
        stockCount: 14,
        details: 'Premium deckle-edge paperback, 512 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 799,
        originalPrice: 999,
        inStock: true,
        stockCount: 6,
        details: 'Embossed clothbound collector edition with silk bookmark',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 249,
        inStock: true,
        details: 'Instant DRM-free download (EPUB / MOBI / PDF), 3.2 MB',
        isDigital: true,
        fileSizeBytes: 3355443
      },
      {
        type: 'Audiobook',
        price: 499,
        originalPrice: 650,
        inStock: true,
        details: 'Unabridged narration by Jonathan Davis, 18h 12m',
        isDigital: true,
        audioDurationMinutes: 1092
      }
    ],
    description: 'Barcelona, 1945: A city slowly heals from its war wounds, and Daniel, an antiquarian book dealer’s son who mourns the loss of his mother, finds solace in a mysterious book entitled The Shadow of the Wind, by one Julián Carax. But when he looks for other titles by the author, he discovers someone has been systematically destroying every copy.',
    aboutBook: 'A spellbinding tale of love, revenge, literature, and the shadows of Francoist Barcelona. Zafón crafts a labyrinthine homage to bibliophiles that reads like a waking dream.',
    aboutAuthor: 'Carlos Ruiz Zafón (1964–2020) was one of the most widely read contemporary Spanish writers. His internationally acclaimed cycle began with The Shadow of the Wind.',
    keyThemes: ['Bibliomania', 'Lost Barcelona', 'Memory & Grief', 'Forbidden Love', 'The Power of Storytelling'],
    publicationDate: 'April 2004',
    publisher: 'Penguin Classics',
    language: 'English (Translated by Lucia Graves)',
    pageCount: 512,
    isbn: '978-0143034902',
    featuredQuote: 'Books are mirrors: you only see in them what you already have inside you.',
    specialCollections: ['classics-everyone-should-read', 'award-winning-books', 'weekend-reads', 'bestseller'],
    frequentlyBoughtTogetherIds: ['book-2', 'book-4'],
    similarBookIds: ['book-2', 'book-11', 'book-14'],
    hasAudioSample: true,
    audioSampleDuration: '3m 45s',
    audioNarrator: 'Jonathan Davis',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'The Cemetery of Forgotten Books',
        paragraphs: [
          'I still remember the day my father took me to the Cemetery of Forgotten Books for the first time. It was early summer 1945, and we walked through the streets of a Barcelona trapped beneath skies of ashen ash and a cold sun that spread across the Rambla de Santa Mónica like a garland of liquid brass.',
          '“Daniel, not a word of what you’re about to see to anyone,” my father warned. “Not even to your friend Tomás. Nobody.”',
          '“Not even to Mother?” I whispered.',
          'My father lowered his eyes, wearing that pale, bruised smile that seemed to haunt him every time he remembered my mother. “She already knows,” he said softly.',
          'We stepped into an old palazzo whose cavernous facade had been blackened by time and salt air. An elderly keeper with milky spectacles bowed deeply before us and unlocked an arched iron grille with a heavy brass key.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'A Secret Preserved in Dust',
        paragraphs: [
          '“According to tradition, the first time someone visits this place, he must choose one book, whichever he likes, and adopt it,” my father said, gently resting his hand upon my shoulder. “He must ensure it never disappears, that it remains alive forever. It is a sacred pledge.”',
          'For more than half an hour I wandered through that labyrinth of spiraling shelves, past volumes whose titles had vanished under decades of dust, until my fingertips brushed a leather spine worn smooth like river pebble.',
          'The title was stamped in tarnished gold: The Shadow of the Wind, by Julián Carax. I had never heard of the author, but as I opened the cover, the scent of aged ink and paper engulfed me like a forgotten promise.'
        ]
      }
    ]
  },
  {
    id: 'book-2',
    title: 'Meditations',
    subtitle: 'The Emperor’s Private Journal',
    author: 'Marcus Aurelius',
    authorBio: 'Marcus Aurelius Antoninus was Roman Emperor from 161 to 180 AD and a Stoic philosopher whose private writings on virtue and duty remain immortal.',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    category: 'Classics',
    subcategory: 'Philosophical Classics',
    genre: ['Philosophy', 'Stoicism', 'Ancient Wisdom'],
    rating: 4.9,
    reviewCount: 520,
    formats: [
      {
        type: 'Paperback',
        price: 249,
        originalPrice: 299,
        inStock: true,
        stockCount: 30,
        details: 'Compact archival paperback with Gregory Hays translation',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 599,
        originalPrice: 750,
        inStock: true,
        stockCount: 12,
        details: 'Clothbound classic with ribbon marker and gold debossing',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 99,
        inStock: true,
        details: 'Instant EPUB / MOBI download',
        isDigital: true,
        fileSizeBytes: 1845000
      },
      {
        type: 'Audiobook',
        price: 299,
        originalPrice: 399,
        inStock: true,
        details: 'Read by Duncan Steen, 5h 20m',
        isDigital: true,
        audioDurationMinutes: 320
      }
    ],
    description: 'Written in Greek without any intention of publication by the only Roman emperor who was also a philosopher, the Meditations of Marcus Aurelius offer a remarkable series of challenging spiritual reflections and exercises developed as the emperor struggled to understand himself and make sense of the universe.',
    aboutBook: 'A cornerstone of practical philosophy. Never intended for public consumption, these private notes capture a human emperor striving for integrity, patience, and inner equilibrium in the midst of empire and pestilence.',
    aboutAuthor: 'Marcus Aurelius governed the Roman Empire during plague and barbarian incursions, writing down his most personal ethical compass by lantern light in military tents.',
    keyThemes: ['Inner Fortress', 'Acceptance of Mortality', 'Universal Reason', 'Duty & Service', 'Equanimity'],
    publicationDate: 'May 2002',
    publisher: 'Modern Library Classics',
    language: 'English (Translated by Gregory Hays)',
    pageCount: 256,
    isbn: '978-0812968255',
    featuredQuote: 'You have power over your mind - not outside events. Realize this, and you will find strength.',
    specialCollections: ['classics-everyone-should-read', 'books-under-299', 'books-for-students', 'bestseller'],
    frequentlyBoughtTogetherIds: ['book-1', 'book-8'],
    similarBookIds: ['book-8', 'book-12'],
    hasAudioSample: true,
    audioSampleDuration: '2m 30s',
    audioNarrator: 'Duncan Steen',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Debts and Lessons',
        paragraphs: [
          'From my grandfather Verus: character and self-control.',
          'From the reputation and memory of my father: integrity and manliness.',
          'From my mother: piety and generosity, and the avoidance not only of doing evil, but even of thinking it; and further, simplicity of living, far removed from the habits of the rich.',
          'From my great-grandfather: not having attended schools for the public, but having enjoyed good teachers at home, and having learned that on such things one should spend lavishly.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'On the River Gran, Among the Quadi',
        paragraphs: [
          'When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil.',
          'But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own — not of the same blood or birth, but the same mind, and possessing a share of the divine.',
          'None of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my fellow citizen, nor hate him. We were made to work together like hands, like feet, like the rows of the upper and lower teeth.'
        ]
      }
    ]
  },
  {
    id: 'book-3',
    title: 'Sapiens: A Brief History of Humankind',
    subtitle: 'From the Stone Age to Silicon',
    author: 'Yuval Noah Harari',
    authorBio: 'Yuval Noah Harari is an Israeli historian, philosopher, and professor in the Department of History at the Hebrew University of Jerusalem.',
    cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    category: 'History',
    subcategory: 'World History',
    genre: ['Anthropology', 'World History', 'Evolutionary Biology'],
    rating: 4.7,
    reviewCount: 680,
    formats: [
      {
        type: 'Paperback',
        price: 449,
        originalPrice: 599,
        inStock: true,
        stockCount: 22,
        details: 'Illustrated international paperback edition, 498 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 899,
        originalPrice: 1100,
        inStock: true,
        stockCount: 9,
        details: 'Hardback volume with colored plates and timeline endpapers',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 299,
        inStock: true,
        details: 'Immediate digital download in EPUB / PDF formats',
        isDigital: true,
        fileSizeBytes: 8400000
      },
      {
        type: 'Audiobook',
        price: 549,
        originalPrice: 799,
        inStock: true,
        details: 'Narrated by Derek Perkins, 15h 17m unabridged',
        isDigital: true,
        audioDurationMinutes: 917
      }
    ],
    description: '100,000 years ago, at least six human species inhabited the earth. Today there is just one: Homo sapiens. How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms? How did we come to believe in gods, nations, and human rights?',
    aboutBook: 'Yuval Noah Harari synthesizes evolutionary biology, anthropology, and economics to chart the singular story of human rise, our cognitive revolution, and the shared myths that govern our modern existence.',
    aboutAuthor: 'Dr. Yuval Noah Harari received his PhD from Oxford and his books have sold over 45 million copies in 65 languages worldwide.',
    keyThemes: ['Cognitive Revolution', 'Intersubjective Reality', 'Agricultural Trap', 'Scientific Breakthroughs', 'The Future of Consciousness'],
    publicationDate: 'February 2015',
    publisher: 'HarperCollins',
    language: 'English',
    pageCount: 498,
    isbn: '978-0062316097',
    featuredQuote: 'You could never convince a monkey to give you a banana by promising him limitless bananas after death in monkey heaven.',
    specialCollections: ['award-winning-books', 'bestseller', 'books-for-students', 'featured'],
    frequentlyBoughtTogetherIds: ['book-6', 'book-7'],
    similarBookIds: ['book-6', 'book-7', 'book-12'],
    hasAudioSample: true,
    audioSampleDuration: '3m 10s',
    audioNarrator: 'Derek Perkins',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'An Animal of No Significance',
        paragraphs: [
          'About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics.',
          'About 300,000 years after their appearance, matter and energy started to coalesce into complex structures, called atoms, which then combined into molecules. The story of atoms, molecules and their interactions is called chemistry.',
          'About 3.8 billion years ago, on a planet called Earth, certain molecules combined to form particularly large and intricate structures called organisms. The story of organisms is called biology.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'The Tree of Knowledge',
        paragraphs: [
          'In the new world of Homo sapiens, linguistic competence evolved beyond signalling the presence of lions or rivers. The truly unique feature of our language is not its ability to transmit information about men and lions. Rather, it is the ability to transmit information about things that do not exist at all.',
          'As far as we know, only Sapiens can talk about entire suites of entities that they have never seen, touched, or smelled: legends, myths, gods, and religions appeared for the first time with the Cognitive Revolution.'
        ]
      }
    ]
  },
  {
    id: 'book-4',
    title: 'The Silent Patient',
    subtitle: 'A Psychological Labyrinth',
    author: 'Alex Michaelides',
    authorBio: 'Alex Michaelides was born in Cyprus and read English literature at Cambridge University. He is a screenwriter and internationally bestselling novelist.',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800',
    category: 'Mystery & Thriller',
    subcategory: 'Psychological Thrillers',
    genre: ['Psychological Fiction', 'Crime Mystery', 'Suspense'],
    rating: 4.6,
    reviewCount: 412,
    formats: [
      {
        type: 'Paperback',
        price: 299,
        originalPrice: 399,
        inStock: true,
        stockCount: 18,
        details: 'Mass market trade paperback edition, 336 pages',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 199,
        inStock: true,
        details: 'Immediate download EPUB / PDF with reader bookmarking',
        isDigital: true,
        fileSizeBytes: 2450000
      },
      {
        type: 'Audiobook',
        price: 349,
        originalPrice: 499,
        inStock: true,
        details: 'Dual narration by Jack Hawkins and Louise Brealey, 8h 43m',
        isDigital: true,
        audioDurationMinutes: 523
      }
    ],
    description: 'Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London’s most desirable areas. One evening, she shoots her husband five times in the face and never speaks another word.',
    aboutBook: 'A breathless psychological shocker inspired by the Greek tragedy Alcestis. Psychotherapist Theo Faber seeks to unlock Alicia’s silence, unaware that every mystery extracts its price.',
    aboutAuthor: 'Alex Michaelides’ debut novel spent over a year on the New York Times bestseller list and was optioned for film production by Plan B Entertainment.',
    keyThemes: ['Trauma & Silence', 'Greek Myth', 'Obsession', 'Unreliable Memory', 'Transference'],
    publicationDate: 'February 2019',
    publisher: 'Celadon Books',
    language: 'English',
    pageCount: 336,
    isbn: '978-1250301696',
    featuredQuote: 'Remember, love that doesn’t include honesty doesn’t deserve to be called love.',
    specialCollections: ['weekend-reads', 'bestseller', 'books-under-299'],
    frequentlyBoughtTogetherIds: ['book-1', 'book-11'],
    similarBookIds: ['book-1', 'book-11'],
    hasAudioSample: true,
    audioSampleDuration: '2m 45s',
    audioNarrator: 'Jack Hawkins & Louise Brealey',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Alicia Berenson’s Diary',
        paragraphs: [
          'July 14. I don’t know why I’m writing this. That’s not true. Perhaps I do know, and I’m just pretending to myself.',
          'Gabriel told me to keep a diary. He gave me this notebook yesterday — small, clothbound, with thick cream paper. “Whenever you feel an attack of the black dog,” he said, “write it down. Don’t hold it inside.”',
          'I love Gabriel so much. He is the anchor that ties me to reality. Without him, I drift away into nothingness.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'The Grove',
        paragraphs: [
          'My name is Theo Faber. I am a forensic psychotherapist.',
          'I was forty-two when Alicia Berenson murdered her husband. I had worked at a high-security psychiatric unit in Broadmoor, and when the position opened up at The Grove in North London where Alicia was housed, I applied immediately.',
          'Everyone thought she was a monster. I only saw a wounded soul whose silence was an SOS scream.'
        ]
      }
    ]
  },
  {
    id: 'book-5',
    title: 'Pride and Prejudice',
    subtitle: 'The Definitive Illustrated Edition',
    author: 'Jane Austen',
    authorBio: 'Jane Austen was an English novelist known primarily for her six major novels, which critique the British landed gentry at the end of the 18th century.',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    category: 'Romance',
    subcategory: 'Regency Sagas',
    genre: ['Regency Romance', 'Satire', 'Literary Classic'],
    rating: 4.9,
    reviewCount: 780,
    formats: [
      {
        type: 'Paperback',
        price: 219,
        originalPrice: 280,
        inStock: true,
        stockCount: 40,
        details: 'Classic paperback with historical preface, 416 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 649,
        originalPrice: 850,
        inStock: true,
        stockCount: 15,
        details: 'Peacock edition gold-stamped clothbound hardcover',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 49,
        inStock: true,
        details: 'Instant EPUB / MOBI download',
        isDigital: true,
        fileSizeBytes: 1200000
      },
      {
        type: 'Audiobook',
        price: 199,
        originalPrice: 299,
        inStock: true,
        details: 'Narrated by Rosamund Pike, 11h 35m unabridged',
        isDigital: true,
        audioDurationMinutes: 695
      }
    ],
    description: 'The romantic clash between the opinionated Elizabeth Bennet and her proud beau, Mr. Fitzwilliam Darcy, is a splendid performance of civilized sparring. Austen’s radiant wit sparkles as Elizabeth and Darcy dance through societal conventions and inward transformation.',
    aboutBook: 'Few novels have captured the comedic nuance of courtship and human frailty with such enduring precision. Jane Austen’s masterpiece remains the gold standard of literary romance.',
    aboutAuthor: 'Jane Austen (1775–1817) published her works anonymously during her lifetime, etching characters whose moral intelligence and humor continue to beguile audiences two centuries later.',
    keyThemes: ['First Impressions', 'Social Class & Pride', 'Feminine Independence', 'Wit & Propriety'],
    publicationDate: 'January 1813',
    publisher: 'Penguin English Library',
    language: 'English',
    pageCount: 416,
    isbn: '978-0141439518',
    featuredQuote: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    specialCollections: ['classics-everyone-should-read', 'books-under-299', 'beginner-friendly-reads', 'weekend-reads'],
    frequentlyBoughtTogetherIds: ['book-1', 'book-2'],
    similarBookIds: ['book-1', 'book-10'],
    hasAudioSample: true,
    audioSampleDuration: '2m 15s',
    audioNarrator: 'Rosamund Pike',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Netherfield Park Is Let',
        paragraphs: [
          'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
          'However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.',
          '“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”',
          'Mr. Bennet replied that he had not.',
          '“But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.”'
        ]
      }
    ]
  },
  {
    id: 'book-6',
    title: 'The Name of the Wind',
    subtitle: 'The Kingkiller Chronicle: Day One',
    author: 'Patrick Rothfuss',
    authorBio: 'Patrick Rothfuss is an American author of epic fantasy. His Kingkiller Chronicle was hailed by George R.R. Martin and Ursula K. Le Guin.',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    category: 'Fantasy & Sci-Fi',
    subcategory: 'High Fantasy',
    genre: ['Heroic Fantasy', 'Epic Fantasy', 'Magic Realism'],
    rating: 4.8,
    reviewCount: 490,
    formats: [
      {
        type: 'Paperback',
        price: 499,
        originalPrice: 650,
        inStock: true,
        stockCount: 16,
        details: 'Special 10th anniversary paperback with revised maps, 672 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 999,
        originalPrice: 1350,
        inStock: true,
        stockCount: 5,
        details: 'Deluxe slipcase illustrated edition with silver guilding',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 299,
        inStock: true,
        details: 'DRM-free digital EPUB with high-resolution appendix map',
        isDigital: true,
        fileSizeBytes: 4800000
      },
      {
        type: 'Audiobook',
        price: 599,
        originalPrice: 850,
        inStock: true,
        details: 'Narrated by Nick Podehl, 27h 55m master recording',
        isDigital: true,
        audioDurationMinutes: 1675
      }
    ],
    description: 'Told in Kvothe’s own voice, this is the tale of the magically gifted young man who grows to be the most notorious wizard his world has ever seen. The intimate story of his childhood in a troupe of traveling players, his years spent as a near-feral orphan in a crime-riddled city, his daringly brazen attempt to enter a legendary school of magic.',
    aboutBook: 'A fantasy masterpiece rich in musicality, mystery, and deep longing. Rothfuss writes prose so lyrical it feels crafted by an archivist of mythical song.',
    aboutAuthor: 'Patrick Rothfuss holds a Master of Arts in English from Washington State University and lives in central Wisconsin.',
    keyThemes: ['True Names', 'Music as Sorcery', 'Grief & Vengeance', 'The University Arcana', 'The Silence of Three Parts'],
    publicationDate: 'March 2007',
    publisher: 'DAW Books',
    language: 'English',
    pageCount: 672,
    isbn: '978-0756404741',
    featuredQuote: 'It was the patient, cut-flower sound of a man who is waiting to die.',
    specialCollections: ['award-winning-books', 'weekend-reads', 'bestseller'],
    frequentlyBoughtTogetherIds: ['book-1', 'book-3'],
    similarBookIds: ['book-1', 'book-14'],
    hasAudioSample: true,
    audioSampleDuration: '3m 50s',
    audioNarrator: 'Nick Podehl',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'A Silence of Three Parts',
        paragraphs: [
          'It was night again. The Waystone Inn lay in silence, and it was a silence of three parts.',
          'The most obvious part was a hollow, echoing quiet, made by things that were lacking. If there had been a wind it would have sighed through the trees, set the inn’s sign creaking on its hooks, and brushed the silence down the road like trailing autumn leaves.',
          'The second silence was a small, sullen quiet, made by things that were present. If there had been a fire in the hearth it would have crackled and spat, but the hearth was cold and dark.',
          'The third silence was not an easy thing to notice. If you listened for an hour, you might begin to feel it in the wooden floorboards underfoot and in the rough, splintering barrels beside the beer taps. It was in the weight of the black stone hearth that held the heat of a long dead fire. It was in the slow back and forth of a white linen cloth rubbing along the grain of the mahogany bar.'
        ]
      }
    ]
  },
  {
    id: 'book-7',
    title: 'Designing Data-Intensive Applications',
    subtitle: 'The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
    author: 'Martin Kleppmann',
    authorBio: 'Martin Kleppmann is a researcher in distributed systems at the University of Cambridge and a veteran engineer at LinkedIn.',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    category: 'Technology & AI',
    subcategory: 'Software Architecture',
    genre: ['Computer Science', 'Distributed Systems', 'Software Engineering'],
    rating: 4.9,
    reviewCount: 395,
    formats: [
      {
        type: 'Paperback',
        price: 999,
        originalPrice: 1250,
        inStock: true,
        stockCount: 19,
        details: 'O’Reilly definitive edition with architectural diagrams, 616 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 1599,
        originalPrice: 1899,
        inStock: true,
        stockCount: 7,
        details: 'Collector hardcover library binding with cloth ribbon',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 499,
        inStock: true,
        details: 'Searchable vector PDF + EPUB with full-color code listings',
        isDigital: true,
        fileSizeBytes: 14500000
      }
    ],
    description: 'Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. In this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse and fast-changing landscape of technologies.',
    aboutBook: 'Widely regarded by software architects as the modern bible of backend engineering. It pierces the veil of buzzwords to explain the fundamental tradeoffs of storage engines, consensus protocols, and stream processors.',
    aboutAuthor: 'Martin Kleppmann holds a PhD from the University of Cambridge and has designed data infrastructure used by hundreds of millions of users.',
    keyThemes: ['Replication & Partitions', 'ACID vs BASE', 'Stream Processing', 'Byzantine Fault Tolerance', 'System Architecture'],
    publicationDate: 'March 2017',
    publisher: 'O’Reilly Media',
    language: 'English',
    pageCount: 616,
    isbn: '978-1449373320',
    featuredQuote: 'A system is distributed if the failure of a computer you didn’t even know existed can render your own computer unusable.',
    specialCollections: ['books-for-students', 'featured'],
    frequentlyBoughtTogetherIds: ['book-3', 'book-8'],
    similarBookIds: ['book-12', 'book-3'],
    hasAudioSample: false,
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Reliable, Scalable, and Maintainable Applications',
        paragraphs: [
          'Many applications today are data-intensive, as opposed to compute-intensive. Raw CPU power is rarely a limiting factor for these applications — bigger problems are usually the amount of data, the complexity of data, and the speed at which it is changing.',
          'A data-intensive application is typically built from standard building blocks that provide commonly needed functionality: Store data so that they, or another application, can find it again later (databases), remember the result of an expensive operation to speed up reads (caches), and handle a continuous stream of events (stream processing).',
          'When we build an application, we need to figure out which tools and which approaches are most appropriate for the task at hand. Sometimes it can be hard to combine the tools when you need to do something that a single tool cannot do alone.'
        ]
      }
    ]
  },
  {
    id: 'book-8',
    title: 'Atomic Habits',
    subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    authorBio: 'James Clear is an author and speaker focused on habits, decision-making, and continuous improvement. His work has appeared in The New York Times and Time.',
    cover: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    category: 'Self-Help & Mind',
    subcategory: 'Habits & Routine',
    genre: ['Self-Improvement', 'Behavioral Psychology', 'Productivity'],
    rating: 4.8,
    reviewCount: 920,
    formats: [
      {
        type: 'Paperback',
        price: 349,
        originalPrice: 499,
        inStock: true,
        stockCount: 50,
        details: 'International trade paperback, 320 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 699,
        originalPrice: 899,
        inStock: true,
        stockCount: 20,
        details: 'Premium hardback with habit tracking template insert',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 199,
        inStock: true,
        details: 'EPUB & PDF with printable habit worksheets',
        isDigital: true,
        fileSizeBytes: 3100000
      },
      {
        type: 'Audiobook',
        price: 399,
        originalPrice: 599,
        inStock: true,
        details: 'Author-narrated edition, 5h 35m unabridged',
        isDigital: true,
        audioDurationMinutes: 335
      }
    ],
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world’s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    aboutBook: 'A clear, science-grounded synthesis of biology, psychology, and neuroscience. Clear articulates how 1% marginal gains compound into tectonic transformations over time.',
    aboutAuthor: 'James Clear’s newsletter reaches over 3 million subscribers weekly, and his book has been translated into more than 50 languages.',
    keyThemes: ['The Aggregation of Marginal Gains', 'Identity-Based Habits', 'The Four Laws of Behavior Change', 'Environment Architecture'],
    publicationDate: 'October 2018',
    publisher: 'Avery / Penguin Random House',
    language: 'English',
    pageCount: 320,
    isbn: '978-0735211292',
    featuredQuote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    specialCollections: ['bestseller', 'beginner-friendly-reads', 'books-for-students', 'featured'],
    frequentlyBoughtTogetherIds: ['book-2', 'book-9'],
    similarBookIds: ['book-2', 'book-9'],
    hasAudioSample: true,
    audioSampleDuration: '2m 50s',
    audioNarrator: 'James Clear',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'The Surprising Power of Atomic Habits',
        paragraphs: [
          'The fate of British Cycling changed one day in 2003. The organization, which was the governing body for professional cycling in Great Britain, had recently hired Dave Brailsford as its new performance director.',
          'At the time, professional cyclists in Great Britain had endured nearly one hundred years of mediocrity. Since 1908, British riders had won just a single gold medal at the Olympic Games.',
          'Brailsford had been hired to put British Cycling on a new trajectory. What made him different from previous coaches was his relentless commitment to a strategy that he referred to as “the aggregation of marginal gains,” which was the philosophy of searching for a tiny margin of improvement in everything you do.'
        ]
      }
    ]
  },
  {
    id: 'book-9',
    title: 'The Psychology of Money',
    subtitle: 'Timeless Lessons on Wealth, Greed, and Happiness',
    author: 'Morgan Housel',
    authorBio: 'Morgan Housel is a partner at The Collaborative Fund and a former columnist at The Wall Street Journal and The Motley Fool.',
    cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&q=80&w=800',
    category: 'Business & Finance',
    subcategory: 'Investing & Wealth',
    genre: ['Personal Finance', 'Behavioral Economics', 'Psychology'],
    rating: 4.8,
    reviewCount: 610,
    formats: [
      {
        type: 'Paperback',
        price: 279,
        originalPrice: 399,
        inStock: true,
        stockCount: 35,
        details: 'Trade paperback edition, 256 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 549,
        originalPrice: 699,
        inStock: true,
        stockCount: 14,
        details: 'Embossed cloth case bound edition',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 179,
        inStock: true,
        details: 'Instant EPUB & PDF download',
        isDigital: true,
        fileSizeBytes: 2100000
      },
      {
        type: 'Audiobook',
        price: 349,
        originalPrice: 499,
        inStock: true,
        details: 'Narrated by Chris Hill, 5h 48m',
        isDigital: true,
        audioDurationMinutes: 348
      }
    ],
    description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. Money—investing, personal finance, and business decisions—is typically taught as a math-based field. But in the real world people don’t make financial decisions on a spreadsheet.',
    aboutBook: 'Nineteen short stories exploring the strange ways people think about money and teaching you how to make better sense of one of life’s most crucial topics.',
    aboutAuthor: 'Morgan Housel is a two-time winner of the Best in Business Award from the Society of American Business Editors and Writers.',
    keyThemes: ['Freedom as Ultimate Dividend', 'Compounding & Patience', 'Reasonable vs Rational', 'The Seduction of Pessimism'],
    publicationDate: 'September 2020',
    publisher: 'Harriman House',
    language: 'English',
    pageCount: 256,
    isbn: '978-0857197689',
    featuredQuote: 'Spending money to show people how much money you have is the fastest way to have less money.',
    specialCollections: ['books-under-299', 'bestseller', 'beginner-friendly-reads'],
    frequentlyBoughtTogetherIds: ['book-8', 'book-2'],
    similarBookIds: ['book-8', 'book-2'],
    hasAudioSample: true,
    audioSampleDuration: '2m 20s',
    audioNarrator: 'Chris Hill',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'No One’s Crazy',
        paragraphs: [
          'Your personal experiences with money make up maybe 0.00000001% of what’s happened in the world, but maybe 80% of how you think the world works.',
          'A person who grew up in poverty thinks about risk and reward in ways the child of a wealthy banker cannot fathom, even if they study economics for fifty years.',
          'Dogs that grow up with gentle owners trust anyone; dogs that get kicked flinch at every raised hand. People with money are no different.'
        ]
      }
    ]
  },
  {
    id: 'book-10',
    title: 'The Selected Poems of Emily Dickinson',
    subtitle: 'Archival Collection with Facsimile Manuscripts',
    author: 'Emily Dickinson',
    authorBio: 'Emily Dickinson was an American poet who lived in quiet seclusion in Amherst, Massachusetts, and is recognized as one of the most vital figures in American literature.',
    cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800',
    category: 'Poetry & Arts',
    subcategory: 'Classical Poetry',
    genre: ['Poetry', 'Lyric Verse', 'Transcendentalism'],
    rating: 4.9,
    reviewCount: 185,
    formats: [
      {
        type: 'Paperback',
        price: 249,
        originalPrice: 320,
        inStock: true,
        stockCount: 15,
        details: 'Deckle-edge paper edition with original punctuation, 304 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 699,
        originalPrice: 850,
        inStock: true,
        stockCount: 8,
        details: 'Clothbound archival edition with silk ribbon marker',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 99,
        inStock: true,
        details: 'Digital EPUB with handwritten fascicle scans included',
        isDigital: true,
        fileSizeBytes: 6200000
      }
    ],
    description: 'This landmark gathering of Emily Dickinson’s poetry includes her immortal reflections on nature, solitude, time, eternity, and ecstatic reverence. Printed with her idiosyncratic dashes and capitalization preserved intact.',
    aboutBook: 'A sanctuary in book form. Dickinson’s poems condense cosmic wonder into brief, lightning-charged stanzas that reverberate with quiet intensity.',
    aboutAuthor: 'Emily Dickinson (1830–1886) lived in Amherst, Massachusetts. Only a handful of her nearly eighteen hundred poems were published during her lifetime.',
    keyThemes: ['Hope with Feathers', 'Mortality & Eternity', 'Solitude as Sanctuary', 'Botanical Wonder'],
    publicationDate: 'October 1993',
    publisher: 'Farrar, Straus and Giroux',
    language: 'English',
    pageCount: 304,
    isbn: '978-0374523787',
    featuredQuote: 'Hope is the thing with feathers that perches in the soul.',
    specialCollections: ['classics-everyone-should-read', 'books-under-299', 'hidden-gems'],
    frequentlyBoughtTogetherIds: ['book-1', 'book-5'],
    similarBookIds: ['book-1', 'book-5'],
    hasAudioSample: false,
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Poems of Solitude and Wonder',
        paragraphs: [
          '“Hope” is the thing with feathers — / That perches in the soul — / And sings the tune without the words — / And never stops — at all —',
          'And sweetest — in the Gale — is heard — / And sore must be the storm — / That could abash the little Bird / That kept so many warm —',
          'I’ve heard it in the chillest land — / And on the strangest Sea — / Yet — never — in Extremity, / It asked a crumb — of me.'
        ]
      }
    ]
  },
  {
    id: 'book-11',
    title: 'The Little Prince',
    subtitle: 'With Original Illustrations by the Author',
    author: 'Antoine de Saint-Exupéry',
    authorBio: 'Antoine de Saint-Exupéry was a pioneering French aviator, poet, and writer who disappeared on an air reconnaissance mission over the Mediterranean in 1944.',
    cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd9?auto=format&fit=crop&q=80&w=800',
    category: 'Children & Young Readers',
    subcategory: 'Fables & Fairy Tales',
    genre: ['Philosophical Fable', 'Children’s Literature', 'Classic Allegory'],
    rating: 4.9,
    reviewCount: 840,
    formats: [
      {
        type: 'Paperback',
        price: 199,
        originalPrice: 250,
        inStock: true,
        stockCount: 60,
        details: 'Color illustrated pocket paperback, 96 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 499,
        originalPrice: 650,
        inStock: true,
        stockCount: 25,
        details: 'Collector foil-stamped hardcover with watercolored endpapers',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 99,
        inStock: true,
        details: 'Full-color digital EPUB with author sketches',
        isDigital: true,
        fileSizeBytes: 4200000
      },
      {
        type: 'Audiobook',
        price: 199,
        originalPrice: 299,
        inStock: true,
        details: 'Read by Kenneth Branagh, 1h 45m',
        isDigital: true,
        audioDurationMinutes: 105
      }
    ],
    description: 'Few stories are as widely read and as universally cherished by children and adults alike as The Little Prince. A stranded aviator in the Sahara meets a mysterious, delicate little boy who has traveled from Asteroid B-612, leaving behind a proud rose and tending small volcanoes.',
    aboutBook: 'A gentle, profound meditation on love, loss, and the invisible bonds between living beings. Written with the radiant innocence of childhood and the ache of an adult heart.',
    aboutAuthor: 'Antoine de Saint-Exupéry (1900–1944) was awarded France’s highest literary honors including the Grand Prix du Roman de l’Académie française.',
    keyThemes: ['Taming & Responsibility', 'The Heart Sees Truly', 'The Mystery of the Desert', 'The Child Within'],
    publicationDate: 'April 1943',
    publisher: 'Harcourt Children’s Classics',
    language: 'English (Translated by Richard Howard)',
    pageCount: 96,
    isbn: '978-0156012195',
    featuredQuote: 'It is only with the heart that one can see rightly; what is essential is invisible to the eye.',
    specialCollections: ['classics-everyone-should-read', 'books-under-299', 'beginner-friendly-reads', 'hidden-gems'],
    frequentlyBoughtTogetherIds: ['book-5', 'book-10'],
    similarBookIds: ['book-10', 'book-5'],
    hasAudioSample: true,
    audioSampleDuration: '2m 10s',
    audioNarrator: 'Kenneth Branagh',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Drawing Number One',
        paragraphs: [
          'Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal.',
          'In the book it said: “Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion.”',
          'I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. It looked something like this: it was not a hat.'
        ]
      },
      {
        chapterNumber: 2,
        title: 'The Little Prince Appears',
        paragraphs: [
          'I lived my life alone, without anyone that I could really talk to, until I had an accident with my plane in the Desert of Sahara, six years ago. Something was broken in my engine.',
          'The first night, then, I went to sleep on the sand, a thousand miles from any human habitation. I was more isolated than a shipwrecked sailor on a raft in the middle of the ocean.',
          'Thus you can imagine my amazement, at sunrise, when I was awakened by an odd little voice. It said: “If you please — draw me a sheep!”'
        ]
      }
    ]
  },
  {
    id: 'book-12',
    title: 'Cosmos',
    subtitle: 'The Story of Cosmic Evolution, Science and Civilisation',
    author: 'Carl Sagan',
    authorBio: 'Carl Sagan was an astronomer, planetary scientist, and Pulitzer Prize-winning author whose television series Cosmos inspired billions.',
    cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    category: 'Science & Cosmos',
    subcategory: 'Astrophysics',
    genre: ['Popular Science', 'Cosmology', 'Astronomy'],
    rating: 4.9,
    reviewCount: 512,
    formats: [
      {
        type: 'Paperback',
        price: 399,
        originalPrice: 499,
        inStock: true,
        stockCount: 20,
        details: 'Illustrated edition with color plates, 384 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 899,
        originalPrice: 1100,
        inStock: true,
        stockCount: 8,
        details: 'Anniversary edition with introduction by Neil deGrasse Tyson',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 249,
        inStock: true,
        details: 'Digital EPUB with high-res astronomical imagery',
        isDigital: true,
        fileSizeBytes: 7500000
      },
      {
        type: 'Audiobook',
        price: 499,
        originalPrice: 699,
        inStock: true,
        details: 'Read by LeVar Burton, Seth MacFarlane and Neil deGrasse Tyson, 14h 28m',
        isDigital: true,
        audioDurationMinutes: 868
      }
    ],
    description: 'The story of fifteen billion years of cosmic evolution transforming matter and life into consciousness, of how science and civilisation grew up together, and of the forces and individuals who helped shape modern science.',
    aboutBook: 'A poetic testament to scientific curiosity. Sagan bridges the microscopic and macroscopic realms with unmatched wonder, reminding humanity of our humble place in the cosmic ocean.',
    aboutAuthor: 'Carl Sagan (1934–1996) was the David Duncan Professor of Astronomy and Space Sciences at Cornell University and recipient of NASA’s Distinguished Public Service Medal.',
    keyThemes: ['Cosmic Perspective', 'The Library of Alexandria', 'Evolutionary Voyage', 'Planetary Stewardship', 'Starstuff'],
    publicationDate: 'October 1980',
    publisher: 'Ballantine Books',
    language: 'English',
    pageCount: 384,
    isbn: '978-0345331359',
    featuredQuote: 'The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself.',
    specialCollections: ['award-winning-books', 'classics-everyone-should-read', 'books-for-students'],
    frequentlyBoughtTogetherIds: ['book-3', 'book-7'],
    similarBookIds: ['book-3', 'book-7'],
    hasAudioSample: true,
    audioSampleDuration: '3m 15s',
    audioNarrator: 'LeVar Burton',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'The Shores of the Cosmic Ocean',
        paragraphs: [
          'The Cosmos is all that is or was or ever will be. Our feeblest contemplations of the Cosmos stir us — there is a tingling in the spine, a catch in the voice, a faint sensation, as if a distant memory, of falling from a height.',
          'We know we are approaching the greatest of mysteries. The size and age of the Cosmos are beyond ordinary human understanding. Lost somewhere between immensity and eternity is our tiny planetary home.',
          'In a cosmic perspective, most human concerns seem insignificant, even petty. And yet our species is young and curious and brave and shows much promise.'
        ]
      }
    ]
  },
  {
    id: 'book-13',
    title: 'India After Gandhi',
    subtitle: 'The History of the World’s Largest Democracy',
    author: 'Ramachandra Guha',
    authorBio: 'Ramachandra Guha is a renowned Indian historian and biographer who has taught at Stanford and the London School of Economics.',
    cover: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    category: 'History',
    subcategory: 'Indian Heritage',
    genre: ['Indian History', 'Political Science', 'Biography'],
    rating: 4.8,
    reviewCount: 310,
    formats: [
      {
        type: 'Paperback',
        price: 549,
        originalPrice: 699,
        inStock: true,
        stockCount: 17,
        details: 'Revised and expanded 10th anniversary edition, 912 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 1199,
        originalPrice: 1499,
        inStock: true,
        stockCount: 4,
        details: 'Dual-volume archival hardcover with dust jacket',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 349,
        inStock: true,
        details: 'Digital EPUB with full index and archival references',
        isDigital: true,
        fileSizeBytes: 9800000
      }
    ],
    description: 'Born against the backdrop of devastating communal riots in 1947, India seemed to many an unnatural nation bound to tear itself apart. Ramachandra Guha’s definitive history tells the epic story of the world’s largest and most improbable democracy, navigating wars, languages, elections, and cultural reinvention.',
    aboutBook: 'A magisterial scholarly narrative of modern India. Guha weaves the political maneuvers of Nehru, Patel, and Ambedkar with the lived realities of millions of citizens.',
    aboutAuthor: 'Ramachandra Guha is the author of numerous acclaimed books on history, cricket, and ecology. He was awarded the Padma Bhushan in 2009.',
    keyThemes: ['Democratic Resilience', 'Nation Building', 'Linguistic Reorganization', 'Electoral Miracle'],
    publicationDate: 'August 2007',
    publisher: 'Pan Macmillan India',
    language: 'English',
    pageCount: 912,
    isbn: '978-9382618973',
    featuredQuote: 'India is an unnatural nation, an improbable democracy, and a perpetual experiment.',
    specialCollections: ['award-winning-books', 'books-for-students', 'featured'],
    frequentlyBoughtTogetherIds: ['book-3', 'book-2'],
    similarBookIds: ['book-3', 'book-2'],
    hasAudioSample: false,
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'Freedom and Paroxysm',
        paragraphs: [
          'On the fourteenth of August 1947, a few minutes before midnight, an assembly of legislators gathered in New Delhi. Outside, torrential rain beat down on crowds waving green, white, and saffron tricolour flags.',
          'At the stroke of the midnight hour, when the world slept, Jawaharlal Nehru rose to deliver what would become one of the most famous political addresses of the twentieth century: “A moment comes, which comes but rarely in history, when we step out from the old to the new, when an age ends, and when the soul of a nation, long suppressed, finds utterance.”',
          'Yet barely a few hundred miles to the northwest, in the divided province of Punjab, the largest involuntary migration in human history was already turning rivers red with blood.'
        ]
      }
    ]
  },
  {
    id: 'book-14',
    title: 'Klara and the Sun',
    subtitle: 'A Novel by the Nobel Laureate',
    author: 'Kazuo Ishiguro',
    authorBio: 'Kazuo Ishiguro was awarded the Nobel Prize in Literature in 2017. He is the author of eight acclaimed novels including The Remains of the Day.',
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    category: 'Technology & AI',
    subcategory: 'Artificial Intelligence',
    genre: ['Speculative Fiction', 'Literary Sci-Fi', 'Nobel Laureate'],
    rating: 4.7,
    reviewCount: 320,
    formats: [
      {
        type: 'Paperback',
        price: 349,
        originalPrice: 450,
        inStock: true,
        stockCount: 22,
        details: 'Faber & Faber trade paperback, 320 pages',
        isDigital: false
      },
      {
        type: 'Hardcover',
        price: 699,
        originalPrice: 850,
        inStock: true,
        stockCount: 9,
        details: 'Clothbound first edition with embossed sun motif',
        isDigital: false
      },
      {
        type: 'eBook',
        price: 249,
        inStock: true,
        details: 'Instant EPUB / MOBI / PDF download',
        isDigital: true,
        fileSizeBytes: 2800000
      },
      {
        type: 'Audiobook',
        price: 399,
        originalPrice: 550,
        inStock: true,
        details: 'Narrated by Sura Siu, 10h 16m unabridged',
        isDigital: true,
        audioDurationMinutes: 616
      }
    ],
    description: 'From the bestselling author of Never Let Me Go and The Remains of the Day, a thrilling novel that asks: What does it mean to love? Told through the eyes of Klara, an Artificial Friend with outstanding observational qualities, who watches carefully the behavior of those who come in to browse the store.',
    aboutBook: 'A tender, poignant look at the modern human condition through the innocent gaze of an artificial machine who believes in the healing power of the sun.',
    aboutAuthor: 'Kazuo Ishiguro was born in Nagasaki, Japan in 1954 and moved to Britain at age five. His novels have been translated into over fifty languages.',
    keyThemes: ['Artificial Empathy', 'The Fragility of the Human Heart', 'Loneliness in the Technological Age', 'Sacrifice'],
    publicationDate: 'March 2021',
    publisher: 'Faber & Faber',
    language: 'English',
    pageCount: 320,
    isbn: '978-0571364886',
    featuredQuote: 'Do you believe in the human heart? I don’t mean simply the organ, obviously. But do you believe there’s something that makes each of us special and individual?',
    specialCollections: ['award-winning-books', 'weekend-reads', 'featured'],
    frequentlyBoughtTogetherIds: ['book-1', 'book-6'],
    similarBookIds: ['book-1', 'book-7'],
    hasAudioSample: true,
    audioSampleDuration: '2m 55s',
    audioNarrator: 'Sura Siu',
    sampleContent: [
      {
        chapterNumber: 1,
        title: 'The Store Window',
        paragraphs: [
          'When we were new, Rosa and I were mid-store, on the magazine table side, and could see through more than half of the window. So we were able to watch the outside — the office workers hurrying by, the taxis, the runners, the tourists, the Beggar Man and his dog, the lower part of the RPO building.',
          'Once we were more settled, Manager allowed us to walk up to the front, directly behind the glass. Then we could see all the way to the corner where the sun shone between the brick buildings at three in the afternoon.',
          'I watched how people walked when they were happy, and how their shoulders sank when they carried bad news. I was learning what it was to be human.'
        ]
      }
    ]
  }
];

export const POPULAR_AUTHORS = [
  {
    id: 'author-zafon',
    name: 'Carlos Ruiz Zafón',
    role: 'Master of Gothic Barcelona',
    bio: 'Renowned for weaving bibliophilic romance with gothic mystery through the Cemetery of Forgotten Books series.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    notableWork: 'The Shadow of the Wind',
    totalBooksCount: 5,
    category: 'Classics'
  },
  {
    id: 'author-harari',
    name: 'Yuval Noah Harari',
    role: 'Global Historian & Philosopher',
    bio: 'Author of Sapiens and Homo Deus, exploring the macro-narratives of humanity, cognitive myths, and synthetic life.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    notableWork: 'Sapiens',
    totalBooksCount: 4,
    category: 'History'
  },
  {
    id: 'author-austen',
    name: 'Jane Austen',
    role: 'Immortal Regency Satirist',
    bio: 'Her keen moral wit, feminist intelligence, and social critique continue to define romantic prose across centuries.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    notableWork: 'Pride and Prejudice',
    totalBooksCount: 6,
    category: 'Romance'
  },
  {
    id: 'author-clear',
    name: 'James Clear',
    role: 'Behavioral Architect',
    bio: 'Pioneer of atomic habit theory and systematic 1% compounding strategies for peak personal performance.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    notableWork: 'Atomic Habits',
    totalBooksCount: 2,
    category: 'Self-Help & Mind'
  }
];
