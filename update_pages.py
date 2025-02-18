<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hacking Tools | The Dark Web</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/png" href="images/icon.png">
</head>
<body class="bg-gray-900 text-gray-100 font-sans min-h-screen">
    <!-- Subtle Matrix Background -->
    <canvas id="matrix" class="fixed top-0 left-0 w-full h-full opacity-20 -z-10"></canvas>

    <!-- Navigation placeholder -->
    <div id="nav-placeholder"></div>
    <script>
        $(function(){
            $("#nav-placeholder").load("nav.html");
        });
    </script>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8 mt-20">
        <!-- Hero Section -->
        <section class="text-center mb-16">
            <h1 class="text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Hacking Tools
            </h1>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A collection of client-side tools for encoding, conversion, and calculations.
            </p>
        </section>

        <!-- Tools Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <!-- System Information -->
            <div class="bg-gray-800/80 backdrop-blur rounded-xl shadow-lg overflow-hidden border-l-4 border-green-400">
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <i class="fas fa-laptop-code text-3xl text-green-400"></i>
                        <h2 class="text-2xl font-bold text-green-400">System Information</h2>
                    </div>
                    
                    <div class="bg-gray-900/50 rounded-lg p-4">
                        <div class="space-y-2 text-gray-300">
                            <p><span class="font-semibold">OS:</span> <span id="os-info">Loading...</span></p>
                            <p><span class="font-semibold">Browser:</span> <span id="browser-info">Loading...</span></p>
                            <p><span class="font-semibold">Screen:</span> <span id="screen-info">Loading...</span></p>
                            <p><span class="font-semibold">Language:</span> <span id="language-info">Loading...</span></p>
                            <p><span class="font-semibold">Cookies Enabled:</span> <span id="cookies-info">Loading...</span></p>
                            <p><span class="font-semibold">User Agent:</span> <span id="ua-info" class="text-xs">Loading...</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Password Generator -->
            <div class="bg-gray-800/80 backdrop-blur rounded-xl shadow-lg overflow-hidden border-l-4 border-green-400">
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <i class="fas fa-key text-3xl text-green-400"></i>
                        <h2 class="text-2xl font-bold text-green-400">Password Generator</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="include-uppercase" checked 
                                   class="w-4 h-4 text-green-400 rounded border-gray-600 focus:ring-green-400">
                            <label class="text-gray-300">Uppercase</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="include-numbers" checked 
                                   class="w-4 h-4 text-green-400 rounded border-gray-600 focus:ring-green-400">
                            <label class="text-gray-300">Numbers</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="include-symbols" checked 
                                   class="w-4 h-4 text-green-400 rounded border-gray-600 focus:ring-green-400">
                            <label class="text-gray-300">Symbols</label>
                        </div>
                        <input type="number" id="password-length" value="16" min="8" max="64"
                               class="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-green-400 focus:ring-0 transition-all">
                        <button onclick="generatePassword()" 
                                class="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                            Generate Password
                        </button>
                        <div id="password-result" class="bg-gray-900/50 rounded-lg p-4 hidden">
                            <div class="flex justify-between items-center">
                                <code id="generated-password" class="text-green-400"></code>
                                <button onclick="copyToClipboard(document.getElementById('generated-password').textContent, this)" 
                                        class="text-green-400 hover:text-green-500">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hash Generator -->
            <div class="bg-gray-800/80 backdrop-blur rounded-xl shadow-lg overflow-hidden border-l-4 border-green-400">
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <i class="fas fa-hashtag text-3xl text-green-400"></i>
                        <h2 class="text-2xl font-bold text-green-400">Hash Generator</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <select id="hash-type" 
                                class="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-green-400 focus:ring-0 transition-all">
                            <option value="SHA-256">SHA-256</option>
                            <option value="SHA-384">SHA-384</option>
                            <option value="SHA-512">SHA-512</option>
                        </select>
                        <textarea id="hash-input" 
                                  placeholder="Enter text to hash" 
                                  class="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-green-400 focus:ring-0 transition-all h-24"></textarea>
                        <button onclick="generateHash()" 
                                class="w-full bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                            Generate Hash
                        </button>
                        <div id="hash-result" class="bg-gray-900/50 rounded-lg p-4 hidden">
                            <div class="flex justify-between items-center">
                                <code id="generated-hash" class="text-green-400 break-all"></code>
                                <button onclick="copyToClipboard(document.getElementById('generated-hash').textContent, this)" 
                                        class="text-green-400 hover:text-green-500 ml-2">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Base64 Encoder/Decoder -->
            <div class="bg-gray-800/80 backdrop-blur rounded-xl shadow-lg overflow-hidden border-l-4 border-green-400">
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <i class="fas fa-exchange-alt text-3xl text-green-400"></i>
                        <h2 class="text-2xl font-bold text-green-400">Base64 Converter</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <textarea id="base64-input" 
                                  placeholder="Enter text to encode/decode" 
                                  class="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-green-400 focus:ring-0 transition-all h-24"></textarea>
                        <div class="flex gap-2">
                            <button onclick="base64Encode()" 
                                    class="flex-1 bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                Encode
                            </button>
                            <button onclick="base64Decode()" 
                                    class="flex-1 bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                Decode
                            </button>
                        </div>
                        <div id="base64-result" class="bg-gray-900/50 rounded-lg p-4 hidden">
                            <div class="flex justify-between items-center">
                                <code id="converted-base64" class="text-green-400 break-all"></code>
                                <button onclick="copyToClipboard(document.getElementById('converted-base64').textContent, this)" 
                                        class="text-green-400 hover:text-green-500 ml-2">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Text Case Converter -->
            <div class="bg-gray-800/80 backdrop-blur rounded-xl shadow-lg overflow-hidden border-l-4 border-green-400">
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <i class="fas fa-font text-3xl text-green-400"></i>
                        <h2 class="text-2xl font-bold text-green-400">Text Case Converter</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <textarea id="case-input" 
                                  placeholder="Enter text to convert" 
                                  class="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-green-400 focus:ring-0 transition-all h-24"></textarea>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="convertCase('upper')" 
                                    class="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                UPPERCASE
                            </button>
                            <button onclick="convertCase('lower')" 
                                    class="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                lowercase
                            </button>
                            <button onclick="convertCase('title')" 
                                    class="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                Title Case
                            </button>
                            <button onclick="convertCase('camel')" 
                                    class="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                camelCase
                            </button>
                        </div>
                        <div id="case-result" class="bg-gray-900/50 rounded-lg p-4 hidden">
                            <div class="flex justify-between items-center">
                                <code id="converted-case" class="text-green-400 break-all"></code>
                                <button onclick="copyToClipboard(document.getElementById('converted-case').textContent, this)" 
                                        class="text-green-400 hover:text-green-500 ml-2">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- URL Encoder/Decoder -->
            <div class="bg-gray-800/80 backdrop-blur rounded-xl shadow-lg overflow-hidden border-l-4 border-green-400">
                <div class="p-6">
                    <div class="flex items-center gap-4 mb-4">
                        <i class="fas fa-link text-3xl text-green-400"></i>
                        <h2 class="text-2xl font-bold text-green-400">URL Encoder</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <textarea id="url-input" 
                                  placeholder="Enter URL to encode/decode" 
                                  class="w-full bg-gray-700 text-gray-100 px-4 py-2 rounded-lg border-2 border-gray-600 focus:border-green-400 focus:ring-0 transition-all h-24"></textarea>
                        <div class="flex gap-2">
                            <button onclick="urlEncode()" 
                                    class="flex-1 bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                Encode
                            </button>
                            <button onclick="urlDecode()" 
                                    class="flex-1 bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors">
                                Decode
                            </button>
                        </div>
                        <div id="url-result" class="bg-gray-900/50 rounded-lg p-4 hidden">
                            <div class="flex justify-between items-center">
                                <code id="converted-url" class="text-green-400 break-all"></code>
                                <button onclick="copyToClipboard(document.getElementById('converted-url').textContent, this)" 
                                        class="text-green-400 hover:text-green-500 ml-2">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Matrix Controller -->
    <div id="matrixController" class="fixed bottom-4 right-4 bg-gray-800/90 backdrop-blur p-4 rounded-lg shadow-lg border border-green-400/20 z-50">
        <div class="flex flex-col space-y-2">
            <select id="matrixStyle" class="bg-gray-700 text-green-400 p-2 rounded border border-green-400/20">
                <option value="matrix">Matrix Style</option>
                <option value="numbers">Numbers Only</option>
                <option value="asian">Asian Characters</option>
            </select>
            <button id="toggleMatrix" class="bg-green-400 hover:bg-green-500 text-gray-900 px-4 py-2 rounded transition-colors">
                Toggle Effect
            </button>
        </div>
    </div>

    <script src="matrix.js"></script>
    <script src="hacking-tools.js"></script>
    <script>
        // Initialize Matrix Effect
        const canvas = document.getElementById('matrix');
        const matrixEffect = new MatrixEffect(canvas);
        matrixEffect.setOpacity(0.2);

        const styleSelect = document.getElementById('matrixStyle');
        const toggleButton = document.getElementById('toggleMatrix');
        let isMatrixActive = true;

        styleSelect.addEventListener('change', (e) => {
            matrixEffect.setCharacterSet(e.target.value);
        });

        toggleButton.addEventListener('click', () => {
            isMatrixActive = !isMatrixActive;
            matrixEffect.toggleEffect(isMatrixActive);
            toggleButton.textContent = isMatrixActive ? 'Turn Off' : 'Turn On';
        });
    </script>
</body>
</html>
