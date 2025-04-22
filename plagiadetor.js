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
        content: "";
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
  
    // 3) Sends a question to the GPT-4o Mini model via the OpenAI API.
    const apiKey = "your_openai_api_key"; // Replace with your OpenAI API key
    const promptText = prompt("Enter the prompt for your task.");
    const messages = [ ]

    async function askGPT4OMini(currentQuestion, history = [], promptText = "") {
      
      if (promptText) messages.push({ role: "system", content: promptText });
      history.forEach(({ role, content }) => messages.push({ role, content }));
      
      messages.push({ role: "user", content: currentQuestion });
        console.log("Messages:", messages);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ model: "gpt-4o-mini", messages })
      });
  
      if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenAI API error: ${err}`);
      }
      const data = await response.json();
      return data.choices[0].message.content;
    }
    window.askGPT4OMini = askGPT4OMini;
  
    // 4) Delegate clicks on any caption “row” to copy and send to GPT
    document.addEventListener('click', async e => {
      const row = e.target.closest('div.nMcdL.bj4p3b');
      if (!row) return;
      const captionDiv = row.querySelector('div[jsname="tgaKEf"], .VbkSUe');
      if (!captionDiv) return;
      const txt = captionDiv.innerText.trim();
      if (!txt) return;
  
      try {
        await copyText(txt);
        console.log(`📋 Copied: “${txt}”`);
        const reply = await askGPT4OMini(txt, [], promptText);
        console.log("GPT-4o Mini says:", reply);
        
      } catch (err) {
        console.error('❌ Error:', err);
      }
    });

    function preg(question) {
        
        return askGPT4OMini(question, [], promptText)
            .then(reply => console.log("GPT-4o Mini says:", reply))
            .catch(err => console.error('❌ Error:', err));
    }
    
    window.preg = preg;


    console.log('✅ Click‑to‑copy + GPT enabled — click any subtitle line to copy & get a reply.');
  })();
  