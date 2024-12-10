// Enhanced English to Thanglish translation patterns
const COMMON_PATTERNS = {
  // Basic pronouns and articles
  'the': 'antha',
  'this': 'intha',
  'that': 'antha',
  'these': 'ithellam',
  'those': 'athellam',
  'it': 'ithu',
  'they': 'avanga',
  'we': 'naanga',
  'you': 'neenga',
  'i': 'naan',
  'he': 'avan',
  'she': 'aval',
  'my': 'en',
  'your': 'unga',
  'our': 'enga',
  'their': 'avanga oda',
  'his': 'avan oda',
  'her': 'aval oda',

  // Articles and prepositions
  'a': 'oru',
  'an': 'oru',
  'in': 'la',
  'on': 'mela',
  'at': 'la',
  'to': 'ku',
  'for': 'kaaga',
  'with': 'oda',
  'and': 'um',
  'or': 'illana',
  'but': 'aanal',
  'by': 'aala',

  // Common verbs
  'is': 'iruku',
  'are': 'irukanga',
  'was': 'irunthuchi',
  'were': 'irunthaanga',
  'will': 'poran/poranga',
  'can': 'mudiyum',
  'could': 'mudinjathu',
  'should': 'vendam',
  'would': 'irukkum',
  'has': 'iruku',
  'have': 'iruku',
  'had': 'irunthuchu',
  'do': 'pannu',
  'does': 'pannuthu',
  'did': 'pannitaanga',
  'going': 'poren/poranga',
  'coming': 'varen/varanga',
  'want': 'venum',
  'needs': 'venum',
  'like': 'pidichiruku',
  'love': 'romba pidichiruku',
  'hate': 'pidikala',
  'see': 'paaru',
  'look': 'paaru',
  'watch': 'paaru',
  'tell': 'sollu',
  'speak': 'pesu',
  'talk': 'pesu',
  'eat': 'saapidu',
  'drink': 'kudi',
  'sleep': 'thoongu',
  'work': 'velai',
  'study': 'padi',
  'read': 'padi',
  'write': 'ezuthu',

  // Common adjectives
  'good': 'nalla',
  'bad': 'mosam',
  'big': 'periya',
  'small': 'chinna',
  'new': 'puthusa',
  'old': 'pazhaiya',
  'beautiful': 'azhaga',
  'ugly': 'asingama',
  'happy': 'santhoshama',
  'sad': 'kavalaya',
  'angry': 'kovama',
  'tired': 'sorvaa',
  'hungry': 'pasiya',
  'thirsty': 'thagama',
  'hot': 'sooda',
  'cold': 'kulura',
  'easy': 'sulabama',
  'difficult': 'kastama',
  'expensive': 'vilai athigam',
  'cheap': 'vilai kammi',
  'fast': 'vegama',
  'slow': 'medhuvaa',
  'high': 'uyara',
  'low': 'thaazha',
  'right': 'sari',
  'wrong': 'thappu',
  'true': 'unmai',
  'false': 'poi',

  // Time-related words
  'now': 'ippo',
  'today': 'indraiku',
  'tomorrow': 'nalaiku',
  'yesterday': 'nethiku',
  'morning': 'kaalai',
  'afternoon': 'madhiyam',
  'evening': 'maalai',
  'night': 'rathri',
  'time': 'neram',
  'day': 'naal',
  'week': 'vaaram',
  'month': 'maasam',
  'year': 'varusham',

  // Question words
  'what': 'enna',
  'why': 'yean',
  'how': 'eppadi',
  'where': 'enga',
  'when': 'eppo',
  'who': 'yaaru',
  'which': 'ethu',

  // Numbers and quantities
  'one': 'onnu',
  'two': 'rendu',
  'three': 'moonu',
  'four': 'naalu',
  'five': 'anju',
  'many': 'neraya',
  'few': 'konjam',
  'some': 'konjo',
  'all': 'ellam',
  'none': 'onnum illa',

  // Tech-related terms (keep English with Tamil structure)
  'website': 'website',
  'page': 'page',
  'screen': 'screen',
  'button': 'button',
  'click': 'click pannu',
  'image': 'image',
  'photo': 'photo',
  'video': 'video',
  'audio': 'audio',
  'download': 'download pannu',
  'upload': 'upload pannu',
  'save': 'save pannu',
  'delete': 'delete pannu',
  'search': 'search pannu',
  'share': 'share pannu',
  'edit': 'edit pannu',
  'update': 'update pannu',
  'create': 'create pannu',
  'login': 'login pannu',
  'logout': 'logout pannu',
  'password': 'password',
  'username': 'username',
  'email': 'email',
  'internet': 'internet',
  'wifi': 'wifi',
  'mobile': 'mobile',
  'computer': 'computer',
  'laptop': 'laptop',
  'tablet': 'tablet',
  'phone': 'phone'
};

