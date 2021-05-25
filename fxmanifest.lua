fx_version "cerulean"
game 'gta5'

description 'Score'
author 'EmAdthasit'
version '1.0.0'

client_script {
  "config.lua",
  "client/cl_main.lua",
}

server_script {
  "config.lua",
  "server/sv_main.lua"
}

ui_page "html/index.html"

files {
  "html/index.html",
  "html/main.js"
}
