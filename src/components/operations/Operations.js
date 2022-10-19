const capitalizeFirstLetter = (sentence) => {
    if (sentence.length !== 0) {
        const words = sentence.split(" ");
        const capWords = words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");
        return capWords;
    } else {
        return sentence;
    }
};

const trimSentence = (sentence) => {
    const trimmedSentence = sentence.trim();
    return trimmedSentence;
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

export { capitalizeFirstLetter, trimSentence, shuffleArray }