// Verb conjugation patterns
const VERB_PATTERNS = {
  PRESENT: {
    SINGULAR: '-ithu',
    PLURAL: '-anga',
    FIRST_PERSON: '-en',
    SECOND_PERSON: '-inga',
    THIRD_PERSON: '-ar/-al'
  },
  PAST: {
    SINGULAR: '-ichu',
    PLURAL: '-aanga',
    FIRST_PERSON: '-en',
    SECOND_PERSON: '-inga',
    THIRD_PERSON: '-aar/-aal'
  },
  FUTURE: {
    SINGULAR: '-um',
    PLURAL: '-anga',
    FIRST_PERSON: '-en',
    SECOND_PERSON: '-inga',
    THIRD_PERSON: '-aar/-aal'
  }
};

export async function translateToThanglish(text) {
  try {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const translatedSentences = sentences.map(sentence => {
      // Split the sentence into words
      const words = sentence.toLowerCase().trim().split(/\s+/);
      let thanglishWords = [];
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const nextWord = words[i + 1];
        const prevWord = words[i - 1];
        
        // Handle special cases and combinations
        if (COMMON_PATTERNS[word]) {
          // Skip auxiliary verbs when followed by main verbs
          if (['is', 'are', 'was', 'were'].includes(word) && nextWord && COMMON_PATTERNS[nextWord]) {
            continue;
          }
          
          // Handle verb combinations
          if (word === 'is' && nextWord) {
            thanglishWords.push(COMMON_PATTERNS[nextWord] + ' iruku');
            i++; // Skip next word
            continue;
          }
          
          thanglishWords.push(COMMON_PATTERNS[word]);
        } else {
          // Handle unknown words
          if (word.endsWith('ing')) {
            // Convert present continuous
            const root = word.slice(0, -3);
            if (COMMON_PATTERNS[root]) {
              thanglishWords.push(COMMON_PATTERNS[root] + ' kittu iruku');
              continue;
            }
          }
          
          // Keep technical terms and numbers as is
          if (/^[0-9]+$/.test(word) || /^[a-zA-Z0-9]+[.][a-zA-Z0-9]+$/.test(word)) {
            thanglishWords.push(word);
          } else {
            // Transliterate unknown words
            thanglishWords.push(word);
          }
        }
      }
      
      return thanglishWords.filter(w => w).join(' ');
    });
    
    // Join sentences and post-process
    let result = translatedSentences.join('. ');
    result = postProcessThanglish(result);
    
    return result;
  } catch (error) {
    console.error('Translation error:', error);
    return 'Translation temporarily unavailable. Please try again.';
  }
}

function postProcessThanglish(text) {
  let result = text;
  
  // Fix spacing and punctuation
  result = result
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/([.,!?])(?![.,!?\s])/g, '$1 ')
    .trim();
  
  // Add Tamil sentence structure patterns
  result = result
    // Convert "X is Y" to "X Y-a iruku"
    .replace(/(\w+)\s+iruku\s+(\w+)/gi, '$1 $2-a iruku')
    // Convert "X will Y" to "X Y pannum"
    .replace(/(\w+)\s+poran\/poranga\s+(\w+)/gi, '$1 $2 pannum')
    // Convert "X can Y" to "X Y mudiyum"
    .replace(/(\w+)\s+mudiyum\s+(\w+)/gi, '$1 $2 mudiyum')
    // Add politeness markers
    .replace(/^([\w\s]+)$/gi, '$1 nga')
    // Add emphasis markers
    .replace(/(\w+)\s+romba\s+(\w+)/gi, '$1 mikka $2');
  
  // Ensure proper sentence ending
  if (!result.match(/[.!?]$/)) {
    result += '.';
  }
  
  return result;
}