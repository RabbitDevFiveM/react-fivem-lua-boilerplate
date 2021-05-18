-- Example of how it works. Look at the `useCoreService`, and the nui function in `nui-events`

RegisterCommand('score:show', function(source, args, rawCommand)
  SetNuiFocus( true, true )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = true
  })
end, false)

RegisterCommand('score:hide', function(source, args, rawCommand)
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
end, false)


RegisterCommand('score:left', function(source, args, rawCommand)
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
end, false)

RegisterNUICallback("Close", function(data, cb)
  close()
  cb('OK')
end)

function close ()
  SetNuiFocus( false, false )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
end