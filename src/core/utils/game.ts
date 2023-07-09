function chooseRandomElements(array: any[], count: number) {
  const shuffledArray = array.slice(); // Create a copy of the original array
  const randomElements = [];

  for (
    let i = shuffledArray.length - 1;
    i >= 0 && randomElements.length < count;
    i--
  ) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Generate a random index within the remaining unshuffled portion
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ]; // Swap elements using destructuring assignment
    randomElements.push(shuffledArray[i]); // Add the randomly chosen element to the result array
  }

  return randomElements;
}

export { chooseRandomElements };
