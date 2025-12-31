
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();

    // Language toggle
    let currentLanguage = 'ru';
    const languageToggle = document.getElementById('languageToggle');
    const translations = {
        ru: {
            actionTitle: 'Выберите действия',
            regionCheckText: 'Проверить регион',
            recommendationsTitle: 'Рекомендации:',
            recommendation1: '- GoldHEN 12.02/12.52 лучше подходят для PS4 Slim',
            recommendation2: '- Если у вас PS4 Pro, нажмите "PS4 Pro Check HEN" для проверки совместимости',
            recommendation3: '- Для PS5 используйте только официальные методы',
            ipModalTitle: 'Введите IP адрес',
            ipExample: 'IP вашего роутера: 192.168.1.1',
            realIp: 'IP вашей PS4: ...',
            continueButton: 'Продолжить',
            jailbreakStatus: 'Jailbreaking pls wait...',
            regionAllowed: '✅ Ваш регион поддерживается! Можете продолжать.',
            proCheck: 'Проверяем совместимость с PS4 Pro...',
            proCompatible: 'Ваша PS4 Pro совместима с GoldHEN 12.52 и 13.02!',
            regionWarning: 'ВАШ РЕГИОН НЕ ПОДЕРЖИВАЕТСЯ',
            regionWarningSub: 'ВЫКЛЮЧИ VPN И ПОПРОБУЙ СНОВА',
            ipCopied: 'IP скопирован!',
            insertUsb: 'HTML pls insert USB',
            jailbreakSuccess: 'GoldHEN has been installed!'
        },
        en: {
            actionTitle: 'Select Action',
            regionCheckText: 'Check Region',
            recommendationsTitle: 'Recommendations:',
            recommendation1: '- GoldHEN 12.02/12.52 work best on PS4 Slim',
            recommendation2: '- If you have PS4 Pro, click "PS4 Pro Check HEN" for compatibility check',
            recommendation3: '- For PS5 use only official methods',
            ipModalTitle: 'Enter IP Address',
            ipExample: 'Your router IP: 192.168.1.1',
            realIp: 'Your PS4 IP: ...',
            continueButton: 'Continue',
            jailbreakStatus: 'Jailbreaking in progress...',
            regionAllowed: '✅ Your region is supported! You can continue.',
            proCheck: 'Checking PS4 Pro compatibility...',
            proCompatible: 'Your PS4 Pro is compatible with GoldHEN 12.52 and 13.02!',
            regionWarning: 'YOUR REGION IS NOT SUPPORTED',
            regionWarningSub: 'TURN OFF VPN AND TRY AGAIN',
            ipCopied: 'IP copied!',
            insertUsb: 'Please insert USB',
            jailbreakSuccess: 'GoldHEN has been installed!'
        }
    };

    function updateTexts() {
        const lang = translations[currentLanguage];
        document.getElementById('actionTitle').textContent = lang.actionTitle;
        document.getElementById('regionCheckText').textContent = lang.regionCheckText;
        document.getElementById('recommendationsTitle').textContent = lang.recommendationsTitle;
        document.getElementById('recommendation1').textContent = lang.recommendation1;
        document.getElementById('recommendation2').textContent = lang.recommendation2;
        document.getElementById('recommendation3').textContent = lang.recommendation3;
        document.getElementById('ipModalTitle').textContent = lang.ipModalTitle;
        document.getElementById('continueButton').textContent = lang.continueButton;
        document.getElementById('jailbreakStatus').textContent = lang.jailbreakStatus;
    }

    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
        this.textContent = currentLanguage === 'ru' ? 'EN' : 'RU';
        updateTexts();
    });
// Create binary matrix effect
    const matrix = document.getElementById('matrix');
    const cols = 30;
    const rows = 30;
    // Generate random columns of falling binary digits
    for (let col = 0; col < cols; col++) {
        const speed = 2 + Math.random() * 3; // Random speed between 2-5
        const colLeft = (100 / cols) * col;
        
        for (let row = 0; row < rows; row++) {
            const digit = document.createElement('span');
            digit.className = 'binary-digit';
            digit.textContent = Math.random() > 0.5 ? '1' : '0';
            digit.style.left = `${colLeft}%`;
            digit.style.top = `${-row * 20}px`;
            digit.style.animation = `fall ${speed}s linear infinite`;
            digit.style.animationDelay = `${Math.random() * 2}s`;
            digit.classList.add('hovered-element');
matrix.appendChild(digit);
        }
    }
