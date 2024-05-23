class TextHelper {

    static makeSentence(text?: string) {
        if (text && text.length > 0) {
            // Uppercase the first character
            text = text.charAt(0).toUpperCase() + text.slice(1);
            
            // Remove any trailing punctuation
            text = text.replace(/[.,!?;]*$/, '');
            
            // Add a full stop to the end if it doesn't already have one
            if (!text.endsWith('.')) {
                text += '.';
            }

            return text;
        }
        else return '';
    }
}

export default TextHelper