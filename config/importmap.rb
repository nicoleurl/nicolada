# Pin npm packages by running ./bin/importmap
pin "application", preload: "true"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "jquery" # @3.7.1
pin_all_from "app/javascript/controllers", under: "controllers"
pin "swiper" # @11.1.14
pin "ssr-window", to: "https://cdn.jsdelivr.net/npm/ssr-window@latest/ssr-window.esm.js"
pin "script", to: "script.js"
