// 1. YOUR WORD LIST
const wordList = [
    "amber", "blend","chime", "crisp", "daisy", "dream", "ember",
    "fable", "flair", "flick", "fluff", "frost", "gaze", "glide",
    "glint", "globe", "grace", "grasp", "grind", "haste", "hatch", "heave",
    "ivory", "jumbo", "knack", "latch","lunch", "lyric", "magic",
    "maple", "maven", "mirth", "moody", "noble", "notch", "oasis", "ocean",
    "orbit", "patch", "peace", "petal", "pixel", "plumb", "plush", "pride",
    "prize", "proxy", "pulse", "quest", "quill", "quiet", "radii", "relic",
    "rhyme", "ripple", "roast", "rustic", "scent", "shade","shine",
    "slice", "smile", "snack", "sound", "spark", "split", "sprout", "stark",
    "story", "swift", "swirl", "syrup", "thrive", "tundra", "unity",
    "vivid", "whims", "woven", "zesty", "zippy"
];

// 2. GET HTML ELEMENTS
const wordDisplayElement = document.getElementById('wordDisplay');
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton'); // Make sure you have this if you added the copy feature

// 3. THE LOGIC
let usedIndices = new Set();

// This is the main function that will be called when the button is clicked
function startWordAnimation() {
    // Disable the button to prevent multiple clicks during animation
    generateButton.disabled = true;

    // --- The Fast-Forwarding Effect ---
    // Start an interval to rapidly change the word every 50ms
    const animationInterval = setInterval(() => {
        // Pick a purely random word for the animation effect
        const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        wordDisplayElement.textContent = randomWord;
    }, 50);

    // --- Stopping the Animation ---
    // After 1 second (1000ms), stop the animation and show the final word
    setTimeout(() => {
        // Stop the rapid cycling
        clearInterval(animationInterval);

        // --- Get the Final, Unique Word ---
        // (This is the same logic we used before to ensure no repeats)
        if (usedIndices.size === wordList.length) {
            usedIndices.clear();
        }

        let finalIndex;
        do {
            finalIndex = Math.floor(Math.random() * wordList.length);
        } while (usedIndices.has(finalIndex));

        usedIndices.add(finalIndex);
        const finalWord = wordList[finalIndex];

        // Display the final word
        wordDisplayElement.textContent = finalWord;

        // Re-enable the generate button
        generateButton.disabled = false;
    }, 1000); // Animation duration: 1000ms = 1 second
}


// 4. EVENT LISTENERS
// When the page loads, display an initial word without animation
wordDisplayElement.textContent = wordList[Math.floor(Math.random() * wordList.length)];

// Tell the button to run our animation function every time it's clicked
generateButton.addEventListener('click', startWordAnimation);


// --- Copy Button Logic (if you have it) ---
function copyWordToClipboard() {
    const currentWord = wordDisplayElement.textContent;
    navigator.clipboard.writeText(currentWord).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

if (copyButton) {
    copyButton.addEventListener('click', copyWordToClipboard);
}
