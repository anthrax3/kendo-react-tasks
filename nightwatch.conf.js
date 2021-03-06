/* eslint no-console: 0 */
const path = require('path');
const localhost = process.env.LOCALHOST;
const chromeDriverPath = process.env.CHROME_DRIVER
    || require.resolve('selenium-standalone/.selenium/chromedriver/2.36-x64-chromedriver');
const chromeBinPath = process.env.CHROME_BIN;

console.log("LOCALHOST_IP: " + localhost);

let desiredCapabilities = {
    "browserName": "chrome"
};
if (chromeBinPath) {
    desiredCapabilities.chromeOptions = {
        'binary': chromeBinPath,
        'args': [ '--disable-gpu', '--privileged', '--no-sandbox' ]
    };
}

module.exports = (function() {
    const settings = {
        "src_folders": [
            path.resolve(process.cwd(), "e2e")
        ],
        "output_folder": "reports",
        "custom_commands_path": "",
        "custom_assertions_path": "",
        "page_objects_path": "",
        "globals_path": "",
        "selenium": {
            "start_process": true,
            "server_path": require.resolve('selenium-standalone/.selenium/selenium-server/3.5.3-server.jar'),
            "log_path": "",
            "cli_args": {
                "webdriver.chrome.driver": chromeDriverPath
            }
        },
        "test_settings": {
            "default": {
                "request_timeout_options": {
                    "timeout": 30000,
                    "retry_attempts": 5
                },
                "launch_url": `http://${localhost}`,
                "selenium_host": localhost,
                "silent": true,
                "screenshots": {
                    "enabled": false,
                    "path": ""
                },
                "desiredCapabilities": desiredCapabilities,
                "exclude": [ "./utils/**/*.*" ],
                "skip_testcases_on_fail": false
            },
            "chrome": {
                "desiredCapabilities": {
                    "browserName": "chrome"
                }
            },
            "parallel": {
                "test_workers": {
                    "enabled": true,
                    "workers": "auto"
                },
                "skip_testcases_on_fail": false,
                "parallel_process_delay": 20
            }
        }
    };

    return settings;
})();
