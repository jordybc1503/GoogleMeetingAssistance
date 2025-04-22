(() => {
    // 1) Inject CSS to show a 📋 on each caption‑wrapper
    const style = document.createElement('style');
    style.textContent = `
      div[jsname="YSxPC"] {
        position: relative;
        padding-right: 24px;
        cursor: pointer;
      }
      div[jsname="YSxPC"]::after {
        content: ".";
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  
    // 2) Clipboard helper (Clipboard API + execCommand fallback)
    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return Promise.resolve();
    }
  
    // 3) Delegate clicks on any caption "row"
    document.addEventListener('click', e => {
        console.log('Click event detected:', e);

        const row = e.target.closest('div.nMcdL.bj4p3b');
        console.log('Closest row:', row);
        if (!row) return;

        // inside that row, find the actual text container
        const captionDiv = row.querySelector('div[jsname="tgaKEf"], .VbkSUe');
        console.log('Caption div:', captionDiv);
        if (!captionDiv) return;

        const txt = captionDiv.innerText.trim();
        console.log('Extracted text:', txt);
        if (!txt) return;

        copyText(txt)
        .then(() => {
            console.log(`📋 Copied subtitle: “${txt}”`,
                askGPT4OMini(txt, [], "You are a helpful assistant.")
                .then(reply => console.log("GPT-4o Mini says:", reply))
                .catch(console.error)
            )})
        .catch(err => console.error('❌ Copy failed', err));
    });



    const apiKey = "SDADXXXXXXXXXXXXXXXX";

    /**
     * Sends a question to the GPT-4o Mini model via the OpenAI API.
     * @param {string} currentQuestion - The current user question.
     * @param {Array<{role: string, content: string}>} history - Chat history as an array of messages.
     * @param {string} promptText - A system prompt to guide the assistant.
     * @returns {Promise<string>} - The assistant's response.
     */
    async function askGPT4OMini(currentQuestion, history = [], promptText = "") {
        // Build the messages array
        const messages = [];
        if (promptText) {
          messages.push({ role: "system", content: promptText });
        }
        history.forEach(({ role, content }) => {
          messages.push({ role, content });
        });
        messages.push({ role: "user", content: currentQuestion });
    
        // Call the Chat Completions endpoint
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages
          })
        });
    
        if (!response.ok) {
          const err = await response.text();
          throw new Error(`OpenAI API error: ${err}`);
        }
    
        const data = await response.json();
        return data.choices[0].message.content;
      }
    
      // Make the function globally accessible
      window.askGPT4OMini = askGPT4OMini;
    
      // Example usage:
      askGPT4OMini(
        "Write a one-sentence bedtime story about a unicorn.",
        [],
        "You are a helpful assistant."
      )
        .then(reply => console.log("GPT-4o Mini says:", reply))
        .catch(console.error);


    console.log('✅ Click‑to‑copy enabled — hover over captions to see 📋, click any line to copy it.');
  })();
  