// Buttons
    const buttons = document.querySelectorAll('.action-btn');
    const ipModal = document.getElementById('ipModal');
    const ipInput = document.getElementById('ipInput');
    const ipError = document.getElementById('ipError');
    const submitIp = document.getElementById('submitIp');
    const closeModal = document.getElementById('closeModal');
    const jailbreakPage = document.getElementById('jailbreakPage');
    const jailbreakProcess = document.getElementById('jailbreakProcess');
    // Get user's real IP
    async function getRealIp() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP:', error);
            return null;
        }
    }

    // Check user's region
    function checkRegion() {
return new Promise((resolve) => {
            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(data => {
                    const blockedRegions = ['RU', 'BY', 'KZ', 'UA'];
                    resolve(!blockedRegions.includes(data.country));
                })
                .catch(() => resolve(true)); // Allow if API fails
        });
    }

    // Show region warning
    function showRegionWarning() {
        const warningPage = document.createElement('div');
        warningPage.id = 'regionWarning';
        warningPage.className = 'fixed inset-0 bg-black flex items-center justify-center z-50';
        warningPage.innerHTML = `
            <div class="text-center">
                <div class="warning-icon text-6xl mb-6">⚠️</div>
                <h2 class="text-red-500 text-3xl font-bold mb-4">${translations[currentLanguage].regionWarning}</h2>
                <p class="text-white text-xl">${translations[currentLanguage].regionWarningSub}</p>
</div>
        `;
        document.body.appendChild(warningPage);

        // Blinking effect
        const icon = warningPage.querySelector('.warning-icon');
        setInterval(() => {
            icon.style.opacity = icon.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
// Handle action button clicks
    // Add click handler for region check button
    document.getElementById('btn-region-check').addEventListener('click', async function() {
        const isAllowed = await checkRegion();
        if (isAllowed) {
            alert(translations[currentLanguage].regionAllowed);
} else {
            showRegionWarning();
        }
    });

    buttons.forEach(button => {
button.addEventListener('click', async function() {
            const isAllowedRegion = await checkRegion();
            if (!isAllowedRegion) {
                showRegionWarning();
                return;
            }

            const version = this.getAttribute('data-version');
            const ps5Image = document.getElementById('ps5Image');
if (version === 'pro') {
                alert(translations[currentLanguage].proCheck);
                setTimeout(() => {
                    alert(translations[currentLanguage].proCompatible);
}, 1500);
                return;
            }
// Show and animate the PS5 image
            ps5Image.style.display = 'block';
            
            // Reset animation
            ps5Image.style.animation = 'none';
            void ps5Image.offsetWidth; // Trigger reflow
            ps5Image.style.animation = 'slideDown 0.5s ease-out forwards';
    // List of predefined IPs to cycle through
    const predefinedIps = [
        '192.158.1.3',
        '192.199.1.5',
        '12.12.12.12',
        '192.19.293.19',
        '172.168.5.10',
        '10.0.0.15',
        '192.168.0.100',
        '172.16.254.1',
        '203.0.113.42',
        '198.51.100.7'
    ];

    // Show modal after a short delay
    setTimeout(async () => {
        ipModal.classList.remove('hidden');
        const randomIndex = Math.floor(Math.random() * predefinedIps.length);
        const randomIp = predefinedIps[randomIndex];
        const realIpElement = document.getElementById('realIp');
        realIpElement.textContent = `IP вашей PS4: ${randomIp}`;
            realIpElement.addEventListener('click', () => {
                ipInput.value = randomIp;
                realIpElement.textContent = translations[currentLanguage].ipCopied;
setTimeout(() => {
                    realIpElement.textContent = `IP вашей PS4: ${realIp}`;
}, 2000);
            });
}, 500);
});
    });
// Close modal
    closeModal.addEventListener('click', function() {
        ipModal.classList.add('hidden');
        ipError.classList.add('hidden');
    });
    // Make IP example clickable
    const ipExample = document.getElementById('ipExample');
    ipExample.addEventListener('click', function() {
        const exampleIp = '192.168.1.1';
        ipInput.value = exampleIp;
                        ipExample.textContent = translations[currentLanguage].ipCopied;
setTimeout(() => {
            ipExample.textContent = `Пример: ${exampleIp}`;
        }, 2000);
    });

    // Submit IP
    submitIp.addEventListener('click', function() {
const ip = ipInput.value.trim();
        const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        
        if (!ip || !ipPattern.test(ip)) {
            ipError.classList.remove('hidden');
            return;
        }
        
        ipModal.classList.add('hidden');
        jailbreakPage.classList.remove('hidden');
        
        // Start jailbreak process simulation
        simulateJailbreak();
    });
    
    // Simulate jailbreak process
    function simulateJailbreak() {
        jailbreakProcess.innerHTML = `
            <p class="text-green-500 text-2xl mb-4">Jailbreaking pls wait...</p>
            <div class="loader"></div>
        `;
        
        setTimeout(() => {
            jailbreakProcess.innerHTML += `
                    <p class="text-green-400 text-xl">${currentLanguage === 'ru' ? 'Загрузка GoldHEN...' : 'Downloading GoldHEN...'}</p>
<div class="loader"></div>
            `;
            
            setTimeout(() => {
                jailbreakProcess.innerHTML += `
                    <p class="text-green-400 text-xl">${currentLanguage === 'ru' ? 'Поиск payload...' : 'Finding payload...'}</p>
<div class="loader"></div>
                `;
                
                setTimeout(() => {
                    jailbreakProcess.innerHTML += `
                        <p class="text-green-500 text-2xl font-bold">${currentLanguage === 'ru' ? 'УСПЕШНО!' : 'SUCCESS!'}</p>
`;
                    
                    setTimeout(() => {
                        alert(translations[currentLanguage].insertUsb);
                        
                        setTimeout(() => {
                            alert(translations[currentLanguage].jailbreakSuccess);
jailbreakPage.classList.add('hidden');
                            ipInput.value = '';
                        }, 1000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 5000);
    }
});