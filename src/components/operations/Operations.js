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

const sortByGrade = (a, b) => {
    const splittedA = a.split('');
    const splittedB = b.split('');
    return splittedA - splittedB
}

export { capitalizeFirstLetter, trimSentence, sortByGrade }