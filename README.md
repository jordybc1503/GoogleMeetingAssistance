# Google Meeting Assistant

A lightweight browser script that transforms Google Meet captions into a click-to-copy interface and auto-generates answers via the OpenAI API.

## Features

- **Click‑to‑Copy Captions**: Simply click any caption in Google Meet to copy its text.
- **AI‑Powered Replies**: Sends the copied caption to a GPT model and logs the assistant’s response in the console.
- **Customizable System Prompt**: Define your own instructions for the AI model at runtime.

## Requirements

- **OpenAI API Key**: A valid key with permission to use the GPT chat endpoint.
- **Browser Console Access**: Ability to paste and execute JavaScript in your browser’s developer console.

## Installation & Setup

1. **Open Google Meet** in your browser and join or start a meeting.
2. **Open the Developer Console** (e.g., `Ctrl+Shift+I` or `Cmd+Option+I`).
3. **Allow Clipboard Paste**:
   - If pasting is disabled, type `allow paste` in the console and press Enter.
4. **Configure the Script**:
   - Copy the entire script source (provided in the repo or snippet below).
   - In the console, paste the script and press Enter.
5. **Enter Your System Prompt** when prompted (this becomes the AI’s instructions).

## Usage

- **Answering Questions**: During your meeting, when a participant asks a question, click on the caption text in the video stream. The text will be copied to your clipboard and sent to the GPT model. The AI’s reply will appear in the console.

````js
// Example console log:
// 📋 Copied: "How do I declare a variable for last name?"
// GPT‑4o Mini says: "In JavaScript, you can declare a variable for a last name like this:\n```
````

## Configuration Options

- **Model Selection**: By default, the script uses `gpt-4o-mini`. You can change this in the fetch URL or payload.
- **Prompt Customization**: Re-run the script and provide a new system prompt to adjust the AI’s behavior.

## Troubleshooting

- **Clipboard Errors**: Ensure your browser settings allow programmatic copy/paste operations.
- **API Errors**: Check that your OpenAI API key is correct and has sufficient permissions.
- **Rate Limits**: Be mindful of your OpenAI rate limits; reduce click frequency if you encounter throttling.

## License

This project is licensed under the MIT License. Feel free to adapt and extend it for your own needs.

---

*Built with ❤️ for seamless AI integration during virtual meetings.*

