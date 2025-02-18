// Add at the beginning of the file
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_KEYS = {
    ipstack: 'YOUR_IPSTACK_API_KEY',
    macvendors: 'YOUR_MACVENDORS_API_KEY',
    sslChecker: 'YOUR_SSLCHECKER_API_KEY'
};

// Utility Functions
const showResult = (elementId) => document.getElementById(elementId).classList.remove('hidden');
const hideResult = (elementId) => document.getElementById(elementId).classList.add('hidden');
const setLoading = (buttonElement, isLoading) => {
    buttonElement.disabled = isLoading;
    buttonElement.innerHTML = isLoading ? 
        '<i class="fas fa-spinner fa-spin"></i> Loading...' : 
        buttonElement.getAttribute('data-original-text');
};

// Copy to Clipboard Function
const copyToClipboard = async (text, buttonElement) => {
    try {
        await navigator.clipboard.writeText(text);
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
};

// IP Information Tool
async function getIpInfo() {
    const ipInput = document.getElementById('input-ip');
    const resultDiv = document.getElementById('ip-result');
    const button = event.currentTarget;
    
    try {
        setLoading(button, true);
        const response = await fetch(`${CORS_PROXY}https://ipapi.co/${ipInput.value}/json/`);
        const data = await response.json();
        
        if (data.error) throw new Error(data.reason);
        
        resultDiv.innerHTML = `
            <div class="space-y-2">
                <p><span class="font-semibold">IP:</span> ${data.ip}</p>
                <p><span class="font-semibold">Location:</span> ${data.city}, ${data.region}</p>
                <p><span class="font-semibold">Country:</span> ${data.country_name}</p>
                <p><span class="font-semibold">ISP:</span> ${data.org}</p>
                <p><span class="font-semibold">Timezone:</span> ${data.timezone}</p>
                <p><span class="font-semibold">ASN:</span> ${data.asn}</p>
            </div>
        `;
        showResult('ip-result');
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
        showResult('ip-result');
    } finally {
        setLoading(button, false);
    }
}

// DNS Lookup Tool
async function getDnsInfo() {
    const domainInput = document.getElementById('dns-input');
    const resultDiv = document.getElementById('dns-result');
    const button = event.currentTarget;
    
    try {
        setLoading(button, true);
        const response = await fetch(`${CORS_PROXY}https://dns.google/resolve?name=${domainInput.value}`);
        const data = await response.json();
        
        if (!data.Answer) throw new Error('No DNS records found');
        
        const records = data.Answer.map(record => `
            <div class="p-2 border-b border-gray-700 last:border-0">
                <p>Type: ${record.type}</p>
                <p>TTL: ${record.TTL}</p>
                <p>Data: ${record.data}</p>
            </div>
        `).join('');
        
        document.getElementById('dns-records').innerHTML = records;
        showResult('dns-result');
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-red-400">Error: ${error.message}</p>`;
        showResult('dns-result');
    } finally {
        setLoading(button, false);
    }
}

// Password Generator
function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUpper = document.getElementById('include-uppercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowerChars;
    if (includeUpper) chars += upperChars;
    if (includeNumbers) chars += numberChars;
    if (includeSymbols) chars += symbolChars;
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('generated-password').textContent = password;
    showResult('password-result');
}

// Hash Generator
async function generateHash() {
    const input = document.getElementById('hash-input').value;
    const hashType = document.getElementById('hash-type').value;
    
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest(hashType, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        document.getElementById('generated-hash').textContent = hashHex;
        showResult('hash-result');
    } catch (error) {
        document.getElementById('hash-result').innerHTML = `
            <p class="text-red-400">Error: ${error.message}</p>
        `;
        showResult('hash-result');
    }
}

// Base64 Encoder/Decoder
function base64Encode() {
    const input = document.getElementById('base64-input').value;
    try {
        const encoded = btoa(input);
        document.getElementById('converted-base64').textContent = encoded;
        showResult('base64-result');
    } catch (error) {
        document.getElementById('base64-result').innerHTML = `
            <p class="text-red-400">Error: Invalid input for Base64 encoding</p>
        `;
        showResult('base64-result');
    }
}

function base64Decode() {
    const input = document.getElementById('base64-input').value;
    try {
        const decoded = atob(input);
        document.getElementById('converted-base64').textContent = decoded;
        showResult('base64-result');
    } catch (error) {
        document.getElementById('base64-result').innerHTML = `
            <p class="text-red-400">Error: Invalid Base64 input</p>
        `;
        showResult('base64-result');
    }
}

// Text Case Converter
function convertCase(type) {
    const input = document.getElementById('case-input').value;
    let result = '';
    
    switch(type) {
        case 'upper':
            result = input.toUpperCase();
            break;
        case 'lower':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.toLowerCase().split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            break;
        case 'camel':
            result = input.toLowerCase().split(' ')
                .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
            break;
    }
    
    document.getElementById('converted-case').textContent = result;
    showResult('case-result');
}

// URL Encoder/Decoder
function urlEncode() {
    const input = document.getElementById('url-input').value;
    try {
        const encoded = encodeURIComponent(input);
        document.getElementById('converted-url').textContent = encoded;
        showResult('url-result');
    } catch (error) {
        document.getElementById('url-result').innerHTML = `
            <p class="text-red-400">Error: Invalid input for URL encoding</p>
        `;
        showResult('url-result');
    }
}

function urlDecode() {
    const input = document.getElementById('url-input').value;
    try {
        const decoded = decodeURIComponent(input);
        document.getElementById('converted-url').textContent = decoded;
        showResult('url-result');
    } catch (error) {
        document.getElementById('url-result').innerHTML = `
            <p class="text-red-400">Error: Invalid URL encoded input</p>
        `;
        showResult('url-result');
    }
}

// System Information
function getSystemInfo() {
    const screenInfo = `${window.screen.width}x${window.screen.height}`;
    const language = navigator.language || navigator.userLanguage;
    const cookiesEnabled = navigator.cookieEnabled;
    const userAgent = navigator.userAgent;

    document.getElementById('screen-info').textContent = screenInfo;
    document.getElementById('language-info').textContent = language;
    document.getElementById('cookies-info').textContent = cookiesEnabled ? 'Enabled' : 'Disabled';
    document.getElementById('ua-info').textContent = userAgent;
    
    // OS Detection
    let os = 'Unknown';
    if (userAgent.includes('Win')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'MacOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    // Browser Detection
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    document.getElementById('os-info').textContent = os;
    document.getElementById('browser-info').textContent = browser;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    getSystemInfo();
}); 