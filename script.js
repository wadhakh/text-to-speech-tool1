// VoiceRSS API Key
const ttsApiKey = 'b32136af7271491abcac5f71780f414c';

// Play the original text as audio
function playText() {
    const text = document.getElementById("inputText").value;
    const selectedLanguage = document.getElementById("language").value; // Detect selected language
    const langMap = {
        en: "en-us", // English - US
        es: "es-es", // Spanish - Spain
        fr: "fr-fr", // French - France
        ar: "ar-sa", // Arabic - Saudi Arabia
    };

    if (!text) {
        alert("Please enter some text.");
        return;
    }

    const langCode = langMap[selectedLanguage] || "en-us"; // Default to English if language is unsupported
    const url = `https://api.voicerss.org/?key=${ttsApiKey}&hl=${langCode}&src=${encodeURIComponent(text)}`;
    console.log("Generated audio URL:", url); // Logs the URL for debugging
    const audio = new Audio(url);
    audio.play();
}

// Translate the text using Microsoft Translator API
async function translateText() {
    const text = document.getElementById("inputText").value;
    const targetLanguage = document.getElementById("language").value;

    if (!text) {
        alert("Please enter some text.");
        return;
    }

    try {
        console.log("Sending text for translation:", text);
        console.log("Target language:", targetLanguage);

        const response = await fetch(
            "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=" + targetLanguage,
            {
                method: "POST",
                headers: {
                    "Ocp-Apim-Subscription-Key": "AgfKjrlDruT2eZHD4gznRdIU01aJcJyD8gPT2Yzno2OQOEGw7XmeJQQJ99AKACF24PCXJ3w3AAAbACOGYxY9", // Replace with your actual key
                    "Ocp-Apim-Subscription-Region": "uaenorth", // Replace with your actual region
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([{ Text: text }]),
            }
        );

        const data = await response.json();
        console.log("Translation result:", data);

        if (data && data[0] && data[0].translations && data[0].translations[0]) {
            document.getElementById("translatedText").innerText = data[0].translations[0].text;
        } else {
            console.error("Translation failed or returned unexpected response:", data);
            alert("Translation failed. Please try again.");
        }
    } catch (error) {
        console.error("Error translating text:", error);
        alert("Error translating text. Please check the console for details.");
    }
}

// Play the translated text as audio
function playTranslatedText() {
    const translatedText = document.getElementById("translatedText").innerText;
    const targetLanguage = document.getElementById("language").value;

    if (!translatedText || translatedText === "No translation yet.") {
        alert("No translated text to play.");
        return;
    }

    // Map language codes to VoiceRSS-supported language codes
    const langMap = {
        en: "en-us", // English - US
        es: "es-es", // Spanish - Spain
        fr: "fr-fr", // French - France
        ar: "ar-sa", // Arabic - Saudi Arabia
    };

    const langCode = langMap[targetLanguage] || "en-us";
    const url = `https://api.voicerss.org/?key=${ttsApiKey}&hl=${langCode}&src=${encodeURIComponent(translatedText)}`;
    console.log("Generated translated audio URL:", url); // Logs the URL
    const audio = new Audio(url);
    audio.play();
}


