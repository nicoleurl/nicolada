Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
  resources :projects

  root "projects#index"
  get "/about" => "projects#about"
  get "/graphic-design" => "projects#graphic_design"
  get "/ux-ui" => "projects#ux_ui"
  get "/contact" => "projects#contact"
  get "/graphic-design/cause-x-effect" => "projects/graphic_design#cause_x_effect", as: "cause_x_effect"
  get "/graphic-design/intimates" => "projects/graphic_design#intimates", as: "intimates"
  get "/graphic-design/everybodys-free" => "projects/graphic_design#everybodys_free", as: "everybodys_free"
  get "/graphic-design/social-media" => "projects/graphic_design#social_media", as: "social_media"
  get "/graphic-design/wyndham-grand-rio-mar" => "projects/graphic_design#wyndham", as: "wyndham"
  get "/graphic-design/ocean-spray" => "projects/graphic_design#ocean_spray", as: "ocean_spray"
  get "/ux-ui/island-finance-web" => "projects/ux_ui#if_web", as: "if_web"
  get "/ux-ui/island-finance-web-abbreviated" => "projects/ux_ui#if_web_short", as: "if_web_short"
  get "/ux-ui/dr-harveys" => "projects/ux_ui#dr_harveys", as: "dr_harveys"
end
