-- Example of how it works. Look at the `useCoreService`, and the nui function in `nui-events`

RegisterCommand('show:nui', function(source, args, rawCommand)
  SetNuiFocus( true, true )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = true
  })
end, false)

RegisterCommand('close:nui', function(source, args, rawCommand)
  SetNuiFocus( false, false )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
end, false)

RegisterNUICallback("Close", function(data, cb)
  SetNuiFocus( false, false )
  SendNUIMessage({
    app = "REACTNUI",
    method = "setVisibility",
    data = false
  })
  cb('OK')
end